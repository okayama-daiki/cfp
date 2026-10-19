import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Descriptions,
  Empty,
  Flex,
  Grid,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import type { TableColumnType, TableColumnsType } from "antd";
import { useState } from "preact/hooks";
import type { FilterPreferences } from "../filterPreferences.ts";
import { ALL_GENRES, GENRE_LABELS, getSeriesGenres } from "../genres.ts";
import type { DeadlineRow, GenreId, MilestoneType } from "../types.ts";
import {
  DEFAULT_MILESTONE_FILTER,
  MILESTONE_LABELS,
  daysLabel,
  daysUntil,
  deadlineStatus,
  formatDate,
  formatDateRange,
} from "../utils.ts";

interface Props {
  rows: DeadlineRow[];
  genreOptions: GenreId[];
  filters: FilterPreferences;
  onFiltersChange: (filters: FilterPreferences) => void;
  page: number;
  onPageChange: (page: number) => void;
}

const ALL_TYPES = Object.keys(MILESTONE_LABELS) as MilestoneType[];
const FILTER_DROPDOWN_PROPS: TableColumnType<DeadlineRow>["filterDropdownProps"] = {
  popupRender: (menu) => (
    <ConfigProvider theme={{ token: { controlItemBgActive: "transparent" } }}>
      {menu}
    </ConfigProvider>
  ),
};

function rowKey(row: DeadlineRow): string {
  return `${row.conference.id}-${row.milestone.type}-${row.milestone.at_utc}`;
}

