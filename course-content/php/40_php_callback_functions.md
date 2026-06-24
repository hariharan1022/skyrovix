## 40. PHP Callback Functions

## 📘 Introduction
Callbacks are functions passed as arguments to other functions, enabling higher-order programming patterns. PHP supports callbacks via string function names, arrays (`[class, method]`), `Closure` objects (anonymous functions), and arrow functions. They are essential for array processing, event handling, sorting, and functional-style data transformations.

## 🧠 Key Concepts
- **callable type**: A pseudo-type accepted by many built-in functions. Can be a string (function name), array (`[object, method]` or `[class, staticMethod]`), `Closure`, or arrow function.
- **array_map**: Applies a callback to each element of an array, returning a new array of transformed values.
- **array_filter**: Filters array elements using a callback that returns `true` to keep the element.
- **array_reduce**: Reduces an array to a single value using a callback that carries an accumulator.
- **usort**: Sorts an array using a user-defined comparison callback.
- **Closure class**: Anonymous functions are instances of `Closure`. Can capture variables from the parent scope using `use`.
- **use keyword**: Binds variables from the outer scope into the closure's scope.
- **call_user_func / call_user_func_array**: Invokes a callable with given arguments. Useful when the callable is dynamic.
- **Arrow functions** (PHP 7.4+): `fn($x) => $x * 2` — shorthand syntax, automatically captures parent scope by value.

## 💻 Syntax
```php
<?php
// String function name
$result = array_map('strtoupper', ['a', 'b', 'c']);

// Closure
$multiply = function($a, $b) { return $a * $b; };
echo $multiply(3, 4); // 12

// Closure with use
$factor = 2;
$doubler = function($n) use ($factor) { return $n * $factor; };

// Arrow function (PHP 7.4+)
$nums = [1, 2, 3];
$squared = array_map(fn($n) => $n * $n, $nums);

// call_user_func
call_user_func('strtoupper', 'hello');

// call_user_func_array
call_user_func_array('array_merge', [[1,2], [3,4]]);
?>
```

## ✅ Example 1 - Basic
**Problem**: Demonstrate `array_map`, `array_filter`, and `array_reduce` using callbacks.

**Code** (`array_operations.php`):
```php
<?php
$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// array_map: square each number
$squared = array_map(fn($n) => $n * $n, $numbers);
echo "Squared: " . implode(', ', $squared) . "\n";

// array_filter: keep only even numbers
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
echo "Evens: " . implode(', ', $evens) . "\n";

// array_reduce: sum all numbers
$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);
echo "Sum: $sum\n";

// Combining: sum of squares of even numbers
$result = array_reduce(
    array_map(fn($n) => $n * $n,
        array_filter($numbers, fn($n) => $n % 2 === 0)),
    fn($c, $n) => $c + $n,
    0
);
echo "Sum of squares of evens: $result\n";
?>
```

**Output**:
```
Squared: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100
Evens: 2, 4, 6, 8, 10
Sum: 55
Sum of squares of evens: 220
```

**Explanation**: Arrow functions (`fn($n) => ...`) provide concise callback syntax. `array_map` transforms, `array_filter` selects, `array_reduce` aggregates. They compose naturally: filter evens → square them → sum them.

## 🚀 Example 2 - Intermediate
**Problem**: Use `usort`, closures with `use`, and `call_user_func_array` for dynamic data processing.

