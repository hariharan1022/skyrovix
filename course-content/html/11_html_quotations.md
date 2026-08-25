# 11. HTML Quotations

## 📘 Introduction

HTML provides specialized elements for quoting content from other sources, defining abbreviations, providing contact information, citing creative works, and overriding text direction. These semantic elements help search engines, screen readers, and other tools understand the purpose and structure of special text. The `<blockquote>` element is used for long quotations that are typically displayed as indented blocks. The `<q>` element is for short inline quotations that automatically add quotation marks. The `<abbr>` element defines abbreviations or acronyms, often with a tooltip showing the full form. The `<address>` element provides contact information for the author or owner of a page. The `<cite>` element titles creative works (books, articles, movies). The `<bdo>` element overrides the text direction for bidirectional text. This module covers each of these quotation and citation elements with practical examples.

## 🧠 Key Concepts

- **`<blockquote>`:** For long quotations from external sources. Browsers typically indent the content. Use the `cite` attribute to reference the source URL.
- **`<q>`:** For short, inline quotations. Browsers automatically add quotation marks around the content.
- **`<abbr>`:** Defines an abbreviation or acronym. The `title` attribute provides the full expansion, shown as a tooltip on hover.
- **`<address>`:** Marks up contact information (email, phone, address). Browsers typically display it in italic. Should be used in the footer or aside.
- **`<cite>`:** Titles of creative works (books, articles, movies, songs). Rendered in italic by default.
- **`<bdo>`:** Bi-Directional Override. Used to change the text direction. `dir="rtl"` for right-to-left, `dir="ltr"` for left-to-right.

| Element | Visual Style | Purpose | Key Attribute |
|---------|-------------|---------|---------------|
| `<blockquote>` | Indented block | Long external quotations | `cite` |
| `<q>` | Quotation marks | Short inline quotes | (none) |
| `<abbr>` | Dotted underline (often) | Abbreviations/acronyms | `title` |
| `<address>` | Italic | Contact information | (none) |
| `<cite>` | Italic | Titles of works | (none) |
| `<bdo>` | Normal text | Text direction override | `dir` |

## 💻 Syntax

```html
<!-- Long quotation -->
<blockquote cite="https://source.com/article">
  <p>The only way to do great work is to love what you do.</p>
  <footer>— Steve Jobs</footer>
</blockquote>

<!-- Inline quotation -->
<p>As Albert Einstein said, <q>Imagination is more important than knowledge.</q></p>

<!-- Abbreviation -->
<p>The <abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>

<!-- Contact information -->
<address>
  Written by John Doe<br>
  Email: john@example.com<br>
  Phone: +1-555-1234
</address>

<!-- Cite (creative work) -->
<p><cite>The Great Gatsby</cite> by F. Scott Fitzgerald</p>

<!-- Bidirectional override -->
<p><bdo dir="rtl">This text is displayed right-to-left</bdo></p>
```

- `<blockquote>` is a block-level element typically used with a `<p>` inside.
- `<q>` is inline and adds quotation marks automatically.
- `<abbr>` with `title` shows the full form on hover.
- `<address>` marks contact info, not postal addresses in general.
- `<cite>` represents the title of a work, not a person's name.
- `<bdo>` overrides the browser's text direction algorithm.

## ✅ Example 1 - Basic

**Problem:** Create a page that demonstrates `<blockquote>`, `<q>`, `<abbr>`, and `<cite>`.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Quotations Demo</title>
</head>
<body>
  <h1>Quotations and Citations</h1>

  <h2>Long Quote</h2>
  <blockquote cite="https://www.brainyquote.com/quotes/martin_luther_king_jr">
    <p>Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.</p>
    <footer>— Martin Luther King Jr.</footer>
  </blockquote>

  <h2>Short Quote</h2>
  <p>Marie Curie said, <q>Nothing in life is to be feared, it is only to be understood.</q></p>

  <h2>Abbreviation</h2>
  <p>The <abbr title="HyperText Markup Language">HTML</abbr> is the standard for web pages.</p>

  <h2>Cited Work</h2>
  <p>I highly recommend reading <cite>Atomic Habits</cite> by James Clear.</p>
</body>
</html>
```

**Output:** An indented blockquote, an inline quote with quotation marks, an abbreviation with dotted underline, and a book title in italic.

**Explanation:** Each element serves a distinct semantic purpose. The `<blockquote>` indents the quote and includes a `cite` attribute (not visible but useful for SEO/semantics). The `<q>` automatically adds quotation marks. The `<abbr>` with `title` shows "HyperText Markup Language" on hover.

## 🚀 Example 2 - Intermediate

**Problem:** Create an article page that uses all quotation and citation elements, including address and bdo.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Article with Quotations</title>
</head>
<body>
  <article>
    <h1>The Future of Web Development</h1>

    <p>In a recent interview, the CEO stated:</p>

    <blockquote cite="https://technews.com/interview-2026">
      <p>Artificial intelligence will fundamentally change how we build websites. Developers who embrace these tools will be十倍 more productive.</p>
    </blockquote>

    <p>He emphasized that <q>learning the fundamentals remains crucial</q> despite new technologies.</p>

    <p>The <abbr title="World Wide Web Consortium">W3C</abbr> continues to develop new web standards. As mentioned in <cite>Web Design in 2026</cite>, accessibility is becoming a top priority.</p>

    <p>Arabic text example: <bdo dir="rtl">مرحبا بالعالم</bdo> (Hello World in Arabic)</p>
  </article>

  <footer>
    <address>
      Written by: Sarah Ahmed<br>
      Email: <a href="mailto:sarah@technews.com">sarah@technews.com</a><br>
      Published: June 2026
    </address>
  </footer>
</body>
</html>
```

