import { PhoneIcon, MapPin } from "lucide-react";

import { IoLogoWhatsapp } from "react-icons/io";

import "../style/contact.css";

import Block from "@/components/content-block";
import Link from "next/link";

export const BranchesBox = () => {
  return (
    <Block className="text-center">
      <Block.Title>
        <span>Comunicate con nuestras sucursales</span>
      </Block.Title>
      <Block.Body className="flex contact-support ">
        <div className="contact-support__box flex flex-col items-start gap-2">
          <p className="contact-support__box-title"> Ducci Gelateria CdG</p>
          <div className="flex flex-col items-start gap-2">
            <Link
              href="https://wa.me/5493471385043"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 contact-support__box-phone">
                <PhoneIcon size={14} />
                <p>03471 38-5043</p> <IoLogoWhatsapp />
              </div>
            </Link>
            <div className="flex items-center gap-3  contact-support__box-address">
              <MapPin size={14} color="red" /> Ocampo 1002
            </div>
          </div>
        </div>

        <div className="contact-support__box flex flex-col items-start gap-2">
          <p className="contact-support__box-title">
            Ducci Gelateria Las Rosas
          </p>
          <div className="flex flex-col items-start gap-2">
            <Link
              href="https://wa.me/5493471319743"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 contact-support__box-phone">
                <PhoneIcon size={14} /> <p>03471 31-9743</p> <IoLogoWhatsapp />
              </div>
            </Link>
            <div className="flex items-center gap-3  contact-support__box-address">
              <MapPin size={14} color="red" /> Lavalle 202
            </div>
          </div>
        </div>

        <div className="contact-support__box flex flex-col items-start gap-2">
          <p className="contact-support__box-title"> Ducci Gelateria Totoras</p>
          <div className="flex flex-col items-start gap-2">
            <Link
              href="https://wa.me/5493476515573"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-2 contact-support__box-phone">
                <PhoneIcon size={14} /> <p>03476 51-5573</p> <IoLogoWhatsapp />
              </div>
            </Link>
            <div className="flex items-center gap-3  contact-support__box-address">
              <MapPin size={14} color="red" /> Av. San Martín 1312
            </div>
          </div>
        </div>
      </Block.Body>
    </Block>
  );
};
