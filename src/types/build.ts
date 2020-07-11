export const BS_READY = "ready";
export const BS_BUILDING = "building";
export const BS_CANCELING = "canceling";
export const BS_CANCELED = "canceled";
export const BS_COMPLETED = "completed";

export type BuildStatus =
  | typeof BS_READY
  | typeof BS_BUILDING
  | typeof BS_CANCELING
  | typeof BS_CANCELED
  | typeof BS_COMPLETED;
