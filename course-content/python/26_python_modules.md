## 26. Python Modules

## 📘 Introduction
A module in Python is simply a file containing Python code — definitions of functions, classes, and variables — with a `.py` extension. Modules allow you to logically organize your Python code into separate files, making it easier to maintain, reuse, and share. Python's module system is one of its greatest strengths, enabling code reuse across projects through the `import` statement. The Python standard library itself is a vast collection of modules covering everything from file I/O (`os`, `pathlib`) to web services (`urllib`, `http`) to data processing (`json`, `csv`, `xml`). You can also create your own custom modules, package them into directories with `__init__.py`, and distribute them via PyPI. Understanding how modules work — including the import mechanism, search path, and the `__name__ == "__main__"` idiom — is fundamental to writing organized Python applications.

## 🧠 Key Concepts

- **`import` statement** — Loads an entire module: `import math`
- **`from ... import`** — Imports specific names from a module: `from math import sqrt`
- **`import ... as`** — Imports with an alias: `import numpy as np`
- **Custom modules** — Any `.py` file can be imported if it's in the Python path
- **`__name__ == "__main__"`** — Checks if the script is run directly vs imported
- **Module search path** — Python looks in `sys.path` for modules (current dir, PYTHONPATH, standard library)
- **`dir()` function** — Lists all names defined in a module: `dir(math)`
- **`__init__.py`** — Marks a directory as a Python package (can be empty in Python 3.3+)
- **Packages** — Namespace containing sub-modules: `import os.path`
- **`sys.path`** — List of directories Python searches for modules
- **`PYTHONPATH`** — Environment variable to add custom module directories
- **`__all__`** — Controls what `from module import *` imports
- **Reloading modules** — `importlib.reload(module)` for dynamic reloading

## 💻 Syntax

```python
# Various import styles
import math                    # import entire module
from math import sqrt, pi      # import specific names
from math import *             # import all public names (avoid in production)
import datetime as dt           # import with alias
from os.path import join as path_join  # alias a specific function

# Check if running as script or imported
if __name__ == "__main__":
    print("This script is being run directly")
else:
    print("This script is being imported as a module")

# View module contents
print(dir(math))

# Module search path
import sys
print(sys.path)  # list of directories searched

# Creating a simple custom module (save as mymodule.py)
# mymodule.py
# def greet(name):
#     return f"Hello, {name}!"
# PI = 3.14159

# Using it in another file
# import mymodule
# print(mymodule.greet("Alice"))
```

**Line-by-line explanation:**
- `import math` — loads the math module; access members with `math.sqrt`
- `from math import sqrt, pi` — brings `sqrt` and `pi` into the current namespace
- `from math import *` — imports everything not starting with `_` (use cautiously)
- `import datetime as dt` — the module is accessible as `dt`
- `if __name__ == "__main__":` — the `__name__` variable equals `"__main__"` only when the file is run directly
- `dir(math)` — lists all attributes and methods in the math module
- `sys.path` — shows the list of directories Python searches for imports

## ✅ Example 1 - Basic

**Problem:** Create a custom module `calculator.py` with basic arithmetic functions, then import and use it from another script.

**Code:**

`calculator.py` (the module):
```python
"""A simple calculator module with basic arithmetic operations."""

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(a, b):
    return a ** b

PI = 3.14159
E = 2.71828

if __name__ == "__main__":
    # Test the module when run directly
    print("Testing calculator module:")
    print(f"add(5, 3) = {add(5, 3)}")
    print(f"PI = {PI}")
```

`main.py` (uses the module):
```python
# Import the custom module
import calculator

# Use the module's functions
print(calculator.add(10, 5))        # 15
print(calculator.subtract(10, 5))   # 5
print(calculator.multiply(10, 5))   # 50
print(calculator.divide(10, 5))     # 2.0
print(calculator.power(2, 10))      # 1024
print(f"PI = {calculator.PI}")      # 3.14159

# Selective import
from calculator import divide, PI
print(divide(20, 4))                # 5.0
print(PI)                           # 3.14159
```

**Output:**
```
15
5
50
2.0
1024
PI = 3.14159
5.0
3.14159
```

