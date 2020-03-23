import Color from "actions/lib/Color";

describe("Color", () => {
  describe("Constructor", () => {
    it("should make object with specified color", () => {
      expect(new Color("123456").rgba).toBe("123456ff");
    });
  });
});
