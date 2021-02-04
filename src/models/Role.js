import {Schema, model} from 'mongoose';

export const ROLES = ["user", "customer", "admin"]

const roleSchema = new Schema({
    name: String
},{
    versionKey: false
});

export default model('Role', roleSchema)