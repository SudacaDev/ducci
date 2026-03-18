import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="footer_social-content flex flex-col items-center md:items-start text-center md:text-left w-full">
      <p className="font-bold text-[1.125rem] text-[#f9e19b] mb-4">Redes sociales</p>
      <div className="flex gap-4 justify-center md:justify-start">
        <a
          href="https://www.instagram.com/ducci.gelateria/"
          title="Ir a Instagram Ducci Gelateria"
          aria-label="Ir a Instagram Ducci Gelateria"
          rel="noopener"
          target="_blank"
          className="hover:-translate-y-1 transition-transform"
        >
          <span className="social-icon-wrapper w-[44px] h-[44px] shadow-sm">
            <FaInstagram size={18} />
          </span>
        </a>
        <a
          href="https://www.facebook.com/people/DUCCI-Gelateria/61552406397718/"
          title="Ir a facebook Ducci Gelateria"
          aria-label="Ir a Facebook Ducci Gelateria"
          rel="noopener"
          target="_blank"
          className="hover:-translate-y-1 transition-transform"
        >
          <span className="social-icon-wrapper w-[44px] h-[44px] shadow-sm">
            <FaFacebookF size={18} />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Social;
