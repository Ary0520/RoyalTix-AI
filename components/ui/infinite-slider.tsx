"use client"

import { cn } from "@/lib/utils"
import { useMotionValue, animate, motion } from "framer-motion"
import { useState, useEffect } from "react"
import useMeasure from "react-use-measure"

type InfiniteSliderProps = {
    children: React.ReactNode
    gap?: number
    duration?: number
    durationOnHover?: number
    speed?: number // Assuming speed implies duration if not provided
    speedOnHover?: number
    direction?: "horizontal" | "vertical"
    reverse?: boolean
    className?: string
}

export function InfiniteSlider({
    children,
    gap = 16,
    duration,
    durationOnHover,
    speed,
    speedOnHover,
    direction = "horizontal",
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const [ref, { width, height }] = useMeasure()
    const translation = useMotionValue(0)
    const [isHovered, setIsHovered] = useState(false)
    const [key, setKey] = useState(0) // Force re-render/reset when dimensions change

    const currentDuration = isHovered
        ? (durationOnHover || speedOnHover || duration || speed || 25)
        : (duration || speed || 25)

    useEffect(() => {
        let controls;
        const size = direction === "horizontal" ? width : height
        const contentSize = size + gap

        // If content is not ready or 0, don't animate to avoid errors
        if (!size) return;

        const from = reverse ? -contentSize / 2 : 0
        const to = reverse ? 0 : -contentSize / 2

        // We need at least enough copies to fill the screen + buffer.
        // simpler approach: just animate the container which has 2 copies of content
        // and reset when it reaches 50%.

        // However, the provided usage implies children are individual items.
        // Usually InfiniteSlider takes a list of items and scrolls them.
        // The provided usage has children as `div`s.
        // Let's assume the children are wrapped in a flex container that we translate.

        controls = animate(translation, [from, to], {
            ease: "linear",
            duration: currentDuration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
            onUpdate: (latest) => {
                if (latest <= -width / 2 && !reverse) {
                    translation.set(0)
                }
                // This logic is tricky with framer motion values manual setting.
                // Better to specific exact keyframes.
            }
        });

        return controls.stop
    }, [key, width, height, currentDuration, gap, direction, reverse, translation])

    // Actually simpler loop implementation typically used:
    // We need to render Children * 2. 

    return (
        <div
            className={cn("flex overflow-hidden", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="flex w-max"
                style={{
                    gap: `${gap}px`,
                    x: translation,
                }}
                ref={ref}
                animate={{
                    x: reverse ? [-(width || 0) / 2, 0] : [0, -(width || 0) / 2]
                }}
                transition={{
                    duration: currentDuration,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    )
}
