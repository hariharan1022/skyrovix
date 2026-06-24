## 15. JS Arrays

## 📘 Introduction

Arrays are ordered, indexed collections of values in JavaScript. They are dynamic (resizable), can hold mixed types, and inherit from `Array.prototype` which provides a rich set of methods for iteration, transformation, and manipulation. Arrays are technically objects with numeric keys and a `length` property.

## 🧠 Key Concepts

- **Array creation**: `[]` literal, `new Array()`, `Array.from()`, `Array.of()`, spread `[...iterable]`
- **Indexing**: 0-based; `arr[0]` for first element, `arr[arr.length - 1]` for last
- **`length` property**: Tracks the number of elements; can be assigned to truncate the array
- **Stack/Queue methods**: `push()` (add to end), `pop()` (remove from end), `shift()` (remove from start), `unshift()` (add to start)
- **Slicing/Splicing**: `slice(start, end)` — returns new array (non-mutating); `splice(start, deleteCount, ...items)` — mutates original
- **`concat()`**: Merges arrays into a new array
- **Search methods**: `includes()`, `indexOf()`, `lastIndexOf()`, `find()`, `findIndex()`
- **Iteration methods**: `forEach()`, `map()`, `filter()`, `reduce()`, `some()`, `every()`
- **`sort()`**: Sorts in place (default converts to strings); takes a compare function
- **`join()`**: Joins elements into a string with a separator
- **Spread operator**: `[...arr1, ...arr2]` — expands array elements
- **Destructuring**: `const [first, second, ...rest] = arr`
- **Multi-dimensional arrays**: Arrays of arrays; accessed with `arr[row][col]`

## 💻 Syntax

```javascript
// Creation
const arr = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, { a: 1 }];
const fromStr = Array.from("hello");       // ["h", "e", "l", "l", "o"]
const ofNums = Array.of(1, 2, 3);           // [1, 2, 3]

// Adding/Removing
arr.push(6);         // [1, 2, 3, 4, 5, 6]
arr.pop();           // [1, 2, 3, 4, 5]
arr.unshift(0);      // [0, 1, 2, 3, 4, 5]
arr.shift();         // [1, 2, 3, 4, 5]

// Search and Access
arr.includes(3);     // true
arr.indexOf(3);      // 2
arr.find(x => x > 3); // 4
arr.findIndex(x => x > 3); // 3

// Transformation (all return new arrays)
arr.map(x => x * 2);        // [2, 4, 6, 8, 10]
arr.filter(x => x % 2 === 0); // [2, 4]
arr.reduce((sum, x) => sum + x, 0); // 15
```

## ✅ Example 1 - Basic

**Problem:** Create a shopping cart array with operations: add item, remove item, calculate total.

**Code:**
```javascript
const cart = [];

// Add items
cart.push({ name: "Apple", price: 0.99, qty: 5 });
cart.push({ name: "Banana", price: 0.59, qty: 3 });
cart.push({ name: "Milk", price: 3.49, qty: 1 });

// Calculate total
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log("Cart total: $" + total.toFixed(2));

// Remove an item by index
cart.splice(1, 1); // Remove Banana (index 1)
console.log("Items in cart:", cart.length);

// Check if item exists
const hasMilk = cart.some(item => item.name === "Milk");
console.log("Has Milk:", hasMilk);
```

**Output:** `Cart total: $10.21`, `Items in cart: 2`, `Has Milk: true`

**Explanation:** `push()` adds items. `reduce()` sums `price * qty` for each item. `splice(1, 1)` removes one element at index 1. `some()` checks if any item matches the condition.

## 🚀 Example 2 - Intermediate

**Problem:** Transform and analyze an array of student grades using multiple array methods.

**Code:**
```javascript
const students = [
  { name: "Alice", scores: [85, 92, 88] },
  { name: "Bob", scores: [70, 65, 72] },
  { name: "Charlie", scores: [95, 98, 100] },
  { name: "Diana", scores: [60, 55, 58] }
];

// Calculate average for each student
const withAverage = students.map(student => {
  const avg = student.scores.reduce((sum, s) => sum + s, 0) / student.scores.length;
  return { ...student, average: Math.round(avg) };
});

// Filter passing students (average >= 70)
const passing = withAverage.filter(s => s.average >= 70);

// Sort by average descending
const ranked = [...passing].sort((a, b) => b.average - a.average);

// Get names of top performers
const topNames = ranked.map(s => s.name);

console.log("All averages:", withAverage.map(s => `${s.name}: ${s.average}`));
console.log("Passing:", passing.map(s => s.name));
console.log("Ranked:", topNames);

// Check if anyone scored a perfect 100
const hasPerfect = students.some(s => s.scores.includes(100));
console.log("Has perfect score:", hasPerfect);
```

