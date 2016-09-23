System.register(["../Text/Guid"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Guid_1;
    return {
        setters:[
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }],
        execute: function() {
            describe("Test Guid", function () {
                it("Should be instanciated", function () {
                    var guid = new Guid_1.Guid();
                    expect(guid).not.toBeUndefined();
                });
                it("Should generate a valid guid with 6 parts", function () {
                    var guid = new Guid_1.Guid();
                    var strGuid = guid.toString();
                    expect(strGuid.split("-").length).toEqual(6);
                });
                it("Should be unique in 1000 instances", function () {
                    var hash = {};
                    for (var i = 0; i < 1000; i++) {
                        hash[new Guid_1.Guid().toString()] = true;
                    }
                    var count = 0;
                    for (var i in hash) {
                        count++;
                    }
                    expect(count).toEqual(1000);
                });
            });
        }
    }
});
//# sourceMappingURL=Guid.js.map