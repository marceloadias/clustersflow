"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    Bold,
    Italic,
    Link2,
    Type,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Layout,
    Palette,
    ChevronDown,
    Trash2,
    Copy,
    Settings2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface InlineToolbarProps {
    type: 'text' | 'button' | 'section'
    visible: boolean
    position: { x: number, y: number }
    onClose: () => void
}

export function InlineToolbar({ type, visible, position, onClose }: InlineToolbarProps) {
    if (!visible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="fixed z-[100] flex items-center gap-1.5 p-1.5 bg-[#111C33] border border-white/10 rounded-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                style={{
                    left: Math.min(window.innerWidth - 350, Math.max(20, position.x - 100)),
                    top: Math.max(80, position.y - 80)
                }}
            >
                {type === 'text' && (
                    <>
                        <div className="px-2 py-1 bg-white/5 rounded-md flex items-center gap-2 mr-1">
                            <Type className="h-3 w-3 text-white/40" />
                            <span className="text-[10px] font-black uppercase text-white/60">Heading</span>
                            <ChevronDown className="h-3 w-3 text-white/20" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Bold className="h-4 w-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-5 bg-white/5" />
                        <div className="flex bg-white/5 p-0.5 rounded-[10px]">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-[8px] text-[#6D5EF3] bg-[#6D5EF3]/10"><AlignLeft className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-[8px] text-white/30"><AlignCenter className="h-3.5 w-3.5" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-[8px] text-white/30"><AlignRight className="h-3.5 w-3.5" /></Button>
                        </div>
                        <Separator orientation="vertical" className="h-5 bg-white/5" />
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Link2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-[#6D5EF3] text-white rounded-[10px] transition-all ml-1">
                            <Palette className="h-4 w-4" />
                        </Button>
                    </>
                )}

                {type === 'button' && (
                    <>
                        <div className="px-3 h-9 bg-white/5 rounded-[10px] flex items-center gap-3 mr-1 border border-white/5">
                            <span className="text-[10px] font-black uppercase text-white/60">Variant</span>
                            <div className="w-4 h-4 rounded-full bg-[#6D5EF3]" />
                            <ChevronDown className="h-3 w-3 text-white/20" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Link2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </>
                )}

                {type === 'section' && (
                    <>
                        <Button variant="ghost" className="h-9 gap-2 hover:bg-white/10 rounded-[10px] text-[10px] font-black uppercase px-4">
                            <Layout className="h-4 w-4 text-[#22D3EE]" /> Section Settings
                        </Button>
                        <Separator orientation="vertical" className="h-5 bg-white/5" />
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Palette className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 rounded-[10px] transition-colors">
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </>
                )}

                <Separator orientation="vertical" className="h-5 bg-white/5 ml-1" />
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-rose-500/20 text-rose-400 rounded-[10px] transition-colors" onClick={onClose}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}
