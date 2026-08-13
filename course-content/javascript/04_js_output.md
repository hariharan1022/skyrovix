## 4. JS Output

## 📘 Introduction

JavaScript provides several ways to display data or interact with users. Each method serves a different purpose and context — debugging, user feedback, DOM manipulation, or data submission. Choosing the right output method is essential for building effective web applications.

## 🧠 Key Concepts

- **`innerHTML`**: Sets or gets the HTML content of an element; used for DOM output
- **`document.write()`**: Writes directly to the HTML document; overwrites the page if called after load
- **`console.log()`**: Outputs to browser's developer console; primary debugging tool
- **`alert()`**: Shows a modal dialog with a message and OK button (blocking)
- **`confirm()`**: Modal dialog with OK/Cancel; returns `true` or `false`
- **`prompt()`**: Modal dialog with text input; returns the input string or `null`

## 💻 Syntax

```javascript
// DOM output
document.getElementById("output").innerHTML = "Hello World";

// Console output (debugging)
console.log("Debug message");
console.warn("Warning message");
console.error("Error message");
console.table([{name: "Alice"}, {name: "Bob"}]);

// Dialog boxes
alert("This is an alert!");
const confirmed = confirm("Are you sure?");
const name = prompt("What is your name?", "default value");

// document.write (use cautiously)
document.write("Written at load time");
```

## ✅ Example 1 - Basic

**Problem:** Display a welcome message on a webpage using three different methods.

**Code:**
```javascript
// Method 1: innerHTML
document.getElementById("welcome").innerHTML = "Welcome, User!";

// Method 2: document.write (at page load)
document.write("<p>Page generated at: " + new Date() + "</p>");

// Method 3: console
console.log("Welcome message displayed");
```

**Output:** The element with id="welcome" shows the text. A new paragraph with the date is written. Console shows the log.

**Explanation:** `innerHTML` targets a specific element. `document.write()` writes directly to the document stream — it clears the page if called after load. `console.log()` is invisible to users but invaluable for developers.

## 🚀 Example 2 - Intermediate

**Problem:** Use `confirm()` and `prompt()` to create a simple user interaction flow.

**Code:**
```javascript
const isAdult = confirm("Are you 18 or older?");
if (isAdult) {
  const name = prompt("Enter your name:");
  if (name) {
    document.getElementById("result").innerHTML =
      `Welcome, ${name}! You are verified as an adult.`;
  } else {
    alert("Name cannot be empty!");
  }
} else {
  document.getElementById("result").innerHTML = "Access denied.";
}
```

**Output:** A confirm dialog followed by a prompt dialog, then conditional content displayed on the page.

**Explanation:** `confirm()` blocks execution until the user responds. If `true`, `prompt()` collects input. The code handles both the Cancel case (`null`) and empty string, demonstrating robust user interaction.

## 🏢 Real World Use Case

**Form validation feedback:** When a user submits a form, `innerHTML` displays validation error messages next to fields. `console.log()` is used during development to track form data. `alert()` is sometimes used for critical errors (e.g., "Session expired"). `confirm()` is used for destructive actions: "Are you sure you want to delete this record?" `prompt()` is rarely used in production — custom modals with form controls are preferred for better UX.

## 🎯 Interview Questions

1. **What is the difference between `innerHTML` and `textContent`?** `innerHTML` parses and inserts HTML tags; `textContent` treats content as plain text (safer against XSS). `textContent` is also faster.

2. **Why should `document.write()` be avoided?** If called after the page has loaded, it overwrites the entire document. It also blocks page rendering and cannot be used in XHTML or with async scripts.

3. **What does `prompt()` return when the user clicks Cancel?** It returns `null`. Always check for `null` before using the value.

4. **How is `console.table()` useful?** It displays arrays and objects in a formatted table in the console, making data inspection much easier than `console.log()` for structured data.

5. **What is the difference between `alert()`, `confirm()`, and `prompt()`?** `alert()` shows a message with OK. `confirm()` shows a message with OK/Cancel and returns boolean. `prompt()` shows a message with a text input field and returns the string or `null`.

## ⚠ Common Errors / Mistakes

- Using `document.write()` after the page has loaded, erasing everything
- Forgetting that `prompt()` returns a string; using it directly in numeric operations without `parseInt()`
- Using `alert()`/`confirm()`/`prompt()` in production — they block the main thread and provide poor UX
- Confusing `innerHTML` with `innerText` (which accounts for CSS styling and layout)
- Not sanitizing user input before inserting via `innerHTML` (XSS vulnerability)

## 📝 Practice Exercises

**Beginner:**
1. Use `console.log()` to print your name, age, and favorite color as separate variables.
2. Create a page where a button triggers `alert()` saying "Button was clicked!"
3. Use `innerHTML` to display "10 + 5 = 15" inside a `<div>` with id="math".

**Intermediate:**
4. Build a simple guessing game: use `prompt()` to ask the user to guess a number between 1-10, and use `alert()` to tell them if they're correct.
5. Create a confirmation dialog before deleting a dummy item. If confirmed, update the page content via `innerHTML` to show "Item deleted".
6. Use `console.table()` to display an array of 5 product objects (name, price, quantity) in the console.

**Advanced:**
7. Build a custom modal (not using `alert/confirm/prompt`) that replicates the confirmation dialog pattern with custom styling, then use it before a destructive action.
8. Implement a logging utility that supports log levels (info, warn, error) and writes to both the console and a hidden DOM element for on-screen debugging.
