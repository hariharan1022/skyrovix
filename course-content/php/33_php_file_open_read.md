## 33. PHP File Open / Read

## 📘 Introduction
Opening and reading files is a foundational PHP skill. Choosing the right `fopen` mode and the appropriate read function for your use case — whether reading a tiny config or a massive log file — impacts both correctness and performance.

## 🧠 Key Concepts
- **fopen modes**: `r` (read from start), `w` (write, truncate), `a` (append), `r+` (read/write from start), `w+` (read/write, truncate), `a+` (read/write, append), `x` (create exclusively for write), `c` (write without truncating).
- **readfile**: Reads and outputs a file directly to the output buffer in one call — no handle needed.
- **file**: Reads entire file into an array (one element per line).
- **fread**: Reads raw bytes — specify `filesize()` for the whole file, or a fixed chunk size.
- **fgets**: Reads one line until newline or EOF.
- **fgetcsv**: Parses a line as CSV respecting enclosure characters.
- **Handling large files**: Read in chunks with `fread` or line-by-line with `fgets` to avoid memory exhaustion.
- **feof**: Checks if the file pointer is at end-of-file (useful for unknown-length files).

## 💻 Syntax
```php
<?php
// Modes
$handle = fopen('file.txt', 'r');    // read only
$handle = fopen('file.txt', 'r+');   // read + write from start
$handle = fopen('file.txt', 'w');    // write (truncate)
$handle = fopen('file.txt', 'a');    // append
$handle = fopen('file.txt', 'x');    // exclusive create (write)

// Reading entire file
echo readfile('file.txt');                    // outputs + returns bytes
$content = file_get_contents('file.txt');     // returns string
$lines = file('file.txt');                    // returns array of lines

// Chunk reading
$handle = fopen('large.log', 'r');
while (!feof($handle)) {
    $chunk = fread($handle, 8192);
    // process chunk
}
fclose($handle);

// CSV
$handle = fopen('data.csv', 'r');
while (($row = fgetcsv($handle)) !== false) {
    var_dump($row);
}
fclose($handle);
?>
```

## ✅ Example 1 - Basic
**Problem**: Read and display the contents of a text file using three different methods.

**Code** (`read_comparison.php`):
```php
<?php
$filename = 'sample.txt';
file_put_contents($filename, "Hello World\nPHP is awesome!\n");

// Method 1: readfile (outputs directly)
echo "--- readfile ---\n";
$bytes = readfile($filename);
echo "\n(bytes: $bytes)\n\n";

// Method 2: file_get_contents (returns string)
echo "--- file_get_contents ---\n";
$content = file_get_contents($filename);
echo nl2br($content) . "\n";

// Method 3: file (returns array)
echo "--- file() array ---\n";
$lines = file($filename);
foreach ($lines as $i => $line) {
    echo "Line " . ($i + 1) . ": " . htmlspecialchars($line) . "<br>\n";
}
?>
```

**Output**:
```
--- readfile ---
Hello World
PHP is awesome!
(bytes: 26)

--- file_get_contents ---
Hello World<br>
PHP is awesome!<br>

--- file() array ---
Line 1: Hello World<br>
Line 2: PHP is awesome!<br>
```

**Explanation**: `readfile()` reads and outputs in one step, returning byte count. `file_get_contents()` returns the entire file as a string. `file()` returns an indexed array with each line as an element.

## 🚀 Example 2 - Intermediate
**Problem**: Read a large CSV file efficiently with `fgetcsv` and compute statistics.

**Code** (`csv_stats.php`):
```php
<?php
$filename = 'sales.csv';

// Generate sample CSV
$handle = fopen($filename, 'w');
fputcsv($handle, ['product', 'price', 'quantity']);
$products = [['Laptop', 999.99, 5], ['Mouse', 25.50, 20], ['Keyboard', 75.00, 15],
             ['Monitor', 299.99, 8], ['Headset', 49.99, 12]];
foreach ($products as $row) fputcsv($handle, $row);
fclose($handle);

// Read and analyze
$handle = fopen($filename, 'r');
$header = fgetcsv($handle); // skip header
$totalRevenue = 0;
$totalItems = 0;

while (($row = fgetcsv($handle)) !== false) {
    [$product, $price, $qty] = $row;
    $subtotal = (float)$price * (int)$qty;
    $totalRevenue += $subtotal;
    $totalItems += (int)$qty;
    printf("%s: %d x \$%.2f = \$%.2f<br>\n", $product, $qty, $price, $subtotal);
}
fclose($handle);

echo "<hr>Total Items: $totalItems<br>";
echo "Total Revenue: \$" . number_format($totalRevenue, 2);
?>
```

**Output**:
```
Laptop: 5 x $999.99 = $4999.95
Mouse: 20 x $25.50 = $510.00
Keyboard: 15 x $75.00 = $1125.00
Monitor: 8 x $299.99 = $2399.92
Headset: 12 x $49.99 = $599.88
________________________________________________________
Total Items: 60
Total Revenue: $9634.75
```

**Explanation**: `fgetcsv()` automatically parses CSV fields respecting quotes and enclosures. The first call reads the header row. The loop processes data rows one at a time without loading the entire file into memory — essential for large files.

## 🏢 Real World Use Case
**E-commerce Order Export**: An admin panel generates a CSV export of 100,000+ orders. Using `fopen('r')` with `fgetcsv()` in a streaming fashion avoids memory exhaustion. The same approach is used for processing server access logs, where files can be several gigabytes.

## 🎯 Interview Questions
1. What are the differences between `r`, `r+`, `w`, `w+`, and `a` fopen modes?
2. When would you use `file_get_contents` vs `fread` vs `fgets`?
3. Why is `file()` potentially dangerous for very large files?
4. What does `fgetcsv()` return when it reaches the end of the file?
5. How does the `x` mode differ from `w` mode in `fopen`?

## ⚠ Common Errors / Mistakes
- **Using `r+` when you mean `r`**: `r+` opens for read **and** write — the file pointer starts at the beginning. Writing will overwrite starting at byte 0, not append.
- **Not checking `fopen()` return value**: If the file cannot be opened, `fopen()` returns `false`, and subsequent reads fail.
- **Memory exhaustion with `file_get_contents` on huge files**: A 2GB log file will cause an out-of-memory error. Use `fgets` or chunked `fread`.
- **Assuming line endings in CSV**: `fgetcsv` handles this correctly; manual parsing often breaks on quoted fields with embedded commas or newlines.

## 📝 Practice Exercises
**Beginner:**
1. Use `readfile()` to display the contents of a text file directly in the browser.
2. Open a file with `fopen('r')`, read the first 100 bytes with `fread()`, and display them.
3. Use `file()` to read a file into an array and display each line wrapped in a `<p>` tag.

**Intermediate:**
4. Write a script that reads a large log file (10MB+) in chunks of 4096 bytes using `fread` and counts the number of "ERROR" occurrences.
5. Create a CSV parser that reads `employees.csv` (name, department, salary) and outputs a summary grouped by department.
6. Implement `tail -n 10` in PHP: read the last 10 lines of a large file without loading the entire file.

**Advanced:**
7. Build a memory-efficient CSV iterator class (`implements \Iterator`) that yields rows one at a time from a CSV file, handles enclosure characters, and supports seeking.
8. Create a binary file reader that reads a BMP image header, extracts width, height, and bit-depth, and outputs the information without relying on GD or ImageMagick.
