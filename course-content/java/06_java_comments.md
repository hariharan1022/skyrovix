## 6. Java Comments

## 📘 Introduction

Comments in Java are non-executable text that explains code, documents APIs, or temporarily disables code. Java supports three types: **single-line** (`//`), **multi-line** (`/* */`), and **Javadoc** (`/** */`). Javadoc is a special documentation comment that generates HTML API documentation using the `javadoc` tool.

## 🧠 Key Concepts

| Comment Type | Syntax | Used For |
|-------------|--------|----------|
| Single-line | `// text` | Brief explanations, to-do notes |
| Multi-line | `/* text */` | Longer descriptions, commenting out code blocks |
| Javadoc | `/** text */` | API documentation for classes, methods, fields |

**Javadoc Tags:**
| Tag | Description |
|-----|-------------|
| `@param` | Documents a method parameter |
| `@return` | Documents the return value |
| `@author` | Specifies the author |
| `@version` | Specifies version number |
| `@see` | Reference to another class/method |
| `@throws` / `@exception` | Documents exceptions thrown |
| `@deprecated` | Marks element as deprecated |
| `@since` | Version when element was added |

## 💻 Syntax

```java
/**
 * Calculator provides basic arithmetic operations.
 * This class demonstrates Javadoc documentation.
 *
 * @author John Doe
 * @version 1.0
 * @since 2024-01-15
 */
public class Calculator {

    /**
     * Adds two integers together.
     *
     * @param a the first addend
     * @param b the second addend
     * @return the sum of a and b
     */
    public int add(int a, int b) {
        return a + b;  // single-line comment explaining this line
    }

    /*
     * This multi-line comment block explains
     * that this method is intentionally empty
     * and will be implemented later.
     */
    public void futureFeature() {
        // TODO: implement this
    }
}
```

Generate docs: `javadoc -d docs Calculator.java`

## ✅ Example 1 - Basic

**Problem:** Use all three comment types in a single program.

**Code:**
```java
/**
 * Greeter prints a personalized greeting.
 * @author Alice
 */
public class Greeter {

    /**
     * Prints a greeting message.
     * @param name the person to greet
     */
    public static void greet(String name) {
        // This is a single-line comment
        System.out.println("Hello, " + name + "!");
        /* This multi-line comment spans
           two lines and is not Javadoc */
    }

    public static void main(String[] args) {
        greet("World");  // invoke the greet method
    }
}
```

**Output:**
```
Hello, World!
```

**Explanation:** The Javadoc block (`/** */`) documents the class and method. Single-line (`//`) comments explain the call. Multi-line (`/* */`) contains explanatory text.

## 🚀 Example 2 - Intermediate

**Problem:** Generate HTML documentation from a well-documented utility class.

**Code:**
```java
/**
 * Utility class for string operations.
 *
 * @author Developer
 * @version 2.1
 */
public class StringUtils {

    /**
     * Counts occurrences of a substring in a string.
     *
     * @param str    the string to search in
     * @param sub    the substring to count
     * @return the number of non-overlapping occurrences
     * @throws IllegalArgumentException if either parameter is null
     */
    public static int countOccurrences(String str, String sub) {
        if (str == null || sub == null) {
            throw new IllegalArgumentException("Parameters cannot be null");
        }
        int count = 0;
        int idx = 0;
        while ((idx = str.indexOf(sub, idx)) != -1) {
            count++;
            idx += sub.length();
        }
        return count;
    }

    /**
     * Reverses a string. Uses StringBuilder for efficiency.
     *
     * @param input the string to reverse
     * @return the reversed string
     * @deprecated Use {@link StringBuilder#reverse()} instead
     */
    @Deprecated
    public static String reverse(String input) {
        return new StringBuilder(input).reverse().toString();
    }
}
```

**Command:** `javadoc -d docs -author -version StringUtils.java`

**Output:** Generates `docs/index.html` with formatted API documentation including parameter details, return types, and exception info.

**Explanation:** The `@param`, `@return`, `@throws`, `@deprecated`, and `@see` tags provide rich documentation. The `-author` and `-version` flags include those tags in the output.

## 🏢 Real World Use Case

**Open-Source Library (Apache Commons):** Every public class and method has complete Javadoc with `@param`, `@return`, `@throws`, and usage examples embedded with `{@code}` tags. The Javadoc is auto-generated during the Maven build and published to the project website. This allows developers to use the library without reading source code.

## 🎯 Interview Questions

**1. What is the difference between `/* */` and `/** */`?**  
`/* */` is a regular multi-line comment ignored by the compiler. `/** */` is a Javadoc comment processed by the `javadoc` tool to generate HTML API documentation.

**2. Can comments be nested?**  
No. `/* /* */ */` will fail because the first `*/` closes the outer comment.

**3. What is the purpose of the `@param` tag?**  
`@param` documents a method's parameter — its name and description. There should be one `@param` per parameter.

**4. How do you generate Javadoc from the command line?**  
`javadoc -d outputDir MyClass.java` or `javadoc -d docs src/*.java` for multiple files.

**5. What does the `@deprecated` tag do?**  
It marks an API element as deprecated (no longer recommended). The compiler warns when deprecated code is used, and the Javadoc adds a "Deprecated" notice.

## ⚠ Common Errors / Mistakes

- **Using Javadoc tags (`@param`) in regular `/* */` comments** — The `javadoc` tool only processes `/** */`
- **Nesting `/* */` inside another `/* */`** — Not allowed; the first `*/` ends both
- **Forgetting `*/`** — Everything after `/*` until `*/` is treated as a comment, potentially hiding code
- **Empty Javadoc** — A Javadoc comment with no useful description or tags adds clutter
- **Using `//` inside `/* */`** — This works, but is redundant and confusing

## 📝 Practice Exercises

**Beginner**
1. Write a program with single-line comments explaining each line of code.
2. Create a multi-line comment that describes what your program does, placed at the top of the file.
3. Comment out one line of code using `//` and observe that it no longer executes.

**Intermediate**
4. Write a full Javadoc for a `max(int a, int b)` method with `@param`, `@return`, and `@see Math#max`.
5. Create a class `MathUtils` with Javadoc for the class and three methods. Generate the HTML documentation with `javadoc`.
6. Add `@deprecated` and `@since` tags to an old method in a class and observe the compiler warning.

**Advanced**
7. Write a custom Javadoc doclet (using `jdk.javadoc.doclet` API) that processes Javadoc comments and generates a JSON manifest of all methods and their parameter counts.
8. Create a program that parses Java source files, extracts all Javadoc comments, and prints a summary of all `@param` and `@return` tags found.
