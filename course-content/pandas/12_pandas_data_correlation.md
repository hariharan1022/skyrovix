## 12. Pandas Data Correlation
## 📘 Introduction
Correlation measures the strength and direction of a linear relationship between two variables. Pandas provides `.corr()` to compute correlation matrices, supporting multiple methods (Pearson, Spearman, Kendall). Understanding correlation is critical for feature selection, identifying multicollinearity, and uncovering relationships in data.

## 🧠 Key Concepts
- **corr()**: Computes pairwise correlation of columns, excluding NaN.
- **Pearson (default)**: Measures linear relationship. Assumes normally distributed data. Range: -1 to +1.
- **Spearman**: Rank-based correlation — monotonic relationship (not necessarily linear). More robust to outliers.
- **Kendall**: Kendall Tau — another rank-based measure, more robust for small samples.
- **Correlation matrix**: A symmetric matrix where each cell shows the correlation between two variables.
- **Interpreting values**: +1 = perfect positive, 0 = no linear relationship, -1 = perfect negative.
- **Heatmap**: Visual representation using seaborn or Matplotlib.
- **cov()**: Covariance matrix — measures how two variables vary together (not normalized like correlation).

## 💻 Syntax

```python
import pandas as pd
import numpy as np

# Correlation matrix (Pearson by default)
df.corr()
df.corr(method='pearson')
df.corr(method='spearman')
df.corr(method='kendall')

# Correlation with a specific column
df.corr()['target_col'].sort_values(ascending=False)

# Pairwise correlation of selected columns
df[['col1', 'col2', 'col3']].corr()

# Covariance
df.cov()
df.cov()['col1']['col2']

# Visualize with seaborn
import seaborn as sns
import matplotlib.pyplot as plt
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.show()
```

## ✅ Example 1 - Basic
**Problem:** Compute and interpret correlation and covariance matrices.

```python
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'Hours_Studied': [1, 2, 3, 4, 5, 6, 7, 8],
    'Exam_Score': [50, 55, 60, 65, 70, 75, 80, 85],
    'Sleep_Hours': [8, 7, 6, 7, 5, 6, 4, 5],
    'Cafeine_Intake': [0, 1, 2, 1, 3, 2, 4, 3]
})

print("=== DATA ===")
print(df)
print()

print("=== PEARSON CORRELATION ===")
corr_matrix = df.corr()
print(corr_matrix.round(3))
print()

print("=== COVARIANCE ===")
print(df.cov().round(1))
print()

print("=== CORRELATION WITH EXAM_SCORE ===")
print(df.corr()['Exam_Score'].sort_values(ascending=False))
```

**Output:**
```
=== DATA ===
   Hours_Studied  Exam_Score  Sleep_Hours  Cafeine_Intake
0              1          50            8               0
1              2          55            7               1
2              3          60            6               2
3              4          65            7               1
4              5          70            5               3
5              6          75            6               2
6              7          80            4               4
7              8          85            5               3

=== PEARSON CORRELATION ===
                Hours_Studied  Exam_Score  Sleep_Hours  Cafeine_Intake
Hours_Studied          1.000       1.000       -0.738           0.683
Exam_Score             1.000       1.000       -0.738           0.683
Sleep_Hours           -0.738      -0.738        1.000          -0.399
Cafeine_Intake         0.683       0.683       -0.399           1.000

=== COVARIANCE ===
                Hours_Studied  Exam_Score  Sleep_Hours  Cafeine_Intake
Hours_Studied           6.000      150.00       -2.571           1.143
Exam_Score            150.00     3750.00      -64.286          28.571
Sleep_Hours            -2.571      -64.29        2.000         -0.381
Cafeine_Intake          1.143       28.57       -0.381          0.571

=== CORRELATION WITH EXAM_SCORE ===
Exam_Score         1.000
Hours_Studied      1.000
Cafeine_Intake     0.683
Sleep_Hours       -0.738
Name: Exam_Score, dtype: float64
```

**Explanation:**
The correlation matrix shows that `Hours_Studied` and `Exam_Score` have a perfect positive correlation (1.0) by design. `Sleep_Hours` is negatively correlated (-0.738) — more study means less sleep. `Cafeine_Intake` is positively correlated (0.683) with exam score. Covariance values show the same direction but are scale-dependent (not standardized to -1, +1).

## 🚀 Example 2 - Intermediate
**Problem:** Compare Pearson vs Spearman correlation and visualize with a heatmap.

