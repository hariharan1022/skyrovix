## 14. JS Dates

## 📘 Introduction

The JavaScript `Date` object provides methods for working with dates and times. It is based on the Unix timestamp (milliseconds since January 1, 1970, 00:00:00 UTC). While the built-in `Date` object covers basic needs, it has limitations — timezone handling is brittle, and formatting is verbose. Modern alternatives like `Intl.DateTimeFormat`, `Temporal` (proposal), and libraries like date-fns or Luxon are often preferred for complex applications.

## 🧠 Key Concepts

- **Creating dates**: `new Date()`, `new Date("2024-01-15")`, `new Date(2024, 0, 15)` (months are 0-indexed), `Date.now()`
- **Get methods**: `getFullYear()`, `getMonth()` (0-11), `getDate()` (1-31), `getDay()` (0-6), `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`, `getTime()`
- **Set methods**: `setFullYear()`, `setMonth()`, `setDate()`, `setHours()`, etc. — mutate the Date object
- **UTC methods**: `getUTCFullYear()`, `getUTCMonth()` — work in UTC timezone
- **`toLocaleDateString()`**: Returns a date string formatted according to locale conventions
- **`toLocaleString()`**: Returns date and time formatted according to locale
- **Date arithmetic**: Subtract two Date objects (difference in ms), add days using `setDate() + n`
- **`Intl.DateTimeFormat`**: More powerful locale-aware formatting
- **Alternatives**: date-fns (functional, tree-shakeable), Luxon (immutable, timezone-aware), Day.js (lightweight), Temporal (future native standard)

## 💻 Syntax

```javascript
// Creating dates
const now = new Date();
const specific = new Date("2024-12-25T10:30:00");
const fromParams = new Date(2024, 0, 15); // Jan 15, 2024 (month is 0-indexed)
const fromMs = new Date(1700000000000);
const timestamp = Date.now(); // current ms since epoch

// Get methods
const d = new Date("2024-06-15T14:30:00");
d.getFullYear();    // 2024
d.getMonth();       // 5 (June - 0-indexed!)
d.getDate();        // 15
d.getDay();         // 6 (Saturday)
d.getHours();       // 14
d.getMinutes();     // 30

// Formatting
d.toLocaleDateString("en-US");   // "6/15/2024"
d.toLocaleDateString("en-GB");   // "15/06/2024"
d.toLocaleString("en-US");       // "6/15/2024, 2:30:00 PM"
d.toISOString();                 // "2024-06-15T14:30:00.000Z"

// Using Intl
new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(d);
// "Saturday, June 15, 2024"
```

## ✅ Example 1 - Basic

**Problem:** Display the current date in a user-friendly format and calculate days until a future date.

**Code:**
```javascript
const today = new Date();
console.log("Today:", today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
}));

const newYear = new Date(2025, 0, 1);
const diffMs = newYear - today;
const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
console.log(`Days until New Year 2025: ${diffDays}`);
```

**Output:**
```
Today: Monday, June 23, 2026
Days until New Year 2025: 192 (depends on current date)
```

**Explanation:** `new Date()` creates the current date. `toLocaleDateString` with options provides a human-readable format. Subtracting two Date objects gives the difference in milliseconds. Dividing by `(1000 * 60 * 60 * 24)` converts to days.

## 🚀 Example 2 - Intermediate

**Problem:** Build a function to calculate age from a birthdate and format it with years, months, and days.

**Code:**
```javascript
function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

const age = calculateAge("1990-05-15");
console.log(`Age: ${age.years} years, ${age.months} months, ${age.days} days`);

// Check if date is valid
function isValidDate(dateStr) {
  const d = new Date(dateStr);
  return d instanceof Date && !isNaN(d);
}

console.log("Valid date:", isValidDate("2024-13-01")); // false
```

**Output:** `Age: 36 years, 1 months, 8 days` (depends on current date) and `Valid date: false`

**Explanation:** Age calculation requires handling month/day borrowing when the current day is before the birth day in the current month. `new Date(year, month, 0)` gets the last day of the previous month. Checking `!isNaN(d)` validates that the date string parsed correctly.

## 🏢 Real World Use Case

**Calendar applications:** Scheduling apps (Google Calendar, Outlook) extensively use date manipulation — recurring events, timezone conversion, duration calculation, and date formatting. In production, raw `Date` object is often replaced by libraries:

```javascript
// Using date-fns (functional, tree-shakeable)
import { format, addDays, differenceInDays, isWeekend } from "date-fns";

format(new Date(), "PPP");                // "Jun 23rd, 2026"
addDays(new Date(), 7);                   // Next week
differenceInDays(new Date("2025-01-01"), new Date()); // days until 2025
isWeekend(new Date());                    // true/false
```

## 🎯 Interview Questions

1. **Why is `getMonth()` 0-indexed?** Historical reasons — it returns 0 for January through 11 for December. Always add 1 when displaying months.

2. **How do you check if a date string is valid?** `const d = new Date(dateStr); return d instanceof Date && !isNaN(d);`. `NaN` timestamps indicate invalid dates.

3. **How do you add days to a date?** `const d = new Date(); d.setDate(d.getDate() + 5);`. The Date object automatically handles month/year overflow.

4. **What is the difference between date-fns and Luxon?** date-fns is functional, immutable by default, tree-shakeable, and the most popular choice. Luxon is object-oriented, fully immutable, has first-class timezone support, and a cleaner API.

5. **How do you get the difference between two dates in days?** Subtract them to get milliseconds, then divide by `1000 * 60 * 60 * 24`. For precise calculations across DST boundaries, use `Math.round()` or a library.

## ⚠ Common Errors / Mistakes

- Forgetting months are 0-indexed (passing `1` for February instead of `1` is correct? No — `month: 1` is February)
- Constructing dates from non-standard string formats that browsers parse differently
- Mutating a Date object inadvertently when you meant to work with a copy
- Not accounting for timezone differences when serializing/deserializing dates
- Using `new Date("2024-01-15")` (UTC midnight) vs `new Date(2024, 0, 15)` (local timezone)

## 📝 Practice Exercises

**Beginner:**
1. Display the current date and time in the format "YYYY-MM-DD HH:MM:SS".
2. Write code to check if the current year is a leap year.
3. Create a Date for your next birthday and print how many months away it is.

**Intermediate:**
4. Write a function `getLastDayOfMonth(year, month)` that returns the last day (as a Date) of the given month.
5. Create a function `isWeekend(date)` that returns `true` if the date falls on Saturday or Sunday.
6. Build a function `formatRelative(date)` that returns "today", "yesterday", "tomorrow", or the date if more than 2 days away.

**Advanced:**
7. Implement a recurring event scheduler: given a start date, end date, and interval (e.g., every 2 weeks on Monday), generate all event dates in the range.
8. Build a timezone-aware meeting scheduler: given a list of participants with their timezone offsets and a proposed meeting time in UTC, show the meeting time in each participant's local timezone.
