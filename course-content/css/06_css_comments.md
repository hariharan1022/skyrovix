## 6. CSS Comments
## 📘 Introduction
Comments in CSS are used to add explanatory notes, disable code temporarily, and document stylesheets. They are ignored by the browser and are invisible to users. Proper commenting improves code readability and team collaboration.

## 🧠 Key Concepts
- **Syntax:** `/* comment text */` — everything between `/*` and `*/` is ignored.
- **Single-line Comments:** CSS has no single-line comment syntax; use `/* ... */` on one line.
- **Multi-line Comments:** Can span multiple lines between `/*` and `*/`.
- **Commenting out Code:** Wrap CSS rules in `/* */` to disable them temporarily without deleting.
- **Documentation:** Use comments to explain sections, note TODOs, or describe complex selectors.

## 💻 Syntax
```css
/* This is a single-line comment */

/*
  This is a
  multi-line comment
*/

/* TODO: Refactor this section */
.class {
  /* color: red; */  /* Commented out property */
  font-size: 14px;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Add descriptive comments to a CSS stylesheet.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Base styles for the page */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    /* Heading styles */
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Welcome</h1>
</body>
</html>
```
**Output:** Page with Arial font, 20px padding, and dark heading text.
**Explanation:** Comments describe each section of the stylesheet, making it easier for other developers to understand the intent.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Temporarily disable a CSS rule using comments for debugging.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: blue;
      /* font-size: 20px;  Disabled for testing */
      line-height: 1.5;
    }
    .debug {
      border: 1px solid red; /* Temporary debug border */
    }
  </style>
</head>
<body>
  <p class="debug">Debug this paragraph</p>
</body>
</html>
```
**Output:** Paragraph is blue with line-height 1.5, font-size is default, and has a red debug border.
**Explanation:** The `font-size` rule is commented out and ignored. The `.debug` class adds a visible red border for layout debugging.

## 🏢 Real World Use Case
A large team working on a shared CSS codebase uses section headers as comments (`/* Header */`, `/* Footer */`, `/* Forms */`) and `@todo` tags in comments to track incomplete work. Commented out code often includes a reason and date.

## 🎯 Interview Questions (5 with answers)
1. **How do you write a comment in CSS?** Using `/* comment text */` — there is no single-line comment syntax like `//` in CSS.
2. **Can CSS comments be nested?** No, nesting `/* /* */ */` will cause a syntax error.
3. **Are CSS comments included in the rendered page?** No, they are ignored by the browser and not visible to users.
4. **What is a good practice for commenting CSS?** Use comments for section headers, explain complex selectors, note browser hacks, and mark TODOs.
5. **Can you use CSS comments in inline styles?** No, the `style` attribute value cannot contain `/* */` comments.

## ⚠ Common Errors / Mistakes
- Using `//` for comments in CSS (only works in some preprocessors like SCSS/LESS).
- Nesting comments (`/* outer /* inner */ outer */`) — the first `*/` closes the comment.
- Leaving commented-out code in production without cleanup.
- Adding too many obvious comments that clutter the code (e.g., `/* This sets the color to red */ color: red;`).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Add a comment that says "Main heading style" above an `h1` rule.
2. Comment out a single property in a CSS rule so it is ignored.
3. Write a multi-line comment describing the purpose of a section.
4. Use comments to temporarily disable an entire CSS rule block of 3 properties.
5. Add a `TODO` comment and a `FIXME` comment in a stylesheet.
6. Leave a comment explaining why a specific `!important` override was necessary.
7. Document a complex CSS grid layout with comments explaining each grid area.
8. Build a mini style guide as comments at the top of a CSS file outlining the project's naming conventions and color palette.
