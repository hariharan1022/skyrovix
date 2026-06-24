## 9. NumPy Reshape

## 📘 Introduction

Reshaping changes the dimensions of an array without changing its data. NumPy provides flexible tools to restructure arrays: `reshape`, `resize`, `flatten`, `ravel`, `transpose`, and dimension manipulation with `newaxis`, `expand_dims`, and `squeeze`.

## 🧠 Key Concepts

- **`np.reshape(arr, newshape)` / `arr.reshape(newshape)`**: Returns a new view with a different shape (same data).
- **`.resize()`**: Changes shape **in-place** (unlike reshape) and can truncate or pad.
- **`.flatten()`**: Returns a **copy** of the array collapsed to 1D.
- **`.ravel()`**: Returns a **view** (when possible) of the array collapsed to 1D.
- **`np.transpose()` / `.T`**: Reverses or permutes axes.
- **`np.newaxis` / `np.expand_dims()`**: Adds a new axis of size 1.
- **`np.squeeze()`**: Removes all size-1 dimensions.
- **`-1` in reshape**: Automatically infers the dimension size from the data length.

## 💻 Syntax

```python
import numpy as np

arr = np.arange(12)

# Reshape
print(arr.reshape(3, 4))        # 3x4 matrix
print(arr.reshape(2, -1))        # 2 rows, cols inferred = 6
print(arr.reshape(-1, 6))        # rows inferred = 2, 6 cols

# Flatten vs Ravel
flat = arr.reshape(3, 4).flatten()   # copy
rav = arr.reshape(3, 4).ravel()      # view (if possible)

# Transpose
mat = arr.reshape(3, 4)
print(mat.T)                     # 4x3
print(np.transpose(mat, (1, 0))) # same

# Add/remove dimensions
a = np.array([1, 2, 3])
print(a[np.newaxis, :])          # (1, 3)
print(np.expand_dims(a, axis=1)) # (3, 1)
print(np.squeeze(np.zeros((1,3,1,4))))  # (3, 4)
```

## ✅ Example 1 - Basic: Reshape 1D to 2D

**Problem:** Convert a 1D array of 12 elements into a 3x4 matrix and a 2x6 matrix.

```python
import numpy as np

arr = np.arange(1, 13)
print("Original:", arr)

m1 = arr.reshape(3, 4)
print("3x4:\n", m1)

m2 = arr.reshape(2, -1)  # -1 infers 6
print("2x6:\n", m2)
```

**Output:**
```
Original: [ 1  2  3  4  5  6  7  8  9 10 11 12]
3x4:
 [[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
2x6:
 [[ 1  2  3  4  5  6]
 [ 7  8  9 10 11 12]]
```

**Explanation:** `reshape(3, 4)` reinterprets the 12 elements as 3 rows × 4 columns. Using `-1` lets NumPy compute the missing dimension: `2 * -1 = 12` → `-1 = 6`.

## 🚀 Example 2 - Intermediate: Flatten vs Ravel and Transpose

**Problem:** Demonstrate the difference between `flatten()` (copy) and `ravel()` (view) and transpose a 2D array.

```python
import numpy as np

mat = np.array([[1, 2, 3],
                [4, 5, 6]])

# Transpose
print("Original shape:", mat.shape)
print("Transposed:\n", mat.T)
print("T shape:", mat.T.shape)

# Flatten vs Ravel
flat = mat.flatten()
rav = mat.ravel()

flat[0] = 999
print("After modifying flat (original unchanged):\n", mat)

rav[0] = 999
print("After modifying ravel (original changed!):\n", mat)
```

**Output:**
```
Original shape: (2, 3)
Transposed:
 [[1 4]
 [2 5]
 [3 6]]
T shape: (3, 2)
After modifying flat (original unchanged):
 [[1 2 3]
 [4 5 6]]
After modifying ravel (original changed!):
 [[999   2   3]
 [  4   5   6]]
```

**Explanation:** `.T` reverses axes. `.flatten()` always returns a copy; modifying it doesn't affect the original. `.ravel()` returns a view (if the array is C-contiguous), so modifications propagate to the original.

## 🏢 Real World Use Case

**Deep Learning Batch Processing:** A batch of 64 RGB images of size 32×32 arrives as shape `(64, 32, 32, 3)`. To feed into a fully connected layer, it's flattened to `(64, 3072)` via `X.reshape(64, -1)`. Before a convolutional layer, a 1D feature vector `(64, 1024)` is reshaped back to `(64, 32, 32, 1)` using `reshape` with `np.newaxis`.

## 🎯 Interview Questions

1. **What is the difference between `flatten()` and `ravel()`?**
   `flatten()` returns a **copy** of the data collapsed to 1D. `ravel()` returns a **view** when possible, which is more memory-efficient.

2. **What does `-1` mean in `reshape`?**
   It tells NumPy to infer the dimension size automatically so that the total number of elements remains the same.

3. **How do you transpose a 2D array?**
   Use `.T` property or `np.transpose(arr)`. For higher dimensions, `np.transpose(arr, axes)` accepts a tuple of axis permutations.

4. **What does `np.squeeze()` do?**
   Removes all dimensions of size 1 from the array's shape. `np.squeeze(arr).shape` for `(1, 3, 1, 4)` becomes `(3, 4)`.

5. **How do you add an extra dimension to a 1D array?**
   Use `arr[np.newaxis, :]` to get shape `(1, n)`, or `arr[:, np.newaxis]` to get shape `(n, 1)`. Alternatively, `np.expand_dims(arr, axis=0)`.

## ⚠ Common Errors / Mistakes

- **`reshape` cannot be used if the new shape is incompatible with the number of elements** — raises `ValueError`.
- **Modifying a `ravel` view changes the original array unexpectedly**.
- **Using `.T` on a 1D array** — has no effect (1D arrays are not transposed; `.T` returns the same array).
- **Forgetting that `resize()` modifies in-place** — unlike `reshape()` which returns a new array.

## 📝 Practice Exercises

**Beginner:**
1. Create `np.arange(16)` and reshape it to 4x4.
2. From a 4x4 array, use `.flatten()` to get a 1D array.
3. Use `.T` to transpose a 2x5 array.

**Intermediate:**
4. Use `reshape` with `-1` to convert an array of 20 elements into 5 rows (infer columns).
5. Demonstrate the view vs copy difference between `ravel()` and `flatten()` by modifying both and checking the original.
6. Given `a = np.array([[1,2,3],[4,5,6]])`, use `np.expand_dims` to add a batch dimension at axis=0.

**Advanced:**
7. Write a function `to_channels_last(arr)` that converts from `(batch, channels, height, width)` to `(batch, height, width, channels)` using transpose.
8. Use `np.squeeze` to remove all size-1 dimensions from an array of shape `(1, 5, 1, 1, 3, 1)` and confirm the result shape.
