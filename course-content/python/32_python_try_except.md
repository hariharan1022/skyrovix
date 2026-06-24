# 32. Python Try...Except

## 📘 Introduction

Error handling is a critical aspect of writing robust and reliable Python programs. The `try...except` block allows a program to gracefully handle runtime errors (exceptions) instead of crashing unexpectedly. When Python encounters an error during execution, it raises an exception. If this exception is not caught, the program terminates abruptly. The `try` block contains code that might raise an exception, while the `except` block contains code that runs if a specific exception occurs. Python also supports `else` (runs if no exception occurs) and `finally` (always runs, regardless of exceptions) clauses. Additionally, you can raise exceptions intentionally with the `raise` keyword and define custom exception classes. Mastering exception handling separates beginner code from production-grade software, enabling proper error reporting, resource cleanup, and user-friendly failure messages.

## 🧠 Key Concepts

- **Exception**: An event that disrupts the normal flow of a program's execution (e.g., division by zero, file not found)
- **try block**: Contains code that might raise an exception; Python monitors this block for errors
- **except clause**: Catches and handles specific exception types; multiple except clauses can handle different errors
- **else clause**: Executes only if the try block completed without raising any exception
- **finally clause**: Executes unconditionally, whether an exception occurred or not; used for cleanup (closing files, releasing resources)
- **raise**: Intentionally triggers an exception, either built-in or custom
- **Custom Exception**: User-defined exception class that inherits from `Exception`

| Built-in Exception | Common Cause |
|-------------------|--------------|
| `TypeError` | Operation on inappropriate type (e.g., `"2" + 2`) |
| `ValueError` | Function receives argument with right type but invalid value (e.g., `int("abc")`) |
| `FileNotFoundError` | Attempt to open a non-existent file |
| `ZeroDivisionError` | Division or modulo by zero |
| `IndexError` | Sequence index out of range |
| `KeyError` | Dictionary key not found |
| `AttributeError` | Referencing a non-existent attribute |
| `ImportError` | Import statement fails |

## 💻 Syntax

```python
# Basic try...except structure
try:
    # Code that may raise an exception
    result = risky_operation()
except SpecificExceptionType:
    # Code that runs if SpecificExceptionType is raised
    handle_error()

# Full structure with multiple except, else, and finally
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("That was not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result is {result}")  # Runs only if no exception
finally:
    print("Execution complete.")  # Always runs

# Using raise
if age < 0:
    raise ValueError("Age cannot be negative")

# Catching multiple exceptions in one block
except (TypeError, ValueError) as e:
    print(f"Error: {e}")
```

Line-by-line explanation:
- `try:` — begins the monitored block; Python will look for exceptions inside this block
- `except ValueError:` — catches only `ValueError` exceptions; other exceptions propagate up
- `except ZeroDivisionError:` — a second except clause for a different exception type
- `else:` — runs only if no exception occurred in the try block (not after except)
- `finally:` — always executes, even if there's a return, break, or unhandled exception
- `raise ValueError(...)` — manually creates and throws a `ValueError` with a custom message
- `except (TypeError, ValueError) as e:` — catches multiple exception types and binds the exception instance to variable `e`

## ✅ Example 1 - Basic: Handling Invalid User Input

**Problem**: A program asks the user for their age and calculates their age in months. The program crashes if the user enters non-numeric input. Handle this gracefully.

**Code**:
```python
try:
    age = int(input("Enter your age: "))
    months = age * 12
    print(f"You are approximately {months} months old.")
except ValueError:
    print("Invalid input! Please enter a whole number.")
except KeyboardInterrupt:
    print("\nInput cancelled by user.")
```

**Output**:
```
Enter your age: twenty
Invalid input! Please enter a whole number.
```
Or with valid input:
```
Enter your age: 25
You are approximately 300 months old.
```

**Explanation**: The `try` block wraps the `int(input(...))` call. If the user enters non-numeric text, `int()` raises a `ValueError`. Instead of crashing, the program jumps to the `except ValueError` block and prints a friendly message. The `KeyboardInterrupt` handler catches Ctrl+C gracefully. The program continues running after handling the error rather than terminating.

## 🚀 Example 2 - Intermediate: File Processing with Full Error Handling

**Problem**: Read a configuration file, parse its contents as a number, and perform a calculation. Handle file-not-found, invalid-format, and calculation errors separately.

**Code**:
```python
def process_config(filename):
    try:
        file = open(filename, "r")
        content = file.read().strip()
        value = int(content)
    except FileNotFoundError:
        print(f"Error: File '{filename}' was not found.")
        return None
    except PermissionError:
        print(f"Error: No permission to read '{filename}'.")
        return None
    except ValueError:
        print(f"Error: File contents '{content}' is not a valid integer.")
        return None
    else:
        result = 100 / value
        print(f"Configuration loaded: {value}")
        print(f"100 / {value} = {result}")
        return result
    finally:
        try:
            file.close()
            print("File closed.")
        except NameError:
            print("File was never opened, nothing to close.")

# Test
process_config("config.txt")
```

**Output** (if config.txt contains "5"):
```
Configuration loaded: 5
100 / 5 = 20.0
File closed.
```
(If file does not exist):
```
Error: File 'config.txt' was not found.
File was never opened, nothing to close.
```

