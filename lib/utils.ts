import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatManual = (num: string | null) => {
 
  const match = num?.match(/^(\d{2})(\d{1})(\d{4})(\d{6})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return num;
};
