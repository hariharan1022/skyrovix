## 48. HTML SVG
## 📘 Introduction
SVG (Scalable Vector Graphics) is an XML-based vector image format for creating two-dimensional graphics. Unlike canvas, SVG is resolution-independent, scales perfectly at any size, and each element is a DOM node that can be styled with CSS and manipulated with JavaScript.

## 🧠 Key Concepts
- `<svg>` element defines an SVG drawing area with `width`, `height`, and `viewBox`
- SVG shapes: `<circle>`, `<rect>`, `<line>`, `<ellipse>`, `<polygon>`, `<polyline>`
- `<path>` draws complex curves and shapes using path commands (M, L, C, Q, A, Z)
- `<text>` renders text within SVG
- `<defs>` defines reusable elements like gradients and filters
- `<linearGradient>` and `<radialGradient>` create color transitions
- SVG is scalable — `viewBox` defines the coordinate system
- Each SVG element is a DOM object accessible via CSS and JavaScript
- SVG vs Canvas: SVG is better for scalable, interactive graphics with few elements; Canvas is better for performance-intensive animations with many pixels

## 💻 Syntax (HTML code)
```html
<svg width="200" height="200" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="blue" stroke="black" stroke-width="2"/>
    <rect x="20" y="20" width="60" height="60" fill="none" stroke="red"/>
</svg>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a scalable business logo using SVG shapes and text.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Company Logo</h2>

    <svg width="300" height="200" viewBox="0 0 300 200">
        <!-- Background circle -->
        <circle cx="150" cy="100" r="90" fill="#2c3e50"/>

        <!-- Inner triangle -->
        <polygon points="150,30 220,160 80,160"
                 fill="#e74c3c" opacity="0.9"/>

        <!-- Small circle -->
        <circle cx="150" cy="100" r="25" fill="#ecf0f1"/>

        <!-- Company name -->
        <text x="150" y="185"
              font-family="Arial"
              font-size="20"
              fill="#2c3e50"
              text-anchor="middle"
              font-weight="bold">
            SKYROVIX
        </text>
    </svg>
</body>
</html>
```

**Output:** A professional logo with a dark blue circle background, a red triangle pointing upward, a white inner circle, and "SKYROVIX" text centered below all within a scalable SVG.

**Explanation:** SVG elements are drawn in order (back to front). `circle` draws circles with `cx`, `cy`, `r`. `polygon` draws shapes from coordinate points. `text` with `text-anchor="middle"` centers text at the x coordinate.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create an SVG with gradients, paths, and styled elements.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>SVG Gradients & Paths</h2>

    <svg width="400" height="300" viewBox="0 0 400 300">
        <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#87CEEB"/>
                <stop offset="100%" stop-color="#E0F7FA"/>
            </linearGradient>

            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFD700"/>
                <stop offset="100%" stop-color="#FF8C00"/>
            </radialGradient>
        </defs>

        <!-- Sky background -->
        <rect x="0" y="0" width="400" height="300" fill="url(#skyGrad)"/>

        <!-- Sun -->
        <circle cx="320" cy="60" r="40" fill="url(#sunGrad)"/>

        <!-- Mountains using path -->
        <path d="M 0 250 L 60 120 L 120 200 L 180 90 L 240 180 L 300 100 L 400 200 L 400 300 L 0 300 Z"
              fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>

        <!-- Snow caps -->
        <path d="M 55 130 L 60 120 L 65 130 Z" fill="white"/>
        <path d="M 175 100 L 180 90 L 185 100 Z" fill="white"/>
        <path d="M 295 110 L 300 100 L 305 110 Z" fill="white"/>

        <!-- Cloud -->
        <ellipse cx="100" cy="70" rx="40" ry="20" fill="white" opacity="0.8"/>
        <ellipse cx="130" cy="60" rx="30" ry="18" fill="white" opacity="0.8"/>
        <ellipse cx="70" cy="65" rx="25" ry="15" fill="white" opacity="0.8"/>

        <!-- Styled text -->
        <text x="200" y="280"
              font-family="Verdana" font-size="18"
              fill="#333" text-anchor="middle"
              font-style="italic">
            Nature in SVG
        </text>
    </svg>
</body>
</html>
```

**Output:** A landscape scene with a linear gradient sky (light blue to pale cyan), a radial gradient sun (gold to orange), green mountains drawn with a path (with white snow caps), white clouds made of overlapping ellipses, and italic text.

**Explanation:** `<defs>` stores reusable gradients. Linear gradients transition along a line; radial gradients radiate from a center point. `<path>` uses commands: M (move), L (line), Z (close) to draw complex terrain. Overlapping shapes create composite graphics.

## 🏢 Real World Use Case
Icons and logos on websites (scale without quality loss); data visualizations and charts (D3.js uses SVG); interactive maps and diagrams; infographics; animated illustrations; responsive graphics that adapt to different screen sizes without pixelation.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What is the difference between SVG and Canvas?
   **A:** SVG is vector-based (resolution-independent, DOM-accessible, good for small numbers of objects). Canvas is pixel-based (resolution-dependent, no DOM, better for high-performance animations and games).

2. **Q:** What does the `viewBox` attribute do in SVG?
   **A:** `viewBox="minX minY width height"` defines the internal coordinate system of SVG. It scales the SVG content to fit the element's width/height, enabling responsive scaling.

3. **Q:** How do you draw a curved line in SVG?
   **A:** Use the `<path>` element with bezier curve commands: C (cubic bezier: C x1 y1, x2 y2, x y) or Q (quadratic bezier: Q x1 y1, x y).

4. **Q:** Can CSS be applied to SVG elements?
   **A:** Yes. SVG elements are DOM nodes and can be styled with CSS properties like `fill`, `stroke`, `stroke-width`, `opacity`, and animated with CSS animations or transitions.

5. **Q:** What is the purpose of `<defs>` in SVG?
   **A:** `<defs>` defines reusable elements (gradients, filters, patterns, masks) that can be referenced elsewhere in the SVG using `url(#id)`. Content inside `<defs>` is not rendered directly.

## ⚠ Common Errors / Mistakes
- Forgetting `viewBox` — SVG won't scale responsively with its container
- Using px units in `viewBox` (it should be unitless numbers)
- Not closing path commands properly (missing Z or missing coordinate pairs)
- Mixing up SVG coordinate system (0,0 is top-left, Y increases downward)
- Expecting external images linked in SVG to work without CORS (same-origin policy applies)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Draw a red circle with a blue border at position (50,50) with radius 30.
2. Create a rectangle with rounded corners using SVG `rx` and `ry` attributes.
3. Draw a simple line from (10,10) to (200,100) with stroke width 3.

**Intermediate:**
4. Create a 5-pointed star using the `<polygon>` element with proper coordinate points.
5. Build a simple bar chart using SVG rectangles with different heights and colors.
6. Draw a house SVG with a roof, walls, door, and window using rect and polygon.

**Advanced:**
7. Create a complete scalable country flag with proper proportions, stripes, and symbols (e.g., French tricolor, Japanese circle, or Indian tricolor with wheel).
8. Build an interactive SVG dashboard with gradient backgrounds, multiple data series (bars, lines, points), labels, and a legend — all scalable to any screen size.
