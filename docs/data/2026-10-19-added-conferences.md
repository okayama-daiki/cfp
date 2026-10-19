# 2026-10-19 学会追加記録

WADS・COCOON・STACS・MFCS・FSTTCS・SOSA・NeurIPS・SOFSEM を追加した。登録は全59シリーズ・120開催回。分類、シリーズマスター、更新ソースも同期した。

## 確認できた開催回

以下の日付は公式サイトに記載された日付。締切の AoE は UTC に変換して保存し、画面では閲覧者のタイムゾーンで表示する。

| 会議         | 開催日・開催地                                               | 投稿締切                                                        | その他の登録情報・公式出典                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WADS 2025    | 2025-08-11〜13、York University、Toronto                     | Abstract / Full Paper ともに2025-02-21、23:59 AoE               | 通知4月15日（23:59 AoE）。本文12ページ、参考文献込み14ページ。開催日は併催 CCCG を含めた11〜15日ではなく、WADS 固有の11〜13日。[本会議案内](https://sites.google.com/view/cccgwads-2025/home)・[CFP](https://sites.google.com/view/cccgwads-2025/wads-2025)                                           |
| COCOON 2026  | 2026-07-23〜25、Nanyang Technological University、Singapore  | Full Paper：2026-03-04、23:59 AoE                               | 通知5月6日、最終稿5月29日（23:59 AoE）。12ページ、参考文献を含む。[会議案内](https://event.ntu.edu.sg/cocoon2026)・[CFP](https://event.ntu.edu.sg/cocoon2026/pages/call-for-papers)                                                                                                                   |
| STACS 2027   | 2027-03-08〜12、Alte Mensa、Göttingen                        | Full Paper：2026-10-11、23:59 AoE                               | 通知12月22日。最終稿・早期登録は TBA のため未登録。15ページ、表紙・参考文献・付録を除く。[重要日程](https://events.gwdg.de/event/1460/)・[投稿要領](https://events.gwdg.de/event/1460/page/476-submissions)                                                                                           |
| MFCS 2026    | 2026-08-24〜28、Paris                                        | Full Paper：2026-04-24、AoE                                     | 通知6月19日、最終稿6月26日・早期登録7月6日（ともに AoE）。12ページ、表紙・参考文献・付録を除く。前日の Young Researchers Forum は開催日に含めない。[公式サイト・CFP](https://mfcs2026.irif.fr/)                                                                                                       |
| FSTTCS 2026  | 2026-12-16〜18、IIT Delhi、New Delhi                         | Abstract：2026-07-04、Full Paper：2026-07-11、いずれも AoE      | 通知9月15日。15ページ、参考文献・付録を除く。ワークショップを含む14〜20日と本会議を区別した。[公式サイト・CFP](https://www.fsttcs.org.in/2026/)                                                                                                                                                       |
| SOSA 2027    | 2027-01-25〜27、Sheraton Philadelphia Downtown、Philadelphia | Full Paper：2026-08-06、23:59 AoE                               | 早期登録12月21日。通知は「10月上旬」のみなので日付を作らず未登録。ページ数上限なし。[会議案内](https://www.siam.org/conferences-events/siam-conferences/sosa27/)・[CFP](https://www.siam.org/conferences-events/siam-conferences/sosa27/submissions/)                                                 |
| NeurIPS 2026 | 2026-12-06〜12、Sydney（主会場）                             | Abstract：2026-05-04、Full Paper：2026-05-06、いずれも AoE      | 通知9月24日・早期登録10月30日（AoE）。本文9ページ。Atlanta・Paris のサテライトは12月9〜13日で、主会場の日程と混ぜない。[日程](https://neurips.cc/Conferences/2026/Dates)・[CFP](https://neurips.cc/Conferences/2026/CallForPapers)・[投稿要領](https://neurips.cc/Conferences/2026/MainTrackHandbook) |
| SOFSEM 2027  | 2027-02-02〜05、Ioannina                                     | Abstract：2026-09-15、Full Paper：2026-09-18、いずれも23:59 AoE | 通知11月10日、最終稿12月1日・早期登録2027年1月11日（23:59 AoE）。12ページ、参考文献を除く。前日の PhD school とポスター募集は本会議の日程・論文締切に含めない。[CFP](https://sofsem2027.conf.uoi.gr/index.php?id=call-for-papers)                                                                     |

時刻のない通知日は日付のみの情報として UTC 00:00 に置いた。AoE の締切は日末の UTC 翌日11:59:59（日本時間翌日20:59:59）として保存した。会議の開始・終了日は公開された暦日を保持し、締切とは異なりタイムゾーン変換しない。

## 次回の推定

2026-10-19時点で、WADS・COCOON・MFCS の2027年公式 CFP は確認できなかった。次回を見つけるためにシリーズを登録し、過去の公式 CFP を根拠として次の推定を作成した。会場、開催日、CFP、開催回数は未確認なので `null` にした。

| 次回        | 推定の根拠・計算                                                                                              | 投稿締切の推定（AoE）             |
| ----------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| WADS 2027   | [WADS 公式](https://www.wads.org/)に記載された SWAT との交互開催に従い、2025年の各マイルストーンを2年後へ移動 | Abstract / Full Paper：2027-02-21 |
| COCOON 2027 | 2026年の各マイルストーンを1年後へ移動                                                                         | Full Paper：2027-03-04            |
| MFCS 2027   | 2026年の各マイルストーンを1年後へ移動                                                                         | Full Paper：2027-04-24            |

推定開催時期はいずれも現在から12か月以内。推定した10件のマイルストーンすべてに `is_estimated: true` を設定し、根拠となる過去の公式ページを `source_url` に保存した。通知・最終稿・早期登録も、前回に公開されていたものだけを推定した。

FSTTCS・NeurIPS はまず直近の2026年開催を登録した。2027年分は開催が12か月より先になるため、推定締切を作成していない。NeurIPS の2027年開催は[公式開催予定](https://neurips.cc/Conferences/FutureMeetings)で Europe までの案内であり、都市や日程を補完していない。SOFSEM も直近の2027年を登録し、[シリーズ公式](https://www.sofsem.cz/)が予告する2028年開催分の締切は推定していない。

## 更新対象への登録

- `config/conferences.csv` と `data/conferences.json` に8シリーズを追加した。
- `SERIES_GENRES` は WADS を Algorithms & Theory / Computational Geometry、NeurIPS を OR / AI、残りを Algorithms & Theory に分類した。
- 理論系7シリーズを `tcs-conf` の発見対象へ追加した。公式情報として会議ページ・シリーズページを使う既存の仕組みに加え、STACS の投稿要領、SOSA の CFP、SOFSEM の CFP、NeurIPS の年別 CFP・日程ページを登録した。
- STACS・SOSA・SOFSEM の追加ソースは2027年固有のページなので、次年度の公式サイトが公開された時点で更新する。発見用サイトの情報だけを確定情報として登録しない。

取得テストでは SOSA の SIAM ページが HTTP 403、SOFSEM のシリーズページが接続エラーだった。今回の登録情報はブラウザ経由の公式ページで確認済みであり、SOFSEM の2027年 CFP は更新スクリプトからも取得できた。取得に失敗したソースからは自動更新しない。
