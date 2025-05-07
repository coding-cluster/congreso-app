import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    // Datos generales de los artículos
    titulo: { type: String, required: true, unique: true },
    autores: [{ type: String, required: true}],
    categoria: { type: String, enum: ['Inclusión', 'Tecnología', 'Tercera'] },
    especialidades: [{ type: String, required: true}],

    // Dónde se publicó el artículo
    // TODO: Implementar posibilidad de subir archivos a la plataforma
    urlArticulo: { type: String, required: true, unique: true},

    // Datos de la evaluación de cada artículo
    evaluaciones: [{
        // De los objetos almacenados en la DB, se referencia al User para verificar
        // si quien calificará es revisor
        revisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        criterios: {
            originalidad: Number,
            impacto: Number,
            claridad: Number
        },

        calificacionFinal: Number
    }],

    estadoArticulo: { type: String, enum: ['En revisión', 'Aceptado', 'Rechazado'], default: 'En revisión' }
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);