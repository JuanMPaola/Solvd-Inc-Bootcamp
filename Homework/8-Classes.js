/*Homework 8

Task

Design and implement an object-oriented program in JavaScript to simulate the functioning of an online bookstore. This assignment will test your understanding of classes, encapsulation, inheritance, and polymorphism.

Part 1: Class Design

1. Book Class: Create a class called `Book` to represent individual books. Each book should have properties like title, author, ISBN, price, and availability.
2. User Class: Create a class called `User` to represent users of the bookstore. Users should have properties like name, email, and a unique user ID.
3. Cart Class: Design a class called `Cart` to simulate a shopping cart. It should have methods to add books, remove books, and calculate the total price of the books in the cart.
4. Order Class: Create an `Order` class to represent a user's order. It should include information about the user, the books ordered, and the total price.*/

class Book {
  constructor(title, author, isbn, price, availability, stock, type) {
    this.title = title,
      this.author = author,
      this.isbn = isbn,
      this.price = price,
      this.availability = availability,
      this.stock = stock,
      this.type = type
  }
}

class User {
  constructor(name, email, userId) {
    this.name = name,
    this.email = email,
    this.userId = userId,
    this.cart = new Cart(this),
    this.orders = []
  }

  // Method to add books to the cart
  addToCart(...books) {
    if(books.availability === false){
      return console.log(`${books.name} is not avalible`)
    }else
    this.cart.addBooks(...books);
  }

  // Method to place an order
  placeOrder() {
    const order = new Order(this, this.cart.books);
    this.orders.push(order);
    this.cart.clearCart(); 
    return order;
  }
  //make a method that checks if the books ara avalible, if they are, stock = stock -1, if not console.log(book.name is not avalibe) => cart.books.filter((books) books.name != bookname)
}

class Cart {
  constructor(user) {
    this.user = user,
    this.books = []
  }

  // Method to add books to the cart
  addBooks(...books) {
    this.books = [...this.books, ...books]
  }

  // Method to remove books from the cart
  removeBooks(...booksToRemove) {
    this.books = this.books.filter(book => !booksToRemove.includes(book));
  }

  // Method to clear the cart
  clearCart() {
    this.books = [];
  }

  // Method to calculate the total price of the books in the cart
  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}

class Order {
  constructor(user, books) {
    this.user = user,
    this.books = books
    this.totalPrice = this.calculateTotalPrice();
  }

  // Method to calculate the total price of the order
  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}


/*
Part 2: Implementation

1. Create Objects: Instantiate multiple `Book` objects, representing different books available in the bookstore. Also, create a few `User` objects.
2. Add Books to Cart: Simulate users adding books to their cart by creating instances of the `Cart` class and using its methods.
3. Place Orders: Implement the process of placing an order. Users should be able to create instances of the `Order` class, specifying the books they want to purchase.*/

// Instantiate objects
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 15.99, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 12.50, false);
const book3 = new Book("1984", "George Orwell", "9780451524935", 10.99, true);

const user1 = new User("John Doe", "john@example.com", "user123");
const user2 = new User("Jane Smith", "jane@example.com", "user456");

// Interaction: User adds books to the cart
user1.addToCart(book1, book2);

// Interaction: User places an order
const order1 = user1.placeOrder();

/*
Part 3: Demonstration

1. Create a Scenario: Design a scenario where users browse books, add them to their carts, and place orders. Simulate interactions between users, carts, and orders.
2. Interaction: Demonstrate how objects of different classes interact with each other. For example, a user interacts with a cart, and a cart interacts with orders.
3. Polymorphism: Utilize polymorphism by treating different types of books (e.g., fiction, non-fiction) uniformly when users add them to the cart.
*/


/*
Part 4: Documentation

1. Documentation: Provide clear and concise comments and documentation for your code. Explain the purpose of each class, method, and property. 
Describe the interaction between different objects and how encapsulation is maintained.

Submission

Submit your JavaScript program along with detailed documentation and comments that explain your code. Ensure that your code is well-structured and adheres to best practices in object-oriented programming.
*/

/*Bonus (Optional)

Implement additional features such as searching for books, applying discounts, handling payments, or integrating a database to store book and user information.*/