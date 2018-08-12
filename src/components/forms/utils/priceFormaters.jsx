export const toCurrency = (value = 0) => {
    const digits = getDigitsFromValue(value.toString());
    const digitsWithPadding = padDigits(digits);
    return addDecimalToNumber(digitsWithPadding);
  };
  
  export const getDigitsFromValue = (value = '') =>{
    return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
  };
  
  const padDigits = digits => {
    const desiredLength = 3;
    const actualLength = digits.length;
  
    if (actualLength >= desiredLength) {
      return digits;
    }
  
    const amountToAdd = desiredLength - actualLength;
    const padding = '0'.repeat(amountToAdd);
  
    return padding + digits;
  };
  
  const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1');
  
  const addDecimalToNumber = number => {
    const centsStartingPosition = number.length - 2;
    const dollars = removeLeadingZeros(
      number.substring(0, centsStartingPosition)
    );
    const cents = number.substring(centsStartingPosition);
    return `$${dollars}.${cents}`;
  };