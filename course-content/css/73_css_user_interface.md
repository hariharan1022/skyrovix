## 73. CSS User Interface
## 📘 Introduction
CSS UI properties control how elements behave and appear during user interaction. These properties affect the cursor, text selection, element resizing, outlines, pointer events, and more. Mastering these low-level UI controls enhances usability, accessibility, and user experience.

## 🧠 Key Concepts
- **cursor** – Changes the mouse cursor appearance (`pointer`, `grab`, `text`, `wait`, `not-allowed`, etc.)
- **resize** – Makes an element user-resizable (`both`, `horizontal`, `vertical`)
- **outline** – A line drawn outside the border (does not affect layout), used for focus states
- **user-select** – Controls text selection (`none`, `text`, `all`, `auto`)
- **pointer-events** – Controls whether an element responds to pointer events (`auto`, `none`)
- **appearance** – Resets native OS styling (`none` to remove default button/input styling)
- **caret-color** – Changes the color of the text input cursor (caret)
- **scroll-behavior** – Controls smooth vs instant scrolling (`smooth`, `auto`)

## 💻 Syntax
```css
/* Cursor */
.clickable { cursor: pointer; }
.draggable { cursor: grab; }
.disabled { cursor: not-allowed; }
.loading { cursor: wait; }

/* Resize */
.resizable { resize: both; overflow: auto; }

/* Outline */
input:focus { outline: 2px solid #007bff; outline-offset: 2px; }

/* User select */
.no-select { user-select: none; }
.select-all { user-select: all; }

/* Pointer events */
.click-through { pointer-events: none; }

/* Appearance */
.custom-button { appearance: none; }

/* Caret */
.custom-caret { caret-color: #e74c3c; }

/* Scroll behavior */
html { scroll-behavior: smooth; }
```

