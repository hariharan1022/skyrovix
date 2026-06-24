## 2. Pandas Get Started
## 📘 Introduction
Getting started with pandas requires installing the library, understanding how to create the core data structures (Series and DataFrame), and performing basic operations. This module covers installation, creation methods, indexing, column access, and fundamental attributes that let you inspect your data structure.

## 🧠 Key Concepts
- **Installation**: Install via pip or conda.
- **pd.Series**: 1D labeled array — can be created from lists, dicts, or scalars.
- **pd.DataFrame**: 2D data structure — created from dicts, lists, NumPy arrays, or other DataFrames.
- **index parameter**: Custom row labels for both Series and DataFrames.
- **Column access**: Use `df['col']` or `df.col` (dot notation) to access a column as a Series.
- **Basic operations**: Arithmetic between Series/DataFrames aligns on index.
- **dtypes**: Attribute to view data types of each column.
- **shape**: Tuple of (rows, columns).
- **columns**: Returns an Index of column labels.

## 💻 Syntax

```python
import pandas as pd

# Create Series
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])

# Create DataFrame from dict
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})

# Create DataFrame from list of lists
df2 = pd.DataFrame([[1, 2], [3, 4]], columns=['X', 'Y'])

# Access column
col_a = df['A']
col_b = df.B  # dot notation (only if column name is valid identifier)

# Inspect attributes
print(df.dtypes)
print(df.shape)
print(df.columns)
```

## ✅ Example 1 - Basic
**Problem:** Install pandas (if needed), create a Series and a DataFrame, then inspect their attributes.

```python
# pip install pandas   (run in terminal if not installed)

import pandas as pd
import numpy as np

# Series from a list
s = pd.Series([100, 200, 300, 400])
print("Series:")
print(s)
print("Values:", s.values)
print("Index:", s.index)
print("Dtype:", s.dtype)
print()

# DataFrame from a dictionary
data = {'Name': ['Alice', 'Bob', 'Charlie'],
        'Score': [85, 92, 78]}
df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print("\nShape:", df.shape)
print("Columns:", df.columns.tolist())
print("Dtypes:")
print(df.dtypes)
```

**Output:**
```
Series:
0    100
1    200
2    300
3    400
dtype: int64
Values: [100 200 300 400]
Index: RangeIndex(start=0, stop=4, step=1)
Dtype: int64

DataFrame:
      Name  Score
0    Alice     85
1      Bob     92
2  Charlie     78

Shape: (3, 2)
Columns: ['Name', 'Score']
Dtypes:
Name     object
Score     int64
dtype: object
```

**Explanation:**
A Series created from a list gets a default integer RangeIndex. The DataFrame from a dict maps keys → columns. `.dtypes` shows that `Name` is `object` (string) and `Score` is `int64`.

## 🚀 Example 2 - Intermediate
**Problem:** Create a DataFrame with a custom index and perform column access, addition of a new column, and basic arithmetic.

```python
import pandas as pd

df = pd.DataFrame({
    'Product': ['Apple', 'Banana', 'Cherry'],
    'Price': [0.5, 0.3, 1.2],
    'Quantity': [100, 150, 75]
}, index=['P1', 'P2', 'P3'])

print("DataFrame with custom index:")
print(df)
print()

# Access column
print("Price column:")
print(df['Price'])
print()

# Add new column (computed)
df['Total'] = df['Price'] * df['Quantity']
print("With Total column:")
print(df)
print()

# Arithmetic on Series
print("Price + 0.1 (price increase):")
print(df['Price'] + 0.1)
```

**Output:**
```
DataFrame with custom index:
    Product  Price  Quantity
P1    Apple    0.5       100
P2   Banana    0.3       150
P3   Cherry    1.2        75

Price column:
P1    0.5
P2    0.3
P3    1.2
Name: Price, dtype: float64

With Total column:
    Product  Price  Quantity  Total
P1    Apple    0.5       100   50.0
P2   Banana    0.3       150   45.0
P3   Cherry    1.2        75   90.0

Price + 0.1 (price increase):
P1    0.6
P2    0.4
P3    1.3
Name: Price, dtype: float64
```

**Explanation:**
Custom row labels (`P1`, `P2`, `P3`) are set via the `index` parameter. Column access with `df['Price']` returns a Series. A new column `Total` is derived from existing columns using vectorized arithmetic. Operations on a Series (like `+ 0.1`) are applied element-wise.

## 🏢 Real World Use Case
**Inventory Management System:** A warehouse manager starts by loading inventory data from an Excel spreadsheet into a DataFrame. They inspect `.shape` to know item count, `.columns` to understand fields, and `.dtypes` to ensure prices are float and quantities are int. They add a computed `StockValue = Price * Quantity` column to compute total inventory worth.

## 🎯 Interview Questions

**Q1: How do you install pandas?**
A: `pip install pandas` or `conda install pandas`. It's recommended to install in a virtual environment.

**Q2: What is a pandas Series and how is it different from a Python list?**
A: A Series is a 1D labeled array with an index and a dtype. Unlike a list, operations align on the index and the Series supports vectorized operations and missing data.

**Q3: What does `df['col']` return vs `df[['col']]`?**
A: `df['col']` returns a Series (1D). `df[['col']]` returns a DataFrame (2D) with a single column.

**Q4: Explain the `index` parameter when creating a DataFrame.**
A: The `index` parameter sets custom row labels. If omitted, a default RangeIndex (0, 1, 2, ...) is used.

**Q5: How do you get the data types of all columns in a DataFrame?**
A: Use `df.dtypes` — it returns a Series with column names as index and dtype as values.

## ⚠ Common Errors / Mistakes
- **Using dot notation `df.col` when column name has spaces or special characters** — use `df['col name']` instead.
- **Forgetting that columns are case-sensitive**: `df['Name']` ≠ `df['name']`.
- **Assuming `shape` returns (columns, rows)** — it's always (rows, columns).
- **Not installing pandas in the active environment** — causes ModuleNotFoundError even if pandas is installed elsewhere.
- **Confusing `df['col']` (column access) with `df.loc['row']` (row access)**.

## 📝 Practice Exercises

**Beginner:**
1. Create a Series from the list `[5, 10, 15, 20]` with custom labels `a, b, c, d`. Print the Series and its dtype.
2. Create a DataFrame from a dictionary with 3 columns and 4 rows. Print its shape, columns, and dtypes.
3. Add a new column to a DataFrame that is the sum of two existing numeric columns.

**Intermediate:**
4. Create a DataFrame from a NumPy array of shape (5, 3) with column names `['A', 'B', 'C']`. Access column `'B'` and multiply it by 2.
5. Create a DataFrame with a custom index (date strings). Verify the index by printing `df.index`.
6. Compare `df['col'].dtype` with `df.dtypes['col']` — are they equivalent? Write code to test.

**Advanced:**
7. Write a script that reads the system's Python version and pandas version, creates a DataFrame from 3 different data structures (list, dict, NumPy array), and prints a comparison of their `shape` and `dtypes`.
8. Create a DataFrame with 5 columns, then programmatically rename half the columns using attribute access and the other half using bracket notation — demonstrate that both approaches work for reading but only one works for assignment.
