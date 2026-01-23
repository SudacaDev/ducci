import { createClient } from "@/lib/supabase/server";
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


  console.log('branch: ', branch)

  return (
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

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#BA6516] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#a55a13] transition-colors"
          >
            Cómo llegar {'\u2192'}
          </a>
        </div>

        {/* Acá podemos agregar un mapa o imagen */}
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">Mapa de la sucursal</span>
        </div>
      </div>
    </div>
  );
}