export const onPhoneFormatter = (value: string) => {
  if (value.startsWith('+82')) value = value.substring(4);
  if (value.startsWith('10')) value = `0${value}`;

  return value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};
