import Color from "./Color";
import { Vector2D } from "ballen-core";

export default class Graphics {
  constructor(private imageData: ImageData) {}

  indexOf(x: number, y: number): number {
    return y * (this.imageData.width * 4) + x * 4;
  }

  colorIndexOf(x: number, y: number): { ri: number; gi: number; bi: number; ai: number } {
    const base = this.indexOf(x, y);

    return {
      ri: base,
      gi: base + 1,
      bi: base + 2,
      ai: base + 3
    };
  }

  color(x: number, y: number): Color | null {
    if (x >= this.imageData.width || y >= this.imageData.height) {
      return null;
    }

    const data = this.imageData.data;

    const index = this.colorIndexOf(x, y);
    const color = new Color();
    color.r = data[index.ri];
    color.g = data[index.gi];
    color.b = data[index.bi];
    color.a = data[index.ai];

    return color;
  }

  dot(x: number, y: number, paintColor: Color): void {
    const data = this.imageData.data;
    const imgIndex = y * (this.imageData.width * 4) + x * 4;
    data[imgIndex] = paintColor.r;
    data[imgIndex + 1] = paintColor.g;
    data[imgIndex + 2] = paintColor.b;
    data[imgIndex + 3] = paintColor.a;
  }

  line(x1: number, y1: number, x2: number, y2: number, paintColor: Color): void {
    // Bresenham's line algorithm
    const dx = x1 < x2 ? x2 - x1 : x1 - x2;
    const dy = y1 < y2 ? y2 - y1 : y1 - y2;
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;

    let xx = x1;
    let yy = y1;
    if (dx > dy) {
      let e = -dx;
      for (let i = 0; i <= dx; i++) {
        this.dot(xx, yy, paintColor);
        xx += sx;
        e += 2 * dy;
        if (e >= 0) {
          yy += sy;
          e -= 2 * dx;
        }
      }
    } else {
      let e = -dy;
      for (let i = 0; i <= dy; i++) {
        this.dot(xx, yy, paintColor);
        yy += sy;
        e += 2 * dx;
        if (e >= 0) {
          xx += sx;
          e -= 2 * dy;
        }
      }
    }
  }

  fill(x: number, y: number, paintColor: Color): void {
    const fillTargetColor = this.color(x, y);
    const seedBuff: Vector2D[] = [];

    if (Color.equalsColor(fillTargetColor, paintColor)) {
      return;
    }

    seedBuff.push({ x, y });
    let pIndex = 0;

    while (pIndex >= 0) {
      const { x: sx, y: sy } = seedBuff[pIndex];
      let lx = sx;
      let rx = lx;
      seedBuff.pop();
      pIndex--;

      if (!Color.equalsColor(this.color(lx, sy), fillTargetColor)) {
        // already filled
        continue;
      }

      while (rx < this.imageData.width) {
        // search right boundary
        if (!Color.equalsColor(this.color(rx + 1, sy), fillTargetColor)) {
          break;
        }
        rx++;
      }

      while (lx > 0) {
        // search left boundary
        if (!Color.equalsColor(this.color(lx - 1, sy), fillTargetColor)) {
          break;
        }
        lx--;
      }

      this.line(lx, sy, rx, sy, paintColor);

      const scanLine = (lx: number, rx: number, y: number): void => {
        while (lx <= rx) {
          let foundFillTarget = false;
          for (; lx <= rx; lx++) {
            if (Color.equalsColor(this.color(lx, y), fillTargetColor)) {
              foundFillTarget = true;
              break;
            }
          }

          if (!foundFillTarget) {
            break;
          }

          for (; lx <= rx; lx++) {
            if (!Color.equalsColor(this.color(lx, y), fillTargetColor)) {
              break;
            }
          }

          seedBuff.push({ x: lx - 1, y });
          pIndex++;
        }
      };

      if (sy - 1 >= 0) {
        scanLine(lx, rx, sy - 1);
      }

      if (sy + 1 < this.imageData.height) {
        scanLine(lx, rx, sy + 1);
      }
    }
  }
}