**Explanation:**
- `calculator.py` defines functions and constants that form the module
- The `if __name__ == "__main__":` block only runs when `calculator.py` is executed directly, not when imported
- `import calculator` makes all definitions accessible via `calculator.` prefix
- `from calculator import divide, PI` brings specific names into the namespace directly
- The test code in the module doesn't execute during import — this is a key debugging/testing pattern
- The module acts as a namespace, preventing name collisions

## 🚀 Example 2 - Intermediate

**Problem:** Create a package `shapes` with sub-modules for different geometric shapes, demonstrate `__init__.py`, `__all__`, and explore the module search path.

**Code:**

Directory structure:
```
shapes/
    __init__.py
    circle.py
    rectangle.py
```

`shapes/__init__.py`:
```python
"""Shapes package — geometric shape calculations."""

__all__ = ["Circle", "Rectangle", "area_of_circle", "area_of_rectangle"]

from .circle import Circle, area_of_circle
from .rectangle import Rectangle, area_of_rectangle
```

`shapes/circle.py`:
```python
import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

def area_of_circle(radius):
    return math.pi * radius ** 2
```

`shapes/rectangle.py`:
```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

def area_of_rectangle(width, height):
    return width * height
```

`main.py` (using the package):
```python
import sys

# Add the parent directory to path if needed
print("Module search path:")
for path in sys.path:
    print(f"  {path}")

# Using the package
from shapes import Circle, Rectangle

c = Circle(5)
print(f"Circle area (r=5): {c.area():.2f}")

r = Rectangle(4, 6)
print(f"Rectangle area (4x6): {r.area()}")

# Using module-level functions
from shapes import area_of_circle, area_of_rectangle
print(f"Circle area function: {area_of_circle(3):.2f}")
print(f"Rectangle area function: {area_of_rectangle(5, 7)}")

# Check what dir() shows
print("\nshapes package contents:")
import shapes
print([x for x in dir(shapes) if not x.startswith("_")])
```

**Output:**
```
Module search path:
  C:\Users\HARIHARAN S\OneDrive\Desktop\inten hub
  ...
Circle area (r=5): 78.54
Rectangle area (4x6): 24
Circle area function: 28.27
Rectangle area function: 35

shapes package contents:
['Circle', 'Rectangle', 'area_of_circle', 'area_of_rectangle']
```

**Explanation:**
- `shapes/` is a package (directory with `__init__.py`)
- `__init__.py` imports key names from sub-modules and defines `__all__`
- Relative imports (`from .circle import ...`) refer to sub-modules within the package
- `sys.path` shows where Python looks for modules — includes the script's directory
- The package provides a clean API, hiding internal module structure
- `dir(shapes)` shows the names exported from the package

## 🏢 Real World Use Case

**Company: Spotify** — Spotify's backend services are organized as a massive collection of Python packages and modules. Each microservice is a package containing sub-modules for routing, data access, caching, and authentication. The `__init__.py` files define clean public APIs, hiding internal implementation details. The `__all__` variable controls what's exposed to external consumers. Spotify uses the `if __name__ == "__main__":` pattern extensively for service entry points that can also be imported for testing. Their CI/CD pipeline uses `PYTHONPATH` to manage multiple service versions during deployment. Module reloading via `importlib.reload()` is used in their hot-patching system for critical bug fixes without service restart. The `dir()` function is used in their internal REPL-based debugging tools to explore module contents at runtime.

**Other uses:** Django/Flask web applications are organized as packages, data science projects import `pandas`, `numpy`, `matplotlib` as modules, and CLI tools use `if __name__ == "__main__":` for entry points.

## 🎯 Interview Questions

**1. What is the difference between a module and a package in Python?**

A module is a single `.py` file containing Python code. A package is a directory containing multiple modules (`.py` files) and an `__init__.py` file (in Python 3.3+, `__init__.py` is optional for namespace packages). Packages can be nested (sub-packages). In essence, modules organize code within files; packages organize modules within directories.

**2. How does Python find modules when you use `import`?**

Python searches in `sys.path`, which includes: (1) the directory containing the input script (or current directory if interactive), (2) directories listed in the `PYTHONPATH` environment variable, (3) standard library directories, and (4) site-packages directories for third-party installations. The first matching module is used. You can modify `sys.path` at runtime to add search directories.

