import { getAdminStats } from "@/components/admin/actions";
import { BookingForm } from "@/components/admin/BookingForm";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

// Since we are using cookies auth logic mainly client side via API or Server Action, 
// for Logout we can make a client component or just a button form action.
// Let's make a simple Logout Button Client Component inline in next iteration or extract.
import { LogoutButton } from "@/components/admin/LogoutButton";
import { WavesBranding } from "@/components/booking/WavesBranding";

export const dynamic = "force-dynamic"; // Ensure real-time stats

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    return (
        <div className="min-h-screen relative flex flex-col overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bg-reservar.png" alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay for readability */}
            </div>

            <div className="relative z-10 p-2 md:p-3 pt-1">
                <header className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
                    <Logo width={70} height={24} showText />
                    <div className="flex items-center gap-2">
                        <span className="text-white/70 text-xs hidden md:block">Panel de Administración</span>
                        <LogoutButton />
                    </div>
                </header>

                <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Left Col: Form */}
                    <div className="lg:col-span-1">
                        <BookingForm />
                    </div>

                    {/* Right Col: Stats & List */}
                    <div className="lg:col-span-2">
                        <StatsOverview stats={stats} />
                    </div>
                </main>

                {/* Branding watermark - closer to form */}
                <div className="mt-2">
                    <WavesBranding />
                </div>
            </div>
        </div>
    );
}
