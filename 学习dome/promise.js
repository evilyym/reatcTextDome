/* eslint-disable @typescript-eslint/no-this-alias */
class Promise {
  constructor(executor) {
    this.onFulfilleds = [];
    this.onRejecteds = [];
    this.state = 'pending';

    const self = this;
    function resolve(value) {
      if (self.state == 'pending') {
        self.state = 'fulfilled';
        self.value = value;
        self.onFulfilleds.forEach((callback) => callback());
      }
    }

    function reject(reason) {
      if (self.state == 'pending') {
        self.state = 'rejected';
        self.reason = reason;
        self.onRejecteds.forEach((callback) => callback());
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected == 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const self = this;
    const promise2 = new Promise((resolve, reject) => {
      if (self.state == 'fulfilled') {
        // 针对立即 resolve(): new Promise(r => r())
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (self.state == 'rejected') {
        // 针对立即 reject(): new Promise((r, j) => j())
        setTimeout(() => {
          try {
            const x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (self.state == 'pending') {
        // 针对异步 resolve reject: new Promise((r, j) => setTimeout(() => r()))
        self.onFulfilleds.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(self.value);
              resolvePromise(promise2, x, resolve, reject);
              // resolvePromise 代码作用和下面的代码差不多
              // if (x instanceof Promise) {
              //     x.then(val => resolve(val))
              // } else {
              //     resolve(x)
              // }
            } catch (error) {
              reject(error);
            }
          });
        });

        self.onRejecteds.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(self.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 == x) reject(new TypeError('circular reference'));

  if ((x !== null && typeof x == 'object') || typeof x == 'function') {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.defer = Promise.deferred = function () {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });

  return dfd;
};

module.exports = Promise;
