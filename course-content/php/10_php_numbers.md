## 10. PHP Numbers

## 📘 Introduction
PHP handles numbers as integers (whole numbers) or floats (decimal numbers). It provides functions to validate, cast, format, and inspect numbers, with automatic type conversion between numeric types.

## 🧠 Key Concepts
- **Integer**: Whole numbers without decimal point. Range: `PHP_INT_MIN` to `PHP_INT_MAX` (platform dependent — 64-bit: ~9.2e18).
- **Float (double)**: Numbers with decimal points or in scientific notation (e.g., `1.5e3`). Not exact for precise calculations.
- **is_int() / is_float() / is_numeric()**: Check if a variable is an integer, float, or numeric value (including numeric strings).
- **intval() / floatval()**: Explicitly convert to integer/float.
- **PHP_INT_MAX / PHP_INT_MIN**: Constants for integer range.
- **NAN / INF**: Constants for "not a number" and "infinity".
- **number_format()**: Format numbers with grouped thousands and decimal precision.

## 💻 Syntax
```php
<?php
$a = 42;            // integer
$b = 3.14;          // float
$c = 2.5e3;         // 2500 (float)
$d = 0x1A;          // 26 (hexadecimal integer)
$e = 0b1010;        // 10 (binary integer)

echo is_int($a);    // 1 (true)
echo PHP_INT_MAX;   // 9223372036854775807
echo number_format(1234567.89, 2); // 1,234,567.89
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate integer and float operations, validation, and constants.

**Code** (`numbers.php`):
```php
<?php
$intVar = 100;
$floatVar = 3.14159;
$numericStr = "250";
$nonNumeric = "abc";

echo "is_int($intVar): " . (is_int($intVar) ? "true" : "false") . "<br>";
echo "is_float($floatVar): " . (is_float($floatVar) ? "true" : "false") . "<br>";
echo "is_numeric('$numericStr'): " . (is_numeric($numericStr) ? "true" : "false") . "<br>";
echo "is_numeric('$nonNumeric'): " . (is_numeric($nonNumeric) ? "true" : "false") . "<br>";

echo "PHP_INT_MAX: " . PHP_INT_MAX . "<br>";
echo "PHP_INT_MIN: " . PHP_INT_MIN . "<br>";
echo "PHP_INT_SIZE: " . PHP_INT_SIZE . " bytes<br>";

// Float precision
$result = 0.1 + 0.2;
echo "0.1 + 0.2 = " . $result . "<br>";
echo "Floating point precision issue: " . ($result === 0.3 ? "exact" : "not exact") . "<br>";
?>
```

**Output**:
```html
is_int(100): true<br>
is_float(3.14159): true<br>
is_numeric('250'): true<br>
is_numeric('abc'): false<br>
PHP_INT_MAX: 9223372036854775807<br>
PHP_INT_MIN: -9223372036854775808<br>
PHP_INT_SIZE: 8 bytes<br>
0.1 + 0.2 = 0.30000000000000004<br>
Floating point precision issue: not exact<br>
```

**Explanation**: `is_int()`/`is_float()` check the type. `is_numeric()` returns true for numeric strings. `PHP_INT_MAX` depends on whether PHP is 32-bit or 64-bit. The classic `0.1 + 0.2` example shows floating-point imprecision — never compare floats with `==`.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate numeric operations with large numbers, NAN, INF, and number formatting.

**Code** (`numeric_ops.php`):
```php
<?php
// Integer overflow
$large = PHP_INT_MAX;
echo "Max int: $large<br>";
echo "Max int + 1: " . ($large + 1) . "<br>"; // becomes float
echo "Type: " . gettype($large + 1) . "<br>";

// NAN and INF
$nan = acos(2);           // NAN (arccos > 1 is undefined)
$inf = log(0);            // -INF
echo "NAN: $nan, is_nan: " . (is_nan($nan) ? "true" : "false") . "<br>";
echo "INF: $inf, is_infinite: " . (is_infinite($inf) ? "true" : "false") . "<br>";

// Casting
echo "intval('99.99'): " . intval("99.99") . "<br>";
echo "floatval('99.99'): " . floatval("99.99") . "<br>";

