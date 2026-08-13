# 14. Python Lists

## 📘 Introduction
Lists are the most versatile and widely used data structure in Python. They are **ordered**, **mutable** sequences that can hold items of any data type — integers, strings, floats, other lists, or any object. Lists are created with square brackets `[]` or the `list()` constructor, and their elements are separated by commas. Python lists support zero-based indexing, negative indexing (from the end), and slicing (`[start:stop:step]`) to extract portions. Being mutable, lists allow item assignment, appending (`append()`), inserting (`insert()`), removing (`remove()`, `pop()`), sorting (`sort()`), and reversing (`reverse()`). List comprehensions provide a concise, readable way to create lists from existing iterables with optional filtering. Nested lists (lists within lists) are commonly used to represent matrices, grids, and hierarchical data.

## 🧠 Key Concepts

- **Ordered & Mutable**: Items maintain insertion order; elements can be changed, added, or removed
- **Heterogeneous**: Can store mixed types: `[1, "hello", 3.14, True]`
- **Indexing**: `lst[0]` first element, `lst[-1]` last element. Out-of-range raises `IndexError`
- **Slicing**: `lst[start:stop:step]` returns a new list. All parameters optional
- **Modifying Items**: `lst[i] = value` changes element at index `i`
- **Common Methods**: `append(x)` — add to end; `insert(i, x)` — insert at index; `remove(x)` — remove first occurrence; `pop(i)` — remove and return; `sort()` — in-place sort; `reverse()` — in-place reverse; `clear()` — empty the list; `copy()` — shallow copy
- **List Comprehensions**: `[expr for item in iterable if condition]` — concise, Pythonic
- **Nested Lists**: Lists as elements. Access via: `matrix[row][col]`
- **Concatenation & Repetition**: `+` joins two lists; `*` repeats a list: `[1, 2] * 3` → `[1, 2, 1, 2, 1, 2]`
- **Length**: `len(lst)` returns number of elements

## 💻 Syntax

```python
# Creating lists
empty = []
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
nested = [[1, 2], [3, 4], [5, 6]]
from_range = list(range(5))        # [0, 1, 2, 3, 4]

# Indexing and slicing
lst = [10, 20, 30, 40, 50]
print(lst[0])       # 10
print(lst[-1])      # 50
print(lst[1:4])     # [20, 30, 40]
print(lst[::2])     # [10, 30, 50]
print(lst[::-1])    # [50, 40, 30, 20, 10]

# Modifying
lst[0] = 99
lst.append(60)
lst.insert(1, 15)
lst.remove(30)
popped = lst.pop()

# Sorting and reversing
nums = [3, 1, 4, 1, 5]
nums.sort()            # [1, 1, 3, 4, 5]
nums.sort(reverse=True) # [5, 4, 3, 1, 1]
nums.reverse()         # reverse current order

# List comprehensions
squares = [x**2 for x in range(5)]               # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]      # [0, 2, 4, 6, 8]
matrix = [[i+j for j in range(3)] for i in range(3)]  # nested comprehension
```

## ✅ Example 1 - Basic

**Problem**: Write a program that takes a list of numbers and returns a new list with each number doubled, but only if the original number was positive.

**Code**:
```python
numbers = [10, -5, 3, 0, -1, 8]
doubled_positives = [n * 2 for n in numbers if n > 0]
print(f"Original: {numbers}")
print(f"Doubled positives: {doubled_positives}")
```

**Output**:
```
Original: [10, -5, 3, 0, -1, 8]
Doubled positives: [20, 6, 16]
```

**Explanation**: A list comprehension iterates over `numbers`, filters with `if n > 0`, and transforms each surviving element with `n * 2`. This is the idiomatic Python approach — equivalent to a `for` loop with an `if` condition and `append()`.

## 🚀 Example 2 - Intermediate

**Problem**: Given a list of student scores (0-100), calculate the average, highest, lowest, and assign letter grades.

**Code**:
```python
scores = [88, 72, 95, 63, 100, 78, 84]

def grade(score):
    if score >= 90: return "A"
    elif score >= 80: return "B"
    elif score >= 70: return "C"
    elif score >= 60: return "D"
    else: return "F"

average = sum(scores) / len(scores)
highest = max(scores)
lowest = min(scores)
graded = [(s, grade(s)) for s in scores]

print(f"Average: {average:.1f}")
print(f"Highest: {highest}, Lowest: {lowest}")
print("Grades:")
for score, g in graded:
    print(f"  {score} -> {g}")

# Top 3 scores (sorted descending)
top3 = sorted(scores, reverse=True)[:3]
print(f"Top 3: {top3}")
```

**Output**:
```
Average: 82.9
Highest: 100, Lowest: 63
Grades:
  88 -> B
  72 -> C
  95 -> A
  63 -> D
  100 -> A
  78 -> C
  84 -> B
Top 3: [100, 95, 88]
```

