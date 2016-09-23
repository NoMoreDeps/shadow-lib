import {Guid} from "../Text/Guid";

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
