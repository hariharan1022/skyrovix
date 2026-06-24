## 77. CSS Media Queries
## 📘 Introduction
Media queries are the foundation of responsive web design. They allow CSS to adapt based on device characteristics—viewport width, height, orientation, resolution, and user preferences like color scheme or reduced motion. Mastering media queries enables you to build experiences that work on any device.

## 🧠 Key Concepts
- **@media** – At-rule that applies styles conditionally
- **Media types** – `screen`, `print`, `speech`, `all`
- **Breakpoints** – Specific viewport widths where layout changes (commonly 576px, 768px, 992px, 1200px)
- **min-width / max-width** – Most common conditions for responsive layouts
- **orientation** – `portrait` (height > width) or `landscape` (width > height)
- **prefers-color-scheme** – Detects light or dark mode preference
- **prefers-reduced-motion** – Detects user preference for reduced animation
- **Mobile-first approach** – Base styles are for mobile; `min-width` queries add complexity for larger screens

## 💻 Syntax
```css
/* Media type: print */
@media print {
  body { font-size: 12pt; }
  .nav { display: none; }
}

/* Mobile-first breakpoints */
@media (min-width: 768px) {
  .container { display: flex; }
}

@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}

/* Orientation */
@media (orientation: landscape) {
  .sidebar { width: 30%; }
}

/* User preferences */
@media (prefers-color-scheme: dark) {
  body { background: #121212; color: #e0e0e0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}

/* Range syntax (modern) */
@media (width >= 768px) and (width < 1200px) {
  .card { grid-template-columns: 1fr 1fr; }
}
```

