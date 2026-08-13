## 1. Python Data Types

## 2. 📘 Introduction

Every value in Python has a type — a classification that tells Python what kind of data it is and what operations can be performed on it. Python comes with several built-in data types that cover the most common needs: numbers (integers, floats, complex), text (strings), booleans (True/False), and collection types (lists, tuples, sets, dictionaries). Understanding data types is crucial because they determine what you can do with a value — you can add two numbers but not a number and a string (without conversion). Python's `type()` function lets you check the type of any value at any time. While Python is dynamically typed (you don't declare types), being aware of types helps you avoid errors and write correct code. This section provides a comprehensive overview of Python's built-in data types with practical examples of each.

## 3. 🧠 Key Concepts

- **`type()` function:** Returns the type of any value or variable: `type(42)` → `<class 'int'>`.
- **Immutable vs Mutable:** Immutable types (int, float, str, bool, tuple) cannot be changed after creation. Mutable types (list, set, dict) can be modified.
- **Numeric Types:** `int` (whole numbers), `float` (decimal numbers), `complex` (imaginary numbers).
- **Text Type:** `str` (string) — a sequence of characters enclosed in quotes.
- **Boolean Type:** `bool` — `True` or `False` (used in conditions and logic).
- **Sequence Types:** `list` (ordered, mutable), `tuple` (ordered, immutable), `range`.
- **Set Types:** `set` (unordered, unique items), `frozenset` (immutable set).
- **Mapping Type:** `dict` (key-value pairs, unordered before Python 3.7, ordered from 3.7+).

| Data Type | Class | Mutable? | Example |
|-----------|-------|----------|---------|
| int | `int` | No | `42` |
| float | `float` | No | `3.14` |
| complex | `complex` | No | `2+3j` |
| str | `str` | No | `"Hello"` |
| bool | `bool` | No | `True` |
| list | `list` | Yes | `[1, 2, 3]` |
| tuple | `tuple` | No | `(1, 2, 3)` |
| set | `set` | Yes | `{1, 2, 3}` |
| dict | `dict` | Yes | `{"a": 1}` |

## 4. 💻 Syntax

```python
# Checking data types
print(type(42))           # int
print(type(3.14))         # float
print(type(2 + 3j))       # complex
print(type("Hello"))      # str
print(type(True))         # bool
print(type([1, 2, 3]))    # list
print(type((1, 2, 3)))    # tuple
print(type({1, 2, 3}))    # set
print(type({"a": 1}))     # dict
```

**Output:**
```
<class 'int'>
<class 'float'>
<class 'complex'>
<class 'str'>
<class 'bool'>
<class 'list'>
<class 'tuple'>
<class 'set'>
<class 'dict'>
```

**Explanation:** Each `type()` call returns the class name of the value. All data in Python is an object belonging to a class. The output shows the class hierarchy — e.g., `<class 'int'>` means the value `42` is an instance of the `int` class.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create variables of different types and check their types.

```python
# Variables of different types
name = "Alice"              # str
age = 25                    # int
height = 5.6                # float
is_student = True           # bool
hobbies = ["reading", "cycling"]  # list

# Check and display types
print(f"Value: {name}      -> Type: {type(name)}")
print(f"Value: {age}        -> Type: {type(age)}")
print(f"Value: {height}     -> Type: {type(height)}")
print(f"Value: {is_student} -> Type: {type(is_student)}")
print(f"Value: {hobbies}    -> Type: {type(hobbies)}")
```

**Output:**
```
Value: Alice      -> Type: <class 'str'>
Value: 25        -> Type: <class 'int'>
Value: 5.6     -> Type: <class 'float'>
Value: True -> Type: <class 'bool'>
Value: ['reading', 'cycling']    -> Type: <class 'list'>
```

**Explanation:** Each variable automatically gets its type from the value assigned. `type()` reveals the underlying class. Notice that Python prints `True` and `False` as capitalized words — they are the only two `bool` values.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Demonstrate mutable vs immutable types by attempting to modify a list and a string.

