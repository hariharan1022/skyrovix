## 15. Java Arrays

## 📘 Introduction

An **array** in Java is a container object that holds a fixed number of values of a single type. Arrays are zero-indexed — the first element is at index 0. The length is set at creation and cannot change. Java provides the `java.util.Arrays` utility class with common operations like sorting, searching, and copying.

## 🧠 Key Concepts

| Concept | Description |
|---------|-------------|
| Declaration | `int[] arr;` or `int arr[];` (prefer first) |
| Initialization | `new int[5]` or `{1, 2, 3, 4, 5}` |
| Index | Zero-based: `arr[0]` through `arr[length-1]` |
| Length | `arr.length` — fixed, set at creation |
| Default values | Numeric → 0, boolean → false, reference → null |

**Multi-dimensional:** `int[][] matrix = new int[3][4];` — 3 rows, 4 columns  
**Jagged arrays:** Rows have different lengths: `int[][] jagged = { {1,2}, {3,4,5}, {6} };`

**Arrays Class Methods:**
| Method | Description |
|--------|-------------|
| `sort(arr)` | Sorts in ascending order |
| `binarySearch(arr, key)` | Searches sorted array (returns index or negative) |
| `fill(arr, val)` | Fills all elements with a value |
| `copyOf(arr, newLength)` | Copies array with new length |
| `toString(arr)` | Returns readable string |
| `equals(a, b)` | Compares array content |

## 💻 Syntax

```java
import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        // Declaration and initialization
        int[] numbers = new int[5];          // all zeros
        int[] values = {10, 20, 30, 40, 50}; // inline

        // Access and modify
        values[0] = 99;
        System.out.println("First: " + values[0]);
        System.out.println("Length: " + values.length);

        // For loop
        for (int i = 0; i < values.length; i++) {
            System.out.print(values[i] + " ");
        }
        System.out.println();

        // Enhanced for-each
        for (int v : values) {
            System.out.print(v + " ");
        }
        System.out.println();

        // Arrays utility
        Arrays.sort(values);
        System.out.println(Arrays.toString(values));
    }
}
```

## ✅ Example 1 - Basic

**Problem:** Find the average of an array of exam scores.

**Code:**
```java
public class AverageScore {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 95, 88, 76, 91};

        // Calculate sum
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }

        double average = (double) sum / scores.length;

        // Find max and min
        int max = scores[0];
        int min = scores[0];
        for (int score : scores) {
            if (score > max) max = score;
            if (score < min) min = score;
        }

        System.out.println("Scores: " + java.util.Arrays.toString(scores));
        System.out.println("Sum: " + sum);
        System.out.printf("Average: %.2f%n", average);
        System.out.println("Max: " + max);
        System.out.println("Min: " + min);

        // Sort and show median
        java.util.Arrays.sort(scores);
        int median = scores[scores.length / 2];
        System.out.println("Median: " + median);
    }
}
```

**Output:**
```
Scores: [85, 92, 78, 95, 88, 76, 91]
Sum: 605
Average: 86.43
Max: 95
Min: 76
Median: 88
```

**Explanation:** The enhanced `for-each` loop iterates all elements. `Arrays.toString()` prints the array. `(double) sum / length` prevents integer division. `Arrays.sort()` sorts in place for median calculation.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate multi-dimensional and jagged arrays.

**Code:**
```java
import java.util.Arrays;

public class MultiArrayDemo {
    public static void main(String[] args) {
        // 2D array (matrix) — 3 rows x 4 columns
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };

        System.out.println("Matrix:");
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.printf("%3d ", matrix[row][col]);
            }
            System.out.println();
        }

        // Jagged array — each row has different length
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5, 6};
        jagged[2] = new int[]{7, 8, 9};

        System.out.println("\nJagged array:");
        for (int row = 0; row < jagged.length; row++) {
            System.out.println("Row " + row + " (length " + jagged[row].length + "): "
                + Arrays.toString(jagged[row]));
        }

        // Arrays.copyOf — expanding array
        int[] original = {10, 20, 30};
        int[] expanded = Arrays.copyOf(original, 5);
        expanded[3] = 40;
        expanded[4] = 50;
        System.out.println("\nExpanded: " + Arrays.toString(expanded));

        // binarySearch — requires sorted array
        int key = 8;
        int index = Arrays.binarySearch(matrix[1], key);
        System.out.println("Index of " + key + " in row 1: " + index);
    }
}
```

