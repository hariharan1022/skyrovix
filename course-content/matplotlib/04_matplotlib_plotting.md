## 4. Matplotlib Plotting

## 📘 Introduction

Customizing line styles, colors, and markers is essential for creating clear, publication-quality plots. Matplotlib offers extensive control over how lines are drawn: solid/dashed/dotted lines, named/hex/RGB colors, marker shapes, and multiple lines on shared axes.

## 🧠 Key Concepts

- **Linestyle**: `'-'` (solid), `'--'` (dashed), `':'` (dotted), `'-.'` (dash-dot).
- **Colors**: Named (`'red'`), hex (`'#ff0000'`), RGB tuple (`(1.0, 0.0, 0.0)`), shorthand (`'r'`).
- **Markers**: `'o'` (circle), `'s'` (square), `'^'` (triangle up), `'D'` (diamond), `'*'` (star), `'.'` (point).
- **Linewidth** (`lw`): Thickness of the line.
- **Markersize** (`ms`): Size of the marker.
- **Multiple lines**: Call `plt.plot()` repeatedly on the same axes.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

# Line styles
plt.plot(x, y, linestyle='--', color='red', linewidth=2)

# Shorthand fmt string: [color][marker][line]
plt.plot(x, y, 'ro--')  # red circles with dashed line

# Markers
plt.plot(x, y, marker='o', markersize=8, markerfacecolor='blue')

# Multiple lines
plt.plot(x, y1, label='Line 1')
plt.plot(x, y2, label='Line 2')
plt.legend()
```

## ✅ Example 1 - Basic: Visualizing Different Line Styles

**Problem:** Plot four sine waves with different line styles on the same axes.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)

plt.plot(x, np.sin(x), linestyle='-', color='red', linewidth=2, label='solid')
plt.plot(x, np.sin(x + 0.5), linestyle='--', color='blue', linewidth=2, label='dashed')
plt.plot(x, np.sin(x + 1.0), linestyle=':', color='green', linewidth=2, label='dotted')
plt.plot(x, np.sin(x + 1.5), linestyle='-.', color='orange', linewidth=2, label='dashdot')

plt.xlabel('x')
plt.ylabel('sin(x + phi)')
plt.title('Line Styles')
plt.legend()
plt.grid(True)
plt.show()
```

**Output Description:** Four overlapping sine waves, each with a different line style and color. The legend clearly identifies each.

**Explanation:** Each call to `plt.plot()` adds a line to the same axes. `linestyle`, `color`, and `linewidth` differentiate the curves. `label` feeds into `plt.legend()`.

## 🚀 Example 2 - Intermediate: Custom Markers and Colors

**Problem:** Plot a quadratic curve with circle markers every 5th point, and a cubic curve with square markers, using hex colors.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 50)

y1 = x**2
y2 = x**3 / 10

plt.plot(x, y1, color='#e74c3c', marker='o', markersize=6,
         markerfacecolor='#c0392b', markevery=5, linewidth=1.5, label='x²')

plt.plot(x, y2, color='#2ecc71', marker='s', markersize=6,
         markerfacecolor='#27ae60', markevery=5, linewidth=1.5, label='x³/10')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Markers and Hex Colors')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** Two curves on one axes. The quadratic (red) has circle markers; the cubic (green) has square markers. Markers appear every 5th point.

**Explanation:** `markevery=5` shows only every 5th marker to avoid clutter. Hex colors give precise control. `linewidth` is set to 1.5 for visibility.

## 🏢 Real World Use Case

**Sensor data visualization:** An IoT engineer plots temperature, humidity, and pressure from 3 sensors over 24 hours on the same axes using different colors (red=temp, blue=humidity, green=pressure) with distinct line styles (solid=actual, dashed=predicted).

## 🎯 Interview Questions

**1. How do you plot multiple lines on the same axes?**
- Call `plt.plot()` multiple times (or `ax.plot()` in OOP) before calling `plt.show()`. Each call adds a new line to the current axes.

**2. What is the `fmt` string in `plt.plot(x, y, 'ro--')`?**
- It's a compact format: `[color][marker][line]`. `'ro--'` means red color, circle marker, dashed line.

**3. How do you set a partially transparent line?**
- Use the `alpha` parameter (0 to 1), e.g. `plt.plot(x, y, alpha=0.5)`.

**4. What does `markevery` do?**
- It controls which markers are rendered — you can pass an integer (every N points), a list of indices, or a slice. Useful for dense data.

**5. Can you use RGB tuples as colors?**
- Yes: `color=(0.1, 0.5, 0.9)` where each value is in [0, 1]. Also supports RGBA: `(0.1, 0.5, 0.9, 0.8)` for alpha.

## ⚠ Common Errors / Mistakes

- **Using `linewidth` as `width`** – Parameter is `linewidth` (or `lw`), not `width`.
- **Mixing up `marker` and `markevery`** – `marker` sets the shape; `markevery` sets frequency.
- **Omitting `label` and then calling `legend()`** – Nothing appears in the legend.
- **Plotting too many lines without distinct colors** – Use a colormap or cycle through colors explicitly.
- **Forgetting `plt.show()`** – Interactive: nothing appears. Scripting: no output.

## 📝 Practice Exercises

**Beginner**
1. Plot `y = x` (solid red) and `y = 2x` (dashed blue) from x=0 to 10 on the same axes. Add a legend.
2. Create a plot of `y = x^2` with green color, linewidth 3, and diamond markers every 2nd point.
3. Use the shorthand `fmt` string to plot `y = sqrt(x)` as yellow circles connected by a dotted line.

**Intermediate**
4. Plot three trigonometric functions (`sin`, `cos`, `sin+cos`) with three different line styles, three different hex colors, and circle/square/triangle markers respectively. Use `markevery` so markers appear at x = 0, π/2, π, 3π/2, 2π.
5. Create a "z-order" demonstration: plot a thick black line (lw=8) and a thin red line (lw=1) that crosses it. Use `zorder` to control which appears on top.
6. Generate a plot with 5 lines representing y = x^n for n = 1..5, using a colormap (`plt.cm.viridis`) to assign colors. Add a colorbar as a legend.

**Advanced**
7. Create a plot with twin x-axes (`twiny()`) and twin y-axes (`twinx()`), each with a different line style and color. Plot a quadratic on primary axes and a sine wave on secondary axes.
8. Build a function `style_demo(linestyles, colors, markers)` that accepts lists of each and plots 9 combinations in a 3×3 grid, with each subplot annotated with the style parameters used.
