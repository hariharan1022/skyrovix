# 18. Python If...Else

## 📘 Introduction
Conditional statements (`if`, `elif`, `else`) are the primary mechanism for controlling the flow of a Python program based on Boolean conditions. The `if` statement evaluates a condition; if it's truthy, the indented block executes. An optional `elif` (short for "else if") allows checking multiple conditions sequentially, and an optional `else` provides a fallback when all conditions are falsy. Python's conditional syntax is clean and readable, relying on indentation rather than braces or keywords. The **ternary operator** (`x if condition else y`) provides a concise inline conditional expression. Logical operators (`and`, `or`, `not`) combine and invert conditions, and Python's truthiness rules mean any object can be used directly as a condition. Nesting conditionals (placing `if` inside another `if`) allows creating complex decision trees, though it should be used judiciously to maintain readability.

## 🧠 Key Concepts

- **`if` Statement**: `if condition:` — executes block if condition is truthy. Colon and indentation are required
- **`elif`**: `elif condition:` — checked only if all previous conditions were falsy. Can have multiple `elif`s
- **`else`**: `else:` — executes when no preceding condition was truthy. No condition, just colon
- **Indentation**: Python uses indentation (usually 4 spaces) to define blocks. Inconsistent indentation causes `IndentationError`
- **Ternary Operator**: `value_if_true if condition else value_if_false` — returns a value, not a statement
- **Truthy/Falsy in Conditions**: Any object can be used as a condition. Empty/zero/`None`/`False` are falsy; everything else is truthy
- **Nested Conditionals**: `if` inside another `if`. Use sparingly — flatten with `and` or refactor
- **Short-Circuit Evaluation**: `and`/`or` stop evaluating as soon as the result is determined
- **Pass Statement**: `if True: pass` — no-op placeholder when a block is syntactically required but does nothing
- **Chained Comparisons**: `if 0 < x < 10:` is valid Python, equivalent to `if x > 0 and x < 10:`

## 💻 Syntax

```python
# Basic if-elif-else
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Grade: {grade}")

# Ternary operator
age = 20
status = "Adult" if age >= 18 else "Minor"

# Nested conditionals
user = {"name": "Alice", "role": "admin", "active": True}

if user["active"]:
    if user["role"] == "admin":
        print("Full access granted")
    else:
        print("Limited access granted")
else:
    print("Account deactivated")

# Truthy/falsy in conditions
name = ""          # falsy
items = []         # falsy
count = 0          # falsy

if not name:
    print("Name is empty")       # prints
if not items:
    print("No items")            # prints
if count:
    print("Count is non-zero")   # doesn't print

# Logical operators
x = 5
if x > 0 and x < 10:
    print("Single digit positive")   # prints
if not (x == 0):
    print("Non-zero")                # prints

# Chained comparison
if 0 < x < 10:
    print("x is between 0 and 10")   # prints

# Using pass as placeholder
if True:
    pass   # TODO: implement later
```

## ✅ Example 1 - Basic

**Problem**: Write a program that categorizes a person based on their age: infant (0-2), child (3-12), teenager (13-19), adult (20-64), or senior (65+).

**Code**:
```python
age = int(input("Enter age: "))

if age < 0:
    category = "Invalid age"
elif age <= 2:
    category = "Infant"
elif age <= 12:
    category = "Child"
elif age <= 19:
    category = "Teenager"
elif age <= 64:
    category = "Adult"
else:
    category = "Senior"

print(f"Category: {category}")
```

**Output**:
```
Enter age: 17
Category: Teenager
```

**Explanation**: The conditions are checked in order. Once a condition is `True`, Python executes that block and skips the rest. The order matters — more specific or narrow ranges should come before broader ones. The final `else` catches all remaining cases.

## 🚀 Example 2 - Intermediate

**Problem**: Create a simple login system that checks username and password, handles locked accounts, and supports admin override.

**Code**:
```python
users = {
    "alice": {"password": "pass123", "locked": False, "role": "user"},
    "bob": {"password": "secret!", "locked": True, "role": "user"},
    "admin": {"password": "admin123", "locked": False, "role": "admin"},
}

username = input("Username: ")
password = input("Password: ")

if username not in users:
    print("User not found")
elif users[username]["locked"]:
    print("Account locked. Contact support.")
elif users[username]["password"] != password:
    print("Incorrect password")
else:
    print(f"Welcome, {username}!")
    if users[username]["role"] == "admin":
        print("Admin panel available")
    else:
        print("User dashboard loading...")
```

**Output**:
```
Username: bob
Password: secret!
Account locked. Contact support.
```

