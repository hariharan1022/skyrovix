## 49. PHP Abstract Classes

## 📘 Introduction
Abstract classes provide a hybrid between fully implemented classes and pure interfaces. They can contain both complete method implementations and abstract method declarations that child classes must implement. Abstract classes cannot be instantiated directly — they serve as base templates for other classes.

## 🧠 Key Concepts
- **`abstract` keyword** — marks a class or method as abstract
- **Abstract methods** — declared without implementation; child classes must implement them
- **Abstract class vs interface** — abstract classes can have properties, constructors, and implemented methods; interfaces (pre-PHP 8) only declare method signatures
- **Abstract class with implemented methods** — mix of abstract and concrete methods
- **Cannot instantiate abstract class** — `new AbstractClass()` causes a fatal error
- **Abstract classes can have constructors** — called via `parent::__construct()` from children
- **Abstract methods can have visibility** — `protected abstract`, `public abstract`

## 💻 Syntax

```php
abstract class AbstractClass {
    // Abstract method — no body, child must implement
    abstract protected function doSomething(): string;
    
    // Concrete method — has implementation
    public function commonMethod(): string {
        return "Common functionality";
    }
    
    // Constructor is allowed
    public function __construct() {
        // initialization
    }
}

class ConcreteClass extends AbstractClass {
    // Must implement all abstract methods
    protected function doSomething(): string {
        return "Concrete implementation";
    }
}
```

## ✅ Example 1 - Basic: Abstract Shape Class

**Problem:** Create an abstract `Shape` class with a concrete method and an abstract method implemented by different shapes.

```php
<?php
abstract class Shape {
    protected string $color;
    
    public function __construct(string $color = "red") {
        $this->color = $color;
    }
    
    // Abstract — each shape calculates area differently
    abstract public function getArea(): float;
    
    // Concrete — shared by all shapes
    public function getDescription(): string {
        return "A {$this->color} " . (new ReflectionClass($this))->getShortName();
    }
}

class Circle extends Shape {
    private float $radius;
    
    public function __construct(float $radius, string $color = "red") {
        parent::__construct($color);
        $this->radius = $radius;
    }
    
    public function getArea(): float {
        return pi() * $this->radius * $this->radius;
    }
}

class Rectangle extends Shape {
    private float $width;
    private float $height;
    
    public function __construct(float $width, float $height, string $color = "red") {
        parent::__construct($color);
        $this->width = $width;
        $this->height = $height;
    }
    
    public function getArea(): float {
        return $this->width * $this->height;
    }
}

$shapes = [
    new Circle(5, "blue"),
    new Rectangle(4, 6, "green")
];

foreach ($shapes as $shape) {
    echo $shape->getDescription() . " area: " . $shape->getArea() . "\n";
}
?>
```

**Output:**
```
A blue Circle area: 78.539816339745
A green Rectangle area: 24
```

**Explanation:** `Shape` is abstract — `new Shape()` would fail. It provides `getDescription()` as concrete shared logic while requiring `getArea()` to be implemented by each subclass. The constructor is shared via `parent::__construct()`.

## 🚀 Example 2 - Intermediate: Abstract Class with Protected Abstract Methods

**Problem:** Create a report generator with common rendering logic and abstract data source methods.

```php
<?php
abstract class ReportGenerator {
    protected string $title;
    
    public function __construct(string $title) {
        $this->title = $title;
    }
    
    // Template method — concrete, uses abstract methods
    public function generate(): string {
        $data = $this->fetchData();
        $processed = $this->processData($data);
        return $this->formatReport($processed);
    }
    
    // Abstract — data source varies
    abstract protected function fetchData(): array;
    
    // Abstract — processing varies
    abstract protected function processData(array $data): array;
    
    // Concrete — shared formatting
    private function formatReport(array $data): string {
        $output = "# {$this->title}\n\n";
        foreach ($data as $key => $value) {
            $output .= "- {$key}: {$value}\n";
        }
        return $output;
    }
}

class SalesReport extends ReportGenerator {
    protected function fetchData(): array {
        // Simulate database query
        return [
            'total_sales' => 50000,
            'orders' => 150,
            'avg_order' => 333.33
        ];
    }
    
    protected function processData(array $data): array {
        $data['tax'] = $data['total_sales'] * 0.1;
        $data['net_sales'] = $data['total_sales'] - $data['tax'];
        return $data;
    }
}

class UserReport extends ReportGenerator {
    protected function fetchData(): array {
        return [
            'active_users' => 1200,
            'new_signups' => 45,
            'churn_rate' => '2.3%'
        ];
    }
    
    protected function processData(array $data): array {
        $data['engagement'] = $data['active_users'] > 1000 ? 'High' : 'Low';
        return $data;
    }
}

$reports = [new SalesReport("Monthly Sales"), new UserReport("User Analytics")];
foreach ($reports as $report) {
    echo $report->generate() . "\n---\n";
}
?>
```

