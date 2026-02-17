import { dict } from "@/lib/i18n";

export default function PreviewPage() {
    const t = dict.preview;
    return (
        <div className="h-screen w-full bg-[var(--builder-preview-bg)] flex flex-col relative font-sans">
            <div className="absolute top-4 left-4 z-50">
                <a href="/" className="px-4 py-2 bg-[var(--builder-primary)] text-white rounded-[8px] text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 font-medium">
                    ← {t.backToEditor}
                </a>
            </div>
            <div className="flex-1 overflow-auto bg-[var(--builder-canvas)]">
                {/* Preview Content will go here */}
                <div className="max-w-7xl mx-auto py-20 px-4">
                    <h1 className="text-4xl font-bold text-[var(--builder-text-main)] mb-4">{t.title}</h1>
                    <p className="text-[var(--builder-text-secondary)]">{t.subtitle}</p>
                </div>
            </div>
        </div>
    )
}
