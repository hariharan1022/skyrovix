## 45. PHP Destructor

## 📘 Introduction
A destructor (`__destruct`) is a magic method automatically called when an object is destroyed or the script ends. Unlike constructors, destructors cannot accept parameters. They are primarily used for cleanup — closing database connections, flushing file handles, releasing locks, or writing log entries.

## 🧠 Key Concepts
- **`__destruct()`** — magic method invoked on object destruction
- **No parameters** — destructors cannot accept arguments
- **Automatic invocation** — called when all references to an object are removed or script ends
- **Cleanup operations** — close files, disconnect databases, release resources
- **Destructor order** — objects are destroyed in reverse order of creation (LIFO), but `unset()` or `null` assignment can force early destruction
- **Destructor with inheritance** — parent destructors are not automatically called; use `parent::__destruct()` if needed
- **Exception handling** — throwing exceptions in destructors is strongly discouraged (causes fatal errors in PHP 8+)

## 💻 Syntax

```php
class ClassName {
    public function __destruct() {
        // Cleanup code
    }
}

// Parent destructor
class Child extends Parent {
    public function __destruct() {
        // Child cleanup
        parent::__destruct();
    }
}
```

## ✅ Example 1 - Basic: File Handle Cleanup

**Problem:** Create a `FileLogger` class that opens a file on construction and ensures it is closed on destruction.

```php
<?php
class FileLogger {
    private $handle;
    private string $filename;
    
    public function __construct(string $filename) {
        $this->filename = $filename;
        $this->handle = fopen($filename, 'a');
        if (!$this->handle) {
            throw new RuntimeException("Cannot open file: $filename");
        }
        $this->log("Session started");
    }
    
    public function log(string $message): void {
        $timestamp = date('Y-m-d H:i:s');
        fwrite($this->handle, "[$timestamp] $message" . PHP_EOL);
    }
    
    public function __destruct() {
        $this->log("Session ended");
        if ($this->handle) {
            fclose($this->handle);
            echo "Closed file: {$this->filename}\n";
        }
    }
}

$logger = new FileLogger("app.log");
$logger->log("User logged in");
$logger->log("Performed action");
$logger = null; // triggers __destruct
echo "Script continuing...\n";
?>
```

**Output:**
```
Closed file: app.log
Script continuing...
```

**Explanation:** The constructor opens the file handle. `__destruct()` ensures the file is always closed, preventing resource leaks. Setting `$logger = null` removes the last reference, triggering immediate destruction before the script continues.

## 🚀 Example 2 - Intermediate: Database Connection Pool with Destructor Order

**Problem:** Simulate database connections with observable destruction order in an inheritance hierarchy.

```php
<?php
class DatabaseConnection {
    private static int $counter = 0;
    private int $id;
    
    public function __construct() {
        $this->id = ++self::$counter;
        echo "Connection #{$this->id} opened.\n";
    }
    
    public function query(string $sql): void {
        echo "Connection #{$this->id} executing: $sql\n";
    }
    
    public function __destruct() {
        echo "Connection #{$this->id} closed.\n";
    }
}

class TransactionalConnection extends DatabaseConnection {
    private bool $inTransaction = false;
    
    public function beginTransaction(): void {
        $this->inTransaction = true;
        echo "Transaction started.\n";
    }
    
    public function commit(): void {
        $this->inTransaction = false;
        echo "Transaction committed.\n";
    }
    
    public function __destruct() {
        if ($this->inTransaction) {
            $this->rollback();
        }
        echo "Transactional connection cleaning up...\n";
        parent::__destruct();
    }
    
    private function rollback(): void {
        $this->inTransaction = false;
        echo "Auto-rollback on destruction.\n";
    }
}

$conn1 = new DatabaseConnection();
$conn2 = new TransactionalConnection();
$conn2->beginTransaction();
$conn2->query("UPDATE users SET name = 'Alice'");

// Objects destroyed in reverse order of creation
$conn1 = null;
echo "--- End of script ---\n";
?>
```

