## 3. JS Where To

## 📘 Introduction

JavaScript code can be placed in three locations: inside HTML tags (inline), within `<script>` tags directly in the HTML document, or in external `.js` files. The placement and loading strategy significantly impacts page performance and behavior.

Modern best practices favor external scripts with `async` or `defer` attributes for optimal loading.

## 🧠 Key Concepts

- **Inline JS**: Inside HTML event attributes like `onclick="alert('Hi')"` — not recommended for maintainability
- **Internal `<script>` tag**: Placed in `<head>` or `<body>`; code runs when encountered during parsing
- **External JS files**: `<script src="app.js">` — separates HTML from JS; allows caching and reusability
- **Script in `<head>` vs `<body>`**: Head scripts block HTML parsing; body-end scripts let the page render first
- **`defer` attribute**: Downloads in parallel, executes after HTML parsing (preserves order)
- **`async` attribute**: Downloads in parallel, executes as soon as downloaded (no order guarantee)
- **Module scripts**: `<script type="module">` — supports ES modules (`import`/`export`), deferred by default

## 💻 Syntax

```javascript
// Internal script (in HTML file)
// <script>
//   console.log("Internal JS");
// </script>

// External script
// <script src="js/app.js"></script>

// With defer (recommended for head scripts)
// <script src="app.js" defer></script>

// With async (for independent scripts)
// <script src="analytics.js" async></script>

// Module script
// <script type="module" src="main.js"></script>

// Inline (not recommended)
// <button onclick="alert('Clicked')">Click</button>
```

## ✅ Example 1 - Basic

**Problem:** Compare head-placement vs body-placement of a script.

**Code:**
```html
<!-- BAD: in <head> — blocks rendering -->
<head>
  <script>
    document.getElementById("demo").innerHTML = "Hello";
    // Error! Element doesn't exist yet
  </script>
</head>

<!-- GOOD: at end of <body> — renders first, then runs -->
<body>
  <p id="demo"></p>
  <script>
    document.getElementById("demo").innerHTML = "Hello";
  </script>
</body>
```

**Output:** The second approach works correctly; the first throws an error.

**Explanation:** HTML is parsed top to bottom. A script in `<head>` runs before body elements exist. Placing scripts at the bottom of `<body>` ensures the DOM is ready.

## 🚀 Example 2 - Intermediate

**Problem:** Load three external scripts with different strategies and observe execution order.

**Code:**
```html
<!-- script1.js: console.log("1") -->
<!-- script2.js: console.log("2") -->
<!-- script3.js: console.log("3") -->

<script defer src="script1.js"></script>  <!-- downloaded in parallel, executes after parse -->
<script defer src="script2.js"></script>  <!-- executes in order: 1, 2, 3 after HTML parsed -->
<script async src="analytics.js"></script> <!-- executes immediately when downloaded -->

<script src="normal.js"></script> <!-- blocks parsing, downloads and executes immediately -->
```

**Output:** `defer` scripts maintain order and run after HTML parsing. `async` runs whenever it finishes downloading, regardless of order.

**Explanation:** `defer` guarantees execution order and waits for DOM parsing. `async` is for independent scripts (analytics, ads). Regular (non-defer/async) scripts block HTML parsing while downloading and executing.

## 🏢 Real World Use Case

**Performance-optimized production websites:** Typically load critical JS with `defer` in `<head>` for early discovery by the browser while not blocking rendering. Non-critical scripts (analytics, chat widgets) use `async`. Module scripts (`type="module"`) are used for modern SPAs with code splitting. Tools like Webpack and Vite bundle JS and generate optimal loading strategies automatically.

## 🎯 Interview Questions

1. **Where should `<script>` tags be placed and why?** Traditionally at the end of `<body>` to avoid blocking rendering. Modern best practice uses `<head>` with `defer` for earlier script discovery while preserving execution order.

2. **What is the difference between `async` and `defer`?** Both download in parallel. `defer` executes after HTML parsing in document order. `async` executes immediately upon download, regardless of order. `defer` is for scripts that depend on DOM; `async` for independent scripts.

3. **What are ES modules and how do you load them?** ES modules use `type="module"` and support `import`/`export`. They are deferred by default, run in strict mode, have their own scope, and support circular dependencies.

4. **What happens when a `<script>` tag is encountered during HTML parsing?** By default, HTML parsing pauses, the script is fetched (if external) and executed, then parsing resumes. `async` and `defer` change this behavior.

5. **Can you mix `async` and `defer` on the same script tag?** No, they are mutually exclusive attributes. If both are present, `async` takes precedence over `defer` for modern browsers.

## ⚠ Common Errors / Mistakes

- Putting scripts in `<head>` without `defer` and getting "Cannot read property of null" errors
- Using `async` on scripts that depend on DOM or other scripts (race conditions)
- Forgetting the `type="module"` attribute when using ES module syntax
- Multiple `<script>` tags with overlapping dependencies causing loading order issues
- Using `document.write()` after the page has loaded (it overwrites the entire document)

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML file with an internal script in the `<head>` that uses `defer` to change the page title.
2. Create an external `greet.js` file and link it from an HTML page using `<script src="...">`.
3. Move a script from the end of `<body>` to `<head>` with `defer` and verify it still works.

**Intermediate:**
4. Create three external JS files (a.js, b.js, c.js) where each logs a letter. Load them with `defer` and observe the order. Then change to `async` and observe.
5. Build a page where a module script imports a function from another JS file using `import`/`export` syntax.
6. Compare page load performance between a blocking `<script>` in `<head>` vs a deferred script using basic timing (`performance.now()`).

**Advanced:**
7. Implement a dynamic script loader function that creates `<script>` elements on demand and returns a Promise that resolves once the script loads.
8. Build a mini build tool simulation: create three JS files that depend on each other, determine the correct loading order with `defer`, and verify all dependencies are resolved.
