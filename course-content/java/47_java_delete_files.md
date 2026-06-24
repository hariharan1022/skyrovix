## 47. Java Delete Files

## 📘 Introduction
Java provides both legacy (`File.delete()`) and modern NIO.2 (`Files.delete()`, `Files.deleteIfExists()`) APIs for deleting files and directories. Deleting non-empty directories requires special handling to remove children before the parent.

## 🧠 Key Concepts
- **File.delete()** — Legacy method; returns `true` if deleted, `false` otherwise (no exception)
- **Files.delete()** — NIO.2 method; throws `NoSuchFileException` if path doesn't exist
- **Files.deleteIfExists()** — NIO.2 method; returns `true` if deleted, `false` if doesn't exist (no exception for missing file)
- **Recursive directory deletion** — Delete all children before deleting the parent directory
- **Files.walk() + sorted(Comparator.reverseOrder())** — The standard pattern for recursive deletion: walk the tree, sort in reverse order so children are deleted before parents

## 💻 Syntax
```java
// Legacy — File.delete()
File file = new File("file.txt");
boolean deleted = file.delete();  // returns false silently on failure

// NIO.2 — Files.delete()
Files.delete(Paths.get("file.txt"));  // throws NoSuchFileException if missing

// NIO.2 — Files.deleteIfExists()
boolean deleted = Files.deleteIfExists(Paths.get("file.txt"));  // no exception if missing

// Recursive directory deletion (NIO.2)
Files.walk(directory)
     .sorted(Comparator.reverseOrder())
     .map(Path::toFile)
     .forEach(File::delete);

// Recursive with Files.delete() and exception handling
Files.walk(directory)
     .sorted(Comparator.reverseOrder())
     .forEach(path -> {
         try {
             Files.delete(path);
         } catch (IOException e) {
             System.err.println("Failed to delete: " + path);
         }
     });
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate the three basic deletion methods — `File.delete()`, `Files.delete()`, and `Files.deleteIfExists()`. Show behavior with existing and non-existing files.

**Code:**
```java
import java.io.*;
import java.nio.file.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create test files
        Files.writeString(Paths.get("file_legacy.txt"), "Legacy test");
        Files.writeString(Paths.get("file_nio.txt"), "NIO test");
        Files.writeString(Paths.get("file_exists.txt"), "Will be deleted");

        // 1. Legacy File.delete()
        File legacyFile = new File("file_legacy.txt");
        if (legacyFile.delete()) {
            System.out.println("Legacy delete: SUCCESS");
        } else {
            System.out.println("Legacy delete: FAILED");
        }

        // Try deleting non-existent file with legacy — returns false silently
        File nonExistent = new File("ghost.txt");
        System.out.println("Legacy delete (non-existent): " + nonExistent.delete());

        // 2. Files.delete() — throws exception on missing file
        try {
            Files.delete(Paths.get("file_nio.txt"));
            System.out.println("NIO delete: SUCCESS");
        } catch (NoSuchFileException e) {
            System.out.println("NIO delete: FILE NOT FOUND — " + e.getMessage());
        }

        // 3. Files.deleteIfExists() — no exception on missing
        boolean deleted1 = Files.deleteIfExists(Paths.get("file_exists.txt"));
        System.out.println("deleteIfExists (exists): " + deleted1);

        boolean deleted2 = Files.deleteIfExists(Paths.get("ghost.txt"));
        System.out.println("deleteIfExists (ghost): " + deleted2);
    }
}
```

**Output:**
```
Legacy delete: SUCCESS
Legacy delete (non-existent): false
NIO delete: SUCCESS
deleteIfExists (exists): true
deleteIfExists (ghost): false
```

**Explanation:** `File.delete()` silently returns false on failure. `Files.delete()` throws `NoSuchFileException` if file doesn't exist. `Files.deleteIfExists()` combines the best of both — returns boolean without exception for missing files.

## 🚀 Example 2 - Intermediate

**Problem:** Recursively delete a directory tree using the `Files.walk().sorted(reverseOrder())` pattern. Demonstrate both successful deletion and error handling.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a test directory tree
        Path root = Files.createTempDirectory("delete_demo");
        Files.createDirectories(root.resolve("sub1/subsub"));
        Files.createDirectories(root.resolve("sub2"));
        Files.writeString(root.resolve("file1.txt"), "File 1");
        Files.writeString(root.resolve("sub1/file2.txt"), "File 2");
        Files.writeString(root.resolve("sub1/subsub/file3.txt"), "File 3");

        System.out.println("Created directory tree at: " + root);
        printTree(root);

        // Recursive delete using Files.walk() + sorted(reverseOrder())
        System.out.println("\nDeleting recursively...");
        Files.walk(root)
             .sorted(Comparator.reverseOrder())
             .forEach(path -> {
                 try {
                     Files.delete(path);
                     System.out.println("Deleted: " + path.getFileName());
                 } catch (IOException e) {
                     System.err.println("Failed to delete: " + path + " — " + e.getMessage());
                 }
             });

        System.out.println("\nTree exists after delete? " + Files.exists(root));

        // Demonstrate that the pattern works correctly: children before parents
        Path demo = Files.createTempDirectory("order_demo");
        Files.createDirectories(demo.resolve("a/b/c"));
        System.out.println("\n--- Order demonstration ---");
        Files.walk(demo)
             .sorted(Comparator.reverseOrder())
             .forEach(p -> System.out.println("  " + (Files.isDirectory(p) ? "[DIR]" : "[FILE]") + " " + demo.relativize(p)));
    }

    private static void printTree(Path root) throws IOException {
        Files.walk(root).forEach(p -> {
            long depth = p.getNameCount() - root.getNameCount();
            String indent = "  ".repeat((int) depth);
            System.out.println(indent + (Files.isDirectory(p) ? "[DIR]" : "[FILE]") + " " + p.getFileName());
        });
    }
}
```

