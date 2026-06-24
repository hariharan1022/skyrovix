## 5. Pandas Read CSV
## 📘 Introduction
CSV (Comma-Separated Values) is the most common data exchange format. Pandas' `pd.read_csv()` is a highly flexible function with dozens of parameters to handle real-world messy CSV files. This module covers the most important parameters for controlling parsing, handling missing values, managing large files, and dealing with encoding issues.

## 🧠 Key Concepts
- **sep/delimiter**: Character used to separate fields (default is `,`).
- **header**: Row number(s) to use as column names (default is 0). Set `header=None` for no header.
- **names**: Custom column names to assign (used with `header=0` or `header=None`).
- **index_col**: Column(s) to use as the row index.
- **usecols**: Columns to load (by position or name) — reduces memory.
- **dtype**: Dict of column → type to avoid type inference issues.
- **parse_dates**: Convert specified columns to datetime.
- **na_values**: Additional strings to recognize as NaN.
- **skiprows**: Rows to skip at the start.
- **nrows**: Number of rows to read (useful for testing).
- **encoding**: File encoding (e.g., `'utf-8'`, `'latin1'`, `'cp1252'`).
- **chunksize**: Read file in chunks (returns an iterator) for large files.

## 💻 Syntax

```python
import pandas as pd

# Basic
df = pd.read_csv('file.csv')

# Common parameters
df = pd.read_csv(
    'file.csv',
    sep=',',                    # delimiter
    header=0,                   # row 0 as column names
    names=['col1', 'col2'],     # custom column names
    index_col='id',             # set 'id' as row index
    usecols=['name', 'age'],    # only load these columns
    dtype={'age': int},         # force data types
    parse_dates=['date'],       # parse date column
    na_values=['NA', 'NULL'],   # treat as NaN
    skiprows=2,                 # skip first 2 rows
    nrows=1000,                 # read only 1000 rows
    encoding='utf-8',           # file encoding
    chunksize=10000             # for large files
)

# Reading in chunks
chunks = pd.read_csv('large_file.csv', chunksize=50000)
for chunk in chunks:
    process(chunk)
```

## ✅ Example 1 - Basic
**Problem:** Load a simple CSV and use key parameters to control parsing.

```python
import pandas as pd
from io import StringIO

# Simulate a CSV file
csv_data = StringIO("""
ID,Name,Age,Salary,HireDate
1,Alice,30,70000,2020-01-15
2,Bob,,80000,2019-03-20
3,Charlie,35,,2021-06-01
4,Diana,28,75000,2022-11-10
""")

df = pd.read_csv(csv_data, na_values=[''], parse_dates=['HireDate'])
print("Loaded DataFrame:")
print(df)
print("\nDtypes:")
print(df.dtypes)
print("\nIndex:", df.index)
```

**Output:**
```
Loaded DataFrame:
   ID     Name   Age   Salary   HireDate
0   1    Alice  30.0  70000.0 2020-01-15
1   2      Bob   NaN  80000.0 2019-03-20
2   3  Charlie  35.0      NaN 2021-06-01
3   4    Diana  28.0  75000.0 2022-11-10

Dtypes:
ID                  int64
Name               object
Age               float64
Salary            float64
HireDate    datetime64[ns]
dtype: object

Index: RangeIndex(start=0, stop=4, step=1)
```

**Explanation:**
Empty strings were converted to NaN via `na_values=['']`. `parse_dates=['HireDate']` converted the date column to `datetime64[ns]`. Note that `Age` and `Salary` became float because NaN forced the column to be float (int cannot hold NaN in pandas).

## 🚀 Example 2 - Intermediate
**Problem:** Load a CSV with custom settings — skip rows, use specific columns, set index, and handle large file with chunks.

```python
import pandas as pd
from io import StringIO

# Simulate CSV with header rows to skip
csv_data = StringIO("""
Company Report - Q3 2024
Generated: 2024-09-30
================================
emp_id,full_name,dept,salary,start_date
E001,Alice Johnson,Engineering,95000,2020-06-15
E002,Bob Smith,Marketing,72000,2019-08-01
E003,Charlie Brown,Engineering,88000,2021-03-10
E004,Diana Ross,Finance,91000,2020-11-20
E005,Eve Williams,Marketing,68000,2022-01-05
""")

# Skip metadata rows, use specific columns, set index
df = pd.read_csv(
    csv_data,
    skiprows=3,
    usecols=['emp_id', 'full_name', 'dept', 'salary'],
    index_col='emp_id',
    dtype={'salary': float}
)
print("Cleaned DataFrame:")
print(df)
print()

# Simulate chunked reading
csv_data.seek(0)
chunks = pd.read_csv(csv_data, skiprows=3, chunksize=2)
print("Processing in chunks:")
for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}:")
    print(chunk)
    print()
```

