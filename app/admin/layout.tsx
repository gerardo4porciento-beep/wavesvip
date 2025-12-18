import { headers } from "next/headers";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Base layout for admin - no authentication check here
    // Protection is handled in app/admin/dashboard/layout.tsx
    return (
        <div className="min-h-screen bg-black text-white selection:bg-luxury-gold selection:text-black">
            {children}
        </div>
    );
}
