## 52. NumPy Operations
## 📘 Introduction
NumPy provides a rich set of operations for array manipulation and mathematical computation. These include element-wise arithmetic, broadcasting for mixed-shape operations, universal functions (ufuncs) for fast element-wise math, aggregation methods, and array reshaping/transposition. These operations are the building blocks of numerical Python.

## 🧠 Key Concepts
- **Element-wise arithmetic**: `+`, `-`, `*`, `/` applied per element
- **Broadcasting**: Rules for operating on arrays of different shapes by stretching smaller arrays
- **Universal Functions (ufunc)**: Vectorized wrappers like `np.sqrt()`, `np.exp()`, `np.sin()`
- **Aggregation**: Reducing arrays to summary statistics (sum, mean, min, max, std)
- **Reshaping**: Changing array dimensions without altering data
- **Transpose**: Flipping axes (rows become columns)

## 💻 Syntax
```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Arithmetic
print(a + b)   # [5 7 9]
print(a * b)   # [4 10 18]

# Broadcasting
print(a + 10)  # [11 12 13]

# Ufuncs
print(np.sqrt(a))           # [1. 1.414 1.732]
print(np.sin(np.pi / 2))    # 1.0

# Aggregation
print(a.sum(), a.mean(), a.min(), a.max(), a.std())

# Reshape & Transpose
m = np.arange(6).reshape(2, 3)
print(m.T)          # transpose
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Perform element-wise arithmetic on two arrays and demonstrate broadcasting with a scalar.

```python
import numpy as np

a = np.array([10, 20, 30, 40])
b = np.array([1, 2, 3, 4])

print("a + b:", a + b)
print("a - b:", a - b)
print("a * b:", a * b)
print("a / b:", a / b)

# Broadcasting: scalar + array
print("a + 5:", a + 5)
print("a * 2:", a * 2)
```

**Output:**
```
a + b: [11 22 33 44]
a - b: [ 9 18 27 36]
a * b: [10 40 90 160]
a / b: [10. 10. 10. 10.]
a + 5: [15 25 35 45]
a * 2: [20 40 60 80]
```

**Explanation:** Arithmetic operators work element-wise. Broadcasting extends the scalar `5` or `2` to match the array shape, enabling concise, fast computation without explicit loops.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a 3x4 matrix, compute aggregation statistics, reshape it, and apply ufuncs.

```python
import numpy as np

# 3x4 matrix of random integers
mat = np.random.randint(1, 100, size=(3, 4))
print("Original matrix:\n", mat)

# Aggregation
print("\nSum:", mat.sum())
print("Mean:", mat.mean())
print("Min:", mat.min(), "| Max:", mat.max())
print("Std Dev:", mat.std())

# Ufuncs
print("\nSquare root:\n", np.sqrt(mat))
print("Exponential (first row):", np.exp(mat[0]))

# Reshape & Transpose
flat = mat.reshape(-1)
print("\nFlattened:", flat)

transposed = mat.T
print("Transposed (4x3):\n", transposed)
```

**Output:**
```
Original matrix:
 [[42 78 15 63]
 [31 56 89 22]
 [ 5 94 43 71]]

Sum: 609
Mean: 50.75
Min: 5 | Max: 94
Std Dev: 28.68

Square root:
 [[6.48 8.83 3.87 7.94]
 [5.57 7.48 9.43 4.69]
 [2.24 9.70 6.56 8.43]]

Exponential (first row): [1.74e+18 3.23e+33 3.27e+06 2.03e+27]

Flattened: [42 78 15 63 31 56 89 22  5 94 43 71]

Transposed (4x3):
 [[42 31  5]
 [78 56 94]
 [15 89 43]
 [63 22 71]]
```

**Explanation:** Aggregation methods reduce the entire array to a single value. Ufuncs like `np.sqrt()` and `np.exp()` apply the function element-wise at C speed. `reshape(-1)` flattens any array into 1D. `.T` transposes rows and columns.

## 🏢 Real World Use Case
A machine learning engineer normalizes a feature matrix before training. They compute column-wise `mean` and `std`, then apply broadcasting to subtract the mean and divide by standard deviation across all rows. They use `reshape` to prepare data for a neural network (e.g., flattening images from 28x28 to 784-element vectors). All operations run in vectorized form, avoiding Python loops and leveraging BLAS-optimized routines.

## 🎯 Interview Questions (5 with answers)

**1. What is broadcasting in NumPy?**
Broadcasting is a set of rules that allows NumPy to perform arithmetic on arrays of different shapes by virtually expanding the smaller array to match the larger one, without copying data.

**2. How does `np.sum()` differ from `arr.sum()`?**
They are identical — `np.sum()` is the functional form and `arr.sum()` is the method form. Both accept an `axis` parameter to sum along a specific dimension.

**3. What does `axis=0` vs `axis=1` mean in aggregation?**
`axis=0` operates along rows (collapses rows, keeps columns). `axis=1` operates along columns (collapses columns, keeps rows).

**4. How do you flatten a multi-dimensional array into 1D?**
Use `arr.reshape(-1)` or `arr.flatten()` or `arr.ravel()`. `ravel()` returns a view when possible; `flatten()` always returns a copy.

**5. What are universal functions (ufuncs)? Give three examples.**
Ufuncs are vectorized element-wise functions that operate on ndarrays at C speed. Examples: `np.sqrt()`, `np.exp()`, `np.sin()`, `np.add()`, `np.log()`.

## ⚠ Common Errors / Mistakes
- **Shape mismatch**: Adding arrays of shape (3,) and (4,) raises `ValueError`. Broadcasting rules must align from trailing dimensions.
- **Confusing axis**: `mat.sum(axis=0)` sums rows (produces one value per column), not columns. This is a common source of bugs.
- **In-place vs copy**: `arr.T` returns a view, not a copy. Modifying the transpose modifies the original array.
- **Using Python's `sum()`**: `sum(arr)` is slower than `arr.sum()` and may produce unexpected results with multi-dimensional arrays.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create two arrays `[2, 4, 6]` and `[1, 3, 5]`. Compute addition, subtraction, multiplication, and division.
2. Create a 1D array of 1 to 10. Add 100 to every element using broadcasting. Print the result.
3. Create a 2x3 matrix. Compute its sum, mean, min, and max using NumPy methods.

**Intermediate:**
4. Create a 4x4 matrix of random floats. Compute the sum along axis=0 and axis=1. Explain the difference in the output.
5. Generate a 3x3 matrix and apply `np.sqrt()` and `np.square()` to it. Verify that `np.sqrt(np.square(x))` returns the absolute values.
6. Create a 2x4 matrix, transpose it to 4x2, then flatten the result into 1D.

**Advanced:**
7. Create a 5x5 identity matrix. Add a 1D array `[1, 2, 3, 4, 5]` to it using broadcasting (row-wise addition). Print the result.
8. Generate a 1D array of 20 random integers between 0 and 100. Compute the cumulative sum using `np.cumsum()`. Find the index where the cumulative sum first exceeds 500.
