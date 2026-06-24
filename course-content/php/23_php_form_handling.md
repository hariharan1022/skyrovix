# 23. PHP Form Handling

## 📘 Introduction
PHP form handling processes data submitted via HTML forms. Understanding `$_GET` vs `$_POST`, sanitizing input with `htmlspecialchars` and `strip_tags`, validating required fields, showing error messages, and preserving sticky form values are foundational skills for building interactive web applications.

## 🧠 Key Concepts
- **`$_GET`**: Data appended to URL query string; visible in browser; used for idempotent, bookmarkable requests.
- **`$_POST`**: Data sent in HTTP request body; not visible in URL; used for mutations, logins, file uploads.
- **Form `action` and `method`**: `action` defines the target URL; `method` is `GET` or `POST`.
- **`htmlspecialchars`**: Converts special HTML characters to entities (`<` → `&lt;`) to prevent XSS.
- **`strip_tags`**: Strips HTML and PHP tags from a string.
- **`trim`**: Removes whitespace from start/end of string.
- **Required fields**: Check if field is non-empty after trimming.
- **Error messages**: Store per-field errors in an array and display them.
- **Sticky forms**: Re-populate form fields with submitted values after validation errors.

## 💻 Syntax
```php
<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
    Name: <input type="text" name="name"
        value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>">
    <span class="error"><?php echo $errors['name'] ?? ''; ?></span>
    <input type="submit">
</form>
```

## ✅ Example 1 - Basic

**Problem:** Process a GET search form, sanitize the input, and display the search term back to the user safely.

**Code:**
```php
<?php
$searchTerm = '';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['q'])) {
    $raw = $_GET['q'];
    $searchTerm = htmlspecialchars(trim(strip_tags($raw)), ENT_QUOTES, 'UTF-8');
}
?>
<form method="GET" action="">
    <input type="text" name="q" placeholder="Search..."
           value="<?php echo $searchTerm; ?>">
    <button type="submit">Search</button>
</form>
<?php if ($searchTerm): ?>
    <p>You searched for: <strong><?php echo $searchTerm; ?></strong></p>
<?php endif; ?>
```

**Output:** The form is sticky — after submission the input retains the value. The search term is displayed with HTML entities escaped to prevent XSS.

**Explanation:** `trim` removes surrounding whitespace, `strip_tags` removes any HTML tags, and `htmlspecialchars` ensures that characters like `<` and `>` are rendered safely as entities.

## 🚀 Example 2 - Intermediate

**Problem:** Build a registration form with name, email, and password fields. Validate required fields, display individual error messages, and preserve submitted values.

**Code:**
```php
<?php
$name = $email = $password = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($name)) {
        $errors['name'] = 'Name is required';
    }
    if (empty($email)) {
        $errors['email'] = 'Email is required';
    }
    if (empty($password)) {
        $errors['password'] = 'Password is required';
    }

    if (empty($errors)) {
        echo "<p style='color:green'>Registration successful for $name!</p>";
        // Reset form
        $name = $email = $password = '';
    }
}
?>
<form method="POST" action="">
    Name: <input type="text" name="name"
        value="<?php echo htmlspecialchars($name); ?>">
    <span style="color:red"><?php echo $errors['name'] ?? ''; ?></span><br>

    Email: <input type="text" name="email"
        value="<?php echo htmlspecialchars($email); ?>">
    <span style="color:red"><?php echo $errors['email'] ?? ''; ?></span><br>

    Password: <input type="password" name="password"
        value="<?php echo htmlspecialchars($password); ?>">
    <span style="color:red"><?php echo $errors['password'] ?? ''; ?></span><br>

    <button type="submit">Register</button>
</form>
```

**Explanation:** Each field is stored in a variable after trimming. Required checks use `empty()`. Error messages are stored in an associative array by field name and displayed inline. Submitted values are re-populated using `htmlspecialchars` (sticky form behavior).

## 🏢 Real World Use Case
**Contact Form with CSRF Protection:** A contact form collects name, email, and message with session-based CSRF token, sanitizes all output, and sends an email only if all required fields pass validation.

```php
<?php
session_start();
$errors = [];
$data = ['name' => '', 'email' => '', 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['_token'] ?? '';
    if (!hash_equals($_SESSION['_token'], $token)) {
        die('Invalid CSRF token');
    }

    foreach (['name', 'email', 'message'] as $field) {
        $data[$field] = trim($_POST[$field] ?? '');
        if (empty($data[$field])) {
            $errors[$field] = ucfirst($field) . ' is required';
        }
    }

    if (empty($errors)) {
        $safeName = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8');
        $safeMsg   = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');
        // mail($to, "Contact from $safeName", $safeMsg, "From: $safeEmail");
        echo "<p>Thank you, $safeName. We'll be in touch.</p>";
        $data = ['name' => '', 'email' => '', 'message' => ''];
    }
}
$_SESSION['_token'] = bin2hex(random_bytes(32));
?>
```

## 🎯 Interview Questions

**1. What is the difference between `$_GET` and `$_POST`?**  
`$_GET` sends data via URL query string (visible, limited length); `$_POST` sends via request body (not visible, no length limit, supports file uploads).

**2. Why use `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` in form fields?**  
It prevents XSS by encoding special characters. `ENT_QUOTES` encodes both single and double quotes. UTF-8 ensures proper handling of multibyte characters.

**3. What does `$_SERVER['PHP_SELF']` do and why should it be escaped?**  
It outputs the current script filename. If not escaped with `htmlspecialchars`, an attacker can inject XSS via the URL.

**4. How do you make a form sticky (re-populate after submission)?**  
Set each input's `value` attribute to the submitted value using `htmlspecialchars($value)`.

**5. What is the purpose of `trim()` in form handling?**  
It removes leading/trailing whitespace so that a field with only spaces is treated as empty.

## ⚠ Common Errors / Mistakes
- **Forgetting `method="POST"` for sensitive data** — data appears in URL and server logs.
- **Not using `htmlspecialchars`** — leads to XSS vulnerabilities when rendering submitted data.
- **Setting `action=""` incorrectly** — the form may submit to the wrong URL.
- **Using `$_SERVER['PHP_SELF']` without escaping** — vulnerable to XSS injection.
- **Not separating form display and logic** — mixing concerns leads to messy, hard-to-debug code.

## 📝 Practice Exercises

**Beginner**
1. Create a form that asks for the user's first name and last name. On submission, display "Hello, [First] [Last]!" and make the form sticky.
2. Build a simple GET-based search form that displays the search term safely using `htmlspecialchars`.
3. Create a feedback form with a textarea that uses `trim` and `strip_tags` before displaying the message.

**Intermediate**
4. Build a registration form with name, email, password, and confirm password. Display inline error messages for empty fields and password mismatch.
5. Create a contact form that sanitizes all inputs with `htmlspecialchars`, validates that fields are not empty, and displays a success message with the submitted (safe) data on the same page.
6. Build a multi-field form (address, city, zip, country) with sticky values and per-field error messages, using `$_POST`.

**Advanced**
7. Build a form wizard with session persistence: split a multi-step form across two pages, storing data in `$_SESSION` between steps, with validation on each step.
8. Implement a form that prevents double submission by setting a session flag on first POST and checking it, with a token-based mechanism.
