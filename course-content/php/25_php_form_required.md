# 25. PHP Form Required

## 📘 Introduction
Required fields ensure that users submit essential information. PHP uses `isset()` and `empty()` to check for field presence and non-empty values. Server-side validation of required fields is crucial because client-side validation can be bypassed.

## 🧠 Key Concepts
- **`isset()`**: Checks if a variable is set and is not `null`.
- **`empty()`**: Returns `true` if a variable is empty (`""`, `0`, `"0"`, `null`, `false`, `[]`, or unset).
- **Required field validation**: After `trim()`, check that the field is not empty.
- **Asterisk (`*`) notation**: Visually marks required fields in HTML forms.
- **Server-side validation**: Always validate on the server even if client-side validation exists.

## 💻 Syntax
```php
// Check if a field is set and not empty
if (isset($_POST['name']) && trim($_POST['name']) !== '') {
    $name = trim($_POST['name']);
} else {
    $errors['name'] = 'Name is required';
}

// Using empty() — careful: empty("0") returns true
if (empty(trim($_POST['name'] ?? ''))) {
    $errors['name'] = 'Name is required';
}
```

## ✅ Example 1 - Basic

**Problem:** Check that a username and password are both provided before processing login.

**Code:**
```php
<?php
$username = $password = '';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($username === '') {
        $errors['username'] = 'Username is required';
    }
    if ($password === '') {
        $errors['password'] = 'Password is required';
    }

    if (empty($errors)) {
        echo "<p>Welcome back, " . htmlspecialchars($username) . "!</p>";
        $username = $password = '';
    }
}
?>
<form method="POST" action="">
    <label>Username *:
        <input type="text" name="username"
               value="<?php echo htmlspecialchars($username); ?>">
        <span style="color:red"><?php echo $errors['username'] ?? ''; ?></span>
    </label><br>
    <label>Password *:
        <input type="password" name="password">
        <span style="color:red"><?php echo $errors['password'] ?? ''; ?></span>
    </label><br>
    <button type="submit">Login</button>
</form>
```

**Output:** If either field is empty, the corresponding error message appears. If both are provided, a welcome message is shown.

**Explanation:** `$username === ''` after `trim` catches whitespace-only inputs. The `*` visually indicates required fields. Error messages are displayed inline.

## 🚀 Example 2 - Intermediate

**Problem:** Build a job application form with multiple required fields (name, email, phone, position) and conditional required fields (resume required if applying for senior position).

**Code:**
```php
<?php
$errors = [];
$data = ['name' => '', 'email' => '', 'phone' => '', 'position' => '', 'resume' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data['name']     = trim($_POST['name'] ?? '');
    $data['email']    = trim($_POST['email'] ?? '');
    $data['phone']    = trim($_POST['phone'] ?? '');
    $data['position'] = trim($_POST['position'] ?? '');

    if (empty($data['name'])) {
        $errors['name'] = 'Full name is required';
    }
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    }
    if (empty($data['phone'])) {
        $errors['phone'] = 'Phone number is required';
    }
    if (empty($data['position'])) {
        $errors['position'] = 'Position is required';
    }

    // Conditional: resume is required for senior positions
    if (stripos($data['position'], 'senior') !== false && empty(trim($_POST['resume'] ?? ''))) {
        $errors['resume'] = 'Resume is required for senior positions';
    }

    if (empty($errors)) {
        echo "<p style='color:green'>Application submitted for {$data['position']}!</p>";
        $data = array_fill_keys(array_keys($data), '');
    }
}
?>
<form method="POST" action="">
    Name *: <input type="text" name="name" value="<?php echo htmlspecialchars($data['name']); ?>">
    <?php if (isset($errors['name'])): ?><span style="color:red"><?php echo $errors['name']; ?></span><?php endif; ?><br>

    Email *: <input type="text" name="email" value="<?php echo htmlspecialchars($data['email']); ?>">
    <?php if (isset($errors['email'])): ?><span style="color:red"><?php echo $errors['email']; ?></span><?php endif; ?><br>

    Phone *: <input type="text" name="phone" value="<?php echo htmlspecialchars($data['phone']); ?>">
    <?php if (isset($errors['phone'])): ?><span style="color:red"><?php echo $errors['phone']; ?></span><?php endif; ?><br>

    Position *: <input type="text" name="position" value="<?php echo htmlspecialchars($data['position']); ?>">
    <?php if (isset($errors['position'])): ?><span style="color:red"><?php echo $errors['position']; ?></span><?php endif; ?><br>

    Resume: <input type="text" name="resume" value="<?php echo htmlspecialchars($data['resume']); ?>">
    <small>(Required for senior positions)</small>
    <?php if (isset($errors['resume'])): ?><span style="color:red"><?php echo $errors['resume']; ?></span><?php endif; ?><br>

    <button type="submit">Apply</button>
</form>
```

