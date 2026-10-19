import { useEffect, useMemo, useState } from "preact/hooks";
import { Alert, Flex, Skeleton, Typography } from "antd";
import { Toolbar } from "./components/Toolbar.tsx";
import { DeadlineTable } from "./components/DeadlineTable.tsx";
import type { ConferencesData, DeadlineRow, ViewFilter } from "./types.ts";
import { loadFilterPreferences, saveFilterPreferences } from "./filterPreferences.ts";
import { ALL_GENRES, getAvailableGenres } from "./genres.ts";
import { filterBySearch } from "./search.ts";
import { buildRows, DEFAULT_MILESTONE_FILTER, formatDate } from "./utils.ts";
import styles from "./App.module.css";

function filterByTime(rows: DeadlineRow[], filter: ViewFilter): DeadlineRow[] {
  const now = new Date();
  if (filter === "upcoming") return rows.filter((row) => new Date(row.milestone.at_utc) >= now);
  if (filter === "past") return rows.filter((row) => new Date(row.milestone.at_utc) < now);
  return rows;
}

type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; rows: DeadlineRow[]; generatedAt: string };

export function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [timeFilter, setTimeFilter] = useState<ViewFilter>("upcoming");
  const [filterPreferences, setFilterPreferences] = useState(loadFilterPreferences);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    saveFilterPreferences(filterPreferences);
  }, [filterPreferences]);

  useEffect(() => {
    fetch("/conferences.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load conferences");
        return response.json() as Promise<ConferencesData>;
      })
      .then((data) => {
        setLoadState({ status: "ready", rows: buildRows(data), generatedAt: data.generated_at });
      })
      .catch(() => {
        setLoadState({ status: "error" });
      });
  }, []);

  const genreOptions = useMemo(
    () => (loadState.status === "ready" ? getAvailableGenres(loadState.rows) : []),
    [loadState],
  );

  const visibleRows = useMemo(() => {
    if (loadState.status !== "ready") return [];
    return filterBySearch(filterByTime(loadState.rows, timeFilter), query);
  }, [loadState, timeFilter, query]);

  return (
    <main class={styles.app} aria-label="学会・投稿締切">
      <Flex vertical gap={20}>
        <div style={{ paddingBlock: 12 }}>
          {loadState.status === "loading" && (
            <Flex vertical gap={16} role="status">
              <Typography.Text type="secondary">学会情報を読み込んでいます…</Typography.Text>
              <Skeleton active title={false} paragraph={{ rows: 6 }} />
            </Flex>
          )}
          {loadState.status === "error" && (
            <Alert
              type="error"
              showIcon
              title="学会情報を読み込めませんでした。"
              description="ページを再読み込みしてください。"
            />
          )}
          {loadState.status === "ready" && (
            <Flex vertical gap={20}>
              <Toolbar
                query={query}
                onQueryChange={(query) => {
                  setQuery(query);
                  setPage(1);
                }}
                timeFilter={timeFilter}
                onTimeFilterChange={(filter) => {
                  setTimeFilter(filter);
                  setPage(1);
                }}
                onReset={() => {
                  setQuery("");
                  setTimeFilter("upcoming");
                  setFilterPreferences({
                    genreFilter: new Set(ALL_GENRES),
                    milestoneFilter: new Set(DEFAULT_MILESTONE_FILTER),
                  });
                  setPage(1);
                }}
              />
              <DeadlineTable
                rows={visibleRows}
                genreOptions={genreOptions}
                filters={filterPreferences}
                onFiltersChange={(filters) => {
                  setFilterPreferences(filters);
                  setPage(1);
                }}
                page={page}
                onPageChange={setPage}
              />
            </Flex>
          )}
        </div>
        {loadState.status === "ready" && (
          <footer>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              最終更新：{formatDate(loadState.generatedAt)}
            </Typography.Text>
          </footer>
        )}
      </Flex>
    </main>
  );
}
