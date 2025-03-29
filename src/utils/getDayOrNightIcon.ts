// /** @format */

// export function getDayOrNightIcon(
//     iconName: string,
//     dateTimeString: string
//   ): string {
//     const hours = new Date(dateTimeString).getHours(); // Get hours from the given date and time string
  
//     const isDayTime = hours >= 6 && hours < 18; // Consider daytime from 6 AM to 6 PM
  
//     return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
//   }


/**
 * Converts Open-Meteo weather codes to appropriate day/night icons
 * @param code Open-Meteo WMO weather code (0-99)
 * @param dateTimeString ISO date string for determining day/night
 * @returns Icon name matching our local weather icons
 */
export function getDayOrNightIcon(
  code: number,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours >= 6 && hours < 18; // Daytime from 6 AM to 6 PM

  // Map WMO weather codes to our icon system
  switch (code) {
    // Clear
    case 0:
      return isDayTime ? 'clear-day' : 'clear-night';
    
    // Mainly clear, partly cloudy, and overcast
    case 1:
      return isDayTime ? 'partly-cloudy-day' : 'partly-cloudy-night';
    case 2:
    case 3:
      return 'cloudy';
    
    // Fog and depositing rime fog
    case 45:
    case 48:
      return 'fog';
    
    // Drizzle
    case 51:
    case 53:
    case 55:
      return 'drizzle';
    
    // Freezing drizzle
    case 56:
    case 57:
      return 'sleet';
    
    // Rain
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return 'rain';
    
    // Freezing rain
    case 66:
    case 67:
      return 'sleet';
    
    // Snow
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return 'snow';
    
    // Thunderstorm
    case 95:
    case 96:
    case 99:
      return 'thunderstorm';
    
    // Default for unknown codes
    default:
      return 'not-available';
  }
}