**Output:**
```
# Monthly Sales

- total_sales: 50000
- orders: 150
- avg_order: 333.33
- tax: 5000
- net_sales: 45000

---
# User Analytics

- active_users: 1200
- new_signups: 45
- churn_rate: 2.3%
- engagement: High

---
```

**Explanation:** `ReportGenerator` uses the Template Method pattern — `generate()` is concrete and defines the algorithm structure. `fetchData()` and `processData()` are abstract, letting each report type define its own logic. Protected abstract methods keep the implementation details hidden from external code.

## 🏢 Real World Use Case
Framework base controllers (e.g., Symfony's `AbstractController`) provide concrete methods like `render()`, `redirectToRoute()` while leaving abstract methods like `getSubscribedServices()` for child classes. ORM repositories use abstract base classes with concrete `find()`, `findAll()` and abstract `getEntityClass()`.

```php
abstract class BaseRepository {
    abstract protected function getEntityClass(): string;
    
    public function find(int $id): ?object {
        // concrete implementation using $this->getEntityClass()
    }
}
```

## 🎯 Interview Questions

**1. Can an abstract class have a constructor?**
Yes. Abstract classes can have constructors, which are called by child classes via `parent::__construct()`. This is useful for shared initialization logic.

**2. What happens if a child class doesn't implement all abstract methods?**
The child class itself must be declared `abstract`, or PHP throws a fatal error for missing implementations.

**3. Abstract class vs Interface — when to use which?**
Use abstract classes when classes share state (properties), constructors, or partial implementations. Use interfaces when defining a contract that unrelated classes can implement.

**4. Can abstract methods be `private`?**
No. Abstract methods cannot be `private` because they must be visible to child classes for implementation. They can be `public` or `protected`.

**5. Can you have `final` abstract methods?**
No. The combination is contradictory — `abstract` requires overriding, `final` prevents it.

## ⚠ Common Errors / Mistakes

- **Instantiating an abstract class** — `new AbstractClass()` causes a fatal error.
- **Not implementing all abstract methods** — leads to a fatal error.
- **Making abstract methods `private`** — abstract methods must be visible to children.
- **Declaring abstract methods as `final`** — conflicting modifiers cause a parse error.
- **Overriding a concrete method as abstract** — a child can override a concrete method with a concrete one, but declaring it abstract in a child would require the child to be abstract.

## 📝 Practice Exercises

**Beginner**
1. Create an abstract `Animal` class with an abstract method `makeSound()`. Implement `Dog` and `Cat` classes.
2. Build an abstract `Employee` class with concrete `$name` property and getter, abstract `calculateSalary()`. Implement `FullTimeEmployee` and `PartTimeEmployee`.
3. Create an abstract `Database` class with `abstract connect()` and a concrete `log($message)` method.

**Intermediate**
4. Extend the shape example: add an abstract `getPerimeter()` method to `Shape`. Implement it in `Circle` and `Rectangle`. Add a concrete `printFullInfo()` method that calls both area and perimeter.
5. Build a `NotificationSender` abstract class with a concrete `sendBulk(array $recipients)` method that loops and calls abstract `sendOne(string $recipient)`. Implement `EmailSender` and `SMSSender`.
6. Create a `DataImporter` abstract class with: `abstract parse(string $source): array`, `abstract validate(array $data): bool`, concrete `import(string $source): int` that returns imported row count. Implement `CSVImporter` and `JSONImporter`.

**Advanced**
7. Design a `middleware` pipeline: abstract `Middleware` class with abstract `handle(Request $request, callable $next): Response` and concrete `process(Request $request, array $middlewares): Response`. Implement `AuthMiddleware`, `LoggingMiddleware`, `RateLimitMiddleware`.
8. Build a `Cache` system: abstract `CacheAdapter` with abstract `get(string $key): ?string`, `set(string $key, string $value, int $ttl): void`, `delete(string $key): bool`, and concrete `remember(string $key, callable $callback, int $ttl): string`. Implement `RedisCache` and `FileCache`.
