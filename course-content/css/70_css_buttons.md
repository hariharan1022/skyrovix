## 70. CSS Buttons
## 📘 Introduction
Buttons are a fundamental UI element. CSS can style buttons far beyond the browser defaults—adding gradients, shadows, hover/active states, icons, and adaptive sizing. Well-styled buttons improve usability, accessibility, and brand consistency across a website.

## 🧠 Key Concepts
- **Background / color** – `background-color`, `color`, and `border` for base styling
- **Padding / border-radius** – Controls button size and roundness
- **Hover / active states** – `:hover` and `:active` pseudo-classes for interactivity
- **Gradient buttons** – `background: linear-gradient(...)` for depth
- **Outline buttons** – Transparent background with a colored border
- **Icon buttons** – Using `::before` or inline SVG/icon alongside text
- **Button sizes** – Modifier classes (`.btn-sm`, `.btn-lg`) for size variants
- **Disabled state** – `:disabled` pseudo-class or `.disabled` class with reduced opacity
- **Focus state** – `outline` or `box-shadow` for keyboard accessibility

## 💻 Syntax
```css
/* Base button */
.btn {
  display: inline-block;
  padding: 10px 24px;
  font-size: 1rem;
  font-family: inherit;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Primary button */
.btn-primary {
  background: #007bff;
  color: #fff;
}
.btn-primary:hover {
  background: #0056b3;
}
.btn-primary:active {
  transform: scale(0.97);
}

/* Outline button */
.btn-outline {
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}
.btn-outline:hover {
  background: #007bff;
  color: #fff;
}

/* Disabled */
.btn:disabled,
.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## ✅ Example 1 - Basic
**Problem:** Create a set of styled buttons with primary, secondary, outline, and ghost variants, including hover and active states.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-bottom: 20px;
  }

  .btn {
    display: inline-block;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    border: 2px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    outline: none;
  }

  .btn:focus-visible {
    box-shadow: 0 0 0 3px rgba(0,123,255,0.4);
  }

  .btn-primary {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }
  .btn-primary:hover { background: #0056b3; border-color: #0056b3; }
  .btn-primary:active { transform: scale(0.96); }

  .btn-secondary {
    background: #6c757d;
    color: #fff;
    border-color: #6c757d;
  }
  .btn-secondary:hover { background: #545b62; border-color: #545b62; }
  .btn-secondary:active { transform: scale(0.96); }

  .btn-outline {
    background: transparent;
    color: #007bff;
    border-color: #007bff;
  }
  .btn-outline:hover { background: #007bff; color: #fff; }
  .btn-outline:active { transform: scale(0.96); }

  .btn-ghost {
    background: transparent;
    color: #333;
    border-color: transparent;
  }
  .btn-ghost:hover { background: rgba(0,0,0,0.05); }
  .btn-ghost:active { transform: scale(0.96); }

  .btn-danger {
    background: #dc3545;
    color: #fff;
    border-color: #dc3545;
  }
  .btn-danger:hover { background: #c82333; border-color: #c82333; }
  .btn-danger:active { transform: scale(0.96); }
</style>
</head>
<body>
  <h2>Button Variants</h2>
  <div class="btn-group">
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-outline">Outline</button>
    <button class="btn btn-ghost">Ghost</button>
    <button class="btn btn-danger">Danger</button>
  </div>
  <div class="btn-group">
    <button class="btn btn-primary" disabled>Disabled</button>
    <button class="btn btn-outline" disabled>Outline Disabled</button>
  </div>
</body>
</html>
```

**Output:** A row of buttons in primary, secondary, outline, ghost, and danger styles. Hovering darkens or fills them, active presses them down. Disabled buttons appear faded with `not-allowed` cursor.

**Explanation:** Base `.btn` class provides shared padding, font, border-radius, and transition. Variant classes override specific colors. `:hover` changes background, `:active` adds a scale press-down effect. `:disabled` buttons use `opacity: 0.5` and `cursor: not-allowed`. `:focus-visible` adds a focus ring for keyboard navigation.

