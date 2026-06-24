## 43. PHP Classes / Objects

## 📘 Introduction
Classes are the blueprints of OOP in PHP. They define the structure (properties) and behavior (methods) of objects. Objects are runtime instances created from classes using the `new` keyword. PHP supports visibility modifiers (`public`, `private`, `protected`), type hints, and nullable types for robust class definitions.

## 🧠 Key Concepts
- **`class` keyword** — declares a new class
- **`new` keyword** — instantiates an object from a class
- **Properties** — variables declared inside a class with visibility modifiers
- **Methods** — functions defined inside a class
- **`$this`** — refers to the current object instance
- **`->` operator** — accesses properties and methods on an object instance
- **`public`** — accessible from anywhere
- **`private`** — accessible only within the class
- **`protected`** — accessible within the class and child classes
- **Type hinting** — specifying class names or built-in types for parameters and return values
- **Nullable types** — prefix with `?` to allow `null` (e.g., `?string`, `?Car`)

## 💻 Syntax

```php
class ClassName {
    // Properties
    public $prop1;
    private $prop2;
    protected $prop3;
    
    // Methods
    public function methodName($param): returnType {
        $this->prop1 = $param;
    }
}

// Creating instances
$obj = new ClassName();
$obj->prop1 = "value";
$obj->methodName("value");

// Type hinting
function processClass(ClassName $obj): ?string {
    return $obj->methodName("test");
}
```

## ✅ Example 1 - Basic: Defining and Using a User Class

**Problem:** Create a `User` class with public properties and methods, then instantiate and manipulate objects.

```php
<?php
class User {
    public $username;
    public $email;
    private $password;
    
    public function setPassword($password) {
        $this->password = password_hash($password, PASSWORD_DEFAULT);
    }
    
    public function getDisplayName() {
        return $this->username . " (" . $this->email . ")";
    }
}

$user1 = new User();
$user1->username = "alice";
$user1->email = "alice@example.com";
$user1->setPassword("secret123");

$user2 = new User();
$user2->username = "bob";
$user2->email = "bob@example.com";

echo $user1->getDisplayName() . "\n";
echo $user2->getDisplayName() . "\n";
?>
```

**Output:**
```
alice (alice@example.com)
bob (bob@example.com)
```

**Explanation:** Two independent `User` objects each have their own `$username` and `$email`. The `$password` property is `private`, so it can only be set via the `setPassword()` method — enforcing encapsulation. The `$this` keyword refers to whichever object calls the method.

## 🚀 Example 2 - Intermediate: Type Hints and Nullable Types

**Problem:** Build an `Order` and `Customer` system using type hints and nullable types for robust code.

```php
<?php
class Customer {
    public function __construct(
        public string $name,
        public string $email
    ) {}
}

class Order {
    private array $items = [];
    private ?Customer $customer = null;  // nullable type
    
    public function setCustomer(?Customer $customer): void {
        $this->customer = $customer;
    }
    
    public function addItem(string $item): void {
        $this->items[] = $item;
    }
    
    public function getSummary(): string {
        $customerName = $this->customer?->name ?? "Guest";
        return "Order for $customerName: " . implode(", ", $this->items);
    }
}

$customer = new Customer("Alice", "alice@example.com");
$order = new Order();
$order->setCustomer($customer);
$order->addItem("Laptop");
$order->addItem("Mouse");
echo $order->getSummary() . "\n";

// Nullable type in action
$guestOrder = new Order();
$guestOrder->addItem("Keyboard");
echo $guestOrder->getSummary() . "\n";
?>
```

**Output:**
```
Order for Alice: Laptop, Mouse
Order for Guest: Keyboard
```

**Explanation:** `?Customer` allows `null` as a value for the customer property. The `setCustomer()` method accepts either a `Customer` object or `null`. The `?->` nullsafe operator safely accesses properties on nullable objects. Type hints (`string`, `void`) ensure correctness at compile time.

## 🏢 Real World Use Case
A CMS models content as classes: `Article`, `Page`, `Product` extending `Content`. Each class enforces type hints (`?User $author`, `Category $category`). Nullable types handle optional relationships (e.g., a page without a featured image: `?Media $featuredImage`). Controller methods use type-hinted parameters to receive model instances from the router.

## 🎯 Interview Questions

**1. What is the difference between `public`, `private`, and `protected`?**
`public` — accessible from anywhere. `private` — only within the declaring class. `protected` — within the declaring class and child/subclasses.

**2. How does object assignment work in PHP?**
Assigning an object to another variable copies the object identifier (not a deep clone). Both variables point to the same object. Use `clone` to create a shallow copy.

**3. What is a nullable type and how is it declared?**
A nullable type allows a variable to hold either a value of the specified type or `null`. Declared with `?` prefix: `?string`, `?int`, `?MyClass`.

**4. Can you type hint scalar types in PHP?**
Yes. PHP supports `int`, `float`, `string`, `bool`, `array`, `callable`, `iterable`, `object`, `mixed`, `never`, `void`, `null`, `true`, `false`, and class/interface names.

**5. What is the `::class` syntax used for?**
`ClassName::class` returns the fully qualified class name as a string. Useful for dynamic class resolution and dependency injection containers.

## ⚠ Common Errors / Mistakes

- **Accessing `private` properties outside the class** — results in a fatal error; use getter/setter methods.
- **Forgetting `$this->` when accessing properties inside methods** — PHP creates a local variable instead of modifying the property.
- **Assigning objects with `=` instead of `clone`** — both variables reference the same object; modifying one affects the other.
- **Missing semicolons after property declarations** — causes parse errors.
- **Mismatched type hints** — passing wrong types triggers a `TypeError` in strict mode.

## 📝 Practice Exercises

**Beginner**
1. Create a `Product` class with `public $name`, `public $price`, and a `getFormattedPrice()` method. Instantiate three products and display them.
2. Define a `Library` class with a private `$books` array. Add `addBook($title)` and `listBooks()` methods.
3. Create a `Circle` class with a private `$radius` property, a setter `setRadius($radius)`, and a method `getArea()`.

**Intermediate**
4. Build a `Team` and `Player` system where `Team` has a `setCaptain(?Player $player)` method. Use nullable type hints and the nullsafe operator to display captain info.
5. Create an `Invoice` class with type-hinted methods: `setCustomer(Customer $customer)`, `addLine(InvoiceLine $line)`, `getTotal(): float`. Define the supporting classes.
6. Implement an `Event` class with a `DateTimeImmutable $startTime` and a `?DateTimeImmutable $endTime`. Write a method `getDuration()` that handles the nullable end time.

**Advanced**
7. Build a polymorphic `Notification` system: `EmailNotification`, `SMSNotification`, `PushNotification` each extending `Notification` with a `send()` method. Use type hints and nullable recipient fields.
8. Design a `Repository` pattern with `UserRepository` class that uses type hints for `User` objects. Implement `save(User $user): void`, `findById(int $id): ?User`, `delete(User $user): bool`.
