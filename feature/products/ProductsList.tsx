"use client";

import { useProducts } from "@/components/products/Product";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Product } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { SIZE_CONFIG } from "@/types/order.type";

const ProductsList = () => {
  const {
    filteredProducts,
    viewMode,
    selectedBranchId,
    currentDraft,
    addFlavorToDraft,
    removeFlavorFromDraft,
    confirmCurrentOrder,
    cancelCurrentOrder,
  } = useProducts();

  const productNameToSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleFlavorClick = (item: Product) => {
    if (!currentDraft) {
      toast.error("Primero selecciona un tamaño", { duration: 2000 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const flavorSlug = productNameToSlug(item.name);
    const isSelected = currentDraft.selectedFlavors.includes(flavorSlug);

    if (isSelected) {
      removeFlavorFromDraft(flavorSlug);
      toast("Sabor eliminado", { duration: 1500 });
    } else {
      if (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors) {
        toast.error(`Ya seleccionaste ${currentDraft.maxFlavors} sabores para este pedido`, { 
          duration: 2000 
        });
        return;
      }

      addFlavorToDraft(flavorSlug);
      
      const remaining = currentDraft.maxFlavors - currentDraft.selectedFlavors.length - 1;
      if (remaining > 0) {
        toast.success(`Sabor agregado. Faltan ${remaining} sabores`, { duration: 1500 });
      } else {
        toast.success("¡Pedido completo! Puedes confirmar ahora", { duration: 2000 });
      }
    }
  };

  const handleConfirm = () => {
    if (!currentDraft) return;
    
    if (currentDraft.selectedFlavors.length === 0) {
      toast.error("Debes seleccionar al menos un sabor", { duration: 2000 });
      return;
    }

    confirmCurrentOrder();
    toast.success("¡Pedido agregado al carrito!", { duration: 2000 });
  };

  const handleCancel = () => {
    cancelCurrentOrder();
    toast("Pedido cancelado", { duration: 1500 });
  };

  const isFlavorSelected = (productName: string) => {
    if (!currentDraft) return false;
    const slug = productNameToSlug(productName);
    return currentDraft.selectedFlavors.includes(slug);
  };

  return (
    <>
      {currentDraft && (
        <div className=" order-wrapper-timeline  rounded-lg p-6 mb-6 ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="order-wrapper-label">
                Armando pedido: <span className="order-wrapper_info-quantity">{SIZE_CONFIG[currentDraft.size].label}</span>
              </p>
              <p className="order-wrapper_info-select">
                {currentDraft.selectedFlavors.length} de {currentDraft.maxFlavors} sabores seleccionados
              </p>
            </div>
            <div className="text-right">
              <p className="order-wrapper_info-price">
                ${currentDraft.pricePerKg * SIZE_CONFIG[currentDraft.size].weight}
              </p>
            </div>
          </div>

      
          {currentDraft.selectedFlavors.length > 0 && (
            <div className="current-draft rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Sabores seleccionados:</p>
              <div className="flex flex-wrap gap-2">
                {currentDraft.selectedFlavors.map(slug => {
                  const product = filteredProducts.find(p => productNameToSlug(p.name) === slug);
                  return (
                    <span 
                      key={slug} 
                      className="order-pill"
                    >
                      {product?.name || slug}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={currentDraft.selectedFlavors.length === 0}
              className="confirm-btn"
            >
              ✓ Confirmar Pedido
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outline"
              className="cancel-btn"
            >
              ✗ Cancelar
            </Button>
          </div>
        </div>
      )}
    <div className="products-list-container product-list-block py-4">

      <div
        className={`products-list-container py-4 ${
          viewMode === "grid"
            ? "product-list-block"
            : "product-list-inline flex flex-col gap-4"
        }`}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No hay productos en esta categoría
          </p>
        ) : (
          filteredProducts.map((item) => {
            const isSelected = isFlavorSelected(item.name);
            const canSelect = selectedBranchId === null || selectedBranchId === item.branch.id;
            const isDisabled = !currentDraft || (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors && !isSelected);

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => canSelect && !isDisabled && handleFlavorClick(item)}
                disabled={!canSelect || isDisabled || !currentDraft}
                className={`product-list_item ${viewMode === "grid" ? "flex-col" : "flex-row"} rounded-lg transition-all relative ${
                  isSelected
                    ? "ring-4 ring-blue-500 shadow-lg   bg-blue-50"
                    : canSelect && !isDisabled && currentDraft
                      ? "hover:shadow-md hover:scale-102 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-20 bg-blue-500 rounded-full p-1">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                )}

                {isDisabled && currentDraft && !isSelected && (
                  <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="product-list_image inset-shadow-sm rounded-md">
                  <figure>
                    <Image
                      src="https://html.designingmedia.com/icedelight/assets/images/classic-image2.png"
                      alt={item.name}
                      width={240}
                      height={240}
                      loading="lazy"
                    />
                  </figure>
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <div className="product-list_name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="product-list_desc">
                    <p>{item.description}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
    </>
  );
};

export default ProductsList;