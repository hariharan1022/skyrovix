## 33. Java Inner Classes

## 📘 Introduction
Java allows defining a class inside another class. Inner classes are used to logically group related classes, improve encapsulation, and increase code readability. They have special access to the enclosing class's members.

## 🧠 Key Concepts
- **Member Inner Class**: a non-static class defined at the member level of another class; has access to all members (including private) of the outer class
- **Static Nested Class**: a static class defined inside another class; behaves like a top-level class but is namespaced
- **Local Inner Class**: defined inside a method block; accessible only within that block
- **Anonymous Inner Class**: a class without a name, defined and instantiated in a single expression; used for one-off implementations (especially for interfaces and abstract classes)
- **Accessing Outer Class Members**: inner classes can access outer class fields/methods, including private ones
- **Nested Class Use Cases**: event handlers, iterators, builders, value objects, callbacks

## 💻 Syntax
```java
class Outer {
    // Member inner class
    class Inner { ... }

    // Static nested class
    static class StaticNested { ... }

    void method() {
        // Local inner class
        class Local { ... }
        Local obj = new Local();

        // Anonymous inner class
        Runnable r = new Runnable() {
            @Override public void run() { ... }
        };
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Create an outer class `Library` with a member inner class `Book` and demonstrate access.

**Code:**
```java
public class Library {
    private String libraryName;

    public Library(String name) {
        this.libraryName = name;
    }

    // Member inner class
    class Book {
        private String title;
        private String author;

        public Book(String title, String author) {
            this.title = title;
            this.author = author;
        }

        public void display() {
            System.out.println(title + " by " + author + " — " + libraryName);
        }
    }

    public static void main(String[] args) {
        Library lib = new Library("City Library");
        Book book = lib.new Book("1984", "George Orwell");
        book.display();
    }
}
```

**Output:**
```
1984 by George Orwell — City Library
```

**Explanation:** The inner class `Book` accesses the outer class's private field `libraryName` directly. A member inner class instance is created using `outerObject.new InnerClass()`.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate static nested class, local inner class, and anonymous inner class.

**Code:**
```java
import java.util.ArrayList;
import java.util.List;

public class EventManager {
    private List<String> events = new ArrayList<>();

    // Static nested class
    public static class EventValidator {
        public static boolean isValid(String event) {
            return event != null && !event.trim().isEmpty();
        }
    }

    public void addEvent(String event) {
        // Local inner class
        class TimestampedEvent {
            String event;
            long timestamp;
            TimestampedEvent(String event) {
                this.event = event;
                this.timestamp = System.currentTimeMillis();
            }
            String formatted() {
                return "[" + timestamp + "] " + event;
            }
        }

        if (EventValidator.isValid(event)) {
            TimestampedEvent te = new TimestampedEvent(event);
            events.add(te.formatted());
        }
    }

    public void printEvents() {
        // Anonymous inner class — Runnable
        Runnable printer = new Runnable() {
            @Override
            public void run() {
                for (String e : events) {
                    System.out.println(e);
                }
            }
        };
        printer.run();
    }

    public static void main(String[] args) {
        EventManager mgr = new EventManager();
        mgr.addEvent("Login");
        mgr.addEvent("Logout");
        mgr.addEvent("");
        mgr.printEvents();
    }
}
```

**Output:**
```
[<timestamp>] Login
[<timestamp>] Logout
```

**Explanation:** `EventValidator` is a static nested class (utility). `TimestampedEvent` is a local inner class (only used inside the method). The `Runnable` is an anonymous inner class for a quick one-use implementation.

## 🏢 Real World Use Case
- **HashMap** uses `Node` and `TreeNode` inner classes
- **ArrayList** uses `Itr` (inner class) and `SubList` (inner class)
- **Anonymous inner classes** are common in UI event handlers (Swing, Android) and for implementing functional interfaces before lambdas
- **Builder pattern** often uses a static nested class as the builder

## 🎯 Interview Questions

**Q1: What is the difference between a member inner class and a static nested class?**
A: A member inner class has an implicit reference to the outer class instance and can access all outer class members. A static nested class does not have this reference and can only access static outer members.

**Q2: How do you instantiate a member inner class?**
A: You need an outer class instance: `Outer.Inner obj = outerInstance.new Inner()`.

**Q3: What is an anonymous inner class?**
A: A class without a name defined and instantiated in one expression. It is used for implementing interfaces or extending classes on the fly, often for callbacks or event handlers.

**Q4: Can an inner class have static members?**
A: A member inner class cannot have static declarations (except static final constants). A static nested class can have static members.

**Q5: What is a local inner class and what are its restrictions?**
A: A local inner class is defined inside a method. It can access the method's final or effectively-final local variables. It cannot have access modifiers.

## ⚠ Common Errors / Mistakes
- Creating a member inner class without an outer class instance
- Trying to declare static methods in a non-static inner class
- Accessing a non-final local variable from a local or anonymous inner class (must be effectively final)
- Forgetting the enclosing class reference when accessing shadowed outer class members
- Using an anonymous inner class where a lambda would be cleaner (Java 8+)

## 📝 Practice Exercises

**Beginner:**
1. Create a `University` class with a member inner class `Department`. The inner class should access the university name.
2. Create a `MathUtils` outer class with a static nested class `Factorial` that has a static method `compute(int n)`.
3. Create an anonymous inner class that implements `Runnable` (prints "Hello from anonymous").

**Intermediate:**
4. Create an `Order` class with an inner class `OrderItem` (fields: product, quantity, price). The outer class has `addItem()`, `getTotal()`, and `printOrder()`.
5. Create a class `StringProcessor` with a method `process(String s, StringOperation op)` where `StringOperation` is an interface with `String operate(String)`. Call it with multiple anonymous inner classes (uppercase, reverse, trim).
6. Create a local inner class inside a method that counts how many times the method has been called (use an effectively final counter reference trick with an array).

**Advanced:**
7. Design an `EventBus` class that uses an anonymous inner class for each subscription. Subscribers register with `subscribe(Class<T> eventType, Consumer<T> handler)` — internally wrap the handler in an anonymous `Subscription` object with priority.
8. Implement a generic `Cache<K,V>` using a static nested class `CacheEntry<V>` (with value and expiry time). The cache should support `get`, `put`, `evictExpired`, and use an inner `CleanupThread` as a member inner class.
