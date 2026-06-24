## 50. PHP Interfaces

## 📘 Introduction
An interface defines a contract — a set of method signatures that implementing classes must fulfill. Unlike abstract classes, interfaces (pre-PHP 8) contain only method declarations without implementations. PHP supports multiple interface implementation, interface inheritance, constants in interfaces, and covariant returns (PHP 7.4+).

## 🧠 Key Concepts
- **`interface` keyword** — declares an interface
- **`implements` keyword** — a class commits to fulfilling an interface contract
- **Method signatures** — interfaces declare method names, parameters, and return types (no body)
- **Multiple interface implementation** — a class can implement multiple interfaces (`class A implements X, Y, Z`)
- **Interface extends interface** — interfaces can extend one or more parent interfaces (`interface B extends A, C`)
- **Constants in interfaces** — interfaces can have constants (cannot be overridden)
- **Covariant returns (PHP 7.4+)** — implementing methods can return a more specific type than declared in the interface
- **PHP 8+ enhancements** — interfaces can define constructor signatures, and use `mixed` type

## 💻 Syntax

```php
// Simple interface
interface LoggerInterface {
    public function log(string $message): void;
}

// Multiple interfaces
interface CacheInterface {
    public function get(string $key): ?string;
    public function set(string $key, string $value): void;
}

// Interface extending another
interface LoggableCacheInterface extends CacheInterface, LoggerInterface {
    // inherits all methods from both
}

// Implementing
class FileLogger implements LoggerInterface, CacheInterface {
    public function log(string $message): void { /* ... */ }
    public function get(string $key): ?string { /* ... */ }
    public function set(string $key, string $value): void { /* ... */ }
}
```

## ✅ Example 1 - Basic: Multiple Interfaces for Payment Processing

**Problem:** Define interfaces for different payment capabilities and implement them across payment providers.

```php
<?php
interface PayableInterface {
    public function charge(float $amount): bool;
    public function refund(string $transactionId): bool;
}

interface RefundableInterface {
    public function refund(string $transactionId): bool;
    public function getRefundStatus(string $transactionId): string;
}

interface FraudCheckInterface {
    public function checkFraud(array $orderData): float; // returns risk score 0-1
}

class StripeGateway implements PayableInterface, FraudCheckInterface {
    public function charge(float $amount): bool {
        echo "Stripe charging \${$amount}\n";
        return true;
    }
    
    public function refund(string $transactionId): bool {
        echo "Stripe refunding transaction {$transactionId}\n";
        return true;
    }
    
    public function checkFraud(array $orderData): float {
        return 0.05; // low risk
    }
}

class PayPalGateway implements PayableInterface, RefundableInterface {
    public function charge(float $amount): bool {
        echo "PayPal charging \${$amount}\n";
        return true;
    }
    
    public function refund(string $transactionId): bool {
        echo "PayPal refunding transaction {$transactionId} (3-5 days)\n";
        return true;
    }
    
    public function getRefundStatus(string $transactionId): string {
        return "processing";
    }
}

function processPayment(PayableInterface $gateway, float $amount): void {
    $gateway->charge($amount);
}

$stripe = new StripeGateway();
$paypal = new PayPalGateway();

processPayment($stripe, 50.00);
processPayment($paypal, 75.00);
?>
```

**Output:**
```
Stripe charging $50
PayPal charging $75
```

**Explanation:** Each interface defines a specific capability. `StripeGateway` implements `PayableInterface` and `FraudCheckInterface`. `PayPalGateway` implements `PayableInterface` and `RefundableInterface`. The `processPayment()` function type-hints `PayableInterface`, accepting any implementation.

## 🚀 Example 2 - Intermediate: Interface Inheritance and Covariant Returns

**Problem:** Build a media library system with interface inheritance and covariant return types.

```php
<?php
interface MediaInterface {
    public function getTitle(): string;
    public function getDuration(): int;
}

interface PlayableInterface extends MediaInterface {
    public function play(): string;
    public function pause(): string;
}

interface DownloadableInterface extends MediaInterface {
    public function download(): string;
    public function getFileSize(): int;
}

// Base implementation class
class Media implements PlayableInterface, DownloadableInterface {
    public function __construct(
        private string $title,
        private int $duration,
        private int $fileSize
    ) {}
    
    public function getTitle(): string {
        return $this->title;
    }
    
    public function getDuration(): int {
        return $this->duration;
    }
    
    public function play(): string {
        return "Playing: {$this->title}";
    }
    
    public function pause(): string {
        return "Paused: {$this->title}";
    }
    
    public function download(): string {
        return "Downloading: {$this->title} ({$this->fileSize}MB)";
    }
    
    public function getFileSize(): int {
        return $this->fileSize;
    }
}

// Covariant return type example (PHP 7.4+)
interface FactoryInterface {
    public function create(): MediaInterface;
}

class MediaFactory implements FactoryInterface {
    // Can return a more specific type than MediaInterface
    public function create(): Media {
        return new Media("Song", 180, 5);
    }
}

$media = new Media("Bohemian Rhapsody", 354, 8);
echo $media->play() . "\n";
echo $media->download() . "\n";

$factory = new MediaFactory();
$created = $factory->create();
echo "Created: " . $created->getTitle() . "\n";
?>
```

