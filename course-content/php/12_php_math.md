## 12. PHP Math

## 📘 Introduction
PHP provides a comprehensive set of mathematical functions for common operations including rounding, exponentiation, random number generation, base conversion, and formatting. These functions are part of PHP's core and require no extensions.

## 🧠 Key Concepts
- **abs()**: Absolute value.
- **ceil() / floor() / round()**: Round numbers up, down, or to nearest with precision.
- **min() / max()**: Find smallest/largest in array or argument list.
- **pow() / sqrt()**: Exponentiation and square root.
- **rand() / mt_rand()**: Random integer generation. `mt_rand()` uses Mersenne Twister — faster and more random.
- **pi()**: Returns π (3.1415926535898).
- **bindec() / hexdec() / decbin() / dechex()**: Base conversion between decimal, binary, and hexadecimal.
- **number_format()**: Format number with grouped thousands and decimal precision.

## 💻 Syntax
```php
<?php
echo abs(-5);           // 5
echo ceil(4.1);         // 5
echo floor(4.9);        // 4
echo round(4.567, 2);   // 4.57
echo min(3, 7, 2);      // 2
echo max([1, 9, 4]);    // 9
echo pow(2, 10);        // 1024
echo sqrt(144);         // 12
echo rand(1, 100);      // random between 1-100
echo mt_rand(1, 100);   // faster random
echo pi();              // 3.1415926535898
echo decbin(10);        // 1010
echo bindec("1111");    // 15
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate basic math functions with rounding and random numbers.

**Code** (`math_basics.php`):
```php
<?php
$num = -47.8;

echo "abs($num): " . abs($num) . "<br>";
echo "ceil($num): " . ceil($num) . "<br>";
echo "floor($num): " . floor($num) . "<br>";
echo "round($num): " . round($num) . "<br>";

// Rounding precision
echo "round(3.14159, 2): " . round(3.14159, 2) . "<br>";
echo "round(3.14159, 3): " . round(3.14159, 3) . "<br>";

// min/max
echo "min(5, 2, 8, 1): " . min(5, 2, 8, 1) . "<br>";
echo "max([5, 2, 8, 1]): " . max([5, 2, 8, 1]) . "<br>";

// Power and sqrt
echo "pow(3, 4): " . pow(3, 4) . "<br>";
echo "sqrt(169): " . sqrt(169) . "<br>";

// Pi
echo "pi(): " . pi() . "<br>";
echo "Area of circle r=5: " . pi() * pow(5, 2) . "<br>";
?>
```

**Output**:
```html
abs(-47.8): 47.8<br>
ceil(-47.8): -47<br>
floor(-47.8): -48<br>
round(-47.8): -48<br>
round(3.14159, 2): 3.14<br>
round(3.14159, 3): 3.142<br>
min(5, 2, 8, 1): 1<br>
max([5, 2, 8, 1]): 8<br>
pow(3, 4): 81<br>
sqrt(169): 13<br>
pi(): 3.1415926535898<br>
Area of circle r=5: 78.539816339745
```

**Explanation**: `ceil()` rounds up (toward positive infinity), `floor()` rounds down (toward negative infinity). For negative numbers, `ceil(-47.8)` goes to `-47` (upwards), `floor()` to `-48` (downwards). `round()` accepts a precision parameter.

## 🚀 Example 2 - Intermediate
**Problem**: Create a password generator and demonstrate base conversion functions.

**Code** (`math_intermediate.php`):
```php
<?php
// Password generator
function generatePassword(int $length = 12): string {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    $password = '';
    $maxIndex = strlen($chars) - 1;

    for ($i = 0; $i < $length; $i++) {
        $password .= $chars[mt_rand(0, $maxIndex)];
    }
    return $password;
}

echo "Password: " . generatePassword(16) . "<br>";

// Base conversion
$decimal = 255;
echo "decbin($decimal): " . decbin($decimal) . "<br>";     // 11111111
echo "dechex($decimal): " . dechex($decimal) . "<br>";     // ff
echo "decoct($decimal): " . decoct($decimal) . "<br>";     // 377

echo "bindec('1101'): " . bindec("1101") . "<br>";         // 13
echo "hexdec('FF'): " . hexdec("FF") . "<br>";             // 255
echo "octdec('777'): " . octdec("777") . "<br>";           // 511

