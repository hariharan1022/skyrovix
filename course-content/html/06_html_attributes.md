# 6. HTML Attributes

## 📘 Introduction

HTML attributes provide additional information about HTML elements. They are always specified in the opening tag and usually come in name/value pairs like `name="value"`. Attributes modify the behavior, appearance, or metadata of elements. For example, the `<a>` tag uses the `href` attribute to specify the link destination, while the `<img>` tag uses `src` for the image source and `alt` for alternative text. Attributes like `id` and `class` are essential for CSS styling and JavaScript manipulation. The `style` attribute allows inline CSS. Global attributes (like `id`, `class`, `style`, `title`, `lang`) can be used on any HTML element, while other attributes are element-specific (like `href` for `<a>`, `src` for `<img>`). Mastering attributes is key to creating functional, accessible, and styled web pages.

## 🧠 Key Concepts

- **Attribute Syntax:** `attribute="value"` inside the opening tag. Use double quotes around values.
- **Global Attributes:** Apply to all HTML elements. Examples: `id`, `class`, `style`, `title`, `lang`, `dir`, `hidden`, `data-*`.
- **Element-Specific Attributes:** Only valid for specific elements. Examples: `href` (for `<a>`), `src` (for `<img>`), `type` (for `<input>`), `rows` (for `<textarea>`).
- **Common Attributes:**
  - `href` - Specifies URL for links (`<a href="url">`)
  - `src` - Specifies file path for images/scripts (`<img src="image.jpg">`)
  - `width` / `height` - Dimensions in pixels (`<img width="300" height="200">`)
  - `alt` - Alternative text for images (important for accessibility)
  - `style` - Inline CSS (`<p style="color:red;">`)
  - `lang` - Language of element content (`<html lang="en">`)
  - `title` - Tooltip text on hover (`<p title="info">`)
  - `id` - Unique identifier (used for CSS/JS targeting)
  - `class` - Class name for CSS styling (can be reused)

| Attribute | Used On | Purpose |
|-----------|---------|---------|
| `href` | `<a>`, `<link>` | Link destination URL |
| `src` | `<img>`, `<script>`, `<video>` | Source file path |
| `alt` | `<img>`, `<area>` | Alternative text |
| `id` | All elements | Unique identifier |
| `class` | All elements | CSS class name |

## 💻 Syntax

```html
<!-- Element with multiple attributes -->
<a href="https://example.com" target="_blank" title="Visit Example">
  Click here
</a>

<!-- Image with attributes -->
<img src="logo.png" alt="Company Logo" width="200" height="100">

<!-- Paragraph with inline style -->
<p style="color: blue; font-size: 18px;" class="highlight" id="intro">
  This is a styled paragraph.
</p>

<!-- Div with data attribute -->
<div data-user-id="12345" class="user-card">
  User Information
</div>
```

- `href` defines the link URL. `target="_blank"` opens the link in a new tab.
- `title` shows a tooltip when the user hovers over the element.
- `src`, `alt`, `width`, `height` control image source, accessibility text, and dimensions.
- `style` applies inline CSS directly.
- `data-*` attributes store custom data for JavaScript.

## ✅ Example 1 - Basic

**Problem:** Create a page demonstrating the most common HTML attributes on various elements.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Attributes Demo</title>
</head>
<body>
  <h1 id="main-title" class="heading" style="color: navy;">Attribute Examples</h1>

  <a href="https://www.w3schools.com" target="_blank" title="Visit W3Schools">
    Learn HTML
  </a>

  <br><br>

  <img src="https://via.placeholder.com/200" alt="A placeholder image" width="200" height="200">

  <p class="description" style="font-size: 16px;" lang="en">
    This paragraph has a class, inline style, and language attribute.
  </p>
</body>
</html>
```

**Output:** A styled heading, a link that opens in a new tab with a tooltip on hover, an image, and a styled paragraph.

**Explanation:** Each element uses one or more attributes. The `href`, `target`, and `title` attributes modify the link behavior. The `src`, `alt`, `width`, and `height` attributes define the image properties. The `class`, `style`, and `lang` attributes style and describe the paragraph.

## 🚀 Example 2 - Intermediate

**Problem:** Create a contact card using attributes for styling, identification, and data storage.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Profile Card</title>
</head>
<body>
  <div class="profile-card" id="user-101" data-role="admin" data-status="active">
    <img src="https://via.placeholder.com/100" alt="Profile photo of Jane Doe" class="avatar" width="100" height="100">

    <h2 class="user-name" title="Full Name">Jane Doe</h2>

    <p class="user-title" style="color: gray; font-style: italic;">
      Senior Web Developer
    </p>

    <a href="mailto:jane@example.com" title="Send email" style="text-decoration: none;">
      jane@example.com
    </a>

    <br>

    <a href="https://linkedin.com/in/janedoe" target="_blank" title="View LinkedIn Profile">
      LinkedIn Profile
    </a>
  </div>
</body>
</html>
```

