import type { Branch } from "@/types/branch.type";

export const BRANCHES: Branch[] = [
  {
    id: 1,
    name: "Ducci Centro",
    address: "Córdoba 1050",
    city: "Rosario, Santa Fe",
    lat: -32.9468,
    lng: -60.6393,
    phone: "+54 341 123 4567",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
    id: 2,
    name: "Ducci Pichincha",
    address: "Av. Pellegrini 2450",
    city: "Rosario, Santa Fe",
    lat: -32.9385,
    lng: -60.6542,
    phone: "+54 341 765 4321",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
    id: 3,
    name: "Ducci Fisherton",
    address: "Av. Eva Perón 5890",
    city: "Rosario, Santa Fe",
    lat: -32.9638,
    lng: -60.6821,
    phone: "+54 341 987 6543",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
    id: 4,
    name: "Ducci Oroño",
    address: "Bv. Oroño 1234",
    city: "Rosario, Santa Fe",
    lat: -32.952,
    lng: -60.669,
    phone: "+54 341 456 7890",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
    id: 5,
    name: "Ducci Alberdi",
    address: "Rioja 1567",
    city: "Rosario, Santa Fe",
    lat: -32.958,
    lng: -60.645,
    phone: "+54 341 234 5678",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
    id: 6,
    name: "Ducci Parque España",
    address: "Sarmiento 789",
    city: "Rosario, Santa Fe",
    lat: -32.942,
    lng: -60.63,
    phone: "+54 341 345 6789",
    hours: "Abierto • Cierra a las 23:00",
  },
  {
     id: 7,
  name: "Ducci San Fernando",
  address: "Constitución 2050",
  city: "San Fernando, Buenos Aires",
  lat: -34.4428,  
  lng: -58.5584,
  phone: "+54 11 4744 5678",
  hours: "Abierto • Cierra a las 23:00",
  },
];

 

export const THEME = {
  primary: "#BA6516",
  primaryLight: "#F9DD71",
  background: "#F8F0DD",
  text: "#2c2c2c",

  mapTheme: "light",

  markerNormal: "#BA6516",
  markerNormalBorder: "#8B4A10",
  markerHover: "#F9DD71",
  markerHoverBorder: "#BA6516",

  sidebarBg: "#ffffff",
  cardBg: "#F8F0DD",
  cardHover: "#f0e5c8",
  cardBorder: "#BA6516",
};
