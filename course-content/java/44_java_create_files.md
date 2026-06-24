## 44. Java Create Files

## 📘 Introduction
Java provides multiple ways to create files and directories using both the legacy `java.io.File` and modern `java.nio.file.Files` APIs. The NIO.2 API is preferred for new code due to better exception handling and richer functionality.

## 🧠 Key Concepts
- **Files.createFile()** — NIO.2 method to create a new empty file; throws `FileAlreadyExistsException` if exists
- **File.createNewFile()** — Legacy method; returns `true` if file was created, `false` if it already exists
- **Files.createDirectory()** — Creates a single directory; throws if parent doesn't exist or directory exists
- **Files.createDirectories()** — Creates directories including nonexistent parent directories (like `mkdir -p`)
- **Files.createTempFile()** — Creates a temporary file in a specified (or default temp) directory
- **Files.createTempDirectory()** — Creates a temporary directory
- **Files.writeString()** — Creates a file and writes a `CharSequence` to it (Java 11+)
- **Files.write()** — Creates a file and writes bytes or lines to it

## 💻 Syntax
```java
// Create file — NIO.2
Path file = Files.createFile(Paths.get("newfile.txt"));

// Create file — legacy
File file = new File("newfile.txt");
boolean created = file.createNewFile();

// Create directory
Files.createDirectory(Paths.get("mydir"));

// Create directories (including parents)
Files.createDirectories(Paths.get("parent/child/grandchild"));

// Temporary file
Path temp = Files.createTempFile("prefix_", ".tmp");

// Write and create in one step
Files.writeString(Paths.get("hello.txt"), "Hello World");  // Java 11+
Files.write(Paths.get("data.txt"), "Hello\nWorld\n".getBytes());
Files.write(Paths.get("lines.txt"), List.of("Line1", "Line2"));
```

## ✅ Example 1 - Basic

**Problem:** Create a file, a directory, and nested directories using both legacy and NIO.2 APIs. Verify existence.

**Code:**
```java
import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Legacy — File.createNewFile()
        File legacyFile = new File("legacy_file.txt");
        if (legacyFile.createNewFile()) {
            System.out.println("Created legacy file: " + legacyFile.getName());
        }

        // Legacy — mkdir vs mkdirs
        File singleDir = new File("single_dir");
        singleDir.mkdir();
        System.out.println("Created single directory: " + singleDir.getName());

        File nestedDir = new File("parent/child/grandchild");
        boolean allCreated = nestedDir.mkdirs();  // creates parents too
        System.out.println("Created nested directories: " + allCreated);

        // NIO.2 — Files.createFile()
        Path nioFile = Files.createFile(Paths.get("nio_file.txt"));
        System.out.println("Created NIO file: " + nioFile);

        // NIO.2 — Files.createDirectories()
        Path deepDir = Files.createDirectories(Paths.get("a/b/c/d"));
        System.out.println("Created nested NIO dirs: " + deepDir);

        // Verify
        System.out.println("\nAll exist? " + (
            Files.exists(Paths.get("legacy_file.txt")) &&
            Files.exists(Paths.get("parent/child/grandchild")) &&
            Files.exists(Paths.get("a/b/c/d"))
        ));
    }
}
```

**Output:**
```
Created legacy file: legacy_file.txt
Created single directory: single_dir
Created nested directories: true
Created NIO file: nio_file.txt
Created nested NIO dirs: a\b\c\d
All exist? true
```

**Explanation:** `createNewFile()` returns boolean (no exception if file exists). `Files.createFile()` throws `FileAlreadyExistsException`. `mkdir()` creates only the last directory; `mkdirs()` and `Files.createDirectories()` create parent directories.

## 🚀 Example 2 - Intermediate

