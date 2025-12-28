/**
 * Calcula la luminancia de un color RGB
 * @param color - Color en formato hex (#fff) o rgb(r, g, b)
 * @returns Valor de luminancia (0-255)
 */
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
 * Determina si un color es oscuro o claro
 * @param color - Color a evaluar
 * @returns true si el color es oscuro
 */
export function isDarkColor(color: string): boolean {
  return getLuminance(color) < 140;
}

/**
 * Retorna la clase de color de texto apropiada según el fondo
 * @param color - Color de fondo
 * @returns Clase de Tailwind para el color de texto
 */
export function getTextColor(color: string): string {
  return isDarkColor(color) ? "text-white" : "text-black";
}

/**
 * Añade transparencia a un color hex
 * @param color - Color en formato hex
 * @param opacity - Opacidad en formato hex (ej: "B3" para 70%)
 * @returns Color con transparencia
 */
export function addOpacity(color: string, opacity: string): string {
  return `${color}${opacity}`;
}