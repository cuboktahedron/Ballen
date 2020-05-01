import { batchLoad } from "actions/batchAction";
import { SaveData } from "actions/fileAction";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "stores/rootState";

const Load: React.FC = () => {
  const file = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref?.current?.click();
  }, [file]);

  const reader = new FileReader();
  const handleChange = (): void => {
    if (!ref?.current) {
      return;
    }

    if (!ref.current.files) {
      return;
    }

    const file = ref.current.files[0];
    ref.current.value = "";

    reader.addEventListener("load", (e: ProgressEvent) => {
      const target = e.target as FileReader;
      const loadJsonString = target.result as string;
      const loadData = JSON.parse(loadJsonString) as SaveData;

      dispatch(batchLoad(loadData, file.name));
    });

    reader.readAsText(file);
  };

  return (
    <input
      type="file"
      ref={ref}
      onChange={handleChange}
      style={{ display: "none" }}
    />
  );
};

export default Load;
