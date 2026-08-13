## 2. Java Introduction

## 📘 Introduction

Java was created by **James Gosling** at Sun Microsystems in 1991 (released 1995). Originally called "Oak", it was designed for interactive television but pivoted to internet programming. Java became the first mainstream language with built-in support for networking, security, and platform independence.

**OOP Principles in Java:**
- **Encapsulation** — Bundling data and methods; hiding internal state via `private` fields
- **Inheritance** — Creating new classes from existing ones using `extends`
- **Polymorphism** — Same method name with different behavior (overloading/overriding)
- **Abstraction** — Hiding implementation details via `abstract` classes and `interface`

**Platform Independence:** Compilation produces bytecode, which the JVM interprets or JIT-compiles to native code at runtime. No recompilation needed across platforms.

## 🧠 Key Concepts

| Feature | Java | Python | C++ |
|---------|------|--------|-----|
| Typing | Static, strong | Dynamic, strong | Static, strong |
| Memory | Garbage collected | Garbage collected | Manual (new/delete) |
| Compilation | Compiled to bytecode | Interpreted | Compiled to native |
| Performance | Fast (JIT) | Moderate | Very fast |
| Learning Curve | Moderate | Easy | Steep |
| Multiple Inheritance | Via interfaces | Supported | Supported |

## 💻 Syntax

```java
// Simple class demonstrating OOP
public class Dog extends Animal implements Pet {
    private String name;                // encapsulation

    public Dog(String name) {           // constructor
        this.name = name;
    }

    @Override
    public void speak() {               // polymorphism
        System.out.println(name + " says Woof!");
    }

    public static void main(String[] args) {
        Animal a = new Dog("Rex");      // upcasting
        a.speak();
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Create a simple class with fields, constructor, and a method.

**Code:**
```java
public class Car {
    String brand;
    int year;

    Car(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    void displayInfo() {
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

**Explanation:** Shows encapsulation — `Car` bundles state (brand, year) and behavior (displayInfo). The constructor initializes object state. `this` refers to the current instance.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate polymorphism using an interface and two implementing classes.

**Code:**
```java
interface Shape {
    double area();
}

class Circle implements Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    public double area() { return Math.PI * radius * radius; }
}

class Rectangle implements Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(3), new Rectangle(4, 5) };
        for (Shape s : shapes) {
            System.out.println(s.getClass().getSimpleName() + " area: " + s.area());
        }
    }
}
```

**Output:**
```
Circle area: 28.274333882308138
Rectangle area: 20.0
```

**Explanation:** The `Shape` interface defines a contract. Both `Circle` and `Rectangle` provide their own `area()` implementation. The loop treats all shapes uniformly — this is polymorphism.

## 🏢 Real World Use Case

**E-commerce Platform (Amazon-style):** Products are modeled with inheritance (`Electronics extends Product`, `Clothing extends Product`). The `Checkout` interface has implementations for `CreditCardCheckout`, `PayPalCheckout`, and `UPICheckout` — all interchangeable through polymorphism. Encapsulation ensures order totals can only be modified through validated methods.

## 🎯 Interview Questions

**1. What are the four pillars of OOP?**  
Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (many forms), Abstraction (hiding complexity).

**2. How does Java achieve platform independence?**  
Java source compiles to bytecode (.class). The JVM translates bytecode to native machine instructions. Each platform has its own JVM, but bytecode is universal.

**3. What is the difference between method overloading and overriding?**  
Overloading: same name, different params, compile-time polymorphism. Overriding: subclass redefines parent method, runtime polymorphism.

**4. Why does Java not support multiple inheritance of classes?**  
To avoid the Diamond Problem (ambiguity when two parent classes define the same method). Multiple inheritance is possible via interfaces.

**5. Compare Java and C++ memory management.**  
C++ uses manual memory management (new/delete) — prone to leaks and dangling pointers. Java uses automatic garbage collection — the JVM reclaims unreferenced objects.

## ⚠ Common Errors / Mistakes

- **Confusing `==` with `.equals()`** — `==` compares references; `.equals()` compares logical content
- **Forgetting `@Override`** — Can cause accidental overloading instead of overriding
- **Static methods accessing instance variables** — Static methods cannot use `this`
- **Constructor return type** — Constructors have NO return type, not even `void`
- **Shadowing fields** — Parameter names matching field names without `this`

## 📝 Practice Exercises

**Beginner**
1. Create a `Book` class with title, author, and year. Add a method to print the details.
2. Write a `Person` class with `name` and `age`. Create two Person objects and print the older person's name.
3. Create a program with a `Calculator` class that has overloaded `add` methods for int, double, and three parameters.

**Intermediate**
4. Implement an interface `Playable` with method `play()`. Create `Music` and `Video` classes that implement it with different behaviors.
5. Create an abstract class `Vehicle` with abstract method `move()`. Extend it with `Car` and `Bicycle`, each implementing `move()` differently.
6. Write a program demonstrating method overriding — create an `Employee` parent class and `Manager` subclass that overrides a `calculateBonus()` method.

**Advanced**
7. Implement a simple banking system using OOP principles: abstract `Account` class with `SavingsAccount` and `CurrentAccount` subclasses, each with different interest/overdraft rules.
8. Design a plugin system using an interface where plugins are loaded via `ServiceLoader` and executed polymorphically.
