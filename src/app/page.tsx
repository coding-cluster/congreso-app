"use client";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error desconocido");
        return;
      }

      alert(`Bienvenido, ${data.user.nombre}!`);
      // Aquí puedes redirigir o guardar sesión
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 bg-white dark:bg-black/60 p-8 rounded-lg shadow-md min-w-[320px] w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold text-center mb-2">
            Iniciar sesión
          </h1>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <label className="flex flex-col gap-1">
            <span className="font-medium">Correo electrónico</span>
            <input
              type="email"
              className="border rounded px-3 py-2 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium">Contraseña</span>
            <input
              type="password"
              className="border rounded px-3 py-2 bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-foreground text-background font-medium text-base h-12 px-5 mt-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
