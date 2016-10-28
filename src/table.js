var $ = require("jquery/src/core")
require("jquery/src/ajax")
require("jquery/src/ajax/xhr")
require("jquery/src/css")
require("jquery/src/attributes")
require("jquery/src/manipulation")
require("jquery/src/core/parseHTML")

function getAnswers(questionId, answer_filter, page) {
    return $.get('//api.stackexchange.com/2.2/questions/' + questionId + '/answers?page=' + page + '&pagesize=100&order=desc&sort=activity&site=ru.stackoverflow&filter=' + answer_filter)
        .then(data => data.has_more
            ? getAnswers(questionId, answer_filter, page + 1).then(d => data.items.concat(d))
            : data.items
        );
}

function process(items) {
    return items.map(function (item) {
        var matched = item.body.match(/<(h[12])>.*<\/\1>/);

        if (matched) {
            matched = matched[0].replace(/<s>.*?<\/s>/g, '');

            if (matched) {
                matched = matched.match(/<h[12]>\s*?([^<,]+),\s*?(\d+)/);

                return {
                    lang: matched[1],
                    length: +matched[2],
                    score: item.score,
                    link: item.share_link,
                    author: item.owner.display_name,
                    profile_link: item.owner.link,
                    profile_image: item.owner.profile_image
                }
            }
        }

        return {
            lang: "N/A",
            length: "N/A",
            score: "N/A",
            link: item.share_link,
            author: item.owner.display_name,
            profile_link: '#',
            profile_image: 'https://www.gravatar.com/avatar/119ce21acf0f7a4855915d88b21120f5?s=48&d=identicon&r=PG'
        }
    });
}

function fillTemplate(sortedItems) {
    require("style!css!./table.css")
    $(document.body).html(require("html!./table.html"))

    $('#leadership').append(sortedItems.map((item, index) =>
        $('<tr>')
            .append($('<td>').html(index + 1))
            .append($('<td>').html(`<img src='${item.profile_image}' width='25' />`))
            .append($('<td>').html(`<a href='${item.profile_link}'>${item.author}</a>`))
            .append($('<td>', { align: 'center' }).html(item.lang))
            .append($('<td>', { align: 'center' }).html(item.length))
            .append($('<td>', { align: 'center' }).html(item.score))
            .append($('<td>').append($('<a>').attr('href', item.link).text('Link')))
    ));
}

function execute(QUESTION_ID) {
    var ANSWER_FILTER = "!4*SyY(4Kifo3Mz*lT",
        startPage = 1;

    getAnswers(QUESTION_ID, ANSWER_FILTER, startPage)
        .then(process)
        .then(r => r.sort((a, b) => typeof a.length !== 'number' ? 1 : a.length - b.length))
        .then(fillTemplate);
}

window.execute = execute;