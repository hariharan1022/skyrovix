## 10. Pandas GroupBy
## 📘 Introduction
The `groupby()` method implements the **split-apply-combine** pattern: split data into groups based on criteria, apply a function to each group independently, and combine the results. GroupBy is one of the most powerful pandas features — essential for aggregation, transformation, and filtering in grouped data analysis.

## 🧠 Key Concepts
- **groupby()**: Group rows by one or more columns.
- **Aggregation (agg)**: Compute summary statistics per group (`sum`, `mean`, `count`, `min`, `max`, `std`, `describe`).
- **transform**: Apply a function that returns same-shaped data per group (e.g., z-score within each group).
- **filter**: Remove groups based on a condition applied to the group as a whole.
- **apply**: Apply an arbitrary function to each group — most flexible but slowest.
- **Multiple aggregation per column**: `agg({'col1': 'sum', 'col2': ['mean', 'std']})` with named aggregation.
- **as_index**: Control whether group keys become the index (`True` by default).
- **pivot_table**: Spreadsheet-style pivot table — a multi-dimensional GroupBy with row/column keys and values.

## 💻 Syntax

```python
import pandas as pd

# Basic groupby with aggregation
df.groupby('Department')['Salary'].mean()
df.groupby('Department').agg({'Salary': 'mean', 'Age': 'max'})

# Multiple aggregations per column
df.groupby('Department').agg(
    avg_salary=('Salary', 'mean'),
    max_age=('Age', 'max'),
    count=('Name', 'count')
)

# transform
df['dept_mean_salary'] = df.groupby('Department')['Salary'].transform('mean')

# filter
df.groupby('Department').filter(lambda x: x['Salary'].mean() > 60000)

# apply
df.groupby('Department').apply(custom_function)

# as_index=False
df.groupby('Department', as_index=False)['Salary'].mean()

# Pivot table
pd.pivot_table(df, values='Salary', index='Department', columns='Gender', aggfunc='mean')
```

## ✅ Example 1 - Basic
**Problem:** Group sales data by department and compute aggregated statistics.

```python
import pandas as pd

df = pd.DataFrame({
    'Employee': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
    'Department': ['IT', 'HR', 'IT', 'IT', 'Finance', 'HR'],
    'Salary': [70000, 60000, 80000, 52000, 95000, 55000],
    'Age': [25, 32, 35, 28, 45, 30],
    'YearsExp': [2, 5, 8, 3, 12, 4]
})

print("=== DATA ===")
print(df)
print()

# Mean salary by department
print("Mean salary per department:")
print(df.groupby('Department')['Salary'].mean())
print()

# Multiple aggregations
print("Aggregations per department:")
result = df.groupby('Department').agg(
    avg_salary=('Salary', 'mean'),
    max_age=('Age', 'max'),
    emp_count=('Employee', 'count'),
    avg_exp=('YearsExp', 'mean')
).round(2)
print(result)
print()

# as_index=False
print("With as_index=False:")
print(df.groupby('Department', as_index=False)['Salary'].mean())
```

**Output:**
```
=== DATA ===
  Employee Department  Salary  Age  YearsExp
0    Alice         IT   70000   25         2
1      Bob         HR   60000   32         5
2  Charlie         IT   80000   35         8
3    Diana         IT   52000   28         3
4      Eve    Finance   95000   45        12
5    Frank         HR   55000   30         4

Mean salary per department:
Department
Finance    95000.0
HR         57500.0
IT         67333.3
Name: Salary, dtype: float64

Aggregations per department:
            avg_salary  max_age  emp_count  avg_exp
Department
Finance         95000       45          1     12.0
HR              57500       32          2      4.5
IT              67333       35          3      4.3

With as_index=False:
  Department   Salary
0    Finance  95000.0
1        HR  57500.0
2        IT  67333.3
```

**Explanation:**
`groupby('Department')['Salary'].mean()` splits by department, selects Salary, and computes mean. Named aggregation with `.agg()` assigns clear output column names. `as_index=False` keeps group keys as regular columns instead of the index — useful when the result is being used in further operations.

## 🚀 Example 2 - Intermediate
**Problem:** Use transform, filter, apply, and pivot_table.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Product': ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C'],
    'Month': ['Jan', 'Feb', 'Mar', 'Jan', 'Feb', 'Mar', 'Jan', 'Feb'],
    'Sales': [100, 110, 105, 200, 190, 210, 50, np.nan]
})

print("=== ORIGINAL ===")
print(df)
print()

# Transform: add column with product mean sales
df['Product_Avg'] = df.groupby('Product')['Sales'].transform('mean').round(1)
print("With product average:")
print(df)
print()

