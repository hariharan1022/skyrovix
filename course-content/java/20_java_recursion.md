## 20. Java Recursion

## 📘 Introduction
Recursion is a technique where a method calls itself to solve a problem by breaking it into smaller subproblems. Every recursive solution requires a base case to terminate and a recursive case to progress.

## 🧠 Key Concepts
- **Recursive Methods**: methods that call themselves
- **Base Case**: condition that stops recursion
- **Recursive Case**: the method calling itself with a smaller input
- **Factorial**: classic example — `n! = n * (n-1)!`
- **Fibonacci**: `f(n) = f(n-1) + f(n-2)` with base cases f(0)=0, f(1)=1
- **Recursion vs Iteration**: recursion uses call stacks; iteration uses loops
- **Stack Overflow**: occurs when recursion depth exceeds the call stack limit
- **Tail Recursion**: recursive call is the last operation; can be optimized by the compiler (not guaranteed in Java)

## 💻 Syntax
```java
returnType methodName(parameters) {
    if (baseCondition) {
        return baseValue;           // base case
    }
    // recursive case
    return methodName(modifiedParameters);
}
```

## ✅ Example 1 - Basic

**Problem:** Calculate factorial of a number using recursion.

**Code:**
```java
public class Factorial {
    public static int factorial(int n) {
        if (n <= 1) {         // base case
            return 1;
        }
        return n * factorial(n - 1);  // recursive case
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("0! = " + factorial(0));
    }
}
```

**Output:**
```
5! = 120
0! = 1
```

**Explanation:** `factorial(5)` calls `5 * factorial(4)` → `4 * factorial(3)` → ... → `1`. The base case `n <= 1` stops the recursion.

## 🚀 Example 2 - Intermediate

**Problem:** Print the Fibonacci sequence up to n terms using recursion.

**Code:**
```java
public class Fibonacci {
    public static int fib(int n) {
        if (n <= 1) {
            return n;                // base cases: fib(0)=0, fib(1)=1
        }
        return fib(n - 1) + fib(n - 2);  // recursive case
    }

    public static void printFibSequence(int count) {
        for (int i = 0; i < count; i++) {
            System.out.print(fib(i) + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        printFibSequence(10);
    }
}
```

**Output:**
```
0 1 1 2 3 5 8 13 21 34
```

**Explanation:** Each Fibonacci number is the sum of the two preceding ones. This naive recursive implementation has O(2^n) time complexity due to repeated calculations — a good candidate for memoization.

## 🏢 Real World Use Case
- **File system traversal**: recursively listing all files in nested directories
- **Tree structures**: traversing DOM trees, ASTs, or organizational hierarchies
- **Divide and conquer algorithms**: merge sort, quick sort, binary search
- **Recursive CTEs in SQL** are mirrored in Java with recursive methods for tree-like data

## 🎯 Interview Questions

**Q1: What is the base case in recursion?**
A: The condition that stops the recursion. Without it, the method calls itself infinitely, causing a StackOverflowError.

**Q2: What is the difference between recursion and iteration?**
A: Recursion uses method call stacks; iteration uses loops. Recursion can be more elegant for tree/divide-and-conquer problems. Iteration is generally more memory-efficient.

**Q3: What causes a StackOverflowError in recursion?**
A: When the recursion depth exceeds the JVM's call stack size, typically due to a missing or incorrect base case, or processing too large input.

**Q4: What is tail recursion? Does Java optimize it?**
A: Tail recursion is when the recursive call is the last statement. Java does NOT perform tail-call optimization, so tail-recursive and non-tail-recursive methods have the same stack risk.

**Q5: Can recursion replace all loops?**
A: Theoretically yes, but practically no. Recursion is best for problems that have a natural recursive structure (trees, graphs, divide-and-conquer). Iteration is preferred for simple linear operations.

## ⚠ Common Errors / Mistakes
- Forgetting the base case (infinite recursion → stack overflow)
- Incorrect base case that never triggers
- Excessive recursion depth for large inputs
- Not passing updated arguments in the recursive call (infinite loop)
- Using recursion when iteration is simpler and more efficient

## 📝 Practice Exercises

**Beginner:**
1. Write a recursive method `sum(int n)` that returns the sum of numbers from 1 to n.
2. Write a recursive method `power(double base, int exp)` that calculates base^exp.
3. Write a recursive method `countDown(int n)` that prints numbers from n down to 1.

**Intermediate:**
4. Write a recursive method `gcd(int a, int b)` using Euclid's algorithm for the greatest common divisor.
5. Write a recursive method `reverseString(String s)` that returns the reversed string.
6. Write a recursive method `isPalindrome(String s)` that checks if a string is a palindrome.

**Advanced:**
7. Implement the Tower of Hanoi problem recursively: `void hanoi(int n, char from, char to, char aux)` that prints each move.
8. Write a recursive method `findSubsets(int[] arr)` that prints all subsets of a given array (power set problem).
