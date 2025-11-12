"use client";

import { useProducts } from "@/components/products/Product";
import { CheckCircle2, Lock, Package, XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Product } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { SIZE_CONFIG } from "@/types/order.type";
import ViewToggle from "./ViewToggle";

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
    // Validar sucursal
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validar tamaño
    if (!currentDraft) {
      toast.error("Primero selecciona una cantidad", { duration: 2000 });
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
        toast.error(`Máximo ${currentDraft.maxFlavors} sabores para este tamaño`, { 
          duration: 2000 
        });
        return;
      }

      addFlavorToDraft(flavorSlug);
      toast.success(`Sabor agregado (${currentDraft.selectedFlavors.length + 1} de hasta ${currentDraft.maxFlavors})`, { 
        duration: 1500 
      });
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


  const getProductState = (item: Product) => {
    const isSelected = isFlavorSelected(item.name);
    const isSameBranch = selectedBranchId === null || selectedBranchId === item.branch.id;
    const isMaxReached = currentDraft && currentDraft.selectedFlavors.length >= currentDraft.maxFlavors && !isSelected;
    
    let isDisabled = false;
    let disabledReason = "";
    
    if (!selectedBranchId) {
      isDisabled = true;
      disabledReason = "sin-sucursal";
    } else if (!currentDraft) {
      isDisabled = true;
      disabledReason = "sin-cantidad";
    } else if (!isSameBranch) {
      isDisabled = true;
      disabledReason = "otra-sucursal";
    } else if (isMaxReached) {
      isDisabled = true;
      disabledReason = "max-alcanzado";
    }
    
    return { isSelected, isDisabled, disabledReason, isSameBranch };
  };

  return (
    <>
      {/* Panel de armado del pedido */}
      {currentDraft && (
        <div className="order-wrapper-timeline rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="order-wrapper-label">
                Armando pedido: <span className="order-wrapper_info-quantity">{SIZE_CONFIG[currentDraft.size].label}</span>
              </p>
              <p className="order-wrapper_info-select">
                {currentDraft.selectedFlavors.length} de hasta {currentDraft.maxFlavors} sabores seleccionados
              </p>
              <p className="text-xs text-gray-600 mt-1">
                💡 Puedes elegir entre 1 y {currentDraft.maxFlavors} sabores
              </p>
            </div>
            <div className="text-right">
              <p className="order-wrapper_info-price">
                ${currentDraft.pricePerKg * SIZE_CONFIG[currentDraft.size].weight}
              </p>
            </div>
          </div>

          {/* Sabores seleccionados */}
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
              ✓ Confirmar Pedido {currentDraft.selectedFlavors.length > 0 && `(${currentDraft.selectedFlavors.length} sabor${currentDraft.selectedFlavors.length > 1 ? 'es' : ''})`}
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

      {/* Lista de productos - SIEMPRE VISIBLE */}
      <ViewToggle />
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
              const { isSelected, isDisabled, disabledReason } = getProductState(item);

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => !isDisabled && handleFlavorClick(item)}
                  className={`product-list_item ${viewMode === "grid" ? "flex-col" : "flex-row"} rounded-lg transition-all relative ${
                    isSelected
                      ? "ring-4 ring-blue-500 shadow-lg bg-blue-50"
                      : isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md hover:scale-102 cursor-pointer"
                  }`}
                >
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-20 bg-blue-500 rounded-full p-1">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  )}

 
                  {isDisabled && !isSelected && (
                    <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                      {disabledReason === "sin-sucursal" && <Lock className="w-6 h-6 text-white" />}
                      {disabledReason === "sin-cantidad" && <Package className="w-6 h-6 text-white" />}
                      {disabledReason === "max-alcanzado" && <XCircle className="w-6 h-6 text-white" />}
                      {disabledReason === "otra-sucursal" && <Lock className="w-6 h-6 text-white" />}
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