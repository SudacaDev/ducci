"use client"

import Image from "next/image"
import CenterContainer from "@/components/container/center"
import InnerLayout from "@/components/inner-layout"
import { useMomentos } from "@/hooks/useMomentos"
import { CATEGORIA_LABELS, type MomentoCategoria } from "@/types/momentos"

import "./style/moment.css"; 
import { MomentList } from "./components/moments-list"

const CATEGORIAS: MomentoCategoria[] = ['todos', 'eventos', 'en_familia', 'amigos']

export const DucciMomentsContent = () => {
  const { momentos, loading, error, categoria, changeCategoria } = useMomentos()

  return (
    <InnerLayout id="momentos" bannerTitle="Momentos Ducci">
      <CenterContainer center>
        <section className="">
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => changeCategoria(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  categoria === cat
                    ? 'bg-ducci text-white'
                    : 'border border-ducci text-ducci-brown hover:bg-ducci-dark hover:text-white'
                }`}
              >
                {CATEGORIA_LABELS[cat]}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          )}

          
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ducci-gold"></div>
            </div>
          )}

  
          {!loading && momentos.length > 0 && (
            <MomentList 
              momentos={momentos}
            />
             
          )}


          {!loading && momentos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-ducci-brown">
                No hay momentos en esta categoría todavía.
              </p>
            </div>
          )}
        </section>
      </CenterContainer>
    </InnerLayout>
  )
}