**Code** (`advanced_callbacks.php`):
```php
<?php
$users = [
    ['name' => 'Charlie', 'age' => 35, 'salary' => 75000],
    ['name' => 'Alice',   'age' => 28, 'salary' => 68000],
    ['name' => 'Bob',     'age' => 42, 'salary' => 92000],
];

// usort with closure
usort($users, function($a, $b) {
    return $a['age'] <=> $b['age'];  // spaceship operator
});
echo "Sorted by age:\n";
print_r(array_column($users, 'name'));

// Dynamic sorting with use
$sortField = 'salary';
$sortOrder = 'desc';
usort($users, function($a, $b) use ($sortField, $sortOrder) {
    return $sortOrder === 'desc'
        ? $b[$sortField] <=> $a[$sortField]
        : $a[$sortField] <=> $b[$sortField];
});
echo "Sorted by salary (desc):\n";
foreach ($users as $u) {
    echo "  {$u['name']}: \${$u['salary']}\n";
}

// call_user_func_array for dynamic method calls
class MathHelper {
    public static function multiply($a, $b, $c) {
        return $a * $b * $c;
    }
}

$args = [2, 3, 4];
$result = call_user_func_array(['MathHelper', 'multiply'], $args);
echo "\nMathHelper::multiply(2,3,4) = $result\n";

// call_user_func with a dynamic function name
$operation = 'strtoupper';
echo call_user_func($operation, 'hello world') . "\n";
?>
```

**Output**:
```
Sorted by age:
Array
(
    [0] => Alice
    [1] => Charlie
    [2] => Bob
)
Sorted by salary (desc):
  Bob: $92000
  Charlie: $75000
  Alice: $68000

MathHelper::multiply(2,3,4) = 24
HELLO WORLD
```

**Explanation**: `usort` with a closure allows custom sorting. The `use` keyword captures `$sortField` and `$sortOrder` by value. `call_user_func_array` calls a static method with an array of arguments. `call_user_func` invokes a callable dynamically by name.

## 🏢 Real World Use Case
**E-commerce Product Filter & Sort**: A product listing page uses `array_filter` with `use`-based closures to filter products by user-selected criteria (price range, category, rating). `usort` sorts results by relevance, price, or newest. `array_map` transforms products into a display-friendly format. All callbacks are defined inline for readability and closed over the filter parameters.

## 🎯 Interview Questions
1. What is the difference between a Closure and a regular function in PHP?
2. How does the `use` keyword work with anonymous functions?
3. When would you use `call_user_func_array` instead of a direct function call?
4. What are the limitations of arrow functions (`fn`) compared to anonymous functions?
5. How do you pass an object's method as a callable to `array_map`?

## ⚠ Common Errors / Mistakes
- **Variable scoping with `use`**: Variables are captured by value by default. Use `&` (reference) in the `use` list to modify the outer variable: `function($x) use (&$counter) { $counter++; }`.
- **Arrow function scope limitation**: Arrow functions cannot use `use` — they auto-capture parent scope by value, but cannot capture by reference.
- **String callable for instance methods**: `['object', 'methodName']` works; just the string `'methodName'` does not.
- **Not checking if callable is valid**: Use `is_callable($callback)` before invoking dynamic callables.
- **Performance overhead**: Each callback invocation has overhead. For very large arrays, consider iterator-based approaches.

## 📝 Practice Exercises
**Beginner:**
1. Use `array_map` with `strtoupper` to convert an array of lowercase strings to uppercase.
2. Use `array_filter` to remove all even numbers from `[1, 2, 3, 4, 5, 6]`.
3. Write a closure that takes two numbers and returns their sum, then use `array_reduce` to sum `[10, 20, 30]`.

**Intermediate:**
4. Use `usort` with a closure to sort an array of associative arrays by the `price` field in ascending order.
5. Create an array of product names and use `array_map` with a closure and `use` to prepend a dynamic prefix (e.g., "SKU-") to each name.
6. Use `call_user_func_array` to call `sprintf` with a format string and an array of arguments.

**Advanced:**
7. Build a pipeline class `Pipe` that chains multiple callbacks: `(new Pipe)->pipe(fn($x) => $x*2)->pipe(fn($x) => $x+1)->process(5)` should return `11`. Implement using `array_reduce` internally.
8. Implement a memoization decorator using closures: create a function `memoize(callable $fn): callable` that returns a new callable which caches results based on serialized arguments. Use it to wrap an expensive Fibonacci or database lookup function.
