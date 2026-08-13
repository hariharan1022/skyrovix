## 8. NumPy Math Functions

## 📘 Introduction

NumPy provides a comprehensive set of mathematical functions for aggregating, summarizing, and analyzing array data. These functions operate element-wise and along specified axes, making them essential for both exploratory data analysis and statistical computations.

## 🧠 Key Concepts

- **Aggregation functions**: `np.sum()`, `np.mean()`, `np.median()`, `np.min()`, `np.max()`, `np.std()`, `np.var()`.
- **Product and cumulative**: `np.prod()`, `np.cumsum()`, `np.cumprod()`.
- **Differences**: `np.diff()` — computes discrete differences along a given axis.
- **Axis parameter**: `axis=0` operates column-wise (along rows), `axis=1` operates row-wise (along columns). For higher dimensions, axes are numbered 0, 1, 2, ...
- **Global functions vs methods**: `np.sum(arr)` and `arr.sum()` are equivalent.
- **NaN-safe versions**: `np.nansum()`, `np.nanmean()`, `np.nanstd()` etc. ignore NaN values.

## 💻 Syntax

```python
import numpy as np

arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(np.sum(arr))          # 21 (total sum)
print(np.mean(arr))         # 3.5
print(np.sum(arr, axis=0))  # [5 7 9]   (column-wise)
print(np.sum(arr, axis=1))  # [6 15]    (row-wise)
print(np.min(arr))          # 1
print(np.max(arr))          # 6
print(np.std(arr))          # 1.7078
print(np.var(arr))          # 2.9167
print(np.cumsum(arr))       # [1 3 6 10 15 21]
print(np.diff(arr))         # [[1 1], [1 1]]
```

## ✅ Example 1 - Basic: Statistical Summary

**Problem:** Compute summary statistics for a 1D array of exam scores.

```python
import numpy as np

scores = np.array([85, 92, 78, 94, 88, 76, 95, 89, 91, 83])

print("Scores:", scores)
print("Sum:", np.sum(scores))
print("Mean:", np.mean(scores))
print("Median:", np.median(scores))
print("Std Dev:", np.std(scores))
print("Variance:", np.var(scores))
print("Min:", np.min(scores))
print("Max:", np.max(scores))
print("Range:", np.ptp(scores))  # peak-to-peak (max - min)
```

**Output:**
```
Scores: [85 92 78 94 88 76 95 89 91 83]
Sum: 871
Mean: 87.1
Median: 88.5
Std Dev: 6.315
Variance: 39.89
Min: 76
Max: 95
Range: 19
```

**Explanation:** All functions are vectorized and return scalar results for 1D arrays. `np.median()` sorts internally. `np.std()` uses population std (ddof=0) by default.

## 🚀 Example 2 - Intermediate: Axis-wise Aggregation

**Problem:** Given a 3x4 sales matrix (rows=products, cols=quarters), compute total sales per product and per quarter.

```python
import numpy as np

sales = np.array([[120, 150, 135, 200],   # Product A
                  [ 85,  95, 110, 130],   # Product B
                  [210, 195, 220, 250]])  # Product C

print("Sales (products x quarters):\n", sales)

# Sum across axis
total_per_product = np.sum(sales, axis=1)  # sum columns → per product
total_per_quarter = np.sum(sales, axis=0)  # sum rows → per quarter

print("Total per product:", total_per_product)
print("Total per quarter:", total_per_quarter)

# Cumulative sum per product
cum = np.cumsum(sales, axis=1)
print("Cumulative per product:\n", cum)
```

**Output:**
```
Sales (products x quarters):
 [[120 150 135 200]
 [ 85  95 110 130]
 [210 195 220 250]]
Total per product: [605 420 875]
Total per quarter: [415 440 465 580]
Cumulative per product:
 [[120 270 405 605]
 [ 85 180 290 420]
 [210 405 625 875]]
```

**Explanation:** `axis=1` collapses columns → one result per row (product). `axis=0` collapses rows → one result per column (quarter). `np.cumsum(axis=1)` gives running totals across quarters for each product.

## 🏢 Real World Use Case

**Portfolio Risk Analysis:** A financial analyst computes daily returns as `np.diff(prices) / prices[:-1]`, then computes annualized volatility as `np.std(daily_returns) * np.sqrt(252)`. For a portfolio of 500 stocks, the correlation matrix is computed using `np.corrcoef(returns_matrix)` with `axis=0` or `axis=1` depending on layout.

## 🎯 Interview Questions

1. **What does `np.sum(arr, axis=0)` do?**
   Sums along the first axis (rows), effectively computing column-wise sums. The result has one element per column.

2. **How is `np.cumsum()` different from `np.sum()`?**
   `np.sum()` returns a single total; `np.cumsum()` returns an array of partial sums up to each position.

3. **What does `np.diff(arr)` compute?**
   The discrete difference: `arr[1:] - arr[:-1]` by default. For a 1D array of length n, it returns n-1 elements.

4. **How do you compute standard deviation ignoring NaN values?**
   Use `np.nanstd(arr)` — it excludes NaN values from the calculation.

5. **What is `np.ptp()`?**
   Peak-to-peak: the range of values (max - min) along a given axis.

## ⚠ Common Errors / Mistakes

- **Confusing `axis=0` and `axis=1`**: `axis=0` goes **down** rows (column operation), `axis=1` goes **across** columns (row operation).
- **Using `np.mean()` on integer arrays** — returns float64 result, which is correct, but the array itself stays int.
- **Assuming `np.median()` works on multi-dimensional arrays without specifying axis** — it flattens by default.
- **Forgetting that `np.diff()` reduces array length by 1 along the specified axis**.

## 📝 Practice Exercises

**Beginner:**
1. Compute the sum, mean, min, max, and std of `np.array([10, 20, 30, 40, 50])`.
2. Given a 3x3 array of 1–9, compute the sum of all elements.
3. Use `np.cumsum()` on `np.array([1, 2, 3, 4])` and explain the output.

**Intermediate:**
4. Create a 4x5 array of random integers (0–100). Compute column-wise mean and row-wise sum.
5. Use `np.diff()` on `np.array([1, 4, 9, 16, 25])` — what pattern do you see?
6. Generate a 5x5 array and use `np.var(axis=1)` to find which row has the highest variance.

**Advanced:**
7. Write a function `normalize(arr)` that subtracts the mean and divides by std along the last axis (standardization).
8. Use `np.cumsum()` and slicing to implement a simple moving average (window size 5) on a 1D time series of 100 random values.
