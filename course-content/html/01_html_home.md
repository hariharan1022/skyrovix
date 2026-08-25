# 1. HTML HOME

## 📘 Introduction

HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. Every website you visit—from simple blogs to complex web applications—is built using HTML. It provides the foundational structure of a webpage using a system of tags and elements that define headings, paragraphs, links, images, forms, and more. When you open a website, your browser downloads HTML files and renders them into the visual pages you see. Understanding HTML is the first and most essential step for anyone learning web development. Alongside CSS (for styling) and JavaScript (for interactivity), HTML forms the core trio of web technologies. In this module, you will learn how the web works, the basic structure of an HTML page, the tools required to start coding, and how to create your first simple webpage.

## 🧠 Key Concepts

- **What is HTML?** HTML stands for HyperText Markup Language. It uses markup tags to describe the structure of web pages.
- **How the Web Works:** When you type a URL into a browser, the browser sends a request to a server. The server responds with HTML content, which the browser renders into a visual page.
- **Webpage Basic Structure:** Every HTML document has a standard structure including `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` tags.
- **Client-Server Model:** The browser (client) requests files from a server. The server sends back HTML, CSS, JavaScript, and media files.
- **Tools Needed:** You only need a text editor (like Notepad or VS Code) and a web browser (like Chrome, Firefox, or Edge) to write and view HTML.
- **File Extension:** HTML files are saved with the `.html` extension.
- **Tags Are Not Case-Sensitive:** `<HTML>` and `<html>` both work, but lowercase is the standard.
- **Rendering:** Browsers parse HTML and render it according to the Document Object Model (DOM).

## 💻 Syntax

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` declares the document as HTML5.
- `<html>` is the root element of the page.
- `<head>` contains meta-information and the page title.
- `<title>` sets the browser tab title.
- `<body>` holds all visible content.
- `<h1>` is a top-level heading.
- `<p>` defines a paragraph.

## ✅ Example 1 - Basic

**Problem:** Create a simple webpage that displays a greeting message.

**Code:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page. I am learning web development!</p>
  </body>
</html>
```

**Output:** A webpage showing the heading "Welcome to My Website" and a paragraph below it.

**Explanation:** This example demonstrates the minimal structure of an HTML document. The `<!DOCTYPE html>` declaration ensures the browser renders in standards mode. The `<h1>` tag creates a large heading, and the `<p>` tag creates a paragraph. Save this code as `index.html` and open it in any browser to see the result.

## 🚀 Example 2 - Intermediate

**Problem:** Create a webpage with a header, navigation links, main content area, and footer.

**Code:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <header>
      <h1>Skyrovix Academy</h1>
      <nav>
        <a href="#">Home</a> |
        <a href="#">Courses</a> |
        <a href="#">Contact</a>
      </nav>
    </header>
    <main>
      <h2>About Us</h2>
      <p>We provide world-class training in web development technologies.</p>
    </main>
    <footer>
      <p>&copy; 2026 Skyrovix Academy. All rights reserved.</p>
    </footer>
  </body>
</html>
```

**Output:** A structured webpage with a header containing the site title and navigation, a main content section, and a footer.

**Explanation:** This introduces semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<footer>`) which improve accessibility and SEO. The `<nav>` holds links, `<main>` holds primary content, and `<footer>` contains copyright info.

## 🏢 Real World Use Case

- **E-commerce (Amazon):** HTML structures product listings, cart pages, and checkout forms. Every product page uses HTML to display images, prices, reviews, and "Add to Cart" buttons.
- **Social Media (Facebook):** HTML structures the news feed, profile pages, comments, and notifications. Dynamic content is inserted into the HTML structure via JavaScript.
- **News Portals (BBC, CNN):** HTML organizes articles with headings, paragraphs, images, and embedded videos. Semantic tags help search engines index content properly.
- **Educational Platforms (Coursera, Udemy):** HTML builds course pages, lesson layouts, quizzes, and dashboards.

## 🎯 Interview Questions

**1. What is HTML and what does it stand for?**
HTML stands for HyperText Markup Language. It is the standard language for creating web pages and web applications. It describes the structure of a webpage using a system of tags and attributes.

**2. Explain the basic structure of an HTML document.**
An HTML document starts with `<!DOCTYPE html>`, followed by the `<html>` root element. Inside `<html>`, there are two main sections: `<head>` (contains metadata, title, links to CSS) and `<body>` (contains all visible content like headings, paragraphs, images, links).

**3. What is the difference between a client and a server?**
The client (browser) sends requests for web pages. The server hosts the website files and responds by sending the requested HTML, CSS, JavaScript, and media files to the client, which then renders them.

**4. What tools do you need to write HTML?**
A simple text editor (Notepad, VS Code, Sublime Text) and a web browser (Chrome, Firefox, Edge) are sufficient. VS Code is recommended because it offers syntax highlighting, auto-completion, and extensions like Live Server.

**5. What does the `<!DOCTYPE html>` declaration do?**
It tells the browser to render the page in standards mode according to the HTML5 specification. Without it, browsers may render in "quirks mode," causing inconsistent display across browsers.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting the DOCTYPE Declaration**
```html
<html>
  <head><title>Page</title></head>
  <body>Content</body>
</html>
```
- **Reason:** Missing `<!DOCTYPE html>` can cause quirks mode rendering.
- **Fix:** Always start with `<!DOCTYPE html>`.

**Error 2: Not Saving with .html Extension**
- **Reason:** If saved as `.txt`, the browser won't render it as HTML.
- **Fix:** Save files as `filename.html` or `filename.htm`.

**Error 3: Misspelling or Not Closing Tags**
```html
<h1>Welcome
<p>This is text.</p>
```
- **Reason:** Browsers may still render content but can cause layout issues.
- **Fix:** Always close tags properly: `<h1>Welcome</h1>`.

## 📝 Practice Exercises

**Beginner:**
1. Create an HTML page that displays your name as a heading and a short bio as a paragraph.
2. Create a page with two headings (h1 and h2) and three paragraphs of text.
3. Write an HTML document that includes a title in the browser tab and a footer at the bottom.

**Intermediate:**
4. Build a page with a header (containing a logo heading and navigation links), a main content section, and a footer with copyright text.
5. Create a webpage that displays a list of three of your favorite books using `<p>` tags and horizontal rules (`<hr>`) between them.
6. Design an HTML page that includes a `<main>` section with two `<section>` elements: one about "Skills" and one about "Hobbies."

**Advanced:**
7. Recreate the basic structure of a newspaper homepage with a masthead header, navigation bar, main article area, and sidebar section using only HTML (no CSS).
8. Build a complete HTML document that includes header, nav, main (with three articles), aside, and footer—all using semantic HTML5 tags.
