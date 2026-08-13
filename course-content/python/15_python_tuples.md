# 15. Python Tuples

## 📘 Introduction
A **tuple** is an ordered, immutable sequence of elements. Created with parentheses `()` or the `tuple()` constructor, tuples are similar to lists in terms of indexing, slicing, and iteration — but their **immutability** sets them apart. Once created, a tuple's elements cannot be changed, added, or removed. This makes tuples hashable (usable as dictionary keys and set elements) and provides a guarantee that the data remains constant throughout the program. Tuples are often used for fixed collections of related values, such as coordinates `(x, y)`, database records, function return values, and configuration constants. Tuple unpacking allows elegant assignment: `a, b = (1, 2)`. Tuples have only two built-in methods: `count()` and `index()`. Choosing between tuples and lists comes down to whether you need mutability, hashability, or memory efficiency.

## 🧠 Key Concepts

- **Ordered & Immutable**: Elements maintain order but cannot be changed after creation
- **Creating Tuples**: `t = (1, 2, 3)` or `t = 1, 2, 3` (parentheses optional in many contexts). Single-element tuple: `(1,)` — trailing comma is required
- **Indexing & Slicing**: Same syntax as lists. `t[0]`, `t[-1]`, `t[1:3]`
- **Tuple Unpacking**: `a, b, c = (1, 2, 3)` — the number of variables must match the tuple length
- **Tuple Methods**: Only two — `t.count(x)` (counts occurrences) and `t.index(x)` (returns first index)
- **Immutability**: Cannot modify elements, but if a tuple contains a mutable object (like a list), that object can be modified
- **Hashable**: Tuples of hashable elements can be used as dictionary keys and set members
- **Memory Efficiency**: Tuples are more memory-efficient than lists because they don't need over-allocation for future appends
- **Named Tuples**: `collections.namedtuple` creates tuple subclasses with named fields for better readability
- **When to Use Tuples**: Fixed data (coordinates, RGB colors, database rows), dictionary keys, function arguments (`*args`), function return values

## 💻 Syntax

```python
# Creating tuples
empty = ()
single = (5,)            # Note: comma required!
t1 = (1, 2, 3)
t2 = 4, 5, 6             # Parentheses optional
t3 = tuple([1, 2, 3])    # From list
nested = ((1, 2), (3, 4))

# Indexing and slicing
t = (10, 20, 30, 40, 50)
print(t[0])       # 10
print(t[-1])      # 50
print(t[1:4])     # (20, 30, 40)

# Immutability — this will fail:
# t[0] = 99       # TypeError!

# Unpacking
point = (3, 4)
x, y = point       # x=3, y=4
a, *rest = (1, 2, 3, 4)  # a=1, rest=[2, 3, 4] (starred expression)

# Methods
t = (1, 2, 2, 3, 2)
print(t.count(2))    # 3
print(t.index(3))    # 3

# Tuple as dictionary key
locations = {(40.7128, -74.0060): "New York", (34.0522, -118.2437): "Los Angeles"}

# Swapping via tuple unpacking
a, b = 5, 10
a, b = b, a          # a=10, b=5

# Named tuple
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)      # 3 4
```

## ✅ Example 1 - Basic

**Problem**: Write a program that takes two points (as tuples of x, y coordinates) and calculates the Euclidean distance between them.

**Code**:
```python
import math

def distance(p1: tuple, p2: tuple) -> float:
    x1, y1 = p1
    x2, y2 = p2
    return math.sqrt((x2 - x1)**2 + (y2 - y1)**2)

point_a = (0, 0)
point_b = (3, 4)
print(f"Distance: {distance(point_a, point_b)}")
```

**Output**:
```
Distance: 5.0
```

**Explanation**: Tuples are natural for representing coordinates — fixed pairs that shouldn't be modified. Tuple unpacking cleanly extracts x and y values. The function returns a float. This pattern is used in geometry, game development, and GIS applications.

## 🚀 Example 2 - Intermediate

**Problem**: Process a list of student records (each a tuple of name, age, grade) — filter, sort, and extract data.

**Code**:
```python
students = [
    ("Alice", 20, 88),
    ("Bob", 19, 72),
    ("Charlie", 22, 95),
    ("Diana", 21, 83),
]

# Filter: students with grade >= 80
top = [s for s in students if s[2] >= 80]

# Sort by grade descending
top_sorted = sorted(top, key=lambda s: s[2], reverse=True)

# Unpack and format
for name, age, grade in top_sorted:
    print(f"{name} (age {age}): {grade}")

# Extract names only
names = [name for name, _, _ in students]
print(f"All names: {names}")
```

**Output**:
```
Charlie (age 22): 95
Alice (age 20): 88
Diana (age 21): 83
All names: ['Alice', 'Bob', 'Charlie', 'Diana']
```

