## 7. NumPy Array Operations

## 📘 Introduction

NumPy's real power lies in its ability to perform vectorized operations on entire arrays. Element-wise arithmetic, broadcasting, comparison operators, logical operations, and universal functions (ufuncs) allow you to express complex mathematical transformations without loops.

## 🧠 Key Concepts

- **Element-wise arithmetic**: `+`, `-`, `*`, `/`, `**`, `//`, `%` operate element-by-element.
- **Broadcasting**: NumPy automatically expands arrays of different shapes to make them compatible for element-wise operations.
- **Comparison operators**: `<`, `>`, `<=`, `>=`, `==`, `!=` return boolean arrays.
- **Logical operations**: `np.logical_and()`, `np.logical_or()`, `np.logical_not()` (or use `&`, `|`, `~` with parentheses).
- **Ufuncs (universal functions)**: Fast element-wise functions like `np.sqrt()`, `np.exp()`, `np.log()`, `np.sin()`, `np.cos()`, `np.abs()`.

## 💻 Syntax

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Element-wise arithmetic
print(a + b)      # [5 7 9]
print(a * b)      # [4 10 18]
print(a ** 2)     # [1 4 9]

# Broadcasting: scalar + array
print(a + 10)     # [11 12 13]

# Comparison
print(a > 2)      # [False False  True]

# Logical
print(np.logical_and(a > 1, b < 6))  # [False  True  True]

# Ufuncs
print(np.sqrt(a))  # [1. 1.414 1.732]
print(np.exp(a))   # [2.718 7.389 20.086]
```

## ✅ Example 1 - Basic: Element-wise Arithmetic

**Problem:** Given two arrays of temperatures in Celsius and Fahrenheit conversion factors, compute Fahrenheit values.

```python
import numpy as np

celsius = np.array([0, 10, 20, 30, 40])
fahrenheit = celsius * 9/5 + 32
print("Celsius:", celsius)
print("Fahrenheit:", fahrenheit)

squared = celsius ** 2
print("Squared:", squared)
```

**Output:**
```
Celsius: [ 0 10 20 30 40]
Fahrenheit: [ 32.  50.  68.  86. 104.]
Squared: [  0 100 400 900 1600]
```

**Explanation:** The expression `celsius * 9/5 + 32` is computed element-wise — each Celsius value is multiplied, divided, and added to in a single vectorized operation. No loop needed.

## 🚀 Example 2 - Intermediate: Broadcasting and Logical Operations

**Problem:** Create a 3x3 grid of values and set all negative numbers to 0, all numbers > 5 to 1, and leave others as-is.

```python
import numpy as np

arr = np.array([[ 2, -1,  8],
                [-3,  4, -2],
                [ 5, -6,  3]])

# Using np.where and broadcasting
result = np.where(arr < 0, 0, np.where(arr > 5, 1, arr))
print("Result:\n", result)

# Same using logical operations
mask_neg = arr < 0
mask_high = arr > 5
result2 = arr.copy()
result2[mask_neg] = 0
result2[mask_high] = 1
print("Result2:\n", result2)
```

**Output:**
```
Result:
 [[0 0 1]
 [0 4 0]
 [5 0 3]]
Result2:
 [[0 0 1]
 [0 4 0]
 [5 0 3]]
```

**Explanation:** `np.where(condition, x, y)` uses broadcasting to produce the result. The first approach is fully vectorized. The second uses boolean masks for clarity. Both avoid explicit Python loops.

## 🏢 Real World Use Case

**Image Brightness and Contrast Adjustment:** A computer vision pipeline loads an image as a uint8 array (0–255). To increase brightness by 20% and then clip to valid range, one uses: `img_adjusted = np.clip(img * 1.2, 0, 255).astype(np.uint8)`. The multiplication is broadcast, and `np.clip` is a ufunc. This operation runs in milliseconds for a 4K image.

## 🎯 Interview Questions

1. **What is broadcasting in NumPy?**
   The automatic expansion of arrays during arithmetic so they have compatible shapes. A smaller array is "broadcast" across a larger array without copying data.

2. **How do you compute element-wise square root?**
   `np.sqrt(arr)` — applies the ufunc to every element. Also works as `arr ** 0.5`.

3. **What is the difference between `np.logical_and` and the `&` operator?**
   `np.logical_and(a, b)` is the explicit function. `a & b` is shorthand that works for NumPy arrays but requires parentheses when combining with comparisons: `(a > 0) & (a < 10)`.

4. **What happens when you multiply two arrays of different shapes?**
   NumPy attempts to broadcast them. If shapes are incompatible, it raises a `ValueError`.

5. **Name 5 universal functions (ufuncs).**
   `np.sqrt`, `np.exp`, `np.log`, `np.sin`, `np.cos`, `np.abs`, `np.add`, `np.multiply`.

## ⚠ Common Errors / Mistakes

- **Using `and` / `or` instead of `&` / `|`** on arrays — `and`/`or` are Python keywords that don't work element-wise; use `&`/`|` with parentheses.
- **Incompatible shapes for broadcasting**: e.g., `(3, 4)` and `(3,)` can broadcast, but `(3, 4)` and `(4,)` cannot.
- **Forgetting parentheses in compound comparisons**: `arr > 0 & arr < 10` is parsed as `arr > (0 & arr) < 10` — use `(arr > 0) & (arr < 10)`.
- **Modifying a ufunc output in-place** — ufuncs like `np.sqrt()` return new arrays; use `np.sqrt(arr, out=arr)` for in-place.

## 📝 Practice Exercises

**Beginner:**
1. Given `a = np.array([1, 2, 3])` and `b = np.array([4, 5, 6])`, compute `a + b`, `a * b`, `b / a`, and `a ** b`.
2. Create an array of 0° to 100° in steps of 10, convert to Fahrenheit.
3. Use `np.sqrt()` on `np.array([0, 1, 4, 9, 16])` and compare with `** 0.5`.

**Intermediate:**
4. Given two 2D arrays of shapes `(3, 1)` and `(1, 4)`, demonstrate broadcasting by adding them.
5. Use logical operations to extract values between 20 and 80 from `np.arange(0, 100)`.
6. Compute `np.sin(x)` and `np.cos(x)` for `x = np.linspace(0, 2*np.pi, 1000)` and verify `sin² + cos² ≈ 1` element-wise.

**Advanced:**
7. Implement the sigmoid function `σ(x) = 1 / (1 + exp(-x))` using ufuncs on a 1D array of 1000 values. Measure execution time.
8. Using broadcasting, create a 10x10 distance matrix where `D[i,j] = sqrt(i² + j²)` without any loops.
