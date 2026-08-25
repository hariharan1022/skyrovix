## 3. Pandas Series
## 📘 Introduction
A **Series** is a one-dimensional labeled array that can hold any data type (integers, strings, floats, Python objects, etc.). It is a foundational building block of pandas — every column in a DataFrame is a Series. Series support powerful operations like label-based and integer-based indexing, boolean filtering, element-wise arithmetic, and rich method chains for data transformation.

## 🧠 Key Concepts
- **values**: NumPy array of the underlying data.
- **index**: Labels for each element (defaults to RangeIndex if not provided).
- **name**: An optional name for the Series (becomes column name when part of a DataFrame).
- **Creation**: From list, dict, NumPy array, or scalar with index.
- **loc**: Label-based indexing (uses index labels).
- **iloc**: Integer position-based indexing.
- **Slicing**: Works with both labels (inclusive) and positions (exclusive on right).
- **Arithmetic**: Operations align on index labels.
- **Boolean filtering**: `s[s > 5]` returns elements where condition is True.
- **Common methods**: `value_counts()`, `unique()`, `nunique()`, `sort_values()`, `map()`, `apply()`.

## 💻 Syntax

```python
import pandas as pd
import numpy as np

# Create Series
s1 = pd.Series([1, 2, 3])                              # default index
s2 = pd.Series([1, 2, 3], index=['a', 'b', 'c'])       # custom index
s3 = pd.Series({'a': 1, 'b': 2, 'c': 3})               # from dict
s4 = pd.Series(np.array([1, 2, 3]))                     # from NumPy array

# Indexing
s2.loc['a']        # label-based
s2.iloc[0]         # integer position-based

# Boolean filtering
s2[s2 > 1]

# Methods
s2.value_counts()   # frequency count
s2.unique()         # unique values
s2.nunique()        # count of unique values
s2.sort_values()    # sort by values
s2.map(lambda x: x * 2)   # element-wise mapping
s2.apply(np.sqrt)         # apply function
```

## ✅ Example 1 - Basic
**Problem:** Create Series from different sources, use indexing, and apply methods.

```python
import pandas as pd

# From list with custom index
s = pd.Series([10, 20, 30, 40, 50], index=['a', 'b', 'c', 'd', 'e'])
print("Series:")
print(s)
print()

# Access by label and position
print("loc['c']:", s.loc['c'])
print("iloc[2]:", s.iloc[2])
print("Slicing loc['b':'d']:")
print(s.loc['b':'d'])
print("Slicing iloc[1:4]:")
print(s.iloc[1:4])
print()

# Methods
print("Unique:", s.unique())
print("Value counts:")
print(s.value_counts())
print("Sorted:")
print(s.sort_values(ascending=False))
```

**Output:**
```
Series:
a    10
b    20
c    30
d    40
e    50
dtype: int64

loc['c']: 30
iloc[2]: 30
Slicing loc['b':'d']:
b    20
c    30
d    40
dtype: int64
Slicing iloc[1:4]:
b    20
c    30
d    40
dtype: int64

Unique: [10 20 30 40 50]
Value counts:
50    1
40    1
30    1
20    1
10    1
dtype: int64
Sorted:
e    50
d    40
c    30
b    20
a    10
dtype: int64
```

**Explanation:**
`loc` slices are **inclusive** of the end label (`'d'` included). `iloc` slices are **exclusive** on the right like standard Python (index 4 excluded). `unique()` returns distinct values; `value_counts()` returns frequency of each unique value sorted descending.

## 🚀 Example 2 - Intermediate
**Problem:** Perform boolean filtering, arithmetic, and use `map`/`apply` for transformation.

```python
import pandas as pd

s = pd.Series([15, 22, 8, 31, 12, 27], index=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])
print("Original:")
print(s)
print()

# Boolean filtering
print("Values > 20:")
print(s[s > 20])
print()

# Arithmetic
print("Each value * 2:")
print(s * 2)
print()

# map with dictionary
month_names = {'Jan': 'January', 'Feb': 'February', 'Mar': 'March',
               'Apr': 'April', 'May': 'May', 'Jun': 'June'}
print("Mapped to full names:")
print(s.map(month_names))
print()

# apply with custom function
print("Apply custom function (C to F):")
def celsius_to_fahrenheit(c):
    return c * 9/5 + 32
print(s.apply(celsius_to_fahrenheit))
```

