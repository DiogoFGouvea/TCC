const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
    tarefaid: String,
    nome: String,
    Status: String,
    estimada: Number,
    feita: Number,
    necessaria: Number,
    userstory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserStory' 
    }
});

module.exports = mongoose.model('Tarefa', TarefaSchema)