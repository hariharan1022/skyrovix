## 14. Pandas DateTime
## 📘 Introduction
Working with dates and times is essential in data analysis — from financial time series to IoT sensor logs. Pandas provides robust datetime functionality: parsing strings into datetime objects, extracting date components (year, month, day, weekday), generating date ranges, resampling time series, computing rolling statistics, and handling time zones.

## 🧠 Key Concepts
- **pd.to_datetime()**: Convert strings/numbers to pandas Timestamp objects.
- **dt accessor**: Access datetime properties (year, month, day, hour, weekday, quarter, dayofyear, is_month_start, etc.).
- **date_range()**: Generate fixed-frequency datetime index (pd.date_range(start, end, periods, freq)).
- **freq strings**: 'D' (day), 'W' (week), 'M' (month end), 'MS' (month start), 'Q' (quarter), 'Y' (year), 'H' (hour), 'T'/'min' (minute), 'S' (second).
- **resample()**: Aggregate time-series data to a different frequency (downsampling/upsampling).
- **rolling()**: Rolling window calculations (moving average, sum, etc.).
- **shift()/diff()**: Shift data forward/backward; compute differences between consecutive periods.
- **Time zones**: tz_localize(), tz_convert() for timezone-aware timestamps.

## 💻 Syntax

`python
import pandas as pd

# Convert to datetime
df['date'] = pd.to_datetime(df['date'])

# Extract components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['weekday'] = df['date'].dt.weekday        # Monday=0
df['quarter'] = df['date'].dt.quarter
df['weekday_name'] = df['date'].dt.day_name()

# Date range
dates = pd.date_range('2024-01-01', '2024-01-10', freq='D')
dates = pd.date_range(start='2024-01-01', periods=10, freq='h')

# Resample
df.resample('M', on='date')['value'].mean()
df.set_index('date').resample('W')['value'].sum()

# Rolling window
df.set_index('date')['value'].rolling(window=7).mean()

# Shift and diff
df['value_shifted'] = df['value'].shift(1)
df['value_diff'] = df['value'].diff()

# Time zones
df['date'].dt.tz_localize('UTC')
df['date'].dt.tz_convert('US/Eastern')
`

## ✅ Example 1 - Basic
**Problem:** Parse dates, extract components, and filter by date range.

`python
import pandas as pd

df = pd.DataFrame({
    'Date': ['2024-01-05', '2024-02-14', '2024-03-20', '2024-04-10', '2024-05-01'],
    'Sales': [100, 150, 130, 180, 160],
    'Customers': [10, 15, 12, 18, 16]
})

print("=== ORIGINAL ===")
print(df)
print("Date dtype:", df['Date'].dtype)
print()

df['Date'] = pd.to_datetime(df['Date'])
print("After conversion, Date dtype:", df['Date'].dtype)
print()

df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day
df['Quarter'] = df['Date'].dt.quarter
df['Weekday'] = df['Date'].dt.weekday
df['Weekday_Name'] = df['Date'].dt.day_name()
print("=== WITH EXTRACTED COMPONENTS ===")
print(df)
print()

print("Sales in 2024 Q1:")
print(df[df['Date'].between('2024-01-01', '2024-03-31')])
`

**Output:**
`
=== ORIGINAL ===
         Date  Sales  Customers
0  2024-01-05    100         10
1  2024-02-14    150         15
2  2024-03-20    130         12
3  2024-04-10    180         18
4  2024-05-01    160         16
Date dtype: object

After conversion, Date dtype: datetime64[ns]

=== WITH EXTRACTED COMPONENTS ===
        Date  Sales  Customers  Year  Month  Day  Quarter  Weekday Weekday_Name
0 2024-01-05    100         10  2024      1    5        1        4       Friday
1 2024-02-14    150         15  2024      2   14        1        2    Wednesday
2 2024-03-20    130         12  2024      3   20        1        2    Wednesday
3 2024-04-10    180         18  2024      4   10        2        2    Wednesday
4 2024-05-01    160         16  2024      5    1        2        2    Wednesday

Sales in 2024 Q1:
        Date  Sales  Customers  Year  Month  Day  Quarter  Weekday Weekday_Name
0 2024-01-05    100         10  2024      1    5        1        4       Friday
1 2024-02-14    150         15  2024      2   14        1        2    Wednesday
2 2024-03-20    130         12  2024      3   20        1        2    Wednesday
`

**Explanation:**
pd.to_datetime() converts string dates to datetime64[ns] type. The .dt accessor exposes datetime properties. day_name() returns the weekday name. Date filtering with .between() works naturally once the column is datetime.

## 🚀 Example 2 - Intermediate
**Problem:** Create a date range, resample daily data to monthly, and compute rolling averages.

