## 36. HTML Symbols
## 📘 Introduction
HTML symbols are special characters represented by entity names or numbers, enabling display of mathematical signs, currency symbols, Greek letters, arrows, and other typographic marks that are not directly available on standard keyboards.

## 🧠 Key Concepts
- HTML entities start with `&` and end with `;`
- Entity names (e.g., `&sum;`) are easier to remember than numeric references
- Numeric references use decimal (`&#8721;`) or hexadecimal (`&#x2211;`) formats
- Symbols render reliably across browsers when using correct entity codes
- Common categories: mathematical, currency, Greek, arrows, and technical symbols

## 💻 Syntax (HTML code)
```html
<!-- Entity Name -->
<p>&copy; 2025 All rights reserved</p>

<!-- Decimal Reference -->
<p>&#8364; 99.99</p>

<!-- Hexadecimal Reference -->
<p>&#x2211; x = 10</p>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Display mathematical operators and currency symbols in a pricing table.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Product Pricing &amp; Math</h2>
    <p>Total cost: &pound;50 + &euro;20 = &yen;12,500</p>
    <p>&sum; x<sup>2</sup> = 144</p>
    <p>Discount: &plusmn; 5%</p>
    <p>Temperature: 25&deg;C</p>
</body>
</html>
```

**Output:** Displays combined currency symbols (pound, euro, yen), summation notation, plus-minus sign, and degree symbol in a pricing context.

**Explanation:** Entity names like `&pound;` and `&euro;` insert currency symbols directly in HTML without requiring special encoding, while `&sum;` and `&deg;` handle mathematical and typographic needs.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a mathematics formula page using Greek letters and arrow symbols.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Physics Formulas</h2>
    <p>&Delta; = &beta;<sup>2</sup> - 4&alpha;&gamma;</p>
    <p>&Alpha; = &pi;r<sup>2</sup></p>
    <p>&there4; x &rarr; &infin;</p>
    <p>&forall; n &isin; &real; : n &gt; 0 &rArr; n &ne; 0</p>
    <p>Angle: &Theta; = 45&deg; &rArr; sin &Theta; = &frac12;</p>
</body>
</html>
```

**Output:** Renders Greek capital Delta, lowercase beta/alpha/gamma/pi, therefore symbol, right arrow, infinity, for-all, element-of, real-numbers, implies, not-equal, Theta, and fraction.

**Explanation:** Greek letter entities (`&Delta;`, `&pi;`, `&Theta;`) and logical symbols (`&forall;`, `&isin;`, `&rArr;`) combine to express mathematical statements directly in HTML markup.

## 🏢 Real World Use Case
E-commerce platforms use currency symbols (`&euro;`, `&pound;`, `&yen;`) for international pricing; educational websites render mathematical notation with `&sum;`, `&int;`, `&radic;`; scientific journals use Greek letter entities for formulas; and documentation sites use arrow symbols (`&rarr;`, `&larr;`) for navigation instructions.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What is the difference between `&amp;` and `&#38;`?
   **A:** `&amp;` is a named entity reference, while `&#38;` is a numeric character reference. Both represent the ampersand character; named entities are more readable, numeric references work even when named entities are not supported.

2. **Q:** How do you display a less-than sign in HTML without it being interpreted as a tag?
   **A:** Use `&lt;` for `<` and `&gt;` for `>`. These entity names prevent the browser from interpreting them as HTML tag delimiters.

3. **Q:** What entity would you use for the copyright symbol?
   **A:** `&copy;` (or `&#169;` / `&#xA9;`) represents the copyright symbol ©.

4. **Q:** Why must the ampersand itself be escaped in HTML?
   **A:** Because `&` begins all entity references. To display a literal ampersand, use `&amp;` to avoid the browser interpreting it as the start of an entity.

5. **Q:** What is the entity for a non-breaking space and when would you use it?
   **A:** `&nbsp;` (non-breaking space) prevents line breaks between words or elements, used to keep "10 kg" or "Mr. Smith" from splitting across lines.

## ⚠ Common Errors / Mistakes
- Forgetting the semicolon at the end of an entity (e.g., `&copy` instead of `&copy;`)
- Using `&` alone when intending to display an ampersand (must use `&amp;`)
- Assuming all browsers support all named entities — numeric references are more universal
- Confusing `&nbsp;` with regular spaces in layout design
- Using symbols from fonts that may not render on all devices — prefer entities for cross-compatibility

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create an HTML page showing five different currency symbols (pound, euro, yen, cent, dollar — dollar is literal `$`).
2. Display the copyright symbol with the year 2025 and your name.
3. Write HTML to show the registered trademark symbol next to a product name.

**Intermediate:**
4. Build a math cheat sheet page using at least 10 different mathematical symbols (sum, pi, infinity, delta, theta, plus-minus, therefore, not-equal, less-than-or-equal, greater-than-or-equal).
5. Create a scientific constants page that uses Greek letters (alpha, beta, gamma, delta, omega) with their values.
6. Design a navigation instructions section using arrow symbols (left, right, up, down, double arrows).

**Advanced:**
7. Create a complete geometry formulas page that combines Greek letters, mathematical operators, fractions, superscripts/subscripts, and special symbols (at least 15 unique entities).
8. Build a multilingual pricing table for a global e-commerce site showing prices in USD ($), EUR (&euro;), GBP (&pound;), JPY (&yen;), and INR (&#8377;) with proper formatting and symbols.
