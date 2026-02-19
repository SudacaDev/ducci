import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="footer_social">
      <div className="footer_social-content">
        <p className="font-semibold">Teléfono</p>
        <div className="flex flex-col gap-2">
          <a href="tel:+543471385043" className="label">
            <p> Ducci Gelateria CdG 3471 385043 </p>
          </a>
          <a href="tel:+543471319743" className="label">
            <p>Ducci Gelateria Las Rosas 3471 319743 </p>
          </a>
          <a href="tel:+543476545573" className="label">
            <p>Ducci Gelateria Totoras 3476 545573 </p>
          </a>
        </div>
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
