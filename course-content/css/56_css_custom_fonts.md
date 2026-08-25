# 56. CSS Custom Fonts

## 📘 Introduction
Custom fonts allow designers to move beyond web-safe fonts by embedding typefaces directly into web pages. The `@font-face` rule, combined with modern font formats and services like Google Fonts, gives developers full typographic control while balancing performance and licensing.

## 🧠 Key Concepts
- **@font-face rule**: Defines a custom font family and its source files
- **font-family**: A name you assign to reference the custom font in your CSS
- **src url() with format()**: Points to font files and hints at their format for browser selection
- **Font formats**: woff2 (best, smallest), woff (fallback), ttf/otf (largest), eot (legacy IE)
- **font-weight / font-style**: Maps file variants to CSS weight/style values
- **font-display**: Controls how a font loads (swap, block, fallback, optional)
- **Variable fonts**: Single file containing multiple weight/width/slant axes
- **Google Fonts API**: CDN-hosted fonts loaded via `<link>` or `@import`
- **unicode-range**: Restricts which glyphs are loaded from a font file

## 💻 Syntax

```css
/* Basic @font-face */
@font-face {
  font-family: 'MyCustomFont';
  src: url('fonts/myfont.woff2') format('woff2'),
       url('fonts/myfont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Multiple weights from separate files */
@font-face {
  font-family: 'MyCustomFont';
  src: url('fonts/myfont-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

/* Variable font */
@font-face {
  font-family: 'MyVariableFont';
  src: url('fonts/MyVariableFont.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
}

.var-font {
  font-family: 'MyVariableFont', sans-serif;
  font-weight: 350; /* Any value between 100-900 */
}

/* Using the custom font */
body {
  font-family: 'MyCustomFont', 'Georgia', serif;
}

/* Google Fonts via @import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

/* unicode-range */
@font-face {
  font-family: 'IconFont';
  src: url('icons.woff2') format('woff2');
  unicode-range: U+E000-EFFF; /* Private Use Area for icons */
}
```

## ✅ Example 1 - Basic: Loading and Using a Custom Font