**Output:**
```
Created directory tree at: C:\Users\...\TempDir\delete_demo123
[DIR] delete_demo123
  [FILE] file1.txt
  [DIR] sub1
    [FILE] file2.txt
    [DIR] subsub
      [FILE] file3.txt
  [DIR] sub2

Deleting recursively...
Deleted: file3.txt
Deleted: subsub
Deleted: file2.txt
Deleted: sub1
Deleted: sub2
Deleted: file1.txt
Deleted: delete_demo123

Tree exists after delete? false

--- Order demonstration ---
  [DIR] c
  [DIR] b
  [DIR] a
  [DIR] order_demo
```

**Explanation:** The `sorted(Comparator.reverseOrder())` ensures that files and subdirectories (deeper paths sort first lexicographically) are deleted before their parent directories. This is the standard Java pattern for recursive deletion.

## 🏢 Real World Use Case
A CI/CD pipeline cleanup agent uses `Files.walk().sorted(reverseOrder()).forEach(Files::delete)` to remove old build artifact directories after a retention period expires, logging each deletion for audit purposes.

## 🎯 Interview Questions

**1. What is the difference between Files.delete() and Files.deleteIfExists()?**
`Files.delete()` throws `NoSuchFileException` if the file doesn't exist. `deleteIfExists()` returns `false` instead of throwing an exception.

**2. Can File.delete() delete a non-empty directory?**
No. `File.delete()` (and `Files.delete()`) can only delete empty directories. For non-empty directories, you must recursively delete all children first.

**3. Why does the recursive deletion pattern use sorted(Comparator.reverseOrder())?**
Paths are sorted in reverse lexical order so that deeper paths (children) come before shallower paths (parents). Since `\a\b\c` sorts after `\a\b`, reversing ensures children are deleted before parents.

**4. What happens if you try to delete a file that is open by another process?**
On Windows, the deletion fails with `FileSystemException` (file is in use). On Unix/Linux, the file is typically deleted but remains accessible to the process that has it open.

**5. Is there an atomic delete operation for directory trees?**
No, Java doesn't have a single atomic call for recursive deletion. The `Files.walk().sorted(reverseOrder())` pattern is the standard approach.

## ⚠ Common Errors / Mistakes
- Using `File.delete()` and ignoring the boolean return value — failure goes unnoticed
- Calling `Files.delete()` on a non-existent file — throws `NoSuchFileException`
- Trying to delete a non-empty directory without first deleting its children
- Using `Files.walk()` without `sorted(reverseOrder())` — fails because parent still has children
- Not catching `DirectoryNotEmptyException` or `FileSystemException` during deletion

## 📝 Practice Exercises

**Beginner:**
1. Create a temporary file, delete it using `File.delete()`, and print whether deletion succeeded.
2. Use `Files.deleteIfExists()` to delete a file that may or may not exist. Print the return value.
3. Create a single empty directory and delete it using `Files.delete()`.

**Intermediate:**
4. Write a recursive delete method that uses `Files.walkFileTree()` with a `SimpleFileVisitor` — override `visitFile()` and `postVisitDirectory()` to delete each.
5. Create a directory tree with 3 levels of nested directories, each containing a file. Delete the entire tree using `Files.walk().sorted(reverseOrder()).forEach()`.
6. Write a program that deletes all `.tmp` files in a directory tree (not the directories containing them).

**Advanced:**
7. Implement a safe delete utility that moves files to a "trash/recycle" directory first, with a restore option, and permanently deletes trashed files after 30 days.
8. Build a parallel recursive delete using `Files.walk()` + `parallel()` + `sorted(reverseOrder())` with a `Phaser` to coordinate concurrent deletions, handling concurrency exceptions properly.
