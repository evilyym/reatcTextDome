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
