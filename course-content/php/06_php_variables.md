## 6. PHP Variables

## 📘 Introduction
Variables in PHP are containers for storing data. They are dynamically typed (no type declaration required) and identified by a `$` prefix followed by the variable name. PHP variables have three scopes: local, global, and static.

## 🧠 Key Concepts
- **`$` Prefix**: Every variable must start with `$` (e.g., `$name`, `$count`).
- **Naming Rules**: Start with a letter or underscore, followed by letters, digits, or underscores. Case-sensitive. No hyphens or special characters.
- **Variable Scope**: Local (inside function), Global (outside functions), Static (persists across function calls).
- **global Keyword**: Imports a global variable into a function's local scope.
- **$GLOBALS**: A superglobal array containing all global variables. Accessible anywhere.
- **Variable Declaration**: No keyword needed. Assignment creates the variable automatically.

## 💻 Syntax
```php
<?php
$name = "John";           // String
$age = 25;                // Integer
$price = 19.99;           // Float
$isActive = true;         // Boolean

// Variable scope
$x = 10;                  // Global scope

function test() {
    global $x;            // Access global $x
    echo $x;              // Outputs 10
}
?>
```

## ✅ Example 1 - Basic
**Problem**: Declare variables of different types and demonstrate naming rules and case sensitivity.

**Code** (`variables.php`):
```php
<?php
$firstName = "Alice";
$lastName = "Smith";
$age = 30;
$height = 5.6;
$isStudent = false;

$_temp = "Valid";
$myVar1 = "Also valid";

// Case sensitivity
$color = "red";
$Color = "blue";
$COLOR = "green";

echo "$firstName $lastName is $age years old.<br>";
echo "Height: $height ft<br>";
echo "Color vars: $color, $Color, $COLOR<br>";
?>
```

**Output**:
```html
Alice Smith is 30 years old.<br>
Height: 5.6 ft<br>
Color vars: red, blue, green
```

**Explanation**: Variables start with `$`. `$firstName` and `$lastName` hold strings; `$age` is an integer; `$height` is float; `$isStudent` is boolean. `$color`, `$Color`, `$COLOR` are three separate variables — confirming case sensitivity.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate local, global, and static variable scopes, including the `global` keyword and `$GLOBALS` array.

**Code** (`scope.php`):
```php
<?php
$counter = 0; // Global

function increment() {
    global $counter;          // Import global
    $counter++;
    echo "Global counter: $counter<br>";
}

function staticCounter() {
    static $count = 0;        // Static: persists between calls
    $count++;
    echo "Static count: $count<br>";
}

function localCounter() {
    $count = 0;               // Local: reset each call
    $count++;
    echo "Local count: $count<br>";
}

increment();
increment();
increment();

staticCounter();
staticCounter();
staticCounter();

localCounter();
localCounter();
localCounter();

echo "Via GLOBALS: " . $GLOBALS['counter'] . "<br>";
?>
```

**Output**:
```html
Global counter: 1
Global counter: 2
Global counter: 3
Static count: 1
Static count: 2
Static count: 3
Local count: 1
Local count: 1
Local count: 1
Via GLOBALS: 3
```

**Explanation**: `global $counter` binds the local name to the global variable. `static $count` preserves its value between function calls. Local `$count` is re-initialized to 0 each call. `$GLOBALS['counter']` accesses the global without the `global` keyword.

## 🏢 Real World Use Case
**Session-based Shopping Cart**: E-commerce apps use variables of all scopes. Global variables store configuration. Function parameters pass product IDs. Static variables cache expensive lookups (e.g., tax rates). `$GLOBALS` is rarely used directly — dependency injection is preferred.

## 🎯 Interview Questions
**Q1:** What is the difference between a variable being `global` and declaring it `static`?
**A:** `global` imports a variable from the global scope into a function. `static` preserves a local variable's value between function calls; it is still local but not re-initialized.

**Q2:** What rules must PHP variable names follow?
**A:** Start with `$` followed by a letter or underscore. Subsequent characters can be letters, digits, or underscores. Case-sensitive. No spaces, hyphens, or special characters.

**Q3:** What is `$GLOBALS`?
**A:** `$GLOBALS` is a superglobal associative array containing references to all global variables in the script. It is accessible from any scope without the `global` keyword.

**Q4:** Are PHP variables passed by value or by reference by default?
**A:** By value. A copy of the variable's value is passed. Use `&` in the parameter declaration to pass by reference (e.g., `function foo(&$var)`).

**Q5:** What happens if you try to use an undeclared variable?
**A:** PHP emits a notice (`Notice: Undefined variable: varname`) and the variable is treated as `null`. It does not stop execution.

## ⚠ Common Errors / Mistakes
- **Forgetting the `$` prefix**: `name = "John";` causes a parse error. Always start with `$`.
- **Variable name typos**: `$userName` vs `$username` are different. Enable error reporting to catch notices.
- **Assuming `global` is automatic**: A variable defined outside a function is NOT accessible inside unless you use `global` or `$GLOBALS`.
- **Mixing up assignment (`=`) and comparison (`==`)**: `if ($x = 5)` is always true (assignment returns 5, which is truthy).

## 📝 Practice Exercises
**Beginner:**
1. Create variables for your name, age, city, and occupation. Echo them in a sentence.
2. Write a script that shows two variables with different cases (`$car`, `$Car`) hold different values.
3. Create a script that calculates the area of a rectangle using variables `$length` and `$width`.

**Intermediate:**
4. Write a function that uses the `global` keyword to increment three different global variables in one call.
5. Create a function with a `static` counter that tracks how many times it was called, and echo the count each time.
6. Build a script that demonstrates accessing a global variable using both `global` keyword and `$GLOBALS` inside a function.

**Advanced:**
7. Write a recursive function that uses a static variable to track the depth of recursion and stops at depth 10.
8. Create a script that demonstrates the difference between passing by value and passing by reference using functions — show that the original variable is unchanged in one case and modified in the other.
