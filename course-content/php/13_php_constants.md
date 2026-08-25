## 13. PHP Constants

## 📘 Introduction
Constants are identifiers (names) for simple values that cannot change during script execution. Unlike variables, once defined, a constant's value cannot be modified or undefined. They are automatically global across the entire script.

## 🧠 Key Concepts
- **define()**: Function for defining constants at runtime. Case-insensitivity optional (third parameter — deprecated in PHP 8).
- **const Keyword**: Language construct for defining constants at compile time. Must be top-level or within a class.
- **Naming Conventions**: Typically uppercase with underscores (e.g., `MAX_USERS`, `DB_HOST`). Case-sensitive by default.
- **Magic Constants**: Predefined constants that change based on context: `__LINE__`, `__FILE__`, `__DIR__`, `__CLASS__`, `__FUNCTION__`, `__METHOD__`, `__NAMESPACE__`, `__TRAIT__`.
- **Class Constants**: Defined with `const` inside classes. Accessed with `self::CONST` or `ClassName::CONST`.

## 💻 Syntax
```php
<?php
// define() — runtime
define("SITE_NAME", "MyApp");
define("DB_HOST", "localhost");
define("DEBUG_MODE", true);

// const — compile time (top-level)
const VERSION = "1.0.0";
const MAX_LOGIN_ATTEMPTS = 5;

// Class constant
class MathHelper {
    const PI = 3.14159;
    const E = 2.71828;
}

echo MathHelper::PI; // 3.14159
?>
```

## ✅ Example 1 - Basic
**Problem**: Define and use constants; demonstrate that they cannot be reassigned.

**Code** (`constants.php`):
```php
<?php
define("APP_NAME", "My PHP Application");
define("APP_VERSION", "2.1.0");
define("YEAR", 2025);

const AUTHOR = "John Doe";
const MAX_ITEMS = 100;

echo "App: " . APP_NAME . "<br>";
echo "Version: " . APP_VERSION . "<br>";
echo "Year: " . YEAR . "<br>";
echo "Author: " . AUTHOR . "<br>";
echo "Max items: " . MAX_ITEMS . "<br>";

// Attempting to redefine causes notice
define("APP_NAME", "New Name"); // Notice: Constant already defined

// Constants are global
function showInfo() {
    echo "Inside function: " . APP_NAME . "<br>";
}
showInfo();

// Magic constants
echo "This file: " . __FILE__ . "<br>";
echo "This line: " . __LINE__ . "<br>";
echo "This directory: " . __DIR__ . "<br>";
?>
```

**Output**:
```html
App: My PHP Application<br>
Version: 2.1.0<br>
Year: 2025<br>
Author: John Doe<br>
Max items: 100<br>
Notice: Constant APP_NAME already defined in ...<br>
Inside function: My PHP Application<br>
This file: C:\xampp\htdocs\constants.php<br>
This line: 22<br>
This directory: C:\xampp\htdocs<br>
```

**Explanation**: Constants are globally accessible (no `global` keyword needed). Redefining a constant triggers a notice and the original value is preserved. Magic constants provide contextual information at compile time — `__FILE__` gives the full server path.

## 🚀 Example 2 - Intermediate
**Problem**: Use class constants and demonstrate the `const` vs `define()` difference in conditional contexts.

**Code** (`constants_advanced.php`):
```php
<?php
// Class constants
class UserRoles {
    const ADMIN = 'admin';
    const EDITOR = 'editor';
    const VIEWER = 'viewer';

    public static function isValid(string $role): bool {
        $validRoles = [self::ADMIN, self::EDITOR, self::VIEWER];
        return in_array($role, $validRoles, true);
    }
}

echo "Admin role: " . UserRoles::ADMIN . "<br>";
echo "Is 'admin' valid? " . (UserRoles::isValid('admin') ? 'yes' : 'no') . "<br>";
echo "Is 'superadmin' valid? " . (UserRoles::isValid('superadmin') ? 'yes' : 'no') . "<br>";

// const vs define() — const can be used in class, define cannot
// const works in conditional (since PHP 5.3)
if (true) {
    const CONDITIONAL_CONST = "This works in PHP 5.3+";
}

// define() can be used in expressions
$prefix = "SITE_";
define($prefix . "NAME", "MySite");  // Dynamic constant name
define($prefix . "URL", "https://mysite.com");

echo SITE_NAME . "<br>";  // MySite
echo SITE_URL . "<br>";   // https://mysite.com

// constant() function — access constant by string name
$constName = "APP_VERSION";
echo "Dynamic access: " . constant($constName) . "<br>";
?>
```

