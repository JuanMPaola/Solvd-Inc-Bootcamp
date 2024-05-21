/* 
Demonstrate your knowledge of data structures (stack, queue, tree, graph, linked list) and implement algorithms to solve specific problems related to these data structures in JavaScript.

Part 1: Data Structure Implementations

1. Stack: Implement a class for a stack data structure. Include methods for push, pop, and peek.
2. Queue: Implement a class for a queue data structure. Include methods for enqueue, dequeue, and peek.
3. Binary Tree: Implement a class for a binary tree data structure. Include methods for inserting nodes, searching for a node, and traversing the tree (e.g., in-order, pre-order, post-order).
4. Graph: Implement a class for a graph data structure. Include methods for adding vertices and edges, performing depth-first search (DFS), and breadth-first search (BFS).
5. Linked List: Implement a class for a singly linked list data structure. Include methods for inserting nodes, deleting nodes, and searching for a node.

Part 2: Algorithmic Problems

1. Min/Max Stack: Implement a class for a stack that supports finding the minimum and maximum elements in constant time (O(1)). Include methods for push, pop, getMin, and getMax.
2. Binary Search Tree: Implement a function to determine if a binary tree is a binary search tree (BST). Provide an efficient algorithm that checks whether the tree satisfies the BST property.
3. Graph Algorithms: Implement algorithms to find the shortest path between two vertices in a graph using both Dijkstra's algorithm and Breadth-First Search (BFS).
4. Linked List Cycle: Implement a function to detect if a linked list has a cycle. Use Floyd's Cycle Detection Algorithm (Tortoise and Hare algorithm) to solve this problem efficiently.

Part 3: Demonstration

Usage Demonstration: Create instances of your data structures and demonstrate their usage with sample data. Show how the algorithms you implemented can solve practical problems using these data structures. 

Part 4: Documentation

Documentation: Provide clear and concise comments and documentation for your code. Explain the purpose of each data structure, method, and algorithm. Describe how the algorithms work and their time complexity.
*/

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


// Queue data structure uses FIFO algorithm to store the data. You cant un-store elements in the middle or the back of the structure.
class Queue {
    constructor() {
        this.array = [];
    }
    peek() {
        return this.array.length;
    }
    enqueue(element) {
        this.array.push(element);
    }
    dequeue() {
        return this.array.shift();
    }
}

// BinaryTree is a data structure that stores data in different branches, depending on the value of the elements.
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    // Function to add elements to the tree
    insert(value) {
        if (value < this.value) {
            if (this.left) {
                this.left.insert(value);
            } else {
                this.left = new BinaryTree(value);
            }
        } else {
            if (this.right) {
                this.right.insert(value);
            } else {
                this.right = new BinaryTree(value);
            }
        }
    }

    // This function is to search for a value in the tree
    contains(value) {
        if (value === this.value) return true;
        if (value < this.value) {
            return this.left ? this.left.contains(value) : false;
        } else {
            return this.right ? this.right.contains(value) : false;
        }
    }

    // Function to check if the tree is a binary search tree (BST)
    isBST() {
        return this._isBSTHelper(this, -Infinity, Infinity);
    }

    // Helper function to check BST properties
    _isBSTHelper(node, min, max) {
        if (!node) {
            return true; // An empty node/subtree is a BST
        }
        if (node.value <= min || node.value >= max) {
            return false; // Node value violates the min/max constraint
        }
        // Recursively check the left and right subtrees with updated constraints
        return this._isBSTHelper(node.left, min, node.value) &&
               this._isBSTHelper(node.right, node.value, max);
    }
}

//Graph is represented as a Map (key value pars) where the key is the node (vertex) and the value is an array of edges
class Graph {
    constructor() {
        // Initialize the graph as a Map
        this.graph = new Map();
    }

    // Add a node (vertex) to the graph
    addVert(node) {
        if (!this.graph.has(node)) {
            this.graph.set(node, []);
        }
    }

    // Add an edge (connection) between two nodes
    addEdge(startNode, endNode) {
        if (this.graph.has(startNode) && this.graph.has(endNode)) {
            this.graph.get(startNode).push(endNode);
            this.graph.get(endNode).push(startNode);
        } else {
            console.log("One or both nodes do not exist");
        }
    }

    // Breadth-first seatch (BFS) to find a node (vertex) in the graph represented by end parameter from a start point represented by start parameter
    bfs(start, end) {
        const checked = new Set();
        const queue = new Queue();
        queue.enqueue(start);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();

            if (node === end) {
                return true;
            }

            if (!checked.has(node)) {
                checked.add(node);

                const neighbors = this.graph.get(node) || [];
                for (const neighbor of neighbors) {
                    if (!checked.has(neighbor)) {
                        queue.enqueue(neighbor);
                    }
                }
            }
        }

        return false;
    }

    // Depth-first search (DFS) to find a route between the start node and the end node
    dfs(start, end, checked = new Set()) {
        if (start === end) {
            console.log("Route found");
            return true;
        }

        checked.add(start);
        const neighbors = this.graph.get(start) || [];

        for (const neighbor of neighbors) {
            if (!checked.has(neighbor)) {
                if (this.dfs(neighbor, end, checked)) {
                    return true;
                }
            }
        }
        
        return false;
    }

    dijkstra(start, end) {
        const distances = new Map();
        const predecessors = new Map();
        const priorityQueue = new PriorityQueue();

        // Initialize distances and priority queue
        for (let node of this.graph.keys()) {
            distances.set(node, Infinity);
            priorityQueue.enqueue(Infinity, node);
        }
        distances.set(start, 0);
        priorityQueue.enqueue(0, start);

        while (!priorityQueue.isEmpty()) {
            const current = priorityQueue.dequeue();

            if (current === end) {
                return this._buildPath(predecessors, start, end);
            }

            const neighbors = this.graph.get(current) || [];
            for (const neighbor of neighbors) {
                const alt = distances.get(current) + neighbor.weight;
                if (alt < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, alt);
                    predecessors.set(neighbor.node, current);
                    priorityQueue.enqueue(alt, neighbor.node);
                }
            }
        }

        return null; // No path found
    }

    _buildPath(predecessors, start, end) {
        const path = [];
        let currentNode = end;
        while (currentNode !== start) {
            path.unshift(currentNode);
            currentNode = predecessors.get(currentNode);
        }
        path.unshift(start);
        return path;
    }
}

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

// Example usage:
const ll = new LinkedList();
ll.insert(1);
ll.insert(2);
ll.insert(3);

// Creating a cycle for testing:
ll.head.next.next.next = ll.head; // The next of the last node points to the head, creating a cycle

console.log(ll.detectCycle()); // Output: true