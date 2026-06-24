## 45. Java Write Files

## 📘 Introduction
Java offers multiple APIs for writing data to files, from character streams (`FileWriter`, `BufferedWriter`, `PrintWriter`) to byte streams (`FileOutputStream`) and modern NIO.2 methods (`Files.write()`, `Files.writeString()`). Each is suited for different use cases.

## 🧠 Key Concepts
- **FileWriter** — Convenience class for writing character files; low-level
- **BufferedWriter** — Wraps `FileWriter` for efficient buffered writing
- **PrintWriter** — Formatted text output with `println()`, `printf()`, `format()`
- **Files.write()** — NIO.2 utility: write bytes or lines to a file
- **Files.writeString()** — NIO.2: write a `CharSequence` to a file (Java 11+)
- **FileOutputStream** — Byte stream for writing binary data
- **Append mode vs overwrite** — Use constructor flags or `StandardOpenOption`
- **ObjectOutputStream** — Serialize objects to a file
- **Flushing and closing** — Ensures data is written to disk

## 💻 Syntax
```java
// FileWriter
FileWriter fw = new FileWriter("file.txt");
fw.write("Hello");
fw.close();

// BufferedWriter
BufferedWriter bw = new BufferedWriter(new FileWriter("file.txt"));
bw.write("Hello");
bw.newLine();
bw.close();

// PrintWriter
PrintWriter pw = new PrintWriter(new FileWriter("file.txt"));
pw.println("Hello");
pw.printf("Value: %d", 42);
pw.close();

// Files.write (NIO.2)
Files.write(Paths.get("file.txt"), "Hello".getBytes());
Files.write(Paths.get("file.txt"), List.of("Line1", "Line2"));

// Append mode
Files.write(Paths.get("file.txt"), "Appended".getBytes(), StandardOpenOption.APPEND);

// FileOutputStream (binary)
FileOutputStream fos = new FileOutputStream("data.bin");
fos.write(new byte[]{0x48, 0x65, 0x6C});
fos.close();

// ObjectOutputStream
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("obj.dat"));
oos.writeObject(myObject);
oos.close();
```

## ✅ Example 1 - Basic

**Problem:** Write text to a file using `FileWriter`, `BufferedWriter`, and `PrintWriter`. Compare approaches.

**Code:**
```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // FileWriter (raw)
        FileWriter fw = new FileWriter("fw_demo.txt");
        fw.write("FileWriter: Hello World\n");
        fw.write("FileWriter: Line 2\n");
        fw.close();
        System.out.println("FileWriter done.");

        // BufferedWriter (efficient for many writes)
        BufferedWriter bw = new BufferedWriter(new FileWriter("bw_demo.txt"));
        bw.write("BufferedWriter: Line 1");
        bw.newLine();
        bw.write("BufferedWriter: Line 2");
        bw.newLine();
        bw.close();
        System.out.println("BufferedWriter done.");

        // PrintWriter (formatted output)
        PrintWriter pw = new PrintWriter(new FileWriter("pw_demo.txt"));
        pw.println("PrintWriter: Hello");
        pw.println("PrintWriter: Value = " + 100);
        pw.printf("PrintWriter: Formatted %.2f%n", 3.14159);
        pw.close();
        System.out.println("PrintWriter done.");
    }
}
```

**Output:**
```
FileWriter done.
BufferedWriter done.
PrintWriter done.
```

**Contents of pw_demo.txt:**
```
PrintWriter: Hello
PrintWriter: Value = 100
PrintWriter: Formatted 3.14
```

**Explanation:** `FileWriter` is simplest but lowest-level. `BufferedWriter` reduces I/O operations via buffering. `PrintWriter` provides convenient `println()`, `printf()`, and `format()` methods for formatted output.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate append mode, binary writing with `FileOutputStream`, and object serialization with `ObjectOutputStream`.

