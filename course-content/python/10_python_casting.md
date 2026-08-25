## 1. Python Casting

## 2. 📘 Introduction

Type casting (also called type conversion) is the process of converting a value from one data type to another. While Python is dynamically typed and often handles conversions automatically (e.g., when adding an int and float), there are many situations where you need to explicitly convert types. For example, user input via `input()` always comes as a string — you must convert it to an integer or float before doing arithmetic. Python provides three built-in functions for explicit type casting: `int()`, `float()`, and `str()`. There are also functions like `list()`, `tuple()`, `set()`, and `dict()` for converting between collection types. Casting can be **implicit** (automatic, done by Python) or **explicit** (done by the programmer). This section focuses on explicit casting — when and how to use it, what conversions are valid, and common pitfalls to avoid.

## 3. 🧠 Key Concepts

- **Implicit Conversion:** Python automatically converts smaller types to larger types to prevent data loss. Example: `int + float` → result is `float`.
- **Explicit Conversion:** Programmer manually converts using functions like `int()`, `float()`, `str()`.
- **`int()` constructor:** Converts a value to an integer. Truncates floats (removes decimal part). Raises `ValueError` for invalid strings.
- **`float()` constructor:** Converts a value to a float. Works with ints, numeric strings.
- **`str()` constructor:** Converts any value to its string representation.
- **`bool()` constructor:** Converts values to `True` or `False`. Falsy values: `0`, `0.0`, `""`, `None`, `[]`, `{}`, `set()`.
- **Collection casting:** `list()`, `tuple()`, `set()` convert between collection types.
- **Lossy vs Lossless:** Some conversions lose information (e.g., `float` → `int` loses decimal part).

| Conversion | `int()` | `float()` | `str()` |
|------------|---------|-----------|---------|
| int → | — | `float(5)` → 5.0 | `str(5)` → "5" |
| float → | `int(3.9)` → 3 | — | `str(3.9)` → "3.9" |
| str → | `int("5")` → 5 | `float("3.14")` → 3.14 | — |
| bool → | `int(True)` → 1 | `float(False)` → 0.0 | `str(True)` → "True" |

## 4. 💻 Syntax

```python
# String input (always string) — must cast to do math
age_str = input("Enter your age: ")      # Returns "25" (a string)
age = int(age_str)                        # Cast to int
print(f"Next year you will be {age + 1}")

# Explicit casting examples
print(int(3.9))        # 3  (truncates, does NOT round)
print(int("42"))       # 42
print(float("3.14"))   # 3.14
print(float(10))       # 10.0
print(str(100))        # "100"
print(str(3.14))       # "3.14"
print(bool(1))         # True
print(bool(0))         # False
print(bool(""))        # False (empty string)
print(bool("hello"))   # True (non-empty string)
```

**Output:**
```
Enter your age: 25
Next year you will be 26
3
42
3.14
10.0
100
3.14
True
False
False
True
```

**Explanation:** `input()` always returns a string. We cast it to `int` using `int()` so arithmetic works. `int(3.9)` truncates to 3 (not rounding). `float(10)` creates 10.0. `str(100)` creates the string "100". `bool()` follows the truthiness rules: 0, empty string, None are False; everything else is True.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Ask the user for two numbers, convert them to floats, and calculate their average.

```python
# Calculate average of two numbers
num1_str = input("Enter first number: ")
num2_str = input("Enter second number: ")

# Convert strings to float
num1 = float(num1_str)
num2 = float(num2_str)

average = (num1 + num2) / 2

print(f"Numbers: {num1} and {num2}")
print(f"Average: {average}")
```

**Output:**
```
Enter first number: 8
Enter second number: 12
Numbers: 8.0 and 12.0
Average: 10.0
```

**Explanation:** Without `float()`, `num1_str + num2_str` would concatenate the strings ("812"). By casting to float, we get proper numeric addition. Using `float()` instead of `int()` allows the user to enter decimal numbers too. The average is computed and displayed.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Convert between collection types and demonstrate implicit vs explicit conversion.

```python
# Collection casting
my_list = [1, 2, 2, 3, 3, 4]
print(f"Original list: {my_list}")

# Convert list to set (removes duplicates)
my_set = set(my_list)
print(f"As set (unique): {my_set}")

# Convert set back to list (order may change)
new_list = list(my_set)
print(f"Back to list:    {new_list}")

# Convert list to tuple
my_tuple = tuple(my_list)
print(f"As tuple:        {my_tuple}")

# Implicit conversion demonstration
print("\n--- Implicit Conversion ---")
result = 5 + 3.14        # int + float = float
print(f"5 + 3.14 = {result} (type: {type(result)})")

result2 = True + 2       # bool + int = int
print(f"True + 2 = {result2} (type: {type(result2)})")

# Explicit conversion with error handling
value = "abc"
try:
    number = int(value)
except ValueError:
    print(f"\nCannot convert '{value}' to integer!")
```

