## 8. Matplotlib Grid

## 📘 Introduction

Gridlines improve the readability of plots by providing reference lines aligned with tick marks. Matplotlib lets you control which axis shows gridlines, their style, color, width, transparency, and even custom grid intervals using tick locators.

## 🧠 Key Concepts

- **`plt.grid(True/False)`**: Toggle grid on/off.
- **`axis` parameter**: `'both'` (default), `'x'`, or `'y'` — which axes get gridlines.
- **Linestyle, linewidth, color, alpha**: Same styling parameters as lines.
- **`which` parameter**: `'major'` (default), `'minor'`, or `'both'` — which ticks get gridlines.
- **`MultipleLocator`**: Set custom grid intervals.
- **`zorder`**: Grid z-order (default is below plot lines).

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))

# Basic grid
plt.grid(True)

# Styled grid
plt.grid(True, axis='y', linestyle='--', linewidth=0.5, color='gray', alpha=0.7)

# Custom grid interval
from matplotlib.ticker import MultipleLocator
ax = plt.gca()
ax.xaxis.set_major_locator(MultipleLocator(2))
ax.yaxis.set_major_locator(MultipleLocator(0.5))
plt.grid(True)
```

## ✅ Example 1 - Basic: Styled Grid on Specific Axis

**Problem:** Plot a sine wave with subtle gridlines only on the y-axis.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 4 * np.pi, 200)
y = np.sin(x)

plt.plot(x, y, linewidth=2)
plt.grid(True, axis='y', linestyle=':', linewidth=0.7, color='gray', alpha=0.5)
plt.grid(True, axis='x', linestyle='-', linewidth=0.3, color='lightgray', alpha=0.3)

plt.xlabel('x')
plt.ylabel('sin(x)')
plt.title('Dual Grid: Dotted Y, Light Solid X')
plt.show()
```

**Output Description:** A sine wave with gray dotted horizontal gridlines (more visible) and very light solid vertical gridlines (subtle). The main focus stays on the data.

**Explanation:** Calling `grid()` twice with different `axis` values allows different styles per axis. Dotted lines on y reduce visual weight while still aiding readability.

## 🚀 Example 2 - Intermediate: Custom Grid Intervals with MultipleLocator

**Problem:** Plot a quadratic with major grid every 1 unit and minor grid every 0.25 units.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import MultipleLocator

x = np.linspace(0, 5, 100)
y = x**2

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, linewidth=2)

# Major grid
ax.xaxis.set_major_locator(MultipleLocator(1))
ax.yaxis.set_major_locator(MultipleLocator(5))
ax.grid(True, which='major', linestyle='-', linewidth=0.8, color='black', alpha=0.3)

# Minor grid
ax.xaxis.set_minor_locator(MultipleLocator(0.25))
ax.yaxis.set_minor_locator(MultipleLocator(1))
ax.grid(True, which='minor', linestyle=':', linewidth=0.5, color='gray', alpha=0.3)

ax.set_xlabel('x')
ax.set_ylabel('x²')
ax.set_title('Major + Minor Grid Intervals')
plt.show()
```

**Output Description:** A quadratic curve. Major gridlines (solid, thin black) at every integer x and every 5 y. Minor gridlines (dotted, gray) at 0.25 x intervals and 1 y intervals.

**Explanation:** `MultipleLocator` sets tick spacing. `which='major'` vs `which='minor'` controls which ticks get gridlines. Minor ticks must be enabled via `set_minor_locator`.

## 🏢 Real World Use Case

**Financial candlestick charts:** A trading platform shows stock prices with gridlines at every major dollar level (major) and every 0.10 cent intervals (minor) with faint dotted lines, allowing traders to quickly assess price levels.

## 🎯 Interview Questions

**1. How do you show gridlines only for the x-axis?**
- `plt.grid(True, axis='x')` or `ax.grid(True, axis='x')`.

**2. What is the `which` parameter in `grid()`?**
- It selects which set of ticks to draw gridlines for: `'major'`, `'minor'`, or `'both'`.

**3. How do you compute custom grid intervals manually without `MultipleLocator`?**
- You could manually add lines using `ax.axhline()` and `ax.axvline()` in a loop, but `MultipleLocator` is the cleaner approach.

**4. What is the default z-order of gridlines?**
- Gridlines have a default z-order of 2.5, which is below lines (z=2) but above axes. Use `zorder` to adjust if needed.

**5. Can you have different gridline styles for major and minor ticks?**
- Yes: call `grid()` twice with `which='major'` and `which='minor'`, each with different linestyle/color parameters.

## ⚠ Common Errors / Mistakes

- **Grid not appearing after `which='minor'`** – Forgot to enable minor ticks with `set_minor_locator()`.
- **Gridlines appear on top of data** – Set `zorder=0` in the grid call or `zorder=3` in the plot.
- **Too many gridlines** – Overly dense grids make the plot unreadable. Use appropriate spacing.
- **Gridlines outside data range** – Grid follows tick locations; set axis limits with `set_xlim()` if needed.
- **Forgetting to import `MultipleLocator`** – It's in `matplotlib.ticker`, not automatically imported.

## 📝 Practice Exercises

**Beginner**
1. Plot `y = cos(x)` from 0 to 2π and enable grid on both axes with default style.
2. Create a plot with grid only on the x-axis using dashed red lines.
3. Disable the grid on a plot after enabling it (use `plt.grid(False)`).

**Intermediate**
4. Plot a sine wave with major grid every π/2 and minor grid every π/4 using `MultipleLocator`. Use different line styles for major (solid, 0.8 width) and minor (dotted, 0.4 width).
5. Create a plot with gridlines that appear above the data (use `zorder`).
6. Use `ax.axhline(y=0, color='black', linewidth=1)` to add a single prominent zero-line, while having a full grid behind the data.

**Advanced**
7. Create a plot with a logarithmic y-axis (`plt.yscale('log')`) and configure major + minor gridlines appropriate for log scale. Use `LogLocator` from `matplotlib.ticker`.
8. Build a function `custom_grid(ax, x_major, x_minor, y_major, y_minor, style)` that configures a complete major + minor grid system on a given axes with full style control. Test it on a plot with 3 subplots each having different grid configurations.
