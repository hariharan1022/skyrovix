export function getDeviceInfo() {
  if (typeof navigator === "undefined") return { device: "Unknown", browser: "Unknown", os: "Unknown" };

  const ua = navigator.userAgent;

  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && 'ontouchend' in document)) device = "Tablet";
    else if (/Mobi|Android|iPhone|iPod/i.test(ua)) device = /iPad|tablet/i.test(ua) ? "Tablet" : "Mobile";
  }

  let browser = "Unknown";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/") || ua.includes("Edge/")) browser = "Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/")) browser = "Safari";
  else if (ua.includes("OPR/") || ua.includes("Opera/")) browser = "Opera";

  let os = "Unknown";
  if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Linux") && !ua.includes("Android")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod")) os = "iOS";
  else if (ua.includes("CrOS")) os = "ChromeOS";

  return { device, browser, os };
}
