## 34. Java Abstraction

## 📘 Introduction
Abstraction is an OOP principle that hides implementation details and exposes only essential features. In Java, abstraction is achieved through abstract classes and interfaces. This topic focuses on abstract classes.

## 🧠 Key Concepts
- **Abstract Class**: a class declared with `abstract` that cannot be instantiated; may contain both abstract and concrete methods
- **Abstract Methods**: methods declared without a body; must be implemented by concrete subclasses
- **Concrete Subclasses**: non-abstract classes that extend an abstract class and implement all its abstract methods
- **Abstract vs Interface**: abstract classes can have state (fields), constructors, and concrete methods; interfaces (pre-Java 8) had only abstract methods (Java 8+ adds default/static methods)
- **Abstract Class with Constructors**: constructors are invoked during subclass instantiation via `super()`
- **Template Method Pattern**: an abstract class defines the skeleton of an algorithm; subclasses fill in the details via abstract methods

## 💻 Syntax
```java
abstract class AbstractClass {
    // Abstract method — no body
    abstract returnType methodName();

    // Concrete method
    void concreteMethod() { ... }
}

class ConcreteClass extends AbstractClass {
    @Override
    returnType methodName() { ... }  // must implement
}
```

## ✅ Example 1 - Basic

**Problem:** Create an abstract `Vehicle` class and concrete `Car` and `Bike` subclasses.

**Code:**
```java
abstract class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    // Abstract methods
    public abstract void start();
    public abstract void stop();

    // Concrete method
    public void displayBrand() {
        System.out.println("Brand: " + brand);
    }
}

class Car extends Vehicle {
    public Car(String brand) {
        super(brand);
    }

    @Override
    public void start() {
        System.out.println(brand + " car: Turn key and press brake");
    }

    @Override
    public void stop() {
        System.out.println(brand + " car: Press brake pedal");
    }
}

class Bike extends Vehicle {
    public Bike(String brand) {
        super(brand);
    }

    @Override
    public void start() {
        System.out.println(brand + " bike: Kick start");
    }

    @Override
    public void stop() {
        System.out.println(brand + " bike: Apply brakes");
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        Vehicle v1 = new Car("Toyota");
        Vehicle v2 = new Bike("Hero");
        v1.displayBrand();
        v1.start();
        v1.stop();
        v2.displayBrand();
        v2.start();
        v2.stop();
    }
}
```

**Output:**
```
Brand: Toyota
Toyota car: Turn key and press brake
Toyota car: Press brake pedal
Brand: Hero
Hero bike: Kick start
Hero bike: Apply brakes
```

**Explanation:** `Vehicle` defines the contract (abstract methods) and shared code (concrete methods). Subclasses provide their own implementations.

## 🚀 Example 2 - Intermediate

**Problem:** Implement the Template Method Pattern with an abstract class.

**Code:**
```java
abstract class DataProcessor {
    // Template method — defines the algorithm skeleton
    public final void process() {
        loadData();
        processData();
        saveData();
        cleanup();
    }

    abstract void loadData();
    abstract void processData();

    // Concrete methods
    void saveData() {
        System.out.println("Saving processed data to storage");
    }

    // Hook method — subclasses may override
    void cleanup() {
        System.out.println("Cleaning up resources");
    }
}

class CSVProcessor extends DataProcessor {
    @Override
    void loadData() {
        System.out.println("Loading data from CSV file");
    }

    @Override
    void processData() {
        System.out.println("Parsing CSV rows and transforming");
    }

    @Override
    void cleanup() {
        System.out.println("Closing CSV file handle");
    }
}

class DatabaseProcessor extends DataProcessor {
    @Override
    void loadData() {
        System.out.println("Connecting to database and querying");
    }

    @Override
    void processData() {
        System.out.println("Processing query results");
    }

    // Uses default saveData and cleanup
}

public class TemplateMethodDemo {
    public static void main(String[] args) {
        DataProcessor csv = new CSVProcessor();
        DataProcessor db = new DatabaseProcessor();
        csv.process();
        System.out.println("---");
        db.process();
    }
}
```

**Output:**
```
Loading data from CSV file
Parsing CSV rows and transforming
Saving processed data to storage
Closing CSV file handle
---
Connecting to database and querying
Processing query results
Saving processed data to storage
Cleaning up resources
```

**Explanation:** The `process()` template method defines the algorithm. Subclasses implement the abstract steps and optionally override hooks. This ensures a consistent process flow with customizable steps.

## 🏢 Real World Use Case
- Spring's `AbstractApplicationContext`, `AbstractController`, `AbstractBeanFactory`
- Java's `InputStream`, `OutputStream`, `Reader`, `Writer` are abstract classes
- Template Method is common in frameworks: `AbstractList`, `AbstractSet`, `AbstractMap`

## 🎯 Interview Questions

**Q1: Can you instantiate an abstract class?**
A: No. Abstract classes cannot be instantiated directly. They must be subclassed and the subclass must implement all abstract methods.

**Q2: Can an abstract class have a constructor?**
A: Yes. An abstract class can have constructors that are called via `super()` when a subclass is instantiated.

**Q3: What is the difference between abstract class and interface?**
A: Abstract classes can have state (fields), constructors, and both abstract/concrete methods. Interfaces (pre-Java 8) had only abstract methods. Java 8+ interfaces can have default and static methods.

**Q4: What is the Template Method pattern?**
A: A behavioral design pattern where an abstract class defines the skeleton of an algorithm in a method, deferring some steps to subclasses. Subclasses override abstract methods without changing the algorithm's structure.

**Q5: Can an abstract class have `final` methods?**
A: Yes. An abstract class can have `final` methods. Such methods cannot be overridden by subclasses.

## ⚠ Common Errors / Mistakes
- Trying to create an instance of an abstract class (compile error)
- Forgetting to implement all abstract methods in a concrete subclass
- Declaring an abstract method in a non-abstract class
- Marking a method as both `abstract` and `private` (private methods cannot be overridden)
- Making the template method non-final (subclasses could accidentally override the algorithm)

## 📝 Practice Exercises

**Beginner:**
1. Create an abstract class `Shape` with `abstract double area()`. Create `Circle` and `Rectangle` subclasses.
2. Create an abstract class `Appliance` with `abstract void turnOn()` and concrete `void plugIn()`. Implement `Fan` and `TV`.
3. Create an abstract class `Employee` with `name`, `id`, and `abstract double calculateSalary()`. Create `FullTimeEmployee` and `PartTimeEmployee`.

**Intermediate:**
4. Implement the Template Method pattern for a `ReportGenerator`: `generate()` calls `fetchData()`, `formatData()`, `exportReport()`. Create `PDFReport` and `HTMLReport`.
5. Create an abstract `BankAccount` class with `deposit()`, `withdraw()`, `getBalance()`, and `abstract void applyMonthlyFee()`. Implement `CheckingAccount` and `SavingsAccount`.
6. Create an abstract class `Game` with template method `play()` that calls `initialize()`, `startPlay()`, `endPlay()`. Implement `Cricket` and `Football`.

**Advanced:**
7. Design an abstract `DataExporter` that follows the Template Method pattern: `export()` calls `open()`, `writeHeader()`, `writeBody()`, `writeFooter()`, `close()`. Implement `CSVExporter`, `JSONExporter`, and `XMLExporter`.
8. Create an abstract `PizzaStore` with template method `orderPizza(String type)`. The template calls `createPizza()`, `bake()`, `cut()`, `box()`. Implement `NYPizzaStore` and `ChicagoPizzaStore` with different pizza styles.
