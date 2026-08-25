## 36. PHP Cookies

## 📘 Introduction
Cookies are small text files stored on the user's browser by a web server. PHP provides the `setcookie()` function to send cookies as part of the HTTP response headers, and the `$_COOKIE` superglobal to retrieve them on subsequent requests. Cookies are commonly used for user preferences, remember-me functionality, and tracking.

## 🧠 Key Concepts
- **setcookie()**: Sends a cookie with `name`, `value`, `expire` (Unix timestamp), `path`, `domain`, `secure`, `httponly`.
- **$_COOKIE**: Associative array containing cookie values sent by the browser in the current request.
- **Cookie expiration**: Time-to-live as a Unix timestamp. Omit or set to 0 for a session cookie (deleted when browser closes). Set a future timestamp for persistent cookies.
- **Reading cookies**: Access `$_COOKIE['name']` after the browser sends the cookie back (next request).
- **Deleting cookies**: Set the cookie with an expiration time in the past (e.g., `time() - 3600`).
- **Security flags**: `httponly` (inaccessible to JavaScript), `secure` (HTTPS only), `samesite` (Lax/Strict/None).
- **Cookie vs Session**: Cookies are stored client-side; sessions are stored server-side with a session ID stored in a cookie.

## 💻 Syntax
```php
<?php
// Set a cookie (must be before any output)
setcookie('username', 'Alice', time() + 86400 * 30, '/');     // 30 days
setcookie('theme', 'dark', time() + 86400 * 7, '/', '', true, true); // secure + httponly

// Read a cookie
if (isset($_COOKIE['username'])) {
    echo "Welcome back, " . $_COOKIE['username'];
}

// Delete a cookie
setcookie('username', '', time() - 3600, '/');

// Set cookie with SameSite
setcookie('prefs', '{"lang":"en"}', [
    'expires' => time() + 86400 * 30,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);
?>
```

## ✅ Example 1 - Basic
**Problem**: Remember the user's preferred language across page visits using a persistent cookie.

**Code** (`language_pref.php`):
```php
<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['lang'])) {
    $lang = $_POST['lang'] === 'fr' ? 'fr' : 'en';
    setcookie('lang', $lang, time() + 86400 * 365, '/'); // 1 year
    $_COOKIE['lang'] = $lang; // for current request
    header('Location: language_pref.php');
    exit;
}

$lang = $_COOKIE['lang'] ?? 'en';
$greeting = $lang === 'fr' ? 'Bonjour' : 'Hello';
?>
<form method="post">
    <label><input type="radio" name="lang" value="en" <?= $lang === 'en' ? 'checked' : '' ?>> English</label>
    <label><input type="radio" name="lang" value="fr" <?= $lang === 'fr' ? 'checked' : '' ?>> Francais</label>
    <button type="submit">Save</button>
</form>
<p><?= $greeting ?>, visitor!</p>
```

**Output** (after selecting French):
```
Bonjour, visitor!
```

**Explanation**: `setcookie('lang', ...)` stores the preference for 1 year. On the next request, `$_COOKIE['lang']` contains the value. The greeting changes based on the stored preference. The form allows the user to change it.

## 🚀 Example 2 - Intermediate
**Problem**: Implement a "Remember Me" login with secure cookie flags.

**Code** (`login.php`):
```php
<?php
session_start();
$users = ['admin' => password_hash('secret123', PASSWORD_DEFAULT)];

// Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);
    
    if (isset($users[$username]) && password_verify($password, $users[$username])) {
        $_SESSION['user'] = $username;
        
        if ($remember) {
            $token = bin2hex(random_bytes(32));
            // Store token in DB (simplified: file)
            file_put_contents("tokens/{$username}.txt", $token);
            
            setcookie('remember_token', $token, [
                'expires' => time() + 86400 * 30,
                'path' => '/',
                'secure' => true,
                'httponly' => true,
                'samesite' => 'Lax',
            ]);
        }
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid credentials';
}

// Auto-login via cookie
if (!isset($_SESSION['user']) && isset($_COOKIE['remember_token'])) {
    // Validate token (simplified)
    $token = $_COOKIE['remember_token'];
    foreach (glob('tokens/*.txt') as $f) {
        if (file_get_contents($f) === $token) {
            $_SESSION['user'] = basename($f, '.txt');
            break;
        }
    }
}
?>
<form method="post">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <label><input type="checkbox" name="remember"> Remember Me</label>
    <button type="submit" name="login">Login</button>
</form>
<?php if (isset($error)) echo "<p>$error</p>"; ?>
```

**Explanation**: A random token is generated, stored server-side, and set as a cookie with `httponly` (not accessible by JS), `secure` (HTTPS only), and `samesite='Lax'` (CSRF protection). On subsequent visits, if the session is gone but the cookie remains, the user is auto-authenticated.

## 🏢 Real World Use Case
**E-commerce Preference Store**: An online store stores the user's currency preference (USD/EUR), items-per-page setting (25/50/100), and recently viewed product IDs in cookies. The cookie is set with a 30-day expiry, `httponly=false` (so JS can read for dynamic toggles), `samesite='Lax'`. The server reads `$_COOKIE` on every page load to personalize the shopping experience without requiring a login.

## 🎯 Interview Questions
1. What does `setcookie()` return and how do you know if the cookie was set successfully?
2. Why must `setcookie()` be called before any output is sent to the browser?
3. How do you delete a cookie in PHP?
4. What is the difference between `httponly`, `secure`, and `samesite` cookie flags?
5. What are the security implications of storing sensitive data (like passwords) in cookies?

## ⚠ Common Errors / Mistakes
- **"Headers already sent" error**: `setcookie()` modifies HTTP headers, so it must be called before any HTML output. Use output buffering to work around this if needed.
- **Assuming `$_COOKIE` is updated immediately**: `$_COOKIE` contains only cookies sent by the browser in the current request. A newly set cookie is not available until the next request.
- **Not URL-encoding cookie values**: PHP does this automatically, but be aware that spaces and special characters are encoded.
- **Cookie size limits**: Most browsers limit cookies to 4KB per cookie and ~50 cookies per domain.
- **Setting path incorrectly**: If you set a cookie with `path='/admin'`, it will not be sent to pages outside `/admin`.

## 📝 Practice Exercises
**Beginner:**
1. Create a script that sets a cookie `visited=true` with a 1-hour expiry and displays "Welcome back!" if the cookie exists.
2. Build a theme switcher (light/dark) that stores the preference in a cookie and applies it on page load.
3. Write a script that counts and displays how many times the user has visited the page using a cookie.

**Intermediate:**
4. Create a "Last Viewed" feature: store the last 5 product IDs the user viewed in a serialized cookie array.
5. Implement a cookie-based banner dismissal: if the user clicks "Accept Cookies", set a cookie that hides the banner for 30 days.
6. Build a multilingual site where the user's language choice (stored in a cookie) persists across all pages.

**Advanced:**
7. Implement a secure "Remember Me" system with rotating tokens: issue a new token on each login, invalidate old tokens, and support multiple device login with token revocation.
8. Build a cookie-consent management system that respects GDPR/CCPA requirements — allow granular opt-in/opt-out for analytics, marketing, and functional cookies using separate cookies per category.
