## 5. NumPy Array Slicing

## 📘 Introduction

Slicing in NumPy follows the same `start:stop:step` syntax as Python lists, but extends to multiple dimensions. A critical distinction: slicing a NumPy array returns a **view** (not a copy) in most cases, meaning modifications to the slice affect the original array.

## 🧠 Key Concepts

- **1D Slicing**: `arr[2:5]` — elements from index 2 to 4.
- **2D Slicing**: `arr[0:2, 1:3]` — rows 0–1, columns 1–2.
- **Step Slicing**: `arr[::2]` — every second element.
- **Negative Step**: `arr[::-1]` — reverses the array.
- **View vs Copy**: Basic slicing returns a **view** (shares data with original). Fancy indexing and boolean indexing return **copies**.
- **`.copy()`**: Explicitly create an independent copy: `slice_copy = arr[0:3].copy()`.
- **Reshaping after slicing**: You can chain `.reshape()` on a slice.

## 💻 Syntax

```python
import numpy as np

arr = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# 1D slicing
print(arr[2:6])     # [2 3 4 5]
print(arr[:4])      # [0 1 2 3]
print(arr[5:])      # [5 6 7 8 9]
print(arr[::2])     # [0 2 4 6 8]
print(arr[::-1])    # [9 8 7 6 5 4 3 2 1 0]

# 2D slicing
arr2d = np.array([[1, 2, 3, 4],
                  [5, 6, 7, 8],
                  [9, 10, 11, 12]])
print(arr2d[0:2, 1:3])  # [[2 3], [6 7]]
```

## ✅ Example 1 - Basic: 2D Slicing

**Problem:** From a 4x4 array of numbers 1–16, extract the 2x2 sub-array in the bottom-right corner.

```python
import numpy as np

arr = np.arange(1, 17).reshape(4, 4)
print("Original:\n", arr)

# Bottom-right 2x2
sub = arr[2:, 2:]
print("Bottom-right 2x2:\n", sub)
```

**Output:**
```
Original:
 [[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]
 [13 14 15 16]]
Bottom-right 2x2:
 [[11 12]
 [15 16]]
```

**Explanation:** `arr[2:, 2:]` selects rows from index 2 to end, and columns from index 2 to end. This yields the 2x2 block at the lower-right.

## 🚀 Example 2 - Intermediate: View vs Copy Demonstration

**Problem:** Show that modifying a slice modifies the original, and how to avoid it with `.copy()`.

```python
import numpy as np

original = np.array([1, 2, 3, 4, 5, 6])

# View behavior
view_slice = original[1:4]
view_slice[0] = 99
print("After modifying view_slice[0]:", original)

# Copy behavior
safe_copy = original[1:4].copy()
safe_copy[0] = 0
print("After modifying copy[0]:", original)
```

**Output:**
```
After modifying view_slice[0]: [ 1 99  3  4  5  6]
After modifying copy[0]: [ 1 99  3  4  5  6]
```

**Explanation:** `original[1:4]` returns a **view**. Changing `view_slice[0]` alters `original[1]`. The `.copy()` creates a new independent array — modifications to it don't affect the original.

## 🏢 Real World Use Case

**Time Series Data Windowing:** In financial analytics, a 1D array of 10,000 stock prices is sliced into rolling windows for feature engineering: `windows = np.array([prices[i:i+60] for i in range(9940)])` creates overlapping 60-day windows. Each slice returns a view, so no memory is duplicated for the 9,940 windows — critical for memory efficiency.

## 🎯 Interview Questions

1. **Does slicing a NumPy array return a view or a copy?**
   Basic slicing (using `start:stop:step`) returns a **view**. Fancy indexing and boolean indexing return **copies**.

2. **How can you force a copy when slicing?**
   Call the `.copy()` method on the slice: `arr[2:5].copy()`.

3. **What does `arr[::-1]` do?**
   It reverses the array along the first axis using a negative step.

4. **What is the output of `np.arange(10)[2:9:3]`?**
   `[2, 5, 8]` — starting at index 2, step 3, up to (not including) index 9.

5. **How do you slice a 2D array to get the first column as a 1D array?**
   `arr[:, 0]` — selects all rows and column 0. Returns a 1D array.

## ⚠ Common Errors / Mistakes

- **Forgetting that slicing returns a view** — modifying a slice unexpectedly changes the original array.
- **Confusing `arr[:2]` (first 2 elements) with `arr[2:]` (elements from index 2 onward)**.
- **Using `.copy()` unnecessarily** — it wastes memory if you're only reading the slice.
- **Slicing with step 0** — raises `ValueError: slice step cannot be zero`.

## 📝 Practice Exercises

**Beginner:**
1. From `np.arange(0, 20)`, slice elements from index 5 to 14.
2. From a 5x5 array of 1–25, extract the first 3 rows and first 2 columns.
3. Use slicing to reverse a 1D array of `[10, 20, 30, 40, 50]`.

**Intermediate:**
4. Create a 6x6 array and use slicing to extract every other row and every other column.
5. Demonstrate the view vs copy behavior by creating a slice, modifying it, and showing the original changed. Then use `.copy()` to prevent it.
6. From a 4x4 array, use slicing to extract the 2x2 sub-array in the center (rows 1–2, cols 1–2) as a view, then reshape it to 4 elements.

**Advanced:**
7. Write a function `extract_diagonal(arr)` that returns the main diagonal of any 2D array using only slicing (no `np.diag`).
8. Using slicing and step, create a 10x10 array of zeros and set a checkerboard pattern so that `arr[i,j] = 1` when `(i+j) % 2 == 0` — all in one slicing statement.
