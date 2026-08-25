## 1. Pandas Introduction
## 📘 Introduction
Pandas is a powerful open-source Python library used for data manipulation and analysis. It provides easy-to-use data structures like **Series** (1D) and **DataFrame** (2D) and tools for reading/writing data from various file formats (CSV, Excel, JSON, SQL, etc.). Created by Wes McKinney in 2008, pandas is built on top of NumPy and is a cornerstone of the Python data science ecosystem.

A **Series** is a one-dimensional labeled array capable of holding any data type. A **DataFrame** is a two-dimensional labeled data structure with columns that can be different types — think of it as a spreadsheet or SQL table.

## 🧠 Key Concepts
- **Series**: 1D labeled array, similar to a dictionary or list with an index.
- **DataFrame**: 2D labeled data structure, like a spreadsheet with rows and columns.
- **Index**: Row labels that provide meaningful access to data.
- **Import convention**: `import pandas as pd`
- **Reading data**: Functions like `pd.read_csv()`, `pd.read_excel()`, `pd.read_json()` load external data.
- **DataFrame creation**: From Python dict, list of lists, NumPy arrays, or from files.
- **Inspecting data**: `head()`, `tail()`, `info()`, `describe()` give quick overviews.

## 💻 Syntax

```python
import pandas as pd

# Create DataFrame from dictionary
data = {'Name': ['Alice', 'Bob', 'Charlie'],
        'Age': [25, 30, 35],
        'Salary': [50000, 60000, 70000]}
df = pd.DataFrame(data)

# Read from files
df_csv = pd.read_csv('file.csv')
df_excel = pd.read_excel('file.xlsx', sheet_name='Sheet1')
df_json = pd.read_json('file.json')

# Inspect data
df.head()       # First 5 rows
df.tail(3)      # Last 3 rows
df.info()       # Summary: columns, dtypes, non-null counts
df.describe()   # Statistical summary for numeric columns
```

## ✅ Example 1 - Basic
**Problem:** Create a DataFrame from a dictionary and inspect it.

```python
import pandas as pd

data = {
    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor'],
    'Price': [800, 25, 45, 200],
    'Quantity': [10, 150, 80, 30]
}
df = pd.DataFrame(data)
print("DataFrame:")
print(df)
print("\nFirst 2 rows:")
print(df.head(2))
print("\nDataFrame Info:")
df.info()
```

**Output:**
```
DataFrame:
    Product  Price  Quantity
0    Laptop    800        10
1     Mouse     25       150
2  Keyboard     45        80
3   Monitor    200        30

First 2 rows:
   Product  Price  Quantity
0   Laptop    800        10
1    Mouse     25       150

DataFrame Info:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 4 entries, 0 to 3
Data columns (total 3 columns):
 #   Column    Non-Null Count  Dtype
---  ------    --------------  -----
 0   Product   4 non-null      object
 1   Price     4 non-null      int64
 2   Quantity  4 non-null      int64
dtypes: int64(2), object(1)
memory usage: 224.0+ bytes
```

**Explanation:**
We built a DataFrame from a dictionary where each key becomes a column. `head(2)` shows the first 2 rows. `info()` reveals column names, non-null counts, and data types — essential for understanding your dataset.

## 🚀 Example 2 - Intermediate
**Problem:** Read a CSV from a URL, inspect it, and compute a quick summary.

```python
import pandas as pd

url = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
df = pd.read_csv(url)

print("Shape:", df.shape)
print("\nFirst 5 rows:")
print(df.head())
print("\nStatistical Summary:")
print(df.describe())
print("\nInfo:")
df.info()
```

