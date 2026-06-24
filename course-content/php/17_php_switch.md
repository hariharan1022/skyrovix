# 17. PHP Switch

## 📘 Introduction
The `switch` statement in PHP executes one of many blocks of code based on the value of a single expression. It is often a cleaner alternative to a long `if-else if-else` chain when comparing the same variable against many possible values.

## 🧠 Key Concepts
- **Expression**: The value evaluated once and compared against each `case`.
- **`case`**: A branch that matches a specific value.
- **`break`**: Exits the switch block. Without it, execution "falls through" to the next case.
- **`default`**: Optional branch executed when no case matches.
- **Fall-through**: When `break` is omitted, subsequent cases execute until a `break` or the end of the switch.
- **Loose comparison**: Switch uses `==` (loose comparison), not `===`.

## 💻 Syntax
```php
switch (expression) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code when no match
}
```

## ✅ Example 1 - Basic

**Problem:** Write a PHP script that prints the day of the week name given a numeric day (1-7).

**Code:**
```php
<?php
$day = 3;

switch ($day) {
    case 1:
        echo "Monday";
        break;
    case 2:
        echo "Tuesday";
        break;
    case 3:
        echo "Wednesday";
        break;
    case 4:
        echo "Thursday";
        break;
    case 5:
        echo "Friday";
        break;
    case 6:
        echo "Saturday";
        break;
    case 7:
        echo "Sunday";
        break;
    default:
        echo "Invalid day number";
}
?>
```

**Output:** `Wednesday`

**Explanation:** The variable `$day` is `3`. The switch matches `case 3`, prints "Wednesday", and the `break` exits the block.

## 🚀 Example 2 - Intermediate

**Problem:** Build a route handler that responds to URL path segments using fall-through for admin variants.

**Code:**
```php
<?php
$role = "admin";

switch ($role) {
    case "superadmin":
        echo "Full system access.\n";
        break;
    case "admin":
        echo "Dashboard access.\n";
        // fall-through intentionally
    case "editor":
        echo "Content management.\n";
        break;
    case "subscriber":
        echo "Read-only access.\n";
        break;
    default:
        echo "Guest access.\n";
}
?>
```

**Output:**
```
Dashboard access.
Content management.
```

**Explanation:** When `$role` is `"admin"`, it matches `case "admin"`, prints "Dashboard access.", then falls through to `case "editor"` (no `break`) and also prints "Content management." before reaching a `break`.

## 🏢 Real World Use Case
**HTTP Status Code Handler:** A controller maps numeric HTTP status codes to user-friendly messages. Switch keeps each status handler clean and grouped, with fall-through used to group 4xx and 5xx ranges for generic logging.

```php
<?php
$statusCode = 404;

switch (true) {
    case ($statusCode >= 200 && $statusCode < 300):
        echo "Success";
        break;
    case ($statusCode >= 300 && $statusCode < 400):
        echo "Redirect";
        break;
    case ($statusCode >= 400 && $statusCode < 500):
        echo "Client Error";
        break;
    case ($statusCode >= 500):
        echo "Server Error";
        break;
    default:
        echo "Unknown";
}
?>
```

## 🎯 Interview Questions

**1. How does `switch` differ from `if-else` in PHP?**  
Switch is best for comparing a single expression against multiple discrete values. If-else is more flexible for complex conditions, range checks, and multiple variables.

**2. What happens if you omit `break` in a switch case?**  
Execution "falls through" to the next case, running its code until a `break` or the end of the switch is reached. This is intentional and can be used to group cases.

**3. Does PHP switch use loose or strict comparison?**  
Loose comparison (`==`). So `switch ("1")` matches `case 1`.

**4. Can you use `switch` with strings?**  
Yes, PHP switch works with integers, floats, strings, and booleans.

**5. Where should `default` be placed?**  
Typically at the end, but it can appear anywhere. If placed before other cases and no `break` follows, execution falls through into the next case.

## ⚠ Common Errors / Mistakes
- **Forgetting `break`** causes unwanted fall-through.
- **Using `switch` for range checks** leads to clumsy code — prefer `if-else` for ranges.
- **Assuming strict comparison:** `switch ("1")` matches `case 1` because switch uses `==`.
- **Placing `default` mid-switch** without a `break` causes fall-through.

## 📝 Practice Exercises

**Beginner**
1. Write a switch that prints "Small" for 1-3, "Medium" for 4-6, "Large" for 7-9, and "Invalid" otherwise.
2. Create a script that outputs a traffic light color ("Red", "Yellow", "Green") based on a string input.
3. Use a switch to convert a numeric month (1-12) to its three-letter abbreviation (Jan, Feb, etc.).

**Intermediate**
4. Build a simple calculator using switch for +, -, *, / operations with two operands.
5. Write a grade evaluator: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60) using `switch(true)`.
6. Create an order status display that shows different messages for "pending", "processing", "shipped", "delivered", and "cancelled", grouping "pending" and "processing" via fall-through.

**Advanced**
7. Implement a URL router that matches `$_GET['page']` to load different include files using fall-through for authenticated pages.
8. Build a multi-language greeting system where the switch selects a greeting string based on a language code (`en`, `es`, `fr`, `de`), with `en` as default.
