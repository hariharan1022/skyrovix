## 43. CSS Inheritance

## 📘 Introduction
CSS inheritance controls how property values propagate from parent elements to their children. Some properties are inherited automatically (like color and font-family), while others are not (like margin and border). Understanding inheritance is essential for writing concise, predictable stylesheets and avoiding unexpected styling issues. CSS provides several keywords — `inherit`, `initial`, `unset`, `revert` — to explicitly control inheritance behavior.

## 🧠 Key Concepts
- **Inherited properties**: Passed from parent to child by default (e.g., `color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility`)
- **Non-inherited properties**: Not passed to children; each element starts with the property's initial value (e.g., `margin`, `padding`, `border`, `background`, `width`, `height`, `display`)
- **`inherit` keyword**: Forces a property to inherit its value from the parent element
- **`initial` keyword**: Resets a property to its CSS specification default value (not the browser default)
- **`unset` keyword**: Acts as `inherit` for inherited properties and as `initial` for non-inherited properties
- **`revert` keyword**: Resets to the property's inherited value if one exists, otherwise to the browser/user-agent stylesheet default
- **`revert-layer`**: Resets to the previous cascade layer's value
- **`all` property**: Resets all properties at once using `inherit`, `initial`, `unset`, or `revert`

## 💻 Syntax

```css
/* Inheritance keywords */
.child {
  color: inherit;        /* Forces parent's color */
  margin: initial;       /* Reset to CSS spec default (0) */
  padding: unset;        /* Inherit if property is inherited, else initial */
  display: revert;       /* Revert to browser default */
}

/* Reset everything */
.unstyled {
  all: unset;            /* Resets all properties */
}
.all-inherit {
  all: inherit;          /* Inherits all properties from parent */
}
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate which properties inherit and use explicit inheritance keywords to control styling in a nested card layout.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    color: #333;
    font-family: Georgia, serif;
    font-size: 18px;
    line-height: 1.6;
    border: 3px solid #e74c3c;
    padding: 20px;
  }
  .card {
    border: 2px solid #3498db;
    padding: 20px;
    margin: 20px;
    /* color, font-family, font-size, line-height inherit automatically */
  }
  .card p {
    /* Inherits color, font-family, font-size, line-height from body via .card */
    border: inherit;  /* Forces border inheritance (normally non-inherited) */
    padding: 10px;
  }
  .force-initial {
    color: initial;
    font-size: initial;
  }
  .force-unset {
    all: unset;  /* font-family becomes serif (initial), color becomes inherit from body */
    display: block;
    margin: 10px 0;
  }
</style>
</head>
<body>
  <h1>CSS Inheritance Demo</h1>
  <p>This paragraph inherits body styles.</p>
  <div class="card">
    <p>This inherits color/font/line-height from body (via .card). Its border is explicitly inherited from .card.</p>
    <p class="force-initial">This resets color and font-size to CSS initial values.</p>
    <p class="force-unset">This uses all: unset — only display: block is re-applied.</p>
  </div>
</body>
</html>
```

**Output:** The body sets global typography. The card inherits it automatically. The first card paragraph inherits the border from its parent .card. The second paragraph resets just color and font-size. The third paragraph uses `all: unset` and starts from a clean slate.

**Explanation:** `color`, `font-family`, `font-size`, and `line-height` are inherited properties — they flow down the DOM tree automatically. `border`, `margin`, and `padding` are non-inherited — each element starts at their initial value. The `inherit` keyword overrides this, forcing the parent's value down. `initial` resets to the CSS specification default. `unset` chooses based on property type.

## 🚀 Example 2 - Intermediate

**Problem:** Build a themed UI section where all child elements should inherit specific theme colors and typography, with a "reset" widget that needs to opt out of all theme inheritance.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  :root {
    --theme-primary: #2c3e50;
    --theme-accent: #e74c3c;
    --theme-bg: #ecf0f1;
  }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #333;
    margin: 0;
    padding: 20px;
    background: #fff;
  }
  .themed-section {
    background: var(--theme-bg);
    color: var(--theme-primary);
    font-family: Georgia, 'Times New Roman', serif;
    padding: 2rem;
    border-radius: 8px;
  }
  .themed-section h2 {
    color: var(--theme-accent);
    font-size: 2rem;
    border-bottom: 2px solid currentColor;
  }
  .themed-section a {
    color: inherit;
    text-decoration: underline;
  }
  .themed-section .meta {
    font-size: 0.875rem;
    color: inherit;
    opacity: 0.7;
  }
  .widget-reset {
    all: initial;
    display: block;
    padding: 1rem;
    border: 1px solid #ccc;
    margin-top: 1rem;
  }
  .widget-reset * {
    all: unset;
    display: revert;
  }
  .revert-demo {
    color: revert;
    font-family: revert;
  }
