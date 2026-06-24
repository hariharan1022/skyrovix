## 52. PHP Static Methods

## 📘 Introduction
Static methods and properties belong to the class itself, not to any instance. They can be accessed without creating an object, making them ideal for utility functions, singleton patterns, and factory methods. PHP's late static binding (`static::`) resolves the called class at runtime, enabling polymorphic static behavior.

## 🧠 Key Concepts
- **`static` keyword** — declares a static method or property
- **`self::` vs `static::`** — `self::` resolves at compile time; `static::` uses late static binding (runtime)
- **Late static binding** — `static::` allows the called class to be resolved at runtime, enabling inheritance for static methods
- **Static properties** — `private static`, `protected static`, `public static` — shared across all instances
- **Singleton pattern** — uses private constructor + static `getInstance()` to ensure single instance
- **Static utility classes** — classes with only static methods (e.g., `Str::slug()`, `Arr::first()`)
- **Static methods cannot use `$this`** — `$this` is not available in static context

## 💻 Syntax

```php
class MyClass {
    public static string $counter = 0;
    
    public static function doSomething(): string {
        return "Static method";
    }
    
    public static function getCounter(): int {
        return self::$counter;
    }
}

// Access without instantiation
MyClass::doSomething();
echo MyClass::$counter;
```

## ✅ Example 1 - Basic: Static Utility Class

**Problem:** Create a `StringHelper` utility class with static methods for common string operations.

```php
<?php
class StringHelper {
    public static function slugify(string $text): string {
        $text = strtolower(trim($text));
        $text = preg_replace('/[^a-z0-9]+/', '-', $text);
        return trim($text, '-');
    }
    
    public static function truncate(string $text, int $maxLength = 100): string {
        if (strlen($text) <= $maxLength) {
            return $text;
        }
        return substr($text, 0, $maxLength) . '...';
    }
    
    public static function initials(string $name): string {
        $parts = explode(' ', $name);
        $initials = '';
        foreach ($parts as $part) {
            $initials .= strtoupper($part[0]);
        }
        return $initials;
    }
    
    public static function random(int $length = 8): string {
        return bin2hex(random_bytes($length));
    }
}

echo StringHelper::slugify("Hello World! This is PHP") . "\n";
echo StringHelper::truncate("This is a very long string that should be cut off at some point...", 30) . "\n";
echo StringHelper::initials("John Fitzgerald Kennedy") . "\n";
echo StringHelper::random(4) . "\n";
?>
```

**Output:**
```
hello-world-this-is-php
This is a very long string...
JFK
a1b2c3d4
```

