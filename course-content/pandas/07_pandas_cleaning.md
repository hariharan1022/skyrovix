## 7. Pandas Data Cleaning
## 📘 Introduction
Real-world data is messy — it has missing values, duplicates, inconsistencies, outliers, and formatting issues. Data cleaning is the most time-consuming part of data science (estimates say 60-80% of time). Pandas provides powerful tools to handle missing data, remove duplicates, replace values, detect outliers, and clean string columns.

## 🧠 Key Concepts
- **Missing values**: Represented as `NaN` (Not a Number) in pandas.
- **isna()/notna()**: Detect missing/non-missing values.
- **dropna()**: Remove rows or columns with NaN.
- **fillna()**: Fill NaN with a value, method (`ffill`, `bfill`), or strategy (mean, median).
- **interpolate()**: Fill NaN using interpolation (linear, time, etc.).
- **ffill/bfill**: Forward-fill (carry previous value forward) and back-fill.
- **Duplicates**: `duplicated()` and `drop_duplicates()` with `keep` and `subset`.
- **replace()/map()**: Replace values with other values.
- **Outlier detection**: IQR method, Z-score method, or domain thresholds.
- **String cleaning**: Access via `.str` accessor — `strip()`, `lower()`, `upper()`, `replace()`, `contains()`, `split()`, `extract()`.

## 💻 Syntax

```python
import pandas as pd
import numpy as np

# Missing values
df.isna().sum()                  # count NaN per column
df.isna().mean() * 100           # percentage of NaN per column
df.dropna()                      # drop rows with any NaN
df.dropna(subset=['col'])        # drop rows with NaN in specific column
df.dropna(thresh=5)              # keep rows with at least 5 non-NaN values
df.fillna(0)                     # fill with constant
df.fillna({'col1': 0, 'col2': 'missing'})
df.fillna(method='ffill')        # forward fill
df.fillna(method='bfill')        # back fill
df['col'].fillna(df['col'].mean())  # fill with mean
df['col'].interpolate(method='linear')

# Duplicates
df.drop_duplicates()
df.drop_duplicates(subset=['col1', 'col2'], keep='first')

# Replace values
df['col'].replace({'old': 'new'})
df['col'].map({'old': 'new'}).fillna(df['col'])  # partial mapping

# String cleaning
df['col'].str.strip()
df['col'].str.lower()
df['col'].str.replace(r'\d+', '', regex=True)
df['col'].str.contains('pattern', na=False)
```

## ✅ Example 1 - Basic
**Problem:** Handle missing values in a small dataset using different strategies.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age': [25, np.nan, 35, 28, np.nan],
    'Salary': [50000, 60000, np.nan, 52000, 58000],
    'Department': ['IT', 'HR', 'IT', np.nan, 'HR']
})

print("=== ORIGINAL ===")
print(df)
print()

print("=== NaN COUNT ===")
print(df.isna().sum())
print()

# Fill with different strategies
df_cleaned = df.copy()
df_cleaned['Age'] = df['Age'].fillna(df['Age'].median())        # median for age
df_cleaned['Salary'] = df['Salary'].fillna(df['Salary'].mean())  # mean for salary
df_cleaned['Department'] = df['Department'].fillna('Unknown')    # constant

print("=== AFTER FILLING ===")
print(df_cleaned)
print()

# Forward fill for time-series-like scenario
df_ffill = df.fillna(method='ffill')
print("=== FORWARD FILL ===")
print(df_ffill)
```

**Output:**
```
=== ORIGINAL ===
     Name   Age   Salary Department
0   Alice  25.0  50000.0         IT
1     Bob   NaN  60000.0         HR
2  Charlie  35.0      NaN         IT
3   Diana  28.0  52000.0        NaN
4     Eve   NaN  58000.0         HR

=== NaN COUNT ===
Name          0
Age           2
Salary        1
Department    1
dtype: int64

=== AFTER FILLING ===
     Name   Age   Salary Department
0   Alice  25.0  50000.0         IT
1     Bob  28.0  60000.0         HR
2  Charlie  35.0  55000.0         IT
3   Diana  28.0  52000.0    Unknown
4     Eve  28.0  58000.0         HR

=== FORWARD FILL ===
     Name   Age   Salary Department
0   Alice  25.0  50000.0         IT
1     Bob  25.0  60000.0         HR
2  Charlie  35.0  60000.0         HR
3   Diana  28.0  52000.0         HR
4     Eve  28.0  58000.0         HR
```

**Explanation:**
`isna().sum()` reveals 4 NaN values. We used three strategies: `median()` for Age (robust to outliers), `mean()` for Salary, and a constant `'Unknown'` for Department. Forward fill (`ffill`) carries the last valid observation forward — useful for time-series where missing values should take the previous value.

## 🚀 Example 2 - Intermediate
**Problem:** Clean dataset with duplicates, outliers, and messy strings.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Product': ['  Laptop ', 'Laptop', ' MOUSE ', ' Mouse ', 'Keyboard', 'Keyboard'],
    'Price': [800, 800, 25, 25, 45, 45],
    'Quantity': [10, 10, 200, 200, 150, 150],
    'Rating': [4.5, 4.5, 3.2, 3.2, -1, 5.5]  # -1 is invalid, 5.5 is outlier
})

print("=== ORIGINAL ===")
print(df)
print()

# Remove duplicates
df = df.drop_duplicates().reset_index(drop=True)
print("=== AFTER DEDUP ===")
print(df)
print()

# Clean strings
df['Product'] = df['Product'].str.strip().str.title()
print("=== AFTER STRING CLEAN ===")
print(df)
print()

# Handle outliers in Rating
df = df[(df['Rating'] >= 1) & (df['Rating'] <= 5)]
print("=== AFTER OUTLIER REMOVAL ===")
print(df)
```

