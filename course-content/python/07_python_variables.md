## 1. Python Variables

## 2. 📘 Introduction

Variables are the fundamental building blocks of any program — they store data that your code can use, modify, and reference. In Python, variables are like labeled boxes where you store values. Unlike many other languages, Python uses **dynamic typing**: you don't need to declare what type a variable will hold — just assign a value and Python figures it out. A variable can even change type during your program. Python variables follow simple naming rules: they must start with a letter or underscore, can contain letters, numbers, and underscores, and are case-sensitive. You can assign multiple variables in one line, assign the same value to multiple variables, and even swap values between variables in a single line (a trick few languages can match). This section covers everything you need to know about creating, naming, and using variables effectively in Python.

## 3. 🧠 Key Concepts

- **Variable:** A named location in memory that stores a value.
- **Assignment:** Use `=` to assign a value to a variable: `name = "Alice"`.
- **Dynamic Typing:** Variables can change type — `x = 5` then `x = "hello"` is valid.
- **Naming Rules:** Must start with letter/underscore, followed by letters, digits, underscores. No spaces or special characters except `_`.
- **Case Sensitivity:** `age`, `Age`, and `AGE` are three different variables.
- **Multiple Assignment:** Assign several variables in one line: `a, b, c = 1, 2, 3`.
- **Same Value to Multiple:** `x = y = z = 0` assigns 0 to all three.
- **Swapping Variables:** Python's elegant swap: `a, b = b, a`.

| Naming Convention | Example | Usage |
|-------------------|---------|-------|
| snake_case | `user_name` | Variables, functions (PEP 8) |
| UPPER_CASE | `MAX_LIMIT` | Constants |
| _single_leading | `_private` | Internal/private use |
| __double_leading | `__private_attr` | Name mangling (classes) |

## 4. 💻 Syntax

```python
# Basic variable assignments
name = "Alice"       # String
age = 25             # Integer
height = 5.6         # Float
is_student = True    # Boolean

# Multiple assignment
x, y, z = 10, 20, 30

# Same value to multiple
a = b = c = 0

# Swapping variables
x, y = y, x
print(f"After swap: x={x}, y={y}")
```

**Output:**
```
After swap: x=20, y=10
```

**Explanation:** Variables are created the moment you assign a value. No declaration keyword is needed. The multiple assignment assigns `10` to `x`, `20` to `y`, `30` to `z`. The same-value assignment sets `a`, `b`, `c` all to `0`. The swap `x, y = y, x` exchanges their values in one line — Python evaluates the right side first, then assigns.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Store a student's information in variables and display a summary.

```python
# Student information
student_name = "Rajesh Kumar"
student_age = 20
student_grade = "A"
is_passed = True
marks_percentage = 85.5

# Display summary
print("=== Student Report ===")
print("Name:", student_name)
print("Age:", student_age)
print("Grade:", student_grade)
print("Passed:", is_passed)
print("Percentage:", marks_percentage, "%")
```

**Output:**
```
=== Student Report ===
Name: Rajesh Kumar
Age: 20
Grade: A
Passed: True
Percentage: 85.5 %
```

**Explanation:** Five variables store different data types — string, integer, string, boolean, float. Each variable is created by assignment. The `print()` statements use commas to combine text with variable values. The boolean `True` is printed as "True".

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Use multiple assignment and variable swapping to reorder a list of scores.

```python
# Swap values to sort two numbers
a = 45
b = 23

print(f"Before swap: a={a}, b={b}")

# Swap if a is greater than b (to put smaller first)
if a > b:
    a, b = b, a

print(f"After swap:  a={a}, b={b}")

# Multiple assignment with unpacking
score1, score2, score3 = 88, 92, 78
average = (score1 + score2 + score3) / 3
print(f"\nScores: {score1}, {score2}, {score3}")
print(f"Average: {average:.1f}")
```

**Output:**
```
Before swap: a=45, b=23
After swap:  a=23, b=45

Scores: 88, 92, 78
Average: 86.0
```

**Explanation:** The `if` statement checks if `a > b`. If true, the swap line `a, b = b, a` runs, exchanging their values in one line. The multiple assignment unpacks three values into three variables. The f-string `{average:.1f}` formats the average to one decimal place.

## 7. 🏢 Real World Use Case

**Google** uses Python variables extensively in their backend services — variables store everything from user session data to database query results. In **data science** at **Netflix**, variables store DataFrames, model parameters, and prediction results. **NASA** uses variables in Python scripts that control telescope operations — variables hold coordinates, exposure times, and sensor readings. **Instagram's** Django backend assigns user data to variables like `user = request.user` and `posts = user.posts.all()`. In **finance** at **Goldman Sachs**, variables store stock prices, portfolio values, and risk calculations. The ability to swap variables is used in sorting algorithms, and multiple assignment is used extensively when functions return multiple values (common in Python APIs).

## 8. 🎯 Interview Questions

**Q1:** What are the rules for naming a variable in Python?
**A:** (1) Must start with a letter (a-z, A-Z) or underscore `_`. (2) Remaining characters can be letters, digits (0-9), or underscores. (3) Cannot use Python keywords (`if`, `for`, `while`, etc.). (4) Names are case-sensitive.

**Q2:** What is dynamic typing in Python?
**A:** Dynamic typing means variables can change type during program execution. Example:
```python
x = 10       # x is int
x = "hello"  # x is now str — perfectly valid
```

**Q3:** How do you assign the same value to multiple variables?
**A:** Use chained assignment: `a = b = c = 100`. All three variables hold the value 100.

**Q4:** How do you swap two variables in Python without a temporary variable?
**A:** Use tuple unpacking: `a, b = b, a`. This is Python's idiomatic swap.

**Q5:** Is `123abc` a valid variable name? Why or why not?
**A:** No. Variable names cannot start with a digit. They must start with a letter or underscore.

## 9. ⚠ Common Errors / Mistakes

**Error:** `NameError: name 'x' is not defined` — Using a variable before assigning a value to it.
**Fix:** Always initialize variables before use. Example:
```python
print(x)  # Error: x not defined
x = 5     # This line never runs
```

**Error:** `TypeError: unsupported operand type(s)` — Mixing incompatible types in operations.
**Fix:** Ensure variables have compatible types. Example: `"Age: " + 25` fails; use `"Age: " + str(25)`.

**Error:** Accidentally using a keyword as a variable name — `if = 10` raises `SyntaxError`.
**Fix:** Check the list of Python keywords (`False, None, True, if, else, for, while, etc.`). Use a different name.

## 10. 📝 Practice Exercises

**Beginner:**
1. Create variables for your name, age, and favourite food. Print them in a sentence.
2. Assign the value 100 to three different variables using chained assignment. Print all three.
3. Create two variables with numbers and swap their values using a temporary third variable.

**Intermediate:**
4. Use multiple assignment to assign values to four variables in one line. Calculate and print their sum.
5. Write a program that takes two numbers as input, stores them in variables, swaps them, and prints the result.
6. Create variables for a product (name, price, quantity). Calculate and print the total cost.

**Advanced:**
7. Write a program that uses multiple assignment to unpack the result of a calculation into three variables and prints each.
8. Write a program that demonstrates how variable reassignment changes the type — start with an integer, reassign to a string, then a float, and print the type after each change.
