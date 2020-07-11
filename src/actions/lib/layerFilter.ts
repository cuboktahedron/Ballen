import { LFT_ID, LFT_OPACITY } from "types/filters";
import { FilterState } from "stores/filterState";
import Graphics from "utils/graphics/graphics";
import { filterId } from "./filters/idFilter";
import { filterOpacity } from "./filters/opacityFilter";

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
