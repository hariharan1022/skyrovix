## 43. Java Files

## 📘 Introduction
Java provides two major file I/O APIs: the legacy `java.io.File` class and the modern `java.nio.file` package (NIO.2, introduced in Java 7). The NIO.2 API is more powerful, flexible, and should be preferred for new development.

## 🧠 Key Concepts
- **java.io.File** — Legacy class for file/directory path representation and basic operations
- **java.nio.file.Path** — Modern path representation (replacement for `File`)
- **java.nio.file.Files** — Utility class with static methods for file operations
- **Creating files/directories** — `Files.createFile()`, `Files.createDirectory()`, `Files.createDirectories()`
- **File attributes** — Read/write/modify timestamps, permissions, size, type
- **File operations** — exists, delete, rename, copy, move
- **FileVisitor** — Traverse directory trees with `SimpleFileVisitor` / `FileVisitor`
- **java.nio.file classes** — `Paths`, `Path`, `Files`, `FileSystem`, `FileStore`, `WatchService`

## 💻 Syntax
```java
// Legacy File API
File file = new File("example.txt");
boolean exists = file.exists();
boolean deleted = file.delete();
boolean renamed = file.renameTo(new File("renamed.txt"));

// Modern NIO.2 API
Path path = Paths.get("example.txt");
boolean exists = Files.exists(path);
Files.delete(path);
Files.move(path, Paths.get("moved.txt"), StandardCopyOption.REPLACE_EXISTING);

// Directory traversal
Files.walkFileTree(startPath, new SimpleFileVisitor<Path>() {
    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        System.out.println(file);
        return FileVisitResult.CONTINUE;
    }
});
```

## ✅ Example 1 - Basic

**Problem:** Use both `java.io.File` and `java.nio.file.Files` to check file existence, read file attributes, and perform basic operations.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a test file
        Path testPath = Paths.get("test_file.txt");
        Files.writeString(testPath, "File operations demo");

        // Legacy File API
        File legacyFile = new File("test_file.txt");
        System.out.println("Legacy API:");
        System.out.println("  Exists: " + legacyFile.exists());
        System.out.println("  Size: " + legacyFile.length() + " bytes");
        System.out.println("  Absolute: " + legacyFile.getAbsolutePath());

        // Modern NIO.2 API
        Path modernPath = Paths.get("test_file.txt");
        System.out.println("\nNIO.2 API:");
        System.out.println("  Exists: " + Files.exists(modernPath));
        System.out.println("  Size: " + Files.size(modernPath) + " bytes");

        BasicFileAttributes attrs = Files.readAttributes(modernPath, BasicFileAttributes.class);
        System.out.println("  Created: " + attrs.creationTime());
        System.out.println("  Modified: " + attrs.lastModifiedTime());
        System.out.println("  Is directory: " + attrs.isDirectory());

        // Cleanup
        Files.delete(modernPath);
        System.out.println("\nDeleted: " + !Files.exists(modernPath));
    }
}
```

**Output:**
```
Legacy API:
  Exists: true
  Size: 19 bytes
  Absolute: C:\Users\...\test_file.txt

NIO.2 API:
  Exists: true
  Size: 19 bytes
  Created: 2026-06-23T10:00:00Z
  Modified: 2026-06-23T10:00:00Z
  Is directory: false

Deleted: true
```

**Explanation:** Both APIs work, but NIO.2 provides richer attribute access and better error handling via exceptions. Prefer NIO.2 for new code.

## 🚀 Example 2 - Intermediate

**Problem:** Traverse a directory tree using `Files.walkFileTree()` with a `SimpleFileVisitor` to count files, directories, and total size.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.*;
import java.util.concurrent.atomic.*;

public class DirectoryStats extends SimpleFileVisitor<Path> {
    private final AtomicLong fileCount = new AtomicLong();
    private final AtomicLong dirCount = new AtomicLong();
    private final AtomicLong totalSize = new AtomicLong();

    @Override
    public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
        dirCount.incrementAndGet();
        System.out.println("Entering: " + dir);
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
        fileCount.incrementAndGet();
        totalSize.addAndGet(attrs.size());
        System.out.println("  File: " + file.getFileName() + " (" + attrs.size() + " bytes)");
        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFileFailed(Path file, IOException exc) {
        System.err.println("Failed: " + file + " — " + exc.getMessage());
        return FileVisitResult.CONTINUE;
    }

    public static void main(String[] args) throws Exception {
        // Create a small test directory structure
        Path tempDir = Files.createTempDirectory("walker_demo");
        Files.createDirectories(tempDir.resolve("sub1/subsub"));
        Files.createDirectories(tempDir.resolve("sub2"));
        Files.writeString(tempDir.resolve("file1.txt"), "Hello");
        Files.writeString(tempDir.resolve("sub1/file2.txt"), "World");
        Files.writeString(tempDir.resolve("sub1/subsub/file3.txt"), "Java NIO");

        DirectoryStats stats = new DirectoryStats();
        Files.walkFileTree(tempDir, stats);

        System.out.println("\n--- Summary ---");
        System.out.println("Directories: " + stats.dirCount.get());
        System.out.println("Files: " + stats.fileCount.get());
        System.out.println("Total size: " + stats.totalSize.get() + " bytes");

        // Cleanup
        Files.walk(tempDir)
             .sorted(java.util.Comparator.reverseOrder())
             .map(Path::toFile)
             .forEach(File::delete);
    }
}
```

