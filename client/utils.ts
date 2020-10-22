const zeros = (number: number): string =>
  number > 9 ? String(number) : `0${number}`;

export const formattedDate = (date: Date) => {
  const day = zeros(date.getDate());
  const month = zeros(date.getMonth());
  const year = zeros(date.getFullYear());

  return `${day}/${month}/${year}`;
};
