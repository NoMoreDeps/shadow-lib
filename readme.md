## Shadow Lib
Shadow Lib package contains usefull standalone helpers used in all shadow developments
<br />

### Installation

```bash
  npm i --save git+https://github.com/fskorzec/shadow-lib.git
```

### To use types in Module System

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

### AES package

```typescript
/**
* Import the package
*/
import {AES} from "shadow-lib/Crypto/Aes";

// Instanciate the AES class
let crypto = new AES();

// Set the input text to encrypt
let inputText = "Foo bar";

// Set your password phrase
let password  = "*******";

// Now in order to encrypt your text
// You have to choose beetween a 128 | 192 | 256 bits based encryption
let encrypted128BitText = crypto.to128(inputText, password);
let encrypted192BitText = crypto.to192(inputText, password);
let encrypted256BitText = crypto.to256(inputText, password);

// At the opposite, if you want to uncrypt, you will proceed the the following
let uncrypted128BitText = crypto.from128(encrypted128BitText, password);
```

### Guid package
```typescript
/**
 * Import the package
 */
import {Guid} from "shadow-lib/Text/Guid";

// Instanciate a new Guid object
let guid = new Guid();

// Gets a specific part (from 1 to 6)
console.log(guid.part1);

// Gets the string representation
let str = guid.toString();

// As a shortcut, you can invoke the static method
let str2 = Guid.getGuid();
```

### Emitter package
```typescript
/**
 * Import the package
 */
import {Emitter} from "shadow-lib/Event/Emitter";

// Instanciate an emitter
let emitter = new Emitter();

// Register an event with a lambda
emitter.on("TEST", () => {
  // ...
});

// Or with a named function
let test3 = () => {
  // ...
};
emitter.on("TEST 3", test3);

// Register a single use event
let onceHandler = emitter.once("TEST 2", () => {
  // ...
});

// Then emit a sync event
emitter.emit("TEST", "DATA");

// Or an async version
emitter.emitAsync("TEST", "DATA");

// Unregister all delegates associated to the event
emitter.off("TEST");

// Unregsiter a specific anonymous delegate
onceHandler.off();

// Unregister a specific delegate
emitter.off(test3);

```