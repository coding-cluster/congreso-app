import { truncateSync } from 'fs';
import mongoose from 'mongoose';    // Importa mongoose para conectar con la base de datos de MongoDB

// Se crea una especie de plantilla para crear a los usuarios
const userSchema = new mongoose.Schema({
    // En el rol se establecerá que todos sean autores, a menos que un administrador designe lo contrario 
    nombre: { tyoe: String, required: true },
    correo: { type: String, required: true, unique: true },
    universidad: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['autor', 'revisor', 'admin'], default: 'autor'}
});

export default mongoose.models.User || mongoose.model('User', userSchema);    // Exporta el modelo de usuario