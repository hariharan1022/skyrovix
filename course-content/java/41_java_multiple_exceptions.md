## 41. Java Multiple Exceptions

## 📘 Introduction
Java 7 introduced multi-catch and improved exception handling for scenarios where a try block can throw multiple exception types. Proper ordering, rethrowing, and exception chaining patterns help write cleaner, more maintainable error-handling code.

## 🧠 Key Concepts
- **Multi-catch (Java 7+)** — Catch multiple exception types in one block: `catch (IOException | SQLException e)`
- **Union type catches** — The `e` parameter in multi-catch is effectively a union of the exception types; it's `final` implicitly
- **Exception handling order** — More specific exceptions must be caught before their supertypes
- **Rethrowing exceptions** — Throwing the caught exception (possibly with improved typing)
- **Exception chaining** — Wrapping a caught exception in another: `throw new ServiceException("msg", cause)`

## 💻 Syntax
```java
// Multi-catch (Java 7+)
try {
    // code that throws multiple exceptions
} catch (IOException | SQLException e) {
    // e is implicitly final
    logger.error("Error", e);
}

// Proper ordering — specific before general
try {
    // code
} catch (FileNotFoundException e) {
    // specific first
} catch (IOException e) {
    // more general after
}

// Rethrowing with improved type inference (Java 7+)
void method() throws IOException, SQLException {
    try {
        // ...
    } catch (Exception e) {
        // Java 7+ infers the exact exception types
        throw e;
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Write a program that reads a number from a file and divides it by a user-provided value. Handle `IOException`, `NumberFormatException`, and `ArithmeticException` using multi-catch where possible.

**Code:**
```java
import java.io.*;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try {
            BufferedReader br = new BufferedReader(new FileReader("data.txt"));
            String line = br.readLine();
            int fileNum = Integer.parseInt(line);
            br.close();

            Scanner sc = new Scanner(System.in);
            System.out.print("Enter divisor: ");
            int divisor = sc.nextInt();
            sc.close();

            int result = fileNum / divisor;
            System.out.println("Result: " + result);

        } catch (FileNotFoundException e) {
            System.out.println("Specific: File not found — " + e.getMessage());
        } catch (IOException | NumberFormatException e) {
            System.out.println("IO or format error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Math error: " + e.getMessage());
        }
    }
}
```

**Output (if data.txt contains "hello"):**
```
IO or format error: For input string: "hello"
```

**Explanation:** Multi-catch `(IOException | NumberFormatException e)` handles both in one block. `FileNotFoundException` is caught separately (more specific). `ArithmeticException` is also separate since it doesn't share a common handler with others.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate exception chaining and rethrowing with improved type inference. Create a service layer that wraps low-level exceptions into a domain-specific exception.

**Code:**
```java
import java.io.*;
import java.sql.*;

class DataAccessException extends Exception {
    public DataAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}

class DataService {
    public String fetchUserEmail(int userId) throws DataAccessException {
        try {
            // Simulating multiple failure points
            if (userId == 1) {
                throw new IOException("Network timeout");
            } else if (userId == 2) {
                throw new SQLException("DB connection failed");
            } else if (userId == 3) {
                throw new ArithmeticException("Unexpected math error");
            }
            return "user@example.com";

        } catch (IOException | SQLException e) {
            // Chaining: wrap in domain exception
            throw new DataAccessException(
                "Failed to fetch email for user " + userId, e
            );
        } catch (ArithmeticException e) {
            // Rethrow as-is (unchecked, no declaration needed)
            throw e;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        DataService service = new DataService();

        for (int id = 1; id <= 3; id++) {
            try {
                String email = service.fetchUserEmail(id);
                System.out.println("Email: " + email);
            } catch (DataAccessException e) {
                System.out.println("Domain error: " + e.getMessage());
                System.out.println("  Caused by: " + e.getCause().getMessage());
            } catch (ArithmeticException e) {
                System.out.println("Unchecked: " + e.getMessage());
            }
        }
    }
}
```

**Output:**
```
Domain error: Failed to fetch email for user 1
  Caused by: Network timeout
Domain error: Failed to fetch email for user 2
  Caused by: DB connection failed
Unchecked: Unexpected math error
```

**Explanation:** `IOException` and `SQLException` are caught via multi-catch and wrapped in `DataAccessException` (exception chaining). `ArithmeticException` is rethrown as-is — since it's unchecked, it doesn't need to be declared.

## 🏢 Real World Use Case
A batch ETL pipeline catches `IOException` (file not found, read error), `ParseException` (malformed CSV), and `DataIntegrityException` (DB constraint violation). Each is handled differently — retry, skip row, or abort batch — using multi-catch with a specific ordering.

## 🎯 Interview Questions

**1. What is the restriction on exception types in a multi-catch clause?**
The exception types must be disjoint — one cannot be a subclass of another. For example, `catch (FileNotFoundException | IOException e)` fails because `FileNotFoundException` extends `IOException`.

**2. Is the exception variable in multi-catch effectively final?**
Yes, in multi-catch `catch (A | B e)`, the variable `e` is implicitly `final`. You cannot reassign it.

**3. What is improved exception type inference in Java 7+?**
If a `catch (Exception e)` block throws `e`, the compiler infers the exception types more precisely — it throws the exact types that the try block can throw, not just `Exception`.

**4. Why should more specific exceptions be caught first?**
If a supertype catch (e.g., `IOException`) appears before a subtype (e.g., `FileNotFoundException`), the subtype catch becomes unreachable — compiler error.

**5. What is exception chaining and why use it?**
Exception chaining wraps a low-level exception in a higher-level exception using a cause parameter. It preserves the original stack trace while providing an abstraction layer appropriate to the caller.

## ⚠ Common Errors / Mistakes
- Using incompatible types in multi-catch (parent-child relationship) — compiler error
- Catching `Exception` as a catch-all — hides unexpected exceptions
- Forgetting to chain the original exception when wrapping — loses root cause
- Incorrect ordering — putting general exception before specific one (compiler error)
- Logging and rethrowing in the same block — duplicate log entries

## 📝 Practice Exercises

**Beginner:**
1. Write a try block that throws both `ArithmeticException` and `NullPointerException`. Use multi-catch to handle both.
2. Create a method that can throw `IllegalArgumentException` and `ArrayIndexOutOfBoundsException`. Write proper catch blocks ordering specific before general.
3. Write a program that attempts to parse an integer from a string and access an array element. Use multi-catch for `NumberFormatException` and `ArrayIndexOutOfBoundsException`.

**Intermediate:**
4. Create a `NetworkService` class with a method that can throw `SocketTimeoutException` and `UnknownHostException`. Use multi-catch, but log differently for each using `instanceof` inside the handler.
5. Write a file parser that reads a CSV file and can throw `IOException`, `NumberFormatException`, and `ArrayIndexOutOfBoundsException`. Order catches correctly and rethrow a custom `ParseException` with chaining.
6. Demonstrate improved type inference: write a generic `execute()` method that throws two checked exceptions and uses a single `catch (Exception e) { throw e; }` — verify the caller still sees the exact exception types.

**Advanced:**
7. Implement a `RetryHandler` that wraps any `Callable<T>` and retries on `IOException` and `SQLException` (multi-catch), but fails immediately on `IllegalArgumentException` and `NullPointerException`.
8. Design a transaction manager using exception chaining — rollback on any checked exception, wrap original exception in `TransactionFailedException`, and preserve suppressed exceptions from the rollback operation.
