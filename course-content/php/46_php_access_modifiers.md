## 46. PHP Access Modifiers

## 📘 Introduction
Access modifiers control the visibility of class properties and methods. They are the foundation of encapsulation — hiding internal state and exposing only what is necessary. PHP provides `public`, `private`, and `protected` modifiers, along with `readonly` (PHP 8.1+) for immutable properties.

## 🧠 Key Concepts
- **`public`** — accessible from anywhere (inside class, child classes, and external code)
- **`private`** — accessible only within the declaring class; not visible to child classes
- **`protected`** — accessible within the declaring class and child classes; not visible externally
- **Getter/Setter pattern** — expose `private`/`protected` properties through controlled public methods
- **Readonly properties** (`PHP 8.1+`) — can be set once (in constructor) and never modified; can be `public readonly`
- **Visibility in interfaces** — interface methods must be `public` (PHP 8.0+ allows `mixed` but conceptually public)
- **`readonly` cannot be combined with `private set`** — but can be `public readonly`, `protected readonly`, or `private readonly`

## 💻 Syntax

```php
class MyClass {
    public $publicProp;        // accessible everywhere
    private $privateProp;      // only in this class
    protected $protectedProp;  // this class and children
    
    public function getPrivate(): string {
        return $this->privateProp;  // OK
    }
    
    private function helper(): void {
        // internal only
    }
    
    protected function internalMethod(): void {
        // this class and children
    }
}

// Readonly property
class Config {
    public function __construct(
        public readonly string $apiKey
    ) {}
}
```

## ✅ Example 1 - Basic: Encapsulation with Getter/Setter

**Problem:** Create a `BankAccount` class that protects the balance with proper access control.

```php
<?php
class BankAccount {
    private float $balance = 0;
    private string $accountNumber;
    
    public function __construct(string $accountNumber, float $initialBalance = 0) {
        $this->accountNumber = $accountNumber;
        $this->balance = $initialBalance;
    }
    
    // Getter
    public function getBalance(): float {
        return $this->balance;
    }
    
    public function getAccountNumber(): string {
        return $this->accountNumber;
    }
    
    // Controlled mutation
    public function deposit(float $amount): void {
        if ($amount <= 0) {
            throw new InvalidArgumentException("Amount must be positive");
        }
        $this->balance += $amount;
    }
    
    public function withdraw(float $amount): bool {
        if ($amount > $this->balance) {
            return false;
        }
        $this->balance -= $amount;
        return true;
    }
}

$account = new BankAccount("ACC-123", 1000);
$account->deposit(500);
$account->withdraw(200);
echo "Balance: " . $account->getBalance() . "\n";  // 1300
// echo $account->balance;  // Fatal error: private
?>
```

**Output:**
```
Balance: 1300
```

**Explanation:** `$balance` and `$accountNumber` are `private` — external code cannot read or modify them directly. All interactions go through public methods (`deposit()`, `withdraw()`, `getBalance()`), which enforce business rules (e.g., no negative deposits).

## 🚀 Example 2 - Intermediate: Protected Members and Inheritance

**Problem:** Demonstrate `protected` and `private` behavior in a class hierarchy.

```php
<?php
class Employee {
    private string $ssn = "XXX-XX-XXXX";   // private - not inherited
    protected string $name;                  // protected - accessible in children
    public string $department;               // public - accessible everywhere
    
    public function __construct(string $name, string $department) {
        $this->name = $name;
        $this->department = $department;
    }
    
    public function getSSN(): string {
        return $this->ssn;
    }
    
    protected function getRole(): string {
        return "Employee";
    }
    
    public function getInfo(): string {
        return "{$this->name} ({$this->getRole()}) - {$this->department}";
    }
}

class Manager extends Employee {
    private array $team = [];
    
    public function addTeamMember(string $name): void {
        $this->team[] = $name;
    }
    
    protected function getRole(): string {
        return "Manager";
    }
    
    public function getTeamInfo(): string {
        // Can access $this->name (protected) but NOT $this->ssn (private)
        return "{$this->name} manages: " . implode(", ", $this->team);
    }
}

$emp = new Manager("Alice", "Engineering");
$emp->addTeamMember("Bob");
$emp->addTeamMember("Charlie");
echo $emp->getInfo() . "\n";
echo $emp->getTeamInfo() . "\n";
echo "Department: {$emp->department}\n";  // public is accessible
?>
```

