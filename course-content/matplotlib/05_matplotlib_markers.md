## 5. Matplotlib Markers

## 📘 Introduction

Markers highlight individual data points on a plot. Matplotlib provides a wide variety of marker styles — from simple dots to stars, diamonds, arrows, and vertical/horizontal lines. You can control size, edge color, face color, and even create custom markers.

## 🧠 Key Concepts

- **Marker symbols**: `'.'` (point), `','` (pixel), `'o'` (circle), `'v'` (triangle down), `'^'` (triangle up), `'<'` (triangle left), `'>'` (triangle right), `'s'` (square), `'p'` (pentagon), `'*'` (star), `'h'` (hexagon1), `'H'` (hexagon2), `'D'` (diamond), `'d'` (thin diamond), `'|'` (vline), `'_'` (hline).
- **`markersize` / `ms`**: Size of the marker.
- **`markeredgecolor` / `mec`**: Color of the marker edge.
- **`markerfacecolor` / `mfc`**: Color of the marker interior.
- **`markevery`**: Plot marker on every N-th point.
- **Custom markers**: Using `matplotlib.markers.MarkerStyle` or a path.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

# Basic marker
plt.plot([1, 2, 3], [4, 5, 6], marker='o')

# Marker with size, edge, and face color
plt.plot([1, 2, 3], [4, 5, 6],
         marker='s',
         markersize=10,
         markeredgecolor='red',
         markerfacecolor='yellow')

# Markevery
plt.plot(x, y, marker='D', markevery=5)

# Custom marker
from matplotlib.markers import MarkerStyle
custom = MarkerStyle('o')
custom._transform.scale(2, 1)  # scale ellipse
plt.plot(x, y, marker=custom)
```

## ✅ Example 1 - Basic: Marker Style Comparison

**Problem:** Display 10 different marker styles on a single plot for comparison.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

markers = ['.', ',', 'o', 'v', '^', '<', '>', 's', 'p', '*', 'h', 'H', 'D', 'd', '|', '_']
x = np.arange(len(markers))
y = np.ones(len(markers))

plt.figure(figsize=(12, 4))
for i, m in enumerate(markers):
    plt.plot(x[i], y[i], marker=m, markersize=15, label=f"'{m}'")

plt.ylim(0.5, 1.5)
plt.title('Common Marker Styles')
plt.legend(ncol=4, fontsize=9)
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** A horizontal row of 16 different marker symbols, each labeled with its marker string code.

**Explanation:** Each marker is plotted at a distinct x position. `markersize=15` makes them clearly visible. The legend maps each marker code to its visual.

## 🚀 Example 2 - Intermediate: Marker Face/Edge Customization

**Problem:** Create a scatter-like plot with large circle markers, custom face and edge colors, and varying sizes.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.rand(20) * 10
y = np.random.rand(20) * 10
sizes = np.random.randint(50, 400, 20)

plt.figure(figsize=(8, 6))

for i in range(len(x)):
    plt.plot(x[i], y[i], marker='o', markersize=np.sqrt(sizes[i]),
             markeredgecolor='navy', markerfacecolor='tomato',
             markeredgewidth=2, alpha=0.7)
    plt.text(x[i]+0.2, y[i]+0.2, f'{sizes[i]}', fontsize=8)

plt.xlabel('X')
plt.ylabel('Y')
plt.title('Custom Marker Face & Edge Colors')
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** 20 tomato-red circles with navy edges scattered across the plot. Each has a different size (indicated by a text label) and partial transparency.

**Explanation:** Looping allows per-point customization. `markersize` uses sqrt of area for proportional scaling. `markeredgewidth` controls border thickness.

## 🏢 Real World Use Case

**Geospatial data visualization:** An urban planner plots city locations on a map where marker size represents population, marker color represents density, and marker edge color distinguishes residential vs commercial zones.

## 🎯 Interview Questions

**1. What is the difference between `markerfacecolor` and `markeredgecolor`?**
- `mfc` fills the interior of the marker; `mec` colors its outline/border.

**2. How do you make markers appear only on every 10th data point?**
- Use `markevery=10` in the `plot()` call. This is essential for dense data where plotting every marker would cause clutter.

**3. What does the pixel marker `','` look like?**
- A single pixel — smaller than the dot `'.'`. Useful for very dense scatter-like plots without overlap.

**4. Can you use a Unicode character as a marker?**
- Not directly via `marker`, but you can use `plt.text()` with a character and `ha='center', va='center'` to achieve the same visual.

**5. How do you create a custom marker from an arbitrary shape?**
- Use `matplotlib.path.Path` to define vertices and codes, then pass the path as the `marker` parameter.

## ⚠ Common Errors / Mistakes

- **Setting `markersize` too large** – Overlaps with neighboring points and obscures data.
- **Forgetting `markevery` on dense data** – Markers blob together and the plot becomes unreadable.
- **Using `marker` with `scatter()` in `plot()` style** – `plt.scatter()` uses `s` (size), `c` (color), not `markersize`/`markerfacecolor`.
- **Applying marker params to `plot()` without setting `marker`** – Marker parameters are ignored if no marker is specified.
- **Mixing `marker` and `fmt` string conflicts** – `'ro'` sets both color and marker; adding `marker='s'` later may produce unexpected results.

## 📝 Practice Exercises

**Beginner**
1. Plot 5 points with star (`'*'`) markers, size 12, red color.
2. Create a plot of `y = x^2` with diamond markers every 3rd point, blue edge, yellow face.
3. Use the `','` (pixel) marker to plot 200 random points with `plt.plot()`.

**Intermediate**
4. Create a plot that uses 6 different marker styles (circle, square, triangle-up, diamond, pentagon, star) on the same axes, each representing a different data series. Add a legend.
5. Generate a plot where marker size encodes the absolute value of y, marker edge color encodes positive/negative (green/red), and all markers are circles. Use `y = sin(x)` with x from 0 to 4π.
6. Use `markevery` with a list of explicit indices: `[0, 5, 10, 15, 20]` to selectively place star markers on a line plot of 100 data points.

**Advanced**
7. Create a custom marker using `matplotlib.path.Path` in the shape of a 4-pointed star. Use it to plot 10 random points with varying sizes and edge colors.
8. Build a function `marker_grid(markers, ncols)` that takes a list of marker strings and plots them in a grid layout, with each marker shown at 3 different sizes (small, medium, large) in different colors. Add a title identifying each marker code.
