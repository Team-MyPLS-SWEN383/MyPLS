export const toMySqlDate = (date: Date) => {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}