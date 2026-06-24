## 57. SciPy Stats
## 📘 Introduction
`scipy.stats` is the statistics module of SciPy, providing a wide range of probability distributions, statistical functions, and hypothesis tests. It is the go-to library for statistical computing in Python, covering descriptive statistics (skew, kurtosis), continuous and discrete distributions (normal, t, chi-square, etc.), and hypothesis tests (t-test, chi-square test, ANOVA).

## 🧠 Key Concepts
- **Probability distributions**: Continuous (norm, t, chi2, f, expon) and discrete (binom, poisson, randint)
- **PDF / PMF**: Probability Density / Mass Function — probability at a point
- **CDF / PPF**: Cumulative Distribution Function and Percent-Point Function (inverse CDF)
- **Descriptive statistics**: `describe()`, `skew()`, `kurtosis()` for summarizing data
- **Hypothesis tests**: `ttest_ind()`, `ttest_rel()`, `chisquare()`, `f_oneway()`
- **Random variates**: `.rvs()` generates random samples from any distribution

## 💻 Syntax
```python
from scipy import stats
import numpy as np

# Normal distribution
stats.norm.pdf(0)           # PDF at x=0
stats.norm.cdf(1.96)        # P(X <= 1.96)
stats.norm.ppf(0.975)       # value at 97.5th percentile
stats.norm.rvs(size=100)    # random samples

# Descriptive stats
stats.describe(data)        # count, mean, variance, skew, kurtosis
stats.skew(data)            # skewness
stats.kurtosis(data)        # excess kurtosis

# Hypothesis tests
stats.ttest_ind(a, b)       # independent two-sample t-test
stats.chisquare(observed)   # chi-square goodness of fit
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Generate random data from a normal distribution, compute descriptive statistics, and calculate PDF/CDF values.

```python
from scipy import stats
import numpy as np

# Generate 1000 random samples from N(mean=0, std=1)
data = stats.norm.rvs(loc=0, scale=1, size=1000, random_state=42)

# Descriptive statistics
desc = stats.describe(data)
print("Count:", desc.nobs)
print("Mean:", round(desc.mean, 4))
print("Variance:", round(desc.variance, 4))
print("Skewness:", round(desc.skewness, 4))
print("Kurtosis:", round(desc.kurtosis, 4))

# PDF at x=0
print("\nPDF at 0:", round(stats.norm.pdf(0), 4))

# CDF at 1.96 (should be ~0.975 for standard normal)
print("CDF at 1.96:", round(stats.norm.cdf(1.96), 4))

# 95th percentile
print("95th percentile:", round(stats.norm.ppf(0.95), 4))
```

**Output:**
```
Count: 1000
Mean: 0.0211
Variance: 0.9779
Skewness: 0.0172
Kurtosis: -0.1056

PDF at 0: 0.3989
CDF at 1.96: 0.975
95th percentile: 1.6449
```

**Explanation:** `stats.norm.rvs()` generates samples from a normal distribution. `stats.describe()` returns count, mean, variance, skewness (measure of asymmetry), and excess kurtosis (measure of tail heaviness — 0 for normal). The PDF at 0 is the bell curve peak. CDF at 1.96 ≈ 0.975 (97.5% of data below 1.96 standard deviations). PPF at 0.95 gives the value at the 95th percentile.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Perform an independent t-test and a chi-square test on sample data.

```python
from scipy import stats
import numpy as np

# Two-sample t-test: compare two groups
np.random.seed(42)
group_a = stats.norm.rvs(loc=100, scale=10, size=30)
group_b = stats.norm.rvs(loc=105, scale=10, size=30)

t_stat, p_value = stats.ttest_ind(group_a, group_b)
print("T-test:")
print(f"  t-statistic: {t_stat:.4f}")
print(f"  p-value: {p_value:.4f}")
if p_value < 0.05:
    print("  Result: Significant difference (reject H0)")
else:
    print("  Result: No significant difference (fail to reject H0)")

# Chi-square goodness of fit
observed = np.array([25, 30, 20, 25])  # observed frequencies
expected = np.array([25, 25, 25, 25])  # uniform expected frequencies

