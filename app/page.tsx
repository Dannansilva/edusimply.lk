import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero3D from "@/components/Hero3D";
import About3D from "@/components/About3D";
import Courses3D from "@/components/Courses3D";
import WhyChooseUs3D from "@/components/WhyChooseUs3D";
import Testimonials3D from "@/components/Testimonials3D";
import Contact3D from "@/components/Contact3D";
import AnimatedBackground from "@/components/AnimatedBackground";
import Scene3D from "@/components/Scene3D";

export default function Home() {
  return (
    <>
      <Scene3D />
      <AnimatedBackground />
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-60 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-inverse-primary opacity-60 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-surface-tint opacity-30 blur-[150px]"></div>
      </div>
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero3D />
        <About3D />
        <Courses3D />
        <WhyChooseUs3D />
        <Testimonials3D />
        <Contact3D />
      </main>
      <Footer />
    </>
  );
}
