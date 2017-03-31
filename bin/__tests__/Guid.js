"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShadowLib = require("../Index");
var Guid = ShadowLib.Text.Guid;
describe("Test Guid", function () {
    it("Should be instanciated", function () {
        var guid = new Guid();
        expect(guid).not.toBeUndefined();
    });
    it("Should generate a valid guid with 6 parts", function () {
        var guid = new Guid();
        var strGuid = guid.toString();
        expect(strGuid.split("-").length).toEqual(6);
    });
    it("Should be unique in 1000 instances", function () {
        var hash = {};
        for (var i = 0; i < 1000; i++) {
            hash[new Guid().toString()] = true;
        }
        var count = 0;
        for (var i in hash) {
            count++;
        }
        expect(count).toEqual(1000);
    });
});
//# sourceMappingURL=Guid.js.map