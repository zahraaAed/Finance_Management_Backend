const profitGoal = require("../Models/profitGoalModel.js");

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
    res.json(profitGoals);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get profit goal by ID
const getProfitGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    const profitgoal = await profitGoal.findAll({ where: { id } });
    if (!profitgoal.length) {
      return res.status(404).json({ message: 'No profit goal found' });
    }
    // Corrected: returning profitgoal instead of an undefined variable "reports"
    res.status(200).json(profitgoal);
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
