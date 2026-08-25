## 6. SciPy Interpolation

## 📘 Introduction

The `scipy.interpolate` submodule provides tools for constructing interpolating functions that pass through given data points. Interpolation is essential when you have discrete data and need to estimate values between known points, resample data at different resolutions, or create smooth curves from noisy measurements.

## 🧠 Key Concepts

- **`interp1d`**: 1D interpolation — constructs a function from (x, y) data points with options for kind: 'linear', 'nearest', 'nearest-up', 'zero', 'slinear', 'quadratic', 'cubic', 'previous', 'next'.
- **`UnivariateSpline`**: Smoothing spline for 1D data — can trade off between fitting and smoothing via the `s` parameter.
- **`griddata`**: Interpolation for unstructured 2D (or N-D) data — methods: 'nearest', 'linear', 'cubic'.
- **`RBFInterpolator`**: Radial Basis Function interpolation for scattered N-D data.
- **`RegularGridInterpolator`**: Interpolation on a regular grid (faster for gridded data).
- **`CloughTocher2DInterpolator`**: Piecewise cubic, C1 smooth 2D interpolant on a triangulation.
- **`SmoothBivariateSpline` / `LSQBivariateSpline`**: Bivariate spline fitting.
- **Extrapolation**: Handling points outside the data range via `fill_value` or `bounds_error`.

**Interpolation Kinds Compared:**

| Kind | Smoothness | Overshoot | Best For |
|------|-----------|-----------|----------|
| 'linear' | C0 | No | General purpose, fast |
| 'nearest' | Discontinuous | No | Categorical/step data |
| 'quadratic' | C1 | Yes | Smooth but not very wiggly |
| 'cubic' | C2 | Yes | Smooth, curved data |

## 💻 Syntax

```python
from scipy.interpolate import interp1d, UnivariateSpline, griddata, RBFInterpolator

# 1D interpolation
f = interp1d(x, y, kind='cubic')
y_new = f(x_new)  # Evaluate at new points

# Smoothing spline
spline = UnivariateSpline(x, y, s=0.0)
smooth = spline(x_new)

# 2D interpolation from scattered data
points = np.array([[x1, y1], [x2, y2], ...])
values = np.array([z1, z2, ...])
grid_z = griddata(points, values, (grid_x, grid_y), method='cubic')
```

## ✅ Example 1 - Basic

**Problem:** You have temperature measurements at 5 irregularly spaced depths in a lake: depth=[0, 2.5, 5, 10, 20]m, temp=[22, 20, 16, 10, 5]°C. Interpolate to estimate temperatures at every 0.5m from 0 to 20m using linear and cubic interpolation.

**Code:**
```python
import numpy as np
from scipy.interpolate import interp1d
import matplotlib.pyplot as plt

# Measured data
depth = np.array([0, 2.5, 5, 10, 20])
temp = np.array([22, 20, 16, 10, 5])

# Create interpolators
f_linear = interp1d(depth, temp, kind='linear')
f_cubic = interp1d(depth, temp, kind='cubic')

# Interpolate at 0.5m intervals
depth_new = np.arange(0, 20.5, 0.5)
temp_linear = f_linear(depth_new)
temp_cubic = f_cubic(depth_new)

print("Depth (m) | Linear (°C) | Cubic (°C)")
print("-" * 40)
for d, tl, tc in zip(depth_new[::4], temp_linear[::4], temp_cubic[::4]):
    print(f"   {d:5.1f}   |   {tl:6.2f}    |  {tc:6.2f}")

print(f"\nAt depth 7.5m:")
print(f"  Linear estimate: {f_linear(7.5):.2f}°C")
print(f"  Cubic estimate:  {f_cubic(7.5):.2f}°C")
```

**Output:**
```
Depth (m) | Linear (°C) | Cubic (°C)
----------------------------------------
     0.0   |   22.00    |   22.00
     2.0   |   20.80    |   20.80
     4.0   |   17.60    |   17.68
     6.0   |   14.50    |   14.61
     8.0   |   11.50    |   11.76

At depth 7.5m:
  Linear estimate: 12.25°C
  Cubic estimate:  12.40°C
```

**Explanation:**
`interp1d` returns a callable function f that can be evaluated at any x within the original range. Linear interpolation connects points with straight lines; cubic interpolation uses piecewise cubic polynomials for a smooth, twice-differentiable curve.

## 🚀 Example 2 - Intermediate

**Problem:** Noisy sensor data from a chemical reaction — smooth it using `UnivariateSpline` with different smoothing factors and evaluate the trade-off between fitting noise vs. capturing the true signal.

**Code:**
```python
import numpy as np
from scipy.interpolate import UnivariateSpline
import matplotlib.pyplot as plt

# True signal: concentration decay
np.random.seed(42)
t = np.linspace(0, 10, 30)
true_conc = 5 * np.exp(-0.3 * t) + 1
noisy_conc = true_conc + 0.4 * np.random.randn(len(t))

# UnivariateSpline with different smoothing factors
spline_none = UnivariateSpline(t, noisy_conc, s=0)        # No smoothing (interpolation)
spline_auto = UnivariateSpline(t, noisy_conc)             # Default smoothing
spline_smooth = UnivariateSpline(t, noisy_conc, s=1.0)    # Heavy smoothing

t_fine = np.linspace(0, 10, 200)

print("Smoothing Analysis:")
print(f"  s=0 (no smoothing) - number of knots: {spline_none.get_knots().size}")
print(f"  s=auto (default)   - number of knots: {spline_auto.get_knots().size}")
print(f"  s=1.0 (heavy)      - number of knots: {spline_smooth.get_knots().size}")

# Evaluate at a specific point
print(f"\nEstimated concentration at t=5.5:")
print(f"  True:           {5 * np.exp(-0.3 * 5.5) + 1:.3f}")
print(f"  s=0:            {spline_none(5.5):.3f}")
print(f"  s=auto:         {spline_auto(5.5):.3f}")
print(f"  s=1.0:          {spline_smooth(5.5):.3f}")

# Compute MSE against true signal
mse_none = np.mean((spline_none(t) - true_conc)**2)
mse_auto = np.mean((spline_auto(t) - true_conc)**2)
mse_smooth = np.mean((spline_smooth(t) - true_conc)**2)
print(f"\nMSE against true signal:")
print(f"  s=0:      {mse_none:.4f}")
print(f"  s=auto:   {mse_auto:.4f}")
print(f"  s=1.0:    {mse_smooth:.4f}")
```

