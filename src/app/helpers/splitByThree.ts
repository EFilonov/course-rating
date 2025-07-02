
export default function splitByThree(str: string | number): string {
  return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(" ₴");
}