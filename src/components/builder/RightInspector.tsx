"use client"

import {
    Palette,
    Type,
    Layout as LayoutIcon,
    Database,
    ChevronRight,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Plus,
    Minus,
    Maximize,
    Box
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface RightInspectorProps {
    selectedElementId: string | null
}

export function RightInspector({ selectedElementId }: RightInspectorProps) {
    const [activeTab, setActiveTab] = useState('style')

    if (!selectedElementId) {
        return (
            <div className="w-80 bg-[#0F172A] border-l border-white/5 flex flex-col items-center justify-center p-12 text-center opacity-20 z-40">
                <div className="w-20 h-20 rounded-full bg-[#111C33] flex items-center justify-center mb-6 border border-white/5">
                    <LayoutIcon className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-white tracking-tight uppercase text-xs tracking-[0.2em]">No Selection</h4>
                <p className="text-[10px] mt-4 font-black text-white/40 uppercase leading-relaxed">Select any element on the canvas to edit its properties.</p>
            </div>
        )
    }

    const isText = selectedElementId.includes('text')
    const isButton = selectedElementId.includes('btn')
    const isSection = selectedElementId.includes('hero') || selectedElementId.includes('benefits') || selectedElementId.includes('pricing') || selectedElementId.includes('proof') || selectedElementId.includes('footer')

    return (
        <div className="w-80 bg-[#0F172A] border-l border-white/5 flex flex-col z-40">
            <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-[#111C33]/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#6D5EF3]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6D5EF3]">{isText ? 'Text Element' : isButton ? 'Button Element' : 'Section Block'}</span>
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase">{selectedElementId}</div>
            </div>

            <Tabs defaultValue="style" className="flex-1 flex flex-col min-h-0">
                <TabsList className="bg-[#0B1020]/50 h-16 border-b border-white/5 p-1 flex rounded-none">
                    <TabsTrigger value="style" className="flex-1 flex flex-col gap-1 data-[state=active]:bg-[#6D5EF3]/10 data-[state=active]:text-[#6D5EF3] rounded-none border-b-2 border-transparent data-[state=active]:border-[#6D5EF3]">
                        <Palette className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Style</span>
                    </TabsTrigger>
                    <TabsTrigger value="typography" className="flex-1 flex flex-col gap-1 data-[state=active]:bg-[#6D5EF3]/10 data-[state=active]:text-[#6D5EF3] rounded-none border-b-2 border-transparent data-[state=active]:border-[#6D5EF3]">
                        <Type className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Type</span>
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex-1 flex flex-col gap-1 data-[state=active]:bg-[#6D5EF3]/10 data-[state=active]:text-[#6D5EF3] rounded-none border-b-2 border-transparent data-[state=active]:border-[#6D5EF3]">
                        <LayoutIcon className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Layout</span>
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex-1 flex flex-col gap-1 data-[state=active]:bg-[#6D5EF3]/10 data-[state=active]:text-[#6D5EF3] rounded-none border-b-2 border-transparent data-[state=active]:border-[#6D5EF3]">
                        <Database className="w-4 h-4" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Content</span>
                    </TabsTrigger>
                </TabsList>

                <ScrollArea className="flex-1">
                    <div className="p-6 pb-20">
                        <TabsContent value="style" className="mt-0 space-y-8 outline-none">
                            <InspectorSection title="Spacing">
                                <div className="grid grid-cols-2 gap-4">
                                    <PropertyInput label="Margin" value="0" />
                                    <PropertyInput label="Padding" value="24" />
                                </div>
                            </InspectorSection>

                            <InspectorSection title="Appearance">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Background</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-md bg-[#0F172A] border border-white/10" />
                                            <span className="text-[10px] font-mono text-white/40">#0F172A</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Border Radius</span>
                                        <div className="flex items-center gap-3">
                                            <Minus className="w-3 h-3 opacity-20" />
                                            <span className="text-xs font-bold w-6 text-center">10</span>
                                            <Plus className="w-3 h-3 text-[#22D3EE]" />
                                        </div>
                                    </div>
                                </div>
                            </InspectorSection>

                            <InspectorSection title="Shadow">
                                <Button variant="outline" className="w-full bg-[#111C33] border-white/5 h-10 text-[10px] font-bold uppercase tracking-widest">Add Drop Shadow</Button>
                            </InspectorSection>
                        </TabsContent>

                        <TabsContent value="typography" className="mt-0 space-y-8 outline-none">
                            <InspectorSection title="Font Family">
                                <div className="p-3 bg-[#111C33] border border-white/5 rounded-[12px] flex items-center justify-between group cursor-pointer hover:border-[#6D5EF3]/40">
                                    <span className="text-xs font-bold">Manrope</span>
                                    <ChevronRight className="w-4 h-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </InspectorSection>

                            <InspectorSection title="Formatting">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <PropertyInput label="Size" value="64" />
                                    <PropertyInput label="Weight" value="900" />
                                </div>
                                <div className="flex bg-[#111C33] rounded-[10px] p-1 border border-white/5">
                                    <Button variant="ghost" className="flex-1 h-10 bg-[#6D5EF3]/10 text-[#6D5EF3] rounded-[8px]"><AlignLeft className="w-4 h-4" /></Button>
                                    <Button variant="ghost" className="flex-1 h-10 text-white/30 rounded-[8px]"><AlignCenter className="w-4 h-4" /></Button>
                                    <Button variant="ghost" className="flex-1 h-10 text-white/30 rounded-[8px]"><AlignRight className="w-4 h-4" /></Button>
                                </div>
                            </InspectorSection>
                        </TabsContent>

                        <TabsContent value="layout" className="mt-0 space-y-8 outline-none">
                            <div className="h-full flex flex-col items-center justify-center py-20 opacity-20">
                                <Box className="w-12 h-12 mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Flexbox Controls</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="content" className="mt-0 space-y-8 outline-none">
                            <InspectorSection title="Targeting">
                                <div className="space-y-4">
                                    <PropertyInput label="Link URL" value="https://..." />
                                    <PropertyInput label="Alt Text" value="Hero Image" />
                                </div>
                            </InspectorSection>
                        </TabsContent>
                    </div>
                </ScrollArea>
            </Tabs>
        </div>
    )
}

function InspectorSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#22D3EE]/60 flex items-center gap-3">
                {title}
                <div className="flex-1 h-[1px] bg-white/5" />
            </h5>
            {children}
        </div>
    )
}

function PropertyInput({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.1em]">{label}</label>
            <div className="relative">
                <input
                    defaultValue={value}
                    className="w-full bg-[#111C33] border border-white/5 rounded-[10px] py-3 px-4 text-xs font-bold text-white/80 focus:ring-1 focus:ring-[#6D5EF3] outline-none transition-all"
                />
            </div>
        </div>
    )
}
