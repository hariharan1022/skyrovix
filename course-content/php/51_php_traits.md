## 51. PHP Traits

## 📘 Introduction
Traits are PHP's mechanism for horizontal code reuse — sharing methods across unrelated classes without inheritance. A trait is like a partial class implementation that can be "used" by any class. PHP resolves trait method conflicts explicitly using `insteadof` and `as` operators.

## 🧠 Key Concepts
- **`trait` keyword** — declares a trait
- **`use` keyword** — imports a trait into a class
- **Trait method precedence** — current class methods override trait methods; trait methods override inherited methods
- **Multiple traits** — a class can use multiple traits separated by commas
- **Trait composition** — traits can use other traits
- **Abstract methods in traits** — traits can declare abstract methods that using classes must implement
- **Trait aliasing** — `insteadof` resolves conflicts; `as` creates aliases
- **Traits can have properties and methods** — but cannot be instantiated independently

## 💻 Syntax

```php
// Defining a trait
trait Loggable {
    public function log(string $message): void {
        echo "[LOG] $message\n";
    }
}

// Using a trait
class User {
    use Loggable;
}

// Multiple traits
class Service {
    use Loggable, Cacheable, Serializable;
}

// Conflict resolution
trait A { public function say(): string { return "A"; } }
trait B { public function say(): string { return "B"; } }
class MyClass {
    use A, B {
        A::say insteadof B;  // use A's version
        B::say as sayB;      // alias B's version
    }
}

// Abstract method in trait
trait Validatable {
    abstract protected function validate(): bool;
}
```

## ✅ Example 1 - Basic: Sharing Logging Across Unrelated Classes

**Problem:** Add logging capability to multiple unrelated classes using a trait.

```php
<?php
trait Loggable {
    private function log(string $level, string $message): void {
        $timestamp = date('Y-m-d H:i:s');
        echo "[{$timestamp}] [{$level}] {$message}\n";
    }
    
    public function info(string $message): void {
        $this->log('INFO', $message);
    }
    
    public function error(string $message): void {
        $this->log('ERROR', $message);
    }
}

class UserManager {
    use Loggable;
    
    public function createUser(string $name): void {
        // Create user logic...
        $this->info("User '{$name}' created successfully");
    }
}

class OrderProcessor {
    use Loggable;
    
    public function processOrder(int $orderId): void {
        $this->info("Processing order #{$orderId}");
        // Process order...
        $this->error("Order #{$orderId} failed");
    }
}

$um = new UserManager();
$um->createUser("Alice");

$op = new OrderProcessor();
$op->processOrder(123);
?>
```

**Output:**
```
[2026-06-23 10:00:00] [INFO] User 'Alice' created successfully
[2026-06-23 10:00:00] [INFO] Processing order #123
[2026-06-23 10:00:00] [ERROR] Order #123 failed
```

**Explanation:** `Loggable` is a trait providing `info()` and `error()` methods. Both `UserManager` and `OrderProcessor` (which are unrelated by inheritance) gain logging with a single `use Loggable` statement. No common parent class is needed.

## 🚀 Example 2 - Intermediate: Conflict Resolution and Trait Composition

**Problem:** Demonstrate trait composition, method conflict resolution with `insteadof`/`as`, and abstract methods in traits.

```php
<?php
// Trait composition — traits using other traits
trait Timestampable {
    public function getCreatedAt(): string {
        return date('Y-m-d H:i:s');
    }
}

trait SoftDeletable {
    private bool $deleted = false;
    
    public function delete(): void {
        $this->deleted = true;
        echo "Soft deleted\n";
    }
    
    public function isDeleted(): bool {
        return $this->deleted;
    }
}

trait Auditable {
    use Timestampable, SoftDeletable;
    
    abstract public function getAuditLog(): string;
    
    public function getAuditInfo(): string {
        return "Created: {$this->getCreatedAt()}, Deleted: " . ($this->isDeleted() ? 'yes' : 'no');
    }
}

// Conflict traits
trait JsonSerializer {
    public function serialize(): string {
        return json_encode(get_object_vars($this));
    }
}

trait XmlSerializer {
    public function serialize(): string {
        $xml = new SimpleXMLElement('<data/>');
        foreach (get_object_vars($this) as $key => $value) {
            $xml->addChild($key, $value);
        }
        return $xml->asXML();
    }
}

// Resolving conflict
class Product {
    use Auditable, JsonSerializer, XmlSerializer {
        JsonSerializer::serialize insteadof XmlSerializer;
        XmlSerializer::serialize as serializeToXml;
    }
    
    private string $name;
    private float $price;
    
    public function __construct(string $name, float $price) {
        $this->name = $name;
        $this->price = $price;
    }
    
    public function getAuditLog(): string {
        return "Product: {$this->name}";
    }
}

$product = new Product("Widget", 19.99);
echo $product->serialize() . "\n";
echo "---\n";
echo $product->serializeToXml() . "\n";
echo "---\n";
echo $product->getAuditInfo() . "\n";
?>
```