// Random items from array
$colors = ["red", "green", "blue", "yellow", "purple"];
echo "Random color: " . $colors[mt_rand(0, count($colors) - 1)] . "<br>";

// Random float
echo "Random float (0-1): " . mt_rand() / mt_getrandmax() . "<br>";
?>
```

**Output** (random values will vary):
```html
Password: aB3$xK9#mN2@pQ7<br>
decbin(255): 11111111<br>
dechex(255): ff<br>
decoct(255): 377<br>
bindec('1101'): 13<br>
hexdec('FF'): 255<br>
octdec('777'): 511<br>
Random color: blue<br>
Random float (0-1): 0.724513948
```

**Explanation**: `mt_rand()` generates cryptographically weaker but faster random numbers than `rand()` (for security-critical randomness, use `random_int()`). Base conversion functions translate between decimal and binary/octal/hex. `mt_getrandmax()` returns the maximum value `mt_rand()` can return, enabling random float generation.

## 🏢 Real World Use Case
**E-commerce Discount Calculator**: `round()` formats final prices to 2 decimals. `mt_rand()` generates order confirmation numbers. `number_format()` displays prices with locale-specific formatting. `min()`/`max()` validate discount ranges.

## 🎯 Interview Questions
**Q1:** What is the difference between `rand()` and `mt_rand()`?
**A:** `mt_rand()` uses the Mersenne Twister algorithm — faster and produces better randomness than `rand()`. Both are not cryptographically secure. For secure randomness, use `random_int()`.

**Q2:** How do you round a number to a specific number of decimal places?
**A:** Use `round($number, $precision)`. Example: `round(3.14159, 2)` returns `3.14`.

**Q3:** How do you get a random item from an array?
**A:** `array_rand($array)` returns a random key, or `$array[array_rand($array)]` for the value. `$array[mt_rand(0, count($array) - 1)]` also works.

**Q4:** What is the difference between `ceil()` and `floor()`?
**A:** `ceil()` rounds up to the next highest integer (toward positive infinity). `floor()` rounds down to the next lowest integer (toward negative infinity). For negatives: `ceil(-4.2)` = `-4`, `floor(-4.2)` = `-5`.

**Q5:** How do you convert a hex string like "FF" to decimal in PHP?
**A:** Use `hexdec("FF")` which returns `255`. Alternatively, `intval("FF", 16)` works too.

## ⚠ Common Errors / Mistakes
- **Using `rand()` for security-critical functions**: `rand()` and `mt_rand()` are predictable. Use `random_int()` for passwords, tokens, and CSRF values.
- **Floating-point precision in `round()`**: `round(2.5, 0, PHP_ROUND_HALF_UP)` rounds to 3 (default). Know the rounding mode constants.
- **Forgetting `mt_rand()` is inclusive on both ends**: `mt_rand(1, 6)` returns numbers from 1 to 6, inclusive.
- **Incorrect base conversion of large numbers**: `hexdec()` and `bindec()` may return floats for very large values — use `base_convert()` instead.

## 📝 Practice Exercises
**Beginner:**
1. Write a script that calculates the area and circumference of a circle with radius 7.5 (use pi() and pow()).
2. Generate a random number between 1 and 100, then display whether it is even or odd.
3. Use `round()`, `ceil()`, and `floor()` on `-3.7` and `3.7` — explain each result.

**Intermediate:**
4. Build a Dice Roll Simulator that rolls two dice (1-6) and displays each roll plus the total. Use mt_rand().
5. Write a function `compoundInterest($principal, $rate, $years, $n)` that calculates compound interest using `pow()`.
6. Create a color converter that takes an RGB value (e.g., 255, 99, 71) and converts it to hex (#FF6347) using `dechex()` and `str_pad()`.

**Advanced:**
7. Build a `Stats` class that accepts an array of numbers and provides methods for: `min()`, `max()`, `mean()`, `median()`, `mode()`, `standardDeviation()`, using only PHP math functions.
8. Create a secure token generator using `random_int()` that produces URL-safe tokens (base64-encoded, no `+` `/` `=` characters) of configurable byte length.
