import { MailIcon, MapPin,  } from "lucide-react";

const Address = () => {
  return (
    <div className="footer_address">
      <div className="footer_address-wrapper flex">
        <div className="pin">
          <MapPin    size={16}/>
          </div>
        <div>
          <p className="font-semibold">Dirección</p>
          <p>Rosario - Santa Fe</p>
        </div>
      </div>
      <div className="footer_address-wrapper flex">
        <div className="pin">
          <MailIcon   size={16}/>
        </div>
        <div>
        <p className="font-semibold">Email</p>
        <a href="mailto:contacto@ducci.com">contacto@ducci.com</a>
      </div>
      </div>
    </div>
  );
};

export default Address;