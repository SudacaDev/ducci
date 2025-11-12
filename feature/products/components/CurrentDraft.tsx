import { Button } from "@/components/ui/button";
import { FlavorOrder } from "@/types/order.type";
import { Product } from "@/types/product.type";


interface CurrentDraftProps {
    currentDraft: FlavorOrder,
    availableFlavors: Product[],
    handleCancelFlavors: () => void,
    handleConfirmFlavors: () => void,
    productNameToSlug: (name: string) => string,
}

const CurrentDraft = ({
    currentDraft,
    availableFlavors,
    handleCancelFlavors,
    productNameToSlug,
    handleConfirmFlavors }: CurrentDraftProps) => {
    return (
        <div
            className="order-wrapper-timeline rounded-lg p-6 mb-6"
            id="flavor-draft-panel"
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="order-wrapper-label">
                        Armando pedido:{" "}
                        <span className="order-wrapper_info-quantity">
                            {currentDraft.productName}
                        </span>
                    </p>
                    <p className="order-wrapper_info-select">
                        {currentDraft.selectedFlavors.length} de hasta{" "}
                        {currentDraft.maxFlavors} sabores seleccionados
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        💡 Puedes elegir entre 1 y {currentDraft.maxFlavors} sabores
                    </p>
                </div>
                <div className="text-right">
                    <p className="order-wrapper_info-price">${currentDraft.price}</p>
                </div>
            </div>

            {/* Sabores seleccionados */}
            {currentDraft.selectedFlavors.length > 0 && (
                <div className="current-draft rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                        Sabores seleccionados:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {currentDraft.selectedFlavors.map((slug) => {
                            const flavor = availableFlavors.find(
                                (f) => productNameToSlug(f.name) === slug,
                            );
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
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    type="button"
                    onClick={handleConfirmFlavors}
                    disabled={currentDraft.selectedFlavors.length === 0}
                    className="confirm-btn"
                >
                    ✓ Confirmar Pedido{" "}
                    {currentDraft.selectedFlavors.length > 0 &&
                        `(${currentDraft.selectedFlavors.length} sabor${currentDraft.selectedFlavors.length > 1 ? "es" : ""})`}
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
    )
}
export default CurrentDraft