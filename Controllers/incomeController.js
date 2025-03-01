const FixedIncome = require("../Models/fixedincomeModel");
const RecurringIncome = require("../Models/RecurringIncome");

// ✅ Add Income (Fixed or Recurring)
exports.addIncome = async (req, res) => {
    try {
        const { type, title, description, amount, currency, date, startDate, endDate, categoryId } = req.body;

        let income;

        if (type === "fixed") {
            income = await FixedIncome.create({ title, description, amount, currency, date, categoryId });
        } else if (type === "recurring") {
            income = await RecurringIncome.create({ title, description, amount, currency, startDate, endDate, categoryId });
        } else {
            return res.status(400).json({ error: "Invalid income type" });
        }

        res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Get All Incomes (Fixed & Recurring)
exports.getIncomes = async (req, res) => {
    try {
        const fixedIncomes = await FixedIncome.findAll();
        const recurringIncomes = await RecurringIncome.findAll();

        res.status(200).json({ fixedIncomes, recurringIncomes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Delete Income (Fixed or Recurring)
exports.deleteIncome = async (req, res) => {
    try {
        const { id, type } = req.params;

        let deletedIncome;
        if (type === "fixed") {
            deletedIncome = await FixedIncome.destroy({ where: { id } });
        } else if (type === "recurring") {
            deletedIncome = await RecurringIncome.destroy({ where: { id } });
        } else {
            return res.status(400).json({ error: "Invalid income type" });
        }

        if (!deletedIncome) {
            return res.status(404).json({ error: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
