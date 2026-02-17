"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart,
    MessageSquare,
    Settings2,
    Play,
    Save,
    RotateCcw,
    Plus,
    Zap,
    Layout,
    Globe,
    PenTool,
    CheckCircle2,
    Box,
    Puzzle,
    Search,
    Info,
    Type as FontIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClusterAssistant } from "./ClusterAssistant"
import { InlineToolbar } from "./InlineToolbar"
import { cn } from "@/lib/utils"
import { dict } from "@/lib/i18n"

// Mock Blocks data
const BLOCKS = [
    { id: 'b1', name: dict.blocks.research, icon: Search, color: 'text-cyan-400' },
    { id: 'b2', name: dict.blocks.copywriting, icon: PenTool, color: 'text-purple-400' },
    { id: 'b3', name: dict.blocks.seo, icon: Globe, color: 'text-emerald-400' },
    { id: 'b4', name: dict.blocks.layout, icon: Layout, color: 'text-amber-400' },
    { id: 'b5', name: dict.blocks.qa, icon: CheckCircle2, color: 'text-yellow-400' },
    { id: 'b6', name: dict.blocks.publisher, icon: Zap, color: 'text-rose-400' },
]

export function AIBuilder({ clusterId }: { clusterId: string }) {
    const [canvasBlocks, setCanvasBlocks] = useState<any[]>([
        { id: 'cb1', name: 'Research', x: 80, y: 120, icon: Search, type: 'text' },
        { id: 'cb2', name: 'Copywriting', x: 280, y: 220, icon: PenTool, type: 'button' }
    ])
    const [selectedBlock, setSelectedBlock] = useState<any>(null)
    const [toolbar, setToolbar] = useState<{ visible: boolean, type: 'text' | 'button' | 'section', position: { x: number, y: number } }>({
        visible: false,
        type: 'text',
        position: { x: 0, y: 0 }
    })
    const [chatOpen, setChatOpen] = useState(true)
    const [assistantState, setAssistantState] = useState<'idle' | 'thinking' | 'message'>('idle')
    const canvasRef = useRef<HTMLDivElement>(null)

    const addToCanvas = (block: any) => {
        const newBlock = {
            ...block,
            id: `cb-${Date.now()}`,
            x: 150 + canvasBlocks.length * 30,
            y: 150 + canvasBlocks.length * 30,
            type: block.name === 'Research' ? 'text' : 'button'
        }
        setCanvasBlocks([...canvasBlocks, newBlock])
        setAssistantState('thinking')
        setTimeout(() => {
            setAssistantState('message')
            setSelectedBlock(newBlock)
        }, 800)
        setTimeout(() => setAssistantState('idle'), 3000)
    }

    const handleBlockClick = (e: React.MouseEvent, block: any) => {
        e.stopPropagation()
        setSelectedBlock(block)
        setToolbar({
            visible: true,
            type: block.type || 'text',
            position: { x: e.clientX, y: e.clientY }
        })
    }

    const handleCanvasClick = () => {
        setSelectedBlock(null)
        setToolbar({ ...toolbar, visible: false })
    }

    return (
        <div className="flex flex-1 min-h-0 bg-[var(--builder-bg)] rounded-[10px] border border-white/5 overflow-hidden shadow-2xl relative">
            {/* 1. Palette (Left) */}
            <div className="w-64 border-r border-white/5 flex flex-col bg-[var(--builder-bg)] z-20">
                <div className="p-4 border-b border-white/5">
                    <h3 className="font-bold text-xs uppercase tracking-widest text-[#22D3EE]/80 flex items-center gap-2">
                        <Puzzle className="w-3.5 h-3.5" />
                        {dict.sidebar.palette}
                    </h3>
                </div>
                <ScrollArea className="flex-1 p-4">
                    <div className="grid grid-cols-1 gap-3">
                        {BLOCKS.map(block => (
                            <motion.div
                                key={block.id}
                                whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                whileTap={{ scale: 0.98 }}
                                className="p-4 bg-white/[0.02] border border-white/5 rounded-[12px] cursor-pointer group transition-all"
                                onClick={() => addToCanvas(block)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2.5 rounded-lg bg-[var(--surface-3)] border border-white/5 group-hover:border-primary/50 transition-colors", block.color)}>
                                        <block.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold tracking-tight">{block.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* 2. Canvas (Center) */}
            <div
                ref={canvasRef}
                className="flex-1 relative overflow-hidden bg-[var(--builder-canvas)] cursor-crosshair"
                onClick={handleCanvasClick}
            >
                {/* Grid Backdrop */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#2563EB 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />

                {/* Canvas Toolbar */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-[var(--surface-3)]/80 backdrop-blur-xl border border-white/10 rounded-[12px] z-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 rounded-[8px] hover:bg-white/5 text-xs font-semibold">
                        <Play className="w-3.5 h-3.5 text-[#2DD4BF]" /> {dict.common.run}
                    </Button>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <Button variant="ghost" size="sm" className="h-8 gap-2 rounded-[8px] hover:bg-white/5 text-xs font-semibold">
                        <Save className="w-3.5 h-3.5" /> {dict.common.save}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 rounded-[8px] hover:bg-white/5 text-xs font-semibold">
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> {dict.common.reset}
                    </Button>
                </div>

                {/* Inline Toolbar Integration */}
                <InlineToolbar
                    type={toolbar.type}
                    visible={toolbar.visible}
                    position={toolbar.position}
                    onClose={() => setToolbar({ ...toolbar, visible: false })}
                />

                {/* Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        d="M 144 184 C 200 184, 200 284, 344 284"
                        stroke="url(#line-grad)"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow)"
                    />
                </svg>

                {/* Floating Canvas Blocks */}
                <AnimatePresence>
                    {canvasBlocks.map((block) => (
                        <motion.div
                            key={block.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            drag
                            dragMomentum={false}
                            className={cn(
                                "absolute p-5 w-40 h-40 bg-[var(--surface-2)]/40 backdrop-blur-md border border-white/5 rounded-[16px] flex flex-col items-center justify-center gap-4 cursor-grab active:cursor-grabbing shadow-2xl transition-all z-10",
                                selectedBlock?.id === block.id ? "ring-2 ring-primary border-primary/50 bg-[var(--surface-2)]/60" : "hover:border-white/20 hover:bg-[var(--surface-2)]/50"
                            )}
                            style={{ left: block.x, top: block.y }}
                            onClick={(e) => handleBlockClick(e, block)}
                        >
                            <div className={cn("p-3 rounded-xl bg-[var(--surface-3)] border border-white/5", block.name === 'Research' ? 'text-cyan-400' : 'text-purple-400')}>
                                <block.icon className="w-8 h-8" />
                            </div>
                            <span className="text-[13px] font-bold tracking-tight text-white/90">{block.name}</span>

                            {/* Connector Points */}
                            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-[var(--builder-bg)]" />
                            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-[var(--builder-bg)]" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 3. Right Sidebar (Inspector + Chat) */}
            <div className="w-80 border-l border-white/5 flex flex-col bg-[var(--builder-bg)] z-20">
                {/* Inspector */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#22D3EE]/80 flex items-center gap-2">
                            <Info className="w-3.5 h-3.5" />
                            {dict.sidebar.inspector}
                        </h3>
                        {selectedBlock && (
                            <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary uppercase font-bold px-2">{selectedBlock.name}</Badge>
                        )}
                    </div>
                    <ScrollArea className="flex-1 p-5">
                        {selectedBlock ? (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{dict.builder.inspector.tabs.layers}</label>
                                    <textarea
                                        className="w-full h-32 bg-[var(--surface-3)] border border-white/5 rounded-[10px] p-3 text-xs focus:ring-1 focus:ring-primary outline-none resize-none text-white/80 leading-relaxed shadow-inner"
                                        placeholder={dict.sidebar.promptPlaceholder}
                                        defaultValue="Você é um especialista em pesquisa de mercado..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{dict.sidebar.coreModel}</label>
                                    <div className="grid gap-2">
                                        {['GPT-4o (Smartest)', 'Claude 3.5 (Creative)', 'Gemini 1.5'].map(model => (
                                            <div key={model} className="p-3 bg-[var(--surface-3)] border border-white/5 rounded-[10px] text-xs flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors">
                                                <span>{model}</span>
                                                <div className="w-3 h-3 rounded-full border-2 border-white/10" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                                <div className="w-12 h-12 mb-4 bg-white/5 rounded-full flex items-center justify-center">
                                    <Settings2 className="w-6 h-6" />
                                </div>
                                <p className="text-[11px] font-medium">{dict.sidebar.selectElement}</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Chat / Assistant */}
                <div className="h-[40%] border-t border-white/5 flex flex-col bg-[var(--surface-3)]/50">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ClusterAssistant state={assistantState} size="sm" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold tracking-tight">{dict.sidebar.assistant}</span>
                                <span className="text-[10px] text-[#22D3EE] font-medium leading-none">{dict.common.online}</span>
                            </div>
                        </div>
                    </div>
                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            <div className="bg-[var(--surface-3)] border border-white/5 rounded-[12px] rounded-tl-none p-3 text-xs leading-relaxed shadow-lg">
                                {dict.messages.welcome}
                            </div>
                            {assistantState === 'message' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[var(--surface-3)] border border-white/5 rounded-[12px] rounded-tl-none p-3 text-xs leading-relaxed shadow-lg text-[#22D3EE]"
                                >
                                    {dict.messages.blockAdded}
                                </motion.div>
                            )}
                            {assistantState === 'thinking' && (
                                <div className="flex gap-1.5 p-2 px-4">
                                    <span className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce [animation-duration:0.6s]" />
                                    <span className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-[#22D3EE] rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.3s]" />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t border-white/5">
                        <div className="relative group">
                            <input
                                placeholder={dict.sidebar.talkToAi}
                                className="w-full bg-[var(--surface-3)] border border-white/10 rounded-full py-2.5 px-5 text-xs focus:ring-1 focus:ring-primary outline-none transition-all group-hover:border-white/20"
                            />
                            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary hover:scale-105 transition-transform">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
