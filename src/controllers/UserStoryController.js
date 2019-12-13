const UserStory = require('../models/UserStory');
const Feature = require('../models/Feature');

module.exports = {
    
    async indexFeature(req, res) {
        const { feature_id } = req.query;

        const userstory = await UserStory.find({ feature: feature_id })                    

        return res.json(userstory);
    },
    
    async store(req, res){

        const { feature_id, nome, descricao, pontuacao, status } = req.body;        

        const userstory = await UserStory.create({
            feature: feature_id,
            nome,
            descricao,
            pontuacao,
            status            
        });

        UserStory.findOne({ idus: userstory.idus }, function(err, us){
            if(err){
                console.log(err);
            } else {                                
                us.id = userstory.idus
            }
            us.save(function(err, updateObject){
                if(err){
                    console.log(err);                    
                }else{
                    return res.json(updateObject);            
                }
            });
        });
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