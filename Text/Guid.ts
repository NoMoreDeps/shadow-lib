/**
 * The MIT License (MIT)
 * Copyright (c) <2016> <Beewix>
 * Author <François Skorzec>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Guid implementation base on Random generation (RFC V4)
 * @class Guid
 */
export class Guid {

  _Guid_: {
    part1    : number;
    part2    : number;
    part3    : number;
    part4    : number;
    part5    : number;
    toString : string;
    part6    : Array<number>;
  };

  _Guid_Init(): void {
    let gen = (): number => {
      return ((1 + Math.random()) * 0x10000) >> 0;
    };

    this._Guid_ = {
      part1: gen(),
      part2: gen(),
      part3: gen(),
      part4: gen(),
      part5: gen(),
      part6: [gen(), gen(), gen()],
      toString: ""
    };
  }

  constructor() {
    this._Guid_Init();
  }

  toString() {
    if (this._Guid_.toString.length === 0) {
      this._Guid_.toString = this._Guid_.part1.toString(16).substring(1) + "-" +
        this._Guid_.part2.toString(16).substring(1) + "-" +
        this._Guid_.part3.toString(16).substring(1) + "-" +
        this._Guid_.part4.toString(16).substring(1) + "-" +
        this._Guid_.part5.toString(16).substring(1) + "-" +
        this._Guid_.part6[0].toString(16).substring(1)
          + this._Guid_.part6[1].toString(16).substring(1)
          + this._Guid_.part6[2].toString(16).substring(1)
        ;
    }
    return this._Guid_.toString;
  }
}
