import Report from "../Models/reportModel";

//create report
export const createReport=async(req,res)=>{
    const {type, startDate, endDate}=req.body;
    const user_id = req.user.id; 
    try{
        const newReport=await Report.create({
            type,
            startDate,
            endDate,
            user_id  
        });
        res.status(201).json(newReport);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get all report
export const getAllReports = async (req, res) => { 
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//get single resport
export const getReportById=async(req,res)=>{
    const{id}=req.params;
    try{
        const report=await Report.findOne({where: {id}});
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'internal server error'});
    }
}

//get report to single user

export const getReportByUserId=async(req,res)=>{

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


//delete user
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await report.destroy();
    res.status(200).json({ message: 'Report deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};