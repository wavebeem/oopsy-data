var OopsyData = require("./api");

var code =
    "hello world\n" +
    "this is me and cool\n" +
    "nice nice nice\n";
var indices = [
    {index: 0, data: "foo"},
    {index: 2, data: "bar"},
    {index: 13, data: "baz"}
];
var data = OopsyData.fromIndices(code, indices);
data.forEach(function(d) {
    console.log("Line:", d.line, "Column:", d.column);
    console.log(d.context);
    console.log(d.data);
});
