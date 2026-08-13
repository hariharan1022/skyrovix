## 9. PHP Strings

## 📘 Introduction
Strings are sequences of characters used extensively in PHP for output, data processing, and user interaction. PHP offers rich string manipulation capabilities and a comprehensive set of built-in string functions.

## 🧠 Key Concepts
- **Single vs Double Quotes**: Single quotes `'...'` treat text literally. Double quotes `"..."` interpolate variables and interpret escape sequences (`\n`, `\t`, `\\`, `\$`).
- **Heredoc**: Multi-line string with double-quote behavior (`<<<EOT`). Interpolates variables.
- **Nowdoc**: Multi-line string with single-quote behavior (`<<<'EOT'`). No interpolation.
- **Key String Functions**:
  - `strlen()` — length of string
  - `str_word_count()` — count words
  - `strrev()` — reverse string
  - `strpos()` — find position of substring
  - `str_replace()` — replace substring
  - `substr()` — extract portion of string
  - `trim()` — strip whitespace from ends
  - `explode()` — split string into array by delimiter
  - `implode()` — join array into string with delimiter

## 💻 Syntax
```php
<?php
// Single vs Double
echo 'Hello $name';        // Hello $name
echo "Hello $name";        // Hello John

// Heredoc
echo <<<HTML
<div class="box">
  <h2>$title</h2>
</div>
HTML;

// Nowdoc
echo <<<'TEXT'
  This is literal $variable
TEXT;

// Common functions
echo strlen("Hello");       // 5
echo str_replace("bad", "good", "bad day"); // good day
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate string creation, basic functions, and quote differences.

**Code** (`strings.php`):
```php
<?php
$text = "  Hello World!   ";
$name = "Alice";

// Quote differences
echo '<p>Single: Hello $name</p>';
echo "<p>Double: Hello $name</p>";

// String functions
echo "<p>Length: " . strlen($text) . "</p>";
echo "<p>Trimmed: '" . trim($text) . "'</p>";
echo "<p>Word count: " . str_word_count(trim($text)) . "</p>";
echo "<p>Reversed: " . strrev(trim($text)) . "</p>";
echo "<p>Uppercase: " . strtoupper(trim($text)) . "</p>";
echo "<p>Position of 'World': " . strpos(trim($text), "World") . "</p>";

// Replace
$newText = str_replace("World", "PHP", trim($text));
echo "<p>Replaced: $newText</p>";
?>
```

**Output**:
```html
<p>Single: Hello $name</p>
<p>Double: Hello Alice</p>
<p>Length: 16</p>
<p>Trimmed: 'Hello World!'</p>
<p>Word count: 2</p>
<p>Reversed: !dlroW olleH</p>
<p>Uppercase: HELLO WORLD!</p>
<p>Position of 'World': 6</p>
<p>Replaced: Hello PHP!</p>
```

**Explanation**: Single quotes output `$name` literally; double quotes interpolate it. `trim()` removes whitespace. `strpos()` returns the starting index (0-based). `str_replace()` performs case-sensitive replacement.

## 🚀 Example 2 - Intermediate
**Problem**: Use `explode()`, `implode()`, `substr()`, and heredoc/nowdoc to process a CSV-like data string and format output.

**Code** (`process.php`):
```php
<?php
$csv = "Alice,25,Engineer|Bob,30,Designer|Charlie,28,Manager";

// Split by |
$rows = explode("|", $csv);

echo "<h2>Employee Report</h2>";
echo "<table border='1'>";
echo "<tr><th>Name</th><th>Age</th><th>Role</th><th>Initial</th></tr>";

foreach ($rows as $row) {
    $cols = explode(",", $row);
    $name = $cols[0];
    $age  = $cols[1];
    $role = $cols[2];
    $initial = substr($name, 0, 1);

    echo "<tr><td>$name</td><td>$age</td><td>$role</td><td>$initial</td></tr>";
}
echo "</table>";

// Heredoc example
$reportDate = date('Y-m-d');
echo <<<FOOTER
<hr>
<p>Report generated on: $reportDate</p>
<p>Total employees: $rows</p>
FOOTER;
?>
```

**Output**: A table with 3 employee rows showing name, age, role, and first initial. Footer uses heredoc with interpolated `$reportDate`.

**Explanation**: `explode("|", $csv)` splits into 3 strings. Each is further split by `,`. `substr($name, 0, 1)` extracts the first character. Heredoc `<<<FOOTER` allows multi-line string with variable interpolation without needing to escape quotes.

## 🏢 Real World Use Case
**Template Rendering**: Email templates use heredoc for multi-line HTML emails with embedded variables. CSV file processing uses `explode()` and `implode()` for parsing and generating data. `trim()` sanitizes user input before validation.

## 🎯 Interview Questions
**Q1:** What is the difference between heredoc and nowdoc?
**A:** Heredoc (`<<<EOT`) behaves like double quotes — variables are interpolated. Nowdoc (`<<<'EOT'`) behaves like single quotes — everything is literal. Nowdoc identifier must be single-quoted.

**Q2:** What does `strpos()` return if the needle is not found?
**A:** It returns `false`. Always compare with `=== false` because `strpos()` can return `0` (match at position 0), which is falsy in loose comparison.

**Q3:** What is the difference between `explode()` and `implode()`?
**A:** `explode(delimiter, string)` splits a string into an array. `implode(glue, array)` joins array elements into a string with the glue between them.

**Q4:** What does `substr($str, -3)` do?
**A:** A negative offset counts from the end of the string. It returns the last 3 characters of the string.

**Q5:** What escape sequences work in double-quoted strings?
**A:** `\n` (newline), `\r` (carriage return), `\t` (tab), `\v` (vertical tab), `\e` (escape), `\f` (form feed), `\\` (backslash), `\$` (dollar sign), `\"` (double quote), and `\[0-7]{1,3}` (octal) / `\x[0-9A-Fa-f]{1,2}` (hex).

## ⚠ Common Errors / Mistakes
- **Using `strpos()` without strict comparison**: `if (strpos($str, "sub"))` fails when substring is at position 0. Always use `if (strpos($str, "sub") !== false)`.
- **Mixing explode/implode argument order**: `explode(string, delimiter)` — the delimiter comes first. `implode(glue, pieces)` — glue comes first.
- **Trying to modify string with bracket syntax**: `$str[0] = 'H'` works for single bytes but breaks with multi-byte characters (use `mb_*` functions).
- **Forgetting that strings are immutable**: Functions return new strings; they don't modify in place.

## 📝 Practice Exercises
**Beginner:**
1. Create a string variable with your full name. Display its length, the first character, and the last character.
2. Write a script that replaces all spaces in a sentence with hyphens and converts the result to uppercase.
3. Create a string "apple,banana,orange" and use explode() to display each fruit on a separate line.

**Intermediate:**
4. Write a function `maskEmail($email)` that replaces the middle part of the email with asterisks (e.g., `j***@example.com`).
5. Process a multi-line address string using heredoc and extract the postal code using substr() and strpos().
6. Build a slug generator function that converts "Hello World! PHP is Great" into "hello-world-php-is-great" (lowercase, replace non-alphanumeric with hyphens, trim hyphens).

**Advanced:**
7. Build a function `truncate($text, $maxLength)` that truncates text to a given length without cutting words in the middle, appending "..." if truncated.
8. Create a simple template engine: replace `{{name}}`, `{{age}}`, `{{city}}` placeholders in a template string with values from an associative array using `str_replace()` or `preg_replace()`.
