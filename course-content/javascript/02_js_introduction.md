## 2. JS Introduction

## 📘 Introduction

JavaScript was created in 1995 by **Brendan Eich** at Netscape. Originally named Mocha, then LiveScript, it was renamed JavaScript to ride the Java popularity wave. In 1997, ECMA International standardized it as ECMAScript.

Today, JavaScript is everywhere: from browser-based interactivity to full-stack development with Node.js, mobile apps with React Native, desktop apps with Electron, and IoT devices.

## 🧠 Key Concepts

- **History**: Created in 10 days at Netscape; standardized as ECMAScript in 1997
- **Web development**: Runs natively in all browsers; essential for frontend interactivity
- **Server-side with Node.js**: JavaScript runtime built on V8 engine; enables backend development
- **Mobile development**: React Native, Ionic, NativeScript allow JS-based mobile apps
- **Desktop applications**: Electron (VS Code, Slack, Discord), Tauri
- **Frontend frameworks**: React (2013), Angular (2010), Vue.js (2014) — component-based UI libraries
- **DOM Manipulation**: JS can read and modify the Document Object Model (tree structure of HTML)
- **AJAX / Fetch**: Makes HTTP requests without reloading the page (async data loading)

## 💻 Syntax

```javascript
// DOM Manipulation
document.title = "New Title";
document.body.style.backgroundColor = "lightblue";

// Fetch API - modern replacement for XMLHttpRequest
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data));

// Node.js server example
const http = require("http");
http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello from Node.js!");
}).listen(3000);
```

## ✅ Example 1 - Basic

**Problem:** Change the text content of a paragraph when the user clicks a button.

**Code:**
```javascript
// HTML: <p id="demo">Original text</p><button onclick="changeText()">Click</button>
function changeText() {
  document.getElementById("demo").innerHTML = "Text changed by JavaScript!";
}
```

**Output:** Clicking the button changes the paragraph text.

**Explanation:** The `onclick` attribute calls the `changeText()` function. Inside it, `getElementById` selects the paragraph and `innerHTML` updates its content. This is a fundamental DOM manipulation pattern.

## 🚀 Example 2 - Intermediate

**Problem:** Use the Fetch API to get data from a public API and display it in a list.

**Code:**
```javascript
fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
  .then(response => response.json())
  .then(posts => {
    const list = document.getElementById("post-list");
    posts.forEach(post => {
      const li = document.createElement("li");
      li.textContent = post.title;
      list.appendChild(li);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
```

**Output:** A `<ul id="post-list">` populated with 5 post titles from the API.

**Explanation:** `fetch()` returns a Promise. `.json()` parses the response body. We loop through the resulting array, create `<li>` elements for each post title, and append them to the DOM. `.catch()` handles network errors.

## 🏢 Real World Use Case

**Full-stack JavaScript with MERN Stack:** MongoDB, Express.js, React, Node.js — all use JavaScript. A developer can build an entire application (database, API server, frontend UI) using one language. Companies like Netflix, Uber, LinkedIn, and Walmart use this stack for scalable, real-time applications.

## 🎯 Interview Questions

1. **Who created JavaScript and when?** Brendan Eich at Netscape in 1995. The language was created in about 10 days.

2. **What is the difference between JavaScript and ECMAScript?** ECMAScript is the specification; JavaScript is the implementation. Other implementations include JScript (Microsoft) and ActionScript.

3. **What is Node.js and why is it significant?** Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JS to run on servers, enabling full-stack JS development.

4. **What are the main JavaScript frameworks and their purposes?** React (UI components), Angular (full-featured framework), Vue.js (progressive framework), Svelte (compiler-based), Next.js (React meta-framework).

5. **What is the DOM and how does JavaScript interact with it?** The Document Object Model is a tree representation of HTML. JS can traverse, modify, add, or delete nodes using methods like `getElementById`, `querySelector`, `createElement`, `appendChild`.

## ⚠ Common Errors / Mistakes

- Trying to access DOM elements before the page has loaded (put scripts at bottom of body or use `DOMContentLoaded`)
- Forgetting to convert JSON response with `.json()`
- Using `var` in loops and expecting block-level scoping
- Not handling Promise rejections with `.catch()` or try/catch in async/await
- Confusing client-side JS with server-side JS capabilities

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page with a button that toggles the visibility of a paragraph when clicked.
2. Use `alert()` to display the current URL of the page (`window.location.href`).
3. Write a script that prints all the images (`<img>` tags) on a page to the console.

**Intermediate:**
4. Build a to-do list where you can add items via an input field and a button, displaying them in an unordered list.
5. Fetch a list of users from `https://jsonplaceholder.typicode.com/users` and display their names and emails in a table.
6. Create a script that counts how many times a button has been clicked and displays the count.

**Advanced:**
7. Build a simple currency converter that fetches live exchange rates from an API (e.g., exchangerate-api.com) and converts user input.
8. Create a client-side photo gallery with lazy loading: images load only when they scroll into view using the Intersection Observer API.
