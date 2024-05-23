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

    // This function traverse the three in order (recursively) and print the values
    printInorder(node){
        if(node == null) return;

        this.printInorder(node.left);

        console.log(node.value);

        this.printInorder(node.right);
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

// DEMOSTRATION

// Create an instance of the BinaryTree class
const tree = new BinaryTree(10);

// Insert elements into the binary tree
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(13);
tree.insert(18);

// Check if the tree contains certain values
console.log(tree.contains(7)); // Output: true
console.log(tree.contains(20)); // Output: false

// Check if the tree is a Binary Search Tree (BST)
console.log(tree.isBST()); // Output: true

// Print the tree in-order
tree.printInorder(tree); // Output: 3 5 7 10 13 15 18

module.exports = BinaryTree;