import { describe, test, expect, beforeEach } from "vitest";
import { Lab } from "../src/models/lab";
import { Host } from "../src/models/host";
import { Network } from "../src/models/network";

describe("Lab", () => {
  let lab: Lab;

  beforeEach(() => {
    lab = new Lab("testlab");
  });

  test("creates a lab with a name", () => {
    expect(lab.name).toBe("testlab");
  });

  test("creates a lab with empty hosts and networks", () => {
    expect(lab.hosts).toEqual([]);
    expect(lab.networks).toEqual([]);
  });

  test("creates a lab with saved = false by default", () => {
    expect(lab.saved).toBe(false);
  });

  test("adds a host", () => {
    const host = new Host("srv");
    lab.AddHost(host);
    expect(lab.hosts).toHaveLength(1);
    expect(lab.hosts[0].name).toBe("srv");
  });

  test("adds a network", () => {
    const network = new Network("net1");
    lab.AddNetwork(network);
    expect(lab.networks).toHaveLength(1);
    expect(lab.networks[0].name).toBe("net1");
  });

  test("finds host by name", () => {
    const host = new Host("srv");
    lab.AddHost(host);
    const found = lab.FindHostByName("srv");
    expect(found.name).toBe("srv");
  });

  test("returns empty host when host not found", () => {
    const found = lab.FindHostByName("unknown");
    expect(found.name).toBe("");
  });

  test("finds network by name", () => {
    const network = new Network("net1");
    lab.AddNetwork(network);
    const found = lab.FindNetworkByName("net1");
    expect(found.name).toBe("net1");
  });

  test("returns empty network when network not found", () => {
    const found = lab.FindNetworkByName("unknown");
    expect(found.name).toBe("");
  });

  test("deletes a host", () => {
    const host = new Host("srv");
    lab.AddHost(host);
    lab.DeleteHost(host);
    expect(lab.hosts).toHaveLength(0);
  });

  test("deletes a network", () => {
    const network = new Network("net1");
    lab.AddNetwork(network);
    lab.DeleteNetwork(network);
    expect(lab.networks).toHaveLength(0);
  });
});