import { LFT_ID } from "stores/filter/id";
import { FilterState } from "stores/filterState";
import { Id } from "./filters/Id";
import { Opacity } from "./filters/Opacity";
import Graphics from "./Graphics";
import { LFT_OPACITY } from "stores/filter/opacity";

export const throughFilter = (base: ImageData, filters: FilterState[]): void => {
  const g = new Graphics(base);

  filters.forEach(filter => {
    switch (filter.property.type) {
      case LFT_ID: {
        Id(g, filter.property);
        break;
      }
      case LFT_OPACITY: {
        Opacity(g, filter.property);
        break;
      }
    }
  });
};
