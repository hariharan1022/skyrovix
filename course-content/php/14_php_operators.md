## 14. PHP Operators

## 📘 Introduction
Operators are symbols that perform operations on operands (variables and values). PHP operators are categorized into arithmetic, assignment, comparison, logical, string, array, and error control operators.

## 🧠 Key Concepts
- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulus), `**` (exponentiation, PHP 5.6+).
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `.=`, `**=`.
- **Comparison**: `==`, `===` (identical), `!=`, `<>`, `!==`, `<`, `>`, `<=`, `>=`, `<=>` (spaceship, PHP 7+).
- **Logical**: `and`, `or`, `xor`, `&&`, `||`, `!`.
- **String**: `.` (concatenation), `.=` (concatenating assignment).
- **Array**: `+` (union), `==` (same key/value pairs), `===` (same order/types).
- **Error Control**: `@` suppresses errors for the following expression.
- **Ternary**: `expr ? trueVal : falseVal`.
- **Null Coalescing**: `??` — returns left side if not null, else right side (PHP 7+).

## 💻 Syntax
```php
<?php
// Arithmetic
echo 2 ** 10;           // 1024

// Comparison
var_dump(5 <=> 10);     // -1 (spaceship)

// Null coalescing
$name = $_GET['name'] ?? 'Guest';

// Ternary
$age = 20;
$status = $age >= 18 ? 'Adult' : 'Minor';

// Error control
$result = @file_get_contents('nonexistent.txt');
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate arithmetic, assignment, comparison, and string operators.

**Code** (`operators.php`):
```php
<?php
// Arithmetic
$a = 15;
$b = 4;
echo "a + b = " . ($a + $b) . "<br>";     // 19
echo "a - b = " . ($a - $b) . "<br>";     // 11
echo "a * b = " . ($a * $b) . "<br>";     // 60
echo "a / b = " . ($a / $b) . "<br>";     // 3.75
echo "a % b = " . ($a % $b) . "<br>";     // 3
echo "a ** b = " . ($a ** $b) . "<br>";   // 50625

// Assignment
$x = 10;
$x += 5; echo "x += 5: $x<br>";           // 15
$x -= 3; echo "x -= 3: $x<br>";           // 12
$x *= 2; echo "x *= 2: $x<br>";           // 24
$x /= 4; echo "x /= 4: $x<br>";           // 6

// String
$str = "Hello";
$str .= " World";
echo "str .= ' World': $str<br>";          // Hello World

// Comparison
var_dump(5 == "5"); echo " (loose)<br>";
var_dump(5 === "5"); echo " (strict)<br>";
var_dump(5 != "5");  echo " (loose not)<br>";
var_dump(5 !== "5"); echo " (strict not)<br>";
?>
```

**Output**:
```html
a + b = 19<br>
a - b = 11<br>
a * b = 60<br>
a / b = 3.75<br>
a % b = 3<br>
a ** b = 50625<br>
x += 5: 15<br>
x -= 3: 12<br>
x *= 2: 24<br>
x /= 4: 6<br>
str .= ' World': Hello World<br>
bool(true) (loose)<br>
bool(false) (strict)<br>
bool(false) (loose not)<br>
bool(true) (strict not)
```

**Explanation**: Arithmetic operators work as expected. `%` returns remainder. `**` handles exponentiation. Assignment operators modify the variable in place. String concatenation uses `.`. Comparison shows the critical difference between loose (`==` — type juggling) and strict (`===` — no juggling).

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate spaceship operator, null coalescing, ternary, logical operators, and array operators.

**Code** (`operators_advanced.php`):
```php
<?php
// Spaceship operator (<=>)
echo "3 <=> 5: " . (3 <=> 5) . "<br>";     // -1
echo "5 <=> 5: " . (5 <=> 5) . "<br>";     // 0
echo "7 <=> 5: " . (7 <=> 5) . "<br>";     // 1

// Null coalescing
$username = $_GET['user'] ?? $_POST['user'] ?? 'Guest';
echo "Username: $username<br>";

// Ternary
$age = 17;
$canVote = $age >= 18 ? 'Yes' : 'No';
echo "Can vote: $canVote<br>";

