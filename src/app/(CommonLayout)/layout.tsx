import Footer from "@/components/shared/footer";
import NavbarWrapper from "@/components/shared/NavbarWrapper";



export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <div className="flex flex-col min-h-screen">
      
     <NavbarWrapper/>
      <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </div>
    </>
  );
}