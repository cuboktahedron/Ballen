import Color from "utils/graphics/color";
import Graphics from "utils/graphics/graphics";

const T = Color.Transparent;
const B = Color.Black;
const R = new Color("ff0000");

const toImageData = (data: string[]): ImageData => {
  if (data.length === 0) {
    return new ImageData(0, 0);
  }

  const image = new ImageData(data[0].length, data.length);
  const g = new Graphics(image);
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      const color = data[y][x];
      switch (color) {
        case "-":
          g.dot(x, y, T);
          break;
        case "@":
          g.dot(x, y, B);
          break;
        case "+":
          g.dot(x, y, R);
          break;
        default:
          throw new Error("Invalid argument passed.");
      }
    }
  }

  return image;
};

const fromImageData = (data: ImageData): string[] => {
  const g = new Graphics(data);
  const rows: string[] = [];
  for (let y = 0; y < data.height; y++) {
    const row: string[] = [];
    for (let x = 0; x < data.width; x++) {
      const color = g.color(x, y) as Color;

      switch (color.rgba) {
        case T.rgba:
          row.push("-");
          break;
        case B.rgba:
          row.push("@");
          break;
        case R.rgba:
          row.push("+");
          break;
        default:
          console.log(color);
          throw new Error("Invalid argument passed.");
      }
    }

    rows.push(row.join(""));
  }

  return rows;
};

describe("Graphics", () => {
  describe("dot", () => {
    it("should draw dot", () => {
      // prettier-ignore
      const image = toImageData([
         "--",
         "--"
      ]);

      const g = new Graphics(image);
      g.dot(1, 1, B);

      // prettier-ignore
      const expected = [
         "--",
         "-@"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });
  });

  describe("line", () => {
    it("should draw line", () => {
      // prettier-ignore
      const image = toImageData([
         "--------",
         "--------",
         "--------",
         "--------"
      ]);

      const g = new Graphics(image);
      g.line(0, 0, 7, 3, Color.Black);

      // prettier-ignore
      const expected = [
        "@@------",
        "--@@----",
        "----@@--",
        "------@@"
     ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });
  });

  describe("filler", () => {
    it("should fill", () => {
      // prettier-ignore
      const image = toImageData([
         "-@-@----",
         "--@@--@-",
         "--@-----",
         "----@@--"
      ]);

      const g = new Graphics(image);
      g.fill(6, 0, Color.Black);

      // prettier-ignore
      const expected = [
        "@@-@@@@@",
        "@@@@@@@@",
        "@@@@@@@@",
        "@@@@@@@@"
     ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });
  });

  describe("rectangle", () => {
    it("should draw rectangle without fill", () => {
      // prettier-ignore
      const image = toImageData([
         "----",
         "----",
         "----",
         "----"
      ]);

      const g = new Graphics(image);
      g.rectangle(0, 1, 3, 3, Color.Black, { fill: false });

      // prettier-ignore
      const expected = [
        "----",
        "@@@@",
        "@--@",
        "@@@@"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });

    it("should draw rectangle with fill", () => {
      // prettier-ignore
      const image = toImageData([
         "----",
         "----",
         "----",
         "----"
      ]);

      const g = new Graphics(image);
      g.rectangle(0, 1, 3, 3, Color.Black, { fill: true });

      // prettier-ignore
      const expected = [
        "----",
        "@@@@",
        "@@@@",
        "@@@@"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });
  });

  describe("ellipse", () => {
    it("should draw even sized ellipse without fill", () => {
      // prettier-ignore
      const image = toImageData([
         "--------",
         "--------",
         "--------",
         "--------"
      ]);

      const g = new Graphics(image);
      g.ellipse(0, 0, 7, 3, Color.Black, { fill: false });

      // prettier-ignore
      const expected = [
        "-@@@@@@-",
        "@@----@@",
        "@@----@@",
        "-@@@@@@-"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });

    it("should draw odd sized ellipse", () => {
      // prettier-ignore
      const image = toImageData([
         "--------",
         "--------",
         "--------",
         "--------"
      ]);

      const g = new Graphics(image);
      g.ellipse(6, 2, 0, 0, Color.Black, { fill: false });

      // prettier-ignore
      const expected = [
        "-@@@@@--",
        "@-----@-",
        "-@@@@@--",
        "--------"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });

    it("should draw ellipse with fill", () => {
      // prettier-ignore
      const image = toImageData([
         "--------",
         "--------",
         "--------",
         "--------"
      ]);

      const g = new Graphics(image);
      g.ellipse(0, 0, 7, 3, Color.Black, { fill: true });

      // prettier-ignore
      const expected = [
        "-@@@@@@-",
        "@@@@@@@@",
        "@@@@@@@@",
        "-@@@@@@-"
      ];

      const actual = fromImageData(image);
      expect(actual).toEqual(expected);
    });
  });
});
