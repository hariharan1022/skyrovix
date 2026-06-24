## 6. NumPy Data Types

## 📘 Introduction

NumPy arrays are homogeneous — all elements share the same data type (dtype). This uniformity is key to performance: it enables fixed-size elements and contiguous memory layout. NumPy provides a rich set of dtypes including integers (int8–int64), floats (float16–float64), complex, boolean, and fixed-size strings.

## 🧠 Key Concepts

- **dtype parameter**: Specified at array creation: `np.array([1, 2], dtype=np.float32)`.
- **Integer types**: `int8`, `int16`, `int32`, `int64` (signed); `uint8`, `uint16`, `uint32`, `uint64` (unsigned).
- **Float types**: `float16` (half), `float32` (single), `float64` (double, default).
- **Complex types**: `complex64` (two float32), `complex128` (two float64).
- **Other types**: `bool`, `object`, `str_`, `bytes_`.
- **Type conversion**: `.astype(new_dtype)` returns a new array with the specified dtype.
- **Checking dtype**: `arr.dtype` attribute (returns a `numpy.dtype` object).
- **Endianness**: `<` (little-endian) or `>` (big-endian) prefix, e.g., `>f8` for big-endian float64.

## 💻 Syntax

```python
import numpy as np

arr = np.array([1, 2, 3])
print(arr.dtype)                    # int64

float_arr = arr.astype(np.float32)
print(float_arr.dtype)              # float32

explicit = np.array([1, 2, 3], dtype=np.complex128)
print(explicit.dtype)               # complex128

bool_arr = np.array([0, 1, 0, 1], dtype=bool)
print(bool_arr)                     # [False  True False  True]
```

## ✅ Example 1 - Basic: Exploring Default Dtypes

**Problem:** Create arrays with different Python literals and observe the inferred dtypes.

```python
import numpy as np

print(np.array([1, 2, 3]).dtype)          # ints
print(np.array([1., 2., 3.]).dtype)       # floats
print(np.array([1+2j, 3+4j]).dtype)       # complex
print(np.array([True, False]).dtype)       # bool
print(np.array(['a', 'b', 'c']).dtype)     # string (<U1)
```

**Output:**
```
int64
float64
complex128
bool
<U1
```

**Explanation:** NumPy infers dtypes from the input data. Integers → `int64`, floats → `float64`, complex → `complex128`. Strings use Unicode type `<U1` (1 character).

## 🚀 Example 2 - Intermediate: Type Conversion and Precision

**Problem:** Create a float64 array, convert to float32 and int32, observe precision loss.

```python
import numpy as np

original = np.array([1.7, 2.8, 3.14, 100.567])
print("float64:", original.dtype, original)

f32 = original.astype(np.float32)
print("float32:", f32.dtype, f32)

i32 = original.astype(np.int32)
print("int32:", i32.dtype, i32)

diff = np.abs(original - f32)
print("Max diff float64->float32:", diff.max())
```

**Output:**
```
float64: float64 [  1.7     2.8     3.14  100.567]
float32: float32 [  1.7     2.8     3.14  100.567]
int32: int32 [  1   2   3 100]
Max diff float64->float32: 2.384185791015625e-07
```

**Explanation:** `float32` has ~7 decimal digits of precision, so small rounding errors appear. Converting to `int32` truncates the fractional part (no rounding).

## 🏢 Real World Use Case

**Memory Optimization in Large Datasets:** A data scientist working with a 10 GB CSV of sensor readings uses `pd.read_csv('sensors.csv', dtype={'temp': np.float32, 'humidity': np.float32})` to halve memory usage compared to the default float64. For a categorical column with 256 categories, `uint8` reduces memory by 8x vs int64.

## 🎯 Interview Questions

1. **What is the default float dtype in NumPy?**
   `float64` (64-bit double precision). On most systems this maps to Python's `float`.

2. **How do you convert an array from int64 to float32?**
   `arr.astype(np.float32)` — this returns a new array; the original is unchanged.

3. **What is the difference between `int32` and `int64`?**
   `int32` uses 4 bytes per element (range -2³¹ to 2³¹-1), `int64` uses 8 bytes. `int64` can represent larger values but uses twice the memory.

4. **What does the `dtype` of `np.array([1, 2])` vs `np.array([1., 2.])` differ?**
   First is `int64` (inferred from Python ints), second is `float64` (inferred from Python floats).

5. **What is endianness in NumPy dtypes?**
   It specifies byte order: `<` for little-endian (least significant byte first, common on x86), `>` for big-endian. Visible in dtypes like `>f8` or `<f8`.

## ⚠ Common Errors / Mistakes

- **Overflow with integer types**: `np.int8([127])` + 1 wraps to -128 (silent overflow).
- **Losing precision when converting float64 → float32** for very large or very small numbers.
- **Assuming `.astype()` modifies in-place** — it returns a copy; the original array is unchanged.
- **Mixing dtypes in operations** — NumPy applies type promotion rules (e.g., int + float → float) which may not be expected.

## 📝 Practice Exercises

**Beginner:**
1. Create an array `[1.5, 2.7, 3.9]` and check its dtype.
2. Convert the array from the previous exercise to `int32` and observe the result.
3. Create a boolean array from `np.array([0, 1, 2, 3])` using `.astype(bool)`.

**Intermediate:**
4. Create a `float32` array of 1 million elements and measure its memory with `.nbytes`. Compare to `float64`.
5. Demonstrate integer overflow by creating `np.int8([120, 130])` and explaining the output.
6. Use `np.array([1, 2, 3], dtype=np.complex128)` and verify each element has real and imaginary parts.

**Advanced:**
7. Write a function `safe_cast(arr, target_dtype)` that checks if the values fit in the target dtype without overflow and raises a custom warning if not.
8. Create a structured dtype (compound dtype) with fields `'name'` (U20), `'age'` (int32), and `'salary'` (float64) and populate it with 5 records.
