## 12. Matplotlib Histograms

## 📘 Introduction

Histograms visualize the distribution of numerical data by binning values into intervals and counting frequencies. Matplotlib's `plt.hist()` is flexible — supporting custom bin counts/ranges, cumulative distributions, multiple histograms with alpha blending, different histogram styles, and 2D histograms.

## 🧠 Key Concepts

- **`plt.hist(data, bins)`**: Compute and draw a histogram.
- **`bins`**: Number of bins (int) or bin edges (array or string like `'auto'`, `'scott'`, `'fd'`).
- **`range`**: Lower and upper range of bins (outliers are ignored).
- **`density`**: If True, normalized to form a probability density (area = 1).
- **`cumulative`**: If True, computes cumulative distribution.
- **`histtype`**: `'bar'` (default), `'step'`, `'stepfilled'`, `'barstacked'`.
- **`alpha`**: Transparency for overlapping histograms.
- **`hist2d`**: 2D histogram (heatmap of bivariate data).

## 💻 Syntax

```python
import matplotlib.pyplot as plt
import numpy as np

data = np.random.randn(1000)

# Basic histogram
plt.hist(data, bins=30)

# Customized
plt.hist(data, bins=20, range=(-3, 3), density=True, cumulative=False,
         histtype='stepfilled', color='steelblue', edgecolor='black', alpha=0.7)

# Multiple histograms
plt.hist(data1, bins=30, alpha=0.5, label='Series 1')
plt.hist(data2, bins=30, alpha=0.5, label='Series 2')
plt.legend()

# 2D histogram
x = np.random.randn(5000)
y = np.random.randn(5000)
plt.hist2d(x, y, bins=40, cmap='viridis')
plt.colorbar(label='Counts')
```

## ✅ Example 1 - Basic: Single Histogram with Multiple bin Settings

**Problem:** Generate normally distributed data and explore different bin configurations.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

data = np.random.randn(1000)

plt.figure(figsize=(12, 4))

plt.subplot(1, 3, 1)
plt.hist(data, bins=10, edgecolor='white')
plt.title('10 bins')

plt.subplot(1, 3, 2)
plt.hist(data, bins=30, edgecolor='white', color='coral')
plt.title('30 bins')

plt.subplot(1, 3, 3)
plt.hist(data, bins='auto', edgecolor='white', color='green')
plt.title('auto bins')

plt.tight_layout()
plt.show()
```

**Output Description:** Three histograms of the same data: 10 bins (blocky), 30 bins (smoother), 'auto' bins (optimally chosen by Matplotlib's estimator).

**Explanation:** Fewer bins oversimplifies the distribution; too many bins may show noise. `bins='auto'` uses a heuristic (Freedman-Diaconis rule) to choose an appropriate bin count.

## 🚀 Example 2 - Intermediate: Overlapping Distributions + 2D Histogram

**Problem:** Compare two overlapping distributions and show a 2D histogram of bivariate data.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

# Generate two overlapping distributions
np.random.seed(42)
data1 = np.random.normal(0, 1, 2000)
data2 = np.random.normal(1.5, 1.2, 1500)

plt.figure(figsize=(12, 5))

# 1D histograms with alpha
plt.subplot(1, 2, 1)
plt.hist(data1, bins=40, density=True, alpha=0.6, color='blue', label='Group A')
plt.hist(data2, bins=40, density=True, alpha=0.6, color='red', label='Group B')
plt.xlabel('Value')
plt.ylabel('Density')
plt.title('Overlapping Distributions')
plt.legend()
plt.grid(axis='y', alpha=0.3)

# 2D histogram
plt.subplot(1, 2, 2)
x = np.random.randn(5000)
y = x * 0.5 + np.random.randn(5000) * 0.5
h = plt.hist2d(x, y, bins=30, cmap='viridis', cmin=1)
plt.colorbar(h[3], label='Count')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('2D Histogram (Joint Distribution)')

plt.tight_layout()
plt.show()
```

**Output Description:** Left: two bell curves overlapping — blue centered at 0, red centered at 1.5, both normalized (density). Right: a heatmap showing density of 5000 (x,y) points with a positive correlation.

**Explanation:** `density=True` normalizes each histogram so area = 1, making non-equal sample sizes comparable. `hist2d` bins both x and y simultaneously and colors by count.

## 🏢 Real World Use Case

**Quality control in manufacturing:** An engineer measures the diameter of 10,000 ball bearings. A histogram reveals the distribution shape, detects outliers, and checks if the process is centered on the target spec with acceptable spread (6-sigma limits).

## 🎯 Interview Questions

**1. What is the difference between `normed=True` (deprecated) and `density=True`?**
- Both normalize the histogram. `density=True` makes the integral (area) equal 1. `normed` was the older parameter — use `density` in modern Matplotlib.

**2. How does `bins='auto'` determine the number of bins?**
- It uses the Freedman-Diaconis rule: bin width = 2 * IQR * n^(-1/3), which is robust to outliers.

**3. What is the return value of `plt.hist()`?**
- A tuple `(n, bins, patches)`: `n` is the array of bin counts/probabilities, `bins` is the array of bin edges, `patches` is a list of Bar containers.

**4. How do you create a cumulative distribution plot using `hist()`?**
- Set `cumulative=True`. Optionally set `density=True` for a cumulative density function (CDF) that goes from 0 to 1.

**5. What does `hist2d()` return and how do you add a colorbar?**
- Returns `(counts, xedges, yedges, image)`. Use `plt.colorbar(image)` passing the 4th return value `h[3]`.

## ⚠ Common Errors / Mistakes

- **Using `density=True` without understanding it** – Y-axis becomes probability density, not count. Readers may misinterpret.
- **Choosing too few or too many bins** – 5 bins hides detail; 200 bins looks noisy. Start with `bins='auto'` or 20-40 bins.
- **Plotting histograms of different sample sizes without `density=True`** – The taller distribution will dominate.
- **`hist2d` bins too large** – 2D histograms with many bins may look sparse. Use `cmin=1` to hide empty cells.
- **Forgetting `alpha` for overlapping histograms** – The second histogram completely obscures the first.

## 📝 Practice Exercises

**Beginner**
1. Generate 500 random numbers from a normal distribution and plot a histogram with 25 bins.
2. Create a histogram of `np.random.exponential(scale=2, size=1000)` with 30 bins, green color, white edges.
3. Plot a cumulative histogram of the same data.

**Intermediate**
4. Generate two datasets: `N(0,1)` and `N(2,1.5)` with 1000 samples each. Plot overlapping histograms with `density=True`, `alpha=0.5`, and a legend.
5. Create a 2D histogram of 10000 points where `y = 2x + noise`, with `x ~ N(0,1)`. Use 40 bins and the 'plasma' colormap.
6. Plot 4 histograms in a 2×2 grid: (a) 10 bins, (b) 50 bins, (c) cumulative=True, (d) histtype='step'.

**Advanced**
7. Create a "stacked histogram" of 3 categorical groups using `histtype='barstacked'`. Generate 3 sets of 500 samples from different normal distributions. Add a legend.
8. Build a function `compare_distributions(distributions, labels, bins=30)` that takes a list of sample arrays and plots overlapping histograms with `density=True`, optimal alpha blending, automatic color assignment, and a legend. Test with 5 different distributions (normal, exponential, uniform, chi-squared, beta).