## 🚀 Example 2 - Intermediate
**Problem:** Build a set of gradient buttons with icons, multiple sizes, and a loading/spinner state.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; padding: 40px; background: #f0f0f0; }

  .demo { max-width: 700px; margin: 0 auto; }

  h2 { margin-bottom: 20px; }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 24px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.25s ease;
    outline: none;
    position: relative;
  }

  /* Sizes */
  .btn-sm { padding: 8px 16px; font-size: 0.85rem; }
  .btn-lg { padding: 16px 36px; font-size: 1.15rem; }

  /* Gradient variants */
  .btn-gradient-blue {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }
  .btn-gradient-blue:hover {
    background: linear-gradient(135deg, #5a6fd6, #6a4199);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }

  .btn-gradient-green {
    background: linear-gradient(135deg, #11998e, #38ef7d);
    color: #fff;
  }
  .btn-gradient-green:hover {
    background: linear-gradient(135deg, #0e8a80, #2dd96e);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(17,153,142,0.4);
  }

  .btn-gradient-orange {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: #fff;
  }
  .btn-gradient-orange:hover {
    background: linear-gradient(135deg, #e084e8, #e04a5e);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245,87,108,0.4);
  }

  /* Icon button */
  .btn-icon {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
  }

  /* Loading spinner */
  .btn-loading {
    pointer-events: none;
    opacity: 0.8;
  }
  .btn-loading::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Active state */
  .btn:active { transform: scale(0.96) !important; }

  /* Full width */
  .btn-block { width: 100%; }
</style>
</head>
<body>
  <div class="demo">
    <h2>Gradient & Icon Buttons</h2>
    <div class="row">
      <button class="btn btn-gradient-blue">Blue Gradient</button>
      <button class="btn btn-gradient-green">Green Gradient</button>
      <button class="btn btn-gradient-orange">Orange Gradient</button>
    </div>

    <div class="row">
      <button class="btn btn-gradient-blue btn-sm">Small</button>
      <button class="btn btn-gradient-blue">Default</button>
      <button class="btn btn-gradient-blue btn-lg">Large</button>
    </div>

    <div class="row">
      <button class="btn btn-gradient-blue btn-icon" title="Search">&#128269;</button>
      <button class="btn btn-gradient-green btn-icon" title="Heart">&#10084;</button>
      <button class="btn btn-gradient-orange btn-icon" title="Star">&#9733;</button>
    </div>

    <div class="row">
      <button class="btn btn-gradient-blue btn-loading">Loading</button>
      <button class="btn btn-gradient-blue" disabled>Disabled</button>
    </div>

    <button class="btn btn-gradient-green btn-block">Full Width Button</button>
  </div>
</body>
</html>
```

**Output:** Gradient buttons with a subtle lift on hover, three size variants, circular icon-only buttons, a loading state with CSS spinner, and a full-width button.

**Explanation:** Gradient backgrounds use `linear-gradient(135deg, ...)`. Hover adds `translateY(-2px)` lift and a colored `box-shadow`. The `::before` pseudo-element on `.btn-loading` creates a spinner with `border-top-color` trick. Icon buttons use `border-radius: 50%` with equal `width`/`height`.

## 🏢 Real World Use Case
Call-to-action buttons (sign up, buy now), form submissions, toolbar actions, social media share buttons, navigation menus, and mobile app-style interfaces all rely on polished button styling.

## 🎯 Interview Questions
1. **Q:** How do you create a button with a gradient background?  
   **A:** Use `background: linear-gradient(135deg, color1, color2)` on the button.

2. **Q:** How do you style a disabled button?  
   **A:** Use the `:disabled` pseudo-class with `opacity: 0.5`, `cursor: not-allowed`, and optionally `pointer-events: none`.

3. **Q:** How do you create an outline button?  
   **A:** Set `background: transparent` with a `border: 2px solid` using the accent color.

4. **Q:** How do you ensure buttons are accessible for keyboard users?  
   **A:** Use `:focus-visible` to show a visible focus ring (e.g., `box-shadow: 0 0 0 3px rgba(...)`), and use semantic `<button>` or `<a role="button">`.

5. **Q:** How can you add a press-down effect to buttons?  
   **A:** Use `:active { transform: scale(0.96); }` combined with `transition: transform 0.1s`.

## ⚠ Common Errors / Mistakes
- Forgetting to set `border: none` on `<button>` elements (browsers add default borders)
- Using `pointer-events: none` without disabling actual functionality for `:disabled`
- Not including `:focus-visible` styles, making buttons unusable for keyboard navigation
- Applying `transition` only on hover but not on the base state, causing abrupt returns
- Using non-semantic `<div>` styled as buttons without proper ARIA roles or keyboard handling

## 📝 Practice Exercises
**Beginner:**
1. Create a basic blue button with white text, 8px border-radius, and 12px 24px padding.
2. Add a hover state that darkens the background color and changes the cursor to pointer.
3. Add an `:active` state that slightly scales down the button.

**Intermediate:**
4. Build a set of outline buttons (blue, red, green) that fill with color on hover.
5. Create a gradient button with a lift effect (`translateY`) and matching box-shadow on hover.
6. Add a CSS spinner (using `::before` with `border` and `@keyframes`) as a loading state.

**Advanced:**
7. Create a button with a ripple effect on click using `::after` and `@keyframes` scaling animation.
8. Build a full button component system with sizes (sm, md, lg), variants (primary, secondary, outline, ghost, danger), icon support, loading state, disabled state, and block mode—all with CSS custom properties for easy theming.
