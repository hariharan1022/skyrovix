## 7. CSS Errors
## 📘 Introduction
CSS errors occur when the browser encounters invalid syntax, unknown properties, incorrect values, or logical mistakes. Unlike JavaScript, CSS errors usually don't break the page — the browser simply ignores the invalid declaration, which can lead to unexpected visual results.

## 🧠 Key Concepts
- **Invalid Property Values:** When a value doesn't match the expected format (e.g., `color: 123px;`).
- **Missing Semicolons:** A missing `;` causes the next declaration to fail.
- **Selector Typos:** Misspelled selectors (e.g., `calss` instead of `class`) fail to match elements.
- **Unknown Properties:** Using a non-existent property name; the browser ignores it.
- **Browser DevTools:** The primary tool for debugging CSS — inspect elements, view computed styles, and see warnings.
- **Unexpected Inheritance:** Styles inherited from parent elements that override intended rules.

## 💻 Syntax
```css
/* Common errors */
p {
  color: 123px;        /* ERROR: invalid value type */
  font-size: 16px      /* ERROR: missing semicolon */
  margin: 10px;        /* This is also ignored due to previous missing semicolon */
}

/* Correct version */
p {
  color: #333;
  font-size: 16px;
  margin: 10px;
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Debug missing semicolon causing style failure.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: blue;
      font-size: 18px  /* Missing semicolon here */
      font-weight: bold; /* This will be ignored */
    }
  </style>
</head>
<body>
  <p>Styled text</p>
</body>
</html>
```
**Output:** The text is blue and 18px, but NOT bold. The missing semicolon causes `font-weight: bold;` to be ignored.
**Explanation:** The browser reads `font-size: 18px font-weight: bold;` as one invalid declaration and ignores it. Only the previous valid declarations apply.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Use Chrome DevTools to identify and fix CSS errors.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .box {
      background-colour: red;  /* Typo: 'colour' not 'color' */
      width: 100%;
      padding: 20px
      margin: 10px;
    }
  </style>
</head>
<body>
  <div class="box">Content</div>
</body>
</html>
```
**Output:** The box has width 100% and padding 20px, but background is NOT red and margin is NOT 10px.
**Explanation:** In DevTools, `.box` will show `background-colour: red;` with a yellow warning icon. The missing semicolon after `padding: 20px` invalidates `margin: 10px;` as well. Fix both errors to restore expected styling.

## 🏢 Real World Use Case
A front-end developer uses Chrome DevTools Elements panel to debug a layout issue. The Styles tab shows a property struck through with a line, indicating it was overridden or invalid. The developer hovers over the warning icon to see "Invalid property value" and corrects the typo.

## 🎯 Interview Questions (5 with answers)
1. **How does the browser handle CSS syntax errors?** It ignores the invalid declaration but continues parsing the rest of the stylesheet.
2. **What tool is best for debugging CSS errors?** Browser DevTools (Chrome DevTools, Firefox Developer Tools) — specifically the Elements/Styles panel.
3. **What does a yellow warning triangle mean in Chrome DevTools?** It indicates an invalid property value or unknown property.
4. **Why might a valid CSS rule appear struck through in DevTools?** It is overridden by a more specific rule, or the property is explicitly reset.
5. **What is the most common CSS error developers make?** Missing semicolons at the end of declarations, which cascades to break subsequent rules.

## ⚠ Common Errors / Mistakes
- Missing semicolons (most frequent error).
- Using British English spelling (`colour`, `centre`) instead of American English (`color`, `center`).
- Forgetting units on values that require them (e.g., `width: 100` instead of `width: 100px`).
- Using hex colors without the `#` prefix (e.g., `color: ff0000;`).
- Incorrect shorthand syntax (e.g., `margin: 10px 20px 30px;` missing the fourth value).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Write a CSS rule with a missing semicolon and identify which properties fail.
2. Use a wrong property name (e.g., `text-colour`) and check if the browser applies it.
3. Write a hex color without the `#` symbol and observe the result.
4. Use Chrome DevTools to inspect a page and find a struck-through property, then fix the specificity issue.
5. Debug a stylesheet that has 3 intentional errors — find and correct all of them.
6. Write a rule where a missing closing curly brace causes subsequent rules to fail.
7. Create a complex debugging scenario with specificity conflicts, invalid values, and missing semicolons, then fix it systematically.
8. Use the "Computed" tab in DevTools to trace why a certain element does not have the expected font-size.
