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
