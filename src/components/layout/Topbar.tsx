"use client"

import { Search, Bell, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClusterAssistant } from "@/components/builder/ClusterAssistant"

export function Topbar() {
    return (
        <header className="h-20 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl px-8 flex items-center justify-between z-40 shadow-sm">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#6D5EF3] transition-colors" />
                    <input
                        placeholder="Search clusters, jobs or templates..."
                        className="w-full bg-[#111C33] border border-white/5 rounded-[12px] py-3 pl-12 pr-4 text-sm focus:ring-1 focus:ring-[#6D5EF3] outline-none transition-all placeholder:text-white/20 group-hover:border-white/10"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#111C33] px-3 py-1.5 rounded-full border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Engine Online</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-l border-white/5 pl-6">
                    <Button variant="ghost" size="icon" className="relative text-white/40 hover:text-white hover:bg-white/5 rounded-full">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#6D5EF3] rounded-full border-2 border-[#0F172A]" />
                    </Button>

                    <Button className="bg-[#6D5EF3] hover:bg-[#5B4EE0] text-white rounded-[10px] px-5 gap-2 font-semibold shadow-[0_10px_20px_rgba(109,94,243,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <Plus className="w-4 h-4" /> New Cluster
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border border-white/5 hover:border-white/20 transition-all">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="" alt="User" />
                                    <AvatarFallback className="bg-[#111C33] text-[#22D3EE] font-bold">JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-[#111C33] border-white/10 text-white" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-bold leading-none tracking-tight">John Doe</p>
                                    <p className="text-[10px] leading-none text-white/40 uppercase tracking-widest font-semibold mt-1">john@clustersflow.ai</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="focus:bg-white/5 focus:text-[#22D3EE]">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/5 focus:text-[#22D3EE]">Billing</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem className="focus:bg-white/5 text-rose-400 focus:text-rose-300">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
