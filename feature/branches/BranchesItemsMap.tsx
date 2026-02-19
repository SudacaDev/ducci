"use client";
import CenterContainer from "@/components/container/center";
import useBranchesMap from "./hooks/useBranchesMap";
import { MapPin, Clock2, Phone } from "lucide-react";
import { formatManual } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useGoToPage from "@/libs/goToPage";
import Image from "next/image";

export const BranchesItemsMap = () => {
  const { filteredBranches } = useBranchesMap();

  const goToPage = useGoToPage();
  return (
    <div className="bg-white">
      <CenterContainer center>
        <div className="branch-title--info-inner !jutify-center !items-center">
          <h2>Visitá nuestras sucursales</h2>
          <p>Viví tu momento Ducci</p>
        </div>
        <div className="branch-grid">
          {filteredBranches.map((branch) => (
            <div key={branch.id} className="branch-grid_item">
              <div className="flex container ">
                <Image
                  src={`/images/locales/suc-local-${branch.id}.jpg`}
                  width={360}
                  height={360}
                  objectFit="cover"
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="branch-grid_item--name">
                  <p>{branch.name}</p>
                </div>

                <div className="branch-grid_item--address">
                  <MapPin size={14} />
                  <p>{branch.address}</p>
                  <p>{branch.city}</p>
                </div>
                <div className="branch-grid_item--time">
                  <Clock2 size={14} />
                  {branch.hours}
                </div>
                <div className="branch-grid_item--phone">
                  <Phone size={14} />
                  <Link href={`https://wa.me/${branch.phone}`}>
                    {formatManual(branch.phone)}
                  </Link>
                </div>
              </div>

              <Button
                variant={"outline"}
                onClick={() => goToPage(`/productos?sucursal=${branch.slug}`)}
                className="hover:cursor-pointer branch-grid_button  "
              >
                Pedi Ducci
              </Button>
            </div>
          ))}
        </div>
      </CenterContainer>
    </div>
  );
};
