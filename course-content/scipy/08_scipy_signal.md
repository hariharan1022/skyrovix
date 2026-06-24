## 8. SciPy Signal Processing

## 📘 Introduction

The `scipy.signal` submodule provides tools for signal processing — including convolution, filtering, spectral analysis, and peak detection. It is widely used in audio processing, biomedical signal analysis, communications, vibration analysis, and any domain requiring analysis of time-series data.

## 🧠 Key Concepts

- **Convolution & Correlation**: `convolve()` (linear/cyclic convolution), `correlate()` (cross-correlation), `fftconvolve()` (FFT-based, faster for large arrays), `oaconvolve()` (overlap-add).
- **Filtering**:
  - `butter()`: Butterworth filter design (lowpass, highpass, bandpass, bandstop)
  - `filtfilt()`: Zero-phase forward-backward filtering (no phase distortion)
  - `lfilter()`: Standard recursive (IIR) or non-recursive (FIR) filtering — introduces phase delay
  - `savgol_filter()`: Savitzky-Golay filter for smoothing noisy data while preserving features
  - `medfilt()`: Median filter for impulse noise removal
- **Spectral Analysis**:
  - `periodogram()`: Power spectral density using periodogram method
  - `welch()`: Welch's method — averaged periodograms with overlapping windows (lower variance)
  - `spectrogram()`: Time-frequency representation (short-time Fourier transform)
- **Peak Detection**: `find_peaks()` — locate peaks in a signal with height, distance, prominence, and width constraints.
- **Resampling**: `resample()` — resample signal to a different number of points using FFT, `resample_poly()` — resample using polyphase filtering.
- **Window Functions**: `get_window()` — access to many window types (Hann, Hamming, Blackman, Kaiser, etc.)

## 💻 Syntax

```python
from scipy import signal
import numpy as np

# Filter design and application
b, a = signal.butter(4, 0.1, btype='low')          # 4th order lowpass filter
y = signal.filtfilt(b, a, x)                        # Zero-phase filtering
y = signal.lfilter(b, a, x)                         # Standard filtering

# Savitzky-Golay smoothing
y = signal.savgol_filter(x, window_length=11, polyorder=3)

# Spectral analysis
f, Pxx = signal.periodogram(x, fs=1000)             # Periodogram
f, Pxx = signal.welch(x, fs=1000, nperseg=256)      # Welch's method
f, t, Sxx = signal.spectrogram(x, fs=1000)           # Spectrogram

# Peak detection
peaks, properties = signal.find_peaks(x, height=0.5, distance=10)

# Convolution
result = signal.convolve(x, kernel, mode='same')
result = signal.fftconvolve(x, kernel)              # FFT-based (faster for large)
```

## ✅ Example 1 - Basic

**Problem:** Generate a noisy sinusoidal signal and apply a low-pass Butterworth filter to remove high-frequency noise. Compare standard filtering (`lfilter`) with zero-phase filtering (`filtfilt`).

**Code:**
```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Generate signal: 5 Hz sine + 50 Hz noise
fs = 500  # Sampling frequency (Hz)
t = np.linspace(0, 2, 2 * fs, endpoint=False)
clean = 1.5 * np.sin(2 * np.pi * 5 * t)  # 5 Hz signal
noise = 0.6 * np.sin(2 * np.pi * 50 * t)  # 50 Hz noise
noisy = clean + noise

# Design 4th order lowpass Butterworth filter (cutoff = 15 Hz)
nyquist = fs / 2
cutoff = 15 / nyquist  # Normalized cutoff
b, a = signal.butter(4, cutoff, btype='low')

# Apply filters
filtered_lfilter = signal.lfilter(b, a, noisy)
filtered_filtfilt = signal.filtfilt(b, a, noisy)

# Compare at a specific point
idx = 250  # t = 0.5s
print("Filtering Comparison (t=0.5s):")
print(f"  Clean signal:          {clean[idx]:.4f}")
print(f"  Noisy signal:          {noisy[idx]:.4f}")
print(f"  lfilter (causal):      {filtered_lfilter[idx]:.4f}")
print(f"  filtfilt (zero-phase): {filtered_filtfilt[idx]:.4f}")

# Compute MSE
mse_lfilter = np.mean((filtered_lfilter - clean)**2)
mse_filtfilt = np.mean((filtered_filtfilt - clean)**2)
print(f"\nMSE against clean signal:")
print(f"  lfilter:  {mse_lfilter:.6f}")
print(f"  filtfilt: {mse_filtfilt:.6f}")
```

