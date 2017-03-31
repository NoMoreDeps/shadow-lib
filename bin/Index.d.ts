import { Guid as _Guid } from "./Text/Guid";
import { Emitter as _Emitter, EmitterAutoOff as _EmitterAutoOff, EmitterDelegate as _EmitterDelegate, OnPoolType as _OnPoolType, OncePoolType as _OncePoolType } from "./Event/Emitter";
import { AES as _AES } from "./Crypto/Aes";
export declare namespace Crypto {
    const AES: typeof _AES;
}
export declare namespace Text {
    const Guid: typeof _Guid;
}
export declare namespace Event {
    const Emitter: typeof _Emitter;
    interface EmitterAutoOff extends _EmitterAutoOff {
    }
    interface EmitterDelegate extends _EmitterDelegate {
    }
    type OnPoolType = _OnPoolType;
    type OncePoolType = _OncePoolType;
}
