// src/utils/localStorage.js

export const isBrowser = () => typeof window !== "undefined";

export const safeLocalStorage = {
  getItem: (key: string) => {
    if (isBrowser()) return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (isBrowser()) window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (isBrowser()) window.localStorage.removeItem(key);
  },
};
