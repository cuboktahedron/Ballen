import { saveCompleted } from "actions/fileAction";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useSave from "renderer/hooks/useSave";

const Save: React.FC = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  const dispatch = useDispatch();

  const saveData = useSave();
  const href = URL.createObjectURL(new Blob([saveData], { type: "text/json" }));
  const download = `ballen_${new Date().getTime()}.dat`;

  useEffect(() => {
    ref?.current?.click();
    dispatch(saveCompleted());
  }, []);

  return <a ref={ref} download={download} href={href} />;
};

export default Save;
