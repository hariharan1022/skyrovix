# 36. Python VirtualEnv

## 📘 Introduction

A virtual environment is an isolated Python environment that allows you to manage dependencies for different projects separately. Each virtual environment has its own Python interpreter, site-packages directory, and scripts. This isolation solves a critical problem in Python development: different projects often require different versions of the same package. Without virtual environments, installing a package globally could break another project that depends on an older version. Python's built-in `venv` module (available since Python 3.3) creates lightweight virtual environments. The workflow involves creating an environment, activating it, installing project-specific packages with PIP, and generating a `requirements.txt` file to reproduce the environment elsewhere. Tools like `virtualenv` (the predecessor) and `venv` (built-in) follow the same concepts. Best practices include creating a virtual environment per project, never installing project packages globally, and using `requirements.txt` for reproducibility.

## 🧠 Key Concepts

- **Virtual Environment**: An isolated directory containing its own Python binary and package installation directories
- **venv**: Python's built-in module for creating virtual environments (`python -m venv myenv`)
- **Activation**: Running a script that adjusts PATH and shell variables to use the virtual environment's Python
- **Deactivation**: Returning to the system Python by running the `deactivate` command
- **Isolation**: Packages installed in a virtual environment do not affect the global Python installation or other environments
- **requirements.txt**: Standard file for listing dependencies to recreate environments
- **virtualenv vs venv**: `virtualenv` is third-party (supports Python 2), `venv` is built-in (Python 3.3+) with similar functionality

| Command | Description |
|---------|-------------|
| `python -m venv myenv` | Create a virtual environment named `myenv` |
| `myenv\Scripts\activate` (Windows) | Activate the environment |
| `source myenv/bin/activate` (macOS/Linux) | Activate the environment |
| `deactivate` | Exit the current virtual environment |
| `pip freeze > requirements.txt` | Export installed packages |
| `pip install -r requirements.txt` | Install packages from file |

## 💻 Syntax

```bash
# These commands run in the terminal, not in Python code

# 1. Create a virtual environment
python -m venv my_project_env

# 2. Activate it
# Windows (Command Prompt):
# my_project_env\Scripts\activate
# Windows (PowerShell):
# my_project_env\Scripts\Activate.ps1
# macOS / Linux:
# source my_project_env/bin/activate

# 3. Once activated, the prompt changes to show the environment name
# (my_project_env) C:\Users\...>

# 4. Install packages inside the environment
pip install flask requests pandas

# 5. Save the environment's dependencies
pip freeze > requirements.txt

# 6. Exit the environment
deactivate

# 7. Later, recreate the environment
python -m venv new_env
source new_env/bin/activate
pip install -r requirements.txt
```

Line-by-line explanation:
- `python -m venv my_project_env` — creates a directory `my_project_env/` containing a fresh Python binary, pip, and an empty site-packages directory
- `source my_project_env/bin/activate` — modifies `PATH` so that `python` and `pip` point to the virtual environment's versions
- `(my_project_env)` — the activated environment's name appears in the terminal prompt as a visual indicator
- `pip install flask requests pandas` — installs these packages into the virtual environment's site-packages, not globally
- `pip freeze > requirements.txt` — captures the exact versions of all installed packages for reproducibility
- `deactivate` — restores the original PATH, returning to the system Python

## ✅ Example 1 - Basic: Creating and Using a Virtual Environment

**Problem**: You are starting a new Flask web project. Create a virtual environment, install Flask, verify the installation, and generate a requirements file.

**Code**:
```bash
# Step 1: Create the virtual environment
python -m venv flask_env

# Step 2: Activate it
# (Windows)
flask_env\Scripts\activate

# Step 3: Verify we are using the venv Python (not system Python)
where python
# Expected: ...\flask_env\Scripts\python.exe

# Step 4: Install Flask
pip install flask

# Step 5: Verify installation
python -c "import flask; print(f'Flask version: {flask.__version__}')"

# Step 6: Freeze dependencies
pip freeze > requirements.txt

# Step 7: Deactivate
deactivate
```

**Output**:
```
Flask version: 2.3.2

# Contents of requirements.txt:
blinker==1.6.2
click==8.1.6
Flask==2.3.2
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
Werkzeug==2.3.6
```

**Explanation**: After creation and activation, `where python` confirms the environment's Python binary is being used. Installing Flask installs it and its dependencies (Jinja2, Werkzeug, click, etc.) into the isolated environment — the global Python remains untouched. `pip freeze` captures all installed packages (including transitive dependencies) at exact versions, enabling exact reproduction later. The `deactivate` command returns to the system Python.

## 🚀 Example 2 - Intermediate: Managing Multiple Project Environments

**Problem**: You maintain two projects — "webapp" (uses Flask 2.x) and "legacy-api" (requires Flask 1.x). Create separate virtual environments for each with different Flask versions.

**Code**:
```bash
# Project A: Modern webapp with Flask 2.x
python -m venv webapp_env
source webapp_env/bin/activate
pip install "flask>=2.0,<3.0"
pip freeze > webapp/requirements.txt
deactivate

# Project B: Legacy API with Flask 1.x
python -m venv legacy_env
source legacy_env/bin/activate
pip install "flask>=1.0,<2.0"
pip freeze > legacy-api/requirements.txt
deactivate

# Verify isolation
source webapp_env/bin/activate
python -c "import flask; print(f'Webapp Flask: {flask.__version__}')"
deactivate

source legacy_env/bin/activate
python -c "import flask; print(f'Legacy Flask: {flask.__version__}')"
deactivate
```

**Output**:
```
Webapp Flask: 2.3.2
Legacy Flask: 1.1.4
```

