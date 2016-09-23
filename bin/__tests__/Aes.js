System.register(["../Crypto/Aes"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Aes_1;
    var originalPhrase, password, wrongPassword, aes;
    return {
        setters:[
            function (Aes_1_1) {
                Aes_1 = Aes_1_1;
            }],
        execute: function() {
            originalPhrase = "foo bar !!";
            password = "MyPass";
            wrongPassword = "MyWrongPass";
            aes = new Aes_1.AES();
            describe("Aes test", function () {
                it("Should encode and decode in 128 bits", function () {
                    var encoded = aes.to128(originalPhrase, password);
                    var decoded = aes.from128(encoded, password);
                    var wrongDecode = aes.from128(encoded, wrongPassword);
                    expect(decoded).toEqual(originalPhrase);
                    expect(wrongDecode).not.toEqual(originalPhrase);
                });
                it("Should encode and decode in 192 bits", function () {
                    var encoded = aes.to192(originalPhrase, password);
                    var decoded = aes.from192(encoded, password);
                    var wrongDecode = aes.from192(encoded, wrongPassword);
                    expect(decoded).toEqual(originalPhrase);
                    expect(wrongDecode).not.toEqual(originalPhrase);
                });
                it("Should encode and decode in 256 bits", function () {
                    var encoded = aes.to256(originalPhrase, password);
                    var decoded = aes.from256(encoded, password);
                    var wrongDecode = aes.from256(encoded, wrongPassword);
                    expect(decoded).toEqual(originalPhrase);
                    expect(wrongDecode).not.toEqual(originalPhrase);
                });
                it("Should work 3000 times", function () {
                    for (var i = 0; i < 1000; i++) {
                        var encoded = aes.to128(originalPhrase, password);
                        var decoded = aes.from128(encoded, password);
                        var wrongDecode = aes.from128(encoded, wrongPassword);
                    }
                    for (var i = 0; i < 1000; i++) {
                        var encoded = aes.to192(originalPhrase, password);
                        var decoded = aes.from192(encoded, password);
                        var wrongDecode = aes.from192(encoded, wrongPassword);
                    }
                    for (var i = 0; i < 1000; i++) {
                        var encoded = aes.to256(originalPhrase, password);
                        var decoded = aes.from256(encoded, password);
                        var wrongDecode = aes.from256(encoded, wrongPassword);
                    }
                });
            });
        }
    }
});
//# sourceMappingURL=Aes.js.map