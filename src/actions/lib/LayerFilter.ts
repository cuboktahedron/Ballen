import { LFT_ID } from "stores/filter/id";
import { LFT_OPACITY } from "stores/filter/opacity";
import { FilterState } from "stores/filterState";
import { filterId } from "./filters/IdFilter";
import { filterOpacity } from "./filters/OpacityFilter";
import Graphics from "./Graphics";

export const throughFilter = (base: ImageData, filters: FilterState[]): void => {
  const g = new Graphics(base);

  filters.forEach(filter => {
    switch (filter.property.type) {
      case LFT_ID: {
        filterId(g, filter.property);
        break;
      }
      case LFT_OPACITY: {
        filterOpacity(g, filter.property);
        break;
      }
    }
  });
};
