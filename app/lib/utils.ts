// Simplified version without clsx dependency
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
