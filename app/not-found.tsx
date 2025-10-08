import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-primary-foreground mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-color text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary-color hover:text-primary-color transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