</style>
</head>
<body>
  <div class="themed-section">
    <h2>Themed Content</h2>
    <p>This paragraph inherits the theme's serif font and dark color. Links are also styled with the theme's color via explicit inheritance.</p>
    <p class="meta">Metadata line — smaller but same theme color.</p>
    <a href="#">Inherited Link Color</a>

    <div class="widget-reset">
      <h3>Reset Widget</h3>
      <p>all: initial on the container and all: unset on children strips all theme styling. This widget is completely independent.</p>
      <a href="#">Plain Link (browser default)</a>
    </div>
  </div>

  <p class="revert-demo">This paragraph uses <code>revert</code> for color and font-family, returning to the browser default body style.</p>
</body>
</html>
```

**Output:** A card with a distinct serif theme. All text inside inherits theme colors and fonts. Links also match via `color: inherit`. The reset widget completely opts out of the theme using `all: initial`. The revert paragraph returns to baseline browser styles.

**Explanation:** This demonstrates strategic inheritance control. `color: inherit` on links makes them match surrounding text (common in design systems). `all: initial` is a nuclear reset for third-party widgets embedded in themed areas. `all: unset` on descendants strips all inherited and non-inherited values. `revert` is gentler and respects the user-agent stylesheet.

## 🏢 Real World Use Case
**Design system component libraries** (like Material-UI, Chakra UI, or Shoelace) rely heavily on `all: unset` and `all: initial` in their "reset" stylesheets to prevent host page styles from leaking into web components. For example, an embedded chat widget or a third-party payment form uses `all: initial` on its root element to create a clean styling boundary, ensuring the host site's CSS cannot accidentally override form elements. The `inherit` keyword is used extensively in button components so that `color` and `font` always match the parent context.

## 🎯 Interview Questions

**1. What is the difference between `initial` and `unset`?**
`initial` always resets to the CSS specification's default value for the property. `unset` behaves as `inherit` if the property is inherited by default, and as `initial` if the property is non-inherited.

**2. Which CSS properties are inherited by default?**
Inherited properties include `color`, `font-family`, `font-size`, `font-style`, `font-weight`, `line-height`, `text-align`, `text-indent`, `visibility`, `white-space`, `word-spacing`, `letter-spacing`, and `cursor`.

**3. How does `all: inherit` behave?**
It forces all properties of the element to inherit from its parent, overriding both inherited and non-inherited defaults. For example, `border: all: inherit` would force the element to use its parent's border.

**4. What is the difference between `revert` and `initial`?**
`initial` resets to the CSS specification's default. `revert` resets to the value the property would have had if no author styles were applied (i.e., the browser/user-agent stylesheet value).

**5. Can inheritance be used with custom properties (CSS variables)?**
Yes, custom properties inherit by default. A custom property set on a parent is available to all children. `inherit`, `initial`, `unset`, and `revert` can also be used as custom property values.

## ⚠ Common Errors / Mistakes
- Assuming all CSS properties inherit — `margin`, `padding`, `border`, `width`, `height`, `background`, `display` do NOT inherit
- Using `all: unset` without re-applying `display` — `display` is non-inherited and will reset to its initial value (usually `inline`), breaking layout
- Confusing `initial` with the browser default — `initial` returns to the CSS spec default, not the browser stylesheet default
- Overusing `!important` with inheritance keywords — `!important` overrides inheritance regardless of keywords
- Expecting `inherit` on the `background` property to inherit background images — `background` is a shorthand and inherits as a whole or not at all

## 📝 Practice Exercises

**Beginner:**
1. Create a parent div with `font-size: 24px` and `color: blue`. Add three nested child divs and observe how properties inherit.
2. Add `border: 2px solid red` to a parent and use `border: inherit` on a child. Note the border appears on the child.
3. Create a paragraph inside a `<section>` with `font-style: italic`. Verify the paragraph inherits italic styling automatically.

**Intermediate:**
4. Build a themed card where the card sets `font-family`, `color`, and `line-height`, and all content inside (headings, paragraphs, lists, links) inherits these. Links should use `color: inherit` to match the theme.
5. Create a "reset zone" inside a styled page where `all: initial` is applied to a container. Add a paragraph and a button inside and observe all default styling is stripped. Re-apply `display: block` where needed.
6. Use `all: unset` on a `<ul>` to remove all list styling, then selectively restore `list-style-type: disc` and `display: list-item` on its `<li>` children.

**Advanced:**
7. Build an embeddable widget (a notification toast) that uses `all: initial` on its host element to prevent page CSS from leaking in, then selectively re-applies needed styles using a scoped class approach. Test it inside various styled containers.
8. Create a deep inheritance tree of 6 nested levels, each setting a different property (color, font-size, padding, border, background, opacity). At each level, use a different keyword (inherit, initial, unset, revert) and document the visual outcome at every depth.
