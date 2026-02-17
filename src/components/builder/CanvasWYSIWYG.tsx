"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { InlineToolbar } from "./InlineToolbar"
import { Trash2, Settings2, Layout } from "lucide-react"

interface CanvasWYSIWYGProps {
    viewMode: 'desktop' | 'tablet' | 'mobile'
    selectedElementId: string | null
    setSelectedElementId: (id: string | null) => void
}

export function CanvasWYSIWYG({ viewMode, selectedElementId, setSelectedElementId }: CanvasWYSIWYGProps) {
    const [toolbar, setToolbar] = useState<{ visible: boolean, type: 'text' | 'button' | 'section', position: { x: number, y: number } }>({
        visible: false,
        type: 'text',
        position: { x: 0, y: 0 }
    })

    const handleElementClick = (e: React.MouseEvent, id: string, type: 'text' | 'button' | 'section') => {
        e.stopPropagation()
        setSelectedElementId(id)
        setToolbar({
            visible: true,
            type,
            position: { x: e.clientX, y: e.clientY }
        })
    }

    const clearSelection = () => {
        setSelectedElementId(null)
        setToolbar({ ...toolbar, visible: false })
    }

    const canvasWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px'
    }

    return (
        <div
            className="flex-1 bg-[#0B1020] relative flex justify-center p-12 overflow-y-auto custom-scrollbar"
            onClick={clearSelection}
        >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div
                className={cn(
                    "bg-[#0F172A] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] transition-all duration-500 rounded-[2px] relative origin-top",
                    viewMode !== 'desktop' && "rounded-[32px] border-8 border-[#111C33]"
                )}
                style={{ width: canvasWidths[viewMode], minHeight: '120vh' }}
            >
                {viewMode !== 'desktop' && (
                    <>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#111C33] rounded-b-3xl z-50">
                            <div className="w-12 h-1 bg-white/5 rounded-full mx-auto mt-2" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#111C33] rounded-full z-50 opacity-20" />
                    </>
                )}

                <EditableSection
                    id="hero-1"
                    isSelected={selectedElementId?.startsWith('hero-')}
                    onClick={(e) => handleElementClick(e, 'hero-1', 'section')}
                >
                    <div className="py-32 px-12 text-center max-w-4xl mx-auto space-y-8">
                        <EditableText
                            id="h1-text"
                            isSelected={selectedElementId === 'h1-text'}
                            onClick={(e) => handleElementClick(e, 'h1-text', 'text')}
                            className="text-6xl font-black tracking-tight leading-[1.1] text-white"
                        >
                            Build stunning high-converting <span className="text-[#6D5EF3]">Landing Pages</span>
                        </EditableText>
                        <EditableText
                            id="p-text"
                            isSelected={selectedElementId === 'p-text'}
                            onClick={(e) => handleElementClick(e, 'p-text', 'text')}
                            className="text-xl text-white/40 max-w-2xl mx-auto font-medium"
                        >
                            The ultimate WYSIWYG builder for marketers who care about aesthetics and performance.
                        </EditableText>
                        <div className="flex items-center justify-center gap-4">
                            <EditableButton
                                id="btn-hero-1"
                                isSelected={selectedElementId === 'btn-hero-1'}
                                onClick={(e) => handleElementClick(e, 'btn-hero-1', 'button')}
                                className="bg-[#6D5EF3] text-white h-14 px-10 text-sm"
                            >
                                Start Building Free
                            </EditableButton>
                            <EditableButton
                                id="btn-hero-2"
                                isSelected={selectedElementId === 'btn-hero-2'}
                                onClick={(e) => handleElementClick(e, 'btn-hero-2', 'button')}
                                className="bg-white/5 text-white h-14 px-10 text-sm border border-white/10"
                            >
                                View Showcase
                            </EditableButton>
                        </div>
                    </div>
                </EditableSection>

                <EditableSection
                    id="benefits-1"
                    isSelected={selectedElementId === 'benefits-1'}
                    onClick={(e) => handleElementClick(e, 'benefits-1', 'section')}
                    className="bg-[#0B1020]/40 py-24 border-y border-white/5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4 text-center">
                                <div className="w-16 h-16 bg-[#6D5EF3]/10 rounded-2xl border border-[#6D5EF3]/20 flex items-center justify-center mx-auto mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-[#6D5EF3]" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Visual Feature {i}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
                            </div>
                        ))}
                    </div>
                </EditableSection>

                <EditableSection id="proof-1" onClick={(e) => handleElementClick(e, 'proof-1', 'section')} className="py-20 px-12">
                    <div className="flex flex-wrap justify-center gap-20 opacity-40">
                        {['STRIPE', 'UBER', 'DRIBIE', 'NETFLIX', 'PIXAR'].map(brand => (
                            <span key={brand} className="text-2xl font-black tracking-widest">{brand}</span>
                        ))}
                    </div>
                </EditableSection>

                <EditableSection id="pricing-1" onClick={(e) => handleElementClick(e, 'pricing-1', 'section')} className="py-32 px-12 bg-gradient-to-b from-transparent to-[#0B1020]/20">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-black text-white">Simple Pricing</h2>
                        <p className="text-white/40">Choose the plan that's right for your business.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={cn(
                                "p-10 rounded-[24px] border transition-all",
                                i === 2 ? "bg-[#111C33] border-[#6D5EF3]/50 ring-1 ring-[#6D5EF3]/20 shadow-2xl scale-105" : "bg-white/[0.02] border-white/5"
                            )}>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">{i === 1 ? 'Free' : i === 2 ? 'Pro' : 'Enterprise'}</h4>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-5xl font-black text-white">${i === 1 ? '0' : i === 2 ? '49' : '199'}</span>
                                    <span className="text-white/20 font-bold uppercase text-[10px] tracking-widest">/ month</span>
                                </div>
                                <button className={cn(
                                    "w-full py-4 rounded-[12px] font-bold text-xs uppercase tracking-widest transition-all mb-8",
                                    i === 2 ? "bg-[#6D5EF3] text-white" : "bg-white/5 text-white/60"
                                )}>
                                    Get Started
                                </button>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map(f => (
                                        <div key={f} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                                            <span className="text-xs text-white/40 font-medium">Power Feature {f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </EditableSection>

                <EditableSection id="faq-1" onClick={(e) => handleElementClick(e, 'faq-1', 'section')} className="py-24 px-12 text-center opacity-30">
                    <p className="text-sm font-bold uppercase tracking-widest">FAQ Section Placeholder</p>
                </EditableSection>

                <EditableSection id="footer-1" onClick={(e) => handleElementClick(e, 'footer-1', 'section')} className="py-20 px-12 border-t border-white/5 bg-[#0B1020]/50 mt-20">
                    <div className="flex justify-between items-center opacity-40">
                        <span className="font-black tracking-tighter text-2xl">ClustersFlow</span>
                        <span className="text-xs">© 2026 Antigravity. All rights reserved.</span>
                    </div>
                </EditableSection>
            </div>

            <AnimatePresence>
                {toolbar.visible && (
                    <InlineToolbar
                        key="inline-toolbar"
                        type={toolbar.type}
                        visible={toolbar.visible}
                        position={toolbar.position}
                        onClose={() => setToolbar({ ...toolbar, visible: false })}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

interface EditableProps {
    id: string
    isSelected?: boolean
    children: React.ReactNode
    onClick: (e: React.MouseEvent) => void
    className?: string
}

function EditableSection({ id, isSelected, children, onClick, className }: EditableProps) {
    return (
        <section
            className={cn(
                "relative transition-all group/sec",
                isSelected && "ring-2 ring-inset ring-[#6D5EF3] bg-[#6D5EF3]/5",
                className
            )}
            onClick={onClick}
        >
            {isSelected && (
                <>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-[#6D5EF3] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#6D5EF3] translate-x-1/2 -translate-y-1/2 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#6D5EF3] -translate-x-1/2 translate-y-1/2 rounded-full" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#6D5EF3] translate-x-1/2 translate-y-1/2 rounded-full" />

                    <div className="absolute -left-12 top-4 flex flex-col gap-2 p-1.5 bg-[#6D5EF3] rounded-[10px] shadow-xl z-50">
                        <div className="w-8 h-8 rounded-[8px] hover:bg-white/20 flex items-center justify-center cursor-ns-resize"><Layout className="w-4 h-4 text-white" /></div>
                        <div className="w-8 h-8 rounded-[8px] hover:bg-white/20 flex items-center justify-center cursor-pointer"><Settings2 className="w-4 h-4 text-white" /></div>
                        <div className="w-8 h-8 rounded-[8px] hover:bg-rose-600 flex items-center justify-center cursor-pointer"><Trash2 className="w-4 h-4 text-white" /></div>
                    </div>
                </>
            )}
            {!isSelected && (
                <div className="absolute inset-x-0 -top-[1px] h-[2px] bg-[#6D5EF3] opacity-0 group-hover/sec:opacity-40 transition-opacity pointer-events-none" />
            )}
            {children}
        </section>
    )
}

function EditableText({ id, isSelected, onClick, children, className }: EditableProps) {
    return (
        <div
            className={cn(
                "relative cursor-text outline-none transition-all rounded-[4px]",
                isSelected && "ring-2 ring-[#6D5EF3]/50 bg-[#6D5EF3]/10 px-2 -mx-2",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

function EditableButton({ id, isSelected, onClick, children, className }: EditableProps) {
    return (
        <button
            className={cn(
                "relative transition-all font-bold uppercase tracking-widest rounded-[12px] flex items-center justify-center overflow-hidden",
                isSelected && "ring-4 ring-[#6D5EF3]/30 border-[#6D5EF3] scale-[1.02]",
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
