import {Schema, model} from 'mongoose';

const taskSchema = new Schema({
    fecha: String,
    horaInicio: String,
    horaFinal: String,
    logo: String,
    skin: String,
    tema: String,
    texto: String,

},{
    timestamps: true,
    versionKey: false
});

export default model('Task', taskSchema);