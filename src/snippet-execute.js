var questionUrl = document.getElementById("question-url");
questionUrl.onchange = function() {
    var m = questionUrl.value.match(/\/questions\/(\d+)\//);
    var id = m && m[1] || "{{QUESTION_ID}}";
    snippetText.value = template.join(id);
    snippetExecute.contentWindow.execute(id);
};

var template = require("html?interpolate!./snippet-template.html").split("{{QUESTION_ID}}");
var snippetText = document.getElementById("snippet-text");
snippetText.value = template.join("{{QUESTION_ID}}");

var snippetExecute = document.getElementById("snippet-execute");
snippetExecute.onload = function () {
    var snippetExecuteScript = snippetExecute.contentDocument.createElement("script");
    snippetExecuteScript.src = require("assetsByChunkName").table.localPath;
    snippetExecute.contentDocument.head.appendChild(snippetExecuteScript);
    snippetExecute.contentDocument.body.innerHTML = require("html?interpolate!./snippet-execute.html");
}