**Output:**
```
Connection #1 opened.
Connection #2 opened.
Transaction started.
Connection #2 executing: UPDATE users SET name = 'Alice'
Connection #1 closed.
--- End of script ---
Transactional connection cleaning up...
Auto-rollback on destruction.
Connection #2 closed.
```

**Explanation:** Objects are destroyed LIFO (Last In, First Out) when they go out of scope. The child class's destructor checks for uncommitted transactions and performs an auto-rollback before calling `parent::__destruct()`.

## 🏢 Real World Use Case
ORM systems (like Doctrine or Eloquent) use destructors to lazily flush entity changes. A `UnitOfWork` object collects changes during a request and writes them to the database in `__destruct()`. Similarly, `RedisCache` connections return to a connection pool, and `Mutex` locks are automatically released in destructors to prevent deadlocks.

```php
class RedisLock {
    private \Redis $redis;
    private string $key;
    
    public function __destruct() {
        $this->redis->del($this->key); // always release the lock
    }
}
```

## 🎯 Interview Questions

**1. When is `__destruct()` called?**
When all references to the object are removed (via `unset()` or reassignment), when the object goes out of scope (e.g., end of function/script), or explicitly when `null` is assigned. Also at script shutdown in reverse creation order.

**2. Can `__destruct()` accept parameters?**
No. Destructors cannot accept any parameters. They are automatically invoked by the engine.

**3. Is `parent::__destruct()` called automatically?**
No. PHP does not automatically call the parent destructor. You must explicitly call `parent::__destruct()` if you want parent cleanup to run.

**4. What happens if an exception is thrown in `__destruct()`?**
In PHP 8+, throwing an exception from a destructor causes a fatal error. In PHP 7.x, it could be caught but is still strongly discouraged. Always handle errors internally.

**5. Can you rely on destructors for critical cleanup (like flushing data)?**
Destructors should not be relied upon for critical operations because their execution order during script shutdown can be unpredictable, and they might not run in some edge cases (e.g., `exit()` or fatal errors before object creation).

## ⚠ Common Errors / Mistakes

- **Throwing exceptions in destructors** — causes fatal errors in PHP 8+; catch and handle errors within the destructor.
- **Assuming deterministic destruction order** — the LIFO order can be disrupted by circular references or `gc_collect_cycles()`.
- **Forgetting `parent::__destruct()`** — parent cleanup code won't run automatically.
- **Performing heavy operations in destructors** — slows down script shutdown; keep destructors lightweight.
- **Relying on destructors for transaction commits** — use explicit `commit()` calls instead.

## 📝 Practice Exercises

**Beginner**
1. Create a `Timer` class that records the start time in the constructor and prints the elapsed time in the destructor.
2. Build a `TempFile` class that creates a temporary file in the constructor and deletes it in the destructor.
3. Create a `Logger` class that writes "Object created" in `__construct` and "Object destroyed" in `__destruct`. Create and destroy multiple objects to see the order.

**Intermediate**
4. Create a `ConnectionPool` class that manages multiple `DBConnection` objects. Each `DBConnection` should return itself to the pool in `__destruct()` by calling a `Pool::release()` method.
5. Build a `Cache` class that stores key-value pairs and flushes to a file in `__destruct()`. Demonstrate that data persists after destruction.
6. Create a class hierarchy: `BaseController` opens a DB connection in constructor and closes it in destructor. `UserController` extends it and adds logging. Ensure both destructors run.

**Advanced**
7. Implement a `TransactionManager` class that tracks nested transactions. Use the destructor to roll back any open transactions if an exception prevented explicit commit. Handle the case where `__destruct` throws — wrap in try/catch.
8. Build a resource tracking system: `Resource` base class with `__construct` and `__destruct` that register/unregister in a global `ResourceWatcher`. Use `register_shutdown_function` to dump any unreleased resources at script end.
