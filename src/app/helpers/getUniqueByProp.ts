export const getUniqueByProp = <T extends Record<string, string>>(array: T[], prop: string): T[] => {
  const seen = new Set<string>();

  return array.filter(item => {
    const value = item[prop];
    if (typeof value !== 'string') return false; // можно отсеять не-строки
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};