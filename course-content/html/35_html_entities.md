## 35. HTML Entities
## 📘 Introduction
HTML entities are special codes used to display reserved characters (like `<`, `>`, `&`), invisible characters (like non-breaking space), and symbols (like copyright, currency, emojis) that cannot be typed directly on a keyboard or have special meaning in HTML.

## 🧠 Key Concepts
- Entities start with `&` and end with `;`
- **Common entities:**
  - `&nbsp;` - non-breaking space
  - `&lt;` - less than `<`
  - `&gt;` - greater than `>`
  - `&amp;` - ampersand `&`
  - `&quot;` - double quote `"`
  - `&apos;` - apostrophe/single quote `'`
  - `&copy;` - copyright `©`
  - `&reg;` - registered trademark `®`
  - `&trade;` - trademark `™`
  - `&euro;` - euro `€`
  - `&pound;` - pound `£`
- **Numeric entities:** `&#169;` (copyright), `&#60;` (less than)
- **Hexadecimal entities:** `&#x00A9;` (copyright)
- **Emoji entities:** can use Unicode emoji directly or `&#128512;` for 😀

## 💻 Syntax
```html
<p>Use &lt;h1&gt; for the main heading.</p>
<p>Skyrovix &copy; 2026. All rights reserved.</p>
<p>Price: 10 &euro; | Cost: 5 &pound;</p>
<p>Non-breaking&nbsp;space keeps words together.</p>
<p>&#128512; &#128151; &#127775;</p>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Display HTML tags as visible text in a tutorial.

**Code:**
```html
<p>To create a paragraph, use the &lt;p&gt; tag.</p>
<p>The &amp; symbol is called an ampersand.</p>
<p>He said &quot;Hello&quot; and left.</p>
<p>If x &lt; 10, then it's a small number.</p>
```

**Output:** The tags and symbols appear as text rather than being interpreted as HTML code. The browser shows `<p>`, `&`, `"Hello"`, and `<`.

**Explanation:** Without entities, `<p>` would start a new paragraph, `&` would start an entity, and quotes would end attribute values. Entities escape these special meanings.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a footer with copyright and preserved spacing.

**Code:**
```html
<footer>
  <p>&copy; 2026 Skyrovix Learning. All rights reserved.</p>
  <p>Trademark: Skyrovix&trade; is a registered mark.</p>
  <p>Contact us &gt;&gt; info@skyrovix.com</p>
  <p>Published&nbsp;on&nbsp;June&nbsp;23,&nbsp;2026 (words stay together)</p>
  <p>Emojis: &#128187; &#128218; &#127891;</p>
</footer>
```

**Output:** A footer with copyright symbol, trademark symbol, arrows, non-breaking spaces preventing line breaks between specific words, and emoji icons.

**Explanation:** `&copy;` renders ©. `&trade;` renders ™. `&gt;` renders >. `&nbsp;` prevents line breaks between words. Numeric entities `&#128187;` render emoji.

## 🏢 Real World Use Case
Legal footers use `&copy;` for copyright. Tutorial sites use `&lt;` and `&gt;` to show code examples. E-commerce sites use `&euro;` and `&pound;` for currency symbols. News sites use `&nbsp;` to keep dates and names together.

## 🎯 Interview Questions (5 with answers)
**1. What are HTML entities?**
HTML entities are codes that represent reserved characters or symbols in HTML. They start with `&` and end with `;`.

**2. Why must you use `&lt;` and `&gt;` in HTML content?**
Because `<` and `>` are reserved for HTML tags. Using them directly would be interpreted as markup and break the page.

**3. What is the difference between `&nbsp;` and a regular space?**
A regular space can collapse or allow line breaks. `&nbsp;` (non-breaking space) prevents the browser from breaking the line at that point and does not collapse.

**4. How do you display a copyright symbol?**
Use `&copy;` which renders as ©. Alternatively, use `&#169;` (numeric) or `&#x00A9;` (hexadecimal).

**5. What is the entity for an ampersand and why is it important?**
`&amp;` represents `&`. It is important because `&` begins all HTML entities; using `&amp;` prevents it from starting an unintended entity.

## ⚠ Common Errors / Mistakes
- Forgetting the semicolon (`;`) at the end of an entity
- Using `&` instead of `&amp;` in URLs (causes validation errors)
- Overusing `&nbsp;` instead of CSS `white-space` or proper spacing
- Using entities for characters that can be typed directly (like `©` can be typed on some keyboards)
- Not escaping `&` in query strings (e.g., `?a=1&b=2` should be `?a=1&amp;b=2` in HTML)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Display a paragraph explaining the `<h1>` tag using `&lt;` and `&gt;`.
2. Create a footer with a copyright symbol and year.
3. Use `&amp;` to display a company name like "AT&T".

**Intermediate:**
4. Create a price list using `&euro;`, `&pound;`, `&yen;`, and `&dollar;` currency entities.
5. Write a paragraph with `&nbsp;` to keep specific words from breaking across lines.
6. Use numeric entities to display 5 different emoji symbols.

**Advanced:**
7. Build a complete HTML tutorial page that explains HTML entities using entities to display entity code examples (meta-example).
8. Create a function that escapes all special HTML characters in a user input string and displays the escaped version safely on a webpage.
