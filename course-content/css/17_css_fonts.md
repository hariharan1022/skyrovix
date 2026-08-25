## 17. CSS Fonts
## 📘 Introduction
CSS font properties control the appearance of text through typeface selection, sizing, weight, and style. With `@font-face` and web font services, designers can use custom fonts beyond the system defaults, while understanding web-safe fonts ensures reliable fallbacks.

## 🧠 Key Concepts
- **font-family:** Specifies the typeface — multiple values as fallbacks (e.g., `"Helvetica", Arial, sans-serif`).
- **font-size:** Size of the font — `px`, `em`, `rem`, `%`, viewport units, keywords (`small`, `medium`, `large`).
- **font-weight:** Thickness — numeric values (100-900) or keywords (`normal`=400, `bold`=700).
- **font-style:** `normal`, `italic`, `oblique`.
- **font Shorthand:** `font: style weight size/line-height family;`
- **@font-face:** Allows custom fonts by providing font files (e.g., `.woff2`, `.ttf`).
- **Google Fonts:** Popular web font service using `<link>` or `@import`.
- **Web-safe Fonts:** Fonts available on most systems — Arial, Times New Roman, Courier New, Georgia, Verdana.
- **font-display:** Controls how custom fonts load — `swap`, `block`, `fallback`, `optional`.

## 💻 Syntax
```css
.element {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  font-style: italic;

  /* Shorthand */
  font: italic 700 16px/1.5 "Roboto", Arial, sans-serif;

  /* @font-face */
  @font-face {
    font-family: "MyFont";
    src: url("myfont.woff2") format("woff2");
    font-display: swap;
  }
}
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Apply a font stack with fallbacks and different font weights.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    h1 {
      font-weight: 700;  /* bold */
      font-size: 2.5em;
    }
    p {
      font-size: 1rem;
      font-weight: 400;  /* normal */
      line-height: 1.6;
    }
    .light {
      font-weight: 300;
    }
  </style>
</head>
<body>
  <h1>Font Styling</h1>
  <p>Normal weight paragraph text.</p>
  <p class="light">Light weight text for secondary content.</p>
</body>
</html>
```
**Output:** Heading is bold and large. First paragraph is normal weight. Second paragraph is light weight.
**Explanation:** `font-family` stack provides fallbacks. `font-weight` uses numeric values (300, 400, 700) for consistent control across browsers.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Load Google Fonts and use @font-face with fallback strategy.

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Inter", Arial, sans-serif;
      font-size: 16px;
      font-weight: 400;
    }
    h1 {
      font-family: "Playfair Display", Georgia, serif;
      font-weight: 700;
      font-size: 2.5rem;
    }
    .lead {
      font-size: 1.25rem;
      font-weight: 300;
    }
    .custom-font {
      font-family: "MyCustomFont", "Inter", sans-serif;
      font-weight: 400;
    }
  </style>
</head>
<body>
  <h1>Elegant Typography</h1>
  <p class="lead">This lead paragraph uses light weight for a refined look.</p>
  <p>Standard body text in Inter at 400 weight.</p>
</body>
</html>
```
**Output:** Heading in Playfair Display serif, lead paragraph in light Inter, body in regular Inter.
**Explanation:** Google Fonts are loaded via `<link>`. The `display=swap` parameter enables `font-display: swap` for better loading behavior. Font stacks include serif/sans-serif fallbacks.

## 🏢 Real World Use Case
A marketing site uses Google Fonts for brand typography: Inter for body text (loaded with `font-display: swap`) and Playfair Display for headings. The `@font-face` rule serves custom icon fonts. Fallback fonts ensure text remains readable while custom fonts load.

## 🎯 Interview Questions (5 with answers)
1. **What is a web-safe font?** A font that is pre-installed on most operating systems (e.g., Arial, Times New Roman, Georgia, Verdana).
2. **What does `@font-face` do?** It allows you to define custom fonts by specifying font files, enabling the use of fonts not installed on the user's system.
3. **What is the difference between `em` and `rem` for font-size?** `em` is relative to the parent element's font-size; `rem` is relative to the root (`<html>`) font-size.
4. **What does `font-display: swap` do?** It shows text immediately in a fallback font and swaps to the custom font once loaded, preventing invisible text (FOUT vs FOIT).
5. **What are the common numeric values for font-weight?** 100 (thin), 300 (light), 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold), 900 (black).

## ⚠ Common Errors / Mistakes
- Not including fallback fonts in the `font-family` stack (if custom font fails, text uses browser default).
- Using too many custom fonts (hurts performance — load 2-3 max).
- Forgetting to quote font names with spaces (e.g., `font-family: Times New Roman;` should be `"Times New Roman"`).
- Using `font-weight` values that a font doesn't support (falls back to nearest available weight).
- Not specifying `format()` in `src` of `@font-face`, causing browser compatibility issues.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Set the font-family of a page to Arial with a sans-serif fallback.
2. Change font-size of a paragraph to 18px.
3. Make a heading bold using font-weight.
4. Use a Google Font (e.g., Roboto) on a webpage via `<link>`.
5. Create a font stack with three fallbacks for a heading element.
6. Use the font shorthand to set style, weight, size, line-height, and family in one rule.
7. Define a `@font-face` rule for a custom font (assume the .woff2 file exists) and apply it to headings.
8. Build a typography scale using `rem` units for all font sizes, with a base size of 16px on the root element.
