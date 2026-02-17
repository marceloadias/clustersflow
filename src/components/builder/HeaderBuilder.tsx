"use client"

import {
    Monitor,
    Tablet,
    Smartphone,
    Globe,
    Save,
    Play,
    ChevronLeft,
    Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface HeaderBuilderProps {
    viewMode: 'desktop' | 'tablet' | 'mobile'
    setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void
}

export function HeaderBuilder({ viewMode, setViewMode }: HeaderBuilderProps) {
    const router = useRouter()

    return (
        <header className="h-16 border-b border-white/5 bg-[#0F172A] flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-white/40 hover:text-white"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex flex-col">
                    <h1 className="text-sm font-bold tracking-tight text-white/90">Landing Page Editor</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-white/30">Mock Mode</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center bg-[#111C33] border border-white/5 p-1 rounded-[10px]">
                <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-[8px] transition-all ${viewMode === 'desktop' ? 'bg-[#6D5EF3] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    onClick={() => setViewMode('desktop')}
                >
                    <Monitor className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-[8px] transition-all ${viewMode === 'tablet' ? 'bg-[#6D5EF3] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    onClick={() => setViewMode('tablet')}
                >
                    <Tablet className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 rounded-[8px] transition-all ${viewMode === 'mobile' ? 'bg-[#6D5EF3] text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    onClick={() => setViewMode('mobile')}
                >
                    <Smartphone className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white gap-2">
                    <Eye className="w-4 h-4" /> Preview
                </Button>
                <div className="w-[1px] h-6 bg-white/5 mx-2" />
                <Button variant="outline" className="h-10 border-white/5 bg-[#111C33] hover:bg-white/5 rounded-[10px] text-[10px] font-black uppercase tracking-widest">
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
                <Button className="h-10 bg-[#6D5EF3] hover:bg-[#5B4EE0] rounded-[10px] text-[10px] font-black uppercase tracking-widest px-6 shadow-[0_10px_20px_rgba(109,94,243,0.2)]">
                    Publish <Globe className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </header>
    )
}
