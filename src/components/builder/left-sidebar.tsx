import { Plus, Settings, Palette, Wand2, Heart, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { dict } from "@/lib/i18n";

interface LeftSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isDrawerOpen: boolean;
    onToggleDrawer: () => void;
}

export function LeftSidebar({ activeTab, onTabChange, isDrawerOpen, onToggleDrawer }: LeftSidebarProps) {
    const { leftPanel } = dict.builder;
    const tools = [
        { id: "add", icon: Plus, label: leftPanel.tabs.elements },
        { id: "styles", icon: Palette, label: leftPanel.tabs.style },
        { id: "effects", icon: Wand2, label: leftPanel.tabs.effects },
        { id: "favorites", icon: Heart, label: leftPanel.tabs.favorites },
    ];

    return (
        <div className="w-14 bg-[var(--builder-bg)] border-r border-[var(--builder-border)] flex flex-col items-center py-4 z-50">
            <div className="flex flex-col gap-4 w-full px-2">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => onTabChange(tool.id)}
                        className={cn(
                            "w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative group",
                            activeTab === tool.id && isDrawerOpen
                                ? "bg-[var(--builder-active)] text-white"
                                : "text-[var(--builder-text-secondary)] hover:bg-[var(--builder-border)] hover:text-white"
                        )}
                        title={tool.label}
                    >
                        <tool.icon size={20} />
                    </button>
                ))}

                <div className="w-full h-px bg-[var(--builder-border)] my-1 opacity-50" />

                <button
                    onClick={onToggleDrawer}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--builder-text-secondary)] hover:bg-[var(--builder-border)] hover:text-white transition-colors relative group"
                >
                    {isDrawerOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
                    {!isDrawerOpen && (
                        <span className="absolute left-14 bg-black/90 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                            Mostrar
                        </span>
                    )}
                </button>
            </div>

            <div className="mt-auto flex flex-col gap-4 w-full px-2 items-center">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--builder-text-secondary)] hover:bg-[var(--builder-border)] hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </div>
        </div>
    );
}
