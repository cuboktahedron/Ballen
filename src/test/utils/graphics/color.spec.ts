import Color from "utils/graphics/color";

describe("Color", () => {
  describe("constructor", () => {
    it("should make object with default color", () => {
      expect(new Color().rgba).toBe("00000000");
    });

    it("should make object with specified color", () => {
      expect(new Color("123456").rgba).toBe("123456ff");
      expect(new Color("0102030a").rgba).toBe("0102030a");
    });

    it("should raise Error", () => {
      expect(() => {
        new Color("def");
      }).toThrowError(`unexpected color value(def) specified.`);
    });
  });

  describe("equals", () => {
    it("should return true", () => {
      expect(new Color().equals(new Color())).toBe(true);
      expect(new Color("123456").equals(new Color("123456"))).toBe(true);
      expect(new Color("0102030a").equals(new Color("0102030a"))).toBe(true);
    });

    it("should return false", () => {
      expect(new Color("123456").equals(new Color("123459"))).toBe(false);
      expect(new Color("12345600").equals(new Color("123456ff"))).toBe(false);
    });
  });

  describe("equalsColor", () => {
    it("should return true", () => {
      expect(Color.equalsColor(new Color(), new Color())).toBe(true);
      expect(Color.equalsColor(new Color("123456"), new Color("123456"))).toBe(true);
    });

    it("should return false", () => {
      expect(Color.equalsColor(null, new Color())).toBe(false);
      expect(Color.equalsColor(new Color(), null)).toBe(false);
      expect(Color.equalsColor(null, null)).toBe(false);
      expect(Color.equalsColor(new Color("12345678"), new Color("98765432"))).toBe(false);
    });
  });
});
