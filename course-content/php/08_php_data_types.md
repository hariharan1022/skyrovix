## 8. PHP Data Types

## 📘 Introduction
PHP is a dynamically typed language, meaning variables can hold any data type without explicit declaration. PHP supports eight primitive data types and automatically converts between types as needed (type juggling).

## 🧠 Key Concepts
- **String**: Sequence of characters. Single or double-quoted.
- **Integer**: Whole numbers (e.g., `42`, `-7`). Range depends on platform (32 or 64-bit).
- **Float (Double)**: Decimal numbers (e.g., `3.14`, `2.0`, `1.5e3`).
- **Boolean**: `true` or `false` (case-insensitive).
- **Array**: Ordered map. Indexed or associative.
- **Object**: Instance of a class.
- **NULL**: Variable with no value. Unset or explicitly assigned `null`.
- **Resource**: Special type holding a reference to an external resource (file handle, DB connection).
- **var_dump()**: Dumps type and value of a variable.
- **gettype()**: Returns the type as a string.
- **Type Juggling**: PHP automatically converts types based on context (e.g., `"5" + 3` yields `8`).

## 💻 Syntax
```php
<?php
$string = "Hello";
$int = 42;
$float = 3.14;
$bool = true;
$array = [1, 2, 3];
$object = (object) ['name' => 'John'];
$null = null;

echo gettype($float);     // "double"
var_dump($bool);          // bool(true)
?>
```

## ✅ Example 1 - Basic
**Problem**: Declare each data type and inspect them using `var_dump()` and `gettype()`.

**Code** (`datatypes.php`):
```php
<?php
$a = "Hello PHP";          // string
$b = 100;                  // integer
$c = 99.99;                // double (float)
$d = false;                // boolean
$e = ['red', 'green'];     // array
$f = null;                 // NULL
$g = fopen('php://memory', 'r'); // resource

echo '$a: ' . gettype($a) . "<br>";
echo '$b: ' . gettype($b) . "<br>";
echo '$c: ' . gettype($c) . "<br>";
echo '$d: ' . gettype($d) . "<br>";
echo '$e: ' . gettype($e) . "<br>";
echo '$f: ' . gettype($f) . "<br>";
echo '$g: ' . gettype($g) . "<br>";

echo "<hr>var_dump output:<br>";
var_dump($a, $b, $c, $d, $e, $f, $g);
?>
```

**Output**:
```html
$a: string<br>$b: integer<br>$c: double<br>$d: boolean<br>$e: array<br>$f: NULL<br>$g: resource<br>
<hr>var_dump output:<br>
string(9) "Hello PHP" int(100) float(99.99) bool(false) array(2) { [0]=> string(3) "red" [1]=> string(5) "green" } NULL resource(5) of type (stream)
```

**Explanation**: `gettype()` returns the type name as a lowercase string. `var_dump()` gives detailed information including length, value, and structure. The `resource` type is shown with its ID and type.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate type juggling (automatic type conversion) and explicit casting.

**Code** (`juggling.php`):
```php
<?php
// Type juggling
echo "5" + 3;                     // 8 (string converted to int)
echo "<br>";
echo "5 apples" + 3;              // 8 (PHP 8: warning, but converts leading numeric)
echo "<br>";
echo "apples 5" + 3;              // 3 (no leading numeric)
echo "<br>";
echo 5 . " apples";               // "5 apples" (int to string)
echo "<br>";

// Loose vs strict comparison
var_dump(5 == "5");               // bool(true)  — loose
var_dump(5 === "5");              // bool(false) — strict
echo "<br>";

// Boolean conversion in context
if ("")     echo "empty string is truthy<br>";
else        echo "empty string is falsy<br>";

if ("0")    echo "string '0' is truthy<br>";
else        echo "string '0' is falsy<br>";

if ([]  )   echo "empty array is truthy<br>";
else        echo "empty array is falsy<br>";
?>
```

**Output**:
```html
8<br>8<br>3<br>5 apples<br>bool(true)<br>bool(false)<br>empty string is falsy<br>string '0' is falsy<br>empty array is falsy
```

**Explanation**: PHP converts strings to numbers when using arithmetic operators (taking leading numeric characters). Loose `==` checks value after juggling; strict `===` checks type and value. Empty strings, `"0"`, `0`, `null`, `false`, `[]` are all falsy.

## 🏢 Real World Use Case
**Form Input Handling**: All `$_GET` and `$_POST` values are strings. Type juggling allows `$_GET['price'] * $_GET['quantity']` to work automatically. However, strict validation (`filter_var`, `ctype_digit`) is essential for security to prevent unexpected type conversions.

## 🎯 Interview Questions
**Q1:** How many basic data types does PHP support?
**A:** Eight: string, integer, float (double), boolean, array, object, NULL, and resource. PHP 8.0 added `mixed`, `never`, `void`, `union types`, and `false`/`true` standalone types.

**Q2:** What is type juggling in PHP?
**A:** PHP automatically converts a value from one type to another depending on the context. For example, `"10" + 5` results in integer 15 because the string is converted to an integer for arithmetic.

**Q3:** What is the difference between `==` and `===`?
**A:** `==` (loose equality) compares values after type juggling. `===` (strict equality) compares both value and type without conversion.

**Q4:** What does `var_dump()` show that `echo` cannot?
**A:** `var_dump()` shows the data type and length, plus the full structure of arrays/objects. `echo` only outputs strings or converts values to strings (arrays become "Array").

**Q5:** What values are considered falsy in PHP?
**A:** `false`, `0`, `0.0`, `""` (empty string), `"0"`, `[]` (empty array), `null`. Everything else is truthy.

## ⚠ Common Errors / Mistakes
- **Assuming strict comparison**: `if ($_POST['id'] == 5)` matches strings like `"5abc"` after juggling. Always validate input types.
- **Using `echo` on arrays**: Outputs "Array" and throws a notice. Use `print_r()` or `var_dump()`.
- **Loose comparison with `0`**: `"abc" == 0` is `true` because `"abc"` converts to 0. Always use `===` when comparing with numeric values.
- **Forget `null` vs `""`**: Both are falsy, but `null` indicates "no value" while `""` indicates an empty string — distinct semantics.

## 📝 Practice Exercises
**Beginner:**
1. Create variables of each data type (string, int, float, bool, array, null) and use `var_dump()` on each.
2. Write a script that adds a string number `"25"` to an integer `17` and displays the result. Use `gettype()` to check the result type.
3. Check which of these values are falsy: `0`, `"0"`, `"false"`, `[]`, `[null]`, `""`, `" "`.

**Intermediate:**
4. Create a function that accepts a value and returns "truthy" or "falsy" using a strict comparison approach.
5. Write a script demonstrating the difference between `==` and `===` with at least 5 different value pairs.
6. Build an array with mixed types. Use `array_filter()` to remove all falsy values and display the result.

**Advanced:**
7. Build a validator function that checks if a value is a "valid integer string" (only digits, optional leading minus). It should reject floats, non-numeric strings, and null. Use `ctype_digit()` and string comparison.
8. Create a script that demonstrates all the edge cases of type juggling with `+` operator: strings with leading digits, trailing digits, hexadecimal strings, scientific notation strings, and boolean-to-integer conversion.
