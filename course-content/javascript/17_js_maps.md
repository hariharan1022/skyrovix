## 17. JS Maps
## 📘 Introduction
A `Map` is a built-in JavaScript object that holds **key-value pairs** where keys can be **any type** (objects, functions, primitives), unlike plain objects which only accept strings/symbols. Maps remember insertion order and provide a rich API for data manipulation.

## 🧠 Key Concepts
- `new Map()` — creates an empty Map; can be seeded with `[[key, val], ...]`
- `map.set(key, value)` — adds/updates an entry
- `map.get(key)` — retrieves value or `undefined`
- `map.delete(key)` — removes entry; returns `true` if existed
- `map.has(key)` — returns `true` if key exists
- `map.size` — number of entries
- `map.forEach((value, key) => ...)` — iterates in insertion order
- `for (let [k, v] of map)` — destructuring iteration
- `map.keys()`, `map.values()`, `map.entries()` — iterators
- **Map vs Object** — Map: any key type, iterable, size property, better performance for frequent add/deletes
- **WeakMap** — keys must be objects, no iteration, no size, keys can be garbage-collected

## 💻 Syntax
```javascript
const map = new Map([['key1', 'val1'], ['key2', 'val2']]);
map.set('name', 'Alice');
map.get('name');       // 'Alice'
map.has('name');       // true
map.delete('name');    // true
map.size;              // 0
map.forEach((val, key) => console.log(key, val));
```

## ✅ Example 1 - Basic (Counting Frequencies)
**Problem:** Count occurrences of each word in a sentence.

**Code:**
```javascript
const sentence = 'the cat and the dog and the bird';
const freq = new Map();

for (const word of sentence.split(' ')) {
  freq.set(word, (freq.get(word) || 0) + 1);
}

freq.forEach((count, word) => console.log(`${word}: ${count}`));
```

**Output:**
```
the: 3
cat: 1
and: 2
dog: 1
bird: 1
```

**Explanation:** Every word becomes a key. `get(word) || 0` handles unseen words. `set` updates the count on each occurrence. Iteration with `forEach` respects insertion order.

## 🚀 Example 2 - Intermediate (Object Keys)
**Problem:** Store metadata associated with DOM-like node objects without modifying them (using objects as keys).

**Code:**
```javascript
const metadata = new Map();
const btn1 = { id: 1 };
const btn2 = { id: 2 };

metadata.set(btn1, { clicks: 5, lastClick: Date.now() });
metadata.set(btn2, { clicks: 3, lastClick: Date.now() - 1000 });

console.log(metadata.get(btn1)); // { clicks: 5, lastClick: ... }
console.log(metadata.size);      // 2
```

**Output:**
```
{ clicks: 5, lastClick: 1719000000000 }
2
```

**Explanation:** Plain objects can only use string keys — using an object as a key coerces it to `"[object Object]"`. Map allows **object references** as actual keys, making it ideal for attaching ephemeral metadata.

## 🏢 Real World Use Case
Caching API responses by request configuration object. A `Map` stores `{url, params, headers}` objects as keys and their fetched data as values. Because the request config objects are keys by reference, the same config reuses cached data. A `WeakMap` variant lets the cache auto-clean when the config goes out of scope.

## 🎯 Interview Questions
1. **How is `Map` different from `Object`?** — Map accepts any key type, is iterable, has `.size`, and preserves insertion order. Objects have a prototype chain and only string/symbol keys.
2. **What is a WeakMap?** — WeakMap keys must be objects; references are weak (GC can collect). No `.size`, no `.forEach()`, no iteration.
3. **How do you iterate over a Map?** — `for (let [k, v] of map)`, `map.forEach((v, k) => ...)`, or `map.entries()`.
4. **What happens if you use `NaN` as a Map key?** — It works. Map uses `SameValueZero` comparison, so `NaN === NaN` is considered true for Map lookups (unlike `===`).
5. **Can a Map have both number `1` and string `"1"` as keys?** — Yes, they are distinct keys because Map uses `SameValueZero` which treats them as different.

## ⚠ Common Errors / Mistakes
- Using objects as keys and expecting two identical-looking objects to match — they're different references
- Forgetting `.size` is a property, not a method
- Using `map[key]` instead of `map.get(key)` — bracket notation treats the Map as a plain object
- Expecting `JSON.stringify(map)` to work — it serializes to `{}` by default
- Using WeakMap with primitive keys (throws `TypeError`)

## 📝 Practice Exercises
**Beginner**
1. Create a Map with three key-value pairs, then log all keys and values using `forEach`.
2. Write a function `invertMap(map)` that swaps keys and values.
3. Given `Map([['a', 1], ['b', 2], ['c', 3]])`, convert it to an array of objects `[{key:'a', value:1}, ...]`.

**Intermediate**
4. Implement a simple in-memory cache using Map with a TTL (time-to-live) — entries expire after N milliseconds.
5. Write a deep-merge function that takes two Maps with nested Map values and merges them recursively.
6. Use a Map to group an array of people `[{name, city}]` by city — the result should be a Map keyed by city with arrays of names as values.

**Advanced**
7. Implement an LRU (Least Recently Used) cache using a Map — when the cache exceeds capacity, evict the least recently used entry.
8. Build a bidirectional Map class (`BiMap`) where both keys and values are unique and you can look up by either.
