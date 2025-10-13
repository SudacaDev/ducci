import FacebookIcon from "@/components/icons/facebook";
import IntagramIcon from "@/components/icons/instagram";

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
            <IntagramIcon />
          </a>
          <a
            href="https://www.instagram.com/ducci.gelateria/"
            title="Ir a facebook Ducci Gelateria"
            aria-label="Ir a Facebook Ducci Gelateria"
            rel="noopener"
            target="_blank"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Social;
