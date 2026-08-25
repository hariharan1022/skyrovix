## 11. JS Functions

## 📘 Introduction

Functions are the fundamental building blocks of JavaScript. They are reusable blocks of code that can take inputs (parameters), perform actions, and return outputs. JavaScript supports multiple function syntaxes: declarations, expressions, arrow functions, and more. Functions are first-class citizens — they can be assigned to variables, passed as arguments, and returned from other functions.

## 🧠 Key Concepts

- **Function declaration**: `function name() {}` — hoisted, can be called before definition
- **Function expression**: `const name = function() {}` — not hoisted, assigned to variable
- **Arrow functions**: `const name = () => {}` — concise syntax, no own `this`, no `arguments` object
- **Parameters vs Arguments**: Parameters are declared in the function definition; arguments are passed when called
- **Default parameters**: `function(a, b = 10) {}` — fallback if argument is `undefined`
- **Rest parameters**: `function(...args) {}` — collects remaining arguments into an array
- **Return values**: Functions return `undefined` by default; use `return` to return a value
- **IIFE (Immediately Invoked Function Expression)**: `(function() {})()` — runs immediately
- **Callback functions**: Functions passed as arguments to other functions (e.g., event handlers, array methods)
- **`this` keyword**: Refers to the execution context; behaves differently in arrow functions vs regular functions

## 💻 Syntax

```javascript
// Function declaration (hoisted)
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Can call before definition

// Function expression (not hoisted)
const greetExpr = function(name) {
  return `Hello, ${name}!`;
};

// Arrow function
const greetArrow = (name) => `Hello, ${name}!`;

// Default parameters
function multiply(a, b = 1) {
  return a * b;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

// IIFE
(function() {
  console.log("Runs immediately!");
})();

// Callback function
function processUserInput(callback) {
  const name = prompt("Enter name:");
  callback(name);
}
```

## ✅ Example 1 - Basic

**Problem:** Write a function that calculates the factorial of a number using recursion.

**Code:**
```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(0));
```

**Output:** `120` and `1`

**Explanation:** The function calls itself with `n - 1` until it reaches the base case (0 or 1). Each recursive call multiplies `n` by the result of `factorial(n - 1)`. This demonstrates function declarations, recursion, and return values.

## 🚀 Example 2 - Intermediate

**Problem:** Use a callback function with array methods to filter and transform data.

**Code:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Filter: keep even numbers
const evens = numbers.filter(n => n % 2 === 0);

// Map: double each number
const doubled = numbers.map(n => n * 2);

// Reduce: calculate product
const product = numbers.reduce((acc, n) => acc * n, 1);

// Custom higher-order function
function operateOnArray(arr, operation) {
  return arr.map(operation);
}

const squared = operateOnArray(numbers, n => n ** 2);

console.log("Evens:", evens);
console.log("Doubled:", doubled);
console.log("Product:", product);
console.log("Squared:", squared);
```

**Output:**
```
Evens: [2, 4, 6]
Doubled: [2, 4, 6, 8, 10, 12]
Product: 720
Squared: [1, 4, 9, 16, 25, 36]
```

**Explanation:** Arrow functions are used as callbacks for `filter()`, `map()`, and `reduce()`. The custom `operateOnArray` function accepts a callback (`operation`) and applies it to each element. This demonstrates first-class functions and the callback pattern.

## 🏢 Real World Use Case

**Express.js middleware:** Functions as building blocks for request/response pipeline. Each middleware is a function that receives `req`, `res`, and `next`. Arrow functions are used for concise inline handlers. Callbacks handle async operations (increasingly replaced by async/await).

```javascript
const express = require("express");
const app = express();

// Middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});
```

## 🎯 Interview Questions

1. **What is the difference between function declaration and function expression?** Declarations are hoisted (can be called before line of definition). Expressions are not hoisted. Declarations create named functions in the enclosing scope; expressions create values assigned to variables.

2. **How do arrow functions differ from regular functions?** Arrow functions have no own `this` (inherit from surrounding scope), no `arguments` object, cannot be used as constructors (no `new`), and have implicit return for single-expression bodies.

3. **What are default parameters and how do they work?** Default parameters allow function parameters to have default values if `undefined` is passed. `function(a, b = 1) {}` — if `b` is undefined, it becomes 1. They are evaluated at call time.

4. **What is an IIFE and why would you use it?** An IIFE (Immediately Invoked Function Expression) runs as soon as it is defined. Used for creating a private scope (pre-ES6 modules), avoiding global variable pollution, and the module pattern.

5. **What is a callback function?** A function passed as an argument to another function, executed later. Used in event handlers, array methods (`map`, `filter`, `forEach`), async operations (`setTimeout`, `fetch`), and middleware patterns.

## ⚠ Common Errors / Mistakes

- Forgetting `return` in functions (returns `undefined` by default)
- Confusing parameters and arguments (parameters = definition, arguments = call time)
- Using arrow functions as object methods and losing `this` binding
- Forgetting to invoke a callback vs passing it (e.g., `setTimeout(func(), 1000)` vs `setTimeout(func, 1000)`)
- Overusing anonymous functions that make stack traces hard to debug (name them for clarity)

## 📝 Practice Exercises

**Beginner:**
1. Write a function `isEven(num)` that returns `true` if a number is even, `false` otherwise.
2. Create an arrow function `greet` that takes a name and returns `"Hello, [name]!"`.
3. Write a function `maxOfThree(a, b, c)` that returns the largest of three numbers.

**Intermediate:**
4. Write a function `createCounter()` that returns a new function. Each call to the returned function increments and returns a counter starting from 0.
5. Implement `memoize(fn)` that takes a function and returns a wrapped version that caches results based on arguments.
6. Write a higher-order function `pipe(...functions)` that takes multiple functions and returns a new function that passes a value through each function in sequence.

**Advanced:**
7. Implement a `debounce(fn, delay)` function that returns a new function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last call.
8. Build a simple event emitter with `on(event, callback)`, `emit(event, ...args)`, and `off(event, callback)` methods using functions and closures.