**Explanation:** All fields marked with `*` are validated as required. The resume field is conditionally required using `stripos` to detect "senior" in the position.

## 🏢 Real World Use Case
**Multi-Step Checkout Form:** Required fields are validated per step (shipping address, payment), with conditional requirements based on user selections.

```php
<?php
session_start();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['step']) && $_POST['step'] === 'shipping') {
    $required = ['first_name', 'last_name', 'address', 'city', 'zip', 'country'];
    foreach ($required as $field) {
        if (empty(trim($_POST[$field] ?? ''))) {
            $errors[$field] = ucfirst(str_replace('_', ' ', $field)) . ' is required';
        }
    }
    // Conditionally require state for US
    if (($_POST['country'] ?? '') === 'US' && empty(trim($_POST['state'] ?? ''))) {
        $errors['state'] = 'State is required for US addresses';
    }
}
?>
```

## 🎯 Interview Questions

**1. What is the difference between `isset()` and `empty()`?**  
`isset()` returns `true` if a variable exists and is not `null`. `empty()` returns `true` if a variable is `""`, `0`, `"0"`, `null`, `false`, `[]`, or unset.

**2. Why should you `trim()` before checking `empty()`?**  
A field with only spaces would pass `empty()` as false (since `"   "` is not empty), but after `trim()` it becomes `""` which is empty.

**3. Can `empty()` be used directly on `$_POST['field']`?**  
Yes — `empty($_POST['field'])` returns `true` if the field is not set, is `null`, or is an empty string. No undefined index warning is thrown.

**4. How do you mark a field as required visually in HTML?**  
Add an asterisk `*` next to the label, often in red: `<label>Email <span style="color:red">*</span></label>`.

**5. Why is server-side required-field validation essential?**  
Client-side validation can be bypassed by disabling JavaScript or making direct HTTP requests. Server-side validation is the last line of defense.

## ⚠ Common Errors / Mistakes
- **Using `empty()` on the raw `$_POST` value** misses whitespace-only input — always `trim()` first.
- **Forgetting that `empty("0")` returns `true`**: For fields where `"0"` is valid (e.g., quantity), use `$val !== '' && $val !== null`.
- **Not using `??` (null coalescing)**: Accessing `$_POST['field']` without `?? ''` causes an undefined index warning.
- **Mixing client-side `required` attribute with server-side**: Don't rely solely on `required` attribute in HTML.

## 📝 Practice Exercises

**Beginner**
1. Create a form with a single "full name" field that displays "Name is required" if left empty.
2. Build a login form with required username and password fields. Show separate error messages for each.
3. Write a form that has a required email field and a required "agree to terms" checkbox.

**Intermediate**
4. Build a shipping form with required fields (name, address, city, zip) and a conditional required field (state required if country is US or Canada).
5. Create a survey form where at least one option in a checkbox group must be selected. Validate server-side.
6. Build a registration form that requires either a phone number or an email address (at least one must be filled).

**Advanced**
7. Implement a dynamic required-field system that reads field requirement rules from an array and validates all fields in a loop.
8. Build a form wizard where required field validation happens per step, incomplete steps prevent proceeding to the next, and data persists in the session.
