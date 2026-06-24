# 17. Python Dictionaries

## 📘 Introduction
A **dictionary** is Python's built-in mapping type, storing data as **key-value pairs**. Keys must be unique and hashable (immutable), while values can be any Python object. Dictionaries are **ordered** as of Python 3.7 (insertion order is preserved), **mutable**, and optimized for fast key lookup (O(1) average). Created with curly braces `{"key": "value"}` or the `dict()` constructor, dictionaries are everywhere in Python — they power object attributes, JSON serialization, keyword arguments, and more. Key methods include `keys()`, `values()`, `items()` for iteration, `get()` for safe access with defaults, `update()` for merging, and `pop()` for removal. Dictionary comprehensions (`{k: v for k, v in iterable}`) provide concise construction. Nested dictionaries allow representing complex hierarchical data like JSON structures.

## 🧠 Key Concepts

- **Key-Value Pairs**: Each key maps to exactly one value. Keys must be unique
- **Hashable Keys**: Keys must be immutable (strings, numbers, tuples with immutable elements). Lists and dicts cannot be keys
- **Ordered** (Python 3.7+): Dictionaries preserve insertion order. Order is guaranteed
- **Creating Dictionaries**: `d = {"name": "Alice", "age": 30}`, `d = dict(name="Alice", age=30)`, `d = dict([("name", "Alice"), ("age", 30)])`
- **Accessing Values**: `d["key"]` — raises `KeyError` if missing. `d.get("key", default)` — returns default instead of error
- **Modifying**: `d["key"] = value` (adds or updates), `d.update({"k": "v"})` (merge), `d.setdefault("k", "v")` (set only if missing)
- **Removing**: `del d["key"]`, `d.pop("key")` (returns value), `d.popitem()` (removes last inserted), `d.clear()`
- **Iteration**: `d.keys()` (view of keys), `d.values()` (view of values), `d.items()` (view of key-value tuples)
- **Dict Comprehensions**: `{x: x**2 for x in range(5)}` → `{0:0, 1:1, 2:4, 3:9, 4:16}`
- **Nested Dicts**: `d = {"user": {"name": "Alice", "scores": [85, 92]}}` — access via `d["user"]["name"]`
- **Membership**: `"key" in d` checks if key exists (O(1))

## 💻 Syntax

```python
# Creating dictionaries
empty = {}
d1 = {"name": "Alice", "age": 30}
d2 = dict(name="Bob", age=25)
d3 = dict([("x", 1), ("y", 2)])
d4 = {}.fromkeys(["a", "b", "c"], 0)   # {'a': 0, 'b': 0, 'c': 0}

# Accessing
person = {"name": "Alice", "age": 30}
print(person["name"])          # Alice
print(person.get("age"))       # 30
print(person.get("city", "Unknown"))  # Unknown (safe access)
# print(person["city"])        # KeyError!

# Modifying
person["age"] = 31             # Update
person["city"] = "NYC"         # Add new key
person.update({"age": 32, "job": "Engineer"})

# Removing
del person["city"]
name = person.pop("name")      # Returns "Alice"
last = person.popitem()        # Removes & returns last inserted

# Iteration
d = {"a": 1, "b": 2, "c": 3}
for k, v in d.items():
    print(k, v)

# Dict comprehension
squares = {x: x**2 for x in range(5)}        # {0:0, 1:1, 2:4, 3:9, 4:16}
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}

# Nested dict
users = {
    "alice": {"age": 30, "role": "admin"},
    "bob": {"age": 25, "role": "user"}
}
print(users["alice"]["role"])   # admin
```

## ✅ Example 1 - Basic

**Problem**: Count the frequency of each word in a sentence using a dictionary.

**Code**:
```python
sentence = "the cat and the dog and the bird"
freq = {}

for word in sentence.split():
    freq[word] = freq.get(word, 0) + 1

print(freq)
```

**Output**:
```
{'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}
```

