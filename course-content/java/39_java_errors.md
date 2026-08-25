## 39. Java Errors

## 📘 Introduction
Java uses exceptions to handle runtime errors and other abnormal conditions. Understanding the error/exception hierarchy, checked vs unchecked exceptions, and proper handling mechanisms is essential for writing robust Java code.

## 🧠 Key Concepts
- **Error vs Exception** — `Error` indicates serious system problems (e.g., `OutOfMemoryError`); `Exception` indicates recoverable conditions
- **Checked vs Unchecked exceptions** — Checked are verified at compile-time; unchecked (RuntimeException) are verified at runtime
- **try-catch-finally** — Blocks to catch and handle exceptions; `finally` always executes
- **throw** — Manually throw an exception: `throw new IllegalArgumentException("msg")`
- **throws** — Declare exceptions a method may throw: `void read() throws IOException`
- **Custom exceptions** — Extend `Exception` or `RuntimeException` to create application-specific exceptions
- **Multi-catch (Java 7+)** — Catch multiple exception types in one block: `catch (IOException | SQLException e)`
- **try-with-resources** — Auto-closes resources implementing `AutoCloseable`

## 💻 Syntax
```java
// try-catch-finally
try {
    // risky code
} catch (SpecificException e) {
    // handle
} finally {
    // always executes (cleanup)
}

// Multi-catch
try {
    // code that throws multiple exceptions
} catch (IOException | SQLException e) {
    // handle both
}

// Custom exception
class MyException extends Exception {
    public MyException(String message) {
        super(message);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate try-catch-finally by dividing two numbers where the user enters a zero denominator. Also show checked exception handling with `Thread.sleep()`.

**Code:**
```java
public class Main {
    public static void main(String[] args) {
        // Unchecked — ArithmeticException
        try {
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught: Cannot divide by zero!");
        } finally {
            System.out.println("Finally block — always runs");
        }

        // Checked — InterruptedException
        try {
            Thread.sleep(1000);
            System.out.println("Slept 1 second");
        } catch (InterruptedException e) {
            System.out.println("Sleep interrupted");
        }
    }
}
```

**Output:**
```
Caught: Cannot divide by zero!
Finally block — always runs
Slept 1 second
```

**Explanation:** `ArithmeticException` is an unchecked exception (RuntimeException). The `finally` block executes regardless of whether an exception occurred. `InterruptedException` is checked and must be handled at compile time.

## 🚀 Example 2 - Intermediate

**Problem:** Create a custom exception `InsufficientFundsException`. Use it in a `BankAccount` class with withdraw logic. Demonstrate throws declaration and throw keyword.

**Code:**
```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Cannot withdraw $" + amount + ". Balance: $" + balance
            );
        }
        balance -= amount;
        System.out.println("Withdrawn $" + amount + ". New balance: $" + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500);

        try {
            acc.withdraw(600);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println("Program continues...");
    }
}
```

**Output:**
```
Error: Cannot withdraw $600.0. Balance: $500.0
Program continues...
```

**Explanation:** `InsufficientFundsException` extends `Exception` (checked). The `throws` clause in `withdraw()` declares it. The caller must handle it with try-catch or declare throws further up.

## 🏢 Real World Use Case
A REST API service uses custom exceptions like `UserNotFoundException`, `ValidationException`, and `DuplicateResourceException`. A global exception handler (`@ControllerAdvice`) catches them and returns appropriate HTTP status codes.

## 🎯 Interview Questions

**1. What is the difference between throw and throws?**
`throw` is used to explicitly throw an exception (inside a method). `throws` is used in the method signature to declare that the method may throw the specified exception(s).

**2. Can finally block execute without try?**
No, `finally` must always follow a `try` block (or try-catch). It cannot exist independently.

**3. What happens if both catch and finally return a value?**
The `finally` block's return value overrides the `catch` block's return value if both have return statements.

**4. Can we catch Error?**
Yes, `Error` and its subclasses can be caught, but it's generally not recommended — Errors indicate serious, unrecoverable system failures (e.g., `OutOfMemoryError`).

**5. Is it mandatory to catch checked exceptions?**
Yes, checked exceptions must be either caught (try-catch) or declared in the method signature with `throws`. Unchecked exceptions have no such requirement.

## ⚠ Common Errors / Mistakes
- Catching `Exception` or `Throwable` too broadly — masks unexpected issues
- Putting cleanup code in `try` instead of `finally` — cleanup may not run if exception occurs
- Forgetting to close resources in `finally` — use try-with-resources instead
- Throwing `Throwable` or `Error` from custom methods — stick to `Exception` or its subclasses
- Swallowing exceptions with empty catch blocks — at least log the exception

## 📝 Practice Exercises

**Beginner:**
1. Write a program that prompts the user for two integers and divides them. Handle `ArithmeticException` for division by zero and `InputMismatchException` for non-numeric input.
2. Create a method `readFile(String path)` that declares `throws IOException`. Call it from `main()` and handle the exception.
3. Write a `try-catch-finally` block where `finally` prints "Cleanup done" regardless of exception occurrence.

**Intermediate:**
4. Create a custom exception `InvalidAgeException`. Use it in a `Person` class constructor that validates age (0–150).
5. Write a program that demonstrates multi-catch handling `ArrayIndexOutOfBoundsException` and `NumberFormatException` in a single catch block.
6. Create a resource class `DatabaseConnection` that implements `AutoCloseable`. Use it in try-with-resources and verify `close()` is called automatically.

**Advanced:**
7. Implement a retry mechanism — write a utility method `retry(int times, Runnable task)` that retries the task up to `n` times if it throws a checked exception, with exponential backoff.
8. Build a compile-time annotation processor that enforces checked exception handling rules — methods annotated with `@Critical` must declare or handle `CriticalException`.
