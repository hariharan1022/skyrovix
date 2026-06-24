# 21. PHP Superglobals Advanced

## 📘 Introduction
PHP superglobals are built-in associative arrays that are always accessible from any scope. Beyond basic `$_GET` and `$_POST`, advanced usage of `$_SERVER`, `$_SESSION`, `$_COOKIE`, and `$_FILES` is essential for building secure, stateful web applications.

## 🧠 Key Concepts
- **`$_SERVER` details**: `REQUEST_URI`, `REQUEST_METHOD`, `REMOTE_ADDR`, `HTTP_USER_AGENT`, `SERVER_NAME`.
- **`$_SESSION`**: Server-side session storage, started with `session_start()`, stores per-user data across requests.
- **`$_COOKIE`**: Client-side data sent with HTTP headers, set via `setcookie()`, accessible on next request.
- **`$_FILES`**: Handles file uploads via `enctype="multipart/form-data"` forms; contains name, type, tmp_name, error, size.
- **Security**: Validate and sanitize all superglobal input; never trust user data.

## 💻 Syntax
```php
// $_SERVER
$uri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$ip = $_SERVER['REMOTE_ADDR'];

// $_SESSION
session_start();
$_SESSION['user_id'] = 42;

// $_COOKIE
setcookie("theme", "dark", time() + 86400, "/");

// $_FILES
$filename = $_FILES['file']['name'];
move_uploaded_file($_FILES['file']['tmp_name'], "uploads/$filename");
```

## ✅ Example 1 - Basic

**Problem:** Log the request method, URI, and client IP for every page visit.

**Code:**
```php
<?php
$log = sprintf(
    "[%s] %s %s from %s\n",
    date('Y-m-d H:i:s'),
    $_SERVER['REQUEST_METHOD'],
    $_SERVER['REQUEST_URI'],
    $_SERVER['REMOTE_ADDR']
);
file_put_contents("access.log", $log, FILE_APPEND);
echo "Request logged.";
?>
```

**Output:** (appended to access.log)
```
[2026-06-23 14:30:15] GET /home from 192.168.1.10
```

**Explanation:** `$_SERVER` provides the HTTP method (`REQUEST_METHOD`), the requested path (`REQUEST_URI`), and the visitor's IP (`REMOTE_ADDR`). The script logs this to a file.

## 🚀 Example 2 - Intermediate

**Problem:** Build a secure file upload handler that accepts only JPEG/PNG images under 2MB, stores them in `uploads/`, and sets a session success message.

**Code:**
```php
<?php
session_start();
$maxSize = 2 * 1024 * 1024;
$allowedTypes = ['image/jpeg', 'image/png'];
$uploadDir = __DIR__ . '/uploads/';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['avatar'])) {
    $file = $_FILES['avatar'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        $_SESSION['error'] = "Upload failed with error code {$file['error']}";
    } elseif ($file['size'] > $maxSize) {
        $_SESSION['error'] = "File too large. Max 2MB.";
    } elseif (!in_array($file['type'], $allowedTypes)) {
        $_SESSION['error'] = "Only JPEG and PNG allowed.";
    } else {
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newName = uniqid("avatar_") . "." . $ext;
        move_uploaded_file($file['tmp_name'], $uploadDir . $newName);
        $_SESSION['success'] = "Avatar uploaded as $newName";
    }

    // Set a cookie to remember the upload timestamp
    setcookie("last_upload", time(), time() + 86400 * 30, "/");

    header("Location: profile.php");
    exit;
}
?>
```

**Explanation:** The form's `enctype="multipart/form-data"` allows file uploads. `$_FILES` contains file metadata. Validation checks MIME type and file size. `move_uploaded_file` moves from temp to final destination. A session flash message confirms success, and a cookie stores the timestamp.

## 🏢 Real World Use Case
**User Preference Dashboard:** A settings page stores user selections in session, persists a theme preference in a cookie, and logs admin access via `$_SERVER`.

```php
<?php
session_start();
// Cookie for theme
$theme = $_COOKIE['theme'] ?? 'light';
if (isset($_POST['theme'])) {
    setcookie('theme', $_POST['theme'], time() + 86400 * 365, '/');
    $_SESSION['message'] = 'Theme updated!';
    header('Location: /settings');
    exit;
}

// Admin audit log
if ($_SESSION['role'] === 'admin') {
    $entry = date('c') . " Admin {$_SESSION['user']} from {$_SERVER['REMOTE_ADDR']}\n";
    file_put_contents('admin_audit.log', $entry, FILE_APPEND);
}
?>
```

## 🎯 Interview Questions

**1. Why should you call `session_start()` before any output?**  
Sessions set cookies and send headers. Any output before `session_start()` will cause "headers already sent" errors.

**2. How do you destroy a session completely?**  
`session_unset(); session_destroy();` and also unset the session cookie: `setcookie(session_name(), '', time() - 3600, '/')`.

**3. What are the differences between `$_SESSION` and `$_COOKIE`?**  
Session data is stored on the server; cookies are stored on the client. Sessions are more secure but have a server-side footprint. Cookies persist beyond the session but are limited to 4KB.

**4. How do you handle multiple file uploads from an array input?**  
Use naming like `name="photos[]"` and `name="photos[0]"`. `$_FILES['photos']` becomes a nested array with `name`, `type`, `tmp_name`, `error`, `size` each as arrays.

**5. What is a CSRF token and where should it be stored?**  
A CSRF token is a unique, unpredictable value stored in the session and embedded in forms. On submission, the token from the form is compared with the session token to prevent cross-site request forgery.

## ⚠ Common Errors / Mistakes
- **Not starting the session** before accessing `$_SESSION`.
- **Output before `setcookie()` or `session_start()`** causes header errors.
- **Trusting `$_FILES['file']['type']`** — it comes from the client and can be spoofed; validate server-side with `finfo`.
- **Not calling `exit` after `header("Location: ...")`** — the script continues executing.
- **Using `$_SERVER['REMOTE_ADDR']` behind a proxy** — it shows the proxy IP; use `$_SERVER['HTTP_X_FORWARDED_FOR']` cautiously.

## 📝 Practice Exercises

**Beginner**
1. Create a script that displays the visitor's IP address, browser user agent, and the current page URI using `$_SERVER`.
2. Set a cookie named "last_visit" with the current timestamp and display "Your last visit was: [time]" on page load.
3. Build a simple page counter using `$_SESSION` that increments each time the user reloads.

**Intermediate**
4. Build an avatar upload form that validates file type (JPEG, PNG, GIF) and size (max 1MB), saves the file with a unique name, and displays it on a profile page.
5. Create a login system that stores `user_id` and `username` in `$_SESSION`, and redirects to login if session is not set.
6. Implement a theme switcher that stores the theme preference in a cookie (expires in 30 days) and applies a CSS class based on the value.

**Advanced**
7. Build a secure session-based CSRF protection system that generates, stores, and validates tokens on form submission.
8. Implement a multi-file upload handler that accepts up to 5 images, validates each, renames with UUIDs, and stores metadata (original name, size, type) in a JSON file.
