## 24. Python Arrays

## 📘 Introduction
Python's `array` module provides a space-efficient way to store homogeneous numeric data. Unlike lists which can contain elements of different types, arrays are typed — all elements must be of the same type (e.g., all integers, all floats). This type constraint makes arrays more memory-efficient than lists for large collections of numeric data because each element occupies the same fixed amount of memory. The `array` module is part of Python's standard library, so no external installation is required. Arrays support many of the same methods as lists (append, extend, pop, remove, index), making them familiar to use. However, arrays are not as flexible as lists — they can only store elements of a single type code (such as `'i'` for signed integers, `'f'` for floats, `'d'` for doubles). Understanding when to use arrays vs lists is important for writing memory-efficient code, especially when dealing with large datasets.

## 🧠 Key Concepts

- **`array` module** — Import with `from array import array`
- **Type codes** — Single character codes specifying element type: `'i'` (signed int), `'I'` (unsigned int), `'f'` (float), `'d'` (double), `'b'` (signed char), `'B'` (unsigned char)
- **Array creation** — `array(typecode, [initializer])` like `array('i', [1, 2, 3])`
- **Memory efficiency** — Arrays are more compact than lists for homogeneous data
- **Type constraint** — All elements must match the specified type code
- **Common methods:** `append()`, `extend()`, `pop()`, `remove()`, `index()`, `count()`, `reverse()`, `fromlist()`, `tolist()`
- **Indexing and slicing** — Same syntax as lists: `arr[0]`, `arr[1:3]`
- **Mutable** — Elements can be modified: `arr[0] = 10`
- **Arrays vs Lists** — Lists are general-purpose and heterogeneous; arrays are typed and memory-efficient
- **Supported operations** — `+` (concatenation), `*` (repetition), `in` (membership), `len()` (length)

## 💻 Syntax

```python
from array import array

# Create an array of signed integers
int_arr = array('i', [1, 2, 3, 4, 5])

# Create an array of floats
float_arr = array('f', [1.5, 2.5, 3.5])

# Array of doubles
double_arr = array('d', [1.1, 2.2, 3.3])

# Array from a list
numbers = [10, 20, 30]
arr = array('i', numbers)

# Common methods
arr.append(40)       # [10, 20, 30, 40]
arr.extend([50, 60]) # [10, 20, 30, 40, 50, 60]
arr.pop()            # removes and returns 60
arr.remove(20)       # removes first occurrence of 20
idx = arr.index(30)  # returns index of 30
arr.reverse()        # reverses in-place
lst = arr.tolist()   # convert to Python list
```

**Line-by-line explanation:**
- `from array import array` — imports the `array` class from the `array` module
- `array('i', [1, 2, 3])` — creates an integer array with type code `'i'`
- `array('f', ...)` — creates a float array (single precision, 4 bytes per element)
- `array('d', ...)` — creates a double array (double precision, 8 bytes per element)
- `arr.append(40)` — adds element to the end (type must match `'i'`)
- `arr.extend([50, 60])` — adds multiple elements from an iterable
- `arr.pop()` — removes and returns the last element
- `arr.remove(20)` — removes the first element matching 20
- `arr.index(30)` — returns the index of the first occurrence of 30
- `arr.reverse()` — reverses elements in place

## ✅ Example 1 - Basic

**Problem:** Create an array to store daily temperatures (as integers) for a week. Add new readings, find the average temperature, and find the hottest day.

**Code:**
```python
from array import array

# Store daily temperatures (Celsius)
temperatures = array('i', [28, 30, 27, 31, 29, 33, 26])

print(f"Week temperatures: {temperatures.tolist()}")
print(f"Number of readings: {len(temperatures)}")

# Calculate average
average = sum(temperatures) / len(temperatures)
print(f"Average temperature: {average:.1f}°C")

# Find hottest day
max_temp = max(temperatures)
hottest_day = temperatures.index(max_temp) + 1  # +1 for human-readable day
print(f"Hottest day: Day {hottest_day} with {max_temp}°C")

# Add a new reading
temperatures.append(35)
print(f"After adding Monday's reading: {temperatures.tolist()}")
print(f"New average: {sum(temperatures) / len(temperatures):.1f}°C")
```

