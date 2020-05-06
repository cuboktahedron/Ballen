import { BallenAction } from "actions/actionTypes";
import { CHANGE_FILTER, FilterActions } from "actions/filterAction";
import { FilterState } from "stores/filterState";

export default function reducer(state: FilterState, anyAction: BallenAction): FilterState {
  const action = anyAction as FilterActions;

  if (state.id !== action.payload.filterId) {
    return state;
  }

  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        property: action.payload.prop
      };
    default:
      return state;
  }
}
