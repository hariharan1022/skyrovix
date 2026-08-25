## 1. Python Syntax

## 2. 📘 Introduction

Python's syntax is designed to be clean, readable, and intuitive — it almost looks like plain English. Unlike many other programming languages that use curly braces `{}` to define blocks of code, Python uses **indentation** (whitespace at the beginning of lines) to group statements together. This forces you to write well-formatted, readable code by default. In this section, you'll learn the fundamental rules of Python syntax: how statements are structured, how indentation defines code blocks, how to write multi-line statements, and how to group multiple statements on one line. You'll also get a brief introduction to comments (covered in detail later). Mastering Python's syntax rules is essential because even a single space out of place can cause errors. The good news: once you learn Python's syntax, you'll find it cleaner and more logical than most other languages.

## 3. 🧠 Key Concepts

- **Indentation:** Python uses 4 spaces (by convention) to indicate a block of code. This replaces `{}` in other languages.
- **Statements:** A unit of code that Python can execute. Usually one statement per line.
- **Line Continuation:** Use a backslash `\` to split a long statement across multiple lines.
- **Multiple Statements on One Line:** Separate with semicolons `;` (discouraged for readability).
- **Blocks:** Groups of statements that are executed together under a control structure (if, for, while, function).
- **Case Sensitivity:** Python is case-sensitive — `name` and `Name` are different variables.
- **Whitespace Inside Statements:** Spaces inside parentheses, brackets, and around operators improve readability.

| Concept | Python | Other Languages (C, Java) |
|---------|--------|---------------------------|
| Block delimiters | Indentation (4 spaces) | Curly braces `{}` |
| End of statement | Newline | Semicolon `;` |
| Line continuation | Backslash `\` or implicit | Semicolon for multiple |

## 4. 💻 Syntax

```python
if 5 > 2:
    print("Five is greater than two!")  # This line is indented (4 spaces)
    print("Both lines are inside the if block.")
print("This line is outside the if block.")
```

**Explanation:** The `if` statement checks if 5 > 2 (which is True). The indented lines (preceded by 4 spaces) form the block that runs if the condition is true. The last `print()` has no indentation, so it always runs. Python will raise an `IndentationError` if your indentation is inconsistent.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Demonstrate correct indentation and the error caused by incorrect indentation.

```python
# Correct indentation
if 10 > 5:
    print("10 is greater than 5")
    print("This is inside the if block")
print("This is outside the if block")
```

**Output:**
```
10 is greater than 5
This is inside the if block
This is outside the if block
```

**Explanation:** The two indented `print()` calls are inside the `if` block — they only execute if the condition is true. The last `print()` has no indent, so it belongs to the main program and always runs.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Demonstrate line continuation, multiple statements on one line, and implicit line joining.

```python
# Line continuation with backslash
total = 10 + 20 + 30 + \
        40 + 50 + 60
print("Total using backslash continuation:", total)

# Multiple statements on one line (not recommended, but possible)
x = 5; y = 10; z = x + y
print("Sum using inline statements:", z)

# Implicit line joining inside parentheses
names = ["Alice",
         "Bob",
         "Charlie",
         "Diana"]
print("Names list:", names)
```

**Output:**
```
Total using backslash continuation: 210
Sum using inline statements: 15
Names list: ['Alice', 'Bob', 'Charlie', 'Diana']
```

**Explanation:** Backslash `\` continues a statement to the next line. Semicolons let you write multiple statements on one line (avoid this in real code). Inside parentheses `()`, `[]`, or `{}`, you can split lines without backslash — this is called implicit line joining and is the preferred approach.

## 7. 🏢 Real World Use Case

Python's indentation-based syntax is a key reason companies adopt it. **Facebook (Meta)** enforces strict PEP 8 compliance in their Python codebases — code reviews check for proper 4-space indentation. **Google's Python Style Guide** mandates 4-space indentation and 80-character line limits. In practice, teams use linters like `flake8` or `pylint` to automatically check syntax and style. At **Spotify**, data science teams write Python scripts with complex conditional logic — consistent indentation ensures the logic is visually clear and bugs are easy to spot. The auto-formatting tool `black` is widely used across the industry to automatically enforce consistent syntax and indentation, eliminating debates about formatting in code reviews.

## 8. 🎯 Interview Questions

**Q1:** How does Python define code blocks?
**A:** Python uses indentation (whitespace) to define code blocks. All statements with the same indentation level belong to the same block. The standard is 4 spaces per indentation level.

**Q2:** What happens if you mix tabs and spaces in Python?
**A:** Python 3 raises an `IndentationError: inconsistent use of tabs and spaces in indentation`. Never mix tabs and spaces — always use spaces (configure your editor to convert tabs to spaces).

**Q3:** Is Python case-sensitive? Give an example.
**A:** Yes. `name`, `Name`, and `NAME` are three different variables. `If` (uppercase) is not the same as `if` (lowercase keyword).

**Q4:** How can you write a long statement over multiple lines in Python?
**A:** Three ways: (1) Backslash `\` at line end, (2) implicit joining inside `()`, `[]`, or `{}`, (3) string concatenation with adjacent string literals.

**Q5:** Can you write multiple statements on one line in Python?
**A:** Yes, by separating them with semicolons: `x = 1; y = 2; print(x + y)`. However, this reduces readability and is strongly discouraged by PEP 8.

## 9. ⚠ Common Errors / Mistakes

**Error:** `IndentationError: expected an indented block` — You used a colon (`:`), so Python expects indented code after it, but found none.
**Fix:** Press Tab or 4 spaces after any line ending with a colon (`if:`, `for:`, `while:`, `def:`, `class:`).

**Error:** `IndentationError: unindent does not match any outer indentation level` — You removed indentation incorrectly.
**Fix:** Ensure all lines in a block have exactly the same indentation. Use the same number of spaces throughout.

**Error:** Inconsistent indentation in nested blocks.
```python
if True:
    print("Level 1")
      print("Level 2 - wrong")  # 6 spaces instead of 4
```
**Fix:** Use a consistent number of spaces (always 4) for each indentation level.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program with an `if` statement that prints "Coding is fun!" if 20 > 10. Use proper indentation.
2. Write two print statements inside an `if` block and one outside. Verify the output.
3. Fix the following code (don't run it — spot the error):
```python
if 3 > 1:
print("Three is greater than one")
```

**Intermediate:**
4. Write a program that uses implicit line joining inside parentheses to print a long message split across 3 lines.
5. Write a program that uses backslash continuation to add 5 numbers across 2 lines and prints the sum.
6. Write a program using a semicolon to assign three variables on one line and print their average.

**Advanced:**
7. Write a nested block: an `if` inside another `if`, each with 2 print statements. Ensure correct indentation at each level.
8. Write a program that demonstrates both correct and incorrect line continuation — intentionally show what causes a `SyntaxError`.
