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

        return res.json(features); 
    }
    
};