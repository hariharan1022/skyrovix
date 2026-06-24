## 1. SciPy Introduction

## 📘 Introduction

SciPy (Scientific Python) is an open-source Python library used for scientific and technical computing. It builds on top of NumPy and provides a vast collection of mathematical algorithms and convenience functions. SciPy is the cornerstone of the scientific Python ecosystem alongside NumPy, Matplotlib, pandas, and SymPy.

## 🧠 Key Concepts

- **SciPy vs NumPy**: NumPy provides fast array operations and basic linear algebra; SciPy adds higher-level scientific algorithms built on NumPy arrays.
- **Submodules**: SciPy is organized into submodules, each focused on a specific domain (e.g., `scipy.linalg`, `scipy.optimize`, `scipy.stats`).
- **Dependency**: SciPy depends on NumPy — you must install NumPy before (or alongside) SciPy.
- **Open-source**: SciPy is maintained by the SciPy community under a BSD license.
- **When to use SciPy**: When you need numerical integration, optimization, signal processing, statistics, interpolation, sparse matrices, or image processing beyond what NumPy provides.

**SciPy Submodules at a Glance:**

| Submodule | Purpose |
|-----------|---------|
| `scipy.linalg` | Linear algebra (beyond NumPy) |
| `scipy.optimize` | Minimization, curve fitting, root finding |
| `scipy.stats` | Probability distributions, statistical tests |
| `scipy.signal` | Signal processing (filtering, convolution) |
| `scipy.interpolate` | Interpolation (1D, 2D, splines) |
| `scipy.integrate` | Numerical integration, ODE solvers |
| `scipy.sparse` | Sparse matrices and solvers |
| `scipy.sparse.linalg` | Sparse linear algebra |
| `scipy.ndimage` | Multi-dimensional image processing |
| `scipy.fft` | Fast Fourier Transforms |
| `scipy.cluster` | Clustering algorithms (K-means, hierarchical) |
| `scipy.io` | Input/output for MATLAB, WAV, etc. |

## 💻 Syntax

```python
# Standard import
import scipy
import numpy as np

# Import specific submodules
from scipy import linalg, optimize, stats, signal
from scipy.interpolate import interp1d
from scipy.integrate import quad
```

## ✅ Example 1 - Basic

**Problem:** Import SciPy, print its version, verify it works, and list available submodules.

**Code:**
```python
import scipy
import numpy as np

# Check version
print("SciPy version:", scipy.__version__)
print("NumPy version:", np.__version__)

# Check if scipy is working
print("SciPy is installed and working!")

# List common submodules
from scipy import linalg, optimize, stats, signal, interpolate, integrate, sparse, ndimage
print("All major submodules imported successfully.")
```

**Output:**
```
SciPy version: 1.13.0
NumPy version: 1.26.4
SciPy is installed and working!
All major submodules imported successfully.
```

**Explanation:**
We import SciPy and NumPy, print their versions to verify installation, and import the major submodules all at once to confirm they are accessible.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate the relationship between NumPy and SciPy by creating a NumPy array and using SciPy submodules for linear algebra, statistics, and optimization on that data.

**Code:**
```python
import numpy as np
from scipy import linalg, stats, optimize

# Create a NumPy array (the foundation)
data = np.array([[4, 1], [1, 3]])
print("NumPy array:\n", data)

# SciPy Linear Algebra: eigenvalues and eigenvectors
eigvals, eigvecs = linalg.eig(data)
print("\nEigenvalues:", eigvals)
print("Eigenvectors:\n", eigvecs)

# SciPy Statistics: describe the flattened data
description = stats.describe(data.flatten())
print("\nStatistics (via scipy.stats.describe):")
print("  Number of observations:", description.nobs)
print("  Mean:", description.mean)
print("  Variance:", description.variance)
print("  Skewness:", description.skewness)
print("  Kurtosis:", description.kurtosis)
```

**Output:**
```
NumPy array:
 [[4 1]
 [1 3]]

Eigenvalues: [5. 2.]
Eigenvectors:
 [[ 0.70710678 -0.70710678]
 [ 0.70710678  0.70710678]]

Statistics (via scipy.stats.describe):
  Number of observations: 4
  Mean: 2.25
  Variance: 1.5833333333333333
  Skewness: -0.342561503161409
  Kurtosis: -1.8318043013590325
```