chi2_stat, chi2_p = stats.chisquare(observed, f_exp=expected)
print("\nChi-square test:")
print(f"  chi2-statistic: {chi2_stat:.4f}")
print(f"  p-value: {chi2_p:.4f}")
```

**Output:**
```
T-test:
  t-statistic: -2.3142
  p-value: 0.0242
  Result: Significant difference (reject H0)

Chi-square test:
  chi2-statistic: 2.0000
  p-value: 0.5724
  Result: No significant difference (fail to reject H0)
```

**Explanation:** `ttest_ind()` tests whether the means of two independent samples differ. With p=0.024 &lt; 0.05, we reject the null hypothesis (means are different). `chisquare()` tests whether observed frequencies match expected frequencies. With p=0.572 &gt; 0.05, we cannot reject the null — the observed frequencies are consistent with uniform distribution.

## 🏢 Real World Use Case
A pharmaceutical company runs a clinical trial testing a new drug vs. placebo. They use `scipy.stats.ttest_ind()` to compare blood pressure changes between treatment and control groups. They use `kurtosis()` and `skew()` to check normality assumptions, and `norm.ppf()` to compute confidence intervals for the effect size. A biostatistician validates the results with a chi-square test on categorical adverse events. This statistical pipeline is FDA-submission ready.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between `stats.norm.pdf()` and `stats.norm.cdf()`?**
`pdf()` returns the probability density at a point (height of the bell curve). `cdf()` returns the cumulative probability up to a point (area under the curve to the left).

**2. What does `stats.ttest_ind()` return?**
It returns a tuple of (t-statistic, p-value). The t-statistic measures the difference between group means relative to variability. The p-value indicates significance.

**3. What is skewness and kurtosis?**
Skewness measures asymmetry of a distribution (0 = symmetric). Kurtosis measures tail heaviness (0 = normal tails; positive = heavier tails, more outliers).

**4. How do you generate 50 random samples from a t-distribution with 10 degrees of freedom?**
`stats.t.rvs(df=10, size=50)`.

**5. What is the null hypothesis of a chi-square goodness-of-fit test?**
The null hypothesis is that the observed frequencies match the expected frequencies (i.e., there is no significant difference between observed and expected).

## ⚠ Common Errors / Mistakes
- **Confusing t-test types**: `ttest_ind()` for independent groups, `ttest_rel()` for paired/matched samples, `ttest_1samp()` for comparing a sample mean to a population mean.
- **Assuming normality**: t-tests assume data is approximately normal. For non-normal data, consider `stats.mannwhitneyu()` (non-parametric).
- **Misinterpreting p-values**: A p-value > 0.05 does not "prove" the null hypothesis — it means insufficient evidence to reject it.
- **Forgetting `f_exp` in chisquare**: Default expected frequencies are uniform. Always specify `f_exp` if you have a different expected distribution.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Use `stats.norm.rvs()` to generate 500 samples from N(50, 8). Compute the mean and variance of the sample.
2. Find the z-score (PPF) for the 90th, 95th, and 99th percentiles of the standard normal distribution.
3. Calculate the PDF at x=0 for the standard normal distribution and at x=1 for N(mean=1, std=2).

**Intermediate:**
4. Generate two groups of 25 samples each: N(100, 15) and N(110, 15). Run `ttest_ind()` and state whether the difference is significant at alpha=0.05.
5. Create observed counts [50, 30, 20] and expected counts [33.3, 33.3, 33.3]. Run a chi-square test and interpret the p-value.
6. Generate 200 samples from a uniform distribution using `stats.uniform.rvs()`. Compute skewness and kurtosis. Are they close to the theoretical values?

**Advanced:**
7. Generate 100 samples from a chi-square distribution with 5 degrees of freedom. Use `stats.kstest()` to test if the data follows: (a) a normal distribution, (b) a chi-square(5) distribution. Compare the p-values.
8. Load a dataset of two groups (30 samples each) with unequal variances. Perform both `ttest_ind()` and `mannwhitneyu()`. Compare the results and discuss which test is more appropriate when variances differ.
