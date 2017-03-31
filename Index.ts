import {Guid as _Guid} from "./Text/Guid";
import {
  Emitter         as _Emitter         ,
  EmitterAutoOff  as _EmitterAutoOff  ,
  EmitterDelegate as _EmitterDelegate ,
  OnPoolType      as _OnPoolType      ,
  OncePoolType    as _OncePoolType
} from "./Event/Emitter";
import {AES as _AES} from "./Crypto/Aes";

export namespace Crypto  {
  export const AES = _AES;
};

export namespace Text  {
  export const Guid = _Guid;
}

export namespace Event {
  export const Emitter = _Emitter;
  export interface EmitterAutoOff extends _EmitterAutoOff {}
  export interface EmitterDelegate extends _EmitterDelegate {}
  export type OnPoolType = _OnPoolType;
  export type OncePoolType = _OncePoolType;
}