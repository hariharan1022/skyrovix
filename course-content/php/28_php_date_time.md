# 28. PHP Date and Time

## 📘 Introduction
PHP provides powerful date and time handling through functions like `date()`, `time()`, `mktime()`, `strtotime()`, and the object-oriented `DateTime` and `DateTimeZone` classes. These tools let you format, parse, compare, and manipulate dates and times with ease.

## 🧠 Key Concepts
- **`date()`**: Formats a timestamp according to a format string.
- **`time()`**: Returns the current Unix timestamp (seconds since Jan 1, 1970).
- **`mktime()`**: Creates a timestamp from specific date/time components.
- **`strtotime()`**: Parses English textual date descriptions into timestamps.
- **`DateTime` class**: OOP approach with methods like `format()`, `modify()`, `diff()`.
- **`DateTimeZone`**: Represents a timezone, used with `DateTime`.
- **`date_diff()`**: Computes the difference between two dates (returns `DateInterval`).
- **`date_default_timezone_set()`**: Sets the default timezone for all date functions.

## 💻 Syntax
```php
// Current timestamp and formatting
echo date("Y-m-d H:i:s");          // 2026-06-23 14:30:15
echo time();                        // Unix timestamp

// Create a timestamp
echo mktime(14, 30, 15, 6, 23, 2026);

// Parse string
echo strtotime("next Monday");
echo strtotime("+2 weeks");

// DateTime class
$dt = new DateTime("2026-06-23", new DateTimeZone("America/New_York"));
echo $dt->format("Y-m-d H:i:s");

// Difference
$diff = date_diff(new DateTime("2026-01-01"), new DateTime("2026-12-31"));
echo $diff->days;
```

## ✅ Example 1 - Basic

**Problem:** Display the current date in various formats, and show the date 30 days from now.

**Code:**
```php
<?php
date_default_timezone_set("Asia/Kolkata");

echo "Today: " . date("l, F j, Y") . "\n";
echo "ISO: " . date("Y-m-d") . "\n";
echo "12-hour: " . date("h:i:s A") . "\n";
echo "24-hour: " . date("H:i:s") . "\n";
echo "Timestamp: " . time() . "\n";

// Future date
$future = strtotime("+30 days");
echo "30 days from now: " . date("Y-m-d", $future) . "\n";

// Past date
$past = strtotime("last Monday");
echo "Last Monday was: " . date("Y-m-d", $past) . "\n";
?>
```

**Output:**
```
Today: Tuesday, June 23, 2026
ISO: 2026-06-23
12-hour: 02:30:15 PM
24-hour: 14:30:15
Timestamp: 1790296215
30 days from now: 2026-07-23
Last Monday was: 2026-06-22
```

**Explanation:** `date_default_timezone_set` sets the timezone. `date()` formats the current timestamp. `strtotime` parses relative expressions like `"+30 days"` and `"last Monday"` into timestamps.

## 🚀 Example 2 - Intermediate

**Problem:** Calculate a user's age in years, months, and days from their birth date, and show the next birthday.

**Code:**
```php
<?php
$birthday = "1990-04-15";
$today = new DateTime("now");
$birth = new DateTime($birthday);

// Age difference
$age = $today->diff($birth);
echo "Age: {$age->y} years, {$age->m} months, {$age->d} days\n";

// Next birthday
$nextBirthday = new DateTime(date("Y") . "-" . $birth->format("m-d"));
if ($nextBirthday < $today) {
    $nextBirthday->modify("+1 year");
}
$daysUntil = $today->diff($nextBirthday)->days;
echo "Next birthday: " . $nextBirthday->format("l, F j, Y") . "\n";
echo "Days until birthday: $daysUntil\n";

// DateTimeZone example
$nyc = new DateTime("now", new DateTimeZone("America/New_York"));
$tokyo = new DateTime("now", new DateTimeZone("Asia/Tokyo"));
echo "New York: " . $nyc->format("Y-m-d H:i") . "\n";
echo "Tokyo: " . $tokyo->format("Y-m-d H:i") . "\n";
?>
```

**Output:**
```
Age: 36 years, 2 months, 8 days
Next birthday: Tuesday, April 15, 2027
Days until birthday: 296
New York: 2026-06-23 05:00
Tokyo: 2026-06-23 19:30
```

**Explanation:** `DateTime::diff()` returns a `DateInterval` with `y`, `m`, `d` properties. The next birthday logic checks if this year's birthday has passed and adjusts. `DateTimeZone` shows the same moment in different timezones.

## 🏢 Real World Use Case
**Event Countdown Timer:** An event management system calculates time remaining until a conference start date, displaying days, hours, minutes, and seconds.

```php
<?php
function timeUntil(string $eventDate): string {
    $now = new DateTime("now");
    $event = new DateTime($eventDate);
    if ($event < $now) return "Event has passed";
    $interval = $now->diff($event);
    return sprintf(
        "%d days, %d hours, %d minutes, %d seconds",
        $interval->days,
        $interval->h,
        $interval->i,
        $interval->s
    );
}

echo timeUntil("2026-12-25 09:00:00");
?>
```

## 🎯 Interview Questions

**1. What is a Unix timestamp?**  
The number of seconds elapsed since January 1, 1970, 00:00:00 UTC. PHP timestamps are integers.

**2. How does `strtotime()` handle relative dates?**  
It accepts strings like `"next Friday"`, `"last day of February"`, `"+2 weeks"`, and `"first day of next month"`.

**3. What is the advantage of the `DateTime` class over `date()`?**  
`DateTime` is object-oriented, immutable (`DateTimeImmutable`), supports timezone-aware operations, and provides method chaining.

**4. How do you find the difference between two dates in days?**  
Use `$date1->diff($date2)->days` or `date_diff($date1, $date2)->days`.

**5. Why use `date_default_timezone_set()`?**  
It sets the default timezone for all date/time functions, avoiding warnings and ensuring correct local time representation.

## ⚠ Common Errors / Mistakes
- **Not setting a timezone**: PHP emits a warning and uses the system timezone or UTC.
- **Confusing `m/d/Y` and `d/m/Y`**: `strtotime("06/04/2026")` is interpreted as June 4 (US format), not April 6. Use ISO format `Y-m-d` to avoid ambiguity.
- **Mutable DateTime**: Modifying a `DateTime` object changes it. Use `DateTimeImmutable` or clone the object.
- **Year 2038 problem**: On 32-bit systems, timestamps overflow after 2038-01-19. Use `DateTime` (not format-based) to avoid this.

## 📝 Practice Exercises

**Beginner**
1. Display the current date in format: "Tuesday, 23rd June 2026" using `date()`.
2. Show the date and time 1 week from now using `strtotime()`.
3. Use `mktime()` to create a timestamp for your birth date and echo it formatted as `Y-m-d`.

**Intermediate**
4. Calculate the number of days until Christmas (December 25) from today using `DateTime::diff()`.
5. Given a timestamp, display the date in three different timezones (UTC, America/New_York, Asia/Tokyo) using `DateTimeZone`.
6. Build a function `daysBetween(string $start, string $end): int` that returns the number of days between two ISO dates.

**Advanced**
7. Build a recurring event calculator: given a start date and a recurring pattern (e.g., "every 2 weeks on Friday"), calculate the next 10 occurrence dates.
8. Implement a business-hours checker: given opening time, closing time, and a timezone, determine if the current time falls within business hours, considering holidays from an array.