**Output:**
```
Original list: [1, 2, 2, 3, 3, 4]
As set (unique): {1, 2, 3, 4}
Back to list:    [1, 2, 3, 4]
As tuple:        (1, 2, 2, 3, 3, 4)

--- Implicit Conversion ---
5 + 3.14 = 8.14 (type: <class 'float'>)
True + 2 = 3 (type: <class 'int'>)

Cannot convert 'abc' to integer!
```

**Explanation:** `set()` removes duplicates from the list. `list()` and `tuple()` convert between types. Implicit conversion: Python automatically promotes `int` to `float` when mixed (to avoid data loss). `True` is treated as `1` in arithmetic contexts. The `try-except` block catches the `ValueError` when trying to cast an invalid string to int.

## 7. 🏢 Real World Use Case

**Web Development (Django):** When a user submits a form, all data arrives as strings. **Instagram's** Django backend casts form data — `int(request.POST['age'])` — before saving to the database. **Data Pipelines:** At **Netflix**, streaming data is parsed from JSON (all strings) and cast to appropriate types (int for IDs, float for ratings) before processing. **API Development:** **Stripe** receives payment amounts as strings in JSON and casts them to integers (cents) for processing — `amount = int(data['amount'])`. **E-commerce:** At **Amazon**, product prices are stored as strings in some legacy systems and must be cast to `Decimal` or `float` for calculations. **Data Science:** In **Pandas**, columns are often cast using `.astype()` — converting strings to datetime objects, or floats to integers for categorical encoding.

## 8. 🎯 Interview Questions

**Q1:** What is type casting in Python?
**A:** Type casting is converting a value from one data type to another using constructor functions like `int()`, `float()`, `str()`, `list()`, `tuple()`, `set()`, etc.

**Q2:** What is the difference between implicit and explicit type conversion?
**A:** Implicit conversion is automatic (done by Python) — e.g., `5 + 3.14` converts `5` to `5.0`. Explicit conversion is done by the programmer using cast functions — e.g., `int("42")`.

**Q3:** What happens when you cast a float to an int?
**A:** The decimal part is truncated (removed), not rounded. `int(3.9)` returns `3`, not `4`. Use `round()` first if you want rounding.

**Q4:** Can you convert any string to an int?
**A:** No. Only strings containing valid integer literals can be converted. `int("42")` works, but `int("42.5")` and `int("hello")` raise `ValueError`.

**Q5:** How do you safely convert user input to an integer?
**A:** Use a try-except block:
```python
try:
    num = int(input("Enter a number: "))
except ValueError:
    print("That's not a valid number!")
```

## 9. ⚠ Common Errors / Mistakes

**Error:** `ValueError: invalid literal for int() with base 10: 'abc'` — Attempting to cast a non-numeric string to int.
**Fix:** Validate the input first, or use try-except. Use `isdigit()` to check: `if user_input.isdigit(): num = int(user_input)`.

**Error:** `ValueError: invalid literal for int() with base 10: '3.14'` — Trying to cast a float-string to int directly.
**Fix:** Cast to float first, then to int: `int(float("3.14"))` → `3`. Or use `float()` if you need decimals.

**Error:** Forgetting to cast user input:
```python
age = input("Age: ")     # "25" (string)
print(age + 1)           # TypeError: can only concatenate str (not "int") to str
```
**Fix:** Cast to int: `age = int(input("Age: "))`.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that converts the string "123" to an integer and adds 77 to it. Print the result.
2. Write a program that converts the float 9.99 to an integer using `int()`, then converts it back to a string using `str()`. Print each type.
3. Write a program that takes user input (a number as string) and converts it to float, multiplies by 2, and prints.

**Intermediate:**
4. Write a program that takes two numbers as input (strings), converts them to integers, and prints their sum, difference, product, and quotient.
5. Write a program that creates a list with duplicate values, converts it to a set, then back to a list. Print all three stages.
6. Write a program that demonstrates implicit conversion by adding an int, float, and bool together, printing the result and its type.

**Advanced:**
7. Write a program that safely parses three comma-separated numbers from a single string input (e.g., "10,20,30"), converts each to int, and prints their average. Handle invalid input gracefully.
8. Write a program that converts a list of mixed types (`[1, "2", 3.0, "4.5"]`) — cast each element to a float and sum them. Use try-except for elements that can't be converted.
