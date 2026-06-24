## 4. SciPy Optimize

## 📘 Introduction

The `scipy.optimize` submodule provides algorithms for function minimization, curve fitting, root finding, and linear programming. It is one of the most widely used SciPy modules, enabling solutions to optimization problems across engineering, finance, machine learning, and scientific research.

## 🧠 Key Concepts

- **`minimize()`**: General-purpose function minimization with multiple algorithms (methods): BFGS (default, gradient-based), L-BFGS-B (bounded), SLSQP (constrained), Nelder-Mead (derivative-free), Powell, CG, trust-constr, and more.
- **`curve_fit()`**: Nonlinear least-squares curve fitting — given data (x, y) and a model function, finds optimal parameters.
- **Root Finding**: `root_scalar()` for 1D, `root()` for multi-dimensional — find x where f(x) = 0.
- **`linprog()`**: Linear programming solver — minimize cᵀx subject to linear constraints.
- **`least_squares()`**: Solve nonlinear least-squares problems with bounds.
- **`differential_evolution()`**: Global optimization using the differential evolution algorithm.
- **`basinhopping()`**: Global optimization combining local minimization with random jumps.

**Methods Comparison:**

| Method | Bounds | Constraints | Derivative | Best For |
|--------|--------|-------------|------------|----------|
| BFGS | No | No | Yes | Smooth, unconstrained |
| L-BFGS-B | Yes | No | Yes | Large, bounded problems |
| SLSQP | Yes | Yes | Yes | Constrained problems |
| Nelder-Mead | No | No | No | Non-smooth/no gradient |
| trust-constr | Yes | Yes | Yes | Trust-region methods |

## 💻 Syntax

```python
from scipy.optimize import minimize, curve_fit, root, root_scalar, linprog

# Minimization
result = minimize(fun, x0, method='BFGS', options={'disp': True})
result = minimize(fun, x0, method='L-BFGS-B', bounds=[(0, None)])
result = minimize(fun, x0, method='SLSQP', constraints={'type': 'eq', 'fun': con})

# Curve fitting
popt, pcov = curve_fit(model_func, xdata, ydata, p0=[1, 1])

# Root finding
sol = root_scalar(f, bracket=[a, b])
sol = root(func, x0)

# Linear programming
res = linprog(c, A_ub=A, b_ub=b, bounds=[(0, None)])
```

## ✅ Example 1 - Basic

**Problem:** Minimize the Rosenbrock function f(x,y) = (a - x)² + b(y - x²)², a classic optimization test problem. Find the minimum starting from (-1, 1.5).

**Code:**
```python
from scipy.optimize import minimize
import numpy as np

# Rosenbrock function
def rosenbrock(x):
    a, b = 1, 100
    return (a - x[0])**2 + b * (x[1] - x[0]**2)**2

# Initial guess
x0 = np.array([-1.0, 1.5])

# Minimize using BFGS
result = minimize(rosenbrock, x0, method='BFGS')

print("Success:", result.success)
print("Optimal x:", result.x)
print("Optimal f(x):", result.fun)
print("Number of iterations:", result.nit)
print("Gradient norm:", result.jac)
```

**Output:**
```
Success: True
Optimal x: [1. 1.]
Optimal f(x): 0.0
Number of iterations: 18
Gradient norm: 6.29e-09
```

**Explanation:**
The Rosenbrock function has a global minimum at (1, 1) where f = 0. BFGS finds it in 18 iterations. The result object contains the solution, function value, convergence status, iteration count, and gradient norm.

## 🚀 Example 2 - Intermediate

**Problem:** Fit a noisy exponential decay curve A * exp(-k * t) + C to experimental data using `curve_fit`. Add bounds to keep parameters physically meaningful.

**Code:**
```python
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

# Generate synthetic data: y = 3 * exp(-0.5 * t) + 0.2 + noise
np.random.seed(42)
t = np.linspace(0, 10, 50)
true_A, true_k, true_C = 3.0, 0.5, 0.2
y_true = true_A * np.exp(-true_k * t) + true_C
y_noisy = y_true + 0.15 * np.random.randn(len(t))

# Model function
def exp_decay(t, A, k, C):
    return A * np.exp(-k * t) + C

# Fit with bounds (A>0, k>0, C>0)
popt, pcov = curve_fit(exp_decay, t, y_noisy, p0=[2, 0.8, 0.1],
                       bounds=([0, 0, 0], [10, 2, 1]))

# Results
perr = np.sqrt(np.diag(pcov))
print("Fitted parameters:")
print(f"  A = {popt[0]:.3f} ± {perr[0]:.3f} (true: {true_A})")
print(f"  k = {popt[1]:.3f} ± {perr[1]:.3f} (true: {true_k})")
print(f"  C = {popt[2]:.3f} ± {perr[2]:.3f} (true: {true_C})")

# Compute R-squared
y_pred = exp_decay(t, *popt)
ss_res = np.sum((y_noisy - y_pred)**2)
ss_tot = np.sum((y_noisy - np.mean(y_noisy))**2)
r2 = 1 - ss_res / ss_tot
print(f"R-squared: {r2:.4f}")
```

