import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface CenterContainerProps{
    children: ReactNode
    center?: boolean
    className?: string
}
const CenterContainer = ({children, center, className }: CenterContainerProps) => {
    return (
        <div className={cn("w-full px-4 bg-light py-8", className)}>
            <div className={`${center ? 'container mx-auto' : ' '  } w-full`}>
                {children}
            </div>
        </div>
    )
}
export default CenterContainer



