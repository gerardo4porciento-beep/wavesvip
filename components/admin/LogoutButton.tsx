"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            console.error("Error en logout:", error);
            // Forzar redirección incluso si hay error
            router.push("/admin/login");
            router.refresh();
        }
    };

    return (
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:bg-red-950/30 hover:text-red-400">
            <LogOut className="w-4 h-4 mr-2" />
            Salir
        </Button>
    );
}