**Output:**
```
Matrix:
  1   2   3   4 
  5   6   7   8 
  9  10  11  12 

Jagged array:
Row 0 (length 2): [1, 2]
Row 1 (length 4): [3, 4, 5, 6]
Row 2 (length 3): [7, 8, 9]

Expanded: [10, 20, 30, 40, 50]
Index of 8 in row 1: 3
```

**Explanation:** A 2D array is an array of arrays. Jagged arrays have rows of different lengths. `Arrays.copyOf()` creates a larger array, copying existing elements. `Arrays.binarySearch()` requires a sorted array and returns the index (or negative if not found).

## 🏢 Real World Use Case

**Inventory Management System:** A warehouse system stores product IDs in sorted `int[]` for O(log n) binary search lookups. A `double[][]` stores item dimensions (width, height, depth) for shelf-space optimization. `Arrays.copyOf()` dynamically grows the product catalog as new items arrive, and `Arrays.sort()` arranges items by SKU for display.

## 🎯 Interview Questions

**1. Can an array in Java contain different data types?**  
No, all elements must be the same type. However, an `Object[]` array can hold any object type (but not primitives directly).

**2. What is the difference between `length` and `length()`?**  
`length` is a **property** of arrays (e.g., `arr.length`). `length()` is a **method** of String (e.g., `str.length()`).

**3. How do you copy an array?**  
`Arrays.copyOf(original, newLength)` — creates a new array. `System.arraycopy()` — copies to an existing array. `clone()` — returns a copy.

**4. What is a jagged array?**  
A multi-dimensional array where each row has a different number of columns (e.g., `int[][] jagged = {{1,2}, {3,4,5}}`).

**5. What happens if you access `arr[arr.length]`?**  
`ArrayIndexOutOfBoundsException` at runtime. Valid indices are 0 through `length - 1`.

## ⚠ Common Errors / Mistakes

- **Off-by-one errors** — `for (int i = 0; i <= arr.length; i++)` causes `ArrayIndexOutOfBoundsException`
- **Using `length()` instead of `length`** — `arr.length()` is a compile error (arrays use `length`, not `length()`)
- **Confusing `Arrays.toString()` with array's `toString()`** — `arr.toString()` returns `[I@hashcode`; use `Arrays.toString(arr)`
- **Assuming `Arrays.asList()` works with primitives** — `Arrays.asList(1,2,3)` returns `List<int[]>` (one element), not `List<Integer>`
- **Modifying array while iterating with enhanced for** — For-each variable is a copy; use indexed loop to modify

## 📝 Practice Exercises

**Beginner**
1. Create an array of 5 integers, fill it with values, and print them in reverse order using a for loop.
2. Find the largest and smallest number in an array `{45, 12, 89, 34, 67, 23}`.
3. Create a 2D array representing a 3x3 tic-tac-toe board with 'X', 'O', and ' ' characters.

**Intermediate**
4. Write a method that merges two sorted arrays into one sorted array (like the merge step of merge sort).
5. Create a program using `Arrays.copyOf()` to dynamically grow an array as the user enters numbers (simulate with a hardcoded loop).
6. Implement a method that rotates an array left by k positions (e.g., `[1,2,3,4,5]` rotated by 2 → `[3,4,5,1,2]`).

**Advanced**
7. Implement a sparse matrix representation using jagged arrays where only non-zero values are stored, with methods for get, set, and add.
8. Write a program that finds all pairs of integers in an array that sum to a target value — optimize from O(n^2) to O(n) using sorting/two-pointer or a HashSet.
