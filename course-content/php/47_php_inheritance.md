## 47. PHP Inheritance

## 📘 Introduction
Inheritance allows a class (child/subclass) to reuse properties and methods of another class (parent/superclass). PHP supports single inheritance — a class can extend only one parent. Features like `final`, `abstract`, and `traits` complement inheritance to build flexible class hierarchies.

## 🧠 Key Concepts
- **`extends` keyword** — declares that a class inherits from another
- **`parent::`** — used to call overridden parent methods
- **Method overriding** — child redefines a parent method (must have compatible signature)
- **`final` keyword** — on class: prevents inheritance; on method: prevents overriding
- **`final` on methods** — child classes cannot override `final` methods
- **Abstract classes** — cannot be instantiated; may contain abstract methods that children must implement
- **Traits** — horizontal code reuse mechanism; an alternative to deep inheritance
- **Diamond problem** — PHP avoids this because single inheritance + traits use conflict resolution (`insteadof`)

## 💻 Syntax

```php
// Basic inheritance
class ParentClass {
    public function greet(): string {
        return "Hello";
    }
}

class ChildClass extends ParentClass {
    public function greet(): string {
        return parent::greet() . " from child";
    }
}

// Final class
final class ImmutableConfig {
    // cannot be extended
}

// Final method
class Base {
    final public function shutdown(): void {
        // cannot be overridden
    }
}
```

## ✅ Example 1 - Basic: Method Overriding and parent::

**Problem:** Create a `Vehicle` base class and a `Car` subclass that overrides a method while reusing parent logic.

```php
<?php
class Vehicle {
    protected string $brand;
    protected int $speed = 0;
    
    public function __construct(string $brand) {
        $this->brand = $brand;
    }
    
    public function move(): string {
        return "{$this->brand} moves at {$this->speed} km/h";
    }
    
    public function getBrand(): string {
        return $this->brand;
    }
}

class Car extends Vehicle {
    private int $doors;
    
    public function __construct(string $brand, int $doors) {
        parent::__construct($brand);
        $this->doors = $doors;
        $this->speed = 120; // override default
    }
    
    // Override with extension
    public function move(): string {
        return parent::move() . " with {$this->doors} doors";
    }
    
    public function honk(): string {
        return "Beep beep!";
    }
}

$car = new Car("Toyota", 4);
echo $car->move() . "\n";
echo $car->honk() . "\n";
echo "Brand: " . $car->getBrand() . "\n";
?>
```

**Output:**
```
Toyota moves at 120 km/h with 4 doors
Beep beep!
Brand: Toyota
```

**Explanation:** `Car extends Vehicle`, inheriting `$brand`, `$speed`, and `getBrand()`. The constructor calls `parent::__construct()`. `move()` is overridden but still calls `parent::move()` to build on the parent's logic.

## 🚀 Example 2 - Intermediate: Abstract Classes and Final Methods

**Problem:** Build a payment processing hierarchy with abstract base and final methods.

```php
<?php
abstract class PaymentProcessor {
    protected float $amount;
    
    public function __construct(float $amount) {
        $this->amount = $amount;
    }
    
    // Abstract — children must implement
    abstract protected function processPayment(): bool;
    
    abstract protected function getFee(): float;
    
    // Template method pattern — final, cannot be overridden
    final public function execute(): array {
        $fee = $this->getFee();
        $success = $this->processPayment();
        
        return [
            'success' => $success,
            'amount' => $this->amount,
            'fee' => $fee,
            'total' => $this->amount + $fee
        ];
    }
}

class CreditCardProcessor extends PaymentProcessor {
    protected function getFee(): float {
        return $this->amount * 0.03; // 3% fee
    }
    
    protected function processPayment(): bool {
        echo "Processing credit card payment of \${$this->amount}...\n";
        return true;
    }
}

class PayPalProcessor extends PaymentProcessor {
    protected function getFee(): float {
        return $this->amount * 0.05; // 5% fee
    }
    
    protected function processPayment(): bool {
        echo "Processing PayPal payment of \${$this->amount}...\n";
        return true;
    }
}

// Final class — cannot be extended
final class StripeProcessor extends PaymentProcessor {
    protected function getFee(): float {
        return 0.30 + ($this->amount * 0.029);
    }
    
    protected function processPayment(): bool {
        echo "Processing Stripe payment of \${$this->amount}...\n";
        return true;
    }
}

$processor = new CreditCardProcessor(100.00);
print_r($processor->execute());

$paypal = new PayPalProcessor(100.00);
print_r($paypal->execute());
?>
```

