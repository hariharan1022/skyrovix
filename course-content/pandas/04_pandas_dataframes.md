## 4. Pandas DataFrames
## 📘 Introduction
A **DataFrame** is a 2D labeled data structure with columns of potentially different types — the primary pandas object for storing and manipulating tabular data. It is similar to a spreadsheet or SQL table. This module covers creation from multiple sources, row/column access and assignment, renaming, transposing, and multi-index (hierarchical) DataFrames.

## 🧠 Key Concepts
- **2D labeled structure**: Rows and columns with labels.
- **Creation**: From dict of lists, list of dicts, list of lists, NumPy arrays, CSV files.
- **Row/Column access**: `df['col']`, `df[['col1', 'col2']]`, `df.loc[row_label]`, `df.iloc[row_pos]`.
- **Adding columns**: `df['new_col'] = values` or `df.insert()`.
- **Adding rows**: `df.loc[len(df)] = values` or `pd.concat()`.
- **Renaming**: `df.rename(columns={'old': 'new'})`.
- **Transpose (`.T`)**: Swaps rows and columns.
- **Multi-index**: Hierarchical index on rows or columns using `pd.MultiIndex`.

## 💻 Syntax

```python
import pandas as pd
import numpy as np

# From dict of lists
df = pd.DataFrame({'Name': ['A', 'B'], 'Age': [25, 30]})

# From list of dicts
df = pd.DataFrame([{'Name': 'A', 'Age': 25}, {'Name': 'B', 'Age': 30}])

# From 2D NumPy array
df = pd.DataFrame(np.random.rand(3, 2), columns=['X', 'Y'])

# Access rows/columns
col = df['X']
rows = df.loc[0:1]
row = df.iloc[0]

# Add column
df['Z'] = [10, 20, 30]

# Rename columns
df = df.rename(columns={'X': 'Col1'})

# Transpose
transposed = df.T

# Multi-index
arrays = [['A', 'A', 'B', 'B'], [1, 2, 1, 2]]
index = pd.MultiIndex.from_arrays(arrays, names=['letter', 'number'])
df_multi = pd.DataFrame({'value': [10, 20, 30, 40]}, index=index)
```

## ✅ Example 1 - Basic
**Problem:** Create a DataFrame from different sources and perform column/row operations.

```python
import pandas as pd
import numpy as np

# From dict of lists
data = {'Product': ['Laptop', 'Mouse', 'Keyboard'],
        'Price': [800, 25, 45],
        'Stock': [50, 200, 150]}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)
print()

# Access column as Series
print("Price column:")
print(df['Price'])
print()

# Add a computed column
df['Total Value'] = df['Price'] * df['Stock']
print("After adding Total Value:")
print(df)
print()

# Rename a column
df = df.rename(columns={'Total Value': 'InventoryValue'})
print("After renaming:")
print(df)
print()

# Transpose
print("Transposed:")
print(df.T)
```

**Output:**
```
Original DataFrame:
    Product  Price  Stock
0    Laptop    800     50
1     Mouse     25    200
2  Keyboard     45    150

Price column:
0    800
1     25
2     45
Name: Price, dtype: int64

After adding Total Value:
    Product  Price  Stock  Total Value
0    Laptop    800     50        40000
1     Mouse     25    200         5000
2  Keyboard     45    150         6750

After renaming:
    Product  Price  Stock  InventoryValue
0    Laptop    800     50           40000
1     Mouse     25    200            5000
2  Keyboard     45    150            6750

Transposed:
                    0      1         2
Product        Laptop  Mouse  Keyboard
Price             800     25        45
Stock              50    200       150
InventoryValue  40000   5000      6750
```

**Explanation:**
The DataFrame was created from a dict of lists. `df['Price']` returns a Series. A new column is added with a simple assignment using vectorized arithmetic. `rename()` with `columns=` changes column labels. `.T` swaps rows and columns — note that mixed dtypes become object after transpose.

## 🚀 Example 2 - Intermediate
**Problem:** Create a multi-index DataFrame and perform hierarchical access.

```python
import pandas as pd
import numpy as np

# Create multi-index arrays
arrays = [
    ['North', 'North', 'South', 'South', 'East', 'East'],
    ['Q1', 'Q2', 'Q1', 'Q2', 'Q1', 'Q2']
]
index = pd.MultiIndex.from_arrays(arrays, names=['Region', 'Quarter'])

data = {
    'Revenue': [100, 120, 80, 90, 110, 130],
    'Cost': [60, 70, 50, 55, 65, 75]
}
df = pd.DataFrame(data, index=index)
print("Multi-index DataFrame:")
print(df)
print()

# Access outer index level
print("North region:")
print(df.loc['North'])
print()

# Access inner level with tuple
print("North Q1:")
print(df.loc[('North', 'Q1')])
print()

# Cross-section with xs
print("All Q1 data across regions:")
print(df.xs('Q1', level='Quarter'))
```

**Output:**
```
Multi-index DataFrame:
                 Revenue  Cost
Region Quarter
North  Q1           100    60
       Q2           120    70
South  Q1            80    50
       Q2            90    55
East   Q1           110    65
       Q2           130    75

North region:
         Revenue  Cost
Quarter
Q1           100    60
Q2           120    70

North Q1:
Revenue    100
Cost        60
Name: (North, Q1), dtype: int64

All Q1 data across regions:
        Revenue  Cost
Region
North      100    60
South       80    50
East       110    65
```

**Explanation:**
`pd.MultiIndex.from_arrays()` creates a hierarchical row index. `df.loc['North']` returns a sub-DataFrame for that outer level. `df.loc[('North', 'Q1')]` accesses a specific row with a tuple. `df.xs('Q1', level='Quarter')` slices across all outer groups at the specified inner level.

## 🏢 Real World Use Case
**Retail Chain Performance Dashboard:** A national retailer stores sales data with a multi-index `(Store_Region, Store_ID, Month)`. Analysts use `.xs()` to compare Q4 performance across all regions, add calculated columns like `Profit = Revenue - Cost`, rename columns for reporting, and transpose for certain visualization formats.

## 🎯 Interview Questions

**Q1: What are the different ways to create a DataFrame?**
A: From dict of lists, list of dicts, list of lists (with `columns` param), NumPy arrays, CSV/Excel/JSON files, and other DataFrames via copy or concat.

**Q2: How do you rename a column in a DataFrame?**
A: Use `df.rename(columns={'old_name': 'new_name'}, inplace=True)` or reassign with `df = df.rename(columns={'old_name': 'new_name'})`.

**Q3: What does `.T` do and when would you use it?**
A: `.T` transposes rows and columns. Used when you need to swap the orientation of data, e.g., when features should be rows and samples columns.

**Q4: How do you create a multi-index DataFrame?**
A: Use `pd.MultiIndex.from_arrays()`, `pd.MultiIndex.from_tuples()`, or `pd.MultiIndex.from_product()`, then pass it as the `index` parameter to `pd.DataFrame()`.

**Q5: What is the difference between `df['col']` and `df[['col']]`?**
A: `df['col']` returns a Series. `df[['col']]` returns a DataFrame with one column — useful when you need to preserve the DataFrame structure for method chaining.

## ⚠ Common Errors / Mistakes
- **Trying to add a row with `df.loc[new_index] = [...]`** when the index doesn't exist yet — can cause unintended behavior.
- **Modifying a slice vs a copy**: `df[['col']]` returns a copy, but chained indexing may raise `SettingWithCopyWarning`.
- **Forgetting to reassign after `rename()`** unless `inplace=True` is used.
- **Transposing DataFrames with mixed dtypes** converts everything to object.
- **Confusing `df.loc` and `df.iloc` syntax** — loc uses labels, iloc uses integer positions.

## 📝 Practice Exercises

**Beginner:**
1. Create a DataFrame from a list of lists for 5 students with columns `['Name', 'Math', 'Science', 'English']`.
2. Add a new column `'Total'` that sums Math + Science + English for each student.
3. Rename the column `'Math'` to `'Mathematics'` and print the columns.

**Intermediate:**
4. Create a DataFrame with a multi-index for `('City', 'Year')` and 3 columns. Use `.xs()` to extract all data for Year 2023.
5. From a NumPy array of shape (4, 6), create a DataFrame with column names `'A'` through `'F'` and a custom index of dates. Transpose and describe the shape change.
6. Create a DataFrame, then use `df.insert(1, 'NewCol', values)` to add a column at a specific position. Print before and after.

**Advanced:**
7. Create a multi-index DataFrame with 3 levels and 2 columns. Demonstrate access at each level using both `.loc` with tuples and `.xs()`. Write a function that extracts any level's data dynamically.
8. Build a DataFrame from 3 different sources (dict, NumPy, CSV-read). Compare memory usage using `df.memory_usage(deep=True)` and explain differences.
