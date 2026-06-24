## 13. Java Booleans

## 📘 Introduction

The `boolean` data type in Java represents a single bit of information: `true` or `false`. Booleans are the foundation of decision-making in Java — used in `if` conditions, loops, and logical expressions. Java's boolean type is **not** compatible with integers (unlike C/C++), so `0` is not equivalent to `false`.

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| `boolean` type | Primitive — holds only `true` or `false` |
| Boolean expressions | Any expression that evaluates to true or false |
| Comparison operators | `==`, `!=`, `>`, `<`, `>=`, `<=` produce booleans |
| Logical operators | `&&` (AND), `\|\|` (OR), `!` (NOT) operate on booleans |
| Short-circuit evaluation | `&&` stops if left is false; `\|\|` stops if left is true |
| `Boolean` wrapper | Object wrapper with utility methods |

**Short-Circuit Evaluation:**
- `false && anything` → `false` (right side not evaluated)
- `true || anything` → `true` (right side not evaluated)

## 💻 Syntax

```java
public class BooleanDemo {
    public static void main(String[] args) {
        boolean isActive = true;
        boolean isComplete = false;

        int age = 20;
        boolean canVote = age >= 18;            // true

        boolean result = (5 > 3) && (2 < 4);    // true && true = true
        boolean shortCircuit = (5 < 3) && (++age > 0);  // ++age NOT evaluated
        System.out.println("Short-circuit test: age = " + age);  // still 20

        // Boolean wrapper
        Boolean wrapper = Boolean.valueOf(true);
        boolean parsed = Boolean.parseBoolean("true");
        System.out.println("Parsed: " + parsed);
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Use boolean expressions to validate user input conditions.

**Code:**
```java
public class LoginValidator {
    public static void main(String[] args) {
        String username = "admin";
        String password = "secret123";
        boolean rememberMe = true;

        boolean usernameValid = username != null && username.length() >= 3;
        boolean passwordValid = password != null && password.length() >= 6;
        boolean canLogin = usernameValid && passwordValid;

        System.out.println("Username valid: " + usernameValid);
        System.out.println("Password valid: " + passwordValid);
        System.out.println("Can login: " + canLogin);

        // Ternary with boolean
        String message = canLogin ? "Welcome, " + username : "Access denied";
        System.out.println(message);

        // Boolean negation
        boolean isLocked = false;
        if (!isLocked) {
            System.out.println("Account is active");
        }
    }
}
```

**Output:**
```
Username valid: true
Password valid: true
Can login: true
Welcome, admin
Account is active
```

**Explanation:** Boolean expressions like `username.length() >= 3` produce `true`/`false`. `&&` requires both conditions true. `!` negates a boolean. The ternary operator uses a boolean to choose between two values.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate short-circuit evaluation and Boolean wrapper utilities.

**Code:**
```java
public class ShortCircuitDemo {
    public static void main(String[] args) {
        // Short-circuit prevents side effects
        int[] data = null;
        boolean safeCheck = (data != null) && (data.length > 0);
        System.out.println("Safe check: " + safeCheck);  // false, no NPE

        // Without short-circuit, this would throw NPE
        // boolean unsafe = (data.length > 0) & (data != null); // NPE!

        // Boolean.parseBoolean — lenient parsing
        System.out.println("\nBoolean parsing:");
        System.out.println("'true' → " + Boolean.parseBoolean("true"));
        System.out.println("'TRUE' → " + Boolean.parseBoolean("TRUE"));
        System.out.println("'yes' → " + Boolean.parseBoolean("yes"));  // false!
        System.out.println("'false' → " + Boolean.parseBoolean("false"));
        System.out.println("null → " + Boolean.parseBoolean(null));   // false

        // Logical XOR operator
        boolean a = true, b = false;
        System.out.println("\ntrue ^ false: " + (a ^ b));  // true (different)
        System.out.println("true ^ true: " + (a ^ a));     // false (same)
    }
}
```

**Output:**
```
Safe check: false

Boolean parsing:
'true' → true
'TRUE' → true
'yes' → false
'false' → false
null → false

true ^ false: true
true ^ true: false
```

**Explanation:** Short-circuit `&&` prevents the NPE when `data` is null. `Boolean.parseBoolean()` only returns `true` for "true" (case-insensitive) — everything else is `false`, including null. XOR (`^`) returns `true` when operands differ.

## 🏢 Real World Use Case

**Feature Flag System:** A SaaS platform uses boolean feature flags to enable/disable features per tenant. `boolean isBetaEnabled = config.isFeatureEnabled("beta_search");` is checked at runtime. The short-circuit `&&` pattern `(user != null) && user.hasPermission("admin")` prevents null pointer exceptions throughout the authorization system.

## 🎯 Interview Questions

**1. Can you assign an integer to a boolean in Java?**  
No. Unlike C/C++, Java does not treat 0 as false or non-zero as true. `int` and `boolean` are incompatible types.

**2. What is short-circuit evaluation?**  
With `&&`, if the left operand is false, the right operand is never evaluated. With `||`, if the left operand is true, the right operand is never evaluated. This prevents unnecessary computation and avoids side effects.

**3. What does `Boolean.parseBoolean("True")` return?**  
`true`. `parseBoolean` is case-insensitive for the string "true". Any other string (including null) returns `false`.

**4. How many bytes does a `boolean` occupy?**  
JVM-dependent. Typically 1 byte in standalone arrays, but may be 4 bytes (like `int`) when used as a field due to alignment.

**5. What is the default value of a `boolean` field?**  
`false`. Instance and static boolean fields default to false. Local boolean variables have no default and must be initialized.

## ⚠ Common Errors / Mistakes

- **Using `=` instead of `==`** — `if (x = true)` compiles but always true (assignment)
- **Comparing booleans with `== true`** — `if (isValid == true)` is redundant; use `if (isValid)`
- **Forgetting null check before boolean method call** — `value.isActive()` throws NPE if `value` is null
- **Misunderstanding `Boolean.parseBoolean()`** — Only returns true for "true" — not "1", "yes", or "Y"
- **`&` vs `&&` confusion** — `&` always evaluates both sides (no short-circuit), can cause NPE

## 📝 Practice Exercises

**Beginner**
1. Write a program that checks if a number is positive, negative, or zero using boolean expressions and prints the result.
2. Create a program with two boolean variables `isWeekend` and `isHoliday` — print "Sleep in!" if either is true.
3. Use `Boolean.parseBoolean()` to convert the strings "TRUE", "true", "false", and "yes" to booleans and print them.

**Intermediate**
4. Write a program that validates a password: must be at least 8 characters, contain a digit, and contain an uppercase letter — use three boolean variables.
5. Demonstrate short-circuit evaluation: create a method with a side effect (print something) and show that it is not called when the left operand of `&&` is false.
6. Create a program that uses XOR (`^`) to determine if exactly one of two boolean conditions is true.

**Advanced**
7. Implement a truth table generator that prints all 8 combinations of three boolean variables (A, B, C) and evaluates `(A && B) || (!A && C)` for each.
8. Write a program that parses a boolean expression string like "true AND false OR NOT true" and evaluates it using a recursive descent parser.
