## 35. CSS Navigation Bar

## 📘 Introduction
Navigation bars are a fundamental component of every website. CSS allows you to create horizontal and vertical nav bars, dropdown menus, sticky headers, and responsive hamburger menus — all with varying levels of interactivity and visual design.

## 🧠 Key Concepts
- **Horizontal nav**: Links displayed side-by-side, typically using `flexbox` or `inline-block`
- **Vertical nav**: Links stacked vertically, often used in sidebars
- **Dropdown menus**: Submenus that appear on hover or click, using `position: absolute` + `:hover`
- **Sticky nav**: Navigation that stays visible at the top when scrolling (`position: sticky`)
- **Responsive nav with hamburger menu**: Hidden navigation on mobile that toggles via checkbox or JavaScript
- **Active link styling**: Visual indication of the current page using an `.active` class or `:target`

## 💻 Syntax

```css
/* Horizontal nav with flexbox */
.nav {
  display: flex;
  list-style: none;
  background: #333;
}
.nav a {
  display: block;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
}

/* Sticky nav */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Active link */
.nav a.active,
.nav a:hover {
  background: #555;
}
```

## ✅ Example 1 - Basic (Horizontal Navigation with Active State)

**Problem:** Build a simple horizontal navigation bar with hover effects and an active link indicator.

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
  }

  nav {
    background: #2c3e50;
    padding: 0 20px;
  }

  nav ul {
    list-style: none;
    display: flex;
  }

  nav ul li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 16px 24px;
    transition: background 0.3s, color 0.3s;
    border-bottom: 3px solid transparent;
  }

  nav ul li a:hover {
    background: #34495e;
  }

  nav ul li a.active {
    border-bottom-color: #e74c3c;
    font-weight: bold;
  }

  /* Page content */
  .content {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: Georgia, serif;
    line-height: 1.8;
    color: #444;
  }
  .content h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
</style>
</head>
<body>
  <nav>
    <ul>
      <li><a href="#" class="active">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <div class="content">
    <h1>Welcome to Our Site</h1>
    <p>This is a simple horizontal navigation bar built with flexbox. The "Home" link is highlighted with an active indicator (red bottom border). Hover over any link to see the background change.</p>
  </div>
</body>
</html>
```

**Output:** A dark horizontal navigation bar with white text. The "Home" link has a red bottom border. Hovering any link darkens its background.

**Explanation:** `display: flex` on `<ul>` makes items horizontal. The `.active` class adds a red bottom border. `transition` smooths the hover effect.

## 🚀 Example 2 - Intermediate (Sticky Nav with Dropdown and Hamburger Menu)

**Problem:** Build a sticky, responsive navigation bar with dropdown submenus and a hamburger toggle for mobile.

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
    padding-top: 60px;
  }

  /* Sticky nav */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #2c3e50;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  /* Checkbox hack for mobile */
  .nav-toggle {
    display: none;
  }
  .hamburger {
    display: none;
    color: white;
    font-size: 1.8em;
    padding: 10px 20px;
    cursor: pointer;
  }

  nav ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  nav ul li {
    position: relative;
  }

  nav ul li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 20px 24px;
    transition: background 0.3s;
    white-space: nowrap;
  }

  nav ul li a:hover,
  nav ul li a.active {
    background: #3498db;
  }

  /* Dropdown */
  nav ul li ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: #34495e;
    min-width: 180px;
    flex-direction: column;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  nav ul li:hover ul {
    display: flex;
  }

  nav ul li ul li a {
    padding: 12px 20px;
  }

  nav ul li ul li a:hover {
    background: #2980b9;
  }

  /* Arrow indicator for dropdown */
  .has-dropdown > a::after {
    content: " ▾";
    font-size: 0.8em;
  }

  /* Content for scroll demo */
  .content {
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    line-height: 1.8;
    color: #444;
  }
  .content h1 { color: #2c3e50; margin-bottom: 20px; }
  .content p { margin-bottom: 20px; }

  /* Responsive hamburger */
  @media screen and (max-width: 768px) {
    .hamburger {
      display: block;
    }

    nav ul {
      display: none;
      flex-direction: column;
      background: #2c3e50;
    }

    .nav-toggle:checked ~ ul {
      display: flex;
    }

    nav ul li ul {
      position: static;
      display: none;
      box-shadow: none;
      background: #1a252f;
    }

    nav ul li:hover ul {
      display: none;
    }

    /* Show submenu on click via checkbox hack in mobile */
    nav ul li:hover ul {
      display: flex;
    }
  }
</style>
</head>
<body>
  <nav>
    <label for="nav-toggle" class="hamburger">☰</label>
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <ul>
      <li><a href="#" class="active">Home</a></li>
      <li class="has-dropdown">
        <a href="#">Services</a>
        <ul>
          <li><a href="#">Web Design</a></li>
          <li><a href="#">SEO</a></li>
          <li><a href="#">Marketing</a></li>
          <li><a href="#">Consulting</a></li>
        </ul>
      </li>
      <li><a href="#">About</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <div class="content">
    <h1>Sticky Nav with Dropdown</h1>
    <p>This navigation bar is fixed to the top. Hover over "Services" to see the dropdown submenu. Resize the browser to below 768px to see the hamburger menu appear.</p>
    <p>Scroll down — the nav stays at the top thanks to position: fixed.</p>
    <p style="margin-top: 1000px;">Additional content to demonstrate scrolling.</p>
  </div>
</body>
</html>
```

