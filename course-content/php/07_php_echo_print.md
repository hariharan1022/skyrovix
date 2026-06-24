## 7. PHP Echo / Print

## 📘 Introduction
`echo` and `print` are PHP language constructs used to output data to the browser. They are the most fundamental way to produce HTML output from PHP. While similar, they have subtle differences in syntax and behavior.

## 🧠 Key Concepts
- **echo**: Not a function but a language construct. Can take multiple parameters `echo $a, $b, $c`. No return value. Slightly faster.
- **print**: Also a language construct, but behaves like a function: returns 1, takes only one argument.
- **Displaying strings/variables**: Both can output strings, numbers, and variables. Variables in double quotes are interpolated.
- **HTML within echo**: HTML tags can be included in echo/print strings.
- **Single vs Double Quotes**: Double quotes interpret escape sequences and interpolate variables. Single quotes treat everything literally.
- **Concatenation (`.`)**: The dot operator joins strings together.

## 💻 Syntax
```php
<?php
echo "Hello World";           // Basic
echo "Hello", " ", "World";   // Multiple arguments
print "Hello World";          // print (returns 1)

$name = "Alice";
echo "Hello $name";           // Variable interpolation (double quotes)
echo 'Hello $name';           // Literal string (single quotes)
echo 'Hello ' . $name;        // Concatenation

echo "<h1>HTML inside echo</h1>";
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate the difference between echo and print, and show string concatenation vs interpolation.

**Code** (`echo_print.php`):
```php
<?php
$product = "Laptop";
$price = 799.99;

// echo with multiple arguments
echo "<h2>Product: ", $product, "</h2>";

// print with concatenation
print "<p>Price: $" . $price . "</p>\n";

// Double-quote interpolation
echo "<p>You ordered: $product</p>";

// Single quotes (no interpolation)
echo '<p>You ordered: $product</p>';

// Concatenation with single quotes
echo '<p>Total: $' . ($price * 1.08) . ' (with tax)</p>';

// Return value of print
$result = print "print returns 1<br>";
echo "print returned: $result<br>";
?>
```

**Output**:
```html
<h2>Product: Laptop</h2>
<p>Price: $799.99</p>
<p>You ordered: Laptop</p>
<p>You ordered: $product</p>
<p>Total: $863.99 (with tax)</p>
print returns 1<br>
print returned: 1
```

**Explanation**: Echo accepts multiple comma-separated arguments. Single quotes output `$product` literally. Double quotes interpolate the variable value. The dot operator concatenates strings. `print` returns 1 so it can be used in expressions.

## 🚀 Example 2 - Intermediate
**Problem**: Use echo in a loop to build an HTML table dynamically, demonstrating different output techniques.

**Code** (`table.php`):
```php
<?php
$users = [
    ['id' => 1, 'name' => 'Alice', 'role' => 'Admin'],
    ['id' => 2, 'name' => 'Bob',   'role' => 'Editor'],
    ['id' => 3, 'name' => 'Charlie', 'role' => 'Viewer'],
];

echo "<table border='1'>";
echo "<tr><th>ID</th><th>Name</th><th>Role</th></tr>";

foreach ($users as $user) {
    printf(
        "<tr><td>%d</td><td>%s</td><td>%s</td></tr>",
        $user['id'],
        $user['name'],
        $user['role']
    );
}

echo "</table>";
?>
```

**Output**:
```html
<table border='1'>
<tr><th>ID</th><th>Name</th><th>Role</th></tr>
<tr><td>1</td><td>Alice</td><td>Admin</td></tr>
<tr><td>2</td><td>Bob</td><td>Editor</td></tr>
<tr><td>3</td><td>Charlie</td><td>Viewer</td></tr>
</table>
```

**Explanation**: HTML is built by echoing template strings. `printf` is used for formatted output (`%d` for integer, `%s` for string). The loop generates rows dynamically from the data array. This pattern is fundamental to building dynamic HTML views in PHP.

## 🏢 Real World Use Case
**View Rendering in MVC**: PHP frameworks like Laravel compile Blade templates into raw PHP with `echo` statements. Understanding `echo` vs `print` and interpolation vs concatenation is essential for writing efficient view files and debugging compiled templates.

## 🎯 Interview Questions
**Q1:** What is the difference between `echo` and `print`?
**A:** `echo` can take multiple arguments separated by commas and has no return value. `print` takes one argument and returns 1. `echo` is marginally faster.

**Q2:** What is the difference between single quotes and double quotes in PHP?
**A:** Double quotes interpret escape sequences (`\n`, `\t`) and interpolate variables (`"Hello $name"`). Single quotes treat everything literally — only `\\` and `\'` are recognized escape sequences.

**Q3:** How do you join two strings in PHP?
**A:** Using the concatenation operator `.` (dot). Example: `$full = $first . ' ' . $last;`

**Q4:** Why might you prefer `printf` over `echo`?
**A:** `printf` provides formatted output with type specifiers (`%s`, `%d`, `%f`). Useful for aligning text, padding numbers, and formatting decimals.

**Q5:** Can you use `echo` without parentheses?
**A:** Yes. `echo "Hello"` is correct. Parentheses are optional because `echo` is a language construct, not a function.

## ⚠ Common Errors / Mistakes
- **Forgetting the concatenation dot**: `echo $a $b;` causes a parse error. Use `echo $a . $b;` or `echo "$a $b";`.
- **Single quotes with variables**: `'Hello $name'` outputs the literal string `Hello $name`, not the variable value.
- **Trying to echo arrays/objects**: `echo $array` outputs "Array" and a notice. Use `print_r()` or `var_dump()` for arrays/objects.
- **Missing semicolon after echo**: Common beginner error.

## 📝 Practice Exercises
**Beginner:**
1. Use `echo` to display an HTML heading (h1), a paragraph, and a horizontal rule.
2. Create two string variables (`$firstName`, `$lastName`). Output them using concatenation and using double-quote interpolation.
3. Use `print` to display a sentence and store its return value in a variable to confirm it's always 1.

**Intermediate:**
4. Build an HTML unordered list using a loop with echo — generate `<li>` items from an array of 5 fruits.
5. Use `printf` to display product prices formatted to 2 decimal places with a dollar sign.
6. Create a script that outputs a data table using both single-quoted (concatenated) and double-quoted (interpolated) strings in different sections, showing the performance difference mentally.

**Advanced:**
7. Build a PHP script that generates a complete HTML page with a table of 10 employees (id, name, department, salary) from a multidimensional array — use echo/printf inside loops with alternating row colors.
8. Create a function `renderCard($title, $body, $footer)` that uses heredoc syntax to output a styled HTML card component. Explain why heredoc is cleaner than multiple echo statements.
