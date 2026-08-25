## 11. NumPy Random

## 📘 Introduction

NumPy's `random` module is a cornerstone for simulations, bootstrapping, Monte Carlo methods, and stochastic algorithms. It provides both simple random generators and a wide range of probability distributions. Modern NumPy (1.17+) recommends using the `Generator` API for improved performance and statistical properties.

## 🧠 Key Concepts

- **`np.random` module**: Legacy random functions (still widely used).
- **`np.random.rand(d0, d1, ...)`**: Uniform random floats in [0, 1).
- **`np.random.randn(d0, d1, ...)`**: Samples from standard normal (mean=0, std=1).
- **`np.random.randint(low, high, size)`**: Random integers in [low, high).
- **`np.random.choice(a, size, replace, p)`**: Random sample from an array (with or without replacement, with probabilities).
- **`np.random.shuffle(arr)`**: Shuffles array **in-place** along first axis.
- **`np.random.permutation(arr)`**: Returns a **shuffled copy** (or permuted indices).
- **`np.random.seed(seed)`**: Seeds the legacy global random state for reproducibility.
- **Distributions**: `normal()`, `uniform()`, `binomial()`, `poisson()`, `exponential()`, `beta()`, `gamma()`.
- **Modern API**: `rng = np.random.default_rng(seed)` — prefer this for new code.

## 💻 Syntax

```python
import numpy as np

# Legacy API
np.random.seed(42)
print(np.random.rand(3))          # 3 uniform [0,1)
print(np.random.randn(2, 3))      # 2x3 standard normal
print(np.random.randint(0, 10, size=(2, 3)))  # 2x3 ints 0-9
print(np.random.choice([10, 20, 30], size=5, replace=True))

arr = np.arange(10)
np.random.shuffle(arr)            # in-place shuffle
print(arr)

print(np.random.permutation(10))  # shuffled array 0..9

# Modern API (recommended)
rng = np.random.default_rng(42)
print(rng.standard_normal(3))
```

## ✅ Example 1 - Basic: Generating Random Data

**Problem:** Generate a 3x4 matrix of uniform random floats and a 1D array of 100 random integers.

```python
import numpy as np

np.random.seed(0)
uniform_mat = np.random.rand(3, 4)
print("Uniform 3x4:\n", uniform_mat)

rand_ints = np.random.randint(1, 100, size=10)
print("Random ints 1-99:", rand_ints)

# From a normal distribution
normal_data = np.random.randn(1000)
print(f"Normal: mean={normal_data.mean():.3f}, std={normal_data.std():.3f}")
```

**Output:**
```
Uniform 3x4:
 [[0.5488 0.7152 0.6028 0.5449]
 [0.4237 0.6459 0.4376 0.8918]
 [0.9637 0.3834 0.7917 0.5289]]
Random ints 1-99: [54 42 49 40 17 81 97 43 66 39]
Normal: mean=-0.045, std=1.012
```

**Explanation:** `rand(3,4)` generates a 3x4 array of floats in [0, 1). `randint(1, 100)` generates from 1 to 99. `randn(1000)` produces values centered at 0 with std≈1.

## 🚀 Example 2 - Intermediate: Dice Roll Simulation with Choice

**Problem:** Simulate 10,000 dice rolls and count the frequency of each face.

```python
import numpy as np

np.random.seed(42)
rolls = np.random.choice([1, 2, 3, 4, 5, 6], size=10000)
values, counts = np.unique(rolls, return_counts=True)

print("Face | Count | %")
for v, c in zip(values, counts):
    print(f"  {v}   | {c:4d}  | {c/100:.1f}%")

# Weighted choice (biased die)
biased = np.random.choice([1, 2, 3, 4, 5, 6], size=10000,
                          p=[0.1, 0.1, 0.1, 0.1, 0.1, 0.5])
b_vals, b_counts = np.unique(biased, return_counts=True)
print("\nBiased die:")
for v, c in zip(b_vals, b_counts):
    print(f"  {v}   | {c:4d}  | {c/100:.1f}%")
```

**Output:**
```
Face | Count | %
  1   | 1661  | 16.6%
  2   | 1739  | 17.4%
  3   | 1641  | 16.4%
  4   | 1665  | 16.7%
  5   | 1645  | 16.5%
  6   | 1649  | 16.5%

Biased die:
  1   | 1012  | 10.1%
  2   |  978  |  9.8%
  3   |  990  |  9.9%
  4   | 1019  | 10.2%
  5   |  992  |  9.9%
  6   | 5009  | 50.1%
```

**Explanation:** `np.random.choice` with `size=10000` simulates 10,000 independent draws. The `p` parameter assigns custom probabilities, making the "biased die" roll 6 roughly 50% of the time.

## 🏢 Real World Use Case

**Monte Carlo Option Pricing:** A quantitative analyst prices a European call option using Monte Carlo simulation: generate 100,000 random price paths using `np.random.standard_normal()` with geometric Brownian motion, compute the payoff, and take the discounted mean. Setting `np.random.seed(42)` ensures reproducible results for audit. The modern `default_rng` API is used for better statistical quality.

## 🎯 Interview Questions

1. **How do you generate a 3x3 array of random floats from a uniform distribution?**
   `np.random.rand(3, 3)` or `np.random.random((3, 3))`.

2. **What is the difference between `shuffle` and `permutation`?**
   `np.random.shuffle(arr)` shuffles the array **in-place** and returns `None`. `np.random.permutation(arr)` returns a **shuffled copy** (or a permuted range if given an integer).

3. **How do you ensure reproducible random numbers?**
   Call `np.random.seed(seed)` before generating random numbers, or use the modern API: `rng = np.random.default_rng(42)`.

4. **How do you generate random integers between 5 and 10 (inclusive)?**
   `np.random.randint(5, 11, size=n)` — note that high is exclusive.

5. **What distributions are available in `np.random`?**
   `normal()`, `uniform()`, `binomial()`, `poisson()`, `exponential()`, `beta()`, `gamma()`, `chisquare()`, `t()`, `f()`, and many more.

## ⚠ Common Errors / Mistakes

- **Calling `np.random.seed()` without arguments** — resets the seed to a random state from OS entropy.
- **Using `shuffle` on a multi-dimensional array** — only shuffles along the first axis (rows). Use `np.random.permutation` with axis for full control.
- **Forgetting that `randint` high value is exclusive** — `randint(1, 7)` gives 1–6, not 1–7.
- **Not seeding before distributed/parallel code** — different processes can get identical random streams.

## 📝 Practice Exercises

**Beginner:**
1. Generate a 2x5 array of uniform random floats between 0 and 1.
2. Generate 20 random integers between 50 and 100 (inclusive).
3. Use `np.random.choice` to simulate 1,000 coin flips and count heads vs tails.

**Intermediate:**
4. Generate 10,000 samples from a standard normal distribution and verify that mean ≈ 0 and std ≈ 1.
5. Simulate rolling two dice 50,000 times and compute the distribution of the sum.
6. Use `np.random.shuffle` to randomly reorder a 1D array of 0–9 and confirm the same elements exist with `np.unique`.

**Advanced:**
7. Implement a simple Monte Carlo estimator of π: generate random (x, y) points in [0,1]², count those inside the unit quarter-circle, and estimate π.
8. Use `np.random.binomial(n=10, p=0.5, size=10000)` to simulate 10,000 experiments of 10 coin flips each, and plot the histogram of successes.
