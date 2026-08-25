## 16. JS Sets
## 📘 Introduction
A `Set` is a built-in JavaScript object that stores **unique values** of any type — primitives or object references. Unlike arrays, Sets automatically prevent duplicate entries and provide efficient lookups, insertion, and deletion. They are iterable in insertion order.

## 🧠 Key Concepts
- `new Set()` — creates an empty Set or from an iterable (e.g. array)
- `set.add(value)` — appends a new unique value
- `set.delete(value)` — removes a value; returns `true` if removed
- `set.has(value)` — returns `true` if value exists
- `set.size` — returns the number of elements (like `.length` for arrays)
- `set.forEach(callback)` — iterates values in insertion order
- `for...of` also works because Sets are iterable
- Converting to Array: `[...set]` or `Array.from(set)`
- **WeakSet** — holds only objects, no size/forEach, helps with memory/garbage collection
- Sets preserve insertion order and do not have indexes

## 💻 Syntax
```javascript
const mySet = new Set([iterable]);
mySet.add(value);
mySet.delete(value);
mySet.has(value);
mySet.size;
mySet.forEach((value) => { /* ... */ });
```

## ✅ Example 1 - Basic (Unique Values)
**Problem:** Remove duplicate numbers from an array.

**Code:**
```javascript
const nums = [1, 2, 2, 3, 4, 4, 5];
const unique = new Set(nums);
console.log(unique);            // Set { 1, 2, 3, 4, 5 }
console.log(unique.size);       // 5
console.log(unique.has(3));     // true
console.log([...unique]);       // [1, 2, 3, 4, 5]
```

**Output:**
```
Set { 1, 2, 3, 4, 5 }
5
true
[1, 2, 3, 4, 5]
```

**Explanation:** `new Set(nums)` filters out duplicates automatically. Spread syntax `[...set]` converts it back to an array. `.size` replaces `.length`, and `.has()` is O(1) vs array `.includes()` which is O(n).

## 🚀 Example 2 - Intermediate (Set Operations)
**Problem:** Perform union, intersection, and difference on two arrays using Sets.

**Code:**
```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const union = new Set([...setA, ...setB]);

const intersection = new Set([...setA].filter(x => setB.has(x)));

const difference = new Set([...setA].filter(x => !setB.has(x)));

console.log('Union:', [...union]);              // [1, 2, 3, 4, 5, 6]
console.log('Intersection:', [...intersection]); // [3, 4]
console.log('Difference:', [...difference]);     // [1, 2]
```

**Output:**
```
Union: [1, 2, 3, 4, 5, 6]
Intersection: [3, 4]
Difference: [1, 2]
```

**Explanation:** The spread operator expands a Set into an array, and `Set.has()` is used for efficient membership checks. Combining these two features enables classic set algebra in a few lines.

## 🏢 Real World Use Case
Tracking **unique visitors** on a website session. Each page load pushes a user ID into a Set, guaranteeing no duplicates. Checking `set.has(id)` before adding is instant, and `.size` reports the real unique visitor count without needing a separate dedup step.

## 🎯 Interview Questions
1. **How is `Set` different from `Array`?** — Set values are unique, Set has O(1) `.has()` vs O(n) `.includes()`, Set does not have numeric indexes.
2. **How do you convert a Set to an Array?** — `[...set]` or `Array.from(set)`.
3. **What is a WeakSet and when would you use it?** — WeakSet holds object references weakly; no `.size`, no iteration. Used to mark objects without preventing garbage collection (e.g., tracking rendered DOM nodes).
4. **Does Set preserve insertion order?** — Yes, values are iterated in the order they were added (per ECMAScript spec).
5. **Can you store both `5` and `"5"` in a Set?** — Yes, Set uses `SameValueZero` comparison, so `5` (number) and `"5"` (string) are distinct.

## ⚠ Common Errors / Mistakes
- Assuming Set has `.length` instead of `.size`
- Trying to access elements by index (`set[0]` is `undefined`)
- Forgetting that object references in a Set are compared by identity, not value — two separate objects `{a:1}` and `{a:1}` are different entries
- Using WeakSet with primitive values (throws `TypeError`)
- Expecting WeakSet to have `.size`, `.forEach()`, or be iterable

## 📝 Practice Exercises
**Beginner**
1. Create a Set from `[1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]` and print its size.
2. Write a function `isUnique(str)` that returns `true` if a string has all unique characters using a Set.
3. Given two arrays `[1, 2, 3]` and `[4, 5, 6]`, find their union using Sets.

**Intermediate**
4. Implement a function `symmetricDifference(a, b)` that returns elements in either Set but not both.
5. Given an array of user objects `[{id:1}, {id:2}, {id:1}]`, use a Set to deduplicate by `id`.
6. Write a function `hasCycle(obj)` that detects if an object graph contains circular references using a WeakSet.

**Advanced**
7. Implement a `MultiSet` (bag) class — like a Set but allows duplicates and tracks count of each element.
8. Given a large array of log entries, use a Set to find all unique IP addresses and count how many appear more than 10 times.
