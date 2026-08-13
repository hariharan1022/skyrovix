## 23. Python Range

## 📘 Introduction
The `range()` function in Python is a built-in function that generates an immutable sequence of numbers. It is most commonly used in `for` loops to repeat an action a specific number of times or to iterate over a numeric sequence. `range()` is memory-efficient because it does not create a list of all numbers in memory; instead, it generates each number on demand (lazy evaluation). This makes `range()` ideal for iterating over very large sequences where creating a list would consume excessive memory. The function can take one, two, or three arguments: `range(stop)`, `range(start, stop)`, and `range(start, stop, step)`. Understanding `range()` is fundamental to controlling iteration in Python, whether you're processing indices, counting occurrences, or generating arithmetic progressions.

## 🧠 Key Concepts

- **`range(stop)`** — Generates numbers from 0 to `stop - 1`
- **`range(start, stop)`** — Generates numbers from `start` to `stop - 1`
- **`range(start, stop, step)`** — Generates numbers from `start` to `stop - 1`, incrementing by `step`
- **Exclusive stop** — The `stop` value is always excluded from the sequence
- **Lazy evaluation** — Numbers are computed one at a time, not stored in memory
- **Immutable** — `range` objects cannot be modified after creation
- **Converting to list** — `list(range(...))` materializes the sequence
- **Negative step** — A negative `step` creates a descending sequence
- **Memory efficiency** — A `range` object always occupies the same memory regardless of size
- **Membership testing** — `in` and `not in` work efficiently (O(1)) on range objects
- **Indexing and slicing** — Range supports `range_obj[i]` and `range_obj[i:j]`
- **`len()` on range** — Returns the number of elements in the sequence

## 💻 Syntax

```python
# range(stop) — single argument
r1 = range(5)      # 0, 1, 2, 3, 4

# range(start, stop) — two arguments
r2 = range(2, 7)   # 2, 3, 4, 5, 6

# range(start, stop, step) — three arguments
r3 = range(1, 10, 2)  # 1, 3, 5, 7, 9

# Negative step (descending)
r4 = range(10, 0, -2)  # 10, 8, 6, 4, 2

# Converting to list
numbers = list(range(5))  # [0, 1, 2, 3, 4]

# Using in a for loop
for i in range(3):
    print(i)  # 0, 1, 2

# Empty range
r5 = range(0)      # empty
r6 = range(5, 2)   # empty (start > stop with positive step)
```

**Line-by-line explanation:**
- `range(5)` — one argument: start defaults to 0, step defaults to 1, stop is 5
- `range(2, 7)` — start=2, stop=7, step=1 (default)
- `range(1, 10, 2)` — start=1, stop=10, step=2 (only odd numbers)
- `range(10, 0, -2)` — start=10, stop=0 (exclusive), step=-2 (counts down)
- `list(range(5))` — materializes the lazy range into an actual list
- `range(5, 2)` — start > stop with positive step produces an empty range
- The range object itself is small in memory (just stores start, stop, step)

## ✅ Example 1 - Basic

**Problem:** Print the first 10 multiples of a given number `n` using `range()`.

**Code:**
```python
n = 7
print(f"First 10 multiples of {n}:")

for i in range(1, 11):
    multiple = n * i
    print(f"{n} x {i} = {multiple}")
```

**Output:**
```
First 10 multiples of 7:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

**Explanation:**
- `range(1, 11)` generates numbers from 1 to 10 (11 is excluded)
- `n * i` computes each multiple of 7
- The `for` loop runs exactly 10 times, once for each value in the range
- The stop value 11 ensures the last iteration uses `i = 10`
- This pattern is commonly used for generating multiplication tables, counting loops, and iterating a fixed number of times

## 🚀 Example 2 - Intermediate

**Problem:** Generate a number pyramid pattern where row `i` contains numbers from `i` down to 1, using `range()` with a negative step. Then sum all numbers in the pyramid.

**Code:**
```python
rows = 5
total_sum = 0

print("Number Pyramid:")
for i in range(1, rows + 1):
    # Generate descending numbers for this row
    row_numbers = list(range(i, 0, -1))
    row_str = " ".join(str(num) for num in row_numbers)
    row_sum = sum(row_numbers)

    total_sum += row_sum
    print(f"Row {i}: {row_str}  (sum: {row_sum})")

print(f"\nTotal sum of all numbers in pyramid: {total_sum}")

