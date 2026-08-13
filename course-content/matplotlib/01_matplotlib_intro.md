## 1. Matplotlib Intro

## 📘 Introduction

Matplotlib is the most widely used Python library for data visualization. It provides an object-oriented API for embedding plots into applications and a MATLAB-like procedural interface (`pyplot`). It supports static, animated, and interactive visualizations.

Two main APIs:
- **pyplot API** (`plt.plot()`) – state-machine, MATLAB-like, quick and easy for simple plots.
- **OOP API** (`fig, ax = plt.subplots()`) – explicit figure and axes objects, better for complex multi-panel plots.

## 🧠 Key Concepts

- **Figure**: The top-level container holding all plot elements.
- **Axes**: The actual plot area with data, ticks, labels, etc. A Figure can have multiple Axes.
- **pyplot**: A collection of functions that make Matplotlib work like MATLAB.
- **`plt.show()`**: Renders and displays the figure.
- **`plt.savefig()`**: Saves the current figure to a file.
- **Jupyter integration**: `%matplotlib inline` renders plots directly below cells.

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

x = [1, 2, 3, 4]
y = [10, 20, 25, 30]

plt.plot(x, y)
plt.show()
```

```python
# OOP API
fig, ax = plt.subplots()
ax.plot(x, y)
plt.show()
```

```python
# Saving figure
plt.plot(x, y)
plt.savefig('my_plot.png', dpi=300, bbox_inches='tight')
```

```python
# Jupyter notebook (place at top of cell)
%matplotlib inline
```

## ✅ Example 1 - Basic: First Plot

**Problem:** Create a simple line plot of x vs y and save it as a PNG.

**Code:**
```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y)
plt.xlabel('X values')
plt.ylabel('Y values')
plt.title('My First Plot')
plt.savefig('first_plot.png')
plt.show()
```

**Output Description:** A window opens showing a blue line connecting the points (1,1), (2,4), (3,9), (4,16), (5,25). The file `first_plot.png` is saved.

**Explanation:** `plt.plot(x, y)` draws lines between points. Labels and title are added. `savefig` writes to disk; `show()` displays on screen.

## 🚀 Example 2 - Intermediate: OOP with Subplots

**Problem:** Create a figure with two subplots side-by-side using the OOP API.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

ax1.plot(x, np.sin(x), 'r-')
ax1.set_title('Sine')
ax1.set_xlabel('x')
ax1.set_ylabel('sin(x)')

ax2.plot(x, np.cos(x), 'b--')
ax2.set_title('Cosine')
ax2.set_xlabel('x')
ax2.set_ylabel('cos(x)')

plt.tight_layout()
plt.show()
```

**Output Description:** A 10×4 inch figure with two plots: red solid line (sine) on the left, blue dashed line (cosine) on the right.

**Explanation:** `subplots(1, 2)` creates one row, two columns. Returns `(fig, ax_array)`. We use `ax1.plot()` and `ax2.plot()` (OOP style) instead of `plt.plot()`. `tight_layout()` prevents overlap.

## 🏢 Real World Use Case

**Generating automated financial reports:** A trading firm needs to produce daily price charts with volume for hundreds of stocks. Using Matplotlib's OOP API and `savefig()`, they loop through data, create standardized figures, and save them as high-resolution PNGs for a PDF report.

## 🎯 Interview Questions

**1. What is the difference between pyplot API and OOP API in Matplotlib?**
- pyplot API uses `plt.plot()`, `plt.xlabel()`, etc. — state-machine based, good for quick plots. OOP API uses `fig, ax = plt.subplots()` then `ax.plot()` — explicit control, essential for complex layouts.

**2. What does `plt.savefig('plot.png', bbox_inches='tight')` do?**
- Saves the current figure to disk. `bbox_inches='tight'` removes extra whitespace around the plot by fitting the bounding box tightly to content.

**3. What is the purpose of `plt.figure()`?**
- Creates a new Figure object. You can set size with `figsize`, dpi, etc. It's the top-level container that holds all Axes.

**4. How do you integrate Matplotlib with Jupyter notebooks?**
- Use `%matplotlib inline` (static images), `%matplotlib notebook` (interactive), or `%matplotlib widget` (ipympl widgets). Without these, plots may not appear.

**5. What is the difference between `plt.show()` and `plt.draw()`?**
- `plt.show()` blocks execution and displays all figures in a GUI window. `plt.draw()` redraws the current figure without blocking — used in interactive/update loops.

## ⚠ Common Errors / Mistakes

- **Calling `plt.show()` before `plt.savefig()`** – `show()` clears the figure, so `savefig` after it saves a blank plot.
- **Forgetting `%matplotlib inline` in Jupyter** – Plots won't display automatically.
- **Mixing pyplot and OOP APIs carelessly** – Can work but leads to confusing, hard-to-debug code.
- **Not calling `plt.tight_layout()`** – Labels and titles get clipped when saving.
- **Using `plt.plot()` multiple times without `plt.figure()`** – Overwrites the same figure unintentionally.

## 📝 Practice Exercises

**Beginner**
1. Plot the points (1,2), (2,4), (3,6), (4,8) with a red line. Add labels 'X', 'Y', and title 'Linear Relationship'.
2. Create a figure, save it as `output.png` with 150 DPI without showing it.
3. Use `plt.subplots()` to create a single axes, plot `x = [0,1,2,3]`, `y = [0,1,4,9]` and set the figure size to 8×5.

**Intermediate**
4. Create a 2×2 grid of subplots using OOP API. Plot sine, cosine, tangent (clip y to ±5), and x-squared in each quadrant.
5. Use `plt.subplots()` with `sharex=True` and `sharey=True`. Explain the effect by plotting two sine waves with different y-ranges.
6. Generate a figure with `fig.text()` to add a super-title above two subplots that each have their own title.

**Advanced**
7. Write a loop that creates 10 different figures, saves each with a unique filename (`plot_01.png`, …, `plot_10.png`), and never displays them on screen.
8. Create a class `MyPlotter` that wraps the OOP API: `__init__(self, rows, cols)`, `add_plot(self, row, col, data)`, `save(self, filename)`. Use it to plot a 3×3 grid of random walks.
