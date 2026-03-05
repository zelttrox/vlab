import { describe, test, expect, beforeEach } from "vitest";
import { VLab } from "../src/models/vlab";
import { Lab } from "../src/models/lab";

describe("VLab", () => {
  let vlab: VLab;

  beforeEach(() => {
    vlab = new VLab();
  });

  test("creates VLab with empty labs", () => {
    expect(vlab.labs).toEqual([]);
  });

  test("has autosave disabled by default", () => {
    expect(vlab.autosave).toBe(false);
  });

  test("has no current lab by default", () => {
    expect(vlab.GetCurrentLab()).toBeNull();
  });

  test("adds a lab", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    expect(vlab.labs).toHaveLength(1);
  });

  test("finds lab by name", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    const found = vlab.FindLabByName("mylab");
    expect(found.name).toBe("mylab");
  });

  test("returns empty lab when lab not found", () => {
    const found = vlab.FindLabByName("unknown");
    expect(found.name).toBe("");
  });

  test("deletes a lab", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    vlab.DeleteLab(lab);
    expect(vlab.labs).toHaveLength(0);
  });

  test("sets and gets current lab", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    vlab.SetCurrentLab(lab);
    expect(vlab.GetCurrentLab()?.name).toBe("mylab");
  });

  test("enters a lab", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    vlab.EnterLab(lab);
    expect(vlab.GetCurrentLab()?.name).toBe("mylab");
  });

  test("sets current lab to null", () => {
    const lab = new Lab("mylab");
    vlab.AddLab(lab);
    vlab.SetCurrentLab(lab);
    vlab.SetCurrentLab(null);
    expect(vlab.GetCurrentLab()).toBeNull();
  });
});