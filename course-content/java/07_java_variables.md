## 7. Java Variables

## 📘 Introduction

Variables in Java are containers that store data values. Every variable has a **type** that determines what kind of data it can hold and what operations are allowed. Java is **statically typed** — all variables must be declared with a type before use. Variables can be **primitive** (store actual values) or **reference** (store memory addresses of objects).

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| Primitive types | `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean` |
| Reference types | Classes, interfaces, arrays, enums — store object references |
| Declaration | `type variableName;` — allocates memory for the variable |
| Initialization | `variableName = value;` — first value assignment |
| `final` | Makes a variable a constant — cannot be reassigned |
| `var` (Java 10+) | Local variable type inference — compiler infers the type |

**Naming Conventions:**
- **camelCase** — first word lowercase, subsequent words capitalized: `myVariableName`
- Must start with a letter, `$`, or `_`
- Case-sensitive: `age` and `Age` are different
- No reserved words: `int`, `class`, `static`, etc.

## 💻 Syntax

```java
public class VariableDemo {
    public static void main(String[] args) {
        // Declaration and initialization
        int age = 25;
        double price = 19.99;
        String name = "Alice";
        boolean isActive = true;

        // final constant
        final double TAX_RATE = 0.08;

        // var (local variable inference)
        var message = "Hello, " + name;  // infered as String

        System.out.println(message);
        System.out.println("Total: $" + (price * (1 + TAX_RATE)));
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Declare and initialize variables of different types and print their values.

**Code:**
```java
public class VariableTypes {
    public static void main(String[] args) {
        int studentCount = 30;
        double pi = 3.14159;
        char grade = 'A';
        boolean passed = true;
        String course = "Java Programming";

        System.out.println("Course: " + course);
        System.out.println("Students: " + studentCount);
        System.out.println("Grade: " + grade);
        System.out.println("Passed: " + passed);
        System.out.println("Pi: " + pi);
    }
}
```

**Output:**
```
Course: Java Programming
Students: 30
Grade: A
Passed: true
Pi: 3.14159
```

**Explanation:** Each variable is declared with a specific type. `String` is a reference type (object), while `int`, `double`, `char`, and `boolean` are primitives. The `+` operator concatenates strings with other types.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate `final` constants and `var` type inference.

**Code:**
```java
public class ConstantsAndVar {
    public static void main(String[] args) {
        // Constants
        final int MAX_USERS = 1000;
        final String APP_NAME = "Skyrovix";
        // MAX_USERS = 500;  // ERROR — cannot reassign final

        // var — type inferred at compile time
        var count = 42;              // int
        var greeting = "Hello";      // String
        var price = 9.99;            // double
        var isReady = false;         // boolean

        // var cannot be used for fields, method params, or without initialization
        // var x;                    // ERROR — must initialize

        System.out.println(APP_NAME + " allows " + MAX_USERS + " users");
        System.out.println("count (" + ((Object) count).getClass().getSimpleName() + "): " + count);
        System.out.println("price (" + ((Object) price).getClass().getSimpleName() + "): " + price);
    }
}
```

**Output:**
```
Skyrovix allows 1000 users
count (Integer): 42
price (Double): 9.99
```

**Explanation:** `final` variables must be initialized once and cannot change. `var` lets the compiler infer the type from the initializer. The `+` cast to `Object` then `.getClass()` confirms the inferred types at runtime.

## 🏢 Real World Use Case

**Configuration Constants:** A microservice stores environment configuration using `final static` variables: `DATABASE_URL`, `MAX_CONNECTIONS`, `API_TIMEOUT_MS`. These are set once at startup and remain immutable throughout the application lifecycle, preventing accidental configuration changes during runtime.

## 🎯 Interview Questions

**1. What is the difference between primitive and reference types?**  
Primitives store actual values in stack memory. Reference types store memory addresses (pointers) to objects in heap memory.

**2. Can a `final` variable be reassigned?**  
No. A `final` variable can only be assigned once. Attempting to reassign causes a compile-time error.

**3. What are the limitations of `var`?**  
`var` can only be used for local variables inside methods. It cannot be used for fields, method parameters, or return types. The variable must be initialized at declaration.

**4. What is the default value of a local variable?**  
Local variables have no default value — the compiler will error if used before initialization. Instance and static variables have default values (0, 0.0, false, null).

**5. Why do Java naming conventions use camelCase?**  
camelCase improves readability for multi-word identifiers. It distinguishes variables (`maxValue`) from classes (`MaxValue` — PascalCase) and constants (`MAX_VALUE` — UPPER_SNAKE_CASE).

## ⚠ Common Errors / Mistakes

- **Using uninitialized local variables** — Local variables must be assigned before use
- **Reassigning `final` variables** — Compile error: "cannot assign a value to final variable"
- **Using `var` without initialization** — `var x;` will not compile
- **Naming conflicts with reserved words** — Cannot name a variable `int`, `class`, or `static`
- **Shadowing** — Declaring a variable with the same name in a nested scope hides the outer variable

## 📝 Practice Exercises

**Beginner**
1. Declare variables for your name (String), age (int), height (double), and isStudent (boolean). Print them.
2. Create a `final` constant for `PI = 3.14159` and use it to calculate the area of a circle with radius 5.
3. Use `var` to declare variables storing your favorite book title and a number of pages.

**Intermediate**
4. Write a program that swaps the values of two `int` variables without using a third variable.
5. Create a program that demonstrates variable shadowing — declare a variable `x` in the method and another `x` inside a nested block.
6. Show the compile error when trying to use `var` for a field (not inside a method) or as a method parameter.

**Advanced**
7. Write a program using `var` with a lambda expression and verify the inferred type is a functional interface.
8. Create a program that uses reflection to demonstrate that local variables declared with `var` have their actual (not inferred) type in bytecode.
