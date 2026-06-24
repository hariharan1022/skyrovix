# 10. HTML Formatting

## 📘 Introduction

HTML provides a set of elements specifically designed for formatting text content. These elements give semantic meaning to text and often apply visual styling. For example, `<b>` and `<strong>` both make text bold, but `<strong>` carries semantic importance (indicating strong emphasis). Similarly, `<i>` and `<em>` both italicize text, but `<em>` indicates emphasized content. Other formatting elements include `<mark>` (highlighted text), `<small>` (side comments or fine print), `<del>` (deleted text, shown with strikethrough), `<ins>` (inserted text, shown with underline), `<sub>` (subscript), and `<sup>` (superscript). Using proper formatting elements improves accessibility, SEO, and semantic correctness of your content. This module covers each formatting element, its purpose, and when to use it.

## 🧠 Key Concepts

- **`<b>` vs `<strong>`:** Both display as bold. `<b>` has no semantic meaning (purely stylistic). `<strong>` indicates strong importance/emphasis (semantic).
- **`<i>` vs `<em>`:** Both display as italic. `<i>` is for technical terms, foreign words, or thoughts (stylistic). `<em>` indicates emphasized text (semantic).
- **`<mark>`:** Highlights text with a yellow background (like a highlighter pen). Represents marked/referenced text.
- **`<small>`:** Displays text in a smaller font. Used for side comments, fine print, copyright, or legal text.
- **`<del>`:** Shows text with a strikethrough line. Indicates deleted content.
- **`<ins>`:** Shows text with an underline. Indicates newly inserted content.
- **`<sub>`:** Renders text as subscript (below the baseline). Used in chemical formulas (H<sub>2</sub>O) and math.
- **`<sup>`:** Renders text as superscript (above the baseline). Used in exponents (10<sup>2</sup>), ordinal numbers, and footnotes.

| Element | Visual | Semantic Meaning | Use Case |
|---------|--------|------------------|----------|
| `<b>` | Bold | None (stylistic only) | Keywords, product names |
| `<strong>` | Bold | Strong importance | Warnings, important info |
| `<i>` | Italic | None (stylistic only) | Technical terms, foreign words |
| `<em>` | Italic | Emphasized | Stress emphasis in text |
| `<mark>` | Highlight | Marked/referenced | Search results, highlights |
| `<small>` | Smaller | Side comments | Legal text, copyright |
| `<del>` | Strikethrough | Deleted | Revisions, price changes |
| `<ins>` | Underline | Inserted | Additions, updates |
| `<sub>` | Subscript | Subscript | Chemical formulas |
| `<sup>` | Superscript | Superscript | Exponents, ordinals |

## 💻 Syntax

```html
<p><b>Bold text</b> and <strong>strong text</strong> look the same.</p>
<p><i>Italic text</i> and <em>emphasized text</em> look the same.</p>
<p><mark>Highlighted text</mark> stands out.</p>
<p><small>This is fine print or legal text.</small></p>
<p><del>This text is deleted</del> and <ins>this text is inserted</ins>.</p>
<p>H<sub>2</sub>O (water) and 10<sup>2</sup> = 100.</p>
```

- `<b>` and `<strong>` both render as bold but have different semantic meanings.
- `<i>` and `<em>` both render as italic but have different semantic meanings.
- `<mark>` adds a yellow background highlight.
- `<small>` reduces font size.
- `<del>` adds strikethrough; `<ins>` adds underline.
- `<sub>` lowers text; `<sup>` raises text.

## ✅ Example 1 - Basic

**Problem:** Create a page demonstrating all formatting elements with clear labels.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Formatting</title>
</head>
<body>
  <h1>Text Formatting Examples</h1>

  <p><b>Bold text</b> using &lt;b&gt; tag.</p>
  <p><strong>Strong text</strong> using &lt;strong&gt; tag.</p>
  <p><i>Italic text</i> using &lt;i&gt; tag.</p>
  <p><em>Emphasized text</em> using &lt;em&gt; tag.</p>
  <p><mark>Highlighted text</mark> using &lt;mark&gt; tag.</p>
  <p><small>Small text</small> using &lt;small&gt; tag.</p>
  <p><del>Deleted text</del> using &lt;del&gt; tag.</p>
  <p><ins>Inserted text</ins> using &lt;ins&gt; tag.</p>
  <p>H<sub>2</sub>O using &lt;sub&gt; tag.</p>
  <p>10<sup>2</sup> = 100 using &lt;sup&gt; tag.</p>
</body>
</html>
```

**Output:** A page showing each formatting element with its visual appearance.

**Explanation:** Each formatting element is demonstrated on its own line with a label showing the tag name. This helps beginners associate the visual output with the correct HTML tag.

## 🚀 Example 2 - Intermediate

**Problem:** Create a product listing page with pricing, updates, and technical details using formatting elements.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Product Listing</title>
</head>
<body>
  <article>
    <h1>Wireless Headphones <sup style="color: red;">New</sup></h1>

    <p><strong>Brand:</strong> Skyrovix Audio</p>
    <p><strong>Price:</strong> <del>$149.99</del> <ins style="color: green;">$99.99</ins></p>
    <p><em>Limited time offer. Ends December 31st.</em></p>

    <h2>Features</h2>
    <ul>
      <li>Noise cancellation: <b>Active</b></li>
      <li>Battery life: Up to <b>30 hours</b></li>
      <li>Water resistance: IPX<sub>5</sub></li>
    </ul>

    <h2>Specifications</h2>
    <p>Bluetooth 5.<sup>2</sup> | Driver size: 40mm</p>

    <p><small>* Terms and conditions apply. Prices may vary by region.</small></p>

    <p><mark>Best Seller</mark> - Rated 4.8/5 by customers</p>
  </article>
</body>
</html>
```

