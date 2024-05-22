// Stack data structure uses LIFO algorithm to store data. This way you can only un-store the last element you store in the data structuro.
class Stack {
    constructor() {
        this.stack = [];
        this.maxStack = [];
        this.minStack = [];
    }

    push(element) {
        this.stack.push(element);

        // Update maxStack if the pushed element is greater than or equal to the current maximum
        if (this.maxStack.length === 0 || element >= this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.push(element);
        }

        // Update minStack if the pushed element is less than or equal to the current minimum
        if (this.minStack.length === 0 || element <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(element);
        }
    }

    pop() {
        if (this.stack.length === 0) {
            return null;
        }
        const popped = this.stack.pop();

        // If the popped element is the current maximum, also pop from maxStack
        if (popped === this.maxStack[this.maxStack.length - 1]) {
            this.maxStack.pop();
        }

        // If the popped element is the current minimum, also pop from minStack
        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }

        return popped;
    }

    getMax() {
        if (this.maxStack.length === 0) {
            return null;
        }
        return this.maxStack[this.maxStack.length - 1];
    }

    getMin() {
        if (this.minStack.length === 0) {
            return null;
        }
        return this.minStack[this.minStack.length - 1];
    }
}

// DEMOSTRATION

// Create an instance of the Stack class
const stack = new Stack();

// Push elements onto the stack
stack.push(5);
stack.push(3);
stack.push(8);
stack.push(2);

// Pop elements from the stack
console.log(stack.pop()); // Output: 2
console.log(stack.pop()); // Output: 8

// Get the current maximum and minimum in the stack
console.log(stack.getMax()); // Output: 5
console.log(stack.getMin()); // Output: 3

// Push more elements and get max and min again
stack.push(7);
stack.push(1);
console.log(stack.getMax()); // Output: 7
console.log(stack.getMin()); // Output: 1

module.exports = Stack;