"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
    Box,
    LayoutDashboard,
    Briefcase,
    FileStack,
    Settings,
    ChevronLeft,
    ChevronRight,
    Plus,
    Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Box, label: "Clusters", href: "/clusters" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: FileStack, label: "Templates", href: "/templates" },
]

export function Sidebar() {
    const [collapsed, setIsCollapsed] = useState(false)
    const pathname = usePathname()

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 260 }}
            className="h-screen bg-[#0F172A] border-r border-white/5 flex flex-col z-50 relative shadow-2xl"
        >
            {/* Brand */}
            <div className="p-6 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#6D5EF3] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(109,94,243,0.3)]">
                        <Layers className="w-6 h-6 text-white" />
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
                        >
                            Clusters Flow
                        </motion.span>
                    )}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!collapsed)}
                    className="hover:bg-white/5 rounded-[10px] text-white/40"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </Button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    return (
                        <Link key={item.label} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-[12px] transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-[#111C33] text-[#22D3EE] border border-white/5"
                                        : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive && "text-[#6D5EF3]")} />
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-sm font-semibold tracking-tight"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 w-1 h-5 bg-[#6D5EF3] rounded-r-full"
                                    />
                                )}
                                {collapsed && (
                                    <div className="absolute left-[80px] px-2 py-1 bg-[#111C33] text-white text-[10px] font-bold uppercase tracking-wider rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap shadow-xl">
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 space-y-1 border-t border-white/5">
                <Link href="/settings">
                    <div className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-[12px] text-white/50 hover:bg-white/5 hover:text-white transition-all",
                        collapsed && "justify-center px-0"
                    )}>
                        <Settings className="w-5 h-5" />
                        {!collapsed && <span className="text-sm font-semibold tracking-tight">Settings</span>}
                    </div>
                </Link>
            </div>
        </motion.aside>
    )
}
