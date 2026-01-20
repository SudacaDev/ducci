"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Momento } from "@/types/momentos"
import Image from "next/image"

interface MomentsProps {
    momentos: Momento[]
}

export const MomentList = ({ momentos }: MomentsProps) => {
    const [selectedMomento, setSelectedMomento] = useState<Momento | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const openModal = (momento: Momento) => {
        setSelectedMomento(momento)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setSelectedMomento(null)
        document.body.style.overflow = 'unset'
    }

 
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        if (selectedMomento) {
            window.addEventListener('keydown', handleEsc)
        }
        return () => window.removeEventListener('keydown', handleEsc)
    }, [selectedMomento])

    const modal = selectedMomento ? (
        <div 
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            style={{ zIndex: 9999 }}
            onClick={closeModal}
        >
            
            <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                style={{ zIndex: 10000 }}
                aria-label="Cerrar"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            
            <div 
                className="relative max-w-4xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                
                <div className="relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-black">
                    <Image
                        src={selectedMomento.imagen_url}
                        alt={selectedMomento.imagen_alt || selectedMomento.titulo}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                    />
                </div>

            
                <div className="mt-4 text-center">
                    {selectedMomento.evento && (
                        <span className="text-sm tracking-wider uppercase text-amber-400 mb-1 block">
                            {selectedMomento.evento}
                        </span>
                    )}
                    <h3 className="text-white font-serif text-2xl selectedMomento-title">
                        {selectedMomento.titulo}
                    </h3>
                    {selectedMomento.descripcion && (
                        <p className="text-white/70 mt-2 max-w-lg mx-auto selectedMomento-descripcion">
                            {selectedMomento.descripcion}
                        </p>
                    )}
                    <div className="flex items-center justify-center gap-3 mt-3 text-sm text-white/50">
                        {selectedMomento.branch && (
                            <span className="selectedMomento-branch-name">{selectedMomento.branch.name}</span>
                        )}
                        {selectedMomento.fecha && (
                            <>
                                <span>•</span>
                                <span>
                                    {new Date(selectedMomento.fecha).toLocaleDateString('es-AR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null

    return (
        <>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  h-[280px auto-rows-[200px]">
                {momentos.map((momento, index) => (
                    <article
                        key={momento.id}
                        onClick={() => openModal(momento)}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group] ${
                            index === 0 && momento.destacado
                                ? 'sm:col-span-2 sm:row-span-2'
                                : ''
                        }`}
                    >
                        <Image
                            src={momento.imagen_url}
                            alt={momento.imagen_alt || momento.titulo}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                ))}
            </div>

            
            {mounted && createPortal(modal, document.body)}
        </>
    )
}