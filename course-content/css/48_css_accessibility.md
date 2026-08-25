## 48. CSS Accessibility

## 📘 Introduction
CSS accessibility (a11y) ensures that web content is perceivable, operable, and understandable by people with diverse abilities. While HTML provides semantic structure, CSS controls the visual presentation that can either enhance or hinder accessibility. Proper color contrast, visible focus indicators, support for reduced motion preferences, and screen reader compatibility are foundational CSS accessibility practices that benefit all users.

## 🧠 Key Concepts
- **Color contrast**: WCAG requires 4.5:1 ratio for normal text, 3:1 for large text (18px+ or 14px+bold)
- **Focus indicators**: Visible outlines for keyboard navigation; never use `outline: none` without providing an alternative
- **`prefers-reduced-motion`**: Media query to honor user motion sensitivity preferences
- **`prefers-color-scheme`**: Respecting light/dark mode preferences
- **`prefers-contrast`**: Adjusting for high/low contrast preferences
- **Screen reader text**: Visually hidden but accessible content using `.sr-only` patterns
- **ARIA with CSS**: Using `aria-*` attribute selectors for accessible state styling
- **Responsive typography**: Using relative units so text scales with zoom
- **`:focus-visible`**: Applies focus styles only for keyboard users, not mouse clicks
- **Accessible forms**: Clear labels, error states, required field indicators

## 💻 Syntax

```css
/* Focus indicators */
:focus-visible {
  outline: 3px solid #4a90d9;
  outline-offset: 2px;
}

/* Never do this without providing an alternative */
/* BAD: */ .btn:focus { outline: none; }
/* GOOD: */ .btn:focus-visible { outline: 3px solid #4a90d9; }

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ARIA state styling */
[aria-expanded="true"] .menu {
  display: block;
}
[aria-invalid="true"] {
  border-color: #dc3545;
}

/* High contrast */
@media (prefers-contrast: high) {
  body { background: #000; color: #fff; }
}
```

## ✅ Example 1 - Basic

