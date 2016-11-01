var ko = require("knockout");
ko.options.deferUpdates = true;

ko.event = function () {
    ko.subscribable.call(event_f);
    return event_f;

    function event_f(data, event) {
        event_f.notifySubscribers(event);
    }
}

var site_dict = new Map();

var vm = {
    site_id: ko.observable("ru.stackoverflow.com"),
    question_number: ko.observable(""),

    urlChanged: ko.event(),
    resultFrameLoaded: ko.event(),

    errorResult: ko.observable(),
    executing: ko.observable(false),
};

vm.urlChanged.subscribe(e => {
    var m = e.target.value.match(/\/\/([\da-z\.-]+)\/questions\/(\d+)\//);

    if (m && m[1]) vm.site_id(m[1]);
    if (m && m[2]) vm.question_number(m[2]);
});

vm.snippetText = ko.pureComputed(() =>
    require("html?interpolate!./snippet-template.html")
    .split("{{QUESTION_ID}}").join(vm.question_number() || "{{QUESTION_ID}}")
    .split("{{SITE_ID}}").join(vm.site_id())
);

var resultFrame = ko.observable();
vm.resultFrameLoaded.subscribe(e => {
    var frame = e.target;

    var script = frame.contentDocument.createElement("script");
    script.src = require("assetsByChunkName").table.localPath;
    frame.contentDocument.head.appendChild(script);

    resultFrame(frame);
});

ko.computed(() => {
    if (!resultFrame() || !vm.site_id() || !vm.question_number()) return;
    if (vm.executing.peek()) return vm.executing();
    vm.executing(true);

    resultFrame().contentDocument.body.innerHTML = require("html?interpolate!./snippet-execute.html");

    var executeResult = resultFrame().contentWindow.execute(vm.site_id(), vm.question_number());

    Promise.resolve(executeResult)
        .then(() => vm.errorResult(null), e => vm.errorResult(e.responseText || e || "Неизвестная ошибка"))
        .then(() => vm.executing(false));
}).extend({ rateLimit: 100 });

document.addEventListener("DOMContentLoaded", () => ko.applyBindings(vm));
