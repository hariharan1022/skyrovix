## 28. CSS Float

## 📘 Introduction
The `float` property was originally designed to allow text to wrap around images, like in print layouts. Before Flexbox and Grid, float was the primary technique for creating multi-column layouts. While modern layouts use newer methods, understanding float is still important for maintaining legacy code and for text-wrapping effects.

## 🧠 Key Concepts
- **`float: left`**: Element floats to the left; content flows around its right side
- **`float: right`**: Element floats to the right; content flows around its left side
- **`float: none`**(default): Element does not float
- **`clear`**: Prevents elements from wrapping around floats — `clear: left`, `clear: right`, `clear: both`
- **Clearfix hack**: A technique to make a parent container enclose its floated children (e.g., `.clearfix::after { content: ''; display: table; clear: both; }`)
- **Float-based layouts (legacy)**: Floated columns were the standard for creating multi-column layouts before Flexbox/Grid
- **Text wrapping around images**: The original purpose of float — text naturally flows around floated images
- **Collapsed parent**: When all children are floated, the parent loses its height — clearfix solves this

## 💻 Syntax

```css
/* Float an image left */
img.left {
  float: left;
  margin-right: 15px;
}

/* Float an image right */
img.right {
  float: right;
  margin-left: 15px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Legacy two-column layout */
.column {
  float: left;
  width: 50%;
}

/* Clear below floated elements */
.footer {
  clear: both;
}
```

## ✅ Example 1 - Basic (Text Wrapping Around Image)

**Problem:** Display a blog article with an image floated to the left and text wrapping around it.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    padding: 40px;
    font-family: Georgia, serif;
    background: #fafafa;
  }
  .article {
    max-width: 700px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .article h1 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8em;
  }
  .article img {
    float: left;
    margin: 0 20px 15px 0;
    border-radius: 8px;
    width: 250px;
    height: auto;
  }
  .article p {
    color: #444;
    line-height: 1.8;
    margin-bottom: 15px;
    text-align: justify;
  }
</style>
</head>
<body>
  <div class="article">
    <h1>The Beauty of Mountain Landscapes</h1>
    <img src="https://picsum.photos/250/200?random=20" alt="Mountain landscape">
    <p>Mountains have captivated human imagination for centuries. Their majestic peaks, serene valleys, and the crisp, clean air provide a perfect escape from the bustle of city life...</p>
    <p>Whether you are an avid hiker or simply enjoy scenic views, mountain landscapes offer something for everyone. The diverse ecosystems found at different elevations support a wide variety of flora and fauna...</p>
    <p>As the sun sets behind the peaks, the sky transforms into a canvas of oranges, pinks, and purples — a reminder of nature's unparalleled beauty. It is no wonder that mountain ranges around the world are considered sacred in many cultures.</p>
  </div>
</body>
</html>
```

**Output:** An article where the image sits to the left of the text, with text flowing naturally around its right and bottom edges.

**Explanation:** The `<img>` has `float: left`. Text elements (`<p>`) following the image wrap around it because floated elements are removed from normal flow but content still flows around their edges. The `margin` on the image prevents text from touching it.

## 🚀 Example 2 - Intermediate (Legacy Two-Column Layout with Clearfix)

**Problem:** Create a two-column page layout with a header, floated columns, and a footer — demonstrating the clearfix hack and clearing.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial, sans-serif;
    background: #ecf0f1;
    padding: 20px;
  }

  /* Clearfix hack */
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
  }

  .page {
    max-width: 960px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  }

  .header {
    background: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
  }

  .sidebar {
    float: left;
    width: 30%;
    background: #34495e;
    color: white;
    padding: 20px;
    min-height: 300px;
  }
  .sidebar ul {
    list-style: none;
  }
  .sidebar li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .main {
    float: left;
    width: 70%;
    padding: 20px;
    min-height: 300px;
  }
  .main h2 {
    color: #2c3e50;
    margin-bottom: 15px;
  }
  .main p {
    color: #555;
    line-height: 1.8;
    margin-bottom: 15px;
  }

  .footer {
    clear: both;
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 0.9em;
  }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>Legacy Float Layout</h1>
    </div>
    <div class="content clearfix">
      <div class="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
      </div>
      <div class="main">
        <h2>Main Content Area</h2>
        <p>This is a two-column layout built with floats. The sidebar (30% width) and main content (70% width) are both floated left. The clearfix on the parent container ensures the content div wraps around both floated children.</p>
        <p>The footer uses clear: both to ensure it appears below both floated columns, regardless of which column is taller.</p>
      </div>
    </div>
    <div class="footer">© 2026 Legacy Layout Demo</div>
  </div>
</body>
</html>
```

