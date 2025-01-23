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
  if (!str) return null
  return str
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

export {
  cn, hasDraggableData, formatBytes, errResponse, capitalize, getUpdatedFields,
  truncateString
}