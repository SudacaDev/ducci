import { FaLocationDot, FaEnvelopeOpenText } from "react-icons/fa6";
const Address = () => {
  return (
    <div className="footer_address">
      <div className="footer_address-wrapper flex">
        <div className="pin">
          <FaLocationDot size={16} />
        </div>
        <div className="footer_address-content">
          <p className="font-semibold">Dirección</p>
          <p className="label">Santa Fe - Argentina</p>
        </div>
      </div>
      <div className="footer_address-wrapper flex">
        <div className="pin">
          <FaEnvelopeOpenText size={16} />
        </div>
        <div className="footer_address-content">
          <p className="font-semibold">Email</p>
          <a href="mailto:contacto@ducci.com" className="label">
            contacto@ducci.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Address;