## ✅ Example 1 - Basic
**Problem:** Show different cursor styles, disable text selection on a block, and style input focus outlines.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .demo-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
  }

  .cursor-box {
    width: 120px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 0.85rem;
    transition: background 0.2s;
  }

  .cursor-box:hover { background: #e9ecef; }

  .cursor-pointer { cursor: pointer; }
  .cursor-grab { cursor: grab; }
  .cursor-text { cursor: text; }
  .cursor-wait { cursor: wait; }
  .cursor-help { cursor: help; }
  .cursor-crosshair { cursor: crosshair; }
  .cursor-not-allowed { cursor: not-allowed; }

  .no-select {
    user-select: none;
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    border: 2px solid #007bff;
    margin-bottom: 20px;
  }

  .styled-input {
    padding: 10px 14px;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .styled-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
  }

  .styled-input.custom-caret {
    caret-color: #e74c3c;
  }
</style>
</head>
<body>
  <h2>Cursor Styles</h2>
  <div class="demo-grid">
    <div class="cursor-box cursor-pointer">pointer</div>
    <div class="cursor-box cursor-grab">grab</div>
    <div class="cursor-box cursor-text">text</div>
    <div class="cursor-box cursor-wait">wait</div>
    <div class="cursor-box cursor-help">help</div>
    <div class="cursor-box cursor-crosshair">crosshair</div>
    <div class="cursor-box cursor-not-allowed">not-allowed</div>
  </div>

  <h2>User Select: None</h2>
  <div class="no-select">This text cannot be selected. Try highlighting it — user-select: none.</div>

  <h2>Styled Inputs & Caret Color</h2>
  <input class="styled-input" type="text" placeholder="Default caret" style="margin-right:10px;">
  <input class="styled-input custom-caret" type="text" placeholder="Red caret">
</body>
</html>
```

**Output:** Seven boxes showing different cursor styles on hover, a text block that cannot be selected, and two inputs with focus outlines—one with a default caret, one with a red caret.

**Explanation:** Each `cursor-*` class sets a different `cursor` value. `user-select: none` prevents text selection. `:focus` on inputs adds a `box-shadow` focus ring instead of the default outline. `caret-color: #e74c3c` changes the blinking cursor color.

## 🚀 Example 2 - Intermediate
**Problem:** Build a UI demo with resizable textareas, scroll-behavior for smooth navigation, pointer-events for overlay click-through, and appearance reset for custom-styled selects.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  html { scroll-behavior: smooth; }

  .container { max-width: 800px; margin: 0 auto; }

  h2 { margin: 24px 0 12px; }

  .section {
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    margin-bottom: 24px;
  }

  /* Resize */
  .resizable-box {
    width: 100%;
    max-width: 400px;
    height: 120px;
    padding: 12px;
    border: 2px dashed #007bff;
    border-radius: 8px;
    resize: both;
    overflow: auto;
    background: #f8f9fa;
    font-size: 0.9rem;
  }

  /* Pointer-events overlay */
  .overlay-container {
    position: relative;
    display: inline-block;
  }

  .overlay-container .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,123,255,0.1);
    border-radius: 8px;
    pointer-events: none;
  }

  .overlay-container button {
    padding: 12px 24px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background: #007bff;
    color: #fff;
    cursor: pointer;
  }

  /* Appearance reset */
  .custom-select {
    appearance: none;
    padding: 10px 36px 10px 14px;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23333' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat right 12px center;
    cursor: pointer;
    width: 200px;
  }

  .custom-select:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
  }

  /* Nav links for smooth scroll demo */
  .nav-links {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .nav-links a {
    padding: 8px 16px;
    background: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .nav-links a:hover { background: #0056b3; }
</style>
</head>
<body>
  <div class="container">
    <h2>Smooth Scroll Navigation</h2>
    <div class="nav-links">
      <a href="#resize">Resize</a>
      <a href="#pointer">Pointer Events</a>
      <a href="#appearance">Appearance</a>
    </div>

    <div id="resize" class="section">
      <h2>Resize</h2>
      <div class="resizable-box">
        Grab the bottom-right corner to resize this box in both directions.
        resize: both; overflow: auto;
      </div>
    </div>

    <div id="pointer" class="section">
      <h2>Pointer Events</h2>
      <div class="overlay-container">
        <button>Click Me</button>
        <div class="overlay">This overlay has pointer-events: none — clicks pass through to the button.</div>
      </div>
    </div>

    <div id="appearance" class="section">
      <h2>Appearance Reset & Custom Select</h2>
      <select class="custom-select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
      <p style="margin-top:10px; font-size:0.85rem; color:#777;">appearance: none removes default OS styling; custom arrow via SVG background.</p>
    </div>
  </div>
</body>
</html>
```

**Output:** A page with smooth-scrolling anchor links, a resizable box (drag the corner), an overlay that does not block clicks, and a custom-styled select dropdown with `appearance: none` and SVG arrow.

**Explanation:** `resize: both; overflow: auto` enables corner dragging. `pointer-events: none` on the overlay allows clicks to pass through to the button below. `appearance: none` strips native select styling; a custom SVG arrow is added via `background-image`. `scroll-behavior: smooth` on `html` enables animated anchor scrolling.

## 🏢 Real World Use Case
Custom form controls (`appearance: none`), draggable panels and textareas (`resize`), onboarding overlays (`pointer-events`), text-selection behavior in documentation sites (`user-select`), and accessible focus indicators (`outline`).

## 🎯 Interview Questions
1. **Q:** What does `appearance: none` do?  
   **A:** It removes the native OS styling from form elements (select, button, input), allowing full custom CSS styling.

2. **Q:** How do you make an element resizable by the user?  
   **A:** Use `resize: both` (or `horizontal`/`vertical`) with `overflow: auto` or `overflow: scroll`.

3. **Q:** What is the difference between `outline` and `border`?  
   **A:** `outline` does not take up space in the layout (drawn outside the border), cannot be styled per-side, and does not affect box-sizing.

4. **Q:** What does `pointer-events: none` do?  
   **A:** It makes the element invisible to pointer events (click, hover, etc.), allowing events to pass through to elements below.

5. **Q:** When would you use `user-select: all`?  
   **A:** To make an entire element's content selected with a single click, useful for code blocks or copy-paste text.

## ⚠ Common Errors / Mistakes
- Using `outline: none` without providing a `:focus` alternative, breaking keyboard accessibility
- Expecting `resize` to work without `overflow` set to a value other than `visible`
- Using `pointer-events: none` on an interactive element, making it inaccessible
- Forgetting that `appearance: none` removes accessibility affordances (use custom focus styles)
- Applying `cursor: pointer` without actually making the element interactive (missing `onclick` or `href`)

## 📝 Practice Exercises
**Beginner:**
1. Set `cursor: pointer` on a button and `cursor: not-allowed` on a disabled element.
2. Add `user-select: none` to a paragraph and verify text cannot be highlighted.
3. Style an input's `:focus` state with a visible outline.

**Intermediate:**
4. Create a resizable `<textarea>` with `resize: vertical` and a minimum height.
5. Style a `<select>` element with `appearance: none` and a custom dropdown arrow using `background-image`.
6. Create a non-blocking overlay that sits above a button but allows clicks to pass through.

**Advanced:**
7. Build a custom file input using `appearance: none` with a styled label and hidden native input.
8. Create a draggable split-panel layout using `resize: horizontal` on a `<div>` with `overflow: auto`.
