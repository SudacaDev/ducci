import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="footer_social">
      <div className="footer_social-content">
        <p className="font-semibold">Teléfono</p>
        <a href="tel:+543411234567" className="label">
          +54 341 123 4567
        </a>
      </div>
      <div className="footer_social-content">
        <p className="font-semibold">Redes sociales</p>
        <div className="flex gap-2">
          <a
            href="https://www.instagram.com/ducci.gelateria/"
            title="Ir a Instagram Ducci Gelateria"
            aria-label="Ir a Instagram Ducci Gelateria"
            rel="noopener"
            target="_blank"
          >
            <span>
              <FaInstagram size={16} />
            </span>
          </a>
          <a
            href="https://www.instagram.com/ducci.gelateria/"
            title="Ir a facebook Ducci Gelateria"
            aria-label="Ir a Facebook Ducci Gelateria"
            rel="noopener"
            target="_blank"
          >
            <span>
              <FaFacebookF size={16} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