**Explanation**: Two completely isolated environments coexist on the same machine. Each has its own Flask version without conflict. When the webapp environment is active, `python` and `pip` refer to its binaries, and imports resolve from its site-packages. Activating the legacy environment switches to its Python and packages. This is the key use case for virtual environments — different projects can use different package versions simultaneously. The `deactivate` command resets the environment before switching to the other.

## 🏢 Real World Use Case

**Spotify** manages hundreds of microservices, each in its own virtual environment with pinned dependencies. Their CI/CD pipeline creates a fresh virtual environment for every build, installs dependencies from `requirements.txt`, runs tests, and then packages the application. This guarantees that what runs in development matches production. **Instagram** (Meta) uses virtual environments extensively in their monorepo. Different services within the repository (Django web servers, data pipelines, ML models) each have their own virtual environment with potentially conflicting package versions. They use a custom tool that wraps `venv` to manage this at scale. **Mozilla** uses virtual environments for their Firefox build and testing infrastructure — each test runner creates a fresh environment with its own set of dependencies, preventing cross-test contamination. **Netflix** uses virtual environments in their data science workflows, where different teams may need different versions of NumPy, Pandas, and Scikit-learn for their analysis pipelines.

## 🎯 Interview Questions

**Q1: What is the difference between `venv` and `virtualenv`?**
A: `venv` is a built-in module in Python 3.3+ that provides minimal virtual environment functionality. `virtualenv` is a third-party package that works with both Python 2 and Python 3 and offers more features (e.g., creating environments with a different Python version than the host, configurable seed packages, faster creation). For Python 3 projects, `venv` is usually sufficient and recommended because it is built-in and requires no additional installation. For Python 2 compatibility or advanced features, use `virtualenv`.

**Q2: How do you deactivate a virtual environment? What happens when you do?**
A: Run the `deactivate` command (a shell function defined by the activation script). Deactivation restores the original PATH environment variable, reverting `python` and `pip` to point to the system Python. It also removes the environment name from the shell prompt. The environment directory and all installed packages remain on disk — they can be reactivated later. Not all shells need explicit deactivation; closing the terminal window also effectively deactivates.

**Q3: Why should you NOT install packages globally for project development?**
A: Global installation causes version conflicts when different projects require different versions of the same package. For example, Project A may need Flask 2.x while Project B needs Flask 1.x. With global installs, one project would break. Global installs also require administrator/sudo privileges, clutter the system Python, and make it difficult to reproduce environments on other machines. Virtual environments solve all these issues by providing per-project isolation.

**Q4: What files should be in a virtual environment directory? Should you commit it to version control?**
A: The environment directory contains `Include/`, `Lib/` (or `lib/`), `Scripts/` (or `bin/`), `pyvenv.cfg`, and potentially other files. **Never commit virtual environment directories to version control.** They are machine-specific, large, and can be reproduced from `requirements.txt`. Add the directory name (e.g., `env/`, `venv/`, `myenv/`) to `.gitignore`. Only commit `requirements.txt` (and optionally `pyproject.toml` or `Pipfile`).

**Q5: What is the purpose of `pyvenv.cfg` inside a virtual environment?**
A: `pyvenv.cfg` is a configuration file created by `venv` that contains metadata about the virtual environment. It includes `home` (path to the system Python installation used to create the environment), `include-system-site-packages` (whether the environment has access to global packages), and `version` (Python version). The Python executable in the virtual environment reads this file to determine its behavior and the location of the standard library.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting to activate the virtual environment before installing packages**
```bash
# Wrong: installs Flask globally, not in the environment
python -m venv myenv
pip install flask  # Uses global pip!

# Correct: activate first, then install
python -m venv myenv
source myenv/bin/activate  # or myenv\Scripts\activate
pip install flask
```

**Error 2: Committing the virtual environment directory to Git**
```bash
# Wrong: virtual environment tracked in version control
git add myenv/
git commit -m "Add virtual environment"

# Correct: add environment to .gitignore
echo "myenv/" >> .gitignore
# Only commit requirements.txt
pip freeze > requirements.txt
git add requirements.txt .gitignore
```

**Error 3: Using `deactivate` is not available (especially on Windows with some shells)**
```bash
# If deactivate command is not found, simply close the terminal
# Or on Windows, you can also run:
# myenv\Scripts\deactivate (if available)
# Alternatively, the environment is automatically deactivated when you close the terminal session.
```

## 📝 Practice Exercises

**Beginner:**
1. Create a virtual environment named `practice_env`, activate it, and verify that `python --version` points to the correct Python.
2. Inside the activated environment, install the `requests` package. Use `pip list` to confirm it is installed only in the environment (not globally).
3. Generate a `requirements.txt` from the environment, deactivate, then create a new environment and install from the file.

**Intermediate:**
4. Create two virtual environments — one with `numpy==1.24` and another with `numpy==1.26`. Write a script in each that prints `numpy.__version__` and verify they show different versions.
5. Set up a Flask project with a virtual environment. Install Flask, create a minimal "Hello World" Flask app, run it, and demonstrate that it's using the virtual environment's Python. Generate the requirements file.
6. Write a shell script (or batch file on Windows) that automates the setup of a new project: creates a venv, activates it, installs packages from a given requirements file, and runs a Python script.

**Advanced:**
7. Implement a Python script that programmatically creates a virtual environment using the `venv` module, installs a specified package using `subprocess` to call pip, and verifies the installation — all without manual terminal commands.
8. Build a dependency audit tool that compares the packages in two different virtual environments' requirements files and reports: (a) packages unique to each, (b) common packages with different versions, and (c) common packages with the same version.
