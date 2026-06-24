## 38. PHP Filters

## 📘 Introduction
PHP filters provide a built-in way to validate and sanitize external input (from forms, APIs, databases, or any untrusted source). Using filter functions reduces boilerplate code and helps prevent security vulnerabilities like XSS, SQL injection, and malformed data from reaching your application logic.

## 🧠 Key Concepts
- **Validation vs Sanitization**: Validation checks if data meets criteria (returns true/false or the value/ false). Sanitization modifies data by removing or encoding unsafe characters.
- **filter_var**: Filters a single variable with a specified filter.
- **filter_input**: Gets and filters an external input (`INPUT_GET`, `INPUT_POST`, `INPUT_COOKIE`, `INPUT_SERVER`, `INPUT_ENV`).
- **filter_has_var**: Checks if a variable of a given input type exists.
- **filter_id**: Returns the filter ID for a named filter (useful for debugging).
- **FILTER_VALIDATE_EMAIL**: Validates email address format.
- **FILTER_VALIDATE_URL**: Validates URL format (with scheme, host).
- **FILTER_VALIDATE_INT**: Validates integer within optional range.
- **FILTER_SANITIZE_STRING**: Strips tags and/or encodes special characters (deprecated in PHP 8.1 — use `htmlspecialchars` instead).
- **FILTER_SANITIZE_EMAIL**: Removes characters not allowed in email addresses.
- **Custom filters**: Use `FILTER_CALLBACK` with a custom function for arbitrary validation/sanitization logic.

## 💻 Syntax
```php
<?php
// Validation
$email = filter_var('user@example.com', FILTER_VALIDATE_EMAIL);
$url   = filter_var('https://example.com', FILTER_VALIDATE_URL);
$age   = filter_var('25', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 120]]);

// Sanitization
$clean = filter_var('<script>alert("xss")</script>', FILTER_SANITIZE_STRING);
$cleanEmail = filter_var('user@exa mple.com', FILTER_SANITIZE_EMAIL);

// From input
$name = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT, ['options' => ['default' => 1]]);

// Check existence
if (filter_has_var(INPUT_GET, 'search')) {
    echo "Search parameter present";
}
?>
```

## ✅ Example 1 - Basic
**Problem**: Validate and sanitize user registration form input.

**Code** (`register.php`):
```php
<?php
$errors = [];
$data = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize name
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    if (empty($name)) {
        $errors[] = 'Name is required.';
    }
    $data['name'] = $name;
    
    // Validate email
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    if ($email === false) {
        $errors[] = 'Invalid email address.';
    }
    $data['email'] = $email;
    
    // Validate age (integer between 1 and 120)
    $age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1, 'max_range' => 120]
    ]);
    if ($age === false) {
        $errors[] = 'Age must be a number between 1 and 120.';
    }
    $data['age'] = $age;
    
    // Sanitize URL
    $website = filter_input(INPUT_POST, 'website', FILTER_SANITIZE_URL);
    $website = filter_var($website, FILTER_VALIDATE_URL);
    $data['website'] = $website ?: '';
    
    if (empty($errors)) {
        echo "<h2>Registration successful!</h2>";
        echo "<pre>" . print_r($data, true) . "</pre>";
    }
}
?>
<form method="post">
    <input name="name" placeholder="Name" value="<?= $data['name'] ?? '' ?>">
    <input name="email" placeholder="Email" value="<?= $data['email'] ?? '' ?>">
    <input name="age" placeholder="Age" value="<?= $data['age'] ?? '' ?>">
    <input name="website" placeholder="Website" value="<?= $data['website'] ?? '' ?>">
    <button type="submit">Register</button>
</form>
<?php foreach ($errors as $e): ?>
    <p style="color:red"><?= htmlspecialchars($e) ?></p>
<?php endforeach; ?>
```

**Output** (valid input):
```
Registration successful!
Array
(
    [name] => Alice
    [email] => alice@example.com
    [age] => 28
    [website] => https://alice.dev
)
```

**Explanation**: `FILTER_VALIDATE_EMAIL` and `FILTER_VALIDATE_INT` with range options ensure valid data. `FILTER_SANITIZE_STRING` removes tags from the name. `FILTER_SANITIZE_URL` removes invalid URL characters before validation.

## 🚀 Example 2 - Intermediate
**Problem**: Build a flexible input validator using filter flags and custom sanitization.

