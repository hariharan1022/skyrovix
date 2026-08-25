## 11. Matplotlib Bars

## 📘 Introduction

Bar charts are essential for comparing categorical data. Matplotlib provides vertical bars (`bar()`), horizontal bars (`barh()`), grouped bars, stacked bars, and error bars — all with extensive customization options for color, width, labels, and positioning.

## 🧠 Key Concepts

- **`plt.bar(x, height)`**: Vertical bar chart.
- **`plt.barh(y, width)`**: Horizontal bar chart.
- **`color`**: Bar fill color (single or list).
- **`width`**: Bar width (vertical) or height (horizontal). Default 0.8.
- **`tick_label`**: Labels for each bar.
- **Grouped bars**: Offset bars by `width` to create groups.
- **Stacked bars**: Use `bottom` parameter to stack.
- **Error bars**: `yerr` / `xerr` for vertical/horizontal error bars. `capsize` for cap size.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

categories = ['A', 'B', 'C']
values = [10, 20, 15]

# Vertical bars
plt.bar(categories, values, color=['red', 'green', 'blue'], width=0.6)

# Horizontal bars
plt.barh(categories, values, color='skyblue')

# Grouped bars
x = np.arange(len(categories))
width = 0.35
plt.bar(x - width/2, values1, width, label='Group 1')
plt.bar(x + width/2, values2, width, label='Group 2')

# Stacked bars
plt.bar(categories, values1, label='Part 1')
plt.bar(categories, values2, bottom=values1, label='Part 2')

# Error bars
plt.bar(categories, values, yerr=[1, 2, 1.5], capsize=5)
```

## ✅ Example 1 - Basic: Vertical and Horizontal Bar Charts

**Problem:** Display monthly sales data as both vertical and horizontal bar charts.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
sales = [120, 190, 170, 220, 250, 210]

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
colors = plt.cm.Blues(np.linspace(0.3, 1, len(months)))
plt.bar(months, sales, color=colors, width=0.6, edgecolor='navy', linewidth=1)
plt.title('Vertical Bar Chart')
plt.ylabel('Sales ($K)')
plt.grid(axis='y', alpha=0.3)

plt.subplot(1, 2, 2)
plt.barh(months, sales, color=colors, edgecolor='navy', linewidth=1)
plt.title('Horizontal Bar Chart')
plt.xlabel('Sales ($K)')
plt.grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.show()
```

**Output Description:** Left: vertical bars with blue gradient, sales on y-axis. Right: horizontal bars with same data, months on y-axis. Gridlines aid reading.

**Explanation:** `plt.cm.Blues(np.linspace(0.3, 1, 6))` produces 6 shades of blue from light to dark. `edgecolor` and `linewidth` add borders. `barh` swaps axes.

## 🚀 Example 2 - Intermediate: Grouped and Stacked Bar Charts

**Problem:** Compare sales of two products across quarters as grouped bars, and their cumulative as stacked bars.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

quarters = ['Q1', 'Q2', 'Q3', 'Q4']
product_a = [30, 45, 40, 55]
product_b = [25, 30, 45, 40]

x = np.arange(len(quarters))
width = 0.35

plt.figure(figsize=(12, 5))

# Grouped bars
plt.subplot(1, 2, 1)
plt.bar(x - width/2, product_a, width, label='Product A', color='steelblue')
plt.bar(x + width/2, product_b, width, label='Product B', color='coral')
plt.xticks(x, quarters)
plt.xlabel('Quarter')
plt.ylabel('Sales ($K)')
plt.title('Grouped Bar Chart')
plt.legend()
plt.grid(axis='y', alpha=0.3)

# Stacked bars
plt.subplot(1, 2, 2)
plt.bar(quarters, product_a, label='Product A', color='steelblue')
plt.bar(quarters, product_b, bottom=product_a, label='Product B', color='coral')
plt.xlabel('Quarter')
plt.ylabel('Sales ($K)')
plt.title('Stacked Bar Chart')
plt.legend()
plt.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

**Output Description:** Left: grouped bars showing side-by-side comparison each quarter. Right: stacked bars showing total height = A + B per quarter, with segments colored.

**Explanation:** Grouped: offset bars by `±width/2`. Stacked: `bottom` parameter stacks the second bar on top of the first. Both use the same data.

## 🏢 Real World Use Case

**A/B test results:** A product manager displays conversion rates for a control group and two treatment groups across 4 weeks. Grouped bar charts per week show immediate comparison, while stacked bars show cumulative effect.

## 🎯 Interview Questions

**1. How do you create a horizontal bar chart?**
- Use `plt.barh(y, width)` instead of `plt.bar(x, height)`. All styling parameters are similar.

**2. How do you add error bars to a bar chart?**
- Pass `yerr` (for vertical) or `xerr` (for horizontal) with error values. Use `capsize` to control cap width: `plt.bar(x, y, yerr=errors, capsize=5)`.

**3. How does the `bottom` parameter work in stacked bars?**
- `bottom` sets the starting y-position of each bar. For stacking, pass the cumulative sum of previous bars as `bottom` for each subsequent bar.

**4. Can you have different colors for each bar?**
- Yes: pass a list of colors (same length as data) to the `color` parameter.

**5. How do you create a grouped bar chart?**
- Use a numeric x-axis (`np.arange(n)`), then offset each group by a fraction of `width`. Use `plt.xticks(x, labels)` to set category labels.

## ⚠ Common Errors / Mistakes

- **Using categorical strings directly for grouped bars** – Grouped bars require numeric x positions for precise offset control.
- **Forgetting `plt.xticks()` after setting numeric positions** – Labels will show numbers instead of category names.
- **`bottom` not matching cumulative shape** – `bottom` array must have the same length as the bar data.
- **Bar width too large or small** – Default 0.8 works for most cases. Adjust for grouped bars.
- **Error bar caps not visible** – Increase `capsize` or check that error values are non-zero.

## 📝 Practice Exercises

**Beginner**
1. Create a vertical bar chart of 5 students' test scores: [85, 92, 78, 95, 88]. Color each bar differently.
2. Create a horizontal bar chart for the same data. Add x-label "Score".
3. Add error bars (±[3, 5, 4, 2, 6]) to the bar chart with capsize=5.

**Intermediate**
4. Create a grouped bar chart: 3 products (A, B, C) across 4 regions (North, South, East, West) with sales data. Use distinct colors for each region.
5. Create a stacked bar chart showing the composition of a budget: Rent (40%), Food (25%), Transport (15%), Entertainment (10%), Savings (10%). Each category should be a different color.
6. Create a bar chart with a horizontal line (`axhline`) showing the average value across all bars.

**Advanced**
7. Create a "diverging bar chart" where bars extend left and right from a center line (like a population pyramid). Generate data for male/female age group populations and plot them back-to-back.
8. Build a function `annotate_bar(ax, fmt='%.1f', offset=5)` that automatically adds value text labels on top of each bar in a bar chart. The offset controls spacing. Test it on grouped bars and stacked bars.
