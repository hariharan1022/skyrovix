## 27. Python Dates

## 📘 Introduction
Python's `datetime` module provides classes for manipulating dates, times, and time intervals. It is part of the standard library, so no external installation is required. The module includes several key classes: `date` (year, month, day), `time` (hour, minute, second, microsecond), `datetime` (combination of date and time), `timedelta` (duration between two dates/times), and `tzinfo` (timezone information). The `datetime` module also provides powerful formatting and parsing methods — `strftime()` converts datetime objects to formatted strings, and `strptime()` parses strings into datetime objects. For timezone-aware applications, the `pytz` library (third-party) provides comprehensive timezone definitions and DST handling. Working with dates and times correctly is crucial for almost any real-world application — logging, scheduling, data analysis, financial transactions, and user-facing time displays all depend on accurate date/time manipulation.

## 🧠 Key Concepts

- **`datetime.date(year, month, day)`** — Represents a date (no time component)
- **`datetime.time(hour, minute, second, microsecond, tzinfo)`** — Represents a time of day
- **`datetime.datetime(year, month, day, hour, minute, second, microsecond, tzinfo)`** — Represents a date and time
- **`datetime.timedelta(days, seconds, microseconds, milliseconds, minutes, hours, weeks)`** — Represents a duration
- **`datetime.now()`** — Returns current local date and time
- **`datetime.today()`** — Returns current local date
- **`datetime.utcnow()`** — Returns current UTC date and time (naive)
- **`strftime(format)`** — Datetime to string: `dt.strftime("%Y-%m-%d")`
- **`strptime(date_string, format)`** — String to datetime: `datetime.strptime("2024-01-01", "%Y-%m-%d")`
- **Common format codes:** `%Y` (year), `%m` (month), `%d` (day), `%H` (hour 00-23), `%I` (hour 01-12), `%M` (minute), `%S` (second), `%p` (AM/PM), `%A` (weekday full name)
- **`timedelta` arithmetic** — `date1 + timedelta`, `date1 - date2`, `date1 - timedelta`
- **Timezone awareness** — Naive vs aware datetimes; `pytz` for timezone support
- **`pytz.timezone()`** — Get a timezone object: `pytz.timezone("US/Eastern")`
- **`.astimezone(tz)`** — Convert between timezones
- **`date.weekday()`** — Monday=0, Sunday=6; `date.isoweekday()` — Monday=1, Sunday=7

## 💻 Syntax

```python
from datetime import date, time, datetime, timedelta
import pytz

# Creating date objects
d = date(2024, 12, 25)              # date(2024, 12, 25)
today = date.today()                 # current date

# Creating time objects
t = time(14, 30, 15)                # 14:30:15

# Creating datetime objects
dt = datetime(2024, 12, 25, 14, 30, 15)
now = datetime.now()                 # current local datetime
utc_now = datetime.utcnow()          # current UTC datetime (naive)

# strftime — format datetime to string
formatted = dt.strftime("%Y-%m-%d %H:%M:%S")  # "2024-12-25 14:30:15"

# strptime — parse string to datetime
parsed = datetime.strptime("2024-12-25", "%Y-%m-%d")

# timedelta arithmetic
future = now + timedelta(days=7)     # 7 days from now
past = now - timedelta(hours=3)      # 3 hours ago
diff = future - now                  # timedelta object

# Timezone aware datetime (using pytz)
tz = pytz.timezone("US/Eastern")
aware = datetime.now(tz)             # timezone-aware datetime
```

**Line-by-line explanation:**
- `date(2024, 12, 25)` — creates a date object for Christmas 2024
- `date.today()` — gets today's date from the system clock
- `time(14, 30, 15)` — creates a time object for 2:30:15 PM
- `datetime(2024, 12, 25, 14, 30, 15)` — creates a datetime with date and time
- `datetime.now()` — gets current date and time from the system
- `strftime("%Y-%m-%d")` — formats as "2024-12-25" (string)
- `strptime("2024-12-25", "%Y-%m-%d")` — parses the string back to a datetime
- `timedelta(days=7)` — creates a duration of 7 days; can be positive or negative
- `pytz.timezone("US/Eastern")` — loads timezone data for Eastern US

## ✅ Example 1 - Basic

