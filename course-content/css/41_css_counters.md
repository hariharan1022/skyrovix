## 41. CSS Counters

## 📘 Introduction
CSS counters are variables maintained by CSS whose values can be incremented or decremented by CSS rules. They enable automatic numbering of elements, similar to ordered lists but with far more control over styling and structure. Counters are particularly useful for numbering headings, sections, figures, and tables in long documents without requiring JavaScript or manual markup.

## 🧠 Key Concepts
- **counter-reset**: Creates or resets a counter to a specific value (default 0)
- **counter-increment**: Increments or decrements a counter by a specified amount
- **counter()**: Displays the current value of a counter as a string
- **counters()**: Displays all nesting levels of a counter with a custom separator
- **content property**: Used with `::before` or `::after` pseudo-elements to display counter values
- **Nested counters**: Automatic numbering for hierarchical content (e.g., 1, 1.1, 1.1.1)
- Counters are scoped to the element they are reset on and its children
- Multiple counters can be used simultaneously on the same page

## 💻 Syntax

```css
/* Reset a counter */
element {
  counter-reset: counter-name initial-value;
}

/* Increment a counter */
element {
  counter-increment: counter-name increment-value;
}

/* Display counter value */
element::before {
  content: counter(counter-name, style) " text";
}

/* Display nested counters with separator */
element::before {
  content: counters(counter-name, ".", style) " ";
}

/* Counter styles include: decimal, lower-roman, upper-roman, lower-alpha, upper-alpha, etc. */
```

## ✅ Example 1 - Basic

**Problem:** Automatically number all headings (h1 through h3) in an article without manual numbering.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    counter-reset: section;
    font-family: Arial, sans-serif;
  }
  h1 {
    counter-reset: subsection;
  }
  h1::before {
    counter-increment: section;
    content: "Section " counter(section) ". ";
    color: #2c3e50;
  }
  h2::before {
    counter-increment: subsection;
    content: counter(section) "." counter(subsection) " ";
    color: #34495e;
  }
</style>
</head>
<body>
  <h1>Introduction</h1>
  <p>Content here.</p>
  <h2>Background</h2>
  <h2>Objectives</h2>
  <h1>Methods</h1>
  <h2>Data Collection</h2>
  <h2>Analysis</h2>
  <h1>Results</h1>
</body>
</html>
```

**Output:**
- Section 1. Introduction
  - 1.1 Background
  - 1.2 Objectives
- Section 2. Methods
  - 2.1 Data Collection
  - 2.2 Analysis
- Section 3. Results

**Explanation:** `counter-reset` creates the section counter on the body and resets subsection with each new h1. `counter-increment` in `::before` pseudo-elements increases the counters. The `content` property displays both counters with proper formatting. This approach adapts automatically if headings are added, removed, or reordered.

## 🚀 Example 2 - Intermediate

**Problem:** Create a nested numbered list using CSS counters that displays multi-level numbering (e.g., 1.1.1) for a complex legal document outline.

```html
<!DOCTYPE html>
<html>
<head>
<style>
  .outline {
    counter-reset: top-level;
    font-family: Georgia, serif;
  }
  .outline li {
    list-style: none;
    margin: 8px 0;
  }
  .outline > li {
    counter-increment: top-level;
  }
  .outline > li::before {
    content: counter(top-level, upper-roman) ". ";
    font-weight: bold;
    color: #8e44ad;
  }
  .outline > li > ol {
    counter-reset: mid-level;
  }
  .outline > li > ol > li {
    counter-increment: mid-level;
  }
  .outline > li > ol > li::before {
    content: counter(top-level, upper-roman) "." counter(mid-level) " ";
    color: #2980b9;
  }
  .outline > li > ol > li > ol {
    counter-reset: low-level;
  }
  .outline > li > ol > li > ol > li {
    counter-increment: low-level;
  }
  .outline > li > ol > li > ol > li::before {
    content: counter(top-level, upper-roman) "." counter(mid-level) "." counter(low-level) " ";
    color: #27ae60;
  }
