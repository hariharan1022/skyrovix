## 5. PHP Comments

## 📘 Introduction
Comments are non-executable lines in PHP code used for documentation, debugging, and explaining logic. PHP supports C-style, shell-style, and PHPDoc-style comments. Comments are ignored by the PHP interpreter and are not sent to the browser.

## 🧠 Key Concepts
- **Single-line `//`**: The most common. Everything after `//` on that line is ignored.
- **Single-line `#`**: Shell-style. Works the same as `//` but less commonly used.
- **Multi-line `/* */`**: Spans multiple lines. Cannot be nested.
- **PHPDoc `/** */`**: A special multi-line comment used to document functions, classes, methods, and properties. Supporting IDEs parse these for auto-completion.
- **Best Practices**: Comments should explain "why" not "what". Keep them updated. Remove commented-out dead code.

## 💻 Syntax
```php
<?php
// Single-line comment
# Shell-style single-line comment

/*
Multi-line comment
spanning multiple lines
*/

/**
 * PHPDoc for a function
 * @param string $name The user's name
 * @return string A greeting
 */
function greet($name) {
    return "Hello, $name!";
}
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate all four comment styles in a PHP script.

**Code** (`comments.php`):
```php
<?php
// This is a single-line comment using //
echo "This is displayed<br>"; // Inline comment after code

# This is a shell-style comment
echo "This is also displayed<br>";

/*
  This is a multi-line comment.
  Several lines of explanation here.
  All are ignored by PHP.
*/
echo "Multi-line comments are ignored<br>";

/**
 * Sum two numbers
 * @param int $a First number
 * @param int $b Second number
 * @return int The sum
 */
function sum($a, $b) {
    return $a + $b;
}
echo sum(3, 4);
?>
```

**Output**:
```html
This is displayed<br>This is also displayed<br>Multi-line comments are ignored<br>7
```

**Explanation**: All comment styles are ignored by PHP. Only the echo statements and the function result produce output. The PHPDoc comment above the function is invisible to PHP but provides documentation for IDEs and documentation generators like phpDocumentor.

## 🚀 Example 2 - Intermediate
**Problem**: Demonstrate PHPDoc comments with multiple annotations and how they help IDEs provide type hints and documentation.

**Code** (`calculator.php`):
```php
<?php
/**
 * A simple calculator class
 *
 * Supports basic arithmetic operations with logging.
 *
 * @package App\Math
 * @author Developer
 * @version 1.0.0
 */
class Calculator {
    /** @var array<string, float> Log of all operations performed */
    private array $log = [];

    /**
     * Add two numbers
     *
     * @param float $a First operand
     * @param float $b Second operand
     * @return float The sum
     * @throws \InvalidArgumentException If inputs are not numeric
     */
    public function add(float $a, float $b): float {
        $result = $a + $b;
        $this->log["$a + $b"] = $result;
        return $result;
    }

    /**
     * Get the operation log
     *
     * @return array<string, float> Associative array of operations and results
     */
    public function getLog(): array {
        return $this->log;
    }
}

$calc = new Calculator();
echo $calc->add(10.5, 20.3);
?>
```

**Output**:
```
30.8
```

**Explanation**: The PHPDoc blocks `/** */` provide structured documentation. IDEs like PhpStorm, VS Code (with IntelliSense) parse `@param`, `@return`, `@throws` annotations to provide autocompletion, type checking, and hover documentation. The `@var` annotation documents the property type.

## 🏢 Real World Use Case
**API Documentation Generation**: PHPDoc comments are parsed by tools like phpDocumentor or ApiGen to automatically generate developer documentation websites. Laravel's IDE helper generates PHPDoc stubs so IDEs can autocomplete magic methods like `User::find()`.

## 🎯 Interview Questions
**Q1:** What is the difference between `//` and `#` comments?
**A:** There is no functional difference. Both create single-line comments. `//` is the C-style convention and is much more widely used. `#` comes from shell scripting.

**Q2:** Can you nest multi-line comments `/* /* */ */` in PHP?
**A:** No. Nesting multi-line comments causes a parse error. The first `*/` closes the outer comment, then the remaining `*/` causes a syntax error.

**Q3:** What is PHPDoc, and why is it used?
**A:** PHPDoc is a standardized documentation format using `/** */` blocks. It documents parameters (`@param`), return values (`@return`), exceptions (`@throws`), and more. It enables IDE autocompletion and generates API docs.

**Q4:** Should you comment obvious code?
**A:** No. Comments should explain *why* something is done (business logic, workarounds) not *what* the code does (which should be clear from well-named code itself). Bad comments are worse than no comments.

**Q5:** What is the danger of leaving commented-out code in production?
**A:** It creates confusion, suggests the code is incomplete, and becomes stale (the commented code no longer reflects current logic). Use version control (git) instead of commented-out code.

## ⚠ Common Errors / Mistakes
- **Nesting `/* */` comments**: Attempting to nest multi-line comments causes parse errors.
- **Forgetting to close `*/`**: Leaves the rest of the file "commented out," causing massive syntax errors.
- **Outdated comments**: Comments that contradict the actual code are misleading and dangerous.
- **Using comments to disable code in production**: Remove dead code entirely; use version control for history.

## 📝 Practice Exercises
**Beginner:**
1. Write a PHP script that uses all three comment styles (//, #, /* */) and confirm they don't output anything.
2. Add inline comments explaining what each line does in a simple script that calculates area of a circle.
3. Comment out a line of code using `//` and observe that it no longer executes.

**Intermediate:**
4. Write a PHPDoc comment block for a function that takes an array of user IDs and returns an array of user names, with proper `@param` and `@return` annotations.
5. Create a multi-line comment that documents a block of 10 lines explaining the algorithm for a factorial function.
6. Demonstrate that `/* */` cannot be nested by writing code that causes a deliberate parse error with nested comments.

**Advanced:**
7. Build a PHP class with full PHPDoc blocks for the class, all properties, and all methods. Include `@param`, `@return`, `@throws`, `@see`, and `@deprecated` annotations.
8. Write a PHPDoc comment that documents a complex recursive function, including its base case, recursive step, time complexity (`@complexity O(n)`), and an example usage (`@example`).
