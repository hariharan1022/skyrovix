## 31. PHP Include

## 📘 Introduction
PHP's `include` and `require` statements allow you to insert the content of one PHP file into another before execution. This enables reusable components (headers, footers, navigation) across pages, promoting DRY (Don't Repeat Yourself) principles and easier maintenance.

## 🧠 Key Concepts
- **include**: Inserts and evaluates the specified file. Emits a **warning** (E_WARNING) if the file is not found, but script continues.
- **require**: Same as include but emits a **fatal error** (E_COMPILE_ERROR) if the file is not found — script stops.
- **include_once / require_once**: Same as above but checks if the file has already been included; if so, it skips re-inclusion. Prevents redeclaration errors for functions/classes.
- **File paths**: Relative paths (relative to current file or working directory) and absolute paths (`__DIR__`, `$_SERVER['DOCUMENT_ROOT']`).
- **Return value**: Included files can return values (e.g., config arrays) that can be assigned.
- **Variable scope**: Variables set in the included file inherit the caller's variable scope at the point of inclusion.

## 💻 Syntax
```php
<?php
include 'filename.php';
require 'filename.php';
include_once 'filename.php';
require_once 'filename.php';

// With absolute path (recommended)
require_once __DIR__ . '/../includes/header.php';

// File returns a value
$config = include 'config.php';
?>
```

## ✅ Example 1 - Basic
**Problem**: Create a reusable header and footer component and include them in a page.

**Code** (`header.php`):
```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Site</h1>
        <nav><a href="index.php">Home</a> | <a href="about.php">About</a></nav>
    </header>
    <main>
```

**Code** (`footer.php`):
```php
    </main>
    <footer>
        <p>&copy; 2026 My Site</p>
    </footer>
</body>
</html>
```

**Code** (`index.php`):
```php
<?php include 'header.php'; ?>

<h2>Home Page</h2>
<p>This is the home page content.</p>

<?php include 'footer.php'; ?>
```

**Output**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to My Site</h1>
        <nav><a href="index.php">Home</a> | <a href="about.php">About</a></nav>
    </header>
    <main>
        <h2>Home Page</h2>
        <p>This is the home page content.</p>
    </main>
    <footer>
        <p>&copy; 2026 My Site</p>
    </footer>
</body>
</html>
```

**Explanation**: `include` inserts the content of `header.php` before the main content and `footer.php` after it. This creates a complete HTML page while keeping header/footer in separate files.

## 🚀 Example 2 - Intermediate
**Problem**: Use `require_once` to include a database config and a function library without risk of double inclusion.

**Code** (`config.php`):
```php
<?php
return [
    'host' => 'localhost',
    'db'   => 'test_db',
    'user' => 'root',
    'pass' => ''
];
?>
```

**Code** (`functions.php`):
```php
<?php
function connectDB(array $config): PDO {
    return new PDO(
        "mysql:host={$config['host']};dbname={$config['db']}",
        $config['user'],
        $config['pass']
    );
}
?>
```

**Code** (`dashboard.php`):
```php
<?php
require_once __DIR__ . '/config.php';         // returns array
require_once __DIR__ . '/functions.php';       // defines connectDB()

// Using return value from config.php
$db = connectDB($config);
$stmt = $db->query("SELECT COUNT(*) AS total FROM users");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo "Total users: " . $row['total'];

// Attempting re-include (will be ignored)
require_once __DIR__ . '/config.php';  // skipped — already included
?>
```

**Output**:
```
Total users: 42
```

**Explanation**: `require_once` ensures `config.php` and `functions.php` are loaded exactly once. If another file in the chain also requires `config.php`, it will be skipped — preventing "Cannot redeclare function" errors.

## 🏢 Real World Use Case
**MVC Framework Routing**: A front controller (`index.php`) uses `require_once` to load autoloader, router, and middleware. Each controller method includes a dedicated view file. Layout templates use `include` for header/footer/sidebar partials, and `include_once` for assets that must appear only once (e.g., inline CSS blocks).

## 🎯 Interview Questions
1. What is the difference between `include` and `require`?
2. Why would you use `include_once` or `require_once` instead of `include`?
3. How can an included file return a value to the calling script?
4. What is the variable scope behavior when including a file inside a function?
5. How can you prevent path traversal vulnerabilities when dynamically including files based on user input?

## ⚠ Common Errors / Mistakes
- **Infinite loops**: File A includes File B which includes File A. Use `include_once` to break the cycle.
- **Wrong paths**: Relative paths resolve from the **working directory**, not the file's directory. Always use `__DIR__` for reliability.
- **Whitespace issues**: Extra spaces/newlines after `?>` in included files can cause "headers already sent" errors. Omit the closing `?>` in pure PHP files.
- **Function redeclaration**: Using `include` (not `_once`) on a file with function definitions causes fatal errors if included twice.

## 📝 Practice Exercises
**Beginner:**
1. Create a file `nav.php` with a navigation list and include it in `index.php` and `about.php`.
2. Use `include` to embed a copyright footer in three different pages.
3. Create `config.php` that returns an associative array of site settings (site name, version). Use `include` to load it and echo the site name.

**Intermediate:**
4. Build a project with `header.php`, `footer.php`, `functions.php` (with a `greet($name)` function), and `page.php`. Use `require_once` for functions and `include` for header/footer.
5. Create a file `db.php` that connects to a database. Use `require_once` in two different page scripts to verify the connection is only made once.
6. Build a simple template system: `layout.php` includes header/footer and has a `$content` variable filled by the including page.

**Advanced:**
7. Build a recursive directory scanner that uses `include` to load all PHP files in a directory tree. Handle edge cases like circular symlinks and protect against infinite loops.
8. Create a routing system where URL segments determine which file to include. Implement strict validation to prevent path traversal attacks.
