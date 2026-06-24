## 6. Matplotlib Line

## 📘 Introduction

Lines are the fundamental graphical element in Matplotlib. You have precise control over linestyle (solid, dashed, dotted, dash-dot), linewidth, color, transparency (alpha), custom dash patterns, and gradient-colored lines.

## 🧠 Key Concepts

- **Linestyle (`ls`)**: `'-'` solid, `'--'` dashed, `'-.'` dash-dot, `':'` dotted.
- **Linewidth (`lw`)**: Float — thickness of the line in points.
- **Color (`c` or `color`)**: Named, hex, RGB, or shorthand.
- **Alpha**: Transparency (0 = invisible, 1 = opaque).
- **Gradient lines**: Achieved by coloring segments using a colormap.
- **Multiple lines**: Plot multiple series on the same axes.
- **Custom dash sequences**: `(offset, (on_off_seq))` for `dashes`.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

# Basic line styles
plt.plot(x, y, linestyle='--', linewidth=2, color='red', alpha=0.7)

# Custom dashes
plt.plot(x, y, dashes=[5, 2, 10, 2])  # 5pt on, 2pt off, 10pt on, 2pt off

# Multiple lines
plt.plot(x, y1, label='sin')
plt.plot(x, y2, label='cos')
plt.legend()
```

## ✅ Example 1 - Basic: Line Style and Width Comparison

**Problem:** Create a plot showing all four basic line styles at different widths.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 5, 50)

styles = [('-', 'solid'), ('--', 'dashed'), ('-.', 'dashdot'), (':', 'dotted')]
widths = [1, 2, 3, 4]

plt.figure(figsize=(10, 6))

for i, ((style, name), w) in enumerate(zip(styles, widths)):
    y = (i + 1) * np.ones_like(x)
    plt.plot(x, y, linestyle=style, linewidth=w, label=f'{name} (lw={w})')

plt.ylim(0, 5.5)
plt.xlabel('x')
plt.ylabel('y')
plt.title('Line Styles and Widths')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** Four horizontal lines at y=1,2,3,4. From bottom: solid (lw=1), dashed (lw=2), dashdot (lw=3), dotted (lw=4).

**Explanation:** Each row uses a different `linestyle` and `linewidth`. The legend shows the mapping. Higher `linewidth` values produce thicker, more visible lines.

## 🚀 Example 2 - Intermediate: Gradient Line and Custom Dashes

**Problem:** Draw a sine wave with a gradient color (blue to red) and a cosine wave with a custom dash pattern.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 4 * np.pi, 500)
y_sin = np.sin(x)
y_cos = np.cos(x)

# Gradient line for sine — segment coloring
points = np.array([x, y_sin]).T.reshape(-1, 1, 2)
segments = np.concatenate([points[:-1], points[1:]], axis=1)

from matplotlib.collections import LineCollection
from matplotlib.colors import LinearSegmentedColormap

norm = plt.Normalize(0, 4 * np.pi)
lc = LineCollection(segments, cmap='coolwarm', norm=norm)
lc.set_array(x)
lc.set_linewidth(3)

fig, ax = plt.subplots(figsize=(10, 5))
ax.add_collection(lc)

# Cosine with custom dashes
ax.plot(x, y_cos, linestyle='--', linewidth=2, color='gray',
        dashes=[10, 5, 2, 5], label='cos (custom dash)')

ax.set_xlim(0, 4 * np.pi)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Gradient Line & Custom Dash Pattern')
ax.legend()
ax.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** A sine wave transitioning from blue to red across its length (gradient). A cosine wave overlaid with gray dashes following a custom on/off pattern.

**Explanation:** `LineCollection` draws multi-colored segments. `dashes` accepts a tuple `(offset, (on1, off1, on2, off2, ...))` for custom dash patterns.

## 🏢 Real World Use Case

**EEG signal visualization:** A neuroscientist plots 32 EEG channels over time. Each channel gets a distinct color, a transparency alpha of 0.8 (for overlapping signals), and a thin linewidth (0.5) to avoid visual clutter while still showing fine temporal details.

## 🎯 Interview Questions

**1. How do you create a completely invisible line?**
- Set `alpha=0` or `linewidth=0`. Only markers would be visible if specified.

**2. What is the purpose of the `dashes` parameter?**
- It overrides the standard linestyle with a custom on/off dash pattern: `(offset, (on_length, off_length, ...))`. The offset shifts the start of the pattern.

**3. Can you use a gradient color along a single line?**
- Yes, by splitting the line into segments and using `LineCollection` with a colormap. Standard `plot()` applies one color per line.

**4. What does `alpha` do?**
- Controls transparency. `alpha=0.5` makes the line 50% transparent. Useful when multiple lines overlap.

**5. How do you remove the line but keep markers?**
- Set `linestyle=''` or `ls=''` or `linestyle='None'`. Markers will still appear.

## ⚠ Common Errors / Mistakes

- **Setting `linewidth` with a non-numeric string** – Must be a number (int or float).
- **Using `LineCollection` without setting axis limits** – The plot may show nothing because limits default to (0,1).
- **Confusing `dashes` with `linestyle`** – They serve the same purpose; `dashes` gives custom control while `linestyle` selects presets.
- **Plotting too many lines without distinguishing colors** – Use cyclers or colormaps.
- **Alpha too low** – Line becomes nearly invisible.

## 📝 Practice Exercises

**Beginner**
1. Plot a dashed red line (lw=2) and a dotted blue line (lw=3) on the same axes.
2. Create a line plot with `alpha=0.3` and explain how it would look when 3 similar lines overlap.
3. Plot `y = x^2` with a green line of width 5, then overlay the same data with a black line of width 1. Describe the visual effect.

**Intermediate**
4. Create a custom dash pattern for a sine wave: 8 points on, 4 off, 2 on, 4 off, repeated. Use `dashes=[0, (8, 4, 2, 4)]`.
5. Plot 5 lines (y = sin(x + phi) for phi = 0, π/4, π/2, 3π/4, π) each with a different alpha from 0.2 to 1.0. Add a colorbar to show alpha mapping.
6. Use `LineCollection` to draw a parabola (y = x^2) with a gradient from green to purple. Ensure the line is thick (lw=5).

**Advanced**
7. Implement a "transparency cascade": plot 100 lines of `y = sin(x + i*0.1)` for i=0..99 where each line has progressively lower alpha (from 1.0 to 0.01). The result should look like a filled band.
8. Create a custom `dashes` generator function that accepts a pattern string like `".-.-..--"` and converts `.`=short draw, `-`=long draw, ` `=space into a valid dashes tuple for Matplotlib. Test it on a line plot.
