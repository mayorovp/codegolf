var tabulate = x => "    " + x;

module.exports = url => [
    '<!-- begin snippet: js hide: true console: false babel: false -->',
    '',
    '<!-- language: lang-html -->',
    '',
    `    <script src="${url}"></script>`,
    require("raw!html-minify!./cssload.html").split("\n").map(tabulate).join("\n"),
    '',
    '<!-- language: lang-css -->',
    require("css?minimize!./cssload.css").toString().split("\n").map(tabulate).join("\n"),
    '',
    '<!-- end snippet -->'
].map(tabulate).join("\n");