## 16. PHP If...Else...Elseif
## 📘 Introduction
Conditional statements allow you to execute different code blocks based on different conditions. PHP provides `if`, `else`, `elseif`, ternary, null coalescing, switch, and match constructs to control the flow of your application.

## 🧠 Key Concepts
- `if` executes a block if a condition is true
- `else` executes if the condition is false
- `elseif` adds additional conditions
- Nested conditions place if-blocks inside other if-blocks
- Comparison operators: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`, `<=>` (spaceship)
- Ternary operator `?:` is a shorthand for if-else
- Null coalescing `??` checks if a value is set and non-null
- `switch` / `match` are alternatives for multiple fixed-value comparisons

## 💻 Syntax
```php
if (condition) {
    // code if condition is true
} elseif (another_condition) {
    // code if another_condition is true
} else {
    // code if none are true
}

// Ternary
$result = (condition) ? value_if_true : value_if_false;

// Null coalescing
$result = $var ?? 'default';
```

## ✅ Example 1 - Basic
**Problem:** Check if a student's score is a pass or fail.

**PHP Code:**
```php
<?php
$score = 75;

if ($score >= 50) {
    echo "Pass";
} else {
    echo "Fail";
}
?>
```

**Output:**
```
Pass
```

**Explanation:** Since `$score` is 75, which is >= 50, the `if` block executes and prints "Pass".

## 🚀 Example 2 - Intermediate
**Problem:** Determine grade based on score using elseif and ternary.

**PHP Code:**
```php
<?php
$score = 85;

if ($score >= 90) {
    $grade = 'A';
} elseif ($score >= 80) {
    $grade = 'B';
} elseif ($score >= 70) {
    $grade = 'C';
} elseif ($score >= 60) {
    $grade = 'D';
} else {
    $grade = 'F';
}

$status = ($score >= 50) ? 'Passed' : 'Failed';
echo "Grade: $grade, Status: $status";

// Null coalescing example
$bonus = $_GET['bonus'] ?? 0;
echo "\nBonus: $bonus";
?>
```

**Output:**
```
Grade: B, Status: Passed
Bonus: 0
```

**Explanation:** Score 85 matches the `>= 80` elseif block, assigning grade B. The ternary checks if score >= 50. The `??` operator safely defaults to 0 when `$_GET['bonus']` is not set.

## 🏢 Real World Use Case
E-commerce discount system: apply tiered discounts based on order total, user loyalty tier, and coupon code validity. Nested conditions check each criterion before applying the final discount percentage.

## 🎯 Interview Questions
1. What is the difference between `==` and `===`?
2. How does the ternary operator `?:` differ from `??`?
3. Can you nest ternary operators? Is it recommended?
4. What is the spaceship operator `<=>` and what does it return?
5. How does PHP handle `elseif` vs `else if` (with a space)?

## ⚠ Common Errors / Mistakes
- Using `=` (assignment) instead of `==` or `===` inside conditions
- Forgetting curly braces for multi-statement blocks
- Confusing `elseif` (one word) with `else if` (two words) - there is a subtle difference with curly braces
- Overly nested conditions making code unreadable

## 📝 Practice Exercises
**Beginner:**
1. Write a PHP script that checks if a number is positive, negative, or zero.
2. Create a script that prints "Adult" if age >= 18, else "Minor".
3. Use the ternary operator to assign "Even" or "Odd" to a variable based on a number.

**Intermediate:**
4. Build a simple login checker where username is "admin" and password is "1234", print appropriate messages.
5. Write a program that uses nested if to find the largest of three numbers.
6. Use the null coalescing operator to safely retrieve `$_POST['email']` with a default value.

**Advanced:**
7. Implement a progressive tax calculator using elseif for tax brackets (slabs: 0-250000: 0%, 250001-500000: 5%, 500001-1000000: 20%, above: 30%).
8. Create a discount system using nested ternary operators (without elseif) that applies: 10% off for orders > 1000, 5% for > 500, else no discount.
