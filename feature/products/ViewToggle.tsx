"use client";

import { LayoutGrid, LayoutList, ListFilter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/components/products/Product";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BRANCHES } from "@/constants/branches";

const ViewToggle = () => {
  const {
    viewMode,
    setViewMode,
    setSortOrder,
    sortOrder,
    openFilterToggle,
    selectedBranchId,
    setBranchId,
    confirmedOrders,
  } = useProducts();

  const handleBranchChange = (value: string) => {
    if (confirmedOrders?.length > 0) {
      // Si hay productos seleccionados, no permitir cambiar de sucursal
      return;
    }
    setBranchId(value === "all" ? null : Number.parseInt(value));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Selector de Sucursal */}
      <div className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-[var(--secondary-color)]" />
            <label className="font-semibold text-sm">Selecciona tu sucursal:</label>
          </div>
          {confirmedOrders?.length === 0 && (
            <span className="text-xs text-gray-500 italic">
              Haz clic en los productos para agregarlos
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={selectedBranchId ? selectedBranchId.toString() : "all"}
            onValueChange={handleBranchChange}
            disabled={confirmedOrders?.length > 0}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Elegir sucursal" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Todas las sucursales</SelectItem>
              {BRANCHES.map((branch) => (
                <SelectItem key={branch.id} value={branch.id.toString()}>
                  {branch.name} - {branch.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {confirmedOrders?.length > 0 && (
            <span className="text-xs text-gray-500 italic">
              (Deselecciona productos para cambiar)
            </span>
          )}
        </div>
      </div>

      {/* Controles de vista y ordenamiento */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button type="button" id="open-filter" onClick={openFilterToggle}>
            Filtros
          </Button>
          <Button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`filter-button hover:cursor-pointer ${
              viewMode === "grid" ? "active" : ""
            }`}
          >
            <LayoutGrid size={32} />
          </Button>
          <Button
            type="button"
            onClick={() => setViewMode("list")}
            className={`filter-button hover:cursor-pointer ${
              viewMode === "list" ? "active" : ""
            }`}
          >
            <LayoutList size={32} />
          </Button>
        </div>
        <Select
          value={sortOrder}
          onValueChange={(value) =>
            setSortOrder(value as "asc" | "desc" | "none")
          }
        >
          <SelectTrigger>
            <ListFilter className="mr-2 size-4" />
            <SelectValue placeholder="Ordenar por precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Menor a Mayor</SelectItem>
            <SelectItem value="desc">Mayor a Menor</SelectItem>
            <SelectItem value="none">Sin ordenar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ViewToggle;
