import { FC, useRef, useEffect } from 'react';

const App: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = 422;
    canvasRef.current.height = 622;

    const arrayWidth = 21;
    const arrayHeight = 31;

    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);
  return (
    <div>
      <h1>Tetris</h1>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
