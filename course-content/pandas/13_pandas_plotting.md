## 13. Pandas Plotting
## 📘 Introduction
Pandas integrates directly with Matplotlib for quick and easy data visualization via the `.plot()` method. This allows you to create line plots, bar charts, histograms, box plots, scatter plots, area charts, and pie charts directly from DataFrames and Series without importing Matplotlib separately (though Matplotlib is still the rendering backend).

## 🧠 Key Concepts
- **df.plot()**: Primary plotting method on DataFrames and Series.
- **kind**: Type of plot — `'line'`, `'bar'`, `'barh'`, `'hist'`, `'box'`, `'scatter'`, `'area'`, `'pie'`, `'kde'`.
- **x/y**: For scatter plots, specify which columns for x and y axes.
- **subplots**: Separate subplots for each column (boolean or layout).
- **figsize**: Tuple `(width, height)` for figure size.
- **title**: Plot title string.
- **grid**: Show grid (boolean).
- **legend**: Control legend display (boolean or position).
- **Saving plots**: `plt.savefig('plot.png')` or `fig.savefig()`.
- **scatter_matrix**: `pd.plotting.scatter_matrix()` for pairwise scatter plot matrix.
- **Backend**: Uses Matplotlib by default; can be changed to other backends.

## 💻 Syntax

```python
import pandas as pd
import matplotlib.pyplot as plt

# Basic line plot
df.plot()
df.plot(kind='line')

# Bar chart
df.plot(kind='bar')
df.plot(kind='barh')  # horizontal bar

# Histogram
df['col'].plot(kind='hist', bins=30)

# Box plot
df.plot(kind='box')

# Scatter plot
df.plot(kind='scatter', x='col1', y='col2')

# Area plot
df.plot(kind='area')

# Pie chart
df.groupby('cat').sum().plot(kind='pie', y='value')

# Subplots
df.plot(subplots=True, layout=(2, 2), figsize=(10, 8))

# Customization
df.plot(figsize=(12, 6), title='Sales Trend', grid=True, legend=True)

# Scatter matrix
pd.plotting.scatter_matrix(df, figsize=(10, 10))

# Save
plt.savefig('chart.png', dpi=300, bbox_inches='tight')
plt.show()
```

## ✅ Example 1 - Basic
**Problem:** Create line and bar plots from sales data.

```python
import pandas as pd
import matplotlib.pyplot as plt

# Sample sales data
df = pd.DataFrame({
    'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    'Product_A': [100, 120, 110, 140, 135, 160],
    'Product_B': [80, 90, 85, 100, 95, 110]
})
df = df.set_index('Month')

print("=== DATA ===")
print(df)
print()

# Line plot
df.plot(kind='line', marker='o', figsize=(8, 5), title='Monthly Sales')
plt.ylabel('Sales (units)')
plt.grid(True)
plt.show()

# Bar plot
df.plot(kind='bar', figsize=(8, 5), title='Monthly Sales Comparison')
plt.ylabel('Sales (units)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

**Output:**
```
=== DATA ===
       Product_A  Product_B
Month
Jan          100         80
Feb          120         90
Mar          110         85
Apr          140        100
May          135         95
Jun          160        110

[Two plots displayed: a line chart with two lines and a grouped bar chart]
```

**Explanation:**
Setting `Month` as the index makes it the x-axis. `plot(kind='line')` draws one line per column. `plot(kind='bar')` creates a grouped bar chart. Both plots show `Product_A` consistently outselling `Product_B`, with a general upward trend. The `marker='o'` adds circle markers to data points on the line chart.

## 🚀 Example 2 - Intermediate
**Problem:** Create a scatter plot with customization, subplots, and a histogram.

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
n = 100
df = pd.DataFrame({
    'Age': np.random.randint(18, 65, n),
    'Salary': np.random.normal(60000, 15000, n).clip(30000, 100000),
    'Experience': np.random.randint(0, 30, n),
    'Score': np.random.normal(75, 10, n).clip(40, 100)
})

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Scatter: Age vs Salary
df.plot(ax=axes[0, 0], kind='scatter', x='Age', y='Salary',
        title='Age vs Salary', color='steelblue')

# Scatter: Experience vs Score
df.plot(ax=axes[0, 1], kind='scatter', x='Experience', y='Score',
        title='Experience vs Score', color='coral')

# Histogram of Salary
df['Salary'].plot(ax=axes[1, 0], kind='hist', bins=20,
                  title='Salary Distribution', color='green', edgecolor='white')

# Box plot of all numeric columns
df.plot(ax=axes[1, 1], kind='box', title='Summary Statistics')

plt.tight_layout()
plt.show()
```

