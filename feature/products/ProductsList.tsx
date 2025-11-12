"use client";

import { useProducts } from "@/components/products/Product";
import { CheckCircle2, Lock, Package, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Product } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ViewToggle from "./ViewToggle";
import { PROD } from "@/constants/prod";

const ProductsList = () => {
  const {
    filteredProducts,
    viewMode,
    selectedBranchId,
    currentDraft,
    startFlavorOrder,
    addFlavorToDraft,
    removeFlavorFromDraft,
    startQuantityOrder,
    updateQuantityOrder,
    addSingleItemOrder,
    addBoxOrder,
    confirmCurrentOrder,
    cancelCurrentOrder,
  } = useProducts();

  // Estado local para cantidades temporales
  const [tempQuantities, setTempQuantities] = useState<Record<number, number>>({});

  const productNameToSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // ==========================================
  // MANEJO DE PRODUCTOS CON SABORES
  // ==========================================
  const handleFlavorProductClick = (item: Product) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si no hay draft o es de otro producto, iniciar nuevo
    if (!currentDraft || currentDraft.type !== "flavor-selection" || currentDraft.productId !== item.id) {
      startFlavorOrder(item);
      toast.success(`${item.name} seleccionado. Ahora elige los sabores`, { duration: 2000 });
      // Scroll a los sabores
      setTimeout(() => {
        const flavorsSection = document.getElementById('flavors-section');
        if (flavorsSection) {
          flavorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleFlavorClick = (flavor: Product) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") {
      toast.error("Primero selecciona un tamaño (1 Kilo, 1/2 Kilo, etc.)", { duration: 2000 });
      return;
    }

    const flavorSlug = productNameToSlug(flavor.name);
    const isSelected = currentDraft.selectedFlavors.includes(flavorSlug);

    if (isSelected) {
      removeFlavorFromDraft(flavorSlug);
      toast("Sabor eliminado", { duration: 1500 });
    } else {
      if (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors) {
        toast.error(`Máximo ${currentDraft.maxFlavors} sabores para este tamaño`, { duration: 2000 });
        return;
      }

      addFlavorToDraft(flavorSlug);
      toast.success(`Sabor agregado (${currentDraft.selectedFlavors.length + 1} de hasta ${currentDraft.maxFlavors})`, { duration: 1500 });
    }
  };

  const isFlavorSelected = (flavorName: string) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") return false;
    const slug = productNameToSlug(flavorName);
    return currentDraft.selectedFlavors.includes(slug);
  };

  const handleConfirmFlavors = () => {
    if (!currentDraft) return;
    
    if (currentDraft.type === "flavor-selection" && currentDraft.selectedFlavors.length === 0) {
      toast.error("Debes seleccionar al menos un sabor", { duration: 2000 });
      return;
    }

    confirmCurrentOrder();
    toast.success("¡Pedido agregado al carrito!", { duration: 2000 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelFlavors = () => {
    cancelCurrentOrder();
    toast("Pedido cancelado", { duration: 1500 });
  };

  // ==========================================
  // MANEJO DE PRODUCTOS CON CANTIDAD
  // ==========================================
  const handleQuantityChange = (productId: number, change: number) => {
    const current = tempQuantities[productId] || 1;
    const newQuantity = Math.max(1, current + change);
    
    const product = filteredProducts.find(p => p.id === productId);
    const maxQty = product?.config?.maxQuantity || 50;
    
    if (newQuantity > maxQty) {
      toast.error(`Máximo ${maxQty} unidades`, { duration: 2000 });
      return;
    }

    setTempQuantities({ ...tempQuantities, [productId]: newQuantity });
  };

 const handleAddQuantityProduct = (item: Product) => {
  if (!selectedBranchId) {
    toast.error("Primero selecciona una sucursal", { duration: 2000 });
    return;
  }

  const quantity = tempQuantities[item.id] || 1;
  
  // Agregar directamente (ya no usa draft)
  startQuantityOrder(item, quantity);
  
  toast.success(`${quantity} ${item.name} agregado${quantity > 1 ? 's' : ''} al carrito`, { duration: 2000 });
  
  // Reset cantidad a 1
  setTempQuantities({ ...tempQuantities, [item.id]: 1 });
};

  // ==========================================
  // MANEJO DE PRODUCTOS ÚNICOS Y CAJAS
  // ==========================================
  const handleAddSingleItem = (item: Product) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      return;
    }

    addSingleItemOrder(item);
    toast.success(`${item.name} agregado al carrito`, { duration: 2000 });
  };

  const handleAddBox = (item: Product) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      return;
    }

    addBoxOrder(item);
    toast.success(`${item.name} agregado al carrito`, { duration: 2000 });
  };

  // ==========================================
  // SEPARAR PRODUCTOS POR TIPO
  // ==========================================
  const flavorProducts = filteredProducts.filter(p => p.type === "flavor-selection" && p.price > 0);
  const quantityProducts = filteredProducts.filter(p => p.type === "quantity-selection");
  const singleItems = filteredProducts.filter(p => p.type === "single-item");
  const boxes = filteredProducts.filter(p => p.type === "box");
  
  // Sabores disponibles (precio 0)
 const availableFlavors = PROD.filter(p => 
  p.type === "flavor-selection" && 
  p.price === 0 &&
  (selectedBranchId === null || p.branches.some(branch => branch.id === selectedBranchId))
);

  return (
    <>
      <ViewToggle />

      {/* ========================================
          PANEL DE ARMADO (si hay draft activo)
          ======================================== */}
      {currentDraft && currentDraft.type === "flavor-selection" && (
        <div className="order-wrapper-timeline rounded-lg p-6 mb-6" id="flavor-draft-panel">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="order-wrapper-label">
                Armando pedido: <span className="order-wrapper_info-quantity">{currentDraft.productName}</span>
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
                ${currentDraft.price}
              </p>
            </div>
          </div>

          {/* Sabores seleccionados */}
          {currentDraft.selectedFlavors.length > 0 && (
            <div className="current-draft rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Sabores seleccionados:</p>
              <div className="flex flex-wrap gap-2">
                {currentDraft.selectedFlavors.map(slug => {
                  const flavor = availableFlavors.find(f => productNameToSlug(f.name) === slug);
                  return (
                    <span key={slug} className="order-pill">
                      {flavor?.name || slug}
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
              onClick={handleConfirmFlavors}
              disabled={currentDraft.selectedFlavors.length === 0}
              className="confirm-btn"
            >
              ✓ Confirmar Pedido {currentDraft.selectedFlavors.length > 0 && `(${currentDraft.selectedFlavors.length} sabor${currentDraft.selectedFlavors.length > 1 ? 'es' : ''})`}
            </Button>
            <Button
              type="button"
              onClick={handleCancelFlavors}
              variant="outline"
              className="cancel-btn"
            >
              ✗ Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* ========================================
          SECCIÓN 1: PRODUCTOS CON SABORES
          ======================================== */}
      {flavorProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🍦 Helados por peso</h2>
          <p className="text-sm text-gray-600 mb-4">Selecciona el tamaño y luego elige tus sabores favoritos</p>
          
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
            {flavorProducts.map((item) => {
              const isActive = currentDraft?.type === "flavor-selection" && currentDraft.productId === item.id;
              
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleFlavorProductClick(item)}
                  disabled={!selectedBranchId}
                  className={`product-list_item flex-col rounded-lg transition-all relative ${
                    isActive
                      ? "ring-4 ring-blue-500 shadow-lg bg-blue-50"
                      : !selectedBranchId
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-md hover:scale-102 cursor-pointer"
                  }`}
                >
                  {!selectedBranchId && (
                    <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute top-2 right-2 z-20 bg-blue-500 rounded-full p-1">
                      <CheckCircle2 className="w-6 h-6 text-white" />
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

                  <div className="flex flex-col gap-2 text-left w-full">
                    <div className="product-list_name">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="product-list_desc">
                      <p>{item.description}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xl font-bold text-orange-600">${item.price}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================
          SECCIÓN 2: SABORES (cuando hay draft activo)
          ======================================== */}
      {currentDraft && currentDraft.type === "flavor-selection" && availableFlavors.length > 0 && (
        <div className="mb-8" id="flavors-section">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-bold mb-2 text-blue-900">
              🎨 Elegí tus sabores
            </h2>
            <p className="text-sm text-blue-700">
              Selecciona entre 1 y {currentDraft.maxFlavors} sabores para tu {currentDraft.productName}
            </p>
          </div>

          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
            {availableFlavors.map((flavor) => {
              const isSelected = isFlavorSelected(flavor.name);
              const isMaxReached = currentDraft.selectedFlavors.length >= currentDraft.maxFlavors && !isSelected;

              return (
                <button
                  type="button"
                  key={flavor.id}
                  onClick={() => handleFlavorClick(flavor)}
                  disabled={isMaxReached}
                  className={`product-list_item flex-col rounded-lg transition-all relative ${
                    isSelected
                      ? "ring-4 ring-green-500 shadow-lg bg-green-50"
                      : isMaxReached
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:shadow-md hover:scale-102 cursor-pointer"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-20 bg-green-500 rounded-full p-1">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  )}

                  <div className="product-list_image inset-shadow-sm rounded-md">
                    <figure>
                      <Image
                        src="https://html.designingmedia.com/icedelight/assets/images/classic-image2.png"
                        alt={flavor.name}
                        width={200}
                        height={200}
                        loading="lazy"
                      />
                    </figure>
                  </div>

                  <div className="flex flex-col gap-1 text-left w-full">
                    <div className="product-list_name">
                      <h3 className="text-base">{flavor.name}</h3>
                    </div>
                    <div className="product-list_desc">
                      <p className="text-xs">{flavor.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================
          SECCIÓN 3: PRODUCTOS CON CANTIDAD
          ======================================== */}
      {quantityProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🍫 Productos individuales</h2>
          <p className="text-sm text-gray-600 mb-4">Selecciona la cantidad que desees</p>
          
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {quantityProducts.map((item) => {
              const quantity = tempQuantities[item.id] || 1;
              
              return (
                <div
                  key={item.id}
                  className={`product-list_item flex-col rounded-lg transition-all relative ${
                    !selectedBranchId ? "opacity-50" : ""
                  }`}
                >
                  {!selectedBranchId && (
                    <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                      <Lock className="w-6 h-6 text-white" />
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

                  <div className="flex flex-col gap-2 text-left w-full">
                    <div className="product-list_name">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="product-list_desc">
                      <p>{item.description}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-xl font-bold text-orange-600">${item.price}</p>
                      <p className="text-sm text-gray-600">c/u</p>
                    </div>

                    {/* Selector de cantidad */}
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={!selectedBranchId || quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                      
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={!selectedBranchId}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handleAddQuantityProduct(item)}
                        disabled={!selectedBranchId}
                        className="flex-1 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Agregar ${item.price * quantity}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================
          SECCIÓN 4: CAJAS
          ======================================== */}
      {boxes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Cajas</h2>
          <p className="text-sm text-gray-600 mb-4">Packs especiales con descuento</p>
          
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {boxes.map((item) => (
              <div
                key={item.id}
                className={`product-list_item flex-col rounded-lg transition-all relative ${
                  !selectedBranchId ? "opacity-50" : ""
                }`}
              >
                {!selectedBranchId && (
                  <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="absolute top-2 left-2 z-20 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  x{item.config?.boxQuantity}
                </div>

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

                <div className="flex flex-col gap-2 text-left w-full">
                  <div className="product-list_name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="product-list_desc">
                    <p>{item.description}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xl font-bold text-orange-600">${item.price}</p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleAddBox(item)}
                    disabled={!selectedBranchId}
                    className="w-full mt-3 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================
          SECCIÓN 5: PRODUCTOS ÚNICOS
          ======================================== */}
      {singleItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🎂 Tortas y especiales</h2>
          
          <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {singleItems.map((item) => (
              <div
                key={item.id}
                className={`product-list_item flex-col rounded-lg transition-all relative ${
                  !selectedBranchId ? "opacity-50" : ""
                }`}
              >
                {!selectedBranchId && (
                  <div className="absolute top-2 right-2 z-20 bg-gray-400 rounded-full p-1">
                    <Lock className="w-6 h-6 text-white" />
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

                <div className="flex flex-col gap-2 text-left w-full">
                  <div className="product-list_name">
                    <h3>{item.name}</h3>
                  </div>
                  <div className="product-list_desc">
                    <p>{item.description}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xl font-bold text-orange-600">${item.price}</p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleAddSingleItem(item)}
                    disabled={!selectedBranchId}
                    className="w-full mt-3 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje si no hay productos */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No hay productos disponibles en esta categoría</p>
        </div>
      )}
    </>
  );
};

export default ProductsList;