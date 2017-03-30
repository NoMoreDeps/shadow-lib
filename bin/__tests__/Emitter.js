"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Emitter_1 = require("../Event/Emitter");
describe("Test Emitter", function () {
    it("Should be of type Emitter", function () {
        var em = new Emitter_1.Emitter();
        expect(em instanceof Emitter_1.Emitter).toBeTruthy();
    });
    it("Should intercept 2 events with correct data", function () {
        var em = new Emitter_1.Emitter();
        var tab = ["1", "2"];
        em.on("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        em.emit("TEST", "1");
        em.emit("TEST", "2");
    });
    it("Should not receive event after unregistering it", function () {
        var em = new Emitter_1.Emitter();
        var tab = ["1", "2"];
        em.on("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        em.emit("TEST", "1");
        em.emit("TEST", "2");
        em.off("TEST");
        em.emit("TEST", "3");
    });
    it("Should not receive event after unregistering it with auto off function", function () {
        var em = new Emitter_1.Emitter();
        var tab = ["1", "2"];
        var event = em.on("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        em.emit("TEST", "1");
        em.emit("TEST", "2");
        event.off();
        em.emit("TEST", "3");
    });
    it("Should only receive one event when regisred once", function () {
        var em = new Emitter_1.Emitter();
        var tab = ["1"];
        var event = em.once("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        em.emit("TEST", "1");
        em.emit("TEST", "2");
    });
    it("Should not receive any event when regisred once and unregistered before first emit", function () {
        var em = new Emitter_1.Emitter();
        var tab = [];
        var event = em.once("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        event.off();
        em.emit("TEST", "1");
    });
    it("Should work also in async ;-)", function () {
        var em = new Emitter_1.Emitter();
        var tab = ["1"];
        var event = em.once("TEST", function (data) {
            expect(tab.shift()).toEqual(data);
        });
        em.emitAsync("TEST", "1");
    });
});
//# sourceMappingURL=Emitter.js.map