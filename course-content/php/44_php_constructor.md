## 44. PHP Constructor

## 📘 Introduction
A constructor is a special method (`__construct`) that is automatically called when an object is instantiated. It initializes object properties, establishes dependencies, and performs any startup logic. PHP 8 introduced constructor promotion, which significantly reduces boilerplate code.

## 🧠 Key Concepts
- **`__construct()`** — magic method automatically invoked on `new ClassName()`
- **Parameterized constructors** — accept arguments to set initial state
- **Constructor promotion (PHP 8+)** — declare and initialize properties directly in the constructor parameter list
- **`parent::__construct()`** — call the parent class constructor from a child class
- **Readonly properties** — can be set once in the constructor (PHP 8.1+)
- **Named arguments** — used to work around PHP's lack of constructor overloading
- **No constructor overloading** — PHP does not support multiple constructors; use named arguments or static factory methods

## 💻 Syntax

```php
// Traditional constructor
class User {
    private string $name;
    
    public function __construct(string $name) {
        $this->name = $name;
    }
}

// Constructor promotion (PHP 8+)
class User {
    public function __construct(
        private string $name,
        private string $email
    ) {}
}

// Parent constructor
class Admin extends User {
    public function __construct(string $name, string $email, private string $role) {
        parent::__construct($name, $email);
    }
}

// Readonly properties (PHP 8.1+)
class Config {
    public function __construct(
        public readonly string $apiKey,
        public readonly string $endpoint
    ) {}
}
```

## ✅ Example 1 - Basic: Parameterized Constructor

**Problem:** Create a `Car` class that requires `$make`, `$model`, and `$year` at creation time.

```php
<?php
class Car {
    private string $make;
    private string $model;
    private int $year;
    
    public function __construct(string $make, string $model, int $year) {
        $this->make = $make;
        $this->model = $model;
        $this->year = $year;
    }
    
    public function getInfo(): string {
        return "$this->year $this->make $this->model";
    }
}

$car = new Car("Toyota", "Camry", 2024);
echo $car->getInfo() . "\n";

// Using named arguments (PHP 8+)
$car2 = new Car(year: 2023, make: "Honda", model: "Civic");
echo $car2->getInfo() . "\n";
?>
```

**Output:**
```
2024 Toyota Camry
2023 Honda Civic
```

**Explanation:** The constructor enforces that every `Car` object has valid `$make`, `$model`, and `$year`. Named arguments allow passing parameters in any order, simulating some flexibility of overloading.

## 🚀 Example 2 - Intermediate: Constructor Promotion and Readonly

**Problem:** Build an `OrderItem` class using modern PHP 8 constructor promotion with readonly properties.

```php
<?php
class Product {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly float $price
    ) {}
}

class OrderItem {
    public function __construct(
        public readonly Product $product,
        public readonly int $quantity,
        private ?float $discount = null
    ) {}
    
    public function getTotal(): float {
        $base = $this->product->price * $this->quantity;
        return $this->discount ? $base - ($base * $this->discount / 100) : $base;
    }
}

// Child class with parent constructor
class DiscountedOrderItem extends OrderItem {
    public function __construct(
        Product $product,
        int $quantity,
        private string $couponCode
    ) {
        parent::__construct($product, $quantity, 10.0); // 10% discount
    }
    
    public function getCoupon(): string {
        return $this->couponCode;
    }
}

$item = new DiscountedOrderItem(
    new Product(1, "Widget", 25.00),
    3,
    "SAVE10"
);
echo "Total: \$" . $item->getTotal() . " (coupon: {$item->getCoupon()})\n";
?>
```

**Output:**
```
Total: $67.5 (coupon: SAVE10)
```

**Explanation:** Constructor promotion declares `$product`, `$quantity`, and `$discount` directly in the parameter list — no separate property declarations or assignments needed. `readonly` prevents modification after construction. The child class calls `parent::__construct()` to reuse parent logic.

## 🏢 Real World Use Case
A Laravel-like service container uses constructor promotion extensively. Controller dependencies (e.g., `UserRepository`, `Logger`, `Mailer`) are type-hinted in the constructor, and the container auto-resolves them via reflection. Readonly DTOs (Data Transfer Objects) use promoted readonly properties for immutable data transfer between layers.

```php
class UserController {
    public function __construct(
        private readonly UserRepository $users,
        private readonly Logger $logger
    ) {}
    
    public function show(int $id): array {
        $this->logger->info("Fetching user $id");
        return $this->users->find($id)->toArray();
    }
}
```

## 🎯 Interview Questions

**1. What is constructor promotion in PHP 8?**
Syntax that allows declaring and initializing class properties directly in the constructor parameter list. Removes the need for separate property declarations and assignments, reducing boilerplate.

**2. Can you overload constructors in PHP?**
No. PHP does not support multiple `__construct()` methods. Instead, use named arguments with default values, static factory methods (`User::fromArray()`), or nullable parameters.

**3. What is `parent::__construct()` and when is it needed?**
It calls the parent class's constructor. Required when a child class overrides `__construct` but still needs the parent's initialization logic. If not called, the parent constructor does not run automatically.

**4. What are readonly properties and what restrictions do they have?**
Readonly properties (PHP 8.1+) can be set only once — typically in the constructor. They cannot be modified afterward. They cannot have default values (except promoted parameters). Cannot be `unset`. Only typed properties can be readonly.

**5. How do you use named arguments with constructors?**
Named arguments allow passing parameters by name instead of position: `new User(name: "Alice", email: "a@b.com")`. Particularly useful when a constructor has many optional parameters.

## ⚠ Common Errors / Mistakes

- **Calling `parent::__construct()` with wrong argument count** — ensure the signature matches.
- **Forgetting to call `parent::__construct()` in child class** — the parent constructor won't run automatically if the child defines its own `__construct`.
- **Setting readonly properties outside the constructor** — results in a fatal error.
- **Declaring properties twice with constructor promotion** — promoted parameters replace manual declarations; doing both causes a parse error.
- **Using `$this->property` before initialization in promoted constructors** — promoted properties are available immediately.

## 📝 Practice Exercises

**Beginner**
1. Create a `Person` class with a constructor that accepts `$name` and `$age`. Add a `greet()` method that prints "Hello, I am {name}".
2. Build a `Rectangle` class with constructor parameters `$width` and `$height`. Add `getArea()` and `getPerimeter()` methods.
3. Create a `Student` class with constructor parameters `$name`, `$grade`, `$subject`. Use a default value of "Math" for `$subject`.

**Intermediate**
4. Rewrite the `Student` class using PHP 8 constructor promotion with readonly properties. Add a `getInfo()` method.
5. Create a `PremiumStudent` class that extends `Student` and adds `$membershipLevel`. Ensure the parent constructor is called properly.
6. Build a `Configuration` class with constructor promotion for `$host`, `$port`, `$username`, `$password`, `$database`. Use named arguments when instantiating.

**Advanced**
7. Implement a static factory pattern: create a `DateTimeWrapper` class with a private constructor and static methods `fromString(string $date)`, `fromTimestamp(int $ts)`, `now()`. Each returns a new instance.
8. Design an immutable `Money` class with promoted readonly properties `$amount` and `$currency`. Implement `add(Money $other)`, `subtract(Money $other)`, `multiply(float $factor)` — each returns a new `Money` instance (immutable pattern).
