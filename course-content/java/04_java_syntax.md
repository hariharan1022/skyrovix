## 4. Java Syntax

## 📘 Introduction

Java has a C-style syntax that is clean, strict, and consistent. Every Java program is written inside a **class**, and execution begins in the `main()` method. Statements end with semicolons, code blocks are enclosed in curly braces, and whitespace is ignored but strongly encouraged for readability.

Understanding Java's syntax rules is essential because the compiler is **strict** — missing a semicolon or mismatched brace will prevent compilation.

## 🧠 Key Concepts

| Element | Rule |
|---------|------|
| File name | Must match the `public` class name (`Foo.java` → `public class Foo`) |
| Entry point | `public static void main(String[] args)` — exactly this signature |
| Statements | Each ends with `;` (semicolon) |
| Blocks | Grouped with `{ }` curly braces |
| Indentation | Not required by compiler, but standard is 4 spaces |
| Case sensitivity | `MyClass` and `myclass` are different |

## 💻 Syntax

```java
// File: Example.java — filename matches class name
public class Example {              // opening brace

    public static void main(String[] args) {
        System.out.println("Hello");    // statement ends with ;
        System.out.println("World");
    }                               // closing brace

}                                   // class closing brace
```

## ✅ Example 1 - Basic

**Problem:** Write a program that demonstrates statement ordering and code blocks.

**Code:**
```java
public class OrderDemo {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;
        if (x < y) {
            System.out.println("x is less than y");
        }
        System.out.println("Program finished");
    }
}
```

**Output:**
```
x is less than y
Program finished
```

**Explanation:** The `if` block uses `{}` to group multiple statements. Statements execute top-to-bottom. The indentation inside the block improves readability.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate nested blocks and variable scoping with proper syntax.

**Code:**
```java
public class ScopeDemo {
    static int classVar = 100;          // class-level scope

    public static void main(String[] args) {
        int methodVar = 50;             // method-level scope
        System.out.println("Class var: " + classVar);
        System.out.println("Method var: " + methodVar);

        {                               // inner block
            int blockVar = 30;
            System.out.println("Block var: " + blockVar);
            System.out.println("Can access method var: " + methodVar);
        }
        // System.out.println(blockVar); // ERROR — blockVar out of scope
    }
}
```

**Output:**
```
Class var: 100
Method var: 50
Block var: 30
Can access method var: 50
```

**Explanation:** Variables declared inside a block `{}` are scoped to that block. Inner blocks can access outer variables, but not vice versa.

## 🏢 Real World Use Case

**Code Review Standards:** A team enforces Java syntax conventions in a Spring Boot project: 4-space indentation, opening braces on the same line (K&R style), one statement per line, and file names matching public class names. These rules are enforced with Checkstyle and integrated into CI.

## 🎯 Interview Questions

**1. What happens if you forget a semicolon?**  
The compiler produces an error: `';' expected`. Java does not infer semicolons like JavaScript.

**2. Can a Java file have more than one class?**  
Yes, but only one can be `public`. The public class name must match the filename.

**3. What is the significance of `String[] args`?**  
It receives command-line arguments as an array of strings. The name `args` is conventional but not required.

**4. Is Java a compiled or interpreted language?**  
Both. `javac` compiles source to bytecode, then the JVM interprets (or JIT-compiles) bytecode to native instructions at runtime.

**5. What is the `void` keyword in `main`?**  
It specifies that the `main` method returns nothing to the operating system.

## ⚠ Common Errors / Mistakes

- **Class and filename mismatch** — `public class Foo` must be in `Foo.java`
- **Main method misspelled** — Must be `main`, not `Main` or `mian`
- **Missing `static` in main** — JVM cannot call a non-static method without an object
- **Brace mismatch** — Every `{` must have a matching `}`
- **Using `\` instead of `/` in package imports** — Java packages use dots: `import java.util.*;`

## 📝 Practice Exercises

**Beginner**
1. Write a program that declares three integer variables, assigns values, and prints them in reverse order.
2. Create a class with a method that takes a string parameter and prints it. Call the method from `main`.
3. Write a program with an `if-else` block inside the `main` method that checks whether 15 is even or odd.

**Intermediate**
4. Create a class with a static variable `counter`, increment it in the main method inside an inner block, then try to access a variable declared inside the block after the block ends — observe the compile error.
5. Write a program that demonstrates that `public class` name must match filename — create a class where they differ and show the compile error.
6. Write a program with a nested class (inner class) and access its fields from the outer class main method.

**Advanced**
7. Create a program with three levels of nested blocks. Declare variables with the same name at different levels and demonstrate shadowing — explain the output.
8. Write a program that shows the difference between declaring a class as `public` vs package-private (no modifier) across two files in the same directory.
