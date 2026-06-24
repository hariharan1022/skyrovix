## 1. JavaScript HOME

## 📘 Introduction

JavaScript (JS) is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is the core technology of the World Wide Web, alongside HTML and CSS. JavaScript enables interactive web pages and is an essential part of web applications. It is a **client-side scripting language**, meaning it runs in the user's browser rather than on a remote server.

Over 97% of websites use JavaScript on the client side for dynamic page behavior. With the advent of Node.js, JavaScript can also be used for server-side development.

## 🧠 Key Concepts

- **Client-side scripting**: Code executes in the browser, not on the server
- **Dynamic web pages**: JS can modify HTML and CSS in real time after the page has loaded
- **JavaScript Engines**: Each browser has its own engine — V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari), Chakra (Edge legacy)
- **ECMAScript (ES)**: The standardized specification; ES6 (ES2015) introduced major modern features
- **Event-driven**: JS responds to user actions like clicks, keypresses, and form submissions
- **Single-threaded with async capabilities**: Uses event loop and callback queue for non-blocking operations

## 💻 Syntax

```javascript
// Basic JavaScript syntax
console.log("Hello, World!");        // Prints to console
let message = "Welcome to JS!";      // Variable declaration
const PI = 3.14159;                  // Constant declaration

// Event listener example
document.querySelector("button").addEventListener("click", function() {
  alert("Button clicked!");
});
```

## ✅ Example 1 - Basic

**Problem:** Write a script that displays a greeting message inside an HTML element when a page loads.

**Code:**
```javascript
document.getElementById("greeting").innerHTML = "Hello, welcome to JavaScript!";
```

**Output:** The HTML element with id="greeting" will display the text.

**Explanation:** `document.getElementById()` selects an HTML element by its ID, and `.innerHTML` sets its content. This is client-side scripting — the browser runs this code and updates the page dynamically.

## 🚀 Example 2 - Intermediate

**Problem:** Fetch current date and display it on a webpage, updating every second.

**Code:**
```javascript
function updateClock() {
  const now = new Date();
  document.getElementById("clock").innerHTML = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
```

**Output:** A live updating clock displayed inside an element with id="clock".

**Explanation:** `setInterval()` calls the `updateClock` function every 1000ms. The `Date` object gets the current time, and `toLocaleTimeString()` formats it. This demonstrates dynamic behavior — the page content changes without a full reload.

## 🏢 Real World Use Case

**Single Page Applications (SPAs):** Frameworks like React, Angular, and Vue.js use JavaScript to build entire applications that run in the browser. When you use Gmail, Google Maps, or Trello, JavaScript handles routing, data fetching, UI updates, and state management — all without page reloads. The V8 engine optimizes JS execution for performance comparable to native apps.

## 🎯 Interview Questions

1. **What is JavaScript and how does it differ from Java?** JavaScript is a dynamic scripting language for web pages; Java is a compiled, statically-typed language for applications. They are unrelated despite similar names.

2. **Explain client-side vs server-side scripting.** Client-side runs in the browser (JS), server-side runs on a web server (PHP, Python, Node.js). Client-side reduces server load but is visible to users.

3. **What is ECMAScript?** ECMAScript is the standardized specification behind JavaScript. ES6 (2015) was a major update adding let/const, arrow functions, classes, promises, modules, and more.

4. **How do JavaScript engines work?** Engines parse JS code into an Abstract Syntax Tree (AST), compile it to bytecode using Just-In-Time (JIT) compilation, and execute optimized machine code.

5. **What is the event loop in JavaScript?** The event loop continuously checks the call stack and callback queue. When the stack is empty, it pushes the first callback from the queue onto the stack, enabling non-blocking async operations.

## ⚠ Common Errors / Mistakes

- Confusing `==` with `===` (loose vs strict equality)
- Blocking the main thread with long synchronous loops
- Forgetting that `var` is function-scoped, not block-scoped
- Overlooking automatic semicolon insertion (ASI) pitfalls
- Using undefined variables (ReferenceError)

## 📝 Practice Exercises

**Beginner:**
1. Write a script that prints "Hello, World!" to the console.
2. Create a variable `name` and use `alert()` to display "Hello, [name]!".
3. Use `document.write()` to output "Learning JavaScript" on a webpage.

**Intermediate:**
4. Build a button that, when clicked, changes the background color of the page to a random color.
5. Create a counter that increments every second and displays the count on the page.
6. Write a script that shows the current date and day of the week on page load.

**Advanced:**
7. Implement a simple stopwatch with start, stop, and reset functionality using vanilla JS.
8. Build a script that fetches data from a public API (e.g., random quote API) and displays it without refreshing the page.