// Formatting
$price = 1234567.89123;
echo "Default: " . $price . "<br>";
echo "2 decimals: " . number_format($price, 2) . "<br>";
echo "With commas: " . number_format($price, 2, '.', ',') . "<br>";
echo "Euro style: " . number_format($price, 2, ',', '.') . "<br>";
echo "No decimals: " . number_format($price, 0) . "<br>";
?>
```

**Output**:
```html
Max int: 9223372036854775807<br>
Max int + 1: 9.2233720368548E+18<br>
Type: double<br>
NAN: NAN, is_nan: true<br>
INF: -INF, is_infinite: true<br>
intval('99.99'): 99<br>
floatval('99.99'): 99.99<br>
Default: 1234567.89123<br>
2 decimals: 1,234,567.89<br>
With commas: 1,234,567.89<br>
Euro style: 1.234.567,89<br>
No decimals: 1,234,568
```

**Explanation**: Adding 1 to `PHP_INT_MAX` triggers a float (automatic promotion). `acos(2)` exceeds domain and returns NAN. `log(0)` returns -INF. `intval()` truncates decimals. `number_format()` accepts locale-specific separators as arguments.

## 🏢 Real World Use Case
**Financial Calculations**: E-commerce platforms use `number_format()` to display prices with currency formatting. `is_numeric()` validates user input for price/quantity fields. Avoid floats for monetary values — use integers (cents) or `bcmath`/`gmp` for precision.

## 🎯 Interview Questions
**Q1:** What is the difference between `is_int()` and `is_numeric()`?
**A:** `is_int()` returns true only for integer type variables. `is_numeric()` returns true for integers, floats, and numeric strings (e.g., `"42"`, `"3.14"`, `"1e3"`).

**Q2:** What is `PHP_INT_MAX`?
**A:** A predefined constant representing the largest integer supported by PHP on the current platform. On 64-bit systems, it is `9223372036854775807`.

**Q3:** How do you safely compare two floats in PHP?
**A:** Never use `==`. Use a small epsilon: `abs($a - $b) < PHP_FLOAT_EPSILON`. For monetary values, use integers representing smallest currency unit (cents) or the `bcmath` extension.

**Q4:** What is NAN in PHP?
**A:** NAN stands for "Not a Number." It results from invalid mathematical operations (e.g., `sqrt(-1)`, `acos(2)`). It is the only value that does not equal itself (`NAN != NAN` is true).

**Q5:** How do you format a number with thousands separators in PHP?
**A:** Use `number_format($number, 2, '.', ',')`. The parameters are: number, decimal places, decimal separator, thousands separator.

## ⚠ Common Errors / Mistakes
- **Comparing floats with `==`**: `0.1 + 0.2 == 0.3` is false due to binary floating-point precision.
- **Integer overflow**: Adding to `PHP_INT_MAX` silently converts to float. Use the `gmp` or `bcmath` extensions for arbitrary precision.
- **Using is_numeric() on hex strings**: `is_numeric("0x1A")` returns false (PHP 7+). Validate hex separately.
- **Assuming number_format always uses commas**: It uses the locale's thousands separator by default (none in some locales). Always specify separators explicitly.

## 📝 Practice Exercises
**Beginner:**
1. Write a script that declares an integer, a float, and a numeric string. Use `is_int()`, `is_float()`, and `is_numeric()` on each.
2. Calculate and display `PHP_INT_MAX + 1` using intval and floatval — show both results.
3. Use `number_format()` to display `9876543.2145` with 2 decimal places, commas, and the Euro format.

**Intermediate:**
4. Write a function `formatCurrency($amount, $currency)` that formats an amount for USD ($1,234.56) and EUR (1.234,56 €).
5. Create a script that validates an array of strings (`"42"`, `"3.14"`, `"abc"`, `"1e5"`, `"0xFF"`) using `is_numeric()` and reports which are valid numbers.
6. Demonstrate the imprecision of float arithmetic by calculating `1 - 0.83` and comparing it to `0.17`.

**Advanced:**
7. Build a function `safeDivide($a, $b)` that returns the division result, and handles division by zero (INF), NAN, and overflow gracefully with proper error reporting.
8. Create a script that converts between number bases: take a string like `"FF"` with base `16` and convert to decimal, binary, and octal using `base_convert()`, `hexdec()`, `bindec()`, `octdec()`, `dechex()`, `decbin()`, `decoct()`.
