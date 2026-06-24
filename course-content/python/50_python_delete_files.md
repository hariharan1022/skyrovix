## 50. Python Delete Files

## 📘 Introduction
Deleting files and directories is a critical file system operation. Python provides tools at multiple levels: `os.remove()` for individual files, `os.rmdir()` for empty directories, `shutil.rmtree()` for entire directory trees, and `pathlib.Path.unlink()` for a modern object-oriented approach. Safe deletion requires checking existence, handling permissions, and understanding the differences between these functions.

## 🧠 Key Concepts
- `os.remove(path)` — deletes a single file
- `os.unlink(path)` — identical to `os.remove()`
- `os.rmdir(path)` — deletes an empty directory (raises `OSError` if not empty)
- `shutil.rmtree(path)` — recursively deletes a directory and all its contents (use with extreme caution)
- `pathlib.Path(path).unlink()` — deletes a file using pathlib's object-oriented API
- `pathlib.Path(path).rmdir()` — deletes an empty directory via pathlib
- `pathlib.Path(path).exists()` — check if path exists before deletion
- `os.path.exists(path)` — traditional existence check
- Permission errors occur when the file is read-only, in use, or the user lacks rights
- `os` module provides low-level OS operations; `pathlib` offers a modern, cross-platform path interface

## 💻 Syntax
```python
import os
import shutil
from pathlib import Path

# Delete a file
os.remove("file.txt")
os.unlink("file.txt")        # same as remove
Path("file.txt").unlink()    # pathlib style

# Delete empty directory
os.rmdir("empty_dir")
Path("empty_dir").rmdir()

# Delete directory and all contents
shutil.rmtree("non_empty_dir")

# Safe deletion with existence check
if os.path.exists("file.txt"):
    os.remove("file.txt")

if Path("file.txt").exists():
    Path("file.txt").unlink()
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create, verify existence of, and safely delete temporary files using `os.remove()` and `pathlib.Path.unlink()`. Handle errors gracefully.

**Code:**
```python
import os
from pathlib import Path

# Create some temp files
for name in ["temp_a.txt", "temp_b.txt", "temp_c.txt"]:
    with open(name, "w") as f:
        f.write(f"Temporary data in {name}")

print("Files created:")
for name in ["temp_a.txt", "temp_b.txt", "temp_c.txt"]:
    exists = os.path.exists(name)
    print(f"  {name}: exists={exists}")

# Delete using os.remove with existence check
if os.path.exists("temp_a.txt"):
    os.remove("temp_a.txt")
    print(f"\nDeleted temp_a.txt (os.remove)")
else:
    print(f"\ntemp_a.txt not found")

# Delete using pathlib with existence check
path_b = Path("temp_b.txt")
if path_b.exists():
    path_b.unlink()
    print(f"Deleted temp_b.txt (pathlib.unlink)")
else:
    print(f"temp_b.txt not found")

# Attempt to delete a non-existent file (handle error)
try:
    os.remove("temp_z.txt")
except FileNotFoundError as e:
    print(f"Error deleting temp_z.txt: {e}")

# Delete the remaining file
Path("temp_c.txt").unlink(missing_ok=True)
print(f"Deleted temp_c.txt (with missing_ok=True)")

print("\nFinal state:")
for name in ["temp_a.txt", "temp_b.txt", "temp_c.txt"]:
    print(f"  {name}: exists={os.path.exists(name)}")
```

**Output:**
```
Files created:
  temp_a.txt: exists=True
  temp_b.txt: exists=True
  temp_c.txt: exists=True

Deleted temp_a.txt (os.remove)
Deleted temp_b.txt (pathlib.unlink)
Error deleting temp_z.txt: [WinError 2] The system cannot find the file specified: 'temp_z.txt'
Deleted temp_c.txt (with missing_ok=True)

Final state:
  temp_a.txt: exists=False
  temp_b.txt: exists=False
  temp_c.txt: exists=False
```

**Explanation:** Two deletion approaches are shown — `os.remove()` (traditional) and `Path.unlink()` (modern). Both require existence checks to avoid errors. The `try/except` catches `FileNotFoundError` for missing files. `Path.unlink(missing_ok=True)` (Python 3.8+) silently does nothing if the file doesn't exist, making it the most concise safe deletion method.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Recursively delete a directory tree with `shutil.rmtree()`, handle permission errors, delete empty directories with `os.rmdir()`, and use pathlib for a clean implementation.

**Code:**
```python
import os
import shutil
from pathlib import Path
import stat
import tempfile

# Create a test directory structure
base = Path("test_project")
base.mkdir(exist_ok=True)
(base / "src").mkdir()
(base / "docs").mkdir()
(base / "src" / "__pycache__").mkdir()
(base / "src" / "main.py").write_text("print('hello')\n")
(base / "src" / "utils.py").write_text("def helper(): pass\n")
(base / "docs" / "readme.md").write_text("# Project\n")
(base / "config.json").write_text('{"version": 1}\n')

print("Created directory structure:")
for p in sorted(base.rglob("*")):
    print(f"  {p}")

# Delete empty subdirectories using os.rmdir
print("\nDeleting empty directories:")
for p in sorted(base.rglob("*"), reverse=True):
    if p.is_dir():
        try:
            os.rmdir(p)
            print(f"  Removed empty dir: {p}")
        except OSError:
            print(f"  Skipped (not empty): {p}")