**Output:**
```
Original:
Jan    15
Feb    22
Mar     8
Apr    31
May    12
Jun    27
dtype: int64

Values > 20:
Feb    22
Apr    31
Jun    27
dtype: int64

Each value * 2:
Jan    30
Feb    44
Mar    16
Apr    62
May    24
Jun    54
dtype: int64

Mapped to full names:
Jan    January
Feb    February
Mar    March
Apr       April
May         May
Jun        June
dtype: object

Apply custom function (C to F):
Jan    59.0
Feb    71.6
Mar    46.4
Apr    87.8
May    53.6
Jun    80.6
dtype: float64
```

**Explanation:**
Boolean filtering `s[s > 20]` keeps only elements where the condition is True. Arithmetic (`* 2`) is vectorized across all elements. `map()` with a dict replaces index labels (not values — here it reindexes). `apply()` runs a Python function on each element.

## 🏢 Real World Use Case
**Temperature Sensor Analysis:** IoT sensors record hourly temperatures as a pandas Series. An engineer filters outlier readings (e.g., `s[(s > -10) & (s < 50)]`), converts Celsius to Fahrenheit with `apply()`, computes unique sensor readings with `nunique()`, and finds the most common temperature range with `value_counts(bins=10)`.

## 🎯 Interview Questions

**Q1: What is the difference between `loc` and `iloc`?**
A: `loc` uses label-based indexing (inclusive on slices). `iloc` uses integer position-based indexing (exclusive on the right end of slices).

**Q2: How does `map()` differ from `apply()` on a Series?**
A: `map()` is a Series method used for element-wise transformation, often with a dict or a function. `apply()` is more general and can work with DataFrames too; on a Series it also applies a function element-wise but can handle more complex functions and additional arguments.

**Q3: What does `value_counts()` return?**
A: It returns a Series with unique values as the index and their frequencies as values, sorted in descending order by default.

**Q4: Explain boolean filtering on a Series with an example.**
A: `s[s > 10]` returns a new Series containing only elements where the value exceeds 10. The condition `s > 10` produces a boolean Series, which is then used as a filter.

**Q5: What is the purpose of the `name` attribute of a Series?**
A: It gives the Series a label. When a Series becomes a DataFrame column, the `name` becomes the column header. It's used in operations like `pd.concat()` and in display output.

## ⚠ Common Errors / Mistakes
- **Confusing `loc` (label) and `iloc` (integer) slicing behavior**: `loc` is inclusive, `iloc` is exclusive on the right.
- **Using `map()` on the index instead of values**: `s.map(dict)` maps the **values**, not the index.
- **Chaining `loc` and `iloc` incorrectly**: They are accessors, not methods that modify the original.
- **Assuming `unique()` returns a Series** — it returns a NumPy array.
- **Forgetting that arithmetic aligns on index**: If indices don't match, the result may have NaN.

## 📝 Practice Exercises

**Beginner:**
1. Create a Series from `[5, 10, 15, 20, 25]` with index `['a','b','c','d','e']`. Access the value at label `'c'` and at position 3.
2. Use `value_counts()` on a Series containing `['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']`.
3. Filter a Series of numbers to keep only values between 10 and 30 inclusive.

**Intermediate:**
4. Create a Series of 10 random integers between 1 and 100. Sort it descending, then find the 3 largest values.
5. Use `map()` with a lambda to convert a Series of temperatures in Celsius to Kelvin (K = C + 273.15).
6. From a Series of names `[' alice ', ' BOB ', 'Charlie']`, use `str.strip()` and `str.capitalize()` to clean them.

**Advanced:**
7. Create two Series with overlapping but not identical indices. Perform addition between them and explain where NaN values appear.
8. Write a function that takes a Series of mixed types, converts all values to strings, cleans whitespace, counts the frequency of each cleaned value, and returns the top 3 most common.
