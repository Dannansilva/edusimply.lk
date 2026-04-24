import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Subjects from "@/components/Subjects";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-60 blur-[150px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-inverse-primary opacity-60 blur-[120px] pointer-events-none z-[-1]"></div>
      <Navbar />
      <main className="pt-24 pb-32 max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-32">
        <Hero />
        <Features />
        <Subjects />
      </main>
      <Footer />
    </>
  );
}
