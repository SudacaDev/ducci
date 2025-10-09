"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/components/products/Product";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const ViewToggle = () => {
  const { viewMode, setViewMode, setSortOrder, sortOrder, openFilterToggle } = useProducts();


  return (
    <div className="flex items-center justify-between">

      <div className="flex py-4 gap-2">
      <Button type="button" id="open-filter" onClick={openFilterToggle} >Filtros</Button>
        <Button
          type="button"
          onClick={() => setViewMode("grid")}
          className={`filter-button hover:cursor-pointer ${viewMode === "grid" ? "active" : ""
            }`}
        >
          <LayoutGrid size={32} />
        </Button>
        <Button
          type="button"
          onClick={() => setViewMode("list")}
          className={`filter-button hover:cursor-pointer ${viewMode === "list" ? "active" : ""
            }`}
        >
          <LayoutList size={32} />
        </Button>
      </div>
      <Select
        value={sortOrder}
        onValueChange={(value) => setSortOrder(value as "asc" | "desc" | "none")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por precio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Menor a Mayor</SelectItem>
          <SelectItem value="desc">Mayor a Menor</SelectItem>
          <SelectItem value="none">Sin ordenar</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ViewToggle;