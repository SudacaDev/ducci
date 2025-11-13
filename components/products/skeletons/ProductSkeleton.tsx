export const ProductCardSkeleton = () => (
  <div className="product-list_item flex-col rounded-lg animate-pulse">
    {/* Imagen skeleton */}
    <div className="product-list_image inset-shadow-sm rounded-md bg-gray-200 h-48 w-full"></div>
    
    {/* Contenido skeleton */}
    <div className="flex flex-col gap-2 text-left w-full mt-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-2"></div>
    </div>
  </div>
);

export const ProductListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const FlavorSkeleton = () => (
  <div className="product-list_item flex-col rounded-lg animate-pulse">
    <div className="product-list_image inset-shadow-sm rounded-md bg-gray-200 h-40 w-full"></div>
    <div className="flex flex-col gap-2 text-left w-full mt-2">
      <div className="h-5 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

export const FlavorListSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <FlavorSkeleton key={i} />
    ))}
  </div>
);

export const BranchSelectorSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
  </div>
);