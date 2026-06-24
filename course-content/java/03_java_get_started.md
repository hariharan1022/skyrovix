## 3. Java Get Started

## 📘 Introduction

To write and run Java programs, you need the **Java Development Kit (JDK)** installed. The JDK includes the compiler (`javac`), the runtime (`java`), and libraries. After setup, you can write code in any text editor or use an **Integrated Development Environment (IDE)** like IntelliJ IDEA, Eclipse, or VS Code.

**Prerequisites:**
- A computer with Windows, macOS, or Linux
- Internet connection to download JDK
- 500 MB free disk space

## 🧠 Key Concepts

| Term | Description |
|------|-------------|
| `javac` | Java compiler — converts .java source to .class bytecode |
| `java` | Java launcher — runs the compiled .class file |
| `JAVA_HOME` | Environment variable pointing to JDK installation directory |
| `PATH` | System variable that must include `%JAVA_HOME%\bin` |
| IDE | Integrated Development Environment with code completion, debugging, build tools |

## 💻 Syntax

```bash
# --- Command line workflow ---
# 1. Write code
# 2. Compile
javac MyProgram.java
# 3. Run (no .class extension)
java MyProgram
# 4. Check version
java -version
```

```java
// HelloWorld.java — your first program
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Get Started with Java!");
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Install JDK and run your first Java program from the command line.

**Steps:**
1. Download JDK from [oracle.com](https://www.oracle.com/java/) or use OpenJDK
2. Run the installer (e.g., `jdk-17_windows-x64_bin.exe`)
3. Set environment variables:
   - `JAVA_HOME = C:\Program Files\Java\jdk-17`
   - Add `%JAVA_HOME%\bin` to `PATH`
4. Verify in terminal: `java -version`

**Code:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Java is working!");
    }
}
```

**Output:**
```
Java is working!
```

**Explanation:** After setting up the JDK and compiling with `javac HelloWorld.java`, running `java HelloWorld` executes the bytecode.

## 🚀 Example 2 - Intermediate

**Problem:** Write a program that accepts command-line arguments and prints system info.

**Code:**
```java
public class SystemCheck {
    public static void main(String[] args) {
        System.out.println("Java Home: " + System.getProperty("java.home"));
        System.out.println("User: " + System.getProperty("user.name"));
        if (args.length > 0) {
            System.out.println("Arguments received:");
            for (int i = 0; i < args.length; i++) {
                System.out.println("  args[" + i + "] = " + args[i]);
            }
        } else {
            System.out.println("No command-line arguments.");
        }
    }
}
```

**Command:** `java SystemCheck hello world`

**Output:**
```
Java Home: C:\Program Files\Java\jdk-17
User: john
Arguments received:
  args[0] = hello
  args[1] = world
```

**Explanation:** `args` captures command-line arguments as a `String[]`. The `System.getProperty()` method reads JVM and OS configuration.

## 🏢 Real World Use Case

**CI/CD Pipeline Setup:** A DevOps engineer configures a Jenkins build server. The pipeline installs JDK 17 via a script, sets `JAVA_HOME` and `PATH`, then runs `mvn clean install` for a Spring Boot microservice. Multiple JDK versions (8, 11, 17) are managed with `JAVA_HOME` switching per job.

## 🎯 Interview Questions

**1. What is the difference between PATH and JAVA_HOME?**  
PATH tells the OS where to find executables (javac, java). JAVA_HOME is used by build tools (Maven, Gradle) to locate the JDK.

**2. Can you have multiple JDK versions installed?**  
Yes. Each version in its own directory. Switch by updating JAVA_HOME and reordering PATH entries.

**3. What is the purpose of the `javac` command?**  
`javac` (Java compiler) reads `.java` source files and produces `.class` bytecode files that the JVM can execute.

**4. Why do I get "javac is not recognized"?**  
The JDK `bin` directory is not in your system PATH, or you installed only the JRE (which has `java` but not `javac`).

**5. What IDEs are commonly used for Java development?**  
IntelliJ IDEA (most popular), Eclipse (open-source), VS Code with Java extensions, and NetBeans.

## ⚠ Common Errors / Mistakes

- **Installing JRE instead of JDK** — JRE doesn't include `javac`
- **Wrong JAVA_HOME path** — Must point to JDK root (e.g., `C:\Program Files\Java\jdk-17`), not `bin`
- **Forgetting to save source file** — Compiler will say file not found
- **Running `java HelloWorld.class`** — Should be `java HelloWorld` without extension
- **IDE not recognizing JDK** — Need to configure JDK path in IDE settings

## 📝 Practice Exercises

**Beginner**
1. Install JDK 17 (or latest LTS), verify with `java -version`, and print the output.
2. Create a file `MyName.java` that prints your full name. Compile and run it from the command line.
3. Create a program that prints the `JAVA_HOME` path using `System.getenv("JAVA_HOME")`.

**Intermediate**
4. Write a program that takes a person's name as a command-line argument and prints "Hello, [name]!".
5. Create a program that takes two numbers as command-line arguments, converts them to integers, and prints the sum.
6. Write a script that compiles and runs a Java program, measuring execution time with `time` (Linux) or `Measure-Command` (PowerShell).

**Advanced**
7. Create a multi-file project: `Main.java` calls a static method in `Helper.java`. Compile and run both files from the command line.
8. Write a shell script (bash/batch) that checks if JDK is installed, finds its path, and if not found, downloads and installs it automatically.
