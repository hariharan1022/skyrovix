## 1. Python Output

## 2. 📘 Introduction

The `print()` function is your window to the outside world in Python — it's how your programs communicate results to you. Whether you're debugging code, presenting data to a user, or logging information, `print()` is the fundamental output tool. In this section, you'll master the `print()` function beyond simple text display. You'll learn how to print multiple items in a single call, change the separator between items (`sep`), control what appears at the end of each print statement (`end`), format numbers and strings neatly, and use f-strings (Python's modern string formatting). Understanding output formatting is crucial because real programs rarely print simple messages — they display tables, progress bars, formatted reports, and structured data. By the end of this module, you'll be able to produce clean, professional-looking output from your Python programs.

## 3. 🧠 Key Concepts

- **`print()` function:** Built-in function that outputs text to the console (standard output).
- **`sep` parameter:** Specifies the separator between multiple items (default is a space `" "`).
- **`end` parameter:** Specifies what is printed at the end (default is newline `\n`).
- **Multiple items:** Pass items separated by commas — `print("Hello", "World")`.
- **String formatting:** f-strings (`f"..."`), `.format()`, and `%`-formatting.
- **f-strings:** Embed expressions inside strings using curly braces — `f"My name is {name}"`.
- **Escape sequences:** Special characters like `\n` (newline), `\t` (tab), `\\` (backslash).

| Parameter | Default | Purpose |
|-----------|---------|---------|
| `sep` | `" "` (space) | Separator between multiple arguments |
| `end` | `"\n"` (newline) | Appended after the last value |
| `file` | `sys.stdout` | Output destination (console, file) |
| `flush` | `False` | Force-flush the output buffer |

## 4. 💻 Syntax

```python
# Basic print with multiple items
print("Hello", "World", 2026, sep=" - ", end="!!!")

# f-string for formatted output
name = "Hari"
score = 95
print(f"Student: {name}, Score: {score}/100")
```

**Output:**
```
Hello - World - 2026!!!
Student: Hari, Score: 95/100
```

**Explanation:** The first line prints three items separated by `" - "` instead of the default space, and ends with `"!!!"` instead of a newline. The second line uses an f-string (prefix `f`) to embed the variables `name` and `score` directly inside the string using `{}` placeholders.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Print a shopping list with custom formatting.

```python
# Shopping list with formatted output
item1 = "Apples"
item2 = "Bananas"
item3 = "Milk"
price1 = 2.50
price2 = 1.20
price3 = 3.00

print("=== SHOPPING LIST ===")
print(f"1. {item1:10} ${price1:.2f}")
print(f"2. {item2:10} ${price2:.2f}")
print(f"3. {item3:10} ${price3:.2f}")
total = price1 + price2 + price3
print(f"\nTotal: ${total:.2f}")
```

**Output:**
```
=== SHOPPING LIST ===
1. Apples     $2.50
2. Bananas    $1.20
3. Milk       $3.00

Total: $5.70
```

**Explanation:** `{item1:10}` right-aligns the item name in a 10-character wide column. `{price1:.2f}` formats the price as a floating-point number with exactly 2 decimal places. `\n` adds a blank line before the total. The columns line up neatly for a professional appearance.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Print a multiplication table using `sep` and `end` parameters.

```python
# Multiplication table for 5 using sep and end
number = 5

print(f"Multiplication Table for {number}\n")
print("=" * 25)

for i in range(1, 11):
    print(f"{number} x {i:2}", end=" = ")
    print(f"{number * i:3}")
```

**Output:**
```
Multiplication Table for 5

=========================
5 x  1 =   5
5 x  2 =  10
5 x  3 =  15
5 x  4 =  20
5 x  5 =  25
5 x  6 =  30
5 x  7 =  35
5 x  8 =  40
5 x  9 =  45
5 x 10 =  50
```

**Explanation:** `end=" = "` replaces the newline with " = " so the next `print()` continues on the same line. `{i:2}` and `{number * i:3}` use width specifiers to align numbers. `"=" * 25` repeats the equals sign 25 times to create a separator line. The `range(1, 11)` loops from 1 to 10.

## 7. 🏢 Real World Use Case

**Logging and Monitoring:** At **Netflix**, Python scripts process millions of log entries daily. Custom `print()` statements with timestamps and severity levels help engineers trace issues. **Data Science:** At **JP Morgan**, data scientists use formatted output (via f-strings and `pandas` display options) to present financial tables in the terminal during analysis. **CLI Tools:** The `pip` package manager (written in Python) uses carefully formatted `print()` output with colors, progress bars, and tables. **DevOps:** At **Amazon**, deployment scripts use `print()` with `end=""` to show progress (e.g., "Installing... Done"). Companies often replace basic `print()` with logging libraries (`logging` module) for production systems, but `print()` remains essential for quick scripts and debugging.

## 8. 🎯 Interview Questions

**Q1:** What does the `sep` parameter in `print()` do?
**A:** `sep` sets the separator between multiple arguments. Default is a space. Example: `print("a", "b", "c", sep="-")` outputs `a-b-c`.

**Q2:** How do you print without a newline at the end?
**A:** Use the `end` parameter: `print("Hello", end="")`. The next `print()` will continue on the same line.

**Q3:** What are f-strings and how do you use them?
**A:** f-strings (formatted string literals) let you embed expressions inside string literals using `{}`. Prefix the string with `f` or `F`. Example: `f"Result: {10 + 20}"`.

**Q4:** How do you format a float to 2 decimal places in an f-string?
**A:** Use `{value:.2f}` inside the f-string. Example: `price = 19.995; print(f"${price:.2f}")` outputs `$20.00`.

**Q5:** What is the difference between `print()` and `sys.stdout.write()`?
**A:** `print()` is higher-level — it adds a newline by default, handles multiple arguments, and supports `sep`/`end`. `sys.stdout.write()` is lower-level — it writes exactly what you give it without adding anything.

## 9. ⚠ Common Errors / Mistakes

**Error:** `SyntaxError: f-string: unmatched '('` — Forgetting to close a parenthesis or bracket inside an f-string expression.
**Fix:** Always ensure opening/closing delimiters match inside `{}`. Example: `f"Value: {(2 + 3}"` is wrong; use `f"Value: {2 + 3}"`.

**Error:** Printing a number concatenated with a string using `+` — `print("Age: " + 25)` raises `TypeError`.
**Fix:** Convert to string: `print("Age: " + str(25))` or use f-string: `print(f"Age: {25}")`.

**Error:** `UnicodeEncodeError` when printing special characters on some terminals.
**Fix:** Ensure your terminal supports UTF-8, or use ASCII-safe alternatives. In scripts, set `PYTHONIOENCODING=utf-8`.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that prints your name, age, and city using a single `print()` with commas.
2. Write a program that prints three fruits separated by ` | ` using the `sep` parameter.
3. Write a program that prints "Loading" followed by "..." on the same line using `end`.

**Intermediate:**
4. Write a program that prints a user's name and score formatted as "Player: Alice | Score: 85/100" using an f-string.
5. Write a program that prints numbers 1 through 5 on the same line separated by commas, without a trailing newline.
6. Write a program that prints a right-aligned table of 3 items with their prices formatted to 2 decimal places.

**Advanced:**
7. Write a program that prints a countdown from 10 to 1, each number on the same line separated by `...`, and then prints "Go!".
8. Write a program that uses `print()` with `sep` and `end` together to print the letters A, B, C, D on one line separated by ` -> ` and ending with ` -> END`.
