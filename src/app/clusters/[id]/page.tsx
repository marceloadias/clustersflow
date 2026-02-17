"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ChevronLeft,
    Share2,
    Play,
    Settings2,
    Layout,
    Briefcase,
    FileStack,
    Zap
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockApi, Cluster } from "@/lib/mockApi"

// Sub-components
import { AIBuilder } from "../../../components/builder/AIBuilder"
import { JobsList } from "../../../components/builder/JobsList"
import { TemplatesGallery } from "../../../components/builder/TemplatesGallery"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClusterDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [cluster, setCluster] = useState<Cluster | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (id) {
            mockApi.getCluster(id as string).then(data => {
                setCluster(data || null)
                setIsLoading(false)
            })
        }
    }, [id])

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/4 bg-[#0F172A]" />
                <Skeleton className="h-[600px] w-full bg-[#0F172A]" />
            </div>
        )
    }

    if (!cluster) {
        return <div className="p-10 text-center">Cluster não encontrado.</div>
    }

    return (
        <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full hover:bg-white/5 text-white/40 hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold tracking-tight text-white">{cluster.name}</h1>
                            <Badge className="bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20 uppercase text-[10px] font-bold tracking-widest px-2">{cluster.status}</Badge>
                        </div>
                        <p className="text-white/40 text-sm mt-1 font-medium">{cluster.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-[10px] border-white/5 bg-[#0F172A] hover:bg-[#111C33] text-white/60 gap-2 text-xs font-bold uppercase tracking-wider">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button className="bg-[#6D5EF3] hover:bg-[#5B4EE0] rounded-[10px] gap-2 px-6 font-bold uppercase text-xs tracking-wider shadow-lg shadow-[#6D5EF3]/20">
                        <Play className="w-4 h-4 fill-white" /> Run Cluster
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="builder" className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2">
                    <TabsList className="bg-[#0F172A] border border-white/5 p-1 rounded-[12px] h-12">
                        <TabsTrigger value="builder" className="rounded-[8px] px-6 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#6D5EF3] data-[state=active]:text-white">
                            <Layout className="w-3.5 h-3.5 mr-2" /> Builder
                        </TabsTrigger>
                        <TabsTrigger value="jobs" className="rounded-[8px] px-6 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#6D5EF3] data-[state=active]:text-white">
                            <Briefcase className="w-3.5 h-3.5 mr-2" /> Jobs
                        </TabsTrigger>
                        <TabsTrigger value="templates" className="rounded-[8px] px-6 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#6D5EF3] data-[state=active]:text-white">
                            <FileStack className="w-3.5 h-3.5 mr-2" /> Templates
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-[8px] px-6 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-[#6D5EF3] data-[state=active]:text-white">
                            <Settings2 className="w-3.5 h-3.5 mr-2" /> Settings
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="builder" className="flex-1 min-h-0 outline-none data-[state=active]:flex mt-4">
                    <AIBuilder clusterId={cluster.id} />
                </TabsContent>

                <TabsContent value="jobs" className="flex-1 outline-none mt-4">
                    <JobsList clusterId={cluster.id} />
                </TabsContent>

                <TabsContent value="templates" className="flex-1 outline-none mt-4">
                    <TemplatesGallery />
                </TabsContent>

                <TabsContent value="settings" className="flex-1 outline-none mt-4">
                    <div className="max-w-2xl bg-[#0F172A] border border-white/5 rounded-[16px] p-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight mb-2 text-white">Cluster Settings</h3>
                            <p className="text-white/40 text-sm font-medium">Configure as preferências gerais deste cluster.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cluster Name</label>
                                <input
                                    className="w-full bg-[#111C33] border border-white/5 rounded-[10px] p-3 text-sm focus:ring-1 focus:ring-[#6D5EF3] outline-none text-white/80"
                                    defaultValue={cluster.name}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#111C33] rounded-[12px] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-amber-400" />
                                    <div>
                                        <p className="text-sm font-bold text-white">Auto-run on Build</p>
                                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Executar automaticamente após salvar</p>
                                    </div>
                                </div>
                                <div className="w-10 h-6 bg-[#6D5EF3]/20 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-[#6D5EF3] rounded-full shadow-[0_0_10px_rgba(109,94,243,0.5)]" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
                            <Button variant="ghost" className="text-rose-400 font-bold hover:bg-rose-500/10 hover:text-rose-300 rounded-[10px]">
                                Delete Cluster
                            </Button>
                            <Button className="bg-[#6D5EF3] hover:bg-[#5B4EE0] font-bold rounded-[10px] px-8">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
