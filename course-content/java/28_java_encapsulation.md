## 28. Java Encapsulation

## 📘 Introduction
Encapsulation is the principle of bundling data (fields) and methods (behavior) together while hiding internal state from external access. It is one of the four pillars of OOP and is achieved by making fields private and providing controlled access via public methods.

## 🧠 Key Concepts
- **Private Fields**: restrict direct access from outside the class
- **Public Getters/Setters**: provide controlled access to fields
- **Data Hiding**: internal state is hidden; only necessary operations are exposed
- **Benefits of Encapsulation**: maintainability, flexibility, reusability, security
- **Immutability**: creating objects whose state cannot change after creation (no setters, all fields final)
- **Validation in Setters**: check constraints before modifying state
- **JavaBeans Pattern**: private fields, public no-arg constructor, public getters/setters following naming conventions

## 💻 Syntax
```java
public class EncapsulatedClass {
    private Type field;                    // private field

    public Type getField() {               // getter
        return field;
    }

    public void setField(Type value) {     // setter
        if (/* validation */) {
            this.field = value;
        }
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Create an encapsulated `BankAccount` with validation in setters.

**Code:**
```java
public class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0.0;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdrawal amount");
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC123");
        acc.deposit(1000);
        acc.withdraw(200);
        System.out.println("Balance: " + acc.getBalance());
        // acc.balance = 99999; // Compile error — balance is private
    }
}
```

**Output:**
```
Balance: 800.0
```

**Explanation:** `balance` is private — cannot be accessed directly. All modifications go through `deposit()` and `withdraw()`, which enforce business rules.

## 🚀 Example 2 - Intermediate

**Problem:** Create an immutable `Person` class and demonstrate validation in constructors.

**Code:**
```java
public final class Person {          // final class prevents extension
    private final String name;       // final field — set once
    private final int age;           // final field — set once
    private final String email;      // final field — set once

    public Person(String name, int age, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        this.name = name;
        this.age = age;
        this.email = email;
    }

    // Only getters — no setters
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
}
```

**Output:** (Conceptual — any attempt to violate constraints throws `IllegalArgumentException`)

**Explanation:** This class is immutable: all fields are `final`, the class is `final`, no setters exist, and validation is done in the constructor. Once created, the object state cannot change.

## 🏢 Real World Use Case
- JavaBeans (used in JSP, JSF, and many frameworks) require encapsulation
- JPA entities encapsulate database fields with getters/setters
- Spring `@Service` and `@Component` classes encapsulate business logic
- Value Objects / DTOs in DDD are often immutable

## 🎯 Interview Questions

**Q1: What is encapsulation in Java?**
A: Encapsulation is the mechanism of wrapping data (fields) and code (methods) together and hiding internal state using private fields with public accessor methods.

**Q2: How does encapsulation improve security?**
A: It prevents external code from directly modifying fields. Validation in setters ensures only valid values are assigned.

**Q3: What is the difference between encapsulation and abstraction?**
A: Encapsulation hides data (how it's stored). Abstraction hides implementation details (how it works). Encapsulation is about bundling; abstraction is about hiding complexity.

**Q4: What is an immutable class? How do you create one?**
A: An immutable class cannot be modified after creation. Steps: declare class `final`, make all fields `final` and `private`, provide no setters, and ensure no mutable objects are exposed via getters.

**Q5: What is the JavaBeans naming convention?**
A: For a property `name`, the getter is `getName()` (or `isName()` for boolean) and the setter is `setName()`. The class is `public`, has a no-arg constructor, and implements `Serializable`.

## ⚠ Common Errors / Mistakes
- Making fields `public` (breaks encapsulation)
- Returning mutable object references from getters (caller can modify internal state)
- Forgetting to make defensive copies in constructors and getters for mutable objects
- Providing setters for fields that should be immutable
- Not validating input in setters, allowing invalid state

## 📝 Practice Exercises

**Beginner:**
1. Create an encapsulated `Student` class with private fields `name`, `id`, `grade`. Provide getters and setters. Validate that grade is between 0 and 100.
2. Create a `Circle` class with private `radius` and public getter/setter. Ensure radius cannot be negative.
3. Create a `Temperature` class with private `double celsius`. Provide getter `getCelsius()`, getter `getFahrenheit()`, and setter `setCelsius(double)`.

**Intermediate:**
4. Create an immutable `Book` class with `title`, `author`, `isbn`. Ensure no modifications after creation. Test that the object's state is fixed.
5. Create a `BankAccount` class where `deposit()` and `withdraw()` log each transaction to a private list. Provide `getTransactionHistory()` that returns a copy of the list (defensive copy).
6. Create a `User` class with `password` field. The setter should hash the password before storing. The getter should return only `"***"`.

**Advanced:**
7. Implement an immutable `Order` class containing a `List<OrderItem>` (where `OrderItem` is also immutable). Implement `getItems()` that returns an unmodifiable view.
8. Create a `ConfigurationManager` that reads properties from a file, encapsulates them in private fields, and validates all values at load time. Throw `ConfigurationException` for invalid entries.
