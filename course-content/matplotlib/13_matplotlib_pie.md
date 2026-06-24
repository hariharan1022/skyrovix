## 13. Matplotlib Pie Charts

## 📘 Introduction

Pie charts show proportional relationships as circular slices. While often criticized (hard to compare angles), they remain popular for simple part-to-whole visualizations. Matplotlib's `plt.pie()` offers labels, percentage formatting, exploded slices, shadows, 3D-like effects, and the ability to create donut charts.

## 🧠 Key Concepts

- **`plt.pie(values, labels)`**: Basic pie chart.
- **`autopct`**: String format for percentages (e.g., `'%1.1f%%'`). Can be a function.
- **`explode`**: Array of offsets to separate slices.
- **`shadow`**: Drop shadow effect.
- **`startangle`**: Rotation of the first slice (0 = right, 90 = top).
- **`colors`**: List of colors per slice.
- **`wedgeprops`**: Dict of properties like edge color, line width.
- **Donut chart**: Add a white circle at the center with `plt.Circle()`.
- **Multiple pies**: Use subplots for side-by-side pie charts.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

sizes = [30, 25, 20, 15, 10]
labels = ['A', 'B', 'C', 'D', 'E']
colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0']
explode = (0.1, 0, 0, 0, 0)

plt.pie(sizes, labels=labels, colors=colors, explode=explode,
        autopct='%1.1f%%', startangle=90, shadow=True)
plt.title('Pie Chart Title')

# Donut chart
wedgeprops = {'width': 0.4, 'edgecolor': 'white', 'linewidth': 2}
plt.pie(sizes, labels=labels, wedgeprops=wedgeprops)
```

## ✅ Example 1 - Basic: Market Share Pie Chart

**Problem:** Visualize the market share of 4 smartphone brands as a pie chart.

**Code:**
```python
import matplotlib.pyplot as plt

brands = ['Apple', 'Samsung', 'Xiaomi', 'Others']
market_share = [40, 30, 20, 10]
colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']
explode = (0.1, 0, 0, 0)  # highlight Apple

plt.figure(figsize=(8, 8))
plt.pie(market_share, labels=brands, colors=colors, explode=explode,
        autopct='%1.1f%%', startangle=90, shadow=True,
        textprops={'fontsize': 12})
plt.title('Smartphone Market Share 2025', fontsize=14, fontweight='bold')
plt.axis('equal')  # ensures pie is a circle
plt.show()
```

**Output Description:** A circular pie chart with 4 slices. Apple (40%) is pulled out from the center. Each slice labeled with brand name and percentage. Soft shadow underneath.

**Explanation:** `explode=(0.1, 0, 0, 0)` offsets the first slice by 10% of the radius. `autopct='%1.1f%%'` formats percentage to 1 decimal. `plt.axis('equal')` prevents elliptical distortion.

## 🚀 Example 2 - Intermediate: Donut Chart with Multiple Pies

**Problem:** Create a donut chart and compare two datasets side-by-side.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

# Budget data
categories = ['Rent', 'Food', 'Transport', 'Entertainment', 'Savings']
budget_2024 = [40, 25, 15, 10, 10]
budget_2025 = [35, 30, 10, 10, 15]
colors = ['#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#2ecc71']

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

for ax, data, year in zip([ax1, ax2], [budget_2024, budget_2025], ['2024', '2025']):
    wedges, texts, autotexts = ax.pie(data, labels=categories, colors=colors,
                                       autopct='%1.0f%%', startangle=90,
                                       wedgeprops={'width': 0.4, 'edgecolor': 'white',
                                                   'linewidth': 2})
    ax.set_title(f'Budget {year}', fontsize=14, fontweight='bold')
    ax.set_aspect('equal')

plt.suptitle('Donut Chart Comparison', fontsize=16)
plt.tight_layout()
plt.show()
```

**Output Description:** Two donut charts side-by-side. Each has a hole in the center (white). The 2025 budget shows less rent, more food and savings compared to 2024.

**Explanation:** `wedgeprops={'width': 0.4}` creates the donut hole (the center 40% is empty). `autotexts` contains the percentage text objects for further customization. `set_aspect('equal')` keeps circles round.

## 🏢 Real World Use Case

**Executive dashboard:** A CFO presents annual budget allocation across departments in a board meeting. A donut chart shows the proportions clearly, with the center hole used to display the total budget amount as text using `ax.text()`.

## 🎯 Interview Questions

**1. How do you create a donut chart in Matplotlib?**
- Use `wedgeprops={'width': 0.4}` in `plt.pie()` to make the center empty. The `width` value determines the inner radius as a fraction of the outer radius.

**2. What does `autopct='%1.1f%%'` mean?**
- It formats percentage text: `%1.1f` prints a float with 1 decimal place, and `%%` prints a literal `%` sign.

**3. How do you explode multiple slices?**
- Pass a tuple/list with offset values: `explode=(0, 0.1, 0, 0.2, 0)` — non-zero values correspond to exploded slices.

**4. How do you add text inside the center of a donut chart?**
- After `pie()`, use `ax.text(0, 0, 'Total', ha='center', va='center', fontsize=20)` to place text at the center of the axes.

**5. What does `plt.axis('equal')` do in a pie chart?**
- It sets equal aspect ratio so the pie appears as a circle rather than an ellipse. Without it, the pie may look oval-shaped depending on figure dimensions.

## ⚠ Common Errors / Mistakes

- **Not calling `plt.axis('equal')`** – The pie appears as an oval.
- **Sum of values far from 100** – Pie charts assume parts of a whole; if values don't sum to 100, the chart still works but may be confusing.
- **Too many slices** – More than 5-6 slices becomes hard to read. Consider grouping small categories into "Other".
- **Percentage labels overlapping** – For small slices, `autopct` labels may overlap. Use `textprops` or manually adjust.
- **Forgetting `labels` or `autopct`** – The chart shows only colored slices with no context.

## 📝 Practice Exercises

**Beginner**
1. Create a pie chart of 4 categories: [35, 25, 20, 20] with labels ['R&D', 'Marketing', 'Sales', 'Support'].
2. Create the same chart with the first slice exploded by 0.15. Add a shadow.
3. Create a pie chart without labels but with percentage text (`autopct`) and a legend.

**Intermediate**
4. Create a donut chart with `wedgeprops={'width': 0.3, 'edgecolor': 'black'}`. Add text "Total: 100%" in the center.
5. Create a 2×2 grid of pie charts, each representing a different year's budget breakdown. Use the same color scheme across all four.
6. Customize the percentage text in a pie chart: change font size to 10, font weight to bold, and color to white, with a black bounding box.

**Advanced**
7. Create a "nested donut chart" (pie of pie): an inner donut showing overall category splits (e.g., Needs, Wants, Savings) and an outer donut showing detailed sub-categories. Use different color palettes for inner and outer rings.
8. Build a function `smart_pie(values, labels, threshold=5)` that automatically groups any category below `threshold`% into an "Other" slice. It should also pick optimal colors, add a legend for tiny slices, and return the figure. Test with 10+ categories.
