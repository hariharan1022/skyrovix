## 21. Java Classes (OOP)

## 📘 Introduction
Classes are the blueprint for objects in Java. Object-Oriented Programming (OOP) organizes code around objects and data rather than functions and logic. Java is fundamentally built on classes and objects.

## 🧠 Key Concepts
- **OOP Principles**: Encapsulation, Inheritance, Polymorphism, Abstraction
- **Class Declaration**: defines fields, methods, and constructors
- **Fields**: instance variables that hold the state of an object
- **Methods**: define behavior
- **Constructors**: special methods called when creating an object
- **Creating Objects with `new`**: allocates memory and calls constructor
- **Access Modifiers**: `public` (anywhere), `private` (same class), `protected` (package + subclasses), `default` (package)
- **`this` Keyword**: refers to the current object instance

## 💻 Syntax
```java
[accessModifier] class ClassName {
    // fields
    // constructors
    // methods
}

// Creating an object
ClassName obj = new ClassName();
```

## ✅ Example 1 - Basic

**Problem:** Create a simple `Car` class with fields, a constructor, and a method.

**Code:**
```java
public class Car {
    String brand;
    int year;

    public Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void displayInfo() {
        System.out.println(brand + " (" + year + ")");
    }

    public static void main(String[] args) {
        Car myCar = new Car("Toyota", 2022);
        myCar.displayInfo();
    }
}
```

**Output:**
```
Toyota (2022)
```

**Explanation:** The `Car` class has two fields, a constructor that initializes them, and a method that prints the car's info. The `new` keyword creates an instance.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate encapsulation with private fields, public getters/setters, and different access modifiers.

**Code:**
```java
public class BankAccount {
    private String accountNumber;
    private double balance;
    public String bankName = "National Bank";

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
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
        }
    }

    void displayBankName() {  // default access — package-private
        System.out.println("Bank: " + bankName);
    }
}
```

**Output:** (No main method shown; used by other classes in the same package)

**Explanation:** `accountNumber` and `balance` are private, accessible only through public methods. `bankName` is public. `displayBankName()` has default (package-private) access.

## 🏢 Real World Use Case
- Every Spring Boot application revolves around classes: `@Controller`, `@Service`, `@Repository`, `@Entity`
- DTOs (Data Transfer Objects), domain models, and configuration classes are all classes
- JavaBeans follow strict class conventions: no-arg constructor, private fields, public getters/setters

## 🎯 Interview Questions

**Q1: What is a class in Java?**
A: A class is a blueprint that defines the state (fields) and behavior (methods) that objects of that class will have.

**Q2: What is the difference between a class and an object?**
A: A class is a template; an object is an instance of that template. The class defines structure; the object holds actual data.

**Q3: What are the four pillars of OOP?**
A: Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (many forms), Abstraction (hiding complexity).

**Q4: What is the default access modifier in Java?**
A: Default (package-private) — accessible only within the same package. No keyword is used; it is the absence of `public`, `private`, or `protected`.

**Q5: Can a class be declared as private?**
A: A top-level class cannot be private (only public or default). A nested (inner) class can be private.

## ⚠ Common Errors / Mistakes
- Forgetting to use `new` when creating an object (causes compile error)
- Declaring fields as `public` when they should be `private` for encapsulation
- Confusing class name with file name (public class must match the file name)
- Using `this` in a static context
- Incorrect access modifier placement

## 📝 Practice Exercises

**Beginner:**
1. Create a `Book` class with fields `title`, `author`, and `price`. Add a constructor and a method `printDetails()`.
2. Create a `Student` class with private fields `name` and `grade`. Provide public getters and setters.
3. Create a `Rectangle` class with `length` and `width`, a constructor, and a method `calculateArea()`.

**Intermediate:**
4. Create a `Library` class that contains an array of `Book` objects. Add methods `addBook(Book b)` and `listBooks()`.
5. Create a `Circle` class with a `private` radius field, a constant `PI = 3.14159`, and methods `area()` and `circumference()`.
6. Create an `Employee` class with private fields, a parameterized constructor, and a `displayEmployee()` method. Demonstrate creating 3 employees.

**Advanced:**
7. Design a `Playlist` class that internally maintains a `List<Song>`. Each `Song` has `title`, `artist`, `duration`. Add methods to add, remove, shuffle, and calculate total duration.
8. Implement a `ShoppingCart` class where each item is an `Item` object (with `name`, `price`, `quantity`). Include methods to add/remove items, calculate total, and apply a discount coupon.
