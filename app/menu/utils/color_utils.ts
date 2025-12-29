export function getLuminance(color: string): number {
  if (!color) return 255;

  let r: number, g: number, b: number;

  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const bigint = parseInt(
      hex.length === 3
        ? hex.split("").map((x) => x + x).join("")
        : hex,
      16
    );
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (color.startsWith("rgb")) {
    const values = color.match(/\d+/g);
    if (!values) return 255;
    [r, g, b] = values.map(Number);
  } else {
    return 255;
  }

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Determina el color de texto apropiado según el color de fondo
 * @param backgroundColor - Color de fondo
 * @returns Clase de Tailwind para el color de texto
 */
export function getTextColor(backgroundColor: string): string {
  return getLuminance(backgroundColor) < 140 ? "text-white" : "text-black";
}

/**
 * Verifica si un color es oscuro
 * @param color - Color a verificar
 * @returns true si el color es oscuro
 */
export function isDarkColor(color?: string): boolean {
  if (!color) return false;
  return getLuminance(color) < 140;
}