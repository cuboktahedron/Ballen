import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";
import { FilterProperties } from "stores/filterState";
import { propsToName as idPropToName } from "./id";
import { propsToName as opacityPropToName } from "./opacity";

export const filterPropertyToName = (props: FilterProperties): string => {
  switch (props.type) {
    case LFT_ID:
      return idPropToName(props);
    case LFT_OPACITY:
      return opacityPropToName(props);
    default:
      return "";
  }
};
