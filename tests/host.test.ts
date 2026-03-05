import { describe, test, expect, beforeEach } from "vitest";
import { Host } from "../src/models/host";

describe("Host", () => {
  let host: Host;

  beforeEach(() => {
    host = new Host("srv");
  });

  test("creates a host with a name", () => {
    expect(host.name).toBe("srv");
  });

  test("has default image ubuntu", () => {
    expect(host.image).toBe("ubuntu");
  });

  test("has default shell /bin/bash", () => {
    expect(host.shell).toBe("/bin/bash");
  });

  test("has default status down", () => {
    expect(host.status).toBe("down");
  });

  test("has empty networks and ports by default", () => {
    expect(host.networks).toEqual([]);
    expect(host.ports).toEqual([]);
  });

  test("creates a host with custom image and shell", () => {
    const custom = new Host("router", "alpine", "/bin/sh");
    expect(custom.image).toBe("alpine");
    expect(custom.shell).toBe("/bin/sh");
  });
});