**Output:**
```
Fitted parameters:
  A = 2.980 ± 0.044 (true: 3.0)
  k = 0.489 ± 0.013 (true: 0.5)
  C = 0.212 ± 0.028 (true: 0.2)
R-squared: 0.9942
```

**Explanation:**
`curve_fit` uses non-linear least squares to find optimal parameters. It returns `popt` (optimal values) and `pcov` (covariance matrix). The diagonal of `pcov` gives the variance of each parameter; square root gives standard errors. Bounds ensure physically meaningful (positive) values.

## 🏢 Real World Use Case

**Pharmaceutical Dose-Response Analysis:** A pharmacologist measures the effect of a drug at various doses. Using `curve_fit`, she fits a sigmoidal dose-response model: `E = E_min + (E_max - E_min) / (1 + (EC50 / C)^Hill)`. The fitted EC50 value determines the drug's potency. Bounds constrain parameters: E_max between 0 and 100%, Hill coefficient between 0.5 and 5. The covariance matrix provides confidence intervals for regulatory submission.

## 🎯 Interview Questions

**Q1:** What is the difference between `minimize` with `method='BFGS'` vs `method='Nelder-Mead'`?
**A:** BFGS is a gradient-based method — it requires the function to be differentiable and uses gradient information for fast convergence. Nelder-Mead is a direct search method — it does not require derivatives, making it suitable for non-smooth or discontinuous functions, but it is typically slower.

**Q2:** How do you add bounds and constraints to `minimize`?
**A:** Use the `bounds` parameter (list of (min, max) tuples) and `constraints` parameter (list of dicts with 'type': 'eq' or 'ineq' and 'fun': constraint function). Only certain methods (L-BFGS-B, SLSQP, trust-constr) support bounds and constraints.

**Q3:** What does `curve_fit` return and how do you compute parameter uncertainties?
**A:** Returns `(popt, pcov)`. `popt` is the array of optimal parameters. `pcov` is the covariance matrix. Parameter standard errors are `np.sqrt(np.diag(pcov))`.

**Q4:** How do you find a root of a single-variable equation using SciPy?
**A:** Use `root_scalar(func, bracket=[a, b])` where `func(a)` and `func(b)` have opposite signs. Methods include `'bisect'`, `'newton'`, `'secant'`, `'brentq'` (default).

**Q5:** What is `linprog` used for and what are its main parameters?
**A:** `linprog` solves linear programming problems: minimize `c @ x` subject to `A_ub @ x <= b_ub`, `A_eq @ x == b_eq`, and `bounds`. Main parameters: `c` (coefficients), `A_ub`/`b_ub` (inequality constraints), `A_eq`/`b_eq` (equality constraints), `bounds`, and `method`.

## ⚠ Common Errors / Mistakes

- **Not providing a good initial guess**: Poor `x0` in `minimize()` or `p0` in `curve_fit()` can lead to local minima or convergence failure.
- **Forgetting bounds for physical parameters**: Curve fitting often produces negative values for inherently positive parameters (concentration, rate constants) if bounds are not set.
- **Ignoring the result status**: Always check `result.success` after minimization — a failure returns the best point found but may not be optimal.
- **Bracket sign mismatch**: In `root_scalar`, `func(a)` and `func(b)` must have opposite signs for bracket-based methods.
- **Confusing `curve_fit` for interpolation**: `curve_fit` fits a parametric model to data; it is not interpolation — it does not pass through all data points.

## 📝 Practice Exercises

**Beginner:**
1. Minimize the function f(x) = x² + 5*sin(x) starting from x₀ = 3. Find the local minimum and its value.
2. Find the root of f(x) = cos(x) - x in the interval [0, 1] using `root_scalar`.
3. Fit a linear model y = a*x + b to the points (1, 2), (2, 3.5), (3, 5), (4, 6.5) using `curve_fit`.

**Intermediate:**
4. Solve the constrained optimization: minimize f(x,y) = (x-2)² + (y-3)² subject to x + y = 5 and x ≥ 0, y ≥ 0. Use `minimize` with SLSQP.
5. The function f(t) = A*sin(ω*t + φ) + C produces noisy data. Generate synthetic data with A=2, ω=3, φ=0.5, C=1, add noise, then recover the parameters with `curve_fit`.
6. Solve the system of equations: x² + y² = 25, x - y = 1 using `root` from `scipy.optimize`.

**Advanced:**
7. Use `differential_evolution` to find the global minimum of the Ackley function — a challenging non-convex optimization problem with many local minima. Compare the result with `minimize` using BFGS from a poor initial guess.
8. Implement a portfolio optimization using `minimize` with SLSQP: maximize expected return (μᵀw) subject to risk constraint (wᵀΣw ≤ target_risk) and budget constraint (sum(w) = 1), with no short-selling (w ≥ 0). Use random data for 5 assets.