**Output:**
```
Shape: (891, 12)

First 5 rows:
   PassengerId  Survived  Pclass  ...     Fare Cabin  Embarked
0            1         0       3  ...   7.2500   NaN         S
1            2         1       1  ...  71.2833   C85         C
2            3         1       3  ...   7.9250   NaN         S
3            4         1       1  ...  53.1000  C123         S
4            5         0       3  ...   8.0500   NaN         S

[5 rows x 12 columns]

Statistical Summary:
       PassengerId    Survived      Pclass  ...       Fare
count   891.000000  891.000000  891.000000  ...  891.00000
mean    446.000000    0.383838    2.308642  ...   32.20421
std     257.353842    0.486592    0.836071  ...   49.69343
min       1.000000    0.000000    1.000000  ...    0.00000
25%     223.500000    0.000000    2.000000  ...    7.91040
50%     446.000000    0.000000    3.000000  ...   14.45420
75%     668.500000    1.000000    3.000000  ...   31.00000
max     891.000000    1.000000    3.000000  ...  512.32920

[8 rows x 8 columns]
```

**Explanation:**
We loaded the Titanic dataset directly from GitHub. `.shape` returned (891, 12) meaning 891 rows and 12 columns. `.describe()` automatically computed count, mean, std, min, quartiles, and max for numeric columns — giving us a statistical overview of ticket fares, ages, and survival rates.

## 🏢 Real World Use Case
**Sales Data Analysis Pipeline:** A retail company receives daily CSV exports of sales transactions. Using pandas, an analyst reads the CSV with `pd.read_csv()`, checks the data shape with `.shape`, reviews column types with `.info()`, and generates statistical summaries with `.describe()` to detect anomalies (e.g., negative prices, missing values) before building dashboards or feeding the data into ML models.

## 🎯 Interview Questions

**Q1: What is the difference between a Series and a DataFrame in pandas?**
A: A Series is a 1D labeled array holding data of a single type (like a column). A DataFrame is a 2D labeled structure with multiple columns, each potentially of a different type.

**Q2: How do you import pandas and what is the conventional alias?**
A: By convention, pandas is imported as `import pandas as pd`. This shorthand is standard across the data science community.

**Q3: What does `df.info()` show?**
A: It displays the DataFrame index dtype, column names, number of non-null entries per column, column dtypes, and memory usage.

**Q4: Explain the output of `df.describe()`.**
A: It generates descriptive statistics for numeric columns including count, mean, standard deviation, minimum, 25th/50th/75th percentiles, and maximum.

**Q5: How can you read a JSON file into a DataFrame?**
A: Use `pd.read_json('file.json')`. For nested JSON, you may need `pd.json_normalize()` to flatten the structure.

## ⚠ Common Errors / Mistakes
- **Forgetting `import pandas as pd`** before using pandas functions.
- **Reading a file with the wrong separator**: `pd.read_csv('file.tsv')` without `sep='\t'` results in a single-column DataFrame.
- **Assuming `head()` shows exact data**: It shows only the first 5 rows; the dataset may have issues deeper in.
- **Overlooking dtype inference**: Pandas infers types; sometimes numeric columns are read as strings if they contain mixed data (e.g., commas in numbers).
- **Not checking `shape`** after loading — you might be missing rows due to encoding or parsing errors.

## 📝 Practice Exercises

**Beginner:**
1. Create a dictionary with keys 'City', 'Population', 'Area' and build a DataFrame from it. Print `head()` and `info()`.
2. Load any CSV file using `pd.read_csv()` and print the column names and shape.
3. Use `.describe()` on a DataFrame with at least 4 numeric columns and interpret the output.

**Intermediate:**
4. Read the Titanic dataset from URL, use `info()` to identify which columns have missing values, and count them.
5. Create a DataFrame from a list of lists with column names passed separately via the `columns` parameter.
6. Read a JSON file containing nested records and use `pd.json_normalize()` to flatten it into a DataFrame.

**Advanced:**
7. Write a function that reads a CSV, reports its shape, column dtypes, missing values per column, and returns a cleaned DataFrame with proper dtypes — all in one pipeline.
8. Compare `pd.read_csv()` with `pd.read_excel()` for a dataset available in both formats; measure read time using `time.perf_counter()` and report differences.