**Output:**
```
Entering: C:\Users\...\TempDir123
  File: file1.txt (5 bytes)
Entering: C:\Users\...\TempDir123\sub1
  File: file2.txt (5 bytes)
Entering: C:\Users\...\TempDir123\sub1\subsub
  File: file3.txt (8 bytes)
Entering: C:\Users\...\TempDir123\sub2

--- Summary ---
Directories: 4
Files: 3
Total size: 18 bytes
```

**Explanation:** `SimpleFileVisitor` lets you override visit methods to customize traversal behavior. `preVisitDirectory` runs when entering a directory; `visitFile` runs for each file. The recursive delete uses the `sorted(reverseOrder())` pattern to delete children before parents.

## 🏢 Real World Use Case
A backup application uses `Files.walkFileTree()` to archive a project directory. It skips `.git` folders via `preVisitDirectory`, tracks file count and size for progress reporting, and copies files to a ZIP-backed file system.

## 🎯 Interview Questions

**1. What is the difference between java.io.File and java.nio.file.Path?**
`File` is legacy, has limited methods, and many methods return boolean (no exceptions). `Path` is immutable, integrates with `Files` utility, supports symbolic links, and throws meaningful exceptions on failure.

**2. How do you recursively delete a directory in Java?**
Use `Files.walk(target).sorted(Comparator.reverseOrder()).map(Path::toFile).forEach(File::delete)` — this deletes children before parents.

**3. What is FileVisitor and when would you use it?**
`FileVisitor` is an interface for traversing directory trees. It provides callbacks for `preVisitDirectory`, `visitFile`, `visitFileFailed`, and `postVisitDirectory`. Use it for recursive operations like search, copy, or size calculation.

**4. How do symbolic links affect file operations?**
By default, most `Files` methods follow symbolic links. Use `LinkOption.NOFOLLOW_LINKS` to avoid following them (e.g., when checking existence or reading attributes).

**5. What is WatchService?**
`WatchService` is a NIO.2 feature that monitors directories for changes (create, modify, delete) in real-time, useful for file watchers.

## ⚠ Common Errors / Mistakes
- Mixing `\` path separators on Windows — use `Paths.get()` or `/` (Java normalizes it)
- Assuming `File.delete()` or `Files.delete()` works on non-empty directories — they throw `DirectoryNotEmptyException`
- Not using `try-catch` with NIO.2 methods — many throw `IOException`
- Using `File` length() for directories — returns 0; use `Files.walkFileTree()` or `Files.size()` on files
- Forgetting `LinkOption` when dealing with symbolic links

## 📝 Practice Exercises

**Beginner:**
1. Write a program that creates a directory "backup", a file "notes.txt" inside it, and deletes the file.
2. Use `java.io.File` to list all files and directories in the current working directory.
3. Use `java.nio.file.Files` to check if a file exists, is readable, and is writable.

**Intermediate:**
4. Write a utility that finds all `.java` files in a directory tree and counts the total lines of code.
5. Implement a directory synchronizer — compare two directories and list files that are present in one but not the other.
6. Use `Files.walkFileTree()` to find the 5 largest files in a directory tree (including subdirectories).

**Advanced:**
7. Build a simple file system watcher using `WatchService` that monitors a directory and logs all create, modify, and delete events.
8. Implement a cross-platform file copy utility that preserves file attributes (timestamps, permissions) using `Files.copy()` with `COPY_ATTRIBUTES`, and handles symbolic links correctly.
