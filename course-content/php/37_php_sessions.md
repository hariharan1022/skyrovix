## 37. PHP Sessions

## 📘 Introduction
Sessions provide a way to persist user-specific data across multiple page requests. Unlike cookies (which store data on the client), sessions store data on the server, with the client holding only a session identifier (typically a cookie). This makes sessions more secure for sensitive data like authentication status and shopping cart contents.

## 🧠 Key Concepts
- **session_start()**: Initiates or resumes a session. Must be called before any output. Creates a session ID (SID) if one does not exist.
- **$_SESSION**: Superglobal associative array for storing and retrieving session data.
- **session_id()**: Returns or sets the current session ID (default: a cryptographically random string).
- **session_destroy()**: Destroys all session data and the session ID. Does not unset `$_SESSION` or delete the session cookie.
- **session_regenerate_id()**: Replaces the current session ID with a new one — essential for preventing session fixation attacks.
- **php.ini configuration**: `session.save_path`, `session.gc_maxlifetime`, `session.cookie_lifetime`, `session.use_strict_mode`, `session.use_only_cookies`.
- **Session storage**: By default, files on disk. Can be stored in databases, Redis, or Memcached for scalability.
- **Session security**: Regenerate ID after login, set session timeout, use `session.use_strict_mode`, validate user-agent.

## 💻 Syntax
```php
<?php
session_start();

// Store data
$_SESSION['user_id'] = 42;
$_SESSION['cart'] = ['item1', 'item2'];

// Retrieve data
if (isset($_SESSION['user_id'])) {
    echo "User ID: " . $_SESSION['user_id'];
}

// Remove a specific key
unset($_SESSION['cart']);

// Destroy session
session_unset();     // clear $_SESSION
session_destroy();   // destroy server-side data

// Regenerate ID (after login)
session_regenerate_id(true);
?>
```

## ✅ Example 1 - Basic
**Problem**: Implement a simple login system that stores the username in the session and shows it across pages.

**Code** (`login.php`):
```php
<?php
session_start();

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Simple hardcoded check
    if ($username === 'admin' && $password === 'secret') {
        session_regenerate_id(true); // prevent fixation
        $_SESSION['username'] = $username;
        $_SESSION['login_time'] = time();
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid credentials';
}
?>
<form method="post">
    <input type="text" name="username" required placeholder="Username">
    <input type="password" name="password" required placeholder="Password">
    <button type="submit">Login</button>
</form>
<p><?= $error ?></p>
```

**Code** (`dashboard.php`):
```php
<?php
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}
?>
<h1>Welcome, <?= htmlspecialchars($_SESSION['username']) ?>!</h1>
<p>Logged in since: <?= date('H:i:s', $_SESSION['login_time']) ?></p>
<a href="logout.php">Logout</a>
```

**Code** (`logout.php`):
```php
<?php
session_start();
$_SESSION = [];                          // clear all
session_destroy();                        // destroy server data

// Delete session cookie
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}
header('Location: login.php');
exit;
?>
```

**Explanation**: `session_start()` resumes the existing session on each page. `$_SESSION['username']` persists the login state. `session_regenerate_id(true)` prevents session fixation by issuing a new session ID after login. Logout clears `$_SESSION`, destroys the server session, and deletes the session cookie.

## 🚀 Example 2 - Intermediate
**Problem**: Build a session-based shopping cart with timeout and activity tracking.