</style>
</head>
<body>
  <h2>Legal Document Outline</h2>
  <ol class="outline">
    <li>Preliminary Provisions
      <ol>
        <li>Title and Commencement
          <ol>
            <li>Short title</li>
            <li>Effective date</li>
          </ol>
        </li>
        <li>Definitions</li>
      </ol>
    </li>
    <li>Rights and Obligations
      <ol>
        <li>General Rights
          <ol>
            <li>Right to access</li>
            <li>Right to rectification</li>
          </ol>
        </li>
        <li>Obligations of Parties</li>
      </ol>
    </li>
  </ol>
</body>
</html>
```

**Output:**
- I. Preliminary Provisions
  - I.1 Title and Commencement
    - I.1.1 Short title
    - I.1.2 Effective date
  - I.2 Definitions
- II. Rights and Obligations
  - II.1 General Rights
    - II.1.1 Right to access
    - II.1.2 Right to rectification
  - II.2 Obligations of Parties

**Explanation:** Each nesting level resets its own counter. The child counters inherit and continue from their parent scope. Using `counters()` would simplify this, but manual counter tracking gives precise control over formatting and numbering styles per level.

## 🏢 Real World Use Case
**Technical documentation portals** (e.g., MDN Web Docs or API references) use CSS counters extensively to number sections, code examples, tables, and figures. When documentation is dynamically generated or frequently updated, CSS counters auto-maintain correct numbering across hundreds of pages without server-side re-processing. They also power the "table of contents" numbering in PDF export tools and are used in exam/test platforms to number questions and sub-questions hierarchically.

## 🎯 Interview Questions

**1. How do you display nested counter values with a separator like "1.2.3"?**
Use the `counters()` function: `content: counters(counter-name, ".", decimal);` The second argument is the separator string inserted between levels.

**2. What happens when you use `counter-reset` twice on the same counter name within the same element?**
The counter is reset to the last declaration's value. If multiple declarations exist, the cascade resolves which value applies.

**3. Can you apply CSS counters to non-list elements like `<div>` or `<p>`?**
Yes. Counters work on any element when used with `content` on `::before` or `::after` pseudo-elements. They are not limited to `<li>` or `<ol>`.

**4. How do you decrement a counter?**
Provide a negative increment value: `counter-increment: mycounter -1;` This decrements the counter by 1 each time the rule applies.

**5. What is the scope of a CSS counter?**
Counters are scoped to the element where `counter-reset` is defined and its descendant elements. They are not available to sibling or parent elements outside the scope.

## ⚠ Common Errors / Mistakes
- Forgetting the `content` property — `counter()` and `counters()` only produce visible output when used within `content` of `::before` or `::after`
- Expecting counters to work without `counter-increment` — a reset counter stays at its initial value unless incremented
- Using counters on replaced elements like `<img>` — `::before` and `::after` do not work on void/replaced elements
- Counter name conflicts — using the same counter name for different purposes across the document causes unexpected numbering
- Overlooking counter scope — a child element's counter-reset creates a new scope, restarting numbering for its subtree

## 📝 Practice Exercises

**Beginner:**
1. Create a simple ordered list using CSS counters instead of `<ol>`. Style the numbers in bold red with a circle background.
2. Number all `<h2>` elements in a page sequentially. Display the counter as "Chapter 1:", "Chapter 2:", etc.
3. Create a counter that starts at 10 and increments by 5 for each `<li>` in a list. Display the values.

**Intermediate:**
4. Build a two-level table of contents with CSS counters. Top-level items use decimal (1, 2, 3) and sub-items use "1.1", "1.2" format.
5. Create a figure numbering system where each `<figure>` in an article is numbered as "Figure 1", "Figure 2", and reset per chapter/section.
6. Implement a custom checklist counter that shows "Task A-1", "Task A-2" for the first category and "Task B-1", "Task B-2" for the second.

**Advanced:**
7. Build a complete multi-level legal document numbering system supporting 5 levels (I, I.A, I.A.1, I.A.1.a, I.A.1.a.i) with proper scope management.
8. Create a topic numbering system for a blog where comments are numbered per post and replies are numbered within each comment (e.g., Post 3, Comment 3.5, Reply 3.5.2).
