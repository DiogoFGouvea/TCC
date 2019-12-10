const UserStory = require('../models/UserStory');
const Feature = require('../models/Feature');

module.exports = {
    
    async indexFeature(req, res) {
        const { feature_id } = req.query;

        const userstory = await UserStory.find({ feature: feature_id })                    

        return res.json(userstory);
    },
    
    async store(req, res){
        
        const { userstoryid, nome, descricao, pontuacao, status } = req.body;
        const { feature_id } = req.headers;

        const feature = await Feature.findById(feature_id);

        if (!feature) {
            return res.status(400).json({ error: 'Feature não existe' });
        }

        let userstory = await UserStory.findOne({ userstoryid });

        if (!userstory) {
            const userstory = await UserStory.create({
                feature: feature_id,
                userstoryid,
                nome,
                descricao,
                pontuacao,
                status
            });
            
            await userstory.populate('feature').execPopulate();

            return res.json(userstory)            
        } else {
            return res.status(400).json({ error: 'User Story já existe' });           
        }              
        
    },
    async show(req, res){
        const userstory = await UserStory.find();           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'userstory 0-24/319');        
        res.setHeader('X-Total-Count', 5);

        return res.json(userstory);
    },
    async showOne(req, res){

        const { id } = req.params;
        
        const userstory = await UserStory.findOne({ id });           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'userstory 0-24/319');        
        res.setHeader('X-Total-Count', 5);
        return res.json(userstory);
    },
    async updateOne(req, res){

        const { id } = req.params;
        const { userstoryid, nome, descricao, pontuacao, status } = req.body;
        const { feature_id } = req.headers;
        
        UserStory.findOne({ id }, function(err, userstory){
            if(err){
                console.log(err);
                res.status(500).send();
            } else {                                
                userstory.feature = feature_id
                userstory.userstoryid = userstoryid
                userstory.nome = nome
                userstory.descricao = descricao 
                userstory.pontuacao = pontuacao
                userstory.status = status
            }

            userstory.save(function(err, updateObject){
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
        
        UserStory.deleteOne({ id }, function(err, userstory){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                res.status(200).send();
            }
        });
    }    
};