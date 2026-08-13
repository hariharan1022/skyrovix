## 39. CSS Attribute Selectors

## 📘 Introduction
Attribute selectors allow you to target HTML elements based on the presence or value of their attributes. They are incredibly useful for styling form inputs, links, and elements with custom data attributes — without adding extra classes.

## 🧠 Key Concepts
- **`[attr]`**: Selects elements with a specific attribute (regardless of value)
- **`[attr=value]`**: Exact value match
- **`[attr~=value]`**: Value contains a specific word in a space-separated list
- **`[attr|=value]`**: Value starts with a specific word followed by a hyphen (for language codes like `en-US`)
- **`[attr^=value]`**: Value starts with a specific substring
- **`[attr$=value]`**: Value ends with a specific substring
- **`[attr*=value]`**: Value contains a specific substring anywhere
- **Case insensitivity**: Add `i` before the closing bracket — e.g., `[attr="value" i]`
- **Form input styling**: Target inputs by type (`[type="text"]`, `[type="email"]`) for specific form styling

## 💻 Syntax

```css
/* Presence */
[disabled] { opacity: 0.5; }

/* Exact match */
[type="submit"] { background: blue; }

/* Contains word */
[class~="featured"] { border: 2px solid gold; }

/* Starts with */
a[href^="https"] { color: green; }

/* Ends with */
a[href$=".pdf"]::after { content: " 📄"; }

/* Contains substring */
img[alt*="logo"] { border: none; }

/* Language prefix */
[lang|="en"] { font-family: 'Georgia', serif; }

/* Case insensitive */
[data-type="urgent" i] { background: red; }
```

## ✅ Example 1 - Basic (Link and Image Attribute Styling)

