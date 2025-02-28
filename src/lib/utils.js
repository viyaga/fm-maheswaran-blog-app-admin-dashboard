import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
}

const hasDraggableData = (entry) => {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true;
  }

  return false;
}

const formatBytes = (bytes, opts = {}) => {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'}`;
}

const errResponse = (error) => {
  const message = error?.response?.data?.error?.message || error?.response?.data?.message
    || error?.error?.message || error.message || error.toString()
  return message
}

const capitalize = (str) => {
  console.log({str});
  
  if (!str) return null
  return str
    .toString()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


const getUpdatedFields = (updatedFields, defaultValues) => {
  // Filter the updated fields to include only those that have changed
  const obj = Object.fromEntries(
    Object.entries(updatedFields).filter(
      ([key, value]) => defaultValues[key] !== value
    )
  );

  return obj
};

const truncateString = (str, char) => {
  // Check if the string length is more than 15
  if (str.length > char) {
    return str.slice(0, char) + '...';
  }
  return str; // Return the original string if it's 15 or fewer characters
}

const getExtensionOfImage = (filename) => {
  return filename.split('.').pop();
};

const generateSlug = (string) => {
  return string
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with dashes
};

const fakeDelay = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

const Utils = {
  /**
   * ─── TEXT MANIPULATION ───────────────────────────────────
   */

  textCapitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  textCapitalizeWords: (str) => str.replace(/\b\w/g, (char) => char.toUpperCase()),
  textToSlug: (str) => str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
  textReverse: (str) => str.split("").reverse().join(""),
  textContains: (str, keyword) => str.toLowerCase().includes(keyword.toLowerCase()),
  textRemoveWhitespace: (str) => str.replace(/\s+/g, " ").trim(),
  textWordCount: (str) => str.trim().split(/\s+/).length,
  textTruncate: (str, length) => (str.length > length ? str.slice(0, length) + "..." : str),
  textCamelToKebab: (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
  textKebabToCamel: (str) => str.replace(/-./g, (match) => match.charAt(1).toUpperCase()),

  /**
   * ─── NUMBER UTILITIES ───────────────────────────────────
   */

  randomNumber: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  isEven: (num) => num % 2 === 0,
  isOdd: (num) => num % 2 !== 0,
  toFixedDecimal: (num, decimals = 2) => Number(num.toFixed(decimals)),
  sumArray: (arr) => arr.reduce((sum, num) => sum + num, 0),
  averageArray: (arr) => (arr.length ? Utils.sumArray(arr) / arr.length : 0),
  gcd: (a, b) => (b === 0 ? a : Utils.gcd(b, a % b)),
  lcm: (a, b) => (a * b) / Utils.gcd(a, b),
  isPrime: (num) => num > 1 && Array.from({ length: num - 2 }, (_, i) => i + 2).every((n) => num % n !== 0),

  /**
   * ─── ARRAY UTILITIES ───────────────────────────────────
   */

  removeDuplicates: (arr) => [...new Set(arr)],
  shuffleArray: (arr) => arr.sort(() => Math.random() - 0.5),
  chunkArray: (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size)),
  flattenArray: (arr) => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? Utils.flattenArray(toFlatten) : toFlatten), []),
  lastElement: (arr) => arr[arr.length - 1],
  firstElement: (arr) => arr[0],
  removeFalsyValues: (arr) => arr.filter(Boolean),
  countOccurrences: (arr, val) => arr.filter((item) => item === val).length,
  findDuplicates: (arr) => arr.filter((item, index) => arr.indexOf(item) !== index),
  mergeArrays: (arr1, arr2) => [...new Set([...arr1, ...arr2])],

  /**
   * ─── OBJECT UTILITIES ───────────────────────────────────
   */

  deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
  isEmptyObject: (obj) => Object.keys(obj).length === 0,
  mergeObjects: (obj1, obj2) => ({ ...obj1, ...obj2 }),
  getObjectKeys: (obj) => Object.keys(obj),
  getObjectValues: (obj) => Object.values(obj),
  invertObject: (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])),
  removeObjectKeys: (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key))),
  hasNestedProperty: (obj, path) => path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj) !== undefined,

  /**
   * ─── DATE & TIME UTILITIES ──────────────────────────────
   */

  formatDate: (date) => new Date(date).toLocaleDateString(),
  getTimeAgo: (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60 };
    for (let unit in intervals) {
      const count = Math.floor(seconds / intervals[unit]);
      if (count > 0) return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
    return "just now";
  },
  getCurrentTimestamp: () => new Date().getTime(),
  getDayOfWeek: (date) => new Date(date).toLocaleString("en-US", { weekday: "long" }),

  /**
   * ─── VALIDATION FUNCTIONS ───────────────────────────────
   */

  isValidEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isValidURL: (url) => /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]+(\/[\w\d#?&=]*)?$/.test(url),
  isValidPhoneNumber: (phone) => /^[0-9]{10}$/.test(phone),
  isNumeric: (value) => !isNaN(parseFloat(value)) && isFinite(value),

  /**
   * ─── STORAGE FUNCTIONS ───────────────────────────────────
   */

  setLocalStorage: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getLocalStorage: (key) => JSON.parse(localStorage.getItem(key)),
  removeLocalStorage: (key) => localStorage.removeItem(key),
  clearLocalStorage: () => localStorage.clear(),

  /**
   * ─── PERFORMANCE OPTIMIZATION ───────────────────────────
   */

  debounce: (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  },
  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * ─── UTILITY & RANDOM FUNCTIONS ─────────────────────────
   */

  generateUUID: () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => ((Math.random() * 16) | 0).toString(16)),
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard!");
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  },
};

export {
  cn, hasDraggableData, formatBytes, errResponse, capitalize, getUpdatedFields,
  truncateString, getExtensionOfImage, generateSlug, fakeDelay, Utils
}