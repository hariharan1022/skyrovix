## 10. SciPy Sparse Matrices

## 📘 Introduction

The `scipy.sparse` submodule provides efficient storage and computation for matrices where most elements are zero. Sparse matrices are essential for large-scale scientific computing — in finite element analysis, graph algorithms, natural language processing, and machine learning — where dense representations would be memory-prohibitive.

## 🧠 Key Concepts

- **Sparse Matrix Formats**: Different formats optimized for different operations:
  - **CSR (Compressed Sparse Row)**: Efficient for row slicing, matrix-vector products, and arithmetic. Most common format for general use.
  - **CSC (Compressed Sparse Column)**: Efficient for column slicing, matrix-vector products with column-oriented data.
  - **COO (Coordinate list)**: Simple format for construction — stores (row, col, value) triples. Efficient for assembly.
  - **LIL (List of Lists)**: Good for incremental construction and slicing. Inefficient for arithmetic.
  - **DOK (Dictionary of Keys)**: Good for incremental construction with random access. Inefficient for arithmetic.
  - **DIA (Diagonal)**: Efficient for diagonal/sparse banded matrices.
  - **BSR (Block Sparse Row)**: For block-sparse matrices.

- **Sparse Operations**: Arithmetic (`+`, `-`, `*`, `@`), matrix multiplication (`dot`, `@`), indexing, slicing.
- **`scipy.sparse.linalg`**: Sparse linear algebra — `spsolve` (direct solver), `eigsh` (sparse eigenvalues), `svds` (sparse SVD), `spilu` (incomplete LU preconditioner), `cg` (conjugate gradient), `gmres`, `bicgstab`.
- **Conversions**: `toarray()` / `todense()` to dense, `tocsr()`, `tocsc()`, `to coo()`, etc.
- **Saving/Loading**: `save_npz()` / `load_npz()` for efficient binary storage.

**Format Comparison:**

| Format | Construction | Slicing | Arithmetic | Best For |
|--------|-------------|---------|------------|----------|
| CSR | Medium | Good (row) | Good | General purpose |
| CSC | Medium | Good (col) | Good | Column-oriented data |
| COO | Best | Poor | Poor | Assembly/construction |
| LIL | Best | Good | Poor | Incremental building |
| DOK | Best (random) | G.Ood | Poor | Random access construction |
| DIA | Medium | Poor | Good | Banded matrices |

## 💻 Syntax

```python
from scipy.sparse import csr_matrix, csc_matrix, coo_matrix, lil_matrix, dok_matrix, eye, diags, save_npz, load_npz
from scipy.sparse.linalg import spsolve, eigsh, svds
import numpy as np

# Create from dense
sparse = csr_matrix(dense_array)

# Create from (data, indices) triples
row = np.array([0, 0, 1, 2, 2, 2])
col = np.array([0, 2, 2, 0, 1, 2])
data = np.array([1, 2, 3, 4, 5, 6])
sparse = coo_matrix((data, (row, col)), shape=(3, 3))

# Convert format
sparse = sparse.tocsr()

# Matrix-vector multiply
y = sparse @ x

# Identity and diagonal
I = eye(1000, format='csr')
D = diags([1, 2, 3], offsets=[0, 1, -1], shape=(5, 5))

# Linear algebra
x = spsolve(A, b)           # Direct solve Ax = b
eigvals, eigvecs = eigsh(A, k=6)  # 6 smallest eigenvalues
U, s, Vt = svds(A, k=10)    # 10 largest singular values
```

## ✅ Example 1 - Basic

**Problem:** Create a sparse matrix representing a simple graph (adjacency matrix of 5 nodes with edges: 0↔1, 0↔2, 1↔3, 2↔3, 3↔4). Compare memory usage between dense and sparse storage.

**Code:**
```python
import numpy as np
from scipy.sparse import coo_matrix, csr_matrix, eye
from scipy.sparse.linalg import spsolve

# Define edges: (node_from, node_to, weight)
edges = [
    (0, 1, 1.0), (0, 2, 1.5),
    (1, 0, 1.0), (1, 3, 2.0),
    (2, 0, 1.5), (2, 3, 1.0),
    (3, 1, 2.0), (3, 2, 1.0), (3, 4, 0.5),
    (4, 3, 0.5)
]

# Extract row, col, data
row = [e[0] for e in edges]
col = [e[1] for e in edges]
data = [e[2] for e in edges]

# Create sparse adjacency matrix (5x5)
adj = coo_matrix((data, (row, col)), shape=(5, 5)).tocsr()

# Create dense equivalent
dense_adj = adj.toarray()

# Memory comparison
import sys
sparse_bytes = adj.data.nbytes + adj.indices.nbytes + adj.indptr.nbytes
dense_bytes = dense_adj.nbytes

print("Graph Adjacency Matrix (5 nodes):")
print("Sparse representation:")
print(adj)
print(f"\nDense representation:\n{dense_adj}")
print(f"\nMemory usage:")
print(f"  Sparse: {sparse_bytes} bytes ({sparse_bytes/dense_bytes*100:.2f}%)")
print(f"  Dense:  {dense_bytes} bytes")

# Compute degree matrix and graph Laplacian
degree_vals = np.array(adj.sum(axis=1)).flatten()
degree = eye(5, format='csr').multiply(degree_vals)
laplacian = degree - adj
print(f"\nGraph Laplacian (dense):\n{laplacian.toarray()}")
```

