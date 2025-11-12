"use client";

import { useProducts } from "@/components/products/Product";
import { CheckCircle2, Lock, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Product } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ViewToggle from "./ViewToggle";
import { PROD } from "@/constants/prod";
import ChooseYourFlavor from "./components/ChooseYourFlavors";
import ProductsQuantity from "./components/ProductsQuantity";
import ProductBoxes from "./components/ProductBoxes";
import FlavorProducts from "./components/FlavorProducts";
import CurrentDraft from "./components/CurrentDraft";

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
  const [tempQuantities, setTempQuantities] = useState<Record<number, number>>(
    {},
  );

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
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Si no hay draft o es de otro producto, iniciar nuevo
    if (
      !currentDraft ||
      currentDraft.type !== "flavor-selection" ||
      currentDraft.productId !== item.id
    ) {
      startFlavorOrder(item);
      toast.success(`${item.name} seleccionado. Ahora elige los sabores`, {
        duration: 2000,
      });
      // Scroll a los sabores
      setTimeout(() => {
        const flavorsSection = document.getElementById("flavors-section");
        if (flavorsSection) {
          flavorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleFlavorClick = (flavor: Product) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") {
      toast.error("Primero selecciona un tamaño (1 Kilo, 1/2 Kilo, etc.)", {
        duration: 2000,
      });
      return;
    }

    const flavorSlug = productNameToSlug(flavor.name);
    const isSelected = currentDraft.selectedFlavors.includes(flavorSlug);

    if (isSelected) {
      removeFlavorFromDraft(flavorSlug);
      toast("Sabor eliminado", { duration: 1500 });
    } else {
      if (currentDraft.selectedFlavors.length >= currentDraft.maxFlavors) {
        toast.error(
          `Máximo ${currentDraft.maxFlavors} sabores para este tamaño`,
          { duration: 2000 },
        );
        return;
      }

      addFlavorToDraft(flavorSlug);
      toast.success(
        `Sabor agregado (${currentDraft.selectedFlavors.length + 1} de hasta ${currentDraft.maxFlavors})`,
        { duration: 1500 },
      );
    }
  };

  const isFlavorSelected = (flavorName: string) => {
    if (!currentDraft || currentDraft.type !== "flavor-selection") return false;
    const slug = productNameToSlug(flavorName);
    return currentDraft.selectedFlavors.includes(slug);
  };

  const handleConfirmFlavors = () => {
    if (!currentDraft) return;

    if (
      currentDraft.type === "flavor-selection" &&
      currentDraft.selectedFlavors.length === 0
    ) {
      toast.error("Debes seleccionar al menos un sabor", { duration: 2000 });
      return;
    }

    confirmCurrentOrder();
    toast.success("¡Pedido agregado al carrito!", { duration: 2000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    const product = filteredProducts.find((p) => p.id === productId);
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

    startQuantityOrder(item, quantity);

    toast.success(
      `${quantity} ${item.name} agregado${quantity > 1 ? "s" : ""} al carrito`,
      { duration: 2000 },
    );

    setTempQuantities({ ...tempQuantities, [item.id]: 1 });
  };

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

  const flavorProducts = filteredProducts.filter(
    (p) => p.type === "flavor-selection" && p.price > 0,
  );
  const quantityProducts = filteredProducts.filter(
    (p) => p.type === "quantity-selection",
  );
  const singleItems = filteredProducts.filter((p) => p.type === "single-item");
  const boxes = filteredProducts.filter((p) => p.type === "box");

  const availableFlavors = PROD.filter(
    (p) =>
      p.type === "flavor-selection" &&
      p.price === 0 &&
      (selectedBranchId === null ||
        p.branches.some((branch) => branch.id === selectedBranchId)),
  );

  return (
    <>
      <ViewToggle />

      

      {currentDraft && currentDraft.type === "flavor-selection" && (
        <CurrentDraft 
          currentDraft={currentDraft} 
          availableFlavors={availableFlavors} 
          productNameToSlug={productNameToSlug} 
          handleCancelFlavors={handleCancelFlavors} 
          handleConfirmFlavors={handleConfirmFlavors} 
      />
       
      )}

      {flavorProducts.length > 0 && (
        <FlavorProducts
          currentDraft={currentDraft}
          flavorProducts={flavorProducts}
          handleFlavorProductClick={handleFlavorProductClick}
          selectedBranchId={selectedBranchId}
          viewMode="grid"
        />
      )}

     
      {currentDraft &&
        currentDraft.type === "flavor-selection" &&
        availableFlavors.length > 0 && (
          <ChooseYourFlavor
            availableFlavors={availableFlavors}
            currentDraft={currentDraft}
            isFlavorSelected={isFlavorSelected}
            handleFlavorClick={handleFlavorClick}
            viewMode="grid"
          />
        )}

     
      {quantityProducts.length > 0 && (
        <ProductsQuantity
          handleAddQuantityProduct={handleAddQuantityProduct}
          handleQuantityChange={handleQuantityChange}
          quantityProducts={quantityProducts}
          selectedBranchId={selectedBranchId}
          tempQuantities={tempQuantities}
          viewMode="grid"
        />
      )}

      {boxes.length > 0 && (
        <ProductBoxes
          boxes={boxes}
          handleAddBox={handleAddBox}
          selectedBranchId={selectedBranchId}
          viewMode="grid"
        />
      )}

      {/* ========================================
          SECCIÓN 5: PRODUCTOS ÚNICOS
          ======================================== */}
      {singleItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🎂 Tortas y especiales
          </h2>

          <div
            className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 " : "grid-cols-1"}`}
          >
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
                    <p className="text-xl font-bold text-orange-600">
                      ${item.price}
                    </p>
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
          <p className="text-gray-600 text-lg">
            No hay productos disponibles en esta categoría
          </p>
        </div>
      )}
    </>
  );
};

export default ProductsList;
