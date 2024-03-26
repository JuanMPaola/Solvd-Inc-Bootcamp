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
*/

// String.plus(string): This function should take another string as input and return the result of adding the two together.

String.prototype.plus = function (string) {

    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers")


    let result = parseInt(this) + parseInt(string);
    return result.toString();

}


// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. 
// Note that the first parameter will always be greater than the second parameter.

String.prototype.minus = function (string) {

    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be positive string-positive integers")

    if (this < string) throw new Error("First string must be greater than the second string");


    let result = parseInt(this) - parseInt(string);
    return result.toString();

}

// String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.

String.prototype.divide = function (string) {

    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers")


    if (string == 0) throw new Error("Division by zero is not allowed.");

    let dividend = parseInt(this);
    let divisor = parseInt(string);

    let result = Math.floor(dividend / divisor);
    return result.toString();

}

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

String.prototype.multiply = function (string) {

    if (!/^\d+$/.test(this) || !/^\d+$/.test(string)) throw new Error("Inputs must be string-positive integers")


    let result = parseInt(this) * parseInt(string);
    return result.toString();

}
