# 12. Python Booleans

## 📘 Introduction
The Boolean data type in Python, named after George Boole, represents one of two values: `True` or `False`. Booleans are a subclass of integers — `True` equals `1` and `False` equals `0` in numeric contexts. The `bool()` function converts any Python value to a Boolean based on its truthiness. Every object in Python is inherently truthy or falsy: numeric zero (`0`, `0.0`, `0j`), empty collections (`[]`, `{}`, `()`, `set()`, `""`, `range(0)`), and `None` are falsy; all other values are truthy. Booleans are the backbone of control flow — they drive `if` statements, `while` loops, and logical operations (`and`, `or`, `not`). The `isinstance()` function, which is commonly used for type checking, also returns a Boolean.

## 🧠 Key Concepts

- **Boolean Values**: `True` and `False` — capitalized. They are singletons in Python
- **`bool()` Function**: Converts any value to Boolean. `bool(1)` → `True`, `bool(0)` → `False`
- **Truthy vs Falsy**: Falsy values include `None`, `False`, zero in any numeric type, empty sequences/collections, and `0` in custom classes implementing `__bool__` or `__len__` returning 0
- **Boolean as Integers**: `True + True` = `2`, `True * 5` = `5`, `False == 0` is `True`. Useful in counting patterns
- **Boolean in Conditions**: `if x:` checks truthiness directly — no need for `if x == True:`
- **Short-Circuit Evaluation**: `and` stops at first falsy, `or` stops at first truthy
- **`isinstance()`**: `isinstance(obj, type)` returns `True` if `obj` is an instance of `type` or a subclass
- **`all()` and `any()`**: Built-in functions returning Boolean. `all(iterable)` → `True` if all elements are truthy; `any(iterable)` → `True` if any element is truthy

## 💻 Syntax

```python
# Boolean literals
a = True
b = False

# bool() function
bool(1)           # True
bool(0)           # False
bool("hello")     # True
bool("")          # False
bool([])          # False
bool([1, 2])      # True
bool(None)        # False

# Boolean as integers
result = True + False + True   # 2
count = sum(x > 0 for x in [-1, 0, 5, 3])  # 2

# isinstance()
isinstance(42, int)            # True
isinstance("hi", (int, str))   # True (matches tuple of types)

# all() and any()
nums = [1, 2, 3]
all(n > 0 for n in nums)       # True
any(n > 5 for n in nums)       # False
```

## ✅ Example 1 - Basic

**Problem**: Determine whether a given year is a leap year.

**Code**:
```python
def is_leap_year(year: int) -> bool:
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

years = [1900, 2000, 2024, 2025]
for y in years:
    print(f"{y}: {is_leap_year(y)}")
```

**Output**:
```
1900: False
2000: True
2024: True
2025: False
```

**Explanation**: The function uses Boolean logic with `and`/`or` operators. A year is a leap year if it's divisible by 4 and NOT divisible by 100, OR if it's divisible by 400. The relational operators (`==`, `!=`) return Boolean values, and the logical operators combine them.

## 🚀 Example 2 - Intermediate

**Problem**: Validate a user registration form with multiple fields using Boolean logic.

**Code**:
```python
def validate_registration(username, email, age, password):
    checks = {
        "username_length": 3 <= len(username) <= 20,
        "email_has_at": "@" in email,
        "age_valid": isinstance(age, int) and 13 <= age <= 120,
        "password_strong": len(password) >= 8 and any(c.isdigit() for c in password)
    }
    all_valid = all(checks.values())
    failed = [k for k, v in checks.items() if not v]
    return all_valid, failed

valid, issues = validate_registration("jo", "j@x.com", 25, "pass")
print(f"Valid: {valid}, Issues: {issues}")
```

**Output**:
```
Valid: False, Issues: ['username_length', 'password_strong']
```

**Explanation**: Each validation rule produces a Boolean. `all()` checks if every rule passes. List comprehension collects failed rule names. This pattern is common in form validation, config checking, and pre-condition assertions.

## 🏢 Real World Use Case

**Company**: Stripe (Payments)