**Problem:** Style different types of links and images based on their attributes — external links, PDF links, email links, and images with specific alt text.

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
    padding: 50px;
    max-width: 700px;
    margin: 0 auto;
  }

  .demo-box {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 30px;
  }

  h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.4em;
  }

  /* Styles for different link types */

  /* External links (starts with http) */
  a[href^="http"] {
    color: #3498db;
    text-decoration: none;
  }
  a[href^="http"]::after {
    content: " ↗";
    font-size: 0.8em;
  }
  a[href^="http"]:hover {
    text-decoration: underline;
  }

  /* PDF links (ends with .pdf) */
  a[href$=".pdf"] {
    color: #e74c3c;
  }
  a[href$=".pdf"]::before {
    content: "📄 ";
  }

  /* Email links (starts with mailto:) */
  a[href^="mailto:"] {
    color: #2ecc71;
  }
  a[href^="mailto:"]::before {
    content: "✉️ ";
  }

  /* Internal links (starts with #) */
  a[href^="#"] {
    color: #9b59b6;
    border-bottom: 1px dotted #9b59b6;
    text-decoration: none;
  }

  /* Links that open in new tab */
  a[target="_blank"]::after {
    content: " [new tab]";
    font-size: 0.75em;
    color: #999;
  }

  /* Image styling based on alt text */
  img {
    max-width: 100%;
    display: block;
    margin: 10px 0;
    border-radius: 8px;
  }

  /* Images with "logo" in alt text */
  img[alt*="logo" i] {
    border: 2px solid #3498db;
    padding: 10px;
    background: white;
  }

  /* Images with "photo" in alt text */
  img[alt*="photo" i] {
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }

  /* Disabled inputs */
  input[disabled] {
    background: #f0f0f0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Required inputs */
  input[required] {
    border-left: 3px solid #e74c3c;
  }

  ul {
    list-style: none;
  }
  li {
    margin: 10px 0;
  }
</style>
</head>
<body>
  <div class="demo-box">
    <h2>Link Attribute Selectors</h2>
    <ul>
      <li><a href="https://example.com">External Link</a></li>
      <li><a href="report.pdf">PDF Document</a></li>
      <li><a href="mailto:hello@example.com">Send Email</a></li>
      <li><a href="#section1">Internal Section Link</a></li>
      <li><a href="https://example.com" target="_blank">External with Target</a></li>
    </ul>

    <h2 style="margin-top: 30px;">Image Attribute Selectors</h2>
    <img src="https://picsum.photos/200/80?random=70" alt="Company Logo" style="width: 200px;">
    <img src="https://picsum.photos/400/200?random=71" alt="Vacation Photo" style="width: 400px;">
    <img src="https://picsum.photos/300/100?random=72" alt="Banner Image" style="width: 300px;">
  </div>

  <div class="demo-box">
    <h2>Form Attribute Selectors</h2>
    <form>
      <p><input type="text" placeholder="Username" required></p>
      <p><input type="email" placeholder="Email" required></p>
      <p><input type="text" placeholder="Coupon (disabled)" disabled></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  </div>
</body>
</html>
```

**Output:** Links styled by type (external with arrow, PDF with icon, mail with icon), images styled by alt text content (logo has blue border, photos have shadow), and form inputs styled by attributes (required has red border, disabled is gray).

**Explanation:** `[href^="http"]` targets external links. `[href$=".pdf"]` targets PDFs. `[alt*="logo" i]` targets images with "logo" in alt text (case-insensitive via `i`). `[required]` and `[disabled]` target form states.

## 🚀 Example 2 - Intermediate (Data Attribute Cards and Toolbar)

**Problem:** Build a set of cards with `data-*` attributes for categories, and a toolbar that filters cards using attribute selectors combined with the checkbox hack.

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
    padding: 30px;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .subtitle {
    text-align: center;
    color: #888;
    margin-bottom: 30px;
  }

  /* Filter toolbar */
  .filters {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  /* Hide radio inputs */
  .filters input[type="radio"] {
    display: none;
  }

  /* Style radio labels as buttons */
  .filters label {
    display: inline-block;
    padding: 10px 24px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.9em;
    color: #555;
    transition: all 0.3s;
    user-select: none;
  }

  .filters label:hover {
    border-color: #3498db;
    color: #3498db;
  }

  /* Checked state for labels — use adjacent selector */
  .filters input[type="radio"]:checked + label {
    background: #3498db;
    border-color: #3498db;
    color: white;
  }

  /* Card grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }

  .card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
  }

  .card-body {
    padding: 15px;
  }

  .card-body h3 {
    color: #2c3e50;
    font-size: 1em;
    margin-bottom: 5px;
  }

  .card-body p {
    color: #777;
    font-size: 0.85em;
    line-height: 1.5;
  }

  .card-body .tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.75em;
    font-weight: bold;
    margin-top: 8px;
  }

  /* Tag colors by category */
  .card[data-category="design"] .tag {
    background: #e8f4f8;
    color: #2980b9;
  }
  .card[data-category="code"] .tag {
    background: #fde8e8;
    color: #c0392b;
  }
  .card[data-category="marketing"] .tag {
    background: #fef9e7;
    color: #d4a017;
  }
  .card[data-category="writing"] .tag {
    background: #e8f8e8;
    color: #27ae60;
  }

  /* Filter logic: hide cards that don't match */
  #filter-all:checked ~ .card-grid .card { display: block; }

  #filter-design:checked ~ .card-grid .card:not([data-category="design"]) { display: none; }
  #filter-code:checked ~ .card-grid .card:not([data-category="code"]) { display: none; }
  #filter-marketing:checked ~ .card-grid .card:not([data-category="marketing"]) { display: none; }
  #filter-writing:checked ~ .card-grid .card:not([data-category="writing"]) { display: none; }

  /* Default: all visible */
  .card { display: block; }
</style>
</head>
<body>
  <div class="container">
    <h1>Project Portfolio</h1>
    <p class="subtitle">Filter projects by category using attribute selectors</p>

    <!-- Filter controls -->
    <div class="filters">
      <input type="radio" name="filter" id="filter-all" checked>
      <label for="filter-all">All</label>

      <input type="radio" name="filter" id="filter-design">
      <label for="filter-design">Design</label>

      <input type="radio" name="filter" id="filter-code">
      <label for="filter-code">Code</label>

      <input type="radio" name="filter" id="filter-marketing">
      <label for="filter-marketing">Marketing</label>

      <input type="radio" name="filter" id="filter-writing">
      <label for="filter-writing">Writing</label>
    </div>

    <!-- Cards with data-category attribute -->
    <div class="card-grid">
      <div class="card" data-category="design">
        <img src="https://picsum.photos/250/180?random=80" alt="Design project">
        <div class="card-body">
          <h3>Brand Identity Pack</h3>
          <p>Complete brand guidelines and visual identity system.</p>
          <span class="tag">Design</span>
        </div>
      </div>

      <div class="card" data-category="code">
        <img src="https://picsum.photos/250/180?random=81" alt="Code project">
        <div class="card-body">
          <h3>API Gateway</h3>
          <p>RESTful API with authentication and rate limiting.</p>
          <span class="tag">Code</span>
        </div>
      </div>

      <div class="card" data-category="marketing">
        <img src="https://picsum.photos/250/180?random=82" alt="Marketing project">
        <div class="card-body">
          <h3>Social Campaign</h3>
          <p>Q2 social media strategy and content calendar.</p>
          <span class="tag">Marketing</span>
        </div>
      </div>

      <div class="card" data-category="writing">
        <img src="https://picsum.photos/250/180?random=83" alt="Writing project">
        <div class="card-body">
          <h3>Technical Blog</h3>
          <p>Developer documentation and tutorial series.</p>
          <span class="tag">Writing</span>
        </div>
      </div>

      <div class="card" data-category="design">
        <img src="https://picsum.photos/250/180?random=84" alt="Design project">
        <div class="card-body">
          <h3>Mobile App UI</h3>
          <p>Figma prototype for fitness tracking application.</p>
          <span class="tag">Design</span>
        </div>
      </div>

      <div class="card" data-category="code">
        <img src="https://picsum.photos/250/180?random=85" alt="Code project">
        <div class="card-body">
          <h3>React Component Lib</h3>
          <p>Reusable UI component library with Storybook.</p>
          <span class="tag">Code</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A portfolio grid with filter buttons. Clicking "Design" shows only cards with `data-category="design"`. The active filter button is highlighted in blue.

**Explanation:** Radio buttons control which filter is active. The `:checked` pseudo-class combined with attribute selectors hides non-matching cards: `#filter-design:checked ~ .card-grid .card:not([data-category="design"]) { display: none; }`. The `~` sibling combinator connects the radio to the card grid. `[data-category]` attribute selectors target specific categories.

## 🏢 Real World Use Case
Styling different link types (downloads, external, email), form input validation states, filtering and sorting interfaces, language-specific styling, CMS content styling (different content types via data attributes), and accessibility enhancement (styling elements with `aria-*` attributes).

## 🎯 Interview Questions

1. **What is the difference between `[attr^=value]` and `[attr|=value]`?**
   *`[attr^=value]` matches when the attribute value starts with the specified substring. `[attr|=value]` matches when the value is exactly the specified string OR starts with it followed by a hyphen (`-`), designed for language codes like `en`, `en-US`, `en-GB`.*

2. **How do you make an attribute selector case-insensitive?**
   *Add an `i` before the closing bracket: `[attr="value" i]`. This matches "Value", "VALUE", "value", etc.*

3. **How would you select all external links on a page?**
   *Use `a[href^="http"]` or `a[href^="https"]`. For a more robust solution, `a[href^="//"]` also captures protocol-relative URLs.*

4. **Can you combine attribute selectors with class selectors?**
   *Yes. For example, `input.error[type="email"]` selects email inputs with the class "error". Attribute selectors can be chained with any other selectors.*

5. **What is the `data-*` attribute and how do you select it?**
   *`data-*` attributes are custom attributes for storing extra information. Select them with `[data-name]` (presence), `[data-name="value"]` (exact), or more specific selectors like `[data-price^="10"]`.*

## ⚠ Common Errors / Mistakes

- **Confusing `[attr~=value]` with `[attr*=value]`**: `~=` matches whole words in a space-separated list; `*=` matches a substring anywhere in the value
- **Forgetting that attribute selectors are case-sensitive by default**: Use the `i` flag for case-insensitive matching
- **Using `[attr=value]` when the attribute has spaces**: If `class="foo bar"`, `[class="foo"]` won't match — use `[class~="foo"]`
- **Overusing attribute selectors for performance**: In very large DOMs, complex attribute selectors can be slower than class-based selectors
- **Thinking `[disabled]` selects only `disabled="disabled"`**: It selects any element with the `disabled` attribute regardless of value

## 📝 Practice Exercises

### Beginner
1. Select all `<a>` elements with an `href` attribute and style them with a color.
2. Use `[type="submit"]` to style submit buttons with green background and white text.
3. Use `[href$=".jpg"]` to add a "🖼️" before links that end in `.jpg`.

### Intermediate
4. Style a form where `[type="text"]` inputs have a light blue border, `[type="email"]` inputs have a light green border, and `[required]` inputs have a red asterisk using `::after`.
5. Build a list of links where `[href^="http"]` gets an external link icon, `[href^="mailto:"]` gets an email icon, and `[href^="tel:"]` gets a phone icon — all using `::before`.
6. Create a card grid where each card has a `data-priority` attribute (low, medium, high). Use attribute selectors to add a colored left border: green for low, yellow for medium, red for high.

### Advanced
7. Build a tabbed interface using attribute selectors and the checkbox hack: each tab button has a `data-tab` value, and content panels use `[data-tab-content]`. Only show the panel whose `data-tab-content` matches the checked radio button's value — all without JavaScript.
8. Create an advanced form validation display using attribute selectors: style `[aria-invalid="true"]` inputs with a red border, `[aria-describedby]` inputs with a help icon, and use `[data-error]` on span elements to show/hide error messages based on input state — combine with `:valid`/`:invalid` pseudo-classes.
