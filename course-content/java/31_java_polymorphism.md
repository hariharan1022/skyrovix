## 31. Java Polymorphism

## 📘 Introduction
Polymorphism (many forms) allows objects of different types to respond to the same method call in different ways. Java supports compile-time polymorphism (method overloading) and runtime polymorphism (method overriding).

## 🧠 Key Concepts
- **Compile-Time Polymorphism**: method overloading — resolved at compile time based on method signature
- **Runtime Polymorphism**: method overriding — resolved at runtime based on the actual object type
- **Dynamic Method Dispatch**: the JVM determines which overridden method to call at runtime
- **Virtual Method Invocation**: Java always calls the overridden method of the actual object, not the reference type
- **Polymorphic Parameters**: a method parameter of a superclass type accepts any subclass object
- **`instanceof` Checking**: verifies the actual type before casting

## 💻 Syntax
```java
// Compile-time polymorphism (overloading)
class Calc {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

// Runtime polymorphism (overriding)
class Animal { void sound() { System.out.println("..."); } }
class Dog extends Animal { @Override void sound() { System.out.println("Woof"); } }
class Cat extends Animal { @Override void sound() { System.out.println("Meow"); } }

// Polymorphic parameter
void makeSound(Animal a) { a.sound(); }
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate runtime polymorphism with an animal hierarchy.

**Code:**
```java
class Animal {
    public void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks: Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Cat meows: Meow!");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        Animal a3 = new Animal();

        a1.sound();  // Dog's sound
        a2.sound();  // Cat's sound
        a3.sound();  // Animal's sound
    }
}
```

**Output:**
```
Dog barks: Woof!
Cat meows: Meow!
Animal makes a sound
```

**Explanation:** All variables are of type `Animal`, but the JVM calls the overridden method based on the actual object type (Dog, Cat, Animal). This is dynamic method dispatch.

## 🚀 Example 2 - Intermediate

**Problem:** Use polymorphic parameters and arrays to process different shapes.

**Code:**
```java
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;
    Circle(double r) { this.radius = r; }
    @Override double area() { return Math.PI * radius * radius; }
}

class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

public class ShapeProcessor {
    // Polymorphic parameter — accepts any Shape subclass
    public static void printArea(Shape s) {
        System.out.println("Area: " + s.area());
    }

    public static void main(String[] args) {
        Shape[] shapes = { new Circle(5), new Rectangle(4, 6) };

        for (Shape s : shapes) {
            printArea(s);
            if (s instanceof Circle) {
                System.out.println("  -> It's a circle!");
            }
        }
    }
}
```

**Output:**
```
Area: 78.53981633974483
  -> It's a circle!
Area: 24.0
  -> It's a rectangle!
```

**Explanation:** `printArea(Shape s)` accepts any `Shape` subclass. The array of `Shape` holds different concrete types. `instanceof` checks the actual runtime type.

## 🏢 Real World Use Case
- Spring's `ApplicationContext.getBean(Class<T>)` returns polymorphic beans
- Collections: `List<String>` reference vs `ArrayList<String>` actual type
- Strategy pattern: `PaymentStrategy` interface with `CreditCard`, `PayPal` implementations
- Java Streams: `Stream<T>` with polymorphic operations

## 🎯 Interview Questions

**Q1: What is the difference between compile-time and runtime polymorphism?**
A: Compile-time (overloading) is resolved by the compiler based on method signature. Runtime (overriding) is resolved by the JVM based on the actual object type.

**Q2: What is dynamic method dispatch?**
A: It is the mechanism by which the JVM determines which overridden method to call at runtime based on the actual object type, not the reference type.

**Q3: Can polymorphism work with static methods?**
A: No. Static methods are resolved at compile time (method hiding), not runtime. The method called depends on the reference type.

**Q4: What is a polymorphic parameter?**
A: A method parameter of a supertype (class or interface) that can accept arguments of any subtype. Example: `void process(Animal a)` accepts `Dog`, `Cat`, etc.

**Q5: Can you achieve polymorphism without inheritance?**
A: Not with method overriding. But you can use interfaces (contract-based polymorphism) which is still a form of inheritance (interface implementation).

## ⚠ Common Errors / Mistakes
- Forgetting `@Override` annotation (method may accidentally overload instead of override)
- Confusing object type with reference type when calling methods
- Assuming polymorphism works with static methods or private methods
- Using `instanceof` too often instead of relying on polymorphism
- Trying to call subclass-specific methods on a superclass reference without casting

## 📝 Practice Exercises

**Beginner:**
1. Create a class `Payment` with a method `pay()`. Create `CreditCardPayment` and `PayPalPayment` that override `pay()`. Demonstrate polymorphism.
2. Create an interface `Playable` with a method `play()`. Implement it in `Song` and `Video` classes. Use a polymorphic `Playable` reference.
3. Overload a method `display` with `int`, `String`, and `double` versions. Call all three.

**Intermediate:**
4. Create an `Employee` abstract class with `getBonus()`. Implement `Manager`, `Developer`, `Intern` subclasses. Process polymorphically in a list.
5. Write a method `handleFeed(Animal a)` that calls `a.eat()`. Create `Dog`, `Cat`, `Lion` animals with different eat behaviors. Demonstrate polymorphic behavior.
6. Create a `MediaPlayer` class that takes a `Media` interface. Implement `AudioMedia` and `VideoMedia`. The player calls `play()` polymorphically.

**Advanced:**
7. Implement the Strategy Pattern: `CompressionStrategy` interface with `zipCompress()`, `rarCompress()`, `gzipCompress()` implementations. A `CompressionContext` uses a polymorphic strategy.
8. Design a `ReportGenerator` that accepts a `DataSource` interface (with `fetchData()`). Implement `DatabaseDataSource`, `APIDataSource`, `FileDataSource`. Generate reports polymorphically without knowing the source type.
