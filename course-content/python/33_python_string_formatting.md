# 33. Python String Formatting

## 📘 Introduction

String formatting is the process of dynamically embedding values into strings to create readable, dynamic output. Python provides four distinct approaches to string formatting, each with different strengths. The oldest method uses `%`-formatting (similar to C's `printf`). The `str.format()` method, introduced in Python 2.6, offers positional and keyword argument placement. F-strings (formatted string literals), added in Python 3.6, provide the most concise and readable syntax by allowing inline expressions within `{}` directly in string literals. Template strings from the `string` module offer a simpler, safer alternative with `$`-based substitution. Additionally, format specifiers control precision, width, alignment, padding, and number formatting (e.g., `:.2f` for two decimal places). Choosing the right formatting approach improves code readability, maintainability, and performance.

## 🧠 Key Concepts

- **%-formatting**: Old-style formatting using `%s` (string), `%d` (integer), `%f` (float) placeholders
- **.format() method**: Calls `"template".format(values)` using `{}` as placeholders; supports positional `{0}` and keyword `{name}` arguments
- **F-strings**: Literal strings prefixed with `f` or `F` allowing `{expression}` directly inside the string
- **Format specifiers**: Controls formatting via `:`, e.g., `:.2f` (2 decimal places), `:>10` (right-align width 10)
- **Fill and alignment**: `:[fill][align][width]` — `<` left, `>` right, `^` center, `=` pad after sign
- **Template strings**: `string.Template` with `$variable` or `${variable}` substitution; safer for user-supplied templates

| Method | Syntax | Example |
|--------|--------|---------|
| %-formatting | `"%s %d" % (val1, val2)` | `"Name: %s, Age: %d" % ("Alice", 30)` |
| .format() | `"{} {}".format(a, b)` | `"{} is {} years old".format("Bob", 25)` |
| F-strings | `f"{var}"` | `f"{name} is {age} years old"` |
| Template | `string.Template("$var")` | `Template("$name is $age").substitute(name="Cara", age=35)` |

## 💻 Syntax

```python
# 1. %-formatting (old style)
name = "Alice"
age = 30
print("Name: %s, Age: %d" % (name, age))
print("Pi: %.3f" % 3.14159)        # 3 decimal places

# 2. .format() method
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, Age: {1}".format(name, age))   # positional
print("Name: {n}, Age: {a}".format(n=name, a=age))  # keyword
print("Pi: {:.3f}".format(3.14159))               # format spec

# 3. F-strings (Python 3.6+) — recommended
print(f"Name: {name}, Age: {age}")
print(f"Pi: {3.14159:.3f}")
print(f"{'hello':>10}")             # right-aligned in width 10
print(f"{'hello':^10}")             # centered in width 10
print(f"{'hello':-<10}")            # left-aligned, fill with -
print(f"{42:010d}")                  # zero-padded to width 10
```

Line-by-line explanation:
- `"%s, %d" % (name, age)` — `%s` substitutes a string, `%d` substitutes an integer; values are provided in a tuple
- `"{} {}".format(a, b)` — empty `{}` are replaced by arguments in order
- `{0}` and `{1}` — positional indices specify which argument to use; useful for repeating values
- `{n}` and `{a}` — keyword arguments are referenced by name, improving readability
- `f"{name}"` — the `f` prefix makes it an f-string; variables and expressions in `{}` are evaluated inline
- `{3.14159:.3f}` — the format spec after `:`: `.3f` means 3 digits after the decimal point
- `{'hello':>10}` — `>` is right-align within a minimum width of 10 characters
- `{42:010d}` — `0` fills leading zeros, `10` is minimum width, `d` is integer type

## ✅ Example 1 - Basic: Formatting a Report Table

**Problem**: You need to print a neatly aligned sales report with product names, quantities, and prices. Each column should be properly padded and prices should show two decimal places.

**Code**:
```python
products = [
    ("Laptop", 5, 1299.99),
    ("Mouse", 23, 29.50),
    ("Monitor", 8, 399.99),
    ("Keyboard", 15, 89.99),
]

print(f"{'Product':<12} {'Qty':<6} {'Price':<8} {'Total':<8}")
print("=" * 34)

for name, qty, price in products:
    total = qty * price
    print(f"{name:<12} {qty:<6} {price:<8.2f} {total:<8.2f}")
```

**Output**:
```
Product      Qty    Price    Total
==================================
Laptop       5      1299.99  6499.95
Mouse        23     29.50    678.50
Monitor      8      399.99   3199.92
Keyboard     15     89.99    1349.85
```

**Explanation**: The f-string format specifiers control alignment and width. `{name:<12}` left-aligns the product name within a 12-character column. `{price:<8.2f}` formats the price as a float with exactly 2 decimal places, left-aligned in an 8-character field. The `<` character means left-align, `>` means right-align. The column headers use the same widths for perfect alignment. This demonstrates the most common use case for format specifiers — creating formatted tables and reports.

## 🚀 Example 2 - Intermediate: Dynamic Formatting with Expressions and Conversions

**Problem**: Display user profile information that includes dynamically computed values, percentage formatting, and conditional text using f-string expressions.

**Code**:
```python
def display_profile(username, score, max_score, login_count):
    percentage = (score / max_score) * 100
    bar_filled = "█" * int(percentage / 10)
    bar_empty = "░" * (10 - int(percentage / 10))

    profile = f"""
    ┌─────────────────────────────────────
    │ User:     {username:<15}
    │ Score:    {score:,}/{max_score:,}  ({percentage:.1f}%)
    │ Progress: |{bar_filled}{bar_empty}| {percentage:.0f}%
    │ Logins:   {login_count}
    │ Status:   {"⭐ VIP" if percentage > 80 else "Regular"}
    └─────────────────────────────────────
    """
    print(profile)

display_profile("alice_wonder", 8750, 10000, 142)
```

**Output**:
```
    ┌─────────────────────────────────────
    │ User:     alice_wonder
    │ Score:    8,750/10,000  (87.5%)
    │ Progress: |████████░░| 88%
    │ Logins:   142
    │ Status:   ⭐ VIP
    └─────────────────────────────────────
```

**Explanation**: This example shows the power of f-string expressions. `{score:,}` uses the comma format specifier to add thousands separators. The progress bar is built dynamically using integer arithmetic and string repetition. The ternary expression `"⭐ VIP" if percentage > 80 else "Regular"` is evaluated inline inside the f-string. F-strings accept any valid Python expression inside `{}`, including function calls, arithmetic, list comprehensions, and conditional expressions, making them extremely powerful for generating formatted output.

## 🏢 Real World Use Case

**GitHub** uses Python string formatting extensively in their backend systems to generate dynamic content. When rendering pull request summaries, they use f-strings to embed branch names, commit counts, file change statistics, and reviewer information into templated messages. **Jupyter** (Project Jupyter) relies on string formatting for rendering notebook outputs, including formatted numeric data with configurable precision and alignment in data science workflows. **Django** uses format specifiers extensively in its template engine and in the `django.utils.formats` module for locale-aware number and date formatting. Their `localize` filter uses Python's format specifiers under the hood to display numbers with correct decimal and thousand separators for different locales. **Palantir** uses f-string-based logging in their data pipeline systems to embed computed metrics, timestamps, and record counts into structured log messages without sacrificing readability.

## 🎯 Interview Questions

**Q1: What are the advantages of f-strings over `.format()` and %-formatting?**
A: F-strings are more concise because variables and expressions are written directly inside `{}` in the string literal, eliminating the need to pass them separately. They execute at runtime with minimal overhead (they're evaluated as expressions, not method calls). F-strings also support arbitrary Python expressions, including function calls and inline conditionals. The `.format()` method is more flexible when the template string comes from a variable (not a literal), and %-formatting is useful for logging (where lazy evaluation matters) and for legacy code compatibility.

**Q2: How do you include a literal curly brace `{` or `}` in an f-string?**
A: Use double curly braces `{{` and `}}`. Each pair of double braces produces a single literal brace in the output. For example, `f"{{hello}}"` produces `{hello}`. Triple braces `{{{var}}}` produce a single brace followed by the value of `var`. This escaping is necessary because single `{` and `}` are interpreted as the start/end of expressions.

**Q3: What are format specifiers and what components do they support?**
A: Format specifiers follow a colon `:` inside the placeholder. The general syntax is `[[fill]align][sign][#][0][width][grouping][.precision][type]`. Align can be `<` (left), `>` (right), `^` (center), or `=` (pad after sign). Width sets minimum field width. Precision for floats is `.N`. Type can be `d` (integer), `f` (float), `e` (scientific), `%` (percentage), etc. For example, `{value:>+10.2f}` means right-align, show sign, width 10, 2 decimal places, float.

**Q4: When would you use `string.Template` instead of f-strings or `.format()`?**
A: `string.Template` is safer when the template string comes from an untrusted source (user input, config files) because it uses a simpler `$var` syntax with no expression evaluation. There is no risk of arbitrary code execution since `string.Template` only substitutes variables, not expressions. It is also useful when the template needs to be stored in a file or database and you want to limit what can be embedded. However, it is less powerful than f-strings or `.format()`.

**Q5: How do you format a number as a percentage in Python?**
A: Multiply the decimal by 100 and add a `%` sign, or use the `%` format type: `f"{0.875:.1%}"` produces `"87.5%"`. The `%` type automatically multiplies by 100 and adds the percent sign. You can control decimal places: `:.1%` for one decimal, `:.2%` for two. For `.format()`, use `"{:.1%}".format(0.875)`. For %-formatting, use `"%.1f%%" % (87.5,)` (manual multiplication and `%%` for literal `%`).

## ⚠ Common Errors / Mistakes

**Error 1: Mismatching placeholder count in %-formatting**
```python
# Wrong: too many or too few values
# print("Name: %s, Age: %d" % ("Alice", 30, "Extra"))  # TypeError
# print("Name: %s, Age: %d" % ("Alice",))              # TypeError

# Correct: match placeholders and values
print("Name: %s, Age: %d" % ("Alice", 30))
```

**Error 2: Forgetting the `f` prefix on f-strings**
```python
name = "Alice"
# Wrong: no f prefix — prints literal {name}
print("{name}")          # Output: {name}

# Correct: f prefix evaluates the variable
print(f"{name}")         # Output: Alice
```

**Error 3: Using `%` formatting with a single value without wrapping in a tuple**
```python
# Wrong: single string needs a trailing comma to make it a tuple
# print("Hello %s" % name)     # Works for strings, fails for tuples

# Wrong for tuples
data = (1, 2, 3)
# print("Data: %s" % data)     # Prints "(1, 2, 3)" as a single string

# Correct: wrap in single-element tuple
print("Name: %s" % (name,))    # Trailing comma creates a tuple
```

## 📝 Practice Exercises

**Beginner:**
1. Create variables for your name, age, and height. Use all three formatting methods (%, .format(), f-strings) to print a sentence about yourself.
2. Format the number `1234.56789` to show: (a) 2 decimal places, (b) scientific notation, (c) as a percentage, (d) comma-separated with 1 decimal place.
3. Write a program that prints a multiplication table (1-10) with right-aligned columns of width 4.

**Intermediate:**
4. Build a CSV-to-table formatter that reads a CSV string and prints it as a neatly aligned table using f-string format specifiers with dynamic column widths based on the longest value in each column.
5. Create a currency formatter function that takes a number and returns a formatted string like `"$1,234.56"` for USD, `"€1.234,56"` for EUR (European style), and `"¥1,235"` for JPY (no decimals).
6. Write a progress bar generator function that accepts current value, total value, bar width, and optional fill character, and returns a string like `"[███████░░░] 70%"` using f-string expressions.

**Advanced:**
7. Implement a custom string formatter class that extends `string.Formatter` to support a custom format spec (e.g., `:ordinal` for `1st`, `2nd`, `3rd`, or `:pluralize` for `"1 apple"` vs `"5 apples"`).
8. Build a template engine that reads a template file with `${variable}` placeholders (like `string.Template`) but also supports fallback defaults (`${var|default_value}`) and basic conditionals using only string formatting methods.
