## 5. SciPy Stats

## 📘 Introduction

The `scipy.stats` submodule is a comprehensive library for statistical computing. It provides a wide range of probability distributions (continuous and discrete), descriptive statistics functions, and hypothesis tests. It is the go-to Python library for statistical analysis, rivaling R's built-in statistical capabilities.

## 🧠 Key Concepts

- **Probability Distributions**: Each distribution is an object with methods:
  - `pdf(x)` / `pmf(k)` — Probability Density / Mass Function
  - `cdf(x)` — Cumulative Distribution Function
  - `ppf(q)` — Percent Point Function (inverse CDF, quantile function)
  - `rvs(size)` — Random Variates sampling
  - `mean()`, `var()`, `std()`, `median()` — distribution moments
- **Continuous Distributions**: `norm`, `uniform`, `expon`, `chi2`, `t`, `f`, `beta`, `gamma`, `lognorm`, `weibull_min`, and many more.
- **Discrete Distributions**: `binom`, `poisson`, `geom`, `hypergeom`, `nbinom`, `randint`.
- **Descriptive Statistics**: `describe()`, `skew()`, `kurtosis()`, `mode()`, `moment()`, `iqr()`, `gmean()`, `hmean()`.
- **Hypothesis Tests**:
  - **Parametric**: `ttest_ind` (independent), `ttest_rel` (paired), `ttest_1samp`
  - **Non-parametric**: `mannwhitneyu`, `wilcoxon`, `kruskal`
  - **Goodness-of-fit**: `chisquare`, `ks_2samp`, `normaltest`, `shapiro`, `anderson`
  - **Correlation**: `pearsonr`, `spearmanr`, `kendalltau`
- **Contingency Tables**: `chi2_contingency`, `fisher_exact`
- **Empirical Distribution**: `ecdf` (in newer versions)

## 💻 Syntax

```python
from scipy import stats
import numpy as np

# Distribution methods
norm = stats.norm(loc=0, scale=1)  # Standard normal
norm.pdf(0)       # PDF at x=0 → 0.3989
norm.cdf(1.96)    # CDF at x=1.96 → 0.975
norm.ppf(0.975)   # Inverse CDF → 1.96
norm.rvs(size=100)  # 100 random samples

# Other distributions
stats.binom(n=10, p=0.5).pmf(5)    # P(X=5) for Binom(10, 0.5)
stats.poisson(mu=3).cdf(2)          # P(X ≤ 2) for Poisson(3)
stats.expon(scale=2).rvs(100)       # Exponential random samples

# Descriptive stats
stats.describe(data)
stats.skew(data)    # Skewness
stats.kurtosis(data)  # Excess kurtosis
stats.mode(data)    # Mode and count

# Hypothesis tests
t_stat, p_val = stats.ttest_ind(group1, group2)
stat, p = stats.chisquare(observed, expected)
stat, p = stats.ks_2samp(sample1, sample2)
```

## ✅ Example 1 - Basic

**Problem:** Generate data from a normal distribution, overlay the theoretical PDF, compute descriptive statistics, and perform a normality test.

**Code:**
```python
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(42)
data = stats.norm.rvs(loc=5, scale=2, size=1000)

# Descriptive statistics
desc = stats.describe(data)
print("Descriptive Statistics:")
print(f"  n = {desc.nobs}")
print(f"  Min-Max = ({desc.minmax[0]:.2f}, {desc.minmax[1]:.2f})")
print(f"  Mean = {desc.mean:.3f}")
print(f"  Variance = {desc.variance:.3f}")
print(f"  Skewness = {desc.skewness:.3f}")
print(f"  Kurtosis = {desc.kurtosis:.3f}")

# Normality test (D'Agostino-Pearson)
stat, p_value = stats.normaltest(data)
print(f"\nNormality test:")
print(f"  Statistic = {stat:.3f}")
print(f"  p-value = {p_value:.3f}")
print(f"  Data is {'normal' if p_value > 0.05 else 'non-normal'} (α=0.05)")
```

**Output:**
```
Descriptive Statistics:
  n = 1000
  Min-Max = (-0.49, 10.96)
  Mean = 5.027
  Variance = 3.982
  Skewness = 0.069
  Kurtosis = -0.007

Normality test:
  Statistic = 1.044
  p-value = 0.593
  Data is normal (α=0.05)
```

**Explanation:**
We generate 1000 samples from N(5,2), compute descriptive statistics (close to true values 5 and 4), and run `normaltest` which tests the null hypothesis that the data is normally distributed. The high p-value (0.593) means we cannot reject normality.

## 🚀 Example 2 - Intermediate

**Problem:** An A/B test scenario — compare conversion rates of two website designs. Design A had 120 conversions out of 1500 visitors, Design B had 150 out of 1500. Use a two-proportion z-test via `chi2_contingency` and also use `ttest_ind` on binary data.

**Code:**
```python
import numpy as np
from scipy import stats

# A/B test data
conversions = np.array([[120, 1380],   # Design A: converted, not converted
                        [150, 1350]])  # Design B: converted, not converted

# Chi-square test of independence
chi2_stat, p_val, dof, expected = stats.chi2_contingency(conversions)

# Conversion rates
rate_a = conversions[0, 0] / conversions[0].sum()
rate_b = conversions[1, 0] / conversions[1].sum()

print("A/B Test Results:")
print(f"  Design A conversion rate: {rate_a:.4f} ({conversions[0,0]}/{conversions[0].sum()})")
print(f"  Design B conversion rate: {rate_b:.4f} ({conversions[1,0]}/{conversions[1].sum()})")
print(f"  Lift: {(rate_b - rate_a) / rate_a * 100:.2f}%")
print(f"\nChi-square test:")
print(f"  χ² = {chi2_stat:.3f}")
print(f"  df = {dof}")
print(f"  p-value = {p_val:.4f}")
print(f"  Expected frequencies:\n{expected}")

# Another approach: t-test on binary data
data_a = np.array([1] * 120 + [0] * 1380)
data_b = np.array([1] * 150 + [0] * 1350)
t_stat, t_pval = stats.ttest_ind(data_a, data_b)
print(f"\nTwo-sample t-test on binary data:")
print(f"  t = {t_stat:.3f}, p = {t_pval:.4f}")

alpha = 0.05
if p_val < alpha:
    print(f"\nConclusion: Significant difference (p={p_val:.4f} < {alpha})")
else:
    print(f"\nConclusion: No significant difference (p={p_val:.4f} >= {alpha})")
```

