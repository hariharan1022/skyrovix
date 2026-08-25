# 53. HTML Geolocation

## 📘 Introduction
The Geolocation API allows web applications to access the user's geographical location (latitude, longitude) with their permission. It enables location-aware features such as mapping, route tracking, nearby services, and location-based content, enhancing user experience in navigation, e-commerce, and social applications.

## 🧠 Key Concepts
- **navigator.geolocation**: The browser object providing geolocation access methods
- **getCurrentPosition()**: One-time request for the user's current position
- **watchPosition()**: Continuously tracks position changes, returning updated coordinates
- **Position Object**: Contains `coords` (latitude, longitude, accuracy, altitude, speed, heading) and `timestamp`
- **coords.latitude**: Latitude in decimal degrees (e.g., 40.7128)
- **coords.longitude**: Longitude in decimal degrees (e.g., -74.0060)
- **coords.accuracy**: Accuracy level of the position in meters
- **Error Handling**: Handles errors like permission denied, position unavailable, or timeout
- **Permission Handling**: Modern browsers require explicit user consent; `navigator.permissions.query({ name: 'geolocation' })` can check permission state
- **High Accuracy**: `enableHighAccuracy: true` requests GPS-level accuracy (more battery consumption)

## 💻 Syntax
```html
<!DOCTYPE html>
<html>
<head>
  <title>Geolocation Demo</title>
</head>
<body>
  <p id="location"></p>
  <p id="error"></p>

  <script>
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          document.getElementById('location').textContent =
            `Latitude: ${lat}, Longitude: ${lon}`;
        },
        function(error) {
          document.getElementById('error').textContent =
            `Error: ${error.message}`;
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      document.getElementById('error').textContent =
        'Geolocation is not supported by this browser.';
    }
  </script>
</body>
</html>
```

## ✅ Example 1 - Basic (Get Current Position + Reverse Geocoding)

**Problem:** Show the user's current location as a human-readable address on page load.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Find My Location</title>
</head>
<body>
  <h1>📍 Your Location</h1>
  <button onclick="getLocation()">Get My Location</button>
  <p id="output"></p>

  <script>
    function getLocation() {
      const output = document.getElementById('output');
      output.textContent = 'Getting location...';

      if (!navigator.geolocation) {
        output.textContent = 'Geolocation not supported.';
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async function(pos) {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;

          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await res.json();
            output.innerHTML =
              `<strong>Address:</strong> ${data.city}, ${data.principalSubdivision}, ${data.countryName}<br>
               <strong>Coordinates:</strong> ${lat.toFixed(4)}, ${lon.toFixed(4)}<br>
               <strong>Accuracy:</strong> ±${Math.round(accuracy)}m`;
          } catch {
            output.textContent = `Lat: ${lat}, Lon: ${lon} (Reverse geocoding failed)`;
          }
        },
        function(err) {
          const messages = {
            1: 'Permission denied. Allow location access.',
            2: 'Position unavailable. Try again.',
            3: 'Request timed out.'
          };
          output.textContent = messages[err.code] || 'Unknown error.';
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  </script>
</body>
</html>
```

**Output:** After clicking the button and granting permission, the page displays the user's approximate address, exact coordinates, and accuracy radius.

**Explanation:** `getCurrentPosition()` requests location once. The success callback receives a `Position` object with `coords.latitude` and `coords.longitude`. A reverse geocoding API converts coordinates to a human-readable address. Error handling maps error codes to user-friendly messages.

## 🚀 Example 2 - Intermediate (Live GPS Tracking with Map)

**Problem:** Build a live location tracker that updates a map as the user moves, showing speed and distance traveled.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Live GPS Tracker</title>
  <style>
    #map { width: 100%; height: 400px; background: #f0f0f0; position: relative; }
    .dot { width: 10px; height: 10px; background: red; border-radius: 50%;
           position: absolute; transform: translate(-50%, -50%); }
  </style>
</head>
<body>
  <h1>Live Tracker</h1>
  <div id="map">
    <div class="dot" id="marker" style="display:none;"></div>
  </div>
  <p id="status">Waiting for GPS...</p>
  <button onclick="startTracking()">Start Tracking</button>
  <button onclick="stopTracking()" disabled id="stopBtn">Stop</button>

  <script>
    let watchId = null;
    let prevPos = null;
    let totalDistance = 0;

    function startTracking() {
      if (!navigator.geolocation) return alert('Geolocation not supported.');

      document.getElementById('status').textContent = 'Acquiring GPS...';
      document.getElementById('stopBtn').disabled = false;

      watchId = navigator.geolocation.watchPosition(
        function(pos) {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;
          const speed = pos.coords.speed; // m/s

          // Update marker position on pseudo-map
          const marker = document.getElementById('marker');
          marker.style.display = 'block';
          marker.style.left = `${((lon + 180) / 360) * 100}%`;
          marker.style.top = `${((90 - lat) / 180) * 100}%`;

          // Calculate distance from previous position
          if (prevPos) {
            const R = 6371000; // Earth radius in meters
            const dLat = (lat - prevPos.lat) * Math.PI / 180;
            const dLon = (lon - prevPos.lon) * Math.PI / 180;
            const a = Math.sin(dLat/2) ** 2 +
                      Math.cos(prevPos.lat * Math.PI / 180) *
                      Math.cos(lat * Math.PI / 180) * Math.sin(dLon/2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            totalDistance += R * c;
          }
          prevPos = { lat, lon };

          document.getElementById('status').innerHTML =
            `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)}<br>
             Accuracy: ±${Math.round(accuracy)}m<br>
             Speed: ${speed !== null && speed !== undefined ? (speed * 3.6).toFixed(1) + ' km/h' : 'N/A'}<br>
             Total Distance: ${(totalDistance / 1000).toFixed(2)} km`;
        },
        function(err) {
          document.getElementById('status').textContent =
            `Tracking error: ${err.message}`;
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }

    function stopTracking() {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById('status').textContent = 'Tracking stopped.';
        document.getElementById('stopBtn').disabled = true;
      }
    }
  </script>
</body>
</html>
```