**Problem:** Create an accessible navigation component with proper focus indicators, screen reader text, and keyboard operability.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; margin: 0; }

  nav {
    background: #2c3e50;
    padding: 0 1rem;
  }
  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1px;
  }
  .nav-list a {
    display: block;
    padding: 1rem 1.5rem;
    color: #ecf0f1;
    text-decoration: none;
    position: relative;
  }
  .nav-list a:hover {
    background: rgba(255,255,255,0.1);
  }
  /* Accessible focus - visible for keyboard users */
  .nav-list a:focus-visible {
    outline: 3px solid #f1c40f;
    outline-offset: -3px;
    background: rgba(255,255,255,0.15);
  }
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    nav { background: #000; }
    .nav-list a { color: #fff; text-decoration: underline; }
    .nav-list a:focus-visible { outline: 3px solid #fff; }
  }
  /* Screen reader only - "current page" indicator */
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
  }
  .nav-list a[aria-current="page"] {
    background: rgba(255,255,255,0.2);
    font-weight: bold;
  }
</style>
</head>
<body>
  <nav aria-label="Main navigation">
    <ul class="nav-list">
      <li><a href="/" aria-current="page">Home <span class="sr-only">(current page)</span></a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <main>
    <h1>Welcome</h1>
    <p>Use Tab to navigate the menu. The focus indicator is clearly visible with a yellow outline.</p>
  </main>
</body>
</html>
```

**Output:** A dark navigation bar with light text. The current page has a darker background and "current page" text is only exposed to screen readers. When tabbing, keyboard users see a bright yellow focus outline. In high contrast mode, styles adapt for maximum legibility.

**Explanation:** `:focus-visible` applies focus styles only during keyboard navigation, not mouse clicks. `.sr-only` hides content visually but keeps it in the accessibility tree via `clip` and `overflow: hidden`. `aria-current="page"` is styled with CSS attribute selector and accompanied by `sr-only` text for screen readers.

## 🚀 Example 2 - Intermediate

**Problem:** Build an accessible form with color contrast validation, error states using ARIA, reduced motion support, and high-contrast fallbacks.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.6; }
  .form-group { margin-bottom: 1.5rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  /* Focus with high contrast */
  input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
    border-color: #2563eb;
  }
  /* Error state via ARIA */
  [aria-invalid="true"] {
    border-color: #dc2626;
    background: #fef2f2;
  }
  [aria-invalid="true"]:focus-visible {
    outline-color: #dc2626;
    border-color: #dc2626;
  }
  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  /* Required indicator */
  .required::after {
    content: " *";
    color: #dc2626;
  }
  button {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }
  button:focus-visible {
    outline: 3px solid #2563eb;
    outline-offset: 2px;
  }
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
    }
  }
  /* High contrast */
  @media (prefers-contrast: high) {
    input, textarea, select { border-width: 3px; }
    .error-message { font-size: 1rem; font-weight: bold; }
    [aria-invalid="true"] { border-color: #ff0000; background: transparent; }
  }
  /* Color blind safe - icon + color for errors */
  [aria-invalid="true"] ~ .error-message::before {
    content: "⚠ ";
  }
</style>
</head>
<body>
  <h1>Contact Us</h1>
  <form novalidate>
    <div class="form-group">
      <label for="name" class="required">Name</label>
      <input type="text" id="name" required aria-required="true">
    </div>
    <div class="form-group">
      <label for="email" class="required">Email</label>
      <input type="email" id="email" required aria-required="true"
             aria-invalid="true" aria-describedby="email-error">
      <div id="email-error" class="error-message" role="alert">
        Please enter a valid email address.
      </div>
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" rows="4"></textarea>
    </div>
    <button type="submit">Send Message</button>
  </form>
</body>
</html>
```

**Output:** A form with clear labels, visible focus outlines, an error state indicated by both color (red border) and icon (⚠), and proper ARIA attributes connecting errors to inputs. In high contrast mode, borders thicken and errors gain additional emphasis. Motion-sensitive users can disable all transitions.

**Explanation:** `aria-invalid="true"` triggers error styles via CSS attribute selector. `aria-describedby` connects the error message to the input for screen readers. `role="alert"` on the error message causes immediate announcement by screen readers. The `::before` icon on error messages ensures color-blind users can identify errors without relying on red alone. `prefers-reduced-motion` disables all animations/transitions.

## 🏢 Real World Use Case
**Government and enterprise websites** (e.g., UK Government GOV.UK, US Web Design System) enforce WCAG 2.1 AA/AAA compliance through rigorous CSS accessibility practices. They maintain color contrast ratios above 4.5:1, provide visible focus indicators on every interactive element, and implement `prefers-reduced-motion` to disable all animations. `prefers-color-scheme` is used to provide dark mode that maintains accessibility requirements. Inaccessible color combinations are rejected during design reviews using tools like Axe and Wave.

## 🎯 Interview Questions

**1. What is the minimum contrast ratio required by WCAG AA for normal text?**
4.5:1 for normal text (under 18px or under 14px bold). For large text (18px+ or 14px+ bold), the requirement is 3:1.

**2. Why should you never use `outline: none` on focusable elements?**
It removes the visible focus indicator that keyboard users rely on for navigation. If you remove the default outline, you must provide a more visible alternative using `:focus-visible`.

**3. What does `prefers-reduced-motion` do and how should you implement it?**
It detects that the user has requested minimal animations in their OS accessibility settings. Implement it by wrapping all animations/transitions inside a `@media (prefers-reduced-motion: reduce)` query that sets durations near zero.

**4. How do you hide text visually but keep it accessible to screen readers?**
Use the `.sr-only` pattern: `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;`. Do NOT use `display: none` or `visibility: hidden`.

**5. What is `:focus-visible` and how does it improve accessibility?**
`:focus-visible` applies focus styles only when the browser determines the user is navigating via keyboard (not mouse). This prevents the "ugly outline on click" problem while maintaining accessibility for keyboard users.

## ⚠ Common Errors / Mistakes
- Removing `outline` on `:focus` without providing a replacement — makes the site unusable for keyboard navigators
- Using only color to convey information (errors, status, required fields) — fails for color-blind users
- Setting `animation: none` without considering `prefers-reduced-motion` — hard-coded removal prevents user choice
- Using `display: none` to hide text meant for screen readers — hides content from all users including assistive technology
- Insufficient color contrast in dark mode — many developers only test contrast in light mode
- Relying on hover-only interactions — touch devices and keyboard users cannot hover

## 📝 Practice Exercises

**Beginner:**
1. Create a button with visible focus styles using `:focus-visible`. Ensure the focus ring has a 3:1 contrast ratio against the button background.
2. Build an accessible link with `:focus-visible`, `:hover`, and `:active` states, each clearly distinct and visible.
3. Create a `.sr-only` class and apply it to a page heading that only screen readers should announce but sighted users should not see.

**Intermediate:**
4. Build a dark mode toggle that respects `prefers-color-scheme` and allows manual override. Ensure all colors in both modes pass WCAG AA contrast ratios.
5. Create an accessible card component that supports `prefers-reduced-motion` — animations play by default but stop when the user requests reduced motion.
6. Implement an accessible form with 5 different input types, each with proper labels, error states using `aria-invalid`, and inline validation messages using `aria-describedby`.

**Advanced:**
7. Build a complete accessible navigation system (dropdown menu) that works with keyboard navigation (Tab, Enter, Escape, Arrow keys), has visible focus indicators, announces expanded/collapsed states via ARIA, supports `prefers-reduced-motion`, and passes WCAG 2.1 AA audit criteria.
8. Design and implement a CSS framework subset focused entirely on accessibility: includes a color palette generator that guarantees 4.5:1+ contrast, a focus management system, form validation styles, reduced-motion utilities, screen-reader-only utilities, and prefers-contrast adjustments. Test with real screen readers (NVDA, VoiceOver) and automated tools (Axe, Lighthouse).