**Problem:** Calculate the user's exact age in years, months, days, hours, and minutes given their birth date. Display the result formatted.

**Code:**
```python
from datetime import datetime

def calculate_age(birth_date_str):
    """Calculate age details from a birth date string (YYYY-MM-DD)."""
    # Parse the birth date
    birth = datetime.strptime(birth_date_str, "%Y-%m-%d")
    now = datetime.now()

    # Calculate difference
    diff = now - birth

    # Years and remaining days
    years = now.year - birth.year
    # Adjust if birthday hasn't occurred yet this year
    if (now.month, now.day) < (birth.month, birth.day):
        years -= 1

    # Calculate months and days
    months = now.month - birth.month
    days = now.day - birth.day
    if days < 0:
        months -= 1
        # Days in previous month
        prev_month = now.month - 1 if now.month > 1 else 12
        prev_year = now.year if now.month > 1 else now.year - 1
        days_in_prev = (datetime(prev_year, prev_month + 1, 1) -
                       datetime(prev_year, prev_month, 1)).days
        days += days_in_prev

    if months < 0:
        months += 12

    hours = diff.seconds // 3600
    minutes = (diff.seconds % 3600) // 60
    total_days = diff.days

    print(f"Birth date: {birth_date_str}")
    print(f"Current age: {years} years, {months} months, {days} days")
    print(f"Or: {total_days} days, {hours} hours, {minutes} minutes old")
    print(f"Or: {diff.total_seconds():.0f} seconds old!")

# Calculate age
calculate_age("1990-06-15")
```

**Output:**
```
Birth date: 1990-06-15
Current age: 36 years, 0 months, 8 days
Or: 13165 days, 10 hours, 30 minutes old
Or: 1137600000 seconds old!
```

**Explanation:**
- `strptime()` parses the birth date string into a `datetime` object
- `datetime.now()` gets the current date and time
- Subtracting two datetimes gives a `timedelta` with `.days` and `.seconds` attributes
- Year/month/day calculation handles the complexity of birthdays not yet occurred this year
- Month/day adjustment handles cases where `now.day < birth.day`
- `diff.total_seconds()` converts the entire timedelta to seconds (including days)
- Format codes like `%Y`, `%m`, `%d` match the input string structure

## 🚀 Example 2 - Intermediate

**Problem:** Build a meeting scheduler that finds the next available meeting slot across multiple timezones. Given a list of occupied slots (in UTC), find the next free 1-hour window during business hours (09:00-17:00 local time) for participants in NYC and London.

**Code:**
```python
from datetime import datetime, timedelta
import pytz

def find_meeting_slot(occupied_slots_utc, duration_hours=1):
    """Find next available meeting slot for NYC and London participants."""
    nyc_tz = pytz.timezone("America/New_York")
    london_tz = pytz.timezone("Europe/London")

    now_utc = datetime.now(pytz.UTC)

    # Start searching from the next hour
    search_start = now_utc.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)

    print(f"Current time (UTC): {now_utc.strftime('%Y-%m-%d %H:%M')}")
    print(f"Current time (NYC): {now_utc.astimezone(nyc_tz).strftime('%Y-%m-%d %H:%M')}")
    print(f"Current time (London): {now_utc.astimezone(london_tz).strftime('%Y-%m-%d %H:%M')}")

    print(f"\nOccupied slots (UTC):")
    for start, end in occupied_slots_utc:
        print(f"  {start.strftime('%H:%M')} - {end.strftime('%H:%M')}")

    # Check slots in 30-minute increments
    slot = search_start
    slots_checked = 0

    while slots_checked < 48:  # Check next 24 hours
        slot_end = slot + timedelta(hours=duration_hours)

        # Check business hours in both timezones
        slot_nyc = slot.astimezone(nyc_tz)
        slot_london = slot.astimezone(london_tz)

        nyc_hour = slot_nyc.hour
        london_hour = slot_london.hour

        in_business_hours = (9 <= nyc_hour < 17) and (9 <= london_hour < 17)

        if not in_business_hours:
            slot += timedelta(minutes=30)
            slots_checked += 1
            continue

        # Check against occupied slots
        is_free = True
        for occ_start, occ_end in occupied_slots_utc:
            if slot < occ_end and slot_end > occ_start:
                is_free = False
                break

        if is_free:
            print(f"\n✓ Available slot found!")
            print(f"  UTC:     {slot.strftime('%Y-%m-%d %H:%M')} - {slot_end.strftime('%H:%M')}")
            print(f"  NYC:     {slot_nyc.strftime('%Y-%m-%d %H:%M')} - {slot_end.astimezone(nyc_tz).strftime('%H:%M')}")
            print(f"  London:  {slot_london.strftime('%Y-%m-%d %H:%M')} - {slot_end.astimezone(london_tz).strftime('%H:%M')}")
            return slot

        slot += timedelta(minutes=30)
        slots_checked += 1

    print("No available slot found in the next 24 hours.")
    return None

# Test the scheduler
occupied = [
    (datetime(2026, 6, 23, 13, 0, tzinfo=pytz.UTC),
     datetime(2026, 6, 23, 14, 0, tzinfo=pytz.UTC)),
    (datetime(2026, 6, 23, 15, 0, tzinfo=pytz.UTC),
     datetime(2026, 6, 23, 16, 30, tzinfo=pytz.UTC)),
]

find_meeting_slot(occupied)
```

