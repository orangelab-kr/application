export const onPhoneFormatter = (value: string): string => {
  if (value.startsWith('+82')) value = value.replace('+82', '');
  if (value.startsWith('10')) value = `0${value}`;

  return value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};

export const onKickboardCodeFormatter = (value: string): string =>
  value
    .toUpperCase()
    .substring(0, 6)
    .replace(/[\W_]+/g, '');

export const onDistanceFormatter = (distance: number): string => {
  if (distance < 1000) return `${distance}M`;
  return `${Math.round(distance / 100) / 10}KM`;
};

export const onTimeFormatter = (minutes: number): string => {
  if (minutes < 60) return `${minutes}분`;
  return `${Math.round(minutes / 60)}시간 ${Math.round(minutes % 60)}분`;
};

export const onCardNumberFormatter = (cardNumber: string) => {
  var v = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || '';
  var parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) cardNumber = parts.join('-');
  return cardNumber;
};

export const onExpiryFormatter = (expiry: string) => {
  expiry = expiry.replace(/\//g, '');
  if (expiry.length < 4) return expiry;
  return `${expiry.substring(0, 4)}/${expiry.substring(4, 6)}`;
};
