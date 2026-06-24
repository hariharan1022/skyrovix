## 21. Python For Loops

## 📘 Introduction
A `for` loop in Python is used to iterate over a sequence (such as a list, tuple, dictionary, set, or string) or any iterable object. Unlike many other languages where `for` loops rely on an index variable, Python's `for` loop works like a "for-each" loop — it goes through each item in the collection one by one. This makes the syntax cleaner and less error-prone. The `for` loop is a foundational control structure that you will use constantly in Python programming, from simple data processing to complex algorithmic implementations. It works hand-in-hand with the `range()` function when you need to repeat an action a specific number of times or iterate over numeric sequences. Understanding `for` loops deeply is essential for writing efficient and readable Python code.

## 🧠 Key Concepts

- **Iteration** – The process of traversing through each element of a sequence or iterable
- **`range()` function** – Generates a sequence of numbers: `range(stop)`, `range(start, stop)`, `range(start, stop, step)`
- **Iterating over lists/tuples** – Directly looping through elements without needing an index
- **Iterating over dictionaries** – Using `.keys()`, `.values()`, or `.items()` to access keys, values, or both
- **Iterating over strings** – Characters are yielded one at a time
- **Iterating over sets** – Unordered iteration, each element appears once
- **`enumerate()`** – Returns both index and value during iteration
- **`zip()`** – Pairs elements from multiple iterables for parallel iteration
- **Nested for loops** – Loops inside loops for multi-dimensional data
- **`else` clause** – Executes when the loop completes normally (no `break`)
- **`break`** – Exits the loop immediately
- **`continue`** – Skips the rest of the current iteration and moves to the next
- **`pass`** – Does nothing; acts as a placeholder

## 💻 Syntax

```python
# Basic for loop syntax
for item in iterable:
    # code block to execute for each item
    print(item)

# With range
for i in range(5):
    # i takes values 0, 1, 2, 3, 4
    print(i)

# With enumerate
for index, value in enumerate(iterable):
    # index is the position, value is the element
    print(f"Index {index}: {value}")

# With zip
for a, b in zip(iterable1, iterable2):
    # pairs corresponding elements from both iterables
    print(a, b)

# With else clause
for item in iterable:
    # do something
    pass
else:
    # runs only if no break occurred
    print("Loop completed without break")

# Nested loops
for outer in outer_iterable:
    for inner in outer:
        # process each inner element
        pass
```

**Line-by-line explanation:**
- `for item in iterable:` — assigns each element from `iterable` to `item` one at a time
- `range(5)` — generates numbers `0, 1, 2, 3, 4` (stop value is exclusive)
- `enumerate(iterable)` — returns `(index, value)` tuples for each element
- `zip(iterable1, iterable2)` — aggregates elements from multiple iterables into tuples
- `else:` — attached to the `for`; fires after loop ends naturally
- Nested loops — inner loop runs fully for each iteration of the outer loop

## ✅ Example 1 - Basic

**Problem:** Calculate the total price of items in a shopping cart given their individual prices.

**Code:**
```python
prices = [12.99, 5.49, 23.00, 8.75, 3.99]
total = 0.0

for price in prices:
    total += price

print(f"Total price: ${total:.2f}")
```

**Output:**
```
Total price: $54.22
```

**Explanation:**
- `prices` is a list of 5 float values representing item costs
- The `for` loop iterates over each `price` element
- Each price is added to the accumulator `total` using `+=`
- After the loop, the formatted total is printed with two decimal places
- This pattern — accumulating values in a loop — is extremely common

## 🚀 Example 2 - Intermediate

**Problem:** Given a dictionary of student names and their test scores, determine each student's grade letter and list students who failed (score < 40). Use `enumerate()` and `zip()` to compare two parallel lists.

**Code:**
```python
students = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
scores = [85, 92, 38, 74, 55]

print("=== Student Grades ===")
for i, (student, score) in enumerate(zip(students, scores)):
    if score >= 90:
        grade = "A"
    elif score >= 75:
        grade = "B"
    elif score >= 50:
        grade = "C"
    else:
        grade = "F"

    print(f"{i+1}. {student}: {score} -> {grade}")

print("\n=== Failed Students (Score < 40) ===")
for student, score in zip(students, scores):
    if score < 40:
        print(f"{student} scored {score} - FAILED")
        break
else:
    print("No students failed!")
```

**Output:**
```
=== Student Grades ===
1. Alice: 85 -> B
2. Bob: 92 -> A
3. Charlie: 38 -> F
4. Diana: 74 -> C
5. Eve: 55 -> C

=== Failed Students (Score < 40) ===
Charlie scored 38 - FAILED
```

**Explanation:**
- `zip(students, scores)` pairs each student name with their score
- `enumerate()` adds a 0-based index, converted to 1-based with `i+1`
- The `if-elif-else` chain determines the letter grade based on threshold
- The second `for` loop uses a `break` when it finds the first failing student
- Because `break` was triggered, the `else` block does NOT execute
- If all students had passed, the `else` would print "No students failed!"

## 🏢 Real World Use Case

