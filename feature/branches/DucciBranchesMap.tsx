"use client";

import useBranchesMap from "./hooks/useBranchesMap";
import SidebarBranch from "./SidebarBranch";

import "leaflet/dist/leaflet.css";

const DucciBranchesMap = () => {
  const {
    mapRef,
    searchQuery,
    setSearchQuery,
    handleUseMyLocation,
    handleGetDirections,
    filteredBranches,
    selectedBranch,
    setSelectedBranch,
    hoveredBranch,
    setHoveredBranch,
    nearbyBranches,      
    userLocation,        
  } = useBranchesMap();

  return (
    <div className="branches-map-container">
      <SidebarBranch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleUseMyLocation={handleUseMyLocation}
        handleGetDirections={handleGetDirections}
        filteredBranches={filteredBranches}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        hoveredBranch={hoveredBranch}
        setHoveredBranch={setHoveredBranch}
        nearbyBranches={nearbyBranches}      
        userLocation={userLocation}         
      />

      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default DucciBranchesMap;