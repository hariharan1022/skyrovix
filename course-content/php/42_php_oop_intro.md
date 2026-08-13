## 42. PHP What is OOP

## 📘 Introduction
Object-Oriented Programming (OOP) is a programming paradigm that organizes code around "objects" rather than functions and logic. An object is a self-contained unit containing both data (properties) and behavior (methods). PHP has fully supported OOP since PHP 5, with major improvements in PHP 7 and 8.

## 🧠 Key Concepts
- **OOP vs Procedural** — procedural code uses functions and global state; OOP groups related data and behavior into objects
- **Class** — a blueprint or template for creating objects
- **Object** — an instance of a class
- **`$this`** — pseudovariable referring to the current object instance
- **`->` operator** — used to access properties and methods on an object
- **Encapsulation** — bundling data and methods, restricting direct access to some components
- **Inheritance** — a class can inherit properties and methods from another class
- **Polymorphism** — objects of different classes can be treated through a common interface
- **Advantages** — code reuse, modularity, maintainability, real-world modeling, team collaboration

## 💻 Syntax

```php
// Basic class and object
class Car {
    public $brand = "Toyota";
    
    public function honk() {
        return "Beep beep!";
    }
}

$myCar = new Car();
echo $myCar->brand;     // Toyota
echo $myCar->honk();    // Beep beep!
```

## ✅ Example 1 - Basic: Procedural vs OOP Comparison

**Problem:** Model a simple bank account using both procedural and OOP styles.

```php
<?php
// --- Procedural approach ---
$accountBalance = 1000;

function deposit(&$balance, $amount) {
    $balance += $amount;
}

function withdraw(&$balance, $amount) {
    if ($amount <= $balance) {
        $balance -= $amount;
    }
}

deposit($accountBalance, 500);
withdraw($accountBalance, 200);
echo "Balance: $accountBalance\n";  // 1300

// --- OOP approach ---
class BankAccount {
    private $balance = 1000;
    
    public function deposit($amount) {
        $this->balance += $amount;
    }
    
    public function withdraw($amount) {
        if ($amount <= $this->balance) {
            $this->balance -= $amount;
        }
    }
    
    public function getBalance() {
        return $this->balance;
    }
}

$account = new BankAccount();
$account->deposit(500);
$account->withdraw(200);
echo "Balance: " . $account->getBalance() . "\n";  // 1300
?>
```

**Output:**
```
Balance: 1300
Balance: 1300
```

**Explanation:** The procedural version uses a global variable and functions that require `&` references. The OOP version encapsulates the balance as a private property, exposes controlled public methods, and eliminates global state. The object manages its own data.

## 🚀 Example 2 - Intermediate: Polymorphism with Animal Classes

**Problem:** Demonstrate inheritance and polymorphism using an animal hierarchy.

```php
<?php
class Animal {
    protected $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function speak() {
        return "Some sound";
    }
}

class Dog extends Animal {
    public function speak() {
        return "Woof! My name is {$this->name}";
    }
}

class Cat extends Animal {
    public function speak() {
        return "Meow! I am {$this->name}";
    }
}

function makeAnimalSpeak(Animal $animal) {
    echo $animal->speak() . "\n";
}

$animals = [new Dog("Rover"), new Cat("Whiskers")];
foreach ($animals as $animal) {
    makeAnimalSpeak($animal);
}
?>
```

**Output:**
```
Woof! My name is Rover
Meow! I am Whiskers
```

**Explanation:** `Dog` and `Cat` inherit from `Animal` but override `speak()`. The `makeAnimalSpeak()` function accepts any `Animal` type — this is polymorphism. Each object responds to the same method call differently, and the correct method is resolved at runtime.

## 🏢 Real World Use Case
A large e-commerce platform models its domain using OOP: `Product` (base), `PhysicalProduct` and `DigitalProduct` (inheritance), `Cart` (encapsulation of items), `Order` (state management). Payment processors implement a `PaymentGatewayInterface`, allowing `StripeGateway`, `PayPalGateway`, and `CODGateway` to be swapped without changing the checkout logic (polymorphism).

## 🎯 Interview Questions

**1. What are the four main principles of OOP?**
Encapsulation (hide internal state), Inheritance (reuse from parent classes), Polymorphism (same interface, different behavior), Abstraction (hide complexity, show only essentials).

**2. How does PHP implement polymorphism?**
Through inheritance (method overriding) and interfaces (multiple classes implementing the same interface). Type hints on functions/methods allow treating different objects uniformly.

**3. What is the difference between a class and an object?**
A class is a blueprint defining properties and methods. An object is a concrete instance of that class, allocated in memory with its own property values.

**4. Why use OOP over procedural in PHP?**
OOP provides better code organization, reusability through inheritance, data hiding via encapsulation, easier maintenance for large codebases, and aligns with modern PHP frameworks (Laravel, Symfony).

**5. What does `$this` refer to?**
`$this` is a pseudo-variable available inside class methods that refers to the current object instance. It cannot be used in static methods.

## ⚠ Common Errors / Mistakes

- **Using `$this` in static methods** — `$this` is not available; use `self::` instead.
- **Forgetting `new` when creating objects** — `$car = Car()` causes a fatal error; must be `$car = new Car()`.
- **Confusing `->` for class constants** — use `::` for constants, `->` for instance properties.
- **Assuming objects are passed by value** — in PHP, objects are always passed by reference (object identifier is copied, not the object itself).
- **Not using type hints** — failing to declare parameter types reduces readability and IDE support.

## 📝 Practice Exercises

**Beginner**
1. Create a `Book` class with `$title`, `$author`, `$pages` properties and a `getSummary()` method. Instantiate two books and print summaries.
2. Convert a procedural temperature converter (Celsius to Fahrenheit) into an OOP `TemperatureConverter` class with a method.
3. Create a `Counter` class with a private `$count` property and `increment()`, `decrement()`, `getCount()` methods.

**Intermediate**
4. Model a `Vehicle` base class with `$speed` and `move()` method. Extend it with `Car` and `Bicycle` classes that override `move()`. Write a `race($vehicle1, $vehicle2)` function that accepts any `Vehicle`.
5. Build a simple `Logger` class hierarchy: `FileLogger` writes to a file, `DatabaseLogger` writes to a mock array, both implementing a `LoggerInterface` with `log($message)`.
6. Create a `ShoppingCart` class that holds `Product` objects (class with `$name`, `$price`). Implement `addItem()`, `removeItem()`, `getTotal()` methods.

**Advanced**
7. Design a plugin architecture: define an `PluginInterface` with `activate()`, `deactivate()`, `execute()`. Create two plugins (`SeoPlugin`, `AnalyticsPlugin`) that implement it. Build a `PluginManager` that loads and executes all plugins.
8. Implement the Strategy Pattern: `PaymentProcessor` accepts different strategy objects (`CreditCardStrategy`, `PayPalStrategy`, `BankTransferStrategy`), each implementing `PaymentStrategy` with a `pay($amount)` method. Demonstrate switching strategies at runtime.
