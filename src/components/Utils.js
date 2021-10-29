export function formatNumber(number) 
{
    return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}

export function trim(number) {
    return parseFloat(number.replace(/,/g, ''));
}
