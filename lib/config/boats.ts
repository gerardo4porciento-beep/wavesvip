
export interface BoatConfig {
    id: string; // Internal ID
    name: string;
    capacity: number;
    calendarId: string; // Google Calendar ID for this specific boat/resource
    price: number; // Base price for a day
    description: string;
    image?: string;
}

// TODO: Replace these placeholder Calendar IDs with real ones from your Environment or Google Calendar console
export const BOATS: BoatConfig[] = [
    {
        id: "boat-6-pax",
        name: "Lancha Deportiva 6 Pax",
        capacity: 6,
        calendarId: process.env.NEXT_PUBLIC_CALENDAR_ID_6_PAX || "primary", // Fallback to primary for dev
        price: 350,
        description: "Ideal para parejas o grupos pequeños. Velocidad y confort.",
    },
    {
        id: "boat-8-pax",
        name: "Lancha Familiar 8 Pax",
        capacity: 8,
        calendarId: process.env.NEXT_PUBLIC_CALENDAR_ID_8_PAX || "primary",
        price: 450,
        description: "Espaciosa y cómoda, perfecta para disfrutar en familia.",
    },
    {
        id: "boat-10-pax",
        name: "Yate Ligero 10 Pax",
        capacity: 10,
        calendarId: process.env.NEXT_PUBLIC_CALENDAR_ID_10_PAX || "primary",
        price: 600,
        description: "Lujo accesible para grupos medianos. Solarium incluido.",
    },
    {
        id: "boat-12-pax",
        name: "Yate Premium 12 Pax",
        capacity: 12,
        calendarId: process.env.NEXT_PUBLIC_CALENDAR_ID_12_PAX || "primary",
        price: 800,
        description: "La experiencia definitiva. Máximo confort y equipamiento.",
    },
];

export const getBoatByCapacity = (capacity: number) => {
    return BOATS.find((boat) => boat.capacity === capacity);
};

export const getBoatById = (id: string) => {
    return BOATS.find((boat) => boat.id === id);
};
