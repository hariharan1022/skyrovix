## 24. JS Style Guide
## 📘 Introduction
A consistent coding style improves readability, reduces merge conflicts, and prevents bugs. This guide covers industry conventions (heavily drawn from Airbnb and Google style guides) — naming, formatting, statements, and best practices.

## 🧠 Key Concepts
- **Naming conventions**:
  - `camelCase` — variables, functions, methods, parameters
  - `PascalCase` — classes, constructors, React components, type names
  - `UPPER_SNAKE_CASE` — constants (truly immutable values like `MAX_RETRIES`, `API_URL`)
  - `_private` prefix — not enforced by JS but conventional for private properties (now superseded by `#` private fields)
- **Indentation**: 2 spaces (no tabs); consistent across project
- **Semicolons**: use them — ASI (Automatic Semicolon Insertion) can cause bugs
- `const` / `let` over `var`: — `const` by default, `let` only when reassignment needed; never `var`
- **Arrow functions**: prefer for callbacks and short functions; use `function` for declarations (hoisting)
- **Comments**: `//` for line comments, `/** JSDoc */` for documentation; avoid "obvious" comments

## 💻 Syntax
```javascript
// Constants
const MAX_USERS = 100;

// Variables
let count = 0;
const name = 'Alice';

// Functions
function calculateTotal(items) { /* ... */ }
const double = (x) => x * 2;

// Class
class UserRepository { /* ... */ }

// JSDoc
/** @param {number} a @param {number} b @returns {number} */
function add(a, b) { return a + b; }
```

## ✅ Example 1 - Basic (Good vs Bad Style)
**Problem:** Compare poorly formatted code against a clean version.

**Bad Code:**
```javascript
var x = 5; var y = 10
function F(a,b){return a+b}
let z= F(x,y)
if(z>10)console.log('big')
```

**Good Code:**
```javascript
const x = 5;
const y = 10;

function add(a, b) {
  return a + b;
}

const sum = add(x, y);

if (sum > 10) {
  console.log('big');
}
```

**Explanation:** Good code uses `const` instead of `var`, consistent 2-space indentation, semicolons, descriptive function names, spaces around operators, and blocks always wrapped in `{}` even for single-line `if`.

## 🚀 Example 2 - Intermediate (Consistent Naming Convention)
**Problem:** Refactor a file that mixes naming styles.

**Code (before):**
```javascript
const DB_connection_string = 'mongodb://...';
class user_manager {
  Get_User(id) {
    return fetch(API_URL + '/users/' + id);
  }
}
let x = new user_manager();
```

**Code (after):**
```javascript
const DB_CONNECTION_STRING = 'mongodb://...';

class UserManager {
  getUser(id) {
    return fetch(`${API_URL}/users/${id}`);
  }
}

const manager = new UserManager();
```

**Explanation:** Class → `PascalCase`, constants → `UPPER_SNAKE_CASE`, methods → `camelCase`, template literals replace concatenation. Semicolons added. `const` replaces `let` where no reassignment occurs.

## 🏢 Real World Use Case
A team of 10 developers working on a monorepo. A shared ESLint + Prettier config (Airbnb base, 2-space indent, single quotes, trailing commas) is committed. Pre-commit hooks auto-format. Code reviews reject PRs with `var`, missing semicolons, or inconsistent naming.

## 🎯 Interview Questions
1. **Why use `const` by default instead of `let`?** — Communicates intent that the binding won't be reassigned, prevents accidental reassignment, and the compiler can optimize better.
2. **What naming convention do you use for constants?** — `UPPER_SNAKE_CASE` for values known at compile time (e.g. `MAX_RETRIES`). Use `camelCase` for `const` references that are technically constant but don't "feel" like constants.
3. **Why should you use semicolons when JS has ASI?** — ASI can misinterpret lines starting with `(` or `[`, leading to bugs like the `return` object literal trap. Always use semicolons.
4. **What is the difference between `camelCase` and `PascalCase`?** — `camelCase` starts lowercase (variables/functions), `PascalCase` starts uppercase (classes/components).
5. **When would you use a named function over an arrow function?** — Named functions hoist (usable before declaration), are self-documenting in stack traces, and have their own `this` binding (useful for object methods).

## ⚠ Common Errors / Mistakes
- Mixing styles (`snake_case` + `camelCase` in the same file)
- Using `var` — function-scoped, hoisted, can cause subtle bugs in loops
- Forgetting semicolons before `[` or `(` (e.g. `const x = 5\n[1,2,3].map(...)` → ASI fails)
- Inconsistent indentation (tabs vs spaces, mixed widths)
- Over-commenting obvious code (`// add 1 to i`), under-documenting complex logic

## 📝 Practice Exercises
**Beginner**
1. Rewrite a snippet that uses `var` and no semicolons to use `const`/`let` with proper semicolons.
2. Rename a file that has a mix of `snake_case`, `camelCase`, and `PascalCase` variables to be consistent.
3. Take a one-liner `if(!x)return y;` and expand it to use braces and 2-space indentation.

**Intermediate**
4. Install ESLint with the Airbnb config on a small project — fix all auto-fixable errors and explain the remaining ones.
5. Given a 50-line function, refactor it into smaller named functions with clear JSDoc annotations.
6. Find and document 5 real examples of ASI-related bugs from open-source commit history.

**Advanced**
7. Write a custom ESLint rule that enforces a specific naming pattern (e.g. `use*` prefix for all React hooks) and test it against a sample file.
8. Design a "code review checklist" document covering style, naming, error handling, and performance — then audit a real PR against it and suggest changes.
