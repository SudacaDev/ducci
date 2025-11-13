import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmBranchSelectorProps {
  isDialogOpen: boolean;
  handleConfirmationCancel: () => void;
  handleConfirmationSuccess: () => void;
}

const ConfirmBranchSelector = ({
  isDialogOpen,
  handleConfirmationCancel,
  handleConfirmationSuccess,
}: ConfirmBranchSelectorProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleConfirmationCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Advertencia de Cambio de Sucursal</DialogTitle>
          <DialogDescription>
            Si cambias de sucursal, se limpiará tu carrito. ¿Continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleConfirmationCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmationSuccess}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBranchSelector;