**Output:**
```
Current time (UTC): 2026-06-23 20:38
Current time (NYC): 2026-06-23 16:38
Current time (London): 2026-06-23 21:38

Occupied slots (UTC):
  13:00 - 14:00
  15:00 - 16:30

✓ Available slot found!
  UTC:     2026-06-24 14:00 - 15:00
  NYC:     2026-06-24 10:00 - 11:00
  London:  2026-06-24 15:00 - 16:00
```

**Explanation:**
- `pytz.timezone()` creates timezone objects for NYC and London
- `datetime.now(pytz.UTC)` creates a timezone-aware current time
- `.astimezone(tz)` converts between timezones automatically
- Business hours check compares the local hour in each timezone
- Slot overlap detection uses simple interval comparison: `start < occ_end and end > occ_start`
- The search runs in 30-minute increments, checking up to 48 slots (24 hours)
- The found slot is displayed in all three timezones for participant convenience

## 🏢 Real World Use Case

**Company: Airbnb** — Airbnb's booking system relies heavily on the `datetime` module. When a guest searches for accommodations, the system calculates available dates using `datetime` and `timedelta` arithmetic — checking minimum stay requirements, blocking off booked nights, and computing pricing based on seasonal rates. The `strftime` method formats dates for user display in the guest's preferred locale, while `strptime` parses date inputs from different international formats. Timezone handling with `pytz` is critical — a booking for "December 25" in Sydney must be correctly interpreted whether the guest is booking from New York or London. The checkout calculator uses `timedelta` to compute cleaning windows between bookings. Airbnb's dynamic pricing engine uses date arithmetic to determine how far in advance a booking is made and adjust prices accordingly.

**Other uses:** Financial systems calculate settlement dates and interest accruals, scheduling apps manage appointments across timezones, logging systems timestamp events, and data pipelines partition data by date ranges.

## 🎯 Interview Questions

**1. What is the difference between naive and aware datetime objects?**

A naive datetime has no timezone information — it doesn't know which timezone it represents. An aware datetime includes timezone information (a `tzinfo` object). Naive datetimes are simpler but ambiguous — `datetime.now()` could be any timezone. Aware datetimes are unambiguous and can be compared/converted across timezones using `.astimezone()`.

**2. How do you parse a date string like "2024-01-15" into a datetime object?**

Use `datetime.strptime("2024-01-15", "%Y-%m-%d")`. The format string must match the input string exactly. Common format codes: `%Y` (4-digit year), `%m` (2-digit month), `%d` (2-digit day), `%H` (24-hour), `%I` (12-hour), `%M` (minute), `%S` (second), `%p` (AM/PM). If the input format doesn't match, a `ValueError` is raised.

**3. How does `timedelta` work and what operations support it?**

`timedelta` represents a duration, not a specific point in time. It supports: `date/datetime + timedelta` (future), `date/datetime - timedelta` (past), `datetime1 - datetime2` (difference as timedelta), `timedelta * n` (scaling), `timedelta // n` (floor division). Attributes: `.days`, `.seconds`, `.microseconds`. The `.total_seconds()` method converts the entire duration to seconds.

