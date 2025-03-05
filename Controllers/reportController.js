const Report = require("../Models/reportModel.js");
const superAdmin = require("../Models/superadminModel.js");

// Create report
const createReport = async (req, res) => {
  const { type, startDate, endDate } = req.body;
  const user_id = req.user.id; 
  const superAdmin_id=req.superAdmin.id;
  try {
    const newReport = await Report.create({
      type,
      startDate,
      endDate,
      user_id,
      superAdmin_id  
    });
    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all reports
const getAllReports = async (req, res) => { 
  try {
    const getReports = await Report.findAll();
    res.json(getReports);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get single report by id
const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const getReport = await Report.findOne({ where: { id } });
    if (!getReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(getReport);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get reports for a single user
const getReportByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const reports = await Report.findAll({ where: { user_id } });
    if (!reports.length) {
      return res.status(404).json({ message: 'No reports found for this user' });
    }
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete report
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportToDelete = await Report.findByPk(id);
    if (!reportToDelete) {
      return res.status(404).json({ message: 'Report not found' });
    }
    await reportToDelete.destroy();
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update report
const updateReport = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body) {
      const editReport = await Report.update({ ...req.body }, { where: { id } });
      return res.status(200).json({ message: 'Report updated successfully!', editReport });
    }
    res.status(400).json({ message: 'Something went wrong' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  getReportByUserId,
  deleteReport,
  updateReport
};
