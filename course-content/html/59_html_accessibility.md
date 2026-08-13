# 59. HTML Accessibility (WAI-ARIA)

## 📘 Introduction
Web accessibility ensures that people with disabilities (visual, auditory, motor, cognitive) can perceive, understand, navigate, and interact with web content. The WAI-ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) specification provides a set of attributes that supplement HTML to make dynamic content and custom widgets accessible to assistive technologies like screen readers.

## 🧠 Key Concepts
- **WAI-ARIA**: W3C specification defining roles, states, and properties for accessible rich internet applications
- **ARIA Roles**: Define the purpose of an element (e.g., `role="button"`, `role="navigation"`, `role="alert"`, `role="dialog"`)
- **ARIA Properties**: Additional attributes describing element characteristics (e.g., `aria-label`, `aria-describedby`, `aria-labelledby`)
- **ARIA States**: Dynamic states that change with user interaction (e.g., `aria-expanded`, `aria-pressed`, `aria-disabled`, `aria-hidden`)
- **Semantic HTML First**: Use native HTML elements (button, nav, main, header) before adding ARIA — semantic elements have built-in accessibility
- **First Rule of ARIA**: Don't use ARIA if native HTML semantics suffice (`<button>` is better than `<div role="button">`)
- **Keyboard Accessibility**: All interactive elements must be reachable and operable via keyboard (Tab, Enter, Space, Arrow keys)
- **Focus Management**: Visible focus indicators (`:focus-visible`), logical tab order (`tabindex`), programmatic focus (`focus()`)
- **Screen Readers**: Software like JAWS, NVDA, VoiceOver that converts on-screen content to speech or braille
- **WCAG**: Web Content Accessibility Guidelines — success criteria (A, AA, AAA) for accessibility conformance
- **Alt Text**: All images must have descriptive `alt` attributes
- **Color Contrast**: Text must have sufficient contrast ratio against its background (minimum 4.5:1 for normal text)

## 💻 Syntax
```html
<!-- ARIA Roles -->
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<button role="button" aria-pressed="false" onclick="toggle(this)">
  Mute
</button>

<!-- ARIA Properties -->
<label for="search">Search</label>
<input type="text" id="search" aria-describedby="search-hint">
<p id="search-hint">Type keywords to find products</p>

<button aria-label="Close dialog" onclick="closeDialog()">✕</button>

<!-- ARIA States -->
<div role="tabpanel" aria-hidden="true" id="panel1">
  Panel content
</div>

<div role="alert" aria-live="assertive">
  Form submission failed
</div>

<!-- Live Regions -->
<div aria-live="polite" id="updates">
  New messages will appear here
</div>

<!-- Landmark Roles (use semantic HTML5 elements instead when possible) -->
<div role="banner">...</div>          <!-- <header> -->
<div role="navigation">...</div>      <!-- <nav> -->
<div role="main">...</div>            <!-- <main> -->
<div role="contentinfo">...</div>     <!-- <footer> -->
```

## ✅ Example 1 - Basic (Accessible Navigation and Form)

