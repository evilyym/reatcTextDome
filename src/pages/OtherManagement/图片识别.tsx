import React, { useState, useRef, useEffect } from 'react';

import Tesseract from 'tesseract.js';
import 'webrtc-adapter';

function OcrComponent() {
  const prefixes = '783|784|731'; // 暂定的数字开头前缀，用于匹配识别文本
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [photoText, setPhotoText] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoOCRText, setPhotoOCRText] = useState('');
  const [photoTime, setPhotoTime] = useState(null);

  // 兼容措施，如果有7开头并且后面连着12个字符的，可能会把数字“8”被识别为英文“B”，
  const replaceBWith8 = (text) => {
    // 定义正则
    const pattern = /7(?=(?:\d|B){11}\d)([\dB]{11})/g;

    return text.replace(pattern, (match, p1) => {
      // 替换'B'为'8'
      return '7' + p1.replace(/B/g, '8');
    });
  };

  // OCR处理函数
  const handleOcr = async (source, setTextFn, setLoadingFn, setOcrTextFn, logger) => {
    setLoadingFn(true);
    setTextFn('');

    try {
      // 创建一个新的Promise来处理Tesseract识别过程。
      const result = await Tesseract.recognize(
        source,
        // 'chi_sim', // 中文简体
        'eng', // 可以根据需要指定语言包
        // 'chi_sim+eng', // 使用中文和英文语言包
        {
          logger: (m) => {
            // 更新日志消息，限制日志条目数量以避免内存泄漏
            console.log(m);
          },
          // tessedit_ocr_engine_mode: 1, // 使用 LSTM 引擎 (OEM_LSTM_ONLY)
          // tessedit_pageseg_mode: 6, // 假设单行文本 (PSM_SINGLE_LINE)
        },
      );

      console.log('识别出来的文本：', result.data.text);
      // 替换'B'为'8'
      const resultText = replaceBWith8(result.data.text);
      console.log('转换后的文本：', resultText);

      setOcrTextFn(resultText);

      // 使用正则查找数字
      // 匹配13位数的数字，其中前三位是变量prefixes中含有的开头，后续10位的数字
      // eslint-disable-next-line no-useless-escape
      const regex = new RegExp(`(?:\D|^)(${prefixes})\d{10}`, 'g');

      // 创建一个空数组用于存储匹配结果
      const matches = [];
      let match;

      while ((match = regex.exec(resultText)) !== null) {
        // 确保我只获取到13位的数字序列
        const extractedNumber = match[0].slice(-13); // 从匹配结果中提取最后13个字符
        matches.push(extractedNumber);
      }

      console.log('匹配到的所有结果:', matches);

      // 将匹配的结果映射为仅包含13位数字的字符串数组，并去重
      // const passenger = resultText.match(regex);
      const passenger = [...new Set(matches)];
      console.log('获取到的数字：', passenger);

      // 设置数字
      setTextFn(passenger.length > 0 ? passenger.join(', ') : '');
    } catch (error) {
      console.error('Error during OCR:', error);
    } finally {
      setLoadingFn(false);
    }
  };

  // 开启摄像头
  const startCamera = async () => {
    try {
      // 指定使用后置摄像头
      const constraints = {
        video: {
          facingMode: 'environment', // 后置摄像头
        },
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        streamRef.current = newStream; // 保存流引用
      }
    } catch (error) {
      console.error('Error accessing media devices.', error);
      alert(`无法访问摄像头，请检查权限设置${error}`);
    }
  };

  // 关闭摄像头
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // 根据摄像头状态启动或停止摄像头
  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      // 组件卸载时停止摄像头
      stopCamera();
    };
  }, [isCameraOn]);

  // 用于测量执行时间的通用函数
  const getTime = async (asyncFunction, ...args) => {
    const startTime = performance.now();

    // 执行传入的异步函数并传递参数
    await asyncFunction(...args);

    const endTime = performance.now();
    const executionTime = (endTime - startTime).toFixed(2); // 保留两位小数
    console.log(`执行时间: ${executionTime} 毫秒`);
    return executionTime;
  };

  // 摄像头点击OCR识别
  const handleTakePhoto = async () => {
    if (!isCameraOn) {
      alert('请先点击开启摄像头');
      return;
    }
    setPhotoOCRText('');
    setPhotoTime('');
    setPhotoText('');
    // 暂停视频流
    const tracks = streamRef.current?.getTracks();
    tracks?.forEach((track) => (track.enabled = false));

    // 获取视频的实际尺寸
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    // 创建一个临时 canvas 来获取原始比例的截图
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = videoWidth;
    tempCanvas.height = videoHeight;
    tempContext.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    // 设置最终输出的尺寸（与 <video> 显示的尺寸一致）
    const outputWidth = videoRef.current.offsetWidth; // 使用CSS宽度
    const outputHeight = videoRef.current.offsetHeight; // 使用CSS高度

    // 在主 canvas 上绘制调整后的图像
    canvasRef.current.width = outputWidth;
    canvasRef.current.height = outputHeight;
    const context = canvasRef.current.getContext('2d');
    context.drawImage(tempCanvas, 0, 0, outputWidth, outputHeight);

    // 将 canvas 转换为 base64 图像数据
    const base64Image = canvasRef.current.toDataURL('image/png');
    setPreviewUrl(base64Image);
    console.log('拍摄的图片', base64Image);
    // 执行OCR识别
    const executionTime = await getTime(handlePhotoOcr, base64Image);
    setPhotoTime(executionTime);

    // 立刻关闭摄像头
    stopCamera();

    // 更新摄像头状态为关闭
    setIsCameraOn(false);
  };

  // 拍照后转换为base64-OCR识别
  const handlePhotoOcr = async (base64Image) => {
    await handleOcr(
      base64Image,
      setPhotoText,
      setLoading,
      setPhotoOCRText,
      (m) => console.log(m), // 自定义日志记录器
    );
  };

  const resultStyle: React.CSSProperties = {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: 'monospace',
  };

  return (
    <div>
      <h2>测试-OCR-Tesseract.js</h2>

      {/* 拍照测试区 */}
      <div style={{ marginTop: 20 }}>
        <h3> 拍照/视频上传base64测试区域</h3>
        <button onClick={() => setIsCameraOn((prevState) => !prevState)} style={{ marginTop: 20 }}>
          {isCameraOn ? '关闭摄像头' : '开启摄像头'}
        </button>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
        <button onClick={handleTakePhoto} disabled={!isCameraOn || loading}>
          {loading ? '加载中...' : '点击拍照识别'}
        </button>
        {previewUrl && (
          <div
            style={{
              textAlign: 'center',
              margin: '20px',
            }}
          >
            <div>预览图</div>
            <img
              style={{
                maxWidth: '100%',
                height: '100px',
                borderRadius: '4px',
              }}
              src={previewUrl}
            />
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <div style={resultStyle}>数字：{photoText ? photoText : '拍照无识别结果'}</div>
        <div style={resultStyle}>识别出来并转换的全部文本：{photoOCRText ? photoOCRText : '暂无识别'}</div>
        <div style={resultStyle}>识别耗时：{photoTime}毫秒</div>
      </div>
    </div>
  );
}

export default OcrComponent;
