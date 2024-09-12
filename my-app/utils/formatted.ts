export const formatDate = (dateString: string, customFormat?: string) => {
  const date = new Date(dateString);

  if (customFormat) {
    // Format personnalisé - Remplacer les éléments par les valeurs appropriées
    return customFormat
      .replace('DD', String(date.getDate()).padStart(2, '0')) // Jour avec zéro-padding
      .replace('MM', String(date.getMonth() + 1).padStart(2, '0')) // Mois avec zéro-padding (indexé à 0)
      .replace('YYYY', String(date.getFullYear())) // Année
      .replace('HH', String(date.getHours()).padStart(2, '0')) // Heure avec zéro-padding
      .replace('mm', String(date.getMinutes()).padStart(2, '0')); // Minutes avec zéro-padding
  }

  // Format par défaut (utilisation de Intl.DateTimeFormat)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString('fr-FR', defaultOptions);
};