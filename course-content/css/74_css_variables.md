## 74. CSS Variables
## 📘 Introduction
CSS custom properties (commonly called CSS variables) allow you to store reusable values—colors, sizes, fonts, etc.—and reference them throughout your stylesheets. They support dynamic theming, scoped overrides, and even manipulation via JavaScript, making CSS more maintainable and powerful.

## 🧠 Key Concepts
- **Custom properties** – Defined with `--` prefix: `--primary-color: #007bff;`
- **var() function** – Retrieves the value: `color: var(--primary-color);`
- **Fallback values** – `var(--primary-color, #333)` uses `#333` if `--primary-color` is not defined
- **Scope** – Variables are scoped to the element they are defined on (local vs global)
- **:root** – Global scope (`:root` or `html`) makes variables available everywhere
- **Dynamic theming** – Change a variable value to update all usages instantly
- **JavaScript** – Access and modify via `element.style.setProperty('--name', value)`
- **Inheritance** – CSS variables inherit through the DOM tree

## 💻 Syntax
```css
/* Global variables */
:root {
  --primary: #007bff;
  --primary-dark: #0056b3;
  --spacing: 16px;
  --radius: 8px;
  --font-main: 'Arial', sans-serif;
}

/* Using variables */
.button {
  background: var(--primary);
  padding: var(--spacing) calc(var(--spacing) * 2);
  border-radius: var(--radius);
  font-family: var(--font-main);
}

/* Fallback */
.fallback {
  color: var(--undefined-var, #333);
}

/* Scoped override */
.dark-theme {
  --primary: #6c757d;
  --bg: #333;
}
```

## ✅ Example 1 - Basic
**Problem:** Define global CSS variables for a consistent design system and use them across multiple elements.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  :root {
    --primary: #4f46e5;
    --primary-light: #818cf8;
    --primary-dark: #3730a3;
    --bg: #f8fafc;
    --surface: #ffffff;
    --text: #1e293b;
    --text-muted: #64748b;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --radius: 10px;
    --shadow: 0 4px 12px rgba(0,0,0,0.08);
    --font: 'Segoe UI', Arial, sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); background: var(--bg); color: var(--text); padding: 40px; }

  .card {
    max-width: 500px;
    margin: 0 auto 20px;
    background: var(--surface);
    padding: var(--spacing-lg);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border-left: 4px solid var(--primary);
  }

  .card h2 {
    color: var(--primary);
    margin-bottom: var(--spacing-sm);
  }

  .card p {
    color: var(--text-muted);
    line-height: 1.6;
  }

  .card .btn {
    display: inline-block;
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
  }

  .card .btn:hover {
    background: var(--primary-dark);
  }
</style>
</head>
<body>
  <div class="card">
    <h2>CSS Variables in Action</h2>
    <p>This card uses 11 different CSS custom properties. Change one variable in :root and the entire design updates.</p>
    <button class="btn">Learn More</button>
  </div>
  <div class="card" style="--primary: #059669; --primary-dark: #047857;">
    <h2>Scoped Override</h2>
    <p>The --primary and --primary-dark variables are overridden inline, changing the accent color for this card only.</p>
    <button class="btn">Get Started</button>
  </div>
