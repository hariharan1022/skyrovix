## 25. HTML Buttons
## 📘 Introduction
The `<button>` element creates clickable buttons for user interaction. Buttons are essential for forms, dialogs, navigation, and triggering JavaScript actions. Unlike `<input type="submit">`, `<button>` can contain HTML content like images and icons.

## 🧠 Key Concepts
- `<button>` element is more flexible than `<input type="button">`
- `type` attribute: `submit` (default, submits form), `reset` (resets form), `button` (generic clickable)
- `onclick` attribute triggers JavaScript on click
- `disabled` attribute makes button unclickable
- Buttons can be styled extensively with CSS
- `autofocus` attribute focuses the button on page load
- Buttons inside forms have default submit behavior (can be prevented)

## 💻 Syntax
```html
<button type="button" onclick="alert('Clicked!')">Click Me</button>
<button type="submit">Submit Form</button>
<button type="reset">Reset Form</button>
<button disabled>Disabled Button</button>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a button that shows an alert when clicked.

**Code:**
```html
<button type="button" onclick="alert('Hello, World!')">
  Say Hello
</button>
```

**Output:** A clickable button labeled "Say Hello". Clicking it shows a browser alert saying "Hello, World!".

**Explanation:** The `onclick` attribute directly calls JavaScript. The `type="button"` prevents the button from submitting any form.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a styled button with a click counter that disables after 5 clicks.

**Code:**
```html
<style>
  .counter-btn {
    background: #4CAF50;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  .counter-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>

<button id="clickBtn" class="counter-btn" type="button">Clicks: 0</button>

<script>
  let count = 0;
  document.getElementById("clickBtn").onclick = function() {
    count++;
    this.innerHTML = "Clicks: " + count;
    if (count >= 5) {
      this.disabled = true;
      this.innerHTML = "Max reached!";
    }
  };
</script>
```

**Output:** A green button that increments the count on each click. After 5 clicks, it becomes disabled and gray with "Max reached!".

**Explanation:** JavaScript tracks the count, updates the button text, and sets `disabled = true` when the limit is reached.

## 🏢 Real World Use Case
Submit buttons on forms, "Add to Cart" on e-commerce sites, "Load More" for pagination, "Delete" confirmation buttons, social media "Like" buttons, and file upload triggers.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between `<button>` and `<input type="button">`?**
`<button>` can contain HTML (images, icons, nested elements). `<input type="button">` only shows a text value and is a self-closing tag.

**2. What are the three types of button and their purposes?**
`submit` (submits the form), `reset` (resets form fields to defaults), `button` (generic clickable, does nothing by default).

**3. How do you disable a button?**
Add the `disabled` attribute: `<button disabled>Click</button>` or set `element.disabled = true` in JavaScript.

**4. What happens if you forget the `type` attribute on a button inside a form?**
The default type is `submit`, so clicking it will submit the form. This often causes unintended page reloads.

**5. How can you prevent a button from submitting a form?**
Set `type="button"` or call `event.preventDefault()` in the onclick handler.

## ⚠ Common Errors / Mistakes
- Forgetting `type="button"` inside a form (defaults to submit)
- Using `<div>` or `<span>` with onclick instead of semantic `<button>` (bad for accessibility)
- Not disabling buttons during form submission (causes double submits)
- Using `cursor: pointer` unnecessarily (button already has it by default)
- Not providing accessible names for icon-only buttons

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a button that changes the text of a paragraph when clicked.
2. Add a disabled button to a page and style it with gray colors.
3. Create a button that toggles between "Show" and "Hide" text on each click.

**Intermediate:**
4. Build a counter app with increment, decrement, and reset buttons.
5. Create a form with a submit button and a reset button. Show a confirmation before submitting.
6. Style buttons with hover effects (background color change, shadow, scale transform).

**Advanced:**
7. Build a button with a loading spinner state that disables itself on click, simulates an API call (using setTimeout), then re-enables.
8. Create a group of radio-button-like toggle buttons where clicking one deactivates the others, using only JavaScript and button elements.