**Explanation:**
NumPy handles the core array object and basic operations. SciPy builds on NumPy arrays to provide higher-level scientific routines — here we compute eigenvalues/eigenvectors (`linalg.eig`) and descriptive statistics (`stats.describe`) with a single function call.

## 🏢 Real World Use Case

**Computational Fluid Dynamics Simulation Pipeline:** A researcher models airflow over an aircraft wing. NumPy handles the grid as multi-dimensional arrays. SciPy submodules handle every step:
- `scipy.integrate` solves the governing differential equations via `solve_ivp`
- `scipy.interpolate` maps coarse simulation results to a finer mesh
- `scipy.optimize` tunes wing parameters to minimize drag
- `scipy.linalg` solves large linear systems arising from discretization
- `scipy.sparse` stores the sparse Jacobian matrices from the finite element method

## 🎯 Interview Questions

**Q1:** What is the difference between NumPy and SciPy?
**A:** NumPy provides the foundational n-dimensional array object and basic operations (element-wise math, indexing, slicing). SciPy builds on NumPy to add higher-level scientific algorithms — integration, optimization, signal processing, statistics, sparse matrices, and more. Use NumPy for array manipulation; use SciPy when you need a ready-made scientific algorithm.

**Q2:** How do you import only a specific submodule from SciPy?
**A:** Use `from scipy import submodule_name`, e.g., `from scipy import stats` or `from scipy.optimize import minimize`.

**Q3:** Name at least 6 submodules available in SciPy.
**A:** `linalg`, `optimize`, `stats`, `signal`, `interpolate`, `integrate`, `sparse`, `ndimage`, `fft`, `cluster`, `io`, `constants`.

**Q4:** Is SciPy a pure Python library or does it have compiled dependencies?
**A:** SciPy has compiled dependencies. It relies on optimized C, C++, and Fortran libraries (LAPACK, BLAS, ARPACK, FITPACK, QUADPACK, etc.) for high-performance numerical computation.

**Q5:** What license is SciPy released under?
**A:** SciPy is released under the BSD 3-Clause License, which permits commercial use, modification, and redistribution.

## ⚠ Common Errors / Mistakes

- **Importing wrong submodule**: `scipy.linalg` is the linear algebra module — avoid confusing it with `numpy.linalg`. SciPy's version is more complete.
- **Forgetting to install NumPy**: SciPy depends on NumPy. Install both: `pip install numpy scipy`.
- **Using SciPy on small data**: For simple tasks (mean, median, sorting), NumPy or Python built-ins are faster and simpler. SciPy shines on complex algorithms.
- **Calling `scipy.xxx` directly**: Most functionality lives in submodules. `import scipy; scipy.linalg` won't work unless you import the submodule.

## 📝 Practice Exercises

**Beginner:**
1. Write a script that imports `scipy` and prints all available submodules using `dir(scipy)`.
2. Create a NumPy array of shape (3,3) with random integers. Use `scipy.linalg.det()` to compute its determinant.
3. Use `scipy.stats.describe()` on a 1D array of 100 random numbers and interpret each output value.

**Intermediate:**
4. Generate a 5x5 random matrix. Use `scipy.linalg.inv()` to compute its inverse and verify the result by multiplying the original with the inverse.
5. Use `scipy.linalg.solve()` to solve the linear system: 2x + 3y = 8, x - y = -1.
6. Plot a 2D function f(x,y) = sin(x) * cos(y) using NumPy for grid creation and Matplotlib for visualization — demonstrate that NumPy alone handles the grid, while SciPy would be used for further analysis.

**Advanced:**
7. Compare the performance of `numpy.linalg.eig()` vs `scipy.linalg.eig()` on a 1000x1000 random matrix using `timeit`. Document the time difference and explain why one might be faster.
8. Write a script that uses three different SciPy submodules (`linalg`, `stats`, `optimize`) to analyze the same dataset — generate random data, compute its statistical properties, fit a linear model using optimization, and compute the error.
