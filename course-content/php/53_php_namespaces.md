## 53. PHP Namespaces

## 📘 Introduction
Namespaces solve the problem of name collisions between classes, functions, and constants in large PHP projects. They allow you to organize code into logical groups, use short alias names, and import classes from different vendors without conflict. PHP's namespace support was introduced in PHP 5.3.

## 🧠 Key Concepts
- **`namespace` keyword** — declares a namespace (must be first statement after `<?php`)
- **`use` keyword** — imports a class/function/constant from another namespace
- **Alias with `as`** — `use Namespace\Classname as Alias`
- **Namespace resolution** — unqualified (bare name), qualified (relative), fully qualified (`\` prefix)
- **Fully qualified names** — start with `\` (e.g., `\App\Models\User`) — absolute reference
- **Global namespace fallback** — unqualified class names fall back to global namespace if no import exists
- **Multiple namespaces in one file** — allowed but discouraged (use curly braces)
- **`__NAMESPACE__` magic constant** — returns the current namespace string

## 💻 Syntax

```php
// File: src/Models/User.php
namespace App\Models;

class User { /* ... */ }

// File: src/Controllers/UserController.php
namespace App\Controllers;

use App\Models\User;
use App\Utils\StringHelper as Str;

class UserController {
    public function show(int $id): ?User {
        return new User();
    }
}
```

## ✅ Example 1 - Basic: Organizing Classes with Namespaces

**Problem:** Structure a simple application with namespaces to avoid naming conflicts.

```php
<?php
// --- File: Lib/Database.php ---
namespace App\Lib;

class Database {
    public function connect(): string {
        return "Connected to database";
    }
}

// --- File: Models/User.php ---
namespace App\Models;

class User {
    public function getInfo(): string {
        return "User model";
    }
}

// --- File: index.php (main script) ---
namespace App;

use App\Lib\Database;
use App\Models\User;

// Fully qualified (not needed with use)
$db = new Database();
echo $db->connect() . "\n";

// Using imported class
$user = new User();
echo $user->getInfo() . "\n";

// Alias example
use App\Models\User as UserModel;
$user2 = new UserModel();
echo $user2->getInfo() . "\n";

// Fully qualified call (no import needed)
$user3 = new \App\Models\User();
echo $user3->getInfo() . "\n";
?>
```

**Output:**
```
Connected to database
User model
User model
User model
```

**Explanation:** The `namespace` declarations organize code into `App\Lib` and `App\Models`. The `use` statement imports classes into the current scope. `\App\Models\User` with leading backslash is the fully qualified form.

## 🚀 Example 2 - Intermediate: Namespace Resolution and Global Fallback

**Problem:** Demonstrate namespace resolution rules — unqualified, qualified, fully qualified names, and global fallback.

```php
<?php
namespace App\Services;

// Define a class in this namespace
class DateTime {
    public function format(): string {
        return "App\\Services\\DateTime::format()";
    }
}

// Import global DateTime from root
use DateTime as GlobalDateTime;

class OrderService {
    public function process(): void {
        // 1. Unqualified name — resolves to App\Services\DateTime
        $dt1 = new DateTime();
        echo $dt1->format() . "\n";
        
        // 2. Fully qualified — absolute, always root
        $dt2 = new \DateTime();
        echo $dt2->format('Y-m-d') . "\n";
        
        // 3. Imported alias — uses the alias
        $dt3 = new GlobalDateTime();
        echo $dt3->format('Y-m-d H:i') . "\n";
        
        // 4. Global class with no namespace conflict
        $arr = new \ArrayObject([1, 2, 3]);
        echo "Count: " . $arr->count() . "\n";
    }
}

// --- To test, run as self-contained: ---
namespace {
    // Back to global namespace for testing
    require __DIR__ . '/...'; // in actual project
    
    $service = new \App\Services\OrderService();
    $service->process();
}
?>
```

**Output:**
```
App\Services\DateTime::format()
2026-06-23
2026-06-23 10:00
Count: 3
```

**Explanation:** Unqualified `DateTime` resolves to `App\Services\DateTime`, shadowing the global `DateTime`. To access PHP's built-in `DateTime`, use `\DateTime` (fully qualified). `ArrayObject` has no local conflict, so the global class is found by fallback. Aliases rename imports.

## 🏢 Real World Use Case
Composer's autoloader maps PSR-4 namespaces to directory structures. A Laravel project uses `App\Models\User`, `App\Http\Controllers\UserController`, `App\Services\PaymentService`. Vendor packages use their own namespaces (`Illuminate\Support\Collection`, `GuzzleHttp\Client`). The `use` statements at the top of each file import exactly what is needed.

```php
// PSR-4: namespace App\Models\User → src/Models/User.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
```

## 🎯 Interview Questions

**1. What is the purpose of namespaces in PHP?**
To avoid name collisions between classes/functions/constants, organize code into logical groups, and enable autoloading via PSR-4 conventions.

**2. What is the difference between `use` and `require`/`include`?**
`use` imports a namespace alias (compile-time), it does not load files. `require`/`include` physically include file contents. Autoloading (Composer) combines both — `use` tells the autoloader which file to `require`.

**3. What are the three types of namespace names?**
- **Unqualified**: `User` — resolves relative to current namespace
- **Qualified**: `Models\User` — relative path from current namespace
- **Fully qualified**: `\App\Models\User` — absolute, always starts from root

**4. Can you have multiple namespaces in one file?**
Yes, using curly brace syntax: `namespace Foo { ... } namespace Bar { ... }`. However, this is discouraged in PSR-4 — one file should declare one namespace.

**5. What does `__NAMESPACE__` return?**
A string containing the current namespace name. Returns empty string `""` if in the global namespace.

## ⚠ Common Errors / Mistakes

- **Putting code before `namespace` declaration** — `namespace` must be the first statement after `<?php`.
- **Forgetting leading `\` for global classes** — inside a namespace, `DateTime` refers to `CurrentNamespace\DateTime`, not global.
- **Using `use` inside a class** — `use` for namespaces goes at file level, not inside class bodies (confusing with trait `use`).
- **Not importing vendor namespaces** — always `use` fully qualified vendor classes.
- **Assuming `use` autoloads the class** — `use` just creates an alias; autoloading happens when the class is actually instantiated.

## 📝 Practice Exercises

**Beginner**
1. Create three files: `Models/Product.php` (namespace `App\Models`), `Services/InventoryService.php` (namespace `App\Services`), and an `index.php` that imports and uses both.
2. Create a file with two PHP built-in classes used via fully qualified names (e.g., `\DateTime`, `\Exception`) inside a custom namespace.
3. Create a namespace `MyTools\Utilities` with a `Calculator` class. Import it with an alias `Calc` in another file.

**Intermediate**
4. Create a project structure following PSR-4: `App\Models\User`, `App\Models\Order`, `App\Repositories\UserRepository`. Each in its own file. Use imports across files.
5. Demonstrate namespace fallback behavior: create a class `Logger` in `App\Utils` and show the difference between calling `new Logger()` vs `new \Logger()` inside that namespace.
6. Create three levels of nested namespaces: `App\Services\Payment\Gateways\Stripe`. Import it using progressive `use` statements and aliases.

**Advanced**
7. Build a simple autoloader function that maps namespaces to directories following PSR-4 convention. Create several namespaced classes and autoload them without Composer.
8. Design a plugin system where plugins are loaded from a `Plugins/` directory, each with its own namespace (`Plugins\SeoPlugin`, `Plugins\AnalyticsPlugin`). Use a `PluginManager` that dynamically discovers and instantiates plugin classes using namespace resolution.
