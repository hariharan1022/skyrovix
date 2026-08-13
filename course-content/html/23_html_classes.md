## 23. HTML Classes
## 📘 Introduction
The `class` attribute is used to assign one or more class names to an HTML element. Classes are used by CSS and JavaScript to style and manipulate groups of elements. Unlike IDs, multiple elements can share the same class.

## 🧠 Key Concepts
- `class` attribute can be applied to any HTML element
- An element can have multiple classes (space-separated)
- CSS class selector: `.classname` selects all elements with that class
- Classes are reusable across many elements
- JavaScript methods: `getElementsByClassName()`, `classList.add()`, `classList.remove()`, `classList.toggle()`
- Class names should be descriptive and use kebab-case or camelCase

## 💻 Syntax
```html
<!-- Single class -->
<div class="highlight">Content</div>

<!-- Multiple classes -->
<div class="box highlight large">Content</div>

<!-- CSS selector -->
<style>
  .highlight { background-color: yellow; }
</style>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Style multiple elements with the same class.

**Code:**
```html
<style>
  .highlight {
    background-color: yellow;
    font-weight: bold;
  }
</style>

<p class="highlight">This text is highlighted.</p>
<p>Normal text.</p>
<p class="highlight">This text is also highlighted.</p>
```

**Output:** The first and third paragraphs have yellow background and bold text. The second paragraph is unaffected.

**Explanation:** The `.highlight` class selector applies styles to every element with `class="highlight"`.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use multiple classes on one element and toggle a class with JavaScript.

**Code:**
```html
<style>
  .box {
    padding: 20px;
    border: 1px solid #ccc;
    margin: 10px;
  }
  .dark {
    background-color: #333;
    color: white;
  }
</style>

<div id="myBox" class="box">Click the button</div>
<button onclick="document.getElementById('myBox').classList.toggle('dark')">
  Toggle Dark Mode
</button>
```

**Output:** Clicking the button adds/removes the `dark` class, switching the box between light and dark appearance.

**Explanation:** The element starts with `class="box"`. `classList.toggle('dark')` adds `dark` if absent, removes if present. The element effectively has both classes when dark mode is on.

## 🏢 Real World Use Case
CSS frameworks like Bootstrap use classes extensively (e.g., `btn`, `btn-primary`, `container`, `row`, `col-md-6`). JavaScript libraries use classes for state management (e.g., `active`, `hidden`, `error`).

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between class and id?**
Classes can be reused on multiple elements. IDs must be unique per page. CSS uses `.` for classes and `#` for IDs.

**2. Can an element have multiple classes?**
Yes. Separate class names with spaces: `<div class="class1 class2 class3">`.

**3. How do you select elements by class in CSS?**
Use a dot (`.`) followed by the class name: `.my-class { color: red; }`.

**4. How do you add a class to an element using JavaScript?**
Using `element.classList.add('className')` or `element.className += ' className'`.

**5. What naming conventions should you use for classes?**
Use descriptive, lowercase, hyphen-separated names (kebab-case) like `main-header`, `btn-primary`, `card-title`.

## ⚠ Common Errors / Mistakes
- Using the same class name for unrelated purposes
- Forgetting the dot (`.`) in CSS class selectors
- Using class names that conflict with existing CSS frameworks
- Overusing classes when a simple descendant selector would work
- Not being specific enough with class names (e.g., `big`, `red` instead of `alert-danger`)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create three paragraphs and give two of them the class `highlight`. Style the class with a yellow background.
2. Add two classes to a single element (`box` and `rounded`) and style both.
3. Change the color of all elements with a specific class using CSS.

**Intermediate:**
4. Use JavaScript to add a class to an element when a button is clicked and remove it when another button is clicked.
5. Toggle a class on a navbar to show/hide it on mobile using JavaScript.
6. Create a tabbed interface where clicking tabs adds an `active` class to the selected tab and removes it from others.

**Advanced:**
7. Build a CSS-only accordion using the `:checked` pseudo-class and class-based sibling selectors (no JavaScript).
8. Implement a class-based theming system where adding/removing a `dark-theme` class on the `<body>` toggles the entire site between light and dark modes.
