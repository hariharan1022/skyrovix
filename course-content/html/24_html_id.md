## 24. HTML Id
## 📘 Introduction
The `id` attribute provides a unique identifier for an HTML element. It must be unique within a page. IDs are used for CSS targeting, JavaScript manipulation, and anchor link navigation.

## 🧠 Key Concepts
- `id` must be unique on each page
- Used in CSS with `#id` selector
- Used in JavaScript with `getElementById()`
- Enables anchor links: `<a href="#section">` jumps to element with `id="section"`
- Values cannot contain spaces
- Case-sensitive
- Useful for in-page navigation, form labels (`for` attribute), and ARIA accessibility

## 💻 Syntax
```html
<!-- HTML id -->
<div id="header">Header Content</div>

<!-- CSS selector -->
<style>
  #header { background-color: navy; color: white; }
</style>

<!-- JavaScript -->
<script>
  document.getElementById("header").innerHTML = "New Header";
</script>

<!-- Anchor link -->
<a href="#section2">Go to Section 2</a>
<h2 id="section2">Section 2</h2>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create an anchor link that scrolls to a specific section.

**Code:**
```html
<a href="#contact">Jump to Contact</a>

<h2 id="about">About Us</h2>
<p>Content about the company...</p>

<h2 id="services">Services</h2>
<p>Our services include...</p>

<h2 id="contact">Contact</h2>
<p>Email us at info@example.com</p>
```

**Output:** Clicking "Jump to Contact" scrolls the page down to the Contact section.

**Explanation:** The `href="#contact"` matches the `id="contact"` on the target element. The browser scrolls to make that element visible.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use JavaScript to validate a form field by its ID.

**Code:**
```html
<style>
  .error { border: 2px solid red; }
</style>

<input type="email" id="email" placeholder="Enter email">
<button onclick="validateEmail()">Submit</button>

<script>
  function validateEmail() {
    let input = document.getElementById("email");
    if (!input.value.includes("@")) {
      input.classList.add("error");
      alert("Please enter a valid email");
    } else {
      input.classList.remove("error");
      alert("Valid email!");
    }
  }
</script>
```

**Output:** If the email lacks "@", the input border turns red and an alert shows.

**Explanation:** `document.getElementById("email")` gets the input element by its unique ID, then the script validates the value.

## 🏢 Real World Use Case
Long documentation pages use anchor links for table of contents navigation. Forms use IDs to pair `<label>` with `<input>` via the `for` attribute. JavaScript frameworks use IDs for component mounting points.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between id and class?**
An `id` must be unique on a page; a `class` can be reused. CSS uses `#` for IDs and `.` for classes. JavaScript uses `getElementById()` for IDs.

**2. Can an element have both an id and a class?**
Yes. An element can have both: `<div id="main" class="container">`. The id is unique, the class can be shared.

**3. How do you create a link that jumps to a specific part of a page?**
Give the target element an `id` and use `<a href="#idname">` to link to it.

**4. What happens if you use the same id on multiple elements?**
The page is invalid HTML. Browsers will still render it, but `getElementById()` only returns the first element with that id.

**5. How do you get an element by id in JavaScript?**
Using `document.getElementById("idName")`. It returns the element object or `null` if not found.

## ⚠ Common Errors / Mistakes
- Using duplicate IDs on the same page
- Using spaces in ID values (not allowed)
- Starting an ID with a number (valid in HTML5 but not in CSS selectors)
- Forgetting the `#` prefix in CSS or anchor href
- Overusing IDs when classes would be more maintainable

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Give a heading an id and style it with the `#id` CSS selector using red color.
2. Create a "Back to Top" link that scrolls to the top of the page using `#top`.
3. Use `document.getElementById()` to change the text of a paragraph when a button is clicked.

**Intermediate:**
4. Create a table of contents with 3 anchor links that scroll to corresponding sections.
5. Build a form where clicking a label (with `for` attribute matching input `id`) focuses the input.
6. Use a single id to highlight a navigation item as "active" and update it based on the current section using JavaScript.

**Advanced:**
7. Implement smooth scrolling behavior for all anchor links on a page using CSS `scroll-behavior: smooth` and JavaScript for older browsers.
8. Create a single-page application (SPA) navigation system where clicking links shows/hides `<section>` elements using their IDs, with the URL hash updating accordingly.