**Output:**
```
A/B Test Results:
  Design A conversion rate: 0.0800 (120/1500)
  Design B conversion rate: 0.1000 (150/1500)
  Lift: 25.00%

Chi-square test:
  χ² = 3.922
  df = 1
  p-value = 0.0476
  Expected frequencies:
 [[135. 1365.]
 [135. 1365.]]

Two-sample t-test on binary data:
  t = -1.981, p = 0.0476

Conclusion: Significant difference (p=0.0476 < 0.05)
```

**Explanation:**
We analyze A/B test data using two methods: a chi-square contingency table test and an independent t-test on binary data. Both yield p ≈ 0.048, indicating a statistically significant difference at α = 0.05. Design B's 25% relative lift is likely real.

## 🏢 Real World Use Case

**Clinical Trial Analysis:** A pharmaceutical company tests a new hypertension drug. Using `scipy.stats`:
- `ttest_ind` compares blood pressure reduction between treatment and placebo groups
- `mannwhitneyu` provides a non-parametric backup if data violates normality
- `chi2_contingency` analyzes adverse event frequencies across groups
- `pearsonr` correlates drug dosage with heart rate changes
- Normality assumptions are checked with `normaltest` and `shapiro` for each subgroup

## 🎯 Interview Questions

**Q1:** What is the difference between `ttest_ind` and `ttest_rel`?
**A:** `ttest_ind` is for two independent (unpaired) samples — different subjects in each group. `ttest_rel` is for paired samples — the same subjects measured twice (e.g., before/after treatment).

**Q2:** How do you compute the 95% confidence interval for the mean using `scipy.stats`?
**A:** Use `stats.t.interval(0.95, df=n-1, loc=mean, scale=se)` where `se = std / sqrt(n)`. Or compute manually: `mean ± t.ppf(0.975, df) * se`.

**Q3:** What does `normaltest` test and what is the null hypothesis?
**A:** It tests the null hypothesis that the data comes from a normal distribution using D'Agostino and Pearson's test, combining skewness and kurtosis. A small p-value (< 0.05) indicates non-normal data.

**Q4:** How do you generate 100 random samples from Binomial(10, 0.3)?
**A:** `stats.binom.rvs(n=10, p=0.3, size=100)` or `stats.binom(n=10, p=0.3).rvs(100)`.

**Q5:** Explain the `ks_2samp` test and what it returns.
**A:** The two-sample Kolmogorov-Smirnov test compares the empirical distributions of two samples to test if they come from the same distribution. It returns a statistic (maximum absolute difference between the two CDFs) and a p-value.

## ⚠ Common Errors / Mistakes

- **Confusing PDF and PMF**: Use `.pdf()` for continuous distributions (normal, exponential) and `.pmf()` for discrete distributions (binomial, Poisson).
- **Ignoring distribution parameters**: `stats.norm.pdf(0)` uses default loc=0, scale=1. Always specify `loc` and `scale` for non-standard distributions.
- **Misinterpreting p-values**: A p-value > 0.05 does not "prove" the null hypothesis — it only indicates insufficient evidence to reject it.
- **Forgetting `axis` parameter**: `stats.describe(data, axis=1)` for row-wise statistics; default is axis=0 for column-wise.
- **Multiple comparisons**: Running many hypothesis tests on the same data inflates Type I error. Use Bonferroni correction or other adjustments (`stats.multipletests`).

## 📝 Practice Exercises

**Beginner:**
1. Generate 500 samples from a standard normal distribution and compute its mean, variance, skewness, and kurtosis. Compare with theoretical values (0, 1, 0, 0).
2. For a Poisson distribution with μ = 3, compute P(X=2), P(X ≤ 2), and the number of events exceeded only 5% of the time (the 95th percentile).
3. Use `stats.pearsonr` to compute the correlation between two arrays: x = [1,2,3,4,5] and y = [2,4,6,8,10]. What do you expect the correlation to be?

**Intermediate:**
4. Generate two independent normal samples: N(0,1) and N(0.5,1) with 100 samples each. Use `ttest_ind` to detect the difference. Repeat 1000 times and count how often p < 0.05 (statistical power).
5. Use `stats.chisquare` to test if a six-sided die is fair. Simulate 600 rolls (fair die) and compute the chi-square statistic. Then repeat with a biased die (probability of 6 = 0.25, others = 0.15).
6. Perform a Mann-Whitney U test on two samples: one normal, one with outliers. Compare the result with a t-test. Which is more robust?

**Advanced:**
7. Implement a bootstrap confidence interval for the median of a sample using `stats.bootstrap` (or manually). Compare the bootstrap interval with the normal approximation interval for the mean using the same skewed dataset.
8. Build a function that performs a two-way ANOVA (factorial design) using `stats.f_oneway` — create a 2x2 design dataset, explain the limitations (no interaction term), and compare the results with a proper interaction model using `statsmodels`.
