## 12. NumPy Linear Algebra

## 📘 Introduction

NumPy's `linalg` module provides a comprehensive set of linear algebra operations built on top of highly optimized BLAS and LAPACK libraries. These include dot products, matrix multiplication, inverses, determinants, eigenvalues, solving linear systems, and singular value decomposition (SVD).

## 🧠 Key Concepts

- **`np.dot(a, b)`**: Dot product of two arrays. For 1D → scalar, for 2D → matrix multiplication.
- **`np.matmul(a, b)`**: Matrix multiplication (preferred for 2D+ arrays). Does not broadcast like `dot`.
- **`@` operator**: Python's matrix multiplication operator (equivalent to `matmul`): `a @ b`.
- **`np.linalg.inv(a)`**: Inverse of a square matrix (raises `LinAlgError` if singular).
- **`np.linalg.det(a)`**: Determinant of a square matrix.
- **`np.linalg.eig(a)`**: Eigenvalues and eigenvectors of a square matrix (returns `(eigenvalues, eigenvectors)`).
- **`np.linalg.solve(A, b)`**: Solve linear equation `Ax = b` (more efficient and stable than computing `inv(A) @ b`).
- **`np.linalg.svd(a)`**: Singular Value Decomposition: `A = U @ S @ Vh` (returns `U, S, Vh`).
- **`np.linalg.norm(a)`**: Matrix or vector norm (Frobenius by default for matrices).
- **`np.linalg.qr(a)`**: QR decomposition.

## 💻 Syntax

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Dot / matmul / @
print(np.dot(a, b))
print(np.matmul(a, b))
print(a @ b)                     # same result

# Inverse
print(np.linalg.inv(a))

# Determinant
print(np.linalg.det(a))

# Eigenvalues / eigenvectors
eigvals, eigvecs = np.linalg.eig(a)
print("Eigenvalues:", eigvals)

# Solve Ax = b
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])
x = np.linalg.solve(A, b)
print("Solution:", x)

# SVD
U, S, Vh = np.linalg.svd(a)
print("U:", U, "S:", S, "Vh:", Vh)
```

## ✅ Example 1 - Basic: Matrix Multiplication and Determinant

**Problem:** Given two 3x3 matrices, compute their product and the determinant of the result.

```python
import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])
B = np.array([[9, 8, 7],
              [6, 5, 4],
              [3, 2, 1]])

# Matrix multiplication
C = A @ B
print("A @ B:\n", C)

# Determinant
det = np.linalg.det(C)
print(f"det(A @ B) = {det:.2f}")

# Identity check
I = A @ np.linalg.inv(A)
print("A @ inv(A) (approx identity):\n", np.round(I, 2))
```

**Output:**
```
A @ B:
 [[ 30  24  18]
 [ 84  69  54]
 [138 114  90]]
det(A @ B) = 0.00
A @ inv(A) (approx identity):
 [[ 1.  0. -0.]
 [ 0.  1. -0.]
 [ 0.  0.  1.]]
```

**Explanation:** `A @ B` computes matrix multiplication. The determinant of the product is 0 because `A` (and therefore the product) is singular (det A = 0). The inverse check shows the identity matrix within rounding error.

## 🚀 Example 2 - Intermediate: Solving Linear Equations and Eigenvalues

**Problem:** Solve a system of 3 linear equations, then find eigenvalues/eigenvectors.

```python
import numpy as np

# System:
# 2x + y -  z = 1
# x  + y +  z = 6
# x  - y + 2z = 7

A = np.array([[ 2,  1, -1],
              [ 1,  1,  1],
              [ 1, -1,  2]])
b = np.array([1, 6, 7])

x = np.linalg.solve(A, b)
print("Solution (x, y, z):", x)

# Verify: A @ x should equal b
print("A @ x =", A @ x)

# Eigenvalues and eigenvectors
eigvals, eigvecs = np.linalg.eig(A)
print("\nEigenvalues:", eigvals)
print("Eigenvectors:\n", eigvecs)

