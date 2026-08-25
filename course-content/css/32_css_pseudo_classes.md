## 32. CSS Pseudo-classes

## 📘 Introduction
Pseudo-classes select elements based on their state, position, or user interaction rather than their attributes or content. They enable dynamic styling — hovering over a link, focusing on an input, or targeting every third row — without JavaScript.

## 🧠 Key Concepts
- **`:hover`**: Applied when the user's pointer hovers over an element
- **`:focus`**: Applied when an element receives focus (keyboard tab, click)
- **`:active`**: Applied momentarily while an element is being activated (click)
- **`:nth-child(n)`**: Selects elements based on their position among siblings; accepts formulas (`2n`, `3n+1`, `odd`, `even`)
- **`:first-child` / `:last-child`**: First or last child among siblings
- **`:only-child`**: Element that is the only child of its parent
- **`:not(selector)`**: Negation — selects elements that do NOT match the given selector
- **`:empty`**: Selects elements with no children (including text nodes)
- **`:disabled` / `:enabled`**: Form elements based on their disabled state
- **`:checked`**: Radio buttons or checkboxes that are checked
- **`:root`**: Matches the document's root element (`<html>`), often used for CSS custom properties
- **`:target`**: Element whose ID matches the current URL fragment (hash)

## 💻 Syntax

```css
/* Link states */
a:hover { color: #e74c3c; }
a:focus { outline: 2px solid #3498db; }
a:active { color: #2c3e50; }

/* Structural */
li:first-child { font-weight: bold; }
li:last-child { border: none; }
li:nth-child(even) { background: #f9f9f9; }
li:nth-child(3n+1) { color: blue; }

/* Negation */
input:not(:disabled) {
  background: white;
}

/* Form states */
input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
input:checked + label {
  color: #2ecc71;
}

/* Custom properties on root */
:root {
  --primary: #3498db;
}
```

## ✅ Example 1 - Basic (Interactive Navigation and List Styling)

