## 39. PHP Filters Advanced

## 📘 Introduction
PHP's filter extension offers advanced capabilities for bulk filtering, array validation, callback-based custom logic, and fine-grained flag control. These tools allow you to build robust input validation workflows with minimal code, processing entire form payloads or API requests in a declarative manner.

## 🧠 Key Concepts
- **filter_var_array**: Applies filter definitions to multiple variables at once — accepts an associative array of filter specs.
- **filter_input_array**: Same as `filter_var_array` but retrieves input from an external source (`INPUT_GET`, `INPUT_POST`, etc.).
- **FILTER_CALLBACK**: Invokes a user-defined function for custom validation or sanitization logic.
- **Validation flags**: `FILTER_FLAG_*` modify validation behavior (e.g., `FILTER_FLAG_ALLOW_HEX`, `FILTER_FLAG_NO_PRIV_RANGE`, `FILTER_FLAG_PATH_REQUIRED`, `FILTER_FLAG_QUERY_REQUIRED`, `FILTER_FLAG_EMAIL_UNICODE`).
- **Sanitization flags**: `FILTER_FLAG_STRIP_LOW`, `FILTER_FLAG_STRIP_HIGH`, `FILTER_FLAG_STRIP_BACKTICK`, `FILTER_FLAG_ENCODE_LOW`, `FILTER_FLAG_ENCODE_HIGH`.
- **Filter spec array**: Each field can define `filter`, `flags`, `options` for a complete validation rule.
- **Validating arrays of inputs**: Filter specs support nested array validation when input names use bracket notation (`users[0][email]`).

## 💻 Syntax
```php
<?php
// Bulk variable filtering
$data = [
    'name' => 'Alice',
    'email' => 'alice@example.com',
    'age' => '30',
];

$specs = [
    'name'  => FILTER_SANITIZE_STRING,
    'email' => FILTER_VALIDATE_EMAIL,
    'age'   => ['filter' => FILTER_VALIDATE_INT,
                'options' => ['min_range' => 1, 'max_range' => 120]],
];

$result = filter_var_array($data, $specs);

// Bulk input filtering
$post = filter_input_array(INPUT_POST, [
    'username' => FILTER_SANITIZE_STRING,
    'password' => FILTER_SANITIZE_STRING,
    'remember' => FILTER_VALIDATE_BOOLEAN,
]);

// Custom callback
$result = filter_var('hello', FILTER_CALLBACK, [
    'options' => fn($v) => strtoupper($v)
]);
?>
```

## ✅ Example 1 - Basic
**Problem**: Validate an entire registration form in a single call using `filter_var_array`.

**Code** (`bulk_validation.php`):
```php
<?php
// Simulated POST data
$_POST = [
    'username' => '  john_doe  ',
    'email'    => 'JOHN@EXAMPLE.COM',
    'age'      => '25',
    'website'  => 'https://john.dev',
    'newsletter' => 'yes',
];

$specs = [
    'username' => ['filter' => FILTER_SANITIZE_STRING,
                   'flags'  => FILTER_FLAG_STRIP_LOW],
    'email'    => ['filter' => FILTER_VALIDATE_EMAIL,
                   'flags'  => FILTER_FLAG_EMAIL_UNICODE],
    'age'      => ['filter' => FILTER_VALIDATE_INT,
                   'options' => ['min_range' => 13, 'max_range' => 120]],
    'website'  => ['filter' => FILTER_VALIDATE_URL,
                   'flags'  => FILTER_FLAG_PATH_REQUIRED],
    'newsletter' => ['filter' => FILTER_VALIDATE_BOOLEAN],
];

$result = filter_var_array($_POST, $specs);

echo "<pre>";
print_r($result);
echo "</pre>";

// Check for failures
$errors = array_filter($result, fn($v) => $v === false || $v === null);
if (!empty($errors)) {
    echo "<p style='color:red'>Invalid fields: " . implode(', ', array_keys($errors)) . "</p>";
} else {
    echo "<p style='color:green'>All fields valid!</p>";
}
?>
```

**Output**:
```
Array
(
    [username] => john_doe
    [email] => JOHN@EXAMPLE.COM
    [age] => 25
    [website] => https://john.dev
    [newsletter] => true
)

All fields valid!
```

**Explanation**: `filter_var_array` processes all fields with one call. Each field has a filter spec defining the filter, flags, and options. Invalid fields return `false`. `array_filter` identifies failures. Notice that `FILTER_VALIDATE_EMAIL` returns the email as-is (case preserved).

## 🚀 Example 2 - Intermediate
**Problem**: Use `FILTER_CALLBACK` and flags for sophisticated input processing.

