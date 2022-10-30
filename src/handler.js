"use strict";
exports.__esModule = true;
exports.s3TestFunc = exports.handlerText = void 0;
var handlerText_1 = require("@functions/handlerText");
exports.handlerText = handlerText_1["default"];
var s3TestFunc = require("../functions/s3Test").s3TestFunc;
exports.s3TestFunc = s3TestFunc;
