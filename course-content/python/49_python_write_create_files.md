## 49. Python Write/Create Files

## 📘 Introduction
Writing and creating files is essential for persistence, logging, reporting, and data export. Python provides several write modes: `'w'` (overwrite), `'a'` (append), `'x'` (exclusive creation), and binary variants. The `with open() as f` pattern ensures data is flushed and the file handle is closed properly. Knowing when to overwrite vs append, and how to handle file existence, prevents accidental data loss.

## 🧠 Key Concepts
- `'w'` mode: opens file for writing — creates new file or **truncates existing file**
- `'a'` mode: opens file for appending — creates if absent, writes to end if exists
- `'x'` mode: exclusive creation — creates new file, raises `FileExistsError` if it exists
- `'wb'`, `'ab'`, `'xb'`: binary equivalents for writing bytes
- `write(string)` writes a string to the file (does NOT add newline automatically)
- `writelines(list)` writes an iterable of strings (no newlines added — caller must include them)
- New files are created by simply opening in `'w'`, `'a'`, or `'x'` mode
- Check if a file exists before writing using `os.path.exists()` or `Path.exists()`
- Binary mode (`'wb'`) is used for images, serialized objects, audio files, etc.
- Always flush/close files — the `with` statement guarantees this

## 💻 Syntax
```python
# Write (overwrite)
with open("file.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")
    f.writelines(["line1\n", "line2\n"])

# Append
with open("file.txt", "a", encoding="utf-8") as f:
    f.write("Appended line\n")

# Exclusive creation
try:
    with open("new.txt", "x", encoding="utf-8") as f:
        f.write("Brand new file\n")
except FileExistsError:
    print("File already exists")
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Demonstrate the difference between `'w'` (write/overwrite) and `'a'` (append) modes. Create a file with initial content, then append additional data, and finally overwrite it.

**Code:**
```python
import os

# Step 1: Create with initial content (w mode)
with open("journal.txt", "w", encoding="utf-8") as f:
    f.write("Day 1: Started learning Python.\n")
    f.write("Day 2: Learned about file handling.\n")

print("After initial write:")
with open("journal.txt", "r", encoding="utf-8") as f:
    print(f.read())

# Step 2: Append more content (a mode)
with open("journal.txt", "a", encoding="utf-8") as f:
    f.write("Day 3: Practiced writing files.\n")
    f.write("Day 4: Explored append mode.\n")

print("After append:")
with open("journal.txt", "r", encoding="utf-8") as f:
    print(f.read())

# Step 3: Overwrite (w mode — truncates!)
with open("journal.txt", "w", encoding="utf-8") as f:
    f.write("Journal reset on new topic.\n")

print("After overwrite (w mode):")
with open("journal.txt", "r", encoding="utf-8") as f:
    print(f.read())

print(f"File size: {os.path.getsize('journal.txt')} bytes")
```

**Output:**
```
After initial write:
Day 1: Started learning Python.
Day 2: Learned about file handling.

After append:
Day 1: Started learning Python.
Day 2: Learned about file handling.
Day 3: Practiced writing files.
Day 4: Explored append mode.

After overwrite (w mode):
Journal reset on new topic.

File size: 33 bytes
```

**Explanation:** The first `'w'` creates the file with two lines. The `'a'` mode adds two more lines to the end without disturbing existing content. The second `'w'` truncates the file and writes a single line — all previous data is gone. This demonstrates the critical difference: `'a'` preserves history, `'w'` replaces it.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Build a program that collects user feedback and stores it in a file. Use `'a'` for appending, `'x'` for creating an initial config file, and `'wb'` for writing a binary backup. Check file existence before critical operations.

**Code:**
```python
import os
import pickle

FEEDBACK_FILE = "feedback.txt"
CONFIG_FILE = "config.ini"
BACKUP_FILE = "feedback.backup"

# Create config file (exclusive mode — fail if exists)
if not os.path.exists(CONFIG_FILE):
    try:
        with open(CONFIG_FILE, "x", encoding="utf-8") as f:
            f.write("[settings]\n")
            f.write("max_feedback_length=500\n")
            f.write("allow_anonymous=true\n")
        print(f"Created {CONFIG_FILE}")
    except FileExistsError:
        pass  # another process created it

# Collect and store feedback (append mode)
def submit_feedback(name, message):
    if len(message) > 500:
        print("Feedback too long (max 500 chars).")
        return
    with open(FEEDBACK_FILE, "a", encoding="utf-8") as f:
        f.write(f"{name}|{message}\n")
    print("Feedback saved!")

