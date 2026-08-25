## 23. Java Class Attributes

## 📘 Introduction
Class attributes (fields) define the state of an object or class. Java provides several modifiers and patterns to control how attributes are declared, accessed, and initialized.

## 🧠 Key Concepts
- **Instance Variables**: fields that belong to individual objects; each object has its own copy
- **Class (Static) Variables**: fields shared across all instances; declared with `static`
- **Final Attributes**: cannot be reassigned after initialization (`final`)
- **transient**: excluded when serializing the object
- **volatile**: guarantees visibility of changes across threads
- **Access Modifiers**: `public`, `private`, `protected`, default — control visibility
- **Getter/Setter Methods**: provide controlled access to private fields
- **Attribute Initialization**: default values (0, null, false), inline initialization, constructor initialization, static initializer blocks

## 💻 Syntax
```java
[accessModifier] [static] [final] [transient] [volatile] dataType fieldName [= value];

// Getter/Setter pattern
private Type field;
public Type getField() { return field; }
public void setField(Type value) { this.field = value; }
```

## ✅ Example 1 - Basic

**Problem:** Create a `Student` class with instance, static, and final attributes.

**Code:**
```java
public class Student {
    private String name;          // instance variable
    private final int rollNo;     // final instance variable
    static String schoolName = "Green Valley";  // static variable
    static final int MAX_STUDENTS = 500;        // constant

    public Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    public void display() {
        System.out.println(name + " (Roll: " + rollNo + ") - " + schoolName);
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101);
        Student s2 = new Student("Bob", 102);
        s1.display();
        s2.display();
        System.out.println("Max students: " + Student.MAX_STUDENTS);
    }
}
```

**Output:**
```
Alice (Roll: 101) - Green Valley
Bob (Roll: 102) - Green Valley
Max students: 500
```

**Explanation:** `name` is an instance variable (unique per object). `rollNo` is final (set once in constructor). `schoolName` is static (shared). `MAX_STUDENTS` is a constant.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate attribute initialization, transient/volatile modifiers, and getter/setter validation.

**Code:**
```java
import java.io.*;

public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private transient String password;    // not serialized
    private volatile boolean active;      // thread-safe visibility
    private static int employeeCount = 0; // initialized when class loads

    {
        employeeCount++;  // instance initializer — runs before constructor
    }

    public Employee(String name, String password) {
        this.name = name;
        this.password = password;
        this.active = true;
    }

    public String getName() { return name; }

    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }

    public boolean isActive() { return active; }
    public void deactivate() { this.active = false; }

    public static int getEmployeeCount() { return employeeCount; }
}
```

**Output:** (Conceptual — `password` is null when deserialized; `employeeCount` tracks instances)

**Explanation:** `transient` excludes `password` from serialization. `volatile` ensures `active` changes are visible across threads. Instance initializer increments the static count. Setter validates input.

## 🏢 Real World Use Case
- JPA entities use `transient` for fields that should not persist to the database
- Spring `@Value` fields are effectively final; configuration constants use `static final`
- Thread-safe flags use `volatile` for visibility guarantees

## 🎯 Interview Questions

**Q1: What is the difference between instance variables and static variables?**
A: Instance variables are per-object; each object has its own copy. Static variables are class-level and shared across all instances.

**Q2: What does the `final` keyword mean for a field?**
A: The field can be assigned only once (either inline, in an initializer block, or in the constructor). After that, it cannot be changed.

**Q3: What is a `transient` variable?**
A: A `transient` variable is excluded from serialization. When the object is deserialized, it gets the default value for its type.

**Q4: What is the `volatile` keyword used for?**
A: `volatile` ensures that read/write operations on the variable happen directly from main memory (not CPU cache), guaranteeing visibility across threads.

**Q5: How are fields initialized if no value is assigned?**
A: Numeric types default to 0, `boolean` to `false`, `char` to `'\u0000'`, and object references to `null`.

## ⚠ Common Errors / Mistakes
- Forgetting to initialize a `final` instance variable (compiler error)
- Using `static` variables when instance variables are needed (shared state leaks)
- Expecting `transient` fields to survive serialization
- Reading `volatile` without understanding happens-before guarantees
- Confusing `final` (cannot reassign reference) with immutability (object content can still change)

## 📝 Practice Exercises

**Beginner:**
1. Create a `Counter` class with a `static int count` that increments in the constructor. Create 5 objects and print the final count.
2. Create a `Circle` class with a `final double PI = 3.14159` and a `double radius` instance variable. Add methods for area and circumference.
3. Create a `Configuration` class with a `static final String APP_NAME = "MyApp"` and a `private int version` with getter/setter.

**Intermediate:**
4. Create an `Account` class with `private String accountNumber` (final, set in constructor), `private double balance`, and getters. Add a `static int totalAccounts` counter. Validate that balance never goes negative.
5. Create a `Book` class with `title`, `author` (instance), `static int totalBooks`, and a `transient String reviewNotes`. Show serialization where `reviewNotes` is lost.
6. Create a `TrafficLight` class with a `volatile String color`. Simulate two threads reading and updating the color.

**Advanced:**
7. Implement a `ConfigurationManager` using `static final` constants loaded from a properties file, with `static` initializer blocks.
8. Create a `ThreadSafeCounter` class using `volatile` and `synchronized` methods. Compare its behavior with a plain `int` counter in a multi-threaded scenario.
