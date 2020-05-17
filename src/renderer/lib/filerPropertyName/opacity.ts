import { OpacityProperty } from "stores/filter/opacity";

export const propsToName = (props: OpacityProperty): string => {
  return `opacity=${props.option.opacity}`;
};
