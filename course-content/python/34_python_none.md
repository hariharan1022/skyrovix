# 34. Python None

## 📘 Introduction

`None` is Python's unique null value, representing the absence of a value. It is the sole member of the `NoneType` type and serves as Python's way of saying "nothing here." Unlike empty values like `""` (empty string), `0` (zero), or `[]` (empty list), `None` specifically indicates that no value exists or that a variable has not been assigned a meaningful value. Functions that don't explicitly return a value return `None` by default. `None` is commonly used as a default parameter value for functions, as a sentinel value to indicate "no result" or "not found," and in conditional checks. Understanding the distinction between `None` and other falsy values is crucial for writing correct Python code. `None` is a singleton — there is only ever one instance of `None` in a Python process, which is why identity checks (`is None`) are preferred over equality checks (`== None`).

## 🧠 Key Concepts

- **NoneType**: The type of `None`; only one instance (`None`) of this type exists in a Python session
- **Default return**: Every function returns `None` if no `return` statement is executed
- **Singleton**: `None` is a singleton — `None is None` is always `True`; use `is` for comparison
- **Falsy but distinct**: `None` is falsy in boolean contexts, but it is not the same as `False`, `0`, `""`, or `[]`
- **Default parameter**: Commonly used as a mutable default parameter placeholder to avoid the mutable-default-argument gotcha
- **Sentinel value**: Used to signal "no result," "not found," or "not applicable" in search and lookup operations

| Value | Type | Boolean | Identity |
|-------|------|---------|----------|
| `None` | `NoneType` | `False` | Singleton |
| `0` | `int` | `False` | Numeric zero |
| `""` | `str` | `False` | Empty string |
| `[]` | `list` | `False` | Empty list |
| `False` | `bool` | `False` | Boolean false |

## 💻 Syntax

```python
# Assigning None
value = None

# Checking for None (use 'is', not '==')
if value is None:
    print("Value is None")

if value is not None:
    print("Value is not None")

# None as default return
def greet(name):
    print(f"Hello, {name}!")
    # No return statement — returns None

result = greet("Alice")
print(result)  # None

# None as default parameter (avoiding mutable default trap)
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

# Sentinel value pattern
def find_user(user_id):
    # Returns User object or None if not found
    if user_id not in database:
        return None
    return database[user_id]
```

Line-by-line explanation:
- `value = None` — assigns the None singleton to a variable
- `if value is None:` — the correct way to test for None (identity check, not equality)
- `if value is not None:` — idiomatic way to check for a non-None value
- `def greet(name):` — function with no `return` statement; calling it produces `None`
- `def add_item(item, items=None):` — using `None` as default to avoid the mutable default argument problem (shared list across calls)
- `if items is None: items = []` — creates a new list each call only when None (the default)
- `return None` — explicitly returns None to indicate "not found"

## ✅ Example 1 - Basic: Default Return Value

**Problem**: Create a function that prints a message but does not return anything. Verify that the function call evaluates to `None`. Also demonstrate the difference between `None` and empty string.

**Code**:
```python
def show_warning(message):
    print(f"⚠ WARNING: {message}")
    # No return statement

result = show_warning("Low disk space")
print(f"Return value: {result}")
print(f"Is None? {result is None}")
print(f"Type: {type(result)}")

# None vs empty values
none_val = None
empty_str = ""
zero = 0
empty_list = []

print(f"\nNone == '': {none_val == empty_str}")
print(f"None == 0: {none_val == zero}")
print(f"None == []: {none_val == empty_list}")
print(f"bool(None): {bool(none_val)}")
print(f"bool(''): {bool(empty_str)}")
```

**Output**:
```
⚠ WARNING: Low disk space
Return value: None
Is None? True
Type: <class 'NoneType'>

None == '': False
None == 0: False
None == []: False
bool(None): False
```
-
**Explanation**: The function `show_warning()` prints a message but has no `return` statement, so Python implicitly returns `None`. The output confirms `result is None` is `True` and `type(result)` is `<class 'NoneType'>`. The comparisons show that `None` is not equal to `""`, `0`, or `[]`, even though all are falsy in boolean context (`bool(None)` is `False`). This illustrates the key distinction: `None` means "no value" while `""` means "empty string value." Always use `is None` to test for None, not `==`.

## 🚀 Example 2 - Intermediate: Cache Lookup with None Sentinel

**Problem**: Implement a simple cache system that returns cached results or computes them on demand. Use `None` as a sentinel to distinguish between "not yet cached" and a cached value that might be falsy.

**Code**:
```python
def expensive_computation(n):
    print(f"Computing for {n}...")
    return n * n

class Cache:
    def __init__(self):
        self._store = {}

    def get(self, key):
        result = self._store.get(key)  # Returns None if key missing
        if result is None:
            # Check if key actually exists (might be cached as explicit None)
            if key in self._store:
                return result  # Explicitly cached None is valid
            return None  # Key not in cache
        return result

    def set(self, key, value):
        self._store[key] = value

cache = Cache()

# Lookup with computation on miss
key = 5
result = cache.get(key)
if result is None and key not in cache._store:  # True miss
    result = expensive_computation(key)
    cache.set(key, result)

print(f"Cached result: {cache.get(5)}")

# Demonstrate caching — second call does not recompute
print(f"Second call: {cache.get(5)}")
```

**Output**:
```
Computing for 5...
Cached result: 25
Second call: 25
```

