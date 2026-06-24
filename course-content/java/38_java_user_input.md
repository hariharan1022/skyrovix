## 38. Java User Input

## 📘 Introduction
Reading user input is fundamental to interactive Java applications. Java provides several input mechanisms — `Scanner` for simple parsing, `BufferedReader` for efficient buffered reading, and `Console` for secure password input. Each serves different use cases.

## 🧠 Key Concepts
- **Scanner class** — High-level, easy-to-use input parser (nextInt, nextDouble, nextLine, next)
- **BufferedReader + InputStreamReader** — Low-level, efficient character stream reading
- **Console class** — Secure password reading (system.console())
- **Reading from files** — Scanner and BufferedReader can read from files
- **Handling InputMismatchException** — Exception when input doesn't match expected type

## 💻 Syntax
```java
// Scanner
Scanner sc = new Scanner(System.in);
int age = sc.nextInt();
String name = sc.nextLine();
double salary = sc.nextDouble();

// BufferedReader
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String line = br.readLine();

// Console (for passwords)
Console console = System.console();
char[] password = console.readPassword("Enter password: ");
```

## ✅ Example 1 - Basic

**Problem:** Read a user's name (String), age (int), and salary (double) using Scanner, then display a summary.

**Code:**
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter name: ");
        String name = sc.nextLine();

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter salary: ");
        double salary = sc.nextDouble();

        System.out.println("\n--- Summary ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);

        sc.close();
    }
}
```

**Output (interactive):**
```
Enter name: Alice
Enter age: 30
Enter salary: 75000.50

--- Summary ---
Name: Alice
Age: 30
Salary: $75000.5
```

**Explanation:** `nextLine()` reads the full name, `nextInt()` reads an integer, `nextDouble()` reads a double. Note: after `nextInt()`, there's no leftover newline issue here because we read the name first with `nextLine()`.

## 🚀 Example 2 - Intermediate

**Problem:** Use `BufferedReader` to read a text file line-by-line. Use `Console` to read a password securely.

**Code:**
```java
import java.io.*;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // BufferedReader reading from file
        try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException e) {
            System.out.println("File not found, creating demo data...");
            try (PrintWriter pw = new PrintWriter("data.txt")) {
                pw.println("Line 1: Hello");
                pw.println("Line 2: World");
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }

        // Console for password (runs only in terminal, not IDE)
        Console console = System.console();
        if (console != null) {
            char[] pwd = console.readPassword("Enter password: ");
            System.out.println("Password length: " + pwd.length);
            java.util.Arrays.fill(pwd, ' ');
        }
    }
}
```

**Output:**
```
Read: Line 1: Hello
Read: Line 2: World
Enter password:
Password length: 8
```

**Explanation:** `BufferedReader` efficiently reads lines from a file. `Console.readPassword()` hides input on screen and returns a mutable char array for security. Always overwrite the array after use.

## 🏢 Real World Use Case
A CLI banking application uses `Scanner` for menu navigation, `BufferedReader` for batch transaction file imports, and `Console` for PIN/password entry to prevent screen echo.

## 🎯 Interview Questions

**1. What is the difference between next() and nextLine() in Scanner?**
`next()` reads the next token (delimited by whitespace), while `nextLine()` reads the entire line including spaces until newline.

**2. Why does nextInt() sometimes skip the next nextLine()?**
`nextInt()` leaves the newline character in the buffer. The subsequent `nextLine()` immediately consumes that leftover newline. Fix by adding an extra `nextLine()` after `nextInt()`.

**3. What happens if Scanner receives mismatched input?**
`InputMismatchException` is thrown. Wrap in try-catch or use `hasNextInt()` / `hasNextDouble()` to validate before reading.

**4. Why is Console preferred for password input?**
Console doesn't echo characters to the screen and returns a `char[]` (not a `String`) which can be explicitly cleared from memory after use.

**5. How does BufferedReader improve performance over Scanner?**
BufferedReader uses an internal buffer (default 8KB) to read larger chunks from disk/stream, reducing system calls. Scanner also buffers but adds parsing overhead.

## ⚠ Common Errors / Mistakes
- Not closing Scanner — causes resource leaks; use try-with-resources
- Forgetting `nextLine()` after `nextInt()` to consume leftover newline
- Using `System.console()` when it returns null (e.g., in IDEs) — always null-check
- Not handling `IOException` from `BufferedReader` / `FileReader`
- Calling `nextInt()` when input is non-numeric — throws `InputMismatchException`

## 📝 Practice Exercises

**Beginner:**
1. Write a program that reads three exam scores (integers) using Scanner and prints their average.
2. Read a full name and age using Scanner, then print a greeting message.
3. Use `hasNextInt()` to validate that the user enters a valid integer; keep prompting until they do.

**Intermediate:**
4. Use `BufferedReader` to read a CSV file line by line, split by comma, and sum numeric values in each row.
5. Write a menu-driven calculator using `Scanner` that loops until the user enters "exit", handling `InputMismatchException` gracefully.
6. Use `Console` to read a username and password. Validate against hardcoded credentials (simulate login).

**Advanced:**
7. Build a CLI tool that reads a large log file (100MB+) using `BufferedReader` with a custom buffer size, reports progress every 1000 lines, and searches for ERROR patterns.
8. Implement a secure PIN entry system that uses `Console.readPassword()`, limits attempts to 3, masks partially (show asterisks count), and clears the char array after verification.
