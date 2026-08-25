## 51. NumPy Tutorial
## 📘 Introduction
NumPy (Numerical Python) is a fundamental library for numerical computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with a collection of high-level mathematical functions to operate on these arrays. It is the foundation for libraries like Pandas, SciPy, scikit-learn, and TensorFlow.

## 🧠 Key Concepts
- **ndarray**: N-dimensional array object, the core of NumPy
- **Vectorization**: Performing operations on entire arrays without explicit loops
- **Broadcasting**: Rules for performing arithmetic on arrays of different shapes
- **dtype**: Data type of array elements (int32, float64, bool, etc.)
- **shape**: Dimensions of the array (rows, columns)
- **ndim**: Number of dimensions (axes) of the array

## 💻 Syntax
```python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3])
zeros = np.zeros((3, 4))
ones = np.ones((2, 2))
range_arr = np.arange(0, 10, 2)
lin_arr = np.linspace(0, 1, 5)

# Inspect arrays
arr.shape       # (rows, cols)
arr.ndim        # number of dimensions
arr.dtype       # data type
arr.size        # total elements
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a 1D NumPy array from a Python list, inspect its properties, and perform element-wise squaring.

```python
import numpy as np

data = [2, 4, 6, 8, 10]
arr = np.array(data)

print("Array:", arr)
print("Shape:", arr.shape)
print("Dimensions:", arr.ndim)
print("Data type:", arr.dtype)
print("Size:", arr.size)
print("Squared:", arr ** 2)
```

**Output:**
```
Array: [ 2  4  6  8 10]
Shape: (5,)
Dimensions: 1
Data type: int32
Size: 5
Squared: [  4  16  36  64 100]
```

**Explanation:** `np.array()` converts a Python list into an ndarray. The array has 5 elements in 1 dimension, stored as 32-bit integers by default. The `** 2` operation is vectorized — it squares every element without writing a loop.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a 3x4 matrix of zeros, reshape it, and generate a sequence of 5 evenly spaced values between 0 and 10.

```python
import numpy as np

# Create a 3x4 matrix of zeros
mat = np.zeros((3, 4), dtype=np.int32)
print("Zeros matrix:\n", mat)

# Reshape to 2x6
reshaped = mat.reshape(2, 6)
print("\nReshaped (2x6):\n", reshaped)

# Evenly spaced values
even = np.linspace(0, 10, 5)
print("\nLinspace (0 to 10, 5 values):", even)

# Arithmetic sequence
ar = np.arange(0, 10, 2.5)
print("Arange (0 to 10 step 2.5):", ar)
```

**Output:**
```
Zeros matrix:
 [[0 0 0 0]
 [0 0 0 0]
 [0 0 0 0]]

Reshaped (2x6):
 [[0 0 0 0 0 0]
 [0 0 0 0 0 0]]

Linspace (0 to 10, 5 values): [ 0.   2.5  5.   7.5 10. ]

Arange (0 to 10 step 2.5): [0.  2.5 5.  7.5]
```

**Explanation:** `np.zeros()` creates a 2D array of specified shape. `reshape()` changes dimensions without altering data. `np.linspace()` generates evenly spaced numbers over an interval, while `np.arange()` creates values with a specified step size — similar to Python's `range()` but supports floats.

## 🏢 Real World Use Case
NumPy is the backbone of data science pipelines. A financial analyst at a hedge fund uses NumPy arrays to store daily stock prices for 10,000+ companies. They perform vectorized calculations (returns, moving averages, volatility) across the entire dataset in milliseconds — something that would take minutes with Python lists. NumPy arrays also underpin image processing (each pixel is an array element) and scientific simulations (e.g., weather forecasting grids).

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between a Python list and a NumPy array?**
NumPy arrays are homogeneous (all elements same dtype), stored in contiguous memory, and support vectorized operations. Python lists can hold mixed types and are stored as pointers to objects, making them slower for numerical computation.

**2. How do you create a 3x3 identity matrix using NumPy?**
`np.eye(3)` or `np.identity(3)`.

**3. What does `np.linspace(0, 1, 11)` return?**
It returns 11 evenly spaced numbers from 0 to 1 inclusive: `[0.0, 0.1, 0.2, ..., 1.0]`.

**4. How can you check the number of dimensions and shape of an array?**
Use `arr.ndim` for number of dimensions and `arr.shape` for a tuple of dimension sizes.

**5. What is the default dtype when creating an integer array? When creating a float array?**
Integer arrays default to `int32` (or `int64` on 64-bit systems). Float arrays default to `float64`.

## ⚠ Common Errors / Mistakes
- **Mixing types**: Creating an array from `[1, 2, 3.0]` promotes all elements to float64. This is usually fine, but can surprise beginners.
- **Using Python lists for math**: `[1, 2, 3] * 2` gives `[1, 2, 3, 1, 2, 3]`, not `[2, 4, 6]`. Always use NumPy arrays for mathematical operations.
- **Forgetting import**: `import numpy as np` is required. The alias `np` is universal convention.
- **Shape mismatch**: Operations between arrays of incompatible shapes raise `ValueError` until you understand broadcasting rules.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a 1D array of numbers 1 through 10 using `np.arange()`. Print the array, its dtype, shape, and size.
2. Create a 4x5 array of ones with dtype `float32`. Print the array.
3. Generate an array of 8 evenly spaced numbers from 0 to 20 (inclusive). Print the result.

**Intermediate:**
4. Create a 3x3 array of random integers between 10 and 50 (use `np.random.randint`). Reshape it to 1x9 and print the shape before and after.
5. Create two arrays: `[1, 2, 3]` and `[4, 5, 6]`. Compute element-wise addition, subtraction, multiplication, and division.
6. Generate a 2D array of shape (2, 5) filled with zeros. Change its dtype to `int64`. Verify the change.

**Advanced:**
7. Create a 5x5 identity matrix using `np.eye()`. Replace the last column with all 1s (without using a loop). Print the result.
8. Generate a 1D array of 100 random floats. Find and print the minimum, maximum, mean, and standard deviation using NumPy functions.
