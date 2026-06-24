## 22. Python Functions

## 📘 Introduction
A function in Python is a reusable block of code that performs a specific task. Functions are the cornerstone of modular programming — they allow you to break complex problems into smaller, manageable pieces, avoid code duplication, and improve readability and maintainability. Python functions are defined using the `def` keyword, followed by a function name, parentheses for parameters, and a colon. Functions may accept inputs (parameters) and return outputs (return values). Python supports a rich variety of parameter types including positional, default, keyword-only, and variable-length arguments (`*args` and `**kwargs`). Functions are first-class objects in Python, meaning they can be assigned to variables, passed as arguments, and returned from other functions. Understanding functions deeply is essential for writing clean, modular, and reusable Python code.

## 🧠 Key Concepts

- **`def` keyword** — Used to define a function: `def function_name():`
- **Parameters vs Arguments** — Parameters are variables in the function definition; arguments are values passed when calling
- **`return` statement** — Returns a value from the function; if omitted, the function returns `None`
- **Default parameters** — Parameters with default values: `def func(a, b=10):`
- **Keyword arguments** — Passing arguments by parameter name: `func(b=5, a=3)`
- **`*args`** — Captures any number of positional arguments as a tuple
- **`**kwargs`** — Captures any number of keyword arguments as a dictionary
- **Local vs Global scope** — Variables defined inside a function are local; global variables are accessible but can't be modified without `global` keyword
- **Lambda functions** — Anonymous one-line functions: `lambda x: x * 2`
- **Docstrings** — Documentation strings right after function definition: `"""description"""`
- **First-class functions** — Functions can be assigned, passed, and returned like any object
- **Type hints** — Optional type annotations: `def func(x: int) -> str:`

## 💻 Syntax

```python
# Basic function
def greet(name):
    """Greets the user by name."""
    return f"Hello, {name}!"

# Default parameter
def power(base, exp=2):
    return base ** exp

# *args (variable positional arguments)
def sum_all(*args):
    return sum(args)

# **kwargs (variable keyword arguments)
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

# Lambda function
double = lambda x: x * 2

# Function with type hints
def add(a: int, b: int) -> int:
    return a + b
```

**Line-by-line explanation:**
- `def greet(name):` — defines a function named `greet` with one parameter `name`
- `"""Greets the user by name."""` — docstring describing the function
- `return f"Hello, {name}!"` — returns a formatted string; function ends here
- `def power(base, exp=2):` — `exp` has a default value of 2, making it optional
- `def sum_all(*args):` — `*args` collects all positional arguments into a tuple
- `def print_info(**kwargs):` — `**kwargs` collects all keyword arguments into a dict
- `lambda x: x * 2` — an anonymous function that returns `x * 2`
- `def add(a: int, b: int) -> int:` — type hints suggest `a` and `b` are `int`, return is `int`

## ✅ Example 1 - Basic

**Problem:** Write a function that calculates the Body Mass Index (BMI) given weight in kg and height in meters, and returns the BMI category.

**Code:**
```python
def calculate_bmi(weight, height):
    """Calculate BMI and return (bmi_value, category)."""
    bmi = weight / (height ** 2)

    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25:
        category = "Normal"
    elif bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"

    return round(bmi, 1), category

# Using the function
result = calculate_bmi(70, 1.75)
print(f"BMI: {result[0]}, Category: {result[1]}")

# With keyword arguments
result2 = calculate_bmi(height=1.60, weight=55)
print(f"BMI: {result2[0]}, Category: {result2[1]}")
```

**Output:**
```
BMI: 22.9, Category: Normal
BMI: 21.5, Category: Normal
```