**Output:**
```
Alice (Manager) - Engineering
Alice manages: Bob, Charlie
Department: Engineering
```

**Explanation:** `$name` is `protected`, so `Manager` can access it directly. `$ssn` is `private` — `Manager` cannot access it; only `Employee`'s own methods can. The `getRole()` method is overridden in `Manager` while keeping `protected` visibility.

## 🏢 Real World Use Case
A framework's base `Model` class uses `protected` properties for data that child models need (`$fillable`, `$table`, `$timestamps`). Sensitive fields like `$hidden` are `protected` too. The `User` model accesses `$this->fillable` but external controllers must use public methods like `User::find()`. Modern DTOs use `public readonly` promoted properties for immutable data transfer.

## 🎯 Interview Questions

**1. What is the difference between `private` and `protected`?**
`private` members are only accessible within the declaring class. `protected` members are also accessible in child/subclasses. Neither is accessible from outside the class.

**2. Can you override a `private` method in a child class?**
Technically yes — the child can define a method with the same name, but it is a new method, not an override. The parent's `private` method is invisible to the child. Use `protected` if overriding is intended.

**3. What are readonly properties and what access modifiers can they use?**
Readonly properties (PHP 8.1+) can be set once, typically in the constructor. They can be `public readonly`, `protected readonly`, or `private readonly`. A `public readonly` property is readable externally but immutable after construction.

**4. Can interface methods have access modifiers other than public?**
Interface methods are implicitly `public`. Adding any other visibility modifier causes a fatal error. PHP 8.0+ allows `mixed` return type but conceptually all interface methods are public.

**5. How do getters and setters support encapsulation?**
Getters provide controlled read access to private/properties (e.g., formatting, validation). Setters allow controlled write access with validation. This means internal representation can change without breaking external code.

## ⚠ Common Errors / Mistakes

- **Declaring properties without visibility** — in PHP 8+, this is deprecated; always declare `public`, `private`, or `protected`.
- **Accessing `private` properties from child classes** — results in a fatal error; use `protected` if children need access.
- **Making all properties `public`** — breaks encapsulation and leads to tight coupling.
- **Forgetting that `readonly` prevents modification** — trying to set a readonly property after construction causes an error.
- **Using `var` for properties** — old PHP 4 style; use explicit visibility modifiers instead.

## 📝 Practice Exercises

**Beginner**
1. Create a `Person` class with private `$name` and `$age`. Write public getters and a public `setAge()` that validates age is between 0 and 150.
2. Build a `Counter` class with a private `$count` property. Provide `increment()`, `decrement()`, and `getCount()` methods.
3. Create a `Temperature` class with a private `$celsius` property, getter `getFahrenheit()`, and setter `setFahrenheit($f)` that converts internally.

**Intermediate**
4. Create a `Document` base class with `protected $content`. Extend with `PDFDocument` and `HTMLDocument` that each override a `protected renderBody()` method. External code calls a `public render()` method.
5. Build a `User` class hierarchy: `BaseUser` (protected `$email`, `$password`), `AdminUser` (adds private `$role`). Demonstrate what each level can access.
6. Create a `readonly` DTO class `OrderDTO` with promoted `public readonly int $id`, `public readonly string $customerName`, `public readonly float $total`. Attempt to modify a property after construction to see the error.

**Advanced**
7. Implement a `Proxy` pattern: `RealSubject` has private data. `Proxy` class with same public interface controls access. The `Proxy` checks permissions before delegating to `RealSubject`. Use protected methods for internal validation.
8. Design an entity system with `protected $attributes` array. All entities extend a base `Entity` class. Use `__get` and `__set` magic methods to provide public access to protected attributes with type filtering.
