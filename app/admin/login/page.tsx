import { LoginForm } from "@/components/admin/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login Admin | Waves VIP",
};

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bg-reservar.png" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for readability */}
            </div>

            <div className="relative z-10 w-full flex justify-center px-4">
                <LoginForm />
            </div>
        </div>
    );
}
