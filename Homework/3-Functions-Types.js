/*Homework 3
Deadline: 22 April

Task 1: Immutability and Pure Functions
Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. 
The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.

Create a pure function called calculateTotalPrice that takes an array of products as an argument. 
The function should return the total price of all products, without modifying the original array or its items.*/

const calculateDiscountedPrice = (products, discount) => {
    let discounted = products.map(product => ({ ...product }));
    
    return discounted.map(product => {
        product.price -= product.price * (discount / 100);
        return product;
    });
};

const calculateTotalPrice = (products) => {
    return products
        .map((product) => product.price)
        .reduce((accumulator, currentValue)=> accumulator + currentValue, 0)
}

/*Task 2: Function Composition and Point-Free Style
Implement a function called getFullName that takes a person object with firstName and lastName properties. 
The function should return the person's full name in the format "FirstName LastName".

Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. 
Use function composition and point-free style.

Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. 
The function should return the average grade of all students, without modifying the original array or its items. 
Use function composition and point-free style.*/

const fullname = (str1, str2) => str1 + " " + str2;
const getFullName = (person) => {
    
    if (!('firstName' in person) || !('lastName' in person)) throw new Error("Person object is missing firstName or lastName properties");
    
    if (!person || typeof person !== 'object') throw new Error("Invalid argument: person must be an object");

    if (typeof person.firstName !== 'string' || typeof person.lastName !== 'string') throw new Error("firstName and lastName must be strings");

    return fullname(person.firstName, person.lastName);
};


const splitWords = (text) => text.split(/\s+/);
const filterUnique = (words) => [...new Set(words)];
const sortAlphabetically = (words) => words.sort((a, b) => {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    if (lowerA < lowerB) return -1;
    if (lowerA > lowerB) return 1;
    return a.localeCompare(b);
});
const filterUniqueWords = (text) => sortAlphabetically(filterUnique(splitWords(text)));


const arrayAvarage = (array) => array.reduce((accumulator, currentValue)=> accumulator + currentValue, 0) / array.length
const mapGrades = (students) => students.map((student)=> arrayAvarage(student.grades))
const getAvarageGrade = (students) => {
   return arrayAvarage(mapGrades(students))
}

/*Task 3: Closures and Higher-Order Functions
Create a function called createCounter that returns a closure. The closure should be a counter function that 
increments the count on each call and returns the updated count. Each closure should have its own independent count.

Implement a higher-order function called repeatFunction that takes a function and a number as arguments. 
The function should return a new function that invokes the original function multiple times based on the provided 
number. If the number is negative, the new function should invoke the original function indefinitely until stopped.*/

const createCounter = () =>{

    let count = 0;

    return () =>{
        count++;
        return count;
    }
}

const repeatFunction = (funct, number) => {
    if (number >= 0) {
        return () => {
            for (let i = 0; i < number; i++) {
                funct();
            }
        };
    } else {
        return () => {
            while (true) {
                funct();
            }
        };
    }
};


/*Task 4: Recursion and Tail Call Optimization
Implement a recursive function called calculateFactorial that calculates the factorial of a given number. 
Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
Create a recursive function called power that takes a base and an exponent as arguments. 
The function should calculate the power of the base to the exponent using recursion.*/

const calculateFactorial = (number) => {
    if (number <= 0) return new Error("Number must be 1 or higher")

    if(number === 1 ) return 1

    return number * calculateFactorial(number-1)
}

const power = (base, exponent) => {
    if (exponent === 0) return 1

    if(exponent >0) return base * power(base, exponent-1)
    
    if (exponent < 0) return 1 / power(base, -exponent);
}

/*Task 5: Lazy Evaluation and Generators (*do not use yield)
Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. 
The function should return a lazy generator that applies the mapping function to each element of the array one at 
a time.
Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using 
lazy evaluation.*/

const lazyMap = (array, mapFunction) => {
    let index = 0;

    return {
        next: function() {
            if (index < array.length) {
                return { value: mapFunction(array[index++]), done: false };
            } else {
                return { done: true };
            }
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
};

const fibonacciGenerator = () => {
    let a = 0;
    let b = 1;
    
    return {
        next: function() {
            const nextValue = a;
            const temp = a + b;
            a = b;
            b = temp;
            return { value: nextValue, done: false };
        },
        [Symbol.iterator]: function() {
            return this;
        }
    };
};