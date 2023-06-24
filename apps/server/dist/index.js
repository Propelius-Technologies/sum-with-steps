"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sum_with_steps_1 = require("./lib/sum-with-steps");
var app = (0, express_1.default)();
app.post('/sum', function (req, res) {
    var _a = req.body, a = _a.a, b = _a.b;
    // validate a and b to be positive integers
    if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) {
        return res.status(400).send('Invalid input');
    }
    var sum = a + b;
    var result = {
        sum: sum,
        steps: (0, sum_with_steps_1.sumWithSteps)(a, b),
    };
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
