/*
Homework 2
Task:
Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:

addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. 
The function should return the result of the addition. If the addition is not possible, it should throw an error.

stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. 
For other types, use the appropriate built-in methods or operations to convert them to strings.

invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.

convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. 
For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.

coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. 
The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.

(Optional) Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types.
You are encouraged to explore complex scenarios and push the limits of type conversion.

Number: Represents both integer and floating-point numbers.
String: Represents a sequence of characters.
Boolean: Represents a logical entity and can have two values: true or false.
Undefined: Represents an uninitialized variable or a variable without any value.
Null: Represents the intentional absence of any object value.
Symbol: Represents a unique identifier.

Object: A collection of key-value pairs.
Array: A special kind of object that represents a list-like collection of elements.
Function: A callable object.
Date: Represents a date and time.
RegExp: Represents a regular expression.
*/



const stringifyValue = (arg) =>
{
    let type = typeof arg;
    if (type === "string") return arg;
    if (type === "bigint" || type === "number" || type === "undefined" || type === "boolean" || type === "symbol") return arg.toString();
    else return JSON.stringify(arg);
}

const invertBoolean = (arg) => 
{
   if (typeof arg != "boolean") throw new Error("Input must be a boolean");
   return !arg
}

const convertToNumber = (arg) =>
{
  if(isNaN(Number(arg))) throw new Error ("It is not possible to convert the input into a number");
  return Number(arg)
}

