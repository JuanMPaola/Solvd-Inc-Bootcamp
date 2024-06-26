/* Homework 4
Deadline: 26 April
Task 1: Object Property Manipulation
Create an object called person with the following properties and values:

firstName: "John"
lastName: "Doe"
age: 30
email: "john.doe@example.com"

Use property descriptors to make all properties of the person object read-only and non-writable, so their values cannot be changed directly.

Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). 
Ensure that this method adheres to the read-only property descriptor set earlier.

Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.*/

let person = {}
Object.defineProperties(person, {
    firstName: {
        value: "John",
        writable: false
    },
    lastName: {
        value: "Doe",
        writable: false
    },
    age: {
        value: 30,
        writable: false
    },
    email: {
        value: "john.doe@example.com",
        writable: false
    }
})

person.updateInfo = function (infoObj) {
    if (typeof infoObj !== "object" || infoObj === null) throw new Error("The input must be an object");

    for (const prop in infoObj) {

        if (this.hasOwnProperty(prop)) {
            const propertyDescriptor = Object.getOwnPropertyDescriptor(this, prop);

            if (!propertyDescriptor.writable) throw new Error(`Cannot update read-only property: ${prop}`);

            this[prop] = infoObj[prop];
        }
    }
}

Object.defineProperty(person, "adress", {
    value: {},
    writable: true,
    enumerable: false,
    configurable: false
})

/*Task 2: Object Property Enumeration and Deletion
Create a new object called product with the following properties and values:

name: "Laptop"
price: 1000
quantity: 5

Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). 
Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.

Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. 
If the property is non-configurable, throw an error with an appropriate message.
*/

product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
}

Object.defineProperties(product, {
    price: {
        value: product.price,
        enumerable: false,
        writable: false,
    },
    quantity: {
        value: product.quantity,
        enumerable: false,
        writable: false
    }
});

const getTotalPrice = (productObj) => {
    const priceDescriptor = Object.getOwnPropertyDescriptor(productObj, 'price');
    const quantityDescriptor = Object.getOwnPropertyDescriptor(productObj, 'quantity');

    return priceDescriptor.value * quantityDescriptor.value;
};

const deleteNonConfigurable = (object, property) => {

    if (!object.hasOwnProperty(property)) return new Error("The propertie don't exist");

    const descriptor = Object.getOwnPropertyDescriptor(object, property);

    if (!descriptor.configurable) return new Error("The properti can't be deleted beacuse it is not configurable");

    delete object[property];

    console.log("Propierty deleted");

    return object;
}

/*Task 3: Object Property Getters and Setters

Create an object called bankAccount with the following properties and values:
balance: 1000 (default value)

Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").

Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.

Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. 
The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.
*/

const bankAccount = {
    _balance: 1000,


    get formattedBalance() {
        return "$" + this._balance;
    },
    get getBalance() {
        return this._balance;
    },
    set balance(value) {
        this._balance = value;
    },


    transfer(bankAccount1, bankAccount2, amount) {
        if (bankAccount1.getBalance < amount) throw new Error("Balance is not enough");
        if (typeof amount !== "number") throw new Error("Amount must be a number");
        if (!bankAccount2.hasOwnProperty("_balance")) throw new Error("The object input is not a bank account");

        bankAccount1.balance = bankAccount1.getBalance - amount;
        bankAccount2.balance = bankAccount2.getBalance + amount;
    }
}


/*>Task 4: Advanced Property Descriptors
Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. 
The function should handle nested objects and arrays recursively.


Use the createImmutableObject function to create an immutable version of the person object from Task 1.*/

