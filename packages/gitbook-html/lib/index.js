'use strict';

var ToText = require('./totext');

var htmlParser = {
    summary: require('./summary'),
    glossary: require('./glossary'),
    langs: require('./langs'),
    readme: require('./readme'),
    page: require('./page')
};

// Compose a function with a transform function for the first argument only
function compose(toHTML, fn) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args[0] = toHTML(args[0]);
        return fn.apply(undefined, args);
    };
}

/**
 * Create a GitBook parser from an HTML converter.
 * @param  {Object} toHTML
 *         {Function} [toHTML.inline]
 *         {Function} [toHTML.block]
 * @param  {Object} toText
 * @return {[type]}        [description]
 */
function createParser(toHTML) {
    var toText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var parser = {
        summary: compose(toHTML.block, htmlParser.summary),
        glossary: compose(toHTML.block, htmlParser.glossary),
        langs: compose(toHTML.block, htmlParser.langs),
        readme: compose(toHTML.block, htmlParser.readme),
        page: compose(toHTML.block, htmlParser.page),
        inline: compose(toHTML.inline, htmlParser.page)
    };

    var _toText = new ToText(toText);

    parser.summary.toText = function (summary) {
        return _toText.summary(summary);
    };
    parser.langs.toText = function (langs) {
        return _toText.langs(langs);
    };
    parser.glossary.toText = function (glossary) {
        return _toText.glossary(glossary);
    };

    return parser;
}

module.exports = createParser({
    block: function block(html) {
        return html;
    },
    inline: function inline(html) {
        return html;
    }
});
module.exports.createParser = createParser;
//# sourceMappingURL=index.js.map