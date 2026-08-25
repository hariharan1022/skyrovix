## 18. HTML Page Title
## 📘 Introduction
The `<title>` tag defines the title of an HTML document. It appears in the browser tab, search engine results (SERPs), and social media previews. It is essential for SEO and user experience.

## 🧠 Key Concepts
- Placed inside the `<head>` element
- Only one `<title>` tag per page
- Displayed on the browser tab
- Used by search engines as the clickable headline in results
- Should be descriptive, concise (50-60 characters), and unique per page
- Can be updated dynamically using JavaScript

## 💻 Syntax
```html
<head>
  <title>Page Title Here</title>
</head>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Set a page title for a homepage.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio - Home</title>
</head>
<body>
  <h1>Welcome to My Portfolio</h1>
</body>
</html>
```

**Output:** The browser tab displays "My Portfolio - Home". Search engines use this as the result headline.

**Explanation:** The title is descriptive and includes the site name and page section, which helps both users and search engines understand the page content.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Dynamically update the page title when a user navigates within a single-page app.

**Code:**
```html
<script>
  function showPage(pageName) {
    document.title = "My App - " + pageName;
  }
</script>
<button onclick="showPage('Dashboard')">Dashboard</button>
<button onclick="showPage('Settings')">Settings</button>
```

**Output:** Clicking "Dashboard" changes the browser tab title to "My App - Dashboard".

**Explanation:** JavaScript can modify `document.title` to reflect the current view in single-page applications, improving user orientation.

## 🏢 Real World Use Case
E-commerce sites use product names in titles (e.g., "Nike Air Max - Size 10 | ShopNow"). Blogs use article titles with the blog name. Each page has a unique, keyword-rich title for SEO.

## 🎯 Interview Questions (5 with answers)
**1. Where does the page title appear?**
In the browser tab, search engine results, bookmarks, and social media link previews.

**2. Why is the `<title>` tag important for SEO?**
Search engines display the title as the main headline in results. A relevant, keyword-optimized title improves click-through rates and rankings.

**3. How many `<title>` tags can a page have?**
Only one. Having multiple title tags is invalid HTML and may confuse browsers and search engines.

**4. What is the ideal length for a page title?**
50-60 characters to avoid truncation in search engine results.

**5. Can you change the page title after the page loads?**
Yes, using JavaScript: `document.title = "New Title";`

## ⚠ Common Errors / Mistakes
- Leaving the title empty or using default text like "Untitled Document"
- Using the same title on every page (bad for SEO)
- Making titles too long (they get truncated in SERPs)
- Placing the `<title>` tag inside the `<body>`
- Forgetting to include a `<title>` tag at all

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a page with the title "My First Website".
2. Change the title to describe the page content specifically.
3. View the title in the browser tab and note how it appears.

**Intermediate:**
4. Create a multi-page site (3 pages) with unique, SEO-optimized titles for each page.
5. Use JavaScript to update the title when a button is clicked.
6. Analyze the title length of the top 5 websites you visit.

**Advanced:**
7. Build a single-page app that updates `document.title` based on hash routing (e.g., `#home`, `#about`).
8. Implement a title notification badge system that appends "(1)" to the title when there are unread messages.
