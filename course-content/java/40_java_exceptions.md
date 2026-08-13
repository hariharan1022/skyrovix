## 40. Java Exceptions

## 📘 Introduction
Java's exception hierarchy provides a structured way to handle abnormal conditions. Understanding the `Throwable` hierarchy, common exceptions, and best practices is crucial for writing reliable, debuggable Java applications.

## 🧠 Key Concepts
- **Exception hierarchy** — `Throwable` (root) → `Error` (JVM-level) and `Exception` (program-level)
- **Exception** — Subclasses: `RuntimeException` (unchecked) and checked exceptions
- **RuntimeException** — Unchecked exceptions like `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`
- **Error** — `OutOfMemoryError`, `StackOverflowError`, `NoClassDefFoundError`
- **Common exceptions** — `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`, `NumberFormatException`, `ArithmeticException`
- **Exception handling best practices** — Catch specific exceptions, don't swallow, use logging, fail-fast

## 💻 Syntax
```java
// Exception hierarchy (simplified)
// Throwable
//   ├── Error (unrecoverable)
//   │   ├── OutOfMemoryError
//   │   ├── StackOverflowError
//   │   └── NoClassDefFoundError
//   └── Exception (recoverable)
//       ├── RuntimeException (unchecked)
//       │   ├── NullPointerException
//       │   ├── ArrayIndexOutOfBoundsException
//       │   ├── IllegalArgumentException
//       │   ├── NumberFormatException
//       │   └── ArithmeticException
//       └── (checked exceptions)
//           ├── IOException
//           ├── SQLException
//           └── ClassNotFoundException
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate three common unchecked exceptions: `NullPointerException`, `ArrayIndexOutOfBoundsException`, and `ArithmeticException`. Handle each properly.

**Code:**
```java
public class Main {
    public static void main(String[] args) {
        // NullPointerException
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {
            System.out.println("NullPointerException: " + e.getMessage());
        }

        // ArrayIndexOutOfBoundsException
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBoundsException: " + e.getMessage());
        }

        // ArithmeticException
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("ArithmeticException: " + e.getMessage());
        }

        System.out.println("Program completed successfully.");
    }
}
```

**Output:**
```
NullPointerException: Cannot invoke "String.length()" because "str" is null
ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3
ArithmeticException: / by zero
Program completed successfully.
```

**Explanation:** Each exception is caught and handled without crashing the program. Note that all three are subclasses of `RuntimeException` (unchecked exceptions).

## 🚀 Example 2 - Intermediate

**Problem:** Write a utility method `parseAndDivide` that takes two strings, parses them to integers, and divides them. Demonstrate NumberFormatException, ArithmeticException, and best practices for exception handling.

**Code:**
```java
public class Main {
    public static double parseAndDivide(String a, String b)
            throws IllegalArgumentException {

        try {
            int num1 = Integer.parseInt(a);
            int num2 = Integer.parseInt(b);

            if (num2 == 0) {
                throw new IllegalArgumentException("Division by zero is not allowed");
            }

            return (double) num1 / num2;

        } catch (NumberFormatException e) {
            // Wrap in a more meaningful exception
            throw new IllegalArgumentException(
                "Invalid number format: " + e.getMessage(), e
            );
        }
    }

    public static void main(String[] args) {
        String[][] testCases = {
            {"10", "3"},
            {"abc", "5"},
            {"10", "0"}
        };

        for (String[] test : testCases) {
            try {
                double result = parseAndDivide(test[0], test[1]);
                System.out.printf("%s / %s = %.2f%n", test[0], test[1], result);
            } catch (IllegalArgumentException e) {
                System.out.println("Error: " + e.getMessage());
                // Logged: e.getCause() would show original exception
            }
        }
    }
}
```

**Output:**
```
10 / 3 = 3.33
Error: Invalid number format: For input string: "abc"
Error: Division by zero is not allowed
```

**Explanation:** Best practices demonstrated: catch specific exceptions, wrap exceptions with context, throw early/fail-fast, and keep error messages informative. Chaining the original exception (`e`) preserves the stack trace.

## 🏢 Real World Use Case
A microservice uses a layered exception strategy — validation layer throws `ValidationException` (IllegalArgumentException subclass), service layer throws `ServiceException` (checked), and a global handler maps them to appropriate HTTP responses with correlation IDs.

## 🎯 Interview Questions

**1. What is the difference between Exception and Error?**
`Exception` represents conditions that a reasonable application might want to catch (recoverable). `Error` represents serious problems that a reasonable application should not try to catch (unrecoverable system failures).

**2. Is NullPointerException checked or unchecked?**
Unchecked — it extends `RuntimeException`. The compiler does not require it to be declared or caught.

**3. Can you have an empty catch block?**
Yes, but it's an anti-pattern — it swallows exceptions without any logging or handling, making debugging very difficult.

**4. What is exception masking?**
When an exception thrown in `finally` or `close()` suppresses a primary exception from `try`. Java 7+ suppresses these automatically with try-with-resources.

**5. What best practices exist for exception handling?**
Catch specific exceptions, not `Exception` or `Throwable`; log exceptions at the appropriate level; don't use exceptions for control flow; clean up resources in `finally` or use try-with-resources; preserve the original exception when wrapping.

## ⚠ Common Errors / Mistakes
- Catching `Exception` instead of specific subclasses — hides bugs and makes code harder to maintain
- Logging and then rethrowing the same exception — logs duplicate entries; let the handler log once
- Using exceptions for normal control flow (e.g., catching `ArrayIndexOutOfBoundsException` to end a loop) — very slow
- Swallowing exceptions without logging or rethrowing
- Declaring `throws Exception` in method signatures — forces callers to deal with too broad an exception type

## 📝 Practice Exercises

**Beginner:**
1. Write a program that creates a `String[]` of size 5, accesses index 10, and catches the resulting exception.
2. Parse the string "12.5" using `Integer.parseInt()` and handle `NumberFormatException`.
3. Write a method that accepts an object parameter, calls `toString()` on it, and handles `NullPointerException` gracefully.

**Intermediate:**
4. Create a class `TemperatureConverter` with methods `celsiusToFahrenheit` and `fahrenheitToCelsius`. Validate inputs (no absolute zero violations) and throw `IllegalArgumentException` with meaningful messages.
5. Write a batch processor that reads a file of integers (one per line), parses each line, sums them, and tracks how many lines failed with `NumberFormatException`.
6. Implement a safe array accessor utility method that returns `Optional<Integer>` instead of throwing `ArrayIndexOutOfBoundsException`.

**Advanced:**
7. Design an exception classification framework with three custom exception types: `RetryableException`, `NonRetryableException`, and `TimeoutException`. Write a circuit breaker that wraps any operation and uses these to decide whether to retry, fail-fast, or open the circuit.
8. Build a compile-time checker using annotations (`@NonNull`, `@Nullable`) and an annotation processor that generates null-check code to prevent `NullPointerException` at compile time.