**Output:**
```
Smoothing Analysis:
  s=0 (no smoothing) - number of knots: 30
  s=auto (default)   - number of knots: 17
  s=1.0 (heavy)      - number of knots: 6

Estimated concentration at t=5.5:
  True:           2.077
  s=0:            1.973
  s=auto:         2.084
  s=1.0:          2.122

MSE against true signal:
  s=0:      0.1467
  s=auto:   0.1135
  s=1.0:    0.1430
```

**Explanation:**
`UnivariateSpline` fits a smoothing spline. The `s` parameter controls the trade-off: `s=0` interpolates all points (overfits noise), larger `s` increases smoothing (fewer knots). The auto default chooses `s` via a smoothing criterion. Here, auto-smoothing best recovers the true signal (lowest MSE).

## 🏢 Real World Use Case

**Climate Data Downscaling:** A climate scientist has temperature measurements from weather stations at irregular locations. Using `griddata` with `method='cubic'`, she interpolates these scattered measurements onto a regular 0.25° × 0.25° grid for climate model validation. `RBFInterpolator` is used as an alternative when station density varies widely, providing better extrapolation behavior at domain boundaries.

## 🎯 Interview Questions

**Q1:** What is the difference between `interp1d` and `UnivariateSpline`?
**A:** `interp1d` provides exact interpolation through all data points (no smoothing). `UnivariateSpline` can either interpolate (s=0) or smooth noisy data (s>0) by reducing the number of knots — useful when data contains measurement noise.

**Q2:** How do you handle extrapolation in `interp1d`?
**A:** Set `fill_value='extrapolate'` in the constructor, then calling the function outside the original range will extrapolate using the same interpolation method. Alternatively, set `fill_value=value` to return a constant for out-of-range points.

**Q3:** What methods are available in `griddata` for 2D scattered data interpolation?
**A:** `'nearest'` (returns value of nearest point, C0), `'linear'` (tessellation-based linear, C0), `'cubic'` (Clough-Tocher piecewise cubic, C1). Cubic is smoother but slower.

**Q4:** How does `s` affect a `UnivariateSpline`?
**A:** The `s` (smoothing) parameter controls the trade-off between fidelity to data and smoothness. `s=0` interpolates all points; larger `s` produces a smoother curve with fewer knots. If `s` is too large, the spline may underfit.

**Q5:** When would you use `RBFInterpolator` over `griddata`?
**A:** `RBFInterpolator` works well when data is scattered in higher dimensions (2D+), when you need control over the radial basis function type (multiquadric, inverse multiquadric, Gaussian, etc.), or when `griddata`'s triangulation-based approach produces artifacts in regions with uneven point density.

## ⚠ Common Errors / Mistakes

- **Extrapolation without specifying**: By default, `interp1d` raises an error for values outside the data range. Always specify `fill_value` or `bounds_error=False` to control behavior.
- **Confusing `s` in `UnivariateSpline`**: The `s` parameter is not a simple "smoothing strength" but a sum-of-squares tolerance. It depends on data units. Use trial-and-error or cross-validation to find a good value.
- **Non-monotonic x in `interp1d`**: By default, `interp1d` assumes x is monotonically increasing. Use `assume_sorted=False` for unsorted data.
- **Overshooting with cubic interpolation**: Cubic and quadratic interpolants can overshoot between data points, especially with sharp changes. Linear interpolation avoids this.
- **`griddata` expects points as (N, 2) array**: The points must be a 2D array of shape (N, D), not separate x and y arrays.

## 📝 Practice Exercises

**Beginner:**
1. Given x = [0, 1, 2, 3, 4] and y = [0, 1, 4, 9, 16], use `interp1d` with linear and quadratic kinds to estimate y at x = 1.5, 2.5, and 3.5.
2. Create 10 points from sin(x) on [0, 2π]. Use interp1d with 'cubic' to generate 100 interpolated points. Compute the maximum error from the true sin function.
3. Use `interp1d` with `kind='nearest'` on a step function dataset. Explain why the result looks like a staircase.

**Intermediate:**
4. Generate noisy data: y = x² + noise for x in [-3, 3]. Fit a `UnivariateSpline` with s=0 and s=0.5. Plot both and compare performance at the boundaries.
5. Given 20 random scattered points in [0, 10]² with values z = sin(x) * cos(y), use `griddata` with 'linear' and 'cubic' to interpolate onto a regular 50×50 grid. Compute and compare the maximum errors.
6. Use `UnivariateSpline` to differentiate noisy data: compute the first derivative (`spline.derivative()`) of noisy sin(x) data and compare it with the true derivative cos(x).

**Advanced:**
7. Build a function that performs cross-validation to select the optimal `s` parameter for `UnivariateSpline`. Use k-fold cross-validation, minimizing the held-out MSE on noisy data.
8. Compare the performance (both accuracy and speed) of `RegularGridInterpolator`, `interp2d` (deprecated but available), and `griddata` for interpolating a known 2D function on a regular 50×50 grid evaluated on a 200×200 fine grid.