submit_feedback("Alice", "Great course!")
submit_feedback("Bob", "Loved the file handling section.")

# Display all feedback
print("\nAll feedback entries:")
with open(FEEDBACK_FILE, "r", encoding="utf-8") as f:
    for line in f:
        name, msg = line.strip().split("|", 1)
        print(f"  {name}: {msg}")

# Binary backup using writelines
feedback_list = []
with open(FEEDBACK_FILE, "r", encoding="utf-8") as f:
    feedback_list = f.readlines()

with open(BACKUP_FILE, "wb") as f:
    pickle.dump(feedback_list, f)

print(f"\nBinary backup written to {BACKUP_FILE} ({os.path.getsize(BACKUP_FILE)} bytes)")
```

**Output:**
```
Created config.ini
Feedback saved!
Feedback saved!

All feedback entries:
  Alice: Great course!
  Bob: Loved the file handling section.

Binary backup written to feedback.backup (87 bytes)
```

**Explanation:** The `'x'` mode safely creates a config file only if it doesn't exist — useful for first-run setup. The `'a'` mode accumulates feedback entries without losing previous data. Binary mode `'wb'` writes a serialized Python object via `pickle.dump()` — this preserves Python data structures but is not human-readable. `os.path.exists()` guards each operation to avoid file existence errors.

## 🏢 Real World Use Case
**Application Logging:** A web server writes request logs using `'a'` mode on a daily log file. Each request appends a single line. Log rotation renames the old file and creates a fresh one. The exclusive mode `'x'` prevents race conditions when multiple worker processes attempt to create the new log file simultaneously.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the difference between `'w'` and `'a'` modes?**
*`'w'` opens the file for writing, truncating it to zero length first (overwrites). `'a'` opens the file for writing at the end — it never truncates, so existing data is preserved.*

**Q2. What is exclusive creation mode (`'x'`) and when would you use it?**
*`'x'` creates a new file but raises `FileExistsError` if the file already exists. Use it for lock files, first-run setup, or any scenario where accidentally overwriting an existing file would be dangerous.*

**Q3. Does `write()` add a newline after each call?**
*No — `write()` writes exactly the string you give it. You must explicitly add `\n` if you want a newline.*

**Q4. How is `writelines()` different from `write()`?**
*`writelines()` takes an iterable of strings and writes each one sequentially. It does NOT add newlines — the strings must already contain them if desired. It is equivalent to calling `write()` for each string.*

**Q5. How do you write binary data (e.g., an image) to a file?**
*Open the file with `'wb'` mode and use `write(bytes_data)`. For text content, always specify `encoding='utf-8'`; for binary data, no encoding is needed.*

## ⚠ Common Errors / Mistakes
- Using `'w'` when `'a'` was intended — accidentally truncating an existing file (this is irreversible).
- Forgetting that `write()` does not add newlines — resulting in everything on one line.
- Writing binary mode (`'wb'`) without converting text to bytes first — use `.encode('utf-8')` or just use text mode.
- Not closing the file — data may remain in the buffer and never be written to disk. Always use `with`.
- Using `'x'` without catching `FileExistsError` — the exception crashes the program if the file exists.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Write a program that creates a file called `countdown.txt` and writes numbers 10 down to 1, each on a new line.
2. Write a program that appends the current time and a user-input message to a file called `diary.txt`.
3. Write a program that creates a file `multiplication.txt` and writes the multiplication table of 5 (1 to 10).

**Intermediate:**
4. Write a program that reads a list of strings from the user (one at a time, stop on empty input) and writes them to a file using `writelines()`. Each string should be on a separate line.
5. Write a program that splits a large file into smaller chunks. Read `large.txt`, write `part1.txt`, `part2.txt`, etc., each containing no more than 100 lines (except possibly the last).
6. Write a program that merges multiple text files into one. Accept a list of filenames, write all their contents sequentially into `merged_output.txt`. Insert a comment line `# --- filename ---` before each file's content.

**Advanced:**
7. Write a program that implements a simple journaling file system: for each write operation, append to a write-ahead log (`wal.log`), then update the main data file (`data.db`). On startup, replay `wal.log` to recover any lost writes. Use `'a'` for the WAL and `'w'` for the data file. Simulate a crash by not calling `close()` (or by truncating the data file) and demonstrate recovery.
8. Write a program that safely writes to a file using atomic write pattern: write to a temporary file (`output.txt.tmp`) in the same directory, then rename it to the target filename (`output.txt`) using `os.replace()`. This prevents partial/corrupt files if the program crashes mid-write. Demonstrate with a multi-step write that would leave a half-written file without this pattern.
