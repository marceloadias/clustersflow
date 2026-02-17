"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ClusterAssistantProps {
    state?: 'idle' | 'thinking' | 'message'
    size?: 'sm' | 'md' | 'lg'
}

export function ClusterAssistant({ state = 'idle', size = 'md' }: ClusterAssistantProps) {
    const [isHovered, setIsHovered] = useState(false)

    const sizeMap = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16'
    }

    // Animation variants
    const cubeVariants: any = {
        idle: {
            rotateY: [0, 45, 0],
            rotateX: [0, 45, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        },
        thinking: {
            scale: [1, 1.05, 1],
            boxShadow: ["0px 0px 8px var(--primary)", "0px 0px 20px var(--primary)", "0px 0px 8px var(--primary)"],
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        },
        message: {
            scale: 1.1,
            transition: { type: "spring", stiffness: 300, damping: 10 }
        }
    }

    return (
        <div
            className={cn("relative flex items-center justify-center p-2", sizeMap[size])}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={state}
                variants={cubeVariants}
            >
                {/* Simple 3D Cube using Borders and Perspective */}
                <div className="absolute inset-0 border-2 border-primary/40 bg-primary/10 rounded-sm" />

                {/* Top "Cap" of the cube (opens on message) */}
                <motion.div
                    className="absolute inset-0 border-b-0 border-2 border-primary/60 bg-primary/20 rounded-t-sm origin-bottom"
                    animate={{
                        rotateX: state === 'message' ? -20 : 0,
                        y: state === 'message' ? -2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Inner glow effect */}
                {state === 'thinking' && (
                    <motion.div
                        className="absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_8px_var(--primary)]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                )}
            </motion.div>

            {/* Suttle Glow Base */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-primary/30 blur-[2px]" />
        </div>
    )
}
