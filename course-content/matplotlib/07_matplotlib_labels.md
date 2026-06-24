## 7. Matplotlib Labels

## 📘 Introduction

Labels and titles make a plot self-explanatory. Matplotlib provides full control over text appearance: font family, size, weight, color, rotation, alignment, and positioning. You can also render mathematical expressions using TeX-like syntax.

## 🧠 Key Concepts

- **`xlabel()` / `ylabel()`**: Axis labels.
- **`title()` / `suptitle()`**: Axes title / figure-level super title.
- **`fontsize`**: Text size (int, or string: `'small'`, `'medium'`, `'large'`, `'x-large'`).
- **`fontweight`**: `'normal'`, `'bold'`, `'heavy'`, `'light'`.
- **`color`**: Text color.
- **`rotation`**: Angle in degrees (vertical labels: `rotation=90`).
- **`loc`**: Position of title: `'left'`, `'center'`, `'right'`.
- **`labelpad`**: Spacing between label and axis.
- **TeX expressions**: `r'$\alpha + \beta = \gamma$'` inside raw strings.

## 💻 Syntax

```python
import matplotlib.pyplot as plt

plt.plot(x, y)
plt.xlabel('X Axis (units)', fontsize=12, fontweight='bold', color='navy')
plt.ylabel('Y Axis (units)', fontsize=12, fontweight='bold', color='navy')
plt.title('My Plot Title', fontsize=14, fontweight='heavy', loc='left')
plt.suptitle('Super Title Above Everything', fontsize=16, y=1.02)

# TeX expressions
plt.title(r'$\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$')
```

## ✅ Example 1 - Basic: Customizing Labels and Title

**Problem:** Create a plot with fully customized axis labels, title, and a figure-level super title.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.exp(-x/2) * np.sin(2 * x)

plt.plot(x, y, linewidth=2)
plt.xlabel('Time (seconds)', fontsize=12, fontweight='bold', color='darkblue', labelpad=10)
plt.ylabel('Amplitude', fontsize=12, fontweight='bold', color='darkred', labelpad=10)
plt.title('Damped Oscillation', fontsize=16, fontweight='heavy', color='black', loc='center')
plt.suptitle('Figure 1: Physics Simulation', fontsize=14, y=1.02, color='gray')
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** A damped sine wave with bold dark-blue x-label, bold dark-red y-label, a heavy black title centered above the plot, and a gray super title above that.

**Explanation:** `labelpad` adds space between label and axis ticks. `suptitle` places a title above all subplots. `loc` controls horizontal alignment of the title.

## 🚀 Example 2 - Intermediate: TeX Mathematical Expressions

**Problem:** Plot a Gaussian curve and label it with its mathematical formula using TeX.

**Code:**
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 200)
mu, sigma = 0, 1
y = (1 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma)**2)

plt.plot(x, y, linewidth=2, color='purple')
plt.xlabel('x', fontsize=12)
plt.ylabel(r'$f(x)$', fontsize=14)
plt.title(r'Gaussian Distribution: $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$',
          fontsize=12, fontweight='bold')
plt.text(2, 0.3, r'$\mu=0,\ \sigma=1$', fontsize=12, bbox=dict(facecolor='white', alpha=0.8))
plt.grid(True, alpha=0.3)
plt.show()
```

**Output Description:** A bell-shaped Gaussian curve. The title shows the full formula in TeX. A text annotation in a white box shows mu and sigma values.

**Explanation:** Raw strings `r'...'` prevent Python from interpreting backslashes. `$...$` within strings triggers TeX rendering. `plt.text()` adds arbitrary text at data coordinates.

## 🏢 Real World Use Case

**Academic paper figures:** A researcher publishes a plot in a journal requiring all axis labels in Times New Roman, 10pt, bold axis labels, and the title positioned left-aligned. They use `fontdict` and `loc='left'` to match the journal's formatting guidelines exactly.

## 🎯 Interview Questions

**1. How do you make axis labels bold?**
- Use `fontweight='bold'` in `xlabel()` / `ylabel()` or pass a `fontdict`: `fontdict={'weight': 'bold', 'size': 12}`.

**2. What is the difference between `title()` and `suptitle()`?**
- `title()` sets the title of the current axes. `suptitle()` sets a title for the entire figure, centered above all subplots.

**3. How do you rotate x-axis labels?**
- `plt.xticks(rotation=45)` rotates tick labels. Or in OOP: `ax.set_xticklabels(labels, rotation=45)`.

**4. How do you render Greek letters and math symbols?**
- Use TeX markup inside raw strings: `r'$\alpha, \beta, \gamma$'`. Requires `$` delimiters. Matplotlib uses a built-in TeX parser; no external LaTeX installation needed.

**5. What is `labelpad` used for?**
- It adds padding (in points) between the axis label and the tick labels (or axis line). Useful when labels are rotated or font is large.

## ⚠ Common Errors / Mistakes

- **Forgetting the raw string `r''` prefix for TeX** – Backslashes get interpreted as escape sequences.
- **Missing `$` delimiters** – TeX expressions won't render; they'll appear as raw text.
- **Mixing up `xlabel` and `ylabel`** – Transposed labels confuse readers.
- **Title clipped when saving** – Use `bbox_inches='tight'` in `savefig()`, or increase figure height.
- **Setting `rotation` on `xlabel()` instead of `xticks()`** – `xlabel()` rotates the label text, not the tick labels.

## 📝 Practice Exercises

**Beginner**
1. Create a plot of `y = x^3` with x-label "Input Value" (size 14, blue) and y-label "Cubic Output" (size 14, green).
2. Add a title "Cubic Function Plot" in red, bold, size 16, centered.
3. Use `plt.xlabel(..., labelpad=15)` and explain what changes visually.

**Intermediate**
4. Create a figure with two subplots. Give each its own title, and add a figure-level `suptitle` that spans both. Use different font sizes and colors.
5. Plot a sine wave and use `plt.text()` to annotate the maximum point with coordinates `(x_max, y_max)` formatted as `$(\pi/2, 1)$`.
6. Create a plot where the x-label is rotated 45 degrees and the y-label is rotated 0 degrees (horizontal). Use `rotation` parameter.

**Advanced**
7. Create a plot with multi-line axis labels using `\n` newline character in the label string. For example: `"Revenue\n(USD)"`. Adjust `labelpad` and figure size so nothing is clipped.
8. Write a LaTeX-heavy plot: render the Black-Scholes option pricing formula as the title, Brenton's formula for the y-label, and use Greek letters for all tick labels on the x-axis. All must render correctly from built-in TeX.
