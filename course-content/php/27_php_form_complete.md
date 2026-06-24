# 27. PHP Form Complete

## 📘 Introduction
This topic combines all form handling concepts into a complete, production-style example: collecting name, email, website, comment, and gender with full validation, sanitization, sticky values, and a success message.

## 🧠 Key Concepts
- **Complete validation pipeline**: Sanitize → validate → respond.
- **Sticky values**: Re-populate form fields with submitted (and safe) data on error.
- **Sanitization**: `htmlspecialchars` for safe HTML output, `filter_var` for data cleanup.
- **Per-field error messages**: Each input displays its own error.
- **Success message**: Shown only when all validation passes.
- **Form reset**: Clearing submitted values after successful processing.

## 💻 Syntax
```php
<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
    <input type="text" name="name"
           value="<?php echo htmlspecialchars($data['name'] ?? ''); ?>">
    <span class="error"><?php echo $errors['name'] ?? ''; ?></span>
    ...
</form>
```

## ✅ Example 1 - Basic

**Problem:** Build a complete contact form with name, email, comment fields; validate all; show sticky values.

**Code:**
```php
<?php
$data = ['name' => '', 'email' => '', 'comment' => ''];
$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data['name']    = trim($_POST['name'] ?? '');
    $data['email']   = trim($_POST['email'] ?? '');
    $data['comment'] = trim($_POST['comment'] ?? '');

    if (empty($data['name'])) {
        $errors['name'] = 'Name is required';
    }
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    if (empty($data['comment'])) {
        $errors['comment'] = 'Comment is required';
    } elseif (strlen($data['comment']) > 1000) {
        $errors['comment'] = 'Comment must be under 1000 characters';
    }

    if (empty($errors)) {
        $success = true;
        $data = ['name' => '', 'email' => '', 'comment' => ''];
    }
}
?>
<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
    <?php if ($success): ?><p style="color:green">Thank you for your comment!</p><?php endif; ?>

    Name *:<br>
    <input type="text" name="name" value="<?php echo htmlspecialchars($data['name']); ?>">
    <span style="color:red"><?php echo $errors['name'] ?? ''; ?></span><br>

    Email *:<br>
    <input type="text" name="email" value="<?php echo htmlspecialchars($data['email']); ?>">
    <span style="color:red"><?php echo $errors['email'] ?? ''; ?></span><br>

    Comment *:<br>
    <textarea name="comment"><?php echo htmlspecialchars($data['comment']); ?></textarea>
    <span style="color:red"><?php echo $errors['comment'] ?? ''; ?></span><br>

    <button type="submit">Submit</button>
</form>
```

**Output:** On empty/invalid submission, errors appear per field and values persist. On success, a thank-you message replaces the form data.

**Explanation:** The form uses one script for both display and processing (POST back to self). All output is sanitized with `htmlspecialchars`. Each field has sticky values. Comment is also validated for max length.

## 🚀 Example 2 - Intermediate

**Problem:** Build a complete profile form with name, email, website, comment, and gender. Include full sanitization, validation, sticky values, and a success message. Use `$errors` array for all feedback.

