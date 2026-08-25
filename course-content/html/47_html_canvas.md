## 47. HTML Canvas
## 📘 Introduction
The `<canvas>` element provides a resolution-dependent bitmap area for drawing graphics, animations, and images on the fly using JavaScript. With its 2D rendering context (`getContext("2d")`), developers can draw shapes, text, gradients, and perform pixel-level manipulation for games, data visualization, and dynamic graphics.

## 🧠 Key Concepts
- `<canvas>` is a container with width/height that JavaScript draws into
- `getContext("2d")` returns a 2D rendering context object
- Drawing shapes: rectangles (`fillRect`, `strokeRect`, `clearRect`), paths (arc, lineTo, bezierCurveTo)
- Fill fills shapes with color; stroke draws outlines
- Colors: `fillStyle`, `strokeStyle` accept color names, hex, RGB, RGBA
- Text: `fillText`, `strokeText` with `font` property
- Pixel manipulation: `getImageData`, `putImageData`, `createImageData`
- Canvas is pixel-based — graphics do not scale cleanly

## 💻 Syntax (HTML code)
```html
<canvas id="myCanvas" width="400" height="300">
    Your browser does not support the canvas element.
</canvas>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    // Drawing code here
</script>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Draw a simple house shape using rectangles and triangles.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Simple House</h2>
    <canvas id="houseCanvas" width="300" height="250">
        Browser does not support canvas.
    </canvas>
    <script>
        const canvas = document.getElementById('houseCanvas');
        const ctx = canvas.getContext('2d');

        // Walls
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(50, 100, 200, 120);

        // Roof (triangle)
        ctx.fillStyle = '#A52A2A';
        ctx.beginPath();
        ctx.moveTo(30, 100);
        ctx.lineTo(150, 30);
        ctx.lineTo(270, 100);
        ctx.closePath();
        ctx.fill();

        // Door
        ctx.fillStyle = '#654321';
        ctx.fillRect(130, 160, 40, 60);

        // Window
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(70, 130, 40, 40);
        ctx.fillRect(190, 130, 40, 40);

        // Text
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        ctx.fillText('Dream Home', 100, 230);
    </script>
</body>
</html>
```

**Output:** A brown house with a dark red triangular roof, a centered door, two blue windows, and the text "Dream Home" below it.

**Explanation:** `fillRect` draws filled rectangles. `beginPath`, `moveTo`, `lineTo`, and `closePath` create the triangular roof. `fillStyle` sets colors. `fillText` adds text. Coordinates are relative to the canvas top-left corner.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create an animated bouncing ball with color cycling.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Bouncing Ball</h2>
    <canvas id="ballCanvas" width="400" height="300">
        Browser does not support canvas.
    </canvas>
    <script>
        const canvas = document.getElementById('ballCanvas');
        const ctx = canvas.getContext('2d');

        let x = 200, y = 150;
        let dx = 3, dy = 3;
        const radius = 20;
        let hue = 0;

        function drawBall() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient ball
            const gradient = ctx.createRadialGradient(x-5, y-5, 5, x, y, radius);
            gradient.addColorStop(0, `hsl(${hue}, 100%, 70%)`);
            gradient.addColorStop(1, `hsl(${hue}, 100%, 40%)`);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Bounce off walls
            if (x + radius > canvas.width || x - radius < 0) dx = -dx;
            if (y + radius > canvas.height || y - radius < 0) dy = -dy;

            x += dx;
            y += dy;
            hue = (hue + 2) % 360;

            requestAnimationFrame(drawBall);
        }

        drawBall();
    </script>
</body>
</html>
```

**Output:** A colorful ball bounces off the canvas edges. The ball has a 3D gradient effect and cycles through rainbow colors as it moves.

**Explanation:** `requestAnimationFrame` creates smooth animation. `arc()` draws circles. `createRadialGradient` adds 3D shading. `clearRect` refreshes each frame. Collision detection reverses direction (`dx = -dx`) on boundary contact.

## 🏢 Real World Use Case
Data visualization libraries (Chart.js, D3.js) use canvas for charts; online games (Canvas-based 2D games); photo editors with pixel manipulation (filters, cropping); signature capture on checkout pages; interactive infographics and dashboards.

## 🎯 Interview Questions (5 with answers)
1. **Q:** How do you get the 2D rendering context for a canvas element?
   **A:** Use `canvas.getContext('2d')`. This returns a `CanvasRenderingContext2D` object with all drawing methods.

2. **Q:** What is the difference between `fillRect` and `strokeRect`?
   **A:** `fillRect(x, y, w, h)` draws a filled rectangle using the current `fillStyle`. `strokeRect(x, y, w, h)` draws only the outline using the current `strokeStyle`.

3. **Q:** How do you draw a circle on canvas?
   **A:** Use `ctx.arc(x, y, radius, 0, Math.PI * 2)` within a `beginPath()`/`closePath()` block, then call `fill()` or `stroke()`.

4. **Q:** What does `clearRect` do?
   **A:** `clearRect(x, y, w, h)` clears the specified rectangular area, making it fully transparent. It's commonly used to erase the canvas before redrawing each animation frame.

5. **Q:** How can you manipulate individual pixels on canvas?
   **A:** Use `ctx.getImageData(x, y, w, h)` to get pixel data as an array of RGBA values, modify the array, then `ctx.putImageData(imageData, x, y)` to write it back.

## ⚠ Common Errors / Mistakes
- Drawing before the DOM is fully loaded (use script at bottom or DOMContentLoaded)
- Forgetting to set `fillStyle` or `strokeStyle` before drawing (defaults to black)
- Not closing paths with `closePath()` or `beginPath()` — lines connect unexpectedly
- Assuming canvas graphics scale (canvas is resolution-dependent; use `width`/`height` attributes)
- Setting canvas CSS size without matching the width/height attributes (distorts rendering)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Draw a red rectangle at position (10, 10) with width 200 and height 100.
2. Draw a blue circle with radius 50 at the center of a 300x300 canvas.
3. Draw "Hello Canvas" text in 24px Arial at position (50, 50).

**Intermediate:**
4. Draw a national flag using canvas rectangles and shapes (choose any flag with simple geometry).
5. Create a simple bar chart with 5 bars of varying heights with different colors.
6. Draw a clock face with hour markers (12 lines around a circle) and clock hands.

**Advanced:**
7. Build a simple drawing app where users can click and drag to draw freeform lines on canvas (track mouse events, use `lineTo` to draw paths).
8. Create an interactive analog clock that updates in real time showing hours, minutes, and seconds with smooth second-hand movement.
