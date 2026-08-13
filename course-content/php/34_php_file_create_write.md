## 34. PHP File Create / Write

## 📘 Introduction
Writing files in PHP is essential for data export, logging, caching, configuration persistence, and report generation. PHP offers both low-level (`fopen`/`fwrite`/`fclose`) and high-level (`file_put_contents`) approaches, along with CSV-specific writing via `fputcsv`.

## 🧠 Key Concepts
- **fopen with w mode**: Opens for writing only; places file pointer at the **beginning** and **truncates** the file (erases existing content). Creates the file if it does not exist.
- **fopen with a mode**: Opens for writing only; places file pointer at the **end** (appends). Creates the file if it does not exist.
- **fwrite**: Writes a string to the file handle. Returns number of bytes written, or `false` on failure.
- **file_put_contents**: Writes a string to a file in one call. Overwrites by default; use `FILE_APPEND` flag to append. Returns bytes written.
- **fputcsv**: Formats a line as CSV and writes it to the file handle — handles quoting and escaping automatically.
- **chmod**: Changes file permissions (`0644`, `0755`). Important for ensuring written files are readable/writable by the web server.
- **Appending vs Overwriting**: Choose `a` mode or `FILE_APPEND` flag to preserve existing content; use `w` mode or no flag to replace.

## 💻 Syntax
```php
<?php
// Overwrite (w mode)
$handle = fopen('file.txt', 'w');
fwrite($handle, "New content\n");
fclose($handle);

// Append (a mode)
$handle = fopen('file.txt', 'a');
fwrite($handle, "Appended line\n");
fclose($handle);

// One-liner overwrite
file_put_contents('file.txt', "Hello World\n");

// One-liner append
file_put_contents('file.txt', "More data\n", FILE_APPEND | LOCK_EX);

// Write CSV
$handle = fopen('data.csv', 'w');
fputcsv($handle, ['Name', 'Email', 'Age']);
fputcsv($handle, ['Alice', 'alice@example.com', 30]);
fclose($handle);

// Set permissions
chmod('file.txt', 0644);
?>
```

## ✅ Example 1 - Basic
**Problem**: Create a log file, write entries, and append a new entry without losing existing data.

**Code** (`log_writer.php`):
```php
<?php
$logFile = 'app.log';

// Create/overwrite with initial entry
file_put_contents($logFile, "=== App Started ===\n");

// Append entries
file_put_contents($logFile, "User login: admin\n", FILE_APPEND);
file_put_contents($logFile, "Action: update profile\n", FILE_APPEND);

// Append via fopen + fwrite (more control)
$handle = fopen($logFile, 'a');
fwrite($handle, "Session ended: " . date('H:i:s') . "\n");
fclose($handle);

// Show result
echo nl2br(file_get_contents($logFile));
?>
```

**Output**:
```
=== App Started ===
User login: admin
Action: update profile
Session ended: 14:32:18
```

**Explanation**: The first `file_put_contents` creates the file (overwrites if exists). Subsequent calls with `FILE_APPEND` preserve existing content. The `fopen('a')` + `fwrite` approach appends a timestamped line.

## 🚀 Example 2 - Intermediate
**Problem**: Export an array of user data to a CSV file with proper headers and formatting.

**Code** (`csv_export.php`):
```php
<?php
$users = [
    ['name' => 'Alice', 'email' => 'alice@example.com', 'age' => 30],
    ['name' => 'Bob',   'email' => 'bob@example.com',   'age' => 25],
    ['name' => 'Charlie', 'email' => 'charlie@example.com', 'age' => 35],
];

$filename = 'users_export.csv';
$handle = fopen($filename, 'w');

// Write header
fputcsv($handle, ['Full Name', 'Email Address', 'Age (Years)']);

// Write data rows
foreach ($users as $user) {
    fputcsv($handle, [$user['name'], $user['email'], $user['age']]);
}

fclose($handle);

// Set readable permissions
chmod($filename, 0644);

echo "Exported " . count($users) . " users to $filename";

// Preview
echo "<pre>" . file_get_contents($filename) . "</pre>";
?>
```

**Output**:
```
Exported 3 users to users_export.csv

Full Name,Email Address,Age (Years)
Alice,alice@example.com,30
Bob,bob@example.com,25
Charlie,charlie@example.com,35
```

**Explanation**: `fputcsv` handles proper CSV quoting and escaping automatically. The header row is written via `fputcsv` as well. `chmod` ensures the file is web-server readable. This pattern is used in admin export features.

## 🏢 Real World Use Case
**Report Generator**: A monthly billing system queries the database for invoices, generates a CSV file with `fputcsv`, writes it to a secure directory, sets permissions with `chmod(0644)`, and emails a download link to the finance team. The file is created with a timestamped filename to avoid collisions.

## 🎯 Interview Questions
1. What happens to existing content when you open a file with `fopen('w')`?
2. How do you append data to an existing file using `file_put_contents`?
3. What is the advantage of `fputcsv` over manual comma-separated string building?
4. Why might you call `chmod` after creating a file with PHP?
5. How would you safely create a file that should only be written if it does not already exist?

## ⚠ Common Errors / Mistakes
- **Using `w` when you meant `a`**: `w` truncates the file — existing data is lost.
- **Forgetting `fclose()`**: Written data may remain in the output buffer and never flush to disk.
- **Not checking write permissions**: The web server user (e.g., `www-data`) must have write permission on the directory.
- **Assuming `fwrite` always writes all bytes**: It returns the number of bytes written, which may be less than requested over network filesystems.
- **CSV injection**: User data starting with `=` or `+` can be interpreted as formulas when opened in Excel — sanitize or prefix with a single quote.

## 📝 Practice Exercises
**Beginner:**
1. Create a file `hello.txt` and write "Hello, PHP!" to it using `file_put_contents`.
2. Write a script that appends the current date and time to `timestamps.txt` each time the script runs.
3. Create a file `config.json` with valid JSON content using `fopen('w')` and `fwrite`.

**Intermediate:**
4. Build a registration script that takes `$_POST['name']` and `$_POST['email']` and appends them as a CSV row to `subscribers.csv`.
5. Create a script that generates a simple HTML report as a file — include a styled table with sample data and save it as `report.html`.
6. Write a file splitter that reads a large text file and writes every 100 lines to a new chunk file (`chunk_1.txt`, `chunk_2.txt`, etc.).

**Advanced:**
7. Build a transaction-safe file writer that writes to a temporary file, then atomically renames it to the target path (preventing partial writes from being read).
8. Create a CSV exporter that streams data from a database query (10,000+ rows) using a generator and `fputcsv` without loading all rows into memory.