**Explanation**: The `Cache.get()` method uses `None` as a sentinel to mean "key not found." The careful check `if key in self._store` distinguishes between a missing key (returns `None` from the default) and a key that was explicitly stored with a `None` value. This pattern is critical in caching systems where even "empty" results (like a query returning no rows) should be cached. After computing and caching the result, the second call to `cache.get(5)` returns immediately without recomputing, as shown by the absence of the "Computing..." message.

## 🏢 Real World Use Case

**Google's Python codebase** uses `None` extensively in their internal APIs as a sentinel for optional parameters and missing data. Their machine learning framework (TensorFlow) uses `None` to indicate unspecified tensor shapes, allowing dynamic computation graph construction. **Meta (Facebook)** uses `None` in their Graph API Python client — API responses that lack a field return `None` rather than raising `KeyError`, which client code can then handle with `if result is None:` checks. **Redis**'s Python client returns `None` when a key does not exist (instead of raising an exception), making `None` a core part of the API contract for cache lookups. In **Django**, model fields that allow `null=True` store Python `None` in the database as SQL `NULL`, and query set methods like `.first()` return `None` when no matching objects exist.

## 🎯 Interview Questions

**Q1: Why should you use `is None` instead of `== None`?**
A: `None` is a singleton — there is exactly one instance in a Python process. The `is` operator checks identity (whether two references point to the same object), which is the correct and fastest way to check for `None`. The `==` operator checks equality, which can be overridden by custom `__eq__` methods and may return unexpected results for objects that implement non-standard equality. Using `is None` is also idiomatic and signals to readers that you are checking for the None singleton specifically.

**Q2: What is the mutable default argument problem and how does `None` solve it?**
A: In Python, default arguments are evaluated once at function definition time, not each time the function is called. If a mutable object (like a list or dict) is used as a default, all calls share the same object, leading to unexpected behavior. Using `None` as the default and then creating a new mutable inside the function solves this — each call gets a fresh object. Example: `def add(item, items=None): if items is None: items = []; items.append(item); return items`.

**Q3: Does a function that has no `return` statement return `None`? What about a function with `return` but no value?**
A: Yes to both. Any function that reaches its end without executing a `return` statement implicitly returns `None`. A function with a bare `return` (without a value) also returns `None`. A function with multiple `return` paths must ensure every path returns a meaningful value or explicitly returns `None`. The `return` statement without a value is commonly used to exit a function early when the result is not meaningful.

**Q4: How do you handle `None` values in a chain of function calls to avoid `AttributeError: 'NoneType' object has no attribute ...`?**
A: Several approaches: (1) Explicit `if result is not None:` checks before calling methods. (2) The "Easier to Ask for Forgiveness than Permission" (EAFP) pattern with try/except. (3) Use the `Optional` type hint and static analysis tools to detect potential None access. (4) The walrus operator (`:=`) can combine assignment and None-check. (5) Libraries like `more-itertools` provide utility functions. (6) Python 3.10+ pattern matching can match `None` explicitly.

**Q5: What is the difference between `None` and `NotImplemented`?**
A: `None` represents the absence of a value. `NotImplemented` is a special singleton used in binary operator methods (like `__add__`, `__eq__`) to signal that the operation is not implemented for the given operand type. When a binary operator returns `NotImplemented`, Python tries the reflected operation on the other operand. If both return `NotImplemented`, Python raises `TypeError`. The two are unrelated — `None` is for missing data; `NotImplemented` is for operator dispatch.

## ⚠ Common Errors / Mistakes

**Error 1: Using `== None` instead of `is None`**
```python
# Acceptable but not idiomatic
if result == None:  # Works but slower and potentially wrong with custom __eq__
    pass

# Correct and idiomatic
if result is None:
    pass
```

**Error 2: Checking `if not value:` when you need to distinguish `None` from other falsy values**
```python
def process(value):
    # Wrong: treats None, 0, "", [], False all the same
    if not value:
        return "No value"

    # Correct: specifically check for None
    if value is None:
        return "Missing"
    if value == 0:
        return "Zero"
    return f"Got: {value}"
```

**Error 3: Forgetting that None propagates through method chains**
```python
def find_city(person_data):
    # May return None at any step
    address = person_data.get("address")
    if address is None:
        return None
    city = address.get("city")
    return city

# Wrong: assuming all intermediate values exist
# city = person_data["address"]["city"]  # KeyError or TypeError

# Correct: handle None at each step
if person_data.get("address") is not None:
    city = person_data["address"].get("city")
```

## 📝 Practice Exercises

**Beginner:**
1. Write a function `divide(a, b)` that returns `a / b` or `None` if `b` is zero. Call it with different values and check for `None` before printing.
2. Create a function that takes a list and returns its second element, or `None` if the list has fewer than 2 elements.
3. Write a script that demonstrates a function returning `None` implicitly (no return), explicitly (`return None`), and with a bare `return`.

**Intermediate:**
4. Implement a simple key-value store class where `get()` returns `None` for missing keys, but also supports storing `None` as a valid value. Use proper sentinel checks to distinguish.
5. Build a chain of three functions where each may return `None`. Process a nested dictionary safely, returning `None` for any missing key without raising exceptions.
6. Write a decorator that logs a warning every time a function returns `None`, including the function name and arguments.

**Advanced:**
7. Implement a `Maybe` monad class in Python that wraps a value (which may be `None`) and supports chaining via `.map()` and `.bind()` methods, providing safe None propagation without explicit if-checks.
8. Build a configuration loader that reads a JSON file and provides a `.get(key, default=None)` method. Implement a distinction between "key exists with None value" and "key does not exist" using a sentinel object other than None.
