## 10. Matplotlib Scatter

## 📘 Introduction

Scatter plots display individual data points, making them ideal for visualizing relationships, clusters, and outliers. Matplotlib's `plt.scatter()` goes beyond `plt.plot()` with markers by allowing per-point control over size, color, and transparency, plus built-in colormaps and colorbars.

## 🧠 Key Concepts

- **`plt.scatter(x, y)`**: Basic scatter plot.
- **`s`**: Marker size (can be a scalar or array for variable sizes).
- **`c`**: Marker color (single color or array mapped through a colormap).
- **`cmap`**: Colormap applied when `c` is an array of values.
- **`alpha`**: Transparency (single value or array).
- **`plt.colorbar()`**: Adds a colorbar showing the colormap mapping.
- **Legend for scatter**: Use `plt.legend()` with `scatter` handles, or create proxy artists.

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.random.rand(50) * 10
y = np.random.rand(50) * 10

# Basic scatter
plt.scatter(x, y)

# Variable size and color
sizes = np.random.randint(20, 200, 50)
colors = np.random.rand(50)
plt.scatter(x, y, s=sizes, c=colors, cmap='viridis', alpha=0.7)
plt.colorbar(label='Density')

# Scatter with legend (using proxy artists)
from matplotlib.lines import Line2D
legend_elements = [Line2D([0], [0], marker='o', color='w', label='Group A',
                          markerfacecolor='blue', markersize=10)]
plt.legend(handles=legend_elements)
```

## ✅ Example 1 - Basic: Scatter with Variable Size and Color

**Problem:** Generate random data and create a scatter plot where size represents population and color represents temperature.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
n = 100
x = np.random.rand(n) * 100
y = np.random.rand(n) * 100
sizes = np.random.randint(10, 300, n)
temperatures = np.random.rand(n) * 40  # 0-40 degrees

plt.figure(figsize=(10, 7))
scatter = plt.scatter(x, y, s=sizes, c=temperatures, cmap='coolwarm',
                      alpha=0.7, edgecolors='black', linewidth=0.5)
plt.colorbar(scatter, label='Temperature (°C)')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title('City Population & Temperature Map')
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** 100 scattered points. Larger dots represent higher population; redder dots represent higher temperature, bluer for cooler. A colorbar on the right maps colors to temperatures.

**Explanation:** `s` controls area of each marker proportional to population. `c` is mapped through `coolwarm` colormap. `edgecolors='black'` adds outlines for clarity.

## 🚀 Example 2 - Intermediate: Scatter with Multiple Groups and Legend

**Problem:** Plot three groups of data with different colors, shapes, and a combined legend.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)

# Three clusters
cluster_a = np.random.randn(30, 2) + [2, 2]
cluster_b = np.random.randn(30, 2) + [7, 7]
cluster_c = np.random.randn(30, 2) + [2, 7]

plt.figure(figsize=(9, 7))

plt.scatter(cluster_a[:, 0], cluster_a[:, 1], c='red', s=50, alpha=0.7,
            marker='o', label='Cluster A')
plt.scatter(cluster_b[:, 0], cluster_b[:, 1], c='blue', s=80, alpha=0.7,
            marker='s', label='Cluster B')
plt.scatter(cluster_c[:, 0], cluster_c[:, 1], c='green', s=60, alpha=0.7,
            marker='^', label='Cluster C')

plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('K-Means Clustering Result (3 Clusters)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** Three distinct clusters: red circles (bottom-left), blue squares (top-right), green triangles (middle-left). The legend identifies each cluster.

**Explanation:** Different `marker` and `c` values distinguish groups. `alpha=0.7` reveals overlapping points. The `label` parameter feeds into `plt.legend()`.

## 🏢 Real World Use Case

**Gene expression analysis:** A bioinformatician plots PCA (Principal Component Analysis) results where each point is a patient. Marker size indicates tumor size, color maps to gene expression level, and different marker shapes distinguish cancer subtypes.

## 🎯 Interview Questions

**1. What is the difference between `plt.plot()` with markers and `plt.scatter()`?**
- `plt.plot()` is for line plots with uniform markers. `plt.scatter()` allows per-point control over size, color, and alpha via arrays.

**2. How does the `s` parameter (size) work in scatter?**
- It defines the marker area in points². A scalar applies to all points; an array applies per point: `s=np.random.randint(20, 200, 100)`.

**3. How do you add a colorbar to a scatter plot?**
- Store the return value of `scatter()` and pass it to `plt.colorbar()`: `sc = plt.scatter(...)`, `plt.colorbar(sc)`.

**4. How do you create a scatter plot legend for different groups?**
- Either use `label` in separate `scatter()` calls and call `legend()`, or create proxy artists with `Line2D` if you need custom legend entries.

**5. What is the `cmap` parameter and how does it work?**
- It specifies the colormap used to map numeric values in `c` to colors. Examples: `'viridis'`, `'plasma'`, `'coolwarm'`, `'RdYlBu'`.

## ⚠ Common Errors / Mistakes

- **Using `plot()` instead of `scatter()` for variable colors** – `plot()` does not support per-point color mapping.
- **Not storing the scatter return value for `colorbar()`** – `colorbar()` needs the mappable object.
- **`s` values too small or too large** – Points become invisible or blob together. Start with `s=20` and adjust.
- **`c` as a list of strings without `cmap`** – Works for categorical colors; but for numeric, must use a colormap.
- **Forgetting to set `alpha`** – Overlapping points in dense regions look opaque and hide density.

## 📝 Practice Exercises

**Beginner**
1. Scatter plot 30 random (x, y) points with blue circles of size 50.
2. Create a scatter plot where point color represents a third variable `z = x + y` using the `plasma` colormap. Add a colorbar.
3. Plot the same data with `plt.plot(marker='o', linestyle='')` and `plt.scatter()`. Compare the outputs.

**Intermediate**
4. Generate 3 clusters of 50 points each using `np.random.randn` with different centers (0,0), (5,5), (0,5). Plot them with different colors and markers, and add a legend.
5. Create a scatter plot with 200 points where each point has a different size (proportional to distance from origin) and a different color (based on angle). Add a colorbar.
6. Use `alpha` as an array to make outliers more transparent. Generate 100 points where points with `abs(z) > 1.5` have `alpha=0.2` and others have `alpha=0.8`.

**Advanced**
7. Create a "bubble chart": scatter plot of 50 points where x and y are random, size represents a value from 10-500, color represents a categorical variable (3 categories), and each category has a different marker shape. Add a legend for both categories and a colorbar explanation.
8. Build a function `scatter_grid(data, labels, n_cols)` that takes a list of (x, y, s, c) tuples and plots them in a grid of scatter subplots, each with its own colorbar and legend. Test with 6 different datasets.