**Output:**
```
{"name":"Widget","price":19.99}
---
<?xml version="1.0"?>
<data><name>Widget</name><price>19.99</price></data>
---
Created: 2026-06-23 10:00:00, Deleted: no
```

**Explanation:** `Auditable` composes `Timestampable` and `SoftDeletable`. Both `JsonSerializer` and `XmlSerializer` define `serialize()` — `insteadof` picks one, `as` aliases the other. Abstract method `getAuditLog()` forces the using class to implement it.

## 🏢 Real World Use Case
Laravel uses traits extensively: `Illuminate\Auth\Authenticatable` (adds authentication methods to user models), `Illuminate\Database\Eloquent\SoftDeletes` (soft delete behavior), `Illuminate\Notifications\Notifiable` (notification capabilities). These traits add functionality to Eloquent models without requiring deep inheritance chains.

```php
class User extends Authenticatable {
    use HasFactory, Notifiable, SoftDeletes;
    // User now has factory, notification, and soft delete capabilities
}
```

## 🎯 Interview Questions

**1. What is the difference between a trait and a class?**
A trait cannot be instantiated on its own. It is designed to group reusable methods that are composed into classes. Unlike classes, traits cannot be extended and have no inheritance chain.

**2. How does PHP resolve method name conflicts between traits?**
PHP uses `insteadof` to choose one trait's method over another, and `as` to alias the conflicting method under a different name. Without resolution, a fatal error occurs.

**3. Can a trait have properties?**
Yes, traits can declare properties. However, if two traits used by the same class define a property with the same name, a fatal error occurs (unless they have identical definition).

**4. Can a trait define abstract methods?**
Yes. Traits can declare abstract methods. Any class using the trait must implement those abstract methods.

**5. Can traits be used by other traits?**
Yes. Traits can `use` other traits (trait composition). This allows building complex behavior from smaller, reusable pieces.

## ⚠ Common Errors / Mistakes

- **Not resolving trait method conflicts** — leads to fatal error.
- **Assuming trait properties are isolated** — if two traits define the same property name, a fatal error occurs.
- **Traits cannot be instantiated** — `new MyTrait()` is illegal.
- **Confusing trait `use` with namespace `use`** — inside a class, `use TraitName;` imports a trait; outside, `use Namespace\Class;` imports a namespace.
- **Trying to override a trait method with a non-compatible signature** — causes a fatal error.

## 📝 Practice Exercises

**Beginner**
1. Create a `SingletonTrait` that provides a `getInstance()` static method with a private constructor. Use it in `Database` and `Logger` classes.
2. Build a `JsonSerializableTrait` with `toJson(): string` and `fromJson(string $json): self`. Use it in `User` and `Product` classes.
3. Create a `CacheableTrait` with `remember(string $key, callable $callback, int $ttl = 3600)` that stores results in a protected `$cache` array property.

**Intermediate**
4. Create three traits: `ExportableCsv`, `ExportableJson`, `ExportableXml` all with `export(array $data): string`. Create a `Report` class that uses all three, resolving conflicts with `insteadof` and `as`.
5. Build a trait hierarchy: `HasTimestamps` (adds created_at/updated_at), `HasAuthor` (adds author). Compose them into `HasMetadata`. Use `HasMetadata` in `Article` and `Comment` classes.
6. Create an `EventDispatcherTrait` with `dispatch(string $event, mixed $data): void`, `on(string $event, callable $handler): void`. Use it in a `UserService` class. Add an abstract method `shouldDispatch(): bool` to the trait.

**Advanced**
7. Implement a `Macroable` trait (like Laravel's) that allows adding methods to a class at runtime using `Macroable::mixin()`. Use `__call` magic and a static macro registry. Test by adding a `greet()` method to a `StringFormatter` class via the trait.
8. Design a `StateMachineTrait` that provides `transition(string $fromState, string $toState): bool`, `getCurrentState(): string`, and a `getTransitions(): array` abstract method. Use it in an `Order` class with concrete transitions defined. The trait should handle invalid transitions gracefully.
