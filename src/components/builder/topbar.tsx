import { Monitor, Tablet, Smartphone, Undo2, Redo2, Save, Eye, PanelRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dict } from "@/lib/i18n";

export function Topbar({ onToggleRightSidebar }: { onToggleRightSidebar?: () => void }) {
    const t = dict.builder.topbar;

    return (
        <div className="h-14 border-b border-[var(--builder-border)] bg-[var(--builder-bg)] flex items-center justify-between px-4 sticky top-0 z-50">
            {/* Left: Branding & Project */}
            <div className="flex items-center gap-4">
                <button className="text-[var(--builder-text-secondary)] hover:text-white transition-colors">
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h1 className="text-sm font-semibold text-[var(--builder-text-main)]">{t.projectTitle}</h1>
                    <p className="text-xs text-[var(--builder-text-secondary)]">{t.projectSubtitle}</p>
                </div>
            </div>

            {/* Center: Device Toggles & Zoom */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-[var(--builder-canvas)] rounded-lg p-1 border border-[var(--builder-border)]">
                    <button className="p-1.5 rounded bg-[var(--builder-active)] text-white" title={t.desktop}>
                        <Monitor size={16} />
                        <span className="sr-only">{t.desktop}</span>
                    </button>
                    <button className="p-1.5 rounded text-[var(--builder-text-secondary)] hover:text-white transition-colors" title={t.tablet}>
                        <Tablet size={16} />
                        <span className="sr-only">{t.tablet}</span>
                    </button>
                    <button className="p-1.5 rounded text-[var(--builder-text-secondary)] hover:text-white transition-colors" title={t.mobile}>
                        <Smartphone size={16} />
                        <span className="sr-only">{t.mobile}</span>
                    </button>
                </div>

                <div className="flex items-center">
                    <select className="bg-[var(--builder-canvas)] text-[var(--builder-text-main)] text-xs border border-[var(--builder-border)] rounded px-2 py-1.5 outline-none focus:border-[var(--builder-active)] transition-all">
                        <option>1440 px</option>
                        <option>1024 px</option>
                        <option>768 px</option>
                        <option>375 px</option>
                    </select>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 mr-2">
                    <Button variant="ghost" size="icon" className="text-[var(--builder-text-secondary)] hover:text-white h-8 w-8" title={t.undo}>
                        <Undo2 size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[var(--builder-text-secondary)] hover:text-white h-8 w-8" title={t.redo}>
                        <Redo2 size={18} />
                    </Button>
                </div>

                <Button variant="ghost" size="sm" className="text-[var(--builder-text-secondary)] hover:text-white h-8 gap-2 px-2.5 rounded-lg border border-transparent hover:border-[var(--builder-border)] transition-all" title={dict.common.save}>
                    <Save size={16} />
                    <span className="text-xs font-semibold">{dict.common.save}</span>
                </Button>

                <div className="w-px h-6 bg-[var(--builder-border)] mx-1"></div>

                <Button variant="ghost" size="icon" className="text-[var(--builder-text-secondary)] hover:text-white h-8 w-8" onClick={onToggleRightSidebar} title={t.toggleInspector}>
                    <PanelRight size={18} />
                </Button>

                <a href="/preview" className="flex items-center justify-center h-8 w-8 rounded text-[var(--builder-text-secondary)] hover:text-white hover:bg-white/10 transition-colors" title={t.preview}>
                    <Eye size={18} />
                </a>

                <Button className="ml-2 bg-[var(--builder-primary)] hover:bg-[var(--builder-primary)]/90 text-white h-8 text-xs font-medium px-4 shadow-lg shadow-primary/20">
                    {t.publish}
                </Button>
            </div>
        </div>
    );
}
