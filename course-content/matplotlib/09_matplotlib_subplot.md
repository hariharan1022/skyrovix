## 9. Matplotlib Subplot

## 📘 Introduction

Subplots allow multiple plots in a single figure, arranged in a grid. Matplotlib offers several approaches: `plt.subplot()` (simple grids), `plt.subplots()` (easiest for grids), `subplot2grid` (spanning cells), and `GridSpec` (complex, non-uniform layouts).

## 🧠 Key Concepts

- **`plt.subplot(nrows, ncols, index)`**: Select/create an axes at position `index` (1-indexed).
- **`plt.subplots(nrows, ncols)`**: Create figure + array of axes in one call.
- **Axes array indexing**: `ax[0, 0]`, `ax[1, 2]`, etc. (0-indexed).
- **`sharex` / `sharey`**: Link axis limits across subplots.
- **`subplot2grid`**: Create axes that span multiple grid cells.
- **`GridSpec`**: Full control over subplot sizes, widths, heights, and spacing.
- **`tight_layout()`**: Auto-adjust spacing between subplots.

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

# Simple 2x2 grid
plt.subplot(2, 2, 1)
plt.plot(x, y)

plt.subplot(2, 2, 2)
plt.scatter(x, y)

# subplots() — most common
fig, axes = plt.subplots(2, 3, figsize=(10, 6))
axes[0, 0].plot(x, y)

# sharex / sharey
fig, axes = plt.subplots(2, 2, sharex=True, sharey='row')

# subplot2grid — span cells
ax1 = plt.subplot2grid((3, 3), (0, 0), colspan=3)
ax2 = plt.subplot2grid((3, 3), (1, 0), colspan=2)
ax3 = plt.subplot2grid((3, 3), (1, 2), rowspan=2)
ax4 = plt.subplot2grid((3, 3), (2, 0), colspan=2)

# GridSpec
import matplotlib.gridspec as gridspec
gs = gridspec.GridSpec(2, 2, width_ratios=[1, 2], height_ratios=[2, 1])
ax1 = fig.add_subplot(gs[0, 0])
ax2 = fig.add_subplot(gs[0, 1])
```

## ✅ Example 1 - Basic: 2×2 Subplot Grid

**Problem:** Create a 2×2 grid showing four different plot types.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

axes[0, 0].plot(x, np.sin(x), 'r')
axes[0, 0].set_title('Sine')

axes[0, 1].plot(x, np.cos(x), 'b')
axes[0, 1].set_title('Cosine')

axes[1, 0].plot(x, np.exp(-x/3), 'g')
axes[1, 0].set_title('Exponential Decay')

axes[1, 1].plot(x, x**2, 'orange')
axes[1, 1].set_title('Quadratic')

for ax in axes.flat:
    ax.set_xlabel('x')
    ax.grid(True, alpha=0.3)
    ax.tick_params(labelsize=8)

plt.tight_layout()
plt.show()
```

**Output Description:** A 2×2 figure: sine (top-left), cosine (top-right), exponential (bottom-left), quadratic (bottom-right). Each has its own title but all share x-label.

**Explanation:** `axes` is a 2×2 numpy array. `axes.flat` iterates over all axes. `tight_layout()` prevents overlap.

## 🚀 Example 2 - Intermediate: Complex Layout with GridSpec

**Problem:** Create a dashboard layout with a wide top plot, a bottom-left plot, and a tall bottom-right plot.

**Code:**
```python
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np

fig = plt.figure(figsize=(10, 8))
gs = gridspec.GridSpec(2, 2, width_ratios=[2, 1], height_ratios=[1, 1.5], hspace=0.3, wspace=0.3)

ax1 = fig.add_subplot(gs[0, :])     # spans entire top row
ax2 = fig.add_subplot(gs[1, 0])     # bottom-left
ax3 = fig.add_subplot(gs[1, 1])     # bottom-right

x = np.linspace(0, 10, 100)

ax1.plot(x, np.sin(x) + np.cos(x), 'purple', linewidth=2)
ax1.set_title('Combined Wave (Top Span)')
ax1.grid(True)

ax2.plot(x, np.sin(x), 'teal')
ax2.set_title('Sine')
ax2.grid(True)

ax3.plot(x, np.cos(x), 'crimson')
ax3.set_title('Cosine')
ax3.grid(True)

plt.suptitle('GridSpec Complex Layout', fontsize=14, fontweight='bold')
plt.show()
```

