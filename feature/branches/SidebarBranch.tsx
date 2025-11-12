import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/types/branch.type";

interface BranchWithDistance extends Branch {
  distance?: number;
}

interface SidebarBranchProps {
  searchQuery: string;
  filteredBranches: Branch[];
  selectedBranch: number | null;
  hoveredBranch: number | null;
  nearbyBranches: BranchWithDistance[];
  userLocation: { lat: number; lng: number } | null;
  setSearchQuery: (value: SetStateAction<string>) => void;
  setHoveredBranch: (id: number | null) => void;
  setSelectedBranch: (id: number | null) => void;
  handleUseMyLocation: () => void;
  handleGetDirections: (lat: number, lng: number) => void;
}

const SidebarBranch = ({
  searchQuery,
  setSearchQuery,
  handleUseMyLocation,
  handleGetDirections,
  filteredBranches,
  selectedBranch,
  setSelectedBranch,
  hoveredBranch,
  setHoveredBranch,
  nearbyBranches = [],
  userLocation = null,
}: SidebarBranchProps) => {
  const sortedBranches = userLocation
    ? [
        ...nearbyBranches,
        ...filteredBranches.filter(
          (branch) => !nearbyBranches.find((nb) => nb.id === branch.id),
        ),
      ]
    : filteredBranches;

  return (
    <div className="branches-sidebar">
      <div className="sidebar-header">
        <h2>Encontrá un Ducci cerca</h2>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Ingresá ciudad, código postal o ubicación"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button className="b" onClick={handleUseMyLocation}>
          📍 Usar mi ubicación actual
        </Button>

        <p className="branches-count">
          {sortedBranches.length} sucursal
          {sortedBranches.length !== 1 ? "es" : ""} encontrada
          {sortedBranches.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="branches-list">
        {userLocation && nearbyBranches.length > 0 && (
          <div className="nearby-section">
            <h3 className="nearby-title">🍦 Ducci cerca tuyo</h3>
            {nearbyBranches.map((branch) => (
              <div
                key={branch.id}
                className={`branch-card branch-card--nearby ${selectedBranch === branch.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                onClick={() => setSelectedBranch(branch.id)}
              >
                <div className="branch-card__distance">
                  📍 {branch.distance!.toFixed(1)} km
                </div>
                <h3>{branch.name}</h3>
                <p className="branch-card__address">
                  {branch.address}
                  <br />
                  {branch.city}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex-1 items-center justify-center">
                    {branch.hours && (
                      <p className="branch-card__hours">• {branch.hours}</p>
                    )}
                  </div>
                  <div className="flex-1 items-center justify-center">
                    <Button
                      className="branch-card__cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetDirections(branch.lat, branch.lng);
                      }}
                    >
                      Cómo llegar →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedBranches.length > 0 ? (
          sortedBranches
            .filter(
              (branch) => !nearbyBranches.find((nb) => nb.id === branch.id),
            )
            .map((branch) => (
              <div
                key={branch.id}
                className={`branch-card ${selectedBranch === branch.id ? "active" : ""}`}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                onClick={() => setSelectedBranch(branch.id)}
              >
                <h3>{branch.name}</h3>
                <p className="branch-card__address">
                  {branch.address}
                  <br />
                  {branch.city}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex-1 items-center justify-center">
                    {branch.hours && (
                      <p className="branch-card__hours">• {branch.hours}</p>
                    )}
                  </div>
                  <div className="flex-1 items-center justify-center">
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
                </div>
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
