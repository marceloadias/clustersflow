import { Search, Box, RectangleHorizontal, LayoutPanelLeft, Columns2, List, Heading1, AlignLeft, ArrowUpRight, Hash, Palette, Wand2, Heart } from "lucide-react";
import { dict } from "@/lib/i18n";

interface LeftDrawerProps {
    isOpen: boolean;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function LeftDrawer({ isOpen, activeTab, onTabChange }: LeftDrawerProps) {
    if (!isOpen) return null;

    const { leftPanel } = dict.builder;

    const tabs = [
        { id: "add", label: leftPanel.tabs.elements.toUpperCase() },
        { id: "styles", label: leftPanel.tabs.style.toUpperCase() },
        { id: "effects", label: leftPanel.tabs.effects.toUpperCase() },
        { id: "favorites", label: leftPanel.tabs.favorites.toUpperCase() },
    ];

    return (
        <div className="w-[280px] bg-[var(--builder-bg)] border-r border-[var(--builder-border)] flex flex-col h-full animate-in slide-in-from-left duration-200 z-40">
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-4 pt-3 border-b border-[var(--builder-border)] scrollbar-hide overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`text-[11px] font-bold tracking-wider pb-3 transition-colors relative whitespace-nowrap px-1 ${activeTab === tab.id
                            ? "text-white"
                            : "text-[var(--builder-text-secondary)] hover:text-white"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === "add" && (
                    <div className="flex flex-col gap-6 p-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--builder-text-secondary)]" size={14} />
                            <input
                                type="text"
                                placeholder={leftPanel.searchPlaceholder}
                                className="w-full bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded-md pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--builder-active)] placeholder:text-[var(--builder-text-secondary)]"
                            />
                        </div>

                        {/* Structure Section */}
                        <div>
                            <div className="flex items-center justify-between mb-3 group cursor-pointer">
                                <h3 className="text-xs font-bold text-[var(--builder-text-secondary)] uppercase tracking-wider">{leftPanel.groups.structure}</h3>
                                <span className="text-[10px] text-[var(--builder-text-secondary)] transition-transform group-hover:translate-y-0.5">▼</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <DraggableCard icon={RectangleHorizontal} label={leftPanel.blocks.section} />
                                <DraggableCard icon={Box} label={leftPanel.blocks.container} />
                                <DraggableCard icon={LayoutPanelLeft} label={leftPanel.blocks.quickStack} />
                                <DraggableCard icon={Columns2} label={leftPanel.blocks.columns} />
                                <DraggableCard icon={List} label={leftPanel.blocks.list} />
                            </div>
                        </div>

                        {/* Typography Section */}
                        <div>
                            <div className="flex items-center justify-between mb-3 group cursor-pointer">
                                <h3 className="text-xs font-bold text-[var(--builder-text-secondary)] uppercase tracking-wider">{leftPanel.groups.typography}</h3>
                                <span className="text-[10px] text-[var(--builder-text-secondary)] transition-transform group-hover:translate-y-0.5">▼</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <DraggableCard icon={Heading1} label={leftPanel.blocks.heading} />
                                <DraggableCard icon={AlignLeft} label={leftPanel.blocks.paragraph} />
                                <DraggableCard icon={ArrowUpRight} label={leftPanel.blocks.link} />
                                <DraggableCard icon={Hash} label="Text Block" />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "styles" && (
                    <div className="p-4 flex flex-col gap-6">
                        <div>
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Selector</h3>
                            <div className="bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded-md p-3 flex items-center justify-between cursor-pointer hover:border-white/20 transition-all">
                                <span className="text-sm text-white/90 font-medium">Hero Section</span>
                                <span className="text-[10px] text-white/20">▼</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Spacing (Box Model)</h3>
                            <div className="aspect-video bg-[var(--builder-canvas)] border border-dashed border-white/10 rounded-lg flex items-center justify-center">
                                <div className="w-24 h-12 border border-blue-500/50 rounded flex items-center justify-center bg-blue-500/5">
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Padding</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "effects" && (
                    <div className="p-4 flex flex-col gap-6">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Opacity</h3>
                                <span className="text-xs text-white/60">100%</span>
                            </div>
                            <div className="h-1 bg-[var(--builder-canvas)] rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-full" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Borders</h3>
                                <span className="text-white/20">+</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded p-2 flex items-center justify-between">
                                    <span className="text-[10px] text-white/40">Radius</span>
                                    <span className="text-xs text-blue-400 font-mono">8px</span>
                                </div>
                                <div className="bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded p-2 flex items-center justify-between">
                                    <span className="text-[10px] text-white/40">Width</span>
                                    <span className="text-xs text-blue-400 font-mono">1px</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "favorites" && (
                    <div className="p-4 flex flex-col gap-4">
                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">{leftPanel.tabs.favorites}</h3>
                        <div className="bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded-lg p-3 hover:border-blue-500/50 transition-all group cursor-pointer overflow-hidden">
                            <div className="aspect-video bg-[var(--builder-bg)] rounded mb-3 flex items-center justify-center">
                                <RectangleHorizontal size={32} className="text-white/10" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-white/80">Hero Dark v2</span>
                                <Heart size={14} className="text-blue-500 fill-blue-500" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DraggableCard({ icon: Icon, label, badge }: { icon: any, label: string, badge?: string }) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("application/builder-element", label);
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div
            className="flex flex-col items-center justify-center gap-2 p-3 bg-[var(--builder-canvas)] border border-[var(--builder-border)] rounded hover:border-[var(--builder-active)] hover:bg-[var(--builder-bg)] cursor-grab group relative transition-all active:cursor-grabbing"
            draggable
            onDragStart={handleDragStart}
        >
            {badge && (
                <span className="absolute top-1 right-1 bg-orange-500 text-white text-[9px] font-bold px-1 rounded-sm">{badge}</span>
            )}
            <Icon size={20} className="text-[var(--builder-text-secondary)] group-hover:text-white" />
            <span className="text-xs text-[var(--builder-text-secondary)] group-hover:text-white text-center">{label}</span>
        </div>
    )
}