**Output:** A sticky navigation bar with a dropdown on "Services". On wide screens, the full menu is visible. Below 768px, the menu collapses behind a hamburger icon.

**Explanation:** `position: fixed` keeps the nav at the top. Dropdown uses `li:hover ul` to show submenus. The checkbox hack (`input:checked ~ ul`) toggles the menu on mobile. The hamburger label acts as the toggle button.

## 🏢 Real World Use Case
Every website uses navigation bars. Common variations include: top horizontal nav (most common), sidebar vertical nav (dashboards), mega menus (e-commerce), sticky nav (blogs, marketing sites), and off-canvas mobile menus (mobile apps, responsive sites).

## 🎯 Interview Questions

1. **How do you make a navigation bar sticky or fixed?**
   *Use `position: sticky; top: 0` for sticky (scrolls with page until reaching top, then sticks). Use `position: fixed; top: 0; width: 100%` for a nav that never moves.*

2. **How can you create a mobile hamburger menu without JavaScript?**
   *Use the checkbox hack: an `<input type="checkbox">` hidden behind a `<label>` styled as the hamburger icon. The `:checked` pseudo-class toggles a sibling `ul` from `display: none` to `display: flex/block`.*

3. **What CSS properties are essential for a dropdown menu?**
   *`position: relative` on the parent `<li>`, `position: absolute; top: 100%` on the child `<ul>`, and `li:hover > ul { display: block }` (or flex).*

4. **How do you highlight the current page in a navigation bar?**
   *Apply an `.active` class to the current page's `<a>` tag and style it differently (e.g., different background, border, or underline). Server-side or static site generation typically adds this class.*

5. **What is the difference between `position: fixed` and `position: sticky` for navigation?**
   *`fixed` stays in place regardless of scrolling. `sticky` scrolls normally until a threshold (e.g., `top: 0`) is reached, then sticks — useful for nav that starts below a hero section.*

## ⚠ Common Errors / Mistakes

- **Forgetting `z-index` on sticky/fixed nav**: Content scrolls behind the nav unless a high `z-index` is set
- **Not adding `padding-top` to body for fixed nav**: The body content is hidden under the fixed nav without this
- **Using `display: none` to hide mobile menu**: This removes it from accessibility; use `clip` or `opacity + position` for accessible hiding
- **Dropdowns that disappear on hover gap**: If there is space between the parent link and the dropdown, the hover state is lost — use `padding` on the dropdown to bridge the gap
- **Not handling submenu overflow**: Dropdowns near the right edge of the screen can overflow; use `right: 0; left: auto` for right-aligned submenus

## 📝 Practice Exercises

### Beginner
1. Create a horizontal navigation bar with 5 links using `display: flex`. Style each link with padding and a hover color change.
2. Create a vertical sidebar navigation with stacked links, each with a left border that changes color on hover.
3. Add an `.active` class to one link and style it with a different background color from the others.

### Intermediate
4. Build a sticky navigation bar that has a transparent background initially and becomes solid (with a background color) after scrolling 100px — use a fixed position and add a background color change effect (CSS-only approximation).
5. Create a navigation bar with a dropdown that has at least 4 sub-items. The sub-items should have hover effects and the parent should show an arrow indicator (▾) using `::after`.
6. Build a responsive nav where links are displayed horizontally on desktop and stacked vertically on mobile (media query breakpoint at 600px).

### Advanced
7. Build a full responsive navigation system: a sticky header with a logo on the left, navigation links in the center, and a CTA button on the right. On mobile, the entire nav collapses into a slide-in off-canvas menu (from the right side) toggled by a hamburger icon — all using only CSS (checkbox hack).
8. Create a multi-level mega menu dropdown where hovering over a nav item reveals a grid of categorized links (like an e-commerce category menu). The mega menu should be positioned correctly, have hover persistence (no gap), and include column layouts without JavaScript.
