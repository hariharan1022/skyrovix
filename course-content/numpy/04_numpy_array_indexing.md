## 4. NumPy Array Indexing

## 📘 Introduction

Indexing in NumPy is powerful and flexible. Beyond standard Python indexing, NumPy supports boolean indexing, fancy indexing with integer arrays, and `np.where()` for conditional selection. Mastering these techniques is essential for efficient data manipulation.

## 🧠 Key Concepts

- **1D Indexing**: `arr[i]` — zero-based, works like Python lists.
- **2D Indexing**: `arr[row, col]` — comma-separated indices.
- **Negative Indexing**: `arr[-1]` accesses the last element.
- **Boolean Indexing**: `arr[arr > 5]` — filters elements based on a condition.
- **Fancy Indexing**: `arr[[1, 3, 5]]` — select elements by a list of indices.
- **`np.where()`**: Returns indices where a condition is True (or conditional replacement).

## 💻 Syntax

```python
import numpy as np

arr = np.array([10, 20, 30, 40, 50])

# 1D indexing
print(arr[0])       # 10
print(arr[-1])      # 50

# 2D indexing
arr2d = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr2d[1, 2])  # 6 (row 1, col 2)

# Boolean indexing
print(arr[arr > 30])  # [40 50]

# Fancy indexing
print(arr[[0, 2, 4]])  # [10 30 50]

# np.where
indices = np.where(arr > 30)  # (array([3, 4]),)
```

## ✅ Example 1 - Basic: 1D and 2D Indexing

**Problem:** Access specific elements from 1D and 2D arrays using positive and negative indices.

```python
import numpy as np

a = np.array([5, 10, 15, 20, 25])
print(a[1])    # second element
print(a[-1])   # last element

b = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
print(b[0, 2])  # first row, third col
print(b[-1, -2])  # last row, second-last col
```

**Output:**
```
10
25
3
8
```

**Explanation:** Indexing follows zero-based convention. Negative indices count from the end. 2D indexing uses `[row, col]` separated by a comma.

## 🚀 Example 2 - Intermediate: Boolean and Fancy Indexing

**Problem:** From an array of integers, extract all even numbers, then extract elements at positions 0, 2, 4.

```python
import numpy as np

arr = np.array([12, 7, 9, 24, 15, 30, 18])

# Boolean indexing
evens = arr[arr % 2 == 0]
print("Evens:", evens)

# Fancy indexing
selected = arr[[0, 2, 4]]
print("Indices [0,2,4]:", selected)

# np.where to get indices of evens
idx = np.where(arr % 2 == 0)
print("Where evens:", idx)
```

**Output:**
```
Evens: [12 24 30 18]
Indices [0,2,4]: [12  9 15]
Where evens: (array([0, 3, 5, 6]),)
```

**Explanation:** Boolean indexing evaluates the condition element-wise and returns a 1D array of matching values. Fancy indexing takes an array of indices and returns elements at those positions. `np.where` returns a tuple of index arrays for each dimension.

## 🏢 Real World Use Case

**Outlier Removal in Sensor Data:** A temperature sensor array of 10,000 readings contains occasional spurious values (>150°C or < -50°C). Using boolean indexing, a data engineer filters them in one line: `clean = temps[(temps > -50) & (temps < 150)]`. Using `np.where`, they also get the index positions of outliers for logging: `bad_idx = np.where((temps < -50) | (temps > 150))`.

## 🎯 Interview Questions

1. **What is boolean indexing in NumPy?**
   Filtering an array by passing a boolean array of the same shape as the index. Elements at `True` positions are returned.

2. **What does `arr[[3, 1, 2]]` do?**
   It uses fancy indexing to return elements at positions 3, 1, 2 (in that order).

3. **How does `np.where()` work?**
   `np.where(condition)` returns a tuple of arrays containing indices where condition is True. `np.where(condition, x, y)` returns elements from `x` where True, else from `y`.

4. **Can you use boolean indexing on multi-dimensional arrays?**
   Yes. The boolean array must have the same shape. It returns a 1D array of elements where the boolean is True.

5. **What is the difference between `arr[1][2]` and `arr[1, 2]`?**
   Both return the same element, but `arr[1, 2]` is the recommended NumPy style (faster, single indexing operation). `arr[1][2]` does two steps: first selects row 1 (a view), then indexes that row.

## ⚠ Common Errors / Mistakes

- **Using `arr[1, 2]` on a 1D array** — raises `IndexError: too many indices`.
- **Chaining boolean conditions with `and` / `or`** — must use `&` / `|` and parenthesize each condition: `(arr > 0) & (arr < 10)`.
- **Modifying a fancy-indexed copy** — fancy indexing returns a **copy**, not a view. Changes won't affect the original.
- **Using incorrect index with `np.where`** — `np.where` expects a condition array, not a scalar.

## 📝 Practice Exercises

**Beginner:**
1. From `[100, 200, 300, 400, 500]`, extract the third element using positive and negative indexing.
2. From a 3x3 array of 1–9, extract the center element (row 1, col 1).
3. Select all elements greater than 5 from `np.array([4, 7, 2, 9, 1, 6])`.

**Intermediate:**
4. From a 5x5 random array, extract all elements greater than 0.5 and count them.
5. Use `np.where()` to replace all negative values in an array with 0.
6. Use fancy indexing to reorder the rows of a 4x3 array in reverse order: `[[3],[2],[1],[0]]`.

**Advanced:**
7. Given a 1D array of 20 random integers (0–100), use boolean indexing to find all prime numbers.
8. Use `np.where()` with two source arrays (`x` and `y`) to create a new array that takes values from `x` where a condition is True and from `y` otherwise (vectorized conditional).
