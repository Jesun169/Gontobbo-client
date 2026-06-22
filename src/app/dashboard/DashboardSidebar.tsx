'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Calendar, Star, User,
    MapPin, Users, BarChart3, Settings, LogOut,
    Plane, BookOpen, Bell, CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
    role: 'user' | 'manager' | 'admin';
}

const menuItems = {
    user: [
        { href: '/dashboard/user', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/user/bookings', label: 'My Bookings', icon: Calendar },
        { href: '/dashboard/user/favorites', label: 'Favorites', icon: Star },
        { href: '/dashboard/user/profile', label: 'Profile', icon: User },
    ],
    manager: [
        { href: '/dashboard/manager', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/manager/destinations', label: 'Destinations', icon: MapPin },
        { href: '/dashboard/manager/bookings', label: 'Bookings', icon: Calendar },
        { href: '/dashboard/manager/profile', label: 'Profile', icon: User },
    ],
    admin: [
        { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/admin/destinations', label: 'Destinations', icon: MapPin },
        { href: '/dashboard/admin/bookings', label: 'Bookings', icon: Calendar },
        { href: '/dashboard/admin/users', label: 'Users', icon: Users },
        { href: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();
    const items = menuItems[role] || menuItems.user;

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-background border-r overflow-y-auto">
            <nav className="p-4 space-y-2">
                {items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                ))}

                <div className="border-t my-4" />

                <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Settings</span>
                </Link>
                <Link
                    href="/sign-out"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-red-600"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Logout</span>
                </Link>
            </nav>
        </aside>
    );
}