// 类型
type stringType = string;
interface IUser {
  name: string;
}
type stringType1 = stringType & number;

interface IUser1 extends IUser {
  age: null;
}

interface numberType {
  num: number;
}
