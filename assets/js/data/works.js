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
    thumbnail: "assets/images/works/tqmirtex.com.png",
    date: "2026-11-17",
    type: "Web",
    stack: ["HTML", "CSS", "JavaScript"],
    body: `
      <p>この<a href="https://tqmirtex.com/">ポートフォリオページ</a>の構築。無駄をそぎ落とした、シンプルで上品なデザインを意識しました。<br>フレームワークを使わずHTML / CSS / JavaScriptのみでシンプルに構築し、軽快な動作と余白を活かしたミニマルなデザインを両立させています。</p>
    `
  },
  {
    id: "file-converter",
    title: "ファイル変換拡張機能",
    thumbnail: "assets/images/works/ファイル変換拡張機能.png",
    date: "2026-11-15",
    type: "Chrome拡張機能",
    stack: ["TypeScript", "Chrome Extension", "Vite"],
    body: `
      <p>ファイル変換をローカルで完結させることができるChrome拡張機能です。<br>サイドパネルにファイルをドラッグ&ドロップするか、コピーしたファイルをペーストし、変換先のファイル形式を選択します。また、Chromeの読み取り権限を与えることで、画像ファイル上で右クリックをすると直接変換して保存することができます。<br><a href="https://github.com/tqmirtex/chromium-converter">こちら</a>からダウンロードが可能です。</p>
    `
  },
  
];
