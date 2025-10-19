const commaSeparate = (num: number | string): string => {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

export default commaSeparate;
