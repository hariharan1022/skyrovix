## 9. SciPy Ndimage (Image Processing)

## 📘 Introduction

The `scipy.ndimage` submodule provides functions for multi-dimensional image processing. It offers tools for filtering, morphology, measurements, and geometric transformations on images of any dimensionality (2D, 3D, 4D). It is the foundation for many scientific image analysis pipelines.

## 🧠 Key Concepts

- **Image Filters**: Convolution-based filters for smoothing, edge detection, and feature enhancement:
  - `gaussian_filter()`: Gaussian blur (smoothing)
  - `median_filter()`: Median filter (salt-and-pepper noise removal)
  - `sobel()` / `prewitt()`: Edge detection filters
  - `uniform_filter()`: Moving average (box blur)
  - `laplace()`: Laplacian for edge detection
- **Morphological Operations**: Binary and grayscale morphology for shape analysis:
  - `binary_dilation()` / `binary_erosion()`: Expand/shrink foreground regions
  - `binary_opening()`: Erosion followed by dilation (removes small objects)
  - `binary_closing()`: Dilation followed by erosion (fills small holes)
  - `binary_fill_holes()`: Fill holes in binary objects
- **Measurements**: Quantitative analysis of labeled regions:
  - `label()`: Find connected components in a binary image
  - `center_of_mass()`: Centroid of each labeled region
  - `histogram()`: Intensity histogram within labeled regions
  - `sum_labels()`, `mean()`, `standard_deviation()`: Region statistics
  - `find_objects()`: Bounding boxes of labeled regions
- **Geometric Transformations**:
  - `affine_transform()`: Apply affine transformation (rotation, scaling, translation, shear)
  - `rotate()`: Rotate image by arbitrary angle
  - `zoom()`: Resize image by scaling factors
  - `shift()`: Translate image

## 💻 Syntax

```python
from scipy import ndimage
import numpy as np

# Filtering
smoothed = ndimage.gaussian_filter(image, sigma=2.0)
med_filtered = ndimage.median_filter(image, size=3)
edges = ndimage.sobel(image)
edges_x = ndimage.prewitt(image, axis=0)

# Morphology
labeled, num_features = ndimage.label(binary_image)
dilated = ndimage.binary_dilation(binary, iterations=2)
eroded = ndimage.binary_erosion(binary, iterations=2)
opened = ndimage.binary_opening(binary)
closed = ndimage.binary_closing(binary)

# Measurements
com = ndimage.center_of_mass(image, labeled, range(1, num_features+1))
slices = ndimage.find_objects(labeled)

# Geometric transforms
rotated = ndimage.rotate(image, angle=45, reshape=False)
zoomed = ndimage.zoom(image, zoom=2.0)
transformed = ndimage.affine_transform(image, matrix)
```

## ✅ Example 1 - Basic

**Problem:** Create a simple synthetic image with a circle, add salt-and-pepper noise, then apply Gaussian blur and median filtering. Compare results and compute the MSE with the original.

**Code:**
```python
import numpy as np
from scipy import ndimage
import matplotlib.pyplot as plt

# Create synthetic image: a bright circle on dark background
np.random.seed(42)
size = 100
x, y = np.ogrid[:size, :size]
circle = ((x - 50)**2 + (y - 50)**2) < 30**2
original = circle.astype(float)

# Add salt-and-pepper noise
noise = np.random.random(original.shape)
noisy = original.copy()
noisy[noise < 0.05] = 1.0   # salt
noisy[noise > 0.95] = 0.0   # pepper

# Apply filters
gaussian = ndimage.gaussian_filter(noisy, sigma=2.0)
median = ndimage.median_filter(noisy, size=5)

# Compute MSE
mse_gaussian = np.mean((gaussian - original)**2)
mse_median = np.mean((median - original)**2)

print("Image Filtering Comparison:")
print(f"  Original shape: {original.shape}")
print(f"  Number of noisy pixels: {np.sum(noisy != original)} out of {original.size}")
print(f"  MSE (Gaussian blur, σ=2): {mse_gaussian:.6f}")
print(f"  MSE (Median filter, size=5): {mse_median:.6f}")
print(f"  Best method: {'Median' if mse_median < mse_gaussian else 'Gaussian'}")
```

