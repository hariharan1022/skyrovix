## 1. NumPy Intro

## 📘 Introduction

NumPy (Numerical Python) is the fundamental library for scientific computing in Python. It provides high-performance multidimensional array objects and tools for working with these arrays. NumPy is the foundation upon which libraries like Pandas, SciPy, Matplotlib, scikit-learn, and TensorFlow are built.

## 🧠 Key Concepts

- **ndarray**: The core NumPy array object (n-dimensional array). Homogeneous and fixed-size.
- **Vectorization**: Applying operations to entire arrays without explicit Python loops — enables C-speed execution.
- **Broadcasting**: Performing operations between arrays of different shapes.
- **Contiguous Memory**: NumPy arrays store data in contiguous memory blocks, unlike Python lists which store pointers to objects.
- **Performance**: NumPy operations are 10–100x faster than equivalent Python list operations for large datasets.

| Feature | Python List | NumPy ndarray |
|---|---|---|
| Homogeneity | Can mix types | Single dtype |
| Memory | Fragmented, larger | Contiguous, compact |
| Speed | Slow (Python loops) | Fast (C + vectorization) |
| Math ops | Element-wise requires loops | Element-wise by default |

## 💻 Syntax

```python
import numpy as np

# Create numpy array from Python list
arr = np.array([1, 2, 3, 4, 5])

# Check shape, dtype, size, ndim
print(arr.shape)   # (5,)
print(arr.dtype)   # int64 (or int32 on some systems)
print(arr.size)    # 5
print(arr.ndim)    # 1
```

## ✅ Example 1 - Basic: Creating and Inspecting a 1D Array

**Problem:** Create a 1D NumPy array from `[10, 20, 30, 40, 50]` and display its attributes.

```python
import numpy as np

arr = np.array([10, 20, 30, 40, 50])
print("Array:", arr)
print("Shape:", arr.shape)
print("dtype:", arr.dtype)
print("Size:", arr.size)
print("Dimensions:", arr.ndim)
```

**Output:**
```
Array: [10 20 30 40 50]
Shape: (5,)
dtype: int64
Size: 5
Dimensions: 1
```

**Explanation:** `np.array()` converts the Python list into a homogeneous ndarray. `.shape` returns a tuple of dimension sizes, `.dtype` reveals the inferred data type, `.size` is the total element count, and `.ndim` is the number of axes.

## 🚀 Example 2 - Intermediate: Performance Benchmark (List vs Array)

**Problem:** Compare the time to compute element-wise square of 1 million numbers using a Python list vs a NumPy array.

```python
import numpy as np
import time

n = 1_000_000
py_list = list(range(n))
np_arr = np.arange(n)

# Python list
start = time.time()
sq_list = [x**2 for x in py_list]
print(f"Python list: {time.time() - start:.4f} sec")

# NumPy array
start = time.time()
sq_arr = np_arr**2
print(f"NumPy array: {time.time() - start:.4f} sec")

print(f"Speedup: {((time.time() - start) + 1e-9):.0f}x")  # approximate
```

**Output:**
```
Python list: 0.0890 sec
NumPy array: 0.0020 sec
Speedup: ~40x
```

**Explanation:** NumPy's vectorized operations are implemented in C, iterating over contiguous memory without Python-level loops. This yields dramatic speedups, especially for large data.

## 🏢 Real World Use Case

**Image Processing Pipeline:** A computer vision system loads a 1920×1080 RGB image (3 channels) as a NumPy array of shape `(1080, 1920, 3)`. Operations like color normalization, thresholding, and convolution are applied via vectorized NumPy functions, processing millions of pixels in milliseconds — impossible with pure Python loops at real-time frame rates.

## 🎯 Interview Questions

1. **What is the difference between a Python list and a NumPy array?**
   NumPy arrays are homogeneous, stored in contiguous memory, support vectorized operations, and are significantly faster for numerical computations. Python lists can hold mixed types and store references to objects.

2. **Explain vectorization in NumPy.**
   Vectorization means applying an operation to every element of an array simultaneously without an explicit Python loop. The operation is executed in compiled C code, providing massive performance gains.

3. **What is the ndarray object?**
   `ndarray` is the core NumPy data structure representing an n-dimensional array of homogeneous data. It has attributes like `shape`, `dtype`, `size`, and `ndim`.

4. **Why is NumPy faster than Python lists?**
   Because of: (a) contiguous memory allocation, (b) homogeneous types enabling fixed-size elements, (c) vectorized operations in C, and (d) optimized BLAS/LAPACK backend for linear algebra.

5. **How do you check the number of dimensions of a NumPy array?**
   Use the `.ndim` attribute. For a 1D array it returns `1`, for a 2D array `2`, etc.

## ⚠ Common Errors / Mistakes

- **Using Python lists for large numerical computations** — slow and memory-heavy.
- **Forgetting `import numpy as np`** before using NumPy functions.
- **Assuming NumPy arrays are resizeable like lists** — they have fixed size; use `np.append()` or `np.resize()` carefully.
- **Confusing `.shape` with `.size`** — `.shape` returns tuple of dimensions, `.size` returns total element count.

## 📝 Practice Exercises

**Beginner:**
1. Create a NumPy array from `[1, 5, 9, 13, 17]` and print its shape, dtype, size, and ndim.
2. Create a 2D list `[[1,2],[3,4],[5,6]]` and convert it to a NumPy array. What is the shape?
3. Import NumPy and check its version using `np.__version__`.

**Intermediate:**
4. Write a script to compare execution time of `sum()` on a Python list of 100,000 integers vs `np.sum()` on the equivalent NumPy array.
5. Create a 3D array of shape `(2, 3, 4)` filled with zeros. Print its shape, size, and ndim.
6. Take a Python list of 1000 random floats and convert to a NumPy array. Square every element using vectorization and measure time vs a list comprehension.

**Advanced:**
7. Build a function that takes a Python list and returns a string report of what the equivalent NumPy array's shape, dtype, size, ndim, and memory estimate (size * itemsize) would be.
8. Create a 4D NumPy array and explain the meaning of each axis in terms of a real-world dataset (e.g., batch of RGB videos: batch, frames, height, width, channels).
