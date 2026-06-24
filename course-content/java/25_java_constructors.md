## 25. Java Constructors

## 📘 Introduction
Constructors are special methods that initialize objects when they are created. They have the same name as the class, no return type, and are invoked with the `new` keyword. Java provides flexible constructor mechanisms including chaining and overloading.

## 🧠 Key Concepts
- **Default Constructor**: provided automatically if no constructor is defined; no-arg, zero initialization
- **Parameterized Constructor**: accepts arguments to initialize fields with specific values
- **Constructor Overloading**: multiple constructors with different parameter lists
- **`this()` for Constructor Chaining**: calling one constructor from another within the same class
- **Copy Constructor**: creates a new object by copying fields from an existing object
- **Private Constructor**: prevents external instantiation; used in singleton and utility classes

## 💻 Syntax
```java
class ClassName {
    // Default (implicit if none defined)
    public ClassName() {}

    // Parameterized
    public ClassName(Type param1, Type param2) { ... }

    // Constructor chaining
    public ClassName() { this(defaultValue1, defaultValue2); }
    public ClassName(Type param1, Type param2) { ... }

    // Copy constructor
    public ClassName(ClassName other) { this.field = other.field; }

    // Private constructor
    private ClassName() {}
}
```

## ✅ Example 1 - Basic

**Problem:** Create a `Book` class with default, parameterized, and copy constructors.

**Code:**
```java
public class Book {
    String title;
    String author;
    double price;

    // Default constructor
    public Book() {
        this.title = "Unknown";
        this.author = "Unknown";
        this.price = 0.0;
    }

    // Parameterized constructor
    public Book(String title, String author, double price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    // Copy constructor
    public Book(Book other) {
        this.title = other.title;
        this.author = other.author;
        this.price = other.price;
    }

    public void display() {
        System.out.println(title + " by " + author + " - $" + price);
    }

    public static void main(String[] args) {
        Book b1 = new Book();
        Book b2 = new Book("1984", "George Orwell", 9.99);
        Book b3 = new Book(b2);
        b1.display();
        b2.display();
        b3.display();
        System.out.println("b2 == b3: " + (b2 == b3));
    }
}
```

**Output:**
```
Unknown by Unknown - $0.0
1984 by George Orwell - $9.99
1984 by George Orwell - $9.99
b2 == b3: false
```

**Explanation:** The default constructor sets fallback values. The parameterized constructor sets all fields. The copy constructor creates a new object with the same values as `b2` but as a distinct object.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate constructor chaining with `this()` and a private constructor for a singleton.

**Code:**
```java
public class Employee {
    private String name;
    private int id;
    private String department;
    private static Employee instance;

    // Private constructor for singleton
    private Employee() {
        this("Unknown", 0, "General");
    }

    // Chained constructor
    public Employee(String name, int id) {
        this(name, id, "General");  // calls the 3-param constructor
    }

    public Employee(String name, int id, String department) {
        this.name = name;
        this.id = id;
        this.department = department;
    }

    // Singleton getter
    public static Employee getDefaultInstance() {
        if (instance == null) {
            instance = new Employee();
        }
        return instance;
    }

    public void display() {
        System.out.println(name + " (ID: " + id + ") - " + department);
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Alice", 101);
        Employee e2 = new Employee("Bob", 102, "Engineering");
        Employee def = Employee.getDefaultInstance();
        e1.display();
        e2.display();
        def.display();
    }
}
```

**Output:**
```
Alice (ID: 101) - General
Bob (ID: 102) - Engineering
Unknown (ID: 0) - General
```

**Explanation:** The 2-parameter constructor chains to the 3-parameter one via `this(name, id, "General")`. The private no-arg constructor with `this("Unknown", 0, "General")` is used by the singleton pattern.

## 🏢 Real World Use Case
- JPA entities require a no-arg constructor (default or explicit) for Hibernate proxying
- DTOs often have multiple constructors for different creation scenarios
- Singleton classes (e.g., `Runtime.getRuntime()`, database connection pools) use private constructors
- Builder pattern constructors often chain to a master constructor

## 🎯 Interview Questions

**Q1: Does Java provide a default constructor if we define a parameterized constructor?**
A: No. If you define any constructor, the default no-arg constructor is not provided. You must declare it explicitly if needed.

**Q2: Can a constructor be private?**
A: Yes. Private constructors prevent external instantiation and are used in singleton, factory, and utility class patterns.

**Q3: What is constructor chaining?**
A: Calling one constructor from another using `this(...)`. It must be the first statement in the constructor.

**Q4: What is a copy constructor?**
A: A constructor that takes an instance of the same class and copies its fields into the new object, creating a distinct copy.

**Q5: Can constructors be inherited?**
A: No. Constructors are not members of a class and cannot be inherited. Subclasses can call superclass constructors via `super()`.

## ⚠ Common Errors / Mistakes
- Forgetting to declare a no-arg constructor when a parameterized one exists (breaks frameworks like JPA)
- Calling `this()` after another statement (must be the first line)
- Creating infinite recursion in constructor chaining (`this()` calling itself)
- Assuming the default constructor initializes fields to meaningful values (it sets defaults: 0, null, false)
- Making a constructor `void` (it becomes a regular method)

## 📝 Practice Exercises

**Beginner:**
1. Create a `Rectangle` class with a no-arg constructor (sets length=1, width=1) and a parameterized constructor (length, width).
2. Create a `Student` class with a constructor that initializes `name` and `rollNumber`. Show how the default constructor is NOT available.
3. Create a `Point` class (x, y) with a copy constructor and demonstrate that modifying the copy does not affect the original.

**Intermediate:**
4. Create a `DatabaseConfig` singleton with a private constructor and a `getInstance()` method. Ensure thread safety.
5. Create an `Order` class with three constructors chained via `this()`: `(int orderId)`, `(int orderId, String customer)`, `(int orderId, String customer, double amount)`.
6. Create a `Vehicle` class with a constructor that validates that `year` is not in the future and `speed` is non-negative. Throw `IllegalArgumentException` for invalid data.

**Advanced:**
7. Implement a `Builder` class for an `EmailMessage` object (to, from, subject, body, cc, bcc, attachments). Use constructor chaining internally.
8. Create a `ShapeFactory` class with a private constructor and static factory methods `createCircle(double radius)`, `createRectangle(double l, double w)`, each returning the appropriate `Shape` subclass instance.
