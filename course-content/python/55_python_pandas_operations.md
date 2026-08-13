## 55. Pandas Operations
## 📘 Introduction
Beyond basic DataFrame operations, Pandas provides powerful tools for data transformation and analysis: grouping data with `GroupBy`, combining datasets with `merge`/`join`, sorting, applying custom functions, counting value frequencies, creating pivot tables, and handling datetime data. These operations are essential for real-world data wrangling and reporting.

## 🧠 Key Concepts
- **GroupBy**: Split-apply-combine — group data by a column and apply aggregation
- **Aggregate functions**: `sum()`, `mean()`, `count()`, `min()`, `max()`, `agg()`
- **Merge / Join**: Combine DataFrames on common columns or indices (SQL-style)
- **sort_values()**: Order rows by one or more columns
- **apply()**: Apply a custom function along an axis
- **value_counts()**: Count unique values in a Series
- **pivot_table()**: Create spreadsheet-style summary tables
- **Datetime**: Parsing, extracting (year, month, day), and resampling time series

## 💻 Syntax
```python
import pandas as pd

# GroupBy
df.groupby('Category')['Sales'].sum()

# Merge
pd.merge(df1, df2, on='key')
pd.merge(df1, df2, how='left', on='key')

# Sort
df.sort_values('Age', ascending=False)

# Apply
df['col'].apply(lambda x: x ** 2)

# Value counts
df['City'].value_counts()

# Pivot table
pd.pivot_table(df, values='Sales', index='Region', columns='Year', aggfunc='sum')

# Datetime
df['Date'] = pd.to_datetime(df['Date'])
df['Year'] = df['Date'].dt.year
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Group sales data by region, compute total and average sales, and sort the results.

```python
import pandas as pd

data = {
    'Region': ['North', 'South', 'North', 'East', 'South', 'East'],
    'Sales': [100, 150, 200, 50, 300, 80],
    'Month': ['Jan', 'Jan', 'Feb', 'Jan', 'Feb', 'Feb']
}
df = pd.DataFrame(data)

# GroupBy with aggregation
grouped = df.groupby('Region')['Sales'].agg(['sum', 'mean', 'count'])
print("Grouped by Region:\n", grouped)

# Sort by total sales descending
sorted_grouped = grouped.sort_values('sum', ascending=False)
print("\nSorted by total sales:\n", sorted_grouped)

# value_counts
print("\nMonth distribution:\n", df['Month'].value_counts())
```

**Output:**
```
Grouped by Region:
          sum  mean  count
Region                    
East     130  65.0      2
North    300  150.0     2
South    450  225.0     2

Sorted by total sales:
          sum  mean  count
Region                    
South    450  225.0     2
North    300  150.0     2
East     130  65.0      2

Month distribution:
 Feb    3
Jan    3
Name: Month, dtype: int64
```

**Explanation:** `groupby('Region')` splits data by unique region values. `.agg()` applies multiple aggregation functions at once. `sort_values()` reorders rows by column values. `value_counts()` shows unique value frequencies — here, each month appears 3 times.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Merge two DataFrames (orders and customers), create a pivot table, and work with datetime data.

```python
import pandas as pd

# Customer data
customers = pd.DataFrame({
    'CustomerID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie'],
    'City': ['NYC', 'LA', 'Chicago']
})

# Order data
orders = pd.DataFrame({
    'OrderID': [101, 102, 103, 104],
    'CustomerID': [1, 2, 1, 3],
    'Amount': [250, 400, 150, 300],
    'Date': ['2024-01-15', '2024-02-10', '2024-01-20', '2024-03-05']
})

# Merge
merged = pd.merge(orders, customers, on='CustomerID', how='left')
print("Merged:\n", merged)

# Pivot table: total amount per customer per month
merged['Date'] = pd.to_datetime(merged['Date'])
merged['Month'] = merged['Date'].dt.month
pivot = pd.pivot_table(merged, values='Amount', index='Name', columns='Month', aggfunc='sum', fill_value=0)
print("\nPivot Table:\n", pivot)

# Apply: add 10% tax
merged['WithTax'] = merged['Amount'].apply(lambda x: round(x * 1.1, 2))
print("\nWith 10% tax:\n", merged[['Name', 'Amount', 'WithTax']])
```

**Output:**
```
Merged:
    OrderID  CustomerID  Amount       Date     Name     City
