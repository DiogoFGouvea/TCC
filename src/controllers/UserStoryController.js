const UserStory = require('../models/UserStory');
const Feature = require('../models/Feature');

module.exports = {
    
    async index(req, res) {
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
        
    }
};