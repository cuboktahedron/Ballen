import { BACKWARD, FORWARD, HistoryActions, PUSH } from "actions/historyAction";
import { AnyAction } from "redux";
import { HistoriesState, InitialHistoryState, HistoryState } from "stores/historyState";

export default function reducer(state: HistoriesState = InitialHistoryState, anyAction: AnyAction): HistoriesState {
  const action = anyAction as HistoryActions;

  switch (action.type) {
    case FORWARD:
      if (state.no < state.histories.length - 1) {
        return {
          ...state,
          no: state.no + 1
        };
      }
      return state;
    case BACKWARD:
      if (state.no > 0) {
        return {
          ...state,
          no: state.no - 1
        };
      }
      return state;
    case PUSH: {
      const histories = state.histories.concat();
      const no = state.no + 1;
      const historyIdSequence = state.historyIdSequence + 1;
      histories.length = no;

      const history: HistoryState = {
        ...action.payload.statesOfHistory,
        id: historyIdSequence,
        description: action.payload.recordDescription
      };

      return {
        histories: [...histories, history],
        historyIdSequence,
        no
      };
    }
    default:
      return state;
  }
}