</body>
</html>
```

**Output:** Two cards with a consistent design system—spacing, colors, shadows, and typography controlled by CSS variables. The second card overrides the accent color via inline custom properties.

**Explanation:** `:root` defines global design tokens. `var(--primary)` references them. The second card uses `style="--primary: #059669"`—this scoped override changes the variable's value for that element and its children, demonstrating CSS variable inheritance.

## 🚀 Example 2 - Intermediate
**Problem:** Build a theme switcher (light/dark) using CSS variables, and show JavaScript interaction to update variables dynamically.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  :root {
    --bg: #ffffff;
    --surface: #f8f9fa;
    --text: #1a1a2e;
    --text-secondary: #6c757d;
    --accent: #4361ee;
    --accent-hover: #3a56d4;
    --border: #dee2e6;
    --shadow: 0 4px 15px rgba(0,0,0,0.08);
    --radius: 12px;
    --transition: 0.3s ease;
  }

  [data-theme="dark"] {
    --bg: #1a1a2e;
    --surface: #16213e;
    --text: #e4e4e7;
    --text-secondary: #a1a1aa;
    --accent: #818cf8;
    --accent-hover: #6366f1;
    --border: #2d2d44;
    --shadow: 0 4px 15px rgba(0,0,0,0.4);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    padding: 40px;
    transition: background var(--transition), color var(--transition);
  }

  .theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
    z-index: 100;
  }

  .theme-toggle:hover { background: var(--accent-hover); }

  .card {
    max-width: 600px;
    margin: 0 auto;
    background: var(--surface);
    padding: 30px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    transition: background var(--transition), box-shadow var(--transition), border var(--transition);
  }

  .card h1 {
    color: var(--accent);
    margin-bottom: 12px;
    transition: color var(--transition);
  }

  .card p {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 16px;
  }

  .card .meta {
    display: flex;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .card .meta span {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .color-picker {
    margin-top: 20px;
    text-align: center;
  }

  .color-picker label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-secondary);
  }

  .color-picker input[type="color"] {
    width: 60px;
    height: 60px;
    border: 2px solid var(--border);
    border-radius: 50%;
    cursor: pointer;
    background: none;
    padding: 0;
  }
</style>
</head>
<body>
  <button class="theme-toggle" id="themeToggle">Toggle Dark Mode</button>

  <div class="card" id="card">
    <h1>Dynamic Theming</h1>
    <p>This entire card uses CSS variables for colors, spacing, shadows, and borders. Click the toggle to switch themes, or use the color picker to change the accent color.</p>
    <p>The transition property animates the background and color changes smoothly.</p>
    <div class="meta">
      <span>Posted: June 23, 2026</span>
      <span>Author: CSS Team</span>
    </div>
  </div>

  <div class="color-picker">
    <label for="accentPicker">Custom Accent Color:</label>
    <input type="color" id="accentPicker" value="#4361ee">
  </div>

  <script>
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const accentPicker = document.getElementById('accentPicker');

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });

    accentPicker.addEventListener('input', (e) => {
      root.style.setProperty('--accent', e.target.value);
      root.style.setProperty('--accent-hover', e.target.value + 'cc');
    });
  </script>
</body>
</html>
```

**Output:** A themed card component with a dark mode toggle and an accent color picker. Switching themes smoothly animates all themed properties; the color picker dynamically updates the accent.

**Explanation:** The `[data-theme="dark"]` selector overrides CSS variables when the attribute is set on `<html>`. JavaScript toggles `data-theme` attribute and uses `style.setProperty()` to update `--accent` and `--accent-hover` in real time. `transition` on body and card properties ensures smooth animation.

## 🏢 Real World Use Case
Design systems and component libraries (custom properties for tokens), white-label products (themeable via variables), dark mode implementations, interactive UI customization panels, and large-scale CSS maintainability.

## 🎯 Interview Questions
1. **Q:** How do you define a CSS variable and how do you use it?  
   **A:** Define with `--name: value;` and use with `property: var(--name);`

2. **Q:** What is the scope of a CSS variable defined on `:root` vs on a specific element?  
   **A:** `:root` makes it globally available; defining on a specific element scopes it to that element and its descendants.

3. **Q:** How do you provide a fallback value for a CSS variable?  
   **A:** `var(--name, fallback-value)` — uses fallback if the variable is not defined.

4. **Q:** Can CSS variables be used in media queries?  
   **A:** No, CSS variables cannot be used in `@media` query conditions, but they can be used in the values inside media queries.

5. **Q:** How do you change a CSS variable with JavaScript?  
   **A:** Use `document.documentElement.style.setProperty('--name', value)` or `element.style.setProperty('--name', value)`.

## ⚠ Common Errors / Mistakes
- Using `$name` or `@name` syntax (Sass/Less) instead of `--name` (CSS custom properties)
- Forgetting the `var()` function and referencing `--name` directly as a property value
- Expecting CSS variables to work in `@media` query conditions or `calc()` without `var()`
- Defining variables on the wrong scope leading to unexpected inheritance
- Using spaces in variable names (e.g., `--my var: x`) instead of hyphens (`--my-var: x`)

## 📝 Practice Exercises
**Beginner:**
1. Define three CSS variables in `:root`: `--primary`, `--secondary`, and `--spacing`.
2. Use `var(--primary)` to set background color and `var(--spacing)` for padding on a button.
3. Add a fallback value to `var(--missing, #333)` and observe the fallback being used.

**Intermediate:**
4. Create a light/dark theme toggle using `:root` and `[data-theme="dark"]` with CSS variables.
5. Use JavaScript to change a CSS variable (`--accent-color`) when a user clicks a button.
6. Create a color palette system using CSS variables for primary, secondary, success, warning, and danger colors.

**Advanced:**
7. Build a full theme customization panel where users can change primary color, background, font size, and border radius—all using CSS variables and JavaScript `setProperty`.
8. Create a component library (buttons, cards, alerts) using only CSS variables for all visual properties, with a single `:root` change able to re-theme the entire page.
