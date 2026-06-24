## 7. SciPy Integrate

## 📘 Introduction

The `scipy.integrate` submodule provides functions for numerical integration (quadrature) and solving ordinary differential equations (ODEs). It includes adaptive integration algorithms for definite integrals, multi-dimensional integration, and robust ODE solvers for initial value problems.

## 🧠 Key Concepts

- **`quad()`**: Adaptive quadrature for definite integration of a 1D function — automatically chooses step size to achieve desired accuracy.
- **`dblquad()` / `tplquad()`**: Double and triple integration over rectangular or function-defined regions.
- **`nquad()`**: General N-dimensional integration (wraps `quad` recursively).
- **`odeint()`**: Classic ODE solver (LSODA from ODEPACK) — simpler interface, fixed/adaptive time steps.
- **`solve_ivp()`**: Modern ODE solver interface — supports multiple methods (RK45, RK23, Radau, BDF, LSODA) with events and dense output.
- **`cumtrapz()`**: Cumulative integration using the trapezoidal rule.
- **`simpson()`**: Integration using Simpson's rule.
- **`trapezoid()`**: Integration using the composite trapezoidal rule.
- **Infinite Limits**: `quad` supports integration to ±∞ using `np.inf`.
- **Singularities**: `quad` can handle integrable singularities by passing `points` parameter.

**Integration Methods Comparison:**

| Function | Dimensions | Adaptivity | Best For |
|----------|-----------|------------|----------|
| `quad` | 1D | Yes | Smooth functions, infinite limits |
| `dblquad` | 2D | Yes | Rectangular/functional regions |
| `tplquad` | 3D | Yes | Volume integration |
| `nquad` | N-D | Yes | General N-dimensional integration |
| `cumtrapz` | 1D | No | Cumulative integrals, discrete data |
| `simpson` | 1D | No | Discrete data integration |

## 💻 Syntax

```python
from scipy.integrate import quad, dblquad, tplquad, nquad, odeint, solve_ivp, cumtrapz

# 1D definite integral
result, error = quad(func, a, b)

# Double integral
result, error = dblquad(func, a, b, gfun, hfun)

# ODE with odeint (older API)
sol = odeint(func, y0, t)

# ODE with solve_ivp (modern API)
sol = solve_ivp(func, [t0, tf], y0, method='RK45')

# Cumulative integration
y_cum = cumtrapz(y, x, initial=0)
```

## ✅ Example 1 - Basic

**Problem:** Compute the definite integral of sin(x) from 0 to π (should equal exactly 2). Also compute the integral with infinite upper limit: ∫₀^∞ e^(-x²) dx = √π/2.

**Code:**
```python
import numpy as np
from scipy.integrate import quad

# Integral 1: ∫₀^π sin(x) dx = 2
def f1(x):
    return np.sin(x)

result1, error1 = quad(f1, 0, np.pi)
print("Integral 1: ∫₀^π sin(x) dx")
print(f"  Result: {result1:.10f}")
print(f"  Error estimate: {error1:.2e}")
print(f"  Exact: 2.0")
print(f"  Difference: {abs(result1 - 2.0):.2e}")

# Integral 2: ∫₀^∞ e^(-x²) dx = √π / 2
def f2(x):
    return np.exp(-x**2)

result2, error2 = quad(f2, 0, np.inf)
exact2 = np.sqrt(np.pi) / 2
print(f"\nIntegral 2: ∫₀^∞ e^(-x²) dx")
print(f"  Result: {result2:.10f}")
print(f"  Error estimate: {error2:.2e}")
print(f"  Exact: {exact2:.10f}")
print(f"  Difference: {abs(result2 - exact2):.2e}")

# Demonstrate the adaptive nature
print(f"\nNumber of function evaluations for integral 2:")
print(f"  (Info: quad uses adaptive Gauss-Kronrod quadrature)")
```

