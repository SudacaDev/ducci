import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/types/branch.type";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";

interface SidebarBranchProps {
  searchQuery: string;
  filteredBranches: Branch[];
  selectedBranch: number | null;
  hoveredBranch: number | null;
  handleUseMyLocation: () => void;
  setSelectedBranch: (id: number | null) => void;
  setHoveredBranch: (id: number | null) => void;
  setSearchQuery: (value: SetStateAction<string>) => void;
  handleGetDirections: (lat: number, lng: number) => void;
}

const SidebarBranch = ({
  searchQuery,
  selectedBranch,
  setSearchQuery,
  filteredBranches,
  setHoveredBranch,
  setSelectedBranch,
  handleGetDirections,
  handleUseMyLocation,
}: SidebarBranchProps) => {
  return (
    <div className="branches-sidebar">
      <div className="sidebar-header">
        <h2>Encontrá un Ducci cerca</h2>

        <div className="search-box">
          <span className="search-icon">
            <SearchIcon size={16} />
          </span>
          <Input
            type="text"
            placeholder="Ingresá ciudad, código postal o ubicación"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button className="location-btn button__cta" onClick={handleUseMyLocation}>
          <FaLocationDot size={16} /> Usar mi ubicación actual
        </Button>

        <p className="branches-count">
          {filteredBranches.length} sucursal
          {filteredBranches.length !== 1 ? "es" : ""} encontrada
          {filteredBranches.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="branches-list">
        {filteredBranches.length > 0 ? (
          filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className={`branch-card ${selectedBranch === branch.id ? "active" : ""}`}
              onMouseEnter={() => setHoveredBranch(branch.id)}
              onMouseLeave={() => setHoveredBranch(null)}
              onClick={() => setSelectedBranch(branch.id)}
              onKeyDown={() => setSelectedBranch(branch.id)}
            >
              <h3>{branch.name}</h3>
              <p className="branch-card__address">
                {branch.address}
                <br />
                {branch.city}
              </p>
              {branch.hours && (
                <p className="branch-card__hours">• {branch.hours}</p>
              )}
              <Button
                className="branch-card__cta "
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(branch.lat, branch.lng);
                }}
              >
                Cómo llegar →
              </Button>
            </div>
          ))
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            No se encontraron sucursales con "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarBranch;
