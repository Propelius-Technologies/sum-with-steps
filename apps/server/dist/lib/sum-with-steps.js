"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumWithSteps = void 0;
function sumWithSteps(a, b) {
    // Convert the numbers to strings to access each digit
    var aStr = a.toString();
    var bStr = b.toString();
    var carryString = "";
    var sumString = "";
    var steps = [];
    var carry = 0;
    var largestNumberLength = Math.max(aStr.length, bStr.length);
    // Loop through each digit of the two numbers and add them together
    for (var i = 1; i <= largestNumberLength; i++) {
        var aDigit = parseInt(aStr[aStr.length - i], 10) || 0;
        var bDigit = parseInt(bStr[bStr.length - i], 10) || 0;
        var sum = aDigit + bDigit + carry;
        console.log(aDigit, bDigit, carry, "=", sum);
        // If the sum of the digits is greater than 9, then carry over the 1 to the next digit
        if (i === largestNumberLength) {
            sumString = sum + sumString;
        }
        else if (sum > 9) {
            carryString = carryString.length === 0 ? "1_" : 1 + carryString;
            sum = sum % 10;
            sumString = sum + sumString;
            carry = 1;
        }
        else {
            carryString = 0 + carryString;
            sumString = sum + sumString;
            carry = 0;
        }
        // Store the carry value and sum value for each step
        steps.push({ carryString: carryString, sumString: sumString });
        // Reset the carry value for the next step
        carry = carry || 0;
    }
    var result = {};
    for (var i = 0; i < steps.length; i++) {
        result["step" + (i + 1)] = steps[i];
    }
    return result;
}
exports.sumWithSteps = sumWithSteps;