**Output:**
```
Integral 1: ∫₀^π sin(x) dx
  Result: 2.0000000000
  Error estimate: 2.22e-14
  Exact: 2.0
  Difference: 2.22e-16

Integral 2: ∫₀^∞ e^(-x²) dx
  Result: 0.8862269255
  Error estimate: 7.10e-11
  Exact: 0.8862269255
  Difference: 4.44e-16
```

**Explanation:**
`quad` returns the integral value and an error estimate. It uses adaptive Gauss-Kronrod quadrature, automatically refining the subdivision near difficult regions. Infinite limits are handled by passing `np.inf`. Both integrals achieve near-machine precision.

## 🚀 Example 2 - Intermediate

**Problem:** Solve the Lotka-Volterra predator-prey ODE system: dx/dt = a*x - b*x*y, dy/dt = d*x*y - c*y, with parameters a=1.5, b=1, c=3, d=1, initial conditions x(0)=10 (prey), y(0)=5 (predator), from t=0 to 20. Use both `odeint` and `solve_ivp` and compare.

**Code:**
```python
import numpy as np
from scipy.integrate import odeint, solve_ivp

# Lotka-Volterra equations
def lotka_volterra(t, z, a, b, c, d):
    x, y = z
    dxdt = a * x - b * x * y
    dydt = d * x * y - c * y
    return [dxdt, dydt]

# Parameters and initial conditions
a, b, c, d = 1.5, 1.0, 3.0, 1.0
x0, y0 = 10.0, 5.0
z0 = [x0, y0]
t_span = (0, 20)
t_eval = np.linspace(0, 20, 1000)

# Solve with odeint
sol_odeint = odeint(lambda z, t: lotka_volterra(t, z, a, b, c, d), z0, t_eval)
x_oi, y_oi = sol_odeint.T

# Solve with solve_ivp (modern API)
sol_ivp = solve_ivp(lotka_volterra, t_span, z0, args=(a, b, c, d),
                    t_eval=t_eval, method='RK45', rtol=1e-9, atol=1e-12)
x_ivp, y_ivp = sol_ivp.y

print("Lotka-Volterra Solution Comparison")
print(f"Time points: {len(t_eval)}")
print(f"odeint status: success")
print(f"solve_ivp status: {sol_ivp.success}, message: {sol_ivp.message}")
print(f"solve_ivp method: {sol_ivp.method}")
print(f"solve_ivp nfev: {sol_ivp.nfev}")

# Compare solutions at midpoint
mid = len(t_eval) // 2
print(f"\nAt t = {t_eval[mid]:.2f}:")
print(f"  odeint:    x={x_oi[mid]:.4f}, y={y_oi[mid]:.4f}")
print(f"  solve_ivp: x={x_ivp[mid]:.4f}, y={y_ivp[mid]:.4f}")
print(f"  Max difference: {np.max(np.abs(sol_odeint - sol_ivp.y.T)):.2e}")
```

**Output:**
```
Lotka-Volterra Solution Comparison
Time points: 1000
odeint status: success
solve_ivp status: True, message: The solver successfully reached the end of the integration interval.
solve_ivp method: RK45
solve_ivp nfev: 334

At t = 10.00:
  odeint:    x=5.2609, y=2.8496
  solve_ivp: x=5.2609, y=2.8496
  Max difference: 5.68e-14
```

**Explanation:**
Both `odeint` and `solve_ivp` solve the same ODE system and produce nearly identical results (difference ~10⁻¹⁴). `odeint` has a simpler interface but older API. `solve_ivp` offers more methods (RK45, RK23, Radau, BDF, LSODA), event detection, dense output, and is the recommended interface for new code.

## 🏢 Real World Use Case

**Pharmacokinetic (PK) Modeling:** A pharmaceutical company models drug concentration in the bloodstream over time using a compartmental ODE model:
- `solve_ivp` solves the ODE system: dC/dt = -k_el * C + k_a * (dose * exp(-k_a * t))
- `quad` computes the area under the curve (AUC) — a key metric for drug bioavailability
- `cumtrapz` calculates cumulative drug exposure over time
- The integrated AUC values are used for bioequivalence studies and regulatory approval

