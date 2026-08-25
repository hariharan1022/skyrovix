## 8. Pandas Filtering
## 📘 Introduction
Filtering is the process of selecting subsets of data based on conditions. Pandas offers multiple powerful and expressive ways to filter rows: boolean indexing, `.loc`/`.iloc` with conditions, `.isin()`, `.between()`, the `.query()` method, and string-based filtering with `.str` accessor methods. Mastery of filtering is essential for efficient data analysis.

## 🧠 Key Concepts
- **Boolean indexing**: `df[df['col'] > value]` — the most common approach.
- **loc**: Label-based access with boolean arrays or slices: `df.loc[df['Age'] > 30, ['Name', 'Age']]`.
- **iloc**: Integer position-based access with slices or boolean arrays.
- **Multiple conditions**: Use `&` (and), `|` (or), `~` (not), with parentheses around each condition.
- **isin()**: Filter rows where column value is in a list.
- **between()**: Filter rows where column value is within a range (inclusive).
- **query()**: Write filter conditions as a string expression — very readable.
- **String filtering**: `.str.contains()`, `.str.startswith()`, `.str.endswith()`, `.str.match()` for regex.

## 💻 Syntax

```python
import pandas as pd

# Boolean indexing
df[df['Age'] > 30]
df[(df['Age'] > 25) & (df['Salary'] > 50000)]
df[(df['Age'] > 25) | (df['Department'] == 'IT')]
df[~df['Department'].isin(['HR', 'Finance'])]

# loc with condition and column selection
df.loc[df['Age'] > 30, ['Name', 'Salary']]

# isin
df[df['Department'].isin(['IT', 'Engineering'])]

# between
df[df['Age'].between(25, 35)]

# query (string expression)
df.query('Age > 30 and Salary > 50000')
df.query('Department in ["IT", "HR"]')

# String filtering
df[df['Name'].str.contains('son', na=False)]
df[df['Name'].str.startswith('A')]
df[df['Email'].str.endswith('.com')]
df[df['Code'].str.match(r'\d{3}-\d{4}')]
```

## ✅ Example 1 - Basic
**Problem:** Load employee data and apply various filter conditions.

```python
import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'],
    'Age': [25, 32, 35, 28, 45, 30],
    'Department': ['IT', 'HR', 'IT', 'IT', 'Finance', 'HR'],
    'Salary': [50000, 60000, 80000, 52000, 95000, 55000],
    'City': ['NYC', 'LA', 'NYC', 'Chicago', 'LA', 'NYC']
})

print("=== ORIGINAL ===")
print(df)
print()

# Filter: Age > 30
print("Age > 30:")
print(df[df['Age'] > 30])
print()

# Multiple conditions: IT dept AND Salary > 55000
print("IT with Salary > 55000:")
print(df[(df['Department'] == 'IT') & (df['Salary'] > 55000)])
print()

# isin
print("Departments IT or Finance:")
print(df[df['Department'].isin(['IT', 'Finance'])])
print()

# between
print("Age between 28 and 35:")
print(df[df['Age'].between(28, 35)])
```

**Output:**
```
=== ORIGINAL ===
      Name  Age Department  Salary     City
0    Alice   25         IT   50000      NYC
1      Bob   32         HR   60000       LA
2  Charlie   35         IT   80000      NYC
3    Diana   28         IT   52000  Chicago
4      Eve   45    Finance   95000       LA
5    Frank   30         HR   55000      NYC

Age > 30:
      Name  Age Department  Salary City
1      Bob   32         HR   60000   LA
2  Charlie   35         IT   80000  NYC
4      Eve   45    Finance   95000   LA

IT with Salary > 55000:
      Name  Age Department  Salary City
2  Charlie   35         IT   80000  NYC

Departments IT or Finance:
      Name  Age Department  Salary     City
0    Alice   25         IT   50000      NYC
2  Charlie   35         IT   80000      NYC
3    Diana   28         IT   52000  Chicago
4      Eve   45    Finance   95000       LA

Age between 28 and 35:
      Name  Age Department  Salary     City
1      Bob   32         HR   60000       LA
2  Charlie   35         IT   80000      NYC
3    Diana   28         IT   52000  Chicago
5    Frank   30         HR   55000      NYC
```

**Explanation:**
Boolean indexing uses `df[condition]`. Multiple conditions require parentheses around each condition with `&` (not `and`). `isin()` is cleaner than multiple `or` conditions. `between()` is inclusive on both ends — equivalent to `(Age >= 28) & (Age <= 35)`.

## 🚀 Example 2 - Intermediate
**Problem:** Use `query()` and string filtering methods.

