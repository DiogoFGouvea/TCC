const Feature = require('../models/Feature');

module.exports = {

    async store(req, res){  
        
        const { featureId, nome, descricao } = req.body;

        let feature = await Feature.findOne({ featureId });

        if (!feature) {                        
            const feature = await Feature.create({                
                featureId,
                nome,
                descricao
            });                         
            return res.json(feature);
        } else {
            return res.status(400).json({ error: 'Feature já existe' });           
        }        
    },
    
    async show(req, res){
        
        const features = await Feature.find();           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'features 0-24/319');        
        res.setHeader('X-Total-Count', 5);
        return res.json(features);
    },
    async showOne(req, res){

        const { id } = req.params;
        
        const features = await Feature.findOne({ id });           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'features 0-24/319');        
        res.setHeader('X-Total-Count', 5);
        return res.json(features);
    },    
    async updateOne(req, res){

        const { id } = req.params;
        const { featureId, nome, descricao } = req.body;
        
        Feature.findOne({ id }, function(err, feature){
            if(err){
                console.log(err);
                res.status(500).send();
            } else {
                feature.featureId = featureId;
                feature.nome = nome;
                feature.descricao = descricao;
            }

            feature.save(function(err, updateObject){
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
        
        Feature.deleteOne({ id }, function(err, feature){
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                res.status(200).send();
            }
        });
    }    
};7