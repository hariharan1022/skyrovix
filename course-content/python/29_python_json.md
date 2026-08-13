## 29. Python JSON

## 📘 Introduction
JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write and easy for machines to parse and generate. Python's `json` module provides a simple API for encoding Python objects as JSON strings (serialization) and decoding JSON strings back into Python objects (deserialization). JSON supports a small set of data types: strings, numbers, booleans, null, objects (dictionaries), and arrays (lists). The `json` module maps these types to and from Python types in a straightforward way. Key functions include `json.dumps()` (Python object to JSON string), `json.loads()` (JSON string to Python object), `json.dump()` (Python object to file), and `json.load()` (file to Python object). The module also supports pretty-printing via `indent`, key sorting, custom serialization for non-serializable objects, and handling of JSON-like formats. JSON is the de facto standard for data exchange in web APIs, configuration files, and data storage.

## 🧠 Key Concepts

- **Serialization** — Converting Python objects to JSON strings (data out)
- **Deserialization** — Parsing JSON strings into Python objects (data in)
- **`json.dumps(obj, indent, sort_keys, default, ensure_ascii)`** — Python to JSON string
- **`json.loads(json_string)`** — JSON string to Python object
- **`json.dump(obj, file, indent, sort_keys)`** — Python to JSON file
- **`json.load(file)`** — JSON file to Python object
- **Type mapping:** Python `dict` to JSON `object`, `list` to `array`, `str` to `string`, `int/float` to `number`, `True/False` to `true/false`, `None` to `null`
- **`indent` parameter** — Pretty-prints JSON with indentation: `indent=2`
- **`sort_keys` parameter** — Sorts dictionary keys alphabetically: `sort_keys=True`
- **`ensure_ascii`** — If False, allows non-ASCII characters; if True (default), escapes them
- **`default` parameter** — Function to handle non-serializable objects (e.g., `datetime`, custom classes)
- **Custom serialization** — Define `default` function or subclass `json.JSONEncoder`
- **Custom deserialization** — Use `object_hook` in `json.loads()` or subclass `json.JSONDecoder`

## 💻 Syntax

```python
import json

# Python data
data = {
    "name": "Alice",
    "age": 30,
    "is_student": False,
    "courses": ["Math", "Physics"],
    "address": None
}

# Serialize to JSON string
json_str = json.dumps(data)
print(json_str)

# Pretty-print with indentation
pretty_json = json.dumps(data, indent=2, sort_keys=True)
print(pretty_json)

# Deserialize JSON string to Python
parsed = json.loads(json_str)
print(parsed["name"])

# Write to file
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read from file
with open("data.json", "r") as f:
    loaded = json.load(f)
    print(loaded["courses"])
```

**Line-by-line explanation:**
- `json.dumps(data)` — converts Python dict to a compact JSON string (default)
- `indent=2` — adds 2-space indentation for human readability
- `sort_keys=True` — sorts dictionary keys alphabetically in output
- `json.loads(json_str)` — parses JSON string back into a Python dict
- `json.dump(data, f)` — writes JSON directly to a file object
- `json.load(f)` — reads and parses JSON directly from a file object
- Python `False` becomes JSON `false` (lowercase); `None` becomes `null`

## ✅ Example 1 - Basic

**Problem:** Create a JSON configuration file for a web application. Write settings to a file, read them back, modify a setting, and save again.

**Code:**
```python
import json

config = {
    "app_name": "MyWebApp",
    "version": "2.1.0",
    "debug": False,
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "webapp_db",
        "pool_size": 10
    },
    "features": {
        "authentication": True,
        "rate_limiting": True,
        "dark_mode": False
    },
    "allowed_origins": ["https://example.com", "https://api.example.com"],
    "max_connections": 100
}

with open("app_config.json", "w") as f:
    json.dump(config, f, indent=4, sort_keys=True)
print("Config saved to app_config.json")

with open("app_config.json", "r") as f:
    loaded_config = json.load(f)

print(f"App: {loaded_config['app_name']} v{loaded_config['version']}")
print(f"Database: {loaded_config['database']['host']}:{loaded_config['database']['port']}")

loaded_config["debug"] = True
loaded_config["max_connections"] = 200

with open("app_config.json", "w") as f:
    json.dump(loaded_config, f, indent=4)

print(f"Debug mode is now: {loaded_config['debug']}")
```

