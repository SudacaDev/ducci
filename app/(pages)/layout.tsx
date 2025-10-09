import Footer from "@/components/footer/FooterDefault";
import Header from "@/components/header/HeaderDefault";


export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main >{children}</main>
      <Footer />
    </div>
  );
}