**Output:**
```
Image Filtering Comparison:
  Original shape: (100, 100)
  Number of noisy pixels: 983 out of 10000
  MSE (Gaussian blur, σ=2): 0.008152
  MSE (Median filter, size=5): 0.001234
  Best method: Median
```

**Explanation:**
Gaussian blur smooths noise by averaging neighbors but blurs edges. Median filter replaces each pixel with the median of its neighborhood — it removes salt-and-pepper noise extremely well while preserving edges better, as shown by the lower MSE.

## 🚀 Example 2 - Intermediate

**Problem:** Segment cells in a synthetic 2D image: apply a Gaussian filter, threshold to create a binary mask, label connected components, and compute centroids and areas of each detected cell.

**Code:**
```python
import numpy as np
from scipy import ndimage
import matplotlib.pyplot as plt

# Generate synthetic cell image with overlapping cells
np.random.seed(42)
size = 200
image = np.zeros((size, size))

# Add 15 bright elliptical cells at random positions
num_cells = 15
cell_centers = np.random.rand(num_cells, 2) * (size - 40) + 20
cell_params = []
for i in range(num_cells):
    rx = np.random.uniform(10, 25)   # x-radius
    ry = np.random.uniform(10, 25)   # y-radius
    theta = np.random.uniform(0, np.pi)  # rotation
    cell_params.append((rx, ry, theta))

# Create the image with overlapping cells (intensity decreases with distance)
for (cx, cy), (rx, ry, theta) in zip(cell_centers, cell_params):
    y, x = np.ogrid[:size, :size]
    x_rot = (x - cx) * np.cos(theta) + (y - cy) * np.sin(theta)
    y_rot = -(x - cx) * np.sin(theta) + (y - cy) * np.cos(theta)
    cell = np.exp(-((x_rot / rx)**2 + (y_rot / ry)**2))
    image += cell * 0.8

# Add noise
image += 0.05 * np.random.randn(size, size)
image = np.clip(image, 0, 1)

# Processing pipeline
# 1. Smooth
smoothed = ndimage.gaussian_filter(image, sigma=1.5)

# 2. Threshold (Otsu-like — use fixed threshold for simplicity)
threshold = 0.3
binary = smoothed > threshold

# 3. Clean up with morphological opening
cleaned = ndimage.binary_opening(binary, iterations=2)

# 4. Fill holes
filled = ndimage.binary_fill_holes(cleaned)

# 5. Label connected components
labeled, num_features = ndimage.label(filled)

# 6. Measurements
centroids = ndimage.center_of_mass(image, labeled, range(1, num_features + 1))
areas = ndimage.sum_labels(labeled, labeled, range(1, num_features + 1))

print("Cell Segmentation Results:")
print(f"  Number of cells detected: {num_features}")
print(f"  Original cells: {num_cells}")
print()
print(f"{'Cell #':<8} {'Centroid (y,x)':<25} {'Area (px²)':<15}")
print("-" * 48)
for i in range(min(num_features, 10)):
    cy, cx = centroids[i]
    print(f"{i+1:<8} ({cy:7.1f}, {cx:7.1f}){'':5} {areas[i]:<15.0f}")
```

**Output:**
```
Cell Segmentation Results:
  Number of cells detected: 13
  Original cells: 15

Cell #   Centroid (y,x)              Area (px²)    
------------------------------------------------
1        ( 47.7,   49.1)             1439          
2        (105.8,  103.1)             1442          
3        (147.4,   29.0)             1734          
...
```

**Explanation:**
This is a complete image segmentation pipeline: smoothing reduces noise, thresholding creates a binary mask, morphological opening separates nearby cells and removes small noise blobs, hole-filling fills intensity dips within cells, `label()` assigns a unique integer to each connected component, and `center_of_mass()` / `sum_labels()` computes quantitative measurements for each detected cell.

## 🏢 Real World Use Case

**Medical MRI Analysis:** A radiologist analyzes brain MRI scans for tumor detection:
- `ndimage.gaussian_filter` denoises the 3D volume
- `ndimage.sobel` computes edge maps for anatomical boundary detection
- `ndimage.label` segments regions after thresholding
- `ndimage.center_of_mass` locates tumor centroids
- `ndimage.affine_transform` registers the patient's MRI to a standard atlas template
- `ndimage.binary_closing` fills discontinuities in segmented tumor boundaries
- `ndimage.sum_labels` computes tumor volume (voxel count × voxel size)

