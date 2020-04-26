import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
import { RootState } from "stores/rootState";

const Save: React.FC = () => {
  const file = useSelector((state: RootState) => state.file);
  const ref = useRef<HTMLAnchorElement>(null);

  const saveData = useSave();
  const href = URL.createObjectURL(new Blob([saveData], { type: "text/json" }));
  const download = `ballen_${new Date().getTime()}.dat`;

  useEffect(() => {
    ref?.current?.click();
  }, [file]);

  return <a ref={ref} download={download} href={href} />;
};

export default Save;
