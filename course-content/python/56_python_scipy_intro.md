## 56. SciPy Tutorial
## 📘 Introduction
SciPy (Scientific Python) is an open-source library built on NumPy that provides advanced scientific computing capabilities. It includes modules for linear algebra, optimization, statistics, signal processing, and interpolation. While NumPy provides the array infrastructure, SciPy provides the algorithms that operate on those arrays for scientific and engineering applications.

## 🧠 Key Concepts
- **SciPy vs NumPy**: NumPy provides arrays and basic operations; SciPy provides specialized algorithms built on NumPy arrays
- **Submodules**: SciPy is organized into submodules, each focused on a domain (linalg, optimize, stats, signal, interpolate)
- **Sparse matrices**: `scipy.sparse` for memory-efficient storage of matrices with mostly zero values
- **Installation**: `pip install scipy` — SciPy is a large library with compiled dependencies
- **Integration**: SciPy works seamlessly with NumPy arrays as inputs and outputs

## 💻 Syntax
```python
import numpy as np
from scipy import linalg, optimize, stats, signal, interpolate

# Linear algebra
A = np.array([[1, 2], [3, 4]])
linalg.inv(A)           # inverse
linalg.det(A)           # determinant
linalg.eig(A)           # eigenvalues/eigenvectors

# Optimization
optimize.minimize_scalar(lambda x: x**2 + 2*x + 1)

# Statistics
stats.norm.pdf(0)       # normal PDF at 0
stats.ttest_ind(a, b)   # independent t-test

# Sparse matrix
from scipy.sparse import csr_matrix
sparse = csr_matrix(np.array([[0, 0, 1], [0, 2, 0]]))
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Perform basic linear algebra operations using `scipy.linalg` on a 2x2 matrix.

```python
import numpy as np
from scipy import linalg

A = np.array([[3, 1], [1, 2]])
print("Matrix A:\n", A)

# Inverse
inv_A = linalg.inv(A)
print("\nInverse of A:\n", inv_A)

# Determinant
det_A = linalg.det(A)
print("\nDeterminant:", round(det_A, 2))

# Eigenvalues and eigenvectors
eigvals, eigvecs = linalg.eig(A)
print("\nEigenvalues:", eigvals)
print("Eigenvectors:\n", eigvecs)
```

**Output:**
```
Matrix A:
 [[3 1]
 [1 2]]

Inverse of A:
 [[ 0.4 -0.2]
 [-0.2  0.6]]

Determinant: 5.0

Eigenvalues: [3.618+0.j 1.382+0.j]
Eigenvectors:
 [[ 0.851  0.526]
 [ 0.526 -0.851]]
```

**Explanation:** `linalg.inv()` computes the matrix inverse. `linalg.det()` computes the determinant. `linalg.eig()` returns eigenvalues and eigenvectors (as complex numbers — imaginary part is zero for real symmetric matrices like this one). These are foundational operations in linear algebra used throughout science and engineering.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Minimize a mathematical function and create a sparse matrix.

```python
import numpy as np
from scipy import optimize
from scipy.sparse import csr_matrix, eye
from scipy.sparse.linalg import spsolve

# Minimize f(x) = x^2 + 5*sin(x)
result = optimize.minimize_scalar(lambda x: x**2 + 5 * np.sin(x))
print("Minimum at x =", round(result.x, 4))
print("Minimum value =", round(result.fun, 4))

# Sparse matrix example
dense = np.array([
    [0, 0, 0, 1],
    [0, 3, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 4]
])
sparse = csr_matrix(dense)
print("\nDense matrix:\n", dense)
print("Sparse repr:\n", sparse)
print("Sparse shape:", sparse.shape)
print("Non-zero count:", sparse.nnz)

# Solve sparse linear system: A * x = b
A_sparse = eye(5, format='csr') * 2  # diagonal matrix
b = np.array([1, 2, 3, 4, 5])
x = spsolve(A_sparse, b)
print("\nSparse solve result:", x)
```

**Output:**
```
Minimum at x = -0.9172
Minimum value = -3.9768

Dense matrix:
 [[0 0 0 1]
 [0 3 0 0]
 [0 0 0 0]
 [2 0 0 4]]
