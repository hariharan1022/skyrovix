## 10. NumPy Array Manipulation

## 📘 Introduction

NumPy provides a comprehensive set of functions for joining, splitting, adding, removing, and sorting array elements. These manipulation tools are essential for data preprocessing, feature engineering, and pipeline construction.

## 🧠 Key Concepts

- **Joining arrays**: `np.concatenate()`, `np.vstack()` (vertical stack), `np.hstack()` (horizontal stack).
- **Splitting arrays**: `np.split()`, `np.vsplit()`, `np.hsplit()`, `np.array_split()` (uneven splits).
- **Adding/removing elements**: `np.append()`, `np.insert()`, `np.delete()`.
- **Unique values**: `np.unique()` returns sorted unique elements, with optional `return_index`, `return_counts`, `return_inverse`.
- **Axis control**: All manipulation functions accept an `axis` parameter to control along which dimension to operate.

## 💻 Syntax

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Concatenate
print(np.concatenate([a, b]))          # [1 2 3 4 5 6]

# Vertical & horizontal stack
a2d = np.array([[1, 2], [3, 4]])
b2d = np.array([[5, 6]])
print(np.vstack([a2d, b2d]))           # [[1 2], [3 4], [5 6]]
print(np.hstack([a2d, a2d]))           # [[1 2 1 2], [3 4 3 4]]

# Split
arr = np.arange(10)
print(np.split(arr, 5))                # 5 arrays of size 2
print(np.array_split(arr, 3))          # uneven split → 3 arrays

# Unique
vals = np.array([3, 1, 2, 1, 3, 2])
print(np.unique(vals))                 # [1 2 3]
```

## ✅ Example 1 - Basic: Joining Arrays Vertically and Horizontally

**Problem:** Combine three 1D arrays into a 2D matrix, then add an extra column.

```python
import numpy as np

names = np.array(['Alice', 'Bob', 'Charlie'])
scores = np.array([85, 92, 78])
grades = np.array(['B', 'A', 'C'])

# Stack as columns (hstack needs 2D or column vectors)
# First convert to 2D column vectors
names_col = names[:, np.newaxis]
scores_col = scores[:, np.newaxis]
grades_col = grades[:, np.newaxis]

combined = np.hstack([names_col, scores_col, grades_col])
print("Combined table:\n", combined)

# Or use column_stack
combined2 = np.column_stack([names, scores, grades])
print("\nUsing column_stack:\n", combined2)
```

**Output:**
```
Combined table:
 [['Alice' '85' 'B']
 ['Bob' '92' 'A']
 ['Charlie' '78' 'C']]

Using column_stack:
 [['Alice' '85' 'B']
 ['Bob' '92' 'A']
 ['Charlie' '78' 'C']]
```

**Explanation:** `np.hstack` joins arrays horizontally (along columns). The `[:, np.newaxis]` converts 1D arrays to column vectors (shape `(n,1)`). `np.column_stack` does this automatically.

## 🚀 Example 2 - Intermediate: Split and Unique with Counts

**Problem:** Split a sorted array at specific positions and find unique values with their frequencies.

```python
import numpy as np

data = np.array([5, 5, 5, 10, 15, 15, 20, 25, 30, 30, 30])

# Unique with counts
values, counts = np.unique(data, return_counts=True)
print("Unique:", values)
print("Counts:", counts)

# Split into 3 parts (uneven)
parts = np.array_split(data, 3)
for i, part in enumerate(parts):
    print(f"Part {i}:", part)

# Insert and delete
extended = np.insert(data, 0, [0, 0])  # insert at start
print("Inserted:", extended)

trimmed = np.delete(data, [0, 1, 2])   # remove first 3
print("Trimmed:", trimmed)
```

**Output:**
```
Unique: [ 5 10 15 20 25 30]
Counts: [3 1 2 1 1 3]
Part 0: [5 5 5 10]
Part 1: [15 15 20]
Part 2: [25 30 30 30]
Inserted: [0 0 5 5 5 10 15 15 20 25 30 30 30]
Trimmed: [10 15 15 20 25 30 30 30]
```

**Explanation:** `np.unique` with `return_counts=True` gives frequency analysis. `np.array_split` handles uneven splits without error. `np.insert` and `np.delete` create new arrays with elements added or removed.

## 🏢 Real World Use Case

**Data Preprocessing for Machine Learning:** A data scientist merges three CSV files: features (1000×20), labels (1000×1), and metadata (1000×5). Using `np.hstack([features, labels, metadata])`, they create a unified array. Then they split into train/test using `train, test = np.split(data, [800])`. After training, they use `np.unique(y_train, return_counts=True)` to check label distribution for class imbalance.

## 🎯 Interview Questions

1. **What is the difference between `vstack` and `hstack`?**
   `vstack` stacks arrays vertically (along rows, increasing the first dimension). `hstack` stacks horizontally (along columns, increasing the second dimension).

2. **What does `np.unique(arr, return_counts=True)` return?**
   A tuple of two arrays: sorted unique values and their corresponding frequencies.

3. **How does `np.array_split` differ from `np.split`?**
   `np.split` requires equal divisions and raises an error if the array cannot be divided evenly. `np.array_split` handles uneven splits gracefully.

4. **What does `np.concatenate([a, b], axis=0)` do?**
   Joins arrays `a` and `b` along axis 0. For 2D arrays, this stacks them vertically.

5. **How do you insert a value at a specific position in a NumPy array?**
   `np.insert(arr, index, values)` — returns a new array with the values inserted before the given index.

## ⚠ Common Errors / Mistakes

- **Using `np.append` in a loop** — it creates a new array each time (O(n²) complexity). Pre-allocate or use a list.
- **Forgetting that `np.delete` returns a new array** — does NOT modify in-place.
- **Stacking arrays with incompatible shapes** — must be compatible along all axes except the concatenation axis.
- **`np.split` raises an error for uneven splits** — use `np.array_split` instead.

## 📝 Practice Exercises

**Beginner:**
1. Concatenate `[1, 2, 3]` and `[4, 5, 6]` using `np.concatenate`.
2. Vertically stack `[[1, 2], [3, 4]]` and `[[5, 6]]`.
3. Use `np.unique` on `[2, 3, 2, 1, 3, 1, 4]` to find unique values.

**Intermediate:**
4. Split `np.arange(100)` into 10 equal parts using `np.split`.
5. Insert the value `99` at every even index of `[1, 2, 3, 4, 5]`.
6. Use `np.unique` with `return_counts` to find the most frequent element in `[1, 1, 1, 2, 3, 3, 4, 4, 4, 4]`.

**Advanced:**
7. Implement a function `shuffle_arrays(x, y)` that shuffles two arrays identically (maintaining pairing) using `np.random.permutation`.
8. Given a 2D array of shape `(100, 5)`, split into training (80%) and testing (20%) using `np.split` and verify the shapes.
