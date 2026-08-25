## 27. Java Modifiers

## 📘 Introduction
Modifiers in Java are keywords that control access level, behavior, and special properties of classes, methods, fields, and other elements. They are broadly divided into access modifiers and non-access modifiers.

## 🧠 Key Concepts
- **Access Modifiers**: control visibility
  - `public`: accessible from anywhere
  - `protected`: accessible within the same package + subclasses
  - `default` (no keyword): accessible only within the same package
  - `private`: accessible only within the same class
- **Non-Access Modifiers**: control behavior
  - `static`: belongs to the class, not instances
  - `final`: cannot be changed (class cannot be subclassed, method cannot be overridden, field cannot be reassigned)
  - `abstract`: incomplete; must be implemented by subclasses
  - `synchronized`: thread-safe; only one thread at a time
  - `volatile`: variable reads/writes directly from main memory
  - `transient`: excluded from serialization
  - `native`: implemented in platform-specific code (non-Java)
  - `strictfp`: ensures consistent floating-point behavior across platforms

## 💻 Syntax
```java
// On a class
[public | protected | private] [abstract | final] class ClassName {}

// On a method
[public | protected | private] [static] [final | abstract] [synchronized] returnType methodName() {}

// On a field
[public | protected | private] [static] [final] [transient] [volatile] Type fieldName;
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate the effect of the four access modifiers on field visibility.

**Code:**
```java
public class AccessDemo {
    public int publicField = 1;
    protected int protectedField = 2;
    int defaultField = 3;          // package-private
    private int privateField = 4;

    public void showAll() {
        System.out.println(publicField);    // accessible
        System.out.println(protectedField); // accessible
        System.out.println(defaultField);   // accessible
        System.out.println(privateField);   // accessible — same class
    }
}

class SubclassSamePackage extends AccessDemo {
    public void show() {
        System.out.println(publicField);
        System.out.println(protectedField);
        System.out.println(defaultField);
        // System.out.println(privateField); // NOT accessible
    }
}
```

**Output:**
```
1
2
3
4
```

**Explanation:** Within the same class, all modifiers are accessible. In a subclass in the same package, `private` is hidden but `public`, `protected`, and `default` are visible.

## 🚀 Example 2 - Intermediate

**Problem:** Use `static`, `final`, `synchronized`, and `transient` modifiers together.

**Code:**
```java
import java.io.*;

public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;  // static + final
    private String name;
    private transient String ssn;                      // not serialized
    private static int employeeCount = 0;              // shared across instances

    public Employee(String name, String ssn) {
        this.name = name;
        this.ssn = ssn;
        employeeCount++;
    }

    public synchronized void updateName(String name) { // thread-safe
        this.name = name;
    }

    public static int getEmployeeCount() {             // static method
        return employeeCount;
    }

    @Override
    public String toString() {
        return name + " (SSN: " + ssn + ")";
    }
}
```

**Output:** (Conceptual — `ssn` is `null` after deserialization; `employeeCount` tracks instances across threads)

**Explanation:** `static final` defines constants. `transient` excludes sensitive data from serialization. `synchronized` prevents concurrent modification. Static methods access only static fields.

## 🏢 Real World Use Case
- `public static final` constants are idiomatic in Java (e.g., `Math.PI`, `Integer.MAX_VALUE`)
- `transient` is used for sensitive or derived fields in JPA entities
- `synchronized` methods are used in thread-safe collections and counters
- `native` is used in JNI calls to C/C++ libraries
- `abstract` classes form the base of frameworks like Spring's `AbstractController`

## 🎯 Interview Questions

**Q1: What is the difference between `default` access and `protected` access?**
A: `default` is accessible only within the same package. `protected` adds access for subclasses even if they are in different packages.

**Q2: Can a class be declared as `final` and `abstract` simultaneously?**
A: No. `final` prevents extension; `abstract` requires extension. They are contradictory.

**Q3: What does the `transient` modifier do?**
A: It marks a field to be excluded from serialization. When the object is deserialized, the field gets its default value.

**Q4: What is the purpose of the `volatile` keyword?**
A: It ensures that variable reads and writes happen directly from main memory, not from CPU caches, preventing visibility issues in multi-threaded code.

**Q5: Can a `private` method be `abstract`?**
A: No. `abstract` methods must be overridden, but `private` methods cannot be accessed or overridden by subclasses.

## ⚠ Common Errors / Mistakes
- Combining conflicting modifiers like `final` and `abstract`
- Forgetting that `default` access is package-private (confusing it with `protected`)
- Using `static` for variables that should be instance-specific
- Declaring a method `private` and `abstract` simultaneously
- Assuming `transient` is relevant outside serialization context

## 📝 Practice Exercises

**Beginner:**
1. Create a class with fields using each access modifier. Try to access them from another class in the same package and a different package.
2. Create a `final` class `MathConstants` with `public static final double PI = 3.14159`. Try to extend it (see the error).
3. Create a class with a `static int counter` incremented in the constructor. Create multiple objects and print the counter.

**Intermediate:**
4. Create a `Configuration` class with `private static final` fields loaded from system properties. Provide `public static` getters.
5. Create an `abstract class Shape` with an `abstract double area()` method and a `concrete` class `Circle` that implements it.
6. Create a class with a `synchronized` method `increment()` that safely increments a shared `int count` from two threads.

**Advanced:**
7. Implement a thread-safe `Singleton` using `volatile` and `synchronized` (double-checked locking pattern).
8. Create a `Serializer` class with `native` method declarations (stubs) for platform-specific serialization, and implement a pure-Java fallback using `transient` fields.