**Output:** A product card with a "New" superscript badge, strikethrough original price, green inserted sale price, emphasized text, bold features, subscript in specs, small print, and marked "Best Seller" highlight.

**Explanation:** This real-world example combines multiple formatting elements: `<sup>` for "New" badge, `<del>` for original price, `<ins>` for sale price (with green color via `style`), `<small>` for legal text, `<mark>` for "Best Seller," and `<sub>`/`<sup>` for technical specs.

## 🏢 Real World Use Case

- **E-commerce (Amazon, Flipkart):** Product pages use `<del>` for original prices, `<ins>` for sale prices, `<sup>` for trademarks or ordinal numbers, `<small>` for legal disclaimers, `<strong>` for key features, and `<mark>` for "Best Seller" or "Limited Offer" badges.
- **Scientific/Academic Journals (Nature, IEEE):** Research papers use `<sub>` for chemical formulas (CO<sub>2</sub>), `<sup>` for citation references and exponents, `<em>` for emphasis in abstracts, and `<small>` for author affiliations and footnotes.
- **Wikipedia:** Articles extensively use `<b>` for bold definitions, `<i>` for foreign terms and book titles, `<sup>` for citation numbers, `<sub>` in chemistry articles, `<small>` for notes, and `<del>`/`<ins>` for showing edits.

## 🎯 Interview Questions

**1. What is the difference between `<b>` and `<strong>`?**
`<b>` is purely visual (bold styling) with no semantic meaning. `<strong>` indicates strong importance and is semantic—screen readers may emphasize it differently. Always use `<strong>` when content is truly important.

**2. What is the difference between `<i>` and `<em>`?**
`<i>` is for text that is set off from normal prose (technical terms, foreign words) without emphasis. `<em>` indicates stressed emphasis, changing the meaning of a sentence. Screen readers may change vocal emphasis for `<em>`.

**3. When would you use `<mark>` in a webpage?**
Use `<mark>` to highlight text for reference or notation purposes, such as search result matches, key quotes, or important passages that the user should note.

**4. What is the purpose of `<sub>` and `<sup>` elements?**
`<sub>` displays subscript text (below baseline) for chemical formulas, mathematical indices, and footnotes. `<sup>` displays superscript text (above baseline) for exponents, ordinal indicators (1st, 2nd), and reference citations.

**5. How do `<del>` and `<ins>` work together?**
They show revisions. `<del>` marks content that has been removed (strikethrough), while `<ins>` marks content that has been added (underline). They are commonly used in document versioning, price changes, and collaborative editing.

## ⚠ Common Errors / Mistakes

**Error 1: Using `<b>` and `<i>` When `<strong>` and `<em>` Are More Appropriate**
```html
<p><b>Warning:</b> This area is restricted.</p>
```
- **Reason:** For important warnings, `<strong>` carries semantic meaning for accessibility.
- **Fix:** `<p><strong>Warning:</strong> This area is restricted.</p>`

**Error 2: Missing Closing Tags on Formatting Elements**
```html
<p>This is <strong>important.</p>
```
- **Reason:** The `<strong>` tag is not closed, causing the browser to apply bold to the rest of the page.
- **Fix:** `<p>This is <strong>important</strong>.</p>`

**Error 3: Using `<small>` for Large Blocks of Content**
```html
<small><p>Long paragraph of legal text...</p></small>
```
- **Reason:** `<small>` is an inline element; wrapping block-level elements inside it is invalid.
- **Fix:** Apply CSS `font-size: small` to the paragraph or use `<small>` inline.

## 📝 Practice Exercises

**Beginner:**
1. Create a paragraph that uses `<b>`, `<i>`, and `<mark>` on different words.
2. Write a chemical formula using `<sub>`: Water (H2O), Carbon Dioxide (CO2), and Sulfuric Acid (H2SO4).
3. Create a math expression using `<sup>`: 2 squared, 3 cubed, and 10 to the power of 5.

**Intermediate:**
4. Build a product card with an original price (using `<del>`), a sale price (using `<ins>`), and a "Sale" badge using `<sup>`.
5. Create a revision history entry showing changes: deleted old text with `<del>`, inserted new text with `<ins>`, and a mark highlighting the key change.
6. Design a blog post excerpt that uses `<strong>` for the first sentence, `<em>` for a quote, `<small>` for the date, and `<mark>` for a keyword.

**Advanced:**
7. Create a complete price comparison table for three products. Each product row should show: original price (`<del>`), discounted price (`<ins>`), a "Best Value" badge (`<mark>`), specifications using `<sub>`/`<sup>`, and legal fine print (`<small>`).
8. Build a full product detail page for a smartphone that includes: product name with superscript trademark, features list with bold/strong labels, discontinued specs with del, new specs with ins, technical specs with sub/sup, and a "Limited Offer" highlight with mark.
