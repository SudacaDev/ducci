"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.type";

interface ModalFlavorProductProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  availableFlavors: Product[];
  onConfirm: (selectedFlavors: string[], quantity: number) => void;
  selectedBranchId: number | null;
}

export const ModalFlavorProduct = ({
  isOpen,
  onClose,
  product,
  availableFlavors,
  onConfirm,
  selectedBranchId,
}: ModalFlavorProductProps) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showFlavorSelector, setShowFlavorSelector] = useState(false);

  // ============================================
  // BLOQUEAR SCROLL DEL BODY
  // ============================================
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const lenis = (window as any).lenis;

      if (lenis) {
        lenis.stop();
      } else {
        console.log("⚠️ Lenis NOT FOUND - usando fallback");
      }

      // Bloquear scroll del body
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      const lenis = (window as any).lenis;

      if (lenis) {
        lenis.start();
      }

      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";

      window.scrollTo(0, scrollY);
    }

    return () => {
      console.log("🧹 Cleanup running");
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const maxFlavors = product.config?.maxFlavors || 1;
  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;

  // Convertir nombre a slug
  const productNameToSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Toggle sabor
  const handleFlavorToggle = (flavorName: string) => {
    const slug = productNameToSlug(flavorName);

    if (selectedFlavors.includes(slug)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== slug));
    } else {
      if (selectedFlavors.length < maxFlavors) {
        setSelectedFlavors([...selectedFlavors, slug]);
      }
    }
  };

  // Cambiar cantidad
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  // Confirmar y agregar
  const handleConfirm = () => {
    if (selectedFlavors.length === 0) {
      alert("Debes seleccionar al menos un sabor");
      return;
    }

    onConfirm(selectedFlavors, quantity);

    // Reset y cerrar
    setSelectedFlavors([]);
    setQuantity(1);
    setShowFlavorSelector(false);
    onClose();
  };

  // Cerrar y limpiar
  const handleClose = () => {
    setSelectedFlavors([]);
    setQuantity(1);
    setShowFlavorSelector(false);
    onClose();
  };

  // Filtrar sabores disponibles según la sucursal
  const filteredFlavors = availableFlavors.filter(
    (flavor) =>
      selectedBranchId === null ||
      flavor.branches.some((branch) => branch.id === selectedBranchId),
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
        onClick={handleClose}
        style={{ overflow: "hidden" }}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl"
            style={{ flexShrink: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido - CON SCROLL INTERNO */}
          <div
            className="p-6 space-y-6"
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              minHeight: 0,
            }}
          >
            {/* Imagen */}
            <div className="flex justify-center">
              <div className="modal-img ">
                <Image
                  src={
                    product.image ||
                    "https://html.designingmedia.com/icedelight/assets/images/classic-image2.png"
                  }
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Precio */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ${unitPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Sin impuestos</p>
              </div>
            </div>

            {/* Descripción */}
            {product.description && (
              <p className="text-gray-600 text-sm">{product.description}</p>
            )}

            <hr />

            {/* Selector de Sabores */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Sabores de Helado
                </h3>
                <button
                  onClick={() => setShowFlavorSelector(!showFlavorSelector)}
                  className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                >
                  {showFlavorSelector ? "Cerrar" : "Seleccionar"}
                </button>
              </div>

              {/* Sabores seleccionados */}
              {selectedFlavors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedFlavors.map((slug) => {
                    const flavor = filteredFlavors.find(
                      (f) => productNameToSlug(f.name) === slug,
                    );
                    return (
                      <span
                        key={slug}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        <Check className="w-3 h-3" />
                        {flavor?.name || slug}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Info de sabores */}
              <p className="text-xs text-gray-500">
                {selectedFlavors.length} de hasta {maxFlavors} sabores
                seleccionados
              </p>

              {/* Lista de sabores desplegable */}
              {showFlavorSelector && (
                <div
                  className="border border-gray-200 rounded-lg"
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {filteredFlavors.map((flavor) => {
                    const slug = productNameToSlug(flavor.name);
                    const isSelected = selectedFlavors.includes(slug);
                    const isDisabled =
                      selectedFlavors.length >= maxFlavors && !isSelected;

                    return (
                      <label
                        key={flavor.id}
                        className={`flex items-center gap-3 p-4 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                          isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            !isDisabled && handleFlavorToggle(flavor.name)
                          }
                          disabled={isDisabled}
                          className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                        />
                        <span className="flex-1 font-medium text-gray-900">
                          {flavor.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <hr />

            {/* Selector de Unidades */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Unidades</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <span className="text-2xl font-bold text-gray-900 min-w-[3ch] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="bg-white border-t border-gray-200 p-4 rounded-b-2xl"
            style={{ flexShrink: 0 }}
          >
            <Button
              onClick={handleConfirm}
              disabled={selectedFlavors.length === 0}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg py-6 rounded-xl flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20">
                  {quantity}
                </span>
                Agregar a mi pedido
              </span>
              <span className="font-bold">${totalPrice.toLocaleString()}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFlavorProduct;
