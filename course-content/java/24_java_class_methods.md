## 24. Java Class Methods

## 📘 Introduction
Class methods define the behavior of objects and classes. They can be instance methods (operating on objects) or static methods (operating at class level). Patterns like getters/setters, method chaining, and utility classes all rely on proper method design.

## 🧠 Key Concepts
- **Instance Methods**: require an object; can access instance fields and call other instance/static methods
- **Static Methods**: belong to the class; cannot access instance fields directly; called via `ClassName.method()`
- **Accessor (Getter) and Mutator (Setter) Pattern**: controlled access to private fields
- **Method Chaining with `this`**: returning `this` from a setter allows fluent calls like `obj.setX(1).setY(2)`
- **Helper Methods**: private methods that support public ones (encapsulate repeated logic)
- **Utility Classes**: classes with only static methods and a private constructor (e.g., `Math`, `Collections`)

## 💻 Syntax
```java
// Instance method
public returnType methodName() { ... }

// Static method
public static returnType methodName() { ... }

// Method chaining
public ClassName setField(Type value) {
    this.field = value;
    return this;
}
```

## ✅ Example 1 - Basic

**Problem:** Create a `Calculator` utility class with static methods and demonstrate getter/setter in another class.

**Code:**
```java
class MathUtils {  // utility class
    private MathUtils() {}  // prevent instantiation

    public static int add(int a, int b) { return a + b; }
    public static int multiply(int a, int b) { return a * b; }
}

public class Person {
    private String name;
    private int age;

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }

    public void setAge(int age) {
        if (age >= 0) this.age = age;
    }

    public static void main(String[] args) {
        Person p = new Person();
        p.setName("Alice");
        p.setAge(25);
        System.out.println(p.getName() + " is " + p.getAge() + " years old");
        System.out.println("Sum: " + MathUtils.add(10, 20));
    }
}
```

**Output:**
```
Alice is 25 years old
Sum: 30
```

**Explanation:** `Person` uses instance methods (getters/setters). `MathUtils` has static methods and a private constructor (utility class pattern).

## 🚀 Example 2 - Intermediate

**Problem:** Use method chaining with `this` return and demonstrate helper methods.

**Code:**
```java
public class StringBuilder {
    private String data = "";

    public StringBuilder append(String str) {
        data += str;
        return this;          // enables chaining
    }

    public StringBuilder append(int num) {
        data += num;
        return this;
    }

    private void validateNotEmpty() {   // helper method
        if (data.isEmpty()) {
            throw new IllegalStateException("String is empty");
        }
    }

    public String build() {
        validateNotEmpty();
        return data;
    }

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        String result = sb.append("Hello")
                           .append(", ")
                           .append("World")
                           .append(123)
                           .build();
        System.out.println(result);
    }
}
```

**Output:**
```
Hello, World123
```

**Explanation:** `append` returns `this`, enabling fluent method chaining. The private `validateNotEmpty()` is a helper that encapsulates validation logic.

## 🏢 Real World Use Case
- Spring Boot: `@Service` classes have instance methods for business logic
- `Collections.sort()`, `Math.max()` are static utility methods
- Lombok's `@Data` generates getters/setters; manual getter/setter patterns are still common for validation
- Builder pattern (`StringBuilder`, `Stream.Builder`) uses method chaining

## 🎯 Interview Questions

**Q1: What is the difference between instance methods and static methods?**
A: Instance methods require an object and can access instance fields. Static methods belong to the class, cannot access instance fields directly, and are called on the class itself.

**Q2: Can a static method call a non-static method?**
A: Not directly — it must use an object reference to call an instance method.

**Q3: What is method chaining and how is it implemented?**
A: Method chaining allows calling multiple methods sequentially on the same object. It is implemented by returning `this` from setter/modifier methods.

**Q4: What is a utility class?**
A: A class with only static methods and a private constructor to prevent instantiation (e.g., `Math`, `Arrays`, `Collections`).

**Q5: Can you override a static method?**
A: No, static methods are hidden, not overridden. The method called depends on the reference type, not the object type.

## ⚠ Common Errors / Mistakes
- Calling an instance method without an object from a static context
- Forgetting to return `this` when attempting method chaining
- Making utility classes instantiable (missing private constructor)
- Declaring utility methods as instance methods when they don't need object state
- Confusing method hiding (static) with overriding (instance)

## 📝 Practice Exercises

**Beginner:**
1. Create a `Circle` class with getter/setter for `radius` and instance methods `area()` and `circumference()`.
2. Create a static utility method `isEven(int n)` in a class `NumberUtils` with a private constructor.
3. Create an `Employee` class with instance methods `getName()` and `setName(String)`. Demonstrate them.

**Intermediate:**
4. Create a `FluentQuery` class with method chaining: `select("name").from("users").where("age > 18").build()`. Each method returns `this`.
5. Create a `TemperatureConverter` utility class with static methods `celsiusToFahrenheit`, `fahrenheitToCelsius`, and a private constructor.
6. Create a `BankAccount` class with a private helper method `validateAmount(double amount)` that is called by `deposit()` and `withdraw()`.

**Advanced:**
7. Implement a `StreamBuilder<T>` class that mimics Java streams: `filter(Predicate<T>)`, `map(Function<T,R>)`, `collect(Collector)` using method chaining and supports both eager and lazy evaluation.
8. Create an `EventBus` class with static methods `publish(Event e)` and `subscribe(Class<T> type, Consumer<T> handler)`, with instance helper methods internally.
