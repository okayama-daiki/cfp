import { describe, expect, test } from "vite-plus/test";
import { filterBySearch } from "./search.ts";
import type { DeadlineRow } from "./types.ts";

const geometry: DeadlineRow = {
  seriesId: "SoCG",
  seriesName: "Symposium on Computational Geometry",
  conference: {
    id: "socg-2027",
    series_id: "SoCG",
    name: "SoCG 2027",
    year: 2027,
    ordinal_no: null,
    url: "https://example.com/socg",
    venue: "京都、日本",
    start_at_utc: null,
    end_at_utc: null,
    milestones: [],
    call_for_paper: null,
  },
  milestone: {
    type: "full_paper_submission_deadline",
    at_utc: "2026-12-01T00:00:00Z",
    source_url: "https://example.com/socg/cfp",
    is_estimated: false,
  },
};

const ai: DeadlineRow = {
  ...geometry,
  seriesId: "AAAI",
  seriesName: "Association for the Advancement of Artificial Intelligence",
  conference: { ...geometry.conference, id: "aaai-2027", name: "AAAI 2027", venue: null },
  milestone: { ...geometry.milestone, type: "notification" },
};
const rows = [geometry, ai];

describe("deadline search", () => {
  test("keeps all rows for an empty or whitespace-only query", () => {
    expect(filterBySearch(rows, "")).toEqual(rows);
    expect(filterBySearch(rows, "  \u3000 ")).toEqual(rows);
  });

  test("searches abbreviations and full series names without case sensitivity", () => {
    expect(filterBySearch(rows, "socg")).toEqual([geometry]);
    expect(filterBySearch(rows, "ARTIFICIAL INTELLIGENCE")).toEqual([ai]);
  });

  test("matches multiple terms across names, years, venues, and milestone labels", () => {
    expect(filterBySearch(rows, "  SoCG   2027 京都 Full Paper ")).toEqual([geometry]);
    expect(filterBySearch(rows, "SoCG notification")).toEqual([]);
  });

  test("normalizes full-width Latin characters, digits, and spaces", () => {
    expect(filterBySearch(rows, "ＳｏＣＧ　２０２７")).toEqual([geometry]);
  });

  test("includes genre labels without duplicating rows with multiple genres", () => {
    expect(filterBySearch(rows, "geometry theory")).toEqual([geometry]);
    expect(filterBySearch(rows, "OR / AI")).toEqual([ai]);
  });

  test("handles unknown venues and returns no results for unmatched terms", () => {
    expect(filterBySearch(rows, "AAAI")).toEqual([ai]);
    expect(filterBySearch(rows, "Tokyo")).toEqual([]);
  });
});
