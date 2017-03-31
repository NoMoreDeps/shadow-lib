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
 * Delegate prototype for emitter event handler
 */
export interface EmitterDelegate {
    (data: any): void;
}
export interface EmitterAutoOff {
    off: () => void;
}
export declare type OnPoolType = Array<{
    id: number;
    callback: EmitterDelegate;
}>;
export declare type OncePoolType = Array<{
    id: number;
    callback: EmitterDelegate;
    originalCallback: EmitterDelegate;
}>;
/**
 * This class is used as a base class for all Emitters
 * @class Emitter
 * @md
 */
export declare class Emitter {
    protected _Emitter_: {
        onPool: {
            [eventName: string]: OnPoolType;
        };
        oncePool: {
            [eventName: string]: OncePoolType;
        };
        Ids: number;
        parent: Emitter;
    };
    /**
    * Register a new event
    * @method on
    * @param {string} eventName The event name
    * @param {EmitterDelegate} callback The callback
    @md
    */
    on(eventName: string, callback: EmitterDelegate): EmitterAutoOff;
    /**
     * Register a new event that could be fired only one time
     * @method once
     * @param {string} eventName The event name
     * @param {EmitterDelegate} callback The callback
     */
    once(eventName: string, callback: EmitterDelegate): EmitterAutoOff;
    /**
     * Unregister an event
     * @method off
     * @noPrototype
     * @md
     */
    off(): void;
    off(eventName: string): void;
    off(callback: EmitterDelegate): void;
    off(callbackId: number): void;
    off(eventName: string, callback: EmitterDelegate, id?: number): void;
    /**
     * Fires the specified event
     * @method emit
     * @param {string} eventName The event name
     * @param {any} data The data associated to the event
     * @return boolean
     * @md
     */
    emit(eventName: string, data?: any): boolean;
    /**
     * Fires the specified event but in an async way
     * @method emit
     * @param {string} eventName The event name
     * @param {any} data The data associated to the event
     * @return boolean
     * @md
     */
    emitAsync(eventName: string, data?: any): boolean;
}
