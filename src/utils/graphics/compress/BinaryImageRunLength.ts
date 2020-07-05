import Color from "../Color";

export type BinaryImageRunLengthOption = {
  color1: Color;
  color2: Color;
  chunkMax: number;
};

export class BinaryImageRunLength {
  private option: BinaryImageRunLengthOption;

  constructor(option?: BinaryImageRunLengthOption) {
    this.option = Object.assign(
      {
        color1: Color.Transparent,
        color2: Color.Black,
        chunkMax: 0xffffffff
      },
      option
    );
  }

  compress(data: Uint8ClampedArray): Uint32Array {
    const buffer: number[] = [];
    const or = this.option.color1.r;
    const og = this.option.color1.g;
    const ob = this.option.color1.b;
    const oa = this.option.color1.a;

    const length = data.length;
    let times = 0;
    let oddTimes = true;

    for (let i = 0; i < length; ) {
      const r = data[i++];
      const g = data[i++];
      const b = data[i++];
      const a = data[i++];

      const isOddTimesColor = !(r !== or || g !== og || b !== ob || a !== oa);
      if ((!isOddTimesColor && oddTimes) || (isOddTimesColor && !oddTimes)) {
        i -= 4;
        buffer.push(times);
        times = 0;
        oddTimes = !oddTimes;
      } else {
        times++;
      }

      if (times === this.option.chunkMax) {
        buffer.push(times);
        times = 0;
        oddTimes = !oddTimes;
      }
    }

    if (times !== 0) {
      buffer.push(times);
    }

    return Uint32Array.from(buffer);
  }

  decompress(data: Uint32Array): Uint8ClampedArray {
    const buffer: number[] = [];
    const length = data.length;

    const cr1 = this.option.color1.r;
    const cg1 = this.option.color1.g;
    const cb1 = this.option.color1.b;
    const ca1 = this.option.color1.a;
    const cr2 = this.option.color2.r;
    const cg2 = this.option.color2.g;
    const cb2 = this.option.color2.b;
    const ca2 = this.option.color2.a;

    let oddTimes = true;
    for (let i = 0; i < length; i++) {
      const times = data[i];
      for (let j = 0; j < times; j++) {
        if (oddTimes) {
          buffer.push(cr1);
          buffer.push(cg1);
          buffer.push(cb1);
          buffer.push(ca1);
        } else {
          buffer.push(cr2);
          buffer.push(cg2);
          buffer.push(cb2);
          buffer.push(ca2);
        }
      }

      oddTimes = !oddTimes;
    }

    return Uint8ClampedArray.from(buffer);
  }
}