**Explanation**: Multiple `elif` conditions create a cascading validation chain. Each condition fails fast — as soon as one fails, the rest are skipped. The nested `if` inside `else` provides role-specific behavior. This pattern is common in authentication, form validation, and multi-step checks.

## 🏢 Real World Use Case

**Company**: Netflix

**Scenario**: Netflix's recommendation engine uses cascading `if-elif-else` logic to decide which recommendation strategy to use. If a user has extensive watch history (`if len(history) > 100:`), use collaborative filtering. Else if they have some history (`elif len(history) > 10:`), use content-based filtering. Else if they completed onboarding surveys, use preference matching. Else, use popular/trending content. The ternary operator is used in rendering: `show_warning = True if user["plan"] == "basic" else False`. Truthy checks determine if cached results are available: `if cached_recommendations:` uses them; otherwise, recompute. Nested conditionals handle country-specific content licensing restrictions. Logical operators combine multiple filters: `if genre == "sci-fi" and rating >= 4.0 and not watched:`. This conditional logic powers personalized experiences for millions of users.

## 🎯 Interview Questions

**1. What is the difference between `elif` and nested `else if`?**
`elif` is a single keyword combining "else" and "if" at the same indentation level. It is cleaner and avoids deep nesting. Nested `else: if ...` requires multiple levels of indentation. In Python, there is no `else if` keyword; `elif` is the correct form.

**2. How does the ternary operator `x if cond else y` work?**
It evaluates `cond`. If truthy, returns `x`; otherwise returns `y`. It's an expression (returns a value), not a statement. Nesting ternaries (`a if c1 else b if c2 else c`) is possible but generally harms readability.

**3. Can you use `else` without `if`?**
No. `else` must follow either an `if` or `elif` block. It cannot appear independently. `else` at the top level of a `try...except...else` or `for...else` / `while...else` is a different construct.

**4. What is the output of `[] if False else [1]`?**
`[1]`. The condition `False` is falsy, so the `else` branch executes, returning `[1]`. This is a ternary expression that returns a list.

**5. How does Python handle `if not x` compared to `if x == False`?**
`if not x` checks the truthiness of `x` — any falsy value (`0`, `""`, `None`, `[]`, `False`) triggers the block. `if x == False` specifically checks equality to `False`, which also matches `0` (since `False == 0` is `True` in Python). `if not x` is more idiomatic and safer.

## ⚠ Common Errors / Mistakes

**Error**: Missing colon after condition
```python
if x > 5    # SyntaxError: expected ':'
```
**Fix**: Always add `:` at the end of `if`, `elif`, `else` lines.

**Error**: Inconsistent indentation
```python
if True:
    print("Hello")
  print("World")   # IndentationError
```
**Fix**: Use consistent indentation (prefer 4 spaces) for all blocks within the same level.

**Error**: Using assignment `=` instead of comparison `==`
```python
if x = 5:   # SyntaxError
```
**Fix**: Use `==` for comparison. Python intentionally prevents this common C-family bug by making assignment an expression that can't be used as condition.

**Error**: Forgetting that `elif`/`else` must follow `if` immediately
```python
if x > 0:
    print("Positive")
print("...")
else:          # SyntaxError: invalid syntax (can't have code between if and else)
```
**Fix**: Don't put code between an `if` and its `elif`/`else`.

**Error**: Misunderstanding ternary operator as a statement
```python
x if condition    # SyntaxError (no else clause)
```
**Fix**: The ternary requires all three parts: `x if condition else y`

## 📝 Practice Exercises

**Beginner:**

1. Write a program that takes a number and prints whether it's positive, negative, or zero.
2. Ask the user for three numbers and print the largest one using if-elif-else.
3. Take an integer and print "Even" if it's divisible by 2, "Odd" otherwise. Use a ternary operator.

**Intermediate:**

4. Write a function `quadrant(x, y)` that returns which quadrant a point lies in (1st, 2nd, 3rd, 4th) or "On axis" if on an axis.
5. Given a year, month, and day, determine if the date is valid (consider leap years and days per month).
6. Write a function `rock_paper_scissors(p1, p2)` that returns "Player 1 wins", "Player 2 wins", or "Draw" using conditional logic.

**Advanced:**

7. Implement a simple calculator that takes an expression like `"5 + 3"` and evaluates it, handling `+`, `-`, `*`, `/`, and division by zero. Use conditional logic to determine which operation to perform.
8. Write a function `tax_bracket(income)` that computes income tax using progressive tax brackets (e.g., 0% on first $10,000, 10% on next $20,000, 20% on next $30,000, 30% on remainder). Use `if-elif-else` to determine the bracket.
