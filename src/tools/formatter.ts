export const onPhoneFormatter = (value: string): string => {
  if (value.startsWith('+82')) value = value.replace('+82', '');
  if (value.startsWith('10')) value = `0${value}`;

  return value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

export const onDistanceFormatter = (distance: number): string => {
  if (distance < 1000) return `${distance}M`;
  return `${Math.round(distance / 100) / 10}KM`;
};

export const onTimeFormatter = (minutes: number): string => {
  if (minutes < 60) return `${minutes}분`;
  return `${Math.round(minutes / 60)}시간 ${Math.round(minutes % 60)}분`;
};
