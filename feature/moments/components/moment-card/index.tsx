"use client"

import { useState } from "react"
import { Momento } from "@/types/momentos"
import Image from "next/image"

interface MomentCardProps {
    momento: Momento
    isLarge?: boolean
    onClick: () => void
}

export const MomentCard = ({ momento, isLarge, onClick }: MomentCardProps) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <article
            onClick={onClick}
            className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                isLarge ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
        >
            {/* Skeleton loader */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <svg 
                        className="w-10 h-10 text-gray-300 animate-spin" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                </div>
            )}

            <Image
                src={momento.imagen_url}
                alt={momento.imagen_alt || momento.titulo}
                fill
                className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="moment-list absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {momento.evento && (
                    <span className="text-xs tracking-wider text-amber-300 mb-1 block">
                        {momento.evento}
                    </span>
                )}
                <h3 className="text-white font-serif text-lg">
                    {momento.titulo}
                </h3>
                {momento.branch && (
                    <span className="text-xs text-white/70">
                        {momento.branch.name}
                    </span>
                )}
            </div>
        </article>
    )
}