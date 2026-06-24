# 60. CSS Animations

## 📘 Introduction
CSS animations bring web interfaces to life by automatically interpolating between defined keyframe states. Unlike transitions (which require a state change), animations can run on page load, loop infinitely, and choreograph complex multi-step sequences without JavaScript.

## 🧠 Key Concepts
- **@keyframes rule**: Defines the animation sequence with percentage waypoints (0%–100% or `from`/`to`)
- **animation-name**: References which `@keyframes` to use
- **animation-duration**: Total time for one animation cycle
- **animation-timing-function**: Acceleration curve for the animation (or per-keyframe)
- **animation-delay**: Time before the animation starts (negative values start mid-animation)
- **animation-iteration-count**: Number of cycles (`infinite` or a number)
- **animation-direction**: Play direction (`normal`, `reverse`, `alternate`, `alternate-reverse`)
- **animation-fill-mode**: Styles applied before/after animation (`none`, `forwards`, `backwards`, `both`)
- **animation-play-state**: Pause or resume (`running`, `paused`)
- **animation shorthand**: All animation properties in one declaration
- **Step-by-step animation**: `steps()` timing function for frame-by-frame sprite animation

## 💻 Syntax

```css
/* Keyframe definition */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  50%  { transform: translateX(20px); opacity: 0.8; }
  100% { transform: translateX(0); opacity: 1; }
}

/* Individual properties */
.element {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0.5s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
}

/* Shorthand - order: name duration timing-function delay iteration-count direction fill-mode play-state */
.element {
  animation: slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s 1 normal both running;
}

/* Infinite alternate */
.pulse {
  animation: pulse 2s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.7; }
  to   { transform: scale(1.1); opacity: 1; }
}

/* Step animation (for sprite sheets) */
.sprite {
  width: 64px;
  height: 64px;
  background-image: url('sprite-sheet.png');
  animation: walk 0.6s steps(8) infinite;
}

@keyframes walk {
  from { background-position: 0 0; }
  to   { background-position: -512px 0; }
}

/* Animation play state */
.animated:hover {
  animation-play-state: paused;
}
```

## ✅ Example 1 - Basic: Bouncing Loading Dot

**Problem**: Create a three-dot bouncing loading indicator that loops infinitely.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .loader {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #2c3e50;
  }

  .dot {
    width: 16px;
    height: 16px;
    background: #e74c3c;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
  }

  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }
  .dot:nth-child(3) { animation-delay: 0s; }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  body { margin: 0; }
</style>
</head>
<body>
<div class="loader">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
</body>
</html>
```

**Output**: Three red dots appear in a row. They bounce up sequentially (scale from 0 to 1 and back) in a staggered rhythm, creating a classic loading animation.

**Explanation**: All three dots use the same `bounce` keyframes. Negative `animation-delay` values (-0.32s, -0.16s) start each dot at a different point in the cycle, creating the staggered effect. `infinite` makes it loop forever. `both` fill mode ensures dots remain invisible before the animation starts.

## 🚀 Example 2 - Intermediate: Animated Progress Bar with Multiple Steps

**Problem**: Create a progress bar that fills in stages with a shimmer effect.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .progress-container {
    width: 400px;
    height: 24px;
    background: #ecf0f1;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    margin: 40px auto;
  }

  .progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 12px;
    animation: fillProgress 3s ease-in-out 0.5s 1 forwards;
    position: relative;
  }

  @keyframes fillProgress {
    0%   { width: 0%; }
    20%  { width: 25%; }
    40%  { width: 40%; }
    60%  { width: 60%; }
    80%  { width: 75%; }
    100% { width: 100%; }
  }

  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 1.5s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%   { transform: translateX(-60px); }
    100% { transform: translateX(400px); }
  }

  .label {
    text-align: center;
    font-family: Arial, sans-serif;
    color: #2c3e50;
    font-size: 14px;
    margin-top: 8px;
  }

  body {
    padding: 80px 20px;
    margin: 0;
    background: #f5f6fa;
  }
</style>
</head>
<body>
<div class="progress-container">
  <div class="progress-bar"></div>
</div>
<div class="label">Loading... 100%</div>
</body>
</html>
```

