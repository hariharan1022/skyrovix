## 17. HTML Favicon
## 📘 Introduction
A favicon (favorite icon) is a small icon displayed in the browser tab, bookmarks, and history. It helps users identify your website visually among multiple open tabs.

## 🧠 Key Concepts
- Defined using `<link rel="icon">` in the `<head>` section
- Common formats: `.ico`, `.png`, `.svg`
- Browsers automatically request `/favicon.ico` from the root
- Multiple favicon sizes can be defined for different devices
- Modern favicons include Apple touch icons and manifest icons for PWA

## 💻 Syntax
```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Add a basic favicon to a webpage.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <h1>Welcome!</h1>
</body>
</html>
```

**Output:** The browser tab shows a small icon next to the page title.

**Explanation:** The `<link>` tag with `rel="icon"` tells the browser where to find the favicon. The `.ico` format is the most widely supported.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Set up multiple favicons for different devices and screens.

**Code:**
```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

**Output:** Desktop browsers use 32x32, older browsers use 16x16, iOS uses the Apple touch icon, and PWAs use the manifest.

**Explanation:** Providing multiple sizes ensures optimal display across all platforms. The `sizes` attribute helps the browser pick the best match.

## 🏢 Real World Use Case
Brands like Google, Amazon, and GitHub use distinct favicons so users can quickly find their tabs. News sites often use their logo as the favicon for brand recognition.

## 🎯 Interview Questions (5 with answers)
**1. What is a favicon and where is it displayed?**
A favicon is a small icon displayed in the browser tab, bookmarks bar, and history list. It helps identify a website visually.

**2. What is the best format for a favicon?**
`.ico` is the most compatible. `.png` is widely supported in modern browsers. `.svg` works in newer browsers and scales perfectly.

**3. How do you add a favicon to an HTML page?**
By adding a `<link rel="icon" href="favicon.ico">` tag inside the `<head>` section.

**4. What happens if no favicon is specified?**
Browsers automatically request `/favicon.ico` from the website root. If it doesn't exist, no icon is shown.

**5. What is an Apple touch icon?**
It's a PNG icon (180x180px) used when users add the website to their iPhone or iPad home screen. Defined with `<link rel="apple-touch-icon">`.

## ⚠ Common Errors / Mistakes
- Forgetting to add the favicon link tag
- Using unsupported formats like `.jpg` or `.gif`
- Not restarting the browser after changing the favicon (cache issue)
- Providing only one size when multiple are needed for modern devices
- Placing the `<link>` tag outside the `<head>`

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Add a favicon.ico to a simple HTML page.
2. Change the favicon to a PNG format and update the link tag.
3. Create a favicon using an online generator and add it to your page.

**Intermediate:**
4. Add multiple favicon sizes (16x16, 32x32, 48x48) with appropriate type attributes.
5. Add an Apple touch icon for iOS devices.
6. Create a site.webmanifest file and link it for PWA support.

**Advanced:**
7. Build a favicon that changes based on the user's system theme (light/dark mode) using SVG favicons with media queries.
8. Create an animated SVG favicon using CSS animations and implement it correctly across browsers.
