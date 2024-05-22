// Graph class represents a graph data structure using an adjacency list
class Graph {
    constructor() {
        // Initialize the graph as a Map where keys are nodes and values are arrays of edges
        this.graph = new Map();
    }

    // Add a vertex (node) to the graph
    addVert(node) {
        if (!this.graph.has(node)) {
            this.graph.set(node, []);
        }
    }

    // Add an edge between two nodes with an optional weight (default is 1)
    addEdge(startNode, endNode, weight = 1) {
        if (this.graph.has(startNode) && this.graph.has(endNode)) {
            this.graph.get(startNode).push({ node: endNode, weight });
            this.graph.get(endNode).push({ node: startNode, weight });
        } else {
            console.log("One or both nodes do not exist");
        }
    }

    // Breadth-First Search (BFS) to check if a path exists between start and end nodes
    bfs(start, end) {
        const checked = new Set(); // Set to keep track of visited nodes
        const queue = [start]; // Queue for BFS

        while (queue.length > 0) {
            const node = queue.shift(); // Dequeue the first node

            // Check if the current node is the end node
            if (node === end) {
                return true;
            }

            // Mark the node as visited and enqueue its neighbors
            if (!checked.has(node)) {
                checked.add(node);
                const neighbors = this.graph.get(node) || [];
                for (const neighbor of neighbors) {
                    if (!checked.has(neighbor.node)) {
                        queue.push(neighbor.node);
                    }
                }
            }
        }

        return false; // Return false if no path is found
    }

    // Depth-First Search (DFS) to check if a path exists between start and end nodes
    dfs(start, end, checked = new Set()) {
        if (start === end) {
            console.log("Route found");
            return true;
        }

        checked.add(start); // Mark the node as visited
        const neighbors = this.graph.get(start) || [];

        // Recursively visit each neighbor
        for (const neighbor of neighbors) {
            if (!checked.has(neighbor.node)) {
                if (this.dfs(neighbor.node, end, checked)) {
                    return true;
                }
            }
        }

        return false; // Return false if no path is found
    }

    // Dijkstra's algorithm to find the shortest path between start and end nodes
    dijkstra(start, end) {
        const distances = new Map(); // Map to store the shortest distance to each node
        const predecessors = new Map(); // Map to store the predecessor of each node
        const priorityQueue = new PriorityQueue(); // Priority queue to select the node with the smallest distance

        // Initialize distances and priority queue
        for (let node of this.graph.keys()) {
            distances.set(node, Infinity);
            priorityQueue.enqueue(Infinity, node);
        }
        distances.set(start, 0);
        priorityQueue.enqueue(0, start);

        // Process the priority queue
        while (!priorityQueue.isEmpty()) {
            const { value: current } = priorityQueue.dequeue(); // Dequeue the node with the smallest distance

            if (current === end) {
                return this._buildPath(predecessors, start, end); // Build and return the shortest path
            }

            const neighbors = this.graph.get(current) || [];
            for (const neighbor of neighbors) {
                const alt = distances.get(current) + neighbor.weight; // Calculate alternative distance
                if (alt < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, alt); // Update distance
                    predecessors.set(neighbor.node, current); // Update predecessor
                    priorityQueue.enqueue(alt, neighbor.node); // Enqueue the neighbor with updated distance
                }
            }
        }

        return null; // Return null if no path is found
    }

    // Helper function to build the shortest path using the predecessors map
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

// PriorityQueue class represents a priority queue using a simple array
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // Enqueue a value with a given priority
    enqueue(priority, value) {
        this.values.push({ priority, value });
        this.values.sort((a, b) => a.priority - b.priority); // Sort the queue by priority
    }

    // Dequeue the value with the highest priority (lowest priority number)
    dequeue() {
        return this.values.shift();
    }

    // Check if the queue is empty
    isEmpty() {
        return this.values.length === 0;
    }
}

//DEMOSTRATION

// Create a new graph instance
const graph = new Graph();

// Add vertices to the graph
graph.addVert('A');
graph.addVert('B');
graph.addVert('C');
graph.addVert('D');
graph.addVert('E');

// Add edges to the graph with weights
graph.addEdge('A', 'B', 1);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'D', 1);
graph.addEdge('C', 'D', 1);
graph.addEdge('D', 'E', 6);
graph.addEdge('C', 'E', 2);

// Perform BFS
console.log(graph.bfs('A', 'E')); // Output: true

// Perform DFS
console.log(graph.dfs('A', 'E')); // Output: true

// Perform Dijkstra's algorithm
console.log(graph.dijkstra('A', 'E')); // Output: [ 'A', 'C', 'E' ]


module.exports = Graph;