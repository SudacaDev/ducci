import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.type";
import { Lock, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductBoxesProps {
  boxes: Product[];
  selectedBranchId: number | null;
  handleAddBox: (item: Product) => void;
  viewMode: "grid" | "list";
}

export const ProductBoxes = ({
  boxes,
  selectedBranchId,
  handleAddBox,
  viewMode,
}: ProductBoxesProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cajas</h2>
      <p className="text-sm text-gray-600 mb-4">
        Packs especiales con descuento
      </p>

      <div
        className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"}`}
      >
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
                <p className="text-xl font-bold text-orange-600">
                  ${item.price}
                </p>
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
  );
};
export default ProductBoxes;
