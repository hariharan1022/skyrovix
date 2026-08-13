## 1. Python HOME

## 2. 📘 Introduction

Welcome to the Python course — your first step into the world of programming. Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum and first released in 1991, Python has grown into one of the most popular languages worldwide. This course is structured for absolute beginners with zero coding experience. You will learn Python step-by-step — from basic syntax to real-world applications. By the end of this pathway, you will have built practical projects, solved real problems, and gained the confidence to write Python code independently. Whether you want to build websites, analyze data, automate tasks, or explore artificial intelligence, Python is the perfect starting point. This module gives you a bird's-eye view of what Python is, why it matters, and what you will build as you progress through the Skyrovix Pathway.

## 3. 🧠 Key Concepts

- **What is Python?** — A general-purpose, high-level programming language focused on code readability.
- **Interpreted Language** — Python code runs line-by-line without needing compilation.
- **Dynamically Typed** — You don't need to declare variable types; Python infers them.
- **Cross-Platform** — Runs on Windows, macOS, Linux, and even mobile devices.
- **Vast Ecosystem** — Thousands of libraries and frameworks available via pip.
- **Community Driven** — One of the largest, most supportive programming communities.
- **Beginner Friendly** — English-like syntax makes it easy to learn and teach.

| Feature | Benefit |
|---------|---------|
| Simple syntax | Less code, fewer errors |
| Large standard library | Built-in modules for many tasks |
| Free & open-source | No licensing costs |
| Strong job market | High demand across industries |

## 4. 💻 Syntax

```python
# The simplest Python program
print("Hello, World!")
```

**Explanation:** `print()` is a built-in function that displays text on the screen. You pass a string (text inside quotes) as an argument, and Python outputs it. This one line is a complete, runnable Python program — no extra setup required.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Display a welcome message for a new user.

```python
# Displaying a welcome message
print("Welcome to Python Programming!")
print("Let's start coding today.")
```

**Output:**
```
Welcome to Python Programming!
Let's start coding today.
```

**Explanation:** We used two `print()` statements. Each call prints a line of text. Strings inside quotes are displayed exactly as written. The second `print()` starts on a new line automatically.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Ask the user for their name and greet them personally.

```python
# Personalised greeting program
name = input("Enter your name: ")
print("Hello, " + name + "! Welcome to the Python course.")
```

**Output:**
```
Enter your name: Hari
Hello, Hari! Welcome to the Python course.
```

**Explanation:** `input()` reads text typed by the user. We store it in a variable `name`. The `+` operator joins (concatenates) strings together. The output changes based on what the user enters, making the program interactive.

## 7. 🏢 Real World Use Case

Companies across every industry use Python daily. **Google** uses Python for backend services and internal tools. **Netflix** relies on Python for data analysis, recommendation algorithms, and content delivery automation. **Spotify** uses Python for backend services and data processing. **NASA** uses Python for scientific computing and data analysis. **Instagram** (Facebook) runs its backend on Python (Django framework). In finance, **JP Morgan** and **Goldman Sachs** use Python for quantitative analysis and trading algorithms. Startups use Python to build MVPs quickly. As a fresher, knowing Python opens doors to roles in web development (Django/Flask), data science (Pandas/NumPy), automation/testing, and AI/ML.

## 8. 🎯 Interview Questions

**Q1:** What is Python?
**A:** Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability with its clean syntax.

**Q2:** Is Python compiled or interpreted?
**A:** Python is an interpreted language, meaning code is executed line-by-line by the Python interpreter without a separate compilation step.

**Q3:** What are the key features of Python?
**A:** Easy-to-learn syntax, dynamically typed, cross-platform, object-oriented, extensive standard library, large community, and free/open-source.

**Q4:** What is the difference between Python 2 and Python 3?
**A:** Python 3 is the modern version with improved features. Python 2 was discontinued in 2020. Key differences: `print` is a function in Python 3 (`print()`), integer division returns float in Python 3, Unicode support is better in Python 3.

**Q5:** Explain dynamic typing in Python with an example.
**A:** Dynamic typing means variables can change type at runtime. Example:
```python
x = 10       # x is int
x = "hello"  # x is now str
x = [1, 2]   # x is now list
```
The same variable can hold different types without explicit declaration.

## 9. ⚠ Common Errors / Mistakes

**Error:** `SyntaxError: invalid syntax` — Usually caused by missing parentheses, quotes, or colons.
**Fix:** Carefully check punctuation. Ensure strings have matching quotes, and function calls use parentheses.

**Error:** `NameError: name '...' is not defined` — You tried to use a variable or function that doesn't exist.
**Fix:** Check spelling and ensure the variable was assigned before use.

**Error:** `TypeError: can only concatenate str (not "int") to str` — Mixing strings and numbers with `+`.
**Fix:** Convert numbers to strings using `str()` before concatenation.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that prints your name and age.
2. Write a program that prints "Python is fun!" three times on separate lines.
3. Write a program to print the sum of two numbers on the screen.

**Intermediate:**
4. Write a program that asks the user for their favourite colour and prints a message like "Blue is a cool colour!".
5. Write a program that takes two numbers as input and prints their product.
6. Write a program that asks for the user's city and country, then prints "You live in city, country".

**Advanced:**
7. Write a program that asks for a user's birth year, calculates their age, and prints it. Assume the current year is 2026.
8. Write a program that swaps the values of two variables without using a third variable.
