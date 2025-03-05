const profitGoal = require("../Models/profitGoalModel.js");
const { compareTargetWithActual, remainingProfitNeeded, averageProfitPerMonth } = require('../profitGoalCalculations.js');
// Create profit goals
const createProfitGoals = async (req, res) => {
  const { goalName, targetAmount, currency, actualProfit, deadline, status } = req.body;
  try {
    const newProfitGoal = await profitGoal.create({
      goalName,
      targetAmount,
      currency,
      actualProfit,
      deadline,
      status
    });
    res.status(201).json(newProfitGoal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all profit goals
const getAllProfitGoals = async (req, res) => {
  try {
    const profitGoals = await profitGoal.findAll();
    
    // Calculate additional fields for each profit goal
    const result = profitGoals.map((profitgoal) => {
      const achievementPercentage = compareTargetWithActual(profitgoal.targetAmount, profitgoal.actualProfit);
      const remainingProfit = remainingProfitNeeded(profitgoal.targetAmount, profitgoal.actualProfit);
      const averageMonthlyProfit = averageProfitPerMonth(profitgoal.targetAmount, 12); // assuming a 12-month target

      return {
        goalName: profitgoal.goalName,
        targetAmount: profitgoal.targetAmount,
        actualProfit: profitgoal.actualProfit,
        currency: profitgoal.currency,
        deadline: profitgoal.deadline,
        status: profitgoal.status,
        achievementPercentage,
        remainingProfit,
        averageMonthlyProfit
      };
    });

    res.status(200).json(result); // Send back the calculated result
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get profit goal by ID
const getProfitGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const profitgoal = await profitGoal.findOne({ where: { id } });

    if (!profitgoal) {
      return res.status(404).json({ message: 'No profit goal found' });
    }

    // Perform calculations
    const achievementPercentage = compareTargetWithActual(profitgoal.targetAmount, profitgoal.actualProfit);
    const remainingProfit = remainingProfitNeeded(profitgoal.targetAmount, profitgoal.actualProfit);
    const averageMonthlyProfit = averageProfitPerMonth(profitgoal.targetAmount, 12); // assuming a 12-month target

    const result = {
      goalName: profitgoal.goalName,
      targetAmount: profitgoal.targetAmount,
      actualProfit: profitgoal.actualProfit,
      currency: profitgoal.currency,
      deadline: profitgoal.deadline,
      status: profitgoal.status,
      achievementPercentage,
      remainingProfit,
      averageMonthlyProfit
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete profit goal
const deleteProfitGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfitGoal = await profitGoal.findByPk(id);
    if (!deletedProfitGoal) {
      return res.status(404).json({ message: 'Profit goal not found' });
    }
    await deletedProfitGoal.destroy();
    res.status(200).json({ message: 'Profit goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update profit goal
const updateProfitGoal = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body) {
      const editProfitGoal = await profitGoal.update({ ...req.body }, { where: { id } });
      return res.status(200).json({ message: 'Profit goal updated successfully!', editProfitGoal });
    }
    res.status(400).json({ message: 'Something went wrong' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createProfitGoals,
  getAllProfitGoals,
  getProfitGoalById,
  deleteProfitGoal,
  updateProfitGoal
};
