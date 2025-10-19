export const truncateHash = (
  hash: string,
  startChars: number = 1,
  endChars: number = 1
): string => {
  if (!hash) return '';
  if (hash.length <= startChars + endChars) return hash;

  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}..`;
};
