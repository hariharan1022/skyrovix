## 6. Pandas Analyzing Data
## 📘 Introduction
Once data is loaded into a DataFrame, the next step is exploratory data analysis (EDA). Pandas provides a comprehensive suite of methods to understand data structure, distributions, uniqueness, duplicates, and relationships between columns. This module covers the most essential analysis tools used in every data science workflow.

## 🧠 Key Concepts
- **head()/tail()**: Preview first/last n rows.
- **info()**: Memory usage, column dtypes, non-null counts.
- **describe()**: Statistical summary for numeric columns.
- **shape**: (row count, column count).
- **dtypes**: Data type of each column.
- **value_counts()**: Frequency table for categorical data (with `normalize`, `bins`).
- **unique()/nunique()**: Distinct values / count of distinct values.
- **duplicated()/drop_duplicates()**: Detect and remove duplicate rows.
- **corr()**: Correlation matrix between numeric columns.
- **Summary statistics**: `mean()`, `median()`, `std()`, `min()`, `max()`, `quantile()`.

## 💻 Syntax

```python
import pandas as pd

df = pd.read_csv('dataset.csv')

# Quick previews
df.head(10)
df.tail(3)

# Metadata
df.info()
df.shape
df.dtypes
df.columns.tolist()

# Statistics
df.describe()
df.describe(include='object')
df['col'].value_counts()
df['col'].value_counts(normalize=True)
df['col'].value_counts(bins=5)
df['col'].unique()
df['col'].nunique()

# Duplicates
df.duplicated().sum()
df[df.duplicated()]
df.drop_duplicates(inplace=True)

# Correlation
df.corr()                        # Pearson (default)
df.corr(method='spearman')
```

## ✅ Example 1 - Basic
**Problem:** Load a dataset and perform a comprehensive initial analysis.

```python
import pandas as pd

url = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
df = pd.read_csv(url)

print("=== SHAPE ===")
print(df.shape)
print()

print("=== FIRST 3 ROWS ===")
print(df.head(3))
print()

print("=== INFO ===")
df.info()
print()

print("=== DESCRIBE ===")
print(df.describe())
print()

print("=== DTYPES ===")
print(df.dtypes)
```

**Output:**
```
=== SHAPE ===
(891, 12)

=== FIRST 3 ROWS ===
   PassengerId  Survived  Pclass  ...     Fare Cabin  Embarked
0            1         0       3  ...   7.2500   NaN         S
1            2         1       1  ...  71.2833   C85         C
2            3         1       3  ...   7.9250   NaN         S

[3 rows x 12 columns]

=== INFO ===
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 891 entries, 0 to 890
Data columns (total 12 columns):
 #   Column       Non-Null Count  Dtype
---  ------       --------------  -----
 0   PassengerId  891 non-null    int64
 1   Survived     891 non-null    int64
 2   Pclass       891 non-null    int64
 3   Name         891 non-null    object
 4   Sex          891 non-null    object
 5   Age          714 non-null    float64
 6   SibSp        891 non-null    int64
 7   Parch        891 non-null    int64
 8   Ticket       891 non-null    object
 9   Fare         891 non-null    float64
10   Cabin        204 non-null    object
11   Embarked     889 non-null    object
dtypes: float64(2), int64(5), object(5)
memory usage: 83.7+ KB

=== DESCRIBE ===
       PassengerId    Survived      Pclass  ...       Fare
count   891.000000  891.000000  891.000000  ...  891.00000
mean    446.000000    0.383838    2.308642  ...   32.20421
std     257.353842    0.486592    0.836071  ...   49.69343
min       1.000000    0.000000    1.000000  ...    0.00000
25%     223.500000    0.000000    2.000000  ...    7.91040
50%     446.000000    0.000000    3.000000  ...   14.45420
75%     668.500000    1.000000    3.000000  ...   31.00000
max     891.000000    1.000000    1.000000  ...  512.32920

[8 rows x 8 columns]

=== DTYPES ===
PassengerId      int64
Survived         int64
Pclass           int64
Name            object
Sex             object
Age            float64
SibSp            int64
Parch            int64
Ticket          object
Fare           float64
Cabin           object
Embarked        object
dtype: object
```

**Explanation:**
`shape` tells us 891 rows × 12 columns. `info()` shows which columns have missing values (Age: 714 non-null → 177 missing; Cabin: only 204 non-null). `describe()` gives statistical summaries — only 38% survived (mean of Survived). `dtypes` shows 5 object columns (strings), 5 int64, and 2 float64.

## 🚀 Example 2 - Intermediate
**Problem:** Analyze categorical data, detect duplicates, and compute correlations.

