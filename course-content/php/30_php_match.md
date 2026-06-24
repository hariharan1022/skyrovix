# 30. PHP Match

## 📘 Introduction
The `match` expression, introduced in PHP 8.0, is a more powerful and concise alternative to `switch`. It evaluates a value against multiple conditions, returns a value directly, uses strict comparison (`===`), and does not require `break` statements.

## 🧠 Key Concepts
- **Match expression**: Returns a value, unlike `switch` which is a statement.
- **Strict comparison**: Uses `===` (not `==` like `switch`).
- **No `break` needed**: Each arm is independent — no fall-through.
- **Multiple conditions per arm**: Comma-separated values match any of them.
- **`default` arm**: Catches all unmatched values (like `default` in switch).
- **Must be exhaustive**: If no arm matches and no `default` is given, a `UnhandledMatchError` is thrown.
- **Single expression**: Each arm must be a single expression (not multiple statements).

## 💻 Syntax
```php
$result = match (expression) {
    value1, value2 => return_value,
    value3 => return_value,
    default => default_value,
};
```

## ✅ Example 1 - Basic

**Problem:** Convert a numeric day (1-7) to its name. Use match for clean, concise mapping.

**Code:**
```php
<?php
$day = 3;

$dayName = match ($day) {
    1 => "Monday",
    2 => "Tuesday",
    3 => "Wednesday",
    4 => "Thursday",
    5 => "Friday",
    6 => "Saturday",
    7 => "Sunday",
    default => "Invalid day number",
};

echo "Day $day is $dayName";
?>
```

**Output:**
```
Day 3 is Wednesday
```

**Explanation:** `match` compares `$day` strictly (`===`), returns the matched string directly, and assigns it to `$dayName`. No `break` needed. If `$day` were `"3"` (string), it would not match `3` (integer) and fall to `default`.

## 🚀 Example 2 - Intermediate

**Problem:** Build an order status display that maps status codes to human-readable messages, handles multiple codes per status, and throws an error for unknown codes.

**Code:**
```php
<?php
$statusCode = "shipped";

$message = match ($statusCode) {
    "pending", "processing" => "Your order is being processed.",
    "shipped" => "Your order has been shipped!",
    "delivered" => "Your order was delivered. Enjoy!",
    "cancelled", "refunded" => "This order was cancelled or refunded.",
    default => throw new InvalidArgumentException("Unknown status: $statusCode"),
};

echo $message;

// match as an expression in a return statement
function getDiscount(string $tier): float {
    return match ($tier) {
        "bronze" => 0.05,
        "silver" => 0.10,
        "gold" => 0.15,
        "platinum" => 0.25,
        default => 0.0,
    };
}

echo "\nGold discount: " . (getDiscount("gold") * 100) . "%";
?>
```

**Output:**
```
Your order has been shipped!
Gold discount: 15%
```

**Explanation:** Multiple statuses share the same message via comma-separated values. The `default` arm throws an `InvalidArgumentException` for unknown codes. `match` returns a value that can be assigned or used in a return statement.

## 🏢 Real World Use Case
**HTTP Request Router:** A lightweight front controller uses `match` to route requests to different handlers based on the HTTP method and URI pattern.

```php
<?php
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$response = match (true) {
    $method === 'GET' && $uri === '/users'    => fetchUsers(),
    $method === 'POST' && $uri === '/users'   => createUser(),
    $method === 'GET' && preg_match('#^/users/(\d+)$#', $uri) => fetchUser((int)$uri),
    $method === 'DELETE' && preg_match('#^/users/(\d+)$#', $uri) => deleteUser((int)$uri),
    default => notFound(),
};

echo $response;

function fetchUsers(): string { return "List of users"; }
function createUser(): string { return "User created"; }
function fetchUser(int $id): string { return "User $id"; }
function deleteUser(int $id): string { return "Deleted user $id"; }
function notFound(): string { return "404 Not Found"; }
?>
```

## 🎯 Interview Questions

**1. What are the key differences between `match` and `switch`?**  
`match` is an expression (returns a value), uses strict `===` comparison, has no fall-through, supports multiple conditions per arm with commas, and must be exhaustive (or have a `default`).

**2. What happens if no arm matches and there is no `default`?**  
A `UnhandledMatchError` is thrown (PHP 8.0+).

**3. Can `match` be used with complex conditions?**  
Yes. Use `match(true)` with boolean expressions: `match(true) { $x > 5 => 'big', $x > 0 => 'small', default => 'zero' }`.

**4. Why does `match` not need `break`?**  
Each arm is an independent expression and only one returns a value. There is no fall-through mechanism.

**5. Can `match` execute multiple statements per arm?**  
No. Each arm must be a single expression. To run multiple statements, use a function call in the arm.

## ⚠ Common Errors / Mistakes
- **Using `=` instead of `=>`**: The operator is `=>`, not `=`.
- **Forgetting semicolon**: `match` expression ends with `;` (unlike `switch` which uses braces).
- **Expecting loose comparison**: `match("1")` does NOT match `case 1` — it uses `===`.
- **No default and unhandled value**: Throws `UnhandledMatchError` — always include a `default` arm.
- **Trying to use `match` as a statement**: `match` always returns a value; you must assign or use it.

## 📝 Practice Exercises

**Beginner**
1. Use `match` to convert a numeric month (1-12) to its season: "Winter" (12,1,2), "Spring" (3,4,5), "Summer" (6,7,8), "Fall" (9,10,11).
2. Write a match expression that maps a product category code ("EL" => "Electronics", "CL" => "Clothing", "FO" => "Food") to full category name.
3. Create a simple calculator using `match` that takes an operator (`+`, `-`, `*`, `/`) and two numbers, returning the result.

**Intermediate**
4. Build a match expression that checks the length of a password string and returns "weak" (< 6), "medium" (6-10), "strong" (11-15), or "very strong" (> 15).
5. Use `match(true)` to build an HTTP status code classifier: 2xx => "Success", 3xx => "Redirect", 4xx => "Client Error", 5xx => "Server Error".
6. Rewrite a `switch`-based grade calculator (A, B, C, D, F) using `match` with strict comparison.

**Advanced**
7. Build a polymorphic dispatcher using `match` on a class name string or type that calls different handler classes for each type.
8. Implement a pricing engine using nested match expressions: base price modified by membership tier and quantity tier, returning the final price.