**Problem**: Embed a custom serif font for headings with a system fallback.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  @font-face {
    font-family: 'Playfair';
    src: url('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Playfair';
    src: url('https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebunDXbtXK-F2qC0k.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    padding: 40px;
    background: #fafafa;
  }

  h1 {
    font-family: 'Playfair', 'Georgia', serif;
    font-weight: 700;
    font-size: 48px;
    color: #2c3e50;
  }

  h2 {
    font-family: 'Playfair', 'Georgia', serif;
    font-weight: 400;
    font-size: 28px;
    color: #34495e;
  }
</style>
</head>
<body>
  <h1>Playfair Display</h1>
  <h2>A graceful serif typeface</h2>
  <p>This paragraph uses the system Georgia font, while the headings use the loaded Playfair Display custom font with weight variants.</p>
</body>
</html>
```

**Output**: Headings render in Playfair Display (a serif font) with weight 700 for h1 and 400 for h2. The paragraph falls back to Georgia. During font load, text is displayed immediately in the fallback (swap behavior).

**Explanation**: Two `@font-face` blocks define the same `Playfair` family with different `font-weight` values. The browser selects the correct file based on the CSS `font-weight` property. `font-display: swap` shows fallback text immediately and swaps when the font loads.

## 🚀 Example 2 - Intermediate: Variable Font with Grade Axis

**Problem**: Use a variable font (Inter) loaded via Google Fonts and animate one of its axes.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet">
<style>
  body {
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #1a1a2e;
  }

  .var-demo {
    font-size: 72px;
    font-weight: 100;
    color: #e94560;
    transition: font-weight 1s ease;
    cursor: pointer;
  }

  .var-demo:hover {
    font-weight: 900;
  }

  .note {
    color: #ccc;
    text-align: center;
    font-size: 16px;
    margin-top: 20px;
  }

  .container {
    text-align: center;
  }
</style>
</head>
<body>
<div class="container">
  <div class="var-demo">Variable Font</div>
  <div class="note">Hover to transition from weight 100 → 900</div>
</div>
</body>
</html>
```

**Output**: "Variable Font" text renders at weight 100. On hover, it smoothly transitions across all intermediate weights up to 900, thanks to the variable font's continuous weight axis.

**Explanation**: The Google Fonts URL requests the variable version of Inter (`100..900`). A single `.woff2` file contains the entire weight axis. CSS `transition` on `font-weight` interpolates continuously between values (not just stepped, as with separate font files).

## 🏢 Real World Use Case
**News website with multiple typographic scales**: A digital newspaper uses two variable fonts (one for headings, one for body) loaded with `font-display: optional` for body text (to avoid layout shift) and `font-display: swap` for headings (brand importance). `unicode-range` subsets load only the Latin glyphs needed for English articles, reducing font payload by 60%.

## 🎯 Interview Questions

1. **Q**: What is the difference between `font-display: swap` and `font-display: optional`?
   **A**: `swap` shows fallback text immediately and swaps to the custom font when loaded (causing a flash). `optional` gives the font a very short blocking period; if it does not load in time, the fallback is used permanently, avoiding layout shift.

2. **Q**: What are the advantages of WOFF2 over TTF/OTF?
   **A**: WOFF2 uses Brotli compression, resulting in 30-50% smaller file sizes than WOFF and up to 70% smaller than TTF. WOFF2 is the recommended modern format.

3. **Q**: How do variable fonts improve performance?
   **A**: A single variable font file can replace multiple individual weight/style files (e.g., one file for 100-900 instead of 9 separate files), drastically reducing HTTP requests and total font payload.

4. **Q**: What does `unicode-range` do in an `@font-face` declaration?
   **A**: It tells the browser which Unicode characters the font file covers. The browser only downloads the file if the page contains characters in that range, enabling subset-based optimization.

5. **Q**: Why is the order of `src` values important?
   **A**: Browsers try each source in order and download the first supported format. List WOFF2 first, then WOFF, then TTF as fallback. This ensures the smallest format is used when supported.

## ⚠ Common Errors / Mistakes
- **Missing `format()` hints**: Without format hints, the browser may download every listed source before finding a usable one, wasting bandwidth.
- **Incorrect `font-weight` mapping**: Using `font-weight: 400` in CSS but the `@font-face` uses `font-weight: 700` and vice versa will cause the wrong file to load.
- **No `font-display` declaration**: Defaults to `auto`, which may cause invisible text (FOIT) for up to 3 seconds on slow connections.
- **Self-hosting without proper CORS**: Font files on a different domain need `Access-Control-Allow-Origin` headers or they will not load.
- **Forgetting the `&display=swap` parameter in Google Fonts URL**: Without it, Google defaults to `font-display: auto` (block), which can cause FOIT.

## 📝 Practice Exercises

### Beginner
1. Create an `@font-face` rule for a WOFF2 font named "OpenSans" with normal weight and style.
2. Apply the custom font from exercise 1 to all `h1` elements with a fallback of Arial.
3. Load the "Roboto" font from Google Fonts using a `<link>` tag with weights 400 and 700.

### Intermediate
4. Set up three `@font-face` declarations for the same family ("Merriweather") with weights 300, 400, and 700, each pointing to their respective WOFF2 files. Use `font-display: swap`.
5. Create a page that loads a variable font (e.g., "Recursive") from Google Fonts and uses a CSS animation to cycle `font-weight` from 300 to 900 and back.
6. Use `unicode-range` to load two different font files: one for Latin characters (U+0000-00FF) and one for Cyrillic (U+0400-04FF). Apply both to the same `font-family` name.

### Advanced
7. Implement a font loading strategy using the CSS Font Loading API (JavaScript) that detects when a custom font has loaded and adds a class to `html` to prevent FOIT without using `font-display`.
8. Create a performance-optimized font stack for a multilingual site (English + Arabic) using `@font-face` with proper `unicode-range`, `font-display: optional` for body text, and preload hints (`<link rel="preload">`) for the primary heading font.
