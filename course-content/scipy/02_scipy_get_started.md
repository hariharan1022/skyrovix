## 2. SciPy Get Started

## 📘 Introduction

Getting started with SciPy involves installing the library, importing it in Python, and understanding how to explore its submodules and utilities. This module also covers the `scipy.constants` submodule, which provides a comprehensive set of physical constants and unit conversion functions essential for scientific computing.

## 🧠 Key Concepts

- **Installation**: SciPy is installed via `pip install scipy` or `conda install scipy`.
- **Importing**: Standard convention is `import scipy` or importing specific submodules.
- **Exploration**: Use `help()`, `dir()`, and `scipy.__version__` to inspect the library.
- **Submodules**: SciPy groups functionality into submodules — you must import them explicitly (e.g., `from scipy import constants`).
- **`scipy.constants`**: A dedicated submodule for physical constants and unit conversions.
- **`scipy.__all__`**: Lists all public submodules.

## 💻 Syntax

```python
# Installation (run in terminal)
# pip install scipy

# Basic imports
import scipy
from scipy import constants

# Check version
print(scipy.__version__)

# Explore
print(dir(scipy))
print(scipy.__all__)  # List of submodules
help(scipy.constants)  # Documentation

# Access codata and unit databases
print(constants.c)       # speed of light
print(constants.pi)      # pi
print(constants.physical_constants['electron mass'])
print(constants.unit('year'))  # year in seconds
```

## ✅ Example 1 - Basic

**Problem:** Install SciPy, import it, verify the version, and list all available submodules.

**Code:**
```python
# First, install (run in terminal):
# pip install scipy

import scipy

# Check version
print("SciPy version:", scipy.__version__)

# List all available submodule names
print("\nAvailable submodules:", scipy.__all__)

# Check how many submodules
print(f"\nTotal submodules: {len(scipy.__all__)}")
```

**Output:**
```
SciPy version: 1.13.0

Available submodules: ['cluster', 'constants', 'datasets', 'fft', 'fftpack',
'integrate', 'interpolate', 'io', 'linalg', 'misc', 'ndimage',
'odr', 'optimize', 'signal', 'sparse', 'spatial', 'special', 'stats']

Total submodules: 18
```

**Explanation:**
We verify the installation, print the version, and use `scipy.__all__` to see all public submodules. Each submodule provides a specific domain of scientific computing.

## 🚀 Example 2 - Intermediate

**Problem:** Explore a SciPy submodule in depth — use `help()`, `dir()`, and inspect functions with `__doc__`.

**Code:**
```python
from scipy import constants
import inspect

# List all names in the constants module
names = dir(constants)
print(f"Total items in constants: {len(names)}")

# Filter for callable functions
functions = [n for n in names if callable(getattr(constants, n)) and not n.startswith('_')]
print(f"Callable functions: {functions[:10]}")  # Show first 10

# Get docstring of a specific function
print("\n--- convert_temperature docstring ---")
print(constants.convert_temperature.__doc__[:500])

# Demonstrate help on a constant
print("\n--- Speed of light constant ---")
print(repr(constants.c))
```

**Output:**
```
Total items in constants: 150
Callable functions: ['Atto', 'ConvertError', 'UnitConversion', 'yotta', ...]

--- convert_temperature docstring ---
Convert from one temperature scale to another.
...
```

**Explanation:**
We explore the `constants` submodule programmatically — listing all names, identifying callable functions, and reading docstrings. This approach applies to any SciPy submodule.

## 🏢 Real World Use Case

**Physics Lab Automation:** A physics student runs a spectroscopy experiment measuring electron transition energies. Using `scipy.constants`, they:
- Access Planck's constant (`h`) and speed of light (`c`) to convert wavelength to energy: `E = h * c / lambda`
- Use `physical_constants['Rydberg constant']` for theoretical comparison
- Use `convert_temperature` to convert measured temperatures from Celsius to Kelvin
- Use `constants.unit('electron volt')` to express results in eV

## 🎯 Interview Questions

**Q1:** How do you install a specific version of SciPy?
**A:** `pip install scipy==1.13.0` or `conda install scipy=1.13.0`.

**Q2:** Why does `import scipy; scipy.linalg.eig()` fail but `from scipy import linalg; linalg.eig()` work?
**A:** SciPy submodules are not automatically imported when you `import scipy`. You must explicitly import each submodule with `from scipy import submodule`.

**Q3:** How can you list all available submodules in SciPy?
**A:** Use `scipy.__all__` or `dir(scipy)` and filter for submodules.

**Q4:** What is `scipy.constants.physical_constants`?
**A:** It is a dictionary where keys are constant names (like 'electron mass') and values are tuples of (value, unit, error). For example: `('electron mass', (9.1093837015e-31, 'kg', 2.8e-38))`.

**Q5:** How do you access the Boltzmann constant in SciPy?
**A:** `from scipy.constants import k` or `from scipy.constants import Boltzmann` or use `constants.physical_constants['Boltzmann constant']`.

## ⚠ Common Errors / Mistakes

- **Forgetting to import submodules**: `import scipy` alone does not give access to submodules. Always use `from scipy import submodule`.
- **Mistyping constant names**: `const.c` is correct; `const.C` may fail. Constant names are case-sensitive.
- **Using outdated versions**: Features like `scipy.datasets` were added in newer versions. Check documentation for version compatibility.
- **`pip install` permission errors**: On Linux/Mac, use `pip install --user scipy` or use a virtual environment.

## 📝 Practice Exercises

**Beginner:**
1. Install SciPy in a fresh virtual environment and verify with `pip list | findstr scipy` (Windows) or `pip list | grep scipy` (Linux/Mac).
2. Write a script that prints the version of SciPy, NumPy, and Python you are using.
3. Using `dir(scipy.special)`, find and print 5 mathematical functions available in the `special` submodule.

**Intermediate:**
4. Write a function that takes a constant name as input (e.g., 'speed of light in vacuum') and returns its value, unit, and uncertainty by looking it up in `constants.physical_constants`.
5. Use `help()` on a SciPy function of your choice and extract the first 200 characters of its docstring programmatically.
6. Explore the `scipy.__all__` list. For each submodule, write code that checks whether it can be imported successfully, and prints an error message if not.

**Advanced:**
7. Write a script that programmatically lists all constants in `constants.physical_constants` whose value is greater than 10^10. Group them by category (e.g., atomic, electromagnetic, etc.) based on their name.
8. Compare the values of `constants.c`, `constants.pi`, `constants.h`, and `constants.G` with their values from the `physical_constants` dictionary. Determine if they agree exactly or if there are rounding differences.
