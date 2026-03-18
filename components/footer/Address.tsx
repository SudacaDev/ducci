import { FaEnvelopeOpenText } from "react-icons/fa6";

const Address = () => {
  return (
    <div className="footer_address w-full flex justify-center md:justify-start">
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-center text-center md:text-left">
        <div className="footer_address-content flex flex-col items-center md:items-start justify-center">
          <p className="font-bold text-[1.125rem] text-[#f9e19b] mb-1">Email</p>
          <a href="mailto:contacto@ducci.com.ar" className="text-white opacity-80 hover:opacity-100 transition-opacity text-[0.95rem]">
            contacto@ducci.com.ar
          </a>
        </div>
      </div>
    </div>
  );
};

export default Address;
