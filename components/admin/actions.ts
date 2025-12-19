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
            const bookingDate = new Date(data.date || data.startDate);

            // Total Revenue
            const price = parseFloat(data.totalAmount || data.totalPrice || 0);
            totalRevenue += price;

            // Status checks
            // Consider a booking "active" if it is CONFIRMED or PENDING_PAYMENT
            const isConfirmed = data.status === 'CONFIRMED' || data.status === 'PENDING_PAYMENT';
            const isPendingPayment = data.status === 'PENDING_PAYMENT' || data.remainingAmount > 0;

            // Calculate pending amount for this specific booking
            let currentPending = 0;
            if (isPendingPayment) {
                currentPending = parseFloat(data.remainingAmount || 0) || extractRemainingAmount(data.notes);
                totalPending += currentPending;

                // Add to pending list specific logic if needed, but for now we just track stats
                if (bookingDate >= today) { // Keep pending list focused on future? Or show all? Let's show all pending too if needed, but usually pending IS future. 
                    // Actually, let's just keep the pendingBookings list as is (future pending), 
                    // BUT for the main list (upcomingBookings), we want to show EVERYTHING so the user can delete old tests.
                }

                // Add to pending list (keep date filter or remove? Let's remove it to find all debts)
                pendingBookings.push({
                    id: doc.id,
                    ...data,
                    remainingAmount: currentPending
                });
            }

            if (isConfirmed) {
                // collected is revenue minus what is pending for this booking
                totalCollected += (price - currentPending);

                // Add to main list - REMOVED DATE FILTER to show all history
                upcomingBookings.push({ id: doc.id, ...data });
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

export async function deleteBooking(bookingId: string) {
    try {
        if (!db) {
            throw new Error("Firebase no está inicializado.");
        }

        await db.collection('bookings').doc(bookingId).delete();

        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting booking:", error);
        return { success: false, error: error.message };
    }
}
