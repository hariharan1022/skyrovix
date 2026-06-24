## 35. Java Date

## 📘 Introduction
Java has two date/time APIs: the legacy `java.util.Date` and `java.util.Calendar` (error-prone, mutable, not thread-safe) and the modern `java.time` package (Java 8+), which is immutable, thread-safe, and comprehensive.

## 🧠 Key Concepts
- **`java.util.Date` (Legacy)**: represents a specific instant with millisecond precision; most methods are deprecated
- **`java.time.LocalDate`**: date without time or timezone (e.g., 2026-06-23)
- **`LocalTime`**: time without date or timezone (e.g., 14:30:00)
- **`LocalDateTime`**: date + time without timezone
- **`DateTimeFormatter`**: for parsing and formatting date/time objects
- **`Period`**: date-based amount (years, months, days) — used with `LocalDate`
- **`Duration`**: time-based amount (hours, minutes, seconds) — used with `LocalTime` / `LocalDateTime`
- **Date Arithmetic**: adding/subtracting days, months, years; comparing dates
- **Parsing/Formatting Dates**: converting strings to date objects and vice versa
- **Timezones with `ZoneId` / `ZonedDateTime`**: working with timezone-aware dates

## 💻 Syntax
```java
// Modern API (java.time)
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
LocalDateTime dt = LocalDateTime.now();
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

// Formatting
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String formatted = today.format(formatter);
LocalDate parsed = LocalDate.parse("23/06/2026", formatter);

// Arithmetic
LocalDate tomorrow = today.plusDays(1);
Period period = Period.between(startDate, endDate);
Duration duration = Duration.between(startTime, endTime);
```

## ✅ Example 1 - Basic

**Problem:** Display current date, time, and perform basic date arithmetic.

**Code:**
```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeDemo {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDateTime current = LocalDateTime.now();

        System.out.println("Today: " + today);
        System.out.println("Current time: " + now);
        System.out.println("Current date-time: " + current);

        LocalDate nextWeek = today.plusWeeks(1);
        LocalDate lastMonth = today.minusMonths(1);
        System.out.println("Next week: " + nextWeek);
        System.out.println("Last month: " + lastMonth);

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        System.out.println("Formatted: " + today.format(fmt));
    }
}
```

**Output:**
```
Today: 2026-06-23
Current time: 14:30:00.123
Current date-time: 2026-06-23T14:30:00.123
Next week: 2026-06-30
Last month: 2026-05-23
Formatted: 23-06-2026
```

**Explanation:** `LocalDate.now()` gets the current date. `plusWeeks(1)` and `minusMonths(1)` demonstrate immutable date arithmetic. `DateTimeFormatter` converts to a custom format.

## 🚀 Example 2 - Intermediate

**Problem:** Parse a date string, calculate period between two dates, and work with timezones.

**Code:**
```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class DateAdvancedDemo {
    public static void main(String[] args) {
        // Parsing
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate startDate = LocalDate.parse("2026/01/01", fmt);
        LocalDate endDate = LocalDate.parse("2026/12/25", fmt);

        System.out.println("Start: " + startDate);
        System.out.println("End: " + endDate);

        // Period between dates
        Period period = Period.between(startDate, endDate);
        System.out.println("Period: " + period.getYears() + "y "
            + period.getMonths() + "m " + period.getDays() + "d");

        // Days between (using ChronoUnit)
        long daysBetween = ChronoUnit.DAYS.between(startDate, endDate);
        System.out.println("Days between: " + daysBetween);

        // Timezones
        ZonedDateTime ist = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        ZonedDateTime ny = ZonedDateTime.now(ZoneId.of("America/New_York"));
        System.out.println("India: " + ist);
        System.out.println("New York: " + ny);

        // Duration between times
        LocalTime morning = LocalTime.of(9, 0);
        LocalTime evening = LocalTime.of(17, 30);
        Duration workDay = Duration.between(morning, evening);
        System.out.println("Work day: " + workDay.toHours() + " hours "
            + workDay.toMinutesPart() + " minutes");
    }
}
```

**Output:**
```
Start: 2026-01-01
End: 2026-12-25
Period: 0y 11m 24d
Days between: 358
India: 2026-06-23T14:30:00+05:30[Asia/Kolkata]
New York: 2026-06-23T05:00:00-04:00[America/New_York]
Work day: 8 hours 30 minutes
```

**Explanation:** `Period.between` calculates years/months/days. `ChronoUnit.DAYS.between` gives total days. `ZonedDateTime` shows the same instant in different timezones. `Duration.between` measures time-based amounts.

## 🏢 Real World Use Case
- **Booking systems**: calculate nights between check-in/check-out dates
- **Logging and auditing**: timestamps with timezone for distributed systems
- **Financial applications**: date arithmetic for interest calculations, due dates
- **Batch scheduling**: comparing dates for job execution timing

## 🎯 Interview Questions

**Q1: What is the difference between `java.util.Date` and `java.time.LocalDate`?**
A: `Date` represents an instant (date + time + timezone), is mutable, and many methods are deprecated. `LocalDate` represents only a date (year/month/day), is immutable, and is part of the modern `java.time` API.

**Q2: What is the difference between `Period` and `Duration`?**
A: `Period` is date-based (years, months, days). `Duration` is time-based (hours, minutes, seconds, nanoseconds). Use `Period` for `LocalDate` and `Duration` for `LocalTime` / `LocalDateTime`.

**Q3: How do you format a date in Java?**
A: Use `DateTimeFormatter.ofPattern("pattern")` and call `date.format(formatter)` or `LocalDate.parse(string, formatter)`.

**Q4: How do you handle timezones in Java?**
A: Use `ZoneId` to represent a timezone and `ZonedDateTime` for date+time+zone. Convert between zones with `zdt.withZoneSameInstant(ZoneId.of("..."))`.

**Q5: Is `LocalDateTime` timezone-aware?**
A: No. `LocalDateTime` has no timezone information. Use `ZonedDateTime` or `OffsetDateTime` for timezone-aware operations.

## ⚠ Common Errors / Mistakes
- Using `java.util.Date` in new code instead of `java.time` (legacy is error-prone)
- Forgetting that date/time classes are immutable — `plusDays()` returns a new instance, does not modify the original
- Using wrong `DateTimeFormatter` pattern characters (case-sensitive: `yyyy` vs `YYYY`, `MM` vs `mm`)
- Assuming `LocalDateTime` is timezone-aware
- Not handling `DateTimeParseException` when parsing
- Confusing `Period` (date) with `Duration` (time)

## 📝 Practice Exercises

**Beginner:**
1. Print today's date, yesterday's date, and the date 30 days from now.
2. Parse the string "15-August-2026" into a `LocalDate` and print it in ISO format.
3. Print the current time in hours:minutes:seconds format and add 2 hours to it.

**Intermediate:**
4. Calculate your exact age in years, months, and days using `Period.between()`.
5. Create a `MeetingScheduler` that takes two `LocalDateTime` values and checks if they overlap. Two meetings overlap if their time ranges intersect.
6. Write a program that converts the current time in New York to the corresponding time in Tokyo, London, and Sydney using `ZonedDateTime` and `ZoneId`.

**Advanced:**
7. Implement a `BusinessDayCalculator` that calculates the number of business days (Monday–Friday) between two dates, excluding a provided list of public holidays.
8. Create a `RecurringTask` generator that takes a start date, an end date, and a recurrence pattern (daily, weekly, monthly, or a custom `Period`), and generates all occurrence dates within the range.
