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
    it("Should let us access all part with getters", function () {
        var guid = new Guid();
        var strGuid = guid.toString();
        var tabPart = strGuid.split("-");
        expect(guid.part1.toString(16).substring(1)).toEqual(tabPart[0]);
        expect(guid.part2.toString(16).substring(1)).toEqual(tabPart[1]);
        expect(guid.part3.toString(16).substring(1)).toEqual(tabPart[2]);
        expect(guid.part4.toString(16).substring(1)).toEqual(tabPart[3]);
        expect(guid.part5.toString(16).substring(1)).toEqual(tabPart[4]);
        expect(guid.part6.map(function (elt) { return elt.toString(16).substring(1); }).reduce(function (p, c) { return p + c; })).toEqual(tabPart[5]);
    });
    it("Should be generated from the static method and be correct", function () {
        var guid = Guid.getGuid();
        var tabPart = guid.split("-");
        expect(tabPart[0].length).toEqual(tabPart[1].length);
        expect(tabPart[1].length).toEqual(tabPart[2].length);
        expect(tabPart[2].length).toEqual(tabPart[3].length);
        expect(tabPart[3].length).toEqual(tabPart[4].length);
        expect(tabPart[5].length).toEqual(tabPart[4].length * 3);
    });
    it("Shoud get the String Guid version on each call", function () {
        var guid = new Guid();
        var str1 = guid.toString();
        var str2 = guid.toString();
        expect(str1).toEqual(str2);
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