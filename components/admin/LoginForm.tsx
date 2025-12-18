"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Logo from "@/components/Logo";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!username.trim() || !password.trim()) {
            toast.error("Por favor completa todos los campos");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Bienvenido al Panel Administrativo");
                // Pequeño delay para asegurar que la cookie se establezca
                setTimeout(() => {
                    router.push("/admin/dashboard");
                    router.refresh();
                }, 100);
            } else {
                toast.error(data.error || "Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en login:", error);
            toast.error("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-center mb-8">
                <Logo width={120} height={40} showText />
            </div>

            <h2 className="text-2xl font-display text-white text-center mb-6">Acceso Administrativo</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="admin"
                        className="bg-neutral-900/50 border-neutral-700 text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••"
                        className="bg-neutral-900/50 border-neutral-700 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-luxury-gold text-black hover:bg-yellow-500 font-bold mt-4"
                >
                    {loading ? "Verificando..." : "Ingresar"}
                </Button>
            </form>
        </div>
    );
}
