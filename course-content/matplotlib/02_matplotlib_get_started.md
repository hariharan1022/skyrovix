## 2. Matplotlib Get Started

## 📘 Introduction

Getting started with Matplotlib means importing the library, creating your first plot, and understanding the fundamental building blocks: the **Figure** and the **Axes**. The standard convention across the entire Python data ecosystem is `import matplotlib.pyplot as plt`.

## 🧠 Key Concepts

- **`import matplotlib.pyplot as plt`** – The standard alias.
- **First plot** – `plt.plot()` draws points/lines, `plt.show()` renders.
- **Figure vs Axes** – Figure is the canvas; Axes is the coordinate system + plot area.
- **`plt.subplots()`** – Creates both Figure and Axes objects at once (most common pattern).
- **`plt.grid()`** – Adds gridlines.
- **`plt.xlabel()`, `plt.ylabel()`, `plt.title()`** – Labels and title.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

# Quick plot
plt.plot([1, 2, 3], [4, 5, 6])
plt.show()
```

```python
# Figure + Axes explicit
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 5, 6])
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_title('Title')
ax.grid(True)
plt.show()
```

## ✅ Example 1 - Basic: First Plot with Labels and Grid

**Problem:** Plot a sine wave with labels, title, and grid.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 200)
y = np.sin(x)

plt.plot(x, y)
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title('Sine Wave')
plt.grid(True)
plt.show()
```

**Output Description:** A sine wave oscillating between -1 and 1 over 0–10 on x. Gridlines help read values.

**Explanation:** `np.linspace` creates 200 evenly spaced points. Grid is enabled with `plt.grid(True)`, making the plot easier to read.

## 🚀 Example 2 - Intermediate: Figure vs Axes Explicit Control

**Problem:** Demonstrate the difference between Figure and Axes by creating a figure with two axes sharing the y-axis.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 5, 50)

fig = plt.figure(figsize=(10, 4))

ax1 = fig.add_subplot(1, 2, 1)
ax2 = fig.add_subplot(1, 2, 2, sharey=ax1)

ax1.plot(x, x**2, 'r')
ax1.set_title('Quadratic')
ax1.grid(True)

ax2.plot(x, x**3, 'b')
ax2.set_title('Cubic')
ax2.grid(True)

plt.suptitle('Figure vs Axes Demo')
plt.show()
```

**Output Description:** A 10×4 figure with two side-by-side plots sharing the y-axis. Left: red quadratic curve; Right: blue cubic curve.

**Explanation:** `fig.add_subplot()` creates Axes inside an existing Figure. `sharey=ax1` links the y-axes so they scale identically. `suptitle()` adds a figure-level title.

## 🏢 Real World Use Case

**EDA in data science:** A data scientist loads a CSV, creates a quick scatter + histogram with grid to check distributions and outliers before building a model. Using `plt.subplots()` they produce a clean report figure in seconds.

## 🎯 Interview Questions

**1. What is the difference between `plt.figure()` and `plt.subplots()`?**
- `plt.figure()` creates an empty Figure; you manually add Axes with `fig.add_subplot()`. `plt.subplots()` creates Figure + pre-arranged Axes in one call — the recommended approach.

**2. What does the `figsize` parameter accept?**
- A tuple `(width, height)` in inches, e.g. `figsize=(8, 6)`.

**3. How do you add a grid only to the x-axis?**
- `plt.grid(axis='x')` or `ax.grid(axis='x')`.

**4. What is `plt.subplots()` return value?**
- A tuple `(Figure, Axes)`. For multiple subplots, Axes is an array: `fig, axes = plt.subplots(2, 3)` gives `axes.shape == (2, 3)`.

**5. What is the purpose of `sharex` and `sharey` in `plt.subplots()`?**
- They synchronize x/y axis limits and ticks across subplots, making comparison easier. `sharex='col'`, `sharey='row'`, or `True/False`.

## ⚠ Common Errors / Mistakes

- **Confusing `fig` and `ax`** – Using `fig.plot()` (doesn't exist) instead of `ax.plot()`.
- **Forgetting to call `plt.show()`** – Nothing appears.
- **Multiple `plt.figure()` calls without reference** – Lose handle to previous figures.
- **Setting labels before creating the plot** – Works but inconsistent; set labels after plotting.
- **Not using `figsize`** – Default 6.4×4.8 inches may be too small.

## 📝 Practice Exercises

**Beginner**
1. Plot `x = [0, 1, 2, 3, 4]` with `y = [0, 1, 0, 1, 0]`. Add x-label 'Day', y-label 'Status', and title 'Binary Signal'.
2. Create a figure with `figsize=(12, 3)` and plot a horizontal line at y=5 from x=0 to 10. Enable the grid.
3. Use `plt.subplots()` to create a single axes. Set the x-axis label to 'Input' and y-axis label to 'Output' using the OOP API.

**Intermediate**
4. Create a 2×1 vertical layout of subplots. Top plot shows `y = e^{-x}`, bottom shows `y = e^{-x} * sin(10x)`. Use `sharex=True`.
5. Manually create a figure using `plt.figure()`, then add two axes using `fig.add_axes([left, bottom, width, height])` with custom positions.
6. Create three subplots in a row. Make the first two share y-axes, the last independent. Label each plot.

**Advanced**
7. Create a function `make_plot(x, y, title, filename)` that creates and saves a fully-labeled, grid-enabled plot without ever calling `plt.show()`. Use it to batch-generate 5 plots from different datasets.
8. Use `fig.subplots_adjust()` and `fig.add_axes()` to create a figure with a small "zoom" axes inset inside a larger main axes. Plot the same sine wave in both.
