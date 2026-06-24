## 46. Java Read Files

## 📘 Introduction
Java provides multiple ways to read files — character streams (`FileReader`, `BufferedReader`) for text, byte streams (`FileInputStream`) for binary data, object streams (`ObjectInputStream`) for deserialization, and modern NIO.2 convenience methods (`Files.readString()`, `Files.readAllLines()`).

## 🧠 Key Concepts
- **FileReader** — Read character files; usually wrapped for better performance
- **BufferedReader** — Buffered character reading with `readLine()` for line-by-line processing
- **Files.readString()** — Reads entire file into a String (Java 11+)
- **Files.readAllLines()** — Reads all lines into a `List<String>`
- **Scanner for file reading** — Parse tokens from files with `next()`, `nextInt()`, etc.
- **FileInputStream** — Read raw bytes from binary files
- **ObjectInputStream** — Deserialize objects from a file
- **Large file handling** — Stream-based processing to avoid memory issues

## 💻 Syntax
```java
// FileReader
FileReader fr = new FileReader("file.txt");
int ch;
while ((ch = fr.read()) != -1) {
    System.out.print((char) ch);
}
fr.close();

// BufferedReader (line-by-line)
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}
br.close();

// Files.readString (Java 11+)
String content = Files.readString(Paths.get("file.txt"));

// Files.readAllLines
List<String> lines = Files.readAllLines(Paths.get("file.txt"));

// Scanner
Scanner sc = new Scanner(Paths.get("file.txt"));
while (sc.hasNextLine()) {
    System.out.println(sc.nextLine());
}
sc.close();

// FileInputStream (binary)
FileInputStream fis = new FileInputStream("file.bin");
byte[] buffer = new byte[1024];
int bytesRead = fis.read(buffer);
fis.close();

// ObjectInputStream
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("obj.dat"));
MyObject obj = (MyObject) ois.readObject();
ois.close();
```

## ✅ Example 1 - Basic

**Problem:** Read a text file using `FileReader`, `BufferedReader`, and `Files.readString()`. Compare approaches.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        // First, create a test file
        Files.writeString(Paths.get("sample.txt"),
            "Line 1: Hello\nLine 2: World\nLine 3: Java I/O\n");

        // 1. FileReader (character by character)
        System.out.println("--- FileReader ---");
        FileReader fr = new FileReader("sample.txt");
        int ch;
        while ((ch = fr.read()) != -1) {
            System.out.print((char) ch);
        }
        fr.close();

        // 2. BufferedReader (line by line)
        System.out.println("--- BufferedReader ---");
        BufferedReader br = new BufferedReader(new FileReader("sample.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println("Read: " + line);
        }
        br.close();

        // 3. Files.readAllLines (entire file into list)
        System.out.println("--- Files.readAllLines ---");
        List<String> lines = Files.readAllLines(Paths.get("sample.txt"));
        for (int i = 0; i < lines.size(); i++) {
            System.out.println((i + 1) + ": " + lines.get(i));
        }

        // 4. Files.readString (entire file as String)
        System.out.println("--- Files.readString ---");
        String content = Files.readString(Paths.get("sample.txt"));
        System.out.println(content);
    }
}
```

**Output:**
```
--- FileReader ---
Line 1: Hello
Line 2: World
Line 3: Java I/O
--- BufferedReader ---
Read: Line 1: Hello
Read: Line 2: World
Read: Line 3: Java I/O
--- Files.readAllLines ---
1: Line 1: Hello
2: Line 2: World
3: Line 3: Java I/O
--- Files.readString ---
Line 1: Hello
Line 2: World
Line 3: Java I/O
```

**Explanation:** `FileReader` reads one character at a time (inefficient). `BufferedReader.readLine()` reads line-by-line (efficient for large files). `Files.readAllLines()` and `Files.readString()` load the entire file into memory (convenient but not for huge files).

## 🚀 Example 2 - Intermediate

**Problem:** Read binary data from a file using `FileInputStream`, deserialize objects with `ObjectInputStream`, and use `Scanner` for token-based file parsing.

**Code:**
```java
import java.io.*;
import java.nio.file.*;
import java.util.Scanner;

