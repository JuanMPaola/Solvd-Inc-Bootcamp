/*Homework 10

Task

Explore the concepts of hash functions and hash tables, and to implement a hash table with a custom hash function in JavaScript. 
This assignment will test your understanding of hash functions, collision resolution, and the practical application of hash tables.

Part 1: Understanding Hash Functions

1. Research: Begin by researching and understanding what hash functions are, how they work, and their applications in computer science and data storage.

Part 2: Implementing a Custom Hash Function

1. Custom Hash Function: Implement a custom hash function in JavaScript. Your hash function should take a string as input and produce a hash code (an integer) as output. 
Be creative, but ensure that your function distributes values uniformly.

2. Collision Handling: Implement a collision resolution strategy. You can choose from methods like separate chaining (using linked lists), open addressing 
(linear probing, quadratic probing), or any other technique you prefer.


Part 3: Building a Hash Table

1. Hash Table Class: Create a JavaScript class for a hash table that uses your custom hash function. 
Include methods for inserting key-value pairs, retrieving values by key, and deleting key-value pairs.
2. Testing: Create test cases to ensure that your hash table and custom hash function work correctly. 
Test scenarios should include inserting, retrieving, and deleting values, as well as handling collisions gracefully.

Part 4: Documentation and Analysis

1. Documentation: Provide clear and concise comments and documentation for your code. Explain how your custom hash function and hash table class work.
2. Analysis: Write a brief analysis of the performance of your custom hash function and hash table. Discuss the time complexity of key operations (insertion, retrieval, deletion) 
and any trade-offs you made in your implementation.

Submission

Submit your JavaScript code for the custom hash function and hash table along with your documentation and analysis. 
Include test cases that demonstrate the correctness and efficiency of your implementation.
*/
const LinkedList = require('./9-Data-Structures/LinkedList');

class CustomHashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  // Custom hash function to convert a string to a hash code
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % this.size;
  }

  // Method to insert key-value pair into the hash table
  insert(key, value) {
    const index = this._hash(key);
    if (this.table[index] === undefined) {
      this.table[index] = new LinkedList();
    }
    // Insert an object with both key and value into the linked list
    this.table[index].insert({ key, value });
  }

  // Method to retrieve a value by key from the hash table
  get(key) {
    const index = this._hash(key);
    if (this.table[index] === undefined) {
      return undefined;
    }
    // Search for the node with the matching key
    const node = this.table[index].search(node => node.key === key);
    return node ? node.value : undefined; // Return the value if found, otherwise undefined
  }

  // Method to delete a key-value pair from the hash table
  delete(key) {
    const index = this._hash(key);
    if (this.table[index] !== undefined) {
      // Remove the node with the matching key
      this.table[index].remove(node => node.key === key);
    }
  }
}

// Create an instance of CustomHashTable and demonstrate its usage
const hashTable = new CustomHashTable(10);

// Insert elements
hashTable.insert('name', 'Alice');
hashTable.insert('age', 25);
hashTable.insert('occupation', 'Engineer');

// Retrieve elements
console.log(hashTable.get('name')); // Output: Alice
console.log(hashTable.get('age')); // Output: 25
console.log(hashTable.get('occupation')); // Output: Engineer

// Delete an element
hashTable.delete('age');
console.log(hashTable.get('age')); // Output: undefined

/* 
Analisys:
Hash functions are useful to store information in a more efficient way. This functions usually contain diferent parts like the table, where the data in key, value pairs is store,
the hash function itself, and methods to insert and delete nodes. 

Table:
In this case I decide to use an array that the size is defined during the initialization of the hash table on the constructor.
he hash table is implemented as an array where each index can store a linked list of key-value pairs.

Hash Function: 
The hash function converts a string key into an integer index by processing each character in the string. 
It shifts the hash left by 5 bits, subtracts the hash, and adds the Unicode value of the character. This process ensures a good distribution of keys. 
The result is then taken modulo the size of the array to ensure it falls within the valid range of indices.

Colicions:
In practice "perefect hash functions" (return always unique ints) is not normaly used. In sted, use a hash function "not-perfect" and manege colicions.
In this case, when a 2 diferents nodes are going to be store in the same elemnt of the array beacuse they have the same index, 
the colicions are managed with a linked list, so, the element of the array would store more than one value. 
This way you dont gonna need a big array to store a lot of values and still have an efficient memory management.

Performance:
In the case of the 3 methods of the class, for insertion, deletion, and searching the average of time complexity depends on how many collision happend during the insertion of the key value pairs.
With only a few collisions, the avarage time complexity is O(1), and in the worst case, O(n) beacuse it may require searching throught the linked list to find or insert the element.

Conclusion:
The custom hash table implementation provides efficient insertion, retrieval, and deletion operations with time complexity of O(1). 
The use of a linked list for collision resolution ensures effective memory usage and handles collisions well.
*/

module.exports = CustomHashTable;