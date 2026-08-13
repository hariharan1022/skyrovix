## 9. JS Strings

## 📘 Introduction

Strings represent textual data in JavaScript. They are immutable sequences of UTF-16 code units. JavaScript provides three ways to create strings (single quotes, double quotes, backticks) and a rich set of methods for manipulation. Template literals (backticks) enable string interpolation and multi-line strings.

## 🧠 Key Concepts

- **String creation**: Single quotes (`'...'`), double quotes (`"..."`), template literals (`` `...` ``)
- **Template literals**: Allow `${expression}` interpolation and multi-line strings
- **Escape sequences**: `\'`, `\"`, `\\`, `\n` (newline), `\t` (tab), `\uXXXX` (Unicode)
- **`length` property**: Returns the number of code units
- **Extraction methods**: `slice(start, end)`, `substring(start, end)`, `substr(start, length)` (deprecated)
- **Search methods**: `indexOf()`, `lastIndexOf()`, `includes()`, `startsWith()`, `endsWith()`
- **Transformation methods**: `replace()`, `replaceAll()`, `toUpperCase()`, `toLowerCase()`, `trim()`, `split()`, `concat()`
- **Character access**: `charAt(index)`, bracket notation `str[index]` (read-only)
- **String immutability**: All methods return a new string; original is unchanged

## 💻 Syntax

```javascript
// String creation
const single = 'Hello';
const double = "World";
const template = `Hello, ${double}!`;

// Escape sequences
const quote = "She said, \"Hi!\"";
const multiLine = `Line 1
Line 2
Line 3`;

// Common methods
const str = "JavaScript is awesome!";
str.length;              // 21
str.slice(0, 10);        // "JavaScript"
str.includes("awesome"); // true
str.indexOf("is");       // 11
str.replace("awesome", "great"); // "JavaScript is great!"
str.split(" ");          // ["JavaScript", "is", "awesome!"]
str.toUpperCase();       // "JAVASCRIPT IS AWESOME!"
"  hello  ".trim();      // "hello"
```

## ✅ Example 1 - Basic

**Problem:** Validate and format a user's full name input.

**Code:**
```javascript
const input = "  john  DOE  ";
const trimmed = input.trim();
const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
console.log(`Original: "${input}"`);
console.log(`Formatted: "${formatted}"`);
```

**Output:** `Original: "  john  DOE  "` and `Formatted: "John Doe"`

**Explanation:** `trim()` removes surrounding whitespace. `charAt(0).toUpperCase()` capitalizes the first letter. `slice(1).toLowerCase()` takes the rest of the string and lowercases it. The result is properly capitalized.

## 🚀 Example 2 - Intermediate

**Problem:** Extract and transform data from a CSV-like string.

**Code:**
```javascript
const csv = "Alice,25,Engineer;Bob,30,Designer;Charlie,28,Manager";

const people = csv.split(";").map(entry => {
  const [name, age, role] = entry.split(",");
  return {
    name: name.trim(),
    age: parseInt(age),
    role: role.trim()
  };
});

console.log(people);

// Filter people older than 27
const filtered = people.filter(p => p.age > 27);
console.log("Older than 27:", filtered.map(p => p.name).join(", "));
```

**Output:**
```
[
  { name: "Alice", age: 25, role: "Engineer" },
  { name: "Bob", age: 30, role: "Designer" },
  { name: "Charlie", age: 28, role: "Manager" }
]
Older than 27: Bob, Charlie
```

**Explanation:** `split(";")` separates entries, then each entry is split by `","`. Destructuring assigns the parts to variables. `parseInt()` converts age to a number. `trim()` cleans whitespace. `filter()` and `map()` with `join()` demonstrate chaining string and array methods.

## 🏢 Real World Use Case

**Input sanitization and URL handling:** User-generated content (comments, usernames) must be sanitized — trimmed, escaped, and validated. URLs are constructed with template literals. `encodeURIComponent()` encodes query parameters.

```javascript
const baseUrl = "https://api.example.com/search";
const query = "coffee & tea";
const url = `${baseUrl}?q=${encodeURIComponent(query)}&limit=10`;

const userComment = "  <script>alert('xss')</script>  ";
const safe = userComment.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
```

## 🎯 Interview Questions

1. **What is the difference between `slice()`, `substring()`, and `substr()`?** `slice(start, end)` and `substring(start, end)` take start/end indices (end exclusive). `substr(start, length)` takes start and length. `slice()` accepts negative indices (counts from end); `substring()` treats negatives as 0. `substr()` is deprecated.

2. **How do template literals improve string handling?** They support interpolation (`${expr}`), multi-line strings without `\n`, and tagged templates for custom processing (e.g., styled-components in React).

3. **What does `split()` return?** An array of strings. The separator can be a string or regex. With an empty string separator (`""`), it splits between characters.

4. **What is string immutability?** Strings cannot be changed in place. Methods like `replace()`, `toUpperCase()`, `slice()` return a new string. The original string is unchanged. Reassigning the variable points to a new string.

5. **How do `startsWith()` and `includes()` differ?** `startsWith()` checks if the string begins with a given substring. `includes()` checks if the substring exists anywhere in the string. Both are case-sensitive and accept an optional position parameter.

## ⚠ Common Errors / Mistakes

- Forgetting strings are immutable — calling `str.replace("a", "b")` does not modify `str`
- Confusing `slice` and `splice` (splice is for arrays, not strings)
- Using `==` to compare strings with different casing
- Not handling `null` or `undefined` before calling string methods (TypeError)
- Forgetting that `split("")` splits Unicode characters incorrectly for emoji or multi-byte characters

## 📝 Practice Exercises

**Beginner:**
1. Write code that checks if a string "racecar" is a palindrome (reads same forwards and backwards).
2. Extract the domain name from `"user@example.com"` using `split()`.
3. Use template literals to create a greeting: "Hello, [name]! You are [age] years old."

**Intermediate:**
4. Write a function `countWords(str)` that returns the number of words in a sentence (split by spaces, handling multiple spaces).
5. Given a string like `"product_123_price_50"`, extract the id (123) and price (50) using `split()` and `parseInt()`.
6. Create a function `maskEmail(email)` that replaces the middle characters of the local part with asterisks: `j***@example.com`.

**Advanced:**
7. Build a simple template engine: given a string like `"Hello {{name}}, your order #{{orderId}} is ready"` and an object `{name: "Alice", orderId: 42}`, replace all `{{key}}` placeholders with corresponding values.
8. Write a function `truncateWithEllipsis(str, maxLength)` that truncates a string at word boundaries (not in the middle of a word) and appends `"..."` if truncated.
