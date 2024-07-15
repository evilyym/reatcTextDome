// 类型
type stringType = string;
interface IUser {
  name: string;
}
type stringType1 = stringType | number;

interface IUser1 extends IUser {
  age: null;
}

type stringType2 = stringType1 | IUser1;

type a = never; //不存在的值

type stringAndNumber = string | number;

const str: stringAndNumber = '123';

interface Name {
  name: string;
}
type User = Name & {
  age: number;
};

const user: User = {
  age: 22,
  name: '11',
};

type typeBox = {
  // 基础类型
  [key: string]: null | undefined | void | string | number | boolean | symbol | never;
};

function fnType<T>(params: T): T {
  const a: T = params;
  return a;
}

const conFnType = <T>(data: string): T => {
  const obj = { data } as T;
  return obj;
};

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}

const color = Color.Red;

function fnName<Object>(params?: void): void {
  console.log(color); //1
}

fnName();

// 不在上传本地修改内容
// git update-index --assume-unchanged .gitlab-ci.yml

const someValue: any = 'this is a string';

const strLength: number = (someValue as string).length;
