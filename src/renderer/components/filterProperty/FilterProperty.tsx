import React, { ReactNode } from "react";
import { FilterProperties, LFT_ID, LFT_OPACITY } from "types/filters";
import FilterPropertyId from "./FilterPropertyId";
import FilterPropertyOpacity from "./FilterPropertyOpacity";

export type FilterPropertyProps = FilterProperties & {
  layerId: number;
  filterId: number;
  opened: boolean;
  onClose: () => void;
};

const FilterProperty: React.FC<FilterPropertyProps> = props => {
  const child = ((): ReactNode => {
    if (!props.opened) {
      return null;
    }

    switch (props.type) {
      case LFT_ID:
        return <FilterPropertyId {...props} />;
      case LFT_OPACITY:
        return <FilterPropertyOpacity {...props} />;
      default:
        return null;
    }
  })();

  return <div>{child}</div>;
};

export default FilterProperty;