**Explanation**: `freq.get(word, 0)` returns the current count (or 0 if the word isn't in the dict yet), then increments by 1 and reassigns. This is a common counter pattern. Alternatively, `collections.Counter` provides this functionality with additional convenience methods.

## 🚀 Example 2 - Intermediate

**Problem**: Merge two lists — one of student names, one of scores — into a dictionary. Then compute class statistics and grade distribution.

**Code**:
```python
names = ["Alice", "Bob", "Charlie", "Diana"]
scores_list = [88, 72, 95, 83]

# Create dictionary from two lists
students = dict(zip(names, scores_list))

# Statistics
average = sum(students.values()) / len(students)
top_student = max(students, key=students.get)
lowest_student = min(students, key=students.get)

# Grade distribution
grades = {"A": 0, "B": 0, "C": 0, "D": 0, "F": 0}
for score in students.values():
    if score >= 90: grades["A"] += 1
    elif score >= 80: grades["B"] += 1
    elif score >= 70: grades["C"] += 1
    elif score >= 60: grades["D"] += 1
    else: grades["F"] += 1

print(f"Average: {average:.1f}")
print(f"Top: {top_student} ({students[top_student]})")
print(f"Lowest: {lowest_student} ({students[lowest_student]})")
print(f"Grades: {grades}")

# Filter: students who scored >= 80
high_achievers = {name: score for name, score in students.items() if score >= 80}
print(f"High achievers: {high_achievers}")
```

**Output**:
```
Average: 84.5
Top: Charlie (95)
Lowest: Bob (72)
Grades: {'A': 1, 'B': 2, 'C': 1, 'D': 0, 'F': 0}
High achievers: {'Alice': 88, 'Charlie': 95, 'Diana': 83}
```

**Explanation**: `zip()` pairs names and scores, `dict()` converts to a dict. `max(students, key=students.get)` finds the key with the maximum value. A dict comprehension filters by condition. The grades dict uses keys for grade categories.

## 🏢 Real World Use Case

**Company**: Amazon

**Scenario**: Amazon's product catalog is built on nested dictionaries representing the product taxonomy. A product dictionary contains keys like `product_id`, `title`, `price`, `categories` (list), `specifications` (nested dict), `reviews` (list of dicts). Product lookup uses dict O(1) access by `SKU`. The shopping cart is a dict mapping `product_id` to `quantity`. Session data is stored as a dict with user preferences, recent views, and cart contents. `d.get()` provides safe defaults when a key is missing (e.g., `user.get("promo_code", "")`). Dict comprehensions filter products by price range. `update()` merges incoming inventory updates with existing stock. The recommendation engine uses nested dicts mapping `user_id → {product_id → score}`.

## 🎯 Interview Questions

**1. What is the difference between `dict.get(key)` and `dict[key]`?**
`dict[key]` raises a `KeyError` if the key does not exist. `dict.get(key)` returns `None` (or a provided default value) if the key is missing. Use `[key]` when you know the key exists; use `.get()` for safe access.

**2. How are dictionaries implemented in Python?**
Dictionaries are implemented as hash tables (specifically, a compact sparse table with an index array and a separate entries array). The hash of the key determines its position. On collision, Python uses open addressing with quadratic probing. Starting in Python 3.6 (CPython), dictionaries preserve insertion order using a compact array layout.

**3. What is the difference between `dict.items()` and `dict.iteritems()`?**
`dict.iteritems()` existed in Python 2 and returned an iterator. In Python 3, `dict.items()` returns a **view object** that dynamically reflects changes to the dictionary. It is memory efficient and supports set-like operations (`&`, `|`, `-`). There is no `iteritems()` in Python 3.

**4. Can you use a tuple as a dictionary key?**
Yes, if the tuple contains only hashable (immutable) elements. `{(1, 2): "point"}` is valid. If the tuple contains mutable elements like a list, it raises `TypeError: unhashable type`.

**5. What is a defaultdict and when would you use it?**
`collections.defaultdict` is a dict subclass that calls a factory function to provide default values for missing keys. Example: `d = defaultdict(list)` — accessing `d["new_key"]` automatically creates an empty list. Use it to avoid explicit key existence checks, especially when building collections like grouping items.

## ⚠ Common Errors / Mistakes

**Error**: `KeyError` when accessing missing keys
```python
d = {"a": 1}
print(d["b"])   # KeyError: 'b'
```
**Fix**: Use `d.get("b", default)` or check with `if "b" in d:`

**Error**: Using mutable objects as keys
```python
d = {[1, 2]: "value"}   # TypeError: unhashable type: 'list'
```
**Fix**: Use tuples: `{(1, 2): "value"}`

**Error**: Modifying dictionary size during iteration
```python
d = {"a": 1, "b": 2, "c": 3}
for k in d:
    if k == "b":
        del d[k]          # RuntimeError: dictionary changed size during iteration
```
**Fix**: Iterate over a copy: `for k in list(d):`

**Error**: Assuming dictionary order before Python 3.7
```python
# In Python < 3.7, order was NOT guaranteed
```
**Fix**: If you need guaranteed order on older Python, use `collections.OrderedDict`.

**Error**: Confusing `=` with `==` in dict comprehensions
```python
{x = x**2 for x in range(5)}   # SyntaxError
```
**Fix**: Use `:` not `=`: `{x: x**2 for x in range(5)}`

## 📝 Practice Exercises

**Beginner:**

1. Create a dictionary of 3 people's names and their ages. Print each person's name and age using a loop.
2. Write a program that takes a word and counts how many times each letter appears using a dictionary.
3. Given a dictionary of product prices, find and print the name of the most expensive product.

**Intermediate:**

4. Write a function `invert_dict(d)` that returns a new dictionary swapping keys and values (assume values are unique).
5. Given two dictionaries, merge them. If a key exists in both, sum their values.
6. Write a function `group_by_length(words)` that takes a list of words and returns a dictionary mapping word length to a list of words of that length.

**Advanced:**

7. Write a function `deep_get(d, keys)` that safely retrieves a value from a nested dictionary given a list of keys (e.g., `deep_get({"a": {"b": 1}}, ["a", "b"])` returns `1`). If any key is missing, return `None`.
8. Implement an LRU (Least Recently Used) cache using a dictionary and handle eviction when the cache exceeds a maximum size.
