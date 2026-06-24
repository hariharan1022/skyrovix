## 12. Java Math

## 📘 Introduction

Java provides the `java.lang.Math` class for basic numeric operations like exponentiation, logarithms, trigonometry, and rounding. All methods are `static`, so no instantiation is needed. The class includes two famous mathematical constants: `Math.PI` (π) and `Math.E`. For random number generation, use `Math.random()` or the `java.util.Random` class.

## 🧠 Key Concepts

| Method | Description | Example |
|--------|-------------|---------|
| `abs(x)` | Absolute value | `Math.abs(-5)` → 5 |
| `ceil(x)` | Rounds up | `Math.ceil(3.2)` → 4.0 |
| `floor(x)` | Rounds down | `Math.floor(3.8)` → 3.0 |
| `round(x)` | Rounds to nearest | `Math.round(3.5)` → 4 |
| `max(a, b)` | Larger of two | `Math.max(10, 20)` → 20 |
| `min(a, b)` | Smaller of two | `Math.min(10, 20)` → 10 |
| `pow(a, b)` | a raised to power b | `Math.pow(2, 10)` → 1024.0 |
| `sqrt(x)` | Square root | `Math.sqrt(25)` → 5.0 |
| `random()` | Random 0.0 ≤ n < 1.0 | `Math.random()` → 0.734... |
| `sin(x)`, `cos(x)`, `tan(x)` | Trigonometric (radians) | `Math.sin(Math.PI / 2)` → 1.0 |

**Constants:** `Math.PI` (3.14159...), `Math.E` (2.71828...)

**Random Class:**
- `Random r = new Random();`
- `r.nextInt(100)` — random int 0–99
- `r.nextDouble()` — random double 0.0–1.0
- `r.nextGaussian()` — normally distributed

## 💻 Syntax

```java
public class MathDemo {
    public static void main(String[] args) {
        System.out.println("PI: " + Math.PI);
        System.out.println("E: " + Math.E);
        System.out.println("abs(-7): " + Math.abs(-7));
        System.out.println("max(15, 22): " + Math.max(15, 22));
        System.out.println("pow(3, 4): " + Math.pow(3, 4));
        System.out.println("sqrt(144): " + Math.sqrt(144));
        System.out.println("ceil(4.2): " + Math.ceil(4.2));
        System.out.println("floor(4.8): " + Math.floor(4.8));
        System.out.println("random: " + Math.random());
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Calculate the area and circumference of a circle.

**Code:**
```java
public class CircleMath {
    public static void main(String[] args) {
        double radius = 7.5;

        double area = Math.PI * Math.pow(radius, 2);
        double circumference = 2 * Math.PI * radius;

        System.out.println("Radius: " + radius);
        System.out.printf("Area: %.2f%n", area);
        System.out.printf("Circumference: %.2f%n", circumference);

        // Rounding examples
        System.out.println("Area (rounded): " + Math.round(area));
        System.out.println("Area (floor): " + Math.floor(area));
    }
}
```

**Output:**
```
Radius: 7.5
Area: 176.71
Circumference: 47.12
Area (rounded): 177
Area (floor): 176.0
```

**Explanation:** `Math.PI` gives π. `Math.pow(radius, 2)` squares the value. `Math.round()` returns the nearest long, `Math.floor()` rounds down.

## 🚀 Example 2 - Intermediate

**Problem:** Simulate rolling two dice 10 times using `Random` and display results.

**Code:**
```java
import java.util.Random;

