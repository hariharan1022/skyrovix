# 9. HTML Styles

## 📘 Introduction

The HTML `style` attribute allows you to apply inline CSS (Cascading Style Sheets) directly to individual HTML elements to control their appearance. While external and internal CSS are preferred for larger projects, the `style` attribute is useful for quick styling, testing, and one-off changes. Common CSS properties used with the `style` attribute include `background-color`, `color`, `font-family`, `font-size`, and `text-align`. This module covers how to use the `style` attribute to style HTML elements, the syntax of inline CSS, and the most common styling properties. Understanding inline styles is a stepping stone to mastering CSS, which is essential for creating visually appealing web pages.

## 🧠 Key Concepts

- **The `style` Attribute:** A global attribute that can be applied to any HTML element. It contains CSS property-value pairs separated by semicolons.
- **Syntax:** `style="property1: value1; property2: value2;"`. The last semicolon is optional but recommended.
- **`background-color`:** Sets the background color of an element. Accepts named colors, hex codes, rgb(), rgba(), hsl().
- **`color`:** Sets the text color.
- **`font-family`:** Sets the font type. Specify multiple fonts as fallback (e.g., `Arial, sans-serif`).
- **`font-size`:** Sets the text size. Values can be in px, em, rem, %, or keywords (small, medium, large).
- **`text-align`:** Aligns text horizontally. Values: `left`, `right`, `center`, `justify`.
- **Inline CSS Specificity:** Inline styles have the highest specificity (overriding internal and external CSS), unless `!important` is used elsewhere.

| Property | Values | Example |
|----------|--------|---------|
| `background-color` | red, #ff0000, rgb(255,0,0) | `style="background-color: yellow;"` |
| `color` | blue, #0000ff, rgb(0,0,255) | `style="color: navy;"` |
| `font-family` | Arial, Georgia, monospace | `style="font-family: Verdana, sans-serif;"` |
| `font-size` | 16px, 1.5em, 100% | `style="font-size: 20px;"` |
| `text-align` | left, center, right, justify | `style="text-align: center;"` |

## 💻 Syntax

```html
<h1 style="color: blue; text-align: center;">Centered Blue Heading</h1>

<p style="background-color: lightgray; color: black; font-family: Arial; font-size: 16px;">
  This is a paragraph with multiple inline styles applied.
</p>

<div style="background-color: #f0f0f0; padding: 20px;">
  <p style="color: #333; font-size: 18px;">Styled paragraph inside a styled div.</p>
</div>
```

- CSS properties are separated by semicolons.
- Property names are lowercase with hyphens (`background-color`, not `backgroundColor`).
- Values follow a colon and a space.
- The `style` attribute overrides any other CSS applied to the same element.

## ✅ Example 1 - Basic

**Problem:** Create a page with styled headings and paragraphs using the `style` attribute.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Inline Styles Demo</title>
</head>
<body>
  <h1 style="color: #2c3e50; text-align: center;">Welcome to My Styled Page</h1>

  <p style="background-color: #ecf0f1; color: #34495e; font-family: Arial; font-size: 18px; padding: 10px;">
    This paragraph has a light gray background, dark text, Arial font, and 18px font size.
  </p>

  <p style="color: red; font-size: 14px; text-align: right;">
    This paragraph is red, smaller, and right-aligned.
  </p>
</body>
</html>
```

**Output:** A centered dark blue heading, a styled paragraph with background/padding, and a right-aligned red paragraph.

**Explanation:** Each element uses the `style` attribute to apply CSS properties directly. The first paragraph combines multiple properties separated by semicolons. The second paragraph demonstrates different alignment and color.

## 🚀 Example 2 - Intermediate

**Problem:** Create a styled product card using inline CSS.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Product Card</title>
</head>
<body>
  <div style="background-color: white; border: 1px solid #ddd; border-radius: 8px; padding: 20px; width: 300px; font-family: Arial, sans-serif; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">

    <h2 style="color: #e74c3c; margin-top: 0;">Premium Headphones</h2>

    <p style="color: #7f8c8d; font-size: 14px;">
      High-quality wireless headphones with noise cancellation.
    </p>

    <p style="font-size: 24px; color: #27ae60; font-weight: bold;">
      $99.99
    </p>

    <button style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; cursor: pointer;">
      Add to Cart
    </button>
  </div>
</body>
</html>
```

