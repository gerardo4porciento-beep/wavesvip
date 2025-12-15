"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethod } from "@/lib/services/payment/types";
import { FileUpload } from "./FileUpload";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PaymentGatewaysProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  onFileUpload: (url: string) => void;
  availableMethods: PaymentMethod[]; // Defined but used implicitly via buttons
}

export function PaymentGateways({ selectedMethod, onSelectMethod, onFileUpload }: PaymentGatewaysProps) {
  const [tab, setTab] = useState<"auto" | "manual">("auto");

  return (
    <Tabs defaultValue="auto" className="w-full" onValueChange={(v) => setTab(v as any)}>
      <TabsList className="grid w-full grid-cols-2 bg-neutral-900 border border-neutral-800 p-1 rounded-xl mb-6">
        <TabsTrigger
          value="auto"
          className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black text-neutral-400 font-medium rounded-lg transition-all"
        >
          Pago Automático
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black text-neutral-400 font-medium rounded-lg transition-all"
        >
          Pago Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="auto" className="space-y-4">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
          <h3 className="text-white font-display text-lg mb-2">Selecciona Pasarela</h3>
          <p className="text-neutral-500 text-sm mb-6">Tu reserva se confirmará automáticamente.</p>

          <RadioGroup
            value={selectedMethod}
            onValueChange={(v) => onSelectMethod(v as PaymentMethod)}
            className="grid gap-4"
          >
            {[
              { id: "BINANCE", label: "Binance Pay", desc: "USDT / BUSD" },
              { id: "PAYPAL", label: "PayPal", desc: "Tarjeta / USD" },
              { id: "UBIPAGOS", label: "Ubipagos", desc: "Bolívares / Crédito" }
            ].map((m) => (
              <div key={m.id} className={cn(
                "flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-all hover:bg-neutral-800/50",
                selectedMethod === m.id ? "border-luxury-gold bg-luxury-gold/5" : "border-neutral-800 bg-black"
              )}>
                <RadioGroupItem value={m.id} id={m.id} className="border-neutral-500 text-luxury-gold" />
                <Label htmlFor={m.id} className="cursor-pointer flex-1 text-white font-medium flex justify-between">
                  <span>{m.label}</span>
                  <span className="text-neutral-500 text-xs">{m.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </TabsContent>

      <TabsContent value="manual">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-white font-display text-lg mb-2">Datos Bancarios</h3>
            <div className="bg-black border border-neutral-800 p-4 rounded-xl text-sm text-neutral-400 font-mono space-y-4">
              {/* BINANCE QR SECTION */}
              <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-luxury-gold font-bold mb-2">Binance Pay (QR)</p>
                <div className="bg-white p-2 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/binance-qr.png" alt="Binance QR" className="w-48 h-48 object-contain" />
                </div>
                <p className="text-xs text-center mt-2 opacity-50">Escanea para pagar</p>
              </div>

              <div className="space-y-1">
                <p><span className="text-luxury-gold">Zelle:</span> payments@wavesvip.com</p>
                <p><span className="text-luxury-gold">Pago Móvil:</span> 0414-0000000 • CI: 12345678 • Banco Mercantil</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-white">Sube tu comprobante</Label>
            <FileUpload onUpload={(file) => {
              onFileUpload(file);
              onSelectMethod(PaymentMethod.MANUAL_UPLOAD);
            }} />
            <p className="text-xs text-neutral-500">Formatos permitidos: JPG, PNG, PDF</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