public class DiceRoller {
    public static void main(String[] args) {
        Random rand = new Random();

        System.out.println("Rolling two dice 10 times:");
        System.out.println("Roll\tDie1\tDie2\tSum");

        int[] totals = new int[11];  // index 0 = sum 2, index 10 = sum 12

        for (int roll = 1; roll <= 10; roll++) {
            int die1 = rand.nextInt(6) + 1;  // 1-6
            int die2 = rand.nextInt(6) + 1;
            int sum = die1 + die2;           // 2-12
            totals[sum - 2]++;

            System.out.printf("%d\t%d\t%d\t%d%n", roll, die1, die2, sum);
        }

        // Find most common sum
        int maxCount = 0;
        int mostCommon = 0;
        for (int i = 0; i < totals.length; i++) {
            if (totals[i] > maxCount) {
                maxCount = totals[i];
                mostCommon = i + 2;
            }
        }
        System.out.println("Most frequent sum: " + mostCommon + " (appeared " + maxCount + " times)");

        // Using StrictMath for guaranteed reproducible results
        double precise = StrictMath.sin(StrictMath.toRadians(30));
        System.out.printf("sin(30°) using StrictMath: %.1f%n", precise);
    }
}
```

**Output:**
```
Rolling two dice 10 times:
Roll	Die1	Die2	Sum
1	3	5	8
2	6	1	7
3	2	2	4
4	5	6	11
5	4	3	7
6	1	4	5
7	6	6	12
8	3	3	6
9	5	2	7
10	4	1	5
Most frequent sum: 7 (appeared 3 times)
sin(30°) using StrictMath: 0.5
```

**Explanation:** `rand.nextInt(6) + 1` generates dice values. `StrictMath` produces identical results across all platforms (unlike `Math`, which may use platform-optimized native libraries).

## 🏢 Real World Use Case

**Monte Carlo Simulation:** A quantitative finance firm uses `Math.random()` with `Random` and `StrictMath` for risk analysis. `Math.pow()` calculates compound interest. `Math.log()` and `Math.exp()` are used for option pricing models (Black-Scholes). `StrictMath` ensures reproducible results across different operating systems in distributed computing.

## 🎯 Interview Questions

**1. What is the difference between `Math` and `StrictMath`?**  
`Math` may use platform-specific native libraries for performance — results may vary slightly across platforms. `StrictMath` guarantees identical results on all platforms, matching the IEEE 754 standard.

**2. How do you generate a random integer between 1 and 100?**  
`int r = (int)(Math.random() * 100) + 1;` or `rand.nextInt(100) + 1`.

**3. What does `Math.round(-2.5)` return?**  
`-2`. `Math.round` rounds toward the nearest integer, with ties rounding toward positive infinity.

**4. What is the return type of `Math.sqrt()`?**  
`double`. If the argument is negative, it returns `NaN` (Not a Number).

**5. How do you round a double to two decimal places?**  
`Math.round(value * 100.0) / 100.0` or use `String.format("%.2f", value)`.

## ⚠ Common Errors / Mistakes

- **Forgetting `Random` needs import** — `java.util.Random` must be imported or fully qualified
- **`Math.random()` returns `double`** — Must cast/convert for integers: `(int)(Math.random() * max)`
- **Integer division in pow** — `Math.pow(2, 3)` returns `8.0`, not `8` — watch for type mismatches
- **Using `Math.round()` for precise decimal rounding** — Use `BigDecimal` for financial calculations
- **Trigonometric functions use radians, not degrees** — Use `Math.toRadians()` and `Math.toDegrees()`

## 📝 Practice Exercises

**Beginner**
1. Calculate the hypotenuse of a right triangle given two legs using `Math.pow()` and `Math.sqrt()`.
2. Generate 5 random lottery numbers (1-50) using `Math.random()` and print them.
3. Print `Math.PI` and `Math.E` rounded to 3 decimal places using `Math.round()`.

**Intermediate**
4. Create a program that approximates the value of π using the Leibniz formula: π/4 = 1 - 1/3 + 1/5 - 1/7 + ... (sum first 1,000,000 terms).
5. Write a temperature converter using `Math.round()` for output: Celsius ↔ Fahrenheit, formatted to 1 decimal place.
6. Use the `Random` class to simulate a coin flip (heads/tails) 100 times and count the results.

**Advanced**
7. Implement a mortgage calculator: given principal, annual interest rate, and years, calculate monthly payment using `Math.pow()` for the compound interest formula.
8. Write a program using `StrictMath` to compute sin, cos, and tan for angles 0° to 90° in 15° increments, demonstrating platform-independent reproducibility by comparing with `Math` results.