`python
import pandas as pd
import numpy as np

dates = pd.date_range('2024-01-01', '2024-06-30', freq='D')
df = pd.DataFrame({
    'Date': dates,
    'Value': 50 + np.sin(np.arange(len(dates)) * 2 * np.pi / 30) * 20 + np.random.normal(0, 5, len(dates))
})

print("=== DATA (first 5 rows) ===")
print(df.head())
print()

df_monthly = df.set_index('Date').resample('M')['Value'].mean().round(2)
print("=== MONTHLY AVERAGE ===")
print(df_monthly)
print()

df_weekly = df.set_index('Date').resample('W')['Value'].sum().round(2)
print("=== WEEKLY SUM (first 5) ===")
print(df_weekly.head())
print()

df_rolling = df.set_index('Date').copy()
df_rolling['Rolling_7d'] = df_rolling['Value'].rolling(window=7).mean()
print("=== WITH 7-DAY ROLLING AVERAGE (first 10) ===")
print(df_rolling.head(10).round(2))
`

**Output:**
`
=== DATA (first 5 rows) ===
        Date      Value
0 2024-01-01  49.148450
1 2024-01-02  62.285643
2 2024-01-03  53.080540
3 2024-01-04  60.848255
4 2024-01-05  49.278584

=== MONTHLY AVERAGE ===
Date
2024-01-31    49.82
2024-02-29    50.91
2024-03-31    49.69
2024-04-30    50.38
2024-05-31    49.49
2024-06-30    50.49
Freq: M, Name: Value, dtype: float64

=== WEEKLY SUM (first 5) ===
Date
2024-01-07    366.74
2024-01-14    360.35
2024-01-21    331.93
2024-01-28    338.97
2024-02-04    354.26
Freq: W-SUN, Name: Value, dtype: float64

=== WITH 7-DAY ROLLING AVERAGE (first 10) ===
                Value  Rolling_7d
Date
2024-01-01  49.148450         NaN
2024-01-02  62.285643         NaN
2024-01-03  53.080540         NaN
2024-01-04  60.848255         NaN
2024-01-05  49.278584         NaN
2024-01-06  42.721892         NaN
2024-01-07  49.374576  52.391134
2024-01-08  48.180637  52.252875
2024-01-09  51.600939  50.726489
2024-01-10  45.968075  49.567780
`

**Explanation:**
pd.date_range() generated daily dates. resample('M') aggregates to monthly mean. resample('W') aggregates to weekly sum. rolling(window=7).mean() computes a 7-day moving average — first 6 rows are NaN due to insufficient preceding values.

## 🏢 Real World Use Case
**Stock Price Analysis:** A financial analyst loads daily stock prices, uses pd.to_datetime() to parse dates, computes daily returns with .pct_change(), resamples to monthly returns with resample('M').last(), calculates 20-day rolling volatility (rolling(20).std() * sqrt(252)), and shifts data with .shift(1) to align current returns with previous day's returns for regression analysis.

## 🎯 Interview Questions

**Q1: How do you convert a string column to datetime?**
A: Use pd.to_datetime(column). For custom formats, use format='%Y-%m-%d'.

**Q2: What are common frequency strings for resample?**
A: 'D' (day), 'W' (week), 'M' (month end), 'Q' (quarter), 'Y' (year), 'H' (hour), 'T'/'min' (minute).

**Q3: How do you extract the month name from a datetime column?**
A: df['date'].dt.month_name() returns full month names (January, February, etc.).

**Q4: What is the difference between resample and rolling?**
A: resample() groups by time intervals (e.g., monthly). rolling() creates overlapping windows of fixed size over the data (e.g., 7-day trailing window).

**Q5: How do you handle timezone-aware timestamps?**
A: Use df['date'].dt.tz_localize('UTC') to assign timezone to naive timestamps, and df['date'].dt.tz_convert('US/Eastern') to convert between timezones.

## ⚠ Common Errors / Mistakes
- **Not using pd.to_datetime() and relying on string comparisons**: Date strings compare lexicographically, not chronologically.
- **Resampling without setting the date as index**: resample() requires a DatetimeIndex.
- **Forgetting date-only vs datetime**: Use dt.date for date part from a datetime.
- **Misunderstanding rolling window alignment**: Rolling uses the current and previous rows by default (not centered).
- **Ignoring timezone when working with data from multiple regions**: Always localize and convert consistently.

## 📝 Practice Exercises

**Beginner:**
1. Create a DataFrame with a date column (strings), convert to datetime, and extract year, month, day.
2. Generate a date range from 2023-01-01 to 2023-12-31 with weekly frequency.
3. Filter rows where the date falls in March 2024.

**Intermediate:**
4. Create a daily time series for 1 year with random values. Resample to quarterly and monthly means.
5. Compute a 30-day rolling average and rolling standard deviation on stock price data.
6. Use shift() and diff() to compute daily changes in a time series.

**Advanced:**
7. Write a function that takes a time series DataFrame, detects gaps (missing dates) in the index, and fills them with interpolated values.
8. Build a timezone-aware pipeline: create timestamps in UTC, convert to 3 different timezones, extract hour-of-day per timezone, and analyze how the hourly pattern shifts.
