import profitGoal from "../Models/profitGoalModel";

//create profitgoals
export const createProfitGoals=async(req,res)=>{
    const { goalName,  targetAmount, currency, actualProfit ,deadline,  status}=req.body;
   
    try{
        const newProfitGoal=await profitGoal.create({
            goalName, 
             targetAmount,
              currency, 
              actualProfit ,
              deadline, 
               status
        });
        res.status(201).json(newProfitGoal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get all profitgoals
export const getAllProfitGoals = async (req, res) => { 
    try {
        const profitGoals = await profitGoal.findAll();
        res.json(profitGoals);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//