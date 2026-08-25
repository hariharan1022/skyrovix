## 5. Java Output

## 📘 Introduction

Java provides three primary methods for console output through `System.out`. The `print()` and `println()` methods handle simple text, while `printf()` offers formatted output similar to C's `printf`. Understanding these methods is essential for debugging, logging, and user-facing console applications.

## 🧠 Key Concepts

| Method | Behavior |
|--------|----------|
| `System.out.print()` | Prints text without a trailing newline |
| `System.out.println()` | Prints text followed by a newline |
| `System.out.printf()` | Prints formatted text using format specifiers |
| Escape sequences | `\n` (newline), `\t` (tab), `\\` (backslash), `\"` (double quote) |
| Concatenation | `+` joins strings with other types |

**Format Specifiers (`printf`):**
| Specifier | Type | Example |
|-----------|------|---------|
| `%d` | Decimal integer | `printf("%d", 42)` |
| `%f` | Floating point | `printf("%.2f", 3.14)` |
| `%s` | String | `printf("%s", "hi")` |
| `%n` | Platform-independent newline | `printf("line1%nline2")` |

## 💻 Syntax

```java
public class OutputDemo {
    public static void main(String[] args) {
        System.out.print("No newline ");
        System.out.print("at end.");
        System.out.println();                      // just a newline
        System.out.println("Has newline ->");

        System.out.printf("Name: %s, Age: %d%n", "Alice", 25);
        System.out.printf("Pi = %.3f%n", Math.PI);
        System.out.printf("Tabbed:\tCol1\tCol2%n");

        System.out.println("Concatenation: " + 100 + " + " + 200);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Print a receipt header using different output methods.

**Code:**
```java
public class Receipt {
    public static void main(String[] args) {
        System.out.println("=== STORE RECEIPT ===");
        System.out.print("Item: Laptop\t");
        System.out.println("Price: $999.99");
        System.out.print("Item: Mouse\t");
        System.out.println("Price: $24.95");
        System.out.println("---");
        System.out.printf("Total:\t\t$%.2f%n", 1024.94);
    }
}
```

**Output:**
```
=== STORE RECEIPT ===
Item: Laptop	Price: $999.99
Item: Mouse	Price: $24.95
---
Total:		$1024.94
```

**Explanation:** `print` stays on the same line, `println` adds a newline, `printf` formats the total to 2 decimal places with `%.2f`.

## 🚀 Example 2 - Intermediate

**Problem:** Create a formatted table of squares and cubes using `printf`.

**Code:**
```java
public class NumberTable {
    public static void main(String[] args) {
        System.out.printf("%-5s %-5s %-5s%n", "n", "n^2", "n^3");
        System.out.println("---------------");
        for (int i = 1; i <= 5; i++) {
            System.out.printf("%-5d %-5d %-5d%n", i, i * i, i * i * i);
        }
        System.out.println("\nEscape demo: Backslash: \\, Quote: \"");
    }
}
```

**Output:**
```
n     n^2   n^3   
---------------
1     1     1     
2     4     8     
3     9     27    
4     16    64    
5     25    125   

Escape demo: Backslash: \, Quote: "
```

**Explanation:** `%-5d` left-aligns integers in a 5-character-wide field. `\n` adds a newline, `\\` prints a literal backslash, and `\"` prints a literal double quote.

## 🏢 Real World Use Case

**Log File Generation:** A server application uses `System.out.printf()` with `%tF %<tT` (date/time specifiers) to generate timestamped log entries. The `%n` specifier ensures platform-correct line separators (CRLF on Windows, LF on Linux). Output is redirected to rolling log files.

## 🎯 Interview Questions

**1. What is the difference between `print()` and `println()`?**  
`print()` outputs text without a trailing newline; `println()` appends a newline after the output.

**2. What does `%n` do in `printf()`?**  
`%n` inserts a platform-independent newline (`\r\n` on Windows, `\n` on Unix). Unlike `\n`, it adapts to the OS.

**3. How do you format a double to two decimal places?**  
`System.out.printf("%.2f", value)`. The `.2` specifies two digits after the decimal point.

**4. Can you concatenate strings and numbers directly?**  
Yes. In Java, `"Age: " + 25` automatically converts the int to a String and concatenates.

**5. What does `System.out` actually refer to?**  
It is a `PrintStream` object (a `static final` field in `System`) connected to standard output (the console by default).

## ⚠ Common Errors / Mistakes

- **Forgetting newline with `print()`** — Consecutive `print()` calls run text together on one line
- **Mismatched format specifiers** — `printf("%d", 3.14)` causes `IllegalFormatConversionException`
- **Missing arguments for specifiers** — `printf("%d %d", 5)` — missing argument causes `MissingFormatArgumentException`
- **Using `\n` instead of `%n`** — `\n` is not platform-aware; `%n` is preferred in `printf`
- **Confusing `println` with `printf`** — `println` does not parse format specifiers

## 📝 Practice Exercises

**Beginner**
1. Print your name, age, and favorite color — each on a separate line using `println`.
2. Use `print()` to output "Counting: 1 2 3 4 5" on a single line.
3. Use `printf` to print "Product: Widget | Price: $19.99" with `%s` and `%.2f`.

**Intermediate**
4. Create a multiplication table (1–10 × 1–10) using `printf` with column widths of 4 characters.
5. Write a program that prints a right-aligned triangle pattern of asterisks using nested loops and `print`.
6. Use `printf` with `%tT` to print the current time in HH:MM:SS format (`new Date()` from `java.util.Date`).

**Advanced**
7. Write a program that reads a text file and re-numbers every line using `printf` with `%03d: %s` (e.g., `001: content`).
8. Create a simple progress bar in the console that overwrites itself using `\r` (carriage return) and `printf` to show percentage completion.