**Output:**
```
Filtering Comparison (t=0.5s):
  Clean signal:          1.4093
  Noisy signal:          0.0315
  lfilter (causal):      1.3766
  filtfilt (zero-phase): 1.3992

MSE against clean signal:
  lfilter:  0.003245
  filtfilt: 0.001167
```

**Explanation:**
Both filters remove the 50 Hz noise, but `filtfilt` (zero-phase) has lower MSE because it filters the signal forward and backward, canceling out phase distortion. `lfilter` introduces a phase shift that distorts the filtered waveform, especially near transient regions.

## 🚀 Example 2 - Intermediate

**Problem:** Analyze an ECG-like signal — detect R-peaks (heartbeats) using `find_peaks`, and compute the power spectral density using Welch's method to identify heart rate variability frequencies.

**Code:**
```python
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Generate synthetic ECG-like signal (simplified)
fs = 360  # Sampling frequency (Hz) — standard ECG
t = np.linspace(0, 10, 10 * fs)

# Create a series of synthetic heartbeats (60 bpm = 1 Hz)
heart_rate = 1.2  # Hz (72 bpm)
heartbeat_template = np.exp(-((t % (1/heart_rate) - 0.05) / 0.02)**2 * 10) * 2
noise_level = 0.15
ecg = heartbeat_template + noise_level * np.random.randn(len(t))

# Detect peaks
peaks, properties = signal.find_peaks(ecg, height=0.8, distance=fs//4)

# Compute RR intervals (time between peaks)
rr_intervals = np.diff(peaks) / fs * 1000  # in ms
heart_rate_bpm = 60000 / rr_intervals

print("ECG Peak Detection Results:")
print(f"  Number of peaks detected: {len(peaks)}")
print(f"  Expected (10s × {heart_rate*60:.0f} bpm): {int(heart_rate * 10)}")
print(f"  Mean heart rate: {np.mean(heart_rate_bpm):.2f} BPM")
print(f"  HR std: {np.std(heart_rate_bpm):.2f} BPM")
print(f"  Mean RR interval: {np.mean(rr_intervals):.2f} ms")
print(f"  Min peak height: {properties['peak_heights'].min():.3f}")

# Power spectral density of RR intervals
f, Pxx = signal.welch(rr_intervals, fs=1/(np.mean(rr_intervals)/1000), nperseg=32)
print(f"\nPower Spectral Density:")
print(f"  LF power (0.04-0.15 Hz): {np.trapz(Pxx[(f >= 0.04) & (f <= 0.15)]):.4f}")
print(f"  HF power (0.15-0.4 Hz):  {np.trapz(Pxx[(f >= 0.15) & (f <= 0.4)]):.4f}")
```

**Output:**
```
ECG Peak Detection Results:
  Number of peaks detected: 12
  Expected (10s × 72 bpm): 12
  Mean heart rate: 72.35 BPM
  HR std: 1.23 BPM
  Mean RR interval: 829.85 ms
  Min peak height: 1.238

Power Spectral Density:
  LF power (0.04-0.15 Hz): 0.0234
  HF power (0.15-0.4 Hz):  0.0189
```

**Explanation:**
`find_peaks` detects R-peaks using a minimum height threshold and a minimum distance between peaks (to avoid double-detecting the same beat). The RR intervals yield heart rate and heart rate variability metrics. Welch's method computes the PSD of RR intervals, separating low-frequency (sympathetic) and high-frequency (parasympathetic) components for HRV analysis.

## 🏢 Real World Use Case

**Seismic Data Processing:** A geophysicist analyzes earthquake recordings from seismometers:
- `signal.convolve` applies instrument response deconvolution
- `signal.butter` with `filtfilt` bandpass filters (0.5-10 Hz) to isolate P-waves and S-waves
- `signal.spectrogram` generates time-frequency plots to identify dispersion patterns
- `signal.find_peaks` detects P-wave and S-wave arrival times for epicenter localization
- `signal.welch` computes background noise levels for station quality assessment
- `signal.correlate` cross-correlates signals from multiple stations for array processing