const createImmutableObject = (obj) => {
    const immutableObj = {};

    for (const prop in obj) {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            if (Array.isArray(obj[prop])) {
                const array = createImmutableArray(obj[prop]);
                Object.defineProperty(immutableObj, prop, {
                    value: array,
                    writable: false,
                    configurable: false
                });
            } else {
                const nestedImmutableObj = createImmutableObject(obj[prop]);
                Object.defineProperty(immutableObj, prop, {
                    value: nestedImmutableObj,
                    writable: false,
                    configurable: false
                });
            }
        } else {
            Object.defineProperty(immutableObj, prop, {
                value: obj[prop],
                writable: false,
                configurable: false
            });
        }
    }

    return immutableObj;
};
const createImmutableArray = (arr) => {
    const immutableArr = arr.map((item) => {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                return createImmutableArray(item);
            } else {
                return createImmutableObject(item);
            }
        } else {
            return item;
        }
    });

    return immutableArr;
};

const immutablePerson = createImmutableObject(person);


/*Task 5: Object Observation
Implement a function called observeObject that takes an object and a callback function as arguments. 
The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.

Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.*/

const observeObject = (obj, cb) => {
    return new Proxy(obj, {
        get(target, prop) {
            const value = target[prop];
            if (typeof value === 'object' && value !== null) {
                return observeObject(value, cb);
            }
            cb('get', prop, value);
            return value;
        },
        set(target, prop, value) {
            target[prop] = value;
            cb('set', prop, value);
            return true;
        },
    });
};

const proxiedObj = observeObject(person, cbFunction);

/*Task 6: Object Deep Cloning
Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. 
The function should handle circular references and complex nested structures. Do not use JSON methods.*/

const deepCloneObject = (obj, clones = []) => {
    if (typeof obj !== "object" || obj === null) return obj;

    const foundIndex = clones.findIndex((item) => item.original === obj);
    if (foundIndex !== -1) {
        return clones[foundIndex].clone;
    }

    const clone = Array.isArray(obj) ? [] : {};

    clones.push({ original: obj, clone });

    for (const key in obj) {
        clone[key] = deepCloneObject(obj[key], clones);
    }

    return clone;
};

/*Task 7: Object Property Validation
Implement a function called validateObject that takes an object and a validation schema as arguments. 
The schema should define the required properties, their types, and any additional validation rules. 
The function should return true if the object matches the schema, and false otherwise. 
You can choose any schema you want. */

const validateObject = (obj, schema) => {

    if (typeof obj !== 'object' || obj === null || typeof schema !== 'object' || schema === null) return new Error("Inputs must be objects")

    //For all props in the shcema, compare with the same prop in the object
    for (let schemaProp in schema.properties) {

        if (!obj.hasOwnProperty(schemaProp)) {
            console.log(`${schemaProp} property is not in the object`)
            return false;
        }

        const schemaType = schema.properties[schemaProp].type;
        const objPropValue = obj[schemaProp];

        // Compare property value type with schema type
        if (typeof objPropValue !== schemaType) {
            console.log(`${schemaProp} type is different in schema`)
            return false;
        }

        //Get descriptors
        const propDescriptors = Object.getOwnPropertyDescriptor(obj, schemaProp);

        // Check descriptors
        if (schema.properties[schemaProp].writable !== propDescriptors.writable) {
            console.log(`Property ${schemaProp} has incorrect writable value`);
            return false;
        }
        if (schema.properties[schemaProp].enumerable !== propDescriptors.enumerable) {
            console.log(`Property ${schemaProp} has incorrect enumerable value`);
            return false;
        }
        if (schema.properties[schemaProp].configurable !== propDescriptors.configurable) {
            console.log(`Property ${schemaProp} has incorrect configurable value`);
            return false;
        }
    }

    return true;
};

const schema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', writable: true, enumerable: true, configurable: true },
        lastName: { type: 'string', writable: true, enumerable: true, configurable: true },
        age: { type: 'number', writable: true, enumerable: true, configurable: true }
    },
    required: ['firstName', 'lastName', 'age']
};

module.exports = {
   task1: {person},
   task2: {product, getTotalPrice, deleteNonConfigurable},
   task3: {bankAccount},
   task4: {createImmutableObject, immutablePerson},
   task5: {observeObject, proxiedObj},
   task6: {deepCloneObject},
   task7: {validateObject, schema}
}