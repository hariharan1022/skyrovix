## 1. Python Get Started

## 2. 📘 Introduction

Before you can write and run Python code, you need to set up your environment. Getting started with Python is straightforward — download the installer, run it, and you're ready to code in minutes. Python runs on all major operating systems: Windows, macOS, and Linux. You can write Python code in any text editor — Notepad, VS Code, PyCharm, or even an online editor like Replit. In this section, you'll learn how to install Python on your computer, write your very first program, and understand the different ways to run Python code (interactive shell, script files, and IDEs). We'll also cover the difference between the Python interpreter and your code editor. By the end, you'll have a working Python setup and will have written and executed your first Python program. No prior experience needed — just follow along step-by-step.

## 3. 🧠 Key Concepts

- **Python Interpreter:** The program that reads and executes your Python code. You download this from python.org.
- **IDLE:** Python's built-in Integrated Development and Learning Environment — comes with the installer.
- **Script (.py file):** A text file containing Python code that you run with the interpreter.
- **Interactive Mode:** Type Python commands directly in the terminal (REPL — Read-Eval-Print Loop).
- **Code Editor:** A program designed for writing code (VS Code, PyCharm, Sublime Text).
- **Command Line / Terminal:** The text-based interface where you run Python scripts.
- **PATH:** An environment variable that tells your operating system where to find the Python executable.

| Method | How to Run | Best For |
|--------|------------|----------|
| Interactive Shell | Type `python` in terminal | Quick experiments |
| Script File | `python filename.py` | Full programs |
| IDE (VS Code) | Press Run button | Large projects |
| Online Editor | Open browser tab | No-install learning |

## 4. 💻 Syntax

```python
# Your very first Python program
print("Hello, World!")
```

**Explanation:** This classic first program does one thing: prints the text "Hello, World!" to the screen. Save this in a file called `hello.py` and run it with `python hello.py`. The `.py` extension tells your computer this is a Python file. `print()` is a built-in function — you'll use it constantly.

## 5. ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Write and run a program that displays a simple greeting.

```python
# First program - greeting
print("Hello, World!")
print("I am learning Python!")
```

**Output:**
```
Hello, World!
I am learning Python!
```

**Explanation:** Save this as `first.py`. Open a terminal/command prompt, navigate to the folder containing the file, and type `python first.py`. Python reads the file line by line, executing each statement. The output shows both lines printed in order.

## 6. 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Use Python interactively to perform calculations and understand how the REPL works.

```python
# This is for the interactive shell — type each line and press Enter
>>> print("Welcome to Python")
Welcome to Python
>>> 5 + 3
8
>>> 10 * 2.5
25.0
>>> 2 ** 10
1024
>>> name = "Alice"
>>> print("Hello,", name)
Hello, Alice
```

**Output:** (shown as the `>>> ` prompt responses above)

**Explanation:** When you run `python` without a file, you enter interactive mode. The `>>> ` prompt means Python is waiting for your command. Type an expression and press Enter — Python immediately evaluates it and shows the result. This is perfect for testing small snippets. Variables you assign persist for the session. Type `exit()` to leave.

## 7. 🏢 Real World Use Case

Companies follow strict onboarding processes for setting up Python. At **Google**, new engineers set up Python using internal tools that ensure correct versions and dependencies. **Microsoft** uses Python extensively in VS Code and Azure — their onboarding guides walk developers through installing Python and configuring VS Code extensions. In **startups**, developers install Python via pyenv (Linux/macOS) or the official installer (Windows), create virtual environments for each project, and use VS Code or PyCharm. In **data science teams**, Anaconda distribution is preferred as it bundles Python with 250+ data science packages pre-installed. Professional teams always use virtual environments to isolate project dependencies.

## 8. 🎯 Interview Questions

**Q1:** How do you check if Python is installed on your system?
**A:** Open a terminal/command prompt and type `python --version` or `python -V`. If Python is installed, it prints the version number. On some systems, you may need to use `python3`.

**Q2:** What is the difference between interactive mode and script mode?
**A:** Interactive mode lets you type commands one at a time and see immediate results (good for testing). Script mode runs an entire `.py` file from start to finish (good for full programs).

**Q3:** What is a Python file extension?
**A:** Python files use the `.py` extension. There are also `.pyc` (compiled bytecode), `.pyo` (optimized bytecode, less common), and `.pyw` (Windows GUI mode, no console) extensions.

**Q4:** How do you run a Python script on Windows?
**A:** Open Command Prompt, navigate to the script's directory using `cd`, then type `python script_name.py` and press Enter.

**Q5:** What is an IDE and do you need one to write Python?
**A:** An IDE (Integrated Development Environment) provides tools like code highlighting, debugging, and auto-completion. You don't need one — any text editor works. Beginners can start with IDLE (comes with Python) or Notepad, then move to VS Code or PyCharm.

## 9. ⚠ Common Errors / Mistakes

**Error:** `'python' is not recognized as an internal or external command` — Python is not installed or not added to PATH.
**Fix:** Reinstall Python and check "Add Python to PATH" during installation. Restart your terminal after installation.

**Error:** `SyntaxError: invalid syntax` on the first line — Often caused by copying code from the web with smart quotes.
**Fix:** Replace curly quotes (`" "`, `' '`) with straight quotes (`" "`, `' '`). Type the code manually to avoid this.

**Error:** File not found when running `python myfile.py` — You're in the wrong directory.
**Fix:** Use `dir` (Windows) or `ls` (macOS/Linux) to check files in the current directory. Navigate to the correct folder using `cd`.

## 10. 📝 Practice Exercises

**Beginner:**
1. Write a program that prints "My first Python program" and run it from the terminal.
2. Write a program that prints the result of `15 + 30` and `100 - 45` on separate lines.
3. Open the Python interactive shell and calculate `25 * 4`, `144 / 12`, and `7 ** 3`.

**Intermediate:**
4. Write a script that prints your name, age, and favourite hobby — each on a new line.
5. Use the interactive shell to assign your name to a variable and print it with a greeting.
6. Write a program that calculates the area of a rectangle (width * height) and prints the result.

**Advanced:**
7. Write a script that asks the user for two numbers, adds them, and prints the result using a single `print()` statement.
8. Write a script that uses `print()` with the `sep` parameter to print the numbers 1, 2, 3, 4, 5 separated by hyphens.
