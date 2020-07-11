import { filterPropertyToName } from "renderer/lib/filerPropertyName/filterPropertyToName";
import { IdProperty, LFT_ID, LFT_OPACITY, OpacityProperty } from "types/filters";

describe("filterPropertyToName", () => {
  it("should return id prop name", () => {
    const props: IdProperty = {
      type: LFT_ID
    };

    const actual = filterPropertyToName(props);
    const expected = "none";

    expect(actual).toEqual(expected);
  });

  it("should return opacity prop name", () => {
    const props: OpacityProperty = {
      type: LFT_OPACITY,
      option: {
        opacity: 60
      }
    };

    const actual = filterPropertyToName(props);
    const expected = "opacity=60";

    expect(actual).toEqual(expected);
  });
});
