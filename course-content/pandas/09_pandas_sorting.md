## 9. Pandas Sorting
## 📘 Introduction
Sorting is fundamental to data exploration and presentation. Pandas provides `sort_values()` for sorting by column values, `sort_index()` for sorting by row labels, and flexible options for ascending/descending order, missing value placement, and custom sorting logic.

## 🧠 Key Concepts
- **sort_values()**: Sort DataFrame/Series by one or more columns.
- **ascending**: Boolean or list of booleans for sort direction.
- **sort_index()**: Sort by row index labels.
- **na_position**: Where to place NaN values — `'first'` or `'last'` (default `'last'`).
- **Multiple columns**: Pass a list to sort by multiple columns with priority order.
- **by index level**: `sort_index(level=)` for multi-index DataFrames.
- **key parameter**: Apply a function to the values before sorting (e.g., `key=lambda x: x.str.lower()` for case-insensitive string sort).
- **inplace**: Modify the DataFrame directly without reassignment.

## 💻 Syntax

```python
import pandas as pd

# Sort by single column
df.sort_values('Age')
df.sort_values('Age', ascending=False)

# Sort by multiple columns
df.sort_values(['Department', 'Salary'], ascending=[True, False])

# Sort by index
df.sort_index()
df.sort_index(ascending=False)

# NA position
df.sort_values('Age', na_position='first')

# Custom sort with key
df.sort_values('Name', key=lambda x: x.str.lower())

# For multi-index
df.sort_index(level='Region')
df.sort_index(level=[0, 1])
```

## ✅ Example 1 - Basic
**Problem:** Sort employee data by different columns and directions.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
    'Department': ['IT', 'HR', 'IT', 'IT', 'Finance', 'HR'],
    'Salary': [50000, 60000, 80000, 52000, 95000, 55000],
    'Age': [25, np.nan, 35, 28, 45, 30]
})

print("=== ORIGINAL ===")
print(df)
print()

# Sort by salary ascending
print("Sorted by Salary:")
print(df.sort_values('Salary'))
print()

# Sort by salary descending
print("Sorted by Salary (desc):")
print(df.sort_values('Salary', ascending=False))
print()

# Sort by Department (asc) then Salary (desc)
print("Sorted by Dept (A-Z) then Salary (high-low):")
print(df.sort_values(['Department', 'Salary'], ascending=[True, False]))
```

**Output:**
```
=== ORIGINAL ===
      Name Department  Salary   Age
0    Alice         IT   50000  25.0
1      Bob         HR   60000   NaN
2  Charlie         IT   80000  35.0
3    Diana         IT   52000  28.0
4      Eve    Finance   95000  45.0
5    Frank         HR   55000  30.0

Sorted by Salary:
      Name Department  Salary   Age
0    Alice         IT   50000  25.0
3    Diana         IT   52000  28.0
5    Frank         HR   55000  30.0
1      Bob         HR   60000   NaN
2  Charlie         IT   80000  35.0
4      Eve    Finance   95000  45.0

Sorted by Salary (desc):
      Name Department  Salary   Age
4      Eve    Finance   95000  45.0
2  Charlie         IT   80000  35.0
1      Bob         HR   60000   NaN
5    Frank         HR   55000  30.0
3    Diana         IT   52000  28.0
0    Alice         IT   50000  25.0

Sorted by Dept (A-Z) then Salary (high-low):
      Name Department  Salary   Age
4      Eve    Finance   95000  45.0
1      Bob         HR   60000   NaN
5    Frank         HR   55000  30.0
2  Charlie         IT   80000  35.0
3    Diana         IT   52000  28.0
0    Alice         IT   50000  25.0
```

**Explanation:**
Sorting by a single column is straightforward. For multiple columns, pass a list — `['Department', 'Salary']` sorts by Department first, then by Salary within each department. The `ascending` parameter accepts a list to control direction per column: `[True, False]` means Department A-Z, Salary Z-A.

## 🚀 Example 2 - Intermediate
**Problem:** Sort with NA handling, sort by index, and use custom key.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name': ['alice', 'Bob', 'charlie', 'DIANA', 'eve'],
    'Score': [85, 92, np.nan, 78, 95]
}, index=['d', 'a', 'c', 'b', 'e'])

print("=== ORIGINAL ===")
print(df)
print()

# Sort by index
print("Sorted by Index:")
print(df.sort_index())
print()

# Sort with NA first
print("Sorted by Score (NA first):")
print(df.sort_values('Score', na_position='first'))
print()

# Custom sort - case-insensitive string sort
print("Case-insensitive sort by Name:")
print(df.sort_values('Name', key=lambda x: x.str.lower()))
print()

# Sort by index descending
print("Sorted by Index descending:")
print(df.sort_index(ascending=False))
```

