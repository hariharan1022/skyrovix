## 47. Python File Handling

## 📘 Introduction
File handling is a core part of programming — reading configuration files, writing logs, processing data, and persisting user content. Python's built-in `open()` function provides a clean, consistent interface for file I/O. Combined with the `with` statement (context manager), file handling becomes safe, concise, and automatic (files are closed even if an error occurs).

## 🧠 Key Concepts
- `open(filename, mode, encoding)` returns a file object
- Read modes: `'r'` (read text), `'rb'` (read binary)
- Write modes: `'w'` (write — truncates), `'wb'` (write binary)
- Append modes: `'a'` (append to end), `'ab'` (append binary)
- Read+Write: `'r+'` (read and write, no truncate), `'w+'` (read and write, truncates), `'a+'` (read and append)
- `read()` reads entire content (or `n` bytes), `readline()` reads one line, `readlines()` returns list of lines
- `write(string)` writes a string to the file
- `close()` flushes and closes the file handle
- `with` statement (context manager) auto-closes the file when the block exits
- File paths can be absolute (`C:/folder/file.txt`) or relative (`data/input.csv`)
- Always specify `encoding` (e.g., `utf-8`) when working with text files

## 💻 Syntax
```python
# Basic
file = open("file.txt", "r", encoding="utf-8")
content = file.read()
file.close()

# With context manager (recommended)
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()
# File is automatically closed here
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a program that writes a shopping list to a file using `'w'` mode, then reads it back using `'r'` mode. Demonstrate `write()`, `read()`, and the `with` statement.

**Code:**
```python
# Write shopping list
items = ["Apples", "Bananas", "Milk", "Bread", "Eggs"]
with open("shopping.txt", "w", encoding="utf-8") as f:
    for item in items:
        f.write(item + "\n")

print("File written successfully.")

# Read shopping list
with open("shopping.txt", "r", encoding="utf-8") as f:
    content = f.read()

print("Contents of shopping.txt:")
print(content)
```

**Output:**
```
File written successfully.
Contents of shopping.txt:
Apples
Bananas
Milk
Bread
Eggs
```

**Explanation:** The `with open(...) as f` context manager opens the file and automatically closes it when the block ends — even if an exception occurs. The `'w'` mode creates a new file (or overwrites an existing one). Each item is written with a newline. When reading with `'r'` mode, `read()` returns the entire file content as a single string.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Read a CSV-style data file containing student records, process each line, compute averages, and write a summary report. Demonstrate `readline()`, `strip()`, `split()`, and error handling.

**Code:**
```python
# Prepare sample data
with open("students.csv", "w", encoding="utf-8") as f:
    f.write("Name,Math,Science,English\n")
    f.write("Alice,85,92,78\n")
    f.write("Bob,70,65,80\n")
    f.write("Charlie,95,88,92\n")

# Process the file
with open("students.csv", "r", encoding="utf-8") as f:
    header = f.readline().strip().split(",")
    print("Subjects:", header[1:])

    print("\nStudent Averages:")
    for line in f:
        parts = line.strip().split(",")
        name = parts[0]
        scores = list(map(int, parts[1:]))
        avg = sum(scores) / len(scores)
        print(f"  {name}: {avg:.1f}")

# Write summary
with open("summary.txt", "w", encoding="utf-8") as f:
    f.write("Grade Summary\n")
    f.write("=============\n")
    with open("students.csv", "r", encoding="utf-8") as infile:
        next(infile)  # skip header
        for line in infile:
            parts = line.strip().split(",")
            name = parts[0]
            scores = list(map(int, parts[1:]))
            avg = sum(scores) / len(scores)
            grade = "A" if avg >= 90 else "B" if avg >= 80 else "C" if avg >= 70 else "D"
            f.write(f"{name}: {avg:.1f} ({grade})\n")
```

**Output:**
```
Subjects: ['Math', 'Science', 'English']

Student Averages:
  Alice: 85.0
  Bob: 71.7
  Charlie: 91.7
```

**Explanation:** The file is read line by line using iteration over the file object (which is memory-efficient for large files). The first line is consumed as a header via `f.readline()`. Each subsequent line is split into fields, scores are converted to integers, and the average is computed. The summary is written to a separate file. Two nested `with` statements handle reading from one file and writing to another simultaneously.

## 🏢 Real World Use Case
**Log File Processing:** Server logs are typically written in append mode (`'a'`) and rotated daily. A log analyzer opens the current log file, reads new entries since the last read position (using `readline()` in a loop), parses structured log lines, and writes aggregated statistics to a report file. Context managers ensure log files are never left open, which is critical in long-running applications.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the difference between `'r'`, `'rb'`, and `'r+'` modes?**
*`'r'` opens a text file for reading only. `'rb'` opens a binary file for reading. `'r+'` opens a text file for both reading and writing without truncating it.*

**Q2. Why should you use the `with` statement for file handling?**
*The `with` statement ensures the file is properly closed when the block exits, even if an exception occurs. It eliminates the need for explicit `close()` calls and prevents resource leaks.*

**Q3. What happens if you call `write()` before closing a file?**
*Data is buffered in memory. It is written to disk when the buffer is full, when `flush()` is called, or when the file is closed. Always close (or use `with`) to ensure data persistence.*

**Q4. How do you handle file-not-found errors?**
*Use a `try/except FileNotFoundError` block around the `open()` call. Alternatively, use `os.path.exists()` or `pathlib.Path.exists()` to check before opening.*

**Q5. What is the purpose of the `encoding` parameter in `open()`?**
*The `encoding` parameter specifies the character encoding for text files. Using `encoding='utf-8'` ensures cross-platform compatibility and avoids `UnicodeDecodeError`/`UnicodeEncodeError`.*

## ⚠ Common Errors / Mistakes
- Forgetting to specify `encoding='utf-8'` — causes `UnicodeDecodeError` on files with non-ASCII characters.
- Using `'w'` mode when you intended `'a'` — `'w'` truncates the file, destroying existing data.
- Not closing files (or not using `with`) — causes resource leaks and potential data loss.
- Assuming `read()` returns lines — it returns the entire file as a single string. Use `readlines()` or iteration for line-by-line processing.
- Hardcoding file paths with backslashes without raw strings — use forward slashes or raw strings (`r"C:\path"`).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Write a program that creates a file called `notes.txt` and writes three lines of text to it. Then read the file and print its contents.
2. Write a program that opens a file, reads its content, and prints the number of characters and lines in the file.
3. Write a program that appends the current date and time to a file called `log.txt` each time it is run.

**Intermediate:**
4. Write a program that reads a text file, counts the frequency of each word (case-insensitive), and writes the top 10 most common words to a file called `word_freq.txt`.
5. Write a program that merges two text files into a third file. Read from `file1.txt` and `file2.txt`, write to `merged.txt` with alternating lines from each file.
6. Write a program that reads a CSV file of products (name, price, quantity), calculates the total value (price * quantity) for each product, and writes a report with product name, total value, and grand total.

**Advanced:**
7. Write a program that monitors a log file for new entries (tail -f behavior). Use `'r'` mode with `readline()` in a loop, tracking the file size. Re-open the file if it is rotated (file size decreases or inode changes). Write new entries found to a separate `alerts.log` file if they contain the word "ERROR".
8. Write a program that reads a large JSON-lines file (one JSON object per line, 1GB+), processes each record, and handles partial writes (incomplete lines at the end of the file due to a crash). Write successfully processed records to a `.processed` file and resume from where it left off. Use `tell()` and `seek()` to track the read position.