**Output:**
```
Playing: Bohemian Rhapsody
Downloading: Bohemian Rhapsody (8MB)
Created: Song
```

**Explanation:** `PlayableInterface` and `DownloadableInterface` both extend `MediaInterface`. A single `Media` class implements both. `MediaFactory` demonstrates covariant returns — the `create()` method signature declares `MediaInterface` but returns `Media` (a subtype), which is valid in PHP 7.4+.

## 🏢 Real World Use Case
Laravel's core uses interfaces extensively: `Illuminate\Contracts\Mail\Mailer`, `Illuminate\Contracts\Cache\Repository`, `Illuminate\Contracts\Auth\Guard`. The framework binds interface names to concrete implementations in the service container. This allows swapping drivers (e.g., Redis vs File cache) without changing application code.

```php
// Contract
interface CacheRepository {
    public function get(string $key, mixed $default = null): mixed;
    public function put(string $key, mixed $value, int $seconds): bool;
}
// Bound in container to RedisCache or FileCache
```

## 🎯 Interview Questions

**1. Can interfaces have properties?**
No. Interfaces cannot declare properties (variables). They can only declare method signatures and constants.

**2. Can interfaces have constructors?**
Yes, since PHP 8. Interfaces can define constructor signatures to enforce a specific construction contract.

**3. What is covariance and how does it apply to interfaces?**
Covariance allows a child method to return a more specific type than its parent. In PHP 7.4+, an implementing method can return a subtype of the declared return type in the interface.

**4. Can a class implement multiple interfaces?**
Yes. A class can implement any number of interfaces separated by commas: `class A implements X, Y, Z`.

**5. What happens if two interfaces define methods with the same name?**
If the signatures match, one implementation satisfies both. If signatures differ (e.g., different parameters), PHP throws a fatal error — the class cannot implement both interfaces.

## ⚠ Common Errors / Mistakes

- **Missing return type in implementation** — the implementing method must match the interface signature exactly.
- **Trying to instantiate an interface** — `new InterfaceName()` causes a fatal error.
- **Adding extra required parameters in implementation** — implementing methods cannot add required parameters not declared in the interface.
- **Forgetting to implement all interface methods** — results in a fatal error.
- **Changing method visibility** — all interface methods are implicitly `public`; implementing them with `protected` or `private` causes an error.

## 📝 Practice Exercises

**Beginner**
1. Define a `LoggerInterface` with `log(string $message): void`. Create `FileLogger` and `ConsoleLogger` implementations.
2. Create an `AnimalInterface` with `makeSound(): string` and `getName(): string`. Implement `Dog` and `Cat`.
3. Define `ComparableInterface` with `compareTo(object $other): int`. Implement it in a `Product` class comparing by price.

**Intermediate**
4. Create `RenderableInterface` (render()), `ExportableInterface` (export()), and `PrintableInterface` (print()). Create a `Report` class that implements all three.
5. Build an interface hierarchy: `VehicleInterface` → `LandVehicleInterface` and `WaterVehicleInterface`. Create `AmphibiousVehicle` implementing both child interfaces.
6. Create a `ShapeInterface` with `getArea(): float`. Extend it with `ColoredShapeInterface` that adds `getColor(): string`. Implement `ColoredCircle` that implements `ColoredShapeInterface`. Use covariant returns.

**Advanced**
7. Design a PSR-style container interface: `ContainerInterface` with `get(string $id): mixed` and `has(string $id): bool`. Implement a `SimpleContainer`. Then extend the interface with `MutableContainerInterface` adding `set(string $id, mixed $value): void`.
8. Build an event dispatcher system: `EventDispatcherInterface` with `dispatch(object $event): object`, `addListener(string $eventClass, callable $listener): void`. Create implementations for synchronous and queued dispatching. Ensure covariant return types are used.