**Output:**
```
=== ORIGINAL ===
      Name  Score
d    alice   85.0
a      Bob   92.0
c  charlie    NaN
b    DIANA   78.0
e      eve   95.0

Sorted by Index:
      Name  Score
a      Bob   92.0
b    DIANA   78.0
c  charlie    NaN
d    alice   85.0
e      eve   95.0

Sorted by Score (NA first):
      Name  Score
c  charlie    NaN
b    DIANA   78.0
d    alice   85.0
a      Bob   92.0
e      eve   95.0

Case-insensitive sort by Name:
      Name  Score
d    alice   85.0
a      Bob   92.0
c  charlie    NaN
b    DIANA   78.0
e      eve   95.0

Sorted by Index descending:
      Name  Score
e      eve   95.0
d    alice   85.0
c  charlie    NaN
b    DIANA   78.0
a      Bob   92.0
```

**Explanation:**
`sort_index()` rearranges rows by their index labels. `na_position='first'` places NaN values at the top regardless of sort direction. The `key` parameter accepts a function applied to the sort column before comparison — here, `lambda x: x.str.lower()` makes the string sort case-insensitive.

## 🏢 Real World Use Case
**E-commerce Product Listing:** An online store sorts products by `category` (ascending) then `price` (ascending). Out-of-stock products (NaN in stock column) are sorted to the end with `na_position='last'`. A custom sort key applies `str.lower()` to product names for case-insensitive alphabetical ordering. Sorting is done in-place to avoid copying large DataFrames.

## 🎯 Interview Questions

**Q1: How do you sort a DataFrame by multiple columns with different directions?**
A: `df.sort_values(['col1', 'col2'], ascending=[True, False])` — sorts col1 ascending, then col2 descending.

**Q2: What does `na_position` control?**
A: It determines where NaN values appear in the sorted result: `'last'` (default) puts NaN at the end, `'first'` puts them at the beginning.

**Q3: How is `sort_values()` different from `sort_index()`?**
A: `sort_values()` sorts by column data values. `sort_index()` sorts by the row index labels.

**Q4: How can you perform a case-insensitive sort on a string column?**
A: Use the `key` parameter: `df.sort_values('Name', key=lambda x: x.str.lower())`.

**Q5: What is the difference between `sort_values()` and `nsmallest()`/`nlargest()`?**
A: `sort_values()` returns the entire sorted DataFrame. `nsmallest(n, 'col')` and `nlargest(n, 'col')` return only the top/bottom n rows — more efficient for getting just extremes.

## ⚠ Common Errors / Mistakes
- **Forgetting that `sort_values()` returns a new DataFrame** — use `inplace=True` or reassign to persist.
- **Passing a single boolean to `ascending` when sorting by multiple columns** — must be a list of same length as columns.
- **Case-sensitive string sort giving unexpected order** — "apple" > "Banana" because uppercase letters sort before lowercase. Use `key` parameter.
- **Assuming `sort_index()` sorts by row index** — for column index, use `sort_index(axis=1)`.
- **Not handling NaN before sorting**: NaN propagates; use `na_position` to control placement.

## 📝 Practice Exercises

**Beginner:**
1. Sort a DataFrame by a single numeric column in descending order.
2. Sort a DataFrame by its index in ascending order.
3. Sort by one column ascending and handle NaN with `na_position='first'`.

**Intermediate:**
4. Sort a DataFrame by 3 columns: `Department` ascending, `Salary` descending, `Age` ascending.
5. Use `sort_index(level=...)` on a multi-index DataFrame to sort by the second index level.
6. Sort a string column case-insensitively using the `key` parameter and verify with a mixed-case dataset.

**Advanced:**
7. Write a function that sorts a DataFrame based on a user-provided list of column-direction pairs (e.g., `[('Age', 'asc'), ('Salary', 'desc')]`) and validates the input.
8. Compare `sort_values()` with `nsmallest()`/`nlargest()` for extracting the top 10 rows from a 1M-row dataset — measure memory usage and execution time.