**Output:** A product card with styled div container, colored heading, priced text, and a styled button.

**Explanation:** The `<div>` uses multiple CSS properties for the card layout (border, padding, shadow, width). Each inner element has its own inline styles for colors, fonts, and spacing. The button uses `cursor: pointer` for a clickable feel. This demonstrates how inline styles can create visually complete components.

## 🏢 Real World Use Case

- **Email Newsletters (Mailchimp, Constant Contact):** HTML emails rely heavily on inline styles because email clients strip external and internal CSS. Every element in an email template uses the `style` attribute to ensure consistent rendering across Gmail, Outlook, and Apple Mail.
- **Rapid Prototyping (Figma to HTML):** During quick prototyping, developers use inline styles to test visual changes without creating separate CSS files. Once approved, styles are moved to external stylesheets.
- **Dynamic Styling via JavaScript:** Web applications often use inline styles programmatically for dynamic effects (e.g., highlighting a selected item, showing/hiding elements, animating positions).

## 🎯 Interview Questions

**1. What is the syntax of the HTML `style` attribute?**
`style="property: value;"`. Multiple properties are separated by semicolons: `style="color: red; font-size: 16px;"`.

**2. What is the difference between inline, internal, and external CSS?**
Inline CSS uses the `style` attribute on individual elements. Internal CSS uses a `<style>` tag in the `<head>`. External CSS links to a separate `.css` file using `<link>`. Inline has highest specificity.

**3. Which CSS properties can be used with the `style` attribute?**
Any CSS property can be used inline, including `color`, `background-color`, `font-family`, `font-size`, `margin`, `padding`, `border`, and thousands more.

**4. What is CSS specificity and how does inline CSS fit in?**
Specificity determines which CSS rule takes precedence. Inline styles have a specificity of 1,0,0,0, which is higher than internal and external CSS (unless `!important` is used).

**5. Why might you use inline styles instead of external CSS?**
Inline styles are useful for quick testing, HTML emails (where external CSS is stripped), one-off styling changes, and dynamic styles applied via JavaScript.

## ⚠ Common Errors / Mistakes

**Error 1: Missing Semicolons Between Properties**
```html
<p style="color: red font-size: 16px;">
```
- **Reason:** Without a semicolon, the browser doesn't know where one property ends and another begins.
- **Fix:** `style="color: red; font-size: 16px;"`

**Error 2: Incorrect Property Names**
```html
<p style="background-color: lightgray;">
<!-- Correct -->
<p style="background-color: lightgray;">
```
- **Reason:** CSS property names use hyphens (`background-color`, not `backgroundColor`).
- **Fix:** Use correct hyphenated CSS property names.

**Error 3: Overusing Inline Styles Instead of Classes**
```html
<p style="color: blue; font-size: 16px;">Text</p>
<p style="color: blue; font-size: 16px;">More text</p>
<p style="color: blue; font-size: 16px;">Even more</p>
```
- **Reason:** Repetitive code is hard to maintain. Changing the color requires editing every element.
- **Fix:** Use a CSS class in an external or internal stylesheet: `p { color: blue; font-size: 16px; }`.

## 📝 Practice Exercises

**Beginner:**
1. Create a heading with blue text, center-aligned, using the `style` attribute.
2. Create a paragraph with a yellow background, red text, and Arial font.
3. Create a div with a light blue background and three different font sizes for three paragraphs inside it.

**Intermediate:**
4. Build a styled business card: a div with border, padding, and shadow, containing a name (h2, colored), title (p, styled), and phone (p, different color).
5. Create a notification bar with background-color, text color, padding, and text-align using inline styles.
6. Design a styled quote block using inline CSS: a div with a left border (use `border-left`), italic text, background color, and padding.

**Advanced:**
7. Create a complete pricing table with three columns using inline styles. Each column should have different background colors, heading styles, price emphasis, and button styles—all using only the `style` attribute.
8. Build a full webpage (header, navigation, main content, sidebar, footer) using only inline CSS to style every element. Use at least 15 different CSS properties across the page.
