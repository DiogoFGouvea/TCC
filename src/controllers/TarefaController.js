const Tarefa = require('../models/Tarefa');
const UserStory = require('../models/UserStory');

module.exports = {
    
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
        
    },
    async show(req, res) {
        const { userstory_id } = req.query;

        const tarefa = await Tarefa.find({ feature: userstory_id })                    

        return res.json(tarefa);
    },
    async showOne(req, res){

        const { id } = req.params;
        
        const tarefa = await Tarefa.findOne({ id });           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'tarefa 0-24/319');        
        res.setHeader('X-Total-Count', 5);
        return res.json(tarefa);
    },    
    async updateOne(req, res){

        const { id } = req.params;
        const { tarefaid, nome, Status, estimada, feita, necessaria } = req.body;
        const { userstory_id } = req.headers;
        
        Tarefa.findOne({ id }, function(err, tarefa){
            if(err){
                console.log(err);
                res.status(500).send();
            } else {
                tarefa.userstory = userstory_id
                tarefa.tarefaid = tarefaid
                tarefa.nome = nome
                tarefa.Status = Status
                tarefa.estimada = estimada
                tarefa.feita = feita
                tarefa.necessaria = necessaria
            }

            tarefa.save(function(err, updateObject){
                if(err){
                    console.log(err);
                    res.status(500).send();
                }else{
                    res.send(updateObject);
                }
            });
        });
    },
    async deleteOne(req, res){
        
        const { id } = req.params;
        
        Tarefa.deleteOne({ id }, function(err, tarefa){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                res.status(200).send();
            }
        });
    }    
};