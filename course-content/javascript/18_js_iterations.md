## 18. JS Iterations
## 📘 Introduction
JavaScript provides a rich set of iteration methods for arrays (and array-like objects) plus a low-level **iterator protocol**. These methods enable functional, declarative data processing — replacing verbose `for` loops with expressive chainable operations.

## 🧠 Key Concepts
- `forEach(cb)` — executes a function for each element (no return value)
- `map(cb)` — returns a new array of same length, transformed
- `filter(cb)` — returns a new array with elements where cb returned truthy
- `reduce(cb, init)` — accumulates a single value from the array
- `some(cb)` — returns `true` if any element passes the test
- `every(cb)` — returns `true` if all elements pass the test
- `find(cb)` — returns the **first** element that passes (or `undefined`)
- `findIndex(cb)` — returns the index of the first passing element (or `-1`)
- `flatMap(cb)` — maps then flattens one level
- **Iterator Protocol** — object with `next()` returning `{value, done}`
- `[Symbol.iterator]` — makes an object iterable with `for...of`

## 💻 Syntax
```javascript
arr.forEach((val, idx, arr) => {});
arr.map((val) => newVal);
arr.filter((val) => boolean);
arr.reduce((acc, val) => acc + val, initial);
arr.some((val) => boolean);
arr.every((val) => boolean);
arr.find((val) => boolean);
arr.findIndex((val) => boolean);
arr.flatMap((val) => [val, val * 2]);
```

## ✅ Example 1 - Basic (Chaining)
**Problem:** Given an array of numbers, return the squares of even numbers doubled.

**Code:**
```javascript
const nums = [1, 2, 3, 4, 5, 6];

const result = nums
  .filter(n => n % 2 === 0)
  .map(n => n * n);

console.log(result); // [4, 16, 36]
```

**Output:**
```
[4, 16, 36]
```

**Explanation:** `filter` keeps only even numbers. `map` squares each. Chaining creates a readable data pipeline without intermediate variables.

## 🚀 Example 2 - Intermediate (reduce + iterator protocol)
**Problem:** Compute total sales per product category using reduce, then make a custom iterable object.

**Code:**
```javascript
const sales = [
  { product: 'Laptop', category: 'Electronics', amount: 1200 },
  { product: 'Mouse',  category: 'Electronics', amount: 25 },
  { product: 'Book',   category: 'Education',   amount: 15 },
  { product: 'Pen',    category: 'Education',   amount: 3 },
];

const byCategory = sales.reduce((acc, sale) => {
  acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
  return acc;
}, {});

console.log(byCategory); // { Electronics: 1225, Education: 18 }

// Custom iterable
const range = { from: 1, to: 3, [Symbol.iterator]() {
  let i = this.from;
  return { next: () => ({ value: i, done: i++ > this.to }) };
}};

console.log([...range]); // [1, 2, 3]
```

**Output:**
```
{ Electronics: 1225, Education: 18 }
[1, 2, 3]
```

**Explanation:** `reduce` accumulates category totals into an object. The iterator protocol (`[Symbol.iterator]`) makes any object work with `for...of` and spread.

## 🏢 Real World Use Case
E-commerce order processing pipeline: fetch orders → `filter` pending payments → `map` to invoice DTOs → `reduce` totals → `some` to detect fraud patterns → `find` highest-value order. Each step is a pure function that can be tested and composed independently.

## 🎯 Interview Questions
1. **What is the difference between `forEach` and `map`?** — `forEach` returns `undefined` (side effects), `map` returns a new transformed array.
2. **How does `reduce` work?** — It iterates through the array, passing an accumulator and current value to the callback. The final accumulator is returned. If no initial value is given, first element is used.
3. **What is the iterator protocol?** — An object with a `next()` method that returns `{value: any, done: boolean}`. Implementing `[Symbol.iterator]` makes an object iterable.
4. **When would you use `some` vs `find`?** — `some` returns a boolean (did any pass?), `find` returns the actual element that passed.
5. **What does `flatMap` do that `map` + `flat` doesn't?** — `flatMap` maps then flattens **one level** in a single pass; `map().flat(1)` creates an intermediate array. `flatMap` is also more efficient.

## ⚠ Common Errors / Mistakes
- Forgetting that `forEach` does NOT return a new array — you can't chain it like `map`
- Mutating the array inside iteration methods — leads to unpredictable results
- Not providing an initial value to `reduce` on an empty array (throws `TypeError`)
- Confusing `findIndex` (returns number) with `find` (returns element)
- Assuming `filter` modifies the original array — it returns a new array

## 📝 Practice Exercises
**Beginner**
1. Given `[1, 2, 3, 4, 5]`, use `map` to get `[2, 4, 6, 8, 10]`.
2. Use `filter` to extract all strings longer than 5 characters from `['hi', 'hello', 'greetings']`.
3. Use `forEach` to log each element of `['a', 'b', 'c']` along with its index.

**Intermediate**
4. Given an array of transactions `[{type, amount}]`, use `reduce` to compute total credit and total debit in one pass.
5. Use `some` and `every` to validate a form input object — check that all fields are non-empty and at least one checkbox is checked.
6. `flatMap` an array of sentences into individual words: `['hello world', 'foo bar']` → `['hello', 'world', 'foo', 'bar']`.

**Advanced**
7. Implement a custom `Pipeline` class that chains `filter → map → reduce` lazily — operations run only when `.run()` is called.
8. Create an infinite iterable using `[Symbol.iterator]` that generates Fibonacci numbers; then use `find` to get the first Fibonacci number > 1000.
