import { GENRE_LABELS, getSeriesGenres } from "./genres.ts";
import type { DeadlineRow } from "./types.ts";
import { MILESTONE_LABELS } from "./utils.ts";

function normalize(text: string): string {
  return text.normalize("NFKC").toLocaleLowerCase("ja-JP");
}

/** Space-separated terms may match different fields of the same deadline. */
export function filterBySearch(rows: DeadlineRow[], query: string): DeadlineRow[] {
  const terms = normalize(query).trim().split(/\s+/u).filter(Boolean);
  if (terms.length === 0) return rows;

  return rows.filter((row) => {
    const text = normalize(
      [
        row.seriesId,
        row.seriesName,
        row.conference.name,
        row.conference.year,
        row.conference.venue,
        MILESTONE_LABELS[row.milestone.type],
        ...getSeriesGenres(row.seriesId).map((genre) => GENRE_LABELS[genre]),
      ].join(" "),
    );
    return terms.every((term) => text.includes(term));
  });
}
