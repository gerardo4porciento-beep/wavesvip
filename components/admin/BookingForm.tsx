"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createManualBooking } from "./actions";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function BookingForm() {
    const router = useRouter();
    const [date, setDate] = useState<Date>();
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState<string>("");
    const [depositAmount, setDepositAmount] = useState<string>("");
    const [open, setOpen] = useState(false);

    // Calcular monto por cobrar
    const remainingAmount = totalAmount && depositAmount
        ? (parseFloat(totalAmount) - parseFloat(depositAmount)).toFixed(2)
        : "0.00";

    const handleSubmit = async () => {
        if (!date) {
            toast.error("Selecciona una fecha");
            return;
        }

        if (!totalAmount || parseFloat(totalAmount) <= 0) {
            toast.error("Ingresa un monto total válido");
            return;
        }

        if (!depositAmount || parseFloat(depositAmount) < 0) {
            toast.error("Ingresa un monto de reserva válido");
            return;
        }

        const totalCheck = parseFloat(totalAmount) || 0;
        const depositCheck = parseFloat(depositAmount) || 0;
        if (depositCheck > totalCheck) {
            toast.error(`El monto de reserva ($${depositCheck}) no puede ser mayor al monto total ($${totalCheck})`);
            return;
        }

        setLoading(true);

        try {
            const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]');
            const contactInput = document.querySelector<HTMLInputElement>('input[name="contact"]');
            const paxInput = document.querySelector<HTMLInputElement>('input[name="pax"]');
            const notesInput = document.querySelector<HTMLTextAreaElement>('textarea[name="notes"]');

            const data = {
                date: date.toISOString(),
                name: nameInput?.value || "",
                contact: contactInput?.value || "",
                pax: paxInput?.value || "",
                totalAmount: totalAmount,
                depositAmount: depositAmount,
                remainingAmount: remainingAmount,
                notes: notesInput?.value || "",
            };

            if (!data.name || !data.contact || !data.pax) {
                toast.error("Completa todos los campos requeridos");
                setLoading(false);
                return;
            }

            const result = await createManualBooking(data);

            if (result.success) {
                toast.success("✅ Reserva registrada correctamente");

                // Reset form
                if (nameInput) nameInput.value = "";
                if (contactInput) contactInput.value = "";
                if (paxInput) paxInput.value = "";
                if (notesInput) notesInput.value = "";
                setDate(undefined);
                setTotalAmount("");
                setDepositAmount("");

                router.refresh(); // Refresh server components to show new stats
            } else {
                toast.error("❌ Error: " + (result.error || "Error desconocido"));
            }

        } catch (error: any) {
            console.error("❌ Error:", error);
            toast.error("❌ Error: " + (error?.message || "Error inesperado"));
        } finally {
            setLoading(false);
        }
    };

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await handleSubmit();
    }

    return (
        <div className="relative bg-neutral-900/90 backdrop-blur-sm border border-white/10 p-3 rounded-2xl shadow-2xl">
            <h3 className="text-base font-display text-white mb-2">Nueva Reserva Manual</h3>

            <form onSubmit={onSubmit} className="space-y-2" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-black border-neutral-800 min-w-0 overflow-hidden text-white",
                                        !date && "text-neutral-400"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">
                                        {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate);
                                        if (selectedDate) {
                                            setOpen(false);
                                        }
                                    }}
                                    initialFocus
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label>Monto Total ($)</Label>
                        <Input
                            name="totalAmount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                            className="bg-black border-neutral-800 text-white placeholder:text-neutral-500"
                            value={totalAmount}
                            onChange={(e) => setTotalAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Monto Reserva ($)</Label>
                        <Input
                            name="depositAmount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                            className="bg-black border-neutral-800 text-white placeholder:text-neutral-500"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                        />
                        <p className="text-xs text-neutral-500">Monto con el que apartaron la fecha</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Monto por Cobrar ($)</Label>
                        <Input
                            type="text"
                            value={remainingAmount}
                            disabled
                            className="bg-neutral-800 border-neutral-700 text-neutral-400 cursor-not-allowed"
                        />
                        <p className="text-xs text-neutral-500">Calculado automáticamente</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Nombre Cliente</Label>
                        <Input name="name" placeholder="Juan Pérez" required className="bg-black border-neutral-800 text-white placeholder:text-neutral-500" />
                    </div>
                    <div className="space-y-2">
                        <Label>Contacto</Label>
                        <Input name="contact" placeholder="+58..." required className="bg-black border-neutral-800 text-white placeholder:text-neutral-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Cantidad Personas</Label>
                    <Input name="pax" type="number" placeholder="8" required className="bg-black border-neutral-800 text-white placeholder:text-neutral-500" />
                </div>

                <div className="space-y-2">
                    <Label>Notas</Label>
                    <Textarea name="notes" placeholder="Detalles adicionales..." className="bg-black border-neutral-800 text-white placeholder:text-neutral-500" />
                </div>

                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-luxury-gold text-black hover:bg-yellow-500 font-bold"
                >
                    {loading ? "Guardando..." : "Registrar Reserva"}
                </Button>
            </form>
        </div>
    );
}
