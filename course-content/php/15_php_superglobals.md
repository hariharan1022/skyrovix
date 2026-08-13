## 15. PHP Superglobals

## 📘 Introduction
Superglobals are built-in associative arrays available in all scopes throughout a PHP script. They carry information about HTTP requests, server environment, sessions, cookies, and file uploads. They are the backbone of PHP web application input handling.

## 🧠 Key Concepts
- **$_GET**: Query string parameters from URL (`?key=value`).
- **$_POST**: Form data sent via HTTP POST method.
- **$_REQUEST**: Combined data from `$_GET`, `$_POST`, and `$_COOKIE`. Less secure — prefer specific superglobals.
- **$_SERVER**: Server and execution environment info (headers, paths, script locations).
- **$_SESSION**: Session variables stored on the server, persisted across requests.
- **$_COOKIE**: Cookie data sent from the client's browser.
- **$_FILES**: Files uploaded via HTTP POST (multipart form data).
- **$_ENV**: Environment variables from the server.
- **$GLOBALS**: References to all global variables in the script.

## 💻 Syntax
```php
<?php
// GET
$search = $_GET['q'] ?? '';

// POST
$email = $_POST['email'] ?? '';

// SERVER
$ip = $_SERVER['REMOTE_ADDR'];
$method = $_SERVER['REQUEST_METHOD'];

// SESSION
session_start();
$_SESSION['user_id'] = 123;

// COOKIE
setcookie('theme', 'dark', time() + 3600);
$theme = $_COOKIE['theme'] ?? 'light';

// FILES
move_uploaded_file($_FILES['avatar']['tmp_name'], 'uploads/avatar.jpg');
?>
```

## ✅ Example 1 - Basic
**Problem**: Create a simple form handler that accepts user input via GET and POST, and displays server information.

**Code** (`form_handler.php`):
```php
<?php
session_start();
?>
<!DOCTYPE html>
<html>
<body>
  <h1>Superglobals Demo</h1>

  <!-- GET form -->
  <form method="GET">
    <input type="text" name="search" placeholder="Search...">
    <button type="submit">Search (GET)</button>
  </form>

  <!-- POST form -->
  <form method="POST">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Login (POST)</button>
  </form>

  <h2>Results</h2>
  <h3>$_GET</h3>
  <pre><?php print_r($_GET); ?></pre>

  <h3>$_POST</h3>
  <pre><?php print_r($_POST); ?></pre>

  <h3>$_SERVER</h3>
  <p>Request Method: <?= $_SERVER['REQUEST_METHOD'] ?></p>
  <p>User Agent: <?= $_SERVER['HTTP_USER_AGENT'] ?? 'N/A' ?></p>
  <p>Remote IP: <?= $_SERVER['REMOTE_ADDR'] ?? 'N/A' ?></p>
  <p>Script: <?= $_SERVER['PHP_SELF'] ?></p>

  <h3>Session</h3>
  <?php
  $_SESSION['visited'] = ($_SESSION['visited'] ?? 0) + 1;
  echo "<p>Visited: {$_SESSION['visited']} time(s)</p>";
  ?>
</body>
</html>
```

**Explanation**: `$_GET` captures URL/query form data. `$_POST` captures non-visible form data. `$_SERVER` provides environment details. `$_SESSION` persists the visit counter across page loads. `print_r()` displays superglobal contents for debugging.

## 🚀 Example 2 - Intermediate
**Problem**: Build a file upload handler and demonstrate cookie setting, plus environment variable access.

**Code** (`upload.php`):
```php
<?php
session_start();

// Set a cookie
setcookie('last_visit', date('Y-m-d H:i:s'), time() + 86400 * 30, '/');

// File upload handling
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['document'])) {
    $file = $_FILES['document'];

    if ($file['error'] === UPLOAD_ERR_OK) {
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        $maxSize = 2 * 1024 * 1024; // 2MB

        if (!in_array($file['type'], $allowedTypes)) {
            $message = 'Invalid file type. Allowed: JPG, PNG, PDF.';
        } elseif ($file['size'] > $maxSize) {
            $message = 'File too large (max 2MB).';
        } else {
            $dest = 'uploads/' . basename($file['name']);
            if (move_uploaded_file($file['tmp_name'], $dest)) {
                $message = "Uploaded to: $dest (" . round($file['size'] / 1024) . " KB)";
            } else {
                $message = 'Upload failed.';
            }
        }
    } else {
        $message = 'Error code: ' . $file['error'];
    }
}

// $_ENV example (may need php.ini variables_order = "EGPCS")
$envExample = $_ENV['COMPUTERNAME'] ?? 'Not set';
?>
<!DOCTYPE html>
<html>
<body>
  <h1>File Upload & Cookies</h1>

  <form method="POST" enctype="multipart/form-data">
    <input type="file" name="document" required>
    <button type="submit">Upload</button>
  </form>

  <p><?= htmlspecialchars($message) ?></p>

  <h3>$_COOKIE</h3>
  <p>Last visit: <?= htmlspecialchars($_COOKIE['last_visit'] ?? 'First visit!') ?></p>

  <h3>$_ENV</h3>
  <p>Computer name: <?= htmlspecialchars($envExample) ?></p>

  <h3>$_SERVER Request Headers</h3>
  <pre><?php
  $headers = [
    'HTTP_HOST', 'HTTP_REFERER', 'HTTP_ACCEPT_LANGUAGE',
    'SERVER_SOFTWARE', 'SERVER_PORT', 'DOCUMENT_ROOT'
  ];
  foreach ($headers as $h) {
      echo "$h: " . ($_SERVER[$h] ?? 'N/A') . "\n";
  }
  ?></pre>

  <h3>$GLOBALS example</h3>
  <?php
  $demoVar = "I am global!";
  echo $GLOBALS['demoVar'];
  ?>
</body>
</html>
```