# Filter: keep products with avg sales > 100
filtered = df.groupby('Product').filter(lambda x: x['Sales'].mean() > 100)
print("Products with avg > 100:")
print(filtered)
print()

# Pivot table
pivot = pd.pivot_table(df, values='Sales', index='Month', columns='Product', aggfunc='mean')
print("Pivot table (avg sales by Month × Product):")
print(pivot)
```

**Output:**
```
=== ORIGINAL ===
  Product Month  Sales
0       A   Jan  100.0
1       A   Feb  110.0
2       A   Mar  105.0
3       B   Jan  200.0
4       B   Feb  190.0
5       B   Mar  210.0
6       C   Jan   50.0
7       C   Feb    NaN

With product average:
  Product Month  Sales  Product_Avg
0       A   Jan  100.0        105.0
1       A   Feb  110.0        105.0
2       A   Mar  105.0        105.0
3       B   Jan  200.0        200.0
4       B   Feb  190.0        200.0
5       B   Mar  210.0        200.0
6       C   Jan   50.0         50.0
7       C   Feb    NaN         50.0

Products with avg > 100:
  Product Month  Sales  Product_Avg
0       A   Jan  100.0        105.0
1       A   Feb  110.0        105.0
2       A   Mar  105.0        105.0
3       B   Jan  200.0        200.0
4       B   Feb  190.0        200.0
5       B   Mar  210.0        200.0

Pivot table (avg sales by Month × Product):
Product      A      B    C
Month
Feb      110.0  190.0  NaN
Jan      100.0  200.0  50.0
Mar      105.0  210.0  NaN
```

**Explanation:**
`transform('mean')` returns a same-length Series with the group mean repeated for each row — used to add a `Product_Avg` column. `filter()` removes entire groups based on a group-level condition (Product C excluded because its mean ≤ 100). `pivot_table()` reshapes the data into a matrix of Month × Product with average Sales as values.

## 🏢 Real World Use Case
**Sales Performance Dashboard:** A sales manager uses `groupby('Region')['Revenue'].sum()` to get total revenue by region. They compute each region's contribution percentage with `transform('sum')` to create a share column. They filter out regions with fewer than 10 transactions using `filter()`. Finally, they build a pivot table of `Product_Category` × `Quarter` with `sum` of Revenue to spot seasonal trends.

## 🎯 Interview Questions

**Q1: What is the split-apply-combine pattern?**
A: Split the data into groups (by one or more keys), apply a function to each group independently, and combine the results into a new data structure.

**Q2: How does `transform()` differ from `agg()`?**
A: `agg()` returns a reduced result (one row per group). `transform()` returns a same-sized result aligned with the original DataFrame (one row per original row).

**Q3: What is the purpose of `as_index` in `groupby()`?**
A: When `True` (default), group keys become the index of the result. When `False`, group keys remain as columns, which is often more convenient for further operations.

**Q4: How do you apply different aggregation functions to different columns?**
A: Use `.agg({'col1': 'sum', 'col2': ['mean', 'std'], 'col3': 'first'})` or named aggregation with `agg(new_name=('col', 'func'))`.

**Q5: What is a pivot table and how is it related to groupby?**
A: A pivot table (`pd.pivot_table()`) provides a multi-dimensional GroupBy, allowing you to specify row index, column index, values, and aggregation function — essentially a two-level groupby.

## ⚠ Common Errors / Mistakes
- **Calling `mean()` or `sum()` without selecting a column first** — can compute on non-numeric columns and fail.
- **Forgetting `as_index=False`** — the group key becomes the index, which may be unexpected.
- **Using `apply()` when `agg()` or `transform()` would suffice** — `apply()` is slower and more error-prone.
- **Not resetting index after groupby**: The result has a multi-index that needs `.reset_index()` for flat access.
- **Assuming `filter()` works row-by-row** — `filter()` evaluates the condition on the entire group, not individual rows.

## 📝 Practice Exercises

**Beginner:**
1. Group a DataFrame by `Department` and compute the mean `Salary` for each group.
2. Group by `Category` and compute `sum`, `mean`, and `count` for a numeric column.
3. Use `as_index=False` in groupby and observe the difference in output structure.

**Intermediate:**
4. Use `transform()` to add a column showing the percentage of each row's value relative to its group total.
5. Filter out groups where the maximum value is less than a threshold using `filter()`.
6. Create a pivot table with `Region` as index, `Product` as columns, and `Sales` as values aggregated by sum.

**Advanced:**
7. Write a function that takes a DataFrame, group key, and a list of aggregation specifications (column, function, output name), and returns the aggregated result — similar to `pandas`' named aggregation but with validation.
8. Compare `transform()` vs `apply()` for computing within-group z-scores on a 100K-row dataset — measure execution time and verify the results match.
