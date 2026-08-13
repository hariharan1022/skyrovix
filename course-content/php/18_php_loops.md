# 18. PHP Loops

## 📘 Introduction
Loops execute a block of code repeatedly as long as a specified condition is true. PHP supports `while`, `do...while`, `for`, and `foreach` loops, giving you flexible control over iteration.

## 🧠 Key Concepts
- **`while`**: Repeats while a condition is true; checks before each iteration.
- **`do...while`**: Executes at least once, then repeats while condition is true.
- **`for`**: Classic counter loop with initialization, condition, and increment.
- **`foreach`**: Iterates over arrays and objects — works with values only, or key-value pairs.
- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the rest of the current iteration and goes to the next.
- **Nested loops**: Loops inside loops, useful for multidimensional arrays.

## 💻 Syntax
```php
// while
while (condition) {
    // code
}

// do...while
do {
    // code (runs at least once)
} while (condition);

// for
for (init; condition; increment) {
    // code
}

// foreach — values only
foreach ($array as $value) {
    // code
}

// foreach — keys and values
foreach ($array as $key => $value) {
    // code
}
```

## ✅ Example 1 - Basic

**Problem:** Print numbers 1 through 5 using each loop type.

**Code:**
```php
<?php
echo "while: ";
$i = 1;
while ($i <= 5) {
    echo $i . " ";
    $i++;
}

echo "\ndo...while: ";
$j = 1;
do {
    echo $j . " ";
    $j++;
} while ($j <= 5);

echo "\nfor: ";
for ($k = 1; $k <= 5; $k++) {
    echo $k . " ";
}

echo "\nforeach: ";
$nums = [1, 2, 3, 4, 5];
foreach ($nums as $n) {
    echo $n . " ";
}
?>
```

**Output:**
```
while: 1 2 3 4 5
do...while: 1 2 3 4 5
for: 1 2 3 4 5
foreach: 1 2 3 4 5
```

**Explanation:** Each loop type produces the same output using different iteration strategies. `do...while` always runs at least once even if condition is false.

## 🚀 Example 2 - Intermediate

**Problem:** Given an associative array of students and their scores, print each student's name, score, and pass/fail status. Skip students with no score. Stop if any student has a perfect score (100).

**Code:**
```php
<?php
$students = [
    "Alice" => 88,
    "Bob" => 45,
    "Charlie" => null,
    "Diana" => 73,
    "Eve" => 100
];

foreach ($students as $name => $score) {
    if ($score === null) {
        continue;
    }
    $status = $score >= 50 ? "PASS" : "FAIL";
    echo "$name: $score — $status\n";
    if ($score === 100) {
        echo "Perfect score found! Stopping.\n";
        break;
    }
}
?>
```

**Output:**
```
Alice: 88 — PASS
Bob: 45 — FAIL
Diana: 73 — PASS
Eve: 100 — PASS
Perfect score found! Stopping.
```

**Explanation:** `continue` skips Charlie (null score). When Eve's score is 100, `break` terminates the loop early.

## 🏢 Real World Use Case
**Shopping Cart Total:** A nested loop iterates over orders and their line items to calculate the grand total, applying `break` when a coupon limit is reached and `continue` for out-of-stock items.

```php
<?php
$orders = [
    ["id" => 1, "items" => [["price" => 10, "qty" => 2], ["price" => 5, "qty" => 1]]],
    ["id" => 2, "items" => [["price" => 20, "qty" => 1]]]
];
$grandTotal = 0;

foreach ($orders as $order) {
    $orderTotal = 0;
    foreach ($order["items"] as $item) {
        $orderTotal += $item["price"] * $item["qty"];
    }
    echo "Order {$order['id']} total: \$$orderTotal\n";
    $grandTotal += $orderTotal;
}
echo "Grand Total: \$$grandTotal\n";
?>
```

## 🎯 Interview Questions

**1. What is the difference between `while` and `do...while`?**  
`while` checks the condition before executing the block; `do...while` executes the block once before checking.

**2. When would you use `foreach` instead of `for`?**  
`foreach` is simpler and safer for iterating arrays without needing a counter or managing bounds.

**3. What does `break 2;` do in a nested loop?**  
It breaks out of two levels of nested loops.

**4. Can `continue` be used with a numeric argument?**  
Yes. `continue 2;` skips the current iteration of the enclosing loop and continues in the outer loop.

**5. How does `foreach` handle passing by reference?**  
Use `&$value` to modify the original array: `foreach ($array as &$value) { $value *= 2; }`. Unset the reference after the loop to avoid side effects.

## ⚠ Common Errors / Mistakes
- **Infinite loops**: Forgetting to increment the counter or a condition that never becomes false.
- **Modifying array while foreach-ing**: Can cause unexpected behavior — iterate over a copy or use a reference carefully.
- **Off-by-one errors**: Using `<=` vs `<` in `for` conditions.
- **Not unsetting reference after foreach**: The `$value` reference persists, potentially corrupting later code.

## 📝 Practice Exercises

**Beginner**
1. Print all even numbers between 1 and 20 using a `for` loop.
2. Use a `while` loop to sum numbers from 1 to 100 and print the total.
3. Iterate over `["apple", "banana", "cherry"]` with `foreach` and print each fruit in uppercase.

**Intermediate**
4. Given a multidimensional array of products (name, price, stock), print only products with stock > 0 using nested `foreach`.
5. Write a script that uses `continue` to skip numbers divisible by 3 in a range 1-30, printing the rest.
6. Create a multiplication table (1-10 x 1-10) using nested `for` loops.

**Advanced**
7. Implement a Fibonacci sequence generator using a `while` loop that stops when the value exceeds 1000.
8. Build a pagination simulation: given an array of 50 items, iterate and print page numbers (10 items per page), using `break` and `continue` to simulate page navigation.
