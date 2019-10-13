const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({    
    featureId: String,    
    nome: String,
    descricao: String,    
});

module.exports = mongoose.model('Feature', FeatureSchema);

