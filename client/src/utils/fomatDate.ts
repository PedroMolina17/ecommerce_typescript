// Función para formatear una fecha ISO a una cadena legible
export function formatDate(
  fechaISO: string,
  opciones?: Intl.DateTimeFormatOptions,
): string {
  // Convertir la fecha ISO a un objeto Date
  const fecha = new Date(fechaISO);

  // Opciones de formato por defecto
  const opcionesDefault: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,

    timeZone: "America/Lima", // Zona horaria de Lima
  };

  // Unir las opciones por defecto con las opciones personalizadas
  const opcionesFinales = { ...opcionesDefault, ...opciones };

  // Formatear la fecha
  const fechaLegible = fecha.toLocaleDateString("es-PE", opcionesFinales);

  return fechaLegible;
}
