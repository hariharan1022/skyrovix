## 27. JS Modules
## 📘 Introduction
Modules allow splitting code into separate files, each with its own scope. ES6 (ES2015) introduced native module syntax (`export`/`import`), which is now the standard. CommonJS (`require`/`module.exports`) was the Node.js standard before ES modules.

## 🧠 Key Concepts
- **Named exports**: `export const x = 1; export function fn() {}`
- **Default export**: `export default class Foo {}` (one per module)
- **Named import**: `import { x, fn } from './module'`
- **Default import**: `import Foo from './module'`
- **Mixed import**: `import Foo, { x, fn } from './module'`
- **Namespace import**: `import * as mod from './module'`
- **Re-export**: `export { x } from './module'`
- **Dynamic imports**: `const mod = await import('./module')`
- **Barrel exports**: `index.js` that re-exports from multiple files
- **ES modules** vs **CommonJS**:
  - ES: `import`/`export`, static analysis, async, `.mjs` or `"type": "module"`
  - CommonJS: `require`/`module.exports`, dynamic, synchronous, `.cjs` or default in Node.js
- **Module scope**: top-level `var`, `const`, `let`, `function`, `class` are not global — they're scoped to the module

## 💻 Syntax
```javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calculator { /* ... */ }

// app.js
import Calculator, { PI, add } from './math.js';
import * as MathStuff from './math.js';
const mod = await import('./math.js'); // dynamic
```

## ✅ Example 1 - Basic (Named + Default Exports/Imports)
**Problem:** Create a validation module and import its functions.

**Code:**
```javascript
// validators.js
export const isEmail = (str) => /^.+@.+\..+$/.test(str);
export const isPhone = (str) => /^\d{10}$/.test(str);
export default function validate(input) {
  return { email: isEmail(input), phone: isPhone(input) };
}

// app.js
import validate, { isEmail, isPhone } from './validators.js';

console.log(isEmail('test@example.com')); // true
console.log(isPhone('1234567890'));       // true
console.log(validate('hello@world.com')); // { email: true, phone: false }
```

**Output:**
```
true
true
{ email: true, phone: false }
```

**Explanation:** Named exports (`isEmail`, `isPhone`) are imported with braces. The default export (`validate`) is imported without braces. Both from the same file.

## 🚀 Example 2 - Intermediate (Barrel Exports + Dynamic Import)
**Problem:** Create a barrel `index.js` that consolidates API modules and dynamically load a heavy module only when needed.

**Code:**
```javascript
// src/api/users.js
export const getUsers = () => fetch('/api/users');
export const getUser = (id) => fetch(`/api/users/${id}`);

// src/api/orders.js
export const getOrders = () => fetch('/api/orders');

// src/api/index.js  (barrel)
export * from './users.js';
export * from './orders.js';

// src/app.js
import { getUsers } from './api/index.js';

async function loadReports() {
  // Heavy module — only import when needed
  const { generatePDF } = await import('./report-generator.js');
  const users = await getUsers();
  generatePDF(users);
}
```

**Explanation:** The barrel `index.js` re-exports everything from `users.js` and `orders.js`, so consumers import from `./api/index.js` (or just `./api`). Dynamic `import()` returns a Promise, useful for code splitting.

## 🏢 Real World Use Case
A React application with feature-based folder structure: each feature has a barrel `index.js` that re-exports components, hooks, and utilities. Code-split heavy libraries (like charting or PDF generation) with dynamic `import()` in route-based `React.lazy()` calls. Shared utilities use named exports; each page component uses default export.

## 🎯 Interview Questions
1. **What is the difference between named and default exports?** — Named exports (multiple per module) must be imported with matching names in braces. Default export (one per module) can be imported with any name without braces.
2. **What is a barrel export?** — A module (usually `index.js`) that re-exports from several files so consumers can import from a single path.
3. **How do dynamic imports work?** — `import('./module.js')` returns a Promise for the module namespace object. Used for code splitting and lazy loading.
4. **What is the difference between ES modules and CommonJS?** — ES: `import`/`export`, static (top-level only, analyzed at parse time), async. CommonJS: `require`/`module.exports`, dynamic (can be inside conditionals), synchronous.
5. **Are ES modules hoisted?** — `import` statements are hoisted to the top of the module scope, regardless of where they appear in the file.

## ⚠ Common Errors / Mistakes
- Forgetting the file extension in `import` (browsers need `.js`; bundlers often infer it)
- Mixing `export default` and `module.exports` in the same project (CommonJS vs ESM conflict)
- Trying to use `import` conditionally without dynamic `import()` syntax
- Cyclic dependencies — modules that import each other (can cause `undefined` in some cases)
- Assuming `this` at the top level of an ES module refers to `globalThis` — in modules, top-level `this` is `undefined`

## 📝 Practice Exercises
**Beginner**
1. Create a module `utils.js` with named exports `capitalize`, `reverse`, and a default export `truncate`. Import all three in `main.js`.
2. Create a barrel `index.js` that re-exports from `math.js` and `string.js`.
3. Use a namespace import (`import * as ...`) to import all named exports from a module and log them.

**Intermediate**
4. Refactor a CommonJS project (`require`/`module.exports`) to use ES module syntax.
5. Create a module `config.js` that reads environment variables and exports them as named constants. Import dynamically in another module.
6. Implement a plugin system where external modules are loaded dynamically via `import()` based on a config array.

**Advanced**
7. Write a function `lazyLoad(modPath)` that returns a Proxy — any property access triggers a dynamic import and forwards the property access to the loaded module.
8. Create a circular dependency detection script that analyzes `import` statements across files and warns about cycles.