**Explanation**: Each student record is an immutable tuple — ideal because grades shouldn't change accidentally. List comprehensions filter and extract. `sorted()` with a lambda sorts by grade. Unpacking in the `for` loop makes the code readable. The underscore `_` is used as a placeholder for unused tuple elements.

## 🏢 Real World Use Case

**Company**: Uber / Lyft

**Scenario**: Ride-hailing platforms use tuples extensively for representing GPS coordinates. A location is a `(latitude, longitude)` tuple — immutable and hashable, making it usable as a dictionary key for cached geocoding results. Trip records are tuples like `(pickup, dropoff, distance, fare, driver_id)`. Named tuples (`Ride = namedtuple("Ride", ["pickup", "dropoff", "distance", "fare"])`) provide readable attribute access while maintaining the lightweight nature of tuples. The `*args` parameter (which is a tuple) is used in decorators for logging and metrics collection on API endpoints. Tuple unpacking is used when returning multiple values from ETA calculation functions.

## 🎯 Interview Questions

**1. Why would you use a tuple instead of a list?**
Use tuples when data should not change (immutability guarantee), when you need a hashable object for dictionary keys or sets, when returning multiple values from a function, and when memory efficiency matters. Tuples are also faster for fixed collections due to simpler internals.

**2. Can a tuple contain a mutable object? What happens if it does?**
Yes. A tuple like `(1, [2, 3], 4)` contains a list. The tuple itself remains immutable (you cannot reassign its elements), but the list inside can be modified (e.g., `t[1].append(5)`). The tuple is no longer hashable because it contains mutable elements.

**3. What is tuple unpacking and how does it work with `*`?**
Tuple unpacking assigns elements to variables: `a, b, c = (1, 2, 3)`. The `*` operator captures multiple elements: `first, *middle, last = (1, 2, 3, 4)` assigns `first=1`, `middle=[2, 3]`, `last=4`. This works for any iterable, not just tuples.

**4. How are tuples more memory efficient than lists?**
Lists allocate extra capacity (over-allocation) to support future `append()` operations efficiently, using ~25% more memory than needed for the current elements. Tuples store exactly their content with no over-allocation, making them more memory efficient for fixed-size data.

**5. When would a named tuple be better than a regular tuple?**
Named tuples improve code readability by allowing field access by name (`person.name`) instead of index (`person[0]`). They are ideal for lightweight data containers where you want the immutability of tuples but better self-documenting code, such as database rows, config values, or API responses.

## ⚠ Common Errors / Mistakes

**Error**: Forgetting the comma in a single-element tuple
```python
t = (5)          # int, not tuple!
print(type(t))   # <class 'int'>
```
**Fix**: Add trailing comma: `t = (5,)`

**Error**: Treating tuples as mutable
```python
t = (1, 2, 3)
t[0] = 10        # TypeError: 'tuple' object does not support item assignment
```
**Fix**: If you need mutability, use a list. If you need a new tuple, create one: `t = (10,) + t[1:]`

**Error**: Tuple unpacking with wrong number of variables
```python
a, b = (1, 2, 3)   # ValueError: too many values to unpack
```
**Fix**: Match variable count: `a, b, c = (1, 2, 3)` or use `a, *rest = (1, 2, 3)`

**Error**: Using mutable elements in tuples as dictionary keys
```python
d = {([1, 2],): "value"}   # TypeError: unhashable type: 'list'
```
**Fix**: Ensure all tuple elements are hashable (immutable). Use nested tuples instead of lists.

**Error**: Thinking `tuple.sort()` exists
```python
t = (3, 1, 2)
t.sort()   # AttributeError: 'tuple' object has no attribute 'sort'
```
**Fix**: Use `sorted(t)` which returns a new sorted list: `sorted_tuple = tuple(sorted(t))`

## 📝 Practice Exercises

**Beginner:**

1. Create a tuple `(10, 20, 30, 40, 50)` and print the first, last, and the third element.
2. Given a tuple of 5 numbers, unpack all values into individual variables and print them.
3. Write a program that takes two tuples of equal length and creates a new tuple where each element is the sum of the corresponding elements.

**Intermediate:**

4. Write a function `tuple_stats(t)` that takes a tuple of numbers and returns a tuple containing (min, max, sum, average).
5. Given a list of tuples `[(1, 'a'), (2, 'b'), (1, 'c'), (2, 'd')]`, group them by the first element into a dictionary.
6. Write a function `swap_tuple(t, i, j)` that returns a new tuple with the elements at indices `i` and `j` swapped (without converting to a list).

**Advanced:**

7. Implement a function `unique_tuples(tuples)` that takes a list of tuples and returns a new list with duplicate tuples removed while preserving order.
8. Write a recursive function `deep_flatten_tuple(t)` that flattens nested tuples into a single flat tuple (e.g., `(1, (2, 3), (4, (5, 6)))` → `(1, 2, 3, 4, 5, 6)`).
