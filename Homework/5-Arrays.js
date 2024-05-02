/*Task 1: Advanced Array Filtering
Create a function called customFilterUnique that takes an array and a callback function as arguments. 
The customFilterUnique function should filter the array using the callback function to determine uniqueness. 
The resulting array should contain only unique elements based on the callback's logic.
Use the customFilterUnique function to filter an array of objects based on a specific property and return only unique objects.*/

const customFilterUnique = (array, cb) => {
    if (!Array.isArray(array)) return new Error("First input must be an array");

    const nameCounts = {};

    array.forEach(element => {
        const name = cb(element);
        nameCounts[name] = (nameCounts[name] || 0) + 1;
    });

    const filteredArray = array.filter(element => {
        const name = cb(element);
        return nameCounts[name] === 1;
    });

    return filteredArray;
};

const arrayOfObjects = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Alice' }
];

const getName = obj => obj.name;

const uniqueObjectsByName = customFilterUnique(arrayOfObjects, getName);
console.log(uniqueObjectsByName);


/*Task 2: Array Chunking
Create a function called chunkArray that takes an array and a chunk size as arguments. 
The chunkArray function should divide the array into smaller arrays, each containing elements of the specified chunk size. 
The function should return an array of arrays.
Optimize the chunkArray function to minimize memory usage while chunking the array*/

const chunkArray = (array, chunk) =>{
    if(!Array.isArray(array)) return new Error ("First input must be an array");
    if (typeof chunk !== 'number' || !Number.isInteger(chunk) || chunk <= 0) return new Error("Second input must be a positive integer");

    const bigArray = [];
    let startIndex = 0;
    
    while (startIndex < array.length) {
        bigArray.push(array.slice(startIndex, startIndex + chunk));
        startIndex += chunk;
    }

    return bigArray;
}

/*Task 3: Array Shuffling
Create a function called customShuffle that takes an array as an argument and returns a new array with its elements randomly shuffled.
Implement the customShuffle function using an efficient shuffling algorithm to achieve uniform randomness.*/

const customShuffle = (array) => {
    if(!Array.isArray(array)) return new Error ("Input must be an array");
    const newArray = array.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/*Task 4: Array Intersection and Union
Create a function called getArrayIntersection that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.
Create a function called getArrayUnion that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.*/

const getArrayIntersection = (array, array2) => {
    if(!Array.isArray(array) || !Array.isArray(array2)) return new Error ("Inputs must be an array");

    const intersection = [];
    array.forEach((element)=>{
        if(array2.includes(element)) intersection.push(element);
    })
    return intersection;
}

const getArrayUnion = (array, array2) => {
    if(!Array.isArray(array) || !Array.isArray(array2)) return new Error ("Inputs must be an array");
    let result = [];
    const union = [...array, ...array2];
    union.forEach((element)=>{
        if(!result.includes(element)) result.push(element);
    })
    return result;
}

/*Task 5: Array Performance Analysis
Implement a function called measureArrayPerformance that takes a function and an array as arguments. 
The measureArrayPerformance function should execute the provided function with the given array as input and measure the execution time.
Use the measureArrayPerformance function to compare the performance of built-in array methods (map, filter, reduce, etc.) against your custom array manipulation functions.*/

const measureArrayPerformance = (fn, array) => {
    const startTime = performance.now();
    fn(array);
    const endTime = performance.now();
    console.log(`Execution time: ${endTime - startTime} milliseconds.`);
}


const array1 = Array.from({ length: 10000 }, (_, index) => index + 1); // Array from 1 to 10000
const array2 = Array.from({ length: 10000 }, (_, index) => index + 5001); // Array from 5001 to 15000
const sampleArray = Array.from({ length: 100000 }, (_, index) => index + 1); // Array from 1 to 100000
/* 
console.log(".filter:")
measureArrayPerformance((array) => array.filter(item => item > 50000), sampleArray); 

console.log("customFilterUnique:")
measureArrayPerformance((array) => customFilterUnique(array, item => item > 50000), sampleArray);

console.log(".map:")
measureArrayPerformance((array) => array.map(item => item * 2), sampleArray);

console.log("chunkArray:")
measureArrayPerformance(chunkArray, sampleArray, 100);

console.log(".reduce:")
measureArrayPerformance((array) => array.reduce((acc, curr) => acc + curr), sampleArray); 

console.log("customShuffle:")
measureArrayPerformance(customShuffle, sampleArray); 

console.log("getArrayIntersection:");
measureArrayPerformance(getArrayIntersection, [array1, array2]);

console.log("getArrayUnion")
measureArrayPerformance(getArrayUnion, array1, array2);

 */
module.exports = {
    task1:{customFilterUnique, arrayOfObjects},
    task2:{chunkArray},
    task3:{customShuffle},
    task4:{getArrayIntersection, getArrayUnion},
    task5:{measureArrayPerformance}
}