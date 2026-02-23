import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    Calendar, CalendarDays, CalendarRange, BarChart3,
    Users, LogOut, Menu
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { to: '/dashboard/daily', label: 'Daily', icon: Calendar },
    { to: '/dashboard/weekly', label: 'Weekly', icon: CalendarDays },
    { to: '/dashboard/monthly', label: 'Monthly', icon: CalendarRange },
    { to: '/dashboard/yearly', label: 'Yearly', icon: BarChart3 },
    { to: '/dashboard/profiles', label: 'Public Profiles', icon: Users },
];

export default function DashboardLayout() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
                    Progress Tracker
                </h2>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-neon-blue/20 to-neon-pink/20 text-white border border-white/10'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon className={`w-5 h-5 ${isActive ? 'text-neon-blue' : ''}`} />
                                {label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User info at bottom */}
            <div className="p-4 border-t border-white/10">
                <p className="text-xs text-gray-500 truncate px-4 mb-2">{user?.email}</p>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white/5 border-r border-white/10 fixed h-full">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 z-40 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed left-0 top-0 h-full w-64 bg-background-lighter border-r border-white/10 z-50 md:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-gray-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="hidden md:block" />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </motion.button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <Outlet />
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
