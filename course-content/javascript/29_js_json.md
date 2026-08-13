## 29. JS JSON
## 📘 Introduction
JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. JavaScript provides `JSON.parse()` and `JSON.stringify()` for converting between JSON strings and JavaScript values.

## 🧠 Key Concepts
- `JSON.parse(str)` — converts a JSON string to a JS object/array/value
- `JSON.stringify(val)` — converts a JS value to a JSON string
- **JSON vs JS objects**: JSON keys must be **double-quoted strings**; no trailing commas; no functions/`undefined`/`Symbol`; only `null`, numbers, strings, booleans, arrays, objects
- **`reviver` parameter** in `JSON.parse(str, reviver)` — transforms values during parsing (useful for Date revival)
- **`replacer` parameter** in `JSON.stringify(val, replacer)` — filters/transforms values during serialization
- **`space` parameter** — prettifies output with indentation (number or string)
- **Handling Dates**: `toJSON()` returns ISO string; revive with a reviver function
- **Circular references**: `JSON.stringify` throws `TypeError` — use a replacer or library

## 💻 Syntax
```javascript
JSON.parse('{"name":"Alice","age":30}');
// { name: 'Alice', age: 30 }

JSON.stringify({ name: 'Alice', age: 30 });
// '{"name":"Alice","age":30}'

JSON.stringify({ name: 'Alice', age: 30 }, null, 2);
// Pretty-printed with 2-space indent
```

## ✅ Example 1 - Basic (Serialize / Deserialize)
**Problem:** Convert a user object to JSON and back, with pretty printing.

**Code:**
```javascript
const user = {
  name: 'Alice',
  age: 30,
  roles: ['admin', 'editor'],
  active: true,
  meta: null
};

const json = JSON.stringify(user, null, 2);
console.log(json);

const parsed = JSON.parse(json);
console.log(parsed.name);   // Alice
console.log(Array.isArray(parsed.roles)); // true
```

**Output:**
```
{
  "name": "Alice",
  "age": 30,
  "roles": [
    "admin",
    "editor"
  ],
  "active": true,
  "meta": null
}
Alice
true
```

**Explanation:** `JSON.stringify` with `null, 2` produces readable indented output. `JSON.parse` reconstructs the JS object. JSON supports `null`, arrays, booleans, numbers, strings, and nested objects — but not functions, `undefined`, or Symbols.

## 🚀 Example 2 - Intermediate (Date Revival + Replacer)
**Problem:** Serialize an object with a Date and revive it properly, and use a replacer to exclude sensitive fields.

**Code:**
```javascript
const session = {
  user: 'alice',
  token: 'secret-123',
  loginAt: new Date('2025-06-23T10:00:00Z'),
  lastActivity: new Date('2025-06-23T12:30:00Z')
};

// Serialize — exclude 'token', format dates as ISO
const json = JSON.stringify(session, (key, value) => {
  if (key === 'token') return undefined;      // omit
  if (value instanceof Date) return value.toISOString();
  return value;
}, 2);

console.log(json);

// Deserialize — revive ISO date strings
const revived = JSON.parse(json, (key, value) => {
  if (key.endsWith('At') && typeof value === 'string') {
    return new Date(value);
  }
  return value;
});

console.log(revived.loginAt instanceof Date); // true
console.log(revived.loginAt.toLocaleString()); // readable date
```

**Output:**
```
{
  "user": "alice",
  "loginAt": "2025-06-23T10:00:00.000Z",
  "lastActivity": "2025-06-23T12:30:00.000Z"
}
true
6/23/2025, 10:00:00 AM
```

**Explanation:** The `replacer` function omits the `token` field and converts `Date` objects to ISO strings. The `reviver` function detects ISO string fields ending with `At` and converts them back to `Date` objects.

## 🏢 Real World Use Case
REST API client-server communication: the server `JSON.stringify`s response data, the client `JSON.parse`s it. LocalStorage persistence — serialize state to JSON on save, parse on load. Deep-cloning objects: `JSON.parse(JSON.stringify(obj))` (with caveats — loses functions, Dates become strings, circular refs crash).

## 🎯 Interview Questions
1. **What is the difference between JSON and a JavaScript object literal?** — JSON keys must be double-quoted strings; JSON cannot contain functions, `undefined`, or `Symbol`; JSON has no trailing commas.
2. **What does `JSON.parse` return if given invalid JSON?** — It throws a `SyntaxError`.
3. **How do you pretty-print a JSON string?** — `JSON.stringify(obj, null, 2)` where `2` is the number of spaces. Can also use a string like `'\t'`.
4. **What is the `replacer` parameter used for?** — A function or array that filters/transforms values during serialization. An array lists allowed keys; a function can omit (`return undefined`) or transform values.
5. **What happens if you `JSON.stringify` an object with a circular reference?** — It throws `TypeError: Converting circular structure to JSON`. You must detect and handle cycles manually (e.g. with a custom replacer or library).

## ⚠ Common Errors / Mistakes
- Using single quotes for JSON strings — JSON requires double quotes
- Trailing commas in JSON — `JSON.parse('{"a":1,}')` throws SyntaxError
- Hoping `JSON.stringify` will preserve `undefined`, `Function`, or `Symbol` — it omits or converts them to `null`
- Assuming `JSON.parse(JSON.stringify(obj))` is a perfect deep clone — it loses Dates, RegExp, `undefined`, functions, and circular refs
- Forgetting to catch `JSON.parse` — always wrap in try/catch or use a safe parser

## 📝 Practice Exercises
**Beginner**
1. Convert `{name: "John", age: 25}` to a JSON string and log it.
2. Parse `'{"brand":"Toyota","model":"Camry","year":2020}'` back to an object and access `model`.
3. Use `JSON.stringify` with `space: 4` on a nested object and print the result.

**Intermediate**
4. Write a safe `JSON.parse` wrapper that returns `null` instead of throwing on invalid JSON.
5. Use a `replacer` to serialize an object but exclude any property whose value is a function.
6. Serialize a `Map` and `Set` to JSON (convert to arrays) and write a `reviver` to reconstruct them.

**Advanced**
7. Implement a custom `deepClone(obj)` that handles Dates, RegExp, Maps, Sets, and circular references — without `JSON.parse(JSON.stringify(...))`.
8. Write a `JSONSchemaValidator` function that takes a parsed JSON object and a schema (describing required types/fields) and returns validation errors for mismatches.