**Output:** A profile card containing an image, name, job title, and clickable links with tooltips.

**Explanation:** The `<div>` uses `class`, `id`, and `data-*` attributes for identification and data storage. The `href="mailto:..."` creates an email link. The `target="_blank"` opens LinkedIn in a new tab. The `title` attribute on multiple elements provides tooltips. The `style` attribute applies inline CSS for visual styling.

## 🏢 Real World Use Case

- **Google Analytics:** Uses `data-*` attributes extensively (`data-gtm-click`, `data-action`) on buttons and links to track user interactions without cluttering CSS classes.
- **Bootstrap Framework:** Uses `class` attributes heavily for styling components (e.g., `class="btn btn-primary"`, `class="container-fluid"`). The `data-*` attributes power JavaScript components like modals (`data-toggle="modal"`) and tooltips.
- **E-commerce Filters (Amazon, Myntra):** Uses `data-*` attributes on filter checkboxes and price range sliders to store product category IDs and price values for JavaScript-driven filtering.

## 🎯 Interview Questions

**1. What is the difference between an `id` and a `class` attribute?**
`id` must be unique within a page—used to identify a single element. `class` can be reused on multiple elements—used to apply the same styles or behaviors to a group of elements.

**2. What is the purpose of the `alt` attribute on images?**
The `alt` attribute provides alternative text for an image if it cannot be displayed (slow connection, broken src, screen reader for visually impaired users). It also improves SEO.

**3. What are data attributes (`data-*`) and why are they used?**
`data-*` attributes store custom data private to the page or application. They allow developers to embed extra information in HTML elements that can be accessed via JavaScript (e.g., `element.dataset.userId`).

**4. What is the `target` attribute and what values can it take?**
The `target` attribute specifies where to open a linked document. Values: `_self` (same tab, default), `_blank` (new tab/window), `_parent` (parent frame), `_top` (full body of window).

**5. How do you add a tooltip to an HTML element?**
Use the `title` attribute. For example: `<p title="This is a tooltip">Hover over me</p>`. The browser displays the tooltip text when the user hovers over the element.

## ⚠ Common Errors / Mistakes

**Error 1: Missing Quotes Around Attribute Values**
```html
<img src=photo.jpg alt=Photo>
```
- **Reason:** While this may work for simple values, it breaks for values with spaces or special characters.
- **Fix:** Always use quotes: `<img src="photo.jpg" alt="Photo">`.

**Error 2: Duplicate `id` Values**
```html
<div id="header">Header</div>
<div id="header">Another Header</div>
```
- **Reason:** `id` values must be unique on a page. Duplicate IDs cause JavaScript/CSS targeting issues.
- **Fix:** Use unique IDs or switch to `class`.

**Error 3: Incorrect Attribute Placement**
```html
<img alt="Photo" src="photo.jpg" href="link.html">
```
- **Reason:** `href` is not a valid attribute for `<img>`. It belongs on `<a>`.
- **Fix:** Wrap the image in a link: `<a href="link.html"><img alt="Photo" src="photo.jpg"></a>`.

## 📝 Practice Exercises

**Beginner:**
1. Create an image with `src`, `alt`, `width`, and `height` attributes. Use a placeholder image URL.
2. Create a link that opens in a new tab (`target="_blank"`) and has a `title` tooltip.
3. Create a paragraph with a `style` attribute that sets the text color to red and font size to 20px.

**Intermediate:**
4. Build a profile card with `id`, `class`, and `data-*` attributes (e.g., `data-user-id`, `data-role`). Include an image with `alt`, a name with `title`, and links with `href` and `target`.
5. Create a navigation bar with three links, each using `href`, `title`, and `target` attributes. Use `class` on each for styling.
6. Design a product listing with three items. Each item should use `class` for product-card, `data-*` for product-id and price, and include an image with proper `alt` text.

**Advanced:**
7. Create a complete HTML page for a user dashboard sidebar. Use `id` for unique sections, `class` for reusable styles, `data-*` attributes for user permissions, `title` for tooltips on navigation items, and `style` for hover effects.
8. Build a page that demonstrates the use of at least 15 different HTML attributes across various elements, including global attributes (id, class, style, title, lang, dir, hidden) and element-specific attributes (href, src, alt, target, width, height, type, placeholder).
