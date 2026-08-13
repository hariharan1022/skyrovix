## 1. Python Numbers

## 2. 📘 Introduction

Numbers are everywhere in programming — counting items, calculating distances, computing averages, measuring time, and much more. Python provides three numeric types: **int** (integers — whole numbers), **float** (floating-point numbers — decimals), and **complex** (numbers with an imaginary part). Unlike many languages, Python integers have arbitrary precision — they can grow as large as your memory allows, making them perfect for scientific computing and cryptography. Floats follow the IEEE 754 standard (double precision, 64-bit). Python also provides a rich set of built-in functions for working with numbers: `abs()`, `round()`, `pow()`, `divmod()`, and more. The `math` module extends this with trigonometric functions, logarithms, constants like pi and e, and number-theoretic functions. This section covers everything from basic number usage to type conversion and practical number methods.

## 3. 🧠 Key Concepts

- **int:** Whole numbers, positive or negative, no decimal point. Unlimited precision.
- **float:** Decimal numbers with a fractional part. 64-bit double precision.
- **complex:** Numbers with real and imaginary parts: `3 + 4j` (where `j` is the imaginary unit).
- **Type Conversion:** `int()`, `float()`, `complex()` convert between numeric types.
- **`abs()`:** Returns absolute value of a number.
- **`round()`:** Rounds a float to a specified number of decimal places.
- **`pow(x, y)`:** Returns `x` raised to power `y` (same as `x ** y`).
- **`divmod(a, b)`:** Returns both quotient and remainder as a tuple `(a // b, a % b)`.
- **Number Methods:** `is_integer()`, `as_integer_ratio()`, `hex()`, `fromhex()`.

| Operation | int (3) | float (3.0) | complex (3+0j) |
|-----------|---------|-------------|----------------|
| + 2 | 5 | 5.0 | (5+0j) |
| / 2 | 1.5 (float) | 1.5 | (1.5+0j) |
| // 2 | 1 (int) | 1.0 | TypeError |
| % 2 | 1 | 1.0 | TypeError |

## 4. 💻 Syntax

```python
# Numeric types
a = 10          # int
b = 3.14        # float
c = 2 + 3j      # complex

# Basic operations
print(f"int: {a}, type: {type(a)}")
print(f"float: {b}, type: {type(b)}")
print(f"complex: {c}, type: {type(c)}")

# Converting between types
print(f"\nint(3.9) = {int(3.9)}")       # Truncates: 3
print(f"float(10) = {float(10)}")       # 10.0
print(f"complex(5) = {complex(5)}")     # (5+0j)

# abs, round, pow
print(f"\nabs(-7) = {abs(-7)}")
print(f"round(3.14159, 2) = {round(3.14159, 2)}")
print(f"pow(2, 10) = {pow(2, 10)}")
```

**Output:**
```
int: 10, type: <class 'int'>
float: 3.14, type: <class 'float'>
complex: (2+3j), type: <class 'complex'>

int(3.9) = 3
float(10) = 10.0
complex(5) = (5+0j)

abs(-7) = 7
round(3.14159, 2) = 3.14
pow(2, 10) = 1024
```

**Explanation:** `int(3.9)` truncates toward zero (not rounding). `float(10)` adds a decimal point. `complex(5)` creates `(5+0j)`. `abs()` removes the negative sign. `round()` rounds to the specified decimal places. `pow()` is equivalent to `**` operator.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Calculate the area and circumference of a circle given its radius.

```python
from math import pi

# Circle calculations
radius = 7.5

area = pi * radius ** 2
circumference = 2 * pi * radius

print(f"Radius: {radius}")
print(f"Area: {area:.3f} square units")
print(f"Circumference: {circumference:.3f} units")
print(f"Rounded area: {round(area, 2)}")
```

**Output:**
```
Radius: 7.5
Area: 176.715 square units
Circumference: 47.124 units
Rounded area: 176.71
```

**Explanation:** We import `pi` (3.14159...) from the `math` module. `radius ** 2` squares the radius. `{area:.3f}` formats to 3 decimal places. `round(area, 2)` rounds the area to 2 decimal places. The formula `πr²` for area and `2πr` for circumference are standard.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Use `divmod()`, check if a number is an integer, and explore integer precision.

