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

/**
 * This class is used as a base class for all Emitters
 * @class Emitter
 * @md
 */
export class Emitter {

  // Internal fields
  protected _Emitter_: {
    onPool: { [eventName: string]: Array<{ id: number, callback: EmitterDelegate }> }; // on collection
    oncePool: { [eventName: string]: Array<{ id: number, callback: EmitterDelegate }> }; // once collection

    Ids: number; // Ids auto increment
    parent: Emitter; // Parent emitter, optional
  } = <any>{
    onPool: {},
    oncePool: {},
    Ids: 0,
    parent: void 0
  };

  /**
  * Register a new event
  * @method on
  * @param {string} eventName The event name
  * @param {EmitterDelegate} callback The callback
  @md
  */
  on(eventName: string, callback: EmitterDelegate): number {
    if (!this._Emitter_.onPool[eventName]) {
      this._Emitter_.onPool[eventName] = [];
    }

    let elt = {
      id: this._Emitter_.Ids++
      , callback: callback
    };

    this._Emitter_.onPool[eventName].push(elt);

    this.emit("registerEvent", { eventName: eventName, callback: callback });

    return elt.id;
  }

  /**
   * Register a new event that could be fired only one time
   * @method once
   * @param {string} eventName The event name
   * @param {EmitterDelegate} callback The callback
   */
  once(eventName: string, callback: EmitterDelegate): number {
    if (!this._Emitter_.oncePool[eventName]) {
      this._Emitter_.oncePool[eventName] = [];
    }

    let elt = {
      id: this._Emitter_.Ids++
      , callback: (data: any = void 0) => {
        this.off(elt.id);
        callback(data);
      }
    };

    this._Emitter_.oncePool[eventName].push(elt);

    this.emit("registerEvent", { eventName: eventName, callback: elt.callback });

    return elt.id;
  }

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
  off(...params: any[]): void {
    let eventName: string = void 0;
    let callback: EmitterDelegate = void 0;
    let callbackId: number = void 0;

    if (params.length === 0 || !params) {
      this._Emitter_.oncePool = {};
      this._Emitter_.onPool = {};
      return;
    }

    if (params.length === 1) {
      switch (typeof params[0]) {
        case "string":
          eventName = params[0];
          break;
        case "number":
          callbackId = params[0];
          break;
        default:
          callback = params[0];
          break;
      }
    }
    else {
      eventName = params[0];
      callback = params[1];
      callbackId = params[2] || void 0;
    }

    if (!eventName && !callbackId === void 0 && callback === void 0) {
      return;
    }

    if (eventName) {
      let pool = this._Emitter_.onPool[eventName] || [];
      if (callbackId) {
        pool = pool.filter(fct => fct.id === callbackId);
      }

      if (callback) {
        pool = pool.filter(fct => fct.callback === callback);
      }

      pool.forEach(fct => {
        this._Emitter_.onPool[eventName] =
          this._Emitter_.onPool[eventName].filter(pFct => pFct.id !== fct.id);
      });

      pool = this._Emitter_.oncePool[eventName] || [];
      if (callbackId) {
        pool = pool.filter(fct => fct.id === callbackId);
      }

      if (callback) {
        pool = pool.filter(fct => fct.callback === callback);
      }

      pool.forEach(fct => {
        this._Emitter_.oncePool[eventName] =
          this._Emitter_.oncePool[eventName].filter(pFct => pFct.id !== fct.id);
      });
    }
    else {
      for (eventName in this._Emitter_.onPool) {
        if (this._Emitter_.onPool.hasOwnProperty(eventName)) {
          let pool = this._Emitter_.onPool[eventName] || [];
          if (callbackId) {
            pool = pool.filter(fct => fct.id === callbackId);
          }

          if (callback) {
            pool = pool.filter(fct => fct.callback === callback);
          }

          pool.forEach(fct => {
            this._Emitter_.onPool[eventName] =
              this._Emitter_.onPool[eventName].filter(pFct => pFct.id !== fct.id);
          });
        }
      }

      for (eventName in this._Emitter_.oncePool) {
        if (this._Emitter_.oncePool.hasOwnProperty(eventName)) {
          let pool = this._Emitter_.oncePool[eventName] || [];
          if (callbackId) {
            pool = pool.filter(fct => fct.id === callbackId);
          }

          if (callback) {
            pool = pool.filter(fct => fct.callback === callback);
          }

          pool.forEach(fct => {
            this._Emitter_.oncePool[eventName] =
              this._Emitter_.oncePool[eventName].filter(pFct => pFct.id !== fct.id);
          });
        }
      }
    }
  }

  /**
   * Fires the specified event
   * @method emit
   * @param {string} eventName The event name
   * @param {any} data The data associated to the event
   * @return boolean
   * @md
   */
  emit(eventName: string, data: any = void 0): boolean {
    this._Emitter_.onPool[eventName]
      && this._Emitter_.onPool[eventName].forEach(fct => fct.callback(data));

    this._Emitter_.oncePool[eventName]
      && this._Emitter_.oncePool[eventName].forEach(fct => fct.callback(data));

    this._Emitter_.parent && this._Emitter_.parent.emit(eventName, data);
    eventName !== "allEvents" && this.emit("allEvents", { eventName: eventName, data: data });
    return true;
  }

  /**
   * Fires the specified event but in an async way
   * @method emit
   * @param {string} eventName The event name
   * @param {any} data The data associated to the event
   * @return boolean
   * @md
   */
  emitAsync(eventName: string, data: any = void 0): boolean {
    /**
     * Couldn't call this.emit(...), the closure will cause an infinite loop
     * if an inherited class overloads the Emit function.
     * */
    setTimeout(() => {
      this._Emitter_.onPool[eventName]
        && this._Emitter_.onPool[eventName].forEach(fct => {
          fct.callback(data);
        });

      this._Emitter_.oncePool[eventName]
        && this._Emitter_.oncePool[eventName].forEach(fct => {
          fct.callback(data);
        });

      this._Emitter_.parent && this._Emitter_.parent.emitAsync(eventName, data);
      eventName !== "allEvents" && this.emitAsync("allEvents", { eventName: eventName, data: data });
    }, 0);

    return true;
  }
}