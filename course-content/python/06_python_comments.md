## 1. Python Comments

## 2. 📘 Introduction

Comments are notes in your code that the Python interpreter ignores — they exist solely for humans to read. Good comments explain why you wrote code a certain way, what a complex section does, or provide context for future readers (including your future self). Python supports two types of comments: single-line comments using the `#` symbol, and multi-line comments using triple quotes (`""" """` or `''' '''`). Beyond simple comments, Python has a special kind of comment called a **docstring** — a multi-line string placed at the start of a function, class, or module that documents its purpose and usage. Docstrings are accessible at runtime via the `__doc__` attribute and the `help()` function. In professional development, comments are a critical part of code maintainability. This section teaches you how, when, and why to comment your code effectively.

## 3. 🧠 Key Concepts

- **Single-line comments:** Start with `#` — everything after `#` on that line is ignored.
- **Multi-line comments:** Python doesn't have a dedicated multi-line comment syntax, but triple-quoted strings (`""" ... """`) used without assignment act as multi-line comments.
- **Inline comments:** A comment placed on the same line as code, after the statement.
- **Docstrings:** Triple-quoted strings at the start of modules, functions, classes, or methods — they serve as documentation.
- **`__doc__` attribute:** Access a function/module/class's docstring programmatically.
- **`help()` function:** Built-in function that displays docstrings in a readable format.
- **Commenting best practices:** Explain "why" not "what", keep comments updated, avoid obvious comments.

| Comment Type | Syntax | Purpose |
|--------------|--------|---------|
| Single-line | `# comment` | Short explanations, disable code |
| Inline | `code  # comment` | Brief note about a specific line |
| Multi-line (block) | `# line1\n# line2` | Longer explanations |
| Docstring | `""" ... """` | Official documentation for functions/classes |

## 4. 💻 Syntax

```python
# This is a single-line comment
print("Hello")  # This is an inline comment

"""
This is a multi-line comment (docstring)
It can span several lines.
Python ignores it when not assigned.
"""

def greet(name):
    """This docstring explains what this function does."""
    print(f"Hello, {name}!")
```

**Explanation:** The `#` comments are ignored by Python. The triple-quoted string without assignment also gets ignored (acts as a comment). The docstring under `greet()` is preserved as the function's documentation and can be accessed via `help(greet)` or `greet.__doc__`.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Add comments to explain what each part of a simple program does.

```python
# This program calculates the area of a rectangle
# Formula: area = length * width

length = 10   # Length in meters
width = 5     # Width in meters

# Calculate the area
area = length * width

# Display the result
print("Area of rectangle:", area, "sq meters")
```

**Output:**
```
Area of rectangle: 50 sq meters
```

**Explanation:** Comments explain the program's purpose, the formula used, what each variable represents, and what each section does. The interpreter ignores every line starting with `#`. The code runs exactly the same with or without comments.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Use docstrings to document a function and access that documentation.

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).

    Parameters:
    weight_kg (float): Weight in kilograms
    height_m (float): Height in meters

    Returns:
    float: BMI value rounded to 2 decimal places
    """
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 2)

# Using the function
bmi = calculate_bmi(70, 1.75)

# Access the docstring
print("Function documentation:")
print(calculate_bmi.__doc__)
print(f"\nBMI result: {bmi}")
```

**Output:**
```
Function documentation:

    Calculate Body Mass Index (BMI).

    Parameters:
    weight_kg (float): Weight in kilograms
    height_m (float): Height in meters

    Returns:
    float: BMI value rounded to 2 decimal places

BMI result: 22.86
```

**Explanation:** The docstring (triple-quoted string) inside `calculate_bmi()` documents its purpose, parameters, and return value. `calculate_bmi.__doc__` accesses this documentation at runtime. Docstrings follow PEP 257 conventions and can be read by tools like Sphinx to auto-generate documentation pages.

## 7. 🏢 Real World Use Case

**Google** requires docstrings on all public functions, classes, and modules — their internal style guide specifies the format. **Microsoft's VS Code Python extension** uses docstrings to show type info and documentation in IntelliSense hover tooltips. At **Meta**, code reviewers check that complex logic has adequate comments — the rule is "comment the why, not the what." **Open-source projects** (like Django, NumPy, Pandas) rely heavily on docstrings because they auto-generate their entire documentation websites from them. In **financial services** (like Goldman Sachs), compliance requires that certain code logic is explained in comments for audit purposes. Professional teams often use type hints along with docstrings to create self-documenting code.

## 8. 🎯 Interview Questions

**Q1:** How do you write a single-line comment in Python?
**A:** Use the `#` symbol. Everything after `#` on that line is ignored by Python. Example: `# This is a comment`.

**Q2:** Does Python have multi-line comments?
**A:** Python does not have a dedicated multi-line comment syntax. Multi-line comments are created using multiple `#` lines or by using a triple-quoted string (`""" ... """`) that is not assigned to a variable.

**Q3:** What is a docstring and how is it different from a regular comment?
**A:** A docstring is a triple-quoted string that documents a module, function, class, or method. Unlike regular comments, docstrings are preserved at runtime and accessible via `__doc__` and `help()`. Regular comments are completely ignored.

**Q4:** How do you access a function's docstring in code?
**A:** Use `function_name.__doc__` or `help(function_name)`. Example: `print(calculate_bmi.__doc__)` prints the docstring of `calculate_bmi`.

**Q5:** What is the PEP 257 convention for docstrings?
**A:** PEP 257 recommends: (1) Use triple double quotes `"""`, (2) The first line is a brief summary, (3) Follow with a blank line and detailed description, (4) Document parameters and return values for functions.

## 9. ⚠ Common Errors / Mistakes

**Error:** Using triple-quoted strings for comments but accidentally assigning them to a variable or leaving them where they affect the program flow.
**Fix:** Ensure multi-line comment strings are not assigned. Example of wrong:
```python
x = 10
"""This is intended as a comment"""  # Actually a string expression — still ignored but wasteful
y = 20
```

**Error:** Outdated comments that contradict the code (misleading).
**Fix:** Always update comments when you change code. A lying comment is worse than no comment.

**Error:** Over-commenting obvious code — `x = x + 1  # increment x by 1`.
**Fix:** Comment the "why" not the "what". Explain logic that isn't obvious from reading the code.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program with a single-line comment explaining what the program does.
2. Write a program that uses inline comments to explain two different variables.
3. Write a program with a multi-line comment (using `#`) that explains a calculation step-by-step.

**Intermediate:**
4. Write a function called `celsius_to_fahrenheit` with a proper docstring (parameters, return, description).
5. Write a program that accesses and prints the docstring of a built-in function (e.g., `print` or `len`).
6. Write a program that temporarily disables a line of code using a comment, and explains why in the comment.

**Advanced:**
7. Write a module-level docstring for a script that explains its purpose, usage, and author info. Then access and print it.
8. Write a program with a function that has a docstring, then use `help()` to display the documentation in the console.
