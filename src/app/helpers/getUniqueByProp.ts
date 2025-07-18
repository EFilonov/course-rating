export const getUniqueByProp = <T>(array: T[], prop: keyof T): T[] => {
  const seen = new Set<string>();

  return array.filter(item => {
    const value = item[prop];
    if (typeof value !== 'string') return false; // filter out non-string values
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};