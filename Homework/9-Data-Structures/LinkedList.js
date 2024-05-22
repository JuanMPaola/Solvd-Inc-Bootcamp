// Node class to represent each node in the linked list
class Node {
    constructor(value) {
        this.value = value;
        this.next = null; // Pointer to the next node
    }
}

// LinkedList class to represent the entire linked list
class LinkedList {
    constructor() {
        this.head = null; // Head node of the linked list
        this._length = 0; // Length of the linked list
    }

    // Function to insert a new node with a given value at the end of the list
    insert(value) {
        let node = new Node(value);
        let current = this.head;

        // If the list is empty, set the new node as the head
        if (!current) {
            this.head = node;
        } else {
            // Traverse to the end of the list and add the new node
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this._length++; // Increment the length of the list
    }

    // Function to remove the last node from the list
    remove() {
        let current = this.head;
        let prev = this.head;

        // If the list is empty, return null
        if (!current) return this.head = null;

        // If there is only one node in the list, set head to null
        if (current.next === null) {
            this.head = null;
        } else {
            // Traverse to the end of the list
            while (current.next !== null) {
                current = current.next;
                // Move prev pointer to the node before the current node
                if (prev.next !== current) {
                    prev = prev.next;
                }
            }
            // Remove the last node by setting the next pointer of the previous node to null
            prev.next = null;
        }
        this._length--; // Decrement the length of the list
        return current.value; // Return the value of the removed node
    }

    // Function to search for a node in the list
    // Accepts either a value or a callback function to match the node
    search(cb) {
        let current = this.head;

        // Traverse through the list
        while (current) {
            // If cb is a function and it returns true for the current node's value, return the value
            if (typeof cb === 'function' && cb(current.value)) {
                return current.value;
            }
            // If cb is a value and it matches the current node's value, return the value
            if (current.value === cb) {
                return current.value;
            }
            current = current.next; // Move to the next node
        }

        return false; // If no match found, return false
    }

    // Function to detect if the list has a cycle using Floyd's Cycle Detection Algorithm
    detectCycle() {
        let slow = this.head; // Slow pointer
        let fast = this.head; // Fast pointer

        // Traverse the list with slow and fast pointers
        while (fast !== null && fast.next !== null) {
            slow = slow.next;         // Move slow pointer by one step
            fast = fast.next.next;    // Move fast pointer by two steps

            // If slow and fast pointers meet, there is a cycle
            if (slow === fast) {
                return true; // Cycle detected
            }
        }

        return false; // No cycle detected
    }
}

// DEMOSTRATION

// Create an instance of the LinkedList class
const list = new LinkedList();

// Insert elements into the linked list
list.insert(1);
list.insert(2);
list.insert(3);
list.insert(4);

// Create a cycle for testing
list.head.next.next.next.next = list.head.next; // 4 -> 2

// Detect cycle
console.log(list.detectCycle()); // Output: true

// Break the cycle and test again
list.head.next.next.next.next = null; // Break the cycle
console.log(list.detectCycle()); // Output: false

module.exports = LinkedList;