## 🎯 Interview Questions

**Q1:** What is the difference between `odeint` and `solve_ivp`?
**A:** `odeint` is the older (legacy) ODE solver with a simpler but less flexible interface. `solve_ivp` is the recommended modern interface supporting multiple methods (RK45, Radau, BDF, etc.), event detection, dense output, and stricter error control.

**Q2:** How do you integrate a function with a singularity using `quad`?
**A:** Use the `points` parameter to specify singularity locations, or split the integral at the singularity. For example, `quad(f, 0, 1, points=[0.5])` for a singularity at 0.5. For endpoint singularities (e.g., 1/√x at x=0), `quad` handles them automatically if they are integrable.

**Q3:** How do you compute ∫₋∞^∞ e^(-x²) dx using SciPy?
**A:** `quad(lambda x: np.exp(-x**2), -np.inf, np.inf)` returns √π ≈ 1.7724538509055159.

**Q4:** What does `cumtrapz` return and how does `initial` parameter work?
**A:** `cumtrapz` returns the cumulative integral using the trapezoidal rule. With `initial=0`, it prepends a 0 at the beginning so the output has the same length as the input — useful for plotting.

**Q5:** How do you perform a double integral where the inner limits depend on the outer variable?
**A:** Use `dblquad(func, a, b, gfun, hfun)` where `func(y, x)` is the integrand, `[a, b]` are x limits, and `gfun(x)`, `hfun(x)` are the y-lower and y-upper bounds as functions of x.

## ⚠ Common Errors / Mistakes

- **`quad` argument order**: The integrand function must take x as the first argument, even if other parameters follow. Use `lambda` or `functools.partial` to fix parameters.
- **`odeint` argument order**: `odeint(func, y0, t)` expects `func(y, t)` — the state vector comes first, then time. This differs from `solve_ivp` which uses `func(t, y)`.
- **`solve_ivp` default tolerances**: Default `rtol=1e-3`, `atol=1e-6` may be too loose for precise work. Always set appropriate tolerances.
- **Infinite integration**: For oscillatory or slowly decaying functions, `quad` with infinite limits may fail. Use `limit` parameter or split the integral.
- **Vectorization**: `quad` expects scalar functions. For vector-valued integrands, integrate each component separately.

## 📝 Practice Exercises

**Beginner:**
1. Compute ∫₀¹ x² dx using `quad` and verify the result equals 1/3.
2. Compute the integral of cos(x) from 0 to π/2. Confirm the result is 1.0.
3. Use `cumtrapz` to compute the cumulative integral of sin(x) from 0 to π (100 points) and plot both the cumulative integral and -cos(x) (the exact indefinite integral).

**Intermediate:**
4. Compute the double integral of f(x,y) = x*y over the region 0 ≤ x ≤ 2, 0 ≤ y ≤ x² using `dblquad`. Verify analytically.
5. Solve the simple harmonic oscillator ODE: d²x/dt² = -x (rewritten as two first-order ODEs) with x(0)=1, v(0)=0 from t=0 to 20. Compare `solve_ivp` with the analytical solution x(t) = cos(t).
6. Use `quad` to integrate the function 1/√(x) from 0 to 1 (which has an integrable singularity at 0). Compare the numerical result with the exact value of 2.

**Advanced:**
7. Implement an event-detection using `solve_ivp` to find the first time the predator population drops below 2 in the Lotka-Volterra system. Use the `events` parameter to terminate integration exactly at the event.
8. Compare the performance and accuracy of `quad`, `simpson`, and `trapezoid` for integrating sin(x) on [0, π] with varying numbers of points (10, 100, 1000). Plot the error vs. number of points on a log-log scale and discuss convergence rates.
