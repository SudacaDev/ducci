import CenterContainer from "@/components/container/center";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BranchSinglePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: branch, error } = await supabase
    .from("branches")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !branch) {
    notFound();
  }

  return (
    <div id="product-wrapper" className="h-full bg-white  ">
      <CenterContainer center>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">🍦 {branch.name}</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Dirección</h2>
                <p>{branch.address}</p>
                <p>{branch.city}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Horarios</h2>
                <p>{branch.hours}</p>
              </div>

              {branch.phone && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Teléfono</h2>
                  <p>📞 {branch.phone}</p>
                </div>
              )}

              <div className="flex gap-4">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block  text-[var(--secondary-color)] border px-6 py-3 rounded-lg font-semibold hover:bg-[var(--secondary-color)] hover:text-white transition-colors"
                >
                  Cómo llegar &rarr;
                </a>

                <a
                  href={`/productos?sucursal=${branch.slug}`}
                  className="inline-block bg-[#BA6516] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--secondary-color-dark)] transition-colors"
                >
                  Hacer pedido &rarr;
                </a>
              </div>
            </div>

            <div
              className="flex items-center justify-center w-full h-[600px] bg-cover bg-bottom bg-no-repeat"
              style={{
                backgroundImage: `url('/images/locales/suc-local-${branch.id}.jpg')`,
              }}
              aria-label={`Sucursal ${branch.name}`}
            ></div>
          </div>
        </div>
      </CenterContainer>
    </div>
  );
}