```python
# Mutable: list (can be changed)
fruits = ["apple", "banana", "cherry"]
print("Original list:", fruits)
fruits[0] = "avocado"       # Modify first element
print("Modified list:", fruits)

# Immutable: string (cannot be changed)
message = "Hello"
print("\nOriginal string:", message)
# message[0] = "J"          # This would cause a TypeError!
# Instead, create a new string
new_message = "J" + message[1:]
print("New string:", new_message)

# Demonstrate type checking
print("\nIs 'fruits' a list?", isinstance(fruits, list))
print("Is 'message' a str?", isinstance(message, str))
```

**Output:**
```
Original list: ['apple', 'banana', 'cherry']
Modified list: ['avocado', 'banana', 'cherry']

Original string: Hello
New string: Jello

Is 'fruits' a list? True
Is 'message' a str? True
```

**Explanation:** Lists are mutable — we changed `fruits[0]` from "apple" to "avocado". Strings are immutable — attempting `message[0] = "J"` would raise `TypeError`. To modify a string, create a new one. `isinstance()` checks if a value belongs to a specific type (safer than `type()` in some contexts).

## 7. 🏢 Real World Use Case

**Netflix** uses Python dictionaries extensively to store user profiles, viewing history, and recommendation data. **Spotify** uses lists and dictionaries to manage playlists, songs, and user preferences. In **data science** (at companies like **Airbnb**), Pandas DataFrames (built on NumPy arrays) are the primary data type for analysis. **Uber** uses complex nested data structures — lists of dictionaries — to represent ride data, driver locations, and pricing models. **Google** uses strings for text processing, integers for counters and IDs, floats for calculations, booleans for feature flags, and dicts for JSON API responses. Choosing the right data type is critical for performance — for example, using a set for membership testing (O(1)) vs a list (O(n)).

## 8. 🎯 Interview Questions

**Q1:** What are the built-in data types in Python?
**A:** Numeric (int, float, complex), Text (str), Boolean (bool), Sequence (list, tuple, range), Set (set, frozenset), Mapping (dict), Binary (bytes, bytearray, memoryview).

**Q2:** What is the difference between a list and a tuple?
**A:** Lists are mutable (can be changed) and use `[]`. Tuples are immutable (cannot be changed) and use `()`. Tuples are faster and can be used as dictionary keys.

**Q3:** What is the difference between a list and a set?
**A:** Lists are ordered, allow duplicates, and support indexing. Sets are unordered, have unique elements only, and do not support indexing. Sets are faster for membership testing.

**Q4:** What does the `type()` function do?
**A:** `type()` returns the type (class) of an object. Example: `type("abc")` returns `<class 'str'>`. It's useful for debugging and type checking.

**Q5:** Are strings mutable or immutable in Python?
**A:** Strings are immutable. You cannot change a character in a string — you must create a new string. Example:
```python
s = "hello"
# s[0] = "H"  # TypeError
s = "H" + s[1:]  # Correct: creates new string "Hello"
```

## 9. ⚠ Common Errors / Mistakes

**Error:** `TypeError: 'tuple' object does not support item assignment` — Trying to modify a tuple.
**Fix:** Use a list if you need mutability. If you need a tuple, create a new one instead of modifying.

**Error:** Confusing `==` (value equality) with `is` (identity equality). For mutable types, two lists with same content are `==` but not `is`.
**Fix:** Use `==` to compare values. Use `is` only for `None` checks or singleton comparisons.

**Error:** `TypeError: unhashable type: 'list'` — Trying to use a list as a dictionary key or in a set.
**Fix:** Lists are unhashable (mutable). Use tuples instead: `my_dict = {(1, 2): "value"}`.

## 10. 📝 Practice Exercises

**Beginner:**
1. Create a variable of each type: int, float, str, bool. Print each with its type using `type()`.
2. Create a list of three favourite movies. Print the list and its type.
3. Create a dictionary with keys "name", "age", "city" and appropriate values. Print the dict and its type.

**Intermediate:**
4. Create a tuple of 4 numbers. Try to change the second element and observe the error. Then explain why it failed.
5. Create a set of 5 numbers (with one duplicate) and print it. Observe that duplicates are removed.
6. Write a program that creates a list, converts it to a tuple, then converts it to a set, printing each type.

**Advanced:**
7. Write a program that checks if a value is a string, integer, or float using `isinstance()` and prints a custom message for each type.
8. Create a nested data structure: a dictionary where each key is a student name and the value is a list of their marks in 3 subjects. Print the structure and its type.
