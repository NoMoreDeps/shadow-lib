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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Guid implementation base on Random generation (RFC V4)
 * @class Guid
 */
var Guid = (function () {
    /**
     * @constructor
     */
    function Guid() {
        this._Guid_Init();
    }
    /**
     * Init method
     * @scope {protected}
     * @method _Guid_Init
     * @return {void}
     */
    Guid.prototype._Guid_Init = function () {
        var gen = function () {
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
    };
    Object.defineProperty(Guid.prototype, "part1", {
        /**
         * Gets the part1
         */
        get: function () {
            return this._Guid_.part1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guid.prototype, "part2", {
        /**
         * Gets the part2
         */
        get: function () {
            return this._Guid_.part2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guid.prototype, "part3", {
        /**
         * Gets the part3
         */
        get: function () {
            return this._Guid_.part3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guid.prototype, "part4", {
        /**
         * Gets the part 4
         */
        get: function () {
            return this._Guid_.part4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guid.prototype, "part5", {
        /**
         * Gets the part 5
         */
        get: function () {
            return this._Guid_.part5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Guid.prototype, "part6", {
        /**
         * Gets the part 6
         */
        get: function () {
            return this._Guid_.part6;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a string representation of the Guid
     * @method toString
     * @return {string}
     */
    Guid.prototype.toString = function () {
        if (this._Guid_.toString.length === 0) {
            this._Guid_.toString = this._Guid_.part1.toString(16).substring(1) + "-" +
                this._Guid_.part2.toString(16).substring(1) + "-" +
                this._Guid_.part3.toString(16).substring(1) + "-" +
                this._Guid_.part4.toString(16).substring(1) + "-" +
                this._Guid_.part5.toString(16).substring(1) + "-" +
                this._Guid_.part6[0].toString(16).substring(1)
                + this._Guid_.part6[1].toString(16).substring(1)
                + this._Guid_.part6[2].toString(16).substring(1);
        }
        return this._Guid_.toString;
    };
    /**
     * Gets a string Guid without a Guid Object
     * @static
     * @method getGuid
     * @return {string}
     */
    Guid.getGuid = function () {
        var gen = function () {
            return (((1 + Math.random()) * 0x10000) >> 0).toString(16).substring(1);
        };
        return gen() + "-" + gen() + "-" + gen() + "-" + gen() + "-" + gen() + "-" + (gen() + gen() + gen());
    };
    return Guid;
}());
exports.Guid = Guid;
//# sourceMappingURL=Guid.js.map