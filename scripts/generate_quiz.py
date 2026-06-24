import os, json, re, random

base = r"C:\Users\HARIHARAN S\OneDrive\Desktop\inten hub\skyrovix-pathway\course-content"
courses = {
    "mysql": os.path.join(base, "mysql"),
    "django": os.path.join(base, "django"),
    "numpy": os.path.join(base, "numpy"),
}

def read_files(dirpath):
    texts = {}
    if not os.path.isdir(dirpath):
        return texts
    for fname in sorted(os.listdir(dirpath)):
        if fname.endswith(".md"):
            fpath = os.path.join(dirpath, fname)
            with open(fpath, "r", encoding="utf-8") as f:
                texts[fname] = f.read()
    return texts

def extract_sentences(text):
    text = re.sub(r"#{1,6}\s+", "", text)
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"[-*]\s+", "", text)
    text = re.sub(r"\n+", " ", text)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    return [s.strip() for s in sentences if len(s.strip()) > 30]

def extract_key_terms(text):
    terms = set()
    for m in re.finditer(r"`([^`]+)`", text):
        t = m.group(1).strip()
        if 2 < len(t) < 60:
            terms.add(t)
    for m in re.finditer(r"\*\*([^*]+)\*\*", text):
        t = m.group(1).strip()
        if 2 < len(t) < 60:
            terms.add(t)
    return list(terms)

def make_wrong_options(correct, key_terms, all_sentences, n=3):
    wrongs = []
    pool = []
    pool.extend(key_terms)
    for s in all_sentences:
        for w in re.findall(r"\b[A-Z][a-z]+\b", s):
            if 3 < len(w) < 40 and w != correct:
                pool.append(w)
    random.shuffle(pool)
    for w in pool:
        if w.lower() != correct.lower() and len(wrongs) < n:
            wrongs.append(w)
    while len(wrongs) < n:
        wrongs.append(f"None of the above")
    return wrongs[:n]