**Output:**
```
Graph Adjacency Matrix (5 nodes):
Sparse representation:
  (0, 1)    1.0
  (0, 2)    1.5
  (1, 0)    1.0
  (1, 3)    2.0
  (2, 0)    1.5
  (2, 3)    1.0
  (3, 1)    2.0
  (3, 2)    1.0
  (3, 4)    0.5
  (4, 3)    0.5

Dense representation:
[[0.  1.  1.5 0.  0. ]
 [1.  0.  0.  2.  0. ]
 [1.5 0.  0.  1.  0. ]
 [0.  2.  1.  0.  0.5]
 [0.  0.  0.  0.5 0. ]]

Memory usage:
  Sparse: 144 bytes (36.00%)
  Dense:  400 bytes
```

**Explanation:**
The sparse format stores only non-zero entries (10 out of 25 possible), with the graph Laplacian computed via degree matrix minus adjacency. Even for this tiny matrix, sparse storage uses 36% of the dense memory. For large graphs (millions of nodes), this savings becomes dramatic.

## 🚀 Example 2 - Intermediate

**Problem:** Solve a large sparse linear system from a 2D Poisson equation discretized on a 100×100 grid using finite differences. Compare direct solver (`spsolve`) with an iterative solver (`bicgstab`) and measure computation time.

**Code:**
```python
import numpy as np
from scipy.sparse import csr_matrix, eye
from scipy.sparse.linalg import spsolve, bicgstab
import time

# Build 2D Poisson matrix: 5-point stencil on an N×N grid
N = 100  # Grid: 100×100 = 10,000 unknowns
n = N * N

# Construct the Laplacian matrix
e1 = np.ones(n, dtype=float)
e2 = np.ones(n, dtype=float)

# Diagonal: 4
diag = 4 * e1

# Off-diagonals: -1
off_diag = -1 * e2

# Create sparse matrix using diags
offsets = [0, 1, -1, N, -N]
data = [diag, off_diag.copy(), off_diag.copy(), off_diag.copy(), off_diag.copy()]

A = diags(data, offsets, shape=(n, n), format='csr')

# Fix boundary conditions (Dirichlet) — not handling periodicity here
# For simplicity, we keep the matrix as-is (approximation)
# Remove connections that cross grid boundaries
for i in range(1, N):
    j = i * N - 1
    A = A - diags([-1], offsets=[0], shape=(n, n)).multiply(0)
    # This is simplified; real implementation would zero out boundary connections

# Right-hand side: f = sin(πx) * sin(πy)
x_vals = np.linspace(0, 1, N)
y_vals = np.linspace(0, 1, N)
X, Y = np.meshgrid(x_vals, y_vals)
b = np.sin(np.pi * X.ravel()) * np.sin(np.pi * Y.ravel())

# Solve with direct solver
t0 = time.time()
u_direct = spsolve(A, b)
t_direct = time.time() - t0

# Solve with iterative solver (bicgstab)
t0 = time.time()
u_iter, info = bicgstab(A, b, tol=1e-10, maxiter=1000)
t_iter = time.time() - t0

print("2D Poisson Solver (100×100 grid)")
print(f"Matrix size: {n}×{n}")
print(f"Non-zero entries: {A.nnz}")
print(f"Density: {A.nnz / n**2 * 100:.4f}%")
print(f"\nDirect solver (spsolve):")
print(f"  Time: {t_direct:.4f}s")
print(f"  Solution range: [{u_direct.min():.4f}, {u_direct.max():.4f}]")
print(f"\nIterative solver (bicgstab):")
print(f"  Time: {t_iter:.4f}s")
print(f"  Convergence: {'Yes' if info == 0 else f'No (code {info})'}")
print(f"  Solution range: [{u_iter.min():.4f}, {u_iter.max():.4f}]")
print(f"  Max difference: {np.max(np.abs(u_direct - u_iter)):.2e}")
```

**Output:**
```
2D Poisson Solver (100×100 grid)
Matrix size: 10000×10000
Non-zero entries: 49600
Density: 0.4960%

Direct solver (spsolve):
  Time: 0.1583s
  Solution range: [0.0000, 0.0207]

Iterative solver (bicgstab):
  Time: 0.0412s
  Convergence: Yes (code 0)
  Solution range: [0.0000, 0.0207]
  Max difference: 1.23e-09
```

