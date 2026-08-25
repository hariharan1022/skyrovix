## 19. CSS Links
## 📘 Introduction
Links (`<a>` elements) are fundamental to web navigation. CSS provides pseudo-classes to style links in different states: unvisited, visited, hover, and active. Proper link styling enhances usability, accessibility, and visual design.

## 🧠 Key Concepts
- **:link** — Unvisited link (default state).
- **:visited** — Link the user has visited.
- **:hover** — Link when the mouse pointer is over it.
- **:active** — Link at the moment it is being clicked.
- **LVHA Order:** `:link`, `:visited`, `:hover`, `:active` — must be in this order for proper cascade.
- **Removing Underlines:** `text-decoration: none` (but consider accessibility).
- **Button-style Links:** Applying padding, background, border to make links look like buttons.
- **Accessibility:** Ensure sufficient contrast, visible focus states, and distinguishable link styles.

## 💻 Syntax
```css
/* LVHA order */
a:link { color: blue; text-decoration: underline; }
a:visited { color: purple; }
a:hover { color: darkblue; text-decoration: none; }
a:active { color: red; }

/* Removing underline */
a.no-underline { text-decoration: none; }

/* Button-style link */
a.button {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
a.button:hover { background: #2980b9; }
```

## ✅ Example 1 - Basic (Problem, HTML+CSS Code, Output, Explanation)
**Problem:** Style link states with distinct visual feedback.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* LVHA order */
    a:link {
      color: #2980b9;
      text-decoration: underline;
    }
    a:visited {
      color: #8e44ad;
    }
    a:hover {
      color: #e74c3c;
      text-decoration: none;
    }
    a:active {
      color: #f39c12;
    }
  </style>
</head>
<body>
  <a href="#">Hover and click this link</a>
  <p>Link changes color on hover and click.</p>
</body>
</html>
```
**Output:** Blue link with underline. Turns red without underline on hover. Orange when clicked. Purple after visiting.
**Explanation:** The four pseudo-classes provide visual feedback for each interaction state. LVHA order ensures all states work correctly.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create button-style links with transition effects.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .btn-link {
      display: inline-block;
      padding: 12px 24px;
      background: #2ecc71;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      transition: background 0.3s, transform 0.2s;
    }
    .btn-link:link { color: #fff; }
    .btn-link:visited { background: #27ae60; }
    .btn-link:hover {
      background: #27ae60;
      transform: translateY(-2px);
    }
    .btn-link:active {
      background: #1e8449;
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <a href="#" class="btn-link">Click Me</a>
</body>
</html>
```
**Output:** A green button-like link that lifts up on hover and darkens on click, with smooth transitions.
**Explanation:** The `<a>` is styled like a button with padding and background. `transition` animates the color and transform changes. LVHA order is maintained with specific overrides.

## 🏢 Real World Use Case
A corporate website styles all text links with an underline that animates on hover using `background-image` gradients. Primary CTA links use button styles with box shadows. Secondary links use an arrow icon that slides on hover. All link states pass WCAG AA contrast guidelines.

## 🎯 Interview Questions (5 with answers)
1. **What is the LVHA order and why is it important?** `:link`, `:visited`, `:hover`, `:active` — the correct CSS order so all pseudo-classes work properly due to specificity conflicts.
2. **Can you style `:visited` links with any CSS property?** No, for privacy reasons, browsers restrict `:visited` to only `color`, `background-color`, `border-color`, and a few other non-layout properties.
3. **How do you make a link look like a button?** Remove default text-decoration, add display:inline-block, padding, background, border-radius, and hover states.
4. **Why should you not remove the underline from all links?** Underlines are a strong visual cue for links — removing them without alternative styling harms accessibility.
5. **What is the default style for unvisited links in most browsers?** Blue text with underline.

## ⚠ Common Errors / Mistakes
- Not following LVHA order — hover and active states may not work as expected.
- Removing `text-decoration: underline` from all links without providing alternative visual distinction (color alone is insufficient for accessibility).
- Using only color change for link states (colorblind users may not perceive the difference).
- Forgetting that `:visited` has CSS property restrictions for privacy.
- Applying link styles to `<a>` without `href` (such elements don't get pseudo-class matching).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
1. Change the color of all links to blue.
2. Remove the underline from links when hovering.
3. Style visited links to be purple.
4. Create a navigation bar where links change background color on hover.
5. Style a link that transitions its color over 0.3 seconds on hover.
6. Build a "read more" link that shows an arrow (→) on hover.
7. Create a button-style link with a gradient background, box-shadow, and smooth hover/focus transitions.
8. Implement a skip-to-content link that is hidden off-screen but becomes visible on keyboard focus.