## ✅ Example 1 - Basic
**Problem:** Create a responsive card layout that adapts from single-column (mobile) to multi-column (tablet/desktop) using mobile-first media queries.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; background: #f5f5f5; }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
  }

  h1 { text-align: center; margin: 20px 0; }

  .card-grid {
    display: grid;
    gap: 16px;
  }

  .card {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .card h2 { font-size: 1.2rem; margin-bottom: 8px; }
  .card p { color: #666; line-height: 1.5; font-size: 0.95rem; }

  /* Mobile (base): single column */
  .card-grid { grid-template-columns: 1fr; }

  /* Tablet: 2 columns */
  @media (min-width: 600px) {
    .card-grid { grid-template-columns: 1fr 1fr; }
    .container { padding: 24px; }
  }

  /* Desktop: 3 columns */
  @media (min-width: 900px) {
    .card-grid { grid-template-columns: 1fr 1fr 1fr; }
    .container { padding: 32px; }
  }

  /* Large desktop: 4 columns */
  @media (min-width: 1200px) {
    .card-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Responsive Card Grid</h1>
    <p style="text-align:center; margin-bottom:24px; color:#888;">Resize the browser to see columns change</p>
    <div class="card-grid">
      <div class="card"><h2>Card 1</h2><p>Mobile-first: 1 col base, 2 cols at 600px, 3 at 900px, 4 at 1200px.</p></div>
      <div class="card"><h2>Card 2</h2><p>All cards maintain consistent padding and shadow across breakpoints.</p></div>
      <div class="card"><h2>Card 3</h2><p>Media queries only add styles; base mobile styles stay minimal.</p></div>
      <div class="card"><h2>Card 4</h2><p>Gap adjusts with viewport using responsive values.</p></div>
    </div>
  </div>
</body>
</html>
```

**Output:** A card grid that starts at 1 column on narrow screens, then jumps to 2, 3, and 4 columns as the viewport widens, using mobile-first `min-width` media queries.

**Explanation:** Base CSS targets mobile (single column). Each `@media (min-width: ...)` adds complexity as the viewport grows. This mobile-first approach ensures the site works on small screens without extra CSS, and progressively enhances for larger screens.

## 🚀 Example 2 - Intermediate
**Problem:** Build a responsive page that adapts to dark/light mode preference, respects reduced motion, changes layout in landscape vs portrait, and adjusts typography for print.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Light mode (default) */
  :root {
    --bg: #ffffff;
    --surface: #f8f9fa;
    --text: #1a1a2e;
    --text-secondary: #6c757d;
    --accent: #4361ee;
    --border: #dee2e6;
  }

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1a1a2e;
      --surface: #16213e;
      --text: #e4e4e7;
      --text-secondary: #a1a1aa;
      --accent: #818cf8;
      --border: #2d2d44;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    font-family: Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s, color 0.3s;
    line-height: 1.6;
  }

  .page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    background: var(--surface);
    border-bottom: 2px solid var(--accent);
    padding: 20px;
    margin-bottom: 24px;
    border-radius: 0 0 12px 12px;
  }

  header h1 { color: var(--accent); }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .main-content {
    flex: 2;
    background: var(--surface);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .sidebar {
    flex: 1;
    background: var(--surface);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  /* Landscape: side-by-side */
  @media (orientation: landscape) and (min-width: 700px) {
    .content { flex-direction: row; }
  }

  /* Portrait: stacked */
  @media (orientation: portrait) {
    .content { flex-direction: column; }
  }

  /* Print styles */
  @media print {
    body { background: #fff; color: #000; font-size: 12pt; }
    header { border-bottom: 2px solid #000; }
    .sidebar { display: none; }
    .main-content { border: none; box-shadow: none; }
    a::after { content: " (" attr(href) ")"; font-size: 0.8em; }
  }

  /* Animation (respects reduced motion) */
  .animated-badge {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
</style>
</head>
<body>
  <div class="page">
    <header>
      <h1>Responsive & Adaptive Page</h1>
      <p style="color:var(--text-secondary);">Resize, toggle dark mode (OS setting), use portrait/landscape, or print</p>
    </header>
    <div class="content">
      <div class="main-content">
        <h2>Main Content</h2>
        <p>This page responds to four conditions: viewport width (responsive layout), orientation (stack vs side-by-side), color scheme preference (dark/light), and reduced motion.</p>
        <p style="margin-top:12px;"><span class="animated-badge">Pulsing Badge</span> — This animation is disabled if prefers-reduced-motion is set.</p>
        <p style="margin-top:12px;">Print the page to see print-specific styles (sidebar hidden, URLs shown after links).</p>
      </div>
      <div class="sidebar">
        <h3>Sidebar</h3>
        <p>Hidden in print view. Side-by-side in landscape, stacked in portrait.</p>
        <p style="margin-top:12px;">Full dark mode support via CSS variables toggled by <code>prefers-color-scheme</code>.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A page that adapts layout based on orientation and width, switches between light/dark themes based on OS settings, disables animations if the user prefers reduced motion, and shows a print-optimized version with hidden sidebar and visible URLs.

**Explanation:** `prefers-color-scheme: dark` overrides CSS variables for dark mode. `prefers-reduced-motion: reduce` sets all animation/transition durations to near-zero. `orientation: landscape` switches content to `flex-direction: row`. `@media print` removes the sidebar and adds URL display after links.

## 🏢 Real World Use Case
Every responsive website uses media queries for breakpoints. `prefers-color-scheme` is essential for dark mode support. `prefers-reduced-motion` is an accessibility requirement. `@media print` is used for printable invoices, tickets, and articles.

## 🎯 Interview Questions
1. **Q:** What is the difference between `min-width` and `max-width` in media queries?  
   **A:** `min-width` applies styles when the viewport is *at least* the given width (mobile-first); `max-width` applies styles when the viewport is *at most* the given width (desktop-first).

2. **Q:** What is the mobile-first approach to media queries?  
   **A:** Write base CSS for mobile devices, then use `@media (min-width: ...)` to add styles for larger screens.

3. **Q:** How do you detect dark mode preference in CSS?  
   **A:** `@media (prefers-color-scheme: dark) { ... }`

4. **Q:** How do you respect reduced motion preferences?  
   **A:** `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }`

5. **Q:** What media features can you query besides width?  
   **A:** `height`, `orientation`, `resolution`, `color`, `prefers-color-scheme`, `prefers-reduced-motion`, `hover`, `pointer`, `aspect-ratio`, and more.

## ⚠ Common Errors / Mistakes
- Not including `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — media queries based on device width will not work on mobile
- Using `max-width` breakpoints in a mobile-first approach (use `min-width` instead)
- Overriding base styles with each media query instead of adding only what changes
- Not testing on actual devices, only in browser DevTools resize mode
- Using complex `@media` queries without fallbacks for older browsers

## 📝 Practice Exercises
**Beginner:**
1. Add a `<meta name="viewport">` tag and create a media query that changes body background color at 768px.
2. Use `min-width` to make a single-column layout switch to two columns at 600px.
3. Add a `@media print` rule that hides the navigation bar.

**Intermediate:**
4. Build a mobile-first layout with 1 column (base), 2 columns (768px), and 3 columns (1200px).
5. Add dark mode support using `prefers-color-scheme: dark` with CSS variables.
6. Implement `prefers-reduced-motion: reduce` to disable animations on a button or card.

**Advanced:**
7. Build a fully responsive dashboard with a sidebar that collapses to a top nav on mobile, with breakpoints at 768px and 1024px, supporting both dark/light themes and reduced motion.
8. Create a print stylesheet for a recipe page that hides images, navigation, and comments, adjusts font sizes, and shows ingredient measurements prominently.
