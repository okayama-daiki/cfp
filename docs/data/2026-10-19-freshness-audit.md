# 2026-10-19 依存関係・学会情報の確認

## 依存関係

インストール済みの直接依存をレジストリと照合し、安定版の最新版へ更新した。
`vp outdated -r --format json` の結果は `{}`（更新対象なし）。

| パッケージ         | 確認後のバージョン |
| ------------------ | ------------------ |
| Ant Design         | 6.6.6              |
| @ant-design/icons  | 6.3.4              |
| Preact             | 11.0.1             |
| TypeScript         | 7.0.2              |
| Vite+ / Vite+ Core | 1.3.0              |

[Vite+ の移行手順](https://viteplus.dev/guide/migrate)と
[Preact 11 の移行ガイド](https://preactjs.com/guide/v11/upgrade-guide/)を確認した。
Node.js の要件も Vite+ に合わせて更新した。列幅・余白・配色・フォントの設定は変更していない。

## 確認範囲

- 対象データは 51 シリーズ・109 開催分。更新前の `generated_at` は `2026-10-06T04:30:15Z`。
- `automation:check-sources -- --all` で 128 回の取得を試行し、113 回成功、15 回失敗。同一 URL の重複取得を含む。
- 内訳は公式参照先 91 回、発見用の参照先 37 回。取得成功だけで内容が最新と判定したわけではない。
- 開催予定の会議、推定値、自動更新候補を中心に、公式の開催案内・CFP・投稿案内を個別に照合した。終了済みの全開催について全項目を再調査したものではない。
- データの書き込みは `data/conferences.json` のみ。公開用 JSON とのハードリンクを確認した。

## 反映した内容

| 対象         | 修正                                                                                   | 根拠                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| COMP-2026-12 | 発表申込締切を 10 月 8 日から延長後の 10 月 15 日へ修正                                | [公式研究会ページ](https://www.ieice.org/~comp/)                                                                                    |
| IWOCA-2027   | 早期登録 2027 年 5 月 5 日、後期登録 6 月 15 日を追加                                  | [公式日程](https://kam.mff.cuni.cz/conferences/iwoca27/)、[登録案内](https://kam.mff.cuni.cz/conferences/iwoca27/registration.html) |
| RAMP-2026    | 早期参加申込の 10 月 31 日を追加                                                       | [公式参加申込案内](https://orsj.org/ramp/ramp2026/)                                                                                 |
| ISMP         | シリーズ参照先を Mathematical Optimization Society の会議ページへ修正。設定 CSV も同期 | [主催学会](https://mathopt.org/meetings)、[ISMP 2027](https://ismp2027.mathopt.nl/)                                                 |
| EURO-2027    | 404 になった通知日・登録期限の根拠リンクを現行の日程ページへ修正                       | [Important Days](https://euro2027athens.com/important-days/)                                                                        |
| JCDCGGG-2026 | 公式の 9 月 7〜10 日を UTC の日付部分に統一して格納                                    | [公式開催案内](https://sites.google.com/view/jcdcggg2026)                                                                           |

IWOCA の締切は [CFP の AoE 指定](https://kam.mff.cuni.cz/conferences/iwoca27/cfp.html)に従い、日末を UTC に変換した。
COMP と RAMP の日付のみの国内締切は、既存の国内締切と同様に JST の日末として格納した。公式ページには締切時刻の指定がない。
RAMP の通常参加申込は会期中の 11 月 20 日まで続く。現在のデータ検証は会期開始後のマイルストーンを許容しないため、今回は早期期限を収録した。

画面では、開催期間を閲覧者のタイムゾーンに変換すると終了日が翌日になる問題も修正した。
例えば SIROCCO 2027 の 6 月 2〜4 日が、日本時間では 6 月 2〜5 日と表示されていた。
開催日は暦日として表示し、投稿締切は引き続き閲覧者の現地日時に変換する。

## 未確定・要確認

- **EURO 2027 の要旨締切は公式内で不一致。** [CFP](https://euro2027athens.com/call-for-abstracts/) は 2027 年 2 月 27 日 23:59 GMT、[投稿案内](https://euro2027athens.com/abstract-submission/)と[日程表](https://euro2027athens.com/important-days/)は 2 月 28 日。断定して上書きせず、既存の早い方の値と CFP の根拠を維持した。
- **ICALP 2027 の収録済み締切は Track B 第 1 ラウンド。** [Track B 公式](https://icalp.uj.edu.pl/track-b/)で 2026 年 9 月 15 日 AoE と通知日 12 月 8 日を確認した。[EATCS の案内](https://eatcs.org/index.php/future-icalps)にある Track A / Track B 第 2 ラウンドの 2027 年 2 月の締切は日が未公表。既存の Track B 第 1 ラウンドの日付を全トラック共通とは扱えない。
- FOCS-2027、ISSAC-2027、AAAC-2027、ORSJ-spring-2027、CP-2027 の **18 件のマイルストーンは推定のまま**。開催案内やシリーズページがあっても、当該回の正式な締切は確認できなかった。
- PODC-2027、SoCG-2027 など、開催日は発表済みでも CFP の締切がまだ確認できない項目は未定のまま。
- 403・404・タイムアウトによる取得失敗があり、全件が最新とは断定できない。SODA、ACDA、IPCO、INFORMS、COMP は別途公式ページを閲覧して補った。LA-winter は年度の異なる実際の開催案内 URL を確認した。
- 自動診断は各シリーズの代表 1 件を選ぶため、FOCS は推定の 2027 年、EURO は空の 2026 年レコードが選ばれた。FOCS-2026、EURO-2027 / 2028、COMP-2026-12、INFORMS-2026 は追加で照合した。

## 検証

- JSON 全件検証: 成功。
- `vp check`: フォーマット・lint・型検査が成功。
- `vp test`: 55 件成功。開催日の表示を日本・米国・UTC と年またぎで検証した。
- `vp run website#build`: 成功。
- Chrome で更新後の表を描画し、列幅や余白を含むレイアウトと開催日の表示を確認した。

## 自動診断の内訳

以下は個別の内容保証ではなく、代表レコードの選択と取得可否の記録。取得失敗には未公開 URL も含む。

| シリーズ    | 自動診断の代表レコード | 公式取得 成功/試行 | 取得失敗                                              |
| ----------- | ---------------------- | ------------------ | ----------------------------------------------------- |
| STOC        | STOC-2027              | 2/2                | なし                                                  |
| FOCS        | FOCS-2027              | 1/1                | なし                                                  |
| SODA        | SODA-2027              | 0/2                | conference-page: 403、series-home: 403                |
| ICALP       | ICALP-2027             | 2/2                | なし                                                  |
| ESA         | なし（シリーズページ） | 1/1                | なし                                                  |
| ISAAC       | ISAAC-2026             | 2/2                | なし                                                  |
| SoCG        | SoCG-2027              | 2/2                | なし                                                  |
| CCCG        | なし（シリーズページ） | 1/1                | なし                                                  |
| ITCS        | ITCS-2027              | 1/1                | なし                                                  |
| SWAT        | SWAT-2028              | 2/2                | なし                                                  |
| ISSAC       | ISSAC-2027             | 1/1                | なし                                                  |
| WALCOM      | WALCOM-2027            | 1/2                | series-home: fetch failed                             |
| AAAC        | AAAC-2027              | 1/1                | なし                                                  |
| WAAC        | なし（シリーズページ） | 1/1                | なし                                                  |
| APPROX      | なし（シリーズページ） | 1/1                | なし                                                  |
| RANDOM      | なし（シリーズページ） | 1/1                | なし                                                  |
| IPEC        | なし（シリーズページ） | 1/1                | なし                                                  |
| WAOA        | なし（シリーズページ） | 1/1                | なし                                                  |
| ACDA        | ACDA-2027              | 0/2                | conference-page: 403、series-home: 403                |
| PODC        | PODC-2027              | 2/2                | なし                                                  |
| DISC        | DISC-2026              | 2/2                | なし                                                  |
| SPAA        | SPAA-2027              | 2/2                | なし                                                  |
| SIROCCO     | SIROCCO-2027           | 2/2                | なし                                                  |
| OPODIS      | OPODIS-2026            | 2/2                | なし                                                  |
| IPCO        | IPCO-2027              | 1/2                | conference-page: 403                                  |
| ISMP        | ISMP-2027              | 2/2                | なし                                                  |
| INFORMS     | INFORMS-2027           | 0/2                | conference-page: 403、series-home: 403                |
| EURO        | EURO-2026              | 1/1                | なし                                                  |
| MIP         | なし（シリーズページ） | 1/1                | なし                                                  |
| MOPTA       | MOPTA-2027             | 2/2                | なし                                                  |
| CPAIOR      | CPAIOR-2027            | 2/2                | なし                                                  |
| IFORS       | IFORS-2029             | 0/1                | conference-page: 307                                  |
| ALGO        | なし（シリーズページ） | 1/1                | なし                                                  |
| SIGAL       | SIGAL-210              | 2/2                | なし                                                  |
| COMP        | COMP-2026-10           | 0/2                | ieice-comp: 403、ieice-ken: 403、conference-page: 403 |
| JCDCGGG     | なし（シリーズページ） | 1/1                | なし                                                  |
| LA-summer   | なし（シリーズページ） | 2/2                | なし                                                  |
| LA-winter   | LA-winter-2027         | 2/3                | la-winter: 404                                        |
| FIT         | FIT-2027               | 2/2                | なし                                                  |
| COSS        | なし（シリーズページ） | 2/2                | なし                                                  |
| JSIAM       | なし（シリーズページ） | 2/2                | なし                                                  |
| ORSJ-spring | ORSJ-spring-2027       | 2/3                | orsj-spring: 404                                      |
| ORSJ-autumn | なし（シリーズページ） | 2/2                | なし                                                  |
| RAMP        | RAMP-2026              | 3/3                | なし                                                  |
| TSUKUBA     | TSUKUBA-2026           | 1/1                | なし                                                  |
| AAAI        | AAAI-2027              | 2/2                | なし                                                  |
| IWOCA       | IWOCA-2027             | 3/3                | なし                                                  |
| LATIN       | LATIN-2028             | 1/1                | なし                                                  |
| IJCAI       | IJCAI-2027             | 2/2                | なし                                                  |
| ICAPS       | ICAPS-2027             | 4/4                | なし                                                  |
| CP          | CP-2027                | 2/3                | cp-year: fetch failed                                 |
