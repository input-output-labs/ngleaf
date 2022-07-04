export function sameDay(date1: Date, date2: Date): boolean {
  const sameYear = date1.getFullYear() === date2.getFullYear();
  const sameMonth = date1.getMonth() === date2.getMonth();
  const sameDay = date1.getDate() === date2.getDate();
  return sameYear && sameMonth && sameDay;
}