**Code:**
```php
<?php
$data = ['name' => '', 'email' => '', 'website' => '', 'comment' => '', 'gender' => ''];
$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize
    $data['name']    = trim($_POST['name'] ?? '');
    $data['email']   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $data['website'] = filter_var(trim($_POST['website'] ?? ''), FILTER_SANITIZE_URL);
    $data['comment'] = trim($_POST['comment'] ?? '');
    $data['gender']  = $_POST['gender'] ?? '';

    // Validate
    if (empty($data['name']) || !preg_match("/^[a-zA-Z\s'-]{2,50}$/", $data['name'])) {
        $errors['name'] = 'Name is required (2-50 letters, spaces, hyphens)';
    }
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    if (!empty($data['website']) && !filter_var($data['website'], FILTER_VALIDATE_URL)) {
        $errors['website'] = 'Invalid URL (include http://)';
    }
    if (empty($data['comment'])) {
        $errors['comment'] = 'Comment is required';
    }
    if (!in_array($data['gender'], ['male', 'female', 'other'])) {
        $errors['gender'] = 'Please select a gender';
    }

    if (empty($errors)) {
        $success = true;
        $display = [
            'name'    => htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8'),
            'email'   => htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8'),
            'website' => htmlspecialchars($data['website'], ENT_QUOTES, 'UTF-8'),
            'comment' => nl2br(htmlspecialchars($data['comment'], ENT_QUOTES, 'UTF-8')),
            'gender'  => htmlspecialchars($data['gender'], ENT_QUOTES, 'UTF-8'),
        ];
        $data = ['name' => '', 'email' => '', 'website' => '', 'comment' => '', 'gender' => ''];
    }
}
?>
<form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
    <?php if ($success): ?>
        <p style="color:green">Profile submitted!</p>
        <ul>
            <li>Name: <?php echo $display['name']; ?></li>
            <li>Email: <?php echo $display['email']; ?></li>
            <li>Website: <?php echo $display['website']; ?></li>
            <li>Comment: <?php echo $display['comment']; ?></li>
            <li>Gender: <?php echo $display['gender']; ?></li>
        </ul>
    <?php endif; ?>

    Name *:<br>
    <input type="text" name="name" value="<?php echo htmlspecialchars($data['name']); ?>">
    <span style="color:red"><?php echo $errors['name'] ?? ''; ?></span><br>

    Email *:<br>
    <input type="text" name="email" value="<?php echo htmlspecialchars($data['email']); ?>">
    <span style="color:red"><?php echo $errors['email'] ?? ''; ?></span><br>

    Website:<br>
    <input type="text" name="website" value="<?php echo htmlspecialchars($data['website']); ?>">
    <span style="color:red"><?php echo $errors['website'] ?? ''; ?></span><br>

    Comment *:<br>
    <textarea name="comment"><?php echo htmlspecialchars($data['comment']); ?></textarea>
    <span style="color:red"><?php echo $errors['comment'] ?? ''; ?></span><br>

    Gender *:<br>
    <select name="gender">
        <option value="">-- Select --</option>
        <option value="male" <?php echo $data['gender'] === 'male' ? 'selected' : ''; ?>>Male</option>
        <option value="female" <?php echo $data['gender'] === 'female' ? 'selected' : ''; ?>>Female</option>
        <option value="other" <?php echo $data['gender'] === 'other' ? 'selected' : ''; ?>>Other</option>
    </select>
    <span style="color:red"><?php echo $errors['gender'] ?? ''; ?></span><br>

    <button type="submit">Submit</button>
</form>
```

## 🏢 Real World Use Case
**User Registration Endpoint:** A complete registration form with name, email, website (optional), bio, and gender — with sanitization, validation, sticky values, CSRF token, and database insert.

## 🎯 Interview Questions

**1. How do you handle optional fields alongside required fields?**  
Check `!empty()` for required fields, and only validate optional fields if they are non-empty.

**2. What is the best practice for displaying submitted data safely?**  
Always use `htmlspecialchars($value, ENT_QUOTES, 'UTF-8')` before outputting any user-submitted data.

**3. How do you make a `<textarea>` sticky?**  
Place the sanitized value between the opening and closing tags: `<textarea name="comment"><?php echo htmlspecialchars($comment); ?></textarea>`.

**4. How do you make a `<select>` element sticky?**  
Compare each option value to the submitted value and add the `selected` attribute: `<option value="male" <?php echo $gender === 'male' ? 'selected' : ''; ?>>Male</option>`.

**5. What is the purpose of `nl2br()` when displaying user comments?**  
It converts newline characters to `<br>` tags, preserving line breaks in HTML output.

## ⚠ Common Errors / Mistakes
- **Not resetting the form data** after successful submission (stale data remains visible).
- **Forgetting to sanitize output on the success message** — the message itself can contain user data and must be escaped.
- **Mixing `$_POST` access with `$_GET` form method** — always check the form's `method` attribute matches the superglobal.
- **Not handling select/checkbox/radio sticky state** leads to lost selections on validation errors.

## 📝 Practice Exercises

**Beginner**
1. Build a complete "Contact Us" form with name, email, and message fields. Validate all as required and show sticky values.
2. Extend the form to include a subject dropdown (General, Support, Billing) with sticky selection.
3. Add a "Subscribe to newsletter" checkbox that remains checked on validation errors.

**Intermediate**
4. Build a complete profile editor (name, email, website, bio, country) with full sanitization, sticky values, and per-field error messages.
5. Add a terms-and-conditions checkbox that must be checked. Show an error if unchecked.
6. Build a multi-field form with radio buttons for gender, a select for country, and a textarea for comments. All fields must be sticky.

**Advanced**
7. Build a complete registration form with CSRF token, password strength meter (server-side), confirm-email field that must match email, and proper session-based success/error flash messages.
8. Implement a form builder that reads field definitions from an array (type, label, required, validation rules) and dynamically generates the form, validates, and displays it.
