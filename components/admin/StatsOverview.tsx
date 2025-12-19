"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Pencil, Trash2, Calendar, User, DollarSign, Users, ChevronDown, ChevronUp } from "lucide-react";
import { deleteBooking } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";


type BookingItem = {
    id: string;
    start_date?: string;
    customer_name?: string;
    capacity?: number;
    total_price?: number;
    remainingAmount?: number;
    date?: string; // fallback
    name?: string; // fallback
    notes?: string;
    [key: string]: any;
};

export function StatsOverview({ stats }: { stats: any }) {
    const router = useRouter();
    const totalRevenue = stats?.totalRevenue ?? 0;
    const totalCollected = stats?.totalCollected ?? 0;
    const totalPending = stats?.totalPending ?? 0;
    // upcomingBookings now contains ALL bookings history due to previous actions.ts update
    const allBookings: BookingItem[] = stats?.upcomingBookings || [];

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling when clicking delete
        if (!confirm("¿Estás seguro de eliminar esta reserva? Esta acción no se puede deshacer.")) {
            return;
        }

        const result = await deleteBooking(id);
        if (result.success) {
            toast.success("Reserva eliminada correctamente");
            router.refresh();
        } else {
            toast.error("Error al eliminar: " + result.error);
        }
    };

    const handleEdit = (item: BookingItem, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling when clicking edit
        alert("Función de editar próximamente.");
        // TODO: Implement updateBooking form/modal
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
            {/* KPI Cards - Compact Row */}
            <div className="grid grid-cols-3 gap-2 shrink-0">
                <div className="bg-neutral-900/80 backdrop-blur-md border border-white/5 p-3 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 to-transparent group-hover:from-luxury-gold/10 transition-all" />
                    <p className="text-neutral-400 text-[10px] font-medium uppercase tracking-wider relative z-10">Total Facturado</p>
                    <p className="text-xl font-display font-bold text-white mt-1 relative z-10">
                        ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-md border border-white/5 p-3 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent group-hover:from-green-500/10 transition-all" />
                    <p className="text-green-400/80 text-[10px] font-medium uppercase tracking-wider relative z-10">Cobrado</p>
                    <p className="text-xl font-display font-bold text-white mt-1 relative z-10">
                        ${totalCollected.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>

                <div className="bg-neutral-900/80 backdrop-blur-md border border-white/5 p-3 rounded-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent group-hover:from-orange-500/10 transition-all" />
                    <p className="text-orange-400/80 text-[10px] font-medium uppercase tracking-wider relative z-10">Por Cobrar</p>
                    <p className="text-xl font-display font-bold text-white mt-1 relative z-10">
                        ${totalPending.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>
            </div>

            {/* Unified Booking List */}
            <div className="flex-1 bg-neutral-900/80 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden flex flex-col min-h-0">
                <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0 bg-neutral-900/90">
                    <h3 className="text-sm font-display text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                        Gestión de Reservas
                    </h3>
                    <span className="text-[10px] text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded-full">
                        {allBookings.length} Registros
                    </span>
                </div>

                <div className="overflow-y-auto p-1 custom-scrollbar flex-1">
                    {allBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-neutral-500 text-xs py-10">
                            <Calendar className="w-8 h-8 mb-2 opacity-20" />
                            <p>No hay reservas registradas</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {allBookings.map((booking: any) => {
                                const total = Number(booking.total_price || booking.totalAmount || 0);
                                const remaining = Number(booking.remainingAmount || 0);
                                const isPending = remaining > 0;
                                const isPaid = !isPending;

                                let displayDate = "Fecha inválida";
                                try {
                                    const d = booking.date || booking.start_date || booking.createdAt;
                                    if (d) displayDate = format(new Date(d), "dd MMM, yyyy", { locale: es });
                                } catch { }

                                const name = booking.customer_name || booking.name || "Cliente";
                                const pax = booking.capacity || booking.pax || 0;

                                return (
                                    <div
                                        key={booking.id}
                                        className="group flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all text-xs"
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            {/* Date */}
                                            <div className="w-20 shrink-0">
                                                <p className="text-luxury-gold font-bold truncate">{displayDate}</p>
                                            </div>

                                            {/* Client Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-medium truncate">{name}</p>
                                                    {pax > 0 && (
                                                        <span className="flex items-center gap-0.5 text-neutral-500 bg-black/20 px-1.5 rounded text-[10px]">
                                                            <Users className="w-3 h-3" /> {pax}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="w-28 shrink-0 text-right">
                                                {isPaid ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                        Pagado
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse">
                                                        Debe ${remaining}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Amount */}
                                            <div className="w-20 shrink-0 text-right">
                                                <p className="text-white font-mono">${total}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(booking)}
                                                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-md transition"
                                                title="Editar"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="p-1.5 text-red-400 hover:text-red-200 hover:bg-red-900/40 rounded-md transition"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
