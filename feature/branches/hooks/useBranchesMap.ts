"use client";
import { useEffect, useState, useRef } from "react";
import { BRANCHES, THEME } from "@/constants/branches";
import type { Branch } from "@/types/branch.type";

const useBranchesMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);
    const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBranches, setFilteredBranches] = useState<Branch[]>(BRANCHES);

  useEffect(() => {
  if (typeof window === "undefined" || !mapRef.current) return;

  import("leaflet").then((L) => {
    const map = L.map(mapRef.current!, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([-32.9468, -60.6393], 13);

    const tileUrl =
      THEME.mapTheme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(tileUrl, {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const newMarkers = BRANCHES.map((branch) => {
      const normalIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            background: ${THEME.markerNormal};
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid ${THEME.markerNormalBorder};
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s;
          ">
            <img 
              src="/images/logo-ducci.svg" 
              alt="Ducci" 
              style="width: 24px; height: 24px; filter: brightness(0) invert(1);"
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
          <div style="
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
          ">
            <img 
              src="/images/logo-ducci.svg" 
              alt="Ducci" 
              style="width: 30px; height: 30px; filter: brightness(0);"
            />
          </div>
        `,
        iconSize: [55, 55],
        iconAnchor: [27.5, 27.5],
        popupAnchor: [0, -25],
      });

      const marker = L.marker([branch.lat, branch.lng], { icon: normalIcon })
        .addTo(map)
        .bindPopup(`
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
            ${branch.phone
              ? `
                <p style="margin: 0.5rem 0; color: ${THEME.primary};">
                  📞 ${branch.phone}
                </p>
              `
              : ""
            }
          </div>
        `);

      return { branch, marker, normalIcon, highlightIcon };
    });

    setMarkers(newMarkers);
    setMapInstance(map);

    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
    `;
    document.head.appendChild(style);
  });
}, []);

    useEffect(() => {
        if (!mapInstance || markers.length === 0) return;

        const branchId = hoveredBranch || selectedBranch;

        markers.forEach(({ marker, normalIcon, highlightIcon, branch }) => {
            if (branch.id === branchId) {
                marker.setIcon(highlightIcon);
                marker.setZIndexOffset(1000);
                if (hoveredBranch) {
                    marker.openPopup();
                    mapInstance.flyTo([branch.lat, branch.lng], 15, { duration: 0.5 });
                }
            } else {
                marker.setIcon(normalIcon);
                marker.setZIndexOffset(0);
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
                    removeAccents(branch.city.toLowerCase()).includes(query)
            );
            setFilteredBranches(filtered);
        }
    }, [searchQuery]);

    const handleUseMyLocation = () => {
        if (!mapInstance) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    mapInstance.flyTo([latitude, longitude], 14, { duration: 1 });

                    import("leaflet").then((L) => {
                        L.marker([latitude, longitude])
                            .addTo(mapInstance)
                            .bindPopup("📍 Tu ubicación actual")
                            .openPopup();
                    });
                },
                (error) => {
                    alert("No se pudo obtener tu ubicación. Asegurate de dar permisos.");
                    console.error(error);
                },
            );
        } else {
            alert("Tu navegador no soporta geolocalización");
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
    };
};
export default useBranchesMap;
