## Shadow Lib
Shadow Lib package contains usefull standalone helpers used in all shadow developments
<br />

### Installation

```bash
  npm i --save git+https://github.com/fskorzec/shadow-lib.git
```

### To use types

```javascript
// Add the correct path for typings in your tsconfig.json
{
  ...
  "baseUrl": "./",
  "paths": {
    "shadow-lib/*" : ["./node_modules/shadow-lib/types/*"]
  },
  ...
}
```

### What will you find ;-) ?

```typescript
  /**
  * AES package allows to encode and decode string with a 128 | 192 | 256 bits encoding
  * */

  /**
  * Emitter package allows the use of an Emitter with on / once registering function
  * and emit / emitAsync actions
  * */

  /**
  * Guid package let you generate a valid Guid
  * */

  /**
  * String package is used in AES package and exposes String prototypes for
  * base64 encoding / decoding
  * utf8 encoding / decoding
  * */
```