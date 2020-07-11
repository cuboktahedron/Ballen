import Color from "./Color";
import { Vector2D } from "utils/ballen-core";

export default class Graphics {
  constructor(private imageData: ImageData) {}

  get height(): number {
    return this.imageData.height;
  }

  get width(): number {
    return this.imageData.width;
  }

  isInBounds(x: number, y: number): boolean {
    return 0 <= x && x < this.imageData.width && 0 <= y && y < this.imageData.height;
  }

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
    if (!this.isInBounds(x, y)) {
      return;
    }

    const data = this.imageData.data;
    const index = this.colorIndexOf(x, y);
    data[index.ri] = paintColor.r;
    data[index.gi] = paintColor.g;
    data[index.bi] = paintColor.b;
    data[index.ai] = paintColor.a;
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
    if (!this.isInBounds(x, y)) {
      return;
    }

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

      while (rx < this.imageData.width - 1) {
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

  ellipse(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    paintColor: Color,
    option: {
      fill: boolean;
    }
  ): void {
    if (x1 > x2) {
      [x1, x2] = [x2, x1];
    }

    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }

    const dx = x2 - x1;
    const dy = y2 - y1;
    const a = dx / 2;
    const b = dy / 2;
    if (a === 0) {
      return;
    }

    if (b === 0) {
      return;
    }

    const cx = x1 + a;
    const cy = y1 + b;
    let x = a;
    let y = Math.round(b) === b ? 0 : 0.5;
    const a2 = a * a;
    const b2 = b * b;

    while (x >= 0) {
      if (option.fill) {
        this.line(cx - x, cy - y, cx + x, cy - y, paintColor);
        this.line(cx - x, cy + y, cx + x, cy + y, paintColor);
      } else {
        this.dot(cx + x, cy + y, paintColor);
        this.dot(cx - x, cy + y, paintColor);
        this.dot(cx + x, cy - y, paintColor);
        this.dot(cx - x, cy - y, paintColor);
      }

      if (x === 0) {
        break;
      }

      const mx = x - 1;
      const my = y - 1;
      const l = Math.abs((mx * mx) / a2 + (y * y) / b2 - 1);
      const d = Math.abs((x * x) / a2 + (my * my) / b2 - 1);
      const dl = Math.abs((mx * mx) / a2 + (my * my) / b2 - 1);

      if (l < d && l < dl) {
        x--;
      } else if (l < d && l >= dl) {
        x--;
        y--;
      } else {
        y--;
      }
    }
  }

  rectangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    paintColor: Color,
    option: {
      fill: boolean;
    }
  ): void {
    if (y1 > y2) {
      [y1, y2] = [y2, y1];
    }

    if (option.fill) {
      for (let y = y1; y <= y2; y++) {
        this.line(x1, y, x2, y, paintColor);
      }
    } else {
      this.line(x1, y1, x2, y1, paintColor);
      this.line(x1, y2, x2, y2, paintColor);
      this.line(x1, y1, x1, y2, paintColor);
      this.line(x2, y1, x2, y2, paintColor);
    }
  }
}