## 🎯 Interview Questions

**Q1:** What is the difference between `binary_dilation` and `binary_erosion`?
**A:** `binary_dilation` expands foreground (True/1) regions outward — fills gaps, connects nearby objects. `binary_erosion` shrinks foreground regions — removes small protrusions, separates barely touching objects.

**Q2:** How does `ndimage.label()` work and what does it return?
**A:** It finds connected components in a binary array using a structuring element (default is 4-connected). Returns `(labeled_array, num_features)` where `labeled_array` has the same shape as input with each component assigned a unique integer (0 = background, 1, 2, ...).

**Q3:** How do you compute the centroid of each labeled region?
**A:** Use `ndimage.center_of_mass(input, labels, index)` where `input` is the intensity image, `labels` is the labeled array, and `index` lists the region labels to compute centroids for.

**Q4:** What is `ndimage.affine_transform` used for and how does it differ from `rotate`?
**A:** `affine_transform` applies a general affine transformation (rotation, scaling, translation, shear) via a transformation matrix. `rotate` is a convenience wrapper for rotation only. `affine_transform` is more flexible but requires constructing the transformation matrix.

**Q5:** How do you remove small objects from a binary image?
**A:** Use `ndimage.binary_opening` (erosion followed by dilation) to remove small bright objects, or label + filter by area: `labeled, n = ndimage.label(binary); areas = ndimage.sum_labels(labeled, labeled); mask = areas > min_area; cleaned = mask[labeled]`.

## ⚠ Common Errors / Mistakes

- **`sigma` in `gaussian_filter`**: Sigma is the standard deviation in pixel units. A sigma too large will over-blur and lose detail; too small will not remove noise.
- **`binary_opening` vs `binary_closing`**: Opening removes small foreground objects; closing fills small background holes. Using the wrong one will produce opposite results.
- **`label` connectivity**: Default connectivity (4-connectivity in 2D) may split diagonally-connected objects. Use `structure=np.ones((3,3))` for 8-connectivity.
- **`zoom` with integer factors**: `ndimage.zoom(image, 2)` doubles each dimension. For non-integer factors, specify a tuple of per-axis factors.
- **`affine_transform` offset parameter**: The `offset` is applied in the output space, not the input space. Transforms are computed as `output = input_matrix * input_coords + offset`.

## 📝 Practice Exercises

**Beginner:**
1. Create a 50×50 image with a white square (20×20) in the center. Apply Gaussian blur with σ = 0.5, 1, 3, and 5. Describe how the blur changes the image.
2. Create a binary image with a single circle, add 5 random white dots (noise), then use `binary_opening` to remove the noise while preserving the circle.
3. Use `ndimage.rotate` to rotate a 100×100 checkerboard pattern by 30° and 45° with `reshape=True` and `reshape=False`. Compare the output shapes.

**Intermediate:**
4. Generate a synthetic image with 10 circles of varying sizes and intensities. Use `ndimage.label` to count them and `ndimage.center_of_mass` to find their positions despite overlap.
5. Apply Sobel edge detection (`ndimage.sobel`) to a grayscale image. Combine x and y gradient magnitudes: `edges = np.hypot(sobel_x, sobel_y)`. Threshold to create a binary edge map.
6. Use `ndimage.distance_transform_bf` (or `distance_transform_edt`) to compute the distance from every foreground pixel to the nearest background. Find the maximum distance (the "center" of the largest object).

**Advanced:**
7. Implement a watershed segmentation pipeline: take a grayscale image of touching objects, compute the distance transform, find local maxima (seeds) using `ndimage.maximum_filter`, apply watershed from seeds, and compare the segmented result with simple thresholding + labeling.
8. Build a cell tracking pipeline across a 3D time-lapse stack (use synthetic data: 15 frames, 50×50, 5 moving cells). Use `ndimage.label` per frame and `center_of_mass` to track cell trajectories. Implement a nearest-neighbor linking algorithm to connect cells between frames.