**Problem:** Style a navigation with hover/focus/active states and a styled list using structural pseudo-classes.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    background: #f5f5f5;
    padding: 40px;
  }

  /* Link pseudo-classes */
  .nav {
    background: #2c3e50;
    border-radius: 8px;
    padding: 0 20px;
  }
  .nav a {
    display: inline-block;
    color: white;
    text-decoration: none;
    padding: 15px 20px;
    transition: all 0.3s;
    border-bottom: 3px solid transparent;
  }
  .nav a:hover {
    background: #34495e;
    border-bottom-color: #3498db;
  }
  .nav a:focus {
    outline: 2px solid #3498db;
    outline-offset: -2px;
  }
  .nav a:active {
    background: #1a252f;
  }

  /* First child styling */
  .task-list {
    list-style: none;
    margin-top: 30px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .task-list li {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  .task-list li:first-child {
    background: #e8f4f8;
    font-weight: bold;
  }
  .task-list li:last-child {
    border-bottom: none;
    color: #888;
    font-style: italic;
  }
  .task-list li:nth-child(even) {
    background: #fafafa;
  }
  .task-list li:not(.completed) {
    border-left: 4px solid #e74c3c;
  }
  .task-list li.completed {
    border-left: 4px solid #2ecc71;
    text-decoration: line-through;
    color: #999;
  }

  /* Empty state */
  .empty-state:empty {
    display: none;
  }
</style>
</head>
<body>
  <nav class="nav">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
  </nav>

  <ul class="task-list">
    <li class="completed">Buy groceries</li>
    <li>Finish CSS project</li>
    <li class="completed">Call plumber</li>
    <li>Read documentation</li>
    <li>Prepare presentation</li>
    <li>Review pull requests</li>
  </ul>
</body>
</html>
```

**Output:** A styled navigation with hover/focus/active effects, and a task list where the first item is highlighted, even rows have a subtle background, completed items have a green border and strikethrough, and incomplete items have a red border.

**Explanation:** `:first-child` targets the first `<li>`. `:nth-child(even)` targets even rows. `:last-child` removes the border from the last item. `:not(.completed)` adds a red border to items without the `.completed` class.

## 🚀 Example 2 - Intermediate (Interactive Form with Validation States)

**Problem:** Build a registration form using pseudo-classes for focus, validation states, disabled elements, and checkbox toggling.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    background: #ecf0f1;
    padding: 40px;
    display: flex;
    justify-content: center;
  }

  form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 450px;
  }
  form h2 {
    margin-bottom: 20px;
    color: #2c3e50;
  }

  .form-group {
    margin-bottom: 18px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9em;
    color: #555;
    font-weight: bold;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
  }

  /* Focus state */
  input:focus, textarea:focus, select:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52,152,219,0.15);
  }

  /* Valid state */
  input:valid:not(:placeholder-shown) {
    border-color: #2ecc71;
  }

  /* Invalid state */
  input:invalid:not(:placeholder-shown) {
    border-color: #e74c3c;
  }

  /* Required asterisk using adjacent sibling */
  label:has(+ input:required)::after,
  label:has(+ textarea:required)::after {
    content: " *";
    color: #e74c3c;
  }

  /* Disabled state */
  input:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Checkbox styling with :checked */
  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .checkbox-group input[type="checkbox"] {
    width: auto;
  }
  .checkbox-group input[type="checkbox"]:checked + label {
    color: #2ecc71;
    font-weight: bold;
  }

  /* Submit button */
  button {
    width: 100%;
    padding: 12px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }
  button:hover {
    background: #2980b9;
  }
  button:active {
    background: #1f6fa5;
  }
  button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }

  /* Empty state for error summary */
  .errors:empty {
    display: none;
  }
  .errors {
    background: #fde8e8;
    color: #c0392b;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 15px;
    font-size: 0.9em;
  }
</style>
</head>
<body>
  <form>
    <h2>Create Account</h2>

    <div class="errors"></div>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input type="text" id="name" required placeholder="John Doe">
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" required placeholder="john@example.com">
    </div>

    <div class="form-group">
      <label for="role">Role</label>
      <select id="role">
        <option>Developer</option>
        <option>Designer</option>
        <option>Manager</option>
      </select>
    </div>

    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea id="bio" rows="3" placeholder="Tell us about yourself"></textarea>
    </div>

    <div class="form-group checkbox-group">
      <input type="checkbox" id="terms" required>
      <label for="terms">I agree to the terms and conditions</label>
    </div>

    <div class="form-group">
      <label for="coupon">Coupon Code</label>
      <input type="text" id="coupon" disabled placeholder="Currently unavailable">
    </div>

    <button type="submit">Register</button>
  </form>
</body>
</html>
```

**Output:** A styled form where inputs show green borders when valid, red when invalid, blue when focused. The checkbox label changes color when checked. The disabled input appears grayed out.

**Explanation:** `:focus` adds blue glow. `:valid` / `:invalid` combined with `:not(:placeholder-shown)` show validation state only after user interaction. `:checked` toggles the label color. `:disabled` styles the coupon field. `:empty` hides the error div when there are no errors.

## 🏢 Real World Use Case
Interactive navigation menus, styled data tables with alternating rows, form validation feedback, accordion components, gallery lightbox controls, and pagination all leverage pseudo-classes for state-based styling.

## 🎯 Interview Questions

1. **What is the difference between `:nth-child(n)` and `:nth-of-type(n)`?**
   *`:nth-child` counts all siblings regardless of type. `:nth-of-type` counts only siblings of the same element type. For example, `p:nth-of-type(2)` selects the second `<p>`, even if other elements appear before it.*

2. **How does the `:not()` pseudo-class work?**
   *It accepts a selector as an argument and matches elements that do NOT match that selector. For example, `input:not([type="submit"])` selects all inputs except submit buttons.*

3. **What is the difference between `:focus` and `:focus-visible`?**
   *`:focus` applies whenever an element receives focus. `:focus-visible` applies only when the browser determines focus should be visually indicated (typically keyboard navigation), preventing the focus ring on mouse clicks.*

4. **How can you style a parent element based on its child's state?**
   *Using the `:has()` relational pseudo-class. For example, `label:has(input:required)::after` adds an asterisk to labels of required fields. `:has()` is widely supported in modern browsers.*

5. **What does `:empty` select, and what are some common gotchas?**
   *`:empty` selects elements with no children (including text nodes, whitespace counts). A `<div>` that contains only a space character is NOT empty. A `<div>` with no content and no whitespace IS empty.*

## ⚠ Common Errors / Mistakes

- **Confusing `:nth-child()` with `:nth-of-type()`**: `:nth-child` counts all children and can select the wrong element type if siblings are mixed
- **Forgetting `:not(:placeholder-shown)` for validation styling**: Without this, inputs show invalid styling when empty on page load
- **Using `:focus` exclusively**: Keyboard users rely on `:focus-visible` for better focus indication without cluttering mouse clicks
- **Applying `:hover` on mobile**: Touch devices don't have hover states; hover effects should be supplemented with `:active` or JS alternatives
- **Overlooking that `:empty` selects elements with no text nodes**: Even a single space character inside an element makes it non-empty

## 📝 Practice Exercises

### Beginner
1. Create a list where `:first-child` is bold, `:last-child` has no border, and `:nth-child(odd)` has a gray background.
2. Style `<a>` tags with `:hover` (underline), `:focus` (outline), and `:active` (color change).
3. Use `:disabled` and `:enabled` to style a submit button differently when a checkbox is unchecked (use the checkbox hack).

### Intermediate
4. Build a table where rows use `:nth-child(even)` for striping, the first row uses `:first-child` for header styling, and hovered rows highlight.
5. Create a form where `:valid` inputs have a green border, `:invalid` inputs have a red border, and `:focus` adds a blue shadow — without JavaScript.
6. Build a tabbed interface using `:target` pseudo-class: clicking a link with a hash toggles which content panel is visible.

### Advanced
7. Create a complete styled form with `:has()` pseudo-class: style labels differently when their associated input is required (`label:has(+ input:required)`), show validation icons (::before) based on `:valid`/`:invalid`, and disable the submit button using `:disabled` based on checkbox state — all without JavaScript.
8. Build a custom radio button and checkbox component using `:checked` and adjacent sibling combinator (`input:checked + label`), with fully custom visual indicators (no default browser UI), including focus styles for keyboard navigation.
