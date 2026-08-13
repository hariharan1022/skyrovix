## 36. CSS Dropdowns

## 📘 Introduction
Dropdown menus are a common UI pattern for organizing navigation links, form options, and action menus. CSS-powered dropdowns rely on the `:hover` pseudo-class, positioning, and visibility toggling. While simple dropdowns can be pure CSS, more complex patterns may require the checkbox hack or JavaScript.

## 🧠 Key Concepts
- **Hover dropdown**: Submenu appears when the user hovers over a parent element using `:hover`
- **Click dropdown**: Submenu toggles on click using the checkbox hack (`:checked`)
- **Dropdown menu styling**: Positioning, background, borders, shadows, and spacing for submenus
- **Nested dropdowns**: Submenus within submenus (multi-level), typically using `position: absolute` with `left: 100%`
- **Dropdown animation**: Adding `transition`, `opacity`, and `transform` for smooth appearance
- **Z-index management**: Dropdowns must stack above other content

## 💻 Syntax

```css
/* Basic hover dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 160px;
}
.dropdown:hover .dropdown-content {
  display: block;
}

/* Animated dropdown */
.dropdown-content {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
}
.dropdown:hover .dropdown-content {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

## ✅ Example 1 - Basic (Simple Hover Dropdown with Animation)

**Problem:** Create an animated dropdown menu that appears smoothly when hovering over a button.

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
    font-family: Arial;
    background: #ecf0f1;
    padding: 60px;
    display: flex;
    justify-content: center;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-btn {
    background: #3498db;
    color: white;
    padding: 14px 28px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s;
  }
  .dropdown-btn::after {
    content: " ▾";
    font-size: 0.8em;
  }
  .dropdown:hover .dropdown-btn {
    background: #2980b9;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    overflow: hidden;

    /* Animation */
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
  }

  .dropdown:hover .dropdown-content {
    opacity: 1;
    transform: translateY(8px);
    pointer-events: auto;
  }

  .dropdown-content a {
    display: block;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    transition: background 0.3s;
    border-left: 3px solid transparent;
  }

  .dropdown-content a:hover {
    background: #f5f5f5;
    border-left-color: #3498db;
  }

  .dropdown-content a:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .demo-text {
    margin-left: 40px;
    color: #888;
    font-size: 0.9em;
    align-self: center;
  }
</style>
</head>
<body>
  <div class="dropdown">
    <button class="dropdown-btn">Menu</button>
    <div class="dropdown-content">
      <a href="#">Profile</a>
      <a href="#">Settings</a>
      <a href="#">Account</a>
      <a href="#">Help Center</a>
      <a href="#">Logout</a>
    </div>
  </div>
  <span class="demo-text">Hover over the button to see an animated dropdown</span>
</body>
</html>
```

**Output:** A blue button with "Menu" label. Hovering reveals a white dropdown with 5 links that slides down with a fade effect.

**Explanation:** The dropdown is positioned absolutely below the button. Initially `opacity: 0` and `transform: translateY(-10px)` — on hover, it transitions to `opacity: 1` and `translateY(8px)` for a smooth slide-down. `pointer-events: none` prevents accidental clicks when hidden.

## 🚀 Example 2 - Intermediate (Nested Dropdown with Click Toggle)

**Problem:** Build a nested dropdown menu (multi-level) where submenus open to the right, with a click-based toggle using the checkbox hack.

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
    font-family: Arial;
    background: #ecf0f1;
    padding: 60px;
    display: flex;
    justify-content: center;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-btn {
    background: #2c3e50;
    color: white;
    padding: 14px 28px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
  }
  .dropdown-btn::after {
    content: " ▾";
  }

  /* First level menu */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    list-style: none;
    display: none; /* hidden by default */
    overflow: hidden;
  }

  /* Show on hover */
  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu li {
    position: relative;
  }

  .dropdown-menu li a {
    display: block;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    transition: background 0.3s;
    border-left: 3px solid transparent;
  }

  .dropdown-menu li a:hover {
    background: #f0f0f0;
    border-left-color: #2c3e50;
  }

  /* Separator */
  .dropdown-menu li.separator {
    border-top: 1px solid #eee;
  }

  /* Nested submenu */
  .has-submenu > a::after {
    content: " ▸";
    float: right;
  }

  .submenu {
    position: absolute;
    top: 0;
    left: 100%;
    min-width: 180px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    list-style: none;
    display: none;
    overflow: hidden;
  }

  .has-submenu:hover .submenu {
    display: block;
  }

  /* Checkbox-based click dropdown (separate demo) */
  .click-dropdown {
    position: relative;
    display: inline-block;
    margin-left: 60px;
  }

  .click-toggle {
    display: none;
  }

  .click-btn {
    background: #e74c3c;
    color: white;
    padding: 14px 28px;
    border: none;
    border-radius: 6px;
    font-size: 1em;
    cursor: pointer;
    display: inline-block;
  }

  .click-btn::after {
    content: " ▾";
  }

  .click-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    list-style: none;
    display: none;
    overflow: hidden;
  }

  .click-toggle:checked ~ .click-menu {
    display: block;
  }

  .click-menu li a {
    display: block;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
  }
  .click-menu li a:hover {
    background: #f5f5f5;
  }

  .label-text {
    color: #888;
    font-size: 0.9em;
    margin-top: 20px;
    text-align: center;
  }