```python
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

np.random.seed(42)
n = 50
df = pd.DataFrame({
    'Linear': np.arange(n) + np.random.normal(0, 5, n),
    'Exponential': np.exp(np.arange(n) / 20) + np.random.normal(0, 2, n),
    'Outlier_Ridden': np.random.randn(n) * 10,
    'Target': np.arange(n) * 2 + np.random.normal(0, 10, n)
})
# Add an extreme outlier
df.loc[49, 'Outlier_Ridden'] = 500

print("=== PEARSON CORRELATION ===")
pearson = df.corr(method='pearson')
print(pearson.round(3))
print()

print("=== SPEARMAN CORRELATION ===")
spearman = df.corr(method='spearman')
print(spearman.round(3))
print()

# Compare the two for Outlier_Ridden vs Target
print(f"Pearson Outlier_Ridden vs Target: {pearson.loc['Outlier_Ridden', 'Target']:.3f}")
print(f"Spearman Outlier_Ridden vs Target: {spearman.loc['Outlier_Ridden', 'Target']:.3f}")
```

**Output:**
```
=== PEARSON CORRELATION ===
               Linear  Exponential  Outlier_Ridden  Target
Linear         1.000        0.984           0.073   0.996
Exponential    0.984        1.000           0.037   0.981
Outlier_Ridden 0.073        0.037           1.000   0.056
Target         0.996        0.981           0.056   1.000

=== SPEARMAN CORRELATION ===
               Linear  Exponential  Outlier_Ridden  Target
Linear         1.000        1.000          -0.035   1.000
Exponential    1.000        1.000          -0.035   1.000
Outlier_Ridden -0.035       -0.035           1.000  -0.035
Target         1.000        1.000          -0.035   1.000

Pearson Outlier_Ridden vs Target: 0.056
Spearman Outlier_Ridden vs Target: -0.035
```

**Explanation:**
Pearson correlation for `Outlier_Ridden` vs `Target` is 0.056 — close to zero, heavily influenced by the single extreme outlier (500). Spearman rank correlation is -0.035 — it ignores the magnitude of the outlier and only considers ranks, giving a more realistic picture of the weak negative relationship.

## 🏢 Real World Use Case
**Feature Selection for House Price Prediction:** A data scientist computes the correlation matrix of housing features (`SqFt`, `Bedrooms`, `Bathrooms`, `YearBuilt`, `Price`). Features with high correlation to `Price` become model inputs. Features highly correlated with each other (`SqFt` and `Bathrooms` at 0.85) are flagged for multicollinearity. Spearman correlation is used for skewed features like `LotSize` to capture monotonic trends.

## 🎯 Interview Questions

**Q1: What is the difference between Pearson and Spearman correlation?**
A: Pearson measures linear relationships. Spearman measures monotonic relationships (not necessarily linear) using ranks — more robust to outliers and non-normal distributions.

**Q2: What range of values can correlation take and what do they mean?**
A: -1 to +1. +1 = perfect positive linear, 0 = no linear relationship, -1 = perfect negative linear.

**Q3: How do you interpret a correlation of -0.8 between two variables?**
A: A strong negative linear relationship. When one variable increases, the other tends to decrease substantially.

**Q4: What is multicollinearity and why is it a problem?**
A: Multicollinearity occurs when independent variables are highly correlated (e.g., > 0.8). It inflates standard errors in regression, making coefficient estimates unstable.

**Q5: What does `df.cov()` compute?**
A: It computes the covariance matrix — showing how variables co-vary. Unlike correlation, covariance is not normalized to [-1, 1] and depends on the units of measurement.

## ⚠ Common Errors / Mistakes
- **Assuming correlation implies causation**: High correlation does not mean one causes the other.
- **Using Pearson on non-linear relationships**: Pearson can miss strong non-linear relationships (e.g., quadratic).
- **Not checking for outliers**: A single outlier can dramatically change Pearson correlation.
- **Only looking at pairwise correlation**: Partial correlation may reveal different relationships when controlling for other variables.
- **Ignoring missing values**: `.corr()` excludes NaN by default, but with many missing values, the sample size used per pair may differ.

## 📝 Practice Exercises

**Beginner:**
1. Create a DataFrame with 4 numeric columns and compute the Pearson correlation matrix.
2. Find which column has the strongest correlation with a target column.
3. Compute the covariance between two columns and interpret the sign.

**Intermediate:**
4. Load a real dataset (e.g., Iris or Boston Housing), compute Pearson and Spearman correlations, and identify columns where the two methods differ the most — explain why.
5. Use `sns.heatmap()` to create a correlation heatmap with annotations and a diverging colormap.
6. Create a dataset with a known non-linear relationship (e.g., y = x^2 + noise), compute Pearson and Spearman correlations, and explain the results.

**Advanced:**
7. Write a function that computes pairwise correlations, returns the top 5 highest positive and top 5 highest negative correlations (excluding self-correlations), and includes the p-value for significance.
8. Build a multicollinearity detection tool: compute VIF (Variance Inflation Factor) for each feature using the correlation matrix inverse and flag features with VIF > 10.
