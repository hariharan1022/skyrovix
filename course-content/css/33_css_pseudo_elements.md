## 33. CSS Pseudo-elements

## 📘 Introduction
Pseudo-elements allow you to style specific parts of an element or insert content before/after an element without modifying the HTML. They are powerful for decorative effects, typography enhancements, and creating UI components with minimal markup.

## 🧠 Key Concepts
- **`::before` / `::after`**: Insert generated content before or after an element's content; require the `content` property
- **`content` property**: Defines what is inserted — strings, images (`url()`), `attr()`, counters, or empty string (`""`)
- **`::first-letter`**: Styles the first letter of a block-level element (drop caps, large fonts)
- **`::first-line`**: Styles the first line of a block-level element (changes as the viewport resizes)
- **`::selection`**: Styles the portion of text selected/highlighted by the user
- **`::placeholder`**: Styles the placeholder text in form inputs
- **Double colon vs single colon**: `::` is the modern syntax (CSS3); `:` is legacy (CSS2) — both work for `:before`, `:after`, `:first-letter`, `:first-line`
- **Styling pseudo-elements**: Most CSS properties apply to pseudo-elements; `::before`/`::after` are inline by default

## 💻 Syntax

```css
/* Insert icon before links */
.link-external::after {
  content: " ↗";
  font-size: 0.8em;
}

/* Drop cap */
.article::first-letter {
  font-size: 3em;
  float: left;
  margin-right: 8px;
  color: #e74c3c;
}

/* First line styling */
.article::first-line {
  font-weight: bold;
  color: #2c3e50;
}

/* Selection styling */
::selection {
  background: #3498db;
  color: white;
}

/* Placeholder styling */
input::placeholder {
  color: #aaa;
  font-style: italic;
}
```

## ✅ Example 1 - Basic (Decorative Icons and Styled Text Selections)

**Problem:** Add decorative icons before headings and after external links, style the selection color, and create a drop cap.

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
    font-family: Georgia, serif;
    background: #fafafa;
    padding: 40px;
    max-width: 700px;
    margin: 0 auto;
  }

  /* Decorative heading with ::before */
  h2::before {
    content: "◆ ";
    color: #3498db;
    font-size: 0.8em;
  }

  /* External link indicator */
  a[href^="http"]::after {
    content: " ↗";
    font-size: 0.75em;
    color: #888;
  }

  /* Drop cap on first paragraph */
  .article p:first-of-type::first-letter {
    font-size: 3.5em;
    float: left;
    line-height: 1;
    margin-right: 8px;
    color: #e74c3c;
    font-weight: bold;
    font-family: 'Times New Roman', serif;
  }

  /* First line bold */
  .article p:first-of-type::first-line {
    font-weight: bold;
    color: #2c3e50;
  }

  /* Custom selection */
  ::selection {
    background: #3498db;
    color: white;
  }

  /* Custom text highlight on article only */
  .article ::selection {
    background: #e74c3c;
    color: white;
  }

  /* Paragraph styling */
  .article p {
    line-height: 1.8;
    color: #444;
    margin-bottom: 15px;
    text-align: justify;
  }
</style>
</head>
<body>
  <article class="article">
    <h2>Introduction</h2>
    <p>Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML. Pseudo-elements are powerful tools that allow you to style specific parts of elements and insert content without adding extra HTML markup.</p>
    <p>This article demonstrates several pseudo-element techniques including drop caps, decorative icons, custom selection colors, and external link indicators. Try selecting text with your mouse to see the custom <a href="https://example.com">selection styling</a>.</p>
  </article>
</body>
</html>
```

**Output:** A styled article with diamond icon before the heading, external link with arrow, large red drop cap on the first paragraph, bold first line, and custom color when text is selected.

**Explanation:** `::before` and `::after` inject content via the `content` property. `::first-letter` applies only to the first character. `::first-line` applies to the first rendered line (dynamic with viewport). `::selection` globally styles highlighted text.

## 🚀 Example 2 - Intermediate (Custom Tooltip with ::before/::after)

**Problem:** Create a CSS-only tooltip that appears on hover using `::before` and `::after` pseudo-elements, with no JavaScript.

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
    padding: 60px;
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }

  .tooltip-trigger {
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    background: #3498db;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;
  }
  .tooltip-trigger:hover {
    background: #2980b9;
  }

  /* Tooltip bubble using ::after */
  .tooltip-trigger::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 130%;
    left: 50%;
    transform: translateX(-50%);
    background: #2c3e50;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: normal;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
  }

  /* Tooltip arrow using ::before */
  .tooltip-trigger::before {
    content: "";
    position: absolute;
    bottom: 130%;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    border: 6px solid transparent;
    border-top-color: #2c3e50;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Show tooltip on hover */
  .tooltip-trigger:hover::after,
  .tooltip-trigger:hover::before {
    opacity: 1;
  }

  /* Different positions */
  .tooltip-trigger[data-position="right"]::after {
    bottom: auto;
    left: 110%;
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
  }
  .tooltip-trigger[data-position="right"]::before {
    bottom: auto;
    left: 110%;
    top: 50%;
    transform: translateY(-50%) translateX(-100%);
    border-top-color: transparent;
    border-right-color: #2c3e50;
  }

  .tooltip-trigger[data-position="bottom"]::after {
    bottom: auto;
    top: 130%;
  }
  .tooltip-trigger[data-position="bottom"]::before {
    bottom: auto;
    top: 130%;
    transform: translateX(-50%) translateY(-100%);
    border-top-color: transparent;
    border-bottom-color: #2c3e50;
  }

  /* Heading */
  .demo-heading {
    width: 100%;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 20px;
  }
</style>
</head>
<body>
  <h2 class="demo-heading">CSS-Only Tooltips</h2>

  <button class="tooltip-trigger" data-tooltip="This is a tooltip!" data-position="top">
    Hover Top
  </button>

  <button class="tooltip-trigger" data-tooltip="Tooltip on the right" data-position="right">
    Hover Right
  </button>

  <button class="tooltip-trigger" data-tooltip="Tooltip below" data-position="bottom">
    Hover Bottom
  </button>

  <div style="width: 100%; text-align: center; margin-top: 40px; color: #888; font-size: 0.9em;">
    Built entirely with ::before and ::after pseudo-elements — no JavaScript needed.
  </div>
</body>
</html>
```