**Output:**
*(Figure with 4 subplots: 2 scatter plots, 1 histogram, 1 box plot)*

**Explanation:**
`subplots(2, 2)` creates 4 axes. We pass each `ax` to `.plot()` to place plots in specific locations. The scatter plots reveal relationships between pairs of variables. The histogram shows the distribution shape of Salary (roughly normal by construction). The box plot highlights outliers and quartiles for all numeric columns simultaneously.

## 🏢 Real World Use Case
**Marketing Campaign Performance Report:** A marketing analyst loads campaign data (impressions, clicks, conversions, spend) and creates a dashboard: line plot of daily impressions over time, bar chart of conversions by channel, scatter plot of spend vs ROI to identify efficient channels, and a pie chart of budget allocation across campaigns. All plots are saved as PNGs for a weekly report.

## 🎯 Interview Questions

**Q1: What types of plots can you create with `df.plot()`?**
A: line, bar, barh, hist, box, scatter, area, pie, kde/ density. The `kind` parameter selects the type.

**Q2: How do you create a scatter plot with pandas plotting?**
A: `df.plot(kind='scatter', x='col_x', y='col_y')`. Both x and y columns must be specified.

**Q3: How can you place multiple pandas plots in the same figure?**
A: Create subplots with `plt.subplots()` and pass individual axes via the `ax` parameter: `df.plot(ax=ax1, kind='line')`.

**Q4: How do you save a pandas plot to a file?**
A: Use `plt.savefig('filename.png', dpi=300, bbox_inches='tight')` after calling `.plot()` and before `plt.show()`.

**Q5: What does `pd.plotting.scatter_matrix()` do?**
A: It creates a matrix of scatter plots for every pair of numeric columns, with histograms on the diagonal — useful for quickly visualizing relationships in a dataset.

## ⚠ Common Errors / Mistakes
- **Not calling `plt.show()`** — plots are not displayed (in scripts/notebooks).
- **Calling `plt.savefig()` after `plt.show()`** — saves a blank image. Save before showing.
- **Plotting non-numeric data without aggregation**: Pie charts need aggregated data (one value per category).
- **Index not set for time-series**: For line plots, ensure your datetime column is set as index or passed as x.
- **Not using `figsize`**: Default figure size may be too small for readable plots with many data points.

## 📝 Practice Exercises

**Beginner:**
1. Create a line plot of monthly revenue data for 12 months using `df.plot()`.
2. Create a histogram of a numeric column with 20 bins.
3. Create a bar chart showing average values grouped by a categorical column.

**Intermediate:**
4. Create a 2×2 grid of subplots with a line chart, bar chart, histogram, and box plot — all from the same DataFrame.
5. Use `pd.plotting.scatter_matrix()` on the Iris dataset and interpret the diagonal and off-diagonal plots.
6. Create a scatter plot with color-coded points based on a categorical column (hint: use `c` parameter or plot groups separately).

**Advanced:**
7. Build a reusable plotting function that takes a DataFrame, plot type, column specifications, and customization options (figsize, title, colors, grid), and generates the plot — handling both single and subplot layouts.
8. Compare pandas `.plot()` with seaborn for creating a complex multi-panel figure (scatter + histogram + box per category) — measure code length, readability, and visual quality for the same dataset.