**Company: Amazon** — In Amazon's recommendation engine, `for` loops with `zip()` and `enumerate()` are used to iterate over user purchase histories and product catalogs simultaneously. For example, when generating "Customers who bought this also bought" recommendations, the system loops through millions of transactions, pairing `user_id` lists with `product_id` lists using `zip()`. The `enumerate()` function tracks positions for ranking and scoring. Nested `for` loops process multi-dimensional matrices of user-item interactions. The `break` statement optimises performance by stopping search once top-N recommendations are found. The `else` clause on loops is used in inventory checks — if no matching product is found after scanning the entire catalog, the `else` block triggers a fallback recommendation.

**Other uses:** Data analysts iterate over CSV rows, web scrapers loop through HTML elements, game developers update entity positions in nested loops, and DevOps engineers process log files line by line.

## 🎯 Interview Questions

**1. What is the difference between `break`, `continue`, and `pass` in a `for` loop?**

`break` terminates the entire loop immediately, and execution continues with the first statement after the loop. `continue` skips the remaining code in the current iteration and jumps to the next iteration. `pass` does nothing — it is a null operation used as a placeholder where syntax requires a statement but you don't want any action.

**2. How does the `else` clause work with a `for` loop in Python?**

The `else` clause executes when the loop finishes normally (i.e., it was not terminated by a `break` statement). If the loop exits because of a `break`, the `else` block is skipped. This is useful for search operations — if you search through a list and don't find a match, the `else` block can execute fallback logic.

**3. What is the output of `for i in range(5, 0, -1): print(i)` and why?**

Output: `5, 4, 3, 2, 1`. The `range(start, stop, step)` generates numbers starting at 5, stepping down by -1 each time, stopping before 0 (exclusive). Since the step is negative, the sequence decreases. The stop value 0 is not included.

**4. How do you iterate over a dictionary while accessing both keys and values?**

Use the `.items()` method: `for key, value in my_dict.items():`. This returns key-value pairs as tuples which can be unpacked directly. Alternatively, iterate over `.keys()` or `.values()` if you only need one side. For index tracking, combine with `enumerate()`: `for i, (k, v) in enumerate(my_dict.items()):`.

**5. What happens if you modify a list while iterating over it with a `for` loop?**

Modifying a list during iteration can lead to unexpected behavior (skipping elements, index errors, or infinite loops). For example, removing items while iterating forward causes subsequent items to shift positions, so some elements are skipped. The safe approach is to iterate over a copy (`for item in list[:]:`) or collect items to remove in a separate list and remove them after the loop.

## ⚠ Common Errors / Mistakes

**Error 1: Modifying a list while iterating**
```python
# BAD — skips elements
numbers = [1, 2, 3, 4, 5]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)  # list shifts, skips next element
print(numbers)  # Output: [1, 3, 5] — but 4 is also missing!

# FIX — iterate over a copy
numbers = [1, 2, 3, 4, 5]
for n in numbers[:]:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # Output: [1, 3, 5]
```

**Error 2: Forgetting that `range(stop)` is exclusive**
```python
# BAD — off-by-one error
for i in range(10):  # only goes 0-9
    print(i)         # never prints 10

# FIX — use correct upper bound
for i in range(11):  # goes 0-10
    print(i)
```

**Error 3: Assuming dictionary iteration order (pre-3.7)**
```python
# Before Python 3.7, dict order was not guaranteed
# BAD — relying on insertion order in older versions
data = {"a": 1, "b": 2, "c": 3}
for k in data:
    print(k)  # order could be anything in Python < 3.7

# Python 3.7+ guarantees insertion order is preserved
```

**Error 4: Using `break` outside a loop**
```python
# BAD — syntax error
if True:
    break  # SyntaxError: 'break' outside loop

# FIX — only use break inside for or while loops
```

**Error 5: Infinite loop with `for` (not common but possible with generators)**
```python
# BAD — infinite iteration
def infinite_gen():
    while True:
        yield 1

# for val in infinite_gen():  # runs forever!
#     print(val)

# FIX — always have a stopping condition or limit
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program that takes a list of 10 integers from the user and prints only the even numbers using a `for` loop.
2. Create a script that calculates the factorial of a given number `n` using a `for` loop with `range()`.
3. Write a program that iterates over a string and counts how many vowels (a, e, i, o, u) it contains.

**Intermediate:**
4. Given two lists of equal length (`names` and `ages`), use `zip()` to print "Name is X years old" for each pair, and use `enumerate()` to number the output starting from 1.
5. Create a nested `for` loop to print a multiplication table (1 to 10) in a grid format.
6. Write a function that takes a list of numbers and returns a new list with duplicates removed, using a `for` loop and without using `set()`.

**Advanced:**
7. Given a nested list representing a 3x3 Tic-Tac-Toe board (with 'X', 'O', or ''), write a program using nested `for` loops and `enumerate()` to determine if there is a winner (3 in a row, column, or diagonal) and print who won.
8. Implement a simple text-based "word search" solver: given a 2D grid of letters and a target word, use nested `for` loops with `break`/`else` to determine if the word exists horizontally (left-to-right) in any row.
