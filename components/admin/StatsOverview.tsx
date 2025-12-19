"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import { deleteBooking } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PendingItem = {
    id: string;
    start_date?: string;
    customer_name?: string;
    capacity?: number;
    total_price?: number;
    remainingAmount?: number;
    date?: string; // fallback
    name?: string; // fallback
    notes?: string;
    // Add other potential fields to avoid TS errors if props come with extra data
    [key: string]: any;
};

export function StatsOverview({ stats }: { stats: any }) {
    const router = useRouter();
    // Simplify to just use props. No more mock overrides.
    const totalRevenue = stats?.totalRevenue ?? 0;
    const totalCollected = stats?.totalCollected ?? 0;
    const totalPending = stats?.totalPending ?? 0;
    const pendingBookings: PendingItem[] = stats?.pendingBookings || [];
    const upcomingBookings = stats?.upcomingBookings || [];

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta reserva? Esta acción no se puede deshacer.")) {
            return;
        }

        const result = await deleteBooking(id);
        if (result.success) {
            toast.success("Reserva eliminada correctamente");
            router.refresh(); // Important to refresh the list
        } else {
            toast.error("Error al eliminar: " + result.error);
        }
    };

    const handleEdit = (item: PendingItem) => {
        alert("Función de editar próximamente.");
        // TODO: Implement updateBooking form/modal
    };

    return (
        <div className="space-y-3 h-full">
            {/* Revenue Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Total Facturado */}
                <div className="bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 p-3 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-luxury-gold/5 group-hover:bg-luxury-gold/10 transition-all" />
                    <h3 className="text-neutral-400 font-medium text-xs mb-0.5 relative z-10">Total Facturado</h3>
                    <p className="text-2xl font-display font-bold text-white relative z-10">
                        ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                </div>

                {/* Cobrado */}
                <div className="bg-green-950/90 backdrop-blur-sm border border-green-800/50 p-3 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-all" />
                    <h3 className="text-green-400 font-medium text-xs mb-0.5 relative z-10">Cobrado</h3>
                    <p className="text-2xl font-display font-bold text-white relative z-10">
                        ${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                </div>

                {/* Por Cobrar */}
                <div className="bg-orange-950/90 backdrop-blur-sm border border-orange-800/50 p-3 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-all" />
                    <h3 className="text-orange-400 font-medium text-xs mb-0.5 relative z-10">Por Cobrar</h3>
                    <p className="text-2xl font-display font-bold text-white relative z-10">
                        ${totalPending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Pending Bookings with Remaining Amount */}
            {pendingBookings && pendingBookings.length > 0 && (
                <div className="bg-orange-950/90 backdrop-blur-sm border border-orange-800/50 p-3 rounded-2xl">
                    <h3 className="text-sm font-display text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        Pendientes por Cobrar
                    </h3>
                    <div className="space-y-1.5">
                        {pendingBookings.map((booking: any) => {
                            const remaining = booking.remainingAmount ?? 0;
                            const total = booking.total_price ?? booking.totalAmount ?? 0;

                            // Date handling
                            let displayDate = "Fecha inválida";
                            try {
                                const d = booking.date || booking.start_date || booking.createdAt;
                                if (d) {
                                    displayDate = format(new Date(d), "dd MMM, yyyy", { locale: es });
                                }
                            } catch (e) { }

                            const name = booking.customer_name || booking.name || "Cliente";
                            const capacity = booking.capacity || booking.pax || "";

                            return (
                                <div key={booking.id} className="bg-neutral-800/90 backdrop-blur-sm border border-orange-800/50 p-2 rounded-lg group hover:border-orange-500/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <div>
                                            <p className="text-orange-400 font-bold">
                                                {displayDate}
                                            </p>
                                            <p className="text-white text-sm">{name}</p>
                                            <p className="text-neutral-400 text-xs">{capacity ? `${capacity} Pax` : ""}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-neutral-400 text-xs">Total</p>
                                            <p className="text-white font-mono text-sm">${Number(total || 0).toFixed(2)}</p>
                                            <div className="flex gap-1 justify-end mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(booking)}
                                                    className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition"
                                                    title="Editar"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="p-1 text-red-400 hover:text-red-200 hover:bg-red-900/40 rounded transition"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-1.5 border-t border-orange-800/30">
                                        <p className="text-orange-300 font-bold text-base">
                                            Por Cobrar: ${Number(remaining || 0).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Notifications / Upcoming Dates */}
            <div className="bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 p-3 rounded-2xl flex-1 min-h-[250px]">
                <h3 className="text-sm font-display text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                    Próximas Reservas Confirmadas
                </h3>

                <div className="space-y-1.5">
                    {upcomingBookings.length === 0 ? (
                        <p className="text-neutral-500 italic text-xs">No hay reservas próximas.</p>
                    ) : (
                        upcomingBookings.map((booking: any) => {
                            let displayDate = "";
                            try {
                                const d = booking.date || booking.start_date || booking.createdAt;
                                if (d) displayDate = format(new Date(d), "dd MMM, yyyy", { locale: es });
                            } catch { }

                            return (
                                <div key={booking.id} className="bg-neutral-800/90 backdrop-blur-sm border border-neutral-800 p-1.5 rounded-lg flex justify-between items-center group hover:border-luxury-gold/50 transition-colors">
                                    <div>
                                        <p className="text-luxury-gold font-bold">
                                            {displayDate}
                                        </p>
                                        <p className="text-white text-sm">{booking.customer_name || booking.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            {booking.capacity && <p className="text-neutral-400 text-xs">{booking.capacity} Pax</p>}
                                            <p className="text-white font-mono text-sm">${Number(booking.total_price || booking.totalAmount || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(booking)}
                                                className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="p-1 text-red-400 hover:text-red-200 hover:bg-red-900/40 rounded transition"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
