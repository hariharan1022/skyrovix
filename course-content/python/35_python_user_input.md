# 35. Python User Input

## 📘 Introduction

User input is how programs receive data from users during execution. Python's primary input mechanism is the built-in `input()` function, which pauses program execution, displays an optional prompt, and waits for the user to type text and press Enter. The function always returns the input as a string, so numeric input requires explicit conversion using `int()` or `float()`. Handling invalid input (non-numeric text when a number is expected) is a common challenge solved with `try/except` blocks. Beyond interactive input, Python programs often receive data through command-line arguments via the `sys.argv` list, which provides access to arguments passed when the script is launched. Mastering user input handling is essential for creating interactive command-line applications, tools, and scripts that respond to user instructions.

## 🧠 Key Concepts

- **input()**: Built-in function that reads a line from the user as a string; optional prompt string is displayed
- **String return**: `input()` always returns a string — convert with `int()`, `float()`, etc. for numeric use
- **Type conversion**: Using `int()`, `float()`, `bool()`, or custom parsers to convert string input to desired types
- **Error handling**: Wrapping `input()` and conversion in `try/except` to handle `ValueError` gracefully
- **sys.argv**: List of command-line arguments where `sys.argv[0]` is the script name and `sys.argv[1:]` are arguments
- **Multiple values**: Reading space/comma-separated input and using `split()` to parse into a list
- **Input validation**: Checking that input meets constraints (range, format, non-empty) before using it

| Method | Description | Example |
|--------|-------------|---------|
| `input()` | Read a line from stdin | `name = input("Enter name: ")` |
| `input().split()` | Read and split into list | `nums = input("Numbers: ").split()` |
| `map(int, input().split())` | Read space-separated integers | `a, b = map(int, input().split())` |
| `sys.argv` | Access command-line args (import sys) | `script = sys.argv[0]` |

## 💻 Syntax

```python
# Basic input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Numeric input with conversion
age = int(input("Enter your age: "))  # May raise ValueError

# Safe numeric input with validation
while True:
    try:
        age = int(input("Enter your age: "))
        if age < 0 or age > 150:
            print("Please enter a valid age (0-150).")
            continue
        break
    except ValueError:
        print("Invalid input. Please enter a number.")

# Reading multiple values at once
x, y = input("Enter two numbers: ").split()
x, y = float(x), float(y)

# Using map() for multiple conversions
a, b, c = map(float, input("Enter three numbers: ").split())

# Command-line arguments
import sys
print(f"Script name: {sys.argv[0]}")
print(f"Arguments: {sys.argv[1:]}")
if len(sys.argv) > 1:
    print(f"First argument: {sys.argv[1]}")
```

Line-by-line explanation:
- `input("Enter your name: ")` — displays the prompt and waits; returns whatever the user types as a string
- `int(input(...))` — converts the string to an integer; raises `ValueError` if the input is not a valid integer
- `try/except ValueError` — catches the conversion error and prompts again instead of crashing
- `input().split()` — splits the input string on whitespace into a list of strings
- `map(float, input().split())` — applies `float()` to each element, converting them all to floats
- `sys.argv` — a list from the `sys` module that holds command-line arguments

## ✅ Example 1 - Basic: Interactive Calculator

**Problem**: Create a simple interactive calculator that asks the user for two numbers and an operation, then displays the result. Handle invalid numeric input gracefully.

**Code**:
```python
print("Simple Calculator")
print("=" * 20)

# Get first number with validation
while True:
    try:
        num1 = float(input("Enter first number: "))
        break
    except ValueError:
        print("Invalid number. Please try again.")

# Get operation
op = input("Enter operation (+, -, *, /): ")

# Get second number with validation
while True:
    try:
        num2 = float(input("Enter second number: "))
        break
    except ValueError:
        print("Invalid number. Please try again.")

# Calculate and display result
if op == "+":
    result = num1 + num2
elif op == "-":
    result = num1 - num2
elif op == "*":
    result = num1 * num2
elif op == "/":
    if num2 == 0:
        result = "Error: Division by zero"
    else:
        result = num1 / num2
else:
    result = "Invalid operation"

print(f"\n{num1} {op} {num2} = {result}")
```

**Output**:
```
Simple Calculator
====================
Enter first number: 10
Enter operation (+, -, *, /): /
Enter second number: 3

10.0 / 3.0 = 3.3333333333333335
```

**Explanation**: The program uses `float(input())` to read numbers, wrapped in `try/except ValueError` to handle non-numeric input. The `while True` loop continues prompting until valid input is received. Division by zero is handled with an explicit check before performing the operation. This pattern — validate each input separately, provide clear error messages, and loop until valid — is the standard approach for robust interactive programs.

## 🚀 Example 2 - Intermediate: Command-Line File Reader with sys.argv

**Problem**: Create a script that reads a text file and optionally searches for lines containing a specific keyword. The filename and optional search term are provided as command-line arguments.

**Code**:
```python
import sys

def main():
    if len(sys.argv) < 2:
        print("Usage: python readfile.py <filename> [search_term]")
        sys.exit(1)

    filename = sys.argv[1]
    search_term = sys.argv[2] if len(sys.argv) > 2 else None

    try:
        with open(filename, "r", encoding="utf-8") as file:
            lines = file.readlines()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)
    except PermissionError:
        print(f"Error: No permission to read '{filename}'.")
        sys.exit(1)

    print(f"File: {filename} ({len(lines)} lines)")
    if search_term:
        print(f"Searching for: '{search_term}'")
        print("-" * 40)
        for i, line in enumerate(lines, 1):
            if search_term.lower() in line.lower():
                print(f"{i:4d}: {line.rstrip()}")
        print("-" * 40)
    else:
        print("".join(lines))

if __name__ == "__main__":
    main()
```

