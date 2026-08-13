## 14. Java If...Else

## 📘 Introduction

Conditional statements in Java control the flow of execution based on boolean conditions. The `if-else` family handles simple to complex decision trees. The `switch` statement provides a cleaner alternative for multiple equality checks. Java 14 introduced **enhanced switch** with arrow syntax and expressions, while the **ternary operator** offers a compact inline conditional.

## 🧠 Key Concepts

| Construct | Syntax | Use Case |
|-----------|--------|----------|
| `if` | `if (condition) { }` | Single condition |
| `if-else` | `if (c) { } else { }` | Two branches |
| `if-else if-else` | `if (c1) { } else if (c2) { } else { }` | Multiple conditions |
| Nested `if` | `if (c1) { if (c2) { } }` | Hierarchical conditions |
| `switch` (traditional) | `switch(x) { case v: ... break; }` | Multiple equality checks |
| Enhanced switch (Java 14+) | `switch(x) { case v -> ... }` | Concise, expression support |
| Ternary | `c ? v1 : v2` | Simple inline branch |

## 💻 Syntax

```java
public class IfElseDemo {
    public static void main(String[] args) {
        int score = 85;

        // if-else if-else
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }

        // Ternary
        String status = (score >= 60) ? "Pass" : "Fail";
        System.out.println("Status: " + status);

        // Enhanced switch (Java 14+)
        String day = "MONDAY";
        int taskCount = switch (day) {
            case "MONDAY", "TUESDAY" -> 5;
            case "WEDNESDAY" -> 3;
            case "THURSDAY", "FRIDAY" -> 4;
            default -> 0;
        };
        System.out.println("Tasks for " + day + ": " + taskCount);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Determine the season based on a month number.

**Code:**
```java
public class SeasonFinder {
    public static void main(String[] args) {
        int month = 3;  // March

        String season;
        if (month >= 3 && month <= 5) {
            season = "Spring";
        } else if (month >= 6 && month <= 8) {
            season = "Summer";
        } else if (month >= 9 && month <= 11) {
            season = "Autumn";
        } else if (month == 12 || month == 1 || month == 2) {
            season = "Winter";
        } else {
            season = "Invalid month";
        }

        System.out.println("Month " + month + " is " + season);

        // Nested if example
        int temperature = 22;
        if (season.equals("Summer")) {
            if (temperature > 30) {
                System.out.println("Very hot!");
            } else {
                System.out.println("Warm day");
            }
        }
    }
}
```

**Output:**
```
Month 3 is Spring
```

**Explanation:** The `if-else if` chain checks each range. The final `else` catches invalid months. A nested `if` would check temperature only for summer months.

## 🚀 Example 2 - Intermediate

**Problem:** Use enhanced switch with enum and yield for complex logic.

**Code:**
```java
enum OrderStatus {
    PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
}

public class OrderProcessor {
    public static void main(String[] args) {
        OrderStatus status = OrderStatus.SHIPPED;

        // Enhanced switch with yield (returns a value)
        String displayText = switch (status) {
            case PENDING -> "Your order has been received";
            case PROCESSING -> "We are preparing your order";
            case SHIPPED -> {
                String tracking = "TRACK-12345";
                yield "Shipped! Tracking: " + tracking;
            }
            case DELIVERED -> "Delivered — enjoy!";
            case CANCELLED -> "Order was cancelled";
        };
        System.out.println(displayText);

        // Traditional switch
        System.out.print("Actions for " + status + ": ");
        switch (status) {
            case PENDING:
                System.out.println("Cancel allowed, Edit allowed");
                break;
            case PROCESSING:
                System.out.println("Cancel allowed");
                break;
            case SHIPPED:
                System.out.println("Track package");
                break;
            case DELIVERED:
                System.out.println("Leave review");
                break;
            case CANCELLED:
                System.out.println("Refund processed");
                break;
            default:
                System.out.println("Unknown status");
        }

        // Ternary chain
        int score = 92;
        String grade = score >= 90 ? "A" 
                     : score >= 80 ? "B" 
                     : score >= 70 ? "C" 
                     : score >= 60 ? "D" : "F";
        System.out.println("Ternary grade: " + grade);
    }
}
```

**Output:**
```
Shipped! Tracking: TRACK-12345
Actions for SHIPPED: Track package
Ternary grade: A
```

**Explanation:** Enhanced switch with arrow `->` is concise. `yield` returns a value from a block. Traditional `switch` requires `break` to prevent fall-through. Ternary chains work but can hurt readability.

## 🏢 Real World Use Case

**E-commerce Shipping Logic:** A checkout system uses a nested `if-else` chain to determine shipping cost: `if (isExpress)` → $15, `else if (distance > 100)` → $10, `else if (weight > 5)` → $8, `else` → $5. An enhanced `switch` processes order status transitions. The ternary operator sets `isFreeShipping = (total > 100) ? true : false`.

## 🎯 Interview Questions

**1. What is the difference between `switch` and `if-else`?**  
`switch` is best for a single variable compared against multiple constant values. `if-else` is better for ranges, complex boolean expressions, or non-constant conditions.

**2. What happens if you omit `break` in a traditional `switch`?**  
Execution "falls through" to the next case. This is intentional for shared logic but often a bug.

**3. What types can a `switch` expression use?**  
`int`, `char`, `byte`, `short`, `String`, `enum`, and their wrapper types (`Integer`, `Character`, etc.).

**4. What is the enhanced switch introduced in Java 14?**  
Arrow syntax (`case X -> expr;`) — no fall-through, no `break` needed. Can be used as an expression with `yield` for block bodies.

**5. Can you use the ternary operator for anything more than simple conditions?**  
Yes, but chaining multiple ternaries reduces readability. Prefer `if-else` for complex logic.

## ⚠ Common Errors / Mistakes

- **Missing `break` in switch** — Causes fall-through to next case (unless intentional)
- **Using `=` instead of `==`** — `if (x = 5)` compiles (if x is boolean) or errors (non-boolean)
- **Semicolon after `if`** — `if (x > 5); { ... }` — the semicolon ends the if, block always runs
- **Using `else if` as separate words** — Correct: `else if` (two words), not `elseif`
- **Switch on `null`** — `switch(null)` throws `NullPointerException` in traditional switch (Java 17+ handles null in enhanced switch)

## 📝 Practice Exercises

**Beginner**
1. Write a program that reads a number and prints whether it is positive, negative, or zero using `if-else if-else`.
2. Create a program that uses a `switch` to print the number of days in a given month (1-12).
3. Use the ternary operator to assign the larger of two numbers to a variable `max`.

**Intermediate**
4. Write a program that accepts a character and determines if it's a vowel, consonant, digit, or special character using `switch`.
5. Create a nested `if-else` structure for a library fine calculator: days late (1-5 = $1/day, 6-10 = $2/day, >10 = $5/day) with a maximum fine of $50.
6. Rewrite a 5-branch `if-else if` chain as an enhanced `switch` expression using `yield`.

**Advanced**
7. Implement a simple calculator using enhanced `switch` that takes operator (+, -, *, /) as a string and performs the operation with two numbers, handling division by zero.
8. Create a program that converts an enhanced `switch` expression to a traditional `switch` with fall-through to demonstrate how arrow syntax eliminates fall-through bugs.
