// 类学习
class yT {
  // 内外
  private y1() {
    return '中';
  }
  // 内
  protected y2() {
    return '内';
  }
  // 外
  public y3() {
    return '外';
  }
}
// 泛型
const foo1 = <T>(x: T): T => x;

const foo2 = <T extends object>(x: T): T => x;

const foo3 = <T extends Record<string, unknown>>(x: T): T => x;

const foo4: <T>(x: T) => T = (x) => x;

const identity5 = <T>(arg: T): T => {
  return arg;
};

const f1 = <T>(data: T): T => {
  return data;
};
function identity<T>(arg: T): T {
  return arg;
}
interface Date {
  format(fmt: string): string;
}
//为Date原型添加方法(js日期格式化)
Date.prototype.format = function (fmt: string): string {
  const o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

const nums1 = [1, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3;
// [1,2,2,3,5,6]
// 合并两个有序数组
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  const arr = nums1.splice(0, m).concat(nums2.splice(0, n));
  nums1 = arr;

  for (let i = m - 1, j = n - 1, k = m + n - 1; j >= 0; --k) {
    nums1[k] = i >= 0 && nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
}

merge(nums1, m, nums2, n);

function removeDuplicates(nums: number[]): number {
  if (nums.length > 0) {
    return 0;
  }
  // 定义指针
  let l = 0,
    r = 0;
  // 遍历nums
  for (let i = 0; i < nums.length; i++) {
    if (nums[l] == nums[i]) {
      r = i;
      const len = r - l + 1;
      if (len > 2) {
        // 删除l位置元素
        nums.splice(l, 1);
        // 修复
        r = r - 1;
        i--;
      }
    } else {
      l = i;
    }
  }
  return nums.length;
}

function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber: number = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
}

const bool: any = '';

if ((bool === false || bool === true) && typeof bool == 'boolean') {
  console.log('boolean');
}