**Code** (`cart.php`):
```php
<?php
session_start();

// Session timeout (30 minutes)
$timeout = 30 * 60;
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout) {
    $_SESSION = [];
    session_destroy();
    session_start();
    $_SESSION['expired'] = true;
}
$_SESSION['last_activity'] = time();

// Initialize cart
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
    $_SESSION['cart_count'] = 0;
}

// Add item
if (isset($_GET['add'])) {
    $item = [
        'id' => uniqid(),
        'name' => htmlspecialchars($_GET['add']),
        'price' => (float)($_GET['price'] ?? 0),
    ];
    $_SESSION['cart'][] = $item;
    $_SESSION['cart_count']++;
    header('Location: cart.php');
    exit;
}

// Remove item
if (isset($_GET['remove'])) {
    $id = $_GET['remove'];
    $_SESSION['cart'] = array_filter($_SESSION['cart'], fn($i) => $i['id'] !== $id);
    $_SESSION['cart_count'] = count($_SESSION['cart']);
    header('Location: cart.php');
    exit;
}

// Empty cart
if (isset($_GET['clear'])) {
    $_SESSION['cart'] = [];
    $_SESSION['cart_count'] = 0;
    header('Location: cart.php');
    exit;
}
?>
<h1>Shopping Cart (<?= $_SESSION['cart_count'] ?> items)</h1>
<?php if ($_SESSION['expired'] ?? false): ?>
    <p style="color:red">Session expired. Cart was reset.</p>
    <?php unset($_SESSION['expired']); ?>
<?php endif; ?>

<p><a href="?add=Laptop&price=999.99">Add Laptop</a></p>
<p><a href="?add=Mouse&price=25.50">Add Mouse</a></p>
<p><a href="?clear=true">Clear Cart</a></p>

<table border="1">
    <tr><th>Item</th><th>Price</th><th>Action</th></tr>
    <?php foreach ($_SESSION['cart'] as $item): ?>
    <tr>
        <td><?= $item['name'] ?></td>
        <td>$<?= number_format($item['price'], 2) ?></td>
        <td><a href="?remove=<?= $item['id'] ?>">Remove</a></td>
    </tr>
    <?php endforeach; ?>
</table>
<p>Total: $<?= number_format(array_sum(array_column($_SESSION['cart'], 'price')), 2) ?></p>
```

**Explanation**: The session tracks cart items, a counter, and last activity time. After 30 minutes of inactivity, the session is destroyed and a fresh one is started with an `expired` flag. This demonstrates session timeout, array manipulation in `$_SESSION`, and maintaining state across page requests without a database.

## 🏢 Real World Use Case
**Multi-step Checkout Process**: An e-commerce site stores order data across 4 steps (Cart → Shipping → Payment → Confirmation) using sessions. After payment confirmation, the session data is written to the database and the session is regenerated with `session_regenerate_id(true)` for security. Redis is used as the session storage backend for high availability across multiple web servers.

## 🎯 Interview Questions
1. Where are session data stored by default in PHP?
2. Why should you call `session_regenerate_id()` after login?
3. What is the difference between `session_destroy()` and `unset($_SESSION)`?
4. How do you configure sessions to use a custom storage backend like Redis?
5. How does session hijacking occur and what measures prevent it?

## ⚠ Common Errors / Mistakes
- **Calling `session_start()` after output**: Causes "headers already sent" error. Move it to the very top of the script or use output buffering.
- **Not calling `session_regenerate_id()` after privilege escalation**: Old session IDs can be used for session fixation attacks.
- **Storing sensitive plaintext data**: Avoid storing passwords or credit cards in `$_SESSION`. Store non-sensitive identifiers instead.
- **Session file cleanup**: Default session files are cleaned based on `session.gc_probability` / `session.gc_divisor` — not guaranteed. Use a cron job for reliable cleanup.
- **Assuming sessions work across subdomains**: Configure `session.cookie_domain` to `.example.com` to share sessions across subdomains.

## 📝 Practice Exercises
**Beginner:**
1. Create a script that starts a session and stores the user's name from a form, then displays it on another page.
2. Build a page visit counter using `$_SESSION` that increments each time the user reloads the page.
3. Write a login/logout system with a hardcoded user (admin/password) that redirects to a welcome page on success.

**Intermediate:**
4. Implement a "flash message" system: store a success/error message in `$_SESSION` on one request and display it once on the next request, then clear it.
5. Create a multi-step form wizard (3 steps) that collects data across requests and displays a summary at the end.
6. Build a session-based access control system that tracks user roles (admin, editor, viewer) and restricts page access accordingly.

**Advanced:**
7. Implement a database-backed session handler by extending `SessionHandlerInterface` that stores session data in a MySQL table with proper locking and garbage collection.
8. Build a session security system that detects anomalies by comparing IP address, User-Agent, and session age — and invalidates the session if suspicious activity is detected, logging the event for auditing.
