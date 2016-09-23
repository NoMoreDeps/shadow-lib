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
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var b64;
    /**
     * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
     * (instance method extending String object). As per RFC 4648, no newlines are added.
     *
     * @param utf8encode optional parameter, if set to true Unicode string is encoded to UTF8 before
     *                   conversion to base64; otherwise string is assumed to be 8-bit characters
     * @return           base64-encoded string
     */
    function encodeBase64(utf8encode) {
        utf8encode = (typeof utf8encode === "undefined") ? false : utf8encode;
        var e = [];
        var pad = "";
        var o1;
        var o2;
        var o3;
        var bits;
        var h1;
        var h2;
        var h3;
        var h4;
        var c;
        var plain;
        var coded;
        plain = utf8encode ? this.encodeUTF8() : this;
        c = plain.length % 3; // pad string to length of multiple of 3
        if (c > 0) {
            while (c++ < 3) {
                pad += "=";
                plain += "\0";
            }
        }
        // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
        for (c = 0; c < plain.length; c += 3) {
            o1 = plain.charCodeAt(c);
            o2 = plain.charCodeAt(c + 1);
            o3 = plain.charCodeAt(c + 2);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            // use hextets to index into b64 string
            e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        }
        coded = e.join(""); // join() is far faster than repeated string concatenation
        // replace 'A's from padded nulls with '='s
        coded = coded.slice(0, coded.length - pad.length) + pad;
        return coded;
    }
    exports_1("encodeBase64", encodeBase64);
    /**
     * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
     * (instance method extending String object). As per RFC 4648, newlines are not catered for.
     *
     * @param utf8decode optional parameter, if set to true UTF8 string is decoded back to Unicode
     *                   after conversion from base64
     * @return           decoded string
     */
    function decodeBase64(utf8decode) {
        utf8decode = (typeof utf8decode === "undefined") ? false : utf8decode;
        var e = [];
        var d;
        var pad = "";
        var o1;
        var o2;
        var o3;
        var bits;
        var plain;
        var coded;
        var h1;
        var h2;
        var h3;
        var h4;
        coded = utf8decode ? this.decodeUTF8() : this;
        for (var c = 0; c < coded.length; c += 4) {
            h1 = b64.indexOf(coded.charAt(c));
            h2 = b64.indexOf(coded.charAt(c + 1));
            h3 = b64.indexOf(coded.charAt(c + 2));
            h4 = b64.indexOf(coded.charAt(c + 3));
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            o1 = bits >>> 16 & 0xff;
            o2 = bits >>> 8 & 0xff;
            o3 = bits & 0xff;
            d[c / 4] = String.fromCharCode(o1, o2, o3);
            // check for padding
            if (h4 === 0x40) {
                d[c / 4] = String.fromCharCode(o1, o2);
            }
            if (h3 === 0x40) {
                d[c / 4] = String.fromCharCode(o1);
            }
        }
        plain = d.join(""); // join() is far faster than repeated string concatenation
        return utf8decode ? plain.decodeUTF8() : plain;
    }
    exports_1("decodeBase64", decodeBase64);
    /**
      * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
      * (BMP / basic multilingual plane only) (instance method extending String object).
      *
      * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
      *
      * @return encoded string
      */
    function encodeUTF8() {
        // use regular expressions & String.replace callback function for better efficiency
        // than procedural approaches
        var str = this.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        });
        str = str.replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
        });
        return str;
    }
    exports_1("encodeUTF8", encodeUTF8);
    /**
     * Decode utf-8 encoded string back into multi-byte Unicode characters
     * (instance method extending String object).
     *
     * @return decoded string
     */
    function decodeUTF8() {
        var str = this.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
        function (c) {
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        });
        str = str.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
        function (c) {
            var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        });
        return str;
    }
    exports_1("decodeUTF8", decodeUTF8);
    return {
        setters:[],
        execute: function() {
            /**
             * Base64 and UTF8 encoders and decoders are based on
             * Chris Veness MIT licensed Work [www.movable-type.co.uk/scripts/aes.html]
             * April 2016
             */
            b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }
    }
});
//# sourceMappingURL=String.js.map