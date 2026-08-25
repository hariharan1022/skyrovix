## 37. Java Enum

## 📘 Introduction
An enum (enumeration) in Java is a special data type that defines a fixed set of named constants. Enums are type-safe, can have fields, constructors, and methods, and are widely used for representing fixed collections like days, directions, states, or configurations.

## 🧠 Key Concepts
- **enum keyword** — Declares an enum type: `enum Color { RED, GREEN, BLUE }`
- **Constants** — Enum instances are implicitly `public static final`
- **ordinal()** — Returns the zero-based position of the enum constant
- **values()** — Returns an array of all enum constants
- **valueOf(String)** — Returns the enum constant matching the given name
- **Enum with fields/constructors/methods** — Enums can have state and behavior
- **EnumMap** — A `Map` implementation with enum keys (very efficient)
- **EnumSet** — A `Set` implementation for enum elements (bit-vector based)
- **switch with enum** — Enums can be used directly in `switch` statements

## 💻 Syntax
```java
// Simple enum
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

// Enum with fields, constructor, and methods
enum Status {
    PENDING(0), PROCESSING(1), COMPLETED(2), FAILED(-1);

    private int code;

    Status(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Define an enum `Season` with constants for the four seasons. Use `values()`, `ordinal()`, and `valueOf()` to demonstrate iteration, index, and lookup.

**Code:**
```java
enum Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

public class Main {
    public static void main(String[] args) {
        for (Season s : Season.values()) {
            System.out.println(s + " at ordinal " + s.ordinal());
        }

        Season season = Season.valueOf("SUMMER");
        System.out.println("Found: " + season);
    }
}
```

**Output:**
```
SPRING at ordinal 0
SUMMER at ordinal 1
AUTUMN at ordinal 2
WINTER at ordinal 3
Found: SUMMER
```

**Explanation:** `values()` returns all constants in declaration order. `ordinal()` returns their index. `valueOf()` converts a string to the corresponding enum constant.

## 🚀 Example 2 - Intermediate

**Problem:** Create an enum `Planet` with mass and radius fields, a constructor, and a method to compute surface gravity and weight.

**Code:**
```java
enum Planet {
    MERCURY(3.303e23, 2.4397e6),
    VENUS(4.869e24, 6.0518e6),
    EARTH(5.976e24, 6.37814e6),
    MARS(6.421e23, 3.3972e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double surfaceGravity() {
        return 6.67430e-11 * mass / (radius * radius);
    }

    public double surfaceWeight(double mass) {
        return mass * surfaceGravity();
    }
}

public class Main {
    public static void main(String[] args) {
        double earthWeight = 70;
        double mass = earthWeight / Planet.EARTH.surfaceGravity();

        for (Planet p : Planet.values()) {
            System.out.printf("Weight on %s: %.2f N%n", p, p.surfaceWeight(mass));
        }
    }
}
```

**Output:**
```
Weight on MERCURY: 26.44 N
Weight on VENUS: 63.39 N
Weight on EARTH: 70.00 N
Weight on MARS: 26.54 N
```

**Explanation:** Each enum constant has its own `mass` and `radius` passed via the constructor. Instance methods access these fields per-constant.

## 🏢 Real World Use Case
A payment processing system uses an enum `PaymentStatus` with states `PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`. Each state has a code and a method `canRetry()`. A `Map<PaymentStatus, List<Transaction>>` groups transactions efficiently.

## 🎯 Interview Questions

**1. Can enums have abstract methods?**
Yes, each enum constant can provide its own implementation of an abstract method defined in the enum.

**2. How is EnumMap different from HashMap?**
EnumMap is optimized for enum keys — it uses an array internally, is faster than HashMap, and maintains the natural order of enum constants. It does not allow null keys.

**3. Can enum implement an interface?**
Yes, an enum can implement one or more interfaces.

**4. What is the difference between ordinal() and compareTo() on enums?**
`ordinal()` returns the zero-based index. `compareTo()` compares enums by their ordinal values. Both rely on declaration order.

**5. Can you extend an enum?**
No, enums implicitly extend `java.lang.Enum` and cannot be subclassed. The `final` keyword is implicit in enum declarations.

## ⚠ Common Errors / Mistakes
- Using `==` instead of `.equals()` for enum comparison — both work, but `==` is preferred for enums
- Forgetting that enum constructors must be `private` (implicitly, but explicit is clearer)
- Calling `valueOf()` with an invalid name throws `IllegalArgumentException`
- Using `ordinal()` for business logic — order can change if constants are rearranged

## 📝 Practice Exercises

**Beginner:**
1. Create an enum `TrafficLight` with constants `RED`, `YELLOW`, `GREEN`. Write a method `getDuration()` that returns seconds for each light.
2. Define an enum `Grade` with `A`, `B`, `C`, `D`, `F`. Use `values()` to print each grade and its ordinal.
3. Write a program that uses `switch` with an enum `Size` (SMALL, MEDIUM, LARGE, XLARGE) to print the price of each size.

**Intermediate:**
4. Create an enum `Operation` with constants `PLUS`, `MINUS`, `TIMES`, `DIVIDE`. Each constant implements an abstract method `double apply(double x, double y)`.
5. Use `EnumMap` to store and retrieve `Salary` brackets for each `EmployeeLevel` (JUNIOR, MID, SENIOR, LEAD).
6. Write an enum `Day` and use `EnumSet` to represent weekdays and weekends. Check membership and perform set operations.

**Advanced:**
7. Design a state machine using enum for a `DocumentWorkflow` with states `DRAFT`, `REVIEW`, `APPROVED`, `REJECTED`. Each state defines allowed transitions to other states.
8. Create a configurable enum `DatabaseConfig` where each constant (`MYSQL`, `POSTGRES`, `ORACLE`) holds a JDBC URL pattern, driver class, and a method to connect.