**Output:**
```
Cleaned DataFrame:
              full_name         dept   salary
emp_id
E001      Alice Johnson  Engineering  95000.0
E002         Bob Smith     Marketing  72000.0
E003     Charlie Brown  Engineering  88000.0
E004        Diana Ross      Finance  91000.0
E005      Eve Williams     Marketing  68000.0

Processing in chunks:
Chunk 1:
  emp_id       full_name         dept  salary
0   E001  Alice Johnson  Engineering   95000
1   E002     Bob Smith     Marketing   72000

Chunk 2:
  emp_id       full_name         dept  salary
0   E003  Charlie Brown  Engineering   88000
1   E004     Diana Ross      Finance   91000

Chunk 3:
  emp_id       full_name         dept  salary
0   E005   Eve Williams     Marketing   68000
```

**Explanation:**
`skiprows=3` ignored the first 3 metadata lines. `usecols` loaded only 4 of the 5 columns, reducing memory. `index_col='emp_id'` set a meaningful row index. Chunked reading processed 2 rows at a time — essential for datasets too large to fit in memory.

## 🏢 Real World Use Case
**Monthly Sales Data Ingestion:** A data engineer processes daily CSV exports from multiple regional stores totalling 10 GB. Using `pd.read_csv()` with `dtype` to force types (preventing memory bloat), `usecols` to select only relevant columns, `parse_dates` for date columns, and `chunksize=100000` to stream the file in manageable pieces. Each chunk is validated, cleaned, and appended to a database.

## 🎯 Interview Questions

**Q1: How do you handle CSV files that don't have a header row?**
A: Use `header=None` and optionally provide column names via `names=['col1', 'col2', ...]`.

**Q2: What does the `na_values` parameter do?**
A: It specifies additional strings (beyond the defaults like empty string, `#N/A`, `NaN`) that should be treated as NaN values when parsing.

**Q3: How can you read only specific columns from a large CSV?**
A: Pass `usecols=['col1', 'col3']` (by name) or `usecols=[0, 2]` (by position) to load only those columns.

**Q4: What is the purpose of `chunksize` in `read_csv()`?**
A: It returns an iterator of DataFrames, each with `chunksize` rows. This allows processing files larger than RAM by handling one chunk at a time.

**Q5: How do you handle different encodings in CSV files?**
A: Use the `encoding` parameter, e.g., `encoding='utf-8'`, `encoding='latin1'`, or `encoding='cp1252'`. Common errors are `UnicodeDecodeError` which indicates wrong encoding.

## ⚠ Common Errors / Mistakes
- **Wrong separator**: `pd.read_csv('file.tsv')` without `sep='\t'` produces a single-column mess.
- **Ignoring encoding**: `UnicodeDecodeError` when reading non-UTF8 files — always specify `encoding`.
- **Overlooking `dtype` causing memory blow-up**: Numeric columns with NaN become float or object.
- **`header` confusion**: If the file has no header and you don't set `header=None`, the first data row becomes column names.
- **Not handling quotes properly**: Fields with commas inside quotes are handled by default, but custom quote characters may need `quotechar`.

## 📝 Practice Exercises

**Beginner:**
1. Read a CSV file with `pd.read_csv()` and print its shape, columns, and first 5 rows.
2. Load a CSV without a header, assign column names `['A', 'B', 'C', 'D']`, and display the result.
3. Read only columns 1 and 3 from a CSV and display the resulting DataFrame.

**Intermediate:**
4. Load a CSV with mixed date formats, use `parse_dates` and `dayfirst=True` to handle European date format (DD/MM/YYYY).
5. Read a CSV with `skiprows=2` and `skipfooter=2` (use `engine='python'`) to skip header and footer metadata.
6. Use `chunksize` to read a large CSV in chunks, compute the mean of a numeric column per chunk, and combine the means.

**Advanced:**
7. Write a function that reads a CSV with unknown encoding by trying `['utf-8', 'latin1', 'cp1252', 'iso-8859-1']` in sequence until one works, and reports which encoding succeeded.
8. Process a 100 MB+ CSV using chunked reading with a custom processing pipeline: filter rows, aggregate by date, and write results incrementally to a Parquet file — never loading the full dataset into memory.
