## 11. Pandas Merge / Join
## 📘 Introduction
In real-world data analysis, data is rarely in a single table. You often need to combine multiple DataFrames — similar to SQL JOINs. Pandas provides `pd.merge()` for SQL-like joins on columns or indices, `df.join()` for index-based joins, and `pd.concat()` for stacking DataFrames along rows or columns.

## 🧠 Key Concepts
- **pd.merge()**: Primary function for merging DataFrames on columns or indices (like SQL JOIN).
- **how**: Type of join — `'inner'`, `'outer'`, `'left'`, `'right'`, `'cross'`.
- **on**: Column(s) to join on (must exist in both DataFrames).
- **left_on/right_on**: When join columns have different names.
- **suffixes**: Tuple of suffixes for overlapping column names (default `('_x', '_y')`).
- **Index-based merge**: `left_index=True` or `right_index=True`.
- **df.join()**: Convenience method for index-based joins.
- **pd.concat()**: Stack DataFrames along `axis=0` (rows) or `axis=1` (columns).
- **Duplicate keys**: Can cause Cartesian product (many-to-many merge).

## 💻 Syntax

```python
import pandas as pd

# Merge on common column
pd.merge(df1, df2, on='key')

# Merge on different column names
pd.merge(df1, df2, left_on='id', right_on='user_id')

# Types of joins
pd.merge(df1, df2, how='inner')
pd.merge(df1, df2, how='outer')
pd.merge(df1, df2, how='left')
pd.merge(df1, df2, how='right')
pd.merge(df1, df2, how='cross')

# Index-based merge
pd.merge(df1, df2, left_index=True, right_index=True)

# Suffixes for overlapping column names
pd.merge(df1, df2, on='key', suffixes=('_left', '_right'))

# Join (index-based)
df1.join(df2, how='left')

# Concat
pd.concat([df1, df2])            # stack rows
pd.concat([df1, df2], axis=1)    # stack columns
pd.concat([df1, df2], ignore_index=True)
```

## ✅ Example 1 - Basic
**Problem:** Merge two DataFrames on a common column using different join types.

```python
import pandas as pd

employees = pd.DataFrame({
    'emp_id': [101, 102, 103, 104],
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'dept_id': [1, 2, 1, 3]
})

departments = pd.DataFrame({
    'dept_id': [1, 2, 4],
    'dept_name': ['IT', 'HR', 'Finance']
})

print("=== EMPLOYEES ===")
print(employees)
print()
print("=== DEPARTMENTS ===")
print(departments)
print()

# Inner join
print("INNER JOIN:")
print(pd.merge(employees, departments, on='dept_id', how='inner'))
print()

# Left join
print("LEFT JOIN:")
print(pd.merge(employees, departments, on='dept_id', how='left'))
print()

# Outer join
print("OUTER JOIN:")
print(pd.merge(employees, departments, on='dept_id', how='outer'))
```

**Output:**
```
=== EMPLOYEES ===
   emp_id     name  dept_id
0     101    Alice        1
1     102      Bob        2
2     103  Charlie        1
3     104    Diana        3

=== DEPARTMENTS ===
   dept_id dept_name
0        1        IT
1        2        HR
2        4   Finance

INNER JOIN:
   emp_id     name  dept_id dept_name
0     101    Alice        1        IT
1     102      Bob        2        HR
2     103  Charlie        1        IT

LEFT JOIN:
   emp_id     name  dept_id dept_name
0     101    Alice        1        IT
1     102      Bob        2        HR
2     103  Charlie        1        IT
3     104    Diana        3       NaN

OUTER JOIN:
   emp_id     name  dept_id dept_name
0     101    Alice        1        IT
1     102      Bob        2        HR
2     103  Charlie        1        IT
3     104    Diana        3       NaN
4      NaN      NaN        4   Finance
```

**Explanation:**
`inner` keeps only matching keys (dept 3 in employees and dept 4 in departments are dropped). `left` keeps all rows from the left (employees) and fills NaN for missing matches. `outer` keeps all keys from both DataFrames — note Diana has no department and Finance has no employees.

## 🚀 Example 2 - Intermediate
**Problem:** Merge with different column names, index-based join, and concat.

