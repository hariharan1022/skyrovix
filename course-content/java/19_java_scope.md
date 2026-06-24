## 19. Java Scope

## 📘 Introduction
Scope defines where a variable is accessible within a Java program. Understanding scope prevents naming conflicts, manages memory, and ensures data is available where needed.

## 🧠 Key Concepts
- **Block Scope (`{}`)**: variables declared inside a block are only accessible within that block
- **Method Scope**: parameters and local variables declared in a method are accessible only inside that method
- **Class Scope**: instance variables (fields) are accessible throughout the class
- **Local vs Instance vs Class Variables**: local (inside method), instance (per object), static/class (shared across all objects)
- **Shadowing**: when a local variable has the same name as a field, the local variable shadows (hides) the field
- **Variable Hiding**: when a subclass declares a field with the same name as a parent class field

## 💻 Syntax
```java
public class ScopeDemo {
    int instanceVar = 10;        // class / instance scope
    static int classVar = 20;    // class (static) scope

    public void method(int param) {   // param has method scope
        int localVar = 30;            // block/method scope
        if (true) {
            int blockVar = 40;        // block scope only
        }
        // blockVar not accessible here
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Show how block scope works with nested blocks.

**Code:**
```java
public class BlockScope {
    public static void main(String[] args) {
        int x = 10;
        if (x > 5) {
            int y = 20;
            System.out.println("Inside block: x=" + x + ", y=" + y);
        }
        // System.out.println(y); // Compile error: y cannot be resolved
        System.out.println("Outside block: x=" + x);
    }
}
```

**Output:**
```
Inside block: x=10, y=20
Outside block: x=10
```

**Explanation:** `y` is declared inside the `if` block and is not accessible outside it. `x` is declared in the outer method scope and is accessible everywhere inside `main`.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate variable shadowing where a local variable hides a field.

**Code:**
```java
public class ShadowDemo {
    int value = 100;

    public void setValue(int value) {
        // parameter 'value' shadows the field 'value'
        this.value = value;  // 'this.value' refers to the field
    }

    public void printValue() {
        int value = 999;     // local variable shadows the field
        System.out.println("Local: " + value);
        System.out.println("Field: " + this.value);
    }

    public static void main(String[] args) {
        ShadowDemo sd = new ShadowDemo();
        sd.setValue(50);
        sd.printValue();
    }
}
```

**Output:**
```
Local: 999
Field: 50
```

**Explanation:** Inside `printValue`, the local `value` shadows the instance field. Using `this.value` explicitly accesses the field.

## 🏢 Real World Use Case
- Loop variables in `for` loops have block scope; declaring them outside can cause unintended reuse
- Shadowing is common in constructors and setters: `this.name = name;`
- Static variables are shared across instances, useful for counters or configuration

## 🎯 Interview Questions

**Q1: What is scope in Java?**
A: Scope determines the visibility and lifetime of a variable. Variables are accessible only within the block where they are declared.

**Q2: Can a local variable have the same name as an instance variable?**
A: Yes. The local variable shadows the instance variable within that block. Use `this` to access the instance variable.

**Q3: What is the difference between shadowing and variable hiding?**
A: Shadowing occurs within the same class when a local/parameter has the same name as a field. Hiding occurs when a subclass declares a field with the same name as a parent field.

**Q4: What is the scope of a variable declared in a for loop header?**
A: It is block-scoped to the for loop body. Example: `for (int i = 0; i < 10; i++)` — `i` is not accessible after the loop.

**Q5: Can we declare two variables with the same name in the same scope?**
A: No. The compiler will report a "duplicate variable" error.

## ⚠ Common Errors / Mistakes
- Trying to use a variable outside its block
- Declaring two local variables with the same name in overlapping scopes
- Forgetting `this` when a local variable shadows a field
- Assuming a `for` loop variable is accessible after the loop
- Using a variable before it is declared within a block

## 📝 Practice Exercises

**Beginner:**
1. Write a program that demonstrates that a variable declared inside a `for` loop is not accessible after the loop.
2. Create a class with an instance field `name` and a method that declares a local variable `name` — show what happens when you print `name` vs `this.name`.
3. Write a program that shows a variable declared in an `if-else` block is not accessible outside both blocks.

**Intermediate:**
4. Write a class `Counter` with a static `int count` field. Create three instances and increment count. Print the static field from each instance and from the class.
5. Create a class that has a method parameter `int id` that shadows the field `int id`. Use `this.id` correctly and demonstrate the shadowing.
6. Write nested blocks (a block inside another block) where the outer block declares a variable and the inner block declares another variable with the same name. Observe the compile error and fix it with different names.

**Advanced:**
7. Create a class hierarchy where the parent class has a field `String type`, and the subclass also declares `String type`. Show that the subclass field hides the parent field and how to access the parent field using a reference of the parent type.
8. Implement a `ScopeAnalyzer` utility that, given a method as a string (simulated), identifies all variable declarations and their scopes based on brace matching.
