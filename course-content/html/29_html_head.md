## 29. HTML Head
## 📘 Introduction
The `<head>` element is a container for metadata about the HTML document. It is not displayed on the page but contains essential information for browsers, search engines, and social media. It sits between the `<html>` and `<body>` tags.

## 🧠 Key Concepts
- `<title>` - page title (required, displayed in browser tab)
- `<meta charset="UTF-8">` - character encoding
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` - responsive design
- `<meta name="description" content="...">` - page description for search results
- `<meta name="keywords" content="...">` - SEO keywords (less important now)
- `<meta name="author" content="...">` - page author
- `<link>` - links external resources (CSS, favicon)
- `<style>` - internal CSS
- `<script>` - JavaScript (internal or external)
- `<base>` - sets base URL for all relative links
- Open Graph (OG) meta tags for social media previews

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn HTML - free tutorials">
  <meta name="author" content="John Doe">
  <title>My Website</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <!-- visible content -->
</body>
</html>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Set up a proper head section with essential meta tags.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico">
</head>
<body>
  <h1>Welcome</h1>
</body>
</html>
```

**Output:** The page is responsive, properly encoded, has a favicon, and uses external CSS.

**Explanation:** `charset="UTF-8"` ensures correct text rendering. The viewport meta enables mobile responsiveness.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Add Open Graph meta tags for social media sharing.

**Code:**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Article - Skyrovix</title>
  <meta name="description" content="An in-depth guide to HTML head elements.">

  <!-- Open Graph / Social Media -->
  <meta property="og:title" content="My Article - Skyrovix">
  <meta property="og:description" content="An in-depth guide to HTML head elements.">
  <meta property="og:image" content="https://example.com/thumbnail.jpg">
  <meta property="og:url" content="https://example.com/article">
  <meta property="og:type" content="article">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="My Article - Skyrovix">
  <meta name="twitter:description" content="An in-depth guide to HTML head elements.">
  <meta name="twitter:image" content="https://example.com/thumbnail.jpg">
</head>
```

**Output:** When shared on Facebook, LinkedIn, or Twitter, the link preview shows the title, description, and image.

**Explanation:** Open Graph (`og:`) and Twitter Card meta tags control how content appears when shared on social platforms.

## 🏢 Real World Use Case
Every website uses `<head>` for SEO, responsive design, favicons, analytics scripts, font loading, and social media previews. CMS platforms auto-generate meta tags based on page content.

## 🎯 Interview Questions (5 with answers)
**1. What is the purpose of the `<head>` element?**
The `<head>` contains metadata (information about the document) that is not displayed on the page, including title, character encoding, stylesheets, scripts, and SEO information.

**2. Why is the viewport meta tag important?**
It controls the layout on mobile devices. Without `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, mobile browsers may display a zoomed-out desktop version.

**3. What is the difference between `<link>` and `<a>`?**
`<link>` is used in the `<head>` to link external resources (CSS, favicon). `<a>` is used in the `<body>` for hyperlinks to other pages.

**4. What are Open Graph meta tags used for?**
They control how a webpage appears when shared on social media platforms (Facebook, LinkedIn, etc.), including the title, description, and preview image.

**5. What does `<base href="https://example.com/">` do?**
It sets the base URL for all relative URLs in the document. All relative paths will be resolved against this URL.

## ⚠ Common Errors / Mistakes
- Forgetting the viewport meta tag (mobile responsiveness breaks)
- Placing `<title>` or other head-only elements in the `<body>`
- Not closing the `<head>` before opening `<body>`
- Using multiple `<title>` tags (only one allowed)
- Forgetting `lang="en"` on the `<html>` tag for accessibility

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a complete head section with charset, viewport, and title.
2. Add a description meta tag and verify it appears in search engine previews.
3. Link an external CSS file called "style.css" in the head.

**Intermediate:**
4. Add Open Graph and Twitter Card meta tags for a blog post page.
5. Use the `<style>` tag in the head to define internal CSS for a page.
6. Add a `<base>` tag and test how it affects all relative links on the page.

**Advanced:**
7. Build a script that dynamically generates meta tags based on page content for SEO optimization.
8. Implement a dark mode detection using `<meta name="color-scheme" content="light dark">` and CSS custom properties.
