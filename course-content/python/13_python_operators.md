# 13. Python Operators

## 📘 Introduction
Operators in Python are special symbols (or keywords) that perform operations on values and variables. Python provides a rich set of operators categorized into seven groups. **Arithmetic operators** handle mathematical computations: addition (`+`), subtraction (`-`), multiplication (`*`), true division (`/`), floor division (`//`), modulo (`%`), and exponentiation (`**`). **Comparison operators** compare values and return Booleans: `==`, `!=`, `<`, `>`, `<=`, `>=`. **Logical operators** (`and`, `or`, `not`) combine Boolean expressions with short-circuit evaluation. **Assignment operators** (`=`, `+=`, `-=`, etc.) assign and optionally compute in one step. **Identity operators** (`is`, `is not`) check object identity, not value. **Membership operators** (`in`, `not in`) test whether a value exists in a sequence. **Bitwise operators** (`&`, `|`, `^`, `~`, `<<`, `>>`) operate on integer bits. Understanding operator precedence is critical for writing correct expressions.

## 🧠 Key Concepts

- **Arithmetic**: `+` `-` `*` `/` (float result), `//` (integer floor division), `%` (remainder), `**` (power)
- **Comparison**: Return `bool` values. Can be chained: `a < b < c` works natively
- **Logical**: `and`, `or`, `not`. `and`/`or` return not necessarily bool — they return the last-evaluated operand
- **Assignment**: `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`, `&=`, `|=`, `^=`, `<<=`, `>>=`
- **Identity**: `is` checks if two variables reference the same object in memory; `is not` is the negation
- **Membership**: `in` checks if a value exists in an iterable; `not in` is the negation
- **Bitwise**: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT/ones complement), `<<` (left shift), `>>` (right shift)
- **Operator Precedence**: `**` > `~` `+` `-` (unary) > `*` `/` `//` `%` > `+` `-` (binary) > `<<` `>>` > `&` > `^` > `|` > comparisons > `not` > `and` > `or`
- **Overloading**: Operators can be overridden in custom classes via dunder methods (`__add__`, `__eq__`, etc.)

## 💻 Syntax

```python
# Arithmetic
a, b = 10, 3
print(a + b)    # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.3333... (float)
print(a // b)   # 3 (floor division)
print(a % b)    # 1 (remainder)
print(a ** b)   # 1000 (10^3)

# Comparison
print(5 == 5)   # True
print(5 != 3)   # True
print(3 < 5)    # True
print(3 <= 3)   # True
# Chaining
print(1 < 3 < 5)   # True
print(1 < 3 > 5)   # False

# Logical
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
# Short-circuit returns operand
print(0 and 42)   # 0
print(0 or 42)    # 42

# Assignment
x = 5
x += 3    # x = 8
x *= 2    # x = 16

# Identity
a = [1, 2]
b = [1, 2]
print(a is b)    # False (different objects)
print(a == b)    # True (same value)

# Membership
print(3 in [1, 2, 3])    # True
print("x" not in "hello")  # True

# Bitwise
print(5 & 3)    # 1 (0101 & 0011 = 0001)
print(5 | 3)    # 7 (0101 | 0011 = 0111)
print(5 ^ 3)    # 6 (0101 ^ 0011 = 0110)
print(~5)       # -6 (inverts all bits)
print(5 << 1)   # 10 (0101 -> 1010)
print(5 >> 1)   # 2 (0101 -> 0010)
```

## ✅ Example 1 - Basic

**Problem**: Calculate the total price of items after tax and discount using arithmetic operators.

**Code**:
```python
price = 49.99
quantity = 3
tax_rate = 0.08
discount = 5.00

subtotal = price * quantity
after_discount = subtotal - discount
total = after_discount + (after_discount * tax_rate)

print(f"Subtotal: ${subtotal:.2f}")
print(f"After discount: ${after_discount:.2f}")
print(f"Total (incl. tax): ${total:.2f}")
```

**Output**:
```
Subtotal: $149.97
After discount: $144.97
Total (incl. tax): $156.57
```

**Explanation**: Arithmetic operators compute the subtotal (`*`), apply discount (`-`), and add tax (`*` then `+`). The `+=` assignment operator could also be used to accumulate totals. This is a typical e-commerce pricing calculation.

## 🚀 Example 2 - Intermediate

**Problem**: Use bitwise operators to check if a number is a power of two, and membership operators to validate password rules.

**Code**:
```python
def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

def validate_password(pwd: str) -> bool:
    has_upper = any(c.isupper() for c in pwd)
    has_digit = any(c.isdigit() for c in pwd)
    has_special = any(c in "!@#$%^&*" for c in pwd)
    return has_upper and has_digit and has_special

# Test power of two
for n in [1, 2, 3, 4, 16, 18]:
    print(f"{n}: power_of_two={is_power_of_two(n)}")

# Test password
print(validate_password("Hello123!"))  # True
print(validate_password("hello!"))     # False
```

