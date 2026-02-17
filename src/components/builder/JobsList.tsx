"use client"

import { useState, useEffect } from "react"
import {
    Play,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    Terminal
} from "lucide-react"
import { mockApi, Job } from "@/lib/mockApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function JobsList({ clusterId }: { clusterId: string }) {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    useEffect(() => {
        mockApi.getJobs(clusterId).then(data => {
            setJobs(data)
            setIsLoading(false)
        })
    }, [clusterId])

    const getStatusBadge = (status: Job['status']) => {
        switch (status) {
            case 'done': return <Badge className="bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20 text-[10px] font-bold uppercase tracking-wider px-2">Done</Badge>
            case 'running': return <Badge className="bg-[#6D5EF3]/10 text-[#6D5EF3] border-[#6D5EF3]/20 animate-pulse text-[10px] font-bold uppercase tracking-wider px-2">Running</Badge>
            case 'failed': return <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 text-[10px] font-bold uppercase tracking-wider px-2">Failed</Badge>
            case 'queued': return <Badge variant="outline" className="text-white/40 border-white/10 text-[10px] font-bold uppercase tracking-wider px-2">Queued</Badge>
        }
    }

    const getStatusIcon = (status: Job['status']) => {
        switch (status) {
            case 'done': return <CheckCircle2 className="w-5 h-5 text-[#2DD4BF]" />
            case 'running': return <Play className="w-5 h-5 text-[#6D5EF3] fill-[#6D5EF3] shrink-0" />
            case 'failed': return <XCircle className="w-5 h-5 text-rose-500" />
            case 'queued': return <Clock className="w-5 h-5 text-white/20" />
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                {isLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full bg-[#0F172A] rounded-[16px] border border-white/5" />)}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {jobs.map(job => (
                            <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className={cn(
                                    "flex items-center justify-between p-6 rounded-[16px] border transition-all cursor-pointer group",
                                    selectedJob?.id === job.id
                                        ? "bg-[#111C33] border-[#6D5EF3]/50 shadow-[0_10px_30px_rgba(109,94,243,0.1)]"
                                        : "bg-[#0F172A] border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "p-3 rounded-xl border transition-colors",
                                        selectedJob?.id === job.id ? "bg-[#0F172A] border-[#6D5EF3]/30" : "bg-[#111C33] border-white/5"
                                    )}>
                                        {getStatusIcon(job.status)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white tracking-tight">Execution #{job.id}</h4>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1 flex items-center gap-2">
                                            {job.timestamp}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    {getStatusBadge(job.status)}
                                    <ChevronRight className={cn("w-4 h-4 transition-transform", selectedJob?.id === job.id ? "text-[#6D5EF3] translate-x-1" : "text-white/20")} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-6 p-8 rounded-[20px] border border-white/5 bg-[#0F172A] h-[650px] flex flex-col shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#111C33] flex items-center justify-center border border-white/5">
                                <Terminal className="w-4 h-4 text-[#6D5EF3]" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white tracking-tight">System Logs</h3>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Real-time terminal</p>
                            </div>
                        </div>
                        {selectedJob?.status === 'running' && (
                            <div className="flex items-center gap-1.5 bg-[#6D5EF3]/10 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF3] animate-ping" />
                                <span className="text-[8px] font-black text-[#6D5EF3] uppercase tracking-tighter">Live</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 font-mono text-[10px] overflow-y-auto space-y-2.5 custom-scrollbar pr-2">
                        {selectedJob ? (
                            selectedJob.logs.map((log, i) => (
                                <div key={i} className="flex gap-4 group/log">
                                    <span className="text-white/10 font-bold min-w-[20px]">{i + 1}</span>
                                    <span className={cn(
                                        "leading-relaxed",
                                        log.includes('error') ? 'text-rose-400 font-bold' : 'text-white/60 group-hover/log:text-white transition-colors'
                                    )}>{log}</span>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center px-6">
                                <div className="p-4 rounded-full bg-[#111C33] border border-white/5 mb-4 opacity-20">
                                    <Terminal className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-white font-bold opacity-30">No selection</h4>
                                <p className="text-[10px] text-white/20 font-medium mt-2">Select an execution from the list to view detailed system logs.</p>
                            </div>
                        )}
                    </div>

                    {selectedJob && (
                        <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                            <Button variant="outline" className="flex-1 border-white/5 bg-[#111C33] hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/60 rounded-[10px] h-11">
                                Clear
                            </Button>
                            <Button className="flex-1 bg-[#6D5EF3] hover:bg-[#5B4EE0] text-[10px] font-bold uppercase tracking-widest text-white rounded-[10px] h-11">
                                Download
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