**Scenario**: Stripe uses Boolean logic extensively in fraud detection. When a payment is processed, dozens of truthy/falsy checks run: "Is the CVV correct?", "Has this card been reported stolen?", "Is the transaction amount suspiciously high?", "Does the IP match the cardholder's country?" Each returns `True` or `False`. These booleans are combined with `and`/`or` to compute a risk score. Short-circuit evaluation ensures expensive checks (like database lookups) are skipped if an early check already fails. The `bool()` function is used to normalize values for logging and reporting.

## 🎯 Interview Questions

**1. What is the difference between `==` and `is` for Boolean comparison?**
`==` checks value equality: `True == 1` returns `True`. `is` checks identity: `True is 1` returns `False` because they are different objects, even though `True` equals `1`. Always use `==` for value comparison.

**2. What values are considered falsy in Python?**
`None`, `False`, zero of any numeric type (`0`, `0.0`, `0j`), empty sequences (`""`, `[]`, `()`), empty mappings (`{}`), `set()`, `range(0)`, and objects whose `__bool__()` returns `False` or `__len__()` returns `0`.

**3. How does short-circuit evaluation work with `and` and `or`?**
`and` returns the first falsy operand or the last operand if all are truthy. `or` returns the first truthy operand or the last operand if all are falsy. This means `0 and x` never evaluates `x`, and `1 or x` never evaluates `x`.

**4. Why is `if some_list:` preferred over `if len(some_list) > 0:`?**
Both work correctly, but `if some_list:` is more "Pythonic" and slightly more efficient. It relies on truthiness — a non-empty list is truthy, an empty list is falsy. The explicit `len()` call adds unnecessary verbosity.

**5. Can you subclass `bool`? What happens?**
`bool` cannot be subclassed because it is a final (sealed) type in CPython. Attempting `class MyBool(bool): pass` raises a `TypeError: type 'bool' is not an acceptable base type`. This ensures boolean behavior stays consistent.

## ⚠ Common Errors / Mistakes

**Error**: Using `is` instead of `==` with Booleans
```python
x = 1
if x is True:  # Often works (True is cached), but unreliable!
```
**Fix**: `if x == True:` or more simply `if x:`

**Error**: Forgetting that `True`/`False` are integers
```python
result = 10 + True   # 11 (not an error, but often a bug)
```
**Fix**: Be explicit: `result = 10 + (1 if condition else 0)`

**Error**: `==` instead of `=` in conditions (typo)
```python
if x = 5:  # SyntaxError: invalid syntax
```
**Fix**: Use `==` for comparison, `=` for assignment.

**Error**: Misunderstanding `bool("False")`
```python
print(bool("False"))  # True — it's a non-empty string!
```
**Fix**: `bool("False")` is `True` because the string is non-empty. Only the empty string `""` is falsy.

**Error**: Chaining comparisons incorrectly
```python
# Wrong: if 0 < x < 10:  # Actually correct in Python!
```
**Note**: Python supports chained comparisons natively. This is actually correct and equivalent to `0 < x and x < 10`.

## 📝 Practice Exercises

**Beginner:**

1. Write a function `is_even(n)` that returns `True` if a number is even, `False` otherwise.
2. Ask the user for two numbers and print `True` if the first is divisible by the second.
3. Write a program that takes a string and prints `True` if it contains the letter 'a'.

**Intermediate:**

4. Write a function `is_prime(n)` that returns `True` if `n` is a prime number using Boolean logic.
5. Create a function `all_unique(lst)` that returns `True` if all elements in a list are unique (use `bool` and `set`).
6. Given three numbers, determine if they could represent the side lengths of a valid triangle (triangle inequality theorem: sum of any two sides > the third).

**Advanced:**

7. Implement a simple rule engine `is_valid_password(password)` that checks at least three of these four rules are true: length >= 8, contains uppercase, contains digit, contains special character. Use `sum()` on a list of Booleans.
8. Write a function `truthy_count(iterable)` that returns the number of truthy values in a nested iterable (lists, tuples, sets — recursively).
