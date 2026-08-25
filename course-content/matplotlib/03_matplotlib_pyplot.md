## 3. Matplotlib Pyplot

## 📘 Introduction

`pyplot` is a module within Matplotlib that provides a MATLAB-like state-machine interface. Each `plt.xxx()` function implicitly tracks the "current" figure and axes, so you can build a plot incrementally without explicitly managing objects.

## 🧠 Key Concepts

- **State machine** – `plt` remembers the last-used Figure and Axes.
- **`plt.plot()`** – Line plot.
- **`plt.scatter()`** – Scatter plot (individual points with variable size/color).
- **`plt.bar()`** – Vertical bar chart.
- **`plt.hist()`** – Histogram.
- **`plt.pie()`** – Pie chart.
- **`plt.xlabel()`, `plt.ylabel()`, `plt.title()`** – Labels and title.
- **`plt.legend()`** – Shows legend based on `label` parameter.
- **`plt.show()` vs `plt.draw()`** – `show` blocks and displays; `draw` renders without blocking.

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

x = [1, 2, 3]
y = [4, 5, 6]

# Common plot types
plt.plot(x, y)              # line
plt.scatter(x, y)           # scatter
plt.bar(x, y)               # bar
plt.hist(np.random.randn(100))  # histogram
plt.pie([30, 40, 20, 10])   # pie

# Labels
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Title')
plt.legend(['Line'])
plt.show()
```

## ✅ Example 1 - Basic: Multiple Plot Types in One Script

**Problem:** Generate a line plot, scatter, bar, and histogram from the same dataset.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 6)
y = [2, 5, 3, 7, 4]

plt.figure(figsize=(12, 8))

plt.subplot(2, 2, 1)
plt.plot(x, y, 'o-')
plt.title('Line')

plt.subplot(2, 2, 2)
plt.scatter(x, y, c='red', s=100)
plt.title('Scatter')

plt.subplot(2, 2, 3)
plt.bar(x, y, color='green')
plt.title('Bar')

plt.subplot(2, 2, 4)
plt.hist(np.random.randn(500), bins=20, color='purple', edgecolor='white')
plt.title('Histogram')

plt.tight_layout()
plt.show()
```

**Output Description:** A 2×2 grid: top-left line with markers, top-right red scatter, bottom-left green bars, bottom-right purple histogram.

**Explanation:** Each `plt.subplot(2,2,n)` activates a different axes in the 2×2 grid. `plt.tight_layout()` adjusts spacing.

## 🚀 Example 2 - Intermediate: Pie Chart with Custom Styling

**Problem:** Visualize market share of 4 companies with a pie chart, showing percentages.

**Code:**
```python
import matplotlib.pyplot as plt

labels = ['Apple', 'Samsung', 'Xiaomi', 'Others']
sizes = [45, 30, 15, 10]
colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
explode = (0.1, 0, 0, 0)  # explode Apple

plt.pie(sizes, labels=labels, colors=colors, explode=explode,
        autopct='%1.1f%%', startangle=90, shadow=True)
plt.title('Smartphone Market Share')
plt.show()
```

**Output Description:** A pie chart with Apple exploded outward, each slice labeled with company name and percentage, light shadow effect.

**Explanation:** `autopct` formats the percentage string. `explode` pulls a slice out. `startangle=90` rotates the pie so the first slice starts at top.

## 🏢 Real World Use Case

**Sales dashboard:** A BI analyst uses `plt.bar()` to show monthly revenue and `plt.plot()` to overlay a trendline, then `plt.savefig()` to embed the chart in an automated email report sent to stakeholders every Monday.

## 🎯 Interview Questions

**1. What is the "state machine" in pyplot?**
- pyplot keeps track of the "current" Figure and Axes. Commands like `plt.plot()` implicitly act on the current axes. `plt.gca()` and `plt.gcf()` retrieve them.

**2. How do you add a legend to a pyplot plot?**
- Pass `label='name'` in each plot call, then call `plt.legend()`.

**3. What does `plt.subplot(2, 3, 4)` do?**
- Selects the 4th axes in a 2×3 grid (row 2, column 1, 1-indexed). Creates it if it doesn't exist.

**4. What is the difference between `plt.show()` and `plt.draw()`?**
- `show()` blocks execution and opens the figure window. `draw()` renders the figure but returns immediately — useful for animations and interactive updates.

**5. Can you mix pyplot and OOP API?**
- Yes, but carefully. Calling `plt.plot()` on a figure created via OOP can lead to confusion about which axes is current. Avoid mixing in the same script.

## ⚠ Common Errors / Mistakes

- **Forgetting `plt.legend()` arguments** – Legends only appear if labels were set during plot calls.
- **Using `plt.subplot()` after creating subplots with `plt.subplots()`** – Overwrites axes unintentionally.
- **Calling `plt.pie()` on non-aggregated data** – Pie charts need one value per category, not raw lists.
- **Not calling `plt.tight_layout()`** – Pie chart labels may be cut off.
- **Calling `plt.plot()` and `plt.scatter()` on same axes without `plt.hold(True)`** – In older versions this was an issue; modern Matplotlib holds by default.

## 📝 Practice Exercises

**Beginner**
1. Create a line plot of `x = [1,2,3,4]`, `y = [10,20,15,25]` with a legend labeled 'Series A'.
2. Generate a bar chart of 5 items with values [5, 12, 8, 20, 15] in red color.
3. Create a scatter plot of 20 random x,y points using `np.random.randn`.

**Intermediate**
4. Build a 1×3 figure: bar plot of monthly sales (Jan–Jun), pie chart of product categories, and histogram of order amounts (500 random values).
5. Create a pyplot script that plots two lines, a scatter overlay, and a text annotation (`plt.text()`) at the maximum point.
6. Use `plt.subplot()` to create a 3×1 grid where each plot uses a different plot type (bar, scatter, pie) but shares the same categorical data.

**Advanced**
7. Recreate a 2×2 dashboard using only pyplot (no OOP) with: top-left line, top-right scatter with colorbar, bottom-left grouped bar, bottom-right pie with legend and autopct.
8. Write a script that accepts a plot type as a string argument ('line', 'scatter', 'bar', 'pie') and dynamically calls the appropriate pyplot function via `getattr(plt, plot_type)`. Handle at least 4 types with appropriate dummy data.