**Explanation**: Built-in functions `sum()`, `len()`, `max()`, `min()` operate on lists. A list comprehension with `sorted()` and slicing extracts the top 3 scores. The grade conversion uses a separate function for clarity — this pattern is common in reporting systems.

## 🏢 Real World Use Case

**Company**: Spotify

**Scenario**: Spotify uses lists extensively to manage user playlists. A playlist is a list of track objects (dictionaries) with metadata (title, artist, duration, URI). The playlist is sorted by `sort()` with a custom key, filtered using list comprehensions (e.g., "show only songs by a certain artist"), and sliced for pagination. Nested lists represent album tracklists. `append()` adds new songs, `remove()` deletes them, and `pop()` is used for undo functionality. List comprehensions generate recommendations by iterating over listening history and filtering songs that match certain audio features. The shuffle algorithm uses `random.shuffle()` on a copy of the playlist.

## 🎯 Interview Questions

**1. What is the difference between `list.append()` and `list.extend()`?**
`append(x)` adds `x` as a single element, even if `x` is a list (resulting in a nested list). `extend(iterable)` adds each element of the iterable individually to the list. Example: `[1].append([2,3])` → `[1, [2,3]]`; `[1].extend([2,3])` → `[1, 2, 3]`.

**2. How does list slicing handle out-of-range indices?**
Slicing is forgiving: if `start` or `stop` is beyond the list bounds, Python adjusts to the nearest valid index. `[1, 2, 3][10:20]` returns `[]` (empty list). This makes slicing safe for many use cases where indexing would raise an error.

**3. Explain the difference between `list.sort()` and `sorted(list)`.**
`list.sort()` sorts the list **in-place** and returns `None`. `sorted(list)` returns a **new sorted list** and leaves the original unchanged. Use `sort()` when you don't need to preserve the original order; use `sorted()` when you do.

**4. How are lists implemented internally in CPython?**
Lists are implemented as dynamic arrays (over-allocated arrays of PyObject pointers). When the array is full, Python allocates a larger array (roughly 1.125x the new size) and copies elements over, giving amortized O(1) append operations. Indexing is O(1), but `insert`/`remove` are O(n).

**5. What is the output of `[[0]*3 for _ in range(3)]` vs `[[0]*3]*3`?**
`[[0]*3 for _ in range(3)]` creates three **independent** inner lists: `[[0,0,0],[0,0,0],[0,0,0]]`. `[[0]*3]*3` creates one list and makes three **references** to it — modifying one row affects all rows because they are the same object.

## ⚠ Common Errors / Mistakes

**Error**: Unintended list sharing with `*` repetition
```python
row = [0] * 3
matrix = [row] * 3
matrix[0][0] = 1   # [[1,0,0],[1,0,0],[1,0,0]] — all rows changed!
```
**Fix**: Use a list comprehension: `matrix = [[0]*3 for _ in range(3)]`

**Error**: `IndexError: list index out of range`
```python
lst = [1, 2, 3]
print(lst[5])   # Error!
```
**Fix**: Check length: `if len(lst) > 5: print(lst[5])`

**Error**: Modifying a list while iterating over it
```python
nums = [1, 2, 3, 4]
for n in nums:
    if n % 2 == 0:
        nums.remove(n)   # Skips elements, produces wrong result
```
**Fix**: Iterate over a copy: `for n in nums[:]:` or use a list comprehension.

**Error**: Confusing `sort()` returning `None`
```python
nums = [3, 1, 2]
sorted_nums = nums.sort()   # sorted_nums is None!
```
**Fix**: Use `sorted_nums = sorted(nums)` or call `nums.sort()` then use `nums`.

**Error**: Using `list` as a variable name
```python
list = [1, 2, 3]
another = list([4, 5])   # TypeError: 'list' object is not callable
```
**Fix**: Never name variables `list`, `dict`, `str`, etc.

## 📝 Practice Exercises

**Beginner:**

1. Create a list of 5 numbers, append a new number, insert one at position 2, remove the last element, and print the final list.
2. Write a program that takes a list of names and prints them in reverse order.
3. Given a list of integers, create a new list containing only the elements at even indices.

**Intermediate:**

4. Write a function `merge_sorted(lst1, lst2)` that merges two sorted lists into one sorted list without using `sort()` or `sorted()`.
5. Given a list of words, group them by their first letter into a list of lists using a dictionary.
6. Write a function `flatten(nested)` that flattens a list of lists one level deep using a list comprehension.

**Advanced:**

7. Implement a function `rotate(matrix)` that rotates an n×n matrix (list of lists) 90 degrees clockwise in-place.
8. Write a function `list_intersection(a, b)` that returns a list of common elements between two lists, preserving the order of their first appearance in `a`, without duplicates.
