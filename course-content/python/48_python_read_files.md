## 48. Python Read Files

## 📘 Introduction
Reading files is one of the most common programming tasks. Python offers multiple strategies: reading the entire file at once, reading line by line (memory efficient), or reading specific byte chunks. The choice depends on file size and the task at hand. The `with open() as f` pattern is the gold standard — it guarantees the file is closed regardless of errors.

## 🧠 Key Concepts
- `read()` returns the entire file content as a single string (or bytes in binary mode)
- `read(n)` reads exactly `n` bytes/characters from the current position
- `readline()` reads until the next newline (including the newline)
- `readlines()` returns a list where each element is one line
- Iterating over the file object (`for line in f:`) reads line by line efficiently
- Large files should be processed incrementally to avoid memory exhaustion
- `with open() as f:` is the standard context manager pattern
- Check file existence with `os.path.exists(path)` or `Path(path).exists()`
- The file cursor position is tracked internally; `tell()` returns it, `seek()` moves it

## 💻 Syntax
```python
with open("file.txt", "r", encoding="utf-8") as f:
    # Read all at once
    content = f.read()

    # Read n characters
    chunk = f.read(100)

    # Read one line
    line = f.readline()

    # Read all lines into list
    lines = f.readlines()

    # Iterate line by line (memory efficient)
    for line in f:
        print(line.strip())
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a sample file with numbers, then demonstrate three ways to read it: reading the entire file, reading line by line, and reading all lines into a list. Print the line count.

**Code:**
```python
# Create a sample file
with open("numbers.txt", "w", encoding="utf-8") as f:
    for i in range(1, 6):
        f.write(f"Line {i}: {i * 10}\n")

# Method 1: read entire file
with open("numbers.txt", "r", encoding="utf-8") as f:
    content = f.read()
print("=== read() ===")
print(repr(content[:50]))

# Method 2: read line by line
with open("numbers.txt", "r", encoding="utf-8") as f:
    print("\n=== Iteration ===")
    for line in f:
        print(f"  {line.strip()}")

# Method 3: readlines()
with open("numbers.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
print(f"\n=== readlines() ===")
print(f"Total lines: {len(lines)}")
print(f"First line: {lines[0].strip()}")
```

**Output:**
```
=== read() ===
'Line 1: 10\nLine 2: 20\nLine 3: 30\nLine 4'

=== Iteration ===
  Line 1: 10
  Line 2: 20
  Line 3: 30
  Line 4: 40
  Line 5: 50

=== readlines() ===
Total lines: 5
First line: Line 1: 10
```

**Explanation:** Three reading strategies are demonstrated. `read()` loads everything into memory — fine for small files. Iteration (`for line in f:`) reads one line at a time into memory, suitable for large files. `readlines()` loads all lines into a list — convenient for random access but memory-heavy for large files.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Process a large data file that contains sensor readings. Read the file in chunks of 100 bytes at a time to demonstrate `read(n)`, handle partial lines, and track progress using `tell()`. Check file existence before reading.

**Code:**
```python
import os

# Create sample sensor data
with open("sensors.log", "w", encoding="utf-8") as f:
    for i in range(1, 21):
        f.write(f"SENSOR_{i:02d}: temp={20 + i * 0.5:.1f}C, humidity={40 + i}%\n")

file_path = "sensors.log"

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found")
else:
    file_size = os.path.getsize(file_path)
    print(f"File size: {file_size} bytes")
    print(f"File exists: {os.path.exists(file_path)}")

    buffer = ""
    with open(file_path, "r", encoding="utf-8") as f:
        while True:
            chunk = f.read(50)
            if not chunk:
                break
            buffer += chunk
            # Process complete lines in buffer
            while "\n" in buffer:
                line, buffer = buffer.split("\n", 1)
                if line:
                    parts = line.split(",")
                    sensor = parts[0]
                    temp = parts[1].split("=")[1]
                    print(f"{sensor}: {temp}")

            pos = f.tell()
            print(f"  [Cursor at byte {pos}/{file_size}]")
```

**Output:**
```
File size: 507 bytes
File exists: True
SENSOR_01: 20.5C
  [Cursor at byte 50/507]
SENSOR_02: 21.0C
SENSOR_03: 21.5C
  [Cursor at byte 100/507]
SENSOR_04: 22.0C
SENSOR_05: 22.5C
  [Cursor at byte 150/507]
...
```

**Explanation:** The file is read in 50-byte chunks. A `buffer` accumulates chunks and lines are extracted from it. This approach prevents cutting a line in half across two reads. `f.tell()` reports the current cursor position, useful for progress tracking or resumable reading. `os.path.exists()` checks file existence before attempting to open it, avoiding `FileNotFoundError`.

## 🏢 Real World Use Case
**Log File Tail with Resume:** A monitoring service reads a growing log file in 4KB chunks using `read(4096)`. After processing, it saves the current `tell()` position to a state file. On restart, it `seek()`s to the saved position and resumes reading — avoiding re-processing old entries and handling log rotation gracefully.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the difference between `read()`, `readline()`, and `readlines()`?**
*`read()` returns the entire file as a single string. `readline()` returns the next line (including newline). `readlines()` returns a list of all lines. Use `read()` for small files, iteration/`readline()` for large files, `readlines()` when you need random line access.*

**Q2. How do you read a file without loading it entirely into memory?**
*Iterate over the file object (`for line in f:`) or use `f.read(chunk_size)` in a loop. Both process small portions at a time.*

**Q3. What does `f.tell()` return and how is it used?**
*`tell()` returns the current cursor position (byte offset from the start). It is used for tracking progress, implementing resume logic, or verifying read/write position.*

**Q4. How do you check if a file exists before reading it?**
*Use `os.path.exists(path)` or `Path(path).exists()` from `pathlib`. Alternatively, catch `FileNotFoundError` when calling `open()`.*

**Q5. What happens if you call `read()` after already reading part of a file?**
*`read()` returns the remaining content from the current cursor position to end of file. If the entire file was already consumed, it returns an empty string.*

## ⚠ Common Errors / Mistakes
- Not specifying `encoding='utf-8'` — causes `UnicodeDecodeError` on files with non-ASCII characters.
- Calling `read()` on a very large file — uses massive amounts of memory; use iterative reading instead.
- Forgetting that `readline()` includes the trailing newline — call `.strip()` or `.rstrip('\n')`.
- Assuming a file pointer resets to the beginning — it doesn't; use `f.seek(0)` to re-read.
- Not checking file existence before reading — use `os.path.exists()` or `try/except`.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Write a program that reads a text file and prints the first 5 lines (or all lines if fewer than 5).
2. Write a program that reads a file and counts the number of words in it.
3. Write a program that reads a file, removes all blank lines, and prints the remaining lines.

**Intermediate:**
4. Write a program that reads a large file (e.g., 500MB) by processing it in chunks of 1024 bytes. Count the total number of newline characters without loading the entire file.
5. Write a program that reads a configuration file in `key=value` format (one per line), ignores comments (lines starting with `#`), and returns a dictionary of the parsed values.
6. Write a program that reads two files and compares them line by line. Print the first line number where they differ, or print "Files are identical."

**Advanced:**
7. Write a program that reads a file backwards — from the last line to the first — without loading the entire file into memory. Use `seek()` and `read()` to find line boundaries from the end of the file. Print the last N lines (tail -n behavior).
8. Write a program that implements a simple grep utility: read a file in 4KB chunks, search for a regex pattern across chunk boundaries (patterns may span two chunks), highlight matches in the output, and show line numbers. Handle very large files (multi-GB) without memory issues. Track byte positions so you can report file offsets.
