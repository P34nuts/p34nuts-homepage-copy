import { describe, expect, it } from "vitest";
import { releases } from "../client/src/data/artistData";

describe("Suno catalog", () => {
  it("maps the currently public and verified Suno songs to unique track identifiers", () => {
    const available = releases.filter((track) => track.sunoId);
    expect(available.map((track) => track.id)).toEqual(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]);
    expect(new Set(available.map((track) => track.sunoId)).size).toBe(available.length);
  });
});