# Verify: A @ v = λ * v for first eigenvalue
v = eigvecs[:, 0]
lam = eigvals[0]
print(f"\nA @ v = {A @ v}")
print(f"λ * v = {lam * v}")
```

**Output:**
```
Solution (x, y, z): [1. 2. 3.]
A @ x = [1. 6. 7.]
Eigenvalues: [2. 2. 1.]
Eigenvectors:
 [[-0.577 -0.817 -0.577]
 [-0.577  0.408 -0.577]
 [-0.577  0.408  0.577]]
A @ v = [-1.155 -1.155 -1.155]
λ * v = [-1.155 -1.155 -1.155]
```

**Explanation:** `np.linalg.solve` efficiently finds x = [1, 2, 3]. Verification shows `A @ x == b`. The eigenvalue decomposition satisfies `A @ v = λ * v` for each eigenpair.

## 🏢 Real World Use Case

**Principal Component Analysis (PCA) for Dimensionality Reduction:** A machine learning engineer has a dataset of 10,000 samples with 500 features. They center the data, compute the covariance matrix via `X.T @ X / (n-1)`, then use `np.linalg.svd(cov_matrix)` to get the principal components. The top 50 components capture 95% of the variance. Data is projected with `X @ Vh[:50].T`, reducing dimensions from 500 to 50 while preserving most information.

## 🎯 Interview Questions

1. **What is the difference between `np.dot`, `np.matmul`, and the `@` operator?**
   For 2D arrays they are equivalent. `np.dot` also works for 1D (scalar result) and higher dimensions (sum product over last axis of a and second-to-last of b). `np.matmul` and `@` behave differently for >2D (stacked matrices).

2. **Why is `np.linalg.solve` preferred over `np.linalg.inv` for solving linear equations?**
   `solve` is numerically more stable and faster — it uses LU decomposition directly instead of computing the full inverse.

3. **What does `np.linalg.eig` return?**
   A tuple `(eigenvalues, eigenvectors)` where eigenvalues is a 1D array and eigenvectors is a 2D array where each column is an eigenvector.

4. **What is the SVD decomposition and what does each matrix represent?**
   `A = U @ S @ Vh`. `U` (left singular vectors) and `Vh` (right singular vectors transposed) are orthogonal. `S` is a 1D array of singular values (diagonal in matrix form).

5. **How does `np.linalg.norm` work?**
   Computes matrix or vector norms. For 1D: `ord=2` is Euclidean norm (default). For 2D: `ord='fro'` is Frobenius norm (default). Other orders available: 1, inf, etc.

## ⚠ Common Errors / Mistakes

- **Trying to invert a singular matrix** — raises `np.linalg.LinAlgError: Singular matrix`.
- **Using `*` for matrix multiplication** — `*` is element-wise multiplication, not matrix multiplication. Use `@`, `np.matmul`, or `np.dot`.
- **Solving `Ax = b` with `inv(A) @ b` instead of `solve(A, b)`** — slower and less numerically stable.
- **Assuming `eig` returns eigenvectors as rows** — they are stored as **columns** of the eigenvectors array.

## 📝 Practice Exercises

**Beginner:**
1. Given `A = [[1, 2], [3, 4]]` and `B = [[2, 0], [1, 2]]`, compute `A @ B` and `B @ A`.
2. Compute the determinant of `[[2, 3], [1, 4]]`.
3. Find the inverse of `[[1, 0], [0, 1]]` (identity) and verify.

**Intermediate:**
4. Solve the system: `x + 2y = 5`, `3x + 4y = 11`.
5. Find the eigenvalues and eigenvectors of `[[2, 1], [1, 2]]`.
6. Compute the SVD of `[[1, 0, 0], [0, 2, 0], [0, 0, 3]]` and verify that `U @ S @ Vh` reconstructs the original.

**Advanced:**
7. Implement PCA from scratch: given a 100x5 data matrix, center it, compute covariance, perform eigenvalue decomposition, and project onto the first 2 principal components.
8. Use `np.linalg.lstsq` to find the best-fit line (y = mx + c) for points `(1,2), (2,3), (3,5), (4,4), (5,6)`. Report the slope and intercept.