**Code:**
```java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Append mode with FileWriter
        FileWriter fw = new FileWriter("append_demo.txt", true);  // true = append
        fw.write("Appended line at " + System.currentTimeMillis() + "\n");
        fw.close();
        System.out.println("Appended to file.");

        // Binary writing with FileOutputStream
        FileOutputStream fos = new FileOutputStream("binary_demo.bin");
        byte[] data = {0x48, 0x45, 0x4C, 0x4C, 0x4F};  // "HELLO" in hex
        fos.write(data);
        fos.flush();  // force write to disk
        fos.close();
        System.out.println("Binary file written: " + data.length + " bytes");

        // Object serialization
        Person p = new Person("Alice", 30);
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"));
        oos.writeObject(p);
        oos.flush();
        oos.close();
        System.out.println("Object serialized: " + p);

        // Read back to verify
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"));
        Person restored = (Person) ois.readObject();
        ois.close();
        System.out.println("Deserialized: " + restored);
    }
}
```

**Output:**
```
Appended to file.
Binary file written: 5 bytes
Object serialized: Person{name='Alice', age=30}
Deserialized: Person{name='Alice', age=30}
```

**Explanation:** Append mode is enabled via the `true` flag in `FileWriter` constructor or `StandardOpenOption.APPEND` in NIO.2. `flush()` forces buffered bytes to disk. `ObjectOutputStream` serializes Java objects — the class must implement `Serializable`.

## 🏢 Real World Use Case
A logging framework uses `PrintWriter` with `BufferedWriter` for formatted log output, `FileOutputStream` for binary log rotation, and `ObjectOutputStream` to serialize session state for fault tolerance in a distributed system.

## 🎯 Interview Questions

**1. What is the difference between FileWriter and BufferedWriter?**
`FileWriter` writes characters directly to file (one-by-one). `BufferedWriter` wraps a `FileWriter` with an internal buffer (default 8KB) to reduce I/O operations, improving performance for multiple writes.

**2. Why is flushing important in file writing?**
Writes are buffered in memory for performance. `flush()` forces buffered data to be written to disk immediately, ensuring data is persistent even if the program crashes afterward.

**3. How do you append to an existing file?**
Use `new FileWriter("file.txt", true)` (legacy), `new FileOutputStream("file.txt", true)` (byte), or `Files.write(path, data, StandardOpenOption.APPEND)` (NIO.2).

**4. What is required for Object serialization?**
The class must implement `Serializable` (marker interface). All fields are serialized by default. Use `transient` to skip fields, and `serialVersionUID` for version control.

**5. What happens if you don't close a file writer?**
Buffered data may not be written to disk (data loss), and file handles may leak (resource exhaustion). Always close in `finally` or use try-with-resources.

## ⚠ Common Errors / Mistakes
- Forgetting to call `flush()` or `close()` — buffered data may be lost
- Trying to serialize a non-`Serializable` object — `NotSerializableException`
- Opening a file in overwrite mode when append was intended — data loss
- Not wrapping `FileWriter` in `BufferedWriter` for performance in loops
- Ignoring `IOException` — always handle or declare throws

## 📝 Practice Exercises

**Beginner:**
1. Write "Hello, File!" to a file using `FileWriter`. Read it back and print.
2. Use `BufferedWriter` to write 10 lines of numbers (1 to 10) to a file.
3. Use `PrintWriter` to write a formatted table (name, score, grade) with 3 rows to a file.

**Intermediate:**
4. Write a program that reads from one file and writes to another, filtering out lines containing "ERROR". Use `BufferedReader` and `BufferedWriter`.
5. Create a serializable `Student` class with `name`, `id`, `gpa`. Serialize 3 students to a file, then deserialize and print them.
6. Implement append mode logging — write timestamped log entries to a file, each on a new line, without overwriting previous entries.

**Advanced:**
7. Build a CSV writer utility class that takes a list of POJOs and writes them as CSV with proper escaping (quotes, commas, newlines in values).
8. Implement a journaling file writer that writes to a primary file and a WAL (write-ahead log) file transactionally — flush both or neither on crash recovery.