**Output:**
```
=== ORIGINAL ===
       Product  Price  Quantity  Rating
0    Laptop      800        10     4.5
1       Laptop   800        10     4.5
2     MOUSE       25       200     3.2
3      Mouse     25       200     3.2
4    Keyboard     45       150    -1.0
5    Keyboard     45       150     5.5

=== AFTER DEDUP ===
    Product  Price  Quantity  Rating
0   Laptop      800        10     4.5
1    MOUSE       25       200     3.2
2     Mouse      25       200     3.2
3  Keyboard      45       150    -1.0
4  Keyboard      45       150     5.5

=== AFTER STRING CLEAN ===
    Product  Price  Quantity  Rating
0   Laptop    800        10     4.5
1   Mouse      25       200     3.2
2   Mouse      25       200     3.2
3  Keyboard    45       150    -1.0
4  Keyboard    45       150     5.5

=== AFTER OUTLIER REMOVAL ===
   Product  Price  Quantity  Rating
0  Laptop    800        10     4.5
1   Mouse     25       200     3.2
2   Mouse     25       200     3.2
```

**Explanation:**
`drop_duplicates()` removed exact duplicate rows. `.str.strip().str.title()` cleaned whitespace and standardized capitalization. Outliers in Rating were removed using boolean filtering: values must be between 1 and 5 (inclusive). Note that after these steps, `Mouse` still has a duplicate because the original MOUSE and Mouse were normalized to the same string — dedup should have been done after string cleaning.

## 🏢 Real World Use Case
**Customer Data Platform:** A company receives customer data from multiple sources (web forms, CSV uploads, API). Names need `.str.strip().str.title()` cleaning, emails need `.str.lower()`, missing postal codes are forward-filled from nearby records, duplicate customer IDs are dropped keeping the latest record (`keep='last'`), and salary outliers beyond 3 standard deviations are capped.

## 🎯 Interview Questions

**Q1: What is the difference between `dropna()` and `fillna()`?**
A: `dropna()` removes rows/columns containing NaN values. `fillna()` replaces NaN values with a specified constant, method, or computed value.

**Q2: How do you forward-fill missing values in a DataFrame?**
A: Use `df.fillna(method='ffill')` or `df.ffill()`. This carries the last valid observation forward.

**Q3: What does `drop_duplicates(subset=['col1'], keep='last')` do?**
A: It removes duplicate rows based only on `col1`, keeping the last occurrence of each duplicate set.

**Q4: How would you detect and handle outliers in a column?**
A: Common methods: IQR (values beyond Q1-1.5*IQR or Q3+1.5*IQR), Z-score (|Z| > 3), or domain-specific thresholds. Handle by removing, capping, or transforming.

**Q5: How do you clean whitespace from string columns in a DataFrame?**
A: Use `df['col'].str.strip()` to remove leading/trailing whitespace. For all string columns: `df.select_dtypes('object').apply(lambda x: x.str.strip())`.

## ⚠ Common Errors / Mistakes
- **Not using `inplace=True` or reassigning**: `df.dropna()` returns a new DataFrame; the original is not modified.
- **Filling with mean when data has outliers**: Mean is sensitive to outliers; median is more robust.
- **String cleaning on numeric columns**: `.str` accessor only works on object/string dtype columns.
- **Removing duplicates before standardizing strings**: "Apple " and "apple" won't be recognized as duplicates.
- **`ffill` misapplication**: Forward fill assumes order matters; don't use it on unordered data.

## 📝 Practice Exercises

**Beginner:**
1. Create a DataFrame with at least 5 missing values and fill them using the column means.
2. Drop all rows that have any NaN value and count the remaining rows.
3. Clean a column of names by stripping whitespace and converting to lowercase.

**Intermediate:**
4. Load a dataset, use `interpolate(method='linear')` to fill missing values in a numeric column, and compare the result with `fillna(method='ffill')`.
5. Find and remove all duplicate rows based on a `'customer_id'` column, keeping the row with the most recent date.
6. Use the IQR method to detect outliers in a numeric column and replace them with the median.

**Advanced:**
7. Build a data cleaning pipeline function that: strips/reformats all string columns, fills numeric NaN with median, fills categorical NaN with mode, removes full duplicates, and reports how many changes were made per step.
8. For a dataset with 30% missing values, compare 5 imputation strategies (mean, median, ffill, bfill, linear interpolate) by computing the RMSE against the original (before artificially introducing missingness).