Sparse repr:
   (0, 3)	1
  (1, 1)	3
  (3, 0)	2
  (3, 3)	4
Sparse shape: (4, 4)
Non-zero count: 4

Sparse solve result: [0.5 1.  1.5 2.  2.5]
```

**Explanation:** `optimize.minimize_scalar` finds the minimum of a 1D function using Brent's method. `csr_matrix` stores only non-zero values with their row/column indices, saving memory for large sparse datasets. `spsolve` efficiently solves linear systems with sparse matrices using dedicated algorithms instead of dense Gaussian elimination.

## 🏢 Real World Use Case
A civil engineering firm simulates stress on a bridge truss. The structure is modeled as a sparse linear system with thousands of nodes but few connections. They use `scipy.sparse` to store the stiffness matrix (mostly zeros), `scipy.sparse.linalg.spsolve` to solve for displacements under load, and `scipy.optimize` to minimize material cost while meeting safety constraints. Without sparse matrices, the 50,000 x 50,000 dense matrix would not fit in memory.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between NumPy and SciPy?**
NumPy provides the core array data structure and basic operations. SciPy builds on NumPy with specialized algorithms for scientific computing — optimization, linear algebra, statistics, signal processing, interpolation, etc.

**2. What is a sparse matrix and when would you use it?**
A sparse matrix stores only non-zero elements and their positions, saving memory. Use it when the matrix has mostly zero values (e.g., adjacency matrices, finite element models, recommendation systems).

**3. Name four submodules of SciPy and what they do.**
- `scipy.linalg`: linear algebra (decompositions, matrix functions)
- `scipy.optimize`: minimization, root finding, curve fitting
- `scipy.stats`: probability distributions, statistical tests
- `scipy.signal`: signal processing (filtering, convolution, FFT)

**4. How do you install SciPy?**
`pip install scipy` or `conda install scipy` (conda is recommended for managing compiled dependencies).

**5. What does `scipy.linalg.eig()` return?**
It returns a tuple of (eigenvalues, eigenvectors). Eigenvalues are 1D array of complex numbers; eigenvectors are 2D array where each column is an eigenvector.

## ⚠ Common Errors / Mistakes
- **Importing incorrectly**: `from scipy import linalg` is faster than `from scipy.linalg import *`. SciPy submodules should be imported explicitly.
- **Confusing `linalg` with NumPy's version**: Both have `inv`, `det`, `eig`. SciPy's `linalg` is more complete and often faster (wraps LAPACK/BLAS). Prefer `scipy.linalg` over `numpy.linalg` when SciPy is available.
- **Forgetting that sparse operations differ**: Not all NumPy operations work on sparse matrices. You often need `scipy.sparse`-specific functions (e.g., `spsolve` instead of `np.linalg.solve`).
- **Memory from dense conversion**: Converting a large sparse matrix to dense with `.toarray()` can crash your system. Always check memory before densifying.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a 3x3 matrix and compute its inverse and determinant using `scipy.linalg`.
2. Create a 4x4 sparse identity matrix using `scipy.sparse.eye()`. Print its shape and number of non-zero elements.
3. Use `scipy.optimize.minimize_scalar` to find the minimum of `f(x) = (x - 3)^2 + 10`.

**Intermediate:**
4. Create a 5x5 random dense matrix with 20% non-zero values. Convert it to CSR sparse format. Verify that `nnz` matches the count of non-zero elements.
5. Solve the linear system `3x + 2y = 10`, `x + 4y = 12` using `scipy.linalg.solve`.
6. Find the eigenvalues and eigenvectors of a 4x4 Hilbert matrix (use `scipy.linalg.hilbert`).

**Advanced:**
7. Create a 100x100 tridiagonal sparse matrix (3 on diagonal, -1 on super/sub diagonals) using `scipy.sparse.diags`. Solve the system A*x = b where b is a vector of all 1s using `spsolve`.
8. Use `scipy.optimize.minimize` (multidimensional) to find the minimum of the Rosenbrock function: `f(x, y) = (a - x)^2 + b*(y - x^2)^2` with a=1, b=100. Start from (-2, 2).
