export function rgbaToHsl(r, g, b, a = 1) {
  // Normalize RGB values to the range [0, 1]
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h, s, l;
  l = (max + min) / 2;

  // Calculate Saturation
  if (delta === 0) {
    h = s = 0; // Achromatic case
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));

    // Calculate Hue
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h *= 60; // Convert to degrees
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100), a];
}

export function hslToRgba(h, s, l, a = 1) {
  // Normalize hue, saturation, and lightness
  s /= 100;
  l /= 100;

  // Helper function to calculate RGB component
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };

  const r = Math.round(f(0) * 255);
  const g = Math.round(f(8) * 255);
  const b = Math.round(f(4) * 255);

  return [r, g, b, a];
}