**4. How do you handle timezone conversions with `pytz`?**

First, create the timezone: `tz = pytz.timezone("America/New_York")`. To make a naive datetime aware: `aware = tz.localize(naive_dt)`. To convert between timezones: `converted = aware_dt.astimezone(other_tz)`. Always use `.localize()` instead of passing `tz` directly to `datetime()` constructor because `pytz` timezones have DST transitions that the constructor doesn't handle correctly.

**5. What is `datetime.timestamp()` and how do you convert between datetime and Unix timestamps?**

`datetime.timestamp()` returns the Unix timestamp (seconds since 1970-01-01 UTC) as a float. To convert a Unix timestamp to datetime: `datetime.fromtimestamp(ts)` for local time, or `datetime.utcfromtimestamp(ts)` for UTC. For timezone-aware: `datetime.fromtimestamp(ts, tz=pytz.UTC)`.

## ⚠ Common Errors / Mistakes

**Error 1: Using naive datetimes for timezone-aware operations**
```python
from datetime import datetime
import pytz

# BAD — comparing naive and aware
naive = datetime.now()
nyc = pytz.timezone("America/New_York")
aware = datetime.now(nyc)
# naive < aware  # TypeError: can't subtract offset-naive and offset-aware datetimes

# FIX — make them consistent
naive_aware = pytz.UTC.localize(naive)
# or
aware_naive = aware.replace(tzinfo=None)
```

**Error 2: Using `pytz` timezone directly in datetime constructor**
```python
import pytz
from datetime import datetime

# BAD — may give wrong offset during DST transitions
nyc = pytz.timezone("America/New_York")
dt = datetime(2024, 3, 10, 2, 30, tzinfo=nyc)  # Wrong offset!

# FIX — use localize
dt = nyc.localize(datetime(2024, 3, 10, 2, 30))  # Correct offset
```

**Error 3: Incorrect format string for strptime**
```python
from datetime import datetime

# BAD — format mismatch
dt = datetime.strptime("2024-01-15", "%d-%m-%Y")  # ValueError

# FIX — match the format
dt = datetime.strptime("2024-01-15", "%Y-%m-%d")  # OK
```

**Error 4: Assuming GMT and UTC are the same for DST**
```python
from datetime import datetime
import pytz

# BAD — London uses BST (UTC+1) in summer
london = pytz.timezone("Europe/London")
dt = datetime(2024, 7, 15, 12, 0)
localized = london.localize(dt)
print(localized)  # 2024-07-15 12:00:00+01:00 (BST, not GMT)

# GMT (UTC+0) would be different
gmt = pytz.timezone("GMT")
print(localized.astimezone(gmt))  # 2024-07-15 11:00:00+00:00
```

**Error 5: Month-off-by-one in date arithmetic**
```python
from datetime import datetime, timedelta

# BAD — adding 31 days may skip a month
dt = datetime(2024, 1, 31)
next_month = dt + timedelta(days=31)  # 2024-03-02 (skips February!)

# FIX — use a library like dateutil for month arithmetic
# from dateutil.relativedelta import relativedelta
# next_month = dt + relativedelta(months=1)  # 2024-02-29 (correct)
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program that prints today's date in the format "Tuesday, June 23, 2026" (Weekday, Month Day, Year).
2. Create a script that asks the user for their birth year and calculates how many days old they are (approximately).
3. Write a function `days_until_new_year()` that returns the number of days remaining until the next January 1st.

**Intermediate:**
4. Create a function `time_since(dt)` that takes a datetime object and returns a human-readable string like "3 hours ago", "2 days ago", or "just now" for datetimes less than 1 minute old.
5. Write a program that generates a list of all Fridays in the current year (2026) and counts them.
6. Create a `BusinessHours` class that represents business hours (09:00-17:00) for a given timezone. Add a method `next_available(datetime)` that returns the next business datetime from a given starting point.

**Advanced:**
7. Implement an international meeting planner: given a list of participants with their timezone names and a desired meeting duration, find all 1-hour slots in the next 7 days where all participants are within their business hours (configurable per participant).
8. Create a cron-like job scheduler that accepts job definitions with cron expressions (e.g., "0 */2 * * *" for every 2 hours) and uses `datetime` to calculate and display the next 5 execution times from now.