**Code** (`advanced_filters.php`):
```php
<?php
$inputs = [
    'hex_color'  => '#FFAABB',
    'tags'       => 'php, javascript,   css',
    'rating'     => '4.5',
    'comment'    => "Hello\n<script>alert('xss')</script>\nWorld",
    'ip_address' => '10.0.0.1',
];

$specs = [
    // Custom hex color validator
    'hex_color' => ['filter' => FILTER_CALLBACK,
                    'options' => function($v) {
                        return preg_match('/^#[0-9A-Fa-f]{6}$/', $v) ? $v : false;
                    }],
    
    // Sanitize tags, split into array via callback
    'tags' => ['filter' => FILTER_CALLBACK,
               'options' => function($v) {
                   $tags = array_map('trim', explode(',', $v));
                   return array_filter($tags, fn($t) => strlen($t) > 0);
               }],
    
    // Float validation with range
    'rating' => ['filter' => FILTER_VALIDATE_FLOAT,
                 'options' => ['min_range' => 0, 'max_range' => 5],
                 'flags' => FILTER_FLAG_ALLOW_THOUSAND],
    
    // Strip high chars and encode low
    'comment' => ['filter' => FILTER_SANITIZE_STRING,
                  'flags' => FILTER_FLAG_STRIP_LOW | FILTER_FLAG_ENCODE_HIGH],
    
    // IP with rejection of private ranges
    'ip_address' => ['filter' => FILTER_VALIDATE_IP,
                     'flags' => FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE],
];

$result = filter_var_array($inputs, $specs);
print_r($result);
?>
```

**Output**:
```
Array
(
    [hex_color] => #FFAABB
    [tags] => Array
        (
            [0] => php
            [1] => javascript
            [2] => css
        )
    [rating] => 4.5
    [comment] => HelloWorld
    [ip_address] => false
)
```

**Explanation**: `FILTER_CALLBACK` transforms `tags` from a comma-separated string into a clean array. The hex color uses a regex callback. `FILTER_VALIDATE_IP` with `FILTER_FLAG_NO_PRIV_RANGE` rejects `10.0.0.1` (private range). `FILTER_FLAG_STRIP_LOW` strips control characters including `\n`.

## 🏢 Real World Use Case
**REST API Request Validation**: A PHP framework's `Request` class uses `filter_input_array` with a comprehensive filter spec array defined per route. For a POST `/api/users` endpoint, the spec validates email, name length, age range, and role (using `FILTER_CALLBACK` against a whitelist). Failed validations return a 422 JSON response with field-level error messages.

## 🎯 Interview Questions
1. What is the advantage of `filter_input_array` over calling `filter_var` repeatedly?
2. How would you validate an array of email addresses submitted as `emails[]` in a form?
3. What does `FILTER_FLAG_NO_PRIV_RANGE` do when used with `FILTER_VALIDATE_IP`?
4. How can you use `FILTER_CALLBACK` to implement a "unique username" check with a database lookup?
5. What happens in `filter_var_array` when a field's value is missing from the input array?

## ⚠ Common Errors / Mistakes
- **Not distinguishing `false` from `null`**: `filter_var_array` returns `null` for missing fields and `false` for validation failures. Use strict checks.
- **Callback returns the wrong type**: `FILTER_CALLBACK` expects the callback to return the filtered value or `false` on failure. Returning an array is valid (as shown with tags).
- **Ignoring that flags compound**: Multiple flags must be combined with `|` (bitwise OR), e.g., `FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE`.
- **Nested array filtering complexity**: `filter_var_array` does not handle deeply nested arrays well. For complex nested structures, write recursive filter logic.
- **Performance with many callbacks**: Each `FILTER_CALLBACK` invokes a function call. For high-throughput APIs, pre-compile validation rules or use a dedicated validation library.

## 📝 Practice Exercises
**Beginner:**
1. Use `filter_var_array` to validate a user array with fields: `name` (string), `email` (valid email), `age` (int 1-150).
2. Use `FILTER_CALLBACK` to create a filter that trims whitespace from all input strings in an array.
3. Use `FILTER_FLAG_PATH_REQUIRED` to validate that a URL contains a path (e.g., `https://example.com/blog`).

**Intermediate:**
4. Build a filter spec array that processes a contact form (`name`, `email`, `subject`, `message`, `priority` 1-5) using `filter_input_array` with `INPUT_POST`. Use `FILTER_CALLBACK` for priority to ensure it's an integer in range.
5. Create a bulk CSV row validator using `filter_var_array` that validates each column of a CSV row against a spec (e.g., col0=email, col1=int, col2=url).
6. Write a function `validate_with_defaults(array $data, array $specs)` that applies filter specs and fills in default values for missing fields.

**Advanced:**
7. Build a recursive validator class that takes a nested filter spec (supporting `*` for arrays of objects) and validates deeply nested input like `users[*].addresses[*].zipcode` using `FILTER_CALLBACK` and custom recursion.
8. Implement a full JSON schema validator using PHP filters: define a schema in JSON (types, formats, ranges, required fields), convert it to filter specs dynamically, and validate incoming JSON payloads using `filter_var_array`.
