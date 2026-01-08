import { useCurrency } from "@/hooks/useCurrency";
import { Order } from "@/types/order.type";
import { Product } from "@/types/product.type";
import { CheckCircle2, Lock } from "lucide-react";
import Image from "next/image";

interface FlavorProductsProps {
  flavorProducts: Product[];
  viewMode: "grid" | "list";
  currentDraft: Order | null;
  handleOpenModal: (item: Product) => void;
  selectedBranchId: number | null;
}

const FlavorProducts = ({
  flavorProducts,
  viewMode,
  currentDraft,
  selectedBranchId,
  handleOpenModal,
}: FlavorProductsProps) => {
  const { formatPrice } = useCurrency();
  return (
    <div className="mb-8 md:mx-2 sm:mx-2">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Helados por peso
      </h3>
      <p className="text-sm text-gray-600 mb-4">
       Elegí tamaño y luego sabores
      </p>

      <div
        className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3" : "grid-cols-1"}`}
      >
        {flavorProducts.map((item) => {
          const isActive =
            currentDraft?.type === "flavor-selection" &&
            currentDraft.productId === item.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleOpenModal(item)} 
              disabled={!selectedBranchId}
              className={`product-list_item flex rounded-lg transition-all relative ${
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
  src={item.image || '/placeholder-helado.jpg'}  
  alt={item.name}
  width={240}
  height={240}
  loading="lazy"
/>
                </figure>
              </div>

              <div className="flex flex-col gap-2 text-left w-full  justify-center">
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
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default FlavorProducts;
