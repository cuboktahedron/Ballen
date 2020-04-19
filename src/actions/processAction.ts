import { BallenAction } from "./actionTypes";

export type ProcessActions = QuitAction;

export const QUIT = "process/quit";

export type QuitAction = {
  type: typeof QUIT;
} & BallenAction;

export const quit = (): QuitAction => {
  return {
    type: QUIT,
    payload: {}
  };
};
