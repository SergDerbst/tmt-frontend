"use strict";
var $ = require("jquery");
var content_1 = require("./content");
require("./message.scss");
$(function () {
    $("<div id='message'>")
        .text(content_1["default"] + " barotsch")
        .appendTo("body");
});
//# sourceMappingURL=index.js.map