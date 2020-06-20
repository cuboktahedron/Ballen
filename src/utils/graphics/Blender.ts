import Graphics from "./Graphics";
import Color from "./Color";

export default class Blender {
  private bg: Graphics;

  constructor(base: ImageData) {
    this.bg = new Graphics(base);
  }

  private checkWhetherSizesAreMatch(target: ImageData): void {
    if (this.bg.width !== target.width || this.bg.height !== target.height) {
      throw new Error("Size of blend targets are mismatched.");
    }
  }

  private blendColor(bColor: Color, tColor: Color, rColor: Color): Color {
    const ar = (bColor.a * tColor.a) / 0xff;
    const at = (tColor.a * (0xff - bColor.a)) / 0xff;
    const ab = (bColor.a * (0xff - tColor.a)) / 0xff;
    const a = ar + at + ab;
    const blendColor = new Color();
    if (a !== 0) {
      blendColor.r = Math.round((rColor.r * ar + tColor.r * at + bColor.r * ab) / a);
      blendColor.g = Math.round((rColor.g * ar + tColor.g * at + bColor.g * ab) / a);
      blendColor.b = Math.round((rColor.b * ar + tColor.b * at + bColor.b * ab) / a);
      blendColor.a = Math.round(a);
    }

    return blendColor;
  }

  private blend(target: ImageData, blendFunc: (arg0: Color, arg1: Color) => Color): void {
    this.checkWhetherSizesAreMatch(target);

    const tg = new Graphics(target);
    const height = this.bg.height;
    const width = this.bg.width;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tColor = tg.color(x, y) as Color;
        const bColor = this.bg.color(x, y) as Color;
        const rColor = blendFunc(bColor, tColor);
        const blendColor = this.blendColor(bColor, tColor, rColor);

        this.bg.dot(x, y, blendColor);
      }
    }
  }

  normal(target: ImageData): void {
    this.blend(target, (_bColor, tColor) => tColor);
  }

  multiply(target: ImageData): void {
    this.blend(target, (bColor, tColor) => {
      const color = new Color();
      color.r = (bColor.r * tColor.r) / 0xff;
      color.g = (bColor.g * tColor.g) / 0xff;
      color.b = (bColor.b * tColor.b) / 0xff;

      return color;
    });
  }
}
