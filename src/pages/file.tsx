/*
 * @Author: yym
 * @Date: 2024-01-26 01:29:24
 * @LastEditTime: 2024-03-01 17:37:00
 */
import { useLocation } from 'react-router-dom';
// fetch('https://www.gov.cn/zhengce/pdfFile/2023_PDF.pdf', {
//   method: 'get',
//   // responseType: 'arraybuffer',
// })
//   .then((res) => {
//     if (res.status !== 200) {
//       return res.json();
//     }
//     return res.arrayBuffer();
//   })
//   .then((blobRes) => {
//     // 生成 Blob 对象，设置 type 等信息
//     const e: any = new Blob([blobRes], {
//       type: 'application/octet-stream',
//       // 'Content-Disposition': 'attachment',
//     });
//     // 将 Blob 对象转为 url
//     const link = window.URL.createObjectURL(e);
//     const a = document.createElement('a');
//     a.href = link;
//     a.download = 'test.pdf';
//     a.click();
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const File = () => {
  const { state } = useLocation();
  return <div>{state?.id}</div>;
};

export default File;
