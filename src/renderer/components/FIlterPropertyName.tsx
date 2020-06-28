import { TextField, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { filterPropertyToName } from "renderer/lib/filerPropertyName/filterPropertyToName";
import { FilterProperties } from "stores/filterState";

const FilterPropertyName: React.FC<FilterProperties> = props => {
  let paramsRef: HTMLInputElement | null = null;
  const [disableParamsToolTip, setDisableParamsToolTip] = useState<boolean>(
    true
  );

  const handleParamsMouseEnter = (): void => {
    if (paramsRef === null) {
      setDisableParamsToolTip(false);
      return;
    }

    setDisableParamsToolTip(paramsRef.scrollWidth <= paramsRef.clientWidth);
  };

  const name = filterPropertyToName(props);

  return (
    <Tooltip
      disableHoverListener={disableParamsToolTip}
      title={name}
      style={{ fontSize: "2rem", color: "red" }}
    >
      <div style={{ marginLeft: "8px" }}>
        <TextField
          onMouseEnter={handleParamsMouseEnter}
          inputRef={(ref): void => {
            paramsRef = ref;
          }}
          InputProps={{
            readOnly: true
          }}
          value={name}
          style={{ width: "155px" }}
        ></TextField>
      </div>
    </Tooltip>
  );
};

export default FilterPropertyName;
