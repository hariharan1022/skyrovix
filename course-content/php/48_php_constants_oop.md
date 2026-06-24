## 48. PHP Constants in OOP

## 📘 Introduction
Class constants allow you to define immutable values that belong to a class rather than an instance. They are useful for configuration, enumeration-like values, and fixed mathematical constants. PHP 8.1 introduced final constants and constant visibility, making them more powerful for API design.

## 🧠 Key Concepts
- **`const` keyword** — define a class constant (cannot use `define()` inside classes)
- **`::class`** — returns the fully qualified class name as a string
- **`self::` vs `static::`** — `self::` resolves at compile time (the class where it's written); `static::` uses late static binding (the class at runtime)
- **Final constants (PHP 8.1+)** — `final const` prevents child classes from overriding
- **Constant visibility (PHP 7.1+)** — `public`, `private`, `protected` on constants
- **Constant expression support (PHP 8+)** — constants can be expressions involving other constants, arithmetic, arrays, etc.

## 💻 Syntax

```php
class MyClass {
    // Simple constant
    public const PI = 3.14159;
    
    // Private constant
    private const SECRET = "hidden";
    
    // Protected constant
    protected const INTERNAL = "internal";
    
    // Final constant (PHP 8.1+)
    final const VERSION = "1.0";
    
    // Constant expression (PHP 8+)
    public const AREA_UNIT = self::PI . " rad";
    public const STATUS_MAP = ['active' => 1, 'inactive' => 0];
}

// Accessing
echo MyClass::PI;           // 3.14159
echo MyClass::class;        // "MyClass"
```

## ✅ Example 1 - Basic: Class Constants for Configuration

**Problem:** Create an `Order` class with status constants for readably representing order states.

```php
<?php
class Order {
    public const STATUS_PENDING = 'pending';
    public const STATUS_PROCESSING = 'processing';
    public const STATUS_SHIPPED = 'shipped';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_CANCELLED = 'cancelled';
    
    private string $status;
    private int $id;
    private static int $nextId = 1;
    
    public function __construct() {
        $this->id = self::$nextId++;
        $this->status = self::STATUS_PENDING;
    }
    
    public function ship(): void {
        if ($this->status !== self::STATUS_PROCESSING) {
            throw new RuntimeException("Order must be processing before shipping");
        }
        $this->status = self::STATUS_SHIPPED;
    }
    
    public function getStatus(): string {
        return $this->status;
    }
    
    public function getId(): int {
        return $this->id;
    }
}

$order = new Order();
echo "Order {$order->getId()}: {$order->getStatus()}\n";
// Using constant externally
echo Order::STATUS_PENDING;
?>
```

**Output:**
```
Order 1: pending
pending
```

**Explanation:** Constants like `STATUS_PENDING` provide meaningful names instead of magic strings. They are accessed with `::` (not `->`). Using `self::STATUS_PENDING` inside the class ensures consistent references and easy refactoring.

## 🚀 Example 2 - Intermediate: Final Constants, Visibility, and self:: vs static::

**Problem:** Demonstrate constant visibility, final constants, and the difference between `self::` and `static::`.

```php
<?php
class Config {
    public const NAME = "App";
    protected const INTERNAL_KEY = "base-key";
    private const SECRET = "s3cr3t";
    
    final const VERSION = "1.0.0";
    
    public static function getSecret(): string {
        return self::SECRET;
    }
    
    public static function getInternalKey(): string {
        return self::INTERNAL_KEY;
    }
    
    // Demonstrates self:: vs static::
    public static function getUsingSelf(): string {
        return self::NAME;
    }
    
    public static function getUsingStatic(): string {
        return static::NAME;
    }
}

class ExtendedConfig extends Config {
    public const NAME = "Extended App";
    // Attempting to override VERSION would cause fatal error:
    // public const VERSION = "2.0"; // Fatal error
}

echo "self:: resolves to: " . ExtendedConfig::getUsingSelf() . "\n";
echo "static:: resolves to: " . ExtendedConfig::getUsingStatic() . "\n";
echo "Secret: " . Config::getSecret() . "\n";
// echo Config::SECRET;  // Fatal error — private constant
?>
```

**Output:**
```
self:: resolves to: App
static:: resolves to: Extended App
Secret: s3cr3t
```

**Explanation:** `final const VERSION` cannot be overridden in `ExtendedConfig`. `self::NAME` resolves at compile time to the class where the method is defined (`Config`). `static::NAME` uses late static binding and resolves at runtime to `ExtendedConfig`. Private constants (`SECRET`) can only be accessed within the declaring class.

## 🏢 Real World Use Case
Framework HTTP classes use constants for status codes (`Response::HTTP_OK`, `Response::HTTP_NOT_FOUND`). Doctrine entities use class constants for field names in queries (`User::class`, `User::FIELD_EMAIL`). Enum-like constants in Symfony Forms (`FormEvents::PRE_SUBMIT`) provide event identifiers. Final constants in library APIs prevent users from accidentally overriding version identifiers.

```php
class HttpStatus {
    public const OK = 200;
    public const CREATED = 201;
    final const NOT_FOUND = 404;
    public const SERVER_ERROR = 500;
}
```

## 🎯 Interview Questions

**1. What is the difference between `self::` and `static::` for constants?**
`self::` resolves at compile time to the class where it is written. `static::` uses late static binding and resolves at runtime to the actual called class. `static::` respects inheritance; `self::` does not.

**2. Can class constants be expressions?**
In PHP 8+, class constants can be expressions involving arithmetic, string concatenation, array literals, and other constants. Before PHP 8, only constant scalar values were allowed.

**3. What is the `::class` syntax?**
`ClassName::class` returns the fully qualified class name as a string (e.g., `"App\Models\User"`). Useful for dependency injection, class resolution, and reflection.

**4. What does `final const` do?**
Prevents child classes from overriding the constant value. Attempting to redefine a `final const` in a subclass causes a fatal error. Available since PHP 8.1.

**5. Can constants have visibility modifiers?**
Yes, since PHP 7.1. Constants can be `public` (default), `private`, or `protected`. Private constants are only accessible within the class; protected constants are also accessible in child classes.

## ⚠ Common Errors / Mistakes

- **Using `define()` inside a class** — `define()` cannot be used inside classes; use `const`.
- **Accessing constants with `->`** — constants are accessed with `::`, not `->`.
- **Trying to override a `final const`** — causes a fatal error.
- **Assuming `self::` respects inheritance** — `self::` does not change based on the calling class; use `static::` for runtime resolution.
- **Forgetting that constants are case-sensitive** — `MyClass::PI` is different from `MyClass::pi` by convention.

## 📝 Practice Exercises

**Beginner**
1. Create a `MathConstants` class with `PI` and `E` constants. Write a method `circleArea($radius)` that uses `self::PI`.
2. Build an `ErrorCode` class with `public const` values for common errors (NOT_FOUND = 404, UNAUTHORIZED = 401). Create an `App` class that returns these codes.
3. Create a `Database` class with `private const HOST = "localhost"`, `private const PORT = 3306`, and a public method that uses them.

**Intermediate**
4. Create a `PaymentStatus` class hierarchy: base class defines `const PENDING`, `const COMPLETED`, `const FAILED`. Child class `RefundableStatus` adds `const REFUNDED = "refunded"`. Use `final const` for `COMPLETED`.
5. Demonstrate `self::` vs `static::` with constants in a parent-child inheritance chain. Create a method that returns a constant value using both and show the difference.
6. Build a `ConfigLoader` class with `public const DEFAULTS = ['debug' => false, 'cache' => true]` (constant expression). Add a method that merges defaults with user config.

**Advanced**
7. Design an enum-like system using class constants and private constructor: `UserRole` class with `ADMIN`, `MODERATOR`, `USER` constants, a private constructor preventing instantiation, and static methods for validation.
8. Create a `Registry` pattern using class constants for keys: `Registry::set(Registry::KEY_DB_HOST, 'localhost')`. Use `final const` for registry key names. Ensure thread-safe access via static methods.
