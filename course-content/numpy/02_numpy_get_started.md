## 2. NumPy Get Started

## 📘 Introduction

Before using NumPy, you need to install it and understand how to import it. NumPy is not part of Python's standard library, so you must install it via pip or conda. Once installed, the convention is to import it as `np` for concise and readable code.

## 🧠 Key Concepts

- **Installation**: `pip install numpy` or `conda install numpy`.
- **Import Convention**: `import numpy as np` — never use `from numpy import *` to avoid namespace pollution.
- **Creating Arrays**: `np.array()` is the primary constructor; many helper functions exist.
- **Array Attributes**: Every ndarray has `shape`, `dtype`, `size`, `ndim`, `itemsize`, and `nbytes`.
- **Documentation**: Use `help(np.array)` or `np.info(np.array)` in an interactive session.

## 💻 Syntax

```python
import numpy as np

print(np.__version__)         # e.g. 1.26.3

arr = np.array([[1, 2, 3],
                [4, 5, 6]])

print(arr.shape)              # (2, 3)
print(arr.dtype)              # int64
print(arr.size)               # 6
print(arr.ndim)               # 2
print(arr.itemsize)           # 8 (bytes per element)
print(arr.nbytes)             # 48 (total bytes = size * itemsize)
```

## ✅ Example 1 - Basic: Installation Check and First Array

**Problem:** Verify NumPy is installed, check the version, and create your first 2D array.

```python
import numpy as np

print("NumPy version:", np.__version__)

arr = np.array([[10, 20, 30],
                [40, 50, 60]])
print("Array:\n", arr)
print("Type:", type(arr))
```

**Output:**
```
NumPy version: 1.26.3
Array:
 [[10 20 30]
 [40 50 60]]
Type: <class 'numpy.ndarray'>
```

**Explanation:** `np.__version__` confirms installation. `np.array()` accepts nested lists to create a 2D array. `type()` confirms the result is an ndarray.

## 🚀 Example 2 - Intermediate: Exploring Attributes in Detail

**Problem:** Create arrays of different shapes and inspect all their basic attributes.

```python
import numpy as np

arr1d = np.array([1, 2, 3])
arr2d = np.array([[1, 2], [3, 4], [5, 6]])
arr3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])

for name, a in [("1D", arr1d), ("2D", arr2d), ("3D", arr3d)]:
    print(f"{name}: shape={a.shape}, dtype={a.dtype}, "
          f"size={a.size}, ndim={a.ndim}, itemsize={a.itemsize}, nbytes={a.nbytes}")
```

**Output:**
```
1D: shape=(3,), dtype=int64, size=3, ndim=1, itemsize=8, nbytes=24
2D: shape=(3, 2), dtype=int64, size=6, ndim=2, itemsize=8, nbytes=48
3D: shape=(2, 2, 2), dtype=int64, size=8, ndim=3, itemsize=8, nbytes=64
```

**Explanation:** Each array's shape grows in dimensions. `nbytes` equals `size * itemsize`. All three arrays use int64 by default on 64-bit systems, so `itemsize` is 8 bytes.

## 🏢 Real World Use Case

**Data Science Environment Setup:** A data scientist sets up a new Python environment and runs `pip install numpy pandas matplotlib scikit-learn` in a Docker container. The entry-point script starts with `import numpy as np` and uses `np.loadtxt()` to load 500 MB of CSV sensor data into memory, immediately inspecting `.shape` and `.dtype` to validate the loaded data before further analysis.

## 🎯 Interview Questions

1. **How do you install NumPy?**
   `pip install numpy` or `conda install numpy`. Verify with `python -c "import numpy; print(numpy.__version__)"`.

2. **What is the standard alias for importing NumPy?**
   `import numpy as np`. This is a community convention followed in virtually all production code and documentation.

3. **What does `arr.itemsize` return?**
   The byte size of each element in the array. For `int64` it returns `8`, for `float32` it returns `4`.

4. **Difference between `arr.size` and `arr.nbytes`?**
   `.size` is the total number of elements; `.nbytes` is the total memory consumed (`size * itemsize`).

5. **Can you create a NumPy array without importing NumPy?**
   No. NumPy is a third-party library and must be imported. The array object lives in the `numpy` namespace.

## ⚠ Common Errors / Mistakes

- **Running code without installing NumPy** — leads to `ModuleNotFoundError: No module named 'numpy'`.
- **Using `from numpy import *`** — pollutes the namespace and can shadow built-in functions like `sum`, `max`, `min`.
- **Forgetting `.shape` returns a tuple** — you cannot assign to it like a list element without proper indexing.
- **Assuming arrays default to float** — integer arrays default to `int64`, not `float64`.

## 📝 Practice Exercises

**Beginner:**
1. Install NumPy in a fresh virtual environment and print its version.
2. Create a 1D array from `[100, 200, 300]` and print `shape`, `dtype`, `size`, `ndim`.
3. Create a 2D array of shape `(4, 3)` filled with ones. Print its `nbytes`.

**Intermediate:**
4. Write a function `describe_array(arr)` that prints shape, dtype, size, ndim, itemsize, and nbytes of any ndarray.
5. Create a 3D array from a nested list of shape `(3, 2, 5)` and calculate the total memory it consumes in KB.
6. Compare `arr1 = np.array([1, 2, 3])` and `arr2 = np.array([1., 2., 3.])` — explain why their dtypes differ.

**Advanced:**
7. Use `np.info(np.array)` and write a short summary of the array creation parameters (like `dtype`, `copy`, `order`, `ndmin`).
8. Write a script that benchmarks the time to create a Python list of 10 million integers vs a NumPy array of the same size using `np.arange()` and reports the ratio.
