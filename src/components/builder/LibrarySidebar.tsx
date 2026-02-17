"use client"

import {
    Search,
    Layout,
    Type,
    Square,
    Image as ImageIcon,
    MousePointer2,
    Layers,
    List,
    Plus,
    Box,
    FileText,
    Monitor
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
    { id: 'sections', name: 'Sections', icon: Layout },
    { id: 'basic', name: 'Basic', icon: Square },
    { id: 'forms', name: 'Forms', icon: FileText },
    { id: 'media', name: 'Media', icon: ImageIcon },
    { id: 'tables', name: 'Tables', icon: List }
]

const ITEMS = {
    sections: [
        { name: 'Hero Section', icon: Layout },
        { name: 'Features Grid', icon: Layers },
        { name: 'Pricing Table', icon: List },
        { name: 'Testimonials', icon: MessageCircle }
    ],
    basic: [
        { name: 'Text Block', icon: Type },
        { name: 'Button', icon: MousePointer2 },
        { name: 'Container', icon: Box },
        { name: 'Divider', icon: Monitor }
    ]
}

import { MessageCircle } from "lucide-react"

export function LibrarySidebar() {
    const [activeTab, setActiveTab] = useState('sections')

    return (
        <div className="w-72 bg-[#0F172A] border-r border-white/5 flex flex-col z-40">
            <div className="p-5 border-b border-white/5">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#6D5EF3] transition-colors" />
                    <Input
                        placeholder="Search blocks..."
                        className="h-10 pl-10 bg-[#111C33] border-white/5 rounded-[10px] text-xs placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-[#6D5EF3]"
                    />
                </div>
            </div>

            <div className="flex border-b border-white/5 bg-[#0B1020]/30 overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={cn(
                            "flex-1 flex flex-col items-center justify-center py-4 gap-2 transition-all border-b-2 min-w-[64px]",
                            activeTab === cat.id
                                ? "border-[#6D5EF3] text-white bg-[#6D5EF3]/5"
                                : "border-transparent text-white/40 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <cat.icon className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{cat.name}</span>
                    </button>
                ))}
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-3">
                    {/* Mocked Dynamic Items Based on Category */}
                    {(ITEMS[activeTab as keyof typeof ITEMS] || ITEMS.sections).map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#111C33] border border-white/5 rounded-[12px] p-4 flex flex-col items-center justify-center gap-3 cursor-grab hover:border-[#6D5EF3]/30 hover:bg-[#111C33]/80 transition-all group active:scale-95"
                        >
                            <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-white/5 flex items-center justify-center group-hover:border-[#6D5EF3]/50 transition-colors">
                                <item.icon className="w-5 h-5 text-white/60 group-hover:text-[#6D5EF3]" />
                            </div>
                            <span className="text-[10px] font-bold text-white/60 text-center tracking-tight leading-none group-hover:text-white">{item.name}</span>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus className="w-3 h-3 text-[#6D5EF3]" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-br from-[#6D5EF3]/10 to-transparent border border-[#6D5EF3]/20 rounded-[16px] text-center">
                    <p className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-[0.2em] mb-2">Pro Library</p>
                    <p className="text-xs text-white/50 mb-4 leading-relaxed font-semibold">Unlock 200+ premium sections and advanced blocks.</p>
                    <button className="w-full bg-[#6D5EF3] text-white py-2.5 rounded-[10px] text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95">
                        Upgrade Now
                    </button>
                </div>
            </ScrollArea>
        </div>
    )
}
