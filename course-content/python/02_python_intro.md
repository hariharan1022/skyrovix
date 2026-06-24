## 1. Python Introduction

## 2. 📘 Introduction

Python is a powerful, versatile programming language that has taken the tech world by storm. Created by Guido van Rossum in the Netherlands and first released in 1991, Python was designed with a philosophy of simplicity and readability. The name "Python" was inspired by the British comedy group Monty Python — not the snake. Over the past three decades, Python has evolved through multiple versions, with Python 3 (released in 2008) being the current standard. Today, Python is used everywhere: from powering web applications (YouTube, Instagram, Pinterest) to driving scientific research (CERN, NASA), from automating office tasks to building cutting-edge artificial intelligence systems. Its vast collection of libraries — over 200,000 packages on PyPI — means you rarely need to write code from scratch. This introduction will help you understand where Python came from, what makes it special, and where you can apply it in the real world.

## 3. 🧠 Key Concepts

- **History:** Guido van Rossum started Python as a hobby project during Christmas 1989. Python 2.0 released in 2000. Python 3.0 released in 2008 (breaking changes to improve the language).
- **Readability Philosophy:** Python's design follows the Zen of Python — "Beautiful is better than ugly," "Explicit is better than implicit," "Simple is better than complex."
- **Web Development:** Frameworks like Django, Flask, and FastAPI power backend services for millions of users.
- **Data Science & Machine Learning:** Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, and PyTorch make Python the #1 choice for data work.
- **Automation & Scripting:** Python excels at automating repetitive tasks — file processing, web scraping, email handling, system administration.
- **Desktop GUI:** Libraries like Tkinter, PyQt, and Kivy let you build cross-platform desktop applications.
- **Game Development:** Pygame is a popular library for building 2D games.

| Domain | Popular Libraries |
|--------|-------------------|
| Web Dev | Django, Flask, FastAPI |
| Data Science | Pandas, NumPy, Matplotlib |
| AI/ML | TensorFlow, PyTorch, Scikit-learn |
| Automation | Selenium, BeautifulSoup, PyAutoGUI |
| Testing | pytest, unittest, Selenium |

## 4. 💻 Syntax

```python
import this
```

**Explanation:** Running `import this` in Python prints "The Zen of Python" — a collection of 19 guiding principles for writing computer programs in Python. This single line demonstrates Python's philosophy: importing a module gives you immediate access to its contents. The Zen includes principles like "Simple is better than complex" and "Readability counts."

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Print a fun fact about Python's name and version.

```python
# Display Python facts
print("Python was named after Monty Python, not the snake!")
print("Current major version is Python 3.")
print("Python is used by NASA, Google, and Netflix.")
```

**Output:**
```
Python was named after Monty Python, not the snake!
Current major version is Python 3.
Python is used by NASA, Google, and Netflix.
```

**Explanation:** Three `print()` statements output facts about Python. Each line is executed in order from top to bottom. No semicolons or special endings are needed — just clean, readable code.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Check the currently installed Python version using a built-in module.

```python
import sys

# Get Python version information
print("Python version:")
print(sys.version)
print("\nVersion info tuple:")
print(sys.version_info)
```

**Output:**
```
Python version:
3.12.2 (tags/v3.12.2:6d3b4a9, Feb 13 2026, 14:27:01) [MSC v.1937 64 bit (AMD64)]

Version info tuple:
sys.version_info(major=3, minor=12, micro=2, releaselevel='final', serial=0)
```

**Explanation:** We import Python's `sys` module, which provides system-specific parameters and functions. `sys.version` returns a string with full version details. `sys.version_info` returns a named tuple with individual version components (major, minor, micro). The `\n` in the string adds a blank line for cleaner output.

## 7. 🏢 Real World Use Case

**Web Development:** Instagram's entire backend runs on Python using the Django framework, handling billions of daily photo uploads. YouTube uses Python for its backend services. **Data Science:** JP Morgan uses Python for quantitative analysis — processing terabytes of financial data daily. **Automation:** Disney uses Python to automate animation rendering pipelines. **Healthcare:** Python is used in bioinformatics for DNA sequencing analysis. **Education:** MIT, Stanford, and Harvard use Python as the introductory programming language in computer science courses. Companies love Python because it reduces development time — what takes 100 lines in C or Java often takes 5-10 lines in Python.

## 8. 🎯 Interview Questions

**Q1:** Who created Python and when?
**A:** Guido van Rossum created Python. He started working on it in December 1989, and the first version (0.9.0) was released in February 1991.

**Q2:** What are the main application areas of Python?
**A:** Web development (Django, Flask), data science and analytics, artificial intelligence and machine learning, automation and scripting, desktop GUI applications, game development, and scientific computing.

**Q3:** What is PEP 8?
**A:** PEP 8 (Python Enhancement Proposal 8) is Python's official style guide. It covers naming conventions, indentation, line length, whitespace, and code layout to ensure consistent, readable code across the Python community.

**Q4:** Explain the difference between a dynamically typed language and a statically typed language.
**A:** In dynamically typed languages (like Python), variable types are checked at runtime and can change. In statically typed languages (like Java/C++), types are checked at compile time and must be declared. Example:
```python
# Dynamic typing
x = 5        # x is int
x = "hello"  # x is now str — no error
```

**Q5:** What is the difference between a framework and a library?
**A:** A library is a collection of functions you call from your code (you control the flow). A framework provides a structure where your code fits in (the framework controls the flow — "inversion of control"). Django is a framework; Requests is a library.

## 9. ⚠ Common Errors / Mistakes

**Error:** `ImportError: No module named 'xyz'` — Trying to import a module that isn't installed.
**Fix:** Install it using `pip install xyz`. Verify the module name spelling matches.

**Error:** `IndentationError: unexpected indent` — Mixing tabs and spaces or inconsistent indentation.
**Fix:** Use 4 spaces consistently. Never mix tabs with spaces.

**Error:** Running Python 2 code on Python 3 (e.g., `print "hello"` without parentheses).
**Fix:** Always use `print()` as a function (Python 3 syntax). Check your Python version with `python --version`.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that prints three different fields where Python is commonly used.
2. Write a program that prints the Zen of Python by importing the `this` module.
3. Write a program that prints your name, the current year, and a statement about why you want to learn Python.

**Intermediate:**
4. Write a program that imports the `sys` module and prints only the major and minor version numbers.
5. Write a program that uses the `platform` module's `python_version()` function to print the Python version.
6. Write a program that prints a table showing three Python libraries and what they are used for (format the output neatly).

**Advanced:**
7. Write a program that imports `math` and prints the value of pi, Euler's number, and the square root of 2 — all rounded to 4 decimal places.
8. Write a program that uses the `datetime` module to print today's date and the current time in the format "YYYY-MM-DD HH:MM:SS".