**Output**: A rounded progress bar fills from 0% to 100% in staged increments over 3 seconds. A white shimmer highlight runs across the bar repeatedly.

**Explanation**: The `fillProgress` keyframes use discrete percentage stops to simulate staged progress. `forwards` fill mode keeps the bar at 100% after completion. The `::after` pseudo-element with its own `shimmer` animation creates the moving highlight effect independently of the parent animation.

## 🏢 Real World Use Case
**Onboarding tutorial spotlight**: A web app uses CSS animations for its onboarding overlay—a radial gradient spotlight (`clip-path: circle()`) animates to highlight each UI element sequentially. The spotlight pulses (`scale` animation) to draw attention, while tooltip text fades in with a staggered delay using separate animation-delay values.

## 🎯 Interview Questions

1. **Q**: What is the difference between `animation-fill-mode: forwards` and `animation-fill-mode: both`?
   **A**: `forwards` applies the final keyframe styles after the animation ends. `both` applies `forwards` and `backwards` (the initial keyframe styles are applied during the delay period too).

2. **Q**: How does `animation-direction: alternate` work with `animation-iteration-count: infinite`?
   **A**: The animation plays forward, then backward, then forward, etc., for each iteration. For example, a fade-in/out loop: goes from 0% to 100%, then 100% back to 0%, and repeats.

3. **Q**: What does a negative `animation-delay` do?
   **A**: It starts the animation partway through its cycle, as if it had already been running for that duration. Useful for synchronizing multiple elements in staggered animations.

4. **Q**: How do you pause and resume a CSS animation?
   **A**: Use `animation-play-state: paused;` and `animation-play-state: running;`. Toggling via a class or JavaScript will freeze/resume the animation at its current position.

5. **Q**: What is the `steps()` timing function used for?
   **A**: `steps(n, direction)` divides the animation into `n` discrete jumps instead of smooth interpolation. It is primarily used for sprite sheet animations where each step moves to the next sprite frame.

## ⚠ Common Errors / Mistakes
- **Forgetting `@keyframes` name must match `animation-name`**: A typo in either silently fails the animation (no error is thrown).
- **Not setting `animation-duration`**: Defaults to `0s`, making the animation invisible.
- **Using `forwards` and expecting the element to stay at 100% when using `infinite`**: `infinite` overrides fill mode—the animation loops forever and never keeps the final state.
- **Animating non-animatable properties**: Some properties like `display` cannot be animated. Use `opacity`, `visibility`, or `transform` as alternatives.
- **Conflicting transitions and animations**: If both `transition` and `animation` target the same property, the animation takes precedence during its runtime, but the transition may interfere after.

## 📝 Practice Exercises

### Beginner
1. Create a fading animation that makes a heading appear by transitioning `opacity` from 0 to 1 over 2 seconds.
2. Add `animation: spin 2s linear infinite` to a div and define the `@keyframes spin` that rotates from 0deg to 360deg.
3. Make a colored square pulse (scale up and down) using `alternate` direction with 1 second cycle.

### Intermediate
4. Build a 12-hour analog clock face with second, minute, and hour hands using separate CSS animations with different durations and `steps(60)` for the second hand.
5. Create a typing cursor effect: a blinking vertical bar (`|`) that uses `steps(2)` to toggle opacity on and off, synchronized with a `clip-path` reveal of text characters.
6. Design an animated notification badge that: (1) scales up from 0, (2) wiggles slightly (small rotate oscillation), (3) then pulses gently. Use multiple keyframe blocks for each phase.

### Advanced
7. Build a complete CSS-only loading spinner with three concentric rings rotating at different speeds and directions, each with different `border` styles (solid, dashed, dotted) and `border-radius`.
8. Create a sprite sheet animation for a character walk cycle using `steps()`. Use a single sprite sheet image (or CSS gradient patterns to simulate frames) with `background-position` animation. Include idle (paused) and running (fast) states toggled by hover.
