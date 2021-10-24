const convertDateToString = (string = ''): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateFormat = new Date(string);
  const month = dateFormat.getMonth();
  const currentYear = dateFormat.getFullYear();

  return `${currentYear} ${monthNames[month]}`;
};

export default convertDateToString;
