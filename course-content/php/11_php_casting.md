## 11. PHP Casting

## 📘 Introduction
Type casting converts a variable from one data type to another. PHP supports both explicit casting (developer-controlled) and implicit casting (type juggling, automatic). PHP 7+ also introduced strict typing via `declare(strict_types=1)`.

## 🧠 Key Concepts
- **Explicit Casting**: Prefix variable with target type in parentheses: `(int)`, `(float)`, `(string)`, `(bool)`, `(array)`, `(object)`.
- **settype()**: Function that modifies the original variable's type (returns bool).
- **Type Juggling**: Automatic conversion when operators/context demand a specific type.
- **Strict Typing**: `declare(strict_types=1);` at the top of a file forces function calls to respect declared types — no implicit conversion for function parameters/returns.
- **Coercive Typing**: Default mode. PHP attempts to convert values to match declared types.

## 💻 Syntax
```php
<?php
$num = "42";

// Explicit casting
$int   = (int) $num;       // 42 as int
$float = (float) $num;     // 42.0
$bool  = (bool) $num;      // true
$arr   = (array) $num;     // ["42"]
$obj   = (object) $num;    // stdClass with scalar property

// settype()
settype($num, "integer");   // $num is now int(42)

// Strict types
declare(strict_types=1);    // Must be first line of file
function add(int $a, int $b): int {
    return $a + $b;
}
// add("5", "3") would throw TypeError
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate casting between common types and observe the results.

**Code** (`casting.php`):
```php
<?php
$value = "123.45abc";

echo "Original: ";
var_dump($value);

echo "<br>--- Casting ---<br>";

$toInt = (int) $value;
echo "(int): ";
var_dump($toInt);

$toFloat = (float) $value;
echo "(float): ";
var_dump($toFloat);

$toString = (string) $toInt;
echo "(string): ";
var_dump($toString);

$toBool = (bool) $value;
echo "(bool) of '$value': ";
var_dump($toBool);

$toBoolEmpty = (bool) "";
echo "(bool) of '': ";
var_dump($toBoolEmpty);

$toArray = (array) "hello";
echo "(array): ";
var_dump($toArray);

$toObject = (object) ["name" => "Alice", "age" => 30];
echo "(object) from array: ";
var_dump($toObject);
?>
```

**Output**:
```html
Original: string(9) "123.45abc"
<br>--- Casting ---<br>
(int): int(123)
(float): float(123.45)
(string): string(3) "123"
(bool) of '123.45abc': bool(true)
(bool) of '': bool(false)
(array): array(1) { [0]=> string(5) "hello" }
(object) from array: object(stdClass)#1 (2) { ["name"]=> string(5) "Alice" ["age"]=> int(30) }
```

**Explanation**: Casting a non-numeric string to int stops at the first non-numeric character (`123`). `(float)` includes up to the decimal portion (`123.45`). `(bool)` is true for non-empty, non-zero values. `(array)` wraps a scalar in a single-element array. `(object)` from array creates a `stdClass` with matching properties.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate strict vs coercive typing in function parameters.

**Code** (`strict.php`):
```php
<?php
// coercive.php (default)
function addCoercive(int $a, int $b): int {
    return $a + $b;
}

echo addCoercive(5, 10) . "<br>";        // 15
echo addCoercive("5", "10") . "<br>";    // 15 (coerced to int)
echo addCoercive(5.7, 10.3) . "<br>";    // 15 (floats truncated)
?>
```

```php
<?php
// strict.php
declare(strict_types=1);

function addStrict(int $a, int $b): int {
    return $a + $b;
}

echo addStrict(5, 10) . "<br>";          // 15
// echo addStrict("5", "10");            // TypeError: Argument must be int
// echo addStrict(5.7, 10.3);            // TypeError: Argument must be int

// Return type strictness
function getPrice(): int {
    // return 19.99;                     // TypeError in strict mode
    return 20;                           // OK
}
echo getPrice();
?>
```

**Explanation**: In coercive mode (default), PHP converts `"5"` to `5` and `5.7` to `5` (truncation). In strict mode (`declare(strict_types=1)`), passing a string or float to an `int` parameter causes a `TypeError`. Strict mode only affects the file where it's declared — not files that include it.

## 🏢 Real World Use Case
**API Request Validation**: When building REST APIs, submitted JSON values are strings. Explicitly casting to intended types (`(int) $_POST['age']`, `(bool) $_POST['active']`) ensures data integrity. Strict typing on service layer functions prevents accidental type bugs.

## 🎯 Interview Questions
**Q1:** What is the difference between `(int)` and `intval()`?
**A:** They are functionally identical. `(int)` is a language construct (faster, no function call overhead). `intval()` is a function that also accepts a base parameter (`intval("1A", 16)` = 26).

**Q2:** How does PHP cast a string to an integer?
**A:** PHP reads leading numeric characters until it encounters a non-numeric character (except for the decimal point for `(int)`). `(int) "123abc"` → `123`. `(int) "abc123"` → `0`.

**Q3:** What does `(array)` do to a scalar value?
**A:** It wraps the value in a single-element array: `(array) "hello"` becomes `["hello"]`. For objects, it converts public properties into an associative array.

**Q4:** How does `declare(strict_types=1)` work?
**A:** It must be the very first statement in the file (before any output/HTML). It enforces strict type checking on function calls made from that file — not on functions defined in it. Type mismatches throw `TypeError`.

**Q5:** What is the difference between `settype()` and a cast?
**A:** `settype($var, "int")` modifies the original variable in place and returns `true`/`false`. A cast `(int) $var` returns the converted value without modifying the original.

## ⚠ Common Errors / Mistakes
- **Casting to `(unset)`**: Deprecated in PHP 7.2 and removed in PHP 8.0. Use `$var = null` instead.
- **Assuming decimal strings round**: `(int) "3.99"` → `3` (truncated, not rounded).
- **Forgetting strict_types affects callers, not callees**: A file with strict mode calling a function from a non-strict file still enforces strictness for that call.
- **Casting objects without `__toString()`**: Casting an object to string triggers an error unless the class has `__toString()`.

## 📝 Practice Exercises
**Beginner:**
1. Create a float variable `99.99` and cast it to int, string, and bool. Use var_dump() on each.
2. Cast an empty string `""` and string `"0"` to boolean — observe which is true and which is false.
3. Use `settype()` to convert a string "3.14" to float, then to int, showing the value at each step.

**Intermediate:**
4. Create a function with `int` parameter types in coercive mode. Pass it `"7.9 apples"`, `"apples 7"`, and `true` — explain each result.
5. Write two files: `strict.php` (with strict_types) and `coercive.php` (without). Define a function in coercive that accepts int, call it from strict with a string — observe the error.
6. Cast an indexed array `[1, 2, 3]` to an object and access the properties — explain the property names.

**Advanced:**
7. Build a `castSafe($value, $type)` function that safely casts a value to the given type, returning `null` if the cast is not possible (e.g., non-numeric string to int).
8. Create a comprehensive casting chart program: for each input type (string, int, float, bool, null, array, object), cast it to every other type and display the result in a matrix table.
