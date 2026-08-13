## 32. Java `super` Keyword

## 📘 Introduction
The `super` keyword in Java refers to the immediate parent class. It is used to access parent class constructors, methods, and fields, especially when they are hidden or overridden by the subclass.

## 🧠 Key Concepts
- **`super()` for Parent Constructor**: calls the superclass constructor; must be the first statement in a subclass constructor
- **`super.method()` for Parent Method**: calls the overridden method of the parent class
- **`super.variable` for Parent Field**: accesses the parent's field when shadowed by a subclass field
- **`super` in Constructors**: used with or without parameters to initialize inherited state
- **`super` with Multilevel Inheritance**: `super` always refers to the immediate parent, not higher ancestors

## 💻 Syntax
```java
class Parent {
    Parent(int param) { ... }
    void method() { ... }
}

class Child extends Parent {
    Child(int param) {
        super(param);          // call parent constructor
    }

    @Override
    void method() {
        super.method();        // call overridden parent method
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Use `super` to call the parent constructor and access an overridden method.

**Code:**
```java
class Employee {
    String name;
    double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public void work() {
        System.out.println(name + " is working as an employee");
    }
}

class Manager extends Employee {
    double bonus;

    public Manager(String name, double salary, double bonus) {
        super(name, salary);    // call Employee constructor
        this.bonus = bonus;
    }

    @Override
    public void work() {
        super.work();           // call Employee's work()
        System.out.println(name + " is also managing the team");
    }

    public double getTotalCompensation() {
        return salary + bonus;  // salary is inherited
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Manager mgr = new Manager("Alice", 80000, 15000);
        mgr.work();
        System.out.println("Total: $" + mgr.getTotalCompensation());
    }
}
```

**Output:**
```
Alice is working as an employee
Alice is also managing the team
Total: $95000
```

**Explanation:** `super(name, salary)` initializes the parent fields. `super.work()` calls the overridden parent method before adding child-specific behavior.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate `super` with field shadowing and multilevel inheritance.

**Code:**
```java
class Animal {
    String type = "Animal";

    public void display() {
        System.out.println("Type: " + type);
    }
}

class Mammal extends Animal {
    String type = "Mammal";

    @Override
    public void display() {
        System.out.println("Super type: " + super.type);  // accesses Animal.type
        System.out.println("This type: " + this.type);    // accesses Mammal.type
        super.display();  // calls Animal.display()
    }
}

class Dog extends Mammal {
    String type = "Dog";

    @Override
    public void display() {
        System.out.println("Super type: " + super.type);  // accesses Mammal.type (immediate parent)
        System.out.println("This type: " + this.type);    // accesses Dog.type
        super.display();  // calls Mammal.display()
    }
}

public class MultilevelSuperDemo {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.display();
    }
}
```

**Output:**
```
Super type: Mammal
This type: Dog
Super type: Animal
This type: Mammal
Type: Animal
```

**Explanation:** `super` always refers to the immediate parent class. `Dog.super.type` is `Mammal.type`, not `Animal.type`. Method calls cascade up the chain via `super.display()`.

## 🏢 Real World Use Case
- JPA entity base classes: `AbstractEntity` with `id`, `createdAt`, `updatedAt` — subclasses call `super()` and may override `prePersist()` calling `super.prePersist()`
- Custom exception classes: `super(message)` passes the message to `RuntimeException`
- Template Method pattern: abstract class defines the skeleton; subclass calls `super.step()` in overridden methods

## 🎯 Interview Questions

**Q1: What is the purpose of `super()` in Java?**
A: `super()` calls the parent class constructor. It must be the first statement in the subclass constructor. If not written explicitly, the compiler inserts `super()` (calling the no-arg parent constructor).

**Q2: What happens if the parent class has no no-arg constructor?**
A: The subclass must explicitly call `super(param)` with parameters. Otherwise, the compiler shows an error because it cannot insert the implicit `super()`.

**Q3: Can `super` and `this` be used together in a constructor?**
A: No. Both `this()` and `super()` must be the first statement. They cannot coexist in the same constructor.

**Q4: Does `super` chain through all ancestors?**
A: No. `super` always refers to the immediate parent only. Each class calls its own parent's constructor/method/field.

**Q5: Can `super` be used in a static context?**
A: No. `super` requires an instance context. It cannot be used in static methods.

## ⚠ Common Errors / Mistakes
- Forgetting to call `super(param)` when the parent lacks a no-arg constructor
- Using `super` and `this` in the same constructor (both must be first)
- Expecting `super` to traverse beyond the immediate parent
- Using `super` in a static method
- Forgetting that `super()` is inserted implicitly only if the parent has a no-arg constructor

## 📝 Practice Exercises

**Beginner:**
1. Create a `Parent` class with a `display()` method and a `Child` class that overrides it. Use `super.display()` inside the override.
2. Create a `Vehicle` class with a constructor `Vehicle(String brand)`. Create a `Car` subclass that calls `super(brand)`.
3. Create a `Base` class with `int value = 10`. Create a `Derived` class with `int value = 20`. Print both values using `super.value` and `this.value`.

**Intermediate:**
4. Create a 3-level hierarchy: `Person` → `Student` → `GraduateStudent`. Each has a `name` field. Each constructor calls `super()`. Demonstrate field access at each level.
5. Create a class `Logger` with method `log(String msg)`. Create `FileLogger` and `ConsoleLogger` subclasses. Override `log()` and call `super.log()` for common formatting.
6. Create a `Shape` class with `color` field and `describe()` method. Create `Circle extends Shape` with `radius` and an overridden `describe()` that prints both `color` (via super) and `radius`.

**Advanced:**
7. Design a `DatabaseConnection` base class with `connect()`, `disconnect()`, and `isConnected()`. Create `MySQLConnection` and `PostgreSQLConnection` subclasses. Each overrides `connect()` but calls `super.connect()` for connection lifecycle logging.
8. Implement a `ClassInspector` utility that, given a subclass object, reflects on its entire inheritance chain and displays which fields and methods are accessible via `super` at each level.
