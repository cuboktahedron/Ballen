export default class Color {
  private _r = 0;
  private _g = 0;
  private _b = 0;
  private _a = 0;

  constructor(color?: string) {
    if (color !== undefined) {
      const len = color.length;

      if (len !== 6 && len !== 8) {
        throw new Error(`unexpected color value(${color}) specified.`);
      }

      this.r = parseInt(color.substr(0, 2), 16);
      this.g = parseInt(color.substr(2, 2), 16);
      this.b = parseInt(color.substr(4, 2), 16);

      if (len === 6) {
        this.a = 0xff;
      } else {
        this.a = parseInt(color.substr(6, 2), 16);
      }
    }
  }

  static Black = new Color("000000");
  static Transparent = new Color("00000000");

  set r(value: number) {
    this._r = value;
  }

  get r(): number {
    return this._r;
  }

  set g(value: number) {
    this._g = value;
  }

  get g(): number {
    return this._g;
  }

  set b(value: number) {
    this._b = value;
  }

  get b(): number {
    return this._b;
  }

  set a(value: number) {
    this._a = value;
  }

  get a(): number {
    return this._a;
  }

  get rgb(): string {
    const r = ("00" + this.r.toString(16)).slice(-2);
    const g = ("00" + this.g.toString(16)).slice(-2);
    const b = ("00" + this.b.toString(16)).slice(-2);
    return r + g + b;
  }

  get rgba(): string {
    const a = ("00" + this.a.toString(16)).slice(-2);
    return this.rgb + a;
  }

  equals(colorToCompare: Color): boolean {
    return this.rgba === colorToCompare.rgba;
  }

  static equalsColor(color1: Color | null, color2: Color | null): boolean {
    if (color1 == null || color2 == null) {
      return false;
    }

    return color1.equals(color2);
  }
}
