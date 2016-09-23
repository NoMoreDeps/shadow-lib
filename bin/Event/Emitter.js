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
    var Emitter;
    return {
        setters:[],
        execute: function() {
            /**
             * This class is used as a base class for all Emitters
             * @class Emitter
             * @md
             */
            Emitter = (function () {
                function Emitter() {
                    // Internal fields
                    this._Emitter_ = {
                        onPool: {},
                        oncePool: {},
                        Ids: 0,
                        parent: void 0
                    };
                }
                /**
                * Register a new event
                * @method on
                * @param {string} eventName The event name
                * @param {EmitterDelegate} callback The callback
                @md
                */
                Emitter.prototype.on = function (eventName, callback) {
                    if (!this._Emitter_.onPool[eventName]) {
                        this._Emitter_.onPool[eventName] = [];
                    }
                    var elt = {
                        id: this._Emitter_.Ids++,
                        callback: callback
                    };
                    this._Emitter_.onPool[eventName].push(elt);
                    this.emit("registerEvent", { eventName: eventName, callback: callback });
                    return elt.id;
                };
                /**
                 * Register a new event that could be fired only one time
                 * @method once
                 * @param {string} eventName The event name
                 * @param {EmitterDelegate} callback The callback
                 */
                Emitter.prototype.once = function (eventName, callback) {
                    var _this = this;
                    if (!this._Emitter_.oncePool[eventName]) {
                        this._Emitter_.oncePool[eventName] = [];
                    }
                    var elt = {
                        id: this._Emitter_.Ids++,
                        callback: function (data) {
                            if (data === void 0) { data = void 0; }
                            _this.off(elt.id);
                            callback(data);
                        }
                    };
                    this._Emitter_.oncePool[eventName].push(elt);
                    this.emit("registerEvent", { eventName: eventName, callback: elt.callback });
                    return elt.id;
                };
                Emitter.prototype.off = function () {
                    var _this = this;
                    var params = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        params[_i - 0] = arguments[_i];
                    }
                    var eventName = void 0;
                    var callback = void 0;
                    var callbackId = void 0;
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
                        var pool = this._Emitter_.onPool[eventName] || [];
                        if (callbackId) {
                            pool = pool.filter(function (fct) { return fct.id === callbackId; });
                        }
                        if (callback) {
                            pool = pool.filter(function (fct) { return fct.callback === callback; });
                        }
                        pool.forEach(function (fct) {
                            _this._Emitter_.onPool[eventName] =
                                _this._Emitter_.onPool[eventName].filter(function (pFct) { return pFct.id !== fct.id; });
                        });
                        pool = this._Emitter_.oncePool[eventName] || [];
                        if (callbackId) {
                            pool = pool.filter(function (fct) { return fct.id === callbackId; });
                        }
                        if (callback) {
                            pool = pool.filter(function (fct) { return fct.callback === callback; });
                        }
                        pool.forEach(function (fct) {
                            _this._Emitter_.oncePool[eventName] =
                                _this._Emitter_.oncePool[eventName].filter(function (pFct) { return pFct.id !== fct.id; });
                        });
                    }
                    else {
                        for (eventName in this._Emitter_.onPool) {
                            if (this._Emitter_.onPool.hasOwnProperty(eventName)) {
                                var pool = this._Emitter_.onPool[eventName] || [];
                                if (callbackId) {
                                    pool = pool.filter(function (fct) { return fct.id === callbackId; });
                                }
                                if (callback) {
                                    pool = pool.filter(function (fct) { return fct.callback === callback; });
                                }
                                pool.forEach(function (fct) {
                                    _this._Emitter_.onPool[eventName] =
                                        _this._Emitter_.onPool[eventName].filter(function (pFct) { return pFct.id !== fct.id; });
                                });
                            }
                        }
                        for (eventName in this._Emitter_.oncePool) {
                            if (this._Emitter_.oncePool.hasOwnProperty(eventName)) {
                                var pool = this._Emitter_.oncePool[eventName] || [];
                                if (callbackId) {
                                    pool = pool.filter(function (fct) { return fct.id === callbackId; });
                                }
                                if (callback) {
                                    pool = pool.filter(function (fct) { return fct.callback === callback; });
                                }
                                pool.forEach(function (fct) {
                                    _this._Emitter_.oncePool[eventName] =
                                        _this._Emitter_.oncePool[eventName].filter(function (pFct) { return pFct.id !== fct.id; });
                                });
                            }
                        }
                    }
                };
                /**
                 * Fires the specified event
                 * @method emit
                 * @param {string} eventName The event name
                 * @param {any} data The data associated to the event
                 * @return boolean
                 * @md
                 */
                Emitter.prototype.emit = function (eventName, data) {
                    if (data === void 0) { data = void 0; }
                    this._Emitter_.onPool[eventName]
                        && this._Emitter_.onPool[eventName].forEach(function (fct) { return fct.callback(data); });
                    this._Emitter_.oncePool[eventName]
                        && this._Emitter_.oncePool[eventName].forEach(function (fct) { return fct.callback(data); });
                    this._Emitter_.parent && this._Emitter_.parent.emit(eventName, data);
                    eventName !== "allEvents" && this.emit("allEvents", { eventName: eventName, data: data });
                    return true;
                };
                /**
                 * Fires the specified event but in an async way
                 * @method emit
                 * @param {string} eventName The event name
                 * @param {any} data The data associated to the event
                 * @return boolean
                 * @md
                 */
                Emitter.prototype.emitAsync = function (eventName, data) {
                    var _this = this;
                    if (data === void 0) { data = void 0; }
                    /**
                     * Couldn't call this.emit(...), the closure will cause an infinite loop
                     * if an inherited class overloads the Emit function.
                     * */
                    setTimeout(function () {
                        _this._Emitter_.onPool[eventName]
                            && _this._Emitter_.onPool[eventName].forEach(function (fct) {
                                fct.callback(data);
                            });
                        _this._Emitter_.oncePool[eventName]
                            && _this._Emitter_.oncePool[eventName].forEach(function (fct) {
                                fct.callback(data);
                            });
                        _this._Emitter_.parent && _this._Emitter_.parent.emitAsync(eventName, data);
                        eventName !== "allEvents" && _this.emitAsync("allEvents", { eventName: eventName, data: data });
                    }, 0);
                    return true;
                };
                return Emitter;
            }());
            exports_1("Emitter", Emitter);
        }
    }
});
//# sourceMappingURL=Emitter.js.map