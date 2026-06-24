## 42. Java Try-With-Resources

## 📘 Introduction
Introduced in Java 7, try-with-resources automatically closes resources that implement `AutoCloseable` (or `Closeable`). It eliminates the need for explicit `finally` cleanup blocks, reduces boilerplate, and preserves exception information through suppressed exceptions.

## 🧠 Key Concepts
- **AutoCloseable interface** — The interface resources must implement (single method: `void close() throws Exception`)
- **Closeable interface** — Extends `AutoCloseable`; used by I/O classes; declares `close()` throwing `IOException`
- **try(Resource r = new Resource())** — Resources declared in parentheses are automatically closed
- **Multiple resources** — Separate multiple resources with semicolons: `try (A a = new A(); B b = new B())`
- **Suppressed exceptions** — Exceptions from `close()` are suppressed when the try block also throws
- **Closing order** — Resources are closed in **reverse order** of declaration (LIFO)

## 💻 Syntax
```java
// Single resource
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    System.out.println(line);
} catch (IOException e) {
    e.printStackTrace();
}

// Multiple resources
try (FileInputStream fis = new FileInputStream("input.dat");
     BufferedInputStream bis = new BufferedInputStream(fis);
     ObjectInputStream ois = new ObjectInputStream(bis)) {

    Object obj = ois.readObject();
    System.out.println(obj);

} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}
```

## ✅ Example 1 - Basic

**Problem:** Compare traditional resource cleanup (pre-Java 7) with try-with-resources. Read from a file using both approaches.

**Code:**
```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a test file
        try (PrintWriter pw = new PrintWriter("test.txt")) {
            pw.println("Hello, try-with-resources!");
        }

        // Traditional approach (pre-Java 7)
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader("test.txt"));
            System.out.println("Traditional: " + br.readLine());
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // Try-with-resources (Java 7+)
        try (BufferedReader br2 = new BufferedReader(new FileReader("test.txt"))) {
            System.out.println("TWR: " + br2.readLine());
        }
    }
}
```

**Output:**
```
Traditional: Hello, try-with-resources!
TWR: Hello, try-with-resources!
```

**Explanation:** The traditional approach requires a `finally` block with null-check and nested try-catch for `close()`. Try-with-resources handles all of this automatically — the resource is closed even if an exception occurs.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate multiple resources, closing order, and suppressed exceptions. Create a custom resource that logs its close operation.

**Code:**
```java
import java.io.*;

class CustomResource implements AutoCloseable {
    private final String name;

    CustomResource(String name) {
        this.name = name;
        System.out.println("Open: " + name);
    }

    public void work() throws IOException {
        throw new IOException("Error in " + name);
    }

    @Override
    public void close() throws IOException {
        System.out.println("Close: " + name);
        throw new IOException("Error closing " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        try (CustomResource r1 = new CustomResource("Resource-1");
             CustomResource r2 = new CustomResource("Resource-2")) {

            System.out.println("Inside try block");
            r1.work();  // throws IOException

        } catch (IOException e) {
            System.out.println("Primary exception: " + e.getMessage());
            System.out.println("Suppressed exceptions:");
            Throwable[] suppressed = e.getSuppressed();
            for (Throwable t : suppressed) {
                System.out.println("  - " + t.getMessage());
            }
        }
    }
}
```

**Output:**
```
Open: Resource-1
Open: Resource-2
Inside try block
Close: Resource-2
Close: Resource-1
Primary exception: Error in Resource-1
Suppressed exceptions:
  - Error closing Resource-2
  - Error closing Resource-1
```

**Explanation:** Resources are opened in order and closed in reverse order (r2 first, then r1). The primary exception from `work()` is the one caught. Exceptions from `close()` become suppressed exceptions, accessible via `e.getSuppressed()`.

## 🏢 Real World Use Case
A data migration tool opens a database connection, a file input stream, and a file output stream in a single try-with-resources block. If any operation fails, all three resources are safely closed, and the close exceptions don't mask the root cause.

## 🎯 Interview Questions

**1. What is the difference between AutoCloseable and Closeable?**
`Closeable` extends `AutoCloseable` but declares `close()` to throw `IOException` (specific), while `AutoCloseable.close()` throws `Exception` (general). `Closeable` also guarantees idempotency (multiple close calls have no effect).

**2. What are suppressed exceptions?**
When both a try block and `close()` throw exceptions, the close exceptions are added as suppressed exceptions to the primary exception. They can be retrieved via `Throwable.getSuppressed()`.

**3. In what order are resources closed?**
In reverse order of declaration (LIFO — last declared, first closed).

**4. Can try-with-resources be used without catch or finally?**
Yes. The resources will still be auto-closed. A catch or finally block is optional.

**5. Can a resource declared in try-with-resources be accessed in catch or finally blocks?**
No, the resource variables are scoped only within the try block (they are effectively local to the try). They are closed by the time catch/finally runs.

## ⚠ Common Errors / Mistakes
- Declaring resources before the `try` — they must be declared within the `try(...)`
- Forgetting that resources implement `AutoCloseable` — compiler error if they don't
- Trying to use resource variable in `catch` or `finally` — out of scope
- Closing the resource manually inside try — causes double-close
- Thinking suppressed exceptions are lost — they are not, use `getSuppressed()`

## 📝 Practice Exercises

**Beginner:**
1. Write a program that reads from a file using `BufferedReader` inside try-with-resources and prints each line.
2. Use try-with-resources with a `FileWriter` to write "Hello World" to a file. Verify close happens automatically.
3. Create a simple class `Door` implementing `AutoCloseable` that prints "Door closed" in `close()`. Use it in try-with-resources.

**Intermediate:**
4. Write a program that copies a file using `FileInputStream` and `FileOutputStream` in a single try-with-resources (two resources).
5. Create a `DatabaseConnection` resource that throws `SQLException` in both `work()` and `close()`. Demonstrate suppressed exceptions.
6. Build a `CompressionManager` that opens `ZipInputStream` and `FileInputStream` in try-with-resources. Handle `IOException` and `ZipException` with multi-catch.

**Advanced:**
7. Implement a custom `TransactionManager` that implements `AutoCloseable` — `commit()` in try, `rollback()` in close if commit wasn't called. Use it in try-with-resources for atomic transactions.
8. Design a multi-step batch processor that chains 5 resources, each dependent on the previous (e.g., `Connection` → `PreparedStatement` → `ResultSet`). Demonstrate that all close correctly in reverse order even when the middle resource throws during close.