</style>
</head>
<body>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: flex-start;">
    <!-- Hover nested dropdown -->
    <div class="dropdown">
      <button class="dropdown-btn">Hover Menu</button>
      <ul class="dropdown-menu">
        <li><a href="#">Dashboard</a></li>
        <li class="has-submenu">
          <a href="#">Products ▸</a>
          <ul class="submenu">
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Clothing</a></li>
            <li><a href="#">Books</a></li>
            <li class="separator"></li>
            <li><a href="#">All Products</a></li>
          </ul>
        </li>
        <li><a href="#">Orders</a></li>
        <li class="separator"></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>

    <!-- Click dropdown -->
    <div class="click-dropdown">
      <label for="click-dd" class="click-btn">Click Menu</label>
      <input type="checkbox" id="click-dd" class="click-toggle">
      <ul class="click-menu">
        <li><a href="#">New File</a></li>
        <li><a href="#">Open File</a></li>
        <li><a href="#">Save</a></li>
        <li class="separator"></li>
        <li><a href="#">Export</a></li>
      </ul>
    </div>
  </div>
  <div class="label-text">Left: hover dropdown with nested submenu • Right: click-to-open dropdown (checkbox hack)</div>
</body>
</html>
```

**Output:** Two dropdown demos. The left one shows submenus on hover with a nested menu opening to the right. The right one toggles on click using a hidden checkbox.

**Explanation:** The hover dropdown uses `li:hover > .submenu { display: block }`. The nested submenu is absolutely positioned at `left: 100%` (right of the parent item). The click dropdown uses a hidden checkbox: `.click-toggle:checked ~ .click-menu` toggles visibility.

## 🏢 Real World Use Case
Navigation menus (multi-level categories), action menus (edit/delete/share), settings menus, toolbar dropdowns, profile menus, and language selectors are common dropdown implementations across almost every web application.

## 🎯 Interview Questions

1. **How do you create a CSS-only dropdown that appears on hover?**
   *Place the submenu content inside a container, set `display: none` initially, and use `parent:hover child { display: block }` (or `flex`) to show it. The parent needs `position: relative` and the child `position: absolute`.*

2. **How can you make a dropdown appear on click without JavaScript?**
   *Use the checkbox hack: `<input type="checkbox">` hidden before the menu, with a `<label>` as the toggle. Use `input:checked ~ .menu { display: block }` to toggle visibility.*

3. **How do you prevent a dropdown from overflowing the viewport on the right edge?**
   *Use `right: 0; left: auto` on right-aligned dropdowns, or `left: auto; right: 0` to align the dropdown's right edge with the parent. For submenus near the screen edge, use `left: auto; right: 100%`.*

4. **Why might a dropdown close unexpectedly on hover?**
   *There may be a gap between the parent element and the dropdown. The hover state is lost when the cursor passes through the gap. Solution: add padding or use `::after` to bridge the gap, or position the dropdown to overlap the parent.*

5. **How can you animate a dropdown's appearance?**
   *Use `opacity` and `transform` transitions instead of `display: none` → `block`. Combine `opacity: 0` → `1` with `translateY(-10px)` → `translateY(0)`. Use `pointer-events: none` when hidden to prevent interaction.*

## ⚠ Common Errors / Mistakes

- **Gap between trigger and dropdown causing hover loss**: The cursor passes through whitespace and the dropdown closes; position the dropdown to overlap the trigger slightly
- **Using `display: none` for animation**: `display` cannot be animated — use `opacity` + `transform` for smooth transitions
- **Dropdown hidden behind other content**: Ensure `z-index` is set appropriately on the dropdown container
- **Nested dropdown alignment issues**: Submenus may overflow the viewport; use `left: 100%` for rightward expansion and consider `right: 100%` for leftward
- **Accessibility concerns**: Hover-only dropdowns don't work on touch devices; consider click-toggle or "touch-friendly" patterns

## 📝 Practice Exercises

### Beginner
1. Create a simple hover dropdown with 3 items that appears below a button when hovered.
2. Style the dropdown items with padding, hover color change, and a border separator between items.
3. Add a `::after` arrow (▾) to the dropdown button to indicate it has a submenu.

### Intermediate
4. Build an animated dropdown that fades in and slides down using `opacity` and `transform` transitions.
5. Create a click-based dropdown using the checkbox hack — clicking the label toggles the dropdown open/closed.
6. Build a nested dropdown (2 levels deep) where the submenu appears to the right of the parent item on hover.

### Advanced
7. Create a complex dropdown system: a toolbar with multiple dropdown buttons (File, Edit, View, Help) each with their own content. The active dropdown should close when another is opened, using only CSS (radio button group instead of checkboxes).
8. Build a mega-menu dropdown (like Amazon's category menu) where hovering a top-level link reveals a grid of categorized links with images and descriptions. The mega menu should: animate in, be positioned full-width below the nav, have columns using flexbox/grid, and not overflow the viewport.
