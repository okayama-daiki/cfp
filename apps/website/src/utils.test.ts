import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import { formatDate, formatDateRange } from "./utils.ts";

afterEach(() => vi.unstubAllEnvs());

describe("conference calendar dates", () => {
  test.each(["Asia/Tokyo", "America/Los_Angeles", "UTC"])(
    "keeps the published dates in %s",
    (timeZone) => {
      vi.stubEnv("TZ", timeZone);
      expect(formatDateRange("2027-06-02T00:00:00Z", "2027-06-04T23:59:59Z")).toBe(
        "2027/06/02 – 06/04",
      );
    },
  );

  test("shows both years when a conference crosses New Year", () => {
    vi.stubEnv("TZ", "Asia/Tokyo");
    expect(formatDateRange("2026-12-31T00:00:00Z", "2027-01-02T23:59:59Z")).toBe(
      "2026/12/31 – 2027/01/02",
    );
  });

  test("still converts deadline instants into the viewer's local date", () => {
    vi.stubEnv("TZ", "Asia/Tokyo");
    expect(formatDate("2026-11-02T23:00:00Z")).toBe("2026/11/03");
  });
});