# Recreate for rmtree demo
(base / "src" / "__pycache__").mkdir()
(base / "src" / "main.py").write_text("print('hello')\n")
(base / "src" / "utils.py").write_text("def helper(): pass\n")
(base / "docs" / "readme.md").write_text("# Project\n")
(base / "config.json").write_text('{"version": 1}\n')

# Delete entire tree using shutil.rmtree
print("\nDeleting entire project tree with shutil.rmtree:")
if base.exists():
    try:
        shutil.rmtree(base)
        print(f"  Deleted: {base}")
        print(f"  Exists after: {base.exists()}")
    except PermissionError as e:
        print(f"  Permission error: {e}")
    except Exception as e:
        print(f"  Error: {e}")
```

**Output:**
```
Created directory structure:
  test_project\config.json
  test_project\docs
  test_project\docs\readme.md
  test_project\src
  test_project\src\__pycache__
  test_project\src\main.py
  test_project\src\utils.py

Deleting empty directories:
  Removed empty dir: test_project\src\__pycache__
  Removed empty dir: test_project\docs
  Removed empty dir: test_project\src
  Removed empty dir: test_project

Deleting entire project tree with shutil.rmtree:
  Deleted: test_project
  Exists after: False
```

**Explanation:** `os.rmdir()` only succeeds on empty directories — it is safe but limited. `shutil.rmtree()` recursively deletes all files, subdirectories, and the root directory itself. It is powerful but dangerous — there is no undo. The `PermissionError` catch handles cases where files are read-only or locked by another process. When removing `test_project` with `rmtree`, all contents are deleted in one call.

## 🏢 Real World Use Case
**Temporary File Cleanup in ETL Pipelines:** An ETL (Extract, Transform, Load) pipeline downloads CSV files to a `temp/` directory, processes them, and loads data into a database. After successful completion, `shutil.rmtree("temp/")` removes all downloaded and intermediate files. A `try/finally` block ensures cleanup even if the pipeline fails mid-way. Before deletion, the script checks that critical output files exist in the target database to avoid deleting inputs before processing is confirmed.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the difference between `os.remove()` and `os.unlink()`?**
*There is no difference — `os.unlink()` is an alias for `os.remove()`. Both delete a single file.*

**Q2. Why does `os.rmdir()` fail on a non-empty directory?**
*`os.rmdir()` is designed to only delete empty directories as a safety measure. Use `shutil.rmtree()` to delete a directory and all its contents, or iterate and delete files first with `os.remove()`.*

**Q3. How do you safely delete a file that might not exist?**
*Check with `os.path.exists()` or `Path.exists()` before deleting. In Python 3.8+, use `Path.unlink(missing_ok=True)` which silently ignores missing files. Alternatively, catch `FileNotFoundError` around `os.remove()`.*

**Q4. What causes `PermissionError` during file deletion?**
*The file may be read-only, currently open by another process (on Windows), or the user may lack delete permissions for the directory. On Unix, the directory's write permission is required; on Windows, the file handle must not be exclusively locked.*

**Q5. What are the advantages of `pathlib.Path` over `os` module for file deletion?**
*`pathlib` provides an object-oriented API with method chaining, `missing_ok=True` for safe deletion, `exists()` checks integrated into the same object, and cross-platform path handling without manual string joining.*

## ⚠ Common Errors / Mistakes
- Calling `os.rmdir()` on a non-empty directory — raises `OSError: [Errno 39] Directory not empty`.
- Using `shutil.rmtree()` without checking the path first — if the path is wrong (e.g., empty string), you could delete unexpected content. Always validate.
- Forgetting about read-only files — `shutil.rmtree()` may fail on read-only files. Use `shutil.rmtree(path, onexc=...)` (Python 3.12+) or `os.chmod()` to handle permissions.
- Not handling `FileNotFoundError` or `PermissionError` — crashes the program on unexpected file states.
- Assuming deletion is instant — on networked drives or with antivirus scanning, deletion may be delayed. Use existence checks after deletion if required.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Write a program that creates a file `test_delete.txt`, checks it exists, deletes it using `os.remove()`, and prints a confirmation.
2. Write a program that creates an empty directory `empty_folder`, deletes it with `os.rmdir()`, and verifies deletion.
3. Write a program that uses `Path.unlink(missing_ok=True)` to delete three files, some of which may not exist, without errors.

**Intermediate:**
4. Write a program that deletes all `.log` files older than 7 days in the current directory. Use `os.path.getmtime()` to check file age and `os.remove()` to delete.
5. Write a program that creates a nested directory structure with files, then deletes only empty subdirectories (not files). Traverse with `os.walk()` or `Path.rglob()`.
6. Write a program that safely moves a file to a "trash" directory instead of deleting it. If a file with the same name exists in trash, rename it (append a timestamp). Implement a `restore(filename)` function that moves it back.

**Advanced:**
7. Write a program that implements a secure file deletion utility: overwrite the file content with random data before deleting it (to prevent forensic recovery). Overwrite in 3 passes: random bytes, then zeros, then random bytes. Use `'wb'` mode and `os.urandom()`. Handle large files by writing in chunks. Measure the time taken.
8. Write a program that monitors a directory for files to delete via a marker file (e.g., `delete_me.txt` marker in each subdirectory). The program reads a manifest file listing paths to delete, validates each path is within an allowed sandbox directory (prevents path traversal attacks), logs all deletions to an audit file, and supports dry-run mode (print what would be deleted without actually deleting). Use pathlib throughout and handle all edge cases (symlinks, junctions, read-only files).