**Output:**
```
Config saved to app_config.json
App: MyWebApp v2.1.0
Database: localhost:5432
Debug mode is now: True
```

**Explanation:**
- A nested Python dictionary is created with strings, numbers, booleans, lists, and nested dicts
- `json.dump(config, f, indent=4, sort_keys=True)` writes formatted JSON to file
- `json.load(f)` parses the file contents back into a Python dict
- Nested values are accessed with chained brackets: `config['database']['host']`
- Modifications are made to the Python dict, then written back to file

## 🚀 Example 2 - Intermediate

**Problem:** Handle non-serializable types (datetime) with custom serialization. Parse a JSON string that contains date strings, convert them to Python datetime objects, and serialize back with a custom encoder.

**Code:**
```python
import json
from datetime import datetime, date

api_response = """
{
    "status": "success",
    "data": {
        "title": "Project Alpha",
        "created_at": "2026-06-15T10:30:00",
        "deadline": "2026-12-31",
        "budget": 50000,
        "is_active": true
    }
}
"""

def date_parser(dct):
    for key, value in dct.items():
        if isinstance(value, str):
            try:
                dct[key] = datetime.fromisoformat(value)
            except ValueError:
                try:
                    dct[key] = date.fromisoformat(value)
                except ValueError:
                    pass
    return dct

parsed = json.loads(api_response, object_hook=date_parser)
project = parsed["data"]
print(f"Project: {project['title']}")
print(f"Created: {project['created_at']} (type: {type(project['created_at']).__name__})")
print(f"Deadline: {project['deadline']} (type: {type(project['deadline']).__name__})")

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        return super().default(obj)

output = {"project": project["title"], "created": project["created_at"]}
print(f"\nRe-serialized: {json.dumps(output, cls=CustomEncoder, indent=2)}")

try:
    json.dumps({"bad": datetime.now()})  # without custom encoder
except TypeError as e:
    print(f"\nWithout custom encoder: {e}")
```

**Output:**
```
Project: Project Alpha
Created: 2026-06-15 10:30:00 (type: datetime)
Deadline: 2026-12-31 (type: date)

Re-serialized: {
  "project": "Project Alpha",
  "created": "2026-06-15T10:30:00"
}

Without custom encoder: Object of type datetime is not JSON serializable
```

**Explanation:**
- `json.loads()` with `object_hook=date_parser` transforms each JSON object during parsing
- The `date_parser` function tries `datetime.fromisoformat()` then `date.fromisoformat()` on string values
- `CustomEncoder` subclasses `json.JSONEncoder` and overrides `default()` for datetime/date
- Pass the encoder class via `cls=CustomEncoder` in `json.dumps()`
- Without a custom encoder, `TypeError` is raised for non-serializable types

## 🏢 Real World Use Case

**Company: Stripe** — Stripe's payment processing API uses JSON for all request and response data. When a merchant creates a charge, the Python client library serializes the request data using `json.dumps()` with custom encoders for money amounts (handling `Decimal` types) and timestamps. The response is deserialized with `json.loads()` using `object_hook` to convert ISO 8601 date strings into Python `datetime` objects. Stripe's event system uses `indent=None` for compact machine-to-machine JSON and `indent=2` for developer-facing debug output. Webhook signatures are verified using `sort_keys=True` to ensure canonical JSON ordering. The `ensure_ascii=False` parameter allows international characters in merchant descriptors to pass through correctly.

**Other uses:** REST APIs (Django REST Framework, Flask), configuration files (VS Code, npm, package.json), data export/import, NoSQL databases (MongoDB uses BSON, a JSON-like format), and real-time messaging (WebSocket JSON frames).

## 🎯 Interview Questions

**1. What is the difference between `json.dumps()` and `json.dump()`?**

`json.dumps()` serializes a Python object to a JSON string (returned as a string). `json.dump()` serializes directly to a file-like object (writes to file). Similarly, `json.loads()` parses a JSON string into a Python object, while `json.load()` reads and parses JSON from a file-like object.

**2. How do you pretty-print JSON in Python?**