**Problem:** Create an accessible navigation menu and form with proper ARIA attributes and keyboard support.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accessible Page</title>
  <style>
    :focus-visible { outline: 3px solid #4A90D9; outline-offset: 2px; }
    .error { color: #c00; font-size: 14px; }
    .sr-only { position: absolute; width: 1px; height: 1px;
               padding: 0; margin: -1px; overflow: hidden;
               clip: rect(0,0,0,0); border: 0; }
  </style>
</head>
<body>
  <!-- Skip to main content link -->
  <a href="#main-content" class="sr-only">Skip to main content</a>

  <!-- Accessible navigation -->
  <header role="banner">
    <nav aria-label="Main navigation">
      <ul style="list-style:none; display:flex; gap:20px;">
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact" aria-disabled="true">Contact (coming soon)</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content -->
  <main id="main-content" role="main">
    <h1>Sign Up</h1>

    <form novalidate onsubmit="return handleSubmit(event)">
      <!-- Name field -->
      <div>
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required
               aria-required="true"
               aria-describedby="name-error"
               autocomplete="name">
        <span id="name-error" class="error" role="alert"></span>
      </div>

      <!-- Email field -->
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required
               aria-required="true"
               aria-describedby="email-error"
               autocomplete="email">
        <span id="email-error" class="error" role="alert"></span>
      </div>

      <!-- Submit -->
      <button type="submit" aria-label="Submit registration form">
        Register
      </button>
    </form>

    <!-- Live region for status announcements -->
    <div aria-live="polite" aria-atomic="true" id="form-status"></div>
  </main>

  <script>
    function handleSubmit(e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      let valid = true;

      nameError.textContent = '';
      emailError.textContent = '';

      if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        name.focus();
        valid = false;
      } else if (!email.value.includes('@')) {
        emailError.textContent = 'Valid email is required';
        email.focus();
        valid = false;
      }

      if (valid) {
        status.textContent = 'Registration submitted successfully!';
        status.setAttribute('role', 'alert');
      } else {
        status.textContent = '';
      }
      return false;
    }
  </script>
</body>
</html>
```

**Output:** A page with accessible navigation (blind users can skip to content), a form with ARIA-required fields, error announcements via `role="alert"`, and a live region for success messages. All elements are keyboard-navigable with visible focus indicators.

**Explanation:** 
- `aria-current="page"` tells screen readers the current page link
- `aria-disabled="true"` on a link announces it as disabled (without removing keyboard focus)
- `aria-required="true"` announces field requirement before submission
- `aria-describedby` links fields to error messages
- `role="alert"` on error spans triggers immediate screen reader announcement
- `aria-live="polite"` announces dynamic content (form status) after current activity
- `sr-only` class visually hides skip link but keeps it accessible to screen readers

## 🚀 Example 2 - Intermediate (Accessible Tab Panel Widget)

**Problem:** Build an accessible tab panel with full keyboard navigation, ARIA roles, and state management.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Accessible Tabs</title>
  <style>
    .tab-list { display: flex; gap: 2px; list-style: none; padding: 0; margin: 0; }
    .tab { padding: 10px 20px; border: 1px solid #ccc; cursor: pointer;
           background: #eee; border-radius: 4px 4px 0 0; }
    .tab[aria-selected="true"] { background: white; border-bottom-color: white; }
    .tab:focus-visible { outline: 3px solid #4A90D9; outline-offset: -3px; }
    .tab-panel { border: 1px solid #ccc; padding: 20px; border-radius: 0 4px 4px 4px;
                 margin-top: -1px; }
    [role="tabpanel"][aria-hidden="true"] { display: none; }
    [role="tabpanel"][aria-hidden="false"] { display: block; }
  </style>
</head>
<body>
  <h1>Accessible Tab Panel</h1>

  <div class="tabs">
    <!-- Tab list -->
    <div role="tablist" aria-label="Product information">
      <button role="tab"
              aria-selected="true"
              aria-controls="panel-description"
              id="tab-description"
              tabindex="0">
        Description
      </button>
      <button role="tab"
              aria-selected="false"
              aria-controls="panel-specs"
              id="tab-specs"
              tabindex="-1">
        Specifications
      </button>
      <button role="tab"
              aria-selected="false"
              aria-controls="panel-reviews"
              id="tab-reviews"
              tabindex="-1">
        Reviews
      </button>
    </div>

    <!-- Tab panels -->
    <div role="tabpanel"
         id="panel-description"
         aria-labelledby="tab-description"
         aria-hidden="false">
      <h2>Product Description</h2>
      <p>This ergonomic wireless keyboard features mechanical keys with customizable RGB backlighting.</p>
    </div>

    <div role="tabpanel"
         id="panel-specs"
         aria-labelledby="tab-specs"
         aria-hidden="true">
      <h2>Specifications</h2>
      <ul>
        <li>Connectivity: Bluetooth 5.0 / USB-C</li>
        <li>Battery Life: Up to 40 hours</li>
        <li>Weight: 650g</li>
      </ul>
    </div>

    <div role="tabpanel"
         id="panel-reviews"
         aria-labelledby="tab-reviews"
         aria-hidden="true">
      <h2>Customer Reviews</h2>
      <p>No reviews yet.</p>
    </div>
  </div>

  <script>
    const tablist = document.querySelector('[role="tablist"]');
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    function selectTab(selectedTab) {
      // Update tab states
      tabs.forEach(tab => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      });

      // Update panel visibility
      panels.forEach(panel => {
        const isVisible = panel.id === selectedTab.getAttribute('aria-controls');
        panel.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      });

      selectedTab.focus();
    }

    // Click to select
    tabs.forEach(tab => {
      tab.addEventListener('click', () => selectTab(tab));
    });

    // Arrow key navigation
    tablist.addEventListener('keydown', function(e) {
      const currentTab = document.querySelector('[role="tab"][aria-selected="true"]');
      let index = Array.from(tabs).indexOf(currentTab);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        index = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        index = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        index = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        index = tabs.length - 1;
      } else {
        return;
      }

      selectTab(tabs[index]);
    });
  </script>
</body>
</html>
```

**Output:** A three-tab interface (Description, Specifications, Reviews) with proper ARIA roles. Active tab is highlighted. Arrow keys cycle through tabs. Screen readers announce selected tab and associated panel content correctly.

**Explanation:** 
- `role="tablist"`, `role="tab"`, `role="tabpanel"` define the widget structure
- `aria-selected="true"/"false"` indicates which tab is active
- `aria-controls` links tabs to their panels
- `aria-labelledby` on panels links back to tabs for context
- `tabindex="0"` on active tab, `tabindex="-1"` on inactive — only the active tab is in tab order
- Arrow key handlers implement the "roving tabindex" pattern
- `aria-hidden="true"/"false"` manages panel visibility for screen readers

## 🏢 Real World Use Case
**Government Services Portal:** A public benefits application portal must meet WCAG 2.1 AA standards (legal requirement in many countries). The site uses: semantic HTML5 landmarks (`<main>`, `<nav>`, `<aside>`) for screen reader navigation; `aria-live="assertive"` for error messages after form submission; `aria-describedby` linking form fields to help text; `role="dialog"` with `aria-modal="true"` for confirmation dialogs; proper heading hierarchy (`h1`→`h6`) for document outline; `alt` text on all images; sufficient color contrast (4.5:1+); and keyboard-only navigation testing throughout.

## 🎯 Interview Questions
1. **Q:** What is the first rule of ARIA?  
   **A:** Don't use ARIA if you can use a native HTML element that provides the semantics and behavior you need. For example, use `<button>` instead of `<div role="button">`. Native elements have built-in keyboard handling, roles, and states.

2. **Q:** What is the difference between `aria-live="polite"` and `aria-live="assertive"`?  
   **A:** `polite` announces changes after the current user activity completes (non-critical updates). `assertive` interrupts current activity immediately (critical alerts, errors). `aria-live="off"` suppresses announcements.

3. **Q:** What does `aria-hidden="true"` do vs `display:none` or `visibility:hidden`?  
   **A:** `aria-hidden="true"` removes an element from the accessibility tree (screen readers ignore it) but it remains visually rendered. `display:none` and `visibility:hidden` remove the element from both visual and accessibility trees.

4. **Q:** How do you make a custom checkbox accessible with ARIA?  
   **A:** Use `role="checkbox"`, `aria-checked="true"/"false"`, handle click and keyboard (Space to toggle), manage focus with `tabindex`, and provide a visible label via `aria-label` or associated `<label>`.

5. **Q:** What is the purpose of `tabindex` and what values are valid?  
   **A:** `tabindex` controls keyboard focus order. `0` makes element focusable in natural DOM order. Negative values (e.g., `-1`) make it programmatically focusable but not via Tab. Positive values create custom order (strongly discouraged). Only interactive elements should have `tabindex`.

## ⚠ Common Errors / Mistakes
- Using ARIA roles instead of native semantic HTML (`<div role="button">` vs `<button>`)
- Forgetting to manage keyboard interaction when using non-semantic elements with ARIA roles
- Using `aria-hidden="true"` on focusable elements (screen readers can still focus them)
- Overusing `role="alert"` on static content (causes unnecessary interruptions)
- Neglecting focus indicators — removing `outline` without providing an alternative
- Using `tabindex` values > 0 (creates confusing navigation order)
- Providing `alt` text like "image" or "photo" instead of descriptive content
- Adding ARIA that duplicates native semantics (e.g., `<nav role="navigation">` — redundant)
- Forgetting `lang` attribute on `<html>` (screen readers need language for correct pronunciation)

## 📝 Practice Exercises

**Beginner:**
1. Take a form with name, email, and phone fields. Add appropriate `<label>` elements, `aria-required`, `aria-describedby` for help text, and a `role="alert"` error container.
2. Add a "skip to main content" link to a page with a long navigation menu. Use the `sr-only` technique to hide it visually but keep it keyboard-accessible.
3. Find 3 images on a page and write meaningful `alt` text for each. Add `aria-label` to a decorative icon button that lacks visible text.

**Intermediate:**
4. Build an accessible accordion component with proper ARIA: use `role="button"` on headers, `aria-expanded` for state, `aria-controls` linking to content panels, and `aria-hidden` on collapsed panels. Implement keyboard navigation with Enter/Space to toggle and Arrow keys to move between sections.
5. Convert an existing modal dialog to be fully accessible: add `role="dialog"` with `aria-modal="true"`, `aria-labelledby` for the title, trap focus inside the dialog, close on Escape, and return focus to the triggering button when closed.
6. Create an accessible custom select/dropdown (not using `<select>`) with `role="listbox"`, `role="option"`, `aria-selected`, keyboard navigation (Arrow keys, Enter, Escape), and proper focus management.

**Advanced:**
7. Audit and remediate a complex page containing a data table, navigation, forms, dynamic content, and a carousel. Apply WCAG 2.1 AA standards: fix heading hierarchy, add landmark roles, ensure keyboard operability, add appropriate ARIA live regions for dynamic updates, and verify color contrast. Provide a before/after accessibility report.
8. Build a fully accessible single-page application (SPA) router that: manages focus on route change (focus the `<h1>` of new page), announces route changes via `aria-live`, preserves scroll position, supports browser back/forward with proper focus restoration, and provides a loading state announcement for async content.
