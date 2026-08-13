## 30. Java Inheritance

## 📘 Introduction
Inheritance is an OOP principle that allows a class (subclass) to acquire properties and behavior from another class (superclass). It promotes code reuse, establishes relationships, and enables polymorphism.

## 🧠 Key Concepts
- **`extends` Keyword**: used by a subclass to inherit from a superclass
- **Single Inheritance**: Java supports only single class inheritance (one direct superclass)
- **Superclass and Subclass**: parent and child; subclass IS-A type of superclass
- **`super` Keyword**: refers to the immediate parent class (fields, methods, constructor)
- **Method Overriding**: subclass provides a specific implementation of a superclass method
- **`@Override` Annotation**: indicates a method is overriding a superclass method (compiler checks)
- **`instanceof` Operator**: checks whether an object is an instance of a class or interface
- **`Object` Class**: the root of all Java classes; every class implicitly extends `Object`

## 💻 Syntax
```java
class Parent {
    public void show() { System.out.println("Parent"); }
}

class Child extends Parent {
    @Override
    public void show() { System.out.println("Child"); }
}

// Usage
Parent obj = new Child();
obj.show();                    // "Child" — runtime polymorphism
System.out.println(obj instanceof Child);  // true
```

## ✅ Example 1 - Basic

**Problem:** Create a `Vehicle` superclass and `Car` subclass that inherits and extends its behavior.

**Code:**
```java
class Vehicle {
    String brand;
    int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    public void start() {
        System.out.println(brand + " vehicle is starting");
    }
}

class Car extends Vehicle {
    int doors;

    public Car(String brand, int year, int doors) {
        super(brand, year);    // call superclass constructor
        this.doors = doors;
    }

    @Override
    public void start() {
        super.start();
        System.out.println(brand + " car with " + doors + " doors is ready");
    }

    public void honk() {
        System.out.println("Beep beep!");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Car car = new Car("Toyota", 2022, 4);
        car.start();
        car.honk();
        System.out.println("Is Car a Vehicle? " + (car instanceof Vehicle));
    }
}
```

**Output:**
```
Toyota vehicle is starting
Toyota car with 4 doors is ready
Beep beep!
Is Car a Vehicle? true
```

**Explanation:** `Car` extends `Vehicle`, inheriting `brand`, `year`, and `start()`. It overrides `start()` (calling `super.start()` first) and adds `honk()`. The `super(brand, year)` call initializes the parent fields.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate multilevel inheritance and `instanceof` checks.

**Code:**
```java
class Animal {
    public void eat() { System.out.println("Eating..."); }
}

class Mammal extends Animal {
    public void breathe() { System.out.println("Breathing..."); }
}

class Dog extends Mammal {
    public void bark() { System.out.println("Woof!"); }

    @Override
    public void eat() {
        System.out.println("Dog eating kibble...");
    }
}

public class MultilevelDemo {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();
        dog.breathe();
        dog.bark();

        System.out.println("Dog instanceof Animal: " + (dog instanceof Animal));
        System.out.println("Dog instanceof Mammal: " + (dog instanceof Mammal));
        System.out.println("Dog instanceof Dog: " + (dog instanceof Dog));
        System.out.println("Dog instanceof Object: " + (dog instanceof Object));
    }
}
```

**Output:**
```
Dog eating kibble...
Breathing...
Woof!
Dog instanceof Animal: true
Dog instanceof Mammal: true
Dog instanceof Dog: true
Dog instanceof Object: true
```

**Explanation:** `Dog extends Mammal extends Animal extends Object`. The `Dog` class inherits `breathe()` from `Mammal`, overrides `eat()` from `Animal`, and adds `bark()`. The `instanceof` chain confirms the IS-A relationship at every level.

## 🏢 Real World Use Case
- Abstract base classes in frameworks (e.g., Spring's `AbstractController`, `AbstractBeanFactory`)
- JPA entity inheritance: `@MappedSuperclass`, `@Inheritance(strategy = JOINED/SINGLE_TABLE/TABLE_PER_CLASS)`
- Custom exception classes: `class ValidationException extends RuntimeException`

## 🎯 Interview Questions

**Q1: Does Java support multiple inheritance?**
A: No, Java does not support multiple class inheritance (diamond problem). Multiple inheritance of behavior is achieved through interfaces.

**Q2: What is the `Object` class in Java?**
A: It is the root class of all Java classes. Every class implicitly inherits from `Object`. It provides `equals()`, `hashCode()`, `toString()`, `getClass()`, `clone()`, `finalize()`.

**Q3: What is the difference between method overriding and method hiding?**
A: Overriding applies to instance methods — the method called depends on the object type. Hiding applies to static methods — the method called depends on the reference type.

**Q4: Can we override a `private` method?**
A: No. Private methods are not inherited, so they cannot be overridden. A method with the same name in the subclass is a new method.

**Q5: What is the use of `instanceof` operator?**
A: It tests whether an object is an instance of a specific class, subclass, or interface. It is commonly used before casting.

## ⚠ Common Errors / Mistakes
- Forgetting to call `super()` in a subclass constructor (compiler inserts it implicitly if no-arg exists)
- Trying to override a `final` method or extend a `final` class
- Using `instanceof` excessively instead of polymorphism
- Confusing method overloading (same class) with overriding (subclass)
- Expecting `private` members to be inherited (they are not)

## 📝 Practice Exercises

**Beginner:**
1. Create a superclass `Person` with `name` and `age`. Create a subclass `Student` that adds `studentId`. Override `toString()` in both.
2. Create an `Employee` class with `salary`. Create `Manager` that extends `Employee` and adds `bonus`. Calculate total compensation.
3. Create a class hierarchy: `Shape` → `Circle` and `Rectangle`. Each has an `area()` method.

**Intermediate:**
4. Create an `Appliance` class with `turnOn()`. Create `WashingMachine` and `Refrigerator` subclasses that override `turnOn()` differently. Demonstrate polymorphism by calling `turnOn()` on an `Appliance` reference pointing to each.
5. Create a multilevel hierarchy: `Employee` → `Developer` → `SeniorDeveloper`. `SeniorDeveloper` should override `getSalary()`.
6. Write a program that shows that `static` methods are hidden, not overridden. Create parent and child with the same static method and call it via parent reference.

**Advanced:**
7. Implement a `ClassHierarchyAnalyzer` utility that, given a class name as a string, reflects on its superclass, implemented interfaces, and prints the full inheritance chain up to `Object`.
8. Design a plugin system: `Plugin` (abstract class) → `ImagePlugin`, `AudioPlugin`, `VideoPlugin`. Each plugin has `load()`, `process()`, `save()`. Use a `PluginManager` that loads plugins dynamically and processes files based on extension.
