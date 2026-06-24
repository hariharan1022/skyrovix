## 40. HTML vs XHTML
## 📘 Introduction
HTML (HyperText Markup Language) and XHTML (Extensible HyperText Markup Language) are both markup languages for creating web pages. XHTML is a stricter, XML-based reformulation of HTML that enforces well-formed syntax rules, while HTML has more forgiving parsing rules.

## 🧠 Key Concepts
- XHTML requires valid XML syntax: all tags must be closed, properly nested, and lowercase
- HTML is case-insensitive for tag names; XHTML requires lowercase
- XHTML self-closing tags must include trailing slash (`<br />`, `<img />`)
- XHTML requires a `<?xml?>` declaration and a specific DOCTYPE
- HTML5 is the current standard; XHTML is largely legacy
- XHTML documents served as `application/xhtml+xml` are parsed strictly; served as `text/html` are parsed with HTML rules
- Migration from XHTML to HTML5 is common for modern web development

## 💻 Syntax (HTML code)
```html
<!-- HTML5 - forgiving syntax -->
<!DOCTYPE html>
<html>
<head><title>Page</title></head>
<body>
    <p>This is a paragraph
    <br>
    <img src="photo.jpg" alt="Photo">
    <p>Another paragraph
</body>
</html>

<!-- XHTML - strict syntax -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Page</title>
</head>
<body>
    <p>This is a paragraph</p>
    <br />
    <img src="photo.jpg" alt="Photo" />
    <p>Another paragraph</p>
</body>
</html>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Compare identical content written in HTML5 vs XHTML 1.0 Strict syntax.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Example</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is HTML5 - case insensitive, unclosed tags ok
    <p>Attributes don't need quotes always <input type=text disabled>
    <hr>
    <br>
</body>
</html>
```

**XHTML version:**
```xhtml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>XHTML Example</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is XHTML - case sensitive, all tags closed</p>
    <p>Attributes must have quotes <input type="text" disabled="disabled" /></p>
    <hr />
    <br />
</body>
</html>
```

**Output:** Both render similarly in browsers, but the XHTML version fails to parse if any syntax rule is broken (e.g., missing closing tag, unquoted attribute, uppercase tag). HTML5 silently corrects such issues.

**Explanation:** XHTML's strict parsing means a single syntax error can prevent rendering entirely (yellow screen of death). HTML5's error recovery allows pages to render despite minor mistakes, making it more forgiving for production.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Convert an HTML4 document to XHTML strict format.

**Code:**
```html
<!-- HTML4 (loose) -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>My Page</title>
</head>
<body bgcolor="white">
    <p><b><i>Important notice</i></b>
    <br>
    <img src="logo.gif" alt="Logo">
    <p align="center">Centered text
</body>
</html>
```

**XHTML converted:**
```xhtml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>My Page</title>
    <style>
        body { background-color: white; }
        .center { text-align: center; }
    </style>
</head>
<body>
    <p><strong><em>Important notice</em></strong></p>
    <br />
    <img src="logo.gif" alt="Logo" />
    <p class="center">Centered text</p>
</body>
</html>
```

**Output:** HTML4 uses presentational attributes (`bgcolor`, `align`) and allows unclosed tags. XHTML Strict removes presentational attributes in favor of CSS, requires all tags closed, lowers all tag names, and uses semantic elements (`<strong>` instead of `<b>`, `<em>` instead of `<i>`).

**Explanation:** Converting to XHTML Strict enforces separation of concerns (structure vs presentation), proper nesting, and valid XML — but requires more discipline and often more code.

## 🏢 Real World Use Case
Legacy enterprise applications may still use XHTML for XML-based processing pipelines; content management systems sometimes enforce XHTML for content validation; HTML5 is the universal standard for new projects; some publishing workflows use XHTML as an intermediary format between XML sources and web output.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What are the key differences between HTML and XHTML parsing?
   **A:** XHTML requires well-formed XML (all tags closed, properly nested, lowercase names, quoted attributes). HTML is case-insensitive and allows unclosed tags, unquoted attributes, and self-closing without slashes.

2. **Q:** Can XHTML be served as `text/html`?
   **A:** Yes, but when served as `text/html`, browsers parse it with HTML rules (not XML rules), losing XHTML's strict error handling. For strict XML parsing, serve as `application/xhtml+xml`.

3. **Q:** What happens if an XHTML document has a syntax error?
   **A:** When served as `application/xhtml+xml`, the browser stops parsing and displays an error page (XML parse error). HTML browsers silently fix errors.

4. **Q:** Why is HTML5 preferred over XHTML for modern web development?
   **A:** HTML5 has backward compatibility, simpler DOCTYPE, forgiving error handling, native multimedia elements, better mobile support, and broader adoption across browsers and tools.

5. **Q:** What is the correct way to self-close a tag in XHTML?
   **A:** Add a space and slash before the closing angle bracket: `<br />`, `<hr />`, `<img src="..." alt="..." />`.

## ⚠ Common Errors / Mistakes
- Forgetting the XML declaration (`<?xml?>`) in XHTML
- Using uppercase tag or attribute names in XHTML
- Missing closing slashes on void elements like `<br>`, `<img>` in XHTML
- Improper nesting (e.g., `<b><i>text</b></i>` instead of `<b><i>text</i></b>`)
- Serving XHTML with the wrong MIME type and expecting XML-level error checking

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Write an HTML5 page with three intentional syntax errors (unclosed tag, uppercase tag, unquoted attribute) and verify it still renders.
2. Write an XHTML page that requires all tags to be properly closed and nested.
3. Create a self-closing `<br>` and `<hr>` in both HTML5 and XHTML syntax.

**Intermediate:**
4. Convert a given HTML4 document (with `font`, `align`, `bgcolor` attributes) into valid XHTML Strict format using CSS instead.
5. Create a comparison table showing at least 8 syntax differences between HTML5 and XHTML 1.0.
6. Write a form in both HTML5 and XHTML with input fields, labels, and a submit button.

**Advanced:**
7. Build a syntax validator page that checks given HTML against XHTML rules (lowercase tags, closed elements, quoted attributes, proper nesting) and reports violations.
8. Create a migration guide page that demonstrates converting a 50-line HTML4 document to both HTML5 and XHTML Strict, explaining each change.
