import { endFile } from "actions/fileAction";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSave from "renderer/hooks/useSave";
import { RootState } from "stores/rootState";

const Save: React.FC = () => {
  const dispatch = useDispatch();
  const file = useSelector((state: RootState) => state.file);
  const ref = useRef<HTMLAnchorElement>(null);

  const saveData = useSave();

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const href = URL.createObjectURL(
      new Blob([saveData], { type: "text/json" })
    );
    const download = `ballen_${new Date().getTime()}.dat`;
    ref.current.href = href;
    ref.current.download = download;
    ref.current.click();

    dispatch(endFile());
  }, [file]);

  return <a ref={ref} />;
};

export default Save;
