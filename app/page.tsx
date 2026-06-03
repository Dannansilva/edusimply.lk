import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero3D from "@/components/Hero3D";
import TrustSection from "@/components/TrustSection";
import About3D from "@/components/About3D";
import SubjectsSection from "@/components/SubjectsSection";
import WhyChooseUs3D from "@/components/WhyChooseUs3D";
import LearningExperience from "@/components/LearningExperience";
import Courses3D from "@/components/Courses3D";
import InteractiveSection from "@/components/InteractiveSection";
import StudentResults from "@/components/StudentResults";
import GallerySection from "@/components/GallerySection";
import Testimonials3D from "@/components/Testimonials3D";
import FaqSection from "@/components/FaqSection";
import Contact3D from "@/components/Contact3D";
import AnimatedBackground from "@/components/AnimatedBackground";
import Scene3D from "@/components/Scene3D";

export default function Home() {
  return (
    <>
      {/* Fixed 3D background scene */}
      <Scene3D />
      
      {/* Smooth canvas particle constellation */}
      <AnimatedBackground />

      {/* Ambient pink glowing overlays for depth */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 opacity-40 blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container/10 opacity-30 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-inverse-primary/5 opacity-20 blur-[150px]"></div>
      </div>

      <Navbar />
      
      <main className="flex flex-col w-full relative z-10">
        <section id="hero" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 100vh' }}>
          <Hero3D />
        </section>
        
        <section id="trust" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 200px' }}>
          <TrustSection />
        </section>
        
        <section id="about" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <About3D />
        </section>
        
        <section id="subjects" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <SubjectsSection />
        </section>
        
        <section id="why-choose-us" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <WhyChooseUs3D />
        </section>
        
        <section id="timeline" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}>
          <LearningExperience />
        </section>
        
        <section id="courses-list" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1000px' }}>
          <Courses3D />
        </section>
        
        <section id="simulations" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <InteractiveSection />
        </section>
        
        <section id="results" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <StudentResults />
        </section>
        
        <section id="gallery" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <GallerySection />
        </section>
        
        <section id="testimonials" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <Testimonials3D />
        </section>
        
        <section id="faq" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <FaqSection />
        </section>
        
        <section id="contact-form" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
          <Contact3D />
        </section>
      </main>
      
      <Footer />
    </>
  );
}
