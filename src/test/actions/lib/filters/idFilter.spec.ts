import { filterId } from "actions/lib/filters/idFilter";
import { LFT_ID } from "types/filters";
import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

describe("filterid", () => {
  const c1 = new Color("5078A0"); // RGB(80, 120, 160)
  const c2 = new Color("78A050"); // RGB(120, 160, 80)
  const c3 = new Color("A0507880"); // RGBA(160, 80, 120, 128)
  const c4 = Color.Transparent;

  it("doesn't do anything", () => {
    const image = new ImageData(2, 2);
    const g = new Graphics(image);
    g.dot(0, 0, c1);
    g.dot(0, 1, c2);
    g.dot(1, 0, c3);
    g.dot(1, 1, c4);

    filterId(g, { type: LFT_ID });
    const actual = image;

    const expected = new ImageData(2, 2);
    const expectedG = new Graphics(expected);
    expectedG.dot(0, 0, c1);
    expectedG.dot(0, 1, c2);
    expectedG.dot(1, 0, c3);
    expectedG.dot(1, 1, c4);

    expect(actual).toEqual(expected);
  });
});
