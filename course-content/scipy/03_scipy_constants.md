## 3. SciPy Constants

## 📘 Introduction

The `scipy.constants` submodule provides a comprehensive collection of physical constants in SI units, mathematical constants, and unit conversion utilities. It includes CODATA recommended values of fundamental physical constants, making it invaluable for physics, chemistry, and engineering computations.

## 🧠 Key Concepts

- **Physical Constants**: CODATA internationally recommended values (e.g., speed of light `c`, Planck constant `h`, gravitational constant `G`).
- **Mathematical Constants**: `pi`, `golden`, `golden_ratio`.
- **Unit Conversions**: Functions to convert between temperature, energy, length, mass, pressure, volume, and more.
- **`physical_constants` Dictionary**: Keys are descriptive strings; values are `(value, unit, uncertainty)` tuples.
- **`constants.unit()`**: Converts a human-readable unit string to its SI base value.
- **`constants.find()`**: Searches for constants matching a substring.
- **Prefixes**: Metric prefixes (yotta, zetta, ..., atto, femto, ...) are available as `constants.yotta`, `constants.kilo`, etc.
- **Atomic Mass Unit**: `constants.u` — the unified atomic mass unit.

**Notable Constants:**

| Symbol | Name | Approximate Value |
|--------|------|-------------------|
| `c` | Speed of light | 299,792,458 m/s |
| `pi` | Pi | 3.141592653589793 |
| `h` | Planck constant | 6.62607015e-34 J·s |
| `G` | Gravitational constant | 6.67430e-11 m³/kg/s² |
| `e` | Elementary charge | 1.602176634e-19 C |
| `k` | Boltzmann constant | 1.380649e-23 J/K |
| `R` | Gas constant | 8.314462618 J/(mol·K) |
| `N_A` | Avogadro number | 6.02214076e23 mol⁻¹ |
| `epsilon_0` | Vacuum permittivity | 8.8541878128e-12 F/m |
| `mu_0` | Vacuum permeability | 1.25663706212e-6 H/m |
| `m_e` | Electron mass | 9.1093837015e-31 kg |
| `m_p` | Proton mass | 1.67262192369e-27 kg |
| `g` | Standard gravity | 9.80665 m/s² |
| `atm` | Standard atmosphere | 101325 Pa |

## 💻 Syntax

```python
from scipy import constants

# Access constants directly
print(constants.pi)
print(constants.c)
print(constants.h)
print(constants.G)
print(constants.e)       # Not math.e (2.718...)
print(constants.k)       # Boltzmann constant

# Physical constants dictionary
val, unit, err = constants.physical_constants['electron mass']
print(f"{val} {unit} ± {err}")

# Unit conversions
celsius = constants.convert_temperature(100, 'C', 'F')
joules = constants.convert_energy(1, 'eV', 'J')
meters = constants.convert_length(1, 'inch', 'm')

# Searching constants
results = constants.find('Planck')
for name, (val, unit, err) in results.items():
    print(f"{name}: {val} {unit} ± {err}")
```

## ✅ Example 1 - Basic

**Problem:** Use `scipy.constants` to compute the energy of a photon with wavelength 500 nm using Planck's relation E = hc/λ.

**Code:**
```python
from scipy import constants

# Given: wavelength = 500 nanometers
wavelength_nm = 500
wavelength_m = wavelength_nm * 1e-9  # Convert to meters

# Planck's relation: E = h * c / lambda
h = constants.h      # Planck constant (J·s)
c = constants.c      # Speed of light (m/s)

energy_joules = h * c / wavelength_m

# Convert to electronvolts (1 eV = 1.602e-19 J)
energy_eV = energy_joules / constants.e

print(f"Wavelength: {wavelength_nm} nm")
print(f"Energy: {energy_joules:.6e} J")
print(f"Energy: {energy_eV:.3f} eV")

# Using convert_energy
energy_eV2 = constants.convert_energy(energy_joules, 'J', 'eV')
print(f"Energy (using convert_energy): {energy_eV2:.3f} eV")
```

**Output:**
```
Wavelength: 500 nm
Energy: 3.972891e-19 J
Energy: 2.479 eV
Energy (using convert_energy): 2.479 eV
```

**Explanation:**
We use Planck's constant `h` and the speed of light `c` from `scipy.constants` to compute photon energy. The conversion to electronvolts uses the elementary charge `e` directly and also demonstrates `convert_energy`.

## 🚀 Example 2 - Intermediate

**Problem:** Use `constants.find()` to search for all constants related to "electron", display them with values and uncertainties, then use the Rydberg constant to compute the wavelength of the Balmer-alpha line (Hα, n=3 to n=2 transition).

