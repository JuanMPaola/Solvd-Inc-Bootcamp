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
Bonus Challenge

For an extra challenge, consider implementing additional features for your hash table, such as resizing the table dynamically 
to maintain an efficient load factor, or implementing a method to iterate through all key-value pairs in the hash table. */
