import { FlavorOrder } from "@/types/order.type";
import { Product } from "@/types/product.type";
import { CheckCircle2, Plus, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ChooseYourFlavorProps {
  currentDraft: FlavorOrder;
  handleFlavorClick: (flavor: Product) => void;
  isFlavorSelected: (flavorName: string) => boolean;
  availableFlavors: Product[];
  viewMode: string;
}

export const ChooseYourFlavor = ({
  currentDraft,
  handleFlavorClick,
  isFlavorSelected,
  availableFlavors,
  viewMode,
}: ChooseYourFlavorProps) => {
  return (
    <div className="mb-8" id="flavors-section">
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-900">
          🎨 Elegí tus sabores
        </h2>
        <p className="text-sm text-blue-700">
          Selecciona entre 1 y {currentDraft?.maxFlavors} sabores para tu{" "}
          {currentDraft.productName}
        </p>
      </div>

      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mx-4"
            : "grid-cols-1"
        }`}
      >
        {availableFlavors.map((flavor) => {
          const isSelected = isFlavorSelected(flavor.name);
          const isMaxReached =
            currentDraft.selectedFlavors.length >= currentDraft.maxFlavors &&
            !isSelected;

          return (
            <div
              key={flavor.id}
              className={`product-list_item flex rounded-lg transition-all relative ${
                isSelected
                  ? "ring-4 ring-green-500 shadow-lg bg-green-50"
                  : isMaxReached
                    ? "opacity-40"
                    : "hover:shadow-md"
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-20 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Imagen */}
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

              {/* Info del sabor */}
              <div className="flex flex-col gap-2 text-left w-full  justify-center">
                <div className="product-list_name">
                  <h3 className="text-base">{flavor.name}</h3>
                </div>
                <div className="product-list_desc">
                  <p className="text-xs">{flavor.description}</p>
                </div>

                <Button
                  type="button"
                  onClick={() => handleFlavorClick(flavor)}
                  disabled={isMaxReached}
                  className={`w-full mt-2 gap-2 ${
                    isSelected
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" />
                      Sabor agregado
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Agregar sabor
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseYourFlavor;