**Output**:
```html
Admin role: admin<br>
Is 'admin' valid? yes<br>
Is 'superadmin' valid? no<br>
MySite<br>
https://mysite.com<br>
Dynamic access: 2.1.0
```

**Explanation**: Class constants are namespaced within the class. `const` can be used in conditionals (PHP 5.3+). `define()` allows dynamic names (using variables/expressions). The `constant()` function retrieves a constant's value when the name is dynamic.

## 🏢 Real World Use Case
**Configuration Management**: PHP frameworks store database credentials, API keys, and environment settings as constants in config files. Class constants define enum-like values (user roles, order statuses, HTTP status codes). Magic constants aid debugging and logging.

## 🎯 Interview Questions
**Q1:** What is the difference between `define()` and `const`?
**A:** `define()` defines constants at runtime in any scope, supports dynamic names, and can be case-insensitive (deprecated). `const` is a compile-time construct, must be at top-level or within a class, and is always case-sensitive. `const` is slightly faster.

**Q2:** Can a PHP constant be changed after definition?
**A:** No. Constants cannot be changed or undefined once set. Attempting to redefine triggers a notice and the original value remains.

**Q3:** What are PHP magic constants?
**A:** Predefined constants that change based on where they are used: `__LINE__`, `__FILE__`, `__DIR__`, `__CLASS__`, `__FUNCTION__`, `__METHOD__`, `__NAMESPACE__`, `__TRAIT__`. They are resolved at compile time.

**Q4:** How do you access a constant if you only have its name as a string?
**A:** Use the `constant()` function: `constant("DB_HOST")` returns the value of `DB_HOST`. Useful for dynamic constant access.

**Q5:** Are constants automatically global?
**A:** Yes. Constants are accessible from any scope (functions, classes, etc.) without any special keyword. They are always in the global namespace.

## ⚠ Common Errors / Mistakes
- **Forgetting constants don't have `$`**: `SITE_NAME` not `$SITE_NAME`.
- **Trying to assign a value to a constant**: `CONST_NAME = "value";` causes a parse error. Use `define()` or `const`.
- **Using `define()` inside a class**: `define()` cannot define class constants. Use `const` within classes.
- **Assuming magic constants work outside their context**: `__CLASS__` outside a class returns empty string. `__METHOD__` outside a method returns just the function name.

## 📝 Practice Exercises
**Beginner:**
1. Define three constants for your application: `APP_NAME`, `APP_VERSION`, and `AUTHOR`. Echo them in a sentence.
2. Use `__FILE__`, `__LINE__`, and `__DIR__` in a script and display their values.
3. Define a class constant `PI` inside a `MathConstants` class and use it to calculate the area of a circle.

**Intermediate:**
4. Write a class `StatusCode` with class constants for HTTP codes (OK=200, NOT_FOUND=404, SERVER_ERROR=500). Add a static method `getMessage($code)` that returns the corresponding message.
5. Use `define()` with a dynamic name (prefix + environment variable) to set configuration constants.
6. Demonstrate the difference between `define()` and `const` by trying to define a constant inside a conditional statement with both methods.

**Advanced:**
7. Build a configuration loader class that reads an array of key-value pairs and defines them as constants. Add a method to check if a constant is defined.
8. Create a debug helper class that uses magic constants `__CLASS__`, `__METHOD__`, and `__LINE__` to log structured debug messages with caller context.
