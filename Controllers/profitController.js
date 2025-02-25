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
export const getAllProfitGoals = async(req, res) => { 
    try {
        const profitGoals = await profitGoal.findAll();
        res.json(profitGoals);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//get profit goal by id
export const getProfitGoalById=async(req,res)=>{

    try{
        const{id}=req.params;
        const profitgoal=await profitGoal.findAll({where: {id}});
        if(!profitgoal.length){
            return res.status(404).json({ message: 'No profitgoal found' });
        }
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }

    }

    
//delete profit goal
export const deleteProfitGoal=async(req,res)=>{
    try{
        const {id}=req.params;
const deletedprofitgoal=await profitGoal.findByPk(id);
if(!deleteProfitGoal.length){
    return res.status(404).json({ message: 'profit goal not found' });
}
await deleteProfitGoal.destroy();
res.status(200).json({ message: 'profit goal deleted successfully' });


    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
}


//edit
export const updateProfitGoal = async (req,res) =>{
    const {id} = req.params;
    try{
        if(req.body){
            const editProfitGoal=await profitGoal.update({...req.body},{where:{id}});
            return res.status(200).json({message:`profit goal updated successfully!`,editProfitGoal});
        }
        res.status(400).json({message:'something went wrong'})

    }catch(err){console.error(err);
    }

}