**Output:** A news article with a blockquote, inline quote, abbreviation, cited work, bdo for Arabic text, and address in the footer.

**Explanation:** This example combines all quotation elements in a realistic article context. The `<blockquote>` uses the `cite` attribute. The `<bdo dir="rtl">` displays Arabic text right-to-left. The `<address>` in the footer provides author contact information with a mailto link.

## 🏢 Real World Use Case

- **News Articles (BBC, Reuters):** Use `<blockquote>` for pull quotes and interview excerpts, `<q>` for short quotes within articles, `<cite>` for referencing reports and studies, and `<address>` for author bylines.
- **Academic/Research Sites (Google Scholar, ResearchGate):** Use `<cite>` extensively for citing papers, `<blockquote>` for long excerpts from research, `<abbr>` for journal name abbreviations (e.g., `<abbr title="Journal of the American Medical Association">JAMA</abbr>`), and `<address>` for author affiliations.
- **Documentation (MDN, W3Schools):** Use `<blockquote>` for quoting specifications, `<abbr>` for defining technical acronyms (HTML, CSS, API), and `<cite>` for referencing related articles and specifications.

## 🎯 Interview Questions

**1. What is the difference between `<blockquote>` and `<q>`?**
`<blockquote>` is for long block-level quotations (usually indented) from external sources. `<q>` is for short inline quotations that browsers automatically surround with quotation marks.

**2. How does the `<abbr>` element work and what attribute is most important?**
`<abbr>` marks up abbreviations and acronyms. The `title` attribute provides the full expansion, which browsers display as a tooltip on hover. Example: `<abbr title="Cascading Style Sheets">CSS</abbr>`.

**3. What is the purpose of the `<address>` element?**
`<address>` provides contact information for the author or owner of the document or article. It should contain email, phone, or physical address. Browsers render it in italic by default.

**4. What does the `<cite>` element represent?**
`<cite>` represents the title of a creative work (book, article, painting, movie, song). It is rendered in italic. It should NOT be used for a person's name.

**5. What is the `<bdo>` element and when would you use it?**
`<bdo>` stands for Bi-Directional Override. It overrides the current text direction. Use it when you need to display text in a different direction (e.g., Arabic or Hebrew in an otherwise left-to-right document). Requires the `dir` attribute.

## ⚠ Common Errors / Mistakes

**Error 1: Using `<blockquote>` for Indentation Without a Quote**
```html
<blockquote>This is just indented text, not a quote.</blockquote>
```
- **Reason:** `<blockquote>` is semantic and should only contain actual quotations.
- **Fix:** Use CSS (`margin-left` or `padding-left`) for visual indentation, or use `<q>` for inline quotes.

**Error 2: Using `<cite>` for a Person's Name Instead of a Work Title**
```html
<p><cite>Shakespeare</cite> wrote Hamlet.</p>
```
- **Reason:** `<cite>` is for creative works, not people.
- **Fix:** `<p>Shakespeare wrote <cite>Hamlet</cite>.</p>`

**Error 3: Putting Regular Addresses in `<address>`**
```html
<address>123 Main Street, New York, NY 10001</address>
```
- **Reason:** `<address>` is for contact info related to the page author, not arbitrary addresses.
- **Fix:** Use a `<p>` tag or a `<div>` for general addresses.

## 📝 Practice Exercises

**Beginner:**
1. Create a page with a `<blockquote>` containing a famous quote and a citation footer.
2. Write a sentence that uses `<q>` for a short quote and `<abbr>` for an abbreviation.
3. Create a footer with your contact information using the `<address>` element (name, email, phone).

**Intermediate:**
4. Build a book review page with: a `<blockquote>` excerpt from the book, `<q>` for a critic's comment, `<cite>` for the book title, and an `<address>` for the reviewer.
5. Create an article about a foreign country that uses `<bdo>` to display a phrase in Arabic or Hebrew, and `<abbr>` for country abbreviations.
6. Design a blog post footer that includes `<address>` for the author, `<cite>` for referenced articles, and a `<blockquote>` for a reader comment.

**Advanced:**
7. Create a complete academic-style article page that uses: `<blockquote>` with `cite` attribute for three external source quotes, `<q>` for inline citations, `<abbr>` for all acronyms, `<cite>` for referenced papers, `<address>` for author affiliation, and `<bdo>` for a foreign language excerpt.
8. Build a Wikipedia-style article about a historical figure that includes: blockquotes from their speeches, abbreviations for organizations, cite for their published works, address for their birthplace, and bdo for original-language quotes.