**Explanation**: This function demonstrates five error scenarios handled individually. The `FileNotFoundError` catches missing files. `PermissionError` catches access issues. `ValueError` catches non-integer content. The `else` block runs the calculation only if loading succeeded. The `finally` block ensures `file.close()` is always attempted, while the inner try/except handles the case where the file was never opened (causing `NameError`). This pattern — try/except/else/finally — is the gold standard for robust resource handling in Python.

## 🏢 Real World Use Case

**Stripe**, the payment processing platform, uses comprehensive exception handling throughout their Python API client library. Their SDK catches network timeouts (`requests.exceptions.Timeout`), rate limiting (`stripe.error.RateLimitError`), authentication failures (`stripe.error.AuthenticationError`), and invalid request parameters (`stripe.error.InvalidRequestError`). Each exception type maps to a specific HTTP status code and provides structured error data for debugging. **Dropbox** uses custom exception hierarchies in their file synchronization engine — a `SyncError` base class with subclasses like `ConflictError`, `PermissionError`, and `SpaceFullError`. This allows their application to handle each failure mode differently (e.g., automatic conflict resolution vs. user notification). **NASA** uses Python exception handling in mission-critical data processing pipelines, where a `finally` block ensures that satellite telemetry files are always closed and network connections are released, even when processing failures occur.

## 🎯 Interview Questions

**Q1: What is the difference between `except:` (bare except) and `except Exception:`?**
A: A bare `except:` catches absolutely every exception, including system-exiting exceptions like `SystemExit`, `KeyboardInterrupt`, and `GeneratorExit`. This can make it impossible to kill the program with Ctrl+C. `except Exception:` catches only exceptions that inherit from `Exception` (the base class for all non-system exceptions), which is almost always what you want. Bare excepts are considered bad practice; always specify `except Exception:` or a concrete exception type.

**Q2: Explain the order of except clauses. Why does it matter?**
A: Except clauses are evaluated top-to-bottom, and only the first matching clause executes. You must order them from most specific to most general. For example, place `except FileNotFoundError:` before `except OSError:` because `FileNotFoundError` is a subclass of `OSError`. If `OSError` comes first, it would catch `FileNotFoundError` and the specific handler would never run. Python enforces this at runtime, not at syntax level.

**Q3: What is the purpose of the `finally` block? When does it execute?**
A: The `finally` block is used for cleanup actions that must run regardless of whether an exception occurred. It always executes — even if the try or except block contains a `return`, `break`, `continue`, or if an unhandled exception propagates. Common uses include closing files, releasing database connections, releasing locks, and cleaning up temporary resources. `finally` is the only way to guarantee cleanup in the presence of exceptions.

**Q4: How do you create a custom exception class in Python?**
A: Create a class that inherits from `Exception` (or a subclass of it). The class can have a custom `__init__` method to store additional data. The `__str__` method defines the error message displayed when the exception is printed or raised. Custom exceptions make code self-documenting by declaring domain-specific error types (e.g., `InsufficientFundsError`, `InvalidEmailError`).

```python
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Insufficient funds: need ${amount}, have ${balance}")
```

**Q5: What is exception chaining and how do you use `raise ... from ...`?**
A: Exception chaining allows you to raise a new exception while preserving the original exception's traceback. Using `raise NewException("message") from original_exception` chains them. This is useful when translating low-level exceptions (e.g., database errors) into domain-specific exceptions without losing the original cause. The `__cause__` attribute holds the original exception, and Python displays both tracebacks. Use `raise ... from None` to suppress the original exception context when it is not relevant.

## ⚠ Common Errors / Mistakes

**Error 1: Catching all exceptions with bare `except:` and swallowing errors**
```python
# Wrong: catches everything silently, hides bugs
try:
    result = 10 / 0
except:
    pass  # Silently ignores the error

# Correct: catch specific exception and handle it
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

**Error 2: Forgetting that `else` runs only when no exception occurs**
```python
try:
    file = open("data.txt", "r")
except FileNotFoundError:
    print("File not found")
else:
    # This correctly runs only when file was opened successfully
    contents = file.read()
    print(contents)
```

**Error 3: Raising exceptions without providing useful information**
```python
# Wrong: no message, hard to debug
raise ValueError

# Correct: descriptive message
raise ValueError("Age must be between 0 and 150")

# Even better: store context in a custom exception
class AgeError(ValueError):
    def __init__(self, age, message="Invalid age"):
        self.age = age
        super().__init__(f"{message}: {age}")
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program that asks the user for two numbers and divides them. Handle `ZeroDivisionError` and `ValueError` separately.
2. Create a script that opens and reads a file. Handle `FileNotFoundError` by creating the file with default content.
3. Write a function that converts a string to an integer. Return `None` instead of crashing if the conversion fails.

**Intermediate:**
4. Build a calculator program that continuously accepts user input and performs operations. Use try/except to handle invalid operators, non-numeric input, and division by zero. The program should continue running after errors.
5. Create a custom exception hierarchy for a bank account system with `BankError` (base), `InsufficientFundsError`, and `AccountNotFoundError`. Implement a `BankAccount` class that uses these exceptions.
6. Write a script that processes a list of filenames. Use try/except to handle errors for individual files while continuing to process the rest of the list. Track which files succeeded and which failed.

**Advanced:**
7. Implement a retry decorator that automatically retries a function up to N times when specific exceptions occur, with exponential backoff between attempts.
8. Build a transaction context manager that automatically rolls back (reverts state) if any exception occurs during the transaction block, using try/except/finally internally.