**Output** (command: `python readfile.py data.txt error`):
```
File: data.txt (50 lines)
Searching for: 'error'
------------------------------------
  12: An error occurred during processing
  34: error: file not found
  45: No errors detected
------------------------------------
```

**Explanation**: The script uses `sys.argv` to access command-line arguments. `sys.argv[0]` is the script name, `sys.argv[1]` is the filename, and `sys.argv[2]` (optional) is the search term. Argument count validation with `len(sys.argv)` provides a helpful usage message. The search is case-insensitive using `.lower()`. The `if __name__ == "__main__":` guard allows the file to be imported without executing. This pattern is the standard for building command-line tools in Python.

## 🏢 Real World Use Case

**Netflix** uses Python command-line scripts extensively in their content engineering pipeline. Engineers pass arguments via `sys.argv` to specify content IDs, encoding profiles, and output directories when processing video assets. Their CLI tools validate arguments before processing, providing clear error messages for missing or invalid parameters. **Dropbox** uses the `input()` function in their setup and configuration scripts, prompting users for installation paths, sync preferences, and authentication tokens. The input is validated in real-time, with try/except blocks ensuring that malformed input doesn't crash the installer. **Ansible** (Red Hat's IT automation tool) accepts inventory files, playbook names, and module arguments through command-line arguments processed with `sys.argv` and the `argparse` library, which builds on the same principles as basic argument handling.

## 🎯 Interview Questions

**Q1: What does the `input()` function return, and why must you convert it for numeric operations?**
A: `input()` always returns a string, regardless of what the user types. Even if the user types a number like `42`, it comes back as the string `"42"`. You must explicitly convert it using `int()` or `float()` before performing arithmetic. Failing to convert results in string concatenation (`"5" + "3"` = `"53"`) or a `TypeError` if mixing strings and numbers.

**Q2: How do you read a line of space-separated integers from the user?**
A: Use `input().split()` to split the input string into a list of strings, then convert each with `int()` or `map()`:
```python
values = list(map(int, input("Enter numbers: ").split()))
# Or with list comprehension:
values = [int(x) for x in input("Enter numbers: ").split()]
```
For a fixed number of values, use tuple unpacking: `a, b, c = map(int, input().split())`.

**Q3: What is `sys.argv` and what does `sys.argv[0]` represent?**
A: `sys.argv` is a list in the `sys` module that contains the command-line arguments passed to the Python script. `sys.argv[0]` is always the name of the script itself (as invoked). `sys.argv[1:]` contains the actual arguments. If no arguments are passed, `sys.argv` has length 1. The script name can be a full path, a relative path, or just a filename depending on how it was invoked.

**Q4: How do you safely convert user input to an integer while allowing the user to retry on invalid input?**
A: Use a `while True` loop with `try/except ValueError`:
```python
while True:
    try:
        user_input = input("Enter an integer: ")
        value = int(user_input)
        break
    except ValueError:
        print(f"'{user_input}' is not a valid integer. Try again.")
```
This pattern continues prompting until valid input is received, providing feedback on each failed attempt.

**Q5: What is the difference between `input()` in Python 2 vs Python 3?**
A: In Python 2, `input()` evaluated the input as a Python expression (equivalent to `eval(raw_input())`), which was dangerous and could execute arbitrary code. Python 2 also had `raw_input()` which returned a string (like Python 3's `input()`). In Python 3, `input()` always returns a string and does not evaluate the input — making it safe by default. Python 2 is end-of-life; always use Python 3's `input()`.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting to convert input for numeric comparison**
```python
age = input("Enter your age: ")
# Wrong: compares string to integer
if age > 18:  # TypeError in Python 3
    print("Adult")

# Correct: convert to int first
age = int(input("Enter your age: "))
if age > 18:
    print("Adult")
```

**Error 2: Using `input()` in Python 2 thinking it works like Python 3**
```python
# Python 2: input() evaluates as code — dangerous!
# If user types __import__('os').system('rm -rf /'), it runs!
# Use raw_input() in Python 2 instead.
# In Python 3, input() is safe and raw_input() does not exist.
```

**Error 3: Not handling `EOFError` from input()**
```python
# If input reaches EOF (e.g., piping empty file, Ctrl+D), input() raises EOFError
try:
    data = input("Enter data: ")
except EOFError:
    print("No input received.")
    data = ""
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program that asks for the user's name, age, and favorite color, then prints a sentence combining all three.
2. Create a program that reads two numbers from the user and prints their sum, difference, product, and quotient (handle division by zero).
3. Write a script that asks the user for a sentence and a word, then reports how many times the word appears in the sentence.

**Intermediate:**
4. Build a temperature converter that reads a value and unit (C or F) from the user and converts to the other scale. Validate both the numeric input and the unit.
5. Write a command-line todo list manager using `sys.argv`. Support commands: `add <task>`, `list`, `done <index>`, and `remove <index>`. Store tasks in a list (in-memory).
6. Create an interactive quiz program that reads 5 questions and answers from a dictionary, asks the user each question, and keeps score. Handle empty input and non-numeric answers gracefully.

**Advanced:**
7. Implement a REPL (Read-Eval-Print Loop) calculator that accepts full arithmetic expressions as input (like `"3 + 4 * 2"`), parses them, and evaluates them safely without using `eval()`.
8. Build a menu-driven CLI application with nested menus (using `input()`) that supports going back to the previous menu and exiting. Use a dictionary-based menu tree structure to define menus and their actions.
