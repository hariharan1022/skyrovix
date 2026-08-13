# 29. PHP JSON

## 📘 Introduction
JSON (JavaScript Object Notation) is the most common data interchange format for web APIs. PHP provides `json_encode()` and `json_decode()` for converting between PHP data structures and JSON strings, with flags like `JSON_PRETTY_PRINT` and `JSON_UNESCAPED_UNICODE` for fine control.

## 🧠 Key Concepts
- **`json_encode()`**: Converts PHP arrays/objects into a JSON string.
- **`json_decode()`**: Converts a JSON string into a PHP variable (array or object).
- **`JSON_PRETTY_PRINT`**: Formats JSON with indentation for readability.
- **`JSON_UNESCAPED_UNICODE`**: Preserves Unicode characters instead of escaping them.
- **`JSON_NUMERIC_CHECK`**: Converts numeric strings to numbers in JSON output.
- **Nested arrays/objects**: Multidimensional data structures serialize naturally.
- **API responses**: JSON is the standard format for REST API responses.
- **`json_last_error()`**: Returns the last error code/string if encoding/decoding fails.

## 💻 Syntax
```php
// Encode
$data = ["name" => "Alice", "age" => 30];
echo json_encode($data);                         // {"name":"Alice","age":30}
echo json_encode($data, JSON_PRETTY_PRINT);       // Formatted with indentation

// Decode
$json = '{"name":"Alice","age":30}';
$arr = json_decode($json, true);                  // Associative array
$obj = json_decode($json);                        // stdClass object

// Flags
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Error handling
$decoded = json_decode("invalid json");
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON Error: " . json_last_error_msg();
}
```

## ✅ Example 1 - Basic

**Problem:** Convert an associative array to a JSON string, then decode it back to an array. Use pretty printing.

**Code:**
```php
<?php
$user = [
    "id" => 1,
    "name" => "Alice",
    "email" => "alice@example.com",
    "is_active" => true,
    "scores" => [85, 92, 78]
];

// Encode to JSON
$json = json_encode($user, JSON_PRETTY_PRINT);
echo "Encoded JSON:\n$json\n\n";

// Decode back to array
$decoded = json_decode($json, true);
echo "Decoded name: " . $decoded['name'] . "\n";
echo "Decoded scores: " . implode(", ", $decoded['scores']) . "\n";

// Check if encoding succeeded
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON Error: " . json_last_error_msg();
}
?>
```

**Output:**
```
Encoded JSON:
{
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "is_active": true,
    "scores": [
        85,
        92,
        78
    ]
}

Decoded name: Alice
Decoded scores: 85, 92, 78
```

**Explanation:** `json_encode` converts the PHP array to JSON. `JSON_PRETTY_PRINT` adds indentation. `json_decode` with `true` as second parameter returns an associative array.

## 🚀 Example 2 - Intermediate

**Problem:** Build an API response helper that returns structured JSON with status, message, and data. Handle Unicode names and ensure numeric strings are properly typed.

**Code:**
```php
<?php
function apiResponse(string $status, string $message, mixed $data = null, int $httpCode = 200): string {
    $response = [
        "status" => $status,
        "message" => $message,
        "data" => $data,
        "timestamp" => date("c")
    ];

    http_response_code($httpCode);
    header("Content-Type: application/json; charset=utf-8");

    return json_encode(
        $response,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
    );
}

// Example usage with Unicode data
$users = [
    ["id" => "1", "name" => "Alice Müller", "score" => "95"],
    ["id" => "2", "name" => "Bob 李", "score" => "87"]
];

echo apiResponse("success", "Users retrieved", $users);
?>
```

**Output:**
```json
{
    "status": "success",
    "message": "Users retrieved",
    "data": [
        {
            "id": 1,
            "name": "Alice Müller",
            "score": 95
        },
        {
            "id": 2,
            "name": "Bob 李",
            "score": 87
        }
    ],
    "timestamp": "2026-06-23T14:30:15+05:30"
}
```

**Explanation:** `JSON_UNESCAPED_UNICODE` preserves `ü` and `李` instead of escaping them. `JSON_NUMERIC_CHECK` converts `"95"` (string) to `95` (integer). The response includes headers and HTTP status code for proper REST compliance.

## 🏢 Real World Use Case
**REST API Endpoint:** A user controller returns JSON responses, with error handling for invalid JSON input and consistent response structure across all endpoints.

```php
<?php
header("Content-Type: application/json; charset=utf-8");

$input = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON: " . json_last_error_msg()
    ]);
    exit;
}

// Process $input...
$response = [
    "status" => "success",
    "data" => ["id" => 42, "name" => $input['name']]
];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
```

## 🎯 Interview Questions

**1. What does the second parameter of `json_decode($json, true)` control?**  
When `true`, it returns an associative array. When `false` (default), it returns `stdClass` objects.

**2. What is the maximum depth for `json_decode`?**  
The default depth is 512. You can set it: `json_decode($json, true, 512, JSON_THROW_ON_ERROR)`.

**3. How do you throw exceptions on JSON errors?**  
Use the `JSON_THROW_ON_ERROR` flag (PHP 7.3+): `json_decode($json, flags: JSON_THROW_ON_ERROR)`.

**4. What does `JSON_FORCE_OBJECT` do?**  
It forces a PHP array to be encoded as a JSON object `{}` instead of an array `[]`.

**5. How do you pretty-print JSON in a browser?**  
Use `JSON_PRETTY_PRINT` flag and set `header("Content-Type: application/json")`. Alternatively, wrap in `<pre>` tags.

## ⚠ Common Errors / Mistakes
- **Not setting `Content-Type: application/json` header** in API responses — browsers/clients may not parse correctly.
- **Forgetting `true` in `json_decode`** and then trying to access data as array — it's an object by default.
- **Not handling `json_last_error()`**: Silent failures produce `null` instead of meaningful errors.
- **Encoding non-UTF-8 data**: JSON requires UTF-8; non-UTF-8 strings will fail encoding.
- **Exposing sensitive data in JSON responses**: Always filter API responses to only include intended fields.

## 📝 Practice Exercises

**Beginner**
1. Create an array with your name, age, and hobbies. Encode it to JSON with `JSON_PRETTY_PRINT` and echo it.
2. Decode the JSON string `'{"product":"Laptop","price":999}'` into an array and print the product name.
3. Use `json_encode` with `JSON_UNESCAPED_UNICODE` to encode a string containing emoji or non-Latin characters.

**Intermediate**
4. Build a function that reads a JSON file, decodes it, adds a new entry, and writes it back with pretty printing.
5. Create a nested array of 3 products (each with id, name, price, tags array) and encode to JSON.
6. Write a script that accepts JSON from `php://input`, decodes it, validates that `name` and `email` keys exist, and returns a JSON success/error response.

**Advanced**
7. Build a lightweight JSON database class that supports `insert`, `select`, `update`, and `delete` operations on a JSON file, with basic query capability.
8. Implement a JSON schema validator: given a JSON input and a rules array (required fields, types, min/max), validate the JSON structure and return a list of errors in JSON format.
