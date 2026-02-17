"use client"

import { useState } from "react"
import { LibrarySidebar } from "@/components/builder/LibrarySidebar"
import { CanvasWYSIWYG } from "@/components/builder/CanvasWYSIWYG"
import { RightInspector } from "@/components/builder/RightInspector"
import { HeaderBuilder } from "@/components/builder/HeaderBuilder"

export default function BuilderPage() {
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

    return (
        <div className="flex flex-col h-screen bg-[#0B1020] text-foreground overflow-hidden font-sans">
            {/* Top Header Controls */}
            <HeaderBuilder viewMode={viewMode} setViewMode={setViewMode} />

            <div className="flex flex-1 min-h-0">
                {/* Left Column - Library */}
                <LibrarySidebar />

                {/* Center Column - Canvas */}
                <CanvasWYSIWYG
                    viewMode={viewMode}
                    selectedElementId={selectedElementId}
                    setSelectedElementId={setSelectedElementId}
                />

                {/* Right Column - Inspector */}
                <RightInspector selectedElementId={selectedElementId} />
            </div>
        </div>
    )
}
