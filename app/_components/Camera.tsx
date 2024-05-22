'use client';

import { useEffect, useRef, useState } from 'react';

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textPrompt, setTextPrompt] = useState<string>('');

  useEffect(() => {
    const detect = async () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );

          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.fillStyle = 'white';
          ctx.font = '30px monospace';
          ctx.fillText(textPrompt, 50, 50);
        }
        requestAnimationFrame(detect);
      }
    };

    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          detect();
        }
      }
    };

    setupCamera();
  }, [textPrompt]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} width={640} height={480} />
      <input
        type='text'
        value={textPrompt}
        onChange={(e) => setTextPrompt(e.target.value)}
        placeholder='Enter text to display'
      />
    </div>
  );
};

export default Camera;
