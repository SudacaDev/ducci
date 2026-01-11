"use client";

import { Package } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import ViewToggle from "./ViewToggle";
import ChooseYourFlavor from "./components/ChooseYourFlavors";
import ProductsQuantity from "./components/ProductsQuantity";
import ProductBoxes from "./components/ProductBoxes";
import FlavorProducts from "./components/FlavorProducts";
import CurrentDraft from "./components/CurrentDraft";
import ModalFlavorProduct from "./components/ModalFlavorProduct";
import SingleItems from "./components/SingleItems";

import { useProducts } from "@/components/products/ProductContext";
import {
  ProductListSkeleton,
  FlavorListSkeleton,
} from "@/components/products/skeletons/ProductSkeleton";
// @Types
import type { Product } from "@/types/product.type";

const ProductsList = () => {
  const {
    filteredProducts,
    allFlavors,
    selectedBranchId,
    currentDraft,
    loading,
    error,
    startFlavorOrder,
    addFlavorToDraft,
    removeFlavorFromDraft,
    startQuantityOrder,
    addSingleItemOrder,
    addBoxOrder,
    confirmCurrentOrder,
    cancelCurrentOrder,
    addMultipleFlavorOrders,
  } = useProducts();

  // ============================================
  // ESTADOS LOCALES
  // ============================================
  const [tempQuantities, setTempQuantities] = useState<Record<number, number>>(
    {},
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // ============================================
  // HELPERS
  // ============================================
  const productNameToSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // ============================================
  // MODAL HANDLERS
  // ============================================
  const handleOpenModal = (product: Product) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmFromModal = (
    selectedFlavors: string[],
    quantity: number,
  ) => {
    if (!selectedProduct) return;

    addMultipleFlavorOrders(selectedProduct, selectedFlavors, quantity);

    toast.success(
      `${quantity} ${selectedProduct.name} agregado${quantity > 1 ? "s" : ""} al carrito`,
      { duration: 2000 },
    );
  };

  // ============================================
  // FLAVOR HANDLERS (VIEJO FLUJO)
  // ============================================
  const handleFlavorProductClick = (item: Product) => {
    if (!selectedBranchId) {
      toast.error("Primero selecciona una sucursal", { duration: 2000 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (
      !currentDraft ||
      currentDraft.type !== "flavor-selection" ||
      currentDraft.productId !== item.id
    ) {
      startFlavorOrder(item);
      toast.success(`${item.name} seleccionado. Ahora elige los sabores`, {
        duration: 2000,
      });

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

  // ============================================
  // QUANTITY HANDLERS
  // ============================================
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

  // ============================================
  // SINGLE ITEM & BOX HANDLERS
  // ============================================
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

    const quantity = tempQuantities[item.id] || 1;

    // Agregar la caja con la cantidad especificada
    addBoxOrder(item, quantity);

    toast.success(
      `${quantity} ${item.name} agregado${quantity > 1 ? "s" : ""} al carrito`,
      { duration: 2000 },
    );

    // Resetear la cantidad a 1 después de agregar
    setTempQuantities({ ...tempQuantities, [item.id]: 1 });
  };

  // ============================================
  // FILTRAR PRODUCTOS POR TIPO
  // ============================================
  const flavorProducts = filteredProducts.filter(
    (p) => p.type === "flavor-selection" && p.price > 0,
  );

  const quantityProducts = filteredProducts.filter(
    (p) => p.type === "quantity-selection",
  );

  const singleItems = filteredProducts.filter((p) => p.type === "single-item");

  const boxes = filteredProducts.filter((p) => p.type === "box");

  const availableFlavors = allFlavors;

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
      <ViewToggle />

      {/* ============================================
          MODAL DE SABORES
          ============================================ */}
      <ModalFlavorProduct
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        availableFlavors={availableFlavors}
        selectedBranchId={selectedBranchId}
        onConfirm={handleConfirmFromModal}
      />

      {/* ============================================
          PANEL DE ARMADO (VIEJO FLUJO)
          ============================================ */}
      {currentDraft && currentDraft.type === "flavor-selection" && (
        <CurrentDraft
          currentDraft={currentDraft}
          availableFlavors={availableFlavors}
          productNameToSlug={productNameToSlug}
          handleCancelFlavors={handleCancelFlavors}
          handleConfirmFlavors={handleConfirmFlavors}
        />
      )}

      {/* ============================================
          SECCIÓN 1: PRODUCTOS CON SABORES
          ============================================ */}
      {loading ? (
        <div className="mb-8 mx-4">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <ProductListSkeleton count={3} />
        </div>
      ) : flavorProducts.length > 0 ? (
        <FlavorProducts
          currentDraft={currentDraft}
          flavorProducts={flavorProducts}
          handleOpenModal={handleOpenModal}
          selectedBranchId={selectedBranchId}
          viewMode="grid"
        />
      ) : null}

      {/* ============================================
          SECCIÓN 2: SABORES (VIEJO FLUJO)
          ============================================ */}
      {currentDraft &&
        currentDraft.type === "flavor-selection" &&
        (loading ? (
          <div className="mb-8 mx-4">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
            <FlavorListSkeleton count={12} />
          </div>
        ) : availableFlavors.length > 0 ? (
          <ChooseYourFlavor
            availableFlavors={availableFlavors}
            currentDraft={currentDraft}
            isFlavorSelected={isFlavorSelected}
            handleFlavorClick={handleFlavorClick}
            viewMode="grid"
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">
              No hay sabores disponibles en esta sucursal
            </p>
          </div>
        ))}

      {/* ============================================
          SECCIÓN 3: PRODUCTOS CON CANTIDAD
          ============================================ */}
      {loading ? (
        <div className="mb-8 mx-4">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <ProductListSkeleton count={6} />
        </div>
      ) : quantityProducts.length > 0 ? (
        <ProductsQuantity
          handleAddQuantityProduct={handleAddQuantityProduct}
          handleQuantityChange={handleQuantityChange}
          quantityProducts={quantityProducts}
          selectedBranchId={selectedBranchId}
          tempQuantities={tempQuantities}
          viewMode="grid"
        />
      ) : null}

      {/* ============================================
          SECCIÓN 4: CAJAS
          ============================================ */}
      {loading ? (
        <div className="mb-8 mx-4">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <ProductListSkeleton count={5} />
        </div>
      ) : boxes.length > 0 ? (
        <ProductBoxes
          boxes={boxes}
          handleAddBox={handleAddBox}
          selectedBranchId={selectedBranchId}
          viewMode="grid"
          tempQuantities={tempQuantities}
          handleQuantityChange={handleQuantityChange}
        />
      ) : null}

      {/* ============================================
          SECCIÓN 5: PRODUCTOS ÚNICOS
          ============================================ */}
      {loading ? (
        <div className="mb-8 mx-4">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <ProductListSkeleton count={5} />
        </div>
      ) : singleItems.length > 0 ? (
        <SingleItems
          singleItems={singleItems}
          viewMode="grid"
          handleAddSingleItem={handleAddSingleItem}
          selectedBranchId={selectedBranchId}
        />
      ) : null}

      {/* ============================================
          ERROR STATE
          ============================================ */}
      {error && !loading && (
        <div className="text-center py-12">
          <p className="text-red-600 font-semibold mb-2">
            Error al cargar productos
          </p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      )}

      {/* ============================================
          EMPTY STATE
          ============================================ */}
      {!loading &&
        !error &&
        filteredProducts.length === 0 &&
        selectedBranchId !== null && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-semibold">
              No hay productos disponibles
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Prueba seleccionando otra categoría o sucursal
            </p>
          </div>
        )}
    </>
  );
};

export default ProductsList;