**Output:**
```
Processing credit card payment of $100...
Array
(
    [success] => 1
    [amount] => 100
    [fee] => 3
    [total] => 103
)
Processing PayPal payment of $100...
Array
(
    [success] => 1
    [amount] => 100
    [fee] => 5
    [total] => 105
)
```

**Explanation:** `PaymentProcessor` is abstract — it cannot be instantiated directly. Children must implement `processPayment()` and `getFee()`. The `execute()` method is `final`, ensuring the processing pipeline cannot be altered by subclasses. `StripeProcessor` is declared `final`, preventing further extension.

## 🏢 Real World Use Case
An e-commerce platform defines `Product` as an abstract base with `abstract getPrice()`, `abstract getTaxRate()`. `PhysicalProduct` and `DigitalProduct` extend it. A `final` method `checkout()` orchestrates the entire purchase flow. The `Order` class is `final` to prevent modification of order lifecycle logic. `Traits` like `Discountable` are used across products without deep inheritance.

## 🎯 Interview Questions

**1. Does PHP support multiple inheritance?**
No. PHP supports single inheritance (one parent per class). Multiple inheritance is simulated using `traits` and `interfaces`.

**2. What is the diamond problem and how does PHP handle it?**
The diamond problem occurs when a class inherits from two classes that share a common ancestor. PHP avoids it by disallowing multiple inheritance. Traits use `insteadof` and `as` operators for explicit conflict resolution.

**3. What does the `final` keyword do on a class vs a method?**
`final class` cannot be extended by any other class. `final method` cannot be overridden in child classes, but the class itself can still be extended (unless also marked final).

**4. Can a child class reduce the visibility of an inherited method?**
No. PHP does not allow reducing visibility. A `protected` parent method cannot be made `private` in the child. It can only stay the same or increase visibility (`public`).

**5. What is the difference between abstract class and interface?**
Abstract classes can have implemented methods, properties, and constructors. Interfaces can only declare method signatures (no implementations in PHP < 8). A class can implement multiple interfaces but extend only one abstract class.

## ⚠ Common Errors / Mistakes

- **Forgetting `parent::` in overridden methods** — completely replaces parent logic instead of extending it.
- **Trying to extend a `final` class** — causes a fatal error.
- **Reducing method visibility in child** — causes a fatal error.
- **Circular inheritance** — PHP detects and prevents infinite inheritance chains.
- **Calling `parent::` when there is no parent** — only use `parent::` if the class actually extends another class.

## 📝 Practice Exercises

**Beginner**
1. Create a `Shape` base class with `getArea()` method. Extend with `Circle` and `Square` classes that override `getArea()`.
2. Build `Animal` class with `makeSound()`. Create `Dog` and `Cat` subclasses. Add a `final` method `getSpecies()` to `Animal`.
3. Create `Employee` base class with `$name` and `calculateBonus()`. Extend with `Manager` and `Developer` that calculate bonus differently.

**Intermediate**
4. Create an abstract `Database` class with `abstract connect()`, `abstract query()`, `abstract close()`. Implement `MySQLDatabase` and `PostgreSQLDatabase`. Add a `final backup()` method.
5. Build a logging hierarchy: `Logger` (abstract with `log()`), `FileLogger`, `DatabaseLogger`, `CloudLogger`. Use `parent::` in overridden methods where appropriate.
6. Create `Transport` abstract class with `abstract getFuelCost()`. Extend with `Car` (fuel) and `ElectricCar` (electricity). Show how ElectricCar overrides fuel cost calculation.

**Advanced**
7. Design a game character system: `Character` abstract base with `abstract attack()`, `abstract defend()`. Create `Warrior`, `Mage`, `Archer`. Implement a `final levelUp()` method that children cannot override but can hook into using a `protected onLevelUp()` callback.
8. Build a form field validation system: `Field` abstract class with `validate()` template method pattern (final). `TextField`, `EmailField`, `NumberField` implement specific validation. Use `parent::validate()` for chaining validation rules.
