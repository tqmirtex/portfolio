/**
 * Works data
 * ------------------------------------------------------------
 * Add a new object to this array to publish a work.
 * Items are sorted by date (newest first) automatically.
 *
 *   id        : unique slug used in the URL (works/detail.html?id=...)
 *   title     : title of the work
 *   thumbnail : image path relative to the site root
 *   date      : "YYYY-MM-DD"
 *   type      : category (e.g. "Web", "App", "Hardware")
 *   stack     : array of technologies
 *   body      : HTML string for the detail page
 *
 * NOTE: 「tqmirtex.com」以外はすべてサンプルです。
 *       Replace it with your own works.
 */
window.WORKS = [
  {
    id: "tqmirtex-com",
    title: "tqmirtex.com",
    thumbnail: "assets/images/works/tqmirtex-com.svg",
    date: "2026-11-17",
    type: "Web",
    stack: ["HTML", "CSS", "JavaScript"],
    body: `
      <p>このサイトです。フレームワークやビルドツールを使わずに作った小さな静的ポートフォリオで、GitHub Pagesで公開しています。</p>
      <h2>メモ</h2>
      <p>実績とブログ記事は素のJavaScriptのデータファイルで管理しており、追加するときは1つのファイルを編集するだけで済みます。</p>
      <ul>
        <li>静的なHTML・CSS・素のJavaScript</li>
        <li>レスポンシブ対応のレイアウトとページ送り</li>
        <li>訪問者のメールアプリでメールを作成するお問い合わせフォーム</li>
      </ul>
    `
  },
  {
    id: "sample-circuit-simulator",
    title: "Circuit Simulator",
    thumbnail: "assets/images/works/sample-02.svg",
    date: "2026-08-02",
    type: "App",
    stack: ["TypeScript", "Canvas API"],
    body: `
      <p>サンプルです。制作の背景、作ったもの、学んだことを書きます。</p>
      <h2>概要</h2>
      <p>簡単な回路を描いて、電圧や電流をリアルタイムで観察できるブラウザ上のツールです。</p>
    `
  },
  {
    id: "sample-sensor-logger",
    title: "Sensor Logger",
    thumbnail: "assets/images/works/sample-03.svg",
    date: "2026-05-20",
    type: "Hardware",
    stack: ["C++", "ESP32", "Python"],
    body: `
      <p>サンプルです。温度と湿度を記録して可視化する、マイコンを使ったロガーです。</p>
    `
  },
  {
    id: "sample-cli-tool",
    title: "Dotfiles Manager",
    thumbnail: "assets/images/works/sample-04.svg",
    date: "2026-02-11",
    type: "Tool",
    stack: ["Go"],
    body: `
      <p>サンプルです。複数のマシン間で設定ファイルを同期する小さなコマンドラインツールです。</p>
    `
  }
];