**Output:**
```
All averages: ["Alice: 88", "Bob: 69", "Charlie: 98", "Diana: 58"]
Passing: ["Alice", "Charlie"]
Ranked: ["Charlie", "Alice"]
Has perfect score: true
```

**Explanation:** `map()` transforms students by adding the `average` property. `filter()` keeps passing students. `sort()` with compare function `b.average - a.average` sorts descending. The spread `[...passing]` creates a copy before sorting to avoid mutating the original.

## 🏢 Real World Use Case

**Data visualization dashboards:** Arrays are the backbone of data processing in analytics dashboards. API responses (arrays of records) are transformed using `map`, `filter`, `reduce`, and `sort` before being passed to charting libraries like D3.js or Chart.js.

```javascript
fetch("/api/analytics/revenue")
  .then(res => res.json())
  .then(data => {
    const monthlyTotals = data
      .filter(record => record.year === 2024)
      .sort((a, b) => a.month - b.month)
      .map(record => ({
        label: record.month,
        value: record.revenue
      }));
    renderChart(monthlyTotals);
  });
```

## 🎯 Interview Questions

1. **What is the difference between `slice()` and `splice()`?** `slice(start, end)` returns a new array (non-mutating). `splice(start, deleteCount, ...items)` modifies the original array by removing/replacing elements.

2. **How does `map()` differ from `forEach()`?** `map()` returns a new array of the same length (each element transformed). `forEach()` executes a function on each element but returns `undefined`. Use `map()` for transformation, `forEach()` for side effects.

3. **What does `reduce()` do?** `reduce()` executes a reducer function on each element, accumulating a single result. `arr.reduce((acc, val) => acc + val, 0)` sums the array. The second argument is the initial accumulator value.

4. **How does `sort()` work by default, and how do you sort numbers correctly?** Default `sort()` converts elements to strings and sorts lexicographically. For numeric sort, pass a compare function: `sort((a, b) => a - b)` for ascending, `sort((a, b) => b - a)` for descending.

5. **What is the spread operator with arrays?** `[...arr]` creates a shallow copy. `[...arr1, ...arr2]` merges arrays. `...arr` can also be used in function calls to pass array elements as arguments: `Math.max(...[1, 5, 3])`.

## ⚠ Common Errors / Mistakes

- Confusing `slice()` (returns new array) with `splice()` (mutates original)
- Sorting numbers without a compare function (`[1, 2, 10].sort()` → `[1, 10, 2]`)
- Mutating an array while iterating over it with `forEach`/`map` (unexpected results)
- Using `delete arr[i]` instead of `splice()` (leaves an empty slot, doesn't update length)
- Forgetting that `reduce()` needs an initial value for empty arrays (TypeError without it)

## 📝 Practice Exercises

**Beginner:**
1. Create an array of 5 fruits. Add one to the end, remove the first, and log the resulting array.
2. Use `map()` to create a new array of squared values from `[2, 4, 6, 8]`.
3. Use `filter()` to get only the strings longer than 4 characters from `["cat", "elephant", "dog", "tiger"]`.

**Intermediate:**
4. Write a function `flatten(arr)` that takes a 2D array and returns a flat array (e.g., `[[1,2], [3,4]]` → `[1,2,3,4]`).
5. Given an array of transactions (`{amount, type: "credit"|"debit"}`), use `reduce()` to calculate the balance.
6. Sort an array of people objects by age in descending order, then extract just the names.

**Advanced:**
7. Implement your own version of `Array.prototype.map()` as a standalone function `myMap(arr, callback)`.
8. Write a function `groupBy(arr, key)` that groups an array of objects by a given property key, returning an object where keys are the distinct property values and values are arrays of matching objects (e.g., `groupBy(students, "grade")`).
