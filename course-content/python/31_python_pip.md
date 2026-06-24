# 31. Python PIP

## 📘 Introduction

PIP stands for "Pip Installs Packages" and is the standard package manager for Python. It allows developers to install, upgrade, uninstall, and manage third-party libraries and dependencies that extend Python's functionality beyond the standard library. PIP connects to the Python Package Index (PyPI), a massive repository of over 400,000 packages. Instead of writing everything from scratch, developers can use PIP to fetch packages like NumPy, Django, Flask, or Requests with a single command. PIP is included by default with Python versions 3.4 and above, making it immediately accessible. Understanding PIP is essential for any Python developer because modern Python development almost always relies on external packages. The tool also supports installing specific versions, upgrading packages, and generating requirements files that document all dependencies for a project.

## 🧠 Key Concepts

- **Package**: A collection of Python modules bundled together for distribution (e.g., NumPy, Pandas)
- **PyPI**: Python Package Index — the official public repository where packages are hosted
- **pip install**: Downloads and installs a package from PyPI along with its dependencies
- **requirements.txt**: A text file listing all packages (and versions) a project depends on
- **pip freeze**: Outputs all installed packages and their versions in requirements.txt format
- **Virtual Environment**: An isolated Python environment that prevents package conflicts between projects
- **Package Versioning**: Semantic versioning (e.g., 1.2.3) — major.minor.patch
- **pip uninstall**: Removes an installed package from the environment
- **pip list**: Displays all packages currently installed in the environment

| Command | Description |
|---------|-------------|
| `pip install <package>` | Install the latest version of a package |
| `pip install <package>==1.2.3` | Install a specific version |
| `pip install -r requirements.txt` | Install all packages from a requirements file |
| `pip uninstall <package>` | Remove a package |
| `pip list` | Show all installed packages |
| `pip freeze` | Show installed packages in requirements format |
| `pip show <package>` | Display package details (version, location, dependencies) |
| `pip search <term>` | Search PyPI for packages (deprecated in newer versions) |

## 💻 Syntax

```python
# PIP commands are run in the terminal/command prompt, NOT in Python code

# Basic install
# pip install requests

# Install a specific version
# pip install django==4.2.1

# Install with minimum version
# pip install "numpy>=1.24.0"

# Upgrade a package
# pip install --upgrade pandas

# Uninstall a package
# pip uninstall flask

# List installed packages
# pip list

# Freeze installed packages to requirements file
# pip freeze > requirements.txt

# Install from requirements file
# pip install -r requirements.txt

# Show package info
# pip show requests

# Install in editable mode (for development)
# pip install -e .
```

Line-by-line explanation:
- `pip install requests` — downloads and installs the `requests` library and its dependencies from PyPI
- `pip install django==4.2.1` — pins Django to exactly version 4.2.1, avoiding unexpected upgrades
- `pip install --upgrade pandas` — upgrades pandas to the latest available version
- `pip freeze > requirements.txt` — outputs all installed packages as `package==version` and writes them to a file
- `pip install -r requirements.txt` — reads the file and installs every package listed there, matching versions exactly
- `pip uninstall flask` — removes Flask and asks for confirmation before deletion

## ✅ Example 1 - Basic: Installing and Using a Package

**Problem**: You need to make HTTP requests to a web API, but Python's urllib is cumbersome. Install and use the `requests` library.

**Code**:
```python
# Step 1: In terminal, run:
# pip install requests

# Step 2: Use the package in code
import requests

response = requests.get("https://api.github.com")
print(f"Status Code: {response.status_code}")
print(f"Response JSON keys: {list(response.json().keys())}")
```

**Output**:
```
Status Code: 200
Response JSON keys: ['current_user_url', 'current_user_authorizations_html_url', 'authorizations_url', 'code_search_url', ...]
```

**Explanation**: After installing `requests` via PIP, we import it and call `requests.get()` to send an HTTP GET request. The library handles connection pooling, URL encoding, and response parsing automatically. The `response.json()` method parses the JSON response body into a Python dictionary. This demonstrates how a single PIP command unlocks powerful functionality.

## 🚀 Example 2 - Intermediate: Managing Project Dependencies with requirements.txt

**Problem**: You are building a Flask web application that also uses SQLAlchemy and Pandas. You need to document and reproduce the exact environment across different machines.

**Code**:
```python
# 1. Install the packages
# pip install flask==2.3.2 sqlalchemy==2.0.19 pandas==2.0.3

# 2. Generate requirements.txt
# pip freeze > requirements.txt

# Contents of requirements.txt (generated by pip freeze):
"""
blinker==1.6.2
click==8.1.6
Flask==2.3.2
greenlet==2.0.2
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
numpy==1.25.1
pandas==2.0.3
python-dateutil==2.8.2
pytz==2023.3
six==1.16.0
SQLAlchemy==2.0.19
typing_extensions==4.7.1
Werkzeug==2.3.6
"""

# 3. On another machine, recreate the environment:
# pip install -r requirements.txt
```

**Output**: Every dependency (including transitive dependencies like Jinja2 for Flask, numpy for pandas) is captured with exact versions. The new machine installs identical versions, avoiding "works on my machine" problems.

**Explanation**: `pip freeze` lists every installed package including sub-dependencies. By redirecting output to `requirements.txt`, we create a reproducible environment specification. On a different machine (or CI/CD server), `pip install -r requirements.txt` reads this file and installs every package at the pinned version. This is the standard approach for dependency management in Python projects.

