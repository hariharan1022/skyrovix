## 8. JS Loops

## 📘 Introduction

Loops execute a block of code repeatedly until a specified condition is false. JavaScript offers several loop types: `for`, `while`, `do...while`, `for...in`, and `for...of`. Choosing the right loop and understanding `break`/`continue` is essential for efficient data processing.

## 🧠 Key Concepts

- **`for` loop**: Most common; uses initialization, condition, and increment in one line
- **`while` loop**: Repeats while condition is true; checks before each iteration
- **`do...while` loop**: Executes at least once; checks condition after the block
- **`for...in`**: Iterates over enumerable property keys of an object (including inherited)
- **`for...of`**: Iterates over iterable values (arrays, strings, Maps, Sets, etc.)
- **`break`**: Exits the loop immediately
- **`continue`**: Skips the rest of the current iteration and continues with the next
- **Performance considerations**: Minimize DOM access inside loops, avoid infinite loops, use appropriate loop type

## 💻 Syntax

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// while loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do...while loop (always runs at least once)
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// for...in (object keys)
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}

// for...of (array values)
const arr = [10, 20, 30];
for (let value of arr) {
  console.log(value);
}

// break and continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop at 7
  console.log(i);        // 0, 1, 2, 4, 5, 6
}
```

## ✅ Example 1 - Basic

**Problem:** Sum all numbers from 1 to 100 using a `for` loop.

**Code:**
```javascript
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log("Sum of 1 to 100:", sum);
```

**Output:** `Sum of 1 to 100: 5050`

**Explanation:** The `for` loop initializes `i = 1`, checks `i <= 100`, executes the body (`sum += i`), then increments `i++`. This continues until `i` becomes 101 and the condition fails. This is the classic counter-controlled loop.

## 🚀 Example 2 - Intermediate

**Problem:** Iterate over an array of objects and filter/transform data using `for...of` with `break` and `continue`.

**Code:**
```javascript
const employees = [
  { name: "Alice", salary: 50000, active: true },
  { name: "Bob", salary: 60000, active: false },
  { name: "Charlie", salary: 70000, active: true },
  { name: "Diana", salary: 55000, active: true },
  { name: "Eve", salary: 80000, active: false }
];

let totalActiveSalary = 0;
let count = 0;

for (const emp of employees) {
  if (!emp.active) continue;           // skip inactive
  totalActiveSalary += emp.salary;
  count++;
  if (totalActiveSalary > 120000) break; // stop early if threshold reached
}

console.log(`Active employees processed: ${count}`);
console.log(`Total salary: $${totalActiveSalary}`);
```

**Output:** `Active employees processed: 3` and `Total salary: $180000`

**Explanation:** `for...of` iterates over array elements. `continue` skips inactive employees. `break` stops the loop early once the total exceeds 120000. This demonstrates conditional loop control for performance optimization.

## 🏢 Real World Use Case

**Pagination and data processing:** When rendering a large list (e.g., 10,000 products), you never loop through all items at once in the DOM. Instead, you paginate or virtualize. In backend Node.js, loops process database records in batches to avoid memory overflow. `for...of` is preferred for readability over traditional `for` with index tracking.

```javascript
// Batch processing example
const BATCH_SIZE = 100;
for (let i = 0; i < records.length; i += BATCH_SIZE) {
  const batch = records.slice(i, i + BATCH_SIZE);
  await processBatch(batch);
}
```

## 🎯 Interview Questions

1. **What is the difference between `for...in` and `for...of`?** `for...in` iterates over enumerable property **keys** (strings) of an object. `for...of` iterates over iterable **values** (arrays, strings, Maps, Sets). Use `for...in` for objects, `for...of` for arrays.

2. **What are the risks of `for...in` with arrays?** It iterates over all enumerable properties, including inherited ones and non-numeric properties added to the array. It also iterates properties as strings, not indices.

3. **What is the difference between `while` and `do...while`?** `while` checks the condition before executing the body (may never execute). `do...while` executes the body once before checking the condition (always runs at least once).

4. **When would you use `break` vs `continue`?** `break` exits the entire loop immediately. `continue` skips the current iteration and moves to the next one. Use `break` for early termination when a condition is met; use `continue` to skip unwanted cases.

5. **How can you optimize loop performance?** Cache array length (`for (let i = 0, len = arr.length; i < len; i++)`), minimize DOM access inside loops, avoid `for...in` for arrays, use early `break`/`continue`, and consider `forEach` for readability unless performance-critical.

## ⚠ Common Errors / Mistakes

- Infinite loops: forgetting to increment the counter or a condition that never becomes false
- Off-by-one errors: using `<=` instead of `<` or vice versa
- Modifying an array while iterating over it (unexpected behavior)
- Using `for...in` for arrays and getting string keys instead of indices
- Performing expensive operations (like DOM manipulation) inside hot loops
- Forgetting that `forEach` cannot be stopped with `break` (use `some` or `every` instead)

## 📝 Practice Exercises

**Beginner:**
1. Write a `for` loop that prints all even numbers from 2 to 20.
2. Use a `while` loop to count down from 10 to 1 and print "Blast off!" after.
3. Create a `for...of` loop that logs each character of the string "JavaScript".

**Intermediate:**
4. Write a function that finds the first prime number greater than a given number N using `while` and `break`.
5. Use nested `for` loops to generate a multiplication table (1 to 10) displayed as a grid.
6. Given an array of numbers, use a `for...of` loop with `continue` to sum only the odd numbers.

**Advanced:**
7. Implement a simple pagination system: given an array of 100 items and a page size, loop through and log items page by page (e.g., "Page 1: items 1-10").
8. Write a deep object traversal function that uses recursion and/or loops to print all leaf values of a nested object (any depth).
