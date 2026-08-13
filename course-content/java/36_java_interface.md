## 36. Java Interface

## 📘 Introduction
An interface in Java is a reference type that defines a contract of abstract methods, default methods, and static methods that implementing classes must fulfill. Interfaces enable abstraction, loose coupling, and multiple inheritance of behavior.

## 🧠 Key Concepts
- **interface keyword** — Declares an interface (e.g., `interface Animal { }`)
- **implements** — A class uses this keyword to adopt an interface
- **Abstract methods** — Methods without a body (implicitly `public abstract`)
- **Default methods (Java 8+)** — Methods with a body using `default` keyword; subclasses can override
- **Static methods in interface** — Utility methods belonging to the interface (not inherited)
- **Functional interface** — Interface with exactly one abstract method; annotated `@FunctionalInterface`
- **Marker interface** — Empty interface (e.g., `Serializable`, `Cloneable`)
- **Multiple interface inheritance** — A class can implement multiple interfaces

## 💻 Syntax
```java
// Declaring an interface
interface InterfaceName {
    // abstract method
    void abstractMethod();

    // default method (Java 8+)
    default void defaultMethod() {
        System.out.println("Default implementation");
    }

    // static method (Java 8+)
    static void staticMethod() {
        System.out.println("Static method in interface");
    }
}

// Implementing an interface
class MyClass implements InterfaceName {
    @Override
    public void abstractMethod() {
        System.out.println("Implemented abstract method");
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Define an interface `Drawable` with an abstract method `draw()`. Create two classes `Circle` and `Rectangle` that implement it.

**Code:**
```java
interface Drawable {
    void draw();
}

class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Rectangle implements Drawable {
    public void draw() {
        System.out.println("Drawing a rectangle");
    }
}

public class Main {
    public static void main(String[] args) {
        Drawable d1 = new Circle();
        Drawable d2 = new Rectangle();
        d1.draw();
        d2.draw();
    }
}
```

**Output:**
```
Drawing a circle
Drawing a rectangle
```

**Explanation:** Both `Circle` and `Rectangle` implement the `Drawable` interface and provide their own `draw()` implementation. The interface reference type allows polymorphic behavior.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate multiple interface inheritance with default and static methods.

**Code:**
```java
interface Printer {
    default void print() {
        System.out.println("Printing from Printer");
    }
}

interface Scanner {
    default void scan() {
        System.out.println("Scanning from Scanner");
    }

    static void powerOff() {
        System.out.println("Powering off device");
    }
}

class AllInOne implements Printer, Scanner {
    // No conflict — both interfaces have different default methods
}

@FunctionalInterface
interface Calculator {
    int operate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        AllInOne device = new AllInOne();
        device.print();
        device.scan();
        Scanner.powerOff();

        Calculator add = (a, b) -> a + b;
        System.out.println("Sum: " + add.operate(10, 5));
    }
}
```

**Output:**
```
Printing from Printer
Scanning from Scanner
Powering off device
Sum: 15
```

**Explanation:** `AllInOne` implements both interfaces. Static method `powerOff()` is called via the interface name. The functional interface `Calculator` is used with a lambda expression.

## 🏢 Real World Use Case
JDBC API uses interfaces extensively — `Connection`, `Statement`, `ResultSet` are interfaces. Database vendors provide their implementations (drivers), allowing applications to switch databases without code changes.

## 🎯 Interview Questions

**1. Can an interface have a constructor?**
No, interfaces cannot have constructors because they cannot be instantiated directly.

**2. What is the difference between abstract class and interface?**
Abstract classes can have instance variables, constructors, and concrete methods; interfaces (pre-Java 8) had only abstract methods. Java 8+ interfaces support default and static methods. A class can extend only one abstract class but implement multiple interfaces.

**3. Can a class implement multiple interfaces with the same default method?**
Yes, but the class must override the conflicting default method to resolve the ambiguity.

**4. What is a functional interface?**
An interface with exactly one abstract method, optionally annotated with `@FunctionalInterface`. It can be used as a lambda expression target (e.g., `Runnable`, `Comparator`, `Consumer`).

**5. What is a marker interface and give examples?**
A marker interface has no methods or fields. It signals a capability to the JVM or framework. Examples: `Serializable`, `Cloneable`, `Remote`.

## ⚠ Common Errors / Mistakes
- Forgetting to mark implementing methods as `public` (interface methods are implicitly public)
- Trying to instantiate an interface directly with `new`
- Using `@FunctionalInterface` on an interface with more than one abstract method (compiler error)
- Assuming default methods are optional — implementing classes inherit them automatically

## 📝 Practice Exercises

**Beginner:**
1. Create an interface `Playable` with method `play()`. Implement it in classes `Guitar` and `Piano`.
2. Write an interface `Flyable` with `fly()` and default method `glide()`. Create a class `Bird` that implements it.
3. Create a marker interface `Loggable`. Annotate a class `Transaction` with it. Use `instanceof` to check and log.

**Intermediate:**
4. Create interfaces `Readable` and `Writable` each with a default method `open()`. Implement both in a class and resolve the conflict.
5. Write a functional interface `StringTransformer` with method `String transform(String s)`. Use it with lambdas to convert strings to uppercase and reverse.
6. Create an interface `SortStrategy` with method `void sort(int[] arr)`. Implement `BubbleSort` and `QuickSort` classes. Use them interchangeably.

**Advanced:**
7. Design a plugin system using an interface `Plugin` with methods `void init()`, `void execute()`, `void shutdown()`. Load and run plugins using `ServiceLoader`.
8. Implement a multiple-inheritance-safe `Vehicle` system using interfaces where `Car`, `Boat`, and `AmphibiousVehicle` share behaviors through default methods.
