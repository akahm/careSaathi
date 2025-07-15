// app/admin/layout.tsx
import Sidebar from "@/components/admin/sidebar"; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* This stays fixed */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main> {/* This changes */}
    </div>
  );
}
