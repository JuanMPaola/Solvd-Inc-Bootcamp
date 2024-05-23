// Queue data structure uses FIFO algorithm to store the data. You cant un-store elements in the middle or the back of the structure.
class Queue {
    constructor() {
        this.array = [];
    }
    peek() {
        return this.array[0];
    }
    enqueue(element) {
        this.array.push(element);
    }
    dequeue() {
        return this.array.shift();
    }
}

// DEMOSTRATION

// Create an instance of the Queue class
const queue = new Queue();

// Enqueue elements into the queue
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

// Dequeue elements from the queue
console.log(queue.dequeue()); // Output: 10

// Check the last enqueue element
console.log(queue.peek()); // Output: 20

module.exports = Queue;