```python
import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross', 'Eve Williams'],
    'Email': ['alice@company.com', 'bob@gmail.com', 'charlie@company.com', 'diana@outlook.com', 'eve@company.com'],
    'Age': [25, 32, 35, 28, 45],
    'Salary': [50000, 60000, 80000, 52000, 95000]
})

print("=== ORIGINAL ===")
print(df)
print()

# Query method
print("Query: Age > 30 and Salary > 55000:")
print(df.query('Age > 30 and Salary > 55000'))
print()

# String contains - company emails only
print("Company emails (@company.com):")
print(df[df['Email'].str.contains('@company.com', na=False)])
print()

# String startswith
print("Names starting with 'A' or 'B':")
print(df[df['Name'].str.startswith(('A', 'B'))])
print()

# Combined: loc with condition and column selection
print("Names and emails of people earning > 55000:")
print(df.loc[df['Salary'] > 55000, ['Name', 'Email']])
```

**Output:**
```
=== ORIGINAL ===
            Name                 Email  Age  Salary
0  Alice Johnson    alice@company.com   25   50000
1       Bob Smith       bob@gmail.com   32   60000
2   Charlie Brown  charlie@company.com   35   80000
3      Diana Ross   diana@outlook.com   28   52000
4    Eve Williams    eve@company.com    45   95000

Query: Age > 30 and Salary > 55000:
            Name                Email  Age  Salary
1       Bob Smith      bob@gmail.com   32   60000
2   Charlie Brown charlie@company.com   35   80000
4    Eve Williams   eve@company.com    45   95000

Company emails (@company.com):
            Name                 Email  Age  Salary
0  Alice Johnson    alice@company.com   25   50000
2   Charlie Brown  charlie@company.com   35   80000
4    Eve Williams    eve@company.com    45   95000

Names starting with 'A' or 'B':
            Name              Email  Age  Salary
0  Alice Johnson  alice@company.com   25   50000
1       Bob Smith     bob@gmail.com   32   60000

Names and emails of people earning > 55000:
            Name                 Email
1       Bob Smith       bob@gmail.com
2   Charlie Brown  charlie@company.com
4    Eve Williams    eve@company.com
```

**Explanation:**
`query()` allows clean string expressions — great for readability in pipelines. `.str.contains()` filters rows where the string pattern appears in the column. `.str.startswith()` accepts a tuple of prefixes for multiple options. `.loc` with both a condition and a column list selects a filtered subset of specific columns.

## 🏢 Real World Use Case
**Customer Support Ticket Analysis:** A support team filters tickets with `df.query('priority == "critical" and status != "closed"')`, identifies VIP customers with `df[df['customer_id'].isin(vip_list)]`, screens for emails with `df['description'].str.contains('refund|cancel', case=False, na=False)`, and selects tickets with `df[df['created_at'].between('2024-01-01', '2024-03-31')]`.

## 🎯 Interview Questions

**Q1: What is the difference between `df[condition]` and `df.loc[condition]`?**
A: They often produce the same result for row filtering. However, `df.loc[]` can simultaneously select rows (by condition) and columns (by name), while `df[condition]` selects all columns.

**Q2: How do you combine multiple filter conditions?**
A: Use `&` for AND, `|` for OR, `~` for NOT, with each condition wrapped in parentheses: `df[(df['A'] > 5) & (df['B'] < 10)]`.

**Q3: What does `str.contains(na=False)` do?**
A: It returns a boolean Series where the string pattern is found. `na=False` ensures that NaN values in the column are treated as False rather than propagating NaN.

**Q4: How does `.query()` differ from boolean indexing?**
A: `.query()` uses a string expression (no need to repeat `df['col']`), making it more readable for complex conditions. It can be slightly faster for large DataFrames.

**Q5: What is the difference between `filter` and `query`?**
A: `filter()` selects columns by name/like/regex. `query()` filters rows by condition expression — they serve different purposes.

## ⚠ Common Errors / Mistakes
- **Using `and`/`or` instead of `&`/`|`** — Python `and`/`or` don't work element-wise on arrays; use `&`/`|`.
- **Missing parentheses around conditions** — `df[df['A'] > 5 & df['B'] < 10]` fails due to operator precedence.
- **Using `.str` on NaN values** — results propagate NaN; use `na=False` in `.str.contains()`.
- **Confusing `.query()` string syntax**: Use single quotes inside the query string or escape properly.
- **Not resetting index after filtering**: Filtered DataFrame retains original index numbers.

## 📝 Practice Exercises

**Beginner:**
1. Filter rows where `Age` is greater than 30 and `City` is 'NYC'.
2. Use `isin()` to filter rows where `Department` is either 'IT' or 'Engineering'.
3. Use `between()` to filter rows where `Salary` is between 40000 and 80000.

**Intermediate:**
4. Use `.query()` to filter a DataFrame where `Age > 25` AND `City.isin(['NYC', 'Chicago'])`.
5. Filter rows where the email column ends with '@company.com' using `.str.endswith()`.
6. Combine `.loc` with a condition and select only 3 specific columns from the result.

**Advanced:**
7. Write a dynamic filter function that accepts a DataFrame, a column name, an operator (>, <, ==, between, contains), and a value, and returns the filtered DataFrame.
8. Compare performance of boolean indexing vs `.query()` vs `.loc` for a 1M-row dataset with 3 filter conditions — measure with `time.perf_counter()` and report which is fastest.
