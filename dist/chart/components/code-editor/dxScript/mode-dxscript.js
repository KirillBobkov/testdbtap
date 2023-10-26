// @ts-nocheck
/* eslint-disable */
/**
 * Parses the keywordData about dxScript from the server
 * @param {Array} keywordsData
 */
function parseKeywords(keywordsData) {
    const categories = {
        '': [],
        std: [],
        'std.series': [],
        'std.array': [],
        util: [],
        math: [],
        'math.series': [],
        'math.extended': [],
        chart: [],
        'math.array': [],
        const: [],
        type: [],
    };
    function setByCategory(category, value) {
        if (category && !category.includes(value)) {
            category.push(value);
        }
    }
    function toCategoryString(arr) {
        return arr.join('|');
    }
    keywordsData.forEach(module => {
        if (categories[module.moduleName] || module.moduleName === '') {
            module.keywords.forEach(kw => {
                var kwType = kw.keywordType;
                var kwName = kw.keywordName;
                if (kwType === 'FUN') {
                    setByCategory(categories[module.moduleName], kwName);
                    return;
                }
                if (kwType === 'CONST' || kwType === 'SERIES') {
                    setByCategory(categories['const'], kwName);
                    return;
                }
                if (kwType === 'TYPE') {
                    setByCategory(categories['type'], kwName);
                    return;
                }
            });
        }
    });
    for (let key in categories) {
        categories[key] = toCategoryString(categories[key]);
    }
    return categories;
}
export function initDxScriptEditor(keywordsData) {
    if (!keywordsData) {
        return;
    }
    var categories = parseKeywords(keywordsData);
    /**
     * Defines highlighting rules
     */
    ace.define('ace/mode/dxscript_highlight_rules', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/lib/lang', 'ace/mode/text_highlight_rules'], function (require, exports) {
        var oop = require('../lib/oop');
        var TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;
        var keywords = 'in|def|out|set|if|then|else|fun|default|module|import|const';
        var builtinConstants = 'true|false' + '|' + categories.const;
        var langVars = 'out|const';
        var std = categories.std;
        var stdArr = categories['std.array'];
        var stdSeries = categories['std.series'];
        var math = categories.math;
        var mathSeries = categories['math.series'];
        var mathExtended = categories['math.extended'];
        var mathArr = categories['math.array'];
        var types = categories.type;
        var envFunctions = categories.util;
        var DxScriptHighlightRules = function () {
            function comments(next) {
                return [
                    {
                        token: 'comment',
                        regex: /\/\*/,
                        next: [
                            { token: 'comment', regex: '\\*\\/', next: next },
                            { defaultToken: 'comment', caseInsensitive: true },
                        ],
                    },
                    {
                        token: 'comment',
                        regex: '\\/\\/',
                        next: [
                            { token: 'comment', regex: '$|^', next: next },
                            { defaultToken: 'comment', caseInsensitive: true },
                        ],
                    },
                ];
            }
            var idRe = '[a-zA-Z_][a-zA-Z\\d_]*\\b';
            var operatorsMath = '\\*|\\-|\\+|<=|>=|<|>';
            var operatorsLogic = '!|%|&|==|=|!=|&&|\\|\\|';
            var keywordMapper = this.createKeywordMapper({
                'variable.language': langVars,
                keyword: keywords,
                'constant.language': builtinConstants,
                'support.function': [std, stdArr, stdSeries, math, mathExtended, mathArr, mathSeries].join('|'),
                'support.function.editorenv': envFunctions,
                'support.attribute': types,
            }, 'identifier');
            this.$rules = {
                start: [
                    comments('start'),
                    {
                        token: ['keyword', 'text', 'entity.name.function'],
                        regex: /(fun)(\s+)([a-zA-Z_][a-zA-Z\d_]*)/,
                    },
                    {
                        token: 'string',
                        regex: /["](?:[^"\\])*["]/,
                    },
                    {
                        token: 'constant.numeric',
                        regex: /[+-]?\d(?:_*\d)*(?:(?:\.\d(?:_*\d)*)?(?:[eE][+-]?\d(?:_*\d)*)?)?\b/,
                    },
                    {
                        token: 'constant.language.boolean',
                        regex: '(?:true|false)\\b',
                    },
                    {
                        token: keywordMapper,
                        regex: idRe,
                    },
                    {
                        token: 'keyword.operator.logic',
                        regex: operatorsLogic,
                    },
                    {
                        token: 'keyword.operator.math',
                        regex: operatorsMath,
                    },
                    {
                        token: 'lparen',
                        regex: '[[({]',
                    },
                    {
                        token: 'rparen',
                        regex: '[\\])}]',
                    },
                    {
                        token: 'text',
                        regex: '\\s+',
                    },
                ],
            };
            this.normalizeRules();
        };
        oop.inherits(DxScriptHighlightRules, TextHighlightRules);
        exports.DxScriptHighlightRules = DxScriptHighlightRules;
        exports.keywords = keywords;
        exports.builtinConstants = builtinConstants;
        exports.std = std;
        exports.stdArr = stdArr;
        exports.stdSeries = stdSeries;
        exports.math = math;
        exports.mathArr = mathArr;
        exports.mathExtended = mathExtended;
        exports.mathSeries = mathSeries;
        exports.langVars = langVars;
        exports.envFunctions = envFunctions;
        exports.types = types;
    });
    /**
     * Defines matching braces indent/outdent rules
     */
    ace.define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module', 'ace/range'], function (require, exports) {
        var Range = require('../range').Range;
        var MatchingBraceOutdent = function () { };
        (function () {
            this.checkOutdent = function (line, input) {
                if (!/^\s+$/.test(line))
                    return false;
                return /^\s*\}/.test(input);
            };
            this.autoOutdent = function (doc, row) {
                var line = doc.getLine(row);
                var match = line.match(/^(\s*\})/);
                if (!match)
                    return 0;
                var column = match[1].length;
                var openBracePos = doc.findMatchingBracket({
                    row: row,
                    column: column,
                });
                if (!openBracePos || openBracePos.row === row)
                    return 0;
                var indent = this.$getIndent(doc.getLine(openBracePos.row));
                doc.replace(new Range(row, 0, row, column - 2), indent);
            };
            this.$getIndent = function (line) {
                return line.match(/^\s*/)[0];
            };
        }.call(MatchingBraceOutdent.prototype));
        exports.MatchingBraceOutdent = MatchingBraceOutdent;
    });
    /**
     * Defines code folding style
     */
    ace.define('ace/mode/folding/cstyle', ['require', 'exports', 'module', 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'], function (require, exports, module) {
        var oop = require('../../lib/oop');
        var Range = require('../../range').Range;
        var BaseFoldMode = require('./fold_mode').FoldMode;
        var FoldMode = (exports.FoldMode = function (commentRegex) {
            if (commentRegex) {
                this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.start));
                this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.end));
            }
        });
        oop.inherits(FoldMode, BaseFoldMode);
        (function () {
            this.foldingStartMarker = /([{[])[^}\]]*$|^\s*(\/\*)/;
            this.foldingStopMarker = /^[^[{]*([}\]])|^[\s*]*(\*\/)/;
            this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/;
            this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
            this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
            this._getFoldWidgetBase = this.getFoldWidget;
            this.getFoldWidget = function (session, foldStyle, row) {
                var line = session.getLine(row);
                if (this.singleLineBlockCommentRe.test(line)) {
                    if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                        return '';
                }
                var fw = this._getFoldWidgetBase(session, foldStyle, row);
                if (!fw && this.startRegionRe.test(line))
                    return 'start'; // lineCommentRegionStart
                return fw;
            };
            this.getFoldWidgetRange = function (session, foldStyle, row, forceMultiline) {
                var line = session.getLine(row);
                if (this.startRegionRe.test(line))
                    return this.getCommentRegionBlock(session, line, row);
                var match = line.match(this.foldingStartMarker);
                if (match) {
                    var i = match.index;
                    if (match[1])
                        return this.openingBracketBlock(session, match[1], row, i);
                    var range = session.getCommentFoldRange(row, i + match[0].length, 1);
                    if (range && !range.isMultiLine()) {
                        if (forceMultiline) {
                            range = this.getSectionRange(session, row);
                        }
                        else if (foldStyle !== 'all')
                            range = null;
                    }
                    return range;
                }
                if (foldStyle === 'markbegin')
                    return;
                match = line.match(this.foldingStopMarker);
                if (match) {
                    var j = match.index + match[0].length;
                    if (match[1])
                        return this.closingBracketBlock(session, match[1], row, j);
                    return session.getCommentFoldRange(row, j, -1);
                }
            };
            this.getSectionRange = function (session, row) {
                var line = session.getLine(row);
                var startIndent = line.search(/\S/);
                var startRow = row;
                var startColumn = line.length;
                row = row + 1;
                var endRow = row;
                var maxRow = session.getLength();
                while (++row < maxRow) {
                    line = session.getLine(row);
                    var indent = line.search(/\S/);
                    if (indent === -1)
                        continue;
                    if (startIndent > indent)
                        break;
                    var subRange = this.getFoldWidgetRange(session, 'all', row);
                    if (subRange) {
                        if (subRange.start.row <= startRow) {
                            break;
                        }
                        else if (subRange.isMultiLine()) {
                            row = subRange.end.row;
                        }
                        else if (startIndent === indent) {
                            break;
                        }
                    }
                    endRow = row;
                }
                return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
            };
            this.getCommentRegionBlock = function (session, line, row) {
                var startColumn = line.search(/\s*$/);
                var maxRow = session.getLength();
                var startRow = row;
                var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
                var depth = 1;
                while (++row < maxRow) {
                    line = session.getLine(row);
                    var m = re.exec(line);
                    if (!m)
                        continue;
                    if (m[1])
                        depth--;
                    else
                        depth++;
                    if (!depth)
                        break;
                }
                var endRow = row;
                if (endRow > startRow) {
                    return new Range(startRow, startColumn, endRow, line.length);
                }
            };
        }.call(FoldMode.prototype));
    });
    /**
     * Defines snippets for dxScript lang
     */
    ace.define('ace/snippets/dxscript', ['require', 'exports', 'module'], function (require, exports) {
        exports.snippets = [
            {
                name: 'in',
                tabTrigger: 'in',
                content: 'in ${1:name} = ${2:expr}$0',
            },
            {
                name: 'out',
                tabTrigger: 'out',
                content: 'out ${1:name} = ${2:expr}$0',
            },
            {
                name: 'set',
                tabTrigger: 'set',
                content: 'set ${1:name} = ${2:expr}$0',
            },
            {
                name: 'def',
                tabTrigger: 'def',
                content: 'def ${1:name} = ${2:expr}$0',
            },
            {
                name: 'ifs',
                tabTrigger: 'ifs',
                content: 'if (${1:condition}) {\n\t${0}\n} else {\n\t\n}',
            },
            {
                name: 'if',
                tabTrigger: 'if',
                content: 'if (${1:condition}) ${2:onTrue} else ${3:onFalse}',
            },
        ];
        exports.scope = 'dxscript';
    });
    /**
     * Defines dxScript lang mode
     */
    ace.define('ace/mode/dxscript', [
        'require',
        'exports',
        'module',
        'ace/lib/oop',
        'ace/mode/text',
        'ace/mode/dxscript_highlight_rules',
        'ace/mode/matching_brace_outdent',
        'ace/mode/folding/cstyle',
        'ace/range',
    ], function (require, exports) {
        var oop = require('../lib/oop');
        var Range = require('../range').Range;
        var TextMode = require('./text').Mode;
        var HighlightRules = require('./dxscript_highlight_rules');
        var DxScriptHighlightRules = HighlightRules.DxScriptHighlightRules;
        var MatchingBraceOutdent = require('./matching_brace_outdent').MatchingBraceOutdent;
        var CStyleFoldMode = require('./folding/cstyle').FoldMode;
        // disable text completions
        // TextMode.prototype.getCompletions = null;
        var Mode = function () {
            this.HighlightRules = DxScriptHighlightRules;
            this.$outdent = new MatchingBraceOutdent();
            this.foldingRules = new CStyleFoldMode();
        };
        oop.inherits(Mode, TextMode);
        var completionCategories = [
            {
                meta: 'keyword',
                regex: HighlightRules.keywords,
            },
            {
                meta: 'const',
                regex: HighlightRules.builtinConstants,
            },
            {
                meta: 'std',
                regex: HighlightRules.std,
            },
            {
                meta: 'std.array',
                regex: HighlightRules.stdArr,
            },
            {
                meta: 'std.series',
                regex: HighlightRules.stdSeries,
            },
            {
                meta: 'Math',
                regex: HighlightRules.math,
            },
            {
                meta: 'Math.series',
                regex: HighlightRules.mathSeries,
            },
            {
                meta: 'Math.array',
                regex: HighlightRules.mathArr,
            },
            {
                meta: 'Math.extended',
                regex: HighlightRules.mathExtended,
            },
            {
                meta: 'special',
                regex: HighlightRules.langVars,
            },
            {
                meta: 'env',
                regex: HighlightRules.envFunctions,
            },
            {
                meta: 'type',
                regex: HighlightRules.types,
            },
        ];
        var highlightCompletions = completionCategories
            .map(function (category) {
            return category.regex.split('|').map(function (item) {
                return {
                    caption: item,
                    value: item,
                    meta: category.meta,
                };
            });
        })
            .reduce(function (a, b) {
            return a.concat(b);
        }, []);
        var declRegex = new RegExp('(?:in|def|out|set)\\s+([a-zA-Z_0-9\\u00C0-\\u1FFF\\u2C00-\\uD7FF\\w]+)', 'g');
        function getDeclarationsBefore(doc, pos) {
            var textBefore = doc.getTextRange(Range.fromPoints({ row: 0, column: 0 }, pos));
            var splitResult = textBefore.match(declRegex);
            return splitResult
                ? splitResult.map(function (decl) {
                    return decl.match(/\S+$/)[0];
                })
                : [];
        }
        (function () {
            this.foldingRules = 'cStyle';
            this.blockComment = {
                start: '/*',
                end: '*/',
            };
            this.getNextLineIndent = function (state, line, tab) {
                var indent = this.$getIndent(line);
                var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
                if (tokens.length && tokens[tokens.length - 1].type === 'comment') {
                    return indent;
                }
                var match = line.match(/^.*\{\s*$/);
                if (match) {
                    indent += tab;
                }
                return indent;
            };
            this.checkOutdent = function (state, line, input) {
                return this.$outdent.checkOutdent(line, input);
            };
            this.autoOutdent = function (state, doc, row) {
                this.$outdent.autoOutdent(doc, row);
            };
            this.createWorker = function () {
                return null;
            };
            this.getCompletions = function (scope, session, pos, prefix) {
                if (prefix !== '' && !isNaN(prefix)) {
                    // do not autocomplete if prefix is only a number
                    return [];
                }
                if (prefix.match(/\.\s*$/)) {
                    // do not autocomplete if prefix ends with a dot
                    return [];
                }
                var localCompletions = getDeclarationsBefore(session, pos).map(function (decl) {
                    return {
                        caption: decl,
                        value: decl,
                        score: 10,
                        meta: 'local',
                    };
                });
                return highlightCompletions.concat(localCompletions);
            };
            this.$id = 'ace/mode/dxscript';
        }.call(Mode.prototype));
        exports.Mode = Mode;
    });
}
