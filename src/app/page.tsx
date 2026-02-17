"use client";

import { Topbar } from "@/components/builder/topbar";
import { LeftSidebar } from "@/components/builder/left-sidebar";
import { LeftDrawer } from "@/components/builder/left-drawer";
import { Canvas } from "@/components/builder/canvas";
import { RightSidebar } from "@/components/builder/right-sidebar";
import { useState } from "react";

export default function Home() {
  const [activeLeftTab, setActiveLeftTab] = useState("add");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const handleLeftTabChange = (tab: string) => {
    if (tab === activeLeftTab) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setActiveLeftTab(tab);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="h-screen w-full bg-[var(--builder-bg)] text-[var(--builder-text-main)] flex flex-col overflow-hidden font-sans">
      <Topbar onToggleRightSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          activeTab={activeLeftTab}
          onTabChange={handleLeftTabChange}
          isDrawerOpen={isDrawerOpen}
          onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
        />
        <LeftDrawer isOpen={isDrawerOpen} activeTab={activeLeftTab} onTabChange={handleLeftTabChange} />
        <Canvas />
        {isRightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  )
}
