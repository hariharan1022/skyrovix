# 19. PHP Functions

## 📘 Introduction
Functions are reusable blocks of code that perform a specific task. PHP supports named functions, anonymous functions (closures), and arrow functions (`fn`). Declaring functions helps you write modular, maintainable, and DRY code.

## 🧠 Key Concepts
- **Function declaration**: Use `function` keyword followed by name and parameters.
- **Parameters**: Input values passed to the function; can have default values.
- **Return values**: Functions return a single value using `return`; `void` returns nothing.
- **Default parameters**: Parameters with default values that are used when no argument is passed.
- **Type declarations** (PHP 7+): Specify types for parameters and return values.
- **Strict types**: `declare(strict_types=1);` enforces type strictness at the file level.
- **Variable functions**: Call a function whose name is stored in a variable.
- **Anonymous functions (closures)**: Functions without a name, can capture variables via `use`.
- **Arrow functions** (`fn`) : Shorter syntax for anonymous functions, automatically capture outer variables by value.

## 💻 Syntax
```php
// Named function with type declarations
function add(int $a, int $b): int {
    return $a + $b;
}

// Default parameter
function greet(string $name = "Guest"): string {
    return "Hello, $name!";
}

// Variable function
$func = "strtoupper";
echo $func("hello");

// Anonymous function / closure
$multiply = function($x, $y) {
    return $x * $y;
};

// Arrow function (PHP 7.4+)
$square = fn($n) => $n * $n;
```

## ✅ Example 1 - Basic

**Problem:** Write a function that checks if a number is even or odd and returns a descriptive string.

**Code:**
```php
<?php
function checkEvenOdd(int $num): string {
    if ($num % 2 === 0) {
        return "$num is even";
    }
    return "$num is odd";
}

echo checkEvenOdd(10) . "\n";
echo checkEvenOdd(7);
?>
```

**Output:**
```
10 is even
7 is odd
```

**Explanation:** The function takes an integer, applies type declaration (`int`), and returns a string. It uses modulo to determine even/odd.

## 🚀 Example 2 - Intermediate

**Problem:** Create a reusable discount calculator using a closure and an arrow function. The discount percentage is configurable.

**Code:**
```php
<?php
declare(strict_types=1);

// Closure with use to capture discount rate
function createDiscountCalculator(float $discountRate): callable {
    return function(float $price) use ($discountRate): float {
        return $price - ($price * $discountRate);
    };
}

$tenPercentOff = createDiscountCalculator(0.10);
echo "With 10% off: \$" . $tenPercentOff(100.00) . "\n";

// Arrow function equivalent
$twentyPercentOff = fn(float $price): float => $price - ($price * 0.20);
echo "With 20% off: \$" . $twentyPercentOff(100.00);
?>
```

**Output:**
```
With 10% off: $90
With 20% off: $80
```

**Explanation:** `createDiscountCalculator` returns a closure that remembers `$discountRate`. The arrow function demonstrates the same logic more concisely with automatic variable capture.

## 🏢 Real World Use Case
**API Response Formatter:** A utility function normalizes all API responses into a consistent JSON structure, using type declarations to enforce data integrity.

```php
<?php
function apiResponse(mixed $data, string $message = "OK", int $code = 200): array {
    return [
        "status" => $code >= 200 && $code < 300 ? "success" : "error",
        "message" => $message,
        "data" => $data,
        "code" => $code
    ];
}

// Used across all endpoints
echo json_encode(apiResponse(["id" => 1, "name" => "Alice"]));
?>
```

## 🎯 Interview Questions

**1. What is the difference between `fn()` and `function()` anonymous functions?**  
Arrow functions (`fn`) automatically capture outer variables by value; closures (`function`) require `use` to capture variables. Arrow functions are limited to a single expression.

**2. What does `declare(strict_types=1);` do?**  
It enables strict mode for type declarations in that file, causing PHP to throw a `TypeError` if argument types don't match exactly instead of attempting coercion.

**3. Can a function have a `void` return type?**  
Yes. Declare `function log(string $msg): void { ... }`. It means the function should not return a value.

**4. What are variable functions?**  
A variable function is called by appending `()` to a variable that holds the function name, e.g., `$fn = "strlen"; echo $fn("hello");`.

**5. How do you pass function arguments by reference?**  
Prefix the parameter with `&`: `function addFive(int &$num): void { $num += 5; }`.

## ⚠ Common Errors / Mistakes
- **Forgetting `return`**: The function executes but returns `null`.
- **Mismatched types in strict mode**: Passing a string to a parameter declared `int` throws `TypeError`.
- **Not capturing variables in closures**: Using `$var` inside a closure without `use ($var)` causes an undefined variable notice.
- **Calling a function before its definition**: Named functions can be called before definition (hoisting), but anonymous functions must be defined before use.

## 📝 Practice Exercises

**Beginner**
1. Write a function `isPalindrome(string $word): bool` that returns `true` if the word reads the same forwards and backwards.
2. Create a function `celsiusToFahrenheit(float $c): float` that converts Celsius to Fahrenheit.
3. Write a function `formatName(string $first, string $last): string` that returns "Last, First" format.

**Intermediate**
4. Create a closure that filters an array of integers to return only those greater than a given threshold (captured via `use`).
5. Write a function `factorial(int $n): int` using recursion to calculate the factorial of a number.
6. Build a function `pluck(array $data, string $key): array` that extracts a column of values from an associative array (like Laravel's `pluck`).

**Advanced**
7. Implement a function `pipe(callable ...$fns): callable` that returns a closure composing the given functions from left to right.
8. Create a memoization wrapper function `memoize(callable $fn): callable` that caches return values based on arguments.
