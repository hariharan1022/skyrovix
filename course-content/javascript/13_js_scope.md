## 13. JS Scope

## 📘 Introduction

Scope determines the accessibility of variables, functions, and objects in different parts of your code. JavaScript has four types of scope: global, function, block, and module scope. Understanding scope is critical for writing predictable, bug-free code and is essential for mastering closures, hoisting, and the `var`/`let`/`const` distinction.

## 🧠 Key Concepts

- **Global scope**: Variables declared outside any function or block; accessible everywhere (attached to `window` in browsers, `global` in Node)
- **Function scope**: Variables declared with `var` inside a function are accessible only within that function
- **Block scope**: Variables declared with `let` and `const` inside `{}` are only accessible within that block
- **`var` vs `let` vs `const**: `var` is function-scoped, hoisted, can be redeclared; `let` and `const` are block-scoped, hoisted but not initialized (Temporal Dead Zone)
- **Lexical scoping**: Inner functions can access variables of outer functions (scope chain determined by code structure at write time)
- **Hoisting**: Variable and function declarations are moved to the top of their scope during compilation
- **Closure**: A function retains access to its lexical scope even when executed outside that scope
- **Module scope**: ES modules (`import`/`export`) have their own scope; top-level variables are not global

## 💻 Syntax

```javascript
// Global scope
const globalVar = "I'm global";

function scopeDemo() {
  // Function scope
  var functionScoped = "Function only";
  let blockScoped = "Block only";

  if (true) {
    // Block scope
    let blockLet = "Inside block";
    var blockVar = "Still function scope!"; // NOT block-scoped
    const blockConst = "Also block scoped";
  }

  console.log(functionScoped);  // OK
  console.log(blockVar);        // OK (var is function-scoped)
  // console.log(blockLet);     // ReferenceError
  // console.log(blockConst);   // ReferenceError
}

// Lexical scoping / Closure
function outer(x) {
  return function inner(y) {
    return x + y;  // inner has access to x
  };
}
const add5 = outer(5);
console.log(add5(3));  // 8
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate global, function, and block scope with `var`, `let`, and `const`.

**Code:**
```javascript
let global = "global";

function testScope() {
  var funcVar = "function var";
  let funcLet = "function let";

  if (true) {
    var blockVar = "I'm var in block";
    let blockLet = "I'm let in block";
    console.log(blockLet);    // Works: "I'm let in block"
  }

  console.log(global);       // Works: "global"
  console.log(funcVar);      // Works: "function var"
  console.log(blockVar);     // Works: "I'm var in block" (var ignores block)
  // console.log(blockLet);  // ReferenceError: blockLet is not defined
}

testScope();
// console.log(funcVar);     // ReferenceError
```

**Output:** `"I'm let in block"`, `"global"`, `"function var"`, `"I'm var in block"` (last line would error if uncommented)

**Explanation:** `var` is function-scoped — it leaks out of the `if` block. `let` is block-scoped — it's only accessible inside the `if` block. `global` is accessible everywhere. `funcVar` is scoped to `testScope`.

## 🚀 Example 2 - Intermediate

**Problem:** Use closures to create a private counter with increment, decrement, and reset capabilities.

**Code:**
```javascript
function createCounter(initial = 0) {
  let count = initial;  // private variable

  return {
    increment() { count++; },
    decrement() { count--; },
    reset() { count = initial; },
    getValue() { return count; }
  };
}

const counter = createCounter(10);
console.log(counter.getValue()); // 10
counter.increment();
counter.increment();
console.log(counter.getValue()); // 12
counter.decrement();
console.log(counter.getValue()); // 11
counter.reset();
console.log(counter.getValue()); // 10

// count is not accessible directly
// console.log(counter.count);   // undefined
```

**Output:** `10`, `12`, `11`, `10`

**Explanation:** The closure `createCounter` returns an object with methods that retain access to the private `count` variable via closure. No external code can access or modify `count` directly — it is truly private. This is the module/revealing module pattern.

## 🏢 Real World Use Case

**Module pattern and encapsulation:** Before ES modules, closures provided the only way to create private state. Even today, closures are used in React hooks, Redux selectors, Express middleware factories, and any scenario requiring data privacy with controlled access.

```javascript
// Redux middleware with closure
const loggerMiddleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};
```

## 🎯 Interview Questions

1. **What is the difference between `var`, `let`, and `const`?** `var` is function-scoped, hoisted to the top, can be redeclared. `let` and `const` are block-scoped, hoisted but not initialized (Temporal Dead Zone). `const` cannot be reassigned.

2. **What is hoisting?** JavaScript's behavior of moving declarations to the top of their scope during compilation. `var` declarations are hoisted and initialized as `undefined`. `let`/`const` are hoisted but not initialized (TDZ). Function declarations are hoisted fully.

3. **What is a closure?** A closure is formed when an inner function references variables from its outer scope after the outer function has returned. The inner function "closes over" those variables, keeping them alive.

4. **What is the Temporal Dead Zone (TDZ)?** The period between entering a scope and the variable's declaration where `let` and `const` variables exist but cannot be accessed. Accessing them throws a `ReferenceError`.

5. **What is lexical scoping?** The scope resolution that uses the location of a variable in the source code (where it's written) to determine its accessibility. Inner functions can access outer function variables based on the nested structure of the code.

## ⚠ Common Errors / Mistakes

- Assuming `var` is block-scoped (it isn't — leads to bugs in loops and conditionals)
- Accessing `let`/`const` before declaration (ReferenceError from TDZ)
- Creating accidental global variables by omitting `let`/`const`/`var`
- Losing `this` context when extracting a method from an object (arrow functions help)
- Creating closures in loops with `var` (all iterations share the same variable; use `let` or an IIFE to fix)

## 📝 Practice Exercises

**Beginner:**
1. Write a script that demonstrates a `ReferenceError` by accessing a `let` variable before declaration.
2. Create a global variable and a function-scoped variable; verify they are accessible at the right levels.
3. Show that `var` inside an `if` block is accessible outside the block, but `let` is not.

**Intermediate:**
4. Write a function `once(fn)` that returns a new function that only calls `fn` the first time it's invoked (using closure to track state).
5. Fix a loop with `var` that logs the wrong value in callbacks by converting it to `let` and explain the difference.
6. Implement a simple `throttle` function that limits how often a callback can be called using a closure.

**Advanced:**
7. Implement a simple dependency injection container using closures: `container.register("db", dbInstance)` and `container.resolve("db")` should return the same instance.
8. Build a middleware pipeline using closures (similar to Express/Koa) where each middleware function receives `context` and a `next` function, passing control through the chain.
