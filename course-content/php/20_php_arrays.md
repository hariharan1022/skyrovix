# 20. PHP Arrays

## 📘 Introduction
Arrays in PHP are flexible ordered maps that can store multiple values in a single variable. PHP supports indexed (numeric), associative (string keys), and multidimensional arrays, along with a rich set of built-in functions for manipulation.

## 🧠 Key Concepts
- **Indexed arrays**: Elements accessed by numeric index (0-based).
- **Associative arrays**: Elements accessed by string keys.
- **Multidimensional arrays**: Arrays containing other arrays.
- **Common array functions**: `count`, `array_push`, `array_pop`, `array_merge`, `array_keys`, `array_values`, `in_array`, `array_search`, `sort`, `array_map`, `array_filter`, `array_reduce`.

## 💻 Syntax
```php
// Indexed array
$colors = ["red", "green", "blue"];

// Associative array
$user = ["name" => "Alice", "age" => 30];

// Multidimensional array
$matrix = [[1, 2], [3, 4]];
```

## ✅ Example 1 - Basic

**Problem:** Manage a list of tasks: add tasks, remove the last one, find a task, and merge two task lists.

**Code:**
```php
<?php
$tasks = ["Buy milk", "Call mom"];

// Add tasks
array_push($tasks, "Pay bills", "Read book");

// Remove last task
$last = array_pop($tasks);
echo "Removed: $last\n";

// Check if task exists
if (in_array("Call mom", $tasks)) {
    echo "Found: Call mom\n";
}

// Find index
$index = array_search("Pay bills", $tasks);
echo "Pay bills is at index: $index\n";

echo "Total tasks: " . count($tasks) . "\n";
print_r($tasks);
?>
```

**Output:**
```
Removed: Read book
Found: Call mom
Pay bills is at index: 2
Total tasks: 3
Array
(
    [0] => Buy milk
    [1] => Call mom
    [2] => Pay bills
)
```

**Explanation:** `array_push` adds elements, `array_pop` removes and returns the last, `in_array` checks existence, `array_search` gets the index, and `count` returns the length.

## 🚀 Example 2 - Intermediate

**Problem:** Given an array of user records, filter active users, transform their names to uppercase, and compute the total score.

**Code:**
```php
<?php
$users = [
    ["name" => "Alice", "active" => true, "score" => 85],
    ["name" => "Bob",   "active" => false, "score" => 42],
    ["name" => "Charlie", "active" => true, "score" => 73],
    ["name" => "Diana", "active" => true, "score" => 90]
];

// Filter active users
$active = array_filter($users, fn($u) => $u["active"]);

// Transform names to uppercase
$names = array_map(fn($u) => strtoupper($u["name"]), $active);

// Sum scores of active users
$totalScore = array_reduce($active, fn($carry, $u) => $carry + $u["score"], 0);

echo "Active users: " . implode(", ", $names) . "\n";
echo "Total score: $totalScore\n";

// Get all keys from first user
print_r(array_keys($users[0]));
print_r(array_values($users[0]));
?>
```

**Output:**
```
Active users: ALICE, CHARLIE, DIANA
Total score: 248
Array ( [0] => name [1] => active [2] => score )
Array ( [0] => Alice [1] => 1 [2] => 85 )
```

**Explanation:** `array_filter` keeps only active users. `array_map` transforms each element. `array_reduce` aggregates the scores. `array_keys` and `array_values` extract key/val lists.

## 🏢 Real World Use Case
**E-commerce Product Catalog:** A multidimensional array of products is sorted by price, filtered by category, and mapped to a display format.

```php
<?php
$products = [
    ["id" => 1, "name" => "Laptop", "category" => "electronics", "price" => 999],
    ["id" => 2, "name" => "Shirt", "category" => "clothing", "price" => 29],
    ["id" => 3, "name" => "Phone", "category" => "electronics", "price" => 699]
];

$electronics = array_filter($products, fn($p) => $p["category"] === "electronics");
usort($electronics, fn($a, $b) => $a["price"] - $b["price"]);
$names = array_column($electronics, "name");

echo "Electronics (sorted): " . implode(", ", $names);
?>
```

## 🎯 Interview Questions

**1. What is the difference between `array_merge` and `+` for associative arrays?**  
`array_merge` reindexes numeric keys and overwrites string keys; the `+` operator preserves the first array's keys and ignores duplicates from the second.

**2. How does `array_filter` work without a callback?**  
It removes all elements that are falsy (`false`, `null`, `0`, `""`, `[]`).

**3. What does `array_reduce` return if the array is empty?**  
It returns the initial value (second argument), or `null` if no initial value is given.

**4. How can you sort an array by a custom key?**  
Use `usort()` (or `uasort()` to preserve keys) with a custom comparison function.

**5. What is `array_column` used for?**  
It returns the values from a single column of a multidimensional array, e.g., `array_column($users, 'name')`.

## ⚠ Common Errors / Mistakes
- **Confusing `array_push` with `$arr[] = value`**: Both work, but `$arr[] =` avoids function call overhead for single items.
- **Losing keys with `sort()`**: `sort` reindexes numeric keys; use `asort` to preserve key-value associations.
- **Modifying array while `array_map`/`array_filter`/`foreach`**: These functions do not modify the original array (unless passed by reference).
- **`in_array` loose comparison**: `in_array("1", [1, 2, 3])` returns `true` by default. Use `strict: true` for type-safe checks.

## 📝 Practice Exercises

**Beginner**
1. Create an indexed array of 5 favorite movies, then use `array_push` to add two more and `array_pop` to remove the last.
2. Build an associative array of 3 products (name => price), then check if a product exists using `array_key_exists`.
3. Given `$numbers = [3, 7, 2, 9, 5]`, sort it ascending and print the result.

**Intermediate**
4. Filter an array of numbers to keep only even numbers using `array_filter`, then double each with `array_map`.
5. Given `$orders = [["id" => 1, "total" => 50], ["id" => 2, "total" => 120], ...]`, use `array_reduce` to sum all totals.
6. Merge two associative arrays of user settings where the second array's values should overwrite the first's.

**Advanced**
7. Implement a recursive `array_flatten` function that converts a multidimensional array into a flat indexed array.
8. Build a group-by function that takes an array of associative records and a key, returning records grouped by that key's values.