**Output:** A two-column page layout with a sidebar on the left and main content on the right, plus a header and footer. The parent container wraps the floated columns correctly.

**Explanation:** Both `.sidebar` and `.main` are floated left with percentage widths. The `.clearfix` on the parent ensures it has height (floated children otherwise collapse the parent). The `.footer` uses `clear: both` to push below both floated columns.

## 🏢 Real World Use Case
While modern projects use Flexbox/Grid, many legacy websites and content management systems still use float-based layouts. Text wrapping around images in blog posts and news articles remains the primary modern use case for float.

## 🎯 Interview Questions

1. **What is the original purpose of the `float` property?**
   *The original purpose was to allow text to wrap around images, similar to "run-around" in print排版. It was never intended for full page layouts.*

2. **What is the clearfix hack and why is it needed?**
   *Clearfix is a technique using `::after` pseudo-element with `clear: both` to make a parent container properly enclose its floated children. It's needed because floated elements are removed from normal flow, causing the parent to collapse to zero height.*

3. **What does `clear: both` do?**
   *It forces an element to move below all floated elements on both sides. The element will appear after any preceding floated elements, clearing the float area.*

4. **What happens when you float an element without specifying a width?**
   *The floated element shrinks to fit its content. If the content is wider than the container, it may overflow. It's generally recommended to set an explicit width or `max-width` on floated elements.*

5. **Why is float no longer recommended for page layouts?**
   *Floats were never designed for layout. They cause parent collapsing, require clearfix hacks, don't provide equal-height columns easily, and lack the alignment/distribution capabilities of Flexbox and Grid.*

## ⚠ Common Errors / Mistakes

- **Forgetting the clearfix**: Floated children cause parent containers to collapse, leading to layout breaks
- **Using float for everything**: Modern Flexbox/Grid are more powerful and predictable for layout
- **Not clearing floats before a footer**: The footer may float up next to columns instead of staying at the bottom
- **Applying `overflow: hidden` to clear floats**: While this works (creates a new block formatting context), it can clip content like dropdowns that extend outside the container
- **Assuming floated elements affect only immediate siblings**: Floats affect all subsequent content in the document flow until cleared

## 📝 Practice Exercises

### Beginner
1. Float an `<img>` left inside a paragraph and add margin around it. Observe how text wraps around it.
2. Float two `<div>` elements left with `width: 50%` each to create two equal columns.
3. Add a footer below the two columns from Exercise 2 and use `clear: both` to position it correctly.

### Intermediate
4. Create a three-column layout using floats (33.33% each). Add a clearfix to the parent and a footer that clears both sides.
5. Build an article page with a floated image on the left and a floated pull-quote on the right, with text flowing around both.
6. Create a gallery grid using floats where each card is floated left with a fixed width and margin. Handle the last row alignment issue (orphans).

### Advanced
7. Build a "newspaper" layout with floated content that creates a multi-column text flow (like CSS columns but with floats): a main article floats right (70%), a sidebar floats left (30%), and inside the main article, two sub-columns are floated.
8. Recreate a classic float-based Holy Grail layout (header, nav, sidebar, main, aside, footer) using only float and clearfix — then refactor it to use CSS Grid and compare the complexity.
