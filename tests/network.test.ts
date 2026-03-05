import { describe, test, expect, beforeEach } from "vitest";
import { Network } from "../src/models/network";

describe("Network", () => {
  let network: Network;

  beforeEach(() => {
    network = new Network("net1");
  });

  test("creates a network with a name", () => {
    expect(network.name).toBe("net1");
  });

  test("has undefined optional fields by default", () => {
    expect(network.driver).toBeUndefined();
    expect(network.ipRange).toBeUndefined();
    expect(network.subnet).toBeUndefined();
    expect(network.gateway).toBeUndefined();
  });

  test("assigns driver correctly", () => {
    network.driver = "bridge";
    expect(network.driver).toBe("bridge");
  });

  test("assigns IP configuration correctly", () => {
    network.ipRange = "10.10.0.0/24";
    network.subnet = "10.10.0.0/24";
    network.gateway = "10.10.0.1";
    expect(network.ipRange).toBe("10.10.0.0/24");
    expect(network.subnet).toBe("10.10.0.0/24");
    expect(network.gateway).toBe("10.10.0.1");
  });
});