**Output**:
```
1: power_of_two=True
2: power_of_two=True
3: power_of_two=False
4: power_of_two=True
16: power_of_two=True
18: power_of_two=False
True
False
```

**Explanation**: The bitwise trick `n & (n-1) == 0` works because any power of two has exactly one bit set; subtracting 1 flips that bit and all lower bits, making the AND zero. Membership operators `in` and `any()` check if any character satisfies the condition.

## 🏢 Real World Use Case

**Company**: Bloomberg / Financial Services

**Scenario**: Financial systems use arithmetic operators for pricing calculations, risk metrics (Value-at-Risk computations with `**` and `*`), and portfolio valuation. Comparison operators drive trading algorithms: `if bid_price >= ask_price: execute_trade()`. Logical operators combine market conditions: `if trend == "up" and volume > threshold and not halted:`. Bitwise operators are used in low-level network packet parsing for market data feeds (e.g., encoding/decoding FIX protocol flags). Membership operators check if a stock ticker is in a watchlist: `if "AAPL" in portfolio:`.

## 🎯 Interview Questions

**1. What is the difference between `/` and `//`?**
`/` performs true division and always returns a `float`. `//` performs floor division and returns an `int` if both operands are `int`, truncating toward negative infinity (e.g., `-3 // 2` = `-2`, not `-1`).

**2. How does `is` differ from `==`?**
`==` compares value equality (calls `__eq__()`). `is` compares object identity (memory address). `a is b` is `True` only when `a` and `b` reference the exact same object. Small integers and strings may be interned, making `is` return `True` for equal values, but this is an implementation detail.

**3. Explain short-circuit evaluation with `and` and `or`.**
`and` returns the first falsy operand without evaluating the rest; if all are truthy, it returns the last operand. `or` returns the first truthy operand without evaluating the rest; if all are falsy, it returns the last operand. This enables idioms like `value = user_input or "default"`.

**4. What does `3 * (2 + 4) ** 2` evaluate to? Walk through operator precedence.**
First, parentheses: `(2+4) = 6`. Then exponentiation: `6 ** 2 = 36`. Then multiplication: `3 * 36 = 108`. Python follows PEMDAS with `**` before `*`.

**5. How can you overload an operator in a custom class?**
Define dunder methods: `__add__` for `+`, `__eq__` for `==`, `__lt__` for `<`, `__contains__` for `in`, etc. Example: `def __add__(self, other): return Vector(self.x + other.x, self.y + other.y)`.

## ⚠ Common Errors / Mistakes

**Error**: Using `=` instead of `==` in conditions
```python
if x = 5:   # SyntaxError
```
**Fix**: Use `==` for comparison. Some languages allow this; Python does not deliberately to prevent bugs.

**Error**: `//` with negative numbers
```python
print(-7 // 3)   # -3 (not -2!)
```
**Fix**: Floor division rounds **down** (toward negative infinity). `-7 // 3` is `-3`. Use `int(-7 / 3)` if you want truncation toward zero (`-2`).

**Error**: Floating-point precision with `==`
```python
0.1 + 0.2 == 0.3   # False!
```
**Fix**: Use `round()` or `math.isclose()`: `abs((0.1 + 0.2) - 0.3) < 1e-9`

**Error**: Using `is` for value comparison with immutable types
```python
a = 256
b = 256
a is b  # True (interned)
c = 257
d = 257
c is d  # False (not interned, implementation-specific)
```
**Fix**: Always use `==` for value comparison.

**Error**: Forgetting operator precedence
```python
result = 5 + 3 * 2   # 11, not 16!
```
**Fix**: Use parentheses for clarity: `(5 + 3) * 2 = 16`

## 📝 Practice Exercises

**Beginner:**

1. Write a program that takes two numbers and prints their sum, difference, product, quotient (float), floor quotient, and remainder.
2. Ask the user for their age and use comparison operators to print whether they are eligible to vote (age >= 18).
3. Write a script that checks if two user-provided strings are equal (case-insensitive).

**Intermediate:**

4. Use the modulo operator to print all numbers from 1 to 50 that are divisible by both 3 and 5 (FizzBuzz variation).
5. Write a function `is_palindrome(n)` that checks if an integer is a palindrome using arithmetic operators only (no string conversion).
6. Use bitwise operators to count the number of set bits (1s) in the binary representation of an integer.

**Advanced:**

7. Implement a simple 2D vector class with overloaded operators `+`, `-`, `*` (scalar multiplication), `==`, and `__repr__`.
8. Write a function `evaluate(expression)` that parses a simple arithmetic expression string (e.g., `"3 + 5 * 2"`) and evaluates it using correct operator precedence, supporting `+`, `-`, `*`, `/`, and parentheses.
