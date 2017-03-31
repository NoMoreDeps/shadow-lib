/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param utf8encode optional parameter, if set to true Unicode string is encoded to UTF8 before
 *                   conversion to base64; otherwise string is assumed to be 8-bit characters
 * @return           base64-encoded string
 */
export declare function encodeBase64(utf8encode: boolean): string;
/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param utf8decode optional parameter, if set to true UTF8 string is decoded back to Unicode
 *                   after conversion from base64
 * @return           decoded string
 */
export declare function decodeBase64(utf8decode: boolean): any;
/**
  * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
  * (BMP / basic multilingual plane only) (instance method extending String object).
  *
  * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
  *
  * @return encoded string
  */
export declare function encodeUTF8(): any;
/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 * (instance method extending String object).
 *
 * @return decoded string
 */
export declare function decodeUTF8(): any;
