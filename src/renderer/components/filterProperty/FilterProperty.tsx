import React, { ReactNode } from "react";
import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";
import { FilterProperties } from "stores/filterState";
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
