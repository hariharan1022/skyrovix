## 20. HTML Lists
## 📘 Introduction
HTML provides three types of lists: unordered (bulleted), ordered (numbered), and description lists. Lists organize content in a readable, structured way and are fundamental for navigation menus, step-by-step instructions, glossaries, and more.

## 🧠 Key Concepts
- `<ul>` - unordered list (displays with bullet points)
- `<ol>` - ordered list (displays with numbers or letters)
- `<li>` - list item (used inside both `<ul>` and `<ol>`)
- Nested lists - lists inside list items for hierarchies
- `list-style-type` CSS property changes bullet/number style
- `<dl>` - description list, `<dt>` - term, `<dd>` - description
- `type` and `start` attributes control numbering style and offset on `<ol>`

## 💻 Syntax
```html
<!-- Unordered List -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>First</li>
  <li>Second</li>
</ol>

<!-- Description List -->
<dl>
  <dt>Term</dt>
  <dd>Description of the term</dd>
</dl>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a shopping list (unordered) and a recipe steps list (ordered).

**Code:**
```html
<h2>Shopping List</h2>
<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
</ul>

<h2>Recipe Steps</h2>
<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix ingredients</li>
  <li>Bake for 30 minutes</li>
</ol>
```

**Output:** Shopping list shows with bullets. Recipe steps show with numbers 1, 2, 3.

**Explanation:** `<ul>` is for items where order doesn't matter. `<ol>` is for sequential steps.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a nested navigation menu with description list for a glossary.

**Code:**
```html
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Cherry</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>

<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
```

**Output:** A hierarchical list with sub-items indented. Glossary shows terms in bold with descriptions indented below.

**Explanation:** Nesting `<ul>` inside `<li>` creates sub-lists. `<dl>` pairs terms (`<dt>`) with descriptions (`<dd>`).

## 🏢 Real World Use Case
Navigation menus use nested `<ul>` structures. Recipe sites use `<ol>` for cooking steps. Documentation sites use `<dl>` for glossaries. E-commerce filters use nested lists for categories.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between `<ul>` and `<ol>`?**
`<ul>` (unordered list) displays items with bullets. `<ol>` (ordered list) displays items with numbers or letters indicating sequence.

**2. How do you create a nested list?**
Place a `<ul>` or `<ol>` inside an `<li>` element. The nested list will be indented under that parent item.

**3. What is a description list and when should you use it?**
A description list (`<dl>`) pairs terms (`<dt>`) with descriptions (`<dd>`). Use it for glossaries, metadata, or key-value pairs.

**4. How can you change the numbering style of an ordered list?**
Use the `type` attribute (e.g., `type="A"` for uppercase letters, `type="i"` for lowercase Roman numerals) or CSS `list-style-type`.

**5. How do you start an ordered list from a specific number?**
Use the `start` attribute: `<ol start="5">` starts numbering from 5.

## ⚠ Common Errors / Mistakes
- Placing `<li>` outside `<ul>` or `<ol>`
- Mixing `<ul>` and `<ol>` without proper nesting
- Forgetting closing tags for list items
- Using `<br>` inside lists instead of separate `<li>` elements
- Using `<dl>` for simple bullet lists

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a to-do list using an unordered list with 5 items.
2. Create a top-10 ranking using an ordered list.
3. Change the bullet style of a `<ul>` to square using CSS.

**Intermediate:**
4. Build a nested list showing a multi-level folder structure (3 levels deep).
5. Create an ordered list that starts at 10 and uses Roman numerals.
6. Build a description list for 5 programming terms with their definitions.

**Advanced:**
7. Create a custom-styled navigation menu using nested `<ul>` with CSS dropdown functionality.
8. Build a multi-column list layout using CSS that distributes list items across columns dynamically.
