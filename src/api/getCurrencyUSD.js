import fetch from 'isomorphic-fetch';

const url = 'https://api.exchangeratesapi.io/latest?base=USD';

const getCurrencyUSD = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export default getCurrencyUSD;