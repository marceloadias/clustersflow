import { dict } from "@/lib/i18n";

export default function SettingsPage() {
    const t = dict.settings;
    return (
        <div className="h-screen w-full bg-[var(--builder-bg)] text-[var(--builder-text-main)] flex items-center justify-center p-4 font-sans backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-[#0F172A] border border-white/5 rounded-[16px] p-8 shadow-2xl relative">
                <a href="/" className="absolute top-6 right-6 text-[var(--builder-text-secondary)] hover:text-white transition-colors">✕</a>

                <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full"></span>
                    {t.title}
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{t.domain}</label>
                        <div className="flex gap-2">
                            <input type="text" value="meu-projeto.clustersflow.com" readOnly className="flex-1 bg-[#111C33] border border-white/5 rounded-[10px] px-4 py-2.5 text-sm text-white/80 outline-none" />
                            <button className="px-5 py-2.5 bg-primary rounded-[10px] text-white text-xs font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">{t.connectDomain}</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{t.seoTitle}</label>
                        <input type="text" placeholder={t.seoTitlePlaceholder} className="w-full bg-[#111C33] border border-white/5 rounded-[10px] px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-3">{t.seoDescription}</label>
                        <textarea rows={4} placeholder={t.seoDescriptionPlaceholder} className="w-full bg-[#111C33] border border-white/5 rounded-[10px] px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all resize-none"></textarea>
                    </div>

                    <div className="pt-6 mt-4 border-t border-white/5 flex justify-end gap-4">
                        <a href="/" className="px-6 py-2.5 text-xs font-bold text-white/40 hover:text-white transition-colors">{t.cancel}</a>
                        <button className="px-8 py-2.5 bg-primary text-white rounded-[10px] text-xs font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">{t.saveChanges}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