**Output:**
```
Week temperatures: [28, 30, 27, 31, 29, 33, 26]
Number of readings: 7
Average temperature: 29.1°C
Hottest day: Day 6 with 33°C
After adding Monday's reading: [28, 30, 27, 31, 29, 33, 26, 35]
New average: 29.9°C
```

**Explanation:**
- `array('i', ...)` creates a typed integer array for temperature data
- `tolist()` converts to a regular list for display purposes
- `sum()` and `len()` work on arrays just like lists
- `index(max_temp)` finds the position of the maximum value
- `append(35)` adds a new integer element (type-safe — can't add a string)
- The array guarantees all elements are signed integers, saving memory

## 🚀 Example 2 - Intermediate

**Problem:** Compare memory usage between an array and a list storing 100,000 integers. Then demonstrate type enforcement by trying to insert invalid data.

**Code:**
```python
from array import array
import sys

# Compare memory: array vs list
n = 100000

# List of integers
list_int = list(range(n))
list_size = sys.getsizeof(list_int)
# Add size of each integer object (each Python int is ~28 bytes)
list_total = list_size + n * 28

# Array of signed integers
arr_int = array('i', range(n))
arr_size = sys.getsizeof(arr_int)
# Array stores raw C ints (4 bytes each)
arr_total = arr_size + n * 4

print(f"=== Memory Comparison ({n:,} integers) ===")
print(f"List size: {list_total:,} bytes ({list_total / 1024:.1f} KB)")
print(f"Array size: {arr_total:,} bytes ({arr_total / 1024:.1f} KB)")
print(f"Array is {list_total / arr_total:.1f}x more memory efficient")

# Type enforcement demonstration
print("\n=== Type Enforcement ===")
scores = array('i', [85, 92, 78])
print(f"Scores array: {scores.tolist()}")

try:
    scores.append(95.5)  # float in an integer array
except TypeError as e:
    print(f"Error appending float: {e}")

try:
    scores.append("hello")  # string in an integer array
except TypeError as e:
    print(f"Error appending string: {e}")

# This works — float that can be truncated
scores.append(True)
print(f"After appending True: {scores.tolist()}")
```

**Output:**
```
=== Memory Comparison (100,000 integers) ===
List size: 3,200,056 bytes (3,124.9 KB)
Array size: 400,056 bytes (390.7 KB)
Array is 8.0x more memory efficient

=== Type Enforcement ===
Scores array: [85, 92, 78]
Error appending float: integer expected
Error appending string: integer expected
After appending True: [85, 92, 78, 1]
```

**Explanation:**
- Lists store Python objects (each int is a full Python object ~28 bytes)
- Arrays store raw C values (4 bytes per int for type `'i'`)
- Memory savings grow with data size — arrays are ~8x more efficient for integers
- `append(95.5)` raises `TypeError` because float doesn't match type code `'i'`
- `append("hello")` also raises `TypeError`
- `True` is accepted because `bool` is a subclass of `int` (True = 1)
- The type constraint prevents accidental type mixing

## 🏢 Real World Use Case

**Company: Bloomberg** — Bloomberg's financial data systems use Python arrays extensively for storing time-series market data (stock prices, trading volumes, currency exchange rates). When processing millions of ticks per second, every byte of memory matters. Arrays of type `'d'` (double) store precise price values with minimal overhead. Arrays of type `'i'` store trade counts and volume data. The type constraint also provides a safety guarantee — a price feed that accidentally sends string data will raise a `TypeError` immediately rather than silently corrupting the data. Bloomberg's risk calculation engines use array operations to perform vectorized computations on large datasets. The `fromlist()` and `tolist()` methods are used to interface between array-optimized internal storage and list-based APIs.

**Other uses:** Embedded systems with limited memory, scientific data acquisition, audio processing (storing PCM samples), image pixel data, and game development (storing vertex coordinates).

## 🎯 Interview Questions

**1. What are the advantages of `array` over `list` in Python?**

Arrays are more memory-efficient for homogeneous numeric data because they store raw C values rather than Python objects. Arrays also enforce type safety — all elements must be of the same type, preventing accidental type mixing. For large datasets of numbers, arrays can be 4-8x more memory efficient. However, lists are more flexible (heterogeneous types, more methods) and should be preferred for general-purpose use.

**2. What type codes are available in the `array` module?**

Common type codes: `'b'` (signed char, 1 byte), `'B'` (unsigned char, 1 byte), `'h'` (signed short, 2 bytes), `'H'` (unsigned short, 2 bytes), `'i'` (signed int, 4 bytes), `'I'` (unsigned int, 4 bytes), `'l'` (signed long, 8 bytes), `'L'` (unsigned long, 8 bytes), `'f'` (float, 4 bytes), `'d'` (double, 8 bytes). The exact sizes may vary by platform.

**3. How do you convert between arrays and lists?**

Use `arr.tolist()` to convert an array to a Python list. Use `array(typecode, list)` or `arr.fromlist(list)` to convert a list to an array. `fromlist()` appends elements from the list to an existing array.

**4. Can you use an array as a stack or queue?**

Arrays support stack operations — `append()` for push and `pop()` for pop. For queue operations, you can use `pop(0)` but it's O(n) because elements must shift. For efficient queue operations, `collections.deque` is better. Arrays also support `insert()` and `remove()` but these are O(n) operations.

**5. What happens if you try to store a value that exceeds the type code's range?**

Python converts or raises `OverflowError` depending on the type. For unsigned types, negative values raise `OverflowError`. Values exceeding the maximum for the type also raise `OverflowError`. For example, `array('b', [200])` raises `OverflowError` because signed char only goes up to 127. Use the appropriate type code for your data range.

## ⚠ Common Errors / Mistakes

**Error 1: Using wrong type code for data**
```python
from array import array

# BAD — signed char can't hold 200
arr = array('b', [100, 200])  # OverflowError: signed char is greater than maximum

# FIX — use larger type
arr = array('h', [100, 200])  # OK — short int
# or
arr = array('B', [100, 200])  # OK — unsigned char (0-255)
```

**Error 2: Mixing incompatible types**
```python
# BAD — TypeError
arr = array('i', [1, 2, 3])
arr.append(3.14)  # TypeError: integer expected

# FIX — convert to correct type
arr.append(int(3.14))  # truncates to 3
```

**Error 3: Forgetting to import array**
```python
# BAD — NameError
arr = array('i', [1, 2, 3])  # NameError: name 'array' is not defined

# FIX — import first
from array import array
arr = array('i', [1, 2, 3])
```

**Error 4: Assuming array supports all list operations**
```python
arr = array('i', [3, 1, 4, 1, 5])
arr.sort()  # AttributeError: 'array' object has no attribute 'sort'

# FIX — use sorted() or convert to list
sorted_arr = array('i', sorted(arr))
```

**Error 5: Using negative values with unsigned type codes**
```python
# BAD — OverflowError
arr = array('I', [10, -5])  # OverflowError: unsigned integer is less than minimum

# FIX — use signed type
arr = array('i', [10, -5])  # OK
```

## 📝 Practice Exercises

**Beginner:**
1. Create an array of type `'f'` with 5 float values. Append 3 more floats, then print the array and its length.
2. Write a program that creates an array of 10 integers, removes the element at index 3, and prints the array before and after removal.
3. Create two arrays of type `'d'` with 3 elements each. Concatenate them using the `+` operator and print the result.

**Intermediate:**
4. Write a function `array_stats(arr)` that takes an array of integers and returns a dictionary containing the mean, median, mode, min, max, and standard deviation. Use only array methods and built-in functions.
5. Create a program that reads 100,000 random integers into both a list and an array. Measure and compare the memory usage (using `sys.getsizeof`) and the time taken for a sum operation.
6. Implement a `MovingAverage` class that uses a `collection` array of type `'d'` to maintain a sliding window of the last `n` data points. Provide an `add(value)` method that returns the current moving average.

**Advanced:**
7. Write a program that stores a large matrix (e.g., 1000x1000) of integers using a flat `array('i')`. Implement functions to get and set elements by row/column index, and compare the memory usage with a list of lists.
8. Implement a custom `TypedArray` class that wraps the built-in `array` module and adds type validation for the `'i'` type. Support the methods `append`, `extend`, `pop`, `remove`, `min`, `max`, and `sum`.
