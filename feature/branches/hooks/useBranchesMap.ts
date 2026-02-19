"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { THEME } from "@/constants/branches";
import { useBranches } from "@/hooks/useBranches";
import type { Branch } from "@/lib/supabase/types";

interface BranchWithDistance extends Branch {
  distance?: number;
}

const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const useBranchesMap = () => {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [nearbyBranches, setNearbyBranches] = useState<BranchWithDistance[]>(
    [],
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationCircle, setLocationCircle] = useState<any>(null);

  const { branches: BRANCHES, loading: loadingBranches } = useBranches();
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);

  useEffect(() => {
    setFilteredBranches(BRANCHES);
  }, [BRANCHES]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !mapRef.current ||
      BRANCHES.length === 0
    )
      return;

    let map: any = null;
    let mounted = true;

    const initMap = async () => {
      const L = await import("leaflet");

      if (!mounted || !mapRef.current) return;

      try {
        const container = mapRef.current;

        if (container.classList.contains("leaflet-container")) {
          (container as any)._leaflet_id = null;
        }

        const bounds = L.latLngBounds(
          BRANCHES.map((branch) => [branch.lat, branch.lng]),
        );

        map = L.map(container, {
          zoomControl: true,
          scrollWheelZoom: true,
        });

        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 14,
        });

        const tileUrl =
          THEME.mapTheme === "dark"
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        L.tileLayer(tileUrl, {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        const newMarkers = BRANCHES.map((branch) => {
          const slug = branch.slug;

          const normalIcon = L.divIcon({
            className: "",
            html: `
              <div 
                onclick="window.location.href='/sucursales/${slug}'"
                style="
                  background: ${THEME.markerNormal};
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid ${THEME.markerNormalBorder};
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                  cursor: pointer;
                ">
                <img 
                  src="/images/logo-ducci.svg" 
                  alt="Ducci" 
                  style="width: 24px; height: 24px; filter: brightness(0) invert(1); pointer-events: none;"
                />
              </div>
            `,
            iconSize: [45, 45],
            iconAnchor: [22.5, 22.5],
            popupAnchor: [0, -20],
          });

          const highlightIcon = L.divIcon({
            className: "",
            html: `
              <div 
                onclick="window.location.href='/sucursales/${slug}'"
                style="
                  background: ${THEME.markerHover};
                  width: 55px;
                  height: 55px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 4px solid ${THEME.markerHoverBorder};
                  box-shadow: 0 6px 20px rgba(186, 101, 22, 0.5);
                  animation: pulse 1.5s infinite;
                  cursor: pointer;
                ">
                <img 
                  src="/images/logo-ducci.svg" 
                  alt="Ducci" 
                  style="width: 30px; height: 30px; pointer-events: none;"
                />
              </div>
            `,
            iconSize: [55, 55],
            iconAnchor: [27.5, 27.5],
            popupAnchor: [0, -25],
          });

          const marker = L.marker([branch.lat, branch.lng], {
            icon: normalIcon,
          }).addTo(map);

          marker.bindPopup(
            `
            <div style="min-width: 200px; color: ${THEME.text};">
              <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: ${THEME.primary};">
                🍦 ${branch.name}
              </h4>
              <p style="margin: 0.5rem 0; color: #666; line-height: 1.5;">
                ${branch.address}<br>${branch.city}
              </p>
              <p style="color: #22c55e; margin: 0.5rem 0; font-weight: 600;">
                ${branch.hours}
              </p>
              ${
                branch.phone
                  ? `<p style="margin: 0.5rem 0; color: ${THEME.primary};">
                      📞 ${branch.phone}
                    </p>`
                  : ""
              }
            </div>
          `,
            {
              closeOnClick: false,
              autoClose: false,
            },
          );

          marker.on("mouseover", () => marker.openPopup());
          marker.on("mouseout", () => marker.closePopup());

          return { branch, marker, normalIcon, highlightIcon };
        });

        if (mounted) {
          setMarkers(newMarkers);
          setMapInstance(map);
        }

        const style = document.createElement("style");
        style.textContent = `
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `;
        document.head.appendChild(style);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();

    return () => {
      mounted = false;
      if (map) {
        try {
          map.remove();
        } catch (error) {
          console.error("Error removing map:", error);
        }
      }
    };
  }, [BRANCHES]);

  useEffect(() => {
    if (!mapInstance || markers.length === 0) return;

    markers.forEach(({ marker, normalIcon, highlightIcon, branch }) => {
      const isHovered = hoveredBranch === branch.id;
      const isSelected = selectedBranch === branch.id;

      if (isHovered || isSelected) {
        marker.setIcon(highlightIcon);
        marker.setZIndexOffset(1000);
        marker.openPopup();
      } else {
        marker.setIcon(normalIcon);
        marker.setZIndexOffset(0);
        marker.closePopup();
      }
    });
  }, [hoveredBranch, selectedBranch, mapInstance, markers]);

  useEffect(() => {
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const query = removeAccents(searchQuery.toLowerCase().trim());

    if (query === "") {
      setFilteredBranches(BRANCHES);
    } else {
      const filtered = BRANCHES.filter(
        (branch) =>
          removeAccents(branch.name.toLowerCase()).includes(query) ||
          removeAccents(branch.address.toLowerCase()).includes(query) ||
          removeAccents(branch.city.toLowerCase()).includes(query),
      );
      setFilteredBranches(filtered);
    }
  }, [searchQuery, BRANCHES]);

  const handleUseMyLocation = () => {
    if (!mapInstance) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ lat: latitude, lng: longitude });

          const nearby = BRANCHES.map((branch) => ({
            ...branch,
            distance: calculateDistance(
              latitude,
              longitude,
              branch.lat,
              branch.lng,
            ),
          }))
            .filter((branch) => branch.distance! <= 5)
            .sort((a, b) => a.distance! - b.distance!);

          setNearbyBranches(nearby);

          mapInstance.flyTo([latitude, longitude], 13, { duration: 1 });

          import("leaflet").then((L) => {
            L.marker([latitude, longitude], {
              icon: L.divIcon({
                className: "",
                html: `
                  <div style="
                    background: #3b82f6;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 0 0 2px #3b82f6, 0 0 10px rgba(59, 130, 246, 0.5);
                  "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              }),
            })
              .addTo(mapInstance)
              .bindPopup("📍 Estás aquí")
              .openPopup();

            if (locationCircle) {
              mapInstance.removeLayer(locationCircle);
            }

            const circle = L.circle([latitude, longitude], {
              color: THEME.primary,
              fillColor: THEME.primaryLight,
              fillOpacity: 0.1,
              radius: 5000,
              weight: 2,
              dashArray: "10, 10",
            }).addTo(mapInstance);

            setLocationCircle(circle);

            nearby.forEach((nearbyBranch) => {
              const markerData = markers.find(
                (m) => m.branch.id === nearbyBranch.id,
              );
              if (markerData) {
                markerData.marker.setIcon(markerData.highlightIcon);
                markerData.marker.setZIndexOffset(999);
              }
            });

            if (nearby.length > 0) {
              setTimeout(() => {
                toast.success(
                  `🍦 Encontramos ${nearby.length} Ducci cerca tuyo`,
                  {
                    duration: 5000,
                    style: {
                      background: "#BA6516",
                      color: "#fff",
                      minWidth: "300px",
                    },
                  },
                );
              }, 800);
            } else {
              toast.error("😔 No hay sucursales Ducci cerca de tu ubicación", {
                duration: 4000,
                style: {
                  minWidth: "300px",
                },
              });
            }
          });
        },
        (error) => {
          toast.error(
            "No se pudo obtener tu ubicación. Asegurate de dar permisos.",
          );
          console.error(error);
        },
      );
    } else {
      toast.error("Tu navegador no soporta geolocalización");
    }
  };

  const handleGetDirections = (lat: number, lng: number) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank",
    );
  };

  return {
    mapRef,
    searchQuery,
    selectedBranch,
    setSearchQuery,
    hoveredBranch,
    filteredBranches,
    setSelectedBranch,
    setHoveredBranch,
    handleUseMyLocation,
    handleGetDirections,
    nearbyBranches,
    userLocation,
    loadingBranches,
  };
};

export default useBranchesMap;
