## 22. JS Errors
## 📘 Introduction
JavaScript provides a structured error-handling mechanism via `try/catch/finally` blocks and the `throw` statement. Understanding built-in error types and how to create custom errors is critical for writing robust, debuggable applications.

## 🧠 Key Concepts
- `try { ... }` — wraps code that may throw
- `catch (err) { ... }` — handles the error; `err` is the error object
- `finally { ... }` — always executes (cleanup), even after `return`/`throw`
- `throw new Error('message')` — throws a custom error (can throw any value, but throw `Error` objects by convention)
- **Built-in Error types**:
  - `SyntaxError` — malformed JS syntax (parsing error)
  - `ReferenceError` — accessing undefined variable
  - `TypeError` — wrong type or invalid operation (e.g. calling non-function)
  - `RangeError` — value out of allowed range (e.g. `new Array(-1)`)
  - `URIError` — malformed URI functions (`decodeURIComponent('%')`)
  - `EvalError` — deprecated, related to `eval()`
- `Error` object properties: `.name`, `.message`, `.stack` (non-standard but widely available)
- **Custom errors** — extend `Error` class to add context

## 💻 Syntax
```javascript
try {
  // risky code
  JSON.parse(invalid);
} catch (err) {
  console.error(err.name);    // "SyntaxError"
  console.error(err.message); // "Unexpected token..."
  console.error(err.stack);   // stack trace
} finally {
  console.log('cleanup');
}

throw new TypeError('Invalid type');
```

## ✅ Example 1 - Basic (Try/Catch/Finally)
**Problem:** Safely parse JSON and provide a fallback.

**Code:**
```javascript
function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.warn('Parse failed:', err.message);
    return null;
  } finally {
    console.log('Parse attempt finished');
  }
}

console.log(safeParse('{"name":"Alice"}')); // { name: 'Alice' }
console.log(safeParse('not json'));          // null
```

**Output:**
```
Parse attempt finished
{ name: 'Alice' }
Parse attempt finished
null
```

**Explanation:** `JSON.parse` throws a `SyntaxError` on invalid input. The `catch` block returns `null` as a fallback. `finally` runs every time — useful for cleanup like closing files or hiding spinners.

## 🚀 Example 2 - Intermediate (Custom Error + Throw)
**Problem:** Validate user input and throw descriptive custom errors for different failure cases.

**Code:**
```javascript
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.name || user.name.trim() === '') {
    throw new ValidationError('name', 'Name is required');
  }
  if (user.age < 0 || user.age > 150) {
    throw new RangeError('Age must be between 0 and 150');
  }
  if (typeof user.email !== 'string') {
    throw new TypeError('Email must be a string');
  }
  return true;
}

try {
  validateUser({ name: '', age: 200, email: null });
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`Field "${err.field}": ${err.message}`);
  } else if (err instanceof RangeError) {
    console.error(`Range: ${err.message}`);
  } else {
    console.error(`${err.name}: ${err.message}`);
  }
}
```

**Output:**
```
Field "name": Name is required
```

**Explanation:** Custom `ValidationError` extends `Error` with an additional `field` property. `instanceof` differentiates error types. Built-in `RangeError` and `TypeError` are used where appropriate.

## 🏢 Real World Use Case
API middleware that wraps all route handlers in a try/catch, catches specific error types (`ValidationError` → 400, `AuthError` → 401, `NotFoundError` → 404), and returns structured JSON error responses. `finally` is used to log request duration regardless of success/failure.

## 🎯 Interview Questions
1. **What is the difference between `throw 'message'` and `throw new Error('message')`?** — `throw` accepts any value, but throwing a non-Error loses the `.stack` trace and makes debugging harder. Always throw `Error` objects.
2. **Does `finally` run if there is a `return` in `try`?** — Yes. `finally` always executes, even after `return`, `throw`, `break`, or `continue`.
3. **What error type does `JSON.parse('')` throw?** — `SyntaxError` (unexpected end of JSON input).
4. **How do you create a custom error class?** — Class extending `Error`, call `super(message)`, set `this.name`. Optionally add custom properties.
5. **Can you have multiple `catch` blocks in JS?** — No. JavaScript has one `catch` block per `try`. Use `instanceof` checks inside a single `catch` to differentiate error types.

## ⚠ Common Errors / Mistakes
- Catching an error and doing nothing (swallowing errors silently)
- Throwing non-Error values (e.g. `throw 42`) — loses stack trace
- Forgetting that `catch` only catches runtime errors, not parse-time `SyntaxError`s
- Putting cleanup code after try/catch instead of in `finally` — cleanup won't run if an error is re-thrown
- Using `throw` outside a function where it can't be caught

## 📝 Practice Exercises
**Beginner**
1. Write a function `divide(a, b)` that throws a `RangeError` if `b === 0` with message "Division by zero".
2. Wrap `JSON.parse('{invalid}')` in a try/catch and log the error name, message, and stack.
3. Write a try/catch/finally that logs "Done" in finally even after a thrown error.

**Intermediate**
4. Create a custom `HttpError` class with `status` and `message` properties and use it in a fetch wrapper.
5. Write a function `retry(fn, attempts)` that retries a failing function up to N times before throwing.
6. Implement an `assert(condition, message)` utility that throws an `AssertionError` (custom) when condition is falsy.

**Advanced**
7. Build a `SafeProxy` that wraps an object in a Proxy — any property access that throws a ReferenceError/TypeError returns `undefined` instead of crashing.
8. Implement an "error boundary" pattern for async functions — a decorator that catches errors, logs them, and reroutes to a global error handler.