**Explanation:** All methods are `static` — no instantiation needed. `StringHelper` acts as a namespace for related utility functions. This pattern is common in frameworks (Laravel's `Str`, `Arr`).

## 🚀 Example 2 - Intermediate: Singleton Pattern and Late Static Binding

**Problem:** Demonstrate the singleton pattern and how `static::` vs `self::` behaves with inheritance.

```php
<?php
class DatabaseConnection {
    private static ?DatabaseConnection $instance = null;
    private string $connectionId;
    
    private function __construct() {
        $this->connectionId = uniqid('db_', true);
        echo "New connection created: {$this->connectionId}\n";
    }
    
    private function __clone() {}
    
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
    
    public static function getInstance(): static {
        if (static::$instance === null) {
            static::$instance = new static();
        }
        return static::$instance;
    }
    
    public function query(string $sql): string {
        return "Executing on {$this->connectionId}: $sql";
    }
}

class ReadOnlyConnection extends DatabaseConnection {
    protected static ?ReadOnlyConnection $instance = null;
    
    public function query(string $sql): string {
        if (stripos($sql, 'INSERT') === 0 || stripos($sql, 'UPDATE') === 0) {
            return "Read-only: write queries blocked";
        }
        return parent::query($sql);
    }
}

// Late static binding demo
class Base {
    public static function whoSelf(): string {
        return __CLASS__;  // or self::class
    }
    
    public static function whoStatic(): string {
        return static::class;
    }
}

class Child extends Base {}

echo Base::whoSelf() . " - " . Base::whoStatic() . "\n";
echo Child::whoSelf() . " - " . Child::whoStatic() . "\n";

// Singleton test
$db1 = DatabaseConnection::getInstance();
$db2 = DatabaseConnection::getInstance();
echo ($db1 === $db2 ? "Same instance" : "Different instance") . "\n";

$ro = ReadOnlyConnection::getInstance();
echo $ro->query("SELECT * FROM users") . "\n";
echo $ro->query("UPDATE users SET name = 'test'") . "\n";
?>
```

**Output:**
```
Base - Base
Base - Child
New connection created: db_...
Same instance
New connection created: db_...
Executing on db_...: SELECT * FROM users
Read-only: write queries blocked
```

**Explanation:** `getInstance()` uses `static::$instance` (late static binding) so that `ReadOnlyConnection::getInstance()` returns a `ReadOnlyConnection` singleton, not a `DatabaseConnection`. `self::` in `whoSelf()` always returns `Base`; `static::` returns the actual called class.

## 🏢 Real World Use Case
Laravel's `Facade` pattern provides static proxies to underlying services: `Cache::get('key')`, `DB::table('users')`, `Mail::send(...)`. These are static methods that resolve to dynamic instances from the container. The `Singleton` pattern is used for service instances (e.g., `Illuminate\Container\Container::getInstance()`).

```php
// Facade style
class Cache {
    public static function get(string $key): mixed {
        return static::getFacadeRoot()->get($key);
    }
}
```

## 🎯 Interview Questions

**1. What is the difference between `self::` and `static::`?**
`self::` resolves to the class where it is written (compile-time). `static::` uses late static binding and resolves to the class called at runtime (the "called class"). `static::` enables polymorphic behavior in static inheritance.

**2. Can static methods access non-static properties?**
No. Static methods cannot use `$this`. They can only access static properties. Accessing `$this` in a static method causes a fatal error.

**3. What is the singleton pattern and how do you implement it in PHP?**
Singleton ensures only one instance of a class exists. Implementation: `private` constructor, `private __clone()`, a `private static ?self $instance`, and a `public static getInstance()` method.

**4. When should you use static methods vs instance methods?**
Static methods for utility functions, factory methods, or when the method does not depend on instance state. Instance methods when the behavior depends on object state.

**5. What happens if you call a non-static method statically?**
In PHP 8+, it triggers a deprecation notice or error. In older PHP, it worked with a strict standards warning, and `$this` would be undefined.

## ⚠ Common Errors / Mistakes

- **Using `$this` in static methods** — causes a fatal error.
- **Assuming `self::` respects inheritance** — `self::` always refers to the class where it's defined, not the child class.
- **Static methods cannot be overridden in a meaningful way** — they can be redefined in child classes but `self::` won't pick up the override.
- **Singleton serialization** — must implement `__wakeup()` to prevent unserialization creating new instances.
- **Overusing static methods** — leads to tight coupling and makes unit testing difficult (hard to mock).

## 📝 Practice Exercises

**Beginner**
1. Create a `MathHelper` class with static methods `add()`, `subtract()`, `multiply()`, `divide()`. Use them without instantiation.
2. Build a `Session` class with static methods `set(string $key, $value)`, `get(string $key)`, `has(string $key)`, `remove(string $key)` using a private static array.
3. Create a `Counter` class with a private static `$count` property, and static `increment()`, `decrement()`, `getCount()` methods.

**Intermediate**
4. Implement the singleton pattern in a `Logger` class. Add a `log(string $message)` method. Demonstrate that `$log1 === $log2`.
5. Create a class hierarchy with `BaseNotification` (static `send()`) and `EmailNotification`, `SMSNotification`. Show late static binding differences between `self::` and `static::`.
6. Build a `Registry` class: static methods `set(string $key, $value)`, `get(string $key)`, `has(string $key)`. Store data in a private static array. Make it a singleton.

**Advanced**
7. Implement a `QueryBuilder` with a fluent static interface: `DB::table('users')->where('age', '>', 18)->orderBy('name')->get()`. Use static methods that return new instances for method chaining.
8. Design a `Facade` pattern: a `Facade` base class with `abstract protected static function getFacadeAccessor(): string`. Create `CacheFacade` and `LoggerFacade` that proxy to underlying singleton instances via `__callStatic`.
