// src/app/dashboard/layout.tsx

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

// This is the new, dedicated layout for all our private dashboard pages.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full lg:ml-80"> {/* ml-80 matches the sidebar width */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
