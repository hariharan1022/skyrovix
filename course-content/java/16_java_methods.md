## 16. Java Methods

## 📘 Introduction
A method in Java is a block of code that performs a specific task. Methods allow code reuse, modularity, and better organization. Every Java method must belong to a class.

## 🧠 Key Concepts
- **Method Declaration**: access modifier, return type, name, parameter list, body
- **Calling Methods**: invoking a method by name with arguments
- **Return Statement**: sends a value back to the caller; exits the method
- **Method Overloading**: same method name, different parameter lists
- **Pass by Value vs Reference**: Java passes primitives by value; objects pass reference by value
- **Void Method**: a method that does not return a value
- **Method Signature**: method name + parameter list (used by compiler to distinguish overloads)

## 💻 Syntax
```java
accessModifier returnType methodName(parameterList) {
    // method body
    return value; // optional if void
}
```

## ✅ Example 1 - Basic

**Problem:** Create a method that calculates the area of a rectangle and returns the result.

**Code:**
```java
public class RectangleArea {
    public static double calculateArea(double length, double width) {
        return length * width;
    }

    public static void main(String[] args) {
        double area = calculateArea(5.0, 3.0);
        System.out.println("Area: " + area);
    }
}
```

**Output:**
```
Area: 15.0
```

**Explanation:** The method `calculateArea` takes two double parameters, multiplies them, and returns the result. The `main` method calls it and prints the area.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate method overloading by creating three `add` methods for different parameter types.

**Code:**
```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));
        System.out.println(calc.add(2.5, 3.7));
        System.out.println(calc.add(1, 2, 3));
    }
}
```

**Output:**
```
5
6.2
6
```

**Explanation:** Three methods share the name `add` but differ in parameter types or count. The compiler selects the correct version at compile time based on the arguments.

## 🏢 Real World Use Case
- **Utility classes** like `Math` or `Collections` expose static methods for common operations
- **Spring Boot service layers** use methods to encapsulate business logic (e.g., `findUserById`, `saveOrder`)
- **API endpoints** in controllers map to handler methods

## 🎯 Interview Questions

**Q1: What is a method signature in Java?**
A: The method name and parameter list (types and order). Return type and access modifier are NOT part of the signature.

**Q2: Can a method return multiple values in Java?**
A: No, a method returns only one value. You can return an array, a collection, or a custom object to bundle multiple values.

**Q3: Does Java support pass-by-reference?**
A: No. Java is strictly pass-by-value. Object references are passed by value, meaning the reference itself is copied.

**Q4: Can we declare a method inside another method?**
A: No, but we can define local inner classes with methods (Java 16+ also allows local methods via lambdas).

**Q5: What happens if a method does not include a return statement when it should?**
A: The compiler throws a "missing return statement" error unless the method is declared void.

## ⚠ Common Errors / Mistakes
- Forgetting to specify the return type (even `void`)
- Missing `return` statement in a non-void method
- Confusing method signature with return type (return type does not disambiguate overloads)
- Modifying a parameter's reference inside a method and expecting the caller to see it
- Using the same method name with the same parameters but different return types — not allowed

## 📝 Practice Exercises

**Beginner:**
1. Write a method `isEven(int number)` that returns `true` if the number is even.
2. Write a void method `printGreeting(String name)` that prints "Hello, [name]!".
3. Write a method `maxOfThree(int a, int b, int c)` that returns the largest of three integers.

**Intermediate:**
4. Create a `BankAccount` class with methods `deposit`, `withdraw`, and `getBalance`. Ensure you cannot withdraw more than the balance.
5. Write an overloaded `print` method that accepts: (int), (double), (String), and (int, String). Each prints appropriately.
6. Implement a method `swap(int[] arr, int i, int j)` that swaps two elements in an array. Verify the caller sees the change.

**Advanced:**
7. Write a method `evaluateExpression(String expr)` that parses a simple arithmetic expression like "3+5" and returns the result, using methods for parsing and computing.
8. Implement a method `flatten(Object[] nestedArray)` that recursively flattens a nested array of integers into a single-level `int[]`.