## 🏢 Real World Use Case

**Spotify** uses PIP extensively in their data science and backend infrastructure. Their data engineering teams manage hundreds of Python packages across thousands of machines for data pipeline processing, machine learning model training, and API development. They use `requirements.txt` files with pinned versions to ensure consistency across development, staging, and production environments. Spotify also maintains internal PyPI mirrors for security and faster downloads. **Instagram** (running Python/Django at massive scale) uses PIP with virtual environments to manage dependencies across their monorepo, where different services may require different versions of the same package. They contributed improvements to PIP's dependency resolver. **Netflix** uses PIP in their big data processing pipelines with Apache Spark and Python, managing packages like Pandas, NumPy, and Scikit-learn across distributed clusters via requirements files.

## 🎯 Interview Questions

**Q1: What is the difference between `pip freeze` and `pip list`?**
A: `pip list` displays installed packages in a simple table format with package names and versions. `pip freeze` outputs packages in `package==version` format, which is directly compatible with `requirements.txt`. `pip freeze` also typically excludes packages that PIP itself depends on (like `pip`, `setuptools`, `wheel`), while `pip list` includes them. Use `pip freeze > requirements.txt` to generate dependency files; use `pip list` for human-readable inspection.

**Q2: How do you install a package globally vs in a virtual environment?**
A: By default, `pip install` installs packages globally into the system's Python site-packages directory. To install in a virtual environment, first create and activate the virtual environment (`python -m venv myenv && myenv\Scripts\activate` on Windows, or `source myenv/bin/activate` on macOS/Linux). Then any `pip install` command installs packages only inside that isolated environment. Global installation is discouraged because it can lead to version conflicts between different projects.

**Q3: What is the purpose of a `requirements.txt` file?**
A: `requirements.txt` is a plain text file that lists all Python package dependencies for a project, typically with version constraints. It enables reproducible builds — anyone can run `pip install -r requirements.txt` to install the exact same packages and versions. It is standard practice to commit this file to version control. It also documents the project's dependencies for other developers.

**Q4: How do you resolve dependency conflicts in PIP?**
A: Since PIP version 20.3, PIP uses a new dependency resolver that proactively checks for conflicts. To resolve conflicts: (1) review the error message to identify conflicting packages, (2) check each package's documented dependencies, (3) try installing compatible versions by specifying version constraints, (4) use `pip install <package> --no-deps` to install without dependencies (not recommended), (5) consider using virtual environments to isolate conflicting projects, or (6) use alternative tools like Poetry or Conda that handle dependency resolution differently.

**Q5: What does `pip install -e .` do and when would you use it?**
A: The `-e` flag stands for "editable" mode. `pip install -e .` installs the current directory's package (which must have a `setup.py` or `pyproject.toml`) in development mode. Changes to the source code take effect immediately without reinstalling. It creates a link (symlink) from site-packages to the source directory. This is used during package development when you need to test changes incrementally without repeatedly running `pip install .`.

## ⚠ Common Errors / Mistakes

**Error 1: `pip is not recognized as an internal or external command`**
- **Reason**: Python is not installed, or Python's Scripts directory is not in the system PATH
- **Fix**: Reinstall Python and check "Add Python to PATH" during installation. Alternatively, use `python -m pip install <package>` instead of `pip install <package>`
```bash
# Instead of:
pip install requests

# Use:
python -m pip install requests
```

**Error 2: `Permission denied` or `OSError: [Errno 13]` on Linux/macOS**
- **Reason**: Trying to install packages globally without administrator privileges
- **Fix**: Use a virtual environment, or install with `--user` flag, or use `sudo` (not recommended)
```bash
# Wrong: global install without permissions
# pip install pandas

# Correct: install for current user only
pip install --user pandas

# Better: use a virtual environment
python -m venv myenv
source myenv/bin/activate
pip install pandas
```

**Error 3: Version conflicts with error `ERROR: Cannot install <package> because these package versions have conflicting dependencies`**
- **Reason**: Two packages require incompatible versions of the same dependency
- **Fix**: Use a virtual environment, or specify compatible version ranges, or upgrade both packages
```bash
# Create a clean environment to isolate the conflict
python -m venv clean_env
source clean_env/bin/activate
pip install packageA packageB
```

## 📝 Practice Exercises

**Beginner:**
1. Install the `requests` package using PIP, then write a script that fetches the current weather from an open API (e.g., wttr.in) and prints the temperature.
2. Create a `requirements.txt` file manually with three packages (`numpy`, `pandas`, `matplotlib`) and use `pip install -r requirements.txt` to install them.
3. Use `pip list` and `pip freeze` to compare their outputs. Write down at least three differences in formatting.

**Intermediate:**
4. Install two packages that depend on different versions of the same sub-dependency. Document the conflict and find compatible version ranges that work together.
5. Write a Python script that programmatically calls `pip list` using `subprocess.run()` and parses the output into a dictionary of package names and versions.
6. Create a virtual environment, install Flask and its dependencies, then use `pip freeze` to generate a requirements file. Compare its size with manually listing just Flask.

**Advanced:**
7. Create a custom CLI tool in Python that reads a `requirements.txt`, checks each package's latest version on PyPI (using `requests` and the PyPI JSON API), and reports which packages are outdated.
8. Build a small package with a `setup.py` file, install it in editable mode with `pip install -e .`, modify the source code, and verify the changes are reflected without reinstallation.