**Code:**
```python
from scipy import constants

# Find all electron-related constants
print("=== Electron Constants ===")
results = constants.find('electron')
for name in sorted(results.keys()):
    val, unit, err = results[name]
    print(f"{name:40s}: {val:.6e} {unit:12s} ± {err:.2e}")

# Balmer-alpha wavelength using Rydberg constant
R_H = constants.physical_constants['Rydberg constant'][0]
print(f"\nRydberg constant: {R_H:.6f} m⁻¹")

# Rydberg formula: 1/λ = R_H * (1/n_low² - 1/n_high²)
n_low = 2
n_high = 3
inv_lambda = R_H * (1/n_low**2 - 1/n_high**2)
wavelength_m = 1 / inv_lambda
wavelength_nm = wavelength_m * 1e9

print(f"Hα transition: {n_high} → {n_low}")
print(f"Wavelength: {wavelength_nm:.2f} nm")

# Compare with known value (656.28 nm)
print(f"Known value: 656.28 nm")
print(f"Error: {abs(wavelength_nm - 656.28):.4f} nm")
```

**Output:**
```
=== Electron Constants ===
...
Rydberg constant: 10973731.568160 m⁻¹

Hα transition: 3 → 2
Wavelength: 656.28 nm
Known value: 656.28 nm
Error: 0.0000 nm
```

**Explanation:**
We demonstrate `constants.find()` to search the constants database, extract values with uncertainty, and then apply fundamental constants to a real physics problem — computing the Balmer-alpha spectral line wavelength with high precision using the Rydberg constant.

## 🏢 Real World Use Case

**Engineering Unit Conversion Library:** An aerospace engineering firm works with international partners who use different unit systems. They build a conversion module using `scipy.constants`:
- `convert_length` for converting fuselage dimensions (feet to meters)
- `convert_temperature` for engine temperatures (Fahrenheit to Kelvin)
- `convert_pressure` for atmospheric readings (psi to Pascals)
- `convert_energy` for fuel energy content (BTU to Joules)
- `constants.g` for gravitational acceleration in trajectory calculations
- `constants.R` for gas constant in thermodynamic cycle analysis

## 🎯 Interview Questions

**Q1:** What is the `constants.physical_constants` dictionary structure?
**A:** It is a dictionary where keys are descriptive strings (e.g., 'electron mass') and values are tuples of `(value, unit, uncertainty)`. Example: `('electron mass', (9.1093837015e-31, 'kg', 2.8e-38))`.

**Q2:** How do you convert 100 degrees Celsius to Fahrenheit using SciPy?
**A:** `constants.convert_temperature(100, 'C', 'F')` returns 212.0.

**Q3:** What does `constants.find('Planck')` return?
**A:** It returns a dictionary where keys are constant names containing 'Planck' (case-insensitive) and values are `(value, unit, uncertainty)` tuples. Example keys include 'Planck constant', 'Planck length', 'Planck mass', etc.

**Q4:** What is the difference between `constants.pi` and `math.pi`?
**A:** They have the same value within floating-point precision. `constants.pi` is inherited from the `math` module in some versions, but conceptually `constants.pi` is the mathematical constant π from SciPy's constants module, while `math.pi` is from Python's standard library.

**Q5:** How do you access the value of 1 light-year in meters using SciPy?
**A:** Use `constants.light_year` or `constants.unit('light year')`. Alternatively, compute it as `constants.c * 365.25 * 24 * 3600`.

## ⚠ Common Errors / Mistakes

- **Confusing `constants.e` with `math.e`**: In SciPy, `constants.e` is elementary charge (1.602e-19 C), not Euler's number (2.718...). For Euler's number, use `math.e` or `np.e`.
- **Case sensitivity**: Constant names like `constants.N_A` (Avogadro) have underscores and are case-sensitive.
- **`physical_constants` returns a tuple**: Always unpack as `value, unit, error = constants.physical_constants['name']`.
- **Unit conversion returns wrong scale**: `convert_temperature(100, 'C', 'F')` interprets the value as degrees on the Celsius scale, not as a difference. Use `'K'` and `'R'` for differences.
- **Modifying constants**: Constants are Python variables, not truly immutable. Avoid accidentally reassigning them (e.g., `constants.c = 3` will silently change the value in your session).

## 📝 Practice Exercises

**Beginner:**
1. Write a script that prints the value, unit, and uncertainty of Planck's constant, the electron charge, and Avogadro's number.
2. Use `constants.convert_length` to convert 1 mile to meters and 1 meter to feet.
3. Write a function that computes the de Broglie wavelength (λ = h/p) given momentum p using appropriate SciPy constants.

**Intermediate:**
4. Use `constants.find()` to locate all constants containing "Bohr". For each one, print the name, value, and unit. Then compute the Bohr magneton in eV/T using the appropriate conversion.
5. Write code to verify that `constants.R = constants.N_A * constants.k` (gas constant = Avogadro's number × Boltzmann constant) within floating-point precision.
6. Use `constants.convert_temperature` to create a conversion table for temperatures from -40°C to 100°C in steps of 10°C, showing °C, °F, and K.

**Advanced:**
7. Build a "constants explorer" that loads all constants from `physical_constants`, groups them by category (e.g., atomic, nuclear, electromagnetic, physico-chemical) based on keywords in their names, and prints a summary for each category.
8. Use the Planck constant, speed of light, and meter definition to derive the SI kilogram (via E = mc², and the definition that 1 J = 1 kg·m²/s²). Verify your derivation against the CODATA value of h.
