"use server";

import { db } from "@/lib/firebaseAdmin";
import { revalidatePath } from "next/cache";

// Función auxiliar para extraer monto por cobrar de las notes
function extractRemainingAmount(notes: string | null): number {
    if (!notes) return 0;
    const match = notes.match(/Por Cobrar:\s*\$\s*([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
}

export async function getAdminStats() {
    try {
        if (!db) {
            throw new Error("Firebase no está inicializado");
        }

        const bookingsRef = db.collection('bookings');
        const snapshot = await bookingsRef.get();

        let totalRevenue = 0;
        let totalCollected = 0;
        let totalPending = 0;
        const upcomingBookings: any[] = [];
        const pendingBookings: any[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        snapshot.forEach(doc => {
            const data = doc.data();
            const bookingDate = new Date(data.date || data.startDate); // Handle different field names if necessary

            // Total Revenue
            const price = parseFloat(data.totalAmount || data.totalPrice || 0);
            totalRevenue += price;

            // Status checks
            const isConfirmed = data.status === 'CONFIRMED';
            const isPendingPayment = data.status === 'PENDING_PAYMENT' || data.remainingAmount > 0;

            if (isConfirmed) {
                totalCollected += price;

                // Upcoming
                if (bookingDate >= today) {
                    upcomingBookings.push({ id: doc.id, ...data });
                }
            }

            if (isPendingPayment && bookingDate >= today) {
                const remaining = parseFloat(data.remainingAmount || 0) || extractRemainingAmount(data.notes);
                totalPending += remaining;

                pendingBookings.push({
                    id: doc.id,
                    ...data,
                    remainingAmount: remaining
                });
            }
        });

        // Sort upcoming bookings
        upcomingBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        pendingBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
            totalRevenue,
            totalCollected,
            totalPending,
            upcomingBookings,
            pendingBookings,
        };
    } catch (error: any) {
        console.error("Error en getAdminStats:", error);
        return {
            totalRevenue: 0,
            totalCollected: 0,
            totalPending: 0,
            upcomingBookings: [],
            pendingBookings: [],
            error: error?.message || "Error al cargar estadísticas",
        };
    }
}

export async function createManualBooking(formData: any) {
    try {
        if (!db) {
            throw new Error("Firebase nos está inicializado. Revisa las variables de entorno.");
        }

        const bookingsRef = db.collection('bookings');

        const newBooking = {
            ...formData,
            createdAt: new Date().toISOString(),
            status: formData.remainingAmount > 0 ? 'PENDING_PAYMENT' : 'CONFIRMED',
            source: 'admin_manual'
        };

        const docRef = await bookingsRef.add(newBooking);

        revalidatePath('/admin/dashboard');
        return { success: true, id: docRef.id };

    } catch (error: any) {
        console.error("❌ Exception in createManualBooking:", error);
        return {
            success: false,
            error: error?.message || "Error desconocido al crear la reserva"
        };
    }
}

