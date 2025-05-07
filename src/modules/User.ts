import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // <-- corregido aquí
    correo: { type: String, required: true, unique: true },
    universidad: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['autor', 'revisor', 'admin'], default: 'autor' }
});

export default mongoose.models.User || mongoose.model('User', userSchema);