```python
import pandas as pd

# DataFrames with different key column names
orders = pd.DataFrame({
    'order_id': [1, 2, 3, 4],
    'cust_id': [101, 102, 103, 101],
    'amount': [250, 150, 300, 400]
})

customers = pd.DataFrame({
    'customer_id': [101, 102, 103],
    'name': ['Alice', 'Bob', 'Charlie']
})

# Merge with left_on/right_on
print("=== MERGE WITH DIFFERENT KEY NAMES ===")
merged = pd.merge(orders, customers, left_on='cust_id', right_on='customer_id')
print(merged)
print()

# Index-based merge
print("=== INDEX-BASED MERGE ===")
df1 = pd.DataFrame({'value': [10, 20, 30]}, index=['a', 'b', 'c'])
df2 = pd.DataFrame({'score': [100, 200]}, index=['b', 'c'])
result = pd.merge(df1, df2, left_index=True, right_index=True, how='left')
print(result)
print()

# Concat rows
print("=== CONCAT ROWS ===")
q1 = pd.DataFrame({'product': ['A', 'B'], 'sales': [100, 200]})
q2 = pd.DataFrame({'product': ['A', 'B'], 'sales': [110, 210]})
combined = pd.concat([q1, q2], ignore_index=True)
print(combined)
```

**Output:**
```
=== MERGE WITH DIFFERENT KEY NAMES ===
   order_id  cust_id  amount  customer_id   name
0         1      101     250          101  Alice
1         4      101     400          101  Alice
2         2      102     150          102    Bob
3         3      103     300          103 Charlie

=== INDEX-BASED MERGE ===
   value  score
a     10    NaN
b     20  100.0
c     30  200.0

=== CONCAT ROWS ===
  product  sales
0       A    100
1       B    200
2       A    110
3       B    210
```

**Explanation:**
`left_on='cust_id'` and `right_on='customer_id'` join on differently-named columns. Both key columns appear in the result. Index-based merge (`left_index=True, right_index=True`) joins on row labels. `pd.concat([q1, q2])` stacks rows vertically; `ignore_index=True` resets the index to a default RangeIndex.

## 🏢 Real World Use Case
**E-commerce Data Pipeline:** Orders (from transactions DB) are merged with customer profiles (from CRM) via `left_on='customer_id', right_on='id'`. Product details are joined on `product_sku`. Monthly sales DataFrames are concatenated with `pd.concat()` for time-series analysis. An index-based join maps daily dates from a calendar table to ensure no gaps in the time series.

## 🎯 Interview Questions

**Q1: What are the four main types of joins in `pd.merge()`?**
A: `inner` (only matching), `left` (all left rows), `right` (all right rows), `outer` (all rows from both).

**Q2: How do you merge on columns with different names?**
A: Use `left_on='col_in_left'` and `right_on='col_in_right'`.

**Q3: What does `pd.concat([df1, df2], axis=1)` do?**
A: It combines DataFrames side-by-side (column-wise), aligning by index labels. Rows with non-matching indices get NaN.

**Q4: How does `df.join()` differ from `pd.merge()`?**
A: `df.join()` is called on a DataFrame and joins another DataFrame on its index (by default). It's a convenience wrapper around `pd.merge()` with index-based join.

**Q5: What happens when merge keys have duplicates?**
A: Duplicate keys produce a Cartesian product — every matching pair is combined, potentially increasing the number of rows significantly.

## ⚠ Common Errors / Mistakes
- **Not specifying `how`** — defaults to `inner`, which silently drops unmatched rows.
- **Forgetting `suffixes`** when columns overlap — results in `'_x'` and `'_y'` appended, which may be confusing.
- **Merging on object columns with inconsistent casing** — "Alice" ≠ "alice". Clean keys first.
- **Using `pd.concat()` on DataFrames with different column names** — results in many NaN columns.
- **Not resetting index before concat** — duplicate index values cause issues. Use `ignore_index=True`.

## 📝 Practice Exercises

**Beginner:**
1. Create two DataFrames with a common `id` column and perform an inner merge.
2. Perform a left join between an orders table and a customers table, explain the NaN rows.
3. Use `pd.concat()` to combine three DataFrames with the same columns into one.

**Intermediate:**
4. Merge two DataFrames where the key column has different names in each, using `left_on` and `right_on`. Drop the duplicate key column after merge.
5. Use `df.join()` to join two DataFrames by their indices. Compare the result with `pd.merge(left_index=True, right_index=True)`.
6. Create a scenario where merge keys have duplicates and observe the Cartesian product behavior.

**Advanced:**
7. Simulate a multi-table relational database with 4 tables (customers, orders, products, order_items). Write queries using `pd.merge()` that would correspond to SQL joins: get all customers with their total spending.
8. Write a function that takes a list of DataFrames and a merge specification (how, on, etc.) and performs a sequential merge (like `reduce`). Compare its output and performance to chaining merge calls manually.
