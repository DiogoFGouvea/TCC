const mongoose = require('mongoose');
const AutoIncrementFeature = require('mongoose-sequence')(mongoose);

const FeatureSchema = new mongoose.Schema({        
    id: Number,
    featureId: String,
    nome: String,
    descricao: String,    
});

FeatureSchema.plugin(AutoIncrementFeature, {inc_field: 'id'});

module.exports = mongoose.model('Feature', FeatureSchema);

