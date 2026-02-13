import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import type { Branch } from "@/lib/supabase/types";

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
  loadingBranches?: boolean;  
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
 
  setHoveredBranch,
  nearbyBranches = [],
  userLocation = null,
  loadingBranches = false,  
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
        <h2>Encontrá tu Ducci</h2>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Ingresá ciudad, código postal o ubicación"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loadingBranches}
          />
        </div>

        <Button
          className="b"
          onClick={handleUseMyLocation}
          disabled={loadingBranches}
        >
          📍 Usar mi ubicación actual
        </Button>

        {!loadingBranches && (
          <p className="branches-count">
            {sortedBranches.length} sucursal
            {sortedBranches.length !== 1 ? "es" : ""} encontrada
            {sortedBranches.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="branches-list">
       
        {loadingBranches ? (
          <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #BA6516",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 1rem",
              }}
            />
            <p style={{ color: "#666" }}>Cargando sucursales...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <>
             
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
                    onMouseEnter={() => setHoveredBranch(branch.id)} // ← CAMBIO
                    onMouseLeave={() => setHoveredBranch(null)} // ← CAMBIO
                    onClick={() => setSelectedBranch(branch.id)}
                  >
                    <h3>{branch.name}</h3>
                    <p className="branch-card__address">
                      {branch.address}
                      <br />
                      {branch.city}
                    </p>
                    <div className="flex items-center justify-center gap-2 max-w-[200px]">
                      
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
              <div
                style={{ padding: "2rem", textAlign: "center", color: "#666" }}
              >
                No se encontraron sucursales con "{searchQuery}"
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarBranch;