export function DeadlineTable({
  rows,
  genreOptions,
  filters,
  onFiltersChange,
  page,
  onPageChange,
}: Props) {
  const screens = Grid.useBreakpoint();
  const compact = !screens.lg;
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const selectedGenres = genreOptions.filter((genre) => filters.genreFilter.has(genre));
  const genreFilters: TableColumnType<DeadlineRow> = {
    filters: genreOptions.map((genre) => ({ text: GENRE_LABELS[genre], value: genre })),
    filteredValue: selectedGenres,
    defaultFilteredValue: genreOptions,
    filterResetToDefaultFilteredValue: true,
    filterMode: "tree",
    filterSearch: true,
    filterDropdownProps: FILTER_DROPDOWN_PROPS,
    onFilter: (value, row) => getSeriesGenres(row.seriesId).some((genre) => genre === value),
  };
  const typeFilters: TableColumnType<DeadlineRow> = {
    filters: ALL_TYPES.map((type) => ({ text: MILESTONE_LABELS[type], value: type })),
    filteredValue: [...filters.milestoneFilter],
    defaultFilteredValue: [...DEFAULT_MILESTONE_FILTER],
    filterResetToDefaultFilteredValue: true,
    filterMode: "tree",
    filterSearch: true,
    filterDropdownProps: FILTER_DROPDOWN_PROPS,
    onFilter: (value, row) => row.milestone.type === value,
  };
  // Conference and venue share the space left by the fixed-width columns.
  const columns: TableColumnsType<DeadlineRow> = [
    {
      ...(compact ? genreFilters : {}),
      key: "series",
      title: "学会",
      sorter: (a, b) =>
        a.seriesId.localeCompare(b.seriesId) || a.conference.year - b.conference.year,
      render: (_, row) => (
        <Flex vertical gap={3}>
          <Typography.Link
            href={row.conference.url}
            target="_blank"
            rel="noopener noreferrer"
            strong
          >
            {row.seriesId} {row.conference.year}
            <span class="sr-only">（公式サイトを新しいタブで開く）</span>
          </Typography.Link>
          {compact ? (
            <Flex gap={4} align="center" wrap>
              <span style={{ flex: "0 0 96px" }}>
                <Tag>{MILESTONE_LABELS[row.milestone.type]}</Tag>
              </span>
              <Button
                type="text"
                size="small"
                icon={<DownOutlined rotate={expandedRows.includes(rowKey(row)) ? 180 : 0} />}
                aria-label={`${row.seriesId} ${row.conference.year} ${MILESTONE_LABELS[row.milestone.type]}の詳細`}
                aria-expanded={expandedRows.includes(rowKey(row))}
                onClick={() => {
                  const key = rowKey(row);
                  setExpandedRows((keys) =>
                    keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key],
                  );
                }}
              >
                詳細
              </Button>
            </Flex>
          ) : (
            <Typography.Text type="secondary" style={{ fontSize: 11 }}>
              {row.conference.name || row.seriesName}
            </Typography.Text>
          )}
        </Flex>
      ),
    },
    {
      ...genreFilters,
      key: "genre",
      title: "ジャンル",
      width: 200,
      render: (_, row) => (
        <Space size={[0, 4]} wrap>
          {getSeriesGenres(row.seriesId).map((genre) => (
            <Tag key={genre} variant="filled">
              {GENRE_LABELS[genre]}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      ...typeFilters,
      key: "type",
      title: "種別",
      width: 140,
      render: (_, row) => <Tag>{MILESTONE_LABELS[row.milestone.type]}</Tag>,
    },
    {
      ...(compact ? typeFilters : {}),
      key: "deadline",
      title: "締切",
      width: compact ? 136 : 190,
      defaultSortOrder: "ascend",
      sorter: (a, b) => Date.parse(a.milestone.at_utc) - Date.parse(b.milestone.at_utc),
      render: (_, row) => {
        const days = daysUntil(row.milestone.at_utc);
        const status = deadlineStatus(days);
        return (
          <Flex vertical gap={3}>
            <Space size={4} wrap={compact}>
              <Tooltip title={new Date(row.milestone.at_utc).toLocaleString("ja-JP")}>
                <time dateTime={row.milestone.at_utc}>{formatDate(row.milestone.at_utc)}</time>
              </Tooltip>
              {row.milestone.is_estimated && <Tag>推定</Tag>}
            </Space>
            <Typography.Text
              type={status === "urgent" ? "danger" : status === "soon" ? "warning" : "secondary"}
              strong={status === "urgent"}
              style={{ fontSize: 12 }}
            >
              {daysLabel(days)}
            </Typography.Text>
          </Flex>
        );
      },
    },
    {
      key: "venue",
      title: "開催地",
      ellipsis: true,
      render: (_, row) => row.conference.venue || "未定",
    },
    {
      key: "conference",
      title: "開催日",
      width: 190,
      sorter: (a, b, order) => {
        const aDate = a.conference.start_at_utc;
        const bDate = b.conference.start_at_utc;
        if (!aDate || !bDate) {
          const missing = Number(!aDate) - Number(!bDate);
          return order === "descend" ? -missing : missing;
        }
        return Date.parse(aDate) - Date.parse(bDate);
      },
      render: (_, row) =>
        row.conference.start_at_utc && row.conference.end_at_utc
          ? formatDateRange(row.conference.start_at_utc, row.conference.end_at_utc)
          : "未定",
    },
  ];

  // An empty saved selection means "none"; Ant Design normally interprets it as "all".
  const dataSource = selectedGenres.length && filters.milestoneFilter.size ? rows : [];

  return (
    <Table<DeadlineRow>
      aria-label="学会の締切・開催地・開催日の一覧"
      size="small"
      columns={
        compact ? columns.filter((col) => col.key === "series" || col.key === "deadline") : columns
      }
      dataSource={dataSource}
      rowKey={rowKey}
      tableLayout={compact ? "fixed" : undefined}
      scroll={compact ? undefined : { x: 1180 }}
      expandable={
        compact
          ? {
              showExpandColumn: false,
              expandedRowKeys: expandedRows,
              expandedRowRender: (row) => (
                <Descriptions
                  size="small"
                  column={1}
                  styles={{
                    label: { flex: "0 0 6em", justifyContent: "space-between" },
                    content: { minWidth: 0 },
                  }}
                  items={[
                    { key: "name", label: "学会", children: row.conference.name || row.seriesName },
                    {
                      key: "genre",
                      label: "ジャンル",
                      children: (
                        <Space size={[0, 4]} wrap>
                          {getSeriesGenres(row.seriesId).map((genre) => (
                            <Tag key={genre}>{GENRE_LABELS[genre]}</Tag>
                          ))}
                        </Space>
                      ),
                    },
                    { key: "venue", label: "開催地", children: row.conference.venue || "未定" },
                    {
                      key: "dates",
                      label: "開催日",
                      children:
                        row.conference.start_at_utc && row.conference.end_at_utc
                          ? formatDateRange(row.conference.start_at_utc, row.conference.end_at_utc)
                          : "未定",
                    },
                    {
                      key: "deadline",
                      label: "締切日時",
                      children: new Date(row.milestone.at_utc).toLocaleString("ja-JP"),
                    },
                  ]}
                />
              ),
            }
          : undefined
      }
      sticky
      pagination={{
        current: page,
        defaultPageSize: 20,
        pageSizeOptions: [20, 50, 100],
        showSizeChanger: true,
        showLessItems: true,
        responsive: true,
        showTotal: (total) => `${total} 件`,
      }}
      locale={{
        emptyText: (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="該当する締切はありません。" />
        ),
      }}
      onChange={(pagination, selected, _sorter, extra) => {
        onPageChange(pagination.current ?? 1);
        if (extra.action === "filter") {
          const selectedGenresValue = selected[compact ? "series" : "genre"];
          const selectedTypesValue = selected[compact ? "deadline" : "type"];
          const genreFilter = new Set(
            ALL_GENRES.filter((genre) => selectedGenresValue?.includes(genre)),
          );
          const genresUnchanged =
            selectedGenres.length === genreFilter.size &&
            selectedGenres.every((genre) => genreFilter.has(genre));
          onFiltersChange({
            // Preserve saved categories absent from the data when only the type filter changes.
            genreFilter: genresUnchanged ? filters.genreFilter : genreFilter,
            milestoneFilter: new Set(
              ALL_TYPES.filter((type) => selectedTypesValue?.includes(type)),
            ),
          });
        }
      }}
    />
  );
}
