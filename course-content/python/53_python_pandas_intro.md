## 53. Pandas Tutorial
## 📘 Introduction
Pandas is a powerful Python library for data manipulation and analysis. It provides two primary data structures — Series (1D labeled array) and DataFrame (2D labeled table) — that make it easy to work with structured data, especially CSV files, Excel spreadsheets, and SQL tables. Pandas is built on top of NumPy and is a cornerstone of the Python data science ecosystem.

## 🧠 Key Concepts
- **Series**: One-dimensional labeled array capable of holding any data type
- **DataFrame**: Two-dimensional labeled data structure with columns of potentially different types
- **read_csv()**: Load tabular data from a CSV file into a DataFrame
- **head() / tail()**: Preview first/last rows of a DataFrame
- **info()**: Concise summary of a DataFrame (dtypes, non-null counts, memory usage)
- **describe()**: Summary statistics for numerical columns

## 💻 Syntax
```python
import pandas as pd

# Create Series
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])

# Create DataFrame from dict
df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})

# Read CSV
df = pd.read_csv('data.csv')

# Inspect
df.head(10)         # first 10 rows
df.tail(5)          # last 5 rows
df.info()           # column info
df.describe()       # statistics
df.shape            # (rows, cols)
df.columns          # column names
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a Series from a list with custom labels and inspect it.

```python
import pandas as pd

temps = pd.Series([28, 30, 25, 22], index=['Mon', 'Tue', 'Wed', 'Thu'])
print(temps)
print("\nType:", type(temps))
print("Values:", temps.values)
print("Index:", temps.index)
print("Mean temp:", temps.mean())
```

**Output:**
```
Mon    28
Tue    30
Wed    25
Thu    22
dtype: int64

Type: <class 'pandas.core.series.Series'>
Values: [28 30 25 22]
Index: Index(['Mon', 'Tue', 'Wed', 'Thu'], dtype='object')
Mean temp: 26.25
```

**Explanation:** A Series is like a dictionary with ordered keys (index). It supports both positional and label-based access. NumPy-style aggregation methods like `.mean()` work directly on Series objects.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Read a CSV file containing employee data and perform basic inspection.

```python
import pandas as pd

# Sample data inline (simulating read_csv)
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age': [29, 35, 28, 42, 31],
    'Salary': [70000, 85000, 65000, 95000, 72000],
    'Department': ['IT', 'HR', 'IT', 'Finance', 'HR']
}
df = pd.DataFrame(data)

print("First 3 rows:")
print(df.head(3))

print("\nDataFrame info:")
df.info()

print("\nSummary statistics:")
print(df.describe())

print("\nShape:", df.shape)
print("Columns:", list(df.columns))
```

**Output:**
```
First 3 rows:
      Name  Age  Salary Department
0    Alice   29   70000         IT
1      Bob   35   85000         HR
2  Charlie   28   65000         IT

DataFrame info:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column      Non-Null Count  Dtype
---  ------      --------------  -----
 0   Name        5 non-null      object
 1   Age         5 non-null      int64
 2   Salary      5 non-null      int64
 3   Department  5 non-null      object
dtypes: int64(2), object(2)
Memory usage: 288.0+ bytes

Summary statistics:
             Age        Salary
count   5.00000       5.00000
mean   33.00000   77400.00000
std     5.78792   12103.50712
min    28.00000   65000.00000
25%    29.00000   70000.00000
50%    31.00000   72000.00000
75%    35.00000   85000.00000
max    42.00000   95000.00000

Shape: (5, 4)
Columns: ['Name', 'Age', 'Salary', 'Department']
```

**Explanation:** `head()` shows the top rows. `info()` reveals dtypes and detects missing values (non-null counts). `describe()` provides statistical summaries for numeric columns. `shape` gives dimensions, and `columns` lists column names — essential first steps in any data analysis workflow.

## 🏢 Real World Use Case
A data analyst at an e-commerce company receives daily sales CSVs with millions of rows. They use `pd.read_csv()` to load the data, `head()` to verify correct loading, `info()` to check for missing values and correct dtypes, and `describe()` to quickly spot anomalies (e.g., negative prices, outliers in quantity). These inspection methods form the foundation of every exploratory data analysis (EDA) pipeline.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between a Series and a DataFrame in Pandas?**
A Series is a 1D labeled array (single column). A DataFrame is a 2D labeled table (multiple columns), where each column is a Series sharing a common index.

**2. How do you load a CSV file without headers?**
`pd.read_csv('file.csv', header=None)`. You can supply column names with `names=['col1', 'col2', ...]`.

**3. What does `df.info()` show?**
It shows the number of entries, column names, non-null counts, data types, and memory usage of a DataFrame.

**4. What columns does `df.describe()` summarize by default?**
Only numeric columns (int64, float64). It shows count, mean, std, min, 25%, 50%, 75%, and max.

**5. How do you change the number of rows shown by `head()`?**
Pass an integer argument: `df.head(20)` shows the first 20 rows.

## ⚠ Common Errors / Mistakes
- **File not found**: `read_csv('data.csv')` fails if the file is not in the current directory. Use absolute paths or check `os.getcwd()`.
- **Forgetting the import**: `import pandas as pd` is required. The `pd` alias is universal.
- **Confusing head() and tail()**: `head()` shows from the top, `tail()` from the bottom.
- **Missing values not shown in describe()**: `describe()` excludes NaN by default. Use `describe(include='all')` for object columns.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a Series of 5 daily temperatures with day labels (Mon–Fri). Print the Series and its mean.
2. Create a DataFrame with columns 'Product', 'Price', 'Quantity' and 4 rows of sample data. Print the first 2 rows and the shape.
3. Use `df.info()` and `df.describe()` on a DataFrame with 3 numeric columns and 1 text column.

**Intermediate:**
4. Read `sales.csv` (assume it exists) into a DataFrame. Print the first 10 rows, the column names, and the data types.
5. Given a DataFrame with 100 rows and columns 'A', 'B', 'C', use `describe()` to find which column has the highest standard deviation.
6. Create a DataFrame with 5 rows and a column 'Age' containing some missing values (use `None`). Run `info()` and note the non-null count.

**Advanced:**
7. Load a CSV file with 20 columns. Use `info()` to identify columns with missing data. Programmatically print the names of columns that have fewer non-null values than the total row count.
8. Create a DataFrame with 1000 rows of random data (use NumPy). Use `describe()` to generate statistics, then filter and display only columns where the mean is greater than 50.