```python
import pandas as pd

df = pd.read_csv('https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv')

# Value counts for categorical
print("=== EMBARKED VALUE COUNTS ===")
print(df['Embarked'].value_counts())
print()

print("=== EMBARKED PROPORTIONS ===")
print(df['Embarked'].value_counts(normalize=True) * 100)
print()

# Unique values
print("=== UNIQUE ===")
print("Unique Pclass values:", df['Pclass'].unique())
print("Number of unique tickets:", df['Ticket'].nunique())
print()

# Duplicates
print("=== DUPLICATES ===")
print("Duplicate rows:", df.duplicated().sum())
print()

# Correlation matrix
print("=== CORRELATION MATRIX ===")
print(df[['Age', 'Fare', 'Survived', 'Pclass']].corr())
```

**Output:**
```
=== EMBARKED VALUE COUNTS ===
S    644
C    168
Q     77
Name: Embarked, dtype: int64

=== EMBARKED PROPORTIONS ===
S    72.44
C    18.90
Q     8.66
Name: Embarked, dtype: float64

=== UNIQUE ===
Unique Pclass values: [3 1 2]
Number of unique tickets: 681

=== DUPLICATES ===
Duplicate rows: 0

=== CORRELATION MATRIX ===
              Age      Fare  Survived    Pclass
Age       1.00000  0.09607  -0.07722  0.36912
Fare      0.09607  1.00000   0.25731 -0.54950
Survived -0.07722  0.25731   1.00000 -0.33848
Pclass    0.36912 -0.54950  -0.33848  1.00000
```

**Explanation:**
`value_counts()` reveals most passengers embarked at Southampton (S). With `normalize=True`, we get percentages. `unique()` and `nunique()` show distinct values and count. No duplicate rows exist. The correlation matrix shows that `Survived` is positively correlated with `Fare` (0.26) and negatively with `Pclass` (-0.34) — higher class (lower number) correlates with higher survival.

## 🏢 Real World Use Case
**Customer Churn Analysis:** A telecom company loads customer data and runs `info()` to find missing values in `Churn` and `MonthlyCharges`. They use `describe()` to understand spending distribution, `value_counts()` on `Contract` type to see customer distribution, `duplicated().sum()` to check for duplicate customer IDs, and `corr()` between `Tenure`, `MonthlyCharges`, and `Churn` to identify churn drivers.

## 🎯 Interview Questions

**Q1: What is the difference between `unique()` and `nunique()`?**
A: `unique()` returns an array of distinct values. `nunique()` returns the integer count of distinct values (excluding NaN by default).

**Q2: How does `value_counts()` differ from `describe(include='object')`?**
A: `value_counts()` returns the frequency of each unique value. `describe(include='object')` returns count, unique, top, and freq — a condensed summary.

**Q3: What does `df.corr()` compute by default?**
A: It computes the Pearson correlation coefficient pairwise for all numeric columns, ranging from -1 (perfect negative) to +1 (perfect positive).

**Q4: How can you check for duplicate rows in a DataFrame?**
A: `df.duplicated()` returns a boolean Series. `df.duplicated().sum()` gives the count. `df[df.duplicated()]` shows the duplicates.

**Q5: What information does `df.info()` provide?**
A: It provides: index dtype, column names, non-null counts per column, column dtypes, and total memory usage.

## ⚠ Common Errors / Mistakes
- **Forgetting that `describe()` only includes numeric columns by default** — use `include='object'` for categoricals.
- **Assuming `value_counts()` returns sorted alphabetically** — it returns sorted by frequency (descending).
- **Confusing `unique()` (array) with `nunique()` (int)**.
- **Not checking `duplicated()` before analysis** — duplicates skew statistics.
- **Misinterpreting correlation**: Correlation ≠ causation; high correlation may be spurious.

## 📝 Practice Exercises

**Beginner:**
1. Load the Iris dataset (`pd.read_csv(url)`) and print its shape, info, and describe.
2. For a DataFrame of 10 rows, find and count duplicate rows.
3. Use `value_counts(normalize=True)` on a categorical column to show proportions.

**Intermediate:**
4. Load the Titanic dataset, compute the survival rate (`Survived` mean) grouped by `Sex` and `Pclass`.
5. Find the top 5 most common values in the `Cabin` column (hint: extract first letter first).
6. Compute the correlation of `Fare` and `Age` for each passenger class separately.

**Advanced:**
7. Build an automated EDA function that takes a DataFrame and returns: shape, column list with dtypes, missing values percentage per column, unique counts, and correlation matrix — all in a single report.
8. Use `value_counts(bins=5)` on a numeric column, then analyze how the binned distribution relates to a target variable using cross-tabulation (`pd.crosstab()`).
