import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero3D from "@/components/Hero3D";
import AboutEduSimply from "@/components/AboutEduSimply";
import About3D from "@/components/About3D";
import SubjectsSection from "@/components/SubjectsSection";
import Contact3D from "@/components/Contact3D";

export default function Home() {
  return (
    <>

      {/* Ambient pink glowing overlays for depth */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 opacity-40 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/10 opacity-30 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-inverse-primary/5 opacity-20 blur-[150px]"></div>
      </div>

      <Navbar />
      
      <main className="flex flex-col w-full relative z-10">
        <section id="hero">
          <Hero3D />
        </section>
        
        <section id="about-edusimply">
          <AboutEduSimply />
        </section>
        
        <section id="about-tutor">
          <About3D />
        </section>
        
        <section id="subjects">
          <SubjectsSection />
        </section>
        
        <section id="contact">
          <Contact3D />
        </section>
      </main>
      
      <Footer />
    </>
  );
}
