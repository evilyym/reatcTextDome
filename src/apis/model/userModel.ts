//定义请求参数
export interface ListParams {
  id?: number; //用户id
  token?: string;
}

export interface dataAny {
  [data:string]:any
}

export interface RowItem {
  id: number; //文件id
  fileName: string; //文件名
}

//定义接口返回数据
export interface ListModel {
  code: number;
  data: RowItem[];
}
