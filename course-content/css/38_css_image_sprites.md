## 38. CSS Image Sprites

## 📘 Introduction
An image sprite is a single image file that combines multiple smaller images (icons, buttons, flags, etc.) into one. CSS is then used to display only the portion of the sprite needed by using `background-position`. This technique reduces HTTP requests, improving page load performance.

## 🧠 Key Concepts
- **Sprite technique**: Combining multiple images into one master image file
- **`background-position`**: Offsets the background image to display the correct section of the sprite
- **Sprite sheets**: The combined image file containing all icons/states arranged in a grid
- **Combining images**: Icons, button states (normal, hover, active), flags, or other small graphics
- **Performance benefits**: Fewer HTTP requests = faster loading, especially important for HTTP/1.1
- **`background-size`**: Used when the sprite needs to be scaled (for responsive sprites)
- **Coordinates**: Each icon's position is measured from the top-left corner of the sprite

## 💻 Syntax

```css
/* Individual icon from a sprite sheet */
.icon-home {
  width: 32px;
  height: 32px;
  background: url('sprite.png') no-repeat;
  background-position: 0 0; /* first icon */
}

.icon-settings {
  width: 32px;
  height: 32px;
  background: url('sprite.png') no-repeat;
  background-position: -32px 0; /* second icon */
}

/* Hover state from sprite */
.btn-normal {
  background: url('button-sprite.png') no-repeat 0 0;
}
.btn-hover {
  background: url('button-sprite.png') no-repeat 0 -40px;
}

/* Responsive sprite using background-size */
.responsive-icon {
  width: 16px;
  height: 16px;
  background: url('sprite@2x.png') no-repeat;
  background-size: 64px 16px; /* half of original for retina */
}
```

## ✅ Example 1 - Basic (Social Media Icon Sprite)