# Also demonstrate range efficiency
print(f"\nMemory of range(1, 1000001): {range(1, 1000001)}")
print(f"Memory of list(range(1, 1000001)): {list(range(1, 1000001))}")
```

**Output:**
```
Number Pyramid:
Row 1: 1  (sum: 1)
Row 2: 2 1  (sum: 3)
Row 3: 3 2 1  (sum: 6)
Row 4: 4 3 2 1  (sum: 10)
Row 5: 5 3 2 1  (sum: 11)
```

**Explanation:**
- Outer `for` loop uses `range(1, rows + 1)` to generate row numbers 1 through 5
- Inner `range(i, 0, -1)` creates a descending sequence from `i` down to 1
- `list(range(...))` materializes the range to join into a string
- `sum(row_numbers)` calculates the row total
- `total_sum` accumulates across rows
- The memory comparison shows that `range` is O(1) space while `list` is O(n)

## 🏢 Real World Use Case

**Company: Netflix** — Netflix's content delivery and recommendation systems use `range()` extensively for batch processing. When analyzing viewing history across millions of users, `range()` is used in paginated data pipelines to iterate over chunks of data. For example, `for offset in range(0, total_records, batch_size):` processes data in batches of 10,000 records at a time. This is far more memory-efficient than loading all records at once. The step parameter of `range()` is particularly valuable here — it controls the batch size. Netflix also uses `range()` in A/B testing frameworks to iterate over test variants and in parallel processing to distribute workload across CPU cores by partitioning indices with `range(start, stop, step)`.

**Other uses:** Database pagination in web applications, scientific simulations that iterate over time steps, animation frame generation in game engines, and data sampling in machine learning pipelines.

## 🎯 Interview Questions

**1. What is the time and space complexity of `range(n)` vs `list(range(n))`?**

`range(n)` has O(1) time to create and O(1) space — it only stores `start`, `stop`, and `step`. Accessing an element is O(1). `list(range(n))` has O(n) time and O(n) space because it creates and stores all elements in memory. For large `n`, `range()` is vastly more efficient.

**2. How does `range()` handle negative step values?**

With a negative `step`, `range(start, stop, step)` generates numbers in descending order. The `start` value should be greater than `stop` for a non-empty sequence. Each step subtracts the absolute step value. Example: `range(10, 0, -2)` yields `10, 8, 6, 4, 2`. The sequence stops before reaching `stop`.

**3. What happens if you use `range(5, 2)` or `range(2, 5, -1)`?**

Both produce empty ranges. `range(5, 2)` has `start > stop` with a positive default step (1), so no numbers satisfy the condition. `range(2, 5, -1)` has `start < stop` with a negative step, so no numbers are generated. Python handles this gracefully by returning an empty range, not raising an error.

**4. Can you slice a `range` object?**

Yes. Slicing a `range` returns another `range` object (not a list). For example, `range(10)[2:8:2]` returns `range(2, 8, 2)` which yields `2, 4, 6`. This is efficient because it just returns a new range object recomputed from the slice parameters, without creating intermediate lists.

**5. How do you iterate backwards over a sequence using `range()`?**

Use `range(len(seq) - 1, -1, -1)`. The start is the last index (`len - 1`), stop is `-1` (to include index 0), and step is `-1`. For example: `for i in range(len(lst) - 1, -1, -1): print(lst[i])` iterates from the last element to the first.

## ⚠ Common Errors / Mistakes

**Error 1: Off-by-one — forgetting stop is exclusive**
```python
# BAD — iterates 0-4, misses 5
for i in range(5):
    print(i)  # prints 0,1,2,3,4 not 5

# FIX — include the desired stop value
for i in range(6):  # 0-5
    print(i)
```

**Error 2: Empty range when start > stop (positive step)**
```python
# BAD — produces no output
for i in range(5, 1):
    print(i)  # nothing printed

# FIX — either swap or use negative step
for i in range(1, 5):
    print(i)  # 1,2,3,4
# or
for i in range(5, 0, -1):
    print(i)  # 5,4,3,2,1
```

**Error 3: Using `range` with non-integer arguments**
```python
# BAD — TypeError
for i in range(2.5):  # TypeError: 'float' object cannot be interpreted as an integer
    print(i)

# FIX — convert to int
for i in range(int(2.5)):
    print(i)
```

**Error 4: Trying to modify a range object**
```python
r = range(5)
r[0] = 10  # TypeError: 'range' object does not support item assignment

# FIX — convert to list first
r_list = list(range(5))
r_list[0] = 10  # OK
```

**Error 5: Misunderstanding range length calculation**
```python
# The number of elements is: max(0, (stop - start + step - 1) // step)
# Not simply (stop - start)
print(len(range(2, 10, 3)))  # (10-2)/3 = 2.66 → 3 elements: 2, 5, 8
print(list(range(2, 10, 3)))  # [2, 5, 8]
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program using `range()` to print all even numbers from 2 to 20 (inclusive).
2. Use `range()` with a single argument to calculate the sum of numbers from 0 to 100.
3. Write a script that takes an integer `n` and prints "Hello, World!" exactly `n` times using `range()` in a `for` loop.

**Intermediate:**
4. Generate a Fibonacci sequence up to the 20th term using `range()` to control the iteration count. Store the terms in a list and print it.
5. Write a program that uses `range(start, stop, step)` to generate all odd numbers from 99 down to 1 (descending). Store them in a list and calculate their average.
6. Create a function `progressive_sum(n)` that uses `range()` to build a list where each element at index `i` is the sum of numbers from 0 to `i`.

**Advanced:**
7. Implement a function `prime_sieve(n)` that uses `range()` with a step parameter to implement the Sieve of Eratosthenes. Return a list of all prime numbers up to `n`.
8. Write a program that generates a "spiral matrix" pattern of size `n x n` using nested loops with `range()`. The numbers should spiral inward from 1 to n².
