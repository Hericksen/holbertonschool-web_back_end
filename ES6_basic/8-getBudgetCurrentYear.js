/* eslint-disable */
function getCurrentYear() {
    const date = new Date();
    return date.getFullYear();
  }
  
  export default function getBudgetForCurrentYear(income, gdp, capita) {
    const currentYear = getCurrentYear();

    const budget = {        
    [`income-${getCurrentYear()}`]: income,
    [`gdp-${getCurrentYear()}`]: gdp,
    [`capita-${getCurrentYear()}`]: capita,
    };

    return budget;
  }