**Problem:** Create a set of social media icons from a sprite sheet (simulated with CSS gradients) using `background-position`.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    background: #ecf0f1;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .sprite-demo {
    text-align: center;
  }
  .sprite-demo h2 {
    color: #2c3e50;
    margin-bottom: 30px;
  }

  /* Simulated sprite: we create a "sprite" background using gradients */
  /* In reality, this would be a single PNG/SVG file */
  .sprite-bg {
    /* This simulates a sprite sheet row with 4 icons: 48px each, total 192px wide */
    background-image:
      /* Facebook icon (blue) */
      linear-gradient(45deg, #3b5998 30%, #8b9dc3 100%),
      /* Twitter icon (light blue) */
      linear-gradient(45deg, #1da1f2 30%, #81d4fa 100%),
      /* Instagram icon (gradient) */
      linear-gradient(45deg, #f58529, #dd2a7b, #8134af),
      /* LinkedIn icon (blue) */
      linear-gradient(45deg, #0077b5 30%, #00a0dc 100%);
    background-repeat: no-repeat;
    background-size:
      48px 48px,
      48px 48px,
      48px 48px,
      48px 48px;
    background-position:
      0 0,
      48px 0,
      96px 0,
      144px 0;
    width: 192px;
    height: 48px;
  }

  .social-list {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    transition: transform 0.3s;
    cursor: pointer;
  }

  .social-icon:hover {
    transform: scale(1.15);
  }

  /* Each icon is a slice of the sprite */
  .social-icon.facebook {
    background: linear-gradient(45deg, #3b5998, #8b9dc3);
  }
  .social-icon.twitter {
    background: linear-gradient(45deg, #1da1f2, #81d4fa);
  }
  .social-icon.instagram {
    background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af);
  }
  .social-icon.linkedin {
    background: linear-gradient(45deg, #0077b5, #00a0dc);
  }

  .label {
    margin-top: 8px;
    font-size: 0.85em;
    color: #555;
  }

  /* Real sprite demo with background-position */
  .real-sprite-demo {
    margin-top: 50px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .sprite-sheet-visual {
    margin: 20px auto;
    display: flex;
    gap: 0;
    border: 2px dashed #ccc;
    border-radius: 6px;
    overflow: hidden;
    width: fit-content;
  }
  .sprite-cell {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    border-right: 1px solid #eee;
  }
  .sprite-cell:last-child {
    border-right: none;
  }

  .sprite-usage {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-top: 20px;
  }
  .sprite-item {
    text-align: center;
  }
  .sprite-preview {
    width: 64px;
    height: 64px;
    background: #f0f0f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
  }
</style>
</head>
<body>
  <div class="sprite-demo">
    <h2>Image Sprite Technique</h2>

    <div class="social-list">
      <div>
        <div class="social-icon facebook"></div>
        <div class="label">Facebook</div>
      </div>
      <div>
        <div class="social-icon twitter"></div>
        <div class="label">Twitter</div>
      </div>
      <div>
        <div class="social-icon instagram"></div>
        <div class="label">Instagram</div>
      </div>
      <div>
        <div class="social-icon linkedin"></div>
        <div class="label">LinkedIn</div>
      </div>
    </div>

    <div class="real-sprite-demo">
      <h3>How Sprites Work</h3>
      <p style="color: #666; margin-bottom: 15px;">A sprite sheet combines icons into one file. Each icon is shown by adjusting <code>background-position</code>.</p>

      <!-- Simulated sprite sheet -->
      <div class="sprite-sheet-visual">
        <div class="sprite-cell">🏠</div>
        <div class="sprite-cell">⚙️</div>
        <div class="sprite-cell">👤</div>
        <div class="sprite-cell">🔍</div>
      </div>
      <p style="color: #999; font-size: 0.85em;">↑ Sprite sheet with 4 icons (64px × 64px each) ↑</p>

      <div class="sprite-usage">
        <div class="sprite-item">
          <div class="sprite-preview">🏠</div>
          <div><code>position: 0 0</code></div>
        </div>
        <div class="sprite-item">
          <div class="sprite-preview">⚙️</div>
          <div><code>position: -64px 0</code></div>
        </div>
        <div class="sprite-item">
          <div class="sprite-preview">👤</div>
          <div><code>position: -128px 0</code></div>
        </div>
        <div class="sprite-item">
          <div class="sprite-preview">🔍</div>
          <div><code>position: -192px 0</code></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

**Output:** A demo showing social media icons and a visual explanation of the sprite technique with background-position offsets.

**Explanation:** The sprite sheet visual shows 4 icons in one row. To display the second icon (gear), you set `background-position: -64px 0` — which shifts the background 64px left, hiding the first icon and showing the second. The element's `width` and `height` (64px) act as a viewport into the larger sprite.

## 🚀 Example 2 - Intermediate (Button States with Sprite)

**Problem:** Create a button that uses a sprite sheet for its normal, hover, and active states — demonstrating the performance benefit of combining three images into one.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Arial;
    background: #f0f0f0;
    padding: 50px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  .demo {
    text-align: center;
    max-width: 700px;
  }
  .demo h2 {
    color: #2c3e50;
    margin-bottom: 10px;
  }
  .demo > p {
    color: #666;
    margin-bottom: 40px;
  }

  /* Simulated sprite: a single background with 3 vertical states */
  /* In production, this would be a combined PNG like button-sprite.png */
  .sprite-btn {
    display: inline-block;
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    color: white;
    text-decoration: none;
    line-height: 50px;
    text-align: center;

    /* Simulated sprite: we use a gradient as stand-in */
    /* Normally: background: url('button-sprite.png') no-repeat 0 0; */
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: none; /* no transition for sprite jump */
    position: relative;
  }

  /* For the demo, we'll simulate sprite states with pure CSS */
  /* In reality with a sprite: background: url('sprite.png') no-repeat 0 -50px; */
  .sprite-btn:hover {
    background: linear-gradient(135deg, #5a6fd6, #6a3f9a);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }

  .sprite-btn:active {
    background: linear-gradient(135deg, #4a5fc6, #5a2f8a);
    transform: translateY(0);
    box-shadow: none;
  }

  /* Comparison: non-sprite button loads 3 separate images (simulated) */
  .comparison {
    margin-top: 50px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: left;
  }

  .comparison h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    text-align: center;
  }

  .method {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 8px;
    background: #f8f9fa;
  }

  .method.good {
    border-left: 4px solid #2ecc71;
  }
  .method.bad {
    border-left: 4px solid #e74c3c;
  }

  .method .icon {
    font-size: 2em;
    flex-shrink: 0;
  }

  .method h4 {
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .method p {
    color: #666;
    font-size: 0.9em;
    line-height: 1.6;
  }

  .method code {
    background: #ecf0f1;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.85em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 0.9em;
  }
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    background: #2c3e50;
    color: white;
  }
  tr:nth-child(even) {
    background: #f8f9fa;
  }
</style>
</head>
<body>
  <div class="demo">
    <h2>CSS Image Sprites</h2>
    <p>Buttons with normal, hover, and active states using the sprite technique.</p>

    <!-- The "sprite" button -->
    <a href="#" class="sprite-btn">Submit Now</a>

    <p style="margin-top: 20px; color: #888; font-size: 0.85em;">
      This button loads ONE combined image instead of three separate state images.
    </p>

    <div class="comparison">
      <h3>Sprite vs Individual Images</h3>

      <div class="method good">
        <div class="icon">✅</div>
        <div>
          <h4>With Sprites (Recommended)</h4>
          <p>One HTTP request for <code>button-sprite.png</code> containing all states.<br>
          CSS uses <code>background-position</code> to show each state.<br>
          <strong>Request saved:</strong> 2 fewer HTTP requests.</p>
        </div>
      </div>

      <div class="method bad">
        <div class="icon">❌</div>
        <div>
          <h4>Without Sprites (Inefficient)</h4>
          <p>Three separate images: <code>btn-normal.png</code>, <code>btn-hover.png</code>, <code>btn-active.png</code>.<br>
          Three HTTP requests — each adds latency.<br>
          <strong>Impact:</strong> Slower page load, especially on HTTP/1.1.</p>
        </div>
      </div>

      <h3 style="margin-top: 25px;">Performance Comparison</h3>
      <table>
        <tr>
          <th>Metric</th>
          <th>Individual Images</th>
          <th>Sprite Sheet</th>
        </tr>
        <tr>
          <td>HTTP Requests</td>
          <td>10 (for 10 icons)</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Total File Size</td>
          <td>~15 KB (combined)</td>
          <td>~12 KB (one file, less overhead)</td>
        </tr>
        <tr>
          <td>Page Load (HTTP/1.1)</td>
          <td>Slower (connection overhead)</td>
          <td>Faster (single request)</td>
        </tr>
        <tr>
          <td>Maintenance</td>
          <td>Replace individual files</td>
          <td>Regenerate sprite sheet</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
```

**Output:** A styled button with hover and active states, plus a comparison table showing the performance benefits of sprites.

**Explanation:** The button simulates sprite behavior with CSS gradients. In production, `background: url('button-sprite.png') no-repeat 0 0` for normal, `0 -50px` for hover, `0 -100px` for active — each state shifts the background to show a different row of the sprite. The comparison table highlights the HTTP request savings.

## 🏢 Real World Use Case
Icon sets on large websites (social media icons, UI icons), button state sprites (normal/hover/active/pressed), flag icons for language selectors, game asset spritesheets, and emoticon/emoji sets. Major sites like Amazon, Facebook, and Google use sprites extensively for their UI icons.

## 🎯 Interview Questions

1. **What is an image sprite and why is it used?**
   *An image sprite combines multiple images into a single file. CSS uses `background-position` to display the correct portion. It reduces HTTP requests, improving page load speed — especially important for HTTP/1.1 where each request has overhead.*

2. **How does `background-position` work with sprites?**
   *`background-position` shifts the background image so the desired portion appears in the element's "viewport." Negative X and Y values move the sprite left/up, hiding parts outside the element. For example, `-32px 0` shifts 32px left.*

3. **What are the downsides of using image sprites?**
   *Sprites can be harder to maintain (regenerating the combined image), less convenient for high-DPI (retina) displays without `background-size` adjustments, and less efficient for very large images. CSS-in-JS and icon font/SVG solutions have reduced sprite usage.*

4. **How do you handle retina screens with sprites?**
   *Create a sprite at 2x resolution and use `background-size` to scale it down. For example, if icons are 32×32 but the sprite is 64×64, set `background-size: 32px 32px` (or a percentage) to display at the correct size on retina displays.*

5. **When would you use sprites vs icon fonts vs SVGs?**
   *Sprites: best for complex raster images or when precise pixel control is needed. Icon fonts: scalable, easy to color, but limited to vector shapes. SVGs: scalable, accessible, animatable, but require more markup. Modern preference is SVG sprites (inline `<svg>` or SVG sprite sheets).*

## ⚠ Common Errors / Mistakes

- **Incorrect background-position coordinates**: A common off-by-one error where the position shows part of the adjacent icon instead of the target
- **Forgetting to set `width` and `height` on the element**: Without explicit dimensions, the element shows the entire sprite rather than a single icon
- **Not using `background-repeat: no-repeat`**: The sprite repeats by default, showing multiple icons instead of one
- **Using sprites for large images**: Sprites are best for small UI elements, not large photos or complex graphics
- **Failing to account for spacing between icons**: If icons in the sprite have no padding, adjacent icons may bleed through; include 1–2px transparent borders between icons in the sprite

## 📝 Practice Exercises

### Beginner
1. Create a simple sprite sheet concept with 3 colored squares (50×50 each) arranged horizontally. Use `background-position` to display each square individually.
2. Create 3 HTML elements (divs) and use the same "sprite" background on all, adjusting `background-position` to show a different square in each.
3. Add `background-repeat: no-repeat` and explicit width/height to ensure only one icon is visible at a time.

### Intermediate
4. Build a button that uses a sprite with 3 states (normal, hover, active) arranged vertically in a single background image. Use `background-position` to switch states.
5. Create a social media icon bar using a single sprite image (or simulated gradients) with 5 icons. Each icon should have a hover effect that changes its background-position to show a colored version.
6. Build a responsive sprite icon that works on retina displays: use `background-size` to scale a 2x sprite down to 1x display size.

### Advanced
7. Create a complete navigation icon set using a single sprite sheet with both normal and hover states (e.g., 10 icons = 20 icon states in one file). Each nav item shows the normal icon and displays the hover icon on hover — all from the same sprite.
8. Build an animated sprite (flip-book animation) using `@keyframes` and `background-position`: a character walking animation where each frame is a cell in a sprite sheet, cycling through frames using `steps()` in the animation timing function.
