export type BuildState = {
  buildTexts: string[];
  imageData: ImageData;
  isOpened: boolean;
};

export const InitialBuildState: BuildState = {
  buildTexts: [],
  imageData: new ImageData(580, 580),
  isOpened: false
};
