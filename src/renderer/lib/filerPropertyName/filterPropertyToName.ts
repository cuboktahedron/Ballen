import { FilterProperties, LFT_ID, LFT_OPACITY } from "types/filters";
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
