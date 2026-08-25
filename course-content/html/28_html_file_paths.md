## 28. HTML File Paths
## 📘 Introduction
File paths tell the browser where to find files like images, stylesheets, scripts, and other resources. Understanding absolute vs relative paths is essential for building websites that work correctly whether accessed locally or on a server.

## 🧠 Key Concepts
- **Absolute path:** Full URL including protocol and domain (`https://example.com/images/pic.jpg`)
- **Relative path:** Path relative to the current file
  - Same directory: `image.jpg` or `./image.jpg`
  - Parent directory: `../image.jpg`
  - Grandparent: `../../image.jpg`
  - Subdirectory: `images/image.jpg`
- **Root-relative path:** Starts from root with `/` (`/images/image.jpg`) - only works on a server
- `./` means current directory
- `../` means parent directory
- Windows vs Unix separators: always use forward slashes (`/`) in HTML

## 💻 Syntax
```html
<!-- Absolute path -->
<img src="https://example.com/images/logo.png">

<!-- Relative path (same folder) -->
<img src="logo.png">

<!-- Relative path (subfolder) -->
<img src="images/logo.png">

<!-- Relative path (parent folder) -->
<img src="../images/logo.png">

<!-- Root-relative path -->
<img src="/images/logo.png">
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Link a CSS file and an image using relative paths from different locations.

**Code:**
```html
<!-- index.html is in the root folder -->
<!-- Structure: /index.html, /style.css, /images/banner.jpg -->

<link rel="stylesheet" href="style.css">
<img src="images/banner.jpg" alt="Banner">
```

**Output:** The CSS styles are applied and the banner image displays correctly.

**Explanation:** `style.css` is in the same folder as the HTML file. `images/banner.jpg` is one level down in the images folder.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Reference files across multiple folder levels.

**Code:**
```html
<!-- File: /pages/blog/post.html -->
<!-- Structure: /pages/blog/post.html, /images/photo.jpg, /css/style.css, /pages/about.html -->

<img src="../../images/photo.jpg" alt="Photo">
<link rel="stylesheet" href="../../css/style.css">
<a href="../about.html">About Us</a>
```

**Output:** All resources load correctly despite being in different folder levels.

**Explanation:** From `post.html` (2 levels deep), `../../` goes up to root, then into `images/` or `css/`. `../about.html` goes up one level to `/pages/about.html`.

## 🏢 Real World Use Case
Large websites organize assets in folders: `/css/`, `/js/`, `/images/`, `/fonts/`. Root-relative paths ensure files work regardless of which page the user is on. CDN links use absolute paths.

## 🎯 Interview Questions (5 with answers)
**1. What is the difference between absolute and relative paths?**
An absolute path includes the full URL (protocol + domain). A relative path is relative to the current file's location. Relative paths are portable; absolute paths are fixed.

**2. What does `../` mean in a file path?**
`../` means "go up one directory level" (parent directory).

**3. What is a root-relative path?**
A path starting with `/` (e.g., `/images/logo.png`) that is relative to the website root. It only works when the page is served from a web server, not when opened as a local file.

**4. Should you use forward or backward slashes in file paths?**
Forward slashes (`/`) always. Backward slashes (`\`) are Windows-specific and do not work in web browsers.

**5. Why might a relative path work locally but not on a server?**
Local files are often in different structures. Using `file://` protocol, root-relative paths (`/`) do not work because there's no server root. Also, case sensitivity may differ (Windows is case-insensitive, Linux servers are case-sensitive).

## ⚠ Common Errors / Mistakes
- Using backslashes instead of forward slashes
- Case sensitivity issues (especially when deploying to Linux servers)
- Using root-relative paths for local files (they only work on servers)
- Not accounting for folder depth in nested pages
- Forgetting the file extension in the path

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a folder structure with an HTML file and an image in a subfolder. Link the image using a relative path.
2. Link a CSS file located in a `css` subfolder to an HTML file in the root.
3. Use an absolute URL to load an external image from the web.

**Intermediate:**
4. Create this folder structure and resolve all paths correctly: `/index.html`, `/pages/about.html`, `/images/team/photo.jpg`, `/css/style.css`. In `about.html`, link the image and CSS.
5. Convert absolute URLs in a given HTML file to relative paths based on a specific folder structure.
6. Create a navigation menu where links use relative paths to reach pages in different subdirectories.

**Advanced:**
7. Build a multi-page static site with a shared header/footer that uses relative paths for assets from 3 different folder depths, and ensure all paths work correctly.
8. Write a script that automatically resolves and validates all file paths in an HTML document, reporting broken links (simulate this by analyzing path structure).
