import * as ShadowLib from "../Index";
import Guid = ShadowLib.Text.Guid;

describe("Test Guid", () => {
  it("Should be instanciated", () => {
    let guid = new Guid();
    expect(guid).not.toBeUndefined();
  });

  it("Should generate a valid guid with 6 parts", () => {
    let guid = new Guid();
    let strGuid = guid.toString();

    expect(strGuid.split("-").length).toEqual(6);
  });

  it("Should let us access all part with getters", () => {
    let guid = new Guid();
    let strGuid = guid.toString();

    const tabPart = strGuid.split("-");

    expect(guid.part1.toString(16).substring(1)).toEqual(tabPart[0]);
    expect(guid.part2.toString(16).substring(1)).toEqual(tabPart[1]);
    expect(guid.part3.toString(16).substring(1)).toEqual(tabPart[2]);
    expect(guid.part4.toString(16).substring(1)).toEqual(tabPart[3]);
    expect(guid.part5.toString(16).substring(1)).toEqual(tabPart[4]);
    expect(guid.part6.map( elt => elt.toString(16).substring(1)).reduce( (p, c) => p + c)).toEqual(tabPart[5]);
  })

  it("Should be generated from the static method and be correct", () => {
    let guid = Guid.getGuid();
    const tabPart = guid.split("-");

    expect(tabPart[0].length).toEqual(tabPart[1].length);
    expect(tabPart[1].length).toEqual(tabPart[2].length);
    expect(tabPart[2].length).toEqual(tabPart[3].length);
    expect(tabPart[3].length).toEqual(tabPart[4].length);
    expect(tabPart[5].length).toEqual(tabPart[4].length * 3);
  });

  it("Shoud get the String Guid version on each call", () => {
    const guid = new Guid();
    const str1 = guid.toString();
    const str2 = guid.toString();

    expect(str1).toEqual(str2);
  })

  it("Should be unique in 1000 instances", () => {
    let hash: {[key: string]: boolean} = {};

    for (let i = 0; i < 1000; i++) {
      hash[new Guid().toString()] = true;
    }

    let count = 0;

    for (let i in hash) {
      count++;
    }

    expect(count).toEqual(1000);
  });
});
