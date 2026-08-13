## 10. Java Operators

## 📘 Introduction

Operators in Java are special symbols that perform operations on variables and values. Java has a rich set of operators organized into categories: arithmetic, relational, logical, assignment, unary, bitwise, and ternary. Understanding operator precedence is critical for writing correct expressions.

## 🧠 Key Concepts

| Category | Operators |
|----------|-----------|
| Arithmetic | `+` `-` `*` `/` `%` |
| Relational | `==` `!=` `>` `<` `>=` `<=` |
| Logical | `&&` `\|\|` `!` |
| Assignment | `=` `+=` `-=` `*=` `/=` `%=` `&=` `\|=` `^=` `<<=` `>>=` `>>>=` |
| Unary | `++` `--` `+` `-` `!` |
| Bitwise | `&` `\|` `^` `~` `<<` `>>` `>>>` |
| instanceof | `object instanceof Type` |
| Ternary | `condition ? valueIfTrue : valueIfFalse` |

## 💻 Syntax

```java
public class OperatorsDemo {
    public static void main(String[] args) {
        int a = 10, b = 3;

        // Arithmetic
        System.out.println("Sum: " + (a + b) + ", Div: " + (a / b) + ", Mod: " + (a % b));

        // Relational
        System.out.println("Equal: " + (a == b) + ", Greater: " + (a > b));

        // Logical
        boolean x = true, y = false;
        System.out.println("AND: " + (x && y) + ", OR: " + (x || y) + ", NOT: " + (!x));

        // Unary
        int count = 5;
        System.out.println("Prefix ++: " + (++count) + ", Postfix --: " + (count--));

        // Ternary
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);

        // instanceof
        String s = "hello";
        System.out.println("Is String? " + (s instanceof String));
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Use arithmetic, relational, logical, and ternary operators.

**Code:**
```java
public class OperatorBasics {
    public static void main(String[] args) {
        int score = 85;
        int passing = 60;

        // Arithmetic + Assignment
        int bonus = score + 10;
        score += 5;                      // score = score + 5

        // Relational
        boolean passed = score >= passing;
        boolean perfect = score == 100;

        // Logical + Ternary
        String result = (passed && !perfect) ? "Passed with room to improve" 
                      : perfect ? "Perfect score!" 
                      : "Failed";
        
        System.out.println("Final score: " + score);
        System.out.println("Passed? " + passed);
        System.out.println("Result: " + result);
        System.out.println("10 % 3 = " + (10 % 3));     // modulo
    }
}
```

**Output:**
```
Final score: 90
Passed? true
Result: Passed with room to improve
10 % 3 = 1
```

**Explanation:** Compound assignment (`score += 5`) modifies in place. Ternary operator chains conditions. Modulo (`%`) gives the remainder of division.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate bitwise operators and short-circuit vs non-short-circuit logical operators.

**Code:**
```java
public class AdvancedOperators {
    public static void main(String[] args) {
        // Bitwise operators
        int a = 5;   // 0101
        int b = 3;   // 0011

        System.out.println("a & b  (AND): " + (a & b) + "  (0101 & 0011 = 0001)");
        System.out.println("a | b  (OR):  " + (a | b) + "  (0101 | 0011 = 0111)");
        System.out.println("a ^ b  (XOR): " + (a ^ b) + "  (0101 ^ 0011 = 0110)");
        System.out.println("~a     (NOT): " + (~a) + "  (~0101 = 1010 in 2's complement)");
        System.out.println("a << 1 (L-shift): " + (a << 1) + "  (0101 << 1 = 1010)");
        System.out.println("a >> 1 (R-shift): " + (a >> 1) + "  (0101 >> 1 = 0010)");

        // Short-circuit vs non-short-circuit
        int x = 5;
        boolean shortCircuit = (x > 10) && (++x > 0);    // ++x NOT evaluated
        System.out.println("\nShort-circuit: " + shortCircuit + ", x = " + x);
        
        boolean nonShort = (x > 10) & (++x > 0);         // ++x IS evaluated
        System.out.println("Non-short-circuit: " + nonShort + ", x = " + x);
    }
}
```

**Output:**
```
a & b  (AND): 1  (0101 & 0011 = 0001)
a | b  (OR):  7  (0101 | 0011 = 0111)
a ^ b  (XOR): 6  (0101 ^ 0011 = 0110)
~a     (NOT): -6  (~0101 = 1010 in 2's complement)
a << 1 (L-shift): 10  (0101 << 1 = 1010)
a >> 1 (R-shift): 2  (0101 >> 1 = 0010)

Short-circuit: false, x = 5
Non-short-circuit: false, x = 6
```

**Explanation:** Bitwise operators work at the bit level. `&&` and `||` short-circuit — the right operand is only evaluated if needed. `&` and `|` (non-short-circuit) always evaluate both sides, which matters when there are side effects like `++x`.

## 🏢 Real World Use Case

**Permission System:** A file system uses bitwise flags for permissions: `READ = 1 (001)`, `WRITE = 2 (010)`, `EXECUTE = 4 (100)`. Permissions are stored as a single int. `permission & READ` checks read access. `permission | WRITE` adds write permission. `permission ^ EXECUTE` toggles execute. This uses just 3 bits instead of 3 booleans.

## 🎯 Interview Questions

**1. What is the difference between `&&` and `&`?**  
`&&` is short-circuit logical AND — if the left operand is false, the right is not evaluated. `&` is non-short-circuit AND — both sides are always evaluated (also works as bitwise AND).

**2. How does the ternary operator work?**  
`condition ? valueIfTrue : valueIfFalse`. It's an expression that returns one of two values based on a boolean condition.

**3. What is the result of `-5 % 2`?**  
In Java, `-5 % 2` is `-1`. The sign of the result follows the sign of the dividend.

**4. What does `>>>` do?**  
`>>>` is the unsigned right shift operator. It shifts bits right and fills the leftmost bits with zeros regardless of the sign bit. `>>>` only works on `int` and `long`.

**5. What is the difference between `++i` and `i++`?**  
`++i` (prefix) increments first, then returns the new value. `i++` (postfix) returns the current value, then increments.

## ⚠ Common Errors / Mistakes

- **Using `=` instead of `==`** — `if (x = 5)` assigns 5 to x and is always true (compiles with warning)
- **Integer division** — `5 / 2 = 2` (not 2.5) because both operands are int
- **No short-circuit with `&` and `|`** — Can cause unexpected side effects
- **Operator precedence confusion** — `5 + 3 * 2` is `11` (multiplication first), not `16`
- **Bitwise instead of logical** — `if (x & y)` works for booleans but uses bitwise logic

## 📝 Practice Exercises

**Beginner**
1. Write a program that calculates the area of a rectangle using `*` and perimeter using `+`.
2. Use `%` to check if a number is even or odd, and `==` to compare.
3. Use the ternary operator to assign "Adult" if age >= 18, else "Minor".

**Intermediate**
4. Write a program that uses bitwise operators to check if a number is a power of 2 (`n & (n-1) == 0`).
5. Create a program that demonstrates operator precedence — write an expression with `+`, `*`, `&&`, and `==` that gives an unexpected result, then fix with parentheses.
6. Implement a toggle flag using XOR: start with `flags = 0`, toggle bit 2 using `flags ^= 4`, and check with `&`.

**Advanced**
7. Implement a simple virtual machine that evaluates postfix expressions using operators: push numbers, then apply `+`, `-`, `*`, `/` operators with correct precedence.
8. Create a bit-field utility class that packs 8 boolean flags into a single `byte` using bitwise operators, with getter/setter for each flag.
