const mongoose = require('mongoose');
const AutoIncrementUserstory = require('mongoose-sequence')(mongoose);

const UserStorySchema = new mongoose.Schema({    
    idus: Number,
    userstoryid: String,
    nome: String,
    descricao: String,
    pontuacao: Number,
    status: String,    
    feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature' 
    }    
});

UserStorySchema.plugin(AutoIncrementUserstory, {inc_field: 'idus'});

module.exports = mongoose.model('UserStory', UserStorySchema);