Use the `indent` parameter: `json.dumps(data, indent=2)` or `json.dump(data, f, indent=4)`. For additional readability, use `sort_keys=True` to sort dictionary keys alphabetically. You can also combine these: `json.dumps(data, indent=4, sort_keys=True)`.

**3. What Python types are not JSON serializable by default?**

Common non-serializable types include `datetime`, `date`, `time`, `Decimal`, `set`, `complex`, `bytes`, `range`, and custom class instances. To handle these, you must provide a `default` function (passed to `json.dumps()`) or subclass `json.JSONEncoder` and override `default()`.

**4. What is the purpose of `ensure_ascii` in `json.dumps()`?**

When `ensure_ascii=True` (default), all non-ASCII characters in the output are escaped using `\uXXXX` sequences. When set to `False`, non-ASCII characters are preserved as-is. For example, `json.dumps({"name": "José"}, ensure_ascii=False)` outputs `{"name": "José"}` instead of `{"name": "Jos\u00e9"}`.

**5. How do you handle JSON parsing errors?**

Wrap `json.loads()` in a `try-except` block catching `json.JSONDecodeError` (a subclass of `ValueError`). This exception provides `msg`, `doc`, `pos`, `lineno`, and `colno` attributes for error reporting. Example: `try: data = json.loads(bad_json); except json.JSONDecodeError as e: print(f"Error at line {e.lineno}, column {e.colno}: {e.msg}")`.

## ⚠ Common Errors / Mistakes

**Error 1: Using single quotes in JSON strings**
```python
# BAD — JSON requires double quotes
json.loads("{'name': 'Alice'}")  # json.JSONDecodeError: Expecting property name

# FIX — use double quotes
json.loads('{"name": "Alice"}')  # OK
```

**Error 2: Trailing commas in JSON**
```python
# BAD — JSON does not allow trailing commas
json.loads('{"a": 1, "b": 2,}')  # json.JSONDecodeError

# FIX — remove trailing comma
json.loads('{"a": 1, "b": 2}')  # OK
```

**Error 3: Trying to serialize non-serializable types without encoder**
```python
# BAD — TypeError
data = {"time": datetime.now()}
json.dumps(data)  # TypeError: Object of type datetime is not JSON serializable

# FIX — provide default encoder
json.dumps(data, default=str)  # converts datetime to ISO string
```

**Error 4: Forgetting to close the file or using wrong mode**
```python
# BAD — writing to file opened in text read mode
with open("data.json", "r") as f:
    json.dump(data, f)  # TypeError or io.UnsupportedOperation

# FIX — use correct mode
with open("data.json", "w") as f:  # 'w' for write, 'r' for read
    json.dump(data, f)
```

**Error 5: Using NaN or Infinity values**
```python
import math

# BAD — JSON doesn't support NaN
json.dumps({"value": float("nan")})  # ValueError: Out of range float values are not JSON compliant

# FIX — convert to string or use allow_nan
json.dumps({"value": "NaN"}, allow_nan=False)  # Works with string
```

## 📝 Practice Exercises

**Beginner:**
1. Create a Python dictionary representing a book (title, author, year, genres as a list, is_published boolean). Serialize it to a JSON string with `indent=2`.
2. Parse the JSON string `'{"name": "Alice", "age": 25, "skills": ["Python", "SQL"]}'` back into a Python dictionary and print each key-value pair.
3. Write a program that reads a JSON file (create one manually) containing a list of products and prints the total price of all products.

**Intermediate:**
4. Write a function `merge_json(file1, file2, output)` that reads two JSON files (each containing a dictionary), merges them, and writes the result to an output file. Handle the case where both files have the same key by using the value from file2.
5. Create a `Student` class with `name`, `grades` (list), and `average` (computed property). Implement a custom JSON encoder that serializes Student objects, and a decoder that reconstructs them.
6. Write a program that reads a JSON array of transaction objects, filters for transactions above a certain amount, and writes the filtered results to a new JSON file with sorted keys.

**Advanced:**
7. Implement a JSON schema validator: given a JSON data file and a JSON schema file (defining required fields, types, min/max values), validate the data against the schema and report all violations.
8. Create a JSON diff tool: write a program that takes two JSON files, compares them recursively, and outputs the differences (added keys, removed keys, changed values) as a structured JSON report.
