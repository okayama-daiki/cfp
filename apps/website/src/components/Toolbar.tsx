import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Segmented } from "antd";
import type { ViewFilter } from "../types.ts";

interface Props {
  query: string;
  onQueryChange: (query: string) => void;
  timeFilter: ViewFilter;
  onTimeFilterChange: (filter: ViewFilter) => void;
  onReset: () => void;
}

const TIME_FILTERS: { value: ViewFilter; label: string }[] = [
  { value: "upcoming", label: "今後の締切" },
  { value: "all", label: "すべて" },
  { value: "past", label: "過去の締切" },
];

export function Toolbar({ query, onQueryChange, timeFilter, onTimeFilterChange, onReset }: Props) {
  return (
    <Flex gap={12} align="center" justify="space-between" wrap>
      <Input
        aria-label="学会の締切を検索"
        placeholder="学会名・開催地などで検索"
        prefix={<SearchOutlined />}
        allowClear
        value={query}
        onChange={(event) => onQueryChange(event.currentTarget.value)}
        style={{ flex: "1 1 260px", maxWidth: 480 }}
      />
      <Flex gap={8} align="center" wrap>
        <Segmented<ViewFilter>
          aria-label="締切の期間"
          options={TIME_FILTERS}
          value={timeFilter}
          onChange={onTimeFilterChange}
        />
        <Button icon={<ReloadOutlined />} onClick={onReset}>
          条件をリセット
        </Button>
      </Flex>
    </Flex>
  );
}
