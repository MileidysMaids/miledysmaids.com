// src/utils/localStorage.js

export const isBrowser = () => typeof window !== "undefined";

export const safeLocalStorage = {
  getItem: (key: string) => {
    if (isBrowser()) return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (isBrowser()) localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (isBrowser()) localStorage.removeItem(key);
  },
};