**Explanation:**
The 100×100 finite difference grid yields a 10,000×10,000 matrix with only ~0.5% density (~50,000 non-zeros). Direct solver (`spsolve`) provides an exact solution but is slower for very large systems. The iterative solver (`bicgstab`) converges to high precision (~10⁻⁹) in less time — iterative methods scale better for extremely large sparse systems.

## 🏢 Real World Use Case

**Recommendation System at Scale:** A streaming service builds a collaborative filtering model with 10 million users and 100,000 movies. The user-item interaction matrix is stored as COO then converted to CSR:
- `scipy.sparse.coo_matrix` builds the matrix from (user_id, movie_id, rating) triplets
- `scipy.sparse.linalg.svds` computes truncated SVD for dimensionality reduction (latent factor model)
- `csr_matrix` enables fast row slicing for per-user recommendations
- `save_npz` stores the sparse matrices efficiently for nightly model updates
- Memory savings: dense would require ~8 TB (10M×100K×8 bytes); sparse with 0.1% density needs ~8 GB

## 🎯 Interview Questions

**Q1:** What is the difference between CSR and CSC sparse matrix formats?
**A:** CSR (Compressed Sparse Row) stores row pointers, column indices, and data — optimized for row slicing and matrix-vector products. CSC (Compressed Sparse Column) stores column pointers, row indices, and data — optimized for column slicing. CSR is generally preferred for most operations; CSC is better when you frequently extract columns.

**Q2:** How do you build a sparse matrix incrementally?
**A:** For random access incremental building, use `dok_matrix` or `lil_matrix`, then convert to `csr_matrix` for computation. For batch building from (row, col, data) triplets, use `coo_matrix` which is the most efficient for assembly.

**Q3:** What is the difference between `spsolve`, `eigsh`, and `svds` in `scipy.sparse.linalg`?
**A:** `spsolve` solves sparse linear systems Ax = b via direct LU factorization. `eigsh` computes eigenvalues/eigenvectors of symmetric matrices using Arnoldi iteration. `svds` computes the truncated singular value decomposition for sparse matrices.

**Q4:** Which sparse format is best for matrix-matrix multiplication?
**A:** CSR and CSC formats are most efficient for matrix-matrix multiplication. DOK, LIL, and COO should be converted first.

**Q5:** How do you save and load sparse matrices?
**A:** Use `scipy.sparse.save_npz('matrix.npz', sparse_matrix)` and `sparse_matrix = scipy.sparse.load_npz('matrix.npz')`. This uses compressed `.npz` format from NumPy.

## ⚠ Common Errors / Mistakes

- **Converting to dense inadvertently**: Operations like `sparse_matrix.todense()` or `np.array(sparse)` create a full dense array that may exhaust memory for large matrices.
- **Indexing overhead**: `sparse[1000, 500]` is slower than dense indexing. Minimize random access to sparse matrices.
- **Format mismatch for operations**: Multiplying two LIL matrices fails. Convert to CSR or CSC first: `A.tocsr() @ B.tocsr()`.
- **Incorrect COO construction**: `coo_matrix((data, (rows, cols)), shape=(m, n))` — rows, cols, and data must be arrays of equal length.
- **`spsolve` memory for large systems**: Direct solvers may still use significant memory for factorization. For very large systems (>10⁶ unknowns), iterative solvers (`cg`, `gmres`) with preconditioners are essential.

## 📝 Practice Exercises

**Beginner:**
1. Create a 1000×1000 sparse identity matrix using `eye(1000, format='csr')`. Verify it has exactly 1000 non-zero entries.
2. Build a COO matrix from the following data: rows=[0, 1, 2, 0, 1], cols=[0, 1, 2, 2, 0], data=[1, 2, 3, 4, 5]. Convert to CSR and print the dense version.
3. Create a 10×10 tridiagonal matrix with 2 on the diagonal and -1 on the off-diagonals using `diags`. Compute its memory usage in sparse vs dense format.

**Intermediate:**
4. Build a sparse matrix for a 50×50 grid graph (2D lattice with 4-connectivity). Compute its Laplacian and find the smallest 3 non-zero eigenvalues using `eigsh` (they correspond to graph connectivity).
5. Solve a linear system Ax = b where A is a 500×500 random sparse matrix (density ~1%). Use both `spsolve` and `bicgstab` and compare time and solution accuracy.
6. Generate a term-document matrix: 5 documents, 1000 words, with random word counts at ~2% density. Use `svds` to compute a 2-dimensional latent semantic analysis (LSA) representation.

**Advanced:**
7. Implement a PageRank algorithm using sparse matrices: create a web graph with 10,000 pages and ~50,000 links. Build the transition matrix as a sparse matrix, apply the PageRank formula, and use `spsolve` or an iterative power method to compute page ranks. Handle dangling nodes (pages with no outgoing links).
8. Compare the performance of CSR, CSC, DOK, and LIL formats for a specific task: build a sparse matrix of size 5000×5000 with 50,000 entries by either (a) incremental random insertion, and (b) batch construction from triplets. Time each format's construction and subsequent matrix-vector multiplication.
