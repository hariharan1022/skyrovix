## 41. PHP Exceptions

## 📘 Introduction
Exceptions are PHP's mechanism for handling errors and unexpected situations gracefully. Instead of halting script execution with a fatal error, exceptions allow you to catch and handle problems programmatically using `try`, `catch`, `throw`, and `finally` blocks.

## 🧠 Key Concepts
- **throw** - triggers an exception, can throw any `Throwable` instance
- **try** - wraps code that may throw an exception
- **catch** - catches and handles a specific exception type
- **finally** - always executes regardless of whether an exception was thrown
- **Exception class** - base class with methods: `getMessage()`, `getCode()`, `getFile()`, `getLine()`, `getTrace()`, `getTraceAsString()`
- **Custom exception classes** - extend the base `Exception` class
- **Multiple catch blocks** - handle different exception types separately
- **set_exception_handler()** - global uncaught exception handler
- **Throwable interface** - base interface implemented by `Exception` and `Error`

## 💻 Syntax

```php
// Basic try-catch-finally
try {
    // Code that may throw an exception
    throw new Exception("Something went wrong");
} catch (Exception $e) {
    echo $e->getMessage();
} finally {
    // Always executes
}

// Multiple catch blocks
try {
    // risky code
} catch (InvalidArgumentException $e) {
    // handle specific
} catch (RuntimeException $e) {
    // handle another
} catch (Exception $e) {
    // catch-all
}

// Custom exception
class MyException extends Exception {}

// Global handler
set_exception_handler(function($exception) {
    echo "Uncaught: " . $exception->getMessage();
});
```

## ✅ Example 1 - Basic: Division by Zero Validation

**Problem:** Write a safe division function that handles division by zero using try/catch.

```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("Division by zero is not allowed.");
    }
    return $a / $b;
}

try {
    echo divide(10, 2) . "\n";   // 5
    echo divide(10, 0) . "\n";   // throws
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
} finally {
    echo "Execution completed.\n";
}
?>
```

**Output:**
```
5
Error: Division by zero is not allowed.
File: /path/to/script.php
Line: 5
Execution completed.
```

**Explanation:** The `divide()` function throws an exception when `$b` is zero. The `try` block catches it, `getMessage()` retrieves the error text, `getFile()` and `getLine()` pinpoint the exception source. The `finally` block always runs.

## 🚀 Example 2 - Intermediate: Custom Exception for Validation

**Problem:** Build a user registration system that validates age and email using custom exception classes.

```php
<?php
class ValidationException extends Exception {
    protected $field;
    
    public function __construct($message, $field = "", $code = 0, Throwable $previous = null) {
        $this->field = $field;
        parent::__construct($message, $code, $previous);
    }
    
    public function getField() {
        return $this->field;
    }
}

class AgeException extends ValidationException {}
class EmailException extends ValidationException {}

function registerUser($name, $age, $email) {
    if ($age < 18) {
        throw new AgeException("User must be 18 or older.", "age");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new EmailException("Invalid email address.", "email");
    }
    return "User $name registered successfully.";
}

try {
    echo registerUser("Alice", 16, "alice@example.com");
} catch (AgeException $e) {
    echo "Age Error in field '{$e->getField()}': {$e->getMessage()}\n";
} catch (EmailException $e) {
    echo "Email Error in field '{$e->getField()}': {$e->getMessage()}\n";
} catch (ValidationException $e) {
    echo "Validation Error: {$e->getMessage()}\n";
}
?>
```

**Output:**
```
Age Error in field 'age': User must be 18 or older.
```

**Explanation:** Custom exceptions (`AgeException`, `EmailException`) extend `ValidationException`, which adds a `$field` property. Multiple `catch` blocks allow handling each exception type differently. The order matters — more specific exceptions must come before parent types.

## 🏢 Real World Use Case
A payment gateway integration uses custom exceptions like `PaymentFailedException`, `InvalidCardException`, `InsufficientFundsException` to handle various failure modes. The global `set_exception_handler` logs all uncaught exceptions to a monitoring service (e.g., Sentry) and returns a user-friendly JSON error response.

```php
set_exception_handler(function(Throwable $e) {
    $logEntry = date('[Y-m-d H:i:s] ') . "$e";
    file_put_contents('errors.log', $logEntry, FILE_APPEND);
    http_response_code(500);
    echo json_encode(["error" => "Internal server error."]);
});
```

## 🎯 Interview Questions

**1. What is the difference between `Exception` and `Error` in PHP?**
Both implement `Throwable`. `Exception` is for recoverable errors you can catch and handle. `Error` (e.g., `TypeError`, `ParseError`) represents fatal engine-level problems. In PHP 7+, `Error` can also be caught using try/catch.

**2. Can a `finally` block execute after a `return` statement in the `try` block?**
Yes. The `finally` block always executes, even if `try` or `catch` contains a `return`. The return value is saved, `finally` runs, then the function returns.

**3. What happens if an exception is thrown inside a `catch` or `finally` block?**
A new exception inside `catch` can be caught by an outer try/catch. If uncaught, it propagates up. Inside `finally`, an exception replaces any previously thrown exception.

**4. How do you re-throw an exception after logging it?**
Use `throw $e;` inside `catch` after handling partial logic. To preserve the original stack trace, use `throw $e;` (not `throw new Exception(...)`).

**5. What is the purpose of `set_exception_handler()`?**
It sets a default handler for all uncaught exceptions, useful for centralized logging and displaying user-friendly error pages. It receives the `Throwable` as its argument.

## ⚠ Common Errors / Mistakes

- **Catching generic `Exception` when specific handling is needed** — always catch the most specific type first.
- **Forgetting that `finally` runs even after `return`** — avoid placing cleanup logic after `return` thinking it won't run.
- **Throwing non-Throwable values** — PHP 8 throws a fatal error; always throw `Throwable` instances.
- **Empty catch blocks** — silently swallowing exceptions hides bugs.
- **Re-throwing without `$e`** — `throw $e;` preserves the stack trace; `throw new Exception(...)` resets it.

## 📝 Practice Exercises

**Beginner**
1. Write a function `sqrtSafe($num)` that throws an exception for negative numbers and returns the square root otherwise. Test with try/catch.
2. Create a script that reads a file, catches `Exception` if the file doesn't exist, and prints the error message.
3. Write a `validateAge($age)` function that throws `InvalidArgumentException` if age is not between 1 and 120.

**Intermediate**
4. Define a custom `DatabaseException` class with an additional `$query` property. Write a mock `queryDatabase($sql)` function that throws `DatabaseException` with the failed query. Catch it and print the query.
5. Create a nested try/catch scenario where an inner block throws an exception, the inner catch re-throws it, and the outer catch handles it with a `finally` that logs a message.
6. Build a retry mechanism: a `retry(callable $fn, int $maxAttempts)` function that catches exceptions and retries up to `$maxAttempts` times.

**Advanced**
7. Implement a simple transaction-like system: `beginTransaction()`, `commit()`, `rollback()`. If a callback throws inside the transaction, automatically rollback. After commit, do not allow further writes.
8. Build an exception filtering system where different exception types produce different HTTP status codes (400 for validation, 404 for not found, 500 for server errors). Use `set_exception_handler` with a `match` expression.
