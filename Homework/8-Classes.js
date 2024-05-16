/*Homework 8

Task

Design and implement an object-oriented program in JavaScript to simulate the functioning of an online bookstore. This assignment will test your understanding of classes, encapsulation, inheritance, and polymorphism.

Part 1: Class Design

1. Book Class: Create a class called `Book` to represent individual books. Each book should have properties like title, author, ISBN, price, and availability.
2. User Class: Create a class called `User` to represent users of the bookstore. Users should have properties like name, email, and a unique user ID.
3. Cart Class: Design a class called `Cart` to simulate a shopping cart. It should have methods to add books, remove books, and calculate the total price of the books in the cart.
4. Order Class: Create an `Order` class to represent a user's order. It should include information about the user, the books ordered, and the total price.

Part 2: Implementation

1. Create Objects: Instantiate multiple `Book` objects, representing different books available in the bookstore. Also, create a few `User` objects.
2. Add Books to Cart: Simulate users adding books to their cart by creating instances of the `Cart` class and using its methods.
3. Place Orders: Implement the process of placing an order. Users should be able to create instances of the `Order` class, specifying the books they want to purchase.

Part 3: Demonstration

1. Create a Scenario: Design a scenario where users browse books, add them to their carts, and place orders. Simulate interactions between users, carts, and orders.
2. Interaction: Demonstrate how objects of different classes interact with each other. For example, a user interacts with a cart, and a cart interacts with orders.
3. Polymorphism: Utilize polymorphism by treating different types of books (e.g., fiction, non-fiction) uniformly when users add them to the cart.

Part 4: Documentation

1. Documentation: Provide clear and concise comments and documentation for your code. Explain the purpose of each class, method, and property. 
Describe the interaction between different objects and how encapsulation is maintained.

Submission

Submit your JavaScript program along with detailed documentation and comments that explain your code. Ensure that your code is well-structured and adheres to best practices in object-oriented programming.

Bonus (Optional)

Implement additional features such as searching for books, applying discounts, handling payments, or integrating a database to store book and user information.*/


// Class representing individual books in the bookstore. I also add stock and type properties.
class Book {
  constructor(title, author, isbn, price, availability, stock, type) {
    this._title = title;
    this._author = author;
    this._isbn = isbn;
    this._price = price;
    this._stock = stock;
    this._availability = availability;
    this._type = type;
  }

  // To mantain encapsulation:
  // Getters and Setters for title
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
  }

  // Getters and Setters for author
  get author() {
    return this._author;
  }
  set author(value) {
    this._author = value;
  }

  // Getters and Setters for ISBN
  get isbn() {
    return this._isbn;
  }
  set isbn(value) {
    this._isbn = value;
  }

  // Getters and Setters for price
  get price() {
    return this._price;
  }
  set price(value) {
    this._price = value;
  }

  // Getters and Setters for stock
  get stock() {
    return this._stock;
  }
  set stock(value) {
    this._stock = value;
  }

  // Getters and Setters for availability
  get availability() {
    return this._availability;
  }
  set availability(value) {
    this._availability = value;
  }

  // Getters and Setters for type
  get type() {
    return this._type;
  }
  set type(value) {
    this._type = value;
  }

  //Method to reduce the stock of the books that are ordered. If there is no more stock, availability become false.
  reduceStock() {
    this.stock -= 1;
    if(this.stock = 0) this.availability = false;
  }

}

// Class representing users of the bookstore. I also add the Cart properite that associate directly the Cart class with each User, and a orders array that saves al the oredes of the user.
class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
    this.cart = new Cart();
    this.orders = []
  }
  // Method to show or return the orders of the user
  getOrders() {
    return this.orders;
  }

  // Method to add books to the cart. It checks if the book is availabe. If it is add it to the cart. If not, logs an message.
  addToCart(...books) {
    books.forEach(book => {
      if (book.availability) {
        this.cart.addBooks(book);
      } else {
        console.log(`${book.title} is not available.`);
      }
    });


  }

  // This function places an order based on the books in the cart. It checks each book's availability (again), and if available, reduces its stock and adds it to the order. 
  // If any book is not available, it logs them and doesn't place the order. After placing the order successfully, the cart is cleared.
  placeOrder() {
    let notAvailableBooks = [];
    let availableBooks = [];

    this.cart.books.forEach(book => {
      if (book.availability) {
        book.reduceStock();
        availableBooks.push(book);
      } else {
        notAvailableBooks.push(book);
      }
    });

    if (notAvailableBooks.length > 0) {
      console.log("The following books are not available and cannot be ordered:");
      notAvailableBooks.forEach(book => console.log(book.title));
    }

    if (availableBooks.length > 0) {
      const order = new Order(this.userId, this.name, this.email, availableBooks, new Date());
      this.orders.push(order);
      this.cart.clearCart();
      console.log("Order placed successfully.");
      return order;
    } else {
      console.log("No books are available for ordering.");
    }
  }

  // Method to show the books currently in the cart
  showCart() {
    this.cart.showBooks();
  }

  removeBooks(...booksToRemove) {
    this.cart.removeBooks(...booksToRemove);
  }
}

//Admin class use Inheritance and Polymorphism
class Admin extends User {
  constructor(name, email, userId) {
    // Call the constructor of the User class using super()
    super(name, email, userId);
  }

  // Admins can remove books from users carts implementing polymorphism.
  removeBooks(user, ...booksToRemove){
    user.removeBooks(...booksToRemove);
  }

}

// Class representing the shopping cart of a user
class Cart {
  constructor() {
    this.books = []
  }

  // Method to add books to the cart
  addBooks(book) {
    this.books = [...this.books, book]
  }

  // Method to remove books from the cart
  removeBooks(...booksToRemove) {
    this.books = this.books.filter(book => {
      !booksToRemove.includes(book)
    });
  }

  // Method to clear the cart
  clearCart() {
    this.books = [];
  }

  // Method to calculate the total price of the books in the cart
  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }

  // Method to show the books currently in the cart
  showBooks() {
    console.log("Books in Cart:");
    this.books.forEach(book => console.log(book.title));
  }
}

// Class representing an order placed by a user. I also added a date propertie.
class Order {
  constructor(userId, userName, userEmail, books, date) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.books = books;
    this.date = date || new Date(); // Default to the current date if not provided
    this.totalPrice = this.calculateTotalPrice();
  }

  // Method to calculate the total price of the order
  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}

// Instantiate objects
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 15.99, true, 10, "Fiction");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "9780061120084", 12.50, false, 5, "Fiction");
const book3 = new Book("1984", "George Orwell", "9780451524935", 10.99, true, 20, "Science Fiction");

const user1 = new User("John Doe", "john@example.com", "user123");
const user2 = new User("Jane Smith", "jane@example.com", "user456");

// Interaction: User 1 adds books to the cart and place order
user1.addToCart(book1);
user1.addToCart(book3);

console.log("User 1 Cart before placing an order:");
//Befor ordering the order
user1.showCart();

// Interaction: User 1 places an order
const order1 = user1.placeOrder();

console.log("User 1 Cart after placing an order:");
// After ordering
user1.showCart();

// Display user 1 orders
console.log("User 1 Orders:", user1.getOrders());



// Interaction: Admin interaction with users cart
const admin = new Admin("Admin", "admin@example.com", "admin123");


// Interaction: Admin removes books from User 1's cart
user1.addToCart(book1);
admin.removeBooks(user1, book1);
user1.showCart();

module.exports = {
  Book,
  User,
  Cart,
  Admin,
  Order
};