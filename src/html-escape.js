//source: http://stackoverflow.com/a/5499821/4340086

var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

function replaceTag(tag) {
    return tagsToReplace[tag] || tag;
}

module.exports = str => str.replace(/[&<>]/g, replaceTag);
