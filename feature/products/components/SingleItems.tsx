import { Button } from "@/components/ui/button";
import { useCurrency } from "@/hooks/useCurrency";
import { Product } from "@/types/product.type";
import { Lock, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface SingleItemsProps {
  viewMode: "grid" | "list";
  singleItems: Product[];
  selectedBranchId: number | null;
  handleAddSingleItem: (item: Product) => void;
  tempQuantities: Record<number, number>;
  handleQuantityChange: (productId: number, change: number) => void;
}

const SingleItems = ({
  viewMode,
  singleItems,
  selectedBranchId,
  handleAddSingleItem,
  tempQuantities,
  handleQuantityChange,
}: SingleItemsProps) => {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="mb-8 product-container ">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Tortas y especiales
      </h3>

      <div
        className={`grid gap-4 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {singleItems.map((item) => {
          const quantity = tempQuantities[item.id] || 1;

          return (
            <div
              key={item.id}
              className={`product-list_item flex rounded-lg transition-all relative ${
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
                    src={item.image || "/images/not-found.png"}
                    alt={item.name}
                    width={240}
                    height={240}
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="flex flex-col gap-2 text-left w-full justify-center pr-[24px]">
                <div className="product-list_name">
                  <h3>{item.name}</h3>
                </div>
                <div className="product-list_desc">
                  <p>{item.description}</p>
                </div>
                <div className="mt-2">
                  <p className="text-xl font-bold text-orange-600">
                    {formatPrice(item.price)}
                  </p>
                </div>

                
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

                  <span className="text-lg font-semibold w-12 text-center">
                    {quantity}
                  </span>

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
                    onClick={() => handleAddSingleItem(item)}
                    disabled={!selectedBranchId}
                    className="flex-1 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar {formatPrice(item.price * quantity)}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleItems;