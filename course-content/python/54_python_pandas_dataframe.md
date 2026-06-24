## 54. Pandas DataFrame
## 📘 Introduction
The DataFrame is the central data structure in Pandas — a 2D labeled table with rows and columns, similar to a spreadsheet or SQL table. This module covers creating DataFrames, selecting columns and rows using labels and positions, filtering with boolean conditions, adding and removing columns, and handling missing data with `dropna()` and `fillna()`.

## 🧠 Key Concepts
- **Creating DataFrames**: From dicts, lists of dicts, NumPy arrays, or CSV files
- **Columns / Index**: Column labels (axis=1) and row labels (axis=0)
- **Column selection**: `df['col']` or `df.col` (single), `df[['col1', 'col2']]` (multiple)
- **Row selection**: `df.loc[label]` (label-based), `df.iloc[pos]` (position-based)
- **Boolean indexing**: `df[df['col'] > value]`
- **Adding/removing columns**: `df['new'] = ...`, `df.drop('col', axis=1)`
- **Handling missing data**: `dropna()`, `fillna(value)`, `isna()`, `notna()`

## 💻 Syntax
```python
import pandas as pd
import numpy as np

# Create DataFrame
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, np.nan],
    'Salary': [50000, 60000, 70000]
})

# Select column
print(df['Name'])        # returns Series
print(df[['Name', 'Age']]) # returns DataFrame

# Select rows
print(df.loc[0])         # label-based
print(df.iloc[0])        # position-based
print(df.iloc[0:2])      # slicing rows

# Filter
print(df[df['Age'] > 28])

# Handle missing
df_clean = df.dropna()
df_filled = df.fillna(0)
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a DataFrame from a dictionary, select specific columns, filter rows based on a condition, and add a new calculated column.

```python
import pandas as pd

data = {
    'Product': ['Laptop', 'Phone', 'Tablet', 'Monitor'],
    'Price': [1200, 800, 300, 500],
    'Quantity': [5, 10, 15, 7]
}
df = pd.DataFrame(data)

# Select single column
print("Products:\n", df['Product'])

# Select multiple columns
print("\nPrice & Quantity:\n", df[['Price', 'Quantity']])

# Filter: products with price > 500
print("\nExpensive products:\n", df[df['Price'] > 500])

# Add calculated column
df['Total'] = df['Price'] * df['Quantity']
print("\nWith Total column:\n", df)
```

**Output:**
```
Products:
 0     Laptop
1      Phone
2     Tablet
3    Monitor
Name: Product, dtype: object

Price & Quantity:
    Price  Quantity
0   1200         5
1    800        10
2    300        15
3    500         7

Expensive products:
   Product  Price  Quantity
0  Laptop   1200         5
1   Phone    800        10

With Total column:
    Product  Price  Quantity  Total
0   Laptop   1200         5   6000
1    Phone    800        10   8000
2   Tablet    300        15   4500
3  Monitor    500         7   3500
```

**Explanation:** A dictionary becomes a DataFrame with keys as columns. Single brackets `df['Product']` return a Series; double brackets `df[['Price', 'Quantity']]` return a DataFrame. Boolean filtering `df['Price'] > 500` creates a mask used to select rows. New columns are created by simple assignment.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Use loc and iloc for row selection, filter with multiple conditions, handle missing values with dropna and fillna.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'City': ['NYC', 'LA', 'Chicago', 'Houston', 'Phoenix'],
    'Temp': [75, 82, np.nan, 90, 88],
    'Humidity': [60, 45, 55, np.nan, 35],
    'Wind': [10, 15, 12, 8, np.nan]
})

print("Original:\n", df)

# loc: label-based row selection
print("\nRow at label 2:\n", df.loc[2])

# iloc: position-based row selection
print("\nFirst 2 rows (iloc):\n", df.iloc[:2])

# Multiple condition filter
filtered = df[(df['Temp'] > 80) & (df['Humidity'] < 50)]
print("\nHot & dry cities:\n", filtered)

# Drop rows with any NaN
print("\nDrop any NaN:\n", df.dropna())

# Fill NaN with column mean
df_filled = df.fillna({'Temp': df['Temp'].mean(), 'Humidity': df['Humidity'].mean(), 'Wind': df['Wind'].mean()})
print("\nFilled NaNs with column means:\n", df_filled)
```

**Output:**
```
Original:
       City  Temp  Humidity  Wind
0      NYC  75.0      60.0  10.0
1       LA  82.0      45.0  15.0
2  Chicago   NaN      55.0  12.0
3  Houston  90.0       NaN   8.0
4  Phoenix  88.0      35.0   NaN

Row at label 2:
 City        Chicago
Temp           NaN
Humidity       55.0
Wind           12.0
Name: 2, dtype: object

First 2 rows (iloc):
   City  Temp  Humidity  Wind
0  NYC  75.0      60.0  10.0
1   LA  82.0      45.0  15.0

Hot & dry cities:
    City  Temp  Humidity  Wind
1    LA  82.0      45.0  15.0
4  Phoenix  88.0      35.0  NaN

Drop any NaN:
   City  Temp  Humidity  Wind
0  NYC  75.0      60.0  10.0
1   LA  82.0      45.0  15.0

Filled NaNs with column means:
       City   Temp  Humidity   Wind
0      NYC  75.00     60.00  10.00
1       LA  82.00     45.00  15.00
2  Chicago  83.75     55.00  12.00
3  Houston  90.00     48.75   8.00
4  Phoenix  88.00     35.00  11.25
```

**Explanation:** `.loc[]` uses index labels, `.iloc[]` uses integer positions. Boolean conditions combine with `&` (not `and`). `dropna()` removes any row with at least one NaN. `fillna()` accepts a dict mapping column names to fill values — here, each column's mean fills its own missing entries.

## 🏢 Real World Use Case
A data scientist at a real estate firm cleans a property database with 10,000+ rows. They use `dropna()` to remove listings missing critical fields (price, sqft), `fillna()` to impute missing bedroom counts with the median, boolean indexing to find undervalued properties, and `.loc[]` to update specific records. Clean data pipelines like this are essential before any modeling or analysis.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between `loc` and `iloc`?**
`loc` selects rows and columns by label (`df.loc[0:2]` includes label 2). `iloc` selects by integer position (`df.iloc[0:2]` excludes position 2, like standard Python slicing).

**2. How do you drop a column from a DataFrame?**
`df.drop('column_name', axis=1, inplace=True)` or `df = df.drop('column_name', axis=1)`.

**3. What does `df[df['Age'] > 30]` do?**
It filters rows where the 'Age' column is greater than 30, returning a DataFrame with only matching rows.

**4. How is `fillna()` different from `dropna()`?**
`fillna()` replaces NaN values with a specified value or strategy (mean, median, ffill). `dropna()` removes rows or columns containing NaN entirely.

**5. How can you check which values are missing in a DataFrame?**
`df.isna()` returns a boolean DataFrame of the same shape. `df.isna().sum()` gives the count of missing values per column.

## ⚠ Common Errors / Mistakes
- **Chained indexing**: `df.loc[df['A'] > 0]['B']` can raise `SettingWithCopyWarning`. Use `df.loc[df['A'] > 0, 'B']` instead.
- **Using `and`/`or` instead of `&`/`|`**: Boolean indexing requires `&`, `|`, `~`. Python's `and`/`or` do not work element-wise on Series.
- **Forgetting axis parameter**: `df.drop('col')` drops a row by default (axis=0). Always specify `axis=1` for columns.
- **Inplace misuse**: `df.dropna(inplace=True)` modifies the original. Without `inplace`, a new DataFrame is returned. Prefer the assignment pattern `df = df.dropna()`.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a DataFrame with 4 rows: 'Item', 'Price', 'Stock'. Select the 'Item' column as a Series and as a DataFrame.
2. From the same DataFrame, select the first 2 rows using `iloc` and the row with index label 3 using `loc`.
3. Filter rows where 'Stock' is greater than 10. Print the result.

**Intermediate:**
4. Create a DataFrame with columns 'Name', 'Score', 'Grade' and at least 2 NaN values. Drop all rows with any NaN, then fill the original with the mean of 'Score'.
5. Add a new column 'Passed' that is True if 'Score' >= 50 else False. Remove the 'Grade' column.
6. Use boolean indexing with two conditions to find rows where 'Score' > 60 and 'Name' starts with 'A' (hint: use `.str.startswith()`).

**Advanced:**
7. Create a DataFrame with 10 rows and 4 columns, injecting NaN randomly in 20% of cells. Use `fillna()` with a different strategy per column: column 0 gets mean, column 1 gets median, column 2 gets forward fill, column 3 gets a constant value of -1.
8. Write code that programmatically detects columns with more than 50% missing values and drops them from the DataFrame. Test on a DataFrame where one column is 60% NaN.
