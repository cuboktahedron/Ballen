import { OpacityProperty } from "types/filters";

export const propsToName = (props: OpacityProperty): string => {
  return `opacity=${props.option.opacity}`;
};
