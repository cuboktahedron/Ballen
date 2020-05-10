import Color from "actions/lib/Color";
import { filterOpacity } from "actions/lib/filters/OpacityFilter";
import Graphics from "actions/lib/Graphics";
import { LFT_OPACITY } from "stores/filter/opacity";

describe("filterOpacity", () => {
  const c1 = new Color("5078A0"); // RGB(80, 120, 160)
  const c2 = new Color("78A050"); // RGB(120, 160, 80)
  const c3 = new Color("A0507880"); // RGBA(160, 80, 120, 128)
  const c4 = Color.Transparent;

  it("make image see through", () => {
    const image = new ImageData(2, 2);
    const g = new Graphics(image);
    g.dot(0, 0, c1);
    g.dot(0, 1, c2);
    g.dot(1, 0, c3);
    g.dot(1, 1, c4);

    filterOpacity(g, {
      type: LFT_OPACITY,
      option: {
        opacity: 50
      }
    });
    const actual = image;

    const expected = new ImageData(2, 2);
    const expectedG = new Graphics(expected);
    expectedG.dot(0, 0, new Color("5078A080"));
    expectedG.dot(0, 1, new Color("78A05080"));
    expectedG.dot(1, 0, new Color("A0507840"));
    expectedG.dot(1, 1, Color.Transparent);

    expect(actual).toEqual(expected);
  });
});