def generate_questions(course_name, texts, count=100):
    all_text = " ".join(texts.values())
    sentences = extract_sentences(all_text)
    key_terms = extract_key_terms(all_text)
    random.shuffle(sentences)
    random.shuffle(key_terms)

    questions = []
    used_q_texts = set()
    qid = 0

    # Type 1: Fill-in-the-blank / definition from key terms
    for term in key_terms:
        if qid >= count:
            break
        # find a sentence containing this term
        context_sent = None
        for s in sentences:
            if term.lower() in s.lower():
                context_sent = s
                break
        if context_sent is None:
            continue
        q_text = context_sent.replace(term, "______")
        if q_text in used_q_texts or len(q_text) < 15:
            continue
        used_q_texts.add(q_text)
        wrongs = make_wrong_options(term, key_terms, sentences, 3)
        opts = [term] + wrongs
        random.shuffle(opts)
        correct_idx = opts.index(term)
        explanation = f"{term} refers to the concept described in the context of {course_name}."
        questions.append({
            "id": f"{course_name}-{qid+1}",
            "question": q_text,
            "options": opts,
            "correct_index": correct_idx,
            "marks": 1,
            "explanation": explanation
        })
        qid += 1

    # Type 2: Direct questions from sentences
    for s in sentences:
        if qid >= count:
            break
        words = re.findall(r"\b[A-Za-z]\w+\b", s)
        if len(words) < 5:
            continue
        # pick a key noun to blank out
        candidates = [w for w in words if w[0].isupper() and len(w) > 3 and w.lower() not in ("the", "this", "that", "with", "from")]
        if not candidates:
            candidates = [w for w in words if len(w) > 4 and w.lower() not in ("the", "this", "that", "with", "from", "there", "their")]
        if not candidates:
            continue
        answer = random.choice(candidates)
        if answer in key_terms:
            continue  # already handled above
        q_text = s.replace(answer, "______", 1)
        if q_text in used_q_texts or len(q_text) < 20:
            continue
        used_q_texts.add(q_text)
        wrongs = make_wrong_options(answer, key_terms, sentences, 3)
        opts = [answer] + wrongs
        random.shuffle(opts)
        correct_idx = opts.index(answer)
        explanation = f"In {course_name}, {answer} is used in the context: '{s[:80]}...'"
        questions.append({
            "id": f"{course_name}-{qid+1}",
            "question": q_text,
            "options": opts,
            "correct_index": correct_idx,
            "marks": 1,
            "explanation": explanation
        })
        qid += 1

    # Type 3: Concept-based questions
    concept_prompts = []
    if course_name == "mysql":
        concept_prompts = [
            ("Which SQL clause is used to filter records?", "WHERE", ["HAVING", "ORDER BY", "GROUP BY", "FILTER"]),
            ("Which statement is used to update data in MySQL?", "UPDATE", ["ALTER", "MODIFY", "CHANGE", "REPLACE"]),
            ("What does the JOIN clause do in MySQL?", "Combines rows from two or more tables", ["Deletes duplicate rows", "Creates a new table", "Orders the result set", "Filters records"]),
            ("Which MySQL function returns the number of rows?", "COUNT()", ["SUM()", "AVG()", "MAX()", "TOTAL()"]),
            ("What is a primary key in MySQL?", "A unique identifier for each row", ["A foreign key reference", "An index on a column", "A type of join", "A constraint for sorting"]),
            ("Which keyword prevents duplicate values in MySQL?", "DISTINCT", ["UNIQUE", "DIFFERENT", "EXCEPT", "FILTER"]),
            ("What does the GROUP BY clause do?", "Groups rows that have same values", ["Orders rows alphabetically", "Filters grouped data", "Joins tables", "Creates indexes"]),
            ("Which operator is used for pattern matching in MySQL?", "LIKE", ["MATCH", "SIMILAR", "PATTERN", "COMPARE"]),
            ("What does a FOREIGN KEY ensure?", "Referential integrity", ["Data uniqueness", "No null values", "Faster queries", "Auto-increment"]),
            ("Which command removes a table from database?", "DROP TABLE", ["DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE", "ERASE TABLE"]),
            ("What does AUTO_INCREMENT do in MySQL?", "Automatically generates unique numbers", ["Speeds up queries", "Creates indexes", "Validates input", "Encrypts data"]),
            ("What is the purpose of an INDEX in MySQL?", "Faster data retrieval", ["Data encryption", "Data validation", "Referential integrity", "Automatic backup"]),
            ("Which clause is used with GROUP BY to filter groups?", "HAVING", ["WHERE", "FILTER", "EXCEPT", "MATCH"]),
        ]
    elif course_name == "django":
        concept_prompts = [
            ("What is Django primarily used for?", "Web application development", ["Data analysis", "Game development", "Mobile apps", "Desktop apps"]),
            ("Which command creates a new Django project?", "django-admin startproject", ["django-admin createproject", "python manage.py initproject", "django start project", "python -m django new"]),
            ("What is a Django model?", "A database table representation", ["A view function", "A URL pattern", "A template file", "A middleware class"]),
            ("What does the Django ORM do?", "Maps Python objects to database tables", ["Renders HTML templates", "Handles HTTP requests", "Manages user sessions", "Validates forms"]),
            ("Which file maps URLs to views in Django?", "urls.py", ["views.py", "models.py", "settings.py", "apps.py"]),
            ("What is a Django View?", "A function that handles HTTP requests", ["A database table", "A URL pattern", "An HTML template", "A CSS stylesheet"]),
            ("What is the Django Admin interface?", "An auto-generated admin panel", ["A command-line tool", "A database manager", "An API framework", "A testing tool"]),
            ("What is a Django migration?", "Changes to database schema over time", ["Moving files between servers", "Upgrading Python version", "Transferring user data", "Copying templates"]),
            ("What does the template language use for variables?", "{{ }}", ["{% %}", "{# #}", "{{% %}}", "[[ ]]"]),
            ("What is a Django Form?", "Handles HTML form validation", ["A database query", "An HTTP response", "A URL dispatcher", "A middleware hook"]),
            ("What does python manage.py runserver do?", "Starts the development server", ["Runs database migrations", "Creates a new app", "Collects static files", "Runs tests"]),
            ("Which file contains Django project settings?", "settings.py", ["config.py", "env.py", "app.py", "django.conf"]),
        ]
    elif course_name == "numpy":
        concept_prompts = [
            ("What is a NumPy array?", "A multi-dimensional array object", ["A list of strings", "A dictionary of numbers", "A tuple of values", "A set of elements"]),
            ("What does np.array() do?", "Creates an array from a list", ["Converts array to list", "Computes array mean", "Reshapes an array", "Sorts array elements"]),
            ("Which attribute gives the shape of a NumPy array?", ".shape", [".size", ".dtype", ".ndim", ".len"]),
            ("What does np.arange(5) return?", "Array with values 0,1,2,3,4", ["Array with value 5", "Array 0 to 5 step 2", "Array 1 to 5", "Error"]),
            ("What is broadcasting in NumPy?", "Operating on arrays of different shapes", ["Sending data over network", "Printing array to console", "Converting data types", "Sorting elements"]),
            ("What does np.reshape() do?", "Changes array dimensions", ["Changes data type", "Flattens the array", "Reverses the array", "Concatenates arrays"]),
            ("Which function generates random numbers in NumPy?", "np.random.rand()", ["np.random()", "np.randint()", "np.sample()", "np.number()"]),
            ("What does np.dot() compute?", "Dot product of two arrays", ["Element-wise product", "Sum of elements", "Standard deviation", "Cumulative sum"]),
            ("What is the difference between np.sum() and np.cumsum()?", "cumsum returns cumulative sum", ["They are identical", "sum works on 1D only", "cumsum works on 2D only", "sum returns array"]),
            ("What does np.linspace(0,1,5) generate?", "5 evenly spaced numbers 0 to 1", ["5 random numbers", "Numbers 0 through 5", "1 number 0.5", "Error"]),
            ("What does ndim attribute represent?", "Number of dimensions", ["Number of elements", "Size of array", "Data type", "Memory size"]),
            ("Which function stacks arrays vertically?", "np.vstack()", ["np.hstack()", "np.stack()", "np.concat()", "np.append()"]),
        ]

    for prompt, answer, wrongs_list in concept_prompts:
        if qid >= count:
            break
        q_text = prompt
        if q_text in used_q_texts:
            continue
        used_q_texts.add(q_text)
        opts = [answer] + wrongs_list[:3]
        random.shuffle(opts)
        correct_idx = opts.index(answer)
        questions.append({
            "id": f"{course_name}-{qid+1}",
            "question": q_text,
            "options": opts,
            "correct_index": correct_idx,
            "marks": 1,
            "explanation": f"{answer} is correct for this {course_name} concept."
        })
        qid += 1

    # Fill remaining with simple recall questions
    fallback_pool = []
    for s in sentences:
        words = re.findall(r"\b[A-Za-z]\w+\b", s)
        if len(words) >= 8:
            fallback_pool.append(s)

    while qid < count and fallback_pool:
        s = random.choice(fallback_pool)
        fallback_pool.remove(s)
        words = re.findall(r"\b[A-Za-z]\w+\b", s)
        if len(words) < 6:
            continue
        answer = random.choice([w for w in words if len(w) > 4])
        q_text = f"What is described by: '{s[:100]}...'?"
        if q_text in used_q_texts:
            continue
        used_q_texts.add(q_text)
        wrongs = make_wrong_options(answer, key_terms, sentences, 3)
        opts = [answer] + wrongs
        random.shuffle(opts)
        correct_idx = opts.index(answer)
        questions.append({
            "id": f"{course_name}-{qid+1}",
            "question": q_text,
            "options": opts,
            "correct_index": correct_idx,
            "marks": 1,
            "explanation": f"This relates to {answer} in {course_name}."
        })
        qid += 1

    return questions[:count]

all_questions = []
random.seed(42)

for course_name, dirpath in courses.items():
    texts = read_files(dirpath)
    print(f"{course_name}: read {len(texts)} files")
    if not texts:
        print(f"WARNING: No files found for {course_name} at {dirpath}")
    qs = generate_questions(course_name, texts, 100)
    print(f"{course_name}: generated {len(qs)} questions")
    all_questions.extend(qs)

outpath = r"C:\Users\HARIHARAN S\OneDrive\Desktop\inten hub\skyrovix-pathway\scripts\quiz-mysql-django-numpy.json"
with open(outpath, "w", encoding="utf-8") as f:
    json.dump(all_questions, f, indent=2, ensure_ascii=False)

# Validate
with open(outpath, "r", encoding="utf-8") as f:
    data = json.load(f)
print(f"Total questions written: {len(data)}")
print(f"Valid JSON: True")
print(f"Output: {outpath}")