**3. What is the purpose of `if __name__ == "__main__":`?**

This idiom checks if the script is being run directly (as the main program) versus being imported as a module into another script. When run directly, `__name__` is set to `"__main__"`. When imported, `__name__` is set to the module's name. This allows a file to contain both reusable code (imported by others) and test/runnable code (executed only when run directly).

**4. What is `__all__` and how does it affect imports?**

`__all__` is a list in a module or package that defines the public interface — it controls what names are imported when `from module import *` is used. If `__all__` is not defined, `import *` imports all names not starting with `_`. If defined, only names in `__all__` are imported. It serves as documentation for the module's public API.

**5. How do you create a namespace package in Python?**

A namespace package is a package without `__init__.py`, allowing multiple directories to contribute to the same package namespace. In Python 3.3+, any directory on `sys.path` that doesn't contain `__init__.py` but contains `.py` files (or sub-packages) is treated as a namespace package. This allows splitting a package across multiple directories or distribution packages.

## ⚠ Common Errors / Mistakes

**Error 1: Circular imports**
```python
# module_a.py
from module_b import func_b
def func_a():
    return func_b()

# module_b.py
import module_a  # Circular import!
def func_b():
    return module_a.func_a()  # This may fail depending on import order

# FIX — restructure to avoid circular dependencies
# or use lazy imports inside functions
```

**Error 2: Naming a module the same as a standard library module**
```python
# BAD — creates mymath.py in current directory
import math  # This imports YOUR math.py, not the standard library!

# Python finds your file first because current directory is first in sys.path
# FIX — choose unique names that don't shadow standard library
```

**Error 3: Forgetting `__init__.py` in packages (pre-3.3)**
```python
# Directory structure:
# mypackage/
#     module_a.py

# BAD — Python < 3.3 raises ImportError
from mypackage import module_a  # ImportError: No module named mypackage

# FIX — create empty __init__.py in mypackage/
# (Python 3.3+ doesn't require it for regular packages)
```

**Error 4: Modifying `sys.path` incorrectly**
```python
# BAD — modifies the wrong path
import sys
sys.path = ["/my/custom/path"]  # replaces ALL paths!

# FIX — append to existing path
import sys
sys.path.append("/my/custom/path")
```

**Error 5: Import errors due to naming conflicts**
```python
# BAD — name collision
from math import sqrt
sqrt = 42  # overwrites sqrt function
print(sqrt(25))  # TypeError: 'int' object is not callable

# FIX — avoid overwriting imported names
# or use the module prefix:
import math
math.sqrt = 42  # Can't do this — math is a module
```

## 📝 Practice Exercises

**Beginner:**
1. Create a module `string_utils.py` with functions `reverse_string(s)`, `count_vowels(s)`, and `is_palindrome(s)`. Import and test each function.
2. Write a script that imports the `random` module and uses `random.randint()` and `random.choice()` without using the module prefix (`from random import ...`).
3. Create a module `constants.py` that defines `GRAVITY = 9.81`, `SPEED_OF_LIGHT = 3e8`, and `PLANCK = 6.626e-34`. Import it and print each constant.

**Intermediate:**
4. Create a package `geometry` with sub-modules `circle.py`, `triangle.py`, and `square.py`. Each module should have a function `area()` and `perimeter()`. The `__init__.py` should import all functions and define `__all__`.
5. Write a script that uses `dir()` to explore the `os` module and prints all attributes that contain the word "file" (case-insensitive).
6. Create a module `config.py` that uses `if __name__ == "__main__":` to run configuration tests when executed directly. The module should define `DATABASE_URL`, `DEBUG_MODE`, and `API_KEY` constants.

**Advanced:**
7. Create a plugin system using modules: a `plugins/` package where each module (e.g., `plugins/uppercase.py`, `plugins/reverse.py`) defines a `process(text)` function. Write a main script that dynamically imports all plugins using `importlib.import_module()` and applies each one to user input.
8. Implement a lazy module loader using `__getattr__` on a module (Python 3.7+): create a module that delays importing heavy dependencies (like `numpy` or `pandas`) until they are actually accessed.
