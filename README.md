# oopsy-data

This package is designed to help you provide context for source code error
messages.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By
participating in this project you agree to abide by its terms.

## API

`fromIndices(code, indices, options)`

`fromLocations(code, locations, options)`

There are two functions, `fromIndices`, and `fromLocations`. Both of them take
the source code text as a string for the first parameter. The second parameter
is either a list of string indices (e.g. `[{index: 0}, {index: 5}`) or a list of
`{line, column}` objects (e.g. `[{line: 1, column: 3}, {line: 3, column: 89}]`).

If the objects you pass have a property `data`, that will be passed along in the
return values.

They both accept an optional third parameter which is an options object. The
only key for the options object is `color`, which can have the values true or
false. This controls using the `chalk` library to colorize output.

NOTE: The library considers both LF (Linux/OS X) and CRLF (Windows)

## Example: No color, using indices:

```javascript
var OopsyData = require("oopsy-data");
var code =
    "hello world\n" +
    "this is me and cool\n" +
    "nice nice nice\n";
var indices = [
    {index: 0},
    {index: 2},
    {index: 13}
];
var data = OopsyData.fromIndices(code, indices);
data.forEach(function(d) {
    console.log("Line:", d.line, "Column:", d.column);
    console.log(d.context);
});
```

## Example: Color, using locations:

```javascript
var OopsyData = require("oopsy-data");
var code =
    "hello world\n" +
    "this is me and cool\n" +
    "nice nice nice\n";
var indices = [
    {line: 1, column: 1},
    {line: 2, column: 7},
    {line: 3, column: 10}
];
var data = OopsyData.fromLocations(code, locations, {color: true});
data.forEach(function(d) {
    console.log("Line:", d.line, "Column:", d.column);
    console.log(d.context);
});
```
