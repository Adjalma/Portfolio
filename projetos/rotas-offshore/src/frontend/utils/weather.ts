export const getWeatherColor = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return '#4CAF50';
    case 'cloudy':
      return '#9E9E9E';
    case 'rain':
      return '#2196F3';
    case 'storm':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
}; 