**Code** (`input_validator.php`):
```php
<?php
// Simulate input
$_GET = [
    'email'   => '  USER@Example.COM  ',
    'ip'      => '192.168.1.256',
    'int'     => '42abc',
    'bool'    => 'yes',
    'hex'     => '1A3F',
];

// Validate email with flags (trim + lowercase)
$email = filter_var(
    $_GET['email'],
    FILTER_VALIDATE_EMAIL,
    FILTER_FLAG_EMAIL_UNICODE
);
echo "Email: " . var_export($email, true) . "\n";

// Validate IP with flag (no private/reserved ranges)
$ip = filter_var(
    $_GET['ip'],
    FILTER_VALIDATE_IP,
    FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
);
echo "IP: " . var_export($ip, true) . "\n";

// Validate integer with flags (allow hex and octal)
$int = filter_var(
    $_GET['int'],
    FILTER_VALIDATE_INT,
    ['flags' => FILTER_FLAG_ALLOW_HEX | FILTER_FLAG_ALLOW_OCTAL]
);
echo "Int: " . var_export($int, true) . "\n";

// Validate boolean
$bool = filter_var(
    $_GET['bool'],
    FILTER_VALIDATE_BOOLEAN,
    ['flags' => FILTER_FLAG_NONE]
);
echo "Bool: " . var_export($bool, true) . "\n";

// Custom sanitization via FILTER_CALLBACK
$hex = filter_var(
    $_GET['hex'],
    FILTER_CALLBACK,
    ['options' => function($value) {
        return ctype_xdigit($value) ? hexdec($value) : 'invalid';
    }]
);
echo "Hex: " . var_export($hex, true) . "\n";
?>
```

**Output**:
```
Email: 'USER@Example.COM'
IP: false
Int: 42
Bool: true
Hex: 6719
```

**Explanation**: Flags modify filter behavior — `FILTER_FLAG_NO_PRIV_RANGE` rejects private IPs. `FILTER_FLAG_ALLOW_HEX` lets `42abc` be parsed as hex `0x42abc`. `FILTER_CALLBACK` runs a custom closure for arbitrary transformation.

## 🏢 Real World Use Case
**API Input Validation Layer**: A REST API controller uses `filter_input_array` with a defined filter spec to sanitize and validate all incoming JSON/POST data in a single call. Invalid fields are rejected with 422 responses. `FILTER_CALLBACK` is used for custom business rules (e.g., username uniqueness checks via a database lookup).

## 🎯 Interview Questions
1. What is the difference between `FILTER_VALIDATE_EMAIL` and `FILTER_SANITIZE_EMAIL`?
2. How can you set a default value when `filter_var` returns `false`?
3. What flags would you use to allow IPv6 addresses in `FILTER_VALIDATE_IP`?
4. Why was `FILTER_SANITIZE_STRING` deprecated in PHP 8.1?
5. How do you use `filter_input` vs `filter_var` with `$_POST` data?

## ⚠ Common Errors / Mistakes
- **Assuming validation returns the original value**: `FILTER_VALIDATE_*` returns the value if valid, `false` if invalid. `false` can be a valid value (e.g., `0` with `FILTER_VALIDATE_INT`). Always use strict comparison (`=== false`).
- **Not sanitizing before validation**: Pass input through `FILTER_SANITIZE_*` first, then `FILTER_VALIDATE_*` for robust filtering.
- **Over-relying on `FILTER_SANITIZE_STRING`**: It was deprecated in PHP 8.1. Use `htmlspecialchars()` with `ENT_QUOTES` for output escaping.
- **Ignoring flags**: Default flag is `FILTER_FLAG_NONE`. Many filters require explicit flags (e.g., `FILTER_FLAG_EMAIL_UNICODE` for international emails).
- **Using filters on already-trusted data**: Filters have a performance cost. Only use them on untrusted external input.

## 📝 Practice Exercises
**Beginner:**
1. Use `filter_var` with `FILTER_VALIDATE_EMAIL` to check if "john.doe@example.com" is valid.
2. Use `FILTER_SANITIZE_STRING` to remove HTML tags from `<h1>Hello</h1><script>alert(1)</script>`.
3. Use `filter_input` with `INPUT_GET` to retrieve and validate a numeric `id` parameter from the URL.

**Intermediate:**
4. Build a form processor that validates `$_POST['email']`, `$_POST['age']`, and `$_POST['url']` using appropriate filters and displays specific error messages for each.
5. Create a URL router that uses `FILTER_VALIDATE_URL` with `FILTER_FLAG_PATH_REQUIRED` to validate incoming webhook callback URLs.
6. Write a function `clean_input(array $data, array $rules)` that applies filter specs to each field and returns filtered data plus error messages.

**Advanced:**
7. Build a recursive sanitizer function that takes a nested array (e.g., `$_POST` with sub-arrays) and applies filter specs to all levels using `array_walk_recursive` and `filter_var`.
8. Implement a custom validation framework using `FILTER_CALLBACK` with a rule system: define rules like `['field' => 'email', 'validate' => 'email', 'sanitize' => 'email']` and process them through PHP's filter extension.