```python
# divmod: get quotient and remainder
hours_worked = 175
days, remaining_hours = divmod(hours_worked, 8)  # 8-hour work days
print(f"{hours_worked} hours = {days} full days and {remaining_hours} hours")

# Check if a float is actually an integer
a = 10.0
b = 10.5
print(f"\nIs {a} an integer value? {a.is_integer()}")  # True
print(f"Is {b} an integer value? {b.is_integer()}")    # False

# Arbitrary precision integers
big_num = 2 ** 100
print(f"\n2 to the power of 100 = {big_num}")
print(f"Number of digits: {len(str(big_num))}")

# as_integer_ratio for floats
ratio = 0.75
print(f"\n{ratio} as ratio: {ratio.as_integer_ratio()}")  # (3, 4)
```

**Output:**
```
175 hours = 21 full days and 7 hours

Is 10.0 an integer value? True
Is 10.5 an integer value? False

2 to the power of 100 = 1267650600228229401496703205376
Number of digits: 31

0.75 as ratio: (3, 4)
```

**Explanation:** `divmod(175, 8)` returns `(21, 7)` — 21 days of 8 hours, 7 remaining. `is_integer()` checks if a float has no fractional part. `2 ** 100` demonstrates Python's arbitrary-precision integers — this huge number fits in a standard `int`. `as_integer_ratio()` returns the numerator and denominator of the float's exact value.

## 7. 🏢 Real World Use Case

**Financial Services:** At **Goldman Sachs**, Python handles huge integers for transaction IDs (64-bit and beyond) and uses floats for pricing calculations. **Scientific Computing:** **CERN** uses Python's arbitrary-precision integers and floats for particle physics simulations involving massive numbers. **Data Science:** At **Netflix**, Python floats are used for rating calculations (average ratings, weighted scores) and budget allocations. **Game Development:** **Ubisoft** uses Python floats for 3D coordinates, rotation angles, and physics calculations in game engines. **Cryptocurrency:** Python integers (arbitrary precision) are essential for cryptographic operations — RSA keys are 2048-bit numbers that fit naturally in Python's `int` type.

## 8. 🎯 Interview Questions

**Q1:** What is the difference between `int` and `float` in Python?
**A:** `int` stores whole numbers without a decimal point (unlimited precision). `float` stores decimal numbers with a fractional part (double-precision 64-bit, approximately 15-17 significant digits).

**Q2:** How do you convert a string to an integer?
**A:** Use `int("42")` — returns the integer 42. If the string is not a valid number, it raises `ValueError`.

**Q3:** What does `divmod(a, b)` return?
**A:** Returns a tuple `(a // b, a % b)` — the quotient and remainder. Example: `divmod(17, 5)` returns `(3, 2)`.

**Q4:** What is the result of `10 / 3` vs `10 // 3`?
**A:** `10 / 3` returns `3.3333333333333335` (float division — always returns float). `10 // 3` returns `3` (floor division — returns int).

**Q5:** How do you round a float to 2 decimal places?
**A:** Use `round(value, 2)`. Example: `round(3.14159, 2)` returns `3.14`. For formatting output, use f-strings: `f"{value:.2f}"`.

## 9. ⚠ Common Errors / Mistakes

**Error:** `TypeError: can't multiply sequence by non-int of type 'float'` — Trying to multiply a string by a float (repetition operator `*` only works with int).
**Fix:** Convert the float to int first: `"hello" * int(2.5)` (note: truncates to 2).

**Error:** Floating-point precision issues — `0.1 + 0.2 == 0.3` evaluates to `False`.
**Fix:** Use `round()` for comparisons, or use Python's `decimal` module for exact decimal arithmetic.

**Error:** `ValueError: invalid literal for int()` — Trying to convert a non-numeric string to int.
**Fix:** Validate input before conversion, or use a try-except block:
```python
try:
    num = int("abc")  # Raises ValueError
except ValueError:
    print("Not a valid number!")
```

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that adds, subtracts, multiplies, and divides two numbers (10 and 3). Print all results.
2. Write a program that converts a float (e.g., 7.85) to an integer using `int()` and prints both values.
3. Write a program that uses `abs()` to print the absolute value of -15.

**Intermediate:**
4. Write a program that takes a number of seconds (e.g., 3665) and converts it to hours, minutes, and seconds using `divmod()`.
5. Write a program that computes the compound interest: `A = P(1 + r/n)^(nt)` where P=1000, r=0.05, n=12, t=5.
6. Write a program that generates a random number between 1 and 100 using `random.randint()` and prints whether it's odd or even.

**Advanced:**
7. Write a program that checks if a number is a perfect square (e.g., 16 is 4², so it's a perfect square). Use `math.isqrt()`.
8. Write a program that calculates the GCD (Greatest Common Divisor) of two numbers using `math.gcd()`, then prints it along with the prime factorization of each number.
