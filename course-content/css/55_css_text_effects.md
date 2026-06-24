# 55. CSS Text Effects

## 📘 Introduction
CSS text effects control how text behaves when it overflows its container, breaks across lines, and flows in different writing directions. These properties are essential for internationalization, responsive design, and preventing layout breakage.

## 🧠 Key Concepts
- **text-overflow**: Controls visible indication of overflowed text (`clip` or `ellipsis`)
- **overflow-wrap** (formerly `word-wrap`): Allows long words to break and wrap
- **word-break**: Specifies soft wrapping rules between characters
- **writing-mode**: Defines text flow direction (horizontal vs vertical)
- **text-orientation**: Controls glyph orientation in vertical text
- **hyphens**: Enables automatic hyphenation at line breaks
- **white-space**: Companion property that controls how whitespace and line breaks are handled

## 💻 Syntax

```css
/* Text overflow - requires overflow: hidden and white-space: nowrap */
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-clip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

/* Overflow wrap */
.word-wrap-break {
  overflow-wrap: break-word;
}

/* Word break */
.word-break-all {
  word-break: break-all;
}

.word-break-keep {
  word-break: keep-all;
}

/* Writing modes */
.vertical-rl {
  writing-mode: vertical-rl;  /* right-to-left vertical */
}

.vertical-lr {
  writing-mode: vertical-lr;  /* left-to-right vertical */
}

/* Text orientation */
.upright {
  text-orientation: upright;
}

.sideways {
  text-orientation: sideways;
}

/* Hyphens */
.hyphenated {
  hyphens: auto;
}
```

## ✅ Example 1 - Basic: Truncating Text with Ellipsis

**Problem**: Display a long title in a fixed-width card without breaking the layout.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .card {
    width: 220px;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: Arial, sans-serif;
  }
  .card h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
    margin: 0 0 8px;
  }
  .card p {
    color: #555;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f5f5f5;
  }
</style>
</head>
<body>
<div class="card">
  <h3>This is an extremely long article title that should not break</h3>
  <p>The title above is truncated with ellipsis when it overflows.</p>
</div>
</body>
</html>
```

**Output**: The heading shows "This is an extremely long articl..." with three dots, keeping the card layout intact.

**Explanation**: `white-space: nowrap` prevents wrapping, `overflow: hidden` hides excess content, and `text-overflow: ellipsis` adds the `...` indicator. All three must be used together.

## 🚀 Example 2 - Intermediate: Vertical Japanese Text with Proper Break Rules

**Problem**: Display Japanese text vertically with correct character-based word breaking.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
<style>
  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    word-break: keep-all;
    height: 300px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fafafa;
    font-size: 18px;
    line-height: 1.8;
    font-family: "Noto Sans JP", sans-serif;
  }

  .horizontal-text {
    writing-mode: horizontal-tb;
    word-break: break-all;
    width: 150px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fafafa;
    font-size: 16px;
    line-height: 1.5;
    font-family: Arial, sans-serif;
  }

  .container {
    display: flex;
    gap: 40px;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
  }

  h3 { margin-bottom: 8px; font-family: Arial, sans-serif; }
</style>
</head>
<body>
<div class="container">
  <div>
    <h3>Vertical (keep-all)</h3>
    <div class="vertical-text">
      日本語のテキストは適切に改行されます
    </div>
  </div>
  <div>
    <h3>Horizontal (break-all)</h3>
    <div class="horizontal-text">
      ThisVeryLongUnbrokenWordWillBreakAtAnyCharacterToFit
    </div>
  </div>
</div>
</body>
</html>
```

**Output**: The vertical text reads top-to-bottom, right-to-left with text-orientation mixed (CJK characters upright, Latin sideways). The horizontal panel breaks the long word at each character to fit the narrow width.

**Explanation**: `writing-mode: vertical-rl` changes the flow direction. `word-break: keep-all` preserves CJK word boundaries. The horizontal panel uses `word-break: break-all` to forcibly break the long string at any character if needed.

## 🏢 Real World Use Case
**News article listing**: A news aggregator uses `text-overflow: ellipsis` with multi-line clamping (`-webkit-line-clamp`) for snippet previews in grid cards. This ensures consistent card heights across varying content lengths while indicating truncated articles.

## 🎯 Interview Questions

1. **Q**: What three properties must be set together for `text-overflow: ellipsis` to work?
   **A**: `white-space: nowrap` (or `pre`), `overflow: hidden` (or non-visible), and `text-overflow: ellipsis`. Without `overflow: hidden`, the text would not be clipped.

2. **Q**: What is the difference between `overflow-wrap: break-word` and `word-break: break-all`?
   **A**: `overflow-wrap: break-word` only breaks a word if it cannot fit on a line by itself. `word-break: break-all` breaks at any character boundary to fit the line, even if the word could wrap naturally.

3. **Q**: What does `writing-mode: vertical-rl` mean?
   **A**: Text flows vertically from top to bottom, and lines progress from right to left (used for traditional Japanese and Chinese).

4. **Q**: When would you use `hyphens: auto`?
   **A**: For justified text in languages with clear hyphenation rules (e.g., English) to improve rag/justification quality. Requires `lang` attribute on the HTML element.

5. **Q**: What does `text-orientation: upright` do in vertical writing mode?
   **A**: It forces all characters, including Latin letters and numbers, to be displayed upright (not rotated 90°) within vertical text.

## ⚠ Common Errors / Mistakes
- **Forgetting `white-space: nowrap` with `text-overflow`**: Without it, text wraps to the next line and never triggers overflow.
- **Confusing `overflow-wrap` and `word-break`**: They handle different scenarios. Use `overflow-wrap` for long unbreakable strings, `word-break: break-all` when you need aggressive character-level breaking.
- **Missing `lang` attribute for `hyphens`**: Browsers will not apply automatic hyphenation without a language declaration.
- **Assuming `writing-mode` affects layout order**: It changes text flow but flex/grid ordering properties control visual order.
- **Using `text-overflow: ellipsis` for multi-line truncation**: This only works for single-line. Use `-webkit-line-clamp` for multi-line (with `display: -webkit-box`).

## 📝 Practice Exercises

### Beginner
1. Create a fixed-width div and make any overflowing text display with an ellipsis.
2. Add a long URL inside a narrow container and use `overflow-wrap: break-word` to prevent it from breaking the layout.
3. Set `writing-mode: vertical-lr` on a paragraph and observe the directional change.

### Intermediate
4. Build a two-column layout where the left column uses `text-overflow: ellipsis` and the right column uses `word-break: break-all`. Use a shared width constraint.
5. Create a vertical Chinese/Japanese text block with `writing-mode: vertical-rl` and `text-orientation: mixed`. Include some English words to see mixed orientation.
6. Style a blockquote with `hyphens: auto` and justified text, ensuring the HTML has the correct `lang` attribute.

### Advanced
7. Implement a multi-line truncation (3 lines) using `-webkit-line-clamp` and fall back to a JavaScript solution for Firefox (which does not support line-clamp natively).
8. Create a responsive headline component that switches from horizontal to vertical writing mode at a specific breakpoint, with smooth CSS transitions on the text properties.
