## 29. Java Packages / API

## 📘 Introduction
Packages in Java organize classes into namespaces, preventing naming conflicts and enabling modular code organization. Java provides a rich set of built-in packages (the Java API) for almost every programming need.

## 🧠 Key Concepts
- **`package` Keyword**: declares which package a class belongs to; must be the first statement in the file
- **`import` Statement**: brings classes from other packages into scope
- **Fully Qualified Names**: the complete path including the package (e.g., `java.util.ArrayList`)
- **Built-in Packages**:
  - `java.lang` — automatically imported (`String`, `Math`, `System`, `Object`, `Thread`)
  - `java.util` — collections, date/time, random, scanner
  - `java.io` — input/output streams, file handling
  - `java.net` — networking (sockets, URLs)
  - `java.sql` — database connectivity
  - `java.time` — modern date/time API (Java 8+)
- **Creating Custom Packages**: organize your own classes
- **Package Naming Conventions**: reverse domain name (e.g., `com.company.project.module`)

## 💻 Syntax
```java
// File: com/mycompany/util/Helper.java
package com.mycompany.util;

import java.util.List;
import java.util.ArrayList;

public class Helper {
    public static void printAll(List<String> items) {
        for (String item : items) System.out.println(item);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Use built-in `java.util` classes (`ArrayList`, `Scanner`) and `java.time` classes.

**Code:**
```java
import java.util.ArrayList;
import java.util.Scanner;
import java.time.LocalDate;

public class PackageDemo {
    public static void main(String[] args) {
        // java.util.ArrayList
        ArrayList<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        System.out.println("Names: " + names);

        // java.util.Scanner
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String input = sc.nextLine();
        System.out.println("Hello, " + input + "!");

        // java.time.LocalDate
        LocalDate today = LocalDate.now();
        System.out.println("Today's date: " + today);
        sc.close();
    }
}
```

**Output:**
```
Names: [Alice, Bob]
Enter your name: Harry
Hello, Harry!
Today's date: 2026-06-23
```

**Explanation:** `ArrayList`, `Scanner`, and `LocalDate` are imported from their respective packages. They are used without needing fully qualified names thanks to `import`.

## 🚀 Example 2 - Intermediate

**Problem:** Create a custom package structure with two classes and demonstrate cross-package access.

**Code:**
```java
// File: com/skyrovix/util/StringUtils.java
package com.skyrovix.util;

public class StringUtils {
    public static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
```

```java
// File: com/skyrovix/app/Main.java
package com.skyrovix.app;

import com.skyrovix.util.StringUtils;
// import static import
import static java.lang.Math.*;

public class Main {
    public static void main(String[] args) {
        String reversed = StringUtils.reverse("Hello World");
        System.out.println("Reversed: " + reversed);
        System.out.println("PI: " + PI);
        System.out.println("Square root: " + sqrt(16));
    }
}
```

**Compile and run:**
```
javac com/skyrovix/util/StringUtils.java com/skyrovix/app/Main.java
java com.skyrovix.app.Main
```

**Output:**
```
Reversed: dlroW olleH
PI: 3.141592653589793
Square root: 4.0
```

**Explanation:** Classes in different packages are imported. Static import (`import static`) allows using `PI` and `sqrt()` without `Math.` prefix.

## 🏢 Real World Use Case
- Spring Boot projects use package structure: `com.company.project.controller`, `.service`, `.repository`, `.entity`, `.dto`
- `java.util.stream`, `java.util.function` for functional programming
- `java.nio.file` for modern file I/O (replacing `java.io.File`)
- `java.net.http` for HTTP clients (Java 11+)

## 🎯 Interview Questions

**Q1: What is the difference between `import` and `package`?**
A: `package` declares which package the current class belongs to. `import` brings external classes into scope so you can use unqualified names.

**Q2: What package is automatically imported in every Java file?**
A: `java.lang.*` is automatically imported. Classes like `String`, `System`, `Math`, `Integer` are always available.

**Q3: What is the naming convention for Java packages?**
A: Reverse domain name: `com.company.project.module`. All lowercase, separated by dots.

**Q4: Can a class have two `package` statements?**
A: No. A Java file can have only one `package` statement, and it must be the first non-comment line.

**Q5: What is a fully qualified class name?**
A: The package name followed by the class name, e.g., `java.util.ArrayList`. It is used when an `import` is not present.

## ⚠ Common Errors / Mistakes
- Forgetting the `package` statement when creating custom packages
- Using `import` with `*` unnecessarily (causes ambiguity)
- Assuming classes in the same package need explicit import (they don't)
- Package name not matching the directory structure (compiler error)
- Using `import` for `java.lang` classes (unnecessary)

## 📝 Practice Exercises

**Beginner:**
1. Write a program that uses `java.util.Random` to generate 5 random numbers between 1 and 100.
2. Write a program that uses `java.io.File` to list files in the current directory.
3. Write a program that uses `java.time.LocalTime` to print the current time.

**Intermediate:**
4. Create a custom package `com.skyrovix.utils` with a class `Calculator` (add, subtract, multiply, divide). Then create a `Main` class in a different package that imports and uses it.
5. Use `java.util.stream.Collectors` and `java.util.stream.Stream` to process a list of integers: filter even numbers, square them, and collect to a list.
6. Create a class `com.skyrovix.data.User` (fields: id, name) and `com.skyrovix.data.UserRepository` with a method `findAll()` that returns a list of users. Create a main class in yet another package.

**Advanced:**
7. Create a multi-module package structure: `com.skyrovix.core` (base interfaces), `com.skyrovix.io` (file operations), `com.skyrovix.net` (network ops). Each module depends on `core`. Demonstrate compilation and usage.
8. Write a custom classloader that loads classes from a specific package dynamically at runtime, bypassing the default classpath.
