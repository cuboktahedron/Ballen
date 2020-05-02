import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const ExportAsImage: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const file = state.file;
  const build = state.build;
  const ref = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    if (!canvasRef?.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.putImageData(build.imageData, 0, 0);
    const href = canvasRef.current.toDataURL("image/png");
    const download = `image_${new Date().getTime()}.png`;
    ref.current.href = href;
    ref.current.download = download;
    ref.current.click();
  }, [file]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        height={build.imageData.height}
        width={build.imageData.width}
        style={{ display: "none" }}
      />
      <a ref={ref} />;
    </div>
  );
};

export default ExportAsImage;
