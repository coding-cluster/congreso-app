import connectMongo from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from 'bcrypt';

// Función asíncrona que envia los datos del usuario a la base de datos
// * req: permite extraer nombre, correo y password de la base de datos

/*  
    * Promise: determina el estado de una operación asíncrona
    -------------------------------------------------------------------------------
    * Nota - hay tres estados para Promise
    * 1. Pending: la operación aún no ha terminado
    * 2. Fulfilled: la operación ha terminado y el resultado está disponible
    * 3. Rejected: la operación ha terminado con un error
 */

export async function POST(req: Request): Promise<Response> {
    try {
        /*
            * req.json(): convierte el cuerpo de la solicitud en un objeto JSON
            * await: indica que la ejecución del código debe esperar a que se resuelva la promesa
        */
        const { nombre, correo, password }: {
            nombre: string;
            correo: string;
            password: string
        } = await req.json();

        // Conexión a la base de datos
        await connectMongo();

        // Verificación de si el usuario ya existe en la base de datos
        const usuarioExistente = await User.findOne({ correo });
        if (usuarioExistente) {
            return new Response(JSON.stringify({ error: 'Usuario ya existe' }), { status: 400 });
        }

        // Encriptación de la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Creación de un nuevo usuario
        const usuario = new User({
            nombre,
            correo,
            password: hashPassword 
        });
        await usuario.save();   // Guarda el usuario en la base de datos

        // Respuesta de la solicitud (se creó el usuario correctamente)
        return new Response(JSON.stringify({ mensaje: 'Usuario creado' }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        // Respuesta de la solicitud (error interno)
        return new Response(JSON.stringify({ error: (
            error instanceof Error ? error.message : "Error interno")
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}