**Output Description:** Top row is one wide plot (purple). Bottom row split into two: left (teal sine) slightly wider than right (crimson cosine).

**Explanation:** `gs[0, :]` spans all columns of row 0. `width_ratios=[2, 1]` makes the left column twice as wide as the right. `height_ratios` controls row heights.

## 🏢 Real World Use Case

**Data science dashboards:** A data analyst creates a quarterly business review figure with: top-wide revenue trend (line), bottom-left sales by region (bar), bottom-right profit margin (pie) — all in one figure using `GridSpec`.

## 🎯 Interview Questions

**1. What is the difference between `plt.subplot()` and `plt.subplots()`?**
- `plt.subplot(n, m, i)` selects an existing or creates a new axes at position i in an n×m grid. `plt.subplots(n, m)` creates all n×m axes at once and returns a figure + array of axes.

**2. How do you make subplots share the same x-axis?**
- Use `sharex=True` in `plt.subplots()`, or `sharex='col'` to share only within columns. In OOP: `ax2 = fig.add_subplot(212, sharex=ax1)`.

**3. What does `GridSpec` offer over `subplots()`?**
- `GridSpec` allows non-uniform grids: different row heights, column widths, and axes that span multiple cells. `subplots()` only creates uniform grids.

**4. How do you remove space between subplots?**
- Use `plt.subplots_adjust(hspace=0, wspace=0)` or pass `hspace=0, wspace=0` to `GridSpec`.

**5. What is `tight_layout()` and when should you use it?**
- It automatically adjusts subplot parameters (padding) to fit elements within the figure. Use it before `show()` or `savefig()` to prevent clipping.

## ⚠ Common Errors / Mistakes

- **1-indexed vs 0-indexed confusion** – `subplot(2, 2, 3)` is 1-indexed (bottom-left). `axes[1, 0]` is 0-indexed (same cell).
- **Forgetting to flatten the axes array** – `axes[0]` gives the first row, not the first axes. Use `axes.flat[index]`.
- **Mixing `subplot` and `subplots`** – Calling `plt.subplot()` after `plt.subplots()` can select a different axes than expected.
- **Not calling `tight_layout()`** – Subplots overlap or labels get clipped.
- **`GridSpec` with wrong slice indices** – `gs[0, :]` spans entire row; `gs[0:2, 0]` spans two rows in column 0.

## 📝 Practice Exercises

**Beginner**
1. Create a 1×3 horizontal subplot layout showing bar, scatter, and line plots.
2. Use `plt.subplots(2, 2)` to create a 2×2 grid. Plot `y = x`, `y = x^2`, `y = x^3`, `y = x^4` in each cell.
3. Create two subplots sharing the y-axis using `sharey=True`.

**Intermediate**
4. Use `subplot2grid` to create a layout: top-left plot spans 2 columns, bottom row has 3 equal plots.
5. Create a 3×3 grid where the center cell is twice as wide and twice as tall as the others (use `GridSpec` with `width_ratios` and `height_ratios`).
6. Create 4 subplots with `sharex='col'` and `sharey='row'`. Plot unrelated data to demonstrate the sharing effect.

**Advanced**
7. Build a figure with 6 subplots arranged in 2 rows: the first row has 3 equal plots, the second row has a wide left plot spanning 2 columns and a narrow right plot. Use `GridSpec`.
8. Create a function `subplot_grid(n, m, plot_funcs)` that takes an n×m grid of plotting functions, creates the subplots, applies each function to the corresponding axes, and returns the figure. Demonstrate with 6 different plot types in a 2×3 grid.