**Output:** A live tracking interface showing a red dot moving on a map-like area, with real-time coordinate, speed, accuracy, and total distance updates.

**Explanation:** `watchPosition()` continuously monitors location. Speed is reported in m/s (converted to km/h). Distance is calculated using the Haversine formula. `clearWatch()` stops tracking. `enableHighAccuracy: true` requests GPS-level precision.

## 🏢 Real World Use Case
**Food Delivery Tracking:** A food delivery app uses `watchPosition()` on the driver's phone to send real-time GPS coordinates to the server. The customer's app uses `getCurrentPosition()` to find nearby restaurants. The system checks `coords.accuracy` to ensure reliable positioning. Error handling shows "GPS signal lost" if accuracy exceeds 50 meters. Permission handling gracefully asks users to enable location if initially denied.

## 🎯 Interview Questions
1. **Q:** What are the possible error codes returned by the Geolocation API?  
   **A:** `PERMISSION_DENIED` (1) – user denied access; `POSITION_UNAVAILABLE` (2) – GPS failed; `TIMEOUT` (3) – request timed out.

2. **Q:** What is the difference between `getCurrentPosition()` and `watchPosition()`?  
   **A:** `getCurrentPosition()` returns a single position once. `watchPosition()` returns continuous updates (fires the success callback whenever position changes) until `clearWatch()` is called.

3. **Q:** What does `enableHighAccuracy: true` do, and what are its trade-offs?  
   **A:** It requests GPS-level accuracy (vs. WiFi/cell triangulation). Trade-offs: higher battery drain, slower response time, and may not work indoors.

4. **Q:** How can you check geolocation permission status without triggering a prompt?  
   **A:** Use `navigator.permissions.query({ name: 'geolocation' })` which returns `{ state: 'granted' | 'denied' | 'prompt' }`.

5. **Q:** Why might `coords.speed` be null even when the user is moving?  
   **A:** Speed is only available on devices with GPS hardware (not WiFi-based location). Some browsers also report it as null depending on the platform.

## ⚠ Common Errors / Mistakes
- Not checking `navigator.geolocation` for browser support before calling methods
- Calling geolocation methods on HTTP (non-HTTPS) pages — most browsers block it
- Not handling the `PERMISSION_DENIED` error gracefully (appears broken)
- Setting `timeout` too low (< 5000ms), causing frequent timeout errors with GPS
- Setting `maximumAge` too high, using stale cached positions
- Forgetting to call `clearWatch()` when the component/page unmounts (memory leak)
- Assuming `coords.speed` is always available (it's null on many devices)
- Not accounting for negative latitudes/longitudes (southern/western hemispheres)

## 📝 Practice Exercises

**Beginner:**
1. Create a page that displays the user's current latitude and longitude when they click a "Show Location" button.
2. Build a form that auto-fills the city and country fields using reverse geocoding after getting the user's position.
3. Show an error message styled in red when the user denies location permission, with a button to try again.

**Intermediate:**
4. Build a "Nearby Places" finder: get the user's location, then use the Overpass API (or similar) to find cafes/parks within 1km. Display results as a list with distances.
5. Create a geolocation-based speedometer that shows real-time speed in km/h with a circular gauge visualization using CSS/SVG. Include accuracy indicator.
6. Build a geofencing demo: when the user enters a predefined virtual boundary (e.g., within 500m of a landmark), trigger an alert or visual notification.

**Advanced:**
7. Implement a breadcrumb trail recorder: use `watchPosition()` to track a route, draw the path on a Canvas element, calculate total distance and average speed, and allow exporting the track as GeoJSON. Include an option to save to localStorage.
8. Build a progressive web app (PWA) that continues geolocation tracking in the background using Service Workers, syncs position data to a server when online, and queues it locally when offline.
