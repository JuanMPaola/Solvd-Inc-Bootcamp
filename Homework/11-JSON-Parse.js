/* 
Homework 11

Implement a simplified version of the `JSON.parse` function in JavaScript using regular expressions. 
This assignment will test your understanding of JSON syntax and your ability to use regular expressions for pattern matching.

Part 1: JSON Syntax Understanding

1. JSON Syntax: Begin by revisiting the JSON (JavaScript Object Notation) syntax. Make sure you understand the basic structure of JSON objects, arrays, strings, numbers, booleans, and null values.
2. Parsing Rules: Familiarize yourself with the rules for parsing JSON, including how to handle nested objects and arrays.

Part 2: JSON Parser Implementation

1. Implement JSON.parse: Create a JavaScript function called `myJSONParse` that takes a JSON-formatted string as input and returns the corresponding JavaScript object. You should use regular expressions to tokenize and parse the input string.
2. Tokenization: Implement tokenization by using regular expressions to identify JSON elements (objects, arrays, strings, numbers, booleans, null, etc.) in the input string.
3. Parsing: Implement a parsing algorithm that processes the tokens generated in the previous step and constructs the corresponding JavaScript object.
4. Error Handling: Ensure your implementation handles common JSON syntax errors gracefully and provides informative error messages when parsing fails.
5. Testing: Test your `myJSONParse` function with various JSON strings to ensure it can correctly parse them into JavaScript objects.

Part 3: Documentation and Reflection

1. Documentation: Provide clear comments and documentation in your code to explain how your `myJSONParse` function works and how you used regular expressions.
2. Reflect: Write a brief reflection on your experience implementing a JSON parser with regular expressions. Discuss any challenges you encountered and how you addressed them.

Submission

Submit your JavaScript code for the `myJSONParse` function, along with any test cases you used to validate its correctness. Include the documentation and reflection as well.

Example

Here's a simplified example structure of what your code might look like:
 */
/* ```jsx
function myJSONParse(jsonString) {
  // Implement JSON parsing with regular expressions...
}

const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = myJSONParse(jsonString);

console.log(jsonObject); // Should output the parsed JavaScript object.
``` */

const myJSONParse = (jsonString) => {
  // Tokenizes the input JSON string into an array of tokens
  const tokenize = (str) => {
    const tokens = [];
    const regex = /(\s+|true|false|null|[{}\[\],:]|"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
    let match;
    while (match = regex.exec(str)) {
      if (!/^\s+$/.test(match[0])) { // Ignore whitespace
        tokens.push(match[0]);
      }
    }
    return tokens;
  };

  // Parses a value token based on its type
  const parseValue = (tokens) => {
    const token = tokens.shift();
    switch (token) {
      case '{':
        return parseObject(tokens);
      case '[':
        return parseArray(tokens);
      case 'true':
        return true;
      case 'false':
        return false;
      case 'null':
        return null;
      default:
        if (/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(token)) {
          return parseFloat(token);
        } else if (/^".*"$/.test(token)) {
          return token.slice(1, -1).replace(/\\(.)/g, '$1'); // Unescape characters
        }
        throw new SyntaxError(`Unexpected token: ${token}`);
    }
  };

  // Parses an object token
  const parseObject = (tokens) => {
    const obj = {};
    let key;
    while (tokens[0] !== '}') {
      if (tokens[0] === ',') {
        tokens.shift(); // Skip commas
      }
      key = parseValue(tokens);
      if (typeof key !== 'string') {
        throw new SyntaxError('Object keys must be strings');
      }
      if (tokens.shift() !== ':') {
        throw new SyntaxError('Expected colon after key in object');
      }
      obj[key] = parseValue(tokens);
    }
    tokens.shift(); // Consume the closing '}'
    return obj;
  };

  // Parses an array token
  const parseArray = (tokens) => {
    const arr = [];
    while (tokens[0] !== ']') {
      if (tokens[0] === ',') {
        tokens.shift(); // Skip commas
      }
      arr.push(parseValue(tokens));
    }
    tokens.shift(); // Consume the closing ']'
    return arr;
  };

  // Tokenize the input string and parse the tokens into a JavaScript object
  const tokens = tokenize(jsonString);
  const result = parseValue(tokens);

  // Ensure there are no leftover tokens
  if (tokens.length !== 0) {
    throw new SyntaxError('Unexpected extra tokens');
  }

  return result;
};


let jsonString = `{
  "string": "Hello, world!",
  "number": 123.45,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullValue": null,
  "array": [1, "two", true, null, {"nestedObject": "value"}, [1, 2, 3]],
  "object": {
    "nestedString": "Nested",
    "nestedNumber": 987,
    "nestedBoolean": false,
    "nestedNull": null,
    "nestedArray": ["a", "b", "c"],
    "nestedObject": {
      "doubleNestedString": "Double Nested",
      "doubleNestedNumber": 456
    }
  }
}`

console.log(myJSONParse(jsonString));

// DOCUMENTATION:
/*  To make this function:

Tokenization:
First important part is the const regex. This first regular expresion, is used to convert into tokens all elements keys, and values of the string json to then push all into an array (another reg exp is used to ignore whitespace too).

ParseValue:
Tokens go inside parseValue function, to convert each one into a Js type beacuse all is a string yet. Then, a switch helps to indetify all the cases. To manage nested objectes and arrays there is a special function.

Objects:
In object case, the parseObject function use a while that determinates if the object ends. Inside the while the function recongnize what is the porperty name, and also parse the value to add the key value pair to an object that later (when all properties done) returns.

Arrays:
For parseArray function, is more simple beacuse you only need to parse values not keys and it is done. In this case the while compares with "]" searching the end of the array and there is also a if that skips ",". */

// REFLECT:
/* 
Making this parse function guive me a clear perspective of how data is parse between Json type files and objects. 
The first challenging part for me was to get the correct reg exp, hopefully I found one that works perfectly after makien few tries and a bit of searching. 
Also a challengin part was the nested object and arrays. I had to create a particular function for those two types, something I wasn´t expected to do. In the end works well :).
*/