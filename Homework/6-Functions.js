/*Homework 6

Task 1: Quasi-Tagged Templates
You are working on a localization library that uses tagged templates to handle multiple languages. Implement a function called `localize` that acts as a quasi-tagged template. 
The function should take a template string and an object containing language-specific translations. It should replace placeholders in the template string with the corresponding translations from the provided object.

*/


const translations = {
	en: {
	    greet: "Hello",
	    intro: "Welcome to our website"
    },
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
};

const language = "en"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localize = (...strings) => {
    const key = strings.flat().find(str => typeof str === 'string' && str.trim() !== '');
    if (key) {
        return translations[language][key];
    }
    return "";
};
const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")
/*

Task 2: Advanced Tagged Template

Create a function called `highlightKeywords` that acts as a tagged template. The function should take a template string and an array of keywords. 
It should highlight each occurrence of a keyword in the template by wrapping it in a `<span>` element with a specific CSS class. Use template literals and string manipulation to achieve this.

*/
const highlightKeywords = (template, keywords) => {
    let i = 0;
    keywords.forEach(element => {
        element = `<span class='highlight'>${element}</span>`;
        template = template.replace(`\${${i}}`, element);
        i++
    });
   return template;
}
const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
/*

Task 3: Multiline Tagged Template
Implement a multiline tagged template function called `multiline` that takes a template string and returns a string with line numbers added at the beginning of each line. 
The line numbers should start from 1 and increase for each line. Preserve the original indentation of each line.

*/
const multiline = (strings, ...values) => {
    let result = '';
    strings.forEach((str, index) => {
        const lines = str.split('\n');
        lines.forEach((line, i) => {
            if (line.trim() !== '') {
                result += `${index + i} ${line}\n`;
            } else {
                result += `${line}\n`;
            }
        });
        if (values[index]) {
            result += values[index];
        }
    });
    return result;
};

const code = multiline`
function add(a, b) {
return a + b;
}
`;

console.log(code);
// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }"

/*
Task 4: Implementing Debounce Function**

Description:
Your task is to implement a debounce function that takes a function and a delay time as arguments. 
The goal of the debounce function is to ensure that the provided function is only executed after the user stops invoking it for the specified delay time.

Instructions:
1. Implement a function called `debounce` that takes two arguments:
- `func`: The function to be debounced.
- `delay`: The delay time (in milliseconds) before the function is executed.
1. The `debounce` function should return a new function that wraps the provided function.
2. When the new function is invoked, it should:
- Clear any existing timeout.
- Set a new timeout to execute the provided function after the specified delay time.
1. Test your `debounce` function by using it to debounce an input event listener. Ensure that the provided function is only called once after the user stops typing for the specified delay time.

Example
*/
function debouncedSearch(query) {
	// Perform search operation with the query
	console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

const inputElement = document.getElementById("search-input");
inputElement.addEventListener("input", event => {
	debouncedSearchHandler(event.target.value);
});


function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


/*
Task 5: Implementing Throttle Function
Your task is to implement a throttle function that takes a function and a time interval as arguments. 
The throttle function should ensure that the provided function is executed at most once within the specified time interval.

Instructions:
1. Implement a function called `throttle` that takes two arguments:
- `func`: The function to be throttled.
- `interval`: The time interval (in milliseconds) within which the function can be executed.
1. The `throttle` function should return a new function that wraps the provided function.
2. When the new function is invoked, it should:
- Check if the specified time interval has elapsed since the last execution of the provided function.
- If the interval has not elapsed, ignore the invocation.
- If the interval has elapsed, execute the provided function and update the last execution timestamp.
1. Test your `throttle` function by using it to throttle a scroll event listener. Ensure that the provided function is executed at most once within the specified time interval during rapid scrolling.
Example*/

function onScroll(event) {
	// Handle scroll event
	console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScrollHandler);

const throttle = (func, interval) => {
    let lastExecution = 0;
    
    return function(...args) {
        const now = Date.now();
        if (now - lastExecution >= interval) {
            func(...args);
            lastExecution = now;
        }
    };
};
/*
Task 6: Currying Function Implementation
Your task is to implement a currying function that converts a given function into a curried version. Currying is a technique in which a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

Instructions
1. Implement a function called `curry` that takes two arguments:
- `func`: The function to be curried.
- `arity`: The number of arguments the original function takes.
1. The `curry` function should return a new curried function.
2. The curried function should keep accepting arguments until it has received the specified number of arguments (`arity`). Once all arguments are received, the original function should be executed with the collected arguments.
3. If the curried function is invoked with fewer arguments than `arity`, it should return a new curried function that waits for the remaining arguments.

Example
*/
function multiply(a, b, c) {
	return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

const curry = (func, arity) => {
    return function curried(...args) {
        if (args.length >= arity) {
            return func(...args);
        } else {
            return function(...moreArgs) {
                return curried(...args, ...moreArgs);
            };
        }
    };
};


console.log("Result:", result); // Expected: 24
/*

Challenge (optional)
Extend your currying function to allow partial application. Implement a special symbol (e.g., `_`) that represents a placeholder for missing arguments. The curried function should be able to accept arguments in any order, while placeholders are used for missing arguments. */

module.exports = {
    task1: {localize},
    task2: {highlightKeywords},
    task3: {multiline},
    task4: {debounce,debouncedSearchHandler},
    task5: {throttle,throttledScrollHandler},
    task6: {curry}
};