**Output:** Three buttons that each show a tooltip on hover with a small arrow pointing to the trigger. Different `data-position` attributes control tooltip placement.

**Explanation:** `::after` creates the tooltip bubble using `content: attr(data-tooltip)` (reading from a custom attribute). `::before` creates the triangular arrow using CSS borders. Both are absolutely positioned relative to the trigger. `opacity: 0` hides them initially; hover sets `opacity: 1`. `pointer-events: none` prevents the tooltip from interfering with hover detection.

## 🏢 Real World Use Case
Custom tooltips, notification badges, quote decorations, clearfix hack, styled file input buttons, decorative dividers, star ratings, custom checkbox/radio indicators, and breadcrumb separators all use pseudo-elements for visual enhancements.

## 🎯 Interview Questions

1. **What is the difference between `:before` and `::before`?**
   *`:before` is the CSS2 syntax (single colon), `::before` is the CSS3 syntax (double colon). Both work in modern browsers, but `::before` is the recommended standard for pseudo-elements. Pseudo-classes use single colon.*

2. **What is the `content` property and what values can it accept?**
   *The `content` property defines what a `::before`/`::after` element displays. Values include: strings (`"text"`), `url()` (images), `attr()` (attribute values), counters (`counter(name)`), `open-quote`/`close-quote`, or an empty string `""`.*

3. **Can pseudo-elements be used with replaced elements like `<img>`?**
   *No. `::before` and `::after` do not work on replaced elements (`<img>`, `<video>`, `<input>`, `<select>`, `<textarea>`) because they cannot contain child content. They work on container elements like `<div>`, `<p>`, `<button>`.*

4. **How can you create a custom checkbox using pseudo-elements?**
   *Hide the default checkbox (`opacity: 0; position: absolute`), style a `<label>` with `::before` as the custom box, and use `input:checked + label::after` to show a checkmark via `content: "✓"`.*

5. **What properties can be applied to `::first-letter`?**
   *Font properties (size, family, weight, etc.), color, background, margin, padding, border, float, and text-decoration. Not all properties apply — for example, `position` and `display` have limited effect.*

## ⚠ Common Errors / Mistakes

- **Forgetting the `content` property on `::before`/`::after`**: The pseudo-element will not render without `content: ""` (even if empty)
- **Using `::before`/`::after` on replaced elements**: `<img>`, `<input>`, and `<iframe>` do not support pseudo-elements
- **Assuming `::first-letter` works on inline elements**: The element must be block-level or inline-block
- **Applying `::before`/`::after` without `position: absolute`**: They are inline by default and can break layout; absolute positioning is common for overlays
- **Using `::before` for content that should be accessible**: Pseudo-element content is not part of the DOM and may not be read by screen readers — use them for decorative content only

## 📝 Practice Exercises

### Beginner
1. Use `::before` to add "🔹 " before each `<li>` item in a list.
2. Use `::after` to add " ✦" after all `<h2>` headings on a page.
3. Style `::selection` on the page with a light blue background and dark text.

### Intermediate
4. Create a blockquote element with large quotation marks using `::before` and `::after` (e.g., `content: " "`).
5. Build a breadcrumb navigation where `li + li::before` inserts a "/" separator between items.
6. Create a custom file upload button where the default `<input type="file">` is hidden and a styled `<label>` uses `::after` to show the selected filename (using `attr()`).

### Advanced
7. Build a star rating widget using only CSS: a container of radio buttons where `:checked ~ label::before` displays filled stars (★) and unchecked shows empty stars (☆), using the `content` property with Unicode characters.
8. Create a CSS-only parallax card effect where `::before` acts as a background image layer with `transform: scale()` on hover, while `::after` creates a gradient overlay, all without additional HTML elements.
