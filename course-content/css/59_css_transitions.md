# 59. CSS Transitions

## 📘 Introduction
CSS transitions provide smooth interpolations between property value changes. Instead of instant style changes, transitions create gradual animations that improve user experience and provide visual feedback for state changes.

## 🧠 Key Concepts
- **transition-property**: The CSS property to animate (or `all`)
- **transition-duration**: How long the transition takes (seconds or milliseconds)
- **transition-timing-function**: The acceleration curve (`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()`)
- **transition-delay**: Time before the transition starts
- **Shorthand**: Combine all four properties in one `transition` declaration
- **Transitionable properties**: Properties with interpolatable values (color, length, opacity, transform, etc.)
- **Non-transitionable properties**: `display`, `visibility` (only discrete), `font-family`, etc.
- **Hover transitions**: Most common use case for interactive feedback
- **Transition events**: JavaScript `transitionend` event for detecting completion

## 💻 Syntax

```css
/* Individual properties */
.element {
  transition-property: background-color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

/* Shorthand - order: property duration timing-function delay */
.element {
  transition: background-color 0.3s ease 0s,
              transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.1s;
}

/* All properties (use with caution) */
.element {
  transition: all 0.3s ease;
}

/* Timing functions */
.timing-ease        { transition-timing-function: ease; }
.timing-linear      { transition-timing-function: linear; }
.timing-ease-in     { transition-timing-function: ease-in; }
.timing-ease-out    { transition-timing-function: ease-out; }
.timing-ease-in-out { transition-timing-function: ease-in-out; }

/* Custom cubic-bezier */
.timing-bounce {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Transition on hover */
.button {
  background: #3498db;
  transform: scale(1);
  transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: #2980b9;
  transform: scale(1.05);
}
```

## ✅ Example 1 - Basic: Smooth Hover Transition

**Problem**: Create a button that smoothly changes color, background, and position on hover.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .btn {
    display: inline-block;
    padding: 14px 32px;
    border: 2px solid #6c5ce7;
    background: transparent;
    color: #6c5ce7;
    font-size: 16px;
    font-weight: bold;
    font-family: Arial, sans-serif;
    border-radius: 8px;
    cursor: pointer;

    /* Transition shorthand */
    transition: all 0.3s ease;
  }

  .btn:hover {
    background: #6c5ce7;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(108,92,231,0.4);
  }

  .btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(108,92,231,0.3);
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: #f8f9fa;
  }
</style>
</head>
<body>
<button class="btn">Hover Me</button>
</body>
</html>
```

**Output**: A bordered purple button fills with purple background, turns text white, lifts up, and adds a glow on hover—all smoothly transitioning over 0.3 seconds. On click it presses back down.

**Explanation**: `transition: all 0.3s ease` applies to any changed property. When hover state changes `background`, `color`, `transform`, and `box-shadow`, all four interpolate simultaneously over 0.3s with an ease curve.

## 🚀 Example 2 - Intermediate: Multi-Stage Transition with Delay and Cubic-Bezier

**Problem**: Create a notification banner that slides down, then fades in with a bounce effect.

**HTML+CSS Code**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<style>
  .notification {
    max-width: 400px;
    margin: 20px auto;
    padding: 16px 24px;
    background: #00b894;
    color: #fff;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    font-size: 15px;
    box-shadow: 0 4px 12px rgba(0,184,148,0.3);
    cursor: pointer;

    /* State 1: hidden above */
    transform: translateY(-100px);
    opacity: 0;

    /* Multi-property transitions with different timing */
    transition:
      transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s,
      opacity 0.4s ease 0.15s;
  }

  .notification.visible {
    transform: translateY(0);
    opacity: 1;
  }

  .notification.dismissed {
    transform: translateY(-100px);
    opacity: 0;
    transition:
      transform 0.3s ease-in 0s,
      opacity 0.2s ease 0s;
  }

  .controls {
    text-align: center;
    margin-top: 20px;
  }

  .controls button {
    padding: 10px 24px;
    border: none;
    border-radius: 6px;
    background: #6c5ce7;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin: 0 6px;
  }

  body {
    padding: 40px;
    margin: 0;
    background: #f5f6fa;
  }
</style>
</head>
<body>

<div class="notification" id="notif">
  ✅ Settings saved successfully!
</div>

<div class="controls">
  <button onclick="document.getElementById('notif').classList.add('visible'); document.getElementById('notif').classList.remove('dismissed')">Show</button>
  <button onclick="document.getElementById('notif').classList.add('dismissed'); document.getElementById('notif').classList.remove('visible')">Dismiss</button>
</div>

<script>
  document.getElementById('notif').addEventListener('transitionend', function(e) {
    console.log(e.propertyName + ' transition ended');
  });
</script>

</body>
</html>
```

