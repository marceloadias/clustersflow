"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Plus,
    Layout,
    Clock,
    ArrowRight,
    Filter
} from "lucide-react"
import { mockApi, Cluster } from "@/lib/mockApi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function ClustersPage() {
    const [clusters, setClusters] = useState<Cluster[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        mockApi.getClusters().then(data => {
            setClusters(data)
            setIsLoading(false)
        })
    }, [])

    const filteredClusters = clusters.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )

    const getStatusBadge = (status: Cluster['status']) => {
        switch (status) {
            case 'Running': return <Badge className="bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Running</Badge>
            case 'Idle': return <Badge variant="outline" className="text-white/40 border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Idle</Badge>
            case 'Needs Attention': return <Badge className="bg-[#FB7185]/10 text-[#FB7185] border-[#FB7185]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Attention</Badge>
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Clusters</h1>
                    <p className="text-white/40 text-sm mt-2 font-medium">Orquestre seus agentes inteligentes e Landing Pages.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#6D5EF3] transition-colors" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter by name or tags..."
                            className="bg-[#0F172A] border border-white/5 rounded-[12px] py-2.5 pl-10 pr-4 text-xs focus:ring-1 focus:ring-[#6D5EF3] outline-none transition-all w-64 placeholder:text-white/20"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="rounded-[10px] border-white/5 bg-[#0F172A] hover:bg-[#111C33] text-white/60">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <Skeleton key={i} className="h-64 w-full bg-[#0F172A] rounded-[16px] border border-white/5" />
                        ))}
                    </motion.div>
                ) : filteredClusters.length > 0 ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredClusters.map((cluster) => (
                            <Link key={cluster.id} href={`/clusters/${cluster.id}`}>
                                <motion.div
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                    className="group relative bg-[#0F172A] border border-white/5 rounded-[16px] p-6 hover:border-[#6D5EF3]/30 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
                                >
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#6D5EF3]/10 blur-[80px] group-hover:bg-[#6D5EF3]/20 transition-all" />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="p-3 rounded-xl bg-[#111C33] border border-white/5 group-hover:border-[#6D5EF3]/50 transition-colors">
                                            <Layout className="w-6 h-6 text-[#22D3EE]" />
                                        </div>
                                        {getStatusBadge(cluster.status)}
                                    </div>

                                    <div className="mt-6 relative z-10">
                                        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#6D5EF3] transition-colors line-clamp-1">{cluster.name}</h3>
                                        <p className="text-white/40 text-xs mt-2 line-clamp-2 leading-relaxed font-medium">
                                            {cluster.description || "Orquestração inteligente e automação de processos."}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-1.5 relative z-10">
                                        {cluster.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/5 uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            {cluster.lastActivity}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#6D5EF3] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            Open Builder <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-32 text-center"
                    >
                        <div className="w-24 h-24 bg-[#0F172A] rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-2xl relative">
                            <div className="absolute inset-0 bg-[#6D5EF3]/20 blur-2xl rounded-full" />
                            <Layout className="w-10 h-10 text-[#6D5EF3] relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight">Sem clusters encontrados</h3>
                        <p className="text-white/40 text-sm mt-3 max-w-sm font-medium">
                            Não encontramos nenhum cluster. Tente ajustar sua busca ou comece um novo agora mesmo.
                        </p>
                        <Button className="mt-8 bg-[#6D5EF3] hover:bg-[#5B4EE0] rounded-[10px] px-8 py-6 h-auto font-bold shadow-xl shadow-[#6D5EF3]/10 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" /> Start First Cluster
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
