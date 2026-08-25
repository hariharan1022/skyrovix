## 20. JS RegExp
## 📘 Introduction
Regular Expressions (RegExp) are patterns used to **match character combinations** in strings. JavaScript supports RegExp via the `RegExp` object and literal syntax `/pattern/flags`. They are essential for validation, parsing, search-and-replace, and text extraction.

## 🧠 Key Concepts
- `RegExp` literal: `/pattern/flags` (e.g. `/hello/gi`)
- `RegExp` object: `new RegExp('pattern', 'flags')`
- **Flags**: `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotAll), `u` (unicode), `y` (sticky)
- `.test(str)` — returns `true` if match found
- `.exec(str)` — returns match details or `null`; remembers `lastIndex` with `g` flag
- `str.match(regex)` — returns array of matches (or null)
- `str.replace(regex, replacement)` — replace with regex; `$1`, `$&` in replacement string
- **Character classes**: `\d` (digit), `\w` (word), `\s` (space), `.` (any except newline)
- **Quantifiers**: `+` (1+), `*` (0+), `?` (0 or 1), `{n,m}` (range)
- **Groups**: `(...)` — capturing group; `(?:...)` — non-capturing
- **Lookahead**: `x(?=y)` — positive, `x(?!y)` — negative

## 💻 Syntax
```javascript
/pattern/flags
new RegExp('pattern', 'flags')

/\d{3}-\d{4}/.test('555-1234');  // true
'hello world'.match(/\w+/g);     // ['hello', 'world']
'hello'.replace(/l/g, 'x');      // 'hexxo'
```

## ✅ Example 1 - Basic (Email Validation)
**Problem:** Check if a string looks like a basic email address.

**Code:**
```javascript
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

console.log(emailRegex.test('user@example.com'));    // true
console.log(emailRegex.test('hello@world'));          // false
console.log(emailRegex.test('user@.com'));            // false
```

**Output:**
```
true
false
false
```

**Explanation:** `^` anchors to start, `[a-zA-Z0-9._%+-]+` is the local part, `@` literal, domain and TLD follow. `$` anchors to end. `+` requires at least one character.

## 🚀 Example 2 - Intermediate (Extract Data with Groups)
**Problem:** Parse a log line and extract timestamp, level, and message.

**Code:**
```javascript
const logLine = '[2025-06-23 10:30:45] ERROR Failed to connect to database';
const logRegex = /^\[(.+?)\]\s+(\w+)\s+(.+)$/;

const match = logLine.match(logRegex);
if (match) {
  const [, timestamp, level, message] = match;
  console.log('Time:', timestamp);
  console.log('Level:', level);
  console.log('Message:', message);
}
```

**Output:**
```
Time: 2025-06-23 10:30:45
Level: ERROR
Message: Failed to connect to database
```

**Explanation:** Capturing groups `(...)` extract portions. `\[` and `\]` escape brackets. `.+?` is a lazy quantifier (stop at first `]`). `\s+` matches whitespace. `$` ends the match. Destructuring ignores the full match at index 0.

## 🏢 Real World Use Case
Form input sanitization on the client side — validating phone numbers (`/^\+?\d{7,15}$/`), stripping HTML tags (`/<[^>]*>/g`), extracting hashtags from social posts (`/#\w+/g`), and password strength checks (lookahead for uppercase, digit, special char).

## 🎯 Interview Questions
1. **What is the difference between `.test()` and `.exec()`?** — `.test()` returns boolean; `.exec()` returns an array of match details (or `null`) and tracks `lastIndex` with the `g` flag.
2. **What is a capturing vs non-capturing group?** — `(...)` captures matched text into groups accessible via `$1`, `$2`; `(?:...)` groups without capturing.
3. **How do you make a regex match case-insensitive?** — Add the `i` flag: `/hello/i`.
4. **What does the `g` flag do?** — Global flag; without it regex stops at first match. With `g`, `.match()` returns all matches and `.exec()` continues from `lastIndex`.
5. **What is a lookahead? Give an example.** — Positive lookahead `x(?=y)` matches `x` only if followed by `y`. Negative `x(?!y)` matches `x` only if NOT followed by `y`. Example: `/foo(?=bar)/` matches `foo` in `foobar` but not in `foobaz`.

## ⚠ Common Errors / Mistakes
- Forgetting to escape special chars (`\.`, `\+`, `\?`, `\(`, `\)`, `\[`, `\]`, `\\`)
- Using `\d` and expecting it to match Unicode digits (use `\p{N}` with `u` flag)
- Not anchoring patterns (`^...$`) — partial matches can pass validation
- Stateful `.exec()` with `g` flag in a loop — forgetting to reset `lastIndex`
- Overusing regex for non-regular grammars (e.g. parsing full HTML — use a DOM parser)

## 📝 Practice Exercises
**Beginner**
1. Write a regex that matches a 10-digit US phone number: `123-456-7890`.
2. Use `.replace()` with a regex to censor all digits in a string replacing them with `*`.
3. Test if a string contains at least one uppercase letter, one digit, and is at least 8 chars long.

**Intermediate**
4. Extract all URLs (`https?://...`) from a block of text using `match` with the `g` flag.
5. Write a function `camelToSnake(str)` that converts `camelCase` to `snake_case` using regex replace.
6. Use a regex with lookahead to validate a password: at least 8 chars, one uppercase, one lowercase, one digit, one special character.

**Advanced**
7. Write a regex-based lexer that tokenizes a simple arithmetic expression like `"12 + 34 * (56 - 7)"` into tokens `[NUMBER, PLUS, NUMBER, STAR, LPAREN, ...]`.
8. Implement a function `parseQueryString(str)` that parses a URL query string `?name=John&age=30&city=NYC` into an object using regex groups and `.replace`/`.matchAll`.