**Output**: The notification sits hidden above. "Show" triggers it to drop down with an overshoot bounce (cubic-bezier with negative y component), then fade in slightly later (delayed opacity). "Dismiss" slides it back up quickly with ease-in.

**Explanation**: Two separate transition declarations target `transform` and `opacity` with different durations, delays, and timing functions. The cubic-bezier `(0.68, -0.55, 0.27, 1.55)` creates the overshoot bounce. The `transitionend` JavaScript event fires after each property completes.

## 🏢 Real World Use Case
**Form validation feedback**: A signup form uses transitions to animate input borders (red on error, green on success), slide in error messages with `max-height` transition, and shake the form (`translateX` oscillation) on submission with invalid data. Each transition has different durations and delays to create a staged feedback flow.

## 🎯 Interview Questions

1. **Q**: What is the shorthand order for the `transition` property?
   **A**: `transition: property duration timing-function delay;`. If only one time value is given, it is `duration`. Two time values are `duration` and `delay`.

2. **Q**: Can you transition `display: none` to `display: block`?
   **A**: No. `display` is not an animatable property. It changes discretely. Use `opacity`, `visibility`, `max-height`, or `transform` for show/hide animations.

3. **Q**: What does `transition: all 0.3s` do, and why should it be used cautiously?
   **A**: It applies the transition to every animatable property that changes. It can cause performance issues and unintended animations (e.g., animating `width` or `height` on hover when you only intended `color`).

4. **Q**: What is a `cubic-bezier()` function and how does it work?
   **A**: It defines a custom timing curve using four control points (x1, y1, x2, y2). The x values must be between 0 and 1. Values outside the 0–1 range for y create bounce/overshoot effects.

5. **Q**: What is the `transitionend` event and how is it used?
   **A**: It fires in JavaScript when a CSS transition completes. Each property fires its own event. Useful for sequencing JS logic after an animation finishes (e.g., removing an element from the DOM after fade-out).

## ⚠ Common Errors / Mistakes
- **Not specifying `transition-duration`**: Without a duration (or with `0s`), no animation occurs—the change is instant.
- **Using `all` with performance-sensitive properties**: `width` and `height` transitions trigger layout recalculations. Prefer `transform` and `opacity` for smooth 60fps transitions.
- **Mismatched property counts**: When transitioning multiple properties, ensure the shorthand or individual properties are correctly enumerated.
- **Assuming `auto` values transition**: `height: auto` cannot be interpolated. Use `max-height` with a fixed large value or `transform: scaleY()`.
- **Transition on initial page load**: Transitions can fire on page load if the element starts with a non-default state. Add `prefers-reduced-motion` queries or `animation: none` initially.

## 📝 Practice Exercises

### Beginner
1. Create a link that changes color from blue to red on hover with a 0.4s transition.
2. Add a `box-shadow` transition to a card that deepens on hover.
3. Create a button with `transform: scale(1.2)` on hover, using a 0.2s ease transition.

### Intermediate
4. Build a navigation menu where the active underline indicator slides horizontally between menu items using `transform: translateX()` with a transition.
5. Create an accordion that smoothly expands/collapses using `max-height` transition (hint: use a large fixed max-height value).
6. Implement a "skeleton loading" shimmer effect that transitions a gradient's `background-position` to create a moving shine animation.

### Advanced
7. Build a multi-stage transition sequence: on clicking a "Submit" button, the button first shrinks (scale), then changes color to green (with a delay), then reveals a checkmark icon (opacity fade). Use only CSS transitions and JavaScript class toggling.
8. Create a modal overlay that: (1) fades in the backdrop (`opacity`), (2) then slides the modal panel up (`translateY`) with a slight bounce, (3) and finally transitions the close button opacity in. Use separate transition-delay values for each step, all triggered by a single `.open` class on the container.
