// profitGoalCalculations.js
const compareTargetWithActual = (targetAmount, actualProfit) => {
    if (targetAmount === 0) {
      return 0;  // Avoid division by zero
    }
    const achievementPercentage = (actualProfit / targetAmount) * 100;
    return achievementPercentage.toFixed(2); // Return as a string with 2 decimal places
  };
  
  // Function to calculate the remaining profit needed to reach the target
  const remainingProfitNeeded = (targetAmount, actualProfit) => {
    return targetAmount - actualProfit;
  };
  
  // Function to calculate the average monthly profit needed to reach the target
  const averageProfitPerMonth = (targetAmount, months) => {
    return (targetAmount / months).toFixed(2);
  };
  
  module.exports = { compareTargetWithActual, remainingProfitNeeded, averageProfitPerMonth };
  