**Problem:** Create a temporary file, write structured data to it using `Files.writeString()` and `Files.write()`, then verify the content.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a temp directory
        Path tempDir = Files.createTempDirectory("myapp_");
        System.out.println("Temp directory: " + tempDir);

        // Create temp file with custom prefix and suffix
        Path tempFile = Files.createTempFile(tempDir, "log_", ".txt");
        System.out.println("Temp file: " + tempFile);

        // Write a string (Java 11+)
        Files.writeString(tempFile, "Application started at 10:00 AM\n");
        System.out.println("Written string successfully");

        // Write multiple lines
        List<String> lines = List.of(
            "INFO: Loading configuration",
            "INFO: Database connected",
            "WARN: Memory usage at 80%",
            "INFO: Ready"
        );
        Files.write(tempFile, lines, StandardOpenOption.APPEND);
        System.out.println("Appended " + lines.size() + " lines");

        // Write raw bytes
        byte[] footer = "\n--- End of log ---\n".getBytes();
        Files.write(tempFile, footer, StandardOpenOption.APPEND);

        // Verify
        String content = Files.readString(tempFile);
        System.out.println("\n--- File Content ---");
        System.out.println(content);

        // Cleanup
        Files.delete(tempFile);
        Files.delete(tempDir);
        System.out.println("Cleaned up temp files.");
    }
}
```

**Output:**
```
Temp directory: C:\Users\...\TempDir\myapp_123456
Temp file: C:\Users\...\TempDir\myapp_123456\log_789.txt
Written string successfully
Appended 4 lines

--- File Content ---
Application started at 10:00 AM
INFO: Loading configuration
INFO: Database connected
WARN: Memory usage at 80%
INFO: Ready
--- End of log ---

Cleaned up temp files.
```

**Explanation:** `createTempFile/Directory` creates uniquely named resources. `Files.writeString()` writes a `CharSequence`. `Files.write()` accepts `List<String>` or `byte[]`. `StandardOpenOption.APPEND` adds to existing content instead of overwriting.

## 🏢 Real World Use Case
An application installer creates a directory structure (`app/config`, `app/logs`, `app/data`), a temporary extraction directory, and writes default configuration files using `Files.createDirectories()` and `Files.writeString()`.

## 🎯 Interview Questions

**1. What happens if you call Files.createFile() on an existing file?**
It throws `FileAlreadyExistsException`. Use `Files.exists()` to check first, or use `Files.write()` with `StandardOpenOption.CREATE` which creates only if not exists.

**2. What is the difference between mkdir() and mkdirs()?**
`mkdir()` creates only the final directory and fails if parent doesn't exist. `mkdirs()` creates all necessary parent directories (like `mkdir -p`).

**3. How do you create a temporary file with a specific extension?**
Use `Files.createTempFile(prefix, suffix)` where suffix is the extension (e.g., `".tmp"`, `".log"`). For no suffix, pass `null`.

**4. Can Files.writeString() create a new file?**
Yes. If the file doesn't exist, `Files.writeString()` creates it. If it exists, it overwrites by default (use `StandardOpenOption.APPEND` to append).

**5. What is the advantage of Files.createDirectories() over File.mkdirs()?**
`Files.createDirectories()` throws `IOException` on failure (providing clear error information), while `File.mkdirs()` returns a boolean with no explanation. NIO.2 also supports setting file attributes atomically.

## ⚠ Common Errors / Mistakes
- Calling `Files.createFile()` without checking `Files.exists()` first — causes `FileAlreadyExistsException`
- Using `mkdir()` when `mkdirs()` is needed — silently fails to create directory
- Forgetting that `Files.writeString()` and `Files.write()` overwrite existing files by default
- Not closing resources when using `FileOutputStream` or `FileWriter` — use try-with-resources
- Creating files in directories that don't exist — `createFile()` and `createDirectory()` throw `NoSuchFileException`

## 📝 Practice Exercises

**Beginner:**
1. Create a file named "hello.txt" in the current directory. Check if it exists and print its path.
2. Create directories "year/month/day" using `mkdirs()`. Verify they exist.
3. Use `Files.createTempFile()` to create a temporary file, write "temp data" to it, then delete it.

**Intermediate:**
4. Write a program that creates a directory structure for a project: `src/main/java`, `src/main/resources`, `src/test/java`.
5. Create a file "config.properties" with 3 key-value pairs using `Files.write()` and `List<String>`.
6. Create 10 numbered temporary log files in a temp directory, write different content to each, then list them.

**Advanced:**
7. Build a file generator that creates a nested test data structure with configurable depth (e.g., `dir1/dir2/.../dirN/file.txt`) using `Files.createDirectories()` and `Files.writeString()`, with performance measurement.
8. Implement an atomic file creation utility that creates a file only if it doesn't exist (using `StandardOpenOption.CREATE_NEW` on a `FileChannel`), useful for preventing race conditions in multi-threaded file creation.