**Explanation:**
- The function takes `weight` and `height` as parameters
- BMI formula is `weight / height²`
- Conditional logic determines the category based on thresholds
- `return round(bmi, 1), category` — returns a tuple of two values
- When calling, the first call uses positional arguments; the second uses keyword arguments (order doesn't matter)
- The returned tuple is unpacked or accessed by index

## 🚀 Example 2 - Intermediate

**Problem:** Create a flexible data analysis function that accepts any number of numeric lists via `*args`, applies a specified operation (mean, median, or sum) via `**kwargs`, and returns results with metadata.

**Code:**
```python
def analyze_data(*args, operation="mean", verbose=False):
    """Analyze multiple datasets with a chosen operation.

    Args:
        *args: Variable number of lists/tuples of numbers
        operation: 'mean', 'median', or 'sum' (default: 'mean')
        verbose: If True, print detailed output (default: False)

    Returns:
        Dictionary with results for each dataset
    """
    results = {}

    for i, dataset in enumerate(args, 1):
        if operation == "mean":
            result = sum(dataset) / len(dataset)
        elif operation == "sum":
            result = sum(dataset)
        elif operation == "median":
            sorted_data = sorted(dataset)
            n = len(sorted_data)
            mid = n // 2
            if n % 2 == 0:
                result = (sorted_data[mid - 1] + sorted_data[mid]) / 2
            else:
                result = sorted_data[mid]
        else:
            result = None

        results[f"dataset_{i}"] = result

        if verbose:
            print(f"Dataset {i} ({operation}): {result}")

    return results

# Using the function
data1 = [10, 20, 30, 40, 50]
data2 = [5, 15, 25, 35]
data3 = [100, 200, 300]

# Default operation (mean)
print(analyze_data(data1, data2, verbose=True))

# Custom operation with keyword arguments
print(analyze_data(data1, data2, data3, operation="median", verbose=True))
```

**Output:**
```
Dataset 1 (mean): 30.0
Dataset 2 (mean): 20.0
{'dataset_1': 30.0, 'dataset_2': 20.0}
Dataset 1 (median): 30
Dataset 2 (median): 20.0
Dataset 3 (median): 200
{'dataset_1': 30, 'dataset_2': 20.0, 'dataset_3': 200}
```

**Explanation:**
- `*args` captures any number of datasets as a tuple of lists
- `operation="mean"` and `verbose=False` are keyword-only defaults (they come after `*args`)
- `enumerate(args, 1)` provides a 1-based index for naming datasets
- The `if-elif` chain dispatches the appropriate statistical operation
- Median calculation handles both even and odd-length datasets
- Returns a dictionary mapping dataset names to computed values
- Demonstrates both default and overridden `operation` parameter

## 🏢 Real World Use Case

**Company: Google** — In Google's data pipeline infrastructure, Python functions with `*args` and `**kwargs` are extensively used to create flexible ETL (Extract, Transform, Load) processors. A single transformation function might accept multiple data sources via `*args`, and configuration parameters (source type, schema version, error handling mode) via `**kwargs`. The `lambda` keyword is used in Google's TensorFlow for quick activation functions, loss functions, and metric computations. Default parameters allow backward compatibility — when new configuration options are added, old code continues to work because defaults are provided. Docstrings are mandatory at Google for all public functions, and they follow the Google Python Style Guide format. Type hints are used throughout to enable static analysis and better IDE support.

**Other uses:** Financial trading platforms use functions for algorithmic strategies, web frameworks (Django/Flask) use functions for view handlers, and data science notebooks use functions to encapsulate analysis steps.

## 🎯 Interview Questions

**1. What is the difference between `*args` and `**kwargs`?**

`*args` captures extra positional arguments as a tuple. `**kwargs` captures extra keyword arguments as a dictionary. They can be used together, but `*args` must come before `**kwargs` in the function signature. The names `args` and `kwargs` are conventions — the single `*` and double `**` are what matter.

**2. Explain Python's LEGB rule for variable scope.**

LEGB stands for Local, Enclosing, Global, Built-in. When Python looks up a variable name, it searches in this order: Local scope (inside the current function), Enclosing scope (any outer functions), Global scope (module level), and Built-in scope (Python's built-in names like `len`, `print`). If not found in any, a `NameError` is raised.

**3. What happens if you define a mutable default argument and modify it?**

The default argument is created once at function definition time, not each time the function is called. If you use a mutable default (like `[]` or `{}`), modifications persist across calls. Example: `def append_to(item, lst=[]): lst.append(item); return lst` — calling this repeatedly appends to the same list each time. The fix is to use `None` and create a new mutable inside the function.

**4. How do lambda functions differ from regular `def` functions?**

Lambda functions are anonymous, single-expression functions that implicitly return the result of the expression. They cannot contain statements (no `if`, `for`, `return`), cannot have docstrings, and are limited to a single expression. Regular `def` functions can have multiple statements, docstrings, annotations, and are more readable for complex logic. Lambdas are best for simple operations and as arguments to higher-order functions like `map()`, `filter()`, and `sorted()`.

**5. What is a docstring and how is it accessed?**

A docstring is a string literal as the first statement in a function (or module/class) that documents its purpose and usage. It is accessed via `function_name.__doc__` or using the `help()` function. Docstrings can be single-line or multi-line (triple-quoted). Tools like Sphinx can generate documentation from properly formatted docstrings following conventions like Google, NumPy, or reStructuredText styles.

## ⚠ Common Errors / Mistakes

**Error 1: Mutable default argument mutation**
```python
# BAD — default list is shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2]  — unexpected!

# FIX — use None and create new list inside
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [2]
```

**Error 2: Confusing parameters and arguments**
```python
# Parameters: x and y in the definition
def subtract(x, y):
    return x - y

# Arguments: 10 and 3 in the call
result = subtract(10, 3)  # positional
result2 = subtract(y=3, x=10)  # keyword (order doesn't matter)
```

**Error 3: Trying to modify global variable without `global`**
```python
count = 0

def increment():
    # This creates a NEW local variable 'count', doesn't modify the global
    count += 1  # UnboundLocalError

# FIX
def increment():
    global count
    count += 1
```

**Error 4: Mixing `return` with `print`**
```python
# BAD — function prints but doesn't return
def square(n):
    print(n * n)

result = square(5)  # prints 25
print(result)       # prints None — function had no return!

# FIX — always return values
def square(n):
    return n * n
```

**Error 5: Defining `*args` and `**kwargs` in wrong order**
```python
# BAD — SyntaxError
def func(**kwargs, *args):  # **kwargs must come last
    pass

# FIX — correct order
def func(*args, **kwargs):
    pass
```

## 📝 Practice Exercises

**Beginner:**
1. Write a function `is_palindrome(s)` that takes a string and returns `True` if it reads the same forwards and backwards (ignoring case), otherwise `False`.
2. Create a function `fahrenheit_to_celsius(f)` that converts Fahrenheit to Celsius using the formula `(f - 32) * 5/9`, and returns the result rounded to 2 decimal places.
3. Write a function `max_of_three(a, b, c)` that returns the largest of three numbers without using the built-in `max()` function.

**Intermediate:**
4. Create a function `create_student_report(name, *scores, grade_scale="standard")` that accepts a student name, variable number of test scores, and an optional grade scale. It should return a dictionary with the student's name, average score, and letter grade.
5. Write a function `apply_discount(price, discount=10, tax=0.05)` that calculates the final price after discount and tax. Use keyword arguments when calling.
6. Implement a function `operation_on_dicts(**kwargs)` that takes any number of named lists (e.g., `evens=[2,4,6]`, `odds=[1,3,5]`) and returns a dictionary showing the sum of each list and the combined total of all lists.

**Advanced:**
7. Create a timer decorator function `timer` that wraps any function and prints how long it took to execute. Use `*args` and `**kwargs` to pass through all arguments to the wrapped function.
8. Implement a function `flexible_csv_writer(filename, headers, *rows, delimiter=",")` that writes data to a CSV file. `headers` is a list of column names, `*rows` is variable number of row lists. The function should validate that all rows have the same length as headers.
