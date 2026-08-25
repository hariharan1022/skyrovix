## 27. HTML JavaScript
## 📘 Introduction
JavaScript brings interactivity to HTML pages. The `<script>` tag is used to embed or reference JavaScript code. JavaScript can manipulate the DOM, handle events, validate forms, create animations, and communicate with servers.

## 🧠 Key Concepts
- `<script>` tag can be placed in `<head>` or `<body>`
- Inline JS: `onclick`, `onmouseover`, `onchange` attributes
- Internal JS: `<script> ... </script>` in HTML
- External JS: `<script src="file.js"></script>`
- `async` loads and executes script as soon as it's downloaded
- `defer` waits until HTML parsing completes before executing
- DOM manipulation: `getElementById`, `querySelector`, `innerHTML`
- Event handling: `addEventListener`, `onclick`, `onsubmit`

## 💻 Syntax
```html
<!-- External JS -->
<script src="script.js" defer></script>

<!-- Internal JS -->
<script>
  console.log("Hello from JS!");
</script>

<!-- Inline event handler -->
<button onclick="alert('Clicked!')">Click</button>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Display a dynamic welcome message using JavaScript.

**Code:**
```html
<h1 id="welcome">Welcome</h1>
<button onclick="changeGreeting()">Click Me</button>

<script>
  function changeGreeting() {
    let hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = "Good Morning!";
    else if (hour < 18) greeting = "Good Afternoon!";
    else greeting = "Good Evening!";
    document.getElementById("welcome").innerHTML = greeting;
  }
</script>
```

**Output:** Clicking the button updates the heading to "Good Morning/Afternoon/Evening" based on the current time.

**Explanation:** `getElementById` selects the heading. `innerHTML` changes its content. The `Date` object provides the current hour.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Validate a form using JavaScript and show error messages.

**Code:**
```html
<form id="myForm">
  <input type="text" id="name" placeholder="Name (min 3 chars)">
  <span id="nameError" style="color:red;"></span>
  <br>
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById("myForm").onsubmit = function(event) {
    let name = document.getElementById("name").value;
    if (name.length < 3) {
      document.getElementById("nameError").innerHTML = "Name must be at least 3 characters";
      event.preventDefault();
    }
  };
</script>
```

**Output:** If the name is shorter than 3 characters, an error message appears and the form does not submit.

**Explanation:** `onsubmit` intercepts form submission. `event.preventDefault()` stops the form from submitting when validation fails.

## 🏢 Real World Use Case
Form validation (login, registration), interactive maps, image sliders and carousels, infinite scroll, live search/autocomplete, drag-and-drop interfaces, real-time chat, and single-page applications.

## 🎯 Interview Questions (5 with answers)
**1. Where should you place the `<script>` tag for best performance?**
At the end of the `<body>` or use `defer` in the `<head>`. Placing scripts at the bottom ensures HTML is parsed before JavaScript executes.

**2. What is the difference between `async` and `defer`?**
`async` downloads and executes the script as soon as it's ready, without waiting for HTML parsing. `defer` downloads while parsing but executes only after HTML parsing is complete. `defer` preserves script order.

**3. How do you include an external JavaScript file?**
Using `<script src="path/to/file.js"></script>`. The tag must have a closing `</script>`.

**4. What is `document.getElementById()`?**
It is a DOM method that returns the element with the specified id attribute. It is one of the most common ways to access HTML elements from JavaScript.

**5. What does `event.preventDefault()` do?**
It prevents the default action of an event, such as form submission, link navigation, or right-click context menu.

## ⚠ Common Errors / Mistakes
- Using `<script>` without closing tag (self-closing `<script />` does not work)
- Placing scripts in the `<head>` without `defer` or `async`, blocking HTML parsing
- Misspelling DOM methods (e.g., `getElementById` vs `getElementByID`)
- Using inline event handlers instead of `addEventListener` (mixes HTML with JS)
- Forgetting to prevent default form submission when validating

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Write a script that changes the text of a paragraph when a button is clicked.
2. Create a script that logs "Hello, World!" to the browser console.
3. Use `window.alert()` to show a popup message on page load.

**Intermediate:**
4. Build a form with email validation that checks for "@" and "." before submission.
5. Create a mouseover effect that changes the background color of a div when the mouse enters and leaves.
6. Use `array.forEach()` to display a list of items dynamically using JavaScript DOM manipulation.

**Advanced:**
7. Build a to-do list application with add, delete, and mark-as-complete functionality using JavaScript DOM methods.
8. Create a real-time character counter for a textarea that displays remaining characters and changes color when nearing the limit.
