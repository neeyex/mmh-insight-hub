import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from './ui/Image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Import Lucide React icons for a professional and consistent icon set
import {
  Dna,
  Database,
  Link as LinkIcon,
  Clock,
  Target,
  ArrowUpDown,
  CreditCard,
  Mail,
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// Navigation menu structure
const menuItems = [
  {
    heading: "Build Your AI Sales Agent",
    links: [
      { text: "Fine-Tune Your Agent's DNA", href: "/dashboard/fine-tuning", icon: <Dna size={20} /> },
      { text: "Upload Brand Data Sources", href: "/dashboard/data-sources", icon: <Database size={20} /> },
      { text: "Connect Your Tools", href: "/dashboard/connect-tools", icon: <LinkIcon size={20} /> },
    ],
  },
  {
    heading: "AI Sales Agent Status",
    links: [{ text: "Agent Engineering Status", href: "/dashboard/status", icon: <Clock size={20} /> }],
  },
  {
    heading: "Your Live AI Sales Agent",
    links: [{ text: "Deployment Details", href: "/dashboard/deployment", icon: <Target size={20} /> }],
  },
  {
    heading: "Billing & Plan",
    links: [
      { text: "Your Agent Plan", href: "/dashboard/plan", icon: <ArrowUpDown size={20} /> },
      { text: "Invoices and Billing", href: "/dashboard/billing", icon: <CreditCard size={20} /> },
    ],
  },
  {
    heading: "Support",
    links: [{ text: "Contact Support", href: "/dashboard/support", icon: <Mail size={20} /> }],
  }
];

type ClientProfile = {
  full_name: string;
  plan_name: string;
}

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from('clients')
          .select('full_name, plan_name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching client profile:', error);
        } else if (data) {
          setProfile(data);
        }
      }
      setIsLoadingProfile(false);
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between w-full h-16 px-4 bg-white border-b border-border">
        <Link to="/dashboard">
          <Image
            src="https://assets.modernmarketinghouse.com/MMH-Modern-Marketing-House-Logo.svg"
            alt="MMH Logo"
            width={32}
            height={32}
          />
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md">
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen w-80 bg-white border-r border-border p-6 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo and Mobile Close Button */}
        <div className="flex items-center justify-between mb-4">
            <Link to="/dashboard" title="Go to Dashboard Home">
                <Image
                    src="https://assets.modernmarketinghouse.com/MMH-Modern-Marketing-House-Logo.svg"
                    alt="Modern Marketing House Logo"
                    width={160}
                    height={160}
                    className="transition-opacity duration-300 hover:opacity-80"
                />
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md lg:hidden">
                <X size={24} />
            </button>
        </div>

        {/* Dashboard Button */}
        <div className="mb-8">
          <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-lg text-base font-semibold transition-colors ${location.pathname === '/dashboard' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-grow overflow-y-auto pr-2">
          {menuItems.map((section) => (
            <div key={section.heading} className="mb-6">
              <h2 className="text-xs font-bold uppercase text-muted-foreground mb-3 px-2">{section.heading}</h2>
              <ul className="space-y-1">
                {section.links.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <li key={link.text}>
                      <Link
                        to={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-colors ${
                          isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        }`}
                      >
                        <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{link.icon}</span>
                        {link.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Dynamic User Profile Section */}
        <div className="mt-auto border-t border-border pt-4">
          {isLoadingProfile ? (
            <div className="flex items-center gap-3 p-2 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || user?.email?.[0].toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-foreground truncate">{profile?.full_name || user?.email}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full self-start">{profile?.plan_name || '...'}</span>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="w-full mt-2 flex items-center gap-3 p-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
