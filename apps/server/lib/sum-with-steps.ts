interface Step {
  carryString: string;
  sumString: string;
}

export function sumWithSteps(a: number, b: number): Record<string, Step> {
  // Convert the numbers to strings to access each digit
  const aStr = a.toString();
  const bStr = b.toString();

  let carryString = "";
  let sumString = "";
  let steps: Step[] = [];

  let carry = 0;

  const largestNumberLength = Math.max(aStr.length, bStr.length);

  // Loop through each digit of the two numbers and add them together
  for (let i = 1; i <= largestNumberLength; i++) {
    const aDigit = parseInt(aStr[aStr.length - i], 10) || 0;
    const bDigit = parseInt(bStr[bStr.length - i], 10) || 0;

    let sum = aDigit + bDigit + carry;

    // If the sum of the digits is greater than 9, then carry over the 1 to the next digit
    if (i === largestNumberLength) {
      sumString = sum + sumString;
    } else if (sum > 9) {
      carryString = carryString.length === 0 ? "1_" : 1 + carryString;
      sum = sum % 10;
      sumString = sum + sumString;
      carry = 1;
    } else {
      carryString = 0 + carryString;
      sumString = sum + sumString;
      carry = 0;
    }

    // Store the carry value and sum value for each step
    steps.push({ carryString: carryString, sumString: sumString });

    // Reset the carry value for the next step
    carry = carry || 0;
  }

  let result: Record<string, Step> = {};
  for (let i = 0; i < steps.length; i++) {
    result["step" + (i + 1)] = steps[i];
  }

  return result;
}