**Explanation**: File uploads require `enctype="multipart/form-data"`. `$_FILES['document']` contains name, type, tmp_name, error, size. `move_uploaded_file()` moves the temp file to a permanent location. `setcookie()` sends a Set-Cookie header. `$_COOKIE` reads the cookie back on subsequent requests. `$GLOBALS` accesses any global variable from any scope.

## 🏢 Real World Use Case
**Login/Authentication System**: `$_POST` captures username/password. `$_SESSION` stores authenticated user ID across requests. `$_COOKIE` stores "remember me" tokens. `$_SERVER['REMOTE_ADDR']` logs IP addresses. `$_SERVER['REQUEST_METHOD']` differentiates GET vs POST for the same endpoint.

## 🎯 Interview Questions
**Q1:** What is the difference between `$_GET`, `$_POST`, and `$_REQUEST`?
**A:** `$_GET` contains URL query parameters. `$_POST` contains HTTP POST body data. `$_REQUEST` combines `$_GET`, `$_POST`, and `$_COOKIE` (order depends on `variables_order` in php.ini). Use `$_GET` and `$_POST` explicitly instead of `$_REQUEST` for security and clarity.

**Q2:** What is `$_SERVER['PHP_SELF']` and what security risk does it pose?
**A:** It contains the current script filename. If used directly in `<form action=" $_SERVER['PHP_SELF'] ">` without `htmlspecialchars()`, it is vulnerable to XSS attacks. Always use `htmlspecialchars($_SERVER['PHP_SELF'])` or omit it.

**Q3:** How do you start a session in PHP?
**A:** Call `session_start()` at the beginning of every page that uses sessions (before any output). Then you can read/write `$_SESSION` variables.

**Q4:** What information is available in `$_FILES` when a file is uploaded?
**A:** `$_FILES['file']['name']` (original name), `['type']` (MIME type), `['tmp_name']` (server temp path), `['error']` (error code), `['size']` (bytes).

**Q5:** Why should you prefer `$_GET`/`$_POST` over `$_REQUEST`?
**A:** `$_REQUEST` merges GET, POST, and COOKIE data, making it unclear where a value originated. This can lead to security issues (e.g., a GET parameter overriding a POST value) and makes code harder to reason about.

## ⚠ Common Errors / Mistakes
- **Forgetting to start `session_start()`**: Trying to access `$_SESSION` without starting the session returns null or sets a new empty session on write.
- **Not validating file uploads**: Trusting `$_FILES['file']['type']` (client-provided MIME type can be faked). Use server-side validation (`finfo`, `mime_content_type`).
- **Output before `setcookie()` / `session_start()`**: Both send headers and fail if any output (even whitespace) was sent before them.
- **Using user input without sanitization**: Never output `$_GET`, `$_POST`, `$_SERVER['PHP_SELF']` directly — use `htmlspecialchars()` to prevent XSS.

## 📝 Practice Exercises
**Beginner:**
1. Create a page that reads a `?name=John` parameter from the URL using `$_GET` and displays "Hello, John!".
2. Build a simple login form (POST) that checks if `$_POST['username']` is "admin" and `$_POST['password']` is "password123", then shows a success or failure message.
3. Use `$_SERVER` to display the page's request method, the user's IP address, and the browser user agent.

**Intermediate:**
4. Build a page counter using `$_SESSION` that increments and displays the count each time the page is refreshed.
5. Create a file upload form that accepts only PNG images (max 1MB), saves them to an `uploads/` directory, and displays the uploaded image on the page.
6. Build a "Remember Me" feature using `$_COOKIE` — set a cookie with the username for 7 days, and pre-fill the username field on return visits.

**Advanced:**
7. Build a secure multi-page form wizard using `$_SESSION` to store data across 3 steps (personal info, address, confirmation) with CSRF token protection and data validation.
8. Create a file manager that uses `$_FILES` for upload, `$_GET` for directory navigation, `$_SERVER['DOCUMENT_ROOT']` for base path, and includes security measures (path traversal prevention, file type whitelist, size limits, duplicate filename handling).
