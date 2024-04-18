import React, { useRef, useEffect, CanvasHTMLAttributes, useState, useMemo } from 'react';

import styled from 'styled-components';

import type { Square, BlockType, Block, Action } from './efilCom/type';
// 样式
const Wrapper = styled.div``;

interface IProps<T> extends CanvasHTMLAttributes<HTMLCanvasElement> {
  className?: string;
  dpr?: number;
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, userConfig: T, scale: (num: number) => number) => void;
  userConfig: T;
}
//  七种方块 O I L J Z S T
class L {
  type = '';
  constructor(type: BlockType) {
    this.type = type;
  }
}
const Elfs = <T,>({
  draw,
  className,
  style,
  dpr,
  width = 300,
  height = 150,
  userConfig,
  ...canvasAttributes
}: IProps<T>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState(1);
  const [hdWidth, hdHeight] = useMemo(() => {
    return [+width * ratio, +height * ratio];
  }, [width, height, ratio]);

  useEffect(() => {
    const canvasDom = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvasDom ? canvasDom.getContext('2d') : null;
    if (!canvasDom || !ctx) {
      // canvas unsupported or not find
      return;
    }
    if (draw) {
      // 使其在水平和垂直方向上都按照 ratio 缩放。这个操作会影响后续在 Canvas 上绘制的内容，将其缩放为原始尺寸的 ratio 倍。
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const scale = (num: number) => num * ratio;
      draw(ctx, userConfig, scale);
    }
    return () => {
      // 重置 setTransform，以保证矩形的位置大小是正确的
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    };
  }, [draw, width, height, ratio, userConfig]);
  // 功能区
  // 游戏区
  return (
    <Wrapper>
      <h1>Elfs</h1>
      <canvas
        ref={canvasRef}
        // className={('bg-black dark:bg-white', className)}
        style={{ width: `${width}px`, height: `${height}px`, ...style }}
        width={hdWidth}
        height={hdHeight}
        {...canvasAttributes}
      />
    </Wrapper>
  );
};

export default Elfs;
