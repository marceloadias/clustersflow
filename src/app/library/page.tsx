export default function LibraryPage() {
    return (
        <div className="h-screen w-full bg-[var(--builder-bg)] text-[var(--builder-text-main)] flex flex-col p-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Component Library</h1>
                <a href="/" className="px-4 py-2 bg-[var(--builder-border)] rounded text-sm hover:bg-opacity-80">Close</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="bg-[var(--builder-canvas)] p-4 rounded border border-[var(--builder-border)]">
                    <div className="h-32 bg-[var(--builder-preview-bg)] rounded mb-4 flex items-center justify-center">Hero 01</div>
                    <p className="text-sm font-medium">Hero Section / Modern</p>
                </div>
                {/* More items... */}
            </div>
        </div>
    )
}
