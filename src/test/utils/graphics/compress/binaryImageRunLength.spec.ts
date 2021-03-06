import Color from "utils/graphics/color";
import { BinaryImageRunLength } from "utils/graphics/compress/binaryImageRunLength";
import Graphics from "utils/graphics/graphics";

describe("BinaryImageRunLength", () => {
  it("should compress", () => {
    const base = new ImageData(4, 4);

    const brl = new BinaryImageRunLength({
      color1: Color.Transparent,
      color2: Color.Black,
      chunkMax: 4
    });
    const compressed = brl.compress(base.data);

    const expected = Uint32Array.from([4, 0, 4, 0, 4, 0, 4]);
    expect(compressed).toEqual(expected);
  });

  it("should decompress", () => {
    const base = new ImageData(4, 4);

    const brl = new BinaryImageRunLength({
      color1: Color.Transparent,
      color2: Color.Black,
      chunkMax: 4
    });
    const actual = brl.decompress(Uint32Array.from([4, 0, 4, 0, 4, 0, 4]));

    const expected = Uint8ClampedArray.from(base.data);
    expect(expected).toEqual(actual);
  });

  it("should restore original image data", () => {
    const base = new ImageData(4, 4);
    const g = new Graphics(base);
    g.dot(0, 0, Color.Black);
    g.dot(1, 0, Color.Transparent);
    g.dot(2, 0, Color.Black);
    g.dot(3, 0, Color.Black);
    g.dot(0, 1, Color.Transparent);
    g.dot(1, 1, Color.Transparent);
    g.dot(2, 1, Color.Black);
    g.dot(3, 1, Color.Black);
    g.dot(0, 2, Color.Black);
    g.dot(1, 2, Color.Black);
    g.dot(2, 2, Color.Transparent);
    g.dot(3, 2, Color.Transparent);
    g.dot(0, 3, Color.Transparent);
    g.dot(1, 3, Color.Transparent);
    g.dot(2, 3, Color.Black);
    g.dot(3, 3, Color.Black);

    const brl = new BinaryImageRunLength();
    const compressed = brl.compress(base.data);
    const decompressed = brl.decompress(compressed);
    const actual = new ImageData(4, 4);
    actual.data.set(decompressed);

    const expected = base;
    expect(expected).toEqual(actual);
  });

  it("can handle more than 255", () => {
    const base = new ImageData(130, 2);
    const g = new Graphics(base);
    g.dot(129, 1, Color.Black);

    const brl = new BinaryImageRunLength();
    const compressed = brl.compress(base.data);
    expect(Uint32Array.from([259, 1])).toEqual(compressed);

    const decompressed = brl.decompress(compressed);
    const actual = new ImageData(130, 2);
    actual.data.set(decompressed);

    const expected = base;
    expect(expected).toEqual(actual);
  });
});
