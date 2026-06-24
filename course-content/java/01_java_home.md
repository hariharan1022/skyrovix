## 1. Java HOME

## 📘 Introduction

Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle) in 1995. It is designed to be platform-independent through the Java Virtual Machine (JVM). The slogan "Write Once, Run Anywhere" (WORA) means compiled Java code runs on any device with a JVM. Java powers over 3 billion devices worldwide, from enterprise servers to Android phones.

**Key Editions:**
- **Java SE (Standard Edition)** — Core APIs, JVM, language fundamentals
- **Java EE (Enterprise Edition)** — Web services, servlets, JSP, EJB for large-scale apps
- **Java ME (Micro Edition)** — Embedded systems, mobile devices, IoT

**Why Learn Java?**
- Massive job market for enterprise and Android development
- Strong static typing catches bugs early
- Mature ecosystem with Maven, Spring, Hibernate, JUnit
- Backward compatible — code from 20 years ago still runs
- Active community and extensive documentation

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| JVM | Executes bytecode, provides memory management and garbage collection |
| JRE | JVM + libraries (runtime environment), does not include compiler |
| JDK | JRE + development tools (javac, javadoc, jar) |
| Bytecode | Intermediate representation (.class files) executed by JVM |
| Garbage Collection | Automatic memory management — no manual free/delete |

## 💻 Syntax

```java
// HelloWorld.java — a minimal Java program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}
```

Compile: `javac HelloWorld.java`  
Run: `java HelloWorld`

## ✅ Example 1 - Basic

**Problem:** Print "Hello, World!" to the console.

**Code:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**Output:**
```
Hello, World!
```

**Explanation:** Every Java application needs a `public class` with a `public static void main(String[] args)` method as the entry point. `System.out.println()` prints a line to standard output.

## 🚀 Example 2 - Intermediate

**Problem:** Print the current Java version and demonstrates platform independence.

**Code:**
```java
public class JavaInfo {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("OS Name: " + System.getProperty("os.name"));
        System.out.println("OS Architecture: " + System.getProperty("os.arch"));
        System.out.println("User: " + System.getProperty("user.name"));
    }
}
```

**Output (example on Windows):**
```
Java Version: 17.0.1
Java Vendor: Oracle Corporation
OS Name: Windows 10
OS Architecture: amd64
User: john
```

**Explanation:** `System.getProperty()` reads system properties at runtime. The same bytecode runs unchanged on any OS with a JVM — proving WORA.

## 🏢 Real World Use Case

**Enterprise Banking Application:** A large bank uses Java SE for the core transaction engine and Java EE for web-based banking portals. The JVM's robust garbage collection prevents memory leaks during high-volume trading hours. Platform independence allows deployment on Linux servers while developers work on macOS and Windows.

## 🎯 Interview Questions

**1. What is the difference between JDK, JRE, and JVM?**  
JDK = JRE + development tools (compiler, debugger). JRE = JVM + libraries. JVM executes bytecode and provides memory management.

**2. Explain "Write Once, Run Anywhere" (WORA).**  
Java source is compiled to bytecode (.class), not machine code. The JVM interprets bytecode into native instructions for each platform, so the same .class file runs on any OS with a compatible JVM.

**3. What is the role of the class loader?**  
The class loader dynamically loads .class files into the JVM's method area when they are first referenced. It follows a delegation hierarchy: Bootstrap → Extension → Application class loaders.

**4. Is Java a pure object-oriented language?**  
No. Java has primitive types (int, char, boolean) that are not objects, and static methods belong to the class, not an instance.

**5. What is the latest LTS version of Java?**  
Java 21 (September 2023) is the current LTS release, succeeding Java 17 (LTS). LTS versions receive long-term support — updates for several years.

## ⚠ Common Errors / Mistakes

- **Forgetting the `main` method signature** — Must be exactly `public static void main(String[] args)`
- **Class name mismatch with filename** — A `public class Foo` must be in `Foo.java`
- **Missing semicolons** — Every statement in Java ends with `;`
- **Case sensitivity** — `System` not `system`, `String` not `string`
- **Setting JAVA_HOME incorrectly** — Must point to JDK root, not the `bin` subfolder

## 📝 Practice Exercises

**Beginner**
1. Write a program that prints your name, age, and city to the console.
2. Modify HelloWorld to print "Hello" and "World" on two separate lines.
3. Create a program that prints the current date using `System.getProperty` or `java.time.LocalDate`.

**Intermediate**
4. Write a program that prints all system properties (use `System.getProperties().forEach()`).
5. Create a program that takes the Java version string and prints only the major version number (e.g., "17" from "17.0.1").
6. Write a program that loops 5 times, printing "Java runs everywhere" and the current iteration number.

**Advanced**
7. Write a program that dynamically loads and introspects a class using `Class.forName()` and prints its methods.
8. Create a simple custom class loader that loads a HelloWorld class from a byte array and invokes its main method.
