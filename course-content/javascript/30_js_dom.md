## 30. JS HTML DOM
## 📘 Introduction
The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of **nodes** (elements, text, attributes) that JavaScript can traverse, read, and modify. The DOM is the bridge between JavaScript and the web page's visual structure.

## 🧠 Key Concepts
- **DOM Tree** — document structure as a hierarchy of nodes (document → html → head/body → elements)
- **Selecting elements**:
  - `document.getElementById('id')` — fastest, single element by ID
  - `document.querySelector('css-selector')` — first matching element
  - `document.querySelectorAll('css-selector')` — `NodeList` (static, forEach-able)
  - `document.getElementsByClassName()`, `getElementsByTagName()` — live collections
- **Reading/Setting content**:
  - `element.innerHTML` — HTML content (parsed, re-renders — XSS risk)
  - `element.textContent` — plain text (safer, faster)
- **Creating & removing**:
  - `document.createElement('tag')` — new element
  - `parent.appendChild(child)` — add at end
  - `parent.removeChild(child)` — remove
  - `parent.insertBefore(new, ref)` — insert before reference
  - `element.remove()` — modern, removes self
- **`classList` API**:
  - `element.classList.add('cls')`, `.remove('cls')`, `.toggle('cls')`, `.contains('cls')`
- **`style` property** — inline styles: `element.style.color = 'red'`
- **Event listeners**: `element.addEventListener('click', handler)` / `removeEventListener`

## 💻 Syntax
```javascript
const el = document.getElementById('app');
const items = document.querySelectorAll('.item');
const firstItem = document.querySelector('.item');

el.textContent = 'Hello';
el.innerHTML = '<span>Hello</span>';
el.classList.add('active');
el.style.backgroundColor = 'blue';

const newDiv = document.createElement('div');
el.appendChild(newDiv);
el.removeChild(newDiv);
el.addEventListener('click', () => console.log('clicked'));
```

## ✅ Example 1 - Basic (DOM Manipulation)
**Problem:** Build a simple to-do item adder.

**Code (HTML + JS):**
```html
<ul id="todo-list"></ul>
<input id="todo-input" placeholder="Add task" />
<button id="add-btn">Add</button>

<script>
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const btn = document.getElementById('add-btn');

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', () => li.remove());

    list.appendChild(li);
    input.value = '';
  });
</script>
```

**Output (interactive):** Type in the input, click Add — a new `<li>` appears in the list. Click any item to delete it.

**Explanation:** `getElementById` selects elements. `createElement('li')` creates a new list item. `textContent` sets safe text. `appendChild` adds it to the DOM. An event listener on each item handles deletion.

## 🚀 Example 2 - Intermediate (ClassList Toggle + QuerySelectorAll)
**Problem:** Toggle "dark mode" on multiple cards with a single button using `classList.toggle`.

**Code (HTML + JS):**
```html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="card">Card 3</div>
<button id="theme-toggle">Toggle Dark Mode</button>

<style>
  .card { padding: 1rem; margin: 0.5rem; border: 1px solid #ccc; }
  .card.dark { background: #222; color: #fff; border-color: #555; }
</style>

<script>
  const cards = document.querySelectorAll('.card');
  const toggleBtn = document.getElementById('theme-toggle');

  toggleBtn.addEventListener('click', () => {
    cards.forEach(card => card.classList.toggle('dark'));
  });
</script>
```

**Output (interactive):** Click the button — all cards toggle between light and dark styling simultaneously.

**Explanation:** `querySelectorAll('.card')` returns a static `NodeList`. `classList.toggle('dark')` adds the class if absent, removes it if present. `forEach` applies the toggle to every element.

## 🏢 Real World Use Case
Single-Page Applications (SPAs): the root `<div id="root">` is populated via `innerHTML` or `appendChild` with dynamically created elements. `eventListeners` on parent elements use event delegation (`e.target`) to handle clicks on many children. `classList.toggle` for theme switching. `querySelector` for form validation.

## 🎯 Interview Questions
1. **What is the difference between `innerHTML` and `textContent`?** — `innerHTML` parses and renders HTML (XSS risk). `textContent` is plain text only (no parsing, safer, faster).
2. **What is the difference between `getElementById` and `querySelector`?** — `getElementById` is faster but only works with IDs. `querySelector` accepts any CSS selector and returns the first match.
3. **What is event delegation?** — Attaching a single event listener to a parent instead of each child. Uses `e.target` to determine which child triggered it. Useful for dynamic content.
4. **What does `classList.toggle` do?** — Adds the class if it's absent, removes it if present. Returns `true` if the class was added, `false` if removed.
5. **How do you create and add an element to the DOM?** — `document.createElement('div')` → set properties → `parent.appendChild(el)` or `parent.insertBefore(el, ref)`.

## ⚠ Common Errors / Mistakes
- Using `innerHTML` with user input (XSS vulnerability) — always use `textContent`
- Forgetting that `querySelectorAll` returns a `NodeList` (not an Array) — use `Array.from()` or `[...nodeList]` for full Array methods
- Setting `style` properties with hyphens (use camelCase: `backgroundColor` not `background-color`)
- Re-querying the DOM when a reference already exists — cache selectors
- Using `removeChild` without checking `parentNode` — prefer `element.remove()`

## 📝 Practice Exercises
**Beginner**
1. Select an element with `id="header"` and change its `textContent` to "Welcome!".
2. Use `querySelectorAll` to select all `<p>` tags and change their color to blue via `style.color`.
3. Create a button that, when clicked, adds a new `<div>` with the text "New Box" to the body.

**Intermediate**
4. Build a color-picker grid: 16 colored `<div>` squares. Clicking any square sets the page background to that color using event delegation.
5. Implement a "tabbed interface" — three tabs, each clicking a tab shows its content panel and hides others using `classList.add/remove`.
6. Write a form validation script: on submit, check that all required input fields are not empty, add `.error` class to invalid fields via `classList.add`, and show error messages using `textContent`.

**Advanced**
7. Build a virtual-scroll component that only renders the visible 10 rows of a 10,000-row table, using `scroll` events and DOM recycling.
8. Implement a custom `<template>` engine: given a template string `"<li>{{name}}</li>"` and data array, parse, render, and insert into the DOM — then update only changed nodes on re-render.
