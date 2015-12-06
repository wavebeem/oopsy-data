var chalk = require("chalk");

function fromIndices(code, indices, opts) {
    return fromLocations(code, toLocations(code, indices), opts);
}

function fromLocations(code, locations, opts) {
    opts = opts || {};
    var lines = toLines(code);
    var locs = locations.slice().sort(locationCmp);
    var ret = [];
    locations.forEach(function(loc) {
        ret.push({
            line: loc.line,
            column: loc.column,
            context: extract(lines[loc.line - 1], loc.column, opts)
        });
    });
    return ret;
}

function arrow(n) {
    var s = "";
    var m = n - 1;
    for (var i = 0; i < m; i++) {
        s += "-";
    }
    return s + "^";
}

function extract(text, columnNo, opts) {
    var C = new chalk.constructor({
        enabled: Boolean(opts.color)
    });

    var coloredText = C.bold(text);
    var coloredArrow = C.bold.red(arrow(columnNo));

    return coloredText + "\n" + coloredArrow;
}

function locationCmp(a, b) {
    if (a.line < b.line) {
        return -1;
    } else if (a.line === b.line) {
        return indexCmp(a.column, b.column);
    } else {
        return 1;
    }
}

function indexCmp(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function toLocations(code, indices) {
    var line = 1;
    var col = 1;
    var i = 0;
    var j = 0;
    var idx = indices.slice().sort(indexCmp);
    var n = code.length;
    var m = idx.length;
    var ret = [];
    while (i < n && j < m) {
        if (idx[j] === i) {
            ret.push({line: line, column: col});
            j++;
        }

        if (code[i] === "\n") {
            i++;
            line++;
            col = 1;
        } else if (code.slice(i, i + 2) === "\r\n") {
            i += 2;
            line++;
            col = 1;
        } else {
            i++;
            col++;
        }
    }
    return ret;
}

function toLines(code) {
    var lines = code.split(/\r?\n/);
    if (lines[lines.length - 1] === "") {
        lines.pop();
    }
    return lines;
}

exports.fromIndices = fromIndices;
exports.fromLocations = fromLocations;
