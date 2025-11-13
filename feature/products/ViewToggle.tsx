"use client";

import { LayoutGrid, LayoutList, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
 
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useProducts } from "@/components/products/ProductContext";

interface ViewToogleProps {
  hasButtons?: boolean;
}

const ViewToggle = ({ hasButtons }: ViewToogleProps) => {
  const { viewMode, setViewMode, setSortOrder, sortOrder, openFilterToggle } =
    useProducts();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button type="button" id="open-filter" onClick={openFilterToggle}>
          Filtros
        </Button>
        {hasButtons && (
          <>
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
          </>
        )}
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
        <SelectContent className="bg-white">
          <SelectItem value="asc">Menor a Mayor</SelectItem>
          <SelectItem value="desc">Mayor a Menor</SelectItem>
          <SelectItem value="none">Sin ordenar</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ViewToggle;
