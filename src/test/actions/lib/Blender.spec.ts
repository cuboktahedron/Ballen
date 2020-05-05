import Blender from "actions/lib/Blender";
import Color from "actions/lib/Color";
import Graphics from "actions/lib/Graphics";

describe("Blender", () => {
  const c1 = new Color("5078A0"); // RGB(80, 120, 160)
  const c2 = new Color("78A050"); // RGB(120, 160, 80)
  const c3 = new Color("A0507880"); // RGBA(160, 80, 120, 128)
  const c4 = Color.Transparent;

  it("should raise error when size is mismatch", () => {
    const base = new ImageData(1, 1);
    const target1 = new ImageData(1, 2);
    const target2 = new ImageData(2, 1);

    const blender = new Blender(base);
    expect(() => blender.normal(target1)).toThrowError("Size of blend targets are mismatched.");
    expect(() => blender.normal(target2)).toThrowError("Size of blend targets are mismatched.");
  });

  describe("normal", () => {
    it("should blend normal", () => {
      const base = new ImageData(2, 2);
      const baseG = new Graphics(base);
      baseG.dot(0, 0, c1);
      baseG.dot(0, 1, c2);
      baseG.dot(1, 0, c3);
      baseG.dot(1, 1, c4);

      const target = new ImageData(2, 2);
      const targetG = new Graphics(target);
      targetG.dot(0, 0, c4);
      targetG.dot(0, 1, c1);
      targetG.dot(1, 0, c2);
      targetG.dot(1, 1, c3);

      const blender = new Blender(base);
      blender.normal(target);

      const actual = base;
      const expected = new ImageData(2, 2);
      const expectedG = new Graphics(expected);
      expectedG.dot(0, 0, c1);
      expectedG.dot(0, 1, c1);
      expectedG.dot(1, 0, c2);
      expectedG.dot(1, 1, c3);

      expect(actual).toEqual(expected);
    });
  });

  describe("multiply", () => {
    it("should raise error when size is mismatch", () => {
      const base = new ImageData(1, 1);
      const target1 = new ImageData(1, 2);
      const target2 = new ImageData(2, 1);

      const blender = new Blender(base);
      expect(() => blender.normal(target1)).toThrowError("Size of blend targets are mismatched.");
      expect(() => blender.normal(target2)).toThrowError("Size of blend targets are mismatched.");
    });

    it("should blend multiply", () => {
      const base = new ImageData(2, 2);
      const baseG = new Graphics(base);
      baseG.dot(0, 0, c1);
      baseG.dot(0, 1, c2);
      baseG.dot(1, 0, c3);
      baseG.dot(1, 1, c4);

      const target = new ImageData(2, 2);
      const targetG = new Graphics(target);
      targetG.dot(0, 0, c4);
      targetG.dot(0, 1, c1);
      targetG.dot(1, 0, c2);
      targetG.dot(1, 1, c3);

      const blender = new Blender(base);
      blender.multiply(target);

      const actual = base;
      const expected = new ImageData(2, 2);
      const expectedG = new Graphics(expected);
      expectedG.dot(0, 0, c1);
      expectedG.dot(0, 1, new Color("264B32")); // RGB (38, 75, 50)
      expectedG.dot(1, 0, new Color("62693B")); // RGB (98, 105, 59)
      expectedG.dot(1, 1, c3);

      expect(actual).toEqual(expected);
    });
  });
});
