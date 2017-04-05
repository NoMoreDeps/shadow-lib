import * as ShadowLib from "../Index";
import Emitter = ShadowLib.Event.Emitter;

describe("Test Emitter", () => {
  it("Should be of type Emitter", () => {
    let em = new Emitter();
    expect(em instanceof Emitter).toBeTruthy();
  });

  it("Should intercept 2 events with correct data", () => {
    let em = new Emitter();
    let tab = ["1", "2"];

    em.on("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    em.emit("TEST", "1");
    em.emit("TEST", "2");
  });

  it("Should work same for each registered handler", () => {
    let em = new Emitter();
    let idx = 0;
    
    em.on("Hello", (data) => {
      expect(data).toEqual("Kitty");
      idx++;
    });

    em.on("Hello", (data) => {
      expect(data).toEqual("Kitty");
      idx++;      
    });

    em.emit("Hello", "Kitty");

    expect(idx).toEqual(2);
  });

  it("Should not receive event after unregistering it", () => {
    let em = new Emitter();
    let tab = ["1", "2"];

    em.on("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    em.emit("TEST", "1");
    em.emit("TEST", "2");
    em.off("TEST");
    em.emit("TEST", "3");

  });

  it("Should not receive event after unregistering it with auto off function", () => {
    let em = new Emitter();
    let tab = ["1", "2"];

    let event = em.on("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    em.emit("TEST", "1");
    em.emit("TEST", "2");
    event.off();
    em.emit("TEST", "3");

  });

  it("Should only receive one event when regisred once", () => {
    let em = new Emitter();
    let tab = ["1"];

    let event = em.once("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    em.emit("TEST", "1");
    em.emit("TEST", "2");
  });

  it("Should not receive any event when regisred once and unregistered before first emit", () => {
    let em = new Emitter();
    let tab: string[] = [];

    let event = em.once("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    event.off();
    em.emit("TEST", "1");
  });

  it("Should work also in async ;-)", () => {
    let em = new Emitter();
    let tab: string[] = ["1"];

    let event = em.once("TEST", (data) => {
      expect(tab.shift()).toEqual(data);
    });

    em.emitAsync("TEST", "1");
  });

});

