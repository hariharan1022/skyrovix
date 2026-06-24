## 12. JS Objects

## 📘 Introduction

Objects are the core data structure in JavaScript. They are collections of key-value pairs where keys are strings (or Symbols) and values can be any data type, including other objects and functions (methods). Almost everything in JavaScript is an object or behaves like one — arrays, functions, dates, regular expressions.

## 🧠 Key Concepts

- **Object literal**: `{ key: value }` — the simplest way to create an object
- **Properties and Methods**: Properties store data; methods are functions stored as property values
- **Dot notation**: `obj.key` — simpler, but key must be a valid identifier
- **Bracket notation**: `obj["key"]` — allows dynamic keys and keys with special characters
- **Computed properties**: `{ [dynamicKey]: value }` — set property key dynamically in literal
- **Shorthand properties**: `{ name }` instead of `{ name: name }` when variable and key match
- **Object methods**: `Object.keys()`, `Object.values()`, `Object.entries()` — return arrays of property data
- **Spread operator**: `{ ...obj1, ...obj2 }` — shallow merges objects
- **Destructuring**: `const { name, age } = obj` — extracts properties into variables
- **`this` keyword**: Refers to the object that the method is called on

## 💻 Syntax

```javascript
// Object literal
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  greet() {
    console.log(`Hello, I'm ${this.firstName}`);
  }
};

// Dot vs bracket notation
person.firstName;        // "John"
person["first" + "Name"]; // "John" (bracket with expression)
const key = "age";
person[key];             // 30

// Computed property
const dynamicKey = "email";
const user = {
  name: "Alice",
  [dynamicKey]: "alice@example.com"
};

// Shorthand
const name = "Bob";
const age = 25;
const bob = { name, age }; // { name: "Bob", age: 25 }

// Spread operator
const merged = { ...person, ...bob };

// Destructuring
const { firstName, age: personAge } = person;
```

## ✅ Example 1 - Basic

**Problem:** Create a product object with properties and a method to calculate discounted price.

**Code:**
```javascript
const product = {
  name: "Wireless Mouse",
  price: 49.99,
  discount: 0.15,
  calculateDiscountedPrice() {
    return this.price * (1 - this.discount);
  },
  getInfo() {
    return `${this.name} - $${this.price} (${this.discount * 100}% off available)`;
  }
};

console.log(product.getInfo());
console.log(`Discounted price: $${product.calculateDiscountedPrice().toFixed(2)}`);
```

**Output:**
```
Wireless Mouse - $49.99 (15% off available)
Discounted price: $42.49
```

**Explanation:** The object literal stores product data. Methods use `this` to access sibling properties. `calculateDiscountedPrice` returns the price after applying the discount. This demonstrates the basic object pattern.

## 🚀 Example 2 - Intermediate

**Problem:** Transform an array of user objects using `Object.keys/values/entries`, spread, and destructuring.

**Code:**
```javascript
const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "editor" }
];

// Extract all names
const names = users.map(({ name }) => name);
console.log("Names:", names);

// Convert to a lookup map (id -> user)
const userMap = Object.fromEntries(
  users.map(user => [user.id, { ...user }])
);
console.log("User 2:", userMap[2]);

// Get all keys of first user
console.log("Keys:", Object.keys(users[0]));
console.log("Values:", Object.values(users[0]));
console.log("Entries:", Object.entries(users[0]));

// Add a new property to each user using spread
const usersWithEmail = users.map(user => ({
  ...user,
  email: `${user.name.toLowerCase()}@example.com`
}));
console.log("Users with email:", usersWithEmail);
```

**Output:**
```
Names: ["Alice", "Bob", "Charlie"]
User 2: { id: 2, name: "Bob", role: "user" }
Keys: ["id", "name", "role"]
Values: [1, "Alice", "admin"]
Entries: [["id", 1], ["name", "Alice"], ["role", "admin"]]
Users with email: [{ id: 1, name: "Alice", role: "admin", email: "alice@example.com" }, ...]
```

**Explanation:** Destructuring `{ name }` in `map()` extracts just the name. `Object.fromEntries()` converts an array of `[key, value]` pairs to an object. Spread `...user` creates a shallow copy. `Object.keys/values/entries` provide introspection.

## 🏢 Real World Use Case

**State management in React:** Objects are used extensively for component state, props, and Redux stores. Immutable updates rely on the spread operator.

```javascript
// React state update (immutable)
const [user, setUser] = useState({ name: "", email: "" });

// Update a single field
setUser(prev => ({ ...prev, name: "Alice" }));

// Redux reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
```

## 🎯 Interview Questions

1. **What is the difference between dot notation and bracket notation?** Dot notation requires a valid identifier as the key. Bracket notation accepts any string or expression, enabling dynamic property access and keys with spaces/hyphens.

2. **How do you copy/merge objects?** Shallow copy: `{ ...obj }` or `Object.assign({}, obj)`. Deep copy: `structuredClone(obj)` or `JSON.parse(JSON.stringify(obj))` (has limitations). Merge: `{ ...obj1, ...obj2 }`.

3. **What does `Object.entries()` return?** An array of `[key, value]` pairs from the object's own enumerable string-keyed properties. Useful with `Object.fromEntries()` for transformations.

4. **What is the `this` keyword inside an object method?** `this` refers to the object on which the method was called. Arrow function methods do not have their own `this` — they inherit from the enclosing scope.

5. **How do computed property names work?** In an object literal, `[expression]: value` evaluates the expression and uses the result as the property key. Useful for dynamic keys based on variables.

## ⚠ Common Errors / Mistakes

- Confusing `=` (assignment) with `:` (property definition) inside object literals
- Mutating objects directly when immutability is expected (e.g., React state)
- Comparing objects with `===` (compares reference, not content) — `{} === {}` is `false`
- Using `const` for an object and thinking it prevents property changes (`const` prevents reassignment, not mutation)
- Forgetting that `Object.keys()` returns only own enumerable properties (not inherited ones)

## 📝 Practice Exercises

**Beginner:**
1. Create a `car` object with properties `brand`, `model`, `year`, and a method `start()` that logs "Engine started!".
2. Access and log a property using both dot and bracket notation.
3. Use `Object.keys()` to print all keys of an object `{a: 1, b: 2, c: 3}`.

**Intermediate:**
4. Write a function `pluck(arr, key)` that extracts a property value from each object in an array. E.g., `pluck([{a:1}, {a:2}], "a")` → `[1, 2]`.
5. Merge two objects with overlapping keys using spread, where the second object's values should win.
6. Destructure an object with nested properties: `const user = { name: "Alice", address: { city: "NYC", zip: 10001 } }` — extract `name` and `city` in one destructuring statement.

**Advanced:**
7. Implement a deep merge function that recursively merges two objects (handles nested objects, arrays, and primitive values).
8. Build an object validator utility that takes a schema object and validates that a data object matches the expected types, returning an array of validation errors.
