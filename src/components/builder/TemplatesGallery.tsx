"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Layers, ArrowUpRight } from "lucide-react"
import { mockApi, Template } from "@/lib/mockApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export function TemplatesGallery() {
    const [templates, setTemplates] = useState<Template[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        mockApi.getTemplates().then(data => {
            setTemplates(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#6D5EF3] transition-colors w-4 h-4" />
                    <input
                        placeholder="Search templates..."
                        className="w-full bg-[#0F172A] border border-white/5 rounded-[12px] py-3 pl-12 pr-4 text-xs focus:ring-1 focus:ring-[#6D5EF3] outline-none transition-all placeholder:text-white/20"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-[10px] h-11 border-white/5 bg-[#0F172A] hover:bg-[#111C33] text-white/60 text-[10px] font-bold uppercase tracking-widest px-6">
                        <Filter className="w-3.5 h-3.5 mr-2" /> All Categories
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[16/10] w-full bg-[#0F172A] rounded-[16px] border border-white/5" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(template => (
                        <div key={template.id} className="group relative bg-[#0F172A] border border-white/5 rounded-[20px] overflow-hidden hover:border-[#6D5EF3]/30 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={template.previewUrl}
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start gap-3 mb-3">
                                    <h4 className="font-bold text-white tracking-tight group-hover:text-[#6D5EF3] transition-colors">{template.name}</h4>
                                    <Badge className="bg-[#111C33] text-[#22D3EE] border-white/5 text-[9px] font-black uppercase tracking-tighter px-2 py-0.5">{template.category}</Badge>
                                </div>
                                <p className="text-xs text-white/40 line-clamp-2 leading-relaxed font-medium mb-6">
                                    {template.description}
                                </p>
                                <Button className="mt-auto w-full bg-white/5 hover:bg-[#6D5EF3] text-white hover:text-white rounded-[12px] h-12 font-bold text-xs uppercase tracking-widest transition-all">
                                    Use Template
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col items-center justify-center p-8 bg-[#0F172A] border border-dashed border-white/10 rounded-[20px] text-center min-h-[300px] group hover:border-[#6D5EF3]/40 transition-all">
                        <div className="w-16 h-16 bg-[#111C33] rounded-full flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                            <Layers className="w-8 h-8 text-[#6D5EF3]" />
                        </div>
                        <h4 className="font-bold text-white tracking-tight text-lg mb-2">Custom Request</h4>
                        <p className="text-xs text-white/40 mb-8 max-w-[200px] leading-relaxed font-medium font-sans">Our specialized team can build the perfect flow for you.</p>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-[#22D3EE] hover:text-[#22D3EE] hover:bg-transparent p-0 flex items-center gap-2 group-hover:gap-3 transition-all">
                            Browse Marketplace <ArrowUpRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
