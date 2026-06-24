## 3. NumPy Creating Arrays

## 📘 Introduction

NumPy provides a rich set of factory functions to create arrays with specific patterns: zeros, ones, empty, ranges, random values, and identity matrices. These are often more efficient and readable than constructing arrays manually from Python lists.

## 🧠 Key Concepts

- **`np.array()`**: General-purpose constructor from array-like objects.
- **`np.zeros()` / `np.ones()` / `np.empty()`**: Arrays filled with 0, 1, or uninitialized memory.
- **`np.full()`**: Fill with a specified constant value.
- **`np.arange()`**: Like Python's `range()` but returns an ndarray.
- **`np.linspace()`**: Evenly spaced numbers over a specified interval.
- **`np.eye()`**: Identity matrix (2D).
- **`np.random.rand()` / `np.random.randint()`**: Random uniform/floating/integer arrays.
- **Seed for reproducibility**: `np.random.seed(42)` ensures identical random output across runs.

## 💻 Syntax

```python
import numpy as np

np.array([1, 2, 3])                  # from list
np.zeros((2, 3))                     # 2x3 of zeros
np.ones((2, 3))                      # 2x3 of ones
np.empty((2, 3))                     # 2x3 uninitialized (garbage values)
np.full((2, 3), 7)                   # 2x3 all 7s
np.arange(0, 10, 2)                  # [0, 2, 4, 6, 8]
np.linspace(0, 1, 5)                 # [0.0, 0.25, 0.5, 0.75, 1.0]
np.eye(3)                            # 3x3 identity
np.random.rand(2, 3)                 # 2x3 uniform [0,1)
np.random.randint(0, 10, size=(2,3)) # 2x3 random integers 0..9
```

## ✅ Example 1 - Basic: Creating a Range and Linear Space

**Problem:** Create an array of even numbers from 0 to 18 and 5 equally spaced points between 0 and 1.

```python
import numpy as np

arange_arr = np.arange(0, 20, 2)
print("arange:", arange_arr)

lin_arr = np.linspace(0, 1, 5)
print("linspace:", lin_arr)
```

**Output:**
```
arange: [ 0  2  4  6  8 10 12 14 16 18]
linspace: [0.   0.25 0.5  0.75 1.  ]
```

**Explanation:** `np.arange(0, 20, 2)` is exclusive of stop (20). `np.linspace(0, 1, 5)` includes both endpoints by default, producing exactly 5 evenly spaced floats.

## 🚀 Example 2 - Intermediate: Array Initialization Comparison

**Problem:** Compare `np.zeros`, `np.ones`, `np.full`, and `np.empty` by creating arrays of shape `(3, 4)`.

```python
import numpy as np

print("zeros:\n", np.zeros((3, 4)))
print("ones:\n", np.ones((3, 4)))
print("full(7):\n", np.full((3, 4), 7))
print("empty (may show garbage):\n", np.empty((3, 4)))
```

**Output:**
```
zeros:
 [[0. 0. 0. 0.]
 [0. 0. 0. 0.]
 [0. 0. 0. 0.]]
ones:
 [[1. 1. 1. 1.]
 [1. 1. 1. 1.]
 [1. 1. 1. 1.]]
full(7):
 [[7 7 7 7]
 [7 7 7 7]
 [7 7 7 7]]
empty (may show garbage):
 [[4.9e-324 9.9e-324 1.5e-323 2.0e-323]
 [2.5e-323 3.0e-323 3.5e-323 4.0e-323]
 [4.4e-323 4.9e-323 5.4e-323 5.9e-323]]
```

**Explanation:** `np.empty()` allocates memory without initializing values — it contains whatever was in memory at that location (often near-zero garbage). Always use `np.zeros()` or `np.full()` when you need predictable values.

## 🏢 Real World Use Case

**Neural Network Weight Initialization:** When building a deep learning model from scratch, you use `np.random.randn(layer_in, layer_out) * 0.01` to initialize weight matrices (small random values to break symmetry). For bias vectors, `np.zeros((layer_out,))` is standard. Setting `np.random.seed(42)` ensures reproducible training runs across team members.

## 🎯 Interview Questions

1. **What is the difference between `np.arange()` and `np.linspace()`?**
   `np.arange()` creates values with a given step size (like `range`), while `np.linspace()` creates a specified number of evenly spaced values over an interval.

2. **Why would you use `np.empty()` instead of `np.zeros()`?**
   For performance — `np.empty()` skips initialization, which is faster when you plan to overwrite every element immediately.

3. **How do you create a 5x5 identity matrix in NumPy?**
   `np.eye(5)`.

4. **How do you ensure reproducible random arrays?**
   Call `np.random.seed(42)` (or any integer) before generating random arrays. This seeds the global random state.

5. **What does `np.full((3, 4), -1)` produce?**
   A 3×4 array where every element is `-1`.

## ⚠ Common Errors / Mistakes

- **Passing shape as separate arguments to `np.zeros`**: Correct is `np.zeros((2, 3))` with a tuple, not `np.zeros(2, 3)`.
- **`np.arange()` with float step** can produce unexpected element counts due to floating-point precision. Use `np.linspace()` when exact count matters.
- **Forgetting `np.random.seed()` only affects the global random state** — each call to `np.random.*` advances the state.
- **Using `np.empty()` and assuming it's zero** — the values are unpredictable.

## 📝 Practice Exercises

**Beginner:**
1. Create a 1D array of zeros of length 10.
2. Create a 4x6 array of ones of dtype `int32`.
3. Create an array of numbers from 10 to 50 (inclusive) with step 5.

**Intermediate:**
4. Create a 3x3 identity matrix, then change its center element to 9.
5. Generate a 5x5 array of random integers between 1 and 100, then compute its mean.
6. Create an array of 7 equally spaced values between 1 and 10 (inclusive). Verify they are evenly spaced by computing `np.diff()`.

**Advanced:**
7. Write a function that creates a checkerboard pattern (8x8) of zeros and ones using `np.zeros()` and slicing.
8. Use `np.random.seed()` to generate the same 4x4 random array twice and demonstrate bitwise equality with `np.array_equal()`.
