import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Canvas() {
    const [selectedElement, setSelectedElement] = useState("Body / Header");

    return (
        <div className="flex-1 bg-[var(--builder-canvas)] relative overflow-hidden flex flex-col">
            {/* Rulers */}
            <div className="h-6 w-full bg-[var(--builder-bg)] border-b border-[var(--builder-border)] flex relative z-20">
                <div className="w-6 h-6 border-r border-[var(--builder-border)] shrink-0 bg-[var(--builder-bg)] z-10 text-[9px] text-[var(--builder-text-secondary)] flex items-center justify-center">px</div>
                <HorizontalRuler />
            </div>
            <div className="flex-1 flex overflow-hidden relative">
                <div className="w-6 h-full bg-[var(--builder-bg)] border-r border-[var(--builder-border)] shrink-0 relative z-20">
                    <VerticalRuler />
                </div>

                {/* Scrollable Canvas Area */}
                <div className="flex-1 overflow-auto bg-[var(--builder-canvas)] p-12 flex justify-center items-start scrollbar-thin scrollbar-thumb-[var(--builder-border)] scrollbar-track-transparent">

                    {/* Website Preview Container */}
                    <div
                        className="w-[1440px] bg-[var(--builder-preview-bg)] min-h-[900px] shadow-2xl relative group transition-all"
                        onClick={() => setSelectedElement("Body")}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.boxShadow = "0 0 0 2px var(--builder-active)";
                        }}
                        onDragLeave={(e) => {
                            e.currentTarget.style.boxShadow = "";
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.style.boxShadow = "";
                            const type = e.dataTransfer.getData("application/builder-element");
                            alert(`Mock: Added "${type}" to the page structure.`);
                        }}
                    >

                        {/* Active Element Label */}
                        <div className="absolute -top-6 left-0 bg-[var(--builder-primary)] text-white text-[10px] font-bold px-2 py-1 rounded-t z-30 transition-all">
                            {selectedElement}
                        </div>

                        {/* Selection Outline (Generic Wrapper) */}
                        <div className="absolute inset-0 border-[2px] border-[var(--builder-primary)] pointer-events-none z-20 opacity-50"></div>

                        {/* Actual Preview Content (Mocked) */}
                        <WebsiteContent onSelect={setSelectedElement} />

                        <div className="absolute bottom-10 right-10 bg-black/80 backdrop-blur-md rounded-full flex flex-col p-1.5 gap-2 z-50 border border-white/10 shadow-lg">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white hover:bg-white/20">
                                <span className="sr-only">Move</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M15 19l-3 3-3-3M2 12h20M12 2v20" /></svg>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-white hover:bg-white/20">
                                <span className="sr-only">Resize</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HorizontalRuler() {
    // Mock ticks
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="absolute text-[9px] text-[var(--builder-text-secondary)] flex flex-col items-start pt-1" style={{ left: i * 100 }}>
                    <span className="ml-1.5 opacity-50">{i * 100}</span>
                    <div className="h-1.5 w-px bg-[var(--builder-text-secondary)] absolute bottom-0 left-0"></div>
                    {/* Substicks */}
                    {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="h-1 w-px bg-[var(--builder-border)] absolute bottom-0" style={{ left: (j + 1) * 10 }}></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

function VerticalRuler() {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden select-none pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="absolute text-[9px] text-[var(--builder-text-secondary)] flex items-start pl-1" style={{ top: i * 100 }}>
                    <span className="rotate-270 origin-left mt-5 ml-0.5 text-[8px] opacity-50">{i * 100}</span>
                    <div className="w-1.5 h-px bg-[var(--builder-text-secondary)] absolute right-0 top-0"></div>
                    {/* Substicks */}
                    {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="w-1 h-px bg-[var(--builder-border)] absolute right-0" style={{ top: (j + 1) * 10 }}></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

function WebsiteContent({ onSelect }: { onSelect: (label: string) => void }) {
    const handleClick = (e: React.MouseEvent, label: string) => {
        e.stopPropagation();
        onSelect(label);
    }

    return (
        <div className="w-full text-white font-sans antialiased">
            {/* Navbar */}
            <nav
                className="flex items-center justify-between px-16 py-8 outline outline-1 outline-transparent hover:outline-blue-500/30 relative z-10 transition-all"
                onClick={(e) => handleClick(e, "Section / Navbar")}
            >
                <div className="flex items-center gap-3" onClick={(e) => handleClick(e, "Navbar / Logo")}>
                    <div className="w-5 h-5 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-xl font-bold tracking-tight text-white contentEditable focus:outline-none" contentEditable suppressContentEditableWarning>HRMANAGE</span>
                </div>

                <div className="flex items-center gap-10 text-[15px] font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                    <a href="#" className="hover:text-white transition-colors">Resources</a>
                    <a href="#" className="hover:text-white transition-colors">Company</a>
                </div>

                <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 transition-all" onClick={(e) => handleClick(e, "Navbar / Button")}>
                    Sign Up Free
                </button>
            </nav>

            {/* Hero */}
            <div
                className="text-center mt-24 px-4 w-full outline outline-1 outline-transparent hover:outline-blue-500/30 relative z-10 transition-all"
                onClick={(e) => handleClick(e, "Hero Section")}
            >
                <h1
                    className="text-[5.5rem] font-extrabold leading-[1.05] mb-8 tracking-tight outline-none focus:outline-dashed focus:outline-blue-500/50 rounded"
                    contentEditable
                    suppressContentEditableWarning
                    onClick={(e) => handleClick(e, "Hero / H1 Heading")}
                >
                    Maximizing the <span className="text-[#a5b4fc]">Potential</span><br />
                    of your Employees
                </h1>

                <p
                    className="text-[#9ca3af] text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-normal outline-none focus:outline-dashed focus:outline-blue-500/50 rounded"
                    contentEditable
                    suppressContentEditableWarning
                    onClick={(e) => handleClick(e, "Hero / Paragraph")}
                >
                    HR Manage is a people management solution that helps in employee<br />
                    onboarding, performance tracking, and attendance.
                </p>

                <div className="flex items-center justify-center gap-5">
                    <button
                        className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-9 py-4 rounded-full font-bold text-[17px] shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] transition-all transform hover:-translate-y-0.5"
                        onClick={(e) => handleClick(e, "Hero / CTA Primary")}
                    >
                        Start for Free
                    </button>
                    <button
                        className="bg-white text-black px-9 py-4 rounded-full font-bold text-[17px] hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 border border-transparent hover:border-gray-200"
                        onClick={(e) => handleClick(e, "Hero / CTA Secondary")}
                    >
                        Meet an Expert
                    </button>
                </div>
            </div>
        </div>
    )
}
