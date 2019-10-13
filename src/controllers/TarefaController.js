const Tarefa = require('../models/Tarefa');
const UserStory = require('../models/UserStory');

module.exports = {
    
    async index(req, res) {
        const { userstory_id } = req.query;

        const tarefa = await Tarefa.find({ feature: userstory_id })                    

        return res.json(tarefa);
    },
    
    async store(req, res){

        const { tarefaid, nome, Status, estimada, feita, necessaria } = req.body;
        const { userstory_id } = req.headers;

        const userstory = await UserStory.findById(userstory_id);       

        if (!userstory) {
            return res.status(400).json({ error: 'User Story não existe' });
        }

        let tarefa = await Tarefa.findOne({ tarefaid });

        if (!tarefa) {
            const tarefa = await Tarefa.create({
                userstory: userstory_id,                
                tarefaid,
                nome,
                Status,
                estimada,
                feita,
                necessaria
            });
            
            await tarefa.populate('userstory').execPopulate();

            return res.json(tarefa)            
        } else {
            return res.status(400).json({ error: 'User Story já existe' });           
        }              
        
    }
};