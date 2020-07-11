import { BS_READY, BuildStatus } from "types/build";

export type BuildState = {
  buildStatus: BuildStatus;
  buildTexts: string[];
  imageData: ImageData;
  isOpened: boolean;
};

export const InitialBuildState: BuildState = {
  buildStatus: BS_READY,
  buildTexts: [],
  imageData: new ImageData(580, 580),
  isOpened: false
};
