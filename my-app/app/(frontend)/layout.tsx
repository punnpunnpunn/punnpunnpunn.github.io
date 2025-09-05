import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punpun's Personal Website",
  description: "Hi, My name is Punnawit Payapvattanavong, but you can call me Punpun :). I'm currently studying at the University of Toronto specializing in Mathematical applications in Economics and Finance, majoring in computer science, and minoring in statistics. I love playing chess, singing, acting, running, doing math and making memes. I'm starting this website as a way for me to learn how to make a website and to add my cool projects all into one place.",
  keywords: ['Punnawit Payapvattanavong', 'Punpun', 'Personal Website', 'Portfolio', 'Blog', 'University of Toronto', 'Mathematical Applications in Economics and Finance', 'Computer Science', 'Statistics'],
  authors: [{ name: 'Punnawit Payapvattanavong', url: 'https://punx2.vercel.app' }],
  creator: 'Punnawit Payapvattanavong',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <header className="sticky top-0 bg-wheat">
    <Navbar/>
    </header>
    <div /*"px-2.5 max-w-3xl mx-auto my-8"*/>
        {children}
        <SanityLive/>
    </div>
    <Footer/>
    </>
  );
}