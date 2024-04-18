import React, { Component } from 'react';

type propTypes = {
  color: string;
  radius: string;
  v: string;
  angle: string;
  x: string;
  y: string;
};

class Circle extends Component {
  color;
  radius;
  v;
  angle;
  x;
  y;
  canvas;
  constructor(props: propTypes) {
    super(props);
    this.color = props.color;
    this.radius = props.radius;
    this.v = props.v;
    this.angle = props.angle;
    this.x = props.x;
    this.y = props.y;
    // 创建一个 ref 来存储 canvas 的 DOM 元素
    this.canvas = React.createRef();
  }

  componentDidMount() {
    //获取真实canvasDOM
    const canvas = this.canvas.current;
    //圆对象数组
    const arr = [];
    //圆数量
    const CNT = 50;
    //绘制上下文
    const ctx = canvas.getContext('2d');
    //设置canvas满屏
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //绘制区域中心点并设置中心点
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    //实例化圆
    for (let i = 0; i < CNT; i++) {
      const c1 = new Circle({
        //随机颜色
        color:
          'rgba(' +
          255 * Math.random() +
          ',' +
          255 * Math.random() +
          ',' +
          255 * Math.random() +
          ',' +
          Math.random() +
          ')',
        //随机半径
        radius: 66 * Math.random() + 1,
        //随机速度
        v: 4 * Math.random() + 1,
        //随机角度
        angle: 360 * Math.random(),
        //x坐标
        x: centerX,
        //y坐标
        y: centerY,
      });
      arr.push(c1);
    }

    function draw() {
      //清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < CNT; i++) {
        //移动x坐标
        arr[i].x += arr[i].v * Math.cos(arr[i].angle);
        //移动y坐标
        arr[i].y += arr[i].v * Math.sin(arr[i].angle);
        //反弹（angle在笛卡尔坐标系）
        if (arr[i].y < arr[i].radius) {
          //上
          arr[i].angle = 0 - arr[i].angle;
        }
        if (arr[i].y > canvas.height - arr[i].radius) {
          //下
          arr[i].angle = 0 - arr[i].angle;
        }
        if (arr[i].x < arr[i].radius) {
          //左
          arr[i].angle = Math.PI - arr[i].angle;
        }
        if (arr[i].x > canvas.width - arr[i].radius) {
          //右
          arr[i].angle = Math.PI - arr[i].angle;
        }
        //调用圆的绘制方法
        arr[i].draw(ctx);
      }
      //延迟50ms
      setTimeout(draw, 42);
    }
    //调用绘制
    draw();
  }

  /**
   * 绘制圆
   * @param  ctx 绘制上下文
   */
  draw(ctx) {
    //开始绘制路径
    ctx.beginPath();
    //绘制圆
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    //关闭绘制路径
    ctx.closePath();
    //设置fill颜色
    ctx.fillStyle = this.color;
    //fill
    ctx.fill();
  }

  render() {
    return <canvas ref={this.canvas} className="circle"></canvas>;
  }
}

export default Circle;
