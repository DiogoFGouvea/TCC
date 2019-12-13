const Feature = require('../models/Feature');

module.exports = {

    async store(req, res){  
        
        const { id, nome, descricao } = req.body;

        let feature = await Feature.findOne({ id });

        if (!feature) {                        
            const feature = await Feature.create({                                
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
        const featuresCount = await Feature.count();           

        res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        res.setHeader('Content-Range', 'features 0-10/' + featuresCount);        
        res.setHeader('X-Total-Count', featuresCount);
        return res.json(features);
    },
    async showOne(req, res){

        const { id } = req.params;
        
        const features = await Feature.findOne({ id });           

        return res.json(features);
    },    
    async updateOne(req, res){

        const { id } = req.params;
        const { nome, descricao } = req.body;
        
        Feature.findOne({ id }, function(err, feature){
            if(err){
                console.log(err);
                res.status(500).send();
            } else {                
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