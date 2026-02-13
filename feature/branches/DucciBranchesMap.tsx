"use client";

import { Skeleton } from "@/components/ui/skeleton";
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
    loadingBranches,
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
        loadingBranches={loadingBranches}
      />
      {loadingBranches ? (
        <Skeleton className=" w-[100dwv] bg-[var(--background)] h-[100dvh]" />
      ) : (
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      )}
    </div>
  );
};

export default DucciBranchesMap;