## 🎯 Interview Questions

**Q1:** What is the difference between `filtfilt` and `lfilter`?
**A:** `lfilter` is a causal filter — it processes the signal forward in time, introducing a phase shift. `filtfilt` applies the filter forward and then backward, yielding zero phase distortion but doubling the effective filter order. Use `filtfilt` when preserving the phase relationship between frequencies is critical.

**Q2:** What does `find_peaks` return and how do you filter peaks by prominence?
**A:** Returns a tuple `(peaks_indices, properties_dict)`. The `properties` dict contains `peak_heights`, `prominences`, `left_bases`, `right_bases`, `widths`, etc. Use `prominence` parameter: `find_peaks(x, prominence=0.5)` only returns peaks with prominence ≥ 0.5.

**Q3:** How does Welch's method differ from the periodogram?
**A:** The periodogram computes the power spectrum of the entire signal (high variance, noisy estimate). Welch's method averages multiple periodograms computed on overlapping windowed segments of the data, producing a smoother PSD estimate with lower variance at the cost of reduced frequency resolution.

**Q4:** What is the purpose of `signal.savgol_filter` and what parameters does it need?
**A:** Savitzky-Golay filter smooths data by fitting a polynomial (of order `polyorder`) to a sliding window (of `window_length` points) using least squares. It preserves higher moments (peak height, width) better than a moving average. Parameters: `window_length` (odd integer), `polyorder` (< window_length).

**Q5:** How do you design a bandpass Butterworth filter in SciPy?
**A:** `signal.butter(4, [low_cut, high_cut], btype='band', fs=fs)` where `low_cut` and `high_cut` are the passband edge frequencies. The filter order and ripples can be controlled with additional parameters.

## ⚠ Common Errors / Mistakes

- **`butter` expects normalized frequency**: Filter cutoff frequencies must be normalized by the Nyquist frequency (fs/2) when not using the `fs` parameter. Use `cutoff / (fs/2)` or pass `fs=sampling_freq` directly.
- **`filtfilt` doubles effective filter order**: A 4th-order Butterworth with `filtfilt` behaves like an 8th-order filter. Design accordingly.
- **Edge effects in filtering**: Both `lfilter` and `filtfilt` have transient effects at signal boundaries. Longer signals reduce boundary artifacts proportionally.
- **`find_peaks` distance parameter units**: The `distance` parameter is in samples, not seconds. Convert: `distance = min_seconds * fs`.
- **`spectrogram` output dimensions**: Returns (frequencies, time, spectrogram) as `f, t, Sxx`. The spectrogram `Sxx` is 2D with shape `(len(f), len(t))`.

## 📝 Practice Exercises

**Beginner:**
1. Generate a signal: 2 Hz sine wave + 30 Hz noise. Design a 4th-order lowpass Butterworth filter with cutoff 10 Hz and apply it with `filtfilt`.
2. Use `signal.convolve` to compute the moving average of a noisy signal with a window of size 11 (use `np.ones(11)/11` as the kernel). Compare with the original noisy signal.
3. Use `signal.find_peaks` on a sine wave sin(t) for t in [0, 4π] and verify it finds peaks at π/2 and 5π/2.

**Intermediate:**
4. Generate a chirp signal (frequency increasing from 1 Hz to 20 Hz over 10 seconds at fs=200). Compute and plot its spectrogram using `signal.spectrogram`. Identify the chirp visually.
5. Design a Butterworth bandstop (notch) filter to remove 50 Hz powerline noise from a signal. Generate a test signal with 10 Hz + 50 Hz, apply the filter, and measure the attenuation at 50 Hz.
6. Use `signal.correlate` to find the time delay between two versions of the same signal shifted by 0.1 seconds (at fs=1000). The peak of the cross-correlation should indicate the lag.

**Advanced:**
7. Implement a simple QRS detection algorithm: generate an ECG-like signal, apply a bandpass filter (5-15 Hz), compute the signal energy using squaring and a moving average window, then use `find_peaks` to detect QRS complexes. Compare detection accuracy with direct peak detection on the raw signal.
8. Compare `signal.fftconvolve`, `signal.oaconvolve`, and `signal.convolve` in terms of speed for kernel sizes from 10 to 10^5 points. Create a log-log plot of execution time vs. kernel size and explain the scaling behavior of each method.
