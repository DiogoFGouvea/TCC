const mongoose = require('mongoose');
const AutoIncrementUserstory = require('mongoose-sequence')(mongoose);

const UserStorySchema = new mongoose.Schema({    
    idus: Number,    
    id: Number,
    nome: String,
    descricao: String,
    pontuacao: Number,
    status: String,    
    feature_id: Number
});

UserStorySchema.plugin(AutoIncrementUserstory, {
    collection_name: "UserStoryCount",
    inc_field: 'idus'
});

module.exports = mongoose.model('UserStory', UserStorySchema);

