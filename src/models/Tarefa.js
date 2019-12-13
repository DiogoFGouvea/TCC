const mongoose = require('mongoose');
const AutoIncrementTarefa = require('mongoose-sequence')(mongoose);

const TarefaSchema = new mongoose.Schema({
    idta: Number,
    id: Number,
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

TarefaSchema.plugin(AutoIncrementTarefa, {
    collection_name: "TarefaCount", 
    inc_field: 'idta'    
});

module.exports = mongoose.model('Tarefa', TarefaSchema)