// Logical operators
$isAdmin = true;
$isLoggedIn = false;
if ($isLoggedIn && $isAdmin) {
    echo "Admin panel<br>";
} elseif ($isLoggedIn || $isAdmin) {
    echo "Guest or admin view<br>";
}
if (!$isLoggedIn) {
    echo "Please log in<br>";
}

// Array operators
$arr1 = ['a' => 1, 'b' => 2];
$arr2 = ['b' => 3, 'c' => 4];
$union = $arr1 + $arr2;  // Union: preserves $arr1 keys
echo "Union: ";
print_r($union);

// Error control
$file = @file('nonexistent.txt') or die("File not found<br>");
?>
```

**Output**:
```html
3 <=> 5: -1<br>
5 <=> 5: 0<br>
7 <=> 5: 1<br>
Username: Guest<br>
Can vote: No<br>
Guest or admin view<br>
Please log in<br>
Union: Array ( [a] => 1 [b] => 2 [c] => 4 )<br>
File not found<br>
```

**Explanation**: Spaceship returns -1/0/1 for less/equal/greater. Null coalescing (`??`) chains left to right returning the first non-null value. Ternary `?:` is shorthand for `if/else`. `&&` vs `and` have different precedence (use `&&` for clarity). Array `+` keeps keys from the left array — `$arr1 + $arr2` ignores `b` from `$arr2`.

## 🏢 Real World Use Case
**Form Data Handling**: `$_POST['email'] ?? ''` provides defaults for missing form fields. Spaceship `<=>` simplifies usort comparator callbacks. Array union `+` merges default config with user-provided overrides. `@` suppresses warnings for `fopen` attempts — though exceptions are preferred.

## 🎯 Interview Questions
**Q1:** What is the difference between `==` and `===`?
**A:** `==` compares values after type juggling. `===` compares both value and type without conversion. Example: `5 == "5"` is true, but `5 === "5"` is false.

**Q2:** What does the spaceship operator `<=>` do?
**A:** It performs three-way comparison. Returns `-1` if left < right, `0` if equal, `1` if left > right. Useful for sorting callbacks: `usort($arr, fn($a, $b) => $a <=> $b)`.

**Q3:** What is the null coalescing operator `??`?
**A:** It returns the left operand if it exists and is not null; otherwise returns the right operand. `$name = $_GET['name'] ?? 'Guest'`. It can be chained: `$a ?? $b ?? $c`.

**Q4:** What is the difference between `&&` and `and` in PHP?
**A:** They have different operator precedence. `&&` has higher precedence than `and`. `$x = true && false` assigns `false` to `$x`. `$x = true and false` assigns `true` to `$x` (the `and` applies after assignment).

**Q5:** How does the array union operator `+` differ from `array_merge()`?
**A:** `+` preserves the left array's keys — if a key exists in both, the left value is kept. `array_merge()` overwrites string keys with the right array's values and reindexes numeric keys.

## ⚠ Common Errors / Mistakes
- **Assignment in conditions**: `if ($x = 5)` assigns 5 (truthy) instead of comparing. Use `if ($x == 5)`.
- **Operator precedence confusion**: `$result = true || false && false` evaluates differently than expected. Use parentheses.
- **Modulus on negative numbers**: `-5 % 3` returns `-2` in PHP (not `1` as in some languages). Use `fmod()` for floats.
- **`@` operator suppressing important errors**: The error control `@` suppresses all errors from the expression — use try/catch instead.

## 📝 Practice Exercises
**Beginner:**
1. Write a script that uses all arithmetic operators on two numbers and displays results.
2. Use the string concatenation operator `.` to build a full name from `$first`, `$middle`, and `$last` variables.
3. Write an expression using the ternary operator to check if a number is even or odd.

**Intermediate:**
4. Use the spaceship operator inside `usort()` to sort an array of numbers in descending order.
5. Use null coalescing to safely access nested array values: `$data['user']['profile']['name'] ?? 'Anonymous'`.
6. Compare array union `+` vs `array_merge()` with both numeric and string keys — output the differences.

**Advanced:**
7. Build a `Calculator` class that evaluates a simple expression string like `"5 + 3 * 2"` respecting operator precedence, using only PHP operators (no eval).
8. Create a configuration merge function that uses array union and `??` to merge user settings with defaults, handling nested arrays (e.g., `['db' => ['host' => '...', 'port' => 3306]]`).
