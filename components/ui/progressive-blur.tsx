import { cn } from "@/lib/utils"

interface ProgressiveBlurProps {
    className?: string
    direction?: "top" | "bottom" | "left" | "right"
    blurIntensity?: number
}

export function ProgressiveBlur({
    className,
    direction = "bottom",
    blurIntensity = 1,
}: ProgressiveBlurProps) {
    const gradient = {
        top: "to top",
        bottom: "to bottom",
        left: "to left",
        right: "to right",
    }

    return (
        <div
            className={cn("absolute z-10", className)}
            style={{
                backdropFilter: `blur(${blurIntensity * 10}px)`,
                // Using a mask to fade the blur effect
                maskImage: `linear-gradient(${gradient[direction]}, rgba(0,0,0,1), rgba(0,0,0,0))`,
                WebkitMaskImage: `linear-gradient(${gradient[direction]}, rgba(0,0,0,1), rgba(0,0,0,0))`,
            }}
        />
    )
}
