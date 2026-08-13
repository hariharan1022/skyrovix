## 32. PHP File Handling

## 📘 Introduction
PHP provides a comprehensive set of functions for reading, writing, and manipulating files on the server's filesystem. File handling is essential for logging, data storage, configuration management, CSV processing, and any application that persists data outside a database.

## 🧠 Key Concepts
- **fopen**: Opens a file or URL and returns a resource handle. Requires a mode (`r`, `w`, `a`, etc.).
- **fread**: Reads binary data from a file handle. Specify the number of bytes to read.
- **fgets**: Reads a single line from a file handle (useful for line-by-line processing).
- **fgetcsv**: Parses a line as CSV fields — returns an array.
- **fwrite / fputs**: Writes a string to a file handle.
- **fclose**: Closes an open file handle — always do this to free resources.
- **file_exists**: Checks if a file or directory exists.
- **filesize**: Returns the file size in bytes.
- **file_get_contents / file_put_contents**: Read/write entire file in one call (no handle needed).
- **feof**: Tests if the file pointer is at end-of-file.
- **flock**: Portable advisory file locking (prevents concurrent write corruption).

## 💻 Syntax
```php
<?php
// Open, read, close
$handle = fopen('file.txt', 'r');
$content = fread($handle, filesize('file.txt'));
fclose($handle);

// Line-by-line
$handle = fopen('file.txt', 'r');
while (($line = fgets($handle)) !== false) {
    echo $line;
}
fclose($handle);

// CSV parsing
$handle = fopen('data.csv', 'r');
while (($row = fgetcsv($handle)) !== false) {
    print_r($row);
}
fclose($handle);

// Write
$handle = fopen('file.txt', 'w');
fwrite($handle, "Hello World\n");
fclose($handle);

// One-liner
$data = file_get_contents('file.txt');
file_put_contents('output.txt', $data);
?>
```

## ✅ Example 1 - Basic
**Problem**: Read a text file line by line and display each line with its line number.

**Code** (`read_lines.php`):
```php
<?php
$filename = 'quotes.txt';

if (!file_exists($filename)) {
    die("File not found: $filename");
}

$handle = fopen($filename, 'r');
if (!$handle) {
    die("Cannot open file: $filename");
}

$lineNumber = 1;
while (($line = fgets($handle)) !== false) {
    echo "Line $lineNumber: " . htmlspecialchars($line) . "<br>\n";
    $lineNumber++;
}

fclose($handle);
?>
```

**Input** (`quotes.txt`):
```
The only limit is your mind.
Code is poetry.
Stay hungry, stay foolish.
```

**Output**:
```
Line 1: The only limit is your mind.
Line 2: Code is poetry.
Line 3: Stay hungry, stay foolish.
```

**Explanation**: `fgets()` reads one line at a time until the newline character or EOF. The loop continues until `fgets()` returns `false` (EOF). `fclose()` releases the file handle.

## 🚀 Example 2 - Intermediate
**Problem**: Use `flock` for safe concurrent writes to a log file, then read it back.

**Code** (`safe_logger.php`):
```php
<?php
function writeLog(string $message): void {
    $logFile = 'app.log';
    $handle = fopen($logFile, 'a');
    
    if (flock($handle, LOCK_EX)) {          // exclusive lock
        $timestamp = date('Y-m-d H:i:s');
        fwrite($handle, "[$timestamp] $message\n");
        flock($handle, LOCK_UN);            // release lock
    }
    
    fclose($handle);
}

// Simulate multiple writes
writeLog("User logged in");
writeLog("File uploaded: report.pdf");
writeLog("Database backup completed");

// Read the log
echo "<pre>" . file_get_contents('app.log') . "</pre>";
?>
```

**Output**:
```
[2026-06-23 10:15:30] User logged in
[2026-06-23 10:15:30] File uploaded: report.pdf
[2026-06-23 10:15:30] Database backup completed
```

**Explanation**: `flock($handle, LOCK_EX)` acquires an exclusive write lock, preventing two concurrent requests from interleaving writes. `LOCK_UN` releases it. `file_get_contents` reads the entire file in one call.

## 🏢 Real World Use Case
**Log Aggregator / Analytics Pipeline**: A high-traffic application writes structured JSON log lines using `fwrite` with `flock`. A separate worker process uses `file_get_contents` to batch-read logs periodically and ship them to an external analytics service (e.g., Elasticsearch, Logstash).

## 🎯 Interview Questions
1. What does `fopen()` return if the file cannot be opened?
2. What is the difference between `fgets()` and `fread()`?
3. Why should you always call `fclose()` after file operations?
4. How does `flock` prevent race conditions in concurrent file writes?
5. What is the advantage of `file_get_contents` over using `fopen`/`fread`/`fclose`?

## ⚠ Common Errors / Mistakes
- **Forgetting to check `file_exists()`**: Trying to read a non-existent file produces warnings.
- **Not checking `fopen()` return value**: `fopen` returns `false` on failure; passing `false` to `fread()` causes errors.
- **Missing `fclose()`**: File handles remain open until script end — can exhaust system resources on long-running scripts.
- **Ignoring flock in concurrent environments**: Simultaneous writes to the same file can produce interleaved or corrupted data.
- **Assuming `feof()` before `fgets()`**: `feof()` is only reliable after a read attempt, not before.

## 📝 Practice Exercises
**Beginner:**
1. Write a script that reads a file `data.txt` and echoes its contents to the browser using `file_get_contents`.
2. Create a file `names.txt` with 5 names, one per line. Use `fgets()` in a loop to display each name in an HTML list.
3. Write a script that checks if `config.ini` exists before trying to read it.

**Intermediate:**
4. Build a simple hit counter: read a number from `counter.txt`, increment it, write it back, and display the count. Use `flock` for safety.
5. Create a CSV parser using `fgetcsv` that reads `students.csv` (name, grade) and calculates the average grade.
6. Write a log rotation function that checks if `app.log` exceeds 1MB and, if so, renames it to `app.log.1` and starts a fresh file.

**Advanced:**
7. Build a class `FileLock` that implements `__destruct()` to automatically unlock and close file handles. Use it to safely manage concurrent writes from 10 simulated concurrent requests.
8. Create a reverse file reader that reads a large file (100MB+) from the end to the beginning efficiently, outputting the last N lines without loading the entire file into memory.