0      101           1     250 2024-01-15    Alice      NYC
1      102           2     400 2024-02-10      Bob       LA
2      103           1     150 2024-01-20    Alice      NYC
3      104           3     300 2024-03-05  Charlie  Chicago

Pivot Table:
 Month     1    2    3
Name                  
Alice    400    0    0
Bob        0  400    0
Charlie    0    0  300

With 10% tax:
      Name  Amount  WithTax
0   Alice     250   275.00
1     Bob     400   440.00
2   Alice     150   165.00
3 Charlie     300   330.00
```

**Explanation:** `pd.merge()` joins orders to customers on `CustomerID`. Pivot tables reshape data: index = Name, columns = Month, values = Amount, aggregated by sum. `pd.to_datetime()` converts string dates to datetime objects, enabling `.dt.month` extraction. `.apply()` runs a lambda function on each row's Amount to compute tax.

## 🏢 Real World Use Case
A business analyst at a retail chain receives daily transaction logs and a customer master table. They merge the datasets on customer ID, group sales by region and month, create pivot tables to compare quarterly performance across stores, apply a function to calculate discounted prices, and sort to find top-performing locations. They also parse datetime columns to compute year-over-year growth. This pipeline drives the company's monthly executive dashboard.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between `merge()` and `join()`?**
`merge()` combines DataFrames on columns (SQL-style). `join()` combines on indices. `merge()` is more flexible with `left_on`, `right_on`, `how`, etc.

**2. What does `groupby('col').agg(['sum', 'mean'])` do?**
It groups by unique values in 'col' and computes both sum and mean for all numeric columns, returning a MultiIndex column DataFrame.

**3. How do you apply a custom function to every element in a column?**
`df['col'].apply(lambda x: custom_func(x))` or `df['col'].map(custom_func)` for element-wise transformations.

**4. What is the difference between `value_counts()` and `groupby().count()`?**
`value_counts()` returns a Series of unique value frequencies for a single column. `groupby().count()` returns a DataFrame with count per group for all columns.

**5. How do you extract the year from a datetime column?**
`df['Date'] = pd.to_datetime(df['Date'])` then `df['Year'] = df['Date'].dt.year`.

## ⚠ Common Errors / Mistakes
- **Forgetting `on` in merge**: Without `on`, Pandas merges on all common columns (may yield unexpected results).
- **Incorrect `how` parameter**: `how='inner'` is default. Use `how='left'` to keep all rows from the left DataFrame.
- **GroupBy returns a GroupBy object**: You must chain an aggregation method (`.sum()`, `.mean()`, `.agg()`) to get a DataFrame back.
- **Datetime not parsed**: Dates stored as strings won't support `.dt` accessor. Always use `pd.to_datetime()` first.
- **pivot_table vs pivot**: `pivot()` fails with duplicate index/column pairs; `pivot_table()` handles duplicates with aggregation and is more robust.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a DataFrame with 'Department' and 'Salary' columns. Group by department and compute the mean salary.
2. Sort a DataFrame of 5 students by 'Score' in descending order.
3. Use `value_counts()` on a 'Color' column containing 'Red', 'Blue', 'Red', 'Green', 'Blue', 'Blue'.

**Intermediate:**
4. Create two DataFrames: `students` (ID, Name) and `grades` (ID, Subject, Grade). Merge them on ID and display each student's average grade.
5. Create a DataFrame with 'Date' strings ('2024-01-01', '2024-02-01', ...) and 'Sales'. Parse the Date column and extract the month number.
6. Use `apply()` to convert a column of temperatures from Celsius to Fahrenheit: `F = C * 9/5 + 32`.

**Advanced:**
7. Create a sales DataFrame with columns 'Product', 'Region', 'Sales', 'Date' (spanning 6 months). Build a pivot table showing total sales per product per month. Then add a row showing the total for each month.
8. Merge three DataFrames: `customers` (CustomerID, Name), `orders` (OrderID, CustomerID, Amount, Date), and `products` (ProductID, ProductName, OrderID). Compute the total amount spent by each customer, sorted descending.