class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    double price;

    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Prepare test data
        Files.writeString(Paths.get("numbers.txt"), "10 20 30 40 50");
        ObjectOutputStream oos = new ObjectOutputStream(
            new FileOutputStream("product.ser"));
        oos.writeObject(new Product("Laptop", 999.99));
        oos.writeObject(new Product("Mouse", 25.50));
        oos.close();

        // 1. Scanner — parse tokenized integers
        System.out.println("--- Scanner token parsing ---");
        Scanner sc = new Scanner(Paths.get("numbers.txt"));
        int sum = 0;
        while (sc.hasNextInt()) {
            int num = sc.nextInt();
            System.out.println("Number: " + num);
            sum += num;
        }
        System.out.println("Sum: " + sum);
        sc.close();

        // 2. FileInputStream — read binary data
        System.out.println("--- Binary read ---");
        FileInputStream fis = new FileInputStream("numbers.txt");
        byte[] buffer = new byte[16];
        int bytesRead = fis.read(buffer);
        System.out.println("Read " + bytesRead + " bytes");
        System.out.println("Raw: " + new String(buffer, 0, bytesRead));
        fis.close();

        // 3. ObjectInputStream — deserialize objects
        System.out.println("--- Object deserialization ---");
        ObjectInputStream ois = new ObjectInputStream(
            new FileInputStream("product.ser"));
        Product p1 = (Product) ois.readObject();
        Product p2 = (Product) ois.readObject();
        ois.close();
        System.out.println("Product 1: " + p1);
        System.out.println("Product 2: " + p2);
    }
}
```

**Output:**
```
--- Scanner token parsing ---
Number: 10
Number: 20
Number: 30
Number: 40
Number: 50
Sum: 150
--- Binary read ---
Read 14 bytes
Raw: 10 20 30 40 50
--- Object deserialization ---
Product 1: Product{name='Laptop', price=999.99}
Product 2: Product{name='Mouse', price=25.5}
```

**Explanation:** `Scanner` is ideal for parsing structured text (integers separated by whitespace). `FileInputStream` reads raw bytes. `ObjectInputStream` reads serialized objects in the same order they were written.

## 🏢 Real World Use Case
A log analysis tool reads a multi-GB log file using `BufferedReader` (streaming line-by-line to avoid OOM), uses `Scanner` for parsing structured log levels timestamps, and writes results to a report file.

## 🎯 Interview Questions

**1. What is the difference between BufferedReader and FileReader?**
`FileReader` reads one character at a time. `BufferedReader` wraps a `FileReader` with a buffer (default 8KB) and provides `readLine()` for efficient line-by-line reading.

**2. When should you NOT use Files.readAllLines() or Files.readString()?**
For large files (e.g., >100MB). These methods load the entire file into memory, which can cause `OutOfMemoryError`. Use `BufferedReader` with streaming for large files.

**3. How do you read an object back from a file?**
Use `ObjectInputStream` wrapped around a `FileInputStream`. Call `readObject()` for each object. Objects are deserialized in FIFO order.

**4. Can Scanner read from a file directly?**
Yes, `new Scanner(Paths.get("file.txt"))` reads from a file. It also supports `new Scanner(new File("file.txt"))`.

**5. How do you handle encoding when reading files?**
Use `InputStreamReader` with a charset: `new BufferedReader(new InputStreamReader(new FileInputStream("file.txt"), StandardCharsets.UTF_8))`. `Files.readString()` also accepts a charset parameter.

## ⚠ Common Errors / Mistakes
- Trying to read from a file that doesn't exist — `FileNotFoundException`
- Calling `readLine()` after the stream is closed — `IOException`
- Casting `readObject()` to wrong type — `ClassCastException`
- Not using try-with-resources — leaking file handles
- Using `read()` (int) on `FileReader` without casting to `char` — prints integer values

## 📝 Practice Exercises

**Beginner:**
1. Read a file "greeting.txt" using `BufferedReader` and print each line.
2. Use `Files.readString()` to read a short file and print its length.
3. Read integers from a file "data.txt" using `Scanner` and compute their average.

**Intermediate:**
4. Write a word count program that reads a text file and reports total lines, words, and characters.
5. Deserialize a list of `Employee` objects from a file. Print all employees earning more than $50,000.
6. Read a CSV file line by line. Parse each line, skip the header, and compute column averages.

**Advanced:**
7. Implement a memory-efficient large file processor that reads a 1GB+ log file using `BufferedReader`, filters lines matching a regex pattern in real-time, and writes matching lines to a new file — without loading the entire file into memory.
8. Build a simple binary file format reader that reads a custom file header (magic number, version, record count) and then reads variable-length records using `DataInputStream` with correct endianness handling.
