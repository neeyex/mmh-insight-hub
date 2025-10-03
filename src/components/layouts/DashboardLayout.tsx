import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full lg:ml-80">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
