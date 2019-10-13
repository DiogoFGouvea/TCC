const mongoose = require('mongoose');

const UserStorySchema = new mongoose.Schema({    
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


module.exports = mongoose.model('UserStory', UserStorySchema);

