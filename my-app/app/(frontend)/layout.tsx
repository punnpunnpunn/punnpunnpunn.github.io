import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SanityLive } from "@/sanity/lib/live";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar/>
    <div /*"px-2.5 max-w-3xl mx-auto my-8"*/>
        {children}
        <SanityLive/>
    </div>
    <Footer/>
    </>
  );
}