## 34. HTML Style Guide
## 📘 Introduction
A consistent HTML style guide ensures code is readable, maintainable, and follows best practices. It defines conventions for indentation, naming, tag usage, attribute quoting, and accessibility - making collaboration smoother and reducing bugs.

## 🧠 Key Concepts
- **Indentation:** Use 2 spaces per level (consistent, no tabs)
- **Lowercase tags:** Always use lowercase for HTML tags and attributes
- **Quoting attributes:** Always quote attribute values (single or double quotes)
- **Closing tags:** Always close tags (even void elements self-close implicitly in HTML5)
- **File naming:** lowercase, hyphen-separated (`about-us.html`, not `AboutUs.html`)
- **DOCTYPE:** Always use `<!DOCTYPE html>`
- **Language attribute:** Always set `lang` on `<html>` (`<html lang="en">`)
- **Accessibility basics:** Use alt text, semantic elements, labels on forms

## 💻 Syntax
```html
<!-- Good style -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <header>
    <h1>Site Name</h1>
  </header>
  <main>
    <section>
      <h2>Section Title</h2>
      <p>Content with <a href="#">proper link</a>.</p>
    </section>
  </main>
</body>
</html>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Compare poorly formatted HTML vs well-formatted HTML.

**Code (Bad):**
```html
<HTML><HEAD><TITLE>BAD</TITLE></HEAD><BODY><DIV><P>This is hard to read.</P></DIV></BODY></HTML>
```

**Code (Good):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Good</title>
</head>
<body>
  <div>
    <p>This is easy to read.</p>
  </div>
</body>
</html>
```

**Output:** Both render the same, but the well-formatted version is readable, maintainable, and uses lowercase tags.

**Explanation:** Proper indentation reveals the document structure at a glance. Lowercase tags are standard.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Apply style guide rules to a form with accessibility in mind.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
</head>
<body>
  <main>
    <h1>Contact Us</h1>
    <form action="/submit" method="post">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </main>
</body>
</html>
```

**Output:** A well-structured, accessible form with proper labels, consistent indentation, and semantic elements.

**Explanation:** Labels are associated with inputs via `for`/`id`. Semantic `<main>` wraps content. Consistent 2-space indentation improves readability.

## 🏢 Real World Use Case
Development teams use style guides (like Google HTML/CSS Style Guide) to ensure consistent code across large projects. Code review processes enforce these conventions. Prettier and ESLint automate style enforcement.

## 🎯 Interview Questions (5 with answers)
**1. Why should HTML tags be written in lowercase?**
Consistency and convention. XHTML requires lowercase, and most developers follow this practice. It avoids confusion and is considered a best practice.

**2. What is the recommended indentation for HTML?**
2 spaces per indentation level. Avoid tabs as they render differently across editors.

**3. Should you always quote attribute values in HTML?**
Yes. While HTML5 allows unquoted values in some cases, quoting prevents errors when values contain spaces or special characters.

**4. Why should you always include the `lang` attribute on `<html>`?**
It helps screen readers pronounce content correctly, assists search engines, and enables browser features like translation.

**5. What is the rule for file naming in HTML projects?**
Use lowercase letters and hyphens (kebab-case): `about-us.html`, `product-details.html`. Avoid spaces, underscores, or camelCase.

## ⚠ Common Errors / Mistakes
- Inconsistent indentation (mixing tabs and spaces)
- Using deprecated tags like `<center>`, `<font>`, `<big>`
- Not using semantic elements when appropriate
- Missing `alt` attributes on images
- Not closing tags like `<li>`, `<td>`, `<p>` (leads to rendering issues)
- Forgetting to add `type="button"` to buttons inside forms

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Take a poorly formatted HTML file and reformat it with proper indentation and lowercase tags.
2. Add `alt` attributes to all images in a given HTML document.
3. Ensure all attribute values are properly quoted.

**Intermediate:**
4. Refactor a page that uses deprecated tags (`<center>`, `<font>`, `<big>`) to use modern CSS equivalents.
5. Add proper semantic structure (`<header>`, `<main>`, `<nav>`, `<footer>`) to a div-based layout.
6. Audit an HTML page for accessibility issues (missing labels, alt text, lang attribute) and fix them.

**Advanced:**
7. Create a comprehensive HTML style guide document for a team (naming conventions, linting rules, accessibility checklist, file structure).
8. Configure Prettier or a similar formatter to auto-format all HTML files in a project according to standard style guide rules.
