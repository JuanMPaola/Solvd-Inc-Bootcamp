/*
Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers 
(negative numbers can be avoided, as all numbers will be positive integers).
Functions to Implement:

String.plus(string): This function should take another string as input and return the result of adding the two strings together.
String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.
String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.
String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

Constraints:
All input and output numbers will be positive integers.
For subtraction, ensure that the first parameter is always greater than the second parameter.
Division should only result in an integer value.

.toLocaleString()
*/

// String.plus(string): This function should take another string as input and return the result of adding the two together.

String.prototype.plus = function (string) {
    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers");

    const maxLength = Math.max(this.length, string.length);
    const paddedThis = this.padStart(maxLength, '0');
    const paddedString = string.padStart(maxLength, '0');

    let carry = 0;
    let result = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        const digitSum = parseInt(paddedThis[i]) + parseInt(paddedString[i]) + carry;
        const digit = digitSum % 10;
        carry = Math.floor(digitSum / 10);
        result = digit.toString() + result;
    }

    if (carry > 0) {
        result = carry.toString() + result;
    }

    return result;
}


// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. 
// Note that the first parameter will always be greater than the second parameter.

String.prototype.minus = function (string) {
    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers");
    
    if (this < string) throw new Error("First string must be greater than or equal to the second string");

    const maxLength = Math.max(this.length, string.length);
    const paddedThis = this.padStart(maxLength, '0');
    const paddedString = string.padStart(maxLength, '0');

    let borrow = 0;
    let result = '';
    for (let i = maxLength - 1; i >= 0; i--) {
        let digitDifference = parseInt(paddedThis[i]) - parseInt(paddedString[i]) - borrow;
        if (digitDifference < 0) {
            digitDifference += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        result = digitDifference.toString() + result;
    }

    // Remove leading zeros
    result = result.replace(/^0+/, '');

    return result || '0';
}

// String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.
String.prototype.divide = function (string) {
    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers");

    if (string === '0') throw new Error("Division by zero is not allowed.");

    const dividend = this;
    const divisor = string;

    let quotient = '';
    let remainder = '0';

    for (let i = 0; i < dividend.length; i++) {
        remainder += dividend[i];
        let count = 0;
        while (remainder >= divisor) {
            remainder = remainder.minus(divisor);
            count++;
        }
        quotient += count;
    }

    // Remove leading zeros from quotient
    quotient = quotient.replace(/^0+/, '');

    return quotient || '0';
}

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

String.prototype.multiply = function (string) {
    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers");

    const num1 = this.split('').map(Number).reverse();
    const num2 = string.split('').map(Number).reverse();

    const result = new Array(num1.length + num2.length).fill(0);

    for (let i = 0; i < num1.length; i++) {
        for (let j = 0; j < num2.length; j++) {
            result[i + j] += num1[i] * num2[j];
            if (result[i + j] >= 10) {
                result[i + j + 1] += Math.floor(result[i + j] / 10);
                result[i + j] %= 10;
            }
        }
    }

    while (result.length > 1 && result[result.length - 1] === 0) {
        result.pop();
    }

    return result.reverse().join('');
}

let x = "100000000000000000000000"
let y = "123"
let z = x.divide(y);

console.log(z); //Result is 0 when it must be 8130081300813008130