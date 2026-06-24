# 16. Python Sets

## 📘 Introduction
A **set** is an unordered collection of **unique**, **hashable** elements. Created with curly braces `{1, 2, 3}` or the `set()` constructor, sets are optimized for membership testing, deduplication, and mathematical set operations. Unlike lists and tuples, sets do not maintain element order and do not allow duplicates — adding an existing element simply has no effect. Sets are mutable: elements can be added (`add()`) or removed (`remove()`, `discard()`, `pop()`, `clear()`). However, set elements themselves must be immutable (hashable), so you can have a set of tuples but not a set of lists. The real power of sets lies in their mathematical operations: **union** (`|`), **intersection** (`&`), **difference** (`-`), and **symmetric difference** (`^`), along with their method equivalents. Python also provides **frozenset** — an immutable, hashable version of a set that can be used as a dictionary key or set element.

## 🧠 Key Concepts

- **Unordered**: Elements have no defined order; you cannot index or slice a set
- **Unique**: No duplicates allowed. Adding an existing element is silently ignored
- **Mutable**: Can add/remove elements, but elements must be hashable (immutable)
- **Creating Sets**: `s = {1, 2, 3}`, `s = set([1, 2, 3])`. Empty set: `s = set()` (not `{}` which is an empty dict)
- **Membership Testing**: `x in set` is O(1) average — much faster than lists O(n)
- **Add/Remove**: `s.add(x)`, `s.remove(x)` (raises KeyError if missing), `s.discard(x)` (no error), `s.pop()` (removes and returns arbitrary element), `s.clear()`
- **Set Operations**: `|` (union), `&` (intersection), `-` (difference), `^` (symmetric difference). Also methods: `union()`, `intersection()`, `difference()`, `symmetric_difference()`
- **Comparison Operators**: `<=` (subset), `<` (proper subset), `>=` (superset), `>` (proper superset)
- **Frozenset**: `frozenset([1, 2, 3])` — immutable, hashable version of a set
- **Common Use Cases**: Removing duplicates, membership tests, finding common/different elements between collections

## 💻 Syntax

```python
# Creating sets
s1 = {1, 2, 3, 3, 2}      # {1, 2, 3} — duplicates removed
s2 = set([4, 5, 6, 5])    # {4, 5, 6}
s3 = set("hello")          # {'h', 'e', 'l', 'o'} — unordered!
empty = set()              # NOT {} which is a dict

# Adding and removing
s = {1, 2, 3}
s.add(4)                   # {1, 2, 3, 4}
s.add(2)                   # {1, 2, 3, 4} — no effect, already exists
s.remove(3)                # {1, 2, 4}
s.discard(10)              # no error even if 10 doesn't exist
s.pop()                    # removes and returns an arbitrary element

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)               # union: {1, 2, 3, 4, 5, 6}
print(a & b)               # intersection: {3, 4}
print(a - b)               # difference: {1, 2}
print(b - a)               # difference: {5, 6}
print(a ^ b)               # symmetric diff: {1, 2, 5, 6}

# Comparison
print({1, 2} <= {1, 2, 3})    # subset: True
print({1, 2, 3} >= {1, 2})    # superset: True
print({1, 2} < {1, 2, 3})     # proper subset: True
print({1, 2} < {1, 2})        # False — not proper

# Frozenset
fs = frozenset([1, 2, 3])
# fs.add(4)    # AttributeError! frozenset is immutable
d = {fs: "immutable set key"}  # valid — frozenset is hashable
```

## ✅ Example 1 - Basic

**Problem**: Given two lists of user IDs (e.g., users who liked post A and users who liked post B), find users who liked both, users who liked only A, and total unique users.

**Code**:
```python
post_a = [101, 102, 103, 104, 105]
post_b = [103, 104, 106, 107]

set_a = set(post_a)
set_b = set(post_b)

both = set_a & set_b        # intersection
only_a = set_a - set_b      # difference
unique = set_a | set_b      # union

print(f"Liked both: {both}")
print(f"Liked only post A: {only_a}")
print(f"Total unique users: {len(unique)}")
```

**Output**:
```
Liked both: {103, 104}
Liked only post A: {101, 102, 105}
Total unique users: 7
```

**Explanation**: Converting lists to sets removes potential duplicates and enables mathematical set operations. `&` finds common users, `-` finds exclusive users, `|` finds all unique users. This pattern is used in social media analytics, A/B testing, and recommendation systems.

## 🚀 Example 2 - Intermediate

**Problem**: Find all unique words in a text file, along with words that appear in both of two documents.

**Code**:
```python
def words_set(text: str) -> set:
    return set(text.lower().split())

doc1 = "Python is great. Python is easy to learn."
doc2 = "Java is also great. Java is powerful."

words1 = words_set(doc1)
words2 = words_set(doc2)

common = words1 & words2
only_in_doc1 = words1 - words2
only_in_doc2 = words2 - words1
all_words = words1 | words2

print(f"Common words: {common}")
print(f"Unique to doc1: {only_in_doc1}")
print(f"Unique to doc2: {only_in_doc2}")
print(f"Total unique words: {len(all_words)}")

# Check if a word exists (O(1))
print(f"'Python' in doc1? {'python' in words1}")
```

**Output**:
```
Common words: {'great', 'is', 'also'}
Unique to doc1: {'learn', 'python', 'easy', 'to'}
Unique to doc2: {'java', 'powerful'}
Total unique words: 10
'Python' in doc1? True
```

**Explanation**: The `words_set` function converts text to lowercase and splits into words, then creates a set for uniqueness and fast lookup. Set operations compare vocabulary between documents. `in` membership testing on sets is O(1) vs O(n) for lists. This is the foundation for text comparison, plagiarism detection, and search indexing.

## 🏢 Real World Use Case

**Company**: GitHub

**Scenario**: GitHub uses sets for collaborative features. When checking permissions on a repository, GitHub computes the set of users who have access via direct membership, team membership, and organization membership, then uses set union to determine the complete access list. For notifications, subscribers and mentioners are sets — intersection shows who gets a single notification instead of duplicates. When suggesting reviewers, GitHub uses set operations: `(changed_files_owners ∩ team_members) - already_requested`. Frozensets are used for caching permission snapshots since they're hashable and can be dictionary keys. Branch protection rules are checked via set membership — is this user in the `allowed_push` set?

## 🎯 Interview Questions

**1. How are sets implemented in Python?**
Sets are implemented using hash tables (similar to dictionaries but without values). Each element is hashed, and the hash determines its bucket. This gives O(1) average time for add, remove, and membership testing. The hash table is resized when the load factor exceeds a threshold.

**2. What is the difference between `remove()` and `discard()` on a set?**
Both remove an element from the set. `remove(x)` raises a `KeyError` if `x` is not present. `discard(x)` does nothing if `x` is not found — it silently returns. Use `remove()` when the element must exist; use `discard()` when absence is acceptable.

**3. Why can't a list be an element of a set?**
Set elements must be hashable (immutable). Lists are mutable and not hashable — `hash([1,2])` raises `TypeError`. This prevents a situation where a list inside a set could be modified, breaking the set's internal hash table invariants. Use `tuple` instead.

**4. What is a frozenset and when would you use it?**
A `frozenset` is an immutable, hashable version of a set. Use it when you need a set that can itself be an element of another set or a key in a dictionary. Common uses include caching, storing state combinations, and representing fixed groups in configuration.

**5. What is the time complexity of `in` for a set vs a list?**
Sets: O(1) average (hash table lookup). Lists: O(n) (linear scan). For large collections, sets should be used when frequent membership testing is required. The trade-off is that sets use more memory and don't maintain order.

## ⚠ Common Errors / Mistakes

**Error**: Using `{}` to create an empty set
```python
s = {}           # Creates a dict, not a set!
print(type(s))   # <class 'dict'>
```
**Fix**: Use `s = set()` for an empty set.

**Error**: Attempting to add mutable objects to a set
```python
s = set()
s.add([1, 2])    # TypeError: unhashable type: 'list'
```
**Fix**: Use immutable equivalents: `s.add((1, 2))` (tuple instead of list).

**Error**: Assuming sets maintain order
```python
print({3, 1, 2})   # Could be {1, 2, 3} or any order — unreliable!
```
**Fix**: If order matters, use `list(dict.fromkeys(iterable))` (Python 3.7+) or `sorted()`.

**Error**: Modifying a set while iterating over it
```python
s = {1, 2, 3, 4, 5}
for x in s:
    if x % 2 == 0:
        s.remove(x)    # RuntimeError: Set changed size during iteration
```
**Fix**: Iterate over a copy: `for x in s.copy():` or build a new set: `s = {x for x in s if x % 2 != 0}`

**Error**: Confusing set operations with sequence operations
```python
a = {1, 2, 3}
b = {1, 2}
print(a + b)    # TypeError! Sets don't support +
```
**Fix**: Use `a | b` for union, `a - b` for difference. No + operator.

## 📝 Practice Exercises

**Beginner:**

1. Create a set from the list `[1, 2, 2, 3, 4, 4, 5]` and print it. Notice duplicates removed.
2. Write a program that takes two strings and prints the letters that appear in both (intersection).
3. Given a set of numbers, add user input to the set and print whether the number was already present.

**Intermediate:**

4. Write a function `has_duplicates(lst)` that returns `True` if a list contains any duplicate elements (use set).
5. Given a list of email addresses, remove duplicates while preserving the original order.
6. Write a function `unique_characters(words)` that returns a set of all characters used across a list of words.

**Advanced:**

7. Implement a function `jaccard_similarity(set1, set2)` that computes the Jaccard index: `|A ∩ B| / |A ∪ B|`. Use this to compare two text documents.
8. Given a list of sets (each representing a person's skill set), find the smallest set of people whose combined skills cover all required skills (set cover problem — approximate solution is acceptable).
