import { describe, test, expect } from "vitest";
import { IsNameValid, SetDefaultHost, SetDefaultNetwork, HostExists } from "../src/core/utils";
import { Host } from "../src/models/host";
import { Network } from "../src/models/network";

describe("IsNameValid", () => {
  test("returns true for valid names", () => {
    expect(IsNameValid("srv")).toBe(true);
    expect(IsNameValid("my-host")).toBe(true);
    expect(IsNameValid("host_1")).toBe(true);
    expect(IsNameValid("Host123")).toBe(true);
  });

  test("returns false for empty string", () => {
    expect(IsNameValid("")).toBe(false);
  });

  test("returns false for names with spaces", () => {
    expect(IsNameValid("my host")).toBe(false);
  });

  test("returns false for names with special characters", () => {
    expect(IsNameValid("host@1")).toBe(false);
    expect(IsNameValid("host.1")).toBe(false);
  });
});

describe("SetDefaultHost", () => {
  test("sets default image to ubuntu", () => {
    const host = new Host("srv");
    host.image = "";
    SetDefaultHost(host);
    expect(host.image).toBe("ubuntu");
  });

  test("sets default shell to /bin/bash", () => {
    const host = new Host("srv");
    SetDefaultHost(host);
    expect(host.shell).toBe("/bin/bash");
  });

  test("sets default ipv4", () => {
    const host = new Host("srv");
    SetDefaultHost(host);
    expect(host.ipv4).toBe("10.10.0.1");
  });
});

describe("SetDefaultNetwork", () => {
  test("sets default driver to bridge", () => {
    const network = new Network("net1");
    SetDefaultNetwork(network);
    expect(network.driver).toBe("bridge");
  });

  test("sets default IP range", () => {
    const network = new Network("net1");
    SetDefaultNetwork(network);
    expect(network.ipRange).toBe("10.10.0.0/24");
  });

  test("sets default subnet", () => {
    const network = new Network("net1");
    SetDefaultNetwork(network);
    expect(network.subnet).toBe("10.10.0.0/24");
  });

  test("sets default gateway", () => {
    const network = new Network("net1");
    SetDefaultNetwork(network);
    expect(network.gateway).toBe("10.10.0.1");
  });
});

describe("HostExists", () => {
  test("returns true when host is defined", () => {
    const host = new Host("srv");
    expect(HostExists(host, "srv")).toBe(true);
  });

  test("returns false when host is undefined", () => {
    expect(HostExists(undefined, "srv")).toBe(false);
  });
});