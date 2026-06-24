# 24. PHP Form Validation

## 📘 Introduction
PHP form validation ensures user-submitted data meets specific rules before processing. PHP provides built-in filters (`filter_var`) for common types like email and URL, along with support for custom validation logic and structured error reporting.

## 🧠 Key Concepts
- **Validation**: Checking that data meets defined rules (format, length, range).
- **`filter_var`**: Built-in PHP function for validating and sanitizing data.
- **`FILTER_VALIDATE_EMAIL`**: Validates email format according to RFC 5321/5322.
- **`FILTER_VALIDATE_URL`**: Validates URL format (with or without protocol).
- **`FILTER_VALIDATE_INT`**, **`FILTER_VALIDATE_FLOAT`**: Numeric validation.
- **Custom validation**: Using `preg_match`, string functions, or conditional logic.
- **Error arrays**: Collecting per-field error messages for display.

## 💻 Syntax
```php
// Built-in validation
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
}

// Custom validation
if (strlen($name) < 2) {
    $errors['name'] = "Name must be at least 2 characters";
}

// Error array pattern
$errors = [];
$fields = ['name', 'email', 'phone'];
foreach ($fields as $field) {
    if (empty($_POST[$field])) {
        $errors[$field] = ucfirst($field) . " is required";
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Validate a name (letters/spaces only, 2-50 chars), email, and age using `filter_var`.

**Code:**
```php
<?php
$name = $email = $age = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $age = $_POST['age'] ?? '';

    // Custom: name must be letters and spaces only
    if (!preg_match("/^[a-zA-Z\s]{2,50}$/", $name)) {
        $errors['name'] = "Name must be 2-50 letters and spaces only";
    }

    // Built-in: email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }

    // Built-in: integer validation with range
    $ageInt = filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1, "max_range" => 150]]);
    if ($ageInt === false) {
        $errors['age'] = "Age must be a number between 1 and 150";
    }
}
?>

<form method="POST" action="">
    Name: <input type="text" name="name" value="<?php echo htmlspecialchars($name); ?>">
    <?php if (isset($errors['name'])): ?><span style="color:red"><?php echo $errors['name']; ?></span><?php endif; ?><br>

    Email: <input type="text" name="email" value="<?php echo htmlspecialchars($email); ?>">
    <?php if (isset($errors['email'])): ?><span style="color:red"><?php echo $errors['email']; ?></span><?php endif; ?><br>

    Age: <input type="text" name="age" value="<?php echo htmlspecialchars($age); ?>">
    <?php if (isset($errors['age'])): ?><span style="color:red"><?php echo $errors['age']; ?></span><?php endif; ?><br>

    <button type="submit">Submit</button>
</form>
```

**Output:** On submitting invalid data, each field shows its error message. Valid submissions proceed silently (or with a success message).

**Explanation:** Name uses `preg_match` for custom validation; email uses `FILTER_VALIDATE_EMAIL`; age uses `FILTER_VALIDATE_INT` with min/max range options.

## 🚀 Example 2 - Intermediate

**Problem:** Validate a user profile form with name, email, website, phone (US format), and gender. Use both built-in filters and custom regex.

**Code:**
```php
<?php
$errors = [];
$data = ['name' => '', 'email' => '', 'website' => '', 'phone' => '', 'gender' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data['name']    = trim($_POST['name'] ?? '');
    $data['email']   = trim($_POST['email'] ?? '');
    $data['website'] = trim($_POST['website'] ?? '');
    $data['phone']   = trim($_POST['phone'] ?? '');
    $data['gender']  = $_POST['gender'] ?? '';

    if (empty($data['name']) || !preg_match("/^[a-zA-Z\s'-]+$/", $data['name'])) {
        $errors['name'] = "Valid name is required (letters, spaces, apostrophes)";
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Valid email is required";
    }
    if (!empty($data['website']) && !filter_var($data['website'], FILTER_VALIDATE_URL)) {
        $errors['website'] = "Invalid URL format";
    }
    if (!empty($data['phone']) && !preg_match("/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/", $data['phone'])) {
        $errors['phone'] = "Invalid phone (e.g. 555-123-4567)";
    }
    if (!in_array($data['gender'], ['male', 'female', 'other'])) {
        $errors['gender'] = "Please select a gender";
    }

    if (empty($errors)) {
        echo "<p style='color:green'>Profile saved successfully!</p>";
        $data = ['name' => '', 'email' => '', 'website' => '', 'phone' => '', 'gender' => ''];
    }
}
?>
```

**Explanation:** Website is optional (only validated if non-empty). Phone uses custom regex for US formats. Gender must be one of three allowed values. `FILTER_VALIDATE_EMAIL` and `FILTER_VALIDATE_URL` provide standard validation for those fields.

## 🏢 Real World Use Case
**User Registration API Validation:** A registration endpoint validates multiple fields with different rules and returns a structured JSON error response.

```php
<?php
function validateRegistration(array $data): array {
    $errors = [];
    if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email';
    }
    if (!filter_var($data['url'] ?? '', FILTER_VALIDATE_URL)) {
        $errors['url'] = 'Invalid website URL';
    }
    $minPass = 8;
    if (strlen($data['password'] ?? '') < $minPass) {
        $errors['password'] = "Password must be at least $minPass characters";
    }
    return $errors;
}
?>
```

## 🎯 Interview Questions

**1. What does `filter_var($email, FILTER_VALIDATE_EMAIL)` actually check?**  
It checks that the email conforms to RFC standards: local part with allowed characters, `@`, and a valid domain with at least one dot-separated TLD.

**2. How do you validate an integer with a range using `filter_var`?**  
`filter_var($val, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]])`.

**3. What is the difference between validation and sanitization filters?**  
Validation filters check if data matches a format (return `true`/`false`). Sanitization filters modify the data (e.g., `FILTER_SANITIZE_EMAIL` removes invalid characters).

**4. Why use an error array instead of individual variables?**  
An error array is easily iterable, extensible, and clean to pass to views or JSON responses.

**5. How do you validate optional fields?**  
Check if the field is non-empty first, then validate: `if (!empty($field) && !filter_var($field, FILTER_VALIDATE_URL)) { ... }`.

## ⚠ Common Errors / Mistakes
- **Not trimming before validation**: Whitespace-only input passes `!empty()` checks.
- **Using `FILTER_VALIDATE_EMAIL` alone is not enough**: It validates format but not whether the domain actually exists.
- **Forgetting to make optional fields optional**: Validating an empty optional field as invalid.
- **Over-relying on client-side validation**: Always validate server-side — client validation can be bypassed.

## 📝 Practice Exercises

**Beginner**
1. Validate a name field to ensure it contains only alphabetic characters and is between 2 and 30 characters.
2. Use `filter_var` to check if a submitted email address is valid and display the result.
3. Validate an age field as an integer between 0 and 120 using `FILTER_VALIDATE_INT`.

**Intermediate**
4. Build a form that validates a name, email, website, and age. Use both built-in filters and custom regex. Display errors in an array.
5. Validate a phone number in international format (+1-555-555-5555) using a custom regex pattern.
6. Create a password validation system that checks for minimum 8 characters, at least one uppercase letter, one lowercase letter, and one digit.

**Advanced**
7. Build a multi-field validation class that accepts field rules as an array and returns structured error messages grouped by field.
8. Implement a credit card number validator using the Luhn algorithm combined with a regex for card type detection (Visa, MasterCard, AmEx).
