## 4. PHP Syntax

## 📘 Introduction
PHP syntax is derived from C, Perl, and Java. PHP code is executed on the server and can be placed anywhere in a file using special opening and closing tags. Understanding the basic syntax rules is the foundation for writing correct PHP code.

## 🧠 Key Concepts
- **PHP Tags**: `<?php ... ?>` is the standard. Short-open tags `<? ... ?>` work but are not recommended.
- **Escaping HTML**: You can exit PHP mode to output plain HTML, then re-enter PHP mode.
- **Statements and Semicolons**: Every PHP statement must end with a semicolon (`;`). The closing tag `?>` implies a semicolon for the last statement.
- **Comments**: Single-line (`//` or `#`) and multi-line (`/* */`).
- **Case Sensitivity**: Keywords (`if`, `else`, `echo`, `while`) and function names are case-insensitive. Variable names are case-sensitive.

## 💻 Syntax
```php
<?php
// This is a single-line comment
echo "Hello<br>";         // statement with semicolon

# This is also a single-line comment
ECHO "World<br>";         // ECHO works (case-insensitive)

$name = "Alice";          // $Name is DIFFERENT from $name
echo $name;
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate the correct syntax of PHP tags, semicolons, and case sensitivity.

**Code** (`syntax.php`):
```php
<?php
echo "<p>This works</p>";
Echo "<p>This also works (case-insensitive)</p>";
ECHO "<p>This too!</p>";
?>

<?php
$a = 5;
$A = 10;
echo "<p>a = $a, A = $A</p>"; // Different variables!
?>
```

**Output**:
```html
<p>This works</p>
<p>This also works (case-insensitive)</p>
<p>This too!</p>
<p>a = 5, A = 10</p>
```

**Explanation**: Keywords `echo`, `Echo`, and `ECHO` all work because PHP's built-in constructs are case-insensitive. However, `$a` and `$A` are different variables — PHP variable names are case-sensitive, so they hold different values.

## 🚀 Example 2 - Intermediate
**Problem**: Show how to exit PHP mode to output large blocks of HTML, then re-enter PHP mode within conditional structures.

**Code** (`template.php`):
```php
<!DOCTYPE html>
<html>
<body>
  <h1>PHP Syntax Demo</h1>
  <?php
  $showDetails = true;
  if ($showDetails):
  ?>
    <div class="details">
      <p>This HTML is only shown if $showDetails is true.</p>
      <ul>
        <li>PHP statement: <?php echo "nested PHP inside HTML"; ?></li>
        <li>Math: <?= 5 + 3 ?></li>
      </ul>
    </div>
  <?php endif; ?>
</body>
</html>
```

**Output**:
```html
<!DOCTYPE html>
<html>
<body>
  <h1>PHP Syntax Demo</h1>
  <div class="details">
    <p>This HTML is only shown if $showDetails is true.</p>
    <ul>
      <li>PHP statement: nested PHP inside HTML</li>
      <li>Math: 8</li>
    </ul>
  </div>
</body>
</html>
```

**Explanation**: The HTML between `if:` and `endif;` is conditionally output. The `<?= ?>` short tag is equivalent to `<?php echo ?>` and is always available in PHP 5.4+. This template-style syntax is common in MVC view files.

## 🏢 Real World Use Case
**Blade / Twig Templates**: Modern PHP frameworks use template engines that compile to plain PHP syntax. Understanding raw PHP syntax is essential for debugging compiled templates and working with legacy systems that mix PHP and HTML extensively.

## 🎯 Interview Questions
**Q1:** What are the different PHP tags, and which is recommended?
**A:** `<?php ?>` (standard, recommended), `<?= ?>` (short echo tag, always available since PHP 5.4), `<? ?>` (short open tag, discouraged), `<% %>` (ASP-style, removed in PHP 7). Always use `<?php ?>`.

**Q2:** Are PHP function names case-sensitive?
**A:** No. Function names, class names, and keywords are case-insensitive. `Echo()`, `ECHO()`, and `echo` all call the same construct.

**Q3:** Are PHP variable names case-sensitive?
**A:** Yes. `$name`, `$Name`, and `$NAME` are three distinct variables.

**Q4:** What happens if you forget the semicolon in PHP?
**A:** PHP throws a parse error: `Parse error: syntax error, unexpected ...`. The script halts execution.

**Q5:** Can you omit the closing `?>` tag in a pure PHP file?
**A:** Yes, and it is recommended. Omitting it prevents accidental whitespace or newline output after the closing tag, which can cause "headers already sent" errors.

## ⚠ Common Errors / Mistakes
- **Missing semicolons**: The most common syntax error. Every statement needs `;`.
- **Extra whitespace after `?>`**: A space or newline after the closing tag counts as output and can break header() or setcookie() calls.
- **Using short tags on servers where they are disabled**: `<? ... ?>` may be treated as plain text. Always use `<?php`.
- **Incorrect nesting of PHP/HTML**: Opening `<?php` inside a condition without properly closing it before `else`.

## 📝 Practice Exercises
**Beginner:**
1. Write a PHP file that shows three different ways to output "Hello" (echo, ECHO, <?=).
2. Create a PHP file that causes a syntax error by missing a semicolon — observe the error message.
3. Write a script with variables `$color`, `$Color`, and `$COLOR` set to different values and echo all three.

**Intermediate:**
4. Create a PHP file that mixes plain HTML and PHP inside a loop to generate a numbered list of 5 items.
5. Write a PHP script using the alternative colon syntax (`if: ... else: ... endif;`) inside a HTML structure.
6. Demonstrate the difference between omitting and including the closing `?>` tag by checking for unwanted whitespace in a redirect.

**Advanced:**
7. Build a PHP file that conditionally outputs one of three complete HTML sections (headers, footers, navigation) using pure PHP control structures without template engines.
8. Create a PHP script that uses `declare(strict_types=1)` at the top and demonstrates how it affects type hints — explain what happens with and without it.
