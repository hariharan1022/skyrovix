## 16. CSS Text
## 📘 Introduction
CSS provides extensive control over text appearance — from basic color and alignment to advanced effects like shadows and spacing. Text styling is fundamental to typography and readability in web design.

## 🧠 Key Concepts
- **color:** Sets the text color.
- **text-align:** Horizontal alignment — `left`, `right`, `center`, `justify`.
- **text-decoration:** Adds lines — `underline`, `overline`, `line-through`, `none`.
- **text-transform:** Controls capitalization — `uppercase`, `lowercase`, `capitalize`, `none`.
- **text-indent:** Indents the first line of a block of text.
- **letter-spacing:** Space between characters (tracking).
- **word-spacing:** Space between words.
- **line-height:** Vertical spacing between lines of text.
- **white-space:** Controls how whitespace is handled — `normal`, `nowrap`, `pre`, `pre-wrap`, `pre-line`.
- **text-shadow:** Adds shadow to text (x, y, blur, color).
- **vertical-align:** Aligns inline elements relative to the line box.

## 💻 Syntax
```css
.text {
  color: #333;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  text-indent: 20px;
  letter-spacing: 2px;
  word-spacing: 4px;
  line-height: 1.6;
  white-space: nowrap;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  vertical-align: middle;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Apply basic text styling to a heading and paragraph.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 {
      color: #2c3e50;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    p {
      color: #555;
      line-height: 1.8;
      text-indent: 30px;
    }
  </style>
</head>
<body>
  <h1>Welcome to CSS Text</h1>
  <p>This paragraph has increased line height and indentation for better readability.</p>
</body>
</html>
```
**Output:** Centered, uppercase heading with letter spacing. Paragraph has 1.8 line-height and first-line indent.
**Explanation:** `text-align` centers the heading, `text-transform` uppercases it, `letter-spacing` adds character spacing. `line-height` and `text-indent` improve paragraph readability.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create styled text with shadow and decorative underline.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .hero-title {
      font-size: 3em;
      color: #fff;
      text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
      text-align: center;
      text-decoration: underline;
      text-decoration-color: #f39c12;
      text-decoration-style: wavy;
      text-underline-offset: 8px;
    }
    .content {
      white-space: pre-wrap;
      word-spacing: 5px;
    }
  </style>
</head>
<body>
  <div style="background:#2c3e50;padding:40px;">
    <h1 class="hero-title">Shadow & Wavy Underline</h1>
  </div>
  <p class="content">This text has increased word spacing and preserves whitespace formatting.</p>
</body>
</html>
```
**Output:** White heading on dark background with shadow and wavy underline offset from text. Paragraph has extra word spacing.
**Explanation:** `text-shadow` adds depth. `text-decoration-style: wavy` and `text-underline-offset` customize the underline. `white-space: pre-wrap` preserves multiple spaces and line breaks.

## 🏢 Real World Use Case
A news website uses `text-align: justify` for article body text, `text-transform: uppercase` for section headings, `letter-spacing` for brand typography, `line-height: 1.6` for readability, and `text-shadow` for hero section headlines.

## 🎯 Interview Questions (5 with answers)
1. **What does `text-transform: capitalize` do?** It capitalizes the first letter of each word.
2. **What is the difference between `letter-spacing` and `word-spacing`?** `letter-spacing` controls space between characters; `word-spacing` controls space between words.
3. **How does `text-shadow` work?** `text-shadow: offset-x offset-y blur-radius color;` — multiple shadows can be comma-separated.
4. **What does `white-space: nowrap` do?** It prevents text from wrapping to a new line, keeping it all on one line.
5. **What is the default `line-height` value?** Typically `normal` (around 1.2), but it varies by browser and font.

## ⚠ Common Errors / Mistakes
- Using `text-align: justify` without proper hyphenation, causing "rivers" of whitespace.
- Setting `line-height` without units (e.g., `line-height: 1.5` is fine; but `line-height: 150%` can cause inheritance issues).
- Forgetting that `text-decoration` includes color and style in modern CSS — not just `underline`.
- Using `text-shadow` excessively causing readability issues.
- Assuming `white-space: pre` wraps text (it doesn't — use `pre-wrap`).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Change text color of a paragraph to dark gray.
2. Center-align an h1 heading.
3. Underline all links using text-decoration.
4. Apply uppercase transformation and letter-spacing to a heading.
5. Create a paragraph with justified text, increased line-height, and first-line indent.
6. Add a text-shadow to a heading with blur effect.
7. Build a pull-quote component with decorative text styling (italics, larger size, left border, text-shadow).
8. Implement a multi-line text truncation with `-webkit-line-clamp` and proper text overflow handling.
