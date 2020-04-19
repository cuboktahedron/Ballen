import { BallenAction } from "actions/actionTypes";
import { ProcessActions, QUIT } from "actions/processAction";
import { InitialProcessState, ProcessState } from "stores/processState";

export default function reducer(state: ProcessState = InitialProcessState, anyAction: BallenAction): ProcessState {
  const action = anyAction as ProcessActions;

  switch (action.type) {
    case QUIT:
      return {
        ...state,
        quit: true
      };
    default:
      return state;
  }
}
