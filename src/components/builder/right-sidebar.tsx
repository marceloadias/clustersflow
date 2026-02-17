import { Layers, Palette, FolderOpen, History, ChevronDown, ChevronRight, Search, PanelsTopLeft, Box, Type, AlignLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { dict } from "@/lib/i18n";

interface RightSidebarProps {

}

export function RightSidebar() {
    const [activeTab, setActiveTab] = useState("layers");

    return (
        <div className="w-[300px] bg-[var(--builder-bg)] border-l border-[var(--builder-border)] flex flex-col h-full">
            {/* Height 56px to match Topbar if we wanted alignment, but here it's separate */}
            <div className="h-10 flex items-center border-b border-[var(--builder-border)] px-1">
                <TabButton icon={Layers} active={activeTab === "layers"} onClick={() => setActiveTab("layers")} />
                <TabButton icon={Palette} active={activeTab === "globals"} onClick={() => setActiveTab("globals")} />
                <TabButton icon={FolderOpen} active={activeTab === "library"} onClick={() => setActiveTab("library")} />
                <TabButton icon={History} active={activeTab === "history"} onClick={() => setActiveTab("history")} />
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === "layers" && <DomTreePanel />}
                {activeTab === "globals" && <GlobalStylesPanel />}
                {activeTab === "library" && <LibraryPanel />}
                {activeTab === "history" && <HistoryPanel />}
            </div>
        </div>
    );
}

function TabButton({ icon: Icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex-1 h-full flex items-center justify-center relative hover:text-white transition-colors",
                active ? "text-white" : "text-[var(--builder-text-secondary)]"
            )}
        >
            <Icon size={16} />
            {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--builder-primary)]"></div>}
        </button>
    );
}

function DomTreePanel() {
    return (
        <div className="p-2">
            <h3 className="text-xs font-bold text-[var(--builder-text-secondary)] uppercase tracking-wider mb-2 px-2 pt-2">{dict.builder.inspector.tabs.layers}</h3>
            <div className="space-y-0.5">
                <TreeItem label="Body" depth={0} expanded icon={PanelsTopLeft} />
                <TreeItem label="Navbar" depth={1} expanded icon={Box} />
                <TreeItem label="Hero Section" depth={1} expanded active icon={PanelsTopLeft} />
                <TreeItem label="H1 Heading" depth={2} icon={Type} />
                <TreeItem label="Paragraph" depth={2} icon={AlignLeft} />
            </div>
        </div>
    )
}

function TreeItem({ label, depth, expanded, active, icon: Icon }: { label: string, depth: number, expanded?: boolean, active?: boolean, icon?: any }) {
    return (
        <div className={cn(
            "flex items-center py-1.5 px-2 rounded cursor-pointer text-xs select-none gap-2",
            active ? "bg-[var(--builder-active)] text-white" : "text-[var(--builder-text-main)] hover:bg-[var(--builder-canvas)]"
        )} style={{ paddingLeft: `${depth * 12 + 8}px` }}>
            {expanded !== undefined ? (
                <ChevronDown size={12} className={cn("transition-transform text-[var(--builder-text-secondary)]", !expanded && "-rotate-90")} />
            ) : (
                <div className="w-3" />
            )}
            {Icon && <Icon size={14} className={active ? "text-white" : "text-[var(--builder-text-secondary)]"} />}
            <span className="truncate">{label}</span>
        </div>
    )
}

function GlobalStylesPanel() {
    return (
        <div className="p-4 space-y-2">
            <h3 className="text-xs font-bold text-[var(--builder-text-secondary)] uppercase tracking-wider mb-4">Estilos Globais</h3>
            <StyleItem label="Palette" color="#FF5733" />
            <StyleItem label="Colors" color="#33FF57" />
            <StyleItem label="Forms" />
            <StyleItem label="Containers" />
            <StyleItem label="Custom Code" icon />
            <StyleItem label="Other" icon />
        </div>
    )
}

function StyleItem({ label, color, icon }: { label: string, color?: string, icon?: boolean }) {
    return (
        <div className="flex items-center justify-between p-3 bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded hover:border-[var(--builder-text-secondary)] cursor-pointer">
            <div className="flex items-center gap-3">
                {color && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>}
                <span className="text-sm font-medium text-[var(--builder-text-main)]">{label}</span>
            </div>
            <ChevronRight size={14} className="text-[var(--builder-text-secondary)]" />
        </div>
    )
}


function LibraryPanel() {
    return (
        <div className="p-4">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--builder-text-secondary)]" size={14} />
                <input type="text" placeholder="Procurar modelos..." className="w-full bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded px-3 py-1.5 pl-9 text-xs text-white outline-none focus:border-[var(--builder-active)] transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-[var(--builder-canvas)] aspect-video rounded border border-[var(--builder-border)] flex items-center justify-center text-xs text-[var(--builder-text-secondary)] hover:border-[var(--builder-active)] cursor-pointer">HERO 01</div>
                <div className="bg-[var(--builder-canvas)] aspect-video rounded border border-[var(--builder-border)] flex items-center justify-center text-xs text-[var(--builder-text-secondary)] hover:border-[var(--builder-active)] cursor-pointer">NAV 03</div>
            </div>
        </div>
    )
}


function HistoryPanel() {
    return (
        <div className="p-4">
            <h3 className="text-xs font-bold text-[var(--builder-text-secondary)] uppercase tracking-wider mb-4">Histórico</h3>
            <div className="space-y-4 relative before:absolute before:left-[5px] before:top-2 before:bottom-0 before:w-px before:bg-[var(--builder-border)]">
                <HistoryItem action="Updated Hero Text" time="Just now" active />
                <HistoryItem action="Changed Background" time="2 min ago" />
                <HistoryItem action="Added Navbar" time="5 min ago" />
            </div>
        </div>
    )
}

function HistoryItem({ action, time, active }: { action: string, time: string, active?: boolean }) {
    return (
        <div className="relative pl-6">
            <div className={cn("absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2", active ? "bg-[var(--builder-active)] border-[var(--builder-bg)]" : "bg-[var(--builder-border)] border-[var(--builder-bg)]")}></div>
            <p className="text-sm text-[var(--builder-text-main)]">{action}</p>
            <p className="text-xs text-[var(--builder-text-secondary)]">{time}</p>
        </div>
    )
}
