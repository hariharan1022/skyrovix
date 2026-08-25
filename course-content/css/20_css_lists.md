## 20. CSS Lists
## 📘 Introduction
CSS provides properties to style ordered (`<ol>`) and unordered (`<ul>`) lists. You can control bullet types, use custom images, adjust positioning, and even create completely custom markers using `::before` pseudo-elements.

## 🧠 Key Concepts
- **list-style-type:** Sets the marker type — `disc`, `circle`, `square`, `decimal`, `lower-roman`, `upper-alpha`, `none`, etc.
- **list-style-image:** Uses a custom image as the bullet: `url("bullet.png")`.
- **list-style-position:** `outside` (default — marker is outside the list item content) or `inside` (marker is inside).
- **Shorthand:** `list-style: type image position;` (e.g., `list-style: square url("img.png") inside;`).
- **Custom Bullets with `::before`:** Use `content` property with pseudo-elements for full control over bullet design.
- **Removing List Styling:** `list-style: none` combined with `margin: 0; padding: 0;` for navigation menus.

## 💻 Syntax
```css
ul {
  list-style-type: square;
  list-style-position: inside;
  list-style-image: url("bullet.png");

  /* Shorthand */
  list-style: square inside;

  /* Removing styling */
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Custom bullets with ::before */
li.custom::before {
  content: "→";
  color: #3498db;
  margin-right: 8px;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Style an unordered list with custom bullet type and position.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    ul.square {
      list-style-type: square;
      list-style-position: inside;
    }
    ol.roman {
      list-style-type: lower-roman;
    }
  </style>
</head>
<body>
  <ul class="square">
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
  </ul>
  <ol class="roman">
    <li>First</li>
    <li>Second</li>
  </ol>
</body>
</html>
```
**Output:** Square bullets aligned inside the list. Roman numeral numbering on the ordered list.
**Explanation:** `list-style-type` changes the marker. `position: inside` brings the bullet into the list item's content area (affects text alignment).

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a navigation menu by removing list styling and using custom markers.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20px;
      background: #2c3e50;
      padding: 10px 20px;
    }
    .nav li { position: relative; }
    .nav a {
      color: white;
      text-decoration: none;
      padding: 5px 10px;
    }
    .nav a::before {
      content: ">";
      color: #f39c12;
      margin-right: 6px;
      font-weight: bold;
    }
    .custom-list {
      list-style: none;
      padding: 0;
    }
    .custom-list li {
      padding: 8px 0 8px 25px;
      position: relative;
    }
    .custom-list li::before {
      content: "✓";
      color: #2ecc71;
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <ul class="nav">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>

  <ul class="custom-list">
    <li>Task completed</li>
    <li>Another task done</li>
    <li>Final task finished</li>
  </ul>
</body>
</html>
```
**Output:** Horizontal nav bar with orange `>` markers before each link. Below that, a vertical list with green checkmark icons.
**Explanation:** `list-style: none` removes default bullets. `::before` pseudo-elements create custom markers independently styled with `color`, `font-weight`, and `position`.

## 🏢 Real World Use Case
A documentation site uses `<ol>` with `list-style-type: decimal` for numbered steps. A task management app uses custom `::before` checkmark bullets for checklist items. Navigation menus universally remove list styling (`list-style: none; margin: 0; padding: 0`).

## 🎯 Interview Questions (5 with answers)
1. **How do you remove default list bullets?** `list-style: none;` along with resetting margin and padding.
2. **What is the difference between `list-style-position: inside` and `outside`?** `outside` places the marker outside the content flow (default). `inside` places it within the list item's content, affecting text wrapping.
3. **How do you create custom bullet points?** Use `list-style: none` and add a `::before` pseudo-element with `content` property.
4. **Can you use images as list bullets?** Yes, with `list-style-image: url("bullet.png");` — though `::before` with background-image offers more control.
5. **What are some common `list-style-type` values?** `disc`, `circle`, `square`, `decimal`, `decimal-leading-zero`, `lower-roman`, `upper-roman`, `lower-alpha`, `upper-alpha`, `none`.

## ⚠ Common Errors / Mistakes
- Forgetting to reset `margin` and `padding` when using `list-style: none` (browsers add default padding to lists).
- Using `list-style-image` without controlling image size (the property does not support resizing — use `::before` instead).
- Applying `list-style` to `<li>` instead of `<ul>` or `<ol>` (it works on `<li>` too but conventional usage is on the parent).
- Assuming `list-style-type` works on all elements (it only works on elements with `display: list-item`).
- Not handling nested list styling — child lists inherit but may need explicit overrides.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Change the bullet type of an unordered list to squares.
2. Set an ordered list to use decimal numbers.
3. Move the list markers inside using `list-style-position`.
4. Remove all default styling from a `<ul>` and use it as a navigation menu.
5. Create a custom bullet using `::before` with a red arrow (→).
6. Use `list-style-image` to apply a custom bullet image to a list.
7. Build a multi-level nested list with different `list-style-type` values at each level (disc, circle, square).
8. Create a styled checklist where checked items have a strikethrough and green checkmark, while unchecked items have a gray circle.
