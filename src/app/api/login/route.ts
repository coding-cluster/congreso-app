import connectMongo from "@/lib/mongodb";
import User from "@/modules/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { correo, password } = await req.json();

    await connectMongo();

    const user = await User.findOne({ correo });
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), { status: 401 });
    }

    // Aquí podrías generar un JWT o una cookie de sesión si lo deseas

    return new Response(JSON.stringify({ mensaje: "Login exitoso", user: { nombre: user.nombre, correo: user